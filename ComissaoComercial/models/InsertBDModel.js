const dbComissao = require('../../config/dbComissaoComercial.js');
const modelOperation = require('../../MK/models/OperationModel.js');

let resultados = [];

const Insert = {
  validaBD: async () => {
    let valores = [];
    try {
      const query1 =
      "select\n"+
        "codclient,\n"+
        "city,\n"+
        "contract,\n"+
        "\"date\",\n"+
        "operation,\n"+
        "codplan,\n"+
        "operator\n"+
      "from clients";
      const result1 = await dbComissao.query(query1);
      valores = [result1.rows];
      var recebe = [await modelOperation.getAllOperations()];
      // const operacoes = ['Renovação, Upgrade, Downgrade'];
      // const operacoes1 = ['Venda, Renovação, Upgrade, Downgrade'];
      const resultado = recebe[0].filter(itemA => {
        if(valores[0].some(itemB => itemB.codclient === itemA.codigo && itemB.contract !== itemA.contrato)){
          return valores[0].some(itemB => itemB.codclient === itemA.codigo && itemB.contract !== itemA.contrato);
        }
        // else if(valores[0].some(itemB => itemB.codclient === itemA.codigo && itemB.contract === itemA.contrato && itemB.date.toString() !== itemA.data.toString())){
        //   return valores[0].some(itemB => itemB.codclient === itemA.codigo && itemB.contract === itemA.contrato && itemB.date.toString() !== itemA.data.toString());
        // }
        // if(valores[0].some(itemB => itemB.codclient === itemA.codigo && itemB.contract === itemA.contrato && itemB.date.toString() === itemA.data.toString() && itemB.operation !== itemA.operacao && operacoes1.includes(itemB.operation) && operacoes.includes(itemA.operacao))){
        //   return valores[0].some(itemB => itemB.codclient === itemA.codigo && itemB.contract === itemA.contrato && itemB.date.toString() === itemA.data.toString() && itemB.operation !== itemA.operacao && operacoes1.includes(itemB.operation) && operacoes.includes(itemA.operacao));
        // }
        if(valores[0].some(itemB => itemB.codclient === itemA.codigo && itemB.contract === itemA.contrato && itemB.date.toString() === itemA.data.toString() && itemB.operation === itemA.operacao && itemB.operator !== itemA.operador)){
          return valores[0].some(itemB => itemB.codclient === itemA.codigo && itemB.contract === itemA.contrato && itemB.date.toString() === itemA.data.toString() && itemB.operation === itemA.operacao && itemB.operator !== itemA.operador);
        }
        else{
          return !valores[0].some(itemB => itemB.codclient === itemA.codigo);
        }
      });
    resultados = [resultado];
    return resultado;
    } catch (error) {
     throw error;
    }
  },
  insertDB: async () => {
    var resultado = await Promise.all(
      resultados[0].map(async (origem) => {
        try {
          const query = 
          "insert into\n"+
          "clients\n"+
          "(codclient, \"name\", city, contract, \"date\", operation, codplan, plan, plan_value, cod_old_plan, old_plan, old_plan_value, cod_new_plan, new_plan, new_plan_value, \"operator\", city_operator, recurring_payment, tv, telephony, invoice, paid, due_date)\n"+
          "VALUES\n"+
          "($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)";
          const values = [origem.codigo, origem.cliente, origem.cidade, origem.contrato, origem.data, origem.operacao, origem.codplano, origem.plano, origem.valor_plano, origem.cod_velho_plano, origem.velho_plano, origem.velho_plano_valor, origem.cod_novo_plano, origem.novo_plano, origem.novo_plano_valor, origem.operador, origem.cidadeope, origem.recorrente, origem.tv, origem.telefonia, origem.fatura, origem.pago, origem.vencimento];
          const result = await dbComissao.query(query, values);
          return result.rows;
        } catch (error) {
         throw error;
        }
      })
    );
    return resultado;
  }
};
 
module.exports = Insert;