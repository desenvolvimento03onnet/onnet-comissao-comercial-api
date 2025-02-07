const dbComissao = require('../../config/dbComissaoComercial.js');

const CrudComissao = {
  insertNewComission: async (active, comission, value, id_sector) => {
    try {
      const query = 
      "insert into\n"+
      "comissions\n"+
      "(\"active\", comission, value, id_sector)\n"+
      "VALUES\n"+
      "($1, $2, $3, $4)";
      const values = [active, comission, value, id_sector];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  selectComission: async (comission) => {
    try {
      const query = 
      "select distinct\n"+
      "*\n"+
      "from comissions c\n"+
      "where\n"+
      "c.comission ilike '%$1%'";
      const values = [comission];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  selectAllComission: async () => {
    try {
      const query = 
      "select\n"+
      "*\n"+
      "from comissions c";
      const result = await dbComissao.query(query);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  updateComission: async (campo, valor, comission) => {
    let valorV = valor+",";
    try {
      const query = 
      "update comissions\n"+
      "set\n"+
      "$1 = $2\n"+
      "where\n"+
      "\"comission\" ilike '%$3%'";
      const values = [campo, valorV, comission];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  deleteComission: async (campo, valor) => {
    let valorV = valor+" and";
    try {
      const query = 
      "delete from\n"+
      "comissions\n"+
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
 
module.exports = CrudComissao;