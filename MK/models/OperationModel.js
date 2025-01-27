const db = require('../../config/dbMK.js'); // Importe a configuração do banco de dados
 
const Operacao = { // pode colocar o nome que quiser, recomendo colocar o nome referente ao Model que irá usar
  getAllOperations: async () => { // esse async representa que essa é uma consulta assíncrona com o banco
    try {
      const query = 
      "SELECT\n"+
        "codigo,\n"+
        "cliente,\n"+
        "cidade,\n"+
        "contrato,\n"+
        "data,\n"+
        "operacao,\n"+
        "operador,\n"+
        "cidadeope,\n"+
        "fatura,\n"+
        "pago,\n"+
        "codplano,\n"+
        "plano,\n"+
        "valor_plano,\n"+
        "cod_novo_plano,\n"+
        "novo_plano,\n"+
        "novo_plano_valor,\n"+
        "cod_velho_plano,\n"+
        "velho_plano,\n"+
        "velho_plano_valor,\n"+
        "tv,\n"+
        "telefonia,\n"+
        "recorrente,\n"+
        "vencimento\n"+
        "FROM\n"+
        "(\n"+
        "SELECT\n"+
          "codigo,\n"+
          "cliente,\n"+
          "cidade,\n"+
          "contrato,\n"+
          "adesao AS \"data\",\n"+
          "'Venda' operacao,\n"+
          "operador,\n"+
          "cidadeope,\n"+
          "coalesce(fat,0) fatura,\n"+
        "CASE\n"+
          "WHEN (\n"+
              "SELECT\n"+
                "case\n"+
                  "WHEN fatura.liquidado = 'N' THEN false\n"+
                  "ELSE false\n"+
                "end\n"+
              "from\n"+
                "mk_faturas fatura\n"+
              "where\n"+
                "fatura.codfatura = fat\n"+
              ") IS NULL THEN false\n"+
          "else\n"+
            "(\n"+
            "SELECT\n"+
              "case\n"+
                "WHEN fatura.liquidado = 'N' THEN false\n"+
                "ELSE true\n"+
              "end\n"+
            "from\n"+
              "mk_faturas fatura\n"+
            "where\n"+
              "fatura.codfatura = fat\n"+
            ")\n"+
        "end pago,\n"+
        "planoC codplano,\n"+
        "(\n"+
          "SELECT\n"+
            "plano.descricao\n"+
          "from\n"+
            "mk_planos_acesso plano\n"+
          "where\n"+
            "planoC = plano.codplano\n"+
        ") plano,\n"+
        "(\n"+
          "SELECT\n"+
            "plano.vlr_mensalidade\n"+
          "from\n"+
            "mk_planos_acesso plano\n"+
          "where\n"+
            "planoC = plano.codplano\n"+
        ") valor_plano,\n"+
        "null cod_novo_plano,\n"+
        "null novo_plano,\n"+
        "null novo_plano_valor,\n"+
        "null cod_velho_plano,\n"+
        "null velho_plano,\n"+
        "null velho_plano_valor,\n"+
        "CASE\n"+
          "WHEN (\n"+
                "SELECT\n"+
                  "case\n"+
                    "WHEN fatura.liquidado = 'N' THEN 'teste'\n"+
                    "ELSE (\n"+
                      "SELECT\n"+
                        "REPLACE (plano.vlr_mensalidade||'','.',',')\n"+
                      "from\n"+
                        "mk_planos_acesso plano\n"+
                      "where\n"+
                        "planoC = plano.codplano\n"+
                    ")\n"+
                  "END\n"+
                "from\n"+
                "mk_faturas fatura\n"+
                "where\n"+
                "fatura.codfatura = fat\n"+
              ") IS NULL THEN false\n"+
          "ELSE\n"+
            "(\n"+
              "SELECT\n"+
                "case\n"+
                  "WHEN fatura.liquidado = 'N' THEN false\n"+
                  "ELSE\n"+
                    "case\n"+
                      "WHEN (\n"+
                          "SELECT\n"+
                            "produto.descricao\n"+
                          "FROM\n"+
                            "mk_crm_produtos plano\n"+
                            "INNER JOIN mk_crm_produtos_composicao item ON (item.cd_produto = plano.codcrmproduto)\n"+
                            "INNER JOIN mk_planos_acesso produto ON (produto.codplano = item.cd_plano)\n"+
                          "WHERE\n"+
                            "plano.cd_plano_principal = planoC\n"+
                            "AND produto.descricao ILIKE ANY(ARRAY['%tela%', '%cdn%'])\n"+
                          ") IS NOT NULL THEN true\n"+
                      "ELSE false\n"+
                    "end\n"+
                "END\n"+
              "from\n"+
              "mk_faturas fatura\n"+
              "where\n"+
              "fatura.codfatura = fat\n"+
            ")\n"+
        "END tv,\n"+
        "CASE\n"+
          "WHEN (\n"+
                "SELECT\n"+
                  "case\n"+
                    "WHEN fatura.liquidado = 'N' THEN 'teste'\n"+
                    "ELSE\n"+
                      "case\n"+
                        "WHEN (\n"+
                            "SELECT\n"+
                              "produto.descricao\n"+
                            "FROM\n"+
                              "mk_crm_produtos plano\n"+
                              "INNER JOIN mk_crm_produtos_composicao item ON (item.cd_produto = plano.codcrmproduto)\n"+
                              "INNER JOIN mk_planos_acesso produto ON (produto.codplano = item.cd_plano)\n"+
                            "WHERE\n"+
                              "plano.cd_plano_principal = planoC\n"+
                              "AND UPPER(produto.descricao) LIKE '%TEL%ADICIONAL%'\n"+
                            ") IS NOT NULL THEN '3'\n"+
                        "ELSE '0'\n"+
                      "end\n"+
                  "end\n"+
                "from\n"+
                "mk_faturas fatura\n"+
                "where\n"+
                "fatura.codfatura = fat\n"+
              ") IS NULL THEN false\n"+
          "else\n"+
            "(\n"+
              "SELECT\n"+
                "case\n"+
                  "WHEN fatura.liquidado = 'N' THEN false\n"+
                  "ELSE\n"+
                    "case\n"+
                      "WHEN (\n"+
                          "SELECT\n"+
                            "produto.descricao\n"+
                          "FROM\n"+
                            "mk_crm_produtos plano\n"+
                            "INNER JOIN mk_crm_produtos_composicao item ON (item.cd_produto = plano.codcrmproduto)\n"+
                            "INNER JOIN mk_planos_acesso produto ON (produto.codplano = item.cd_plano)\n"+
                          "WHERE\n"+
                            "plano.cd_plano_principal = planoC\n"+
                            "AND (UPPER(produto.descricao) LIKE '%TEL%ADICIONAL%' OR UPPER(plano.nome_produto) LIKE '%TEL%ADICIONAL%')\n"+
                          ") IS NOT NULL THEN true\n"+
                      "ELSE false\n"+
                    "end\n"+
                "end\n"+
              "from\n"+
              "mk_faturas fatura\n"+
              "where\n"+
              "fatura.codfatura = fat\n"+
            ")\n"+
        "end telefonia,\n"+
        "CASE\n"+
          "WHEN (\n"+
                "SELECT\n"+
                  "case\n"+
                    "WHEN fatura.liquidado = 'N' THEN 'teste'\n"+
                    "ELSE\n"+
                      "case\n"+
                        "when\n"+
                          "exists(\n"+
                              "select\n"+
                                "trans.codtransacaocartao\n"+
                              "from\n"+
                                "mk_transacoes_cartao_geradas trans\n"+
                              "WHERE\n"+
                                "trans.cd_fatura = fatura.codfatura\n"+
                                "AND trans.excluida = 'N'\n"+
                          ") IS TRUE THEN '4'\n"+
                        "ELSE '0'\n"+
                      "END\n"+
                  "end\n"+
                "from\n"+
                "mk_faturas fatura\n"+
                "where\n"+
                "fatura.codfatura = fat\n"+
              ") IS NULL THEN false\n"+
          "else\n"+
            "(\n"+
              "SELECT\n"+
                "case\n"+
                  "WHEN fatura.liquidado = 'N' THEN false\n"+
                  "ELSE exists(\n"+
                            "select\n"+
                              "trans.codtransacaocartao\n"+
                            "from\n"+
                              "mk_transacoes_cartao_geradas trans\n"+
                            "WHERE\n"+
                              "trans.cd_fatura = fatura.codfatura\n"+
                              "AND trans.excluida = 'N'\n"+
                        ")\n"+
                "end\n"+
              "from\n"+
              "mk_faturas fatura\n"+
              "where\n"+
              "fatura.codfatura = fat\n"+
            ")\n"+
        "end recorrente,\n"+
        "vencimento\n"+
        "FROM\n"+
        "(\n"+
          "SELECT\n"+
            "cliente.codpessoa codigo,\n"+
            "cliente.nome_razaosocial cliente,\n"+
            "cidade.cidade,\n"+
            "contrato.codcontrato contrato,\n"+
            "contrato.plano_acesso planoC,\n"+
            "contrato.adesao,\n"+
            "usuario.usr_codigo codoperador,\n"+
            "contrato.operador,\n"+
            "cidadeope.cidade cidadeope,\n"+
            "setor.codperfilacessomaster codsetor,\n"+
            "setor.descricao setor,\n"+
            "(\n"+
              "SELECT\n"+
                "min(faturas.codfatura)\n"+
              "from\n"+
                "mk_faturas faturas\n"+
                "INNER JOIN mk_faturas_historicos histos ON (histos.cd_fatura = faturas.codfatura)\n"+
              "where\n"+
                "faturas.cd_pessoa = cliente.codpessoa and\n"+
                "faturas.excluida = 'N' and\n"+
                "faturas.suspenso = 'N' and\n"+
                "faturas.tipo = 'R' and\n"+
                "faturas.data_vencimento = \n"+
                "(\n"+
                  "select\n"+
                    "min(fatura.data_vencimento)\n"+
                  "from\n"+
                    "mk_faturas fatura\n"+
                    "INNER JOIN mk_faturas_historicos histo ON (histo.cd_fatura = fatura.codfatura)\n"+
                  "where\n"+
                    "fatura.cd_pessoa = faturas.cd_pessoa and\n"+
                    "histo.cd_operacao IN (1,8,40,47) and -- inclusão, Alteração de valor, Alteração no Valor de Desconto, Re-Totalização da Fatura\n"+
                    "histo.dt_hr >= (histos.dt_hr - INTERVAL '5 minutes') and\n"+
                    "fatura.excluida = 'N' and\n"+
                    "fatura.suspenso = 'N' and\n"+
                    "fatura.tipo = 'R' and\n"+
                    "fatura.data_vencimento > histos.dt_hr::date\n"+
                ")\n"+
                "AND histos.cd_operacao IN (1,8,40,47)\n"+
                "AND histos.dt_hr >= (contrato.adesao - INTERVAL '5 minutes')\n"+
            ") fat,\n"+
          "(\n"+
            "select\n"+
              "dia.dia_vcto\n"+
            "from\n"+
              "mk_faturamentos_regras dia\n"+
            "where\n"+
              "dia.codfaturamentoregra = contrato.cd_regra_faturamento\n"+
          ") vencimento\n"+
          "FROM\n"+
            "(\n"+
              "select\n"+
              "case\n"+
                "WHEN contrato.operador ILIKE '%itamaralor%' THEN 'itamaralorrane622'\n"+
                "ELSE contrato.operador\n"+
              "END operador,\n"+
              "contrato.adesao,\n"+
              "contrato.codcontrato,\n"+
              "contrato.plano_acesso,\n"+
              "contrato.cd_regra_faturamento,\n"+
              "contrato.cliente,\n"+
              "contrato.cancelado,\n"+
              "contrato.dt_cancelamento,\n"+
              "contrato.motivo_cancelamento_2\n"+
              "from\n"+
              "mk_contratos contrato\n"+
            ") contrato\n"+
            "INNER JOIN mk_pessoas cliente ON (cliente.codpessoa = contrato.cliente)\n"+
            "INNER JOIN mk_cidades cidade ON (cidade.codcidade = cliente.codcidade)\n"+
            "LEFT JOIN fr_usuario usuario ON (usuario.usr_login = contrato.operador)\n"+
            "LEFT JOIN mk_usuarios_perfil_acesso_master setor ON (setor.codperfilacessomaster = usuario.cd_perfil_acesso)\n"+
            "LEFT JOIN mk_crm_operadores operador ON (operador.cd_operador = usuario.usr_codigo)\n"+
            "LEFT JOIN mk_pessoas operadorcad ON (operadorcad.codpessoa = operador.codpessoa)\n"+
            "LEFT JOIN mk_cidades cidadeope ON (cidadeope.codcidade = operadorcad.codcidade)\n"+
          "WHERE\n"+
            "(\n"+
              "(\n"+
                "contrato.adesao = CURRENT_DATE - 1 and --BETWEEN (SELECT (DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '3 month')::date) AND CURRENT_DATE AND\n"+
                "contrato.cancelado = 'N'\n"+
              ")\n"+
              "OR\n"+
              "(\n"+
                "contrato.adesao = CURRENT_DATE - 1 and --BETWEEN (SELECT (DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '3 month')::date) AND CURRENT_DATE and\n"+
                "contrato.cancelado = 'S' and\n"+
                "contrato.dt_cancelamento = CURRENT_DATE - 1 and --BETWEEN (SELECT (DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '3 month')::date) AND CURRENT_DATE AND\n"+
                "contrato.motivo_cancelamento_2 not IN (6,13,15)-- AJUSTE SISTEMA, ERRO DE CONTRATO EM DUPLICIDADE, CONTRATO NÃO ASSINADO\n"+
              ")\n"+
            ")\n"+
            "AND cliente.inativo = 'N'\n"+
            "AND operador.perfil_ativo = 'S'\n"+
            "AND setor.codperfilacessomaster IN (11,13,14,15,32)\n"+
          "GROUP BY 1,2,3,4,5,6,7,8,9,10,cd_regra_faturamento\n"+
        ") AS tabela\n"+
        "UNION\n"+
        "SELECT\n"+
        "codigo,\n"+
        "cliente,\n"+
        "cidade,\n"+
        "contrato,\n"+
        "ultimo AS \"data\",\n"+
        "operacao,\n"+
        "operador,\n"+
        "cidadeope,\n"+
        "coalesce(fat,0) fatura,\n"+
        "CASE\n"+
          "WHEN (\n"+
              "SELECT\n"+
                "case\n"+
                  "WHEN fatura.liquidado = 'N' THEN 'Cliente ainda não pagou'\n"+
                  "ELSE 'Cliente pagou a 1ª Mensalidade'\n"+
                "end\n"+
              "from\n"+
                "mk_faturas fatura\n"+
              "where\n"+
                "fatura.codfatura = fat\n"+
              ") IS NULL THEN false\n"+
          "else\n"+
            "(\n"+
            "SELECT\n"+
              "case\n"+
                "WHEN fatura.liquidado = 'N' THEN false\n"+
                "ELSE true\n"+
              "end\n"+
            "from\n"+
              "mk_faturas fatura\n"+
            "where\n"+
              "fatura.codfatura = fat\n"+
            ")\n"+
        "end pago,\n"+
        "planoC codplano,\n"+
        "(\n"+
          "SELECT\n"+
            "plano.descricao\n"+
          "from\n"+
            "mk_planos_acesso plano\n"+
          "where\n"+
            "planoC = plano.codplano\n"+
        ") plano,\n"+
        "(\n"+
          "SELECT\n"+
            "plano.vlr_mensalidade\n"+
          "from\n"+
            "mk_planos_acesso plano\n"+
          "where\n"+
            "planoC = plano.codplano\n"+
        ") valor_plano,\n"+
        "ultimoPlanoN cod_novo_plano,\n"+
        "ultimoPlanoNDesc novo_plano,\n"+
        "ultimoPlanoNmensal novo_plano_valor,\n"+
        "coalesce(ultimoPlanoV,penultimoPlanoV) cod_velho_plano,\n"+
        "coalesce(ultimoPlanoVDesc,penultimoPlanoVDesc) velho_plano,\n"+
        "coalesce(ultimoPlanoVmensal,penultimoPlanoVmensal) velho_plano_valor,\n"+
        "CASE\n"+
          "WHEN (\n"+
              "SELECT\n"+
                "case\n"+
                  "WHEN fatura.liquidado = 'N' THEN 'Cliente ainda não pagou'\n"+
                  "ELSE\n"+
                    "case\n"+
                      "WHEN (\n"+
                          "SELECT\n"+
                            "produto.descricao\n"+
                          "FROM\n"+
                            "mk_crm_produtos plano\n"+
                            "INNER JOIN mk_crm_produtos_composicao item ON (item.cd_produto = plano.codcrmproduto)\n"+
                            "LEFT JOIN mk_planos_acesso produto ON (produto.codplano = item.cd_plano)\n"+
                          "WHERE\n"+
                            "plano.cd_plano_principal = planoC\n"+
                            "AND (UPPER(produto.descricao) LIKE '%TELA%'\n"+
                            "OR UPPER(produto.descricao) LIKE '%CDN%')\n"+
                          ") IS NOT NULL THEN '2'\n"+
                      "ELSE '0'\n"+
                    "end\n"+
                "end\n"+
              "from\n"+
              "mk_faturas fatura\n"+
              "where\n"+
              "fatura.codfatura = fat\n"+
            ") IS NULL THEN false\n"+
          "else\n"+
            "(\n"+
              "SELECT\n"+
                "case\n"+
                  "WHEN fatura.liquidado = 'N' THEN false\n"+
                  "ELSE\n"+
                    "case\n"+
                      "WHEN\n"+
                        "exists(\n"+
                            "SELECT\n"+
                              "produto.descricao\n"+
                            "FROM\n"+
                              "mk_crm_produtos plano\n"+
                              "INNER JOIN mk_crm_produtos_composicao item ON (item.cd_produto = plano.codcrmproduto)\n"+
                              "INNER JOIN mk_planos_acesso produto ON (produto.codplano = item.cd_plano)\n"+
                            "WHERE\n"+
                              "plano.cd_plano_principal = ultimoPlanoV\n"+
                              "AND (UPPER(produto.descricao) LIKE '%TELA%'\n"+
                            "OR UPPER(produto.descricao) LIKE '%CDN%')\n"+
                        ") IS FALSE AND\n"+
                        "exists(\n"+
                            "SELECT\n"+
                              "produto.descricao\n"+
                            "FROM\n"+
                              "mk_crm_produtos plano\n"+
                              "INNER JOIN mk_crm_produtos_composicao item ON (item.cd_produto = plano.codcrmproduto)\n"+
                              "INNER JOIN mk_planos_acesso produto ON (produto.codplano = item.cd_plano)\n"+
                            "WHERE\n"+
                              "plano.cd_plano_principal = ultimoPlanoN\n"+
                              "AND (UPPER(produto.descricao) LIKE '%TELA%'\n"+
                            "OR UPPER(produto.descricao) LIKE '%CDN%')\n"+
                        ") IS TRUE THEN\n"+
                          "case\n"+
                            "WHEN ultimoPlanoNDesc ILIKE '%r-ipca%' THEN false\n"+
                            "ELSE true\n"+
                          "end\n"+
                      "ELSE false\n"+
                    "end\n"+
                "end\n"+
              "from\n"+
              "mk_faturas fatura\n"+
              "where\n"+
              "fatura.codfatura = fat\n"+
            ")\n"+
        "end tv,\n"+
        "CASE\n"+
          "WHEN (\n"+
                "SELECT\n"+
                  "case\n"+
                    "WHEN fatura.liquidado = 'N' THEN 'Cliente ainda não pagou'\n"+
                    "ELSE\n"+
                      "case\n"+
                        "WHEN (\n"+
                            "SELECT\n"+
                              "produto.descricao\n"+
                            "FROM\n"+
                              "mk_crm_produtos plano\n"+
                              "INNER JOIN mk_crm_produtos_composicao item ON (item.cd_produto = plano.codcrmproduto)\n"+
                              "INNER JOIN mk_planos_acesso produto ON (produto.codplano = item.cd_plano)\n"+
                            "WHERE\n"+
                              "plano.cd_plano_principal = planoC\n"+
                              "AND (UPPER(produto.descricao) LIKE '%TELEFONIA%'\n"+
                              "OR UPPER(produto.descricao) LIKE '%DDR%')\n"+
                            ") IS NOT NULL THEN '3'\n"+
                        "ELSE '0'\n"+
                      "end\n"+
                  "end\n"+
                "from\n"+
                "mk_faturas fatura\n"+
                "where\n"+
                "fatura.codfatura = fat\n"+
              ") IS NULL THEN false\n"+
          "else\n"+
            "(\n"+
              "SELECT\n"+
                "case\n"+
                  "WHEN fatura.liquidado = 'N' THEN false\n"+
                  "ELSE\n"+
                    "case\n"+
                      "WHEN\n"+
                        "exists(\n"+
                            "SELECT\n"+
                              "produto.descricao\n"+
                            "FROM\n"+
                              "mk_crm_produtos plano\n"+
                              "INNER JOIN mk_crm_produtos_composicao item ON (item.cd_produto = plano.codcrmproduto)\n"+
                              "INNER JOIN mk_planos_acesso produto ON (produto.codplano = item.cd_plano)\n"+
                            "WHERE\n"+
                              "plano.cd_plano_principal = ultimoPlanoV\n"+
                              "AND (UPPER(produto.descricao) LIKE '%TELEFONIA%'\n"+
                              "OR UPPER(produto.descricao) LIKE '%DDR%')\n"+
                        ") IS FALSE AND\n"+
                        "exists(\n"+
                            "SELECT\n"+
                              "produto.descricao\n"+
                            "FROM\n"+
                              "mk_crm_produtos plano\n"+
                              "INNER JOIN mk_crm_produtos_composicao item ON (item.cd_produto = plano.codcrmproduto)\n"+
                              "INNER JOIN mk_planos_acesso produto ON (produto.codplano = item.cd_plano)\n"+
                            "WHERE\n"+
                              "plano.cd_plano_principal = ultimoPlanoN\n"+
                              "AND (UPPER(produto.descricao) LIKE '%TELEFONIA%'\n"+
                              "OR UPPER(produto.descricao) LIKE '%DDR%')\n"+
                        ") IS TRUE THEN\n"+
                          "case\n"+
                            "WHEN ultimoPlanoNDesc ILIKE '%r-ipca%' THEN false\n"+
                            "ELSE true\n"+
                          "end\n"+
                      "ELSE false\n"+
                    "end\n"+
                "end\n"+
              "from\n"+
              "mk_faturas fatura\n"+
              "where\n"+
              "fatura.codfatura = fat\n"+
            ")\n"+
        "end telefonia,\n"+
        "CASE\n"+
          "WHEN (\n"+
                "SELECT\n"+
                  "case\n"+
                    "WHEN fatura.liquidado = 'N' THEN 'Cliente ainda não pagou'\n"+
                    "ELSE\n"+
                      "case\n"+
                        "when\n"+
                          "exists(\n"+
                              "select\n"+
                                "trans.codtransacaocartao\n"+
                              "from\n"+
                                "mk_transacoes_cartao_geradas trans\n"+
                              "WHERE\n"+
                                "trans.cd_fatura = fatura.codfatura\n"+
                                "AND trans.excluida = 'N'\n"+
                          ") IS TRUE THEN '4'\n"+
                        "ELSE '0'\n"+
                      "END\n"+
                  "end\n"+
                "from\n"+
                "mk_faturas fatura\n"+
                "where\n"+
                "fatura.codfatura = fat\n"+
              ") IS NULL THEN false\n"+
          "else\n"+
            "(\n"+
              "SELECT\n"+
                "case\n"+
                  "WHEN fatura.liquidado = 'N' THEN false\n"+
                  "ELSE exists(\n"+
                            "select\n"+
                              "trans.codtransacaocartao\n"+
                            "from\n"+
                              "mk_transacoes_cartao_geradas trans\n"+
                            "WHERE\n"+
                              "trans.cd_fatura = fatura.codfatura\n"+
                              "AND trans.excluida = 'N'\n"+
                              "AND trans.dh >= (ultimo - INTERVAL '5 minutes')\n"+
                        ")\n"+
                "end\n"+
              "from\n"+
              "mk_faturas fatura\n"+
              "where\n"+
              "fatura.codfatura = fat\n"+
            ")\n"+
        "end recorrente,\n"+
        "vencimento\n"+
        "from\n"+
        "(\n"+
        "SELECT distinct\n"+
        "cliente.codpessoa codigo,\n"+
        "cliente.nome_razaosocial cliente,\n"+
        "cidade.cidade,\n"+
        "contrato.codcontrato contrato,\n"+
        "contrato.plano_acesso planoC,\n"+
        "ultimo.codplanoN ultimoPlanoN,\n"+
        "ultimo.planoNdesc ultimoPlanoNDesc,\n"+
        "ultimo.planoNmensal ultimoPlanoNmensal,\n"+
        "ultimo.codplanoV ultimoPlanoV,\n"+
        "ultimo.planoVdesc ultimoPlanoVDesc,\n"+
        "ultimo.planoVmensal ultimoPlanoVmensal,\n"+
        "penultimo.codplanoN penultimoPlanoN,\n"+
        "penultimo.planoNdesc penultimoPlanoNDesc,\n"+
        "penultimo.planoNmensal penultimoPlanoNmensal,\n"+
        "penultimo.codplanoV penultimoPlanoV,\n"+
        "penultimo.planoVdesc penultimoPlanoVDesc,\n"+
        "penultimo.planoVmensal penultimoPlanoVmensal,\n"+
        "ultimo.dt_hr::date ultimo,\n"+
        "CASE\n"+
          "WHEN ultimo.planoVdesc ILIKE ANY(ARRAY['%ipca%','ajuste%','%R1','%R2','%R3','%R4','%R5','%R6','%R7','%R8','%R9','%R10','%R11','%R12','%R1-202%','%R2-202%','%R3-202%','%R4-202%','%R5-202%','%R6-202%','%R7-202%','%R8-202%','%R9-202%','%R10-202%','%R11-202%','%R12-202%']) then\n"+
            "case\n"+
              "WHEN penultimo.planoVdesc IS NULL THEN\n"+
                "case\n"+
                  "WHEN (ultimo.planoNmensal - cast(replace(SUBSTRING(SUBSTRING(penultimo.tx_extra,POSITION('R$ ' IN penultimo.tx_extra), LENGTH(penultimo.tx_extra)), 4, POSITION('Contas' in SUBSTRING(penultimo.tx_extra,POSITION('R$ ' IN penultimo.tx_extra), LENGTH(penultimo.tx_extra)))-5),',','.')AS NUMERIC(9,2))) = 0 THEN 'Renovação'\n"+
                  "WHEN (ultimo.planoNmensal - cast(replace(SUBSTRING(SUBSTRING(penultimo.tx_extra,POSITION('R$ ' IN penultimo.tx_extra), LENGTH(penultimo.tx_extra)), 4, POSITION('Contas' in SUBSTRING(penultimo.tx_extra,POSITION('R$ ' IN penultimo.tx_extra), LENGTH(penultimo.tx_extra)))-5),',','.')AS NUMERIC(9,2))) > 0 THEN 'Upgrade'\n"+
                  "WHEN (ultimo.planoNmensal - cast(replace(SUBSTRING(SUBSTRING(penultimo.tx_extra,POSITION('R$ ' IN penultimo.tx_extra), LENGTH(penultimo.tx_extra)), 4, POSITION('Contas' in SUBSTRING(penultimo.tx_extra,POSITION('R$ ' IN penultimo.tx_extra), LENGTH(penultimo.tx_extra)))-5),',','.')AS NUMERIC(9,2))) < 0 THEN 'Downgrade'\n"+
                "end\n"+
              "else\n"+
                "case\n"+
                  "WHEN (CAST((ultimo.planoNmensal - penultimo.planoVmensal) AS NUMERIC(9,2)) = 0) THEN 'Renovação'\n"+
                  "WHEN (CAST((ultimo.planoNmensal - penultimo.planoVmensal) AS NUMERIC(9,2)) > 0) THEN 'Upgrade'\n"+
                  "WHEN (CAST((ultimo.planoNmensal - penultimo.planoVmensal) AS NUMERIC(9,2)) < 0) THEN 'Downgrade'\n"+
                "end\n"+
            "end\n"+
          "else\n"+
            "case\n"+
              "WHEN (CAST((ultimo.planoNmensal - ultimo.planoVmensal) AS NUMERIC(9,2)) = 0) THEN 'Renovação'\n"+
              "WHEN (CAST((ultimo.planoNmensal - ultimo.planoVmensal) AS NUMERIC(9,2)) > 0) THEN 'Upgrade'\n"+
              "WHEN (CAST((ultimo.planoNmensal - ultimo.planoVmensal) AS NUMERIC(9,2)) < 0) THEN 'Downgrade'\n"+
            "end\n"+
        "END AS operacao,\n"+
        "usuarios.usr_codigo codoperador,\n"+
        "usuarios.usr_login operador,\n"+
        "cidadeope.cidade cidadeope,\n"+
        "perfis.codperfilacessomaster codsetor,\n"+
        "perfis.descricao setor,\n"+
        "(\n"+
          "SELECT\n"+
            "min(faturas.codfatura)\n"+
          "from\n"+
            "mk_faturas faturas\n"+
            "INNER JOIN mk_faturas_historicos histos ON (histos.cd_fatura = faturas.codfatura)\n"+
          "where\n"+
            "faturas.cd_pessoa = cliente.codpessoa and\n"+
            "faturas.excluida = 'N' and\n"+
            "faturas.suspenso = 'N' and\n"+
            "faturas.tipo = 'R' and\n"+
            "faturas.data_vencimento = \n"+
            "(\n"+
              "select\n"+
                "min(fatura.data_vencimento)\n"+
              "from\n"+
                "mk_faturas fatura\n"+
              "where\n"+
                "fatura.cd_pessoa = faturas.cd_pessoa and\n"+
                "fatura.excluida = 'N' and\n"+
                "fatura.suspenso = 'N' and\n"+
                "fatura.tipo = 'R' and\n"+
                "fatura.data_vencimento >= ultimo.dt_hr::date\n"+
            ")\n"+
        ") fat,\n"+
        "(\n"+
          "select\n"+
            "dia.dia_vcto\n"+
          "from\n"+
            "mk_faturamentos_regras dia\n"+
          "where\n"+
            "dia.codfaturamentoregra = contrato.cd_regra_faturamento\n"+
        ") vencimento\n"+
        "FROM\n"+
        "mk_contratos contrato\n"+
        "INNER JOIN mk_pessoas cliente ON (cliente.codpessoa = contrato.cliente)\n"+
        "INNER JOIN mk_cidades cidade ON (cidade.codcidade = cliente.codcidade)\n"+
        "LEFT JOIN (\n"+
          "SELECT\n"+
            "clientes.codpessoa,\n"+
            "contratos.codcontrato,\n"+
            "hists.dt_hr,\n"+
            "planoVs.codplano codplanoV,\n"+
            "planoVs.descricao planoVdesc,\n"+
            "planoVs.vlr_mensalidade planoVmensal,\n"+
            "planoNs.codplano codplanoN,\n"+
            "planoNs.descricao planoNdesc,\n"+
            "planoNs.vlr_mensalidade planoNmensal\n"+
          "from\n"+
            "mk_contratos contratos\n"+
            "INNER JOIN mk_contratos_historicos hists ON (hists.cd_contrato = contratos.codcontrato AND hists.cd_operacao IN (4,5))\n"+
            "INNER JOIN mk_pessoas clientes ON (clientes.codpessoa = contratos.cliente)\n"+
            "INNER JOIN mk_planos_acesso planoVs ON (planoVs.codplano = hists.cd_plano_velho)\n"+
            "INNER JOIN mk_planos_acesso planoNs ON (planoNs.codplano = hists.cd_plano_novo)\n"+
          "WHERE\n"+
            "hists.dt_hr = \n"+
            "(\n"+
              "SELECT distinct\n"+
                "MAX(histss.dt_hr)\n"+
              "from\n"+
                "mk_contratos contratoss\n"+
                "INNER JOIN mk_contratos_historicos histss ON (histss.cd_contrato = contratoss.codcontrato AND histss.cd_operacao IN (4,5))\n"+
                "INNER JOIN mk_pessoas clientess ON (clientess.codpessoa = contratoss.cliente)\n"+
                "INNER JOIN fr_usuario usuarioss ON (usuarioss.usr_login = histss.operador AND usuarioss.cd_perfil_acesso IN (11,13,14,15,32))\n"+
              "WHERE\n"+
                "clientess.codpessoa = clientes.codpessoa\n"+
            ")\n"+
        ") as ultimo ON (ultimo.codpessoa = cliente.codpessoa AND ultimo.codcontrato = contrato.codcontrato)\n"+
        "LEFT JOIN\n"+
        "(\n"+
          "SELECT\n"+
            "clientes.codpessoa,\n"+
            "contratos.codcontrato,\n"+
            "hists.dt_hr,\n"+
            "planoVs.codplano codplanoV,\n"+
            "planoVs.descricao planoVdesc,\n"+
            "planoVs.vlr_mensalidade planoVmensal,\n"+
            "planoNs.codplano codplanoN,\n"+
            "planoNs.descricao planoNdesc,\n"+
            "planoNs.vlr_mensalidade planoNmensal,\n"+
            "hists.tx_extra\n"+
          "from\n"+
            "mk_contratos contratos\n"+
            "INNER JOIN mk_contratos_historicos hists ON (hists.cd_contrato = contratos.codcontrato AND hists.cd_operacao IN (4,5))\n"+
            "INNER JOIN mk_pessoas clientes ON (clientes.codpessoa = contratos.cliente)\n"+
            "INNER JOIN mk_planos_acesso planoVs ON (planoVs.codplano = hists.cd_plano_velho)\n"+
            "INNER JOIN mk_planos_acesso planoNs ON (planoNs.codplano = hists.cd_plano_novo)\n"+
            "INNER JOIN fr_usuario usuarioss ON (usuarioss.usr_login = hists.operador)\n"+
            "INNER JOIN mk_usuarios_perfil_acesso_master setor ON (setor.codperfilacessomaster = usuarioss.cd_perfil_acesso)\n"+
          "WHERE\n"+
            "usuarioss.cd_perfil_acesso IN (11,13,14,15,32,18) and\n"+
            "hists.codcontratohist = (\n"+
              "SELECT\n"+
                "MAX(hists1.codcontratohist)\n"+
              "from\n"+
                "mk_contratos contratos1\n"+
                "INNER JOIN mk_contratos_historicos hists1 ON (hists1.cd_contrato = contratos1.codcontrato AND hists1.cd_operacao IN (1,4,5))\n"+
                "INNER JOIN mk_pessoas clientes1 ON (clientes1.codpessoa = contratos1.cliente)\n"+
                "INNER JOIN mk_planos_acesso planoVs1 ON (planoVs1.codplano = hists1.cd_plano_velho)\n"+
                "INNER JOIN mk_planos_acesso planoNs1 ON (planoNs1.codplano = hists1.cd_plano_novo)\n"+
                "INNER JOIN fr_usuario usuarioss1 ON (usuarioss1.usr_login = hists1.operador)\n"+
                "INNER JOIN mk_usuarios_perfil_acesso_master setor1 ON (setor1.codperfilacessomaster = usuarioss1.cd_perfil_acesso)\n"+
              "WHERE\n"+
                "contratos1.codcontrato = contratos.codcontrato and\n"+
                "usuarioss1.cd_perfil_acesso IN (11,13,14,15,32,18) and\n"+
                "hists.codcontratohist < (\n"+
                  "SELECT\n"+
                    "MAX(histss.codcontratohist)\n"+
                  "from\n"+
                    "mk_contratos contratoss\n"+
                    "INNER JOIN mk_contratos_historicos histss ON (histss.cd_contrato = contratoss.codcontrato AND histss.cd_operacao IN (1,4,5))\n"+
                    "INNER JOIN fr_usuario usuarioss ON (usuarioss.usr_login = histss.operador)\n"+
                  "WHERE\n"+
                    "usuarioss.cd_perfil_acesso IN (11,13,14,15,32) and\n"+
                    "contratoss.codcontrato = contratos1.codcontrato\n"+
                ") and\n"+
                "(\n"+
                  "planoVs1.descricao IS NULL OR (\n"+
                  "planoVs1.descricao NOT ILIKE '%IPCA%' and\n"+
                  "planoVs1.descricao NOT ILIKE '%R1' and\n"+
                  "planoVs1.descricao NOT ILIKE '%R2' and\n"+
                  "planoVs1.descricao NOT ILIKE '%R3' and\n"+
                  "planoVs1.descricao NOT ILIKE '%R4' and\n"+
                  "planoVs1.descricao NOT ILIKE '%R5' and\n"+
                  "planoVs1.descricao NOT ILIKE '%R6' and\n"+
                  "planoVs1.descricao NOT ILIKE '%R7' and\n"+
                  "planoVs1.descricao NOT ILIKE '%R8' and\n"+
                  "planoVs1.descricao NOT ILIKE '%R9' and\n"+
                  "planoVs1.descricao NOT ILIKE '%R10' and\n"+
                  "planoVs1.descricao NOT ILIKE '%R11' and\n"+
                  "planoVs1.descricao NOT ILIKE '%R12' and\n"+
                  "planoVs1.descricao NOT ILIKE '%R1-202%' and\n"+
                  "planoVs1.descricao NOT ILIKE '%R2-202%' and\n"+
                  "planoVs1.descricao NOT ILIKE '%R3-202%' and\n"+
                  "planoVs1.descricao NOT ILIKE '%R4-202%' and\n"+
                  "planoVs1.descricao NOT ILIKE '%R5-202%' and\n"+
                  "planoVs1.descricao NOT ILIKE '%R6-202%' and\n"+
                  "planoVs1.descricao NOT ILIKE '%R7-202%' and\n"+
                  "planoVs1.descricao NOT ILIKE '%R8-202%' and\n"+
                  "planoVs1.descricao NOT ILIKE '%R9-202%' and\n"+
                  "planoVs1.descricao NOT ILIKE '%R10-202%' and\n"+
                  "planoVs1.descricao NOT ILIKE '%R11-202%' and\n"+
                  "planoVs1.descricao NOT ILIKE '%R12-202%' and\n"+
                  "planoVs1.descricao NOT ILIKE 'ajuste%'\n"+
                  ")\n"+
                ")\n"+
            ")\n"+
        ") as penultimo ON (penultimo.codpessoa = cliente.codpessoa AND penultimo.codcontrato = contrato.codcontrato)\n"+
        "LEFT JOIN (\n"+
          "select\n"+
          "case\n"+
            "WHEN hist.operador ILIKE '%itamaralor%' THEN 'itamaralorrane622'\n"+
            "ELSE hist.operador\n"+
          "END operador,\n"+
          "hist.dt_hr,\n"+
          "hist.dt,\n"+
          "hist.cd_contrato\n"+
          "from\n"+
          "mk_contratos_historicos hist\n"+
        ") hist ON (hist.cd_contrato = contrato.codcontrato AND hist.dt_hr = ultimo.dt_hr)\n"+
        "LEFT JOIN fr_usuario usuarios ON (usuarios.usr_login = hist.operador)\n"+
        "inner JOIN mk_usuarios_perfil_acesso_master perfis ON (perfis.codperfilacessomaster = usuarios.cd_perfil_acesso)\n"+
        "LEFT JOIN mk_crm_operadores operador ON (operador.cd_operador = usuarios.usr_codigo)\n"+
        "LEFT JOIN mk_pessoas operadorcad ON (operadorcad.codpessoa = operador.codpessoa)\n"+
        "LEFT JOIN mk_cidades cidadeope ON (cidadeope.codcidade = operadorcad.codcidade)\n"+
        "WHERE\n"+
          "ultimo.dt_hr::DATE = CURRENT_DATE - 1\n"+
          "AND contrato.cancelado = 'N'\n"+
          "AND operador.perfil_ativo = 'S'\n"+
        ") AS tabela\n"+
        ") AS tb\n"+
        "ORDER BY 3 asc,5 asc,6 desc"; // Query SQL
      const result = await db.query(query); // await serve para que o código aguarde a consulta ser feita, para só após isso, ela ser enviada pro result
      return result.rows;
    } catch (error) {
     throw error;
    }
  }
};
 
module.exports = Operacao;