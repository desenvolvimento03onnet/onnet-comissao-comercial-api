const dbComissao = require('../../config/dbComissaoComercial.js');


const CrudUser = {
  insertNewUser: async (user, name, password, created_at, id_city, id_sector, active) => {
    try {
      const query = 
      `insert into
      users
      ("user", name, password, "created_at", id_city, id_sector, active)
      VALUES
      ($1, $2, $3, $4, $5, $6, $7)`;
      const values = [user, name, password, created_at, id_city, id_sector, active];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  selectUser: async (user, senha) => {
    try {
      const query = 
      `select distinct
        u.id,
        u.name,
        u.password,
        u.created_at,
        cidade.name city,
        u.active,
        STRING_AGG(cast(permissao.level AS VARCHAR(500)), ' ' ORDER BY permissao.level) permission_level,
        STRING_AGG(cast(permissao.description AS VARCHAR(500)), ' ' ORDER BY permissao.description) permission
        from users u
        INNER JOIN cities cidade ON (cidade.id = u.id_city)
        INNER JOIN users_permissions usuP ON (usuP.id_user = u.id)
        INNER JOIN permission_level permissao ON (permissao.id = usuP.id_permission_level)
        where
        u.user = $1 and
        u.password = $2
        GROUP BY 1,2,3,4,5,6`;
      const values = [user, senha];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  selectAllUser: async () => {
    try {
      const query = 
      `select
      *
      from users u`;
      const result = await dbComissao.query(query);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  updateUser: async (campo, valor, user) => {
    let valorV = valor+",";
    try {
      const query = 
      `update users
      set
      $1 = $2
      where
      "user" ilike %$3%`;
      const values = [campo, valorV, user];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  deleteUser: async (campo, valor) => {
    let valorV = valor+" and";
    try {
      const query = 
      `delete from
      users
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
 
module.exports = CrudUser;