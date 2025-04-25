const dbComissao = require('../../config/dbComissaoComercial.js');


const CrudUserSector = {
  insertNewUserSector: async (id_user, id_sector) => {
    try {
      const query = 
      `insert into
      users_sectors
      (id_user, id_sector)
      VALUES
      ($1, $2)`;
      const values = [id_user, id_sector];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  selectUserSector: async (user) => {
    try {
      const query = 
      `SELECT DISTINCT
      usu.user,
      se.name sector
      FROM
      users_sectors usuSe
      INNER JOIN users usu ON (usu.id = usuSe.id_user)
      INNER JOIN sectors se ON (se.id = usuSe.id_sector)
      WHERE
      usu.user = $1`;
      const values = [user];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  selectAllUserSector: async () => {
    try {
      const query = 
      `select
      *
      from users_sectors u`;
      const result = await dbComissao.query(query);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  updateUserSector: async (campo, valor, user) => {
    let valorV = valor+",";
    try {
      const query = 
      `update users_sectors
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
  deleteUserSector: async (campo, valor) => {
    let valorV = valor+" and";
    try {
      const query = 
      `delete from
      users_sectors
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
 
module.exports = CrudUserSector;