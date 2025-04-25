const dbComissao = require('../../config/dbComissaoComercial.js');

const CrudComissionLogs = {
  insertNewComissionLogs: async (date, id_comission, id_user, description) => {
    try {
      const query = 
      `insert into
      comissions_logs
      ("date", id_comission, id_user, description)
      VALUES
      ($1, $2, $3, $4)`;
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
      `select distinct
      *
      from comissions_logs colo
      where
      colo."id_comission" = $1 or
      colo."id_user" = $2`;
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
      `select
      *
      from comissions_logs colo`;
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
      `update comissions_logs
      set
      $1 = $2
      where
      "id_comission" ilike %$3%`;
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
      `delete from
      comissions_logs
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
 
module.exports = CrudComissionLogs;