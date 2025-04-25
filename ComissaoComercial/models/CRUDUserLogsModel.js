const dbComissao = require('../../config/dbComissaoComercial.js');

const CrudUserLogs = {
  insertNewUserLogs: async (date, type, id_user, description) => {
    try {
      const query = 
      `insert into
      users_logs
      ("date", "type", id_user, description)
      VALUES
      ($1, $2, $3, $4)`;
      const values = [date, type, id_user, description];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  selectUserLogs: async (id_user) => {
    try {
      const query = 
      `select distinct
      *
      from users_logs us
      where
      us.id_user = $1`;
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
      `select
      *
      from users_logs us`;
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
      `update users_logs
      set
      $1 = $2
      where
      "id_user" = $3`;
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
      `delete from
      users_logs
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
 
module.exports = CrudUserLogs;