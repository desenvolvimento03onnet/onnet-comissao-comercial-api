SELECT
tb.codpessoa,
tb.operacao,
tb.data,
tb.fatura,
(
	select
	case
		WHEN tb.operacao = 'Venda' THEN 
			case
				WHEN (
						SELECT
							produto.descricao
						FROM
							mk_crm_produtos plano
							INNER JOIN mk_crm_produtos_composicao item ON (item.cd_produto = plano.codcrmproduto)
							INNER JOIN mk_planos_acesso produto ON (produto.codplano = item.cd_plano)
						WHERE
							plano.cd_plano_principal = planos.codplano and
							produto.descricao ILIKE ANY(ARRAY['%tela%', '%cdn%'])
						) IS NOT NULL THEN true
				ELSE false
			END
		WHEN tb.operacao = 'Downgrade' THEN false
		ELSE
			case
				WHEN
					exists(
							SELECT
								produto.descricao
							FROM
								mk_crm_produtos plano
								INNER JOIN mk_crm_produtos_composicao item ON (item.cd_produto = plano.codcrmproduto)
								INNER JOIN mk_planos_acesso produto ON (produto.codplano = item.cd_plano)
							WHERE
								plano.cd_plano_principal = tb.cod_plano_velho
								AND (UPPER(produto.descricao) LIKE '%TELA%'
							OR UPPER(produto.descricao) LIKE '%CDN%')
					) IS FALSE AND 
					exists(
							SELECT
								produto.descricao
							FROM
								mk_crm_produtos plano
								INNER JOIN mk_crm_produtos_composicao item ON (item.cd_produto = plano.codcrmproduto)
								INNER JOIN mk_planos_acesso produto ON (produto.codplano = item.cd_plano)
							WHERE
								plano.cd_plano_principal = tb.cod_plano_novo
								AND (UPPER(produto.descricao) LIKE '%TELA%'
							OR UPPER(produto.descricao) LIKE '%CDN%')
					) IS TRUE THEN true
				ELSE false
			end
	END tv
	from
	mk_planos_acesso planos
	INNER JOIN mk_contratos contrato ON (contrato.plano_acesso = planos.codplano)
	where
	contrato.codcontrato = 34656
) tv,
(
	select
	case
		WHEN tb.operacao = 'Venda' THEN 
			case
				WHEN (
						SELECT
							produto.descricao
						FROM
							mk_crm_produtos plano
							INNER JOIN mk_crm_produtos_composicao item ON (item.cd_produto = plano.codcrmproduto)
							INNER JOIN mk_planos_acesso produto ON (produto.codplano = item.cd_plano)
						WHERE
							plano.cd_plano_principal = planos.codplano and
							(UPPER(produto.descricao) LIKE '%TEL%03%' OR
							UPPER(produto.descricao) LIKE '%TEL%ADICIONAL%')
						) IS NOT NULL THEN true
				ELSE false
			END
		WHEN tb.operacao = 'Downgrade' THEN false
		ELSE
			case
				WHEN
					exists(
							SELECT
								produto.descricao
							FROM
								mk_crm_produtos plano
								INNER JOIN mk_crm_produtos_composicao item ON (item.cd_produto = plano.codcrmproduto)
								INNER JOIN mk_planos_acesso produto ON (produto.codplano = item.cd_plano)
							WHERE
								plano.cd_plano_principal = tb.cod_plano_velho
								AND (UPPER(produto.descricao) LIKE '%TEL%03%' OR
									UPPER(produto.descricao) LIKE '%TEL%ADICIONAL%')
					) IS FALSE AND 
					exists(
							SELECT
								produto.descricao
							FROM
								mk_crm_produtos plano
								INNER JOIN mk_crm_produtos_composicao item ON (item.cd_produto = plano.codcrmproduto)
								INNER JOIN mk_planos_acesso produto ON (produto.codplano = item.cd_plano)
							WHERE
								plano.cd_plano_principal = tb.cod_plano_novo
								AND (UPPER(produto.descricao) LIKE '%TEL%03%' OR
									UPPER(produto.descricao) LIKE '%TEL%ADICIONAL%')
					) IS TRUE THEN true
				ELSE false
			end
	END telefonia
	from
	mk_planos_acesso planos
	INNER JOIN mk_contratos contrato ON (contrato.plano_acesso = planos.codplano)
	where
	contrato.codcontrato = 34656
) telefonia,
case
	WHEN fatura.codfatura IS NULL THEN false
	ELSE
		EXISTS(
			select
				trans.codtransacaocartao
			from
				mk_transacoes_cartao_geradas trans
			WHERE
				trans.cd_fatura = fatura.codfatura
				AND trans.excluida = 'N'
				AND trans.dh::date >= tb.data
		)
END recorrente
FROM
(
	SELECT
		tabela.codpessoa,
		tabela.data,
		tabela.operacao,
		tabela.cod_plano_velho,
		tabela.cod_plano_novo,
		CASE
			WHEN tabela.codfatura IS NOT NULL THEN tabela.codfatura
			ELSE (
				select
					MIN(fatura.codfatura) fatura
				from
					mk_faturas fatura
				where
					fatura.cd_pessoa = tabela.codpessoa AND
					fatura.tipo = 'R' AND
					fatura.excluida = 'N' AND
					fatura.suspenso = 'N' and
					fatura.data_vencimento = (
						select
							MIN(faturas.data_vencimento)
						from
							mk_faturas faturas
						where
							faturas.cd_pessoa = fatura.cd_pessoa AND
							faturas.data_vencimento >= tabela.data and
							faturas.tipo = 'R' AND
							faturas.excluida = 'N' AND
							faturas.suspenso = 'N'
					)
			)
		END fatura
	FROM
		(
			SELECT
				cliente.codpessoa,
				DATE('2025-01-03') "data",
				'Renovação' operacao,
				1865 cod_plano_velho,
				3455 cod_plano_novo,
				(
					select
					fatura.codfatura
					from
					mk_faturas fatura
					where
					fatura.cd_pessoa = cliente.codpessoa AND
					fatura.tipo = 'R' AND
					fatura.excluida = 'N' AND
					fatura.suspenso = 'N' and
					fatura.codfatura = 12975668
				)
			from
				mk_pessoas cliente
			WHERE
				cliente.codpessoa = 21891
		)tabela
)tb
INNER JOIN mk_faturas fatura ON (fatura.codfatura = tb.fatura)
WHERE
fatura.liquidado = 'S'