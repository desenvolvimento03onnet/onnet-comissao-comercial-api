const dbComissao = require('../../config/dbComissaoComercial.js');

const CrudUserPermission = {
  insertNewUserPermission: async (id_user, id_permission_level) => {
    try {
      const query = 
      "insert into\n"+
      "users_permissions\n"+
      "(id_user, id_permission_level)\n"+
      "VALUES\n"+
      "($1, $2)";
      const values = [id_user, id_permission_level];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  selectUserPermission: async (campo) => {
    try {
      const query = 
      "select distinct\n"+
      "*\n"+
      "from users_permissions up\n"+
      "where\n"+
      "up.id_user = $1 or\n"+
      "up.id_permission_level = $1";
      const values = [campo];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  selectAllUserPermission: async () => {
    try {
      const query = 
      "select\n"+
      "*\n"+
      "from users_permissions up";
      const result = await dbComissao.query(query);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  updateUserPermission: async (campo, valor, id_user, id_permission_level) => {
    let valorV = valor+",";
    try {
      const query = 
      "update users_permissions\n"+
      "set\n"+
      "$1 = $2\n"+
      "where\n"+
      "id_user = $3 or\n"+
      "id_permission_level = $4";
      const values = [campo, valorV, id_user, id_permission_level];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  deleteUserPermission: async (campo, valor) => {
    let valorV = valor+" and";
    try {
      const query = 
      "delete from\n"+
      "users_permissions\n"+
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
 
module.exports = CrudUserPermission;