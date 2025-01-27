const dbComissao = require('../../config/dbComissaoComercial.js');
const dbMK = require('../../config/dbMK.js');

let recebe = [];
let faturas = [];
const Invoice = {
  getAllNonPaidInvoice: async () => {
    try {
      const query = 
      "select\n"+
        "cli.codclient codcliente,\n"+
        "cli.date \"data\",\n"+
        "cli.contract,\n"+
        "cli.operation,\n"+
        "cli.cod_old_plan,\n"+
        "cli.cod_new_plan,\n"+
        "cli.invoice fatura\n"+
      "from\n"+
        "clients cli\n"+
      "where\n"+
        "cli.paid is false";
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
        "SELECT\n"+
          "tb.codpessoa,\n"+
          "tb.operacao,\n"+
          "tb.data,\n"+
          "tb.fatura,\n"+
          "(\n"+
            "select\n"+
            "case\n"+
              "WHEN tb.operacao = 'Venda' THEN\n"+
                "case\n"+
                  "WHEN (\n"+
                      "SELECT\n"+
                        "produto.descricao\n"+
                      "FROM\n"+
                        "mk_crm_produtos plano\n"+
                        "INNER JOIN mk_crm_produtos_composicao item ON (item.cd_produto = plano.codcrmproduto)\n"+
                        "INNER JOIN mk_planos_acesso produto ON (produto.codplano = item.cd_plano)\n"+
                      "WHERE\n"+
                        "plano.cd_plano_principal = planos.codplano and\n"+
                        "produto.descricao ILIKE ANY(ARRAY['%tela%', '%cdn%'])\n"+
                      ") IS NOT NULL THEN true\n"+
                  "ELSE false\n"+
                "END\n"+
              "WHEN tb.operacao = 'Downgrade' THEN false\n"+
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
                          "plano.cd_plano_principal = tb.cod_plano_velho\n"+
                          "AND (UPPER(produto.descricao) LIKE '%TELA%'\n"+
                        "OR UPPER(produto.descricao) LIKE '%CDN%')\n"+
                    ") IS FALSE AND \n"+
                    "exists(\n"+
                        "SELECT\n"+
                          "produto.descricao\n"+
                        "FROM\n"+
                          "mk_crm_produtos plano\n"+
                          "INNER JOIN mk_crm_produtos_composicao item ON (item.cd_produto = plano.codcrmproduto)\n"+
                          "INNER JOIN mk_planos_acesso produto ON (produto.codplano = item.cd_plano)\n"+
                        "WHERE\n"+
                          "plano.cd_plano_principal = tb.cod_plano_novo\n"+
                          "AND (UPPER(produto.descricao) LIKE '%TELA%'\n"+
                        "OR UPPER(produto.descricao) LIKE '%CDN%')\n"+
                    ") IS TRUE THEN true\n"+
                  "ELSE false\n"+
                "end\n"+
            "END tv\n"+
            "from\n"+
            "mk_planos_acesso planos\n"+
            "INNER JOIN mk_contratos contrato ON (contrato.plano_acesso = planos.codplano)\n"+
            "where\n"+
            "contrato.codcontrato = $3\n"+
          ") tv,\n"+
          "(\n"+
            "select\n"+
            "case\n"+
              "WHEN tb.operacao = 'Venda' THEN\n"+
                "case\n"+
                  "WHEN (\n"+
                      "SELECT\n"+
                        "produto.descricao\n"+
                      "FROM\n"+
                        "mk_crm_produtos plano\n"+
                        "INNER JOIN mk_crm_produtos_composicao item ON (item.cd_produto = plano.codcrmproduto)\n"+
                        "INNER JOIN mk_planos_acesso produto ON (produto.codplano = item.cd_plano)\n"+
                      "WHERE\n"+
                        "plano.cd_plano_principal = planos.codplano and\n"+
                        "(UPPER(produto.descricao) LIKE '%TEL%03%' OR\n"+
                        "UPPER(produto.descricao) LIKE '%TEL%ADICIONAL%')\n"+
                      ") IS NOT NULL THEN true\n"+
                  "ELSE false\n"+
                "END\n"+
              "WHEN tb.operacao = 'Downgrade' THEN false\n"+
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
                          "plano.cd_plano_principal = tb.cod_plano_velho\n"+
                          "AND (UPPER(produto.descricao) LIKE '%TEL%03%' OR\n"+
                            "UPPER(produto.descricao) LIKE '%TEL%ADICIONAL%')\n"+
                    ") IS FALSE AND\n"+
                    "exists(\n"+
                        "SELECT\n"+
                          "produto.descricao\n"+
                        "FROM\n"+
                          "mk_crm_produtos plano\n"+
                          "INNER JOIN mk_crm_produtos_composicao item ON (item.cd_produto = plano.codcrmproduto)\n"+
                          "INNER JOIN mk_planos_acesso produto ON (produto.codplano = item.cd_plano)\n"+
                        "WHERE\n"+
                          "plano.cd_plano_principal = tb.cod_plano_novo\n"+
                          "AND (UPPER(produto.descricao) LIKE '%TEL%03%' OR\n"+
                            "UPPER(produto.descricao) LIKE '%TEL%ADICIONAL%')\n"+
                    ") IS TRUE THEN true\n"+
                  "ELSE false\n"+
                "end\n"+
            "END telefonia\n"+
            "from\n"+
            "mk_planos_acesso planos\n"+
            "INNER JOIN mk_contratos contrato ON (contrato.plano_acesso = planos.codplano)\n"+
            "where\n"+
            "contrato.codcontrato = $3\n"+
          ") telefonia,\n"+
          "case\n"+
            "WHEN fatura.codfatura IS NULL THEN false\n"+
            "ELSE\n"+
              "EXISTS(\n"+
                "select\n"+
                  "trans.codtransacaocartao\n"+
                "from\n"+
                  "mk_transacoes_cartao_geradas trans\n"+
                "WHERE\n"+
                  "trans.cd_fatura = fatura.codfatura\n"+
                  "AND trans.excluida = 'N'\n"+
                  "AND trans.dh::date >= tb.data\n"+
              ")\n"+
          "END recorrente\n"+
          "FROM\n"+
          "(\n"+
            "SELECT\n"+
              "tabela.codpessoa,\n"+
              "tabela.data,\n"+
              "tabela.operacao,\n"+
              "tabela.cod_plano_velho,\n"+
              "tabela.cod_plano_novo,\n"+
              "CASE\n"+
                "WHEN tabela.codfatura IS NOT NULL THEN tabela.codfatura\n"+
                "ELSE (\n"+
                  "select\n"+
                    "MIN(fatura.codfatura) fatura\n"+
                  "from\n"+
                    "mk_faturas fatura\n"+
                  "where\n"+
                    "fatura.cd_pessoa = tabela.codpessoa AND\n"+
                    "fatura.tipo = 'R' AND\n"+
                    "fatura.excluida = 'N' AND\n"+
                    "fatura.suspenso = 'N' and\n"+
                    "fatura.data_vencimento = (\n"+
                      "select\n"+
                        "MIN(faturas.data_vencimento)\n"+
                      "from\n"+
                        "mk_faturas faturas\n"+
                      "where\n"+
                        "faturas.cd_pessoa = fatura.cd_pessoa AND\n"+
                        "faturas.data_vencimento >= tabela.data and\n"+
                        "faturas.tipo = 'R' AND\n"+
                        "faturas.excluida = 'N' AND\n"+
                        "faturas.suspenso = 'N'\n"+
                    ")\n"+
                ")\n"+
              "END fatura\n"+
            "FROM\n"+
              "(\n"+
                "SELECT\n"+
                  "cliente.codpessoa,\n"+
                  "DATE($2) \"data\",\n"+
                  "$4 operacao,\n"+
                  "$5 cod_plano_velho,\n"+
                  "$6 cod_plano_novo,\n"+
                  "(\n"+
                    "select\n"+
                    "fatura.codfatura\n"+
                    "from\n"+
                    "mk_faturas fatura\n"+
                    "where\n"+
                    "fatura.cd_pessoa = cliente.codpessoa AND\n"+
                    "fatura.tipo = 'R' AND\n"+
                    "fatura.excluida = 'N' AND\n"+
                    "fatura.suspenso = 'N' and\n"+
                    "fatura.codfatura = $7\n"+
                  ")\n"+
                "from\n"+
                  "mk_pessoas cliente\n"+
                "WHERE\n"+
                  "cliente.codpessoa = $1\n"+
              ")tabela\n"+
          ")tb\n"+
          "INNER JOIN mk_faturas fatura ON (fatura.codfatura = tb.fatura)\n"+
          "WHERE\n"+
          "fatura.liquidado = 'S'";
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
          "update\n"+
            "clients\n"+
          "set\n"+
            "invoice = case\n"+
                            "when invoice != $4 then $4\n"+
                            "else invoice\n"+
            "end,\n"+
            "paid = true,\n"+
            "tv = $5,\n"+
            "telephony = $6,\n"+
            "recurring_payment = $7\n"+
          "where\n"+
            "codclient = $1 and\n"+
            "operation = $2 and\n"+
            "\"date\" = date($3)";
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