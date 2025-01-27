const dbComissao = require('../../config/dbComissaoComercial.js');


const CrudUser = {
  insertNewUser: async (user, name, password, created_at, id_city, id_sector) => {
    try {
      const query = 
      "insert into\n"+
      "users\n"+
      "(\"user\", name, password, \"created_at\", id_city, id_sector)\n"+
      "VALUES\n"+
      "($1, $2, $3, $4, $5, $6)";
      const values = [user, name, password, created_at, id_city, id_sector];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  selectUser: async (user) => {
    var usuario = '%' + user + '%';
    try {
      const query = 
      "select distinct\n"+
      "\"name\",\n"+
      "\"password\",\n"+
      "created_at,\n"+
      "id_city,\n"+
      "id_sector\n"+
      "from users u\n"+
      "where\n"+
      "u.\"user\" ilike $1";
      const values = [usuario];
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