const dbComissao = require('../../config/dbComissaoComercial.js');

const CrudPermissionCity = {
  insertNewPermissionCity: async (id_permission_level, id_city) => {
    try {
      const query = 
      "insert into\n"+
      "permission_cities\n"+
      "(id_permission_level, id_city)\n"+
      "VALUES\n"+
      "($1, $2)";
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
      "select distinct\n"+
      "*\n"+
      "from permission_cities pc\n"+
      "where\n"+
      "pc.id_permission_level = $1 or\n"+
      "pc.id_city = $1";
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
      "select\n"+
      "*\n"+
      "from permission_cities pc";
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
      "update permission_cities\n"+
      "set\n"+
      "$1 = $2\n"+
      "where\n"+
      "id_permission_level = $3 and\n"+
      "id_city = $4";
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
      "delete from\n"+
      "permission_cities\n"+
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
 
module.exports = CrudPermissionCity;