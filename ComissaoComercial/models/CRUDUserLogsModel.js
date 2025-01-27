const dbComissao = require('../../config/dbComissaoComercial.js');

const CrudUserLogs = {
  insertNewUserLogs: async (date, id_user, description) => {
    try {
      const query = 
      "insert into\n"+
      "users_logs\n"+
      "(\"date\", id_user, description)\n"+
      "VALUES\n"+
      "($1, $2, $3)";
      const values = [date, id_user, description];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  selectUserLogs: async (id_user) => {
    try {
      const query = 
      "select distinct\n"+
      "*\n"+
      "from users_logs us\n"+
      "where\n"+
      "us.id_user = $1";
      const values = [id_user];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  selectAllUserLogs: async () => {
    try {
      const query = 
      "select\n"+
      "*\n"+
      "from users_logs us";
      const result = await dbComissao.query(query);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  updateUserLogs: async (campo, valor, id_user) => {
    let valorV = valor+",";
    try {
      const query = 
      "update users_logs\n"+
      "set\n"+
      "$1 = $2\n"+
      "where\n"+
      "\"id_user\" = $3";
      const values = [campo, valorV, id_user];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  deleteUserLogs: async (campo, valor) => {
    let valorV = valor+" and";
    try {
      const query = 
      "delete from\n"+
      "users_logs\n"+
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
 
module.exports = CrudUserLogs;