const dbComissao = require('../../config/dbComissaoComercial.js');

const CreateSellChart = {
  CreateAllUserChart: async (user) => {
    try {
      const query = 
      "select distinct\n"+
      "cli.operation,\n"+
      "cli.\"date\",\n"+
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
      "cli.operation,\n"+
      "cli.\"date\",\n"+
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
      "cli.operation,\n"+
      "cli.\"date\",\n"+
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
      "cli.\"date\",\n"+
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
      "cli.\"date\",\n"+
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
      "cli.\"date\",\n"+
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
      "cli.\"date\",\n"+
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
      "cli.\"date\",\n"+
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
      "cli.\"date\",\n"+
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
  },
  CreateUserComissionChart: async (user) => {
    try {
      const query = 
      "SELECT DISTINCT\n"+
      "comi.comission,\n"+
      "usu.id id_user,\n"+
      "cli.id id_client,\n"+
      "cli.\"date\",\n"+
      "--LEFT(REPLACE(comi.value, 'valor_plano', cli.plan_value||''), POSITION(' ' IN (REPLACE(comi.value, 'valor_plano', cli.plan_value||'')))-1)\n"+
      "--right(REPLACE(comi.value, 'valor_plano', cli.plan_value||''), POSITION(' ' IN (REPLACE(comi.value, 'valor_plano', cli.plan_value||'')))-1)\n"+
      "--SUBSTRING(REPLACE(comi.value, 'valor_plano', cli.plan_value||''), POSITION(' ' IN (REPLACE(comi.value, 'valor_plano', cli.plan_value||'')))+1,1)\n"+
      "-- CASE\n"+
      "-- 	WHEN comi.comission = 'Venda' THEN REPLACE(comi.value, 'valor_plano', cli.plan_value||'')\n"+
      "-- 	WHEN comi.comission = 'Renovação' THEN comi.value\n"+
      "-- 	WHEN comi.comission = 'Upgrade' THEN replace(REPLACE(comi.value, 'novo_plano_valor', cli.new_plan_value||''),'velho_plano_valor', cli.old_plan_value||'')\n"+
      "-- 	ELSE comi.value\n"+
      "-- end value\n"+
      "CASE\n"+
        "when position('valor_plano' in comi.value) != 0 THEN REPLACE(comi.value, 'valor_plano', cli.plan_value||'')\n"+
        "when position('novo_plano_valor' in comi.value) != 0 THEN\n"+
          "case\n"+
            "WHEN position('velho_plano_valor' in comi.value) != 0 THEN REPLACE(REPLACE(comi.value, 'novo_plano_valor', cli.new_plan_value||''), 'velho_plano_valor', cli.old_plan_value||'')\n"+
            "ELSE REPLACE(comi.value, 'novo_plano_valor', cli.new_plan_value||'')\n"+
          "end\n"+
        "when position('velho_plano_valor' in comi.value) != 0 THEN \n"+
          "case\n"+
            "WHEN position('novo_plano_valor' in comi.value) != 0 THEN REPLACE(REPLACE(comi.value, 'velho_plano_valor', cli.old_plan_value||''), 'novo_plano_valor', cli.new_plan_value||'')\n"+
            "ELSE REPLACE(comi.value, 'velho_plano_valor', cli.old_plan_value||'')\n"+
          "end\n"+
        "ELSE comi.value\n"+
      "END value\n"+
      "FROM\n"+
      "users usu\n"+
      "INNER JOIN clients cli ON (cli.operator = usu.user)\n"+
      "INNER JOIN comissions comi ON (comi.comission = cli.operation)\n"+
      "INNER JOIN users_sectors ususe ON (ususe.id_user = usu.id)\n"+
      "INNER JOIN sectors se ON (se.id = comi.id_sector AND se.id = ususe.id_sector)\n"+
      "WHERE\n"+
      "usu.active IS TRUE AND\n"+
      "usu.user = $1\n"+
      "ORDER BY 1";
      const values = [user];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  }
};
 
module.exports = CreateSellChart;