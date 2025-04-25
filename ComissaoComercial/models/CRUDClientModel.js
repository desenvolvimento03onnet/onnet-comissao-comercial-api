const dbComissao = require('../../config/dbComissaoComercial.js');

const CrudClient = {
  insertNewClient: async (codclient, name, city, contract, date, operation, codplan, plan, plan_value, cod_old_plan, old_plan, old_plan_value, cod_new_plan, new_plan, new_plan_value, recurring_payment, tv, telephony, invoice, paid, operator, city_operator, due_date) => {
    try {
      const query = 
      `insert into
      clients
      (codclient, \"name\", city, contract, \"date\", operation, codplan, plan, plan_value, cod_old_plan, old_plan, old_plan_value, cod_new_plan, new_plan, new_plan_value, \"operator\", city_operator, recurring_payment, tv, telephony, invoice, paid, due_date)
      VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)`;
      const values = [codclient, name, city, contract, date, operation, codplan, plan, plan_value, cod_old_plan, old_plan, old_plan_value, cod_new_plan, new_plan, new_plan_value, recurring_payment, tv, telephony, invoice, paid, operator, city_operator, due_date];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  selectClient: async (codclient, contract) => {
    try {
      const query = 
      `select distinct
      *
      from clients cli
      where
      u."codclient" in ($1) or
      u."contract" in ($2)`;
      const values = [codclient, contract];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  selectAllClient: async () => {
    try {
      const query = 
      `select
      *
      from clients cli`;
      const result = await dbComissao.query(query);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  updateClient: async (campo, valor, codclient) => {
    let valorV = valor+",";
    try {
      const query = 
      `update clients
      set
      $1 = $2
      where
      codclient = $3`;
      const values = [campo, valorV, codclient];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  deleteClient: async (campo, valor) => {
    let valorV = valor+" and";
    try {
      const query = 
      `delete from
      clients
      where
      $1 = $2`;
      const values = [campo, valorV];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  }
};
 
module.exports = CrudClient;