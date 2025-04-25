const dbComissao = require('../../config/dbComissaoComercial.js');

const CrudPermissionCity = {
  insertNewPermissionCity: async (id_permission_level, id_city) => {
    try {
      const query = 
      `insert into
      permission_cities
      (id_permission_level, id_city)
      VALUES
      ($1, $2)`;
      const values = [id_permission_level, id_city];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  selectPermissionCity: async (campo) => {
    try {
      const query = 
      `select distinct
      *
      from permission_cities pc
      where
      pc.id_permission_level = $1 or
      pc.id_city = $1`;
      const values = [campo];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  selectAllPermissionCity: async () => {
    try {
      const query = 
      `select
      *
      from permission_cities pc`;
      const result = await dbComissao.query(query);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  updatePermissionCity: async (campo, valor, id_permission_level, id_city) => {
    let valorV = valor+",";
    try {
      const query = 
      `update permission_cities
      set
      $1 = $2
      where
      id_permission_level = $3 and
      id_city = $4`;
      const values = [campo, valorV, id_permission_level, id_city];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  deletePermissionCity: async (campo, valor) => {
    let valorV = valor+" and";
    try {
      const query = 
      `delete from
      permission_cities
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
 
module.exports = CrudPermissionCity;