const dbComissao = require('../../config/dbComissaoComercial.js');
const dbMK = require('../../config/dbMK.js');

let recebe = [];
let faturas = [];
const Invoice = {
  getAllNonPaidInvoice: async () => {
    try {
      const query = 
      `select
        cli.codclient codcliente,
        cli.date "data",
        cli.contract,
        cli.operation,
        cli.cod_old_plan,
        cli.cod_new_plan,
        cli.invoice fatura
      from
        clients cli
      where
        cli.paid is false`;
      const result = await dbComissao.query(query);
      recebe = result.rows;
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  validateInvoiceMK: async () => {
    var resultado = await Promise.all(
      recebe.map(async(ordem) => {
      try {
        const query = 
        `SELECT
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
            contrato.codcontrato = $3
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
            contrato.codcontrato = $3
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
                  DATE($2) \"data\",
                  $4 operacao,
                  $5 cod_plano_velho,
                  $6 cod_plano_novo,
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
                    fatura.codfatura = $7
                  )
                from
                  mk_pessoas cliente
                WHERE
                  cliente.codpessoa = $1
              )tabela
          )tb
          INNER JOIN mk_faturas fatura ON (fatura.codfatura = tb.fatura)
          WHERE
          fatura.liquidado = 'S'`;
        const values = [ordem.codcliente, ordem.data, ordem.contract, ordem.operation, ordem.cod_old_plan, ordem.cod_new_plan, ordem.fatura];
        const result = await dbMK.query(query, values);
        return result.rows[0];
      } catch (error) {
       throw error;
      }
    })
  );
  var filtrar = resultado.filter(function (el) {
    return el != null;
  });
    faturas = filtrar;
    return filtrar;
  },
  updateInvoice: async () => {
    const resultado = await Promise.all(
      faturas.map(async(fat) => {
        try {
          const query = 
          `update
            clients
          set
            invoice = case
                            when invoice != $4 then $4
                            else invoice
            end,
            paid = true,
            tv = $5,
            telephony = $6,
            recurring_payment = $7
          where
            codclient = $1 and
            operation = $2 and
            "date" = date($3)`;
          const values = [fat.codpessoa, fat.operacao, fat.data, fat.fatura, fat.tv, fat.telefonia, fat.recorrente]
          const result = await dbComissao.query(query, values);
          recebe = result.rows;
          return result.rows;
        } catch (error) {
         throw error;
        }
      })
    )
    return resultado;
  }
};
 
module.exports = Invoice;