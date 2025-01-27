const dbComissao = require('../../config/dbComissaoComercial.js');

const CrudUserClientComission = {
  insertNewUserClientComission: async (id_user, id_client, id_comission) => {
    try {
      const query = 
      "insert into\n"+
      "users_clients_comissions\n"+
      "(id_user, id_client, id_comission)\n"+
      "VALUES\n"+
      "($1, $2, $3)";
      const values = [id_user, id_client, id_comission];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  selectUserClientComission: async (campo) => {
    try {
      const query = 
      "select distinct\n"+
      "*\n"+
      "from users_clients_comissions ucc\n"+
      "where\n"+
      "ucc.id_user = $1 or\n"+
      "ucc.id_client = $1 or\n"+
      "ucc.id_comission = $1";
      const values = [campo];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  selectAllUserClientComission: async () => {
    try {
      const query = 
      "select\n"+
      "*\n"+
      "from users_clients_comissions ucc";
      const result = await dbComissao.query(query);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  updateUserClientComission: async (campo, valor, id_user, id_client, id_comission) => {
    let valorV = valor+",";
    try {
      const query = 
      "update users_clients_comissions\n"+
      "set\n"+
      "$1 = $2\n"+
      "where\n"+
      "id_user = $3 or\n"+
      "id_client = $4 or\n"+
      "id_comission = $5";
      const values = [campo, valorV, id_user, id_client, id_comission];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  deleteUserClientComission: async (campo, valor) => {
    let valorV = valor+" and";
    try {
      const query = 
      "delete from\n"+
      "users_clients_comissions\n"+
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
 
module.exports = CrudUserClientComission;