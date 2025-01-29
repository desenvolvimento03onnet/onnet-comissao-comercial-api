const dbComissao = require('../../config/dbComissaoComercial.js');


const CrudUser = {
  insertNewUser: async (user, name, password, created_at, id_city, id_sector, active) => {
    try {
      const query = 
      "insert into\n"+
      "users\n"+
      "(\"user\", name, password, \"created_at\", id_city, id_sector, active)\n"+
      "VALUES\n"+
      "($1, $2, $3, $4, $5, $6, $7)";
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
      "select distinct\n"+
      "u.\"name\",\n"+
      "u.\"password\",\n"+
      "u.created_at,\n"+
      "u.id_city,\n"+
      "u.id_sector,\n"+
      "u.active\n"+
      "from users u\n"+
      "where\n"+
      "u.\"user\" = $1 and\n"+
      "u.\"password\" = $2";
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
      "select\n"+
      "*\n"+
      "from users u";
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
      "update users\n"+
      "set\n"+
      "$1 = $2\n"+
      "where\n"+
      "\"user\" ilike '%$3%'";
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
      "delete from\n"+
      "users\n"+
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
 
module.exports = CrudUser;