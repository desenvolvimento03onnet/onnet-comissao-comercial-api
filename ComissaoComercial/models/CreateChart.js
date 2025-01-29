const dbComissao = require('../../config/dbComissaoComercial.js');

const CreateSellChart = {
  CreateAllUserChart: async (user) => {
    try {
      const query = 
      "select distinct\n"+
      "cli.operation,\n"+
      "cli.contract\n"+
      "from clients cli\n"+
      "where\n"+
      "cli.operator = $1";
      const values = [user];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  CreateSellUserChart: async (user) => {
    try {
      const query = 
      "select distinct\n"+
      "cli.contract\n"+
      "from clients cli\n"+
      "where\n"+
      "cli.operator = $1 and\n"+
      "cli.operation = 'Venda'";
      const values = [user];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  CreateRenewalUserChart: async (user) => {
    try {
      const query = 
      "select distinct\n"+
      "cli.contract\n"+
      "from clients cli\n"+
      "where\n"+
      "cli.operator = $1 and\n"+
      "cli.operation != 'Venda'";
      const values = [user];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  CreateCityUserChart: async (user) => {
    try {
      const query = 
      "select distinct\n"+
      "cli.city,\n"+
      "cli.contract\n"+
      "from clients cli\n"+
      "where\n"+
      "cli.operator = $1";
      const values = [user];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  CreateCitySellUserChart: async (user) => {
    try {
      const query = 
      "select distinct\n"+
      "cli.city,\n"+
      "cli.contract\n"+
      "from clients cli\n"+
      "where\n"+
      "cli.operator = $1 and\n"+
      "cli.operation = 'Venda'";
      const values = [user];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  CreateCityRenewalUserChart: async (user) => {
    try {
      const query = 
      "select distinct\n"+
      "cli.city,\n"+
      "cli.contract\n"+
      "from clients cli\n"+
      "where\n"+
      "cli.operator = $1 and\n"+
      "cli.operation != 'Venda'";
      const values = [user];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  CreateUserTable: async (user) => {
    try {
      const query = 
      "select distinct\n"+
      "cli.codclient,\n"+
      "cli.\"name\",\n"+
      "cli.city,\n"+
      "cli.contract,\n"+
      "cli.\"date\",\n"+
      "cli.operation,\n"+
      "cli.codplan,\n"+
      "cli.plan,\n"+
      "cli.plan_value,\n"+
      "cli.cod_old_plan,\n"+
      "cli.old_plan,\n"+
      "cli.old_plan_value,\n"+
      "cli.cod_new_plan,\n"+
      "cli.new_plan,\n"+
      "cli.new_plan_value,\n"+
      "cli.operator,\n"+
      "cli.city_operator,\n"+
      "cli.recurring_payment,\n"+
      "cli.tv,\n"+
      "cli.telephony,\n"+
      "cli.invoice,\n"+
      "cli.paid,\n"+
      "cli.due_date\n"+
      "from clients cli\n"+
      "where\n"+
      "cli.operator = $1\n"+
      "order by 3,6,5";
      const values = [user];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  CreateSectorAllChart: async (user) => {
    try {
      const query = 
      "select distinct\n"+
      "se.\"name\",\n"+
      "usu.\"user\",\n"+
      "cli.operation,\n"+
      "cli.contract\n"+
      "from\n"+
      "clients cli\n"+
      "inner join users usu on (usu.\"user\" = cli.\"operator\")\n"+
      "inner join users_permissions usuP on (usuP.id_user = usu.id)\n"+
      "inner join permission_level perm on (perm.id = usuP.id_permission_level)\n"+
      "inner join sectors se on (se.id = usu.id_sector)\n"+
      "where\n"+
      "perm.description not ilike '%Operador%' and\n"+
      "usu.\"user\" = $1";
      const values = [user];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  CreateSectorSellChart: async (user) => {
    try {
      const query = 
      "select distinct\n"+
      "se.\"name\",\n"+
      "usu.\"user\",\n"+
      "cli.operation,\n"+
      "cli.contract\n"+
      "from\n"+
      "clients cli\n"+
      "inner join users usu on (usu.\"user\" = cli.\"operator\")\n"+
      "inner join users_permissions usuP on (usuP.id_user = usu.id)\n"+
      "inner join permission_level perm on (perm.id = usuP.id_permission_level)\n"+
      "inner join sectors se on (se.id = usu.id_sector)\n"+
      "where\n"+
      "cli.operation = 'Venda' and\n"+
      "perm.description not ilike '%Operador%' and\n"+
      "usu.\"user\" = $1";
      const values = [user];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  CreateSectorRenewalChart: async (user) => {
    try {
      const query = 
      "select distinct\n"+
      "se.\"name\",\n"+
      "usu.\"user\",\n"+
      "cli.operation,\n"+
      "cli.contract\n"+
      "from\n"+
      "clients cli\n"+
      "inner join users usu on (usu.\"user\" = cli.\"operator\")\n"+
      "inner join users_permissions usuP on (usuP.id_user = usu.id)\n"+
      "inner join permission_level perm on (perm.id = usuP.id_permission_level)\n"+
      "inner join sectors se on (se.id = usu.id_sector)\n"+
      "where\n"+
      "cli.operation != 'Venda' and\n"+
      "perm.description not ilike '%Operador%' and\n"+
      "usu.\"user\" = $1";
      const values = [user];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  }
};
 
module.exports = CreateSellChart;