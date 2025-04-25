const dbComissao = require('../../config/dbComissaoComercial.js');

const CrudCity = {
  insertNewCity: async (name, uf) => {
    try {
      const query = 
      `insert into
      cities
      ("name", uf)
      VALUES
      ($1, $2)`;
      const values = [name, uf];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  selectCity: async (name) => {
    try {
      const query = 
      `select distinct
      *
      from cities c
      where
      c.name ilike %$1%`;
      const values = [name];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  selectAllCity: async () => {
    try {
      const query = 
      `select
      *
      from cities c`;
      const result = await dbComissao.query(query);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  updateCity: async (campo, valor, name) => {
    let valorV = valor+",";
    try {
      const query = 
      `update cities
      set
      $1 = $2
      where
      "name" = $3`;
      const values = [campo, valorV, name];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  deleteCity: async (campo, valor) => {
    let valorV = valor+" and";
    try {
      const query = 
      `delete from
      cities
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
 
module.exports = CrudCity;