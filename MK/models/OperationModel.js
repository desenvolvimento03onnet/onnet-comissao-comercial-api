const db = require('../../config/dbMK.js'); // Importe a configuração do banco de dados
 
const Operacao = { // pode colocar o nome que quiser, recomendo colocar o nome referente ao Model que irá usar
  getAllOperations: async () => { // esse async representa que essa é uma consulta assíncrona com o banco
    try {
      const query = 
      `SELECT
        codigo,
        cliente,
        cidade,
        contrato,
        data,
        operacao,
        operador,
        cidadeope,
        fatura,
        pago,
        codplano,
        plano,
        valor_plano,
        cod_novo_plano,
        novo_plano,
        novo_plano_valor,
        cod_velho_plano,
        velho_plano,
        velho_plano_valor,
        tv,
        telefonia,
        recorrente,
        vencimento
        FROM
        (
        SELECT
          codigo,
          cliente,
          cidade,
          contrato,
          adesao AS "data",
          'Venda' operacao,
          operador,
          cidadeope,
          coalesce(fat,0) fatura,
        CASE
          WHEN (
              SELECT
                case
                  WHEN fatura.liquidado = 'N' THEN false
                  ELSE false
                end
              from
                mk_faturas fatura
              where
                fatura.codfatura = fat
              ) IS NULL THEN false
          else
            (
            SELECT
              case
                WHEN fatura.liquidado = 'N' THEN false
                ELSE true
              end
          from
              mk_faturas fatura
            where
              fatura.codfatura = fat
            )
        end pago,
        planoC codplano,
        (
          SELECT
            plano.descricao
          from
            mk_planos_acesso plano
          where
            planoC = plano.codplano
        ) plano,
        (
          SELECT
            plano.vlr_mensalidade
          from
            mk_planos_acesso plano
          where
            planoC = plano.codplano
        ) valor_plano,
        null cod_novo_plano,
        null novo_plano,
        null novo_plano_valor,
        null cod_velho_plano,
        null velho_plano,
        null velho_plano_valor,
        CASE
          WHEN (
                SELECT
                  case
                    WHEN fatura.liquidado = 'N' THEN 'teste'
                    ELSE (
                      SELECT
                        REPLACE (plano.vlr_mensalidade||'','.',',')
                      from
                        mk_planos_acesso plano
                      where
                        planoC = plano.codplano
                    )
                  END
                from
                mk_faturas fatura
                where
                fatura.codfatura = fat
              ) IS NULL THEN false
          ELSE
            (
              SELECT
                case
                  WHEN fatura.liquidado = 'N' THEN false
                  ELSE
                    case
                      WHEN (
                          SELECT
                            produto.descricao
                          FROM
                            mk_crm_produtos plano
                            INNER JOIN mk_crm_produtos_composicao item ON (item.cd_produto = plano.codcrmproduto)
                            INNER JOIN mk_planos_acesso produto ON (produto.codplano = item.cd_plano)
                          WHERE
                            plano.cd_plano_principal = planoC
                            AND produto.descricao ILIKE ANY(ARRAY['%tela%', '%cdn%'])
                          ) IS NOT NULL THEN true
                      ELSE false
                    end
                END
              from
              mk_faturas fatura
              where
              fatura.codfatura = fat
            )
        END tv,
        CASE
          WHEN (
                SELECT
                  case
                    WHEN fatura.liquidado = 'N' THEN 'teste'
                    ELSE
                      case
                        WHEN (
                            SELECT
                              produto.descricao
                            FROM
                              mk_crm_produtos plano
                              INNER JOIN mk_crm_produtos_composicao item ON (item.cd_produto = plano.codcrmproduto)
                              INNER JOIN mk_planos_acesso produto ON (produto.codplano = item.cd_plano)
                            WHERE
                              plano.cd_plano_principal = planoC
                              AND UPPER(produto.descricao) LIKE '%TEL%ADICIONAL%'
                            ) IS NOT NULL THEN '3'
                        ELSE '0'
                      end
                  end
                from
                mk_faturas fatura
                where
                fatura.codfatura = fat
              ) IS NULL THEN false
          else
            (
              SELECT
                case
                  WHEN fatura.liquidado = 'N' THEN false
                  ELSE
                    case
                      WHEN (
                          SELECT
                            produto.descricao
                          FROM
                            mk_crm_produtos plano
                            INNER JOIN mk_crm_produtos_composicao item ON (item.cd_produto = plano.codcrmproduto)
                            INNER JOIN mk_planos_acesso produto ON (produto.codplano = item.cd_plano)
                          WHERE
                            plano.cd_plano_principal = planoC
                            AND (UPPER(produto.descricao) LIKE '%TEL%ADICIONAL%' OR UPPER(plano.nome_produto) LIKE '%TEL%ADICIONAL%')
                          ) IS NOT NULL THEN true
                      ELSE false
                    end
                end
              from
              mk_faturas fatura
              where
              fatura.codfatura = fat
            )
        end telefonia,
        CASE
          WHEN (
                SELECT
                  case
                    WHEN fatura.liquidado = 'N' THEN 'teste'
                    ELSE
                      case
                        when
                          exists(
                              select
                                trans.codtransacaocartao
                              from
                                mk_transacoes_cartao_geradas trans
                              WHERE
                                trans.cd_fatura = fatura.codfatura
                                AND trans.excluida = 'N'
                          ) IS TRUE THEN '4'
                        ELSE '0'
                      END
                  end
                from
                mk_faturas fatura
                where
                fatura.codfatura = fat
              ) IS NULL THEN false
          else
            (
              SELECT
                case
                  WHEN fatura.liquidado = 'N' THEN false
                  ELSE exists(
                            select
                              trans.codtransacaocartao
                            from
                              mk_transacoes_cartao_geradas trans
                            WHERE
                              trans.cd_fatura = fatura.codfatura
                              AND trans.excluida = 'N'
                        )
                end
              from
              mk_faturas fatura
              where
              fatura.codfatura = fat
            )
        end recorrente,
        vencimento
        FROM
        (
          SELECT
            cliente.codpessoa codigo,
            cliente.nome_razaosocial cliente,
            cidade.cidade,
            contrato.codcontrato contrato,
            contrato.plano_acesso planoC,
            contrato.adesao,
            usuario.usr_codigo codoperador,
            contrato.operador,
            cidadeope.cidade cidadeope,
            setor.codperfilacessomaster codsetor,
            setor.descricao setor,
            (
              SELECT
                min(faturas.codfatura)
              from
                mk_faturas faturas
                INNER JOIN mk_faturas_historicos histos ON (histos.cd_fatura = faturas.codfatura)
              where
                faturas.cd_pessoa = cliente.codpessoa and
                faturas.excluida = 'N' and
                faturas.suspenso = 'N' and
                faturas.tipo = 'R' and
                faturas.data_vencimento = 
                (
                  select
                    min(fatura.data_vencimento)
                  from
                    mk_faturas fatura
                    INNER JOIN mk_faturas_historicos histo ON (histo.cd_fatura = fatura.codfatura)
                  where
                    fatura.cd_pessoa = faturas.cd_pessoa and
                    histo.cd_operacao IN (1,8,40,47) and -- inclusão, Alteração de valor, Alteração no Valor de Desconto, Re-Totalização da Fatura
                    histo.dt_hr >= (histos.dt_hr - INTERVAL '5 minutes') and
                    fatura.excluida = 'N' and
                    fatura.suspenso = 'N' and
                    fatura.tipo = 'R' and
                    fatura.data_vencimento > histos.dt_hr::date
                )
                AND histos.cd_operacao IN (1,8,40,47)
                AND histos.dt_hr >= (contrato.adesao - INTERVAL '5 minutes')
            ) fat,
          (
            select
              dia.dia_vcto
            from
              mk_faturamentos_regras dia
            where
              dia.codfaturamentoregra = contrato.cd_regra_faturamento
          ) vencimento
          FROM
            (
              select
              case
                WHEN contrato.operador ILIKE '%itamaralor%' THEN 'itamaralorrane622'
                ELSE contrato.operador
              END operador,
              contrato.adesao,
              contrato.codcontrato,
              contrato.plano_acesso,
              contrato.cd_regra_faturamento,
              contrato.cliente,
              contrato.cancelado,
              contrato.dt_cancelamento,
              contrato.motivo_cancelamento_2
              from
              mk_contratos contrato
            ) contrato
            INNER JOIN mk_pessoas cliente ON (cliente.codpessoa = contrato.cliente)
            INNER JOIN mk_cidades cidade ON (cidade.codcidade = cliente.codcidade)
            LEFT JOIN fr_usuario usuario ON (usuario.usr_login = contrato.operador)
            LEFT JOIN mk_usuarios_perfil_acesso_master setor ON (setor.codperfilacessomaster = usuario.cd_perfil_acesso)
            LEFT JOIN mk_crm_operadores operador ON (operador.cd_operador = usuario.usr_codigo)
            LEFT JOIN mk_pessoas operadorcad ON (operadorcad.codpessoa = operador.codpessoa)
            LEFT JOIN mk_cidades cidadeope ON (cidadeope.codcidade = operadorcad.codcidade)
          WHERE
            (
              (
                contrato.adesao = CURRENT_DATE - 10 and --BETWEEN (SELECT (DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '3 month')::date) AND CURRENT_DATE AND
                contrato.cancelado = 'N'
              )
              OR
              (
                contrato.adesao = CURRENT_DATE - 10 and --BETWEEN (SELECT (DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '3 month')::date) AND CURRENT_DATE and
                contrato.cancelado = 'S' and
                contrato.dt_cancelamento = CURRENT_DATE - 10 and --BETWEEN (SELECT (DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '3 month')::date) AND CURRENT_DATE AND
                contrato.motivo_cancelamento_2 not IN (6,13,15)-- AJUSTE SISTEMA, ERRO DE CONTRATO EM DUPLICIDADE, CONTRATO NÃO ASSINADO
              )
            )
            AND cliente.inativo = 'N'
            AND operador.perfil_ativo = 'S'
            AND setor.codperfilacessomaster IN (11,13,14,15,32)
          GROUP BY 1,2,3,4,5,6,7,8,9,10,cd_regra_faturamento
        ) AS tabela
        UNION
        SELECT
        codigo,
        cliente,
        cidade,
        contrato,
        ultimo AS "data",
        operacao,
        operador,
        cidadeope,
        coalesce(fat,0) fatura,
        CASE
          WHEN (
              SELECT
                case
                  WHEN fatura.liquidado = 'N' THEN 'Cliente ainda não pagou'
                  ELSE 'Cliente pagou a 1ª Mensalidade'
                end
              from
                mk_faturas fatura
              where
                fatura.codfatura = fat
              ) IS NULL THEN false
          else
            (
            SELECT
              case
                WHEN fatura.liquidado = 'N' THEN false
                ELSE true
              end
            from
              mk_faturas fatura
            where
              fatura.codfatura = fat
            )
        end pago,
        planoC codplano,
        (
          SELECT
            plano.descricao
          from
            mk_planos_acesso plano
          where
            planoC = plano.codplano
        ) plano,
        (
          SELECT
            plano.vlr_mensalidade
          from
            mk_planos_acesso plano
          where
            planoC = plano.codplano
        ) valor_plano,
        ultimoPlanoN cod_novo_plano,
        ultimoPlanoNDesc novo_plano,
        ultimoPlanoNmensal novo_plano_valor,
        coalesce(ultimoPlanoV,penultimoPlanoV) cod_velho_plano,
        coalesce(ultimoPlanoVDesc,penultimoPlanoVDesc) velho_plano,
        coalesce(ultimoPlanoVmensal,penultimoPlanoVmensal) velho_plano_valor,
        CASE
          WHEN (
              SELECT
                case
                  WHEN fatura.liquidado = 'N' THEN 'Cliente ainda não pagou'
                  ELSE
                    case
                      WHEN (
                          SELECT
                            produto.descricao
                          FROM
                            mk_crm_produtos plano
                            INNER JOIN mk_crm_produtos_composicao item ON (item.cd_produto = plano.codcrmproduto)
                            LEFT JOIN mk_planos_acesso produto ON (produto.codplano = item.cd_plano)
                          WHERE
                            plano.cd_plano_principal = planoC
                            AND (UPPER(produto.descricao) LIKE '%TELA%'
                            OR UPPER(produto.descricao) LIKE '%CDN%')
                          ) IS NOT NULL THEN '2'
                      ELSE '0'
                    end
                end
              from
              mk_faturas fatura
              where
              fatura.codfatura = fat
            ) IS NULL THEN false
          else
            (
              SELECT
                case
                  WHEN fatura.liquidado = 'N' THEN false
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
                              plano.cd_plano_principal = ultimoPlanoV
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
                              plano.cd_plano_principal = ultimoPlanoN
                              AND (UPPER(produto.descricao) LIKE '%TELA%'
                            OR UPPER(produto.descricao) LIKE '%CDN%')
                        ) IS TRUE THEN
                          case
                            WHEN ultimoPlanoNDesc ILIKE '%r-ipca%' THEN false
                            ELSE true
                          end
                      ELSE false
                    end
                end
              from
              mk_faturas fatura
              where
              fatura.codfatura = fat
            )
        end tv,
        CASE
          WHEN (
                SELECT
                  case
                    WHEN fatura.liquidado = 'N' THEN 'Cliente ainda não pagou'
                    ELSE
                      case
                        WHEN (
                            SELECT
                              produto.descricao
                            FROM
                              mk_crm_produtos plano
                              INNER JOIN mk_crm_produtos_composicao item ON (item.cd_produto = plano.codcrmproduto)
                              INNER JOIN mk_planos_acesso produto ON (produto.codplano = item.cd_plano)
                            WHERE
                              plano.cd_plano_principal = planoC
                              AND (UPPER(produto.descricao) LIKE '%TELEFONIA%'
                              OR UPPER(produto.descricao) LIKE '%DDR%')
                            ) IS NOT NULL THEN '3'
                        ELSE '0'
                      end
                  end
                from
                mk_faturas fatura
                where
                fatura.codfatura = fat
              ) IS NULL THEN false
          else
            (
              SELECT
                case
                  WHEN fatura.liquidado = 'N' THEN false
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
                              plano.cd_plano_principal = ultimoPlanoV
                              AND (UPPER(produto.descricao) LIKE '%TELEFONIA%'
                              OR UPPER(produto.descricao) LIKE '%DDR%')
                        ) IS FALSE AND
                        exists(
                            SELECT
                              produto.descricao
                            FROM
                              mk_crm_produtos plano
                              INNER JOIN mk_crm_produtos_composicao item ON (item.cd_produto = plano.codcrmproduto)
                              INNER JOIN mk_planos_acesso produto ON (produto.codplano = item.cd_plano)
                            WHERE
                              plano.cd_plano_principal = ultimoPlanoN
                              AND (UPPER(produto.descricao) LIKE '%TELEFONIA%'
                              OR UPPER(produto.descricao) LIKE '%DDR%')
                        ) IS TRUE THEN
                          case
                            WHEN ultimoPlanoNDesc ILIKE '%r-ipca%' THEN false
                            ELSE true
                          end
                      ELSE false
                    end
                end
              from
              mk_faturas fatura
              where
              fatura.codfatura = fat
            )
        end telefonia,
        CASE
          WHEN (
                SELECT
                  case
                    WHEN fatura.liquidado = 'N' THEN 'Cliente ainda não pagou'
                    ELSE
                      case
                        when
                          exists(
                              select
                                trans.codtransacaocartao
                              from
                                mk_transacoes_cartao_geradas trans
                              WHERE
                                trans.cd_fatura = fatura.codfatura
                                AND trans.excluida = 'N'
                          ) IS TRUE THEN '4'
                        ELSE '0'
                      END
                  end
                from
                mk_faturas fatura
                where
                fatura.codfatura = fat
              ) IS NULL THEN false
          else
            (
              SELECT
                case
                  WHEN fatura.liquidado = 'N' THEN false
                  ELSE exists(
                            select
                              trans.codtransacaocartao
                            from
                              mk_transacoes_cartao_geradas trans
                            WHERE
                              trans.cd_fatura = fatura.codfatura
                              AND trans.excluida = 'N'
                              AND trans.dh >= (ultimo - INTERVAL '5 minutes')
                        )
                end
              from
              mk_faturas fatura
              where
              fatura.codfatura = fat
            )
        end recorrente,
        vencimento
        from
        (
        SELECT distinct
        cliente.codpessoa codigo,
        cliente.nome_razaosocial cliente,
        cidade.cidade,
        contrato.codcontrato contrato,
        contrato.plano_acesso planoC,
        ultimo.codplanoN ultimoPlanoN,
        ultimo.planoNdesc ultimoPlanoNDesc,
        ultimo.planoNmensal ultimoPlanoNmensal,
        ultimo.codplanoV ultimoPlanoV,
        ultimo.planoVdesc ultimoPlanoVDesc,
        ultimo.planoVmensal ultimoPlanoVmensal,
        penultimo.codplanoN penultimoPlanoN,
        penultimo.planoNdesc penultimoPlanoNDesc,
        penultimo.planoNmensal penultimoPlanoNmensal,
        penultimo.codplanoV penultimoPlanoV,
        penultimo.planoVdesc penultimoPlanoVDesc,
        penultimo.planoVmensal penultimoPlanoVmensal,
        ultimo.dt_hr::date ultimo,
        CASE
          WHEN ultimo.planoVdesc ILIKE ANY(ARRAY['%ipca%','ajuste%','%R1','%R2','%R3','%R4','%R5','%R6','%R7','%R8','%R9','%R10','%R11','%R12','%R1-202%','%R2-202%','%R3-202%','%R4-202%','%R5-202%','%R6-202%','%R7-202%','%R8-202%','%R9-202%','%R10-202%','%R11-202%','%R12-202%']) then
            case
              WHEN penultimo.planoVdesc IS NULL THEN
                case
                  WHEN (ultimo.planoNmensal - cast(replace(SUBSTRING(SUBSTRING(penultimo.tx_extra,POSITION('R$ ' IN penultimo.tx_extra), LENGTH(penultimo.tx_extra)), 4, POSITION('Contas' in SUBSTRING(penultimo.tx_extra,POSITION('R$ ' IN penultimo.tx_extra), LENGTH(penultimo.tx_extra)))-5),',','.')AS NUMERIC(9,2))) = 0 THEN 'Renovação'
                  WHEN (ultimo.planoNmensal - cast(replace(SUBSTRING(SUBSTRING(penultimo.tx_extra,POSITION('R$ ' IN penultimo.tx_extra), LENGTH(penultimo.tx_extra)), 4, POSITION('Contas' in SUBSTRING(penultimo.tx_extra,POSITION('R$ ' IN penultimo.tx_extra), LENGTH(penultimo.tx_extra)))-5),',','.')AS NUMERIC(9,2))) > 0 THEN 'Upgrade'
                  WHEN (ultimo.planoNmensal - cast(replace(SUBSTRING(SUBSTRING(penultimo.tx_extra,POSITION('R$ ' IN penultimo.tx_extra), LENGTH(penultimo.tx_extra)), 4, POSITION('Contas' in SUBSTRING(penultimo.tx_extra,POSITION('R$ ' IN penultimo.tx_extra), LENGTH(penultimo.tx_extra)))-5),',','.')AS NUMERIC(9,2))) < 0 THEN 'Downgrade'
                end
              else
                case
                  WHEN (CAST((ultimo.planoNmensal - penultimo.planoVmensal) AS NUMERIC(9,2)) = 0) THEN 'Renovação'
                  WHEN (CAST((ultimo.planoNmensal - penultimo.planoVmensal) AS NUMERIC(9,2)) > 0) THEN 'Upgrade'
                  WHEN (CAST((ultimo.planoNmensal - penultimo.planoVmensal) AS NUMERIC(9,2)) < 0) THEN 'Downgrade'
                end
            end
          else
            case
              WHEN (CAST((ultimo.planoNmensal - ultimo.planoVmensal) AS NUMERIC(9,2)) = 0) THEN 'Renovação'
              WHEN (CAST((ultimo.planoNmensal - ultimo.planoVmensal) AS NUMERIC(9,2)) > 0) THEN 'Upgrade'
              WHEN (CAST((ultimo.planoNmensal - ultimo.planoVmensal) AS NUMERIC(9,2)) < 0) THEN 'Downgrade'
            end
        END AS operacao,
        usuarios.usr_codigo codoperador,
        usuarios.usr_login operador,
        cidadeope.cidade cidadeope,
        perfis.codperfilacessomaster codsetor,
        perfis.descricao setor,
        (
          SELECT
            min(faturas.codfatura)
          from
            mk_faturas faturas
            INNER JOIN mk_faturas_historicos histos ON (histos.cd_fatura = faturas.codfatura)
          where
            faturas.cd_pessoa = cliente.codpessoa and
            faturas.excluida = 'N' and
            faturas.suspenso = 'N' and
            faturas.tipo = 'R' and
            faturas.data_vencimento = 
            (
              select
                min(fatura.data_vencimento)
              from
                mk_faturas fatura
              where
                fatura.cd_pessoa = faturas.cd_pessoa and
                fatura.excluida = 'N' and
                fatura.suspenso = 'N' and
                fatura.tipo = 'R' and
                fatura.data_vencimento >= ultimo.dt_hr::date
            )
        ) fat,
        (
          select
            dia.dia_vcto
          from
            mk_faturamentos_regras dia
          where
            dia.codfaturamentoregra = contrato.cd_regra_faturamento
        ) vencimento
        FROM
        mk_contratos contrato
        INNER JOIN mk_pessoas cliente ON (cliente.codpessoa = contrato.cliente)
        INNER JOIN mk_cidades cidade ON (cidade.codcidade = cliente.codcidade)
        LEFT JOIN (
          SELECT
            clientes.codpessoa,
            contratos.codcontrato,
            hists.dt_hr,
            planoVs.codplano codplanoV,
            planoVs.descricao planoVdesc,
            planoVs.vlr_mensalidade planoVmensal,
            planoNs.codplano codplanoN,
            planoNs.descricao planoNdesc,
            planoNs.vlr_mensalidade planoNmensal
          from
            mk_contratos contratos
            INNER JOIN mk_contratos_historicos hists ON (hists.cd_contrato = contratos.codcontrato AND hists.cd_operacao IN (4,5))
            INNER JOIN mk_pessoas clientes ON (clientes.codpessoa = contratos.cliente)
            INNER JOIN mk_planos_acesso planoVs ON (planoVs.codplano = hists.cd_plano_velho)
            INNER JOIN mk_planos_acesso planoNs ON (planoNs.codplano = hists.cd_plano_novo)
          WHERE
            hists.dt_hr = 
            (
              SELECT distinct
                MAX(histss.dt_hr)
              from
                mk_contratos contratoss
                INNER JOIN mk_contratos_historicos histss ON (histss.cd_contrato = contratoss.codcontrato AND histss.cd_operacao IN (4,5))
                INNER JOIN mk_pessoas clientess ON (clientess.codpessoa = contratoss.cliente)
                INNER JOIN fr_usuario usuarioss ON (usuarioss.usr_login = histss.operador AND usuarioss.cd_perfil_acesso IN (11,13,14,15,32))
              WHERE
                clientess.codpessoa = clientes.codpessoa
            )
        ) as ultimo ON (ultimo.codpessoa = cliente.codpessoa AND ultimo.codcontrato = contrato.codcontrato)
        LEFT JOIN
        (
          SELECT
            clientes.codpessoa,
            contratos.codcontrato,
            hists.dt_hr,
            planoVs.codplano codplanoV,
            planoVs.descricao planoVdesc,
            planoVs.vlr_mensalidade planoVmensal,
            planoNs.codplano codplanoN,
            planoNs.descricao planoNdesc,
            planoNs.vlr_mensalidade planoNmensal,
            hists.tx_extra
          from
            mk_contratos contratos
            INNER JOIN mk_contratos_historicos hists ON (hists.cd_contrato = contratos.codcontrato AND hists.cd_operacao IN (4,5))
            INNER JOIN mk_pessoas clientes ON (clientes.codpessoa = contratos.cliente)
            INNER JOIN mk_planos_acesso planoVs ON (planoVs.codplano = hists.cd_plano_velho)
            INNER JOIN mk_planos_acesso planoNs ON (planoNs.codplano = hists.cd_plano_novo)
            INNER JOIN fr_usuario usuarioss ON (usuarioss.usr_login = hists.operador)
            INNER JOIN mk_usuarios_perfil_acesso_master setor ON (setor.codperfilacessomaster = usuarioss.cd_perfil_acesso)
          WHERE
            usuarioss.cd_perfil_acesso IN (11,13,14,15,32,18) and
            hists.codcontratohist = (
              SELECT
                MAX(hists1.codcontratohist)
              from
                mk_contratos contratos1
                INNER JOIN mk_contratos_historicos hists1 ON (hists1.cd_contrato = contratos1.codcontrato AND hists1.cd_operacao IN (1,4,5))
                INNER JOIN mk_pessoas clientes1 ON (clientes1.codpessoa = contratos1.cliente)
                INNER JOIN mk_planos_acesso planoVs1 ON (planoVs1.codplano = hists1.cd_plano_velho)
                INNER JOIN mk_planos_acesso planoNs1 ON (planoNs1.codplano = hists1.cd_plano_novo)
                INNER JOIN fr_usuario usuarioss1 ON (usuarioss1.usr_login = hists1.operador)
                INNER JOIN mk_usuarios_perfil_acesso_master setor1 ON (setor1.codperfilacessomaster = usuarioss1.cd_perfil_acesso)
              WHERE
                contratos1.codcontrato = contratos.codcontrato and
                usuarioss1.cd_perfil_acesso IN (11,13,14,15,32,18) and
                hists.codcontratohist < (
                  SELECT
                    MAX(histss.codcontratohist)
                  from
                    mk_contratos contratoss
                    INNER JOIN mk_contratos_historicos histss ON (histss.cd_contrato = contratoss.codcontrato AND histss.cd_operacao IN (1,4,5))
                    INNER JOIN fr_usuario usuarioss ON (usuarioss.usr_login = histss.operador)
                  WHERE
                    usuarioss.cd_perfil_acesso IN (11,13,14,15,32) and
                    contratoss.codcontrato = contratos1.codcontrato
                ) and
                (
                  planoVs1.descricao IS NULL OR (
                  planoVs1.descricao NOT ILIKE '%IPCA%' and
                  planoVs1.descricao NOT ILIKE '%R1' and
                  planoVs1.descricao NOT ILIKE '%R2' and
                  planoVs1.descricao NOT ILIKE '%R3' and
                  planoVs1.descricao NOT ILIKE '%R4' and
                  planoVs1.descricao NOT ILIKE '%R5' and
                  planoVs1.descricao NOT ILIKE '%R6' and
                  planoVs1.descricao NOT ILIKE '%R7' and
                  planoVs1.descricao NOT ILIKE '%R8' and
                  planoVs1.descricao NOT ILIKE '%R9' and
                  planoVs1.descricao NOT ILIKE '%R10' and
                  planoVs1.descricao NOT ILIKE '%R11' and
                  planoVs1.descricao NOT ILIKE '%R12' and
                  planoVs1.descricao NOT ILIKE '%R1-202%' and
                  planoVs1.descricao NOT ILIKE '%R2-202%' and
                  planoVs1.descricao NOT ILIKE '%R3-202%' and
                  planoVs1.descricao NOT ILIKE '%R4-202%' and
                  planoVs1.descricao NOT ILIKE '%R5-202%' and
                  planoVs1.descricao NOT ILIKE '%R6-202%' and
                  planoVs1.descricao NOT ILIKE '%R7-202%' and
                  planoVs1.descricao NOT ILIKE '%R8-202%' and
                  planoVs1.descricao NOT ILIKE '%R9-202%' and
                  planoVs1.descricao NOT ILIKE '%R10-202%' and
                  planoVs1.descricao NOT ILIKE '%R11-202%' and
                  planoVs1.descricao NOT ILIKE '%R12-202%' and
                  planoVs1.descricao NOT ILIKE 'ajuste%'
                  )
                )
            )
        ) as penultimo ON (penultimo.codpessoa = cliente.codpessoa AND penultimo.codcontrato = contrato.codcontrato)
        LEFT JOIN (
          select
          case
            WHEN hist.operador ILIKE '%itamaralor%' THEN 'itamaralorrane622'
            ELSE hist.operador
          END operador,
          hist.dt_hr,
          hist.dt,
          hist.cd_contrato
          from
          mk_contratos_historicos hist
        ) hist ON (hist.cd_contrato = contrato.codcontrato AND hist.dt_hr = ultimo.dt_hr)
        LEFT JOIN fr_usuario usuarios ON (usuarios.usr_login = hist.operador)
        inner JOIN mk_usuarios_perfil_acesso_master perfis ON (perfis.codperfilacessomaster = usuarios.cd_perfil_acesso)
        LEFT JOIN mk_crm_operadores operador ON (operador.cd_operador = usuarios.usr_codigo)
        LEFT JOIN mk_pessoas operadorcad ON (operadorcad.codpessoa = operador.codpessoa)
        LEFT JOIN mk_cidades cidadeope ON (cidadeope.codcidade = operadorcad.codcidade)
        WHERE
          ultimo.dt_hr::DATE = CURRENT_DATE - 9
          AND contrato.cancelado = 'N'
          AND operador.perfil_ativo = 'S'
        ) AS tabela
        ) AS tb
        ORDER BY 3 asc,5 asc,6 desc`; // Query SQL
      const result = await db.query(query); // await serve para que o código aguarde a consulta ser feita, para só após isso, ela ser enviada pro result
      return result.rows;
    } catch (error) {
     throw error;
    }
  }
};
 
module.exports = Operacao;