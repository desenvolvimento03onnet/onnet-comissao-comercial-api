const dbComissao = require('../../config/dbComissaoComercial.js');

const CrudSector = {
  insertNewSector: async (active, name) => {
    try {
      const query = 
      `insert into
      sectors
      ("active", "name")
      VALUES
      ($1, $2)`;
      const values = [active, name];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  selectSector: async (name) => {
    try {
      const query = 
      `select distinct
      *
      from sectors se
      where
      se."name" ilike %$1%`;
      const values = [name];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  selectAllSector: async () => {
    try {
      const query = 
      `select
      *
      from sectors se
      where
      se.id != 1`;
      const result = await dbComissao.query(query);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  updateSector: async (campo, valor, name) => {
    let valorV = valor+",";
    try {
      const query = 
      `update sectors
      set
      $1 = $2
      where
      "comission" ilike %$3%`;
      const values = [campo, valorV, name];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  deleteSector: async (campo, valor) => {
    let valorV = valor+" and";
    try {
      const query = 
      `delete from
      sectors
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
 
module.exports = CrudSector;