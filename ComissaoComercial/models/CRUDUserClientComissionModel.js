const dbComissao = require('../../config/dbComissaoComercial.js');

const CrudUserClientComission = {
  insertNewUserClientComission: async (id_user, id_client, comission_value, created_at) => {
    try {
      const query = 
      `insert into
      users_clients_comissions
      (id_user, id_client, comission_value, created_at)
      VALUES
      ($1, $2, $3, $4)`;
      const values = [id_user, id_client, comission_value, created_at];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  selectUserClientComission: async (campo) => {
    try {
      const query = 
      `select distinct
      *
      from users_clients_comissions ucc
      where
      ucc.id_user = $1 or
      ucc.id_client = $1 or
      ucc.id_comission = $1`;
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
      `select
      *
      from users_clients_comissions ucc`;
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
      `update users_clients_comissions
      set
      $1 = $2
      where
      id_user = $3 or
      id_client = $4 or
      id_comission = $5`;
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
      `delete from
      users_clients_comissions
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
 
module.exports = CrudUserClientComission;