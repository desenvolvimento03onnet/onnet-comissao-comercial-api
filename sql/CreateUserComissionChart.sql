WITH cliente AS (
	select
		*
	from
		clients cli
),comissao AS (
	select
		comi.comission,
		comi.value,
		comi.id_sector,
		comi.created_at
	from
		comissions comi
)
SELECT DISTINCT
	*
FROM
	(
	SELECT DISTINCT
		comi.comission,
		usu.id id_user,
		cli.id id_client,
		cli."date",
		--LEFT(REPLACE(comi.value, 'valor_plano', cli.plan_value||''), POSITION(' ' IN (REPLACE(comi.value, 'valor_plano', cli.plan_value||'')))-1)
		--right(REPLACE(comi.value, 'valor_plano', cli.plan_value||''), POSITION(' ' IN (REPLACE(comi.value, 'valor_plano', cli.plan_value||'')))-1)
		--SUBSTRING(REPLACE(comi.value, 'valor_plano', cli.plan_value||''), POSITION(' ' IN (REPLACE(comi.value, 'valor_plano', cli.plan_value||'')))+1,1)
		-- CASE
		-- 	WHEN comi.comission = 'Venda' THEN REPLACE(comi.value, 'valor_plano', cli.plan_value||'')
		-- 	WHEN comi.comission = 'Renovação' THEN comi.value
		-- 	WHEN comi.comission = 'Upgrade' THEN replace(REPLACE(comi.value, 'novo_plano_valor', cli.new_plan_value||''),'velho_plano_valor', cli.old_plan_value||'')
		-- 	ELSE comi.value
		-- end value
		CASE
		  WHEN cli.date >= date(comi.created_at)
		       AND cli.date < COALESCE(
		              (
						  	SELECT
								min(date(created_at))
							FROM
								comissions
							WHERE
								date(created_at) > date(comi.created_at) and
								comission = comi.comission and
								id_sector = se.id
							ORDER BY 1), 
		              '9999-12-31'::date
		          )
		      THEN
		      CASE
					when position('valor_plano' in comi.value) != 0 THEN REPLACE(comi.value, 'valor_plano', cli.plan_value||'')
					when position('novo_plano_valor' in comi.value) != 0 THEN
						case
							WHEN position('velho_plano_valor' in comi.value) != 0 THEN REPLACE(REPLACE(comi.value, 'novo_plano_valor', cli.new_plan_value||''), 'velho_plano_valor', cli.old_plan_value||'')
							ELSE REPLACE(comi.value, 'novo_plano_valor', cli.new_plan_value||'')
						end
					when position('velho_plano_valor' in comi.value) != 0 THEN 
						case
							WHEN position('novo_plano_valor' in comi.value) != 0 THEN REPLACE(REPLACE(comi.value, 'velho_plano_valor', cli.old_plan_value||''), 'novo_plano_valor', cli.new_plan_value||'')
							ELSE REPLACE(comi.value, 'velho_plano_valor', cli.old_plan_value||'')
						end
					ELSE comi.value
				END
		END VALUE
	from
		users usu
		INNER JOIN cliente cli ON (cli.operator = usu.user)
		INNER JOIN comissao comi ON (comi.comission = cli.operation)
		INNER JOIN users_sectors ususe ON (ususe.id_user = usu.id)
		INNER JOIN sectors se ON (se.id = comi.id_sector AND se.id = ususe.id_sector)
	WHERE
		usu.user = 'adrianecaixeta626'
	) tabela
WHERE
	tabela.value IS NOT null
ORDER BY 1