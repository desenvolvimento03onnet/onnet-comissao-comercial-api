const dbComissao = require('../../config/dbComissaoComercial.js');

const CrudComissao = {
  insertNewComission: async (active, comission, value, id_sector) => {
    try {
      const query = 
      `insert into
      comissions
      ("active", comission, value, id_sector)
      VALUES
      ($1, $2, $3, $4)`;
      const values = [active, comission, value, id_sector];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  selectComission: async (comission) => {
    try {
      const query = 
      `select distinct
      *
      from comissions c
      where
      c.comission ilike %$1%`;
      const values = [comission];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  selectAllComission: async () => {
    try {
      const query = 
      `select
      *
      from comissions c`;
      const result = await dbComissao.query(query);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  updateComission: async (campo, valor, comission) => {
    let valorV = valor+",";
    try {
      const query = 
      `update comissions
      set
      $1 = $2
      where
      "comission" ilike %$3%`;
      const values = [campo, valorV, comission];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  deleteComission: async (campo, valor) => {
    let valorV = valor+" and";
    try {
      const query = 
      `delete from
      comissions
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
 
module.exports = CrudComissao;