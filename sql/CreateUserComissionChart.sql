SELECT DISTINCT
comi.comission,
cli.id,
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
END value
from
users usu
INNER JOIN clients cli ON (cli.operator = usu.user)
INNER JOIN comissions comi ON (comi.comission = cli.operation)
INNER JOIN users_sectors ususe ON (ususe.id_user = usu.id)
INNER JOIN sectors se ON (se.id = comi.id_sector AND se.id = ususe.id_sector)
WHERE
usu.active IS TRUE AND
usu.user = 'adrianecaixeta626'
ORDER BY 1