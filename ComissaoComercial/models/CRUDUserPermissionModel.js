const dbComissao = require('../../config/dbComissaoComercial.js');

const CrudUserPermission = {
  insertNewUserPermission: async (id_user, id_permission_level) => {
    try {
      const query = 
      `insert into
      users_permissions
      (id_user, id_permission_level)
      VALUES
      ($1, $2)`;
      const values = [id_user, id_permission_level];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  selectUserPermission: async (user, password) => {
    try {
      const query = 
      `SELECT DISTINCT
      usu.id,
      usu.user,
      usu.password,
      usu.name,
      usu.active,
      pe."level",
      pe.description
      FROM
      users_permissions usupe
      INNER JOIN users usu ON (usu.id = usupe.id_user)
      INNER JOIN permission_level pe ON (pe.id = usupe.id_permission_level)
      WHERE
      usu.user = $1 and
      usu.password = $2 and
      usu."active" is true`;
      const values = [user, password];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  selectAllUserPermission: async () => {
    try {
      const query = 
      `select
      *
      from users_permissions up`;
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
      `update users_permissions
      set
      $1 = $2
      where
      id_user = $3 or
      id_permission_level = $4`;
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
      `delete from
      users_permissions
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
 
module.exports = CrudUserPermission;