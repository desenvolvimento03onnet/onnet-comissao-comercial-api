const dbComissao = require('../../config/dbComissaoComercial.js');

const CrudPermissionLevel = {
  insertNewPermissionLevel: async (level, description, active) => {
    try {
      const query = 
      `insert into
      permission_level
      (level, description, "active")
      VALUES
      ($1, $2, $3)`;
      const values = [level, description, active];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  selectPermissionLevel: async (level, description) => {
    try {
      const query = 
      `select distinct
      *
      from permission_level p
      where
      p."level" in ($1) or
      p.description ilike %$2%`;
      const values = [level, description];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  selectAllPermissionLevel: async () => {
    try {
      const query = 
      `select
      *
      from permission_level p`;
      const result = await dbComissao.query(query);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  updatePermissionLevel: async (campo, valor, level, description) => {
    let valorV = valor+",";
    try {
      const query = 
      `update permission_level
      set
      $1 = $2
      where
      "level" in ($3) or
      description ilike %$4%`;
      const values = [campo, valorV, level, description];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  deletePermissionLevel: async (campo, valor) => {
    let valorV = valor+" and";
    try {
      const query = 
      `delete from
      permission_level
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
 
module.exports = CrudPermissionLevel;