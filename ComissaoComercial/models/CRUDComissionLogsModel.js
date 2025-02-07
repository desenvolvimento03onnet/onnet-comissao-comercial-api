const dbComissao = require('../../config/dbComissaoComercial.js');

const CrudComissionLogs = {
  insertNewComissionLogs: async (date, id_comission, id_user, description) => {
    try {
      const query = 
      "insert into\n"+
      "comissions_logs\n"+
      "(\"date\", id_comission, id_user, description)\n"+
      "VALUES\n"+
      "($1, $2, $3, $4)";
      const values = [date, id_comission, id_user, description];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  selectComissionLogs: async (id_comission, id_user) => {
    try {
      const query = 
      "select distinct\n"+
      "*\n"+
      "from comissions_logs colo\n"+
      "where\n"+
      "colo.\"id_comission\" = $1 or\n"+
      "colo.\"id_user\" = $2";
      const values = [id_comission, id_user];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  selectAllComissionLogs: async () => {
    try {
      const query = 
      "select\n"+
      "*\n"+
      "from comissions_logs colo";
      const result = await dbComissao.query(query);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  updateComissionLogs: async (campo, valor, id_comission, id_user) => {
    let valorV = valor+",";
    try {
      const query = 
      "update comissions_logs\n"+
      "set\n"+
      "$1 = $2\n"+
      "where\n"+
      "\"id_comission\" ilike '%$3%'";
      const values = [campo, valorV, id_comission, id_user];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  deleteComissionLogs: async (campo, valor) => {
    let valorV = valor+" and";
    try {
      const query = 
      "delete from\n"+
      "comissions_logs\n"+
      "where\n"+
      "$1 = $2";
      const values = [campo, valorV];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  }
};
 
module.exports = CrudComissionLogs;