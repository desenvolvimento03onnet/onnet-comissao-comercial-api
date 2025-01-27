const dbComissao = require('../../config/dbComissaoComercial.js');

const CrudSector = {
  insertNewSector: async (active, name) => {
    try {
      const query = 
      "insert into\n"+
      "sectors\n"+
      "(\"active\", \"name\")\n"+
      "VALUES\n"+
      "($1, $2)";
      const values = [active, name];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  selectSector: async (name) => {
    try {
      const query = 
      "select distinct\n"+
      "*\n"+
      "from sectors se\n"+
      "where\n"+
      "se.\"name\" ilike '%$1%'";
      const values = [name];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  selectAllSector: async () => {
    try {
      const query = 
      "select\n"+
      "*\n"+
      "from sectors se";
      const result = await dbComissao.query(query);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  updateSector: async (campo, valor, name) => {
    let valorV = valor+",";
    try {
      const query = 
      "update sectors\n"+
      "set\n"+
      "$1 = $2\n"+
      "where\n"+
      "\"comission\" ilike '%$3%'";
      const values = [campo, valorV, name];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  deleteSector: async (campo, valor) => {
    let valorV = valor+" and";
    try {
      const query = 
      "delete from\n"+
      "sectors\n"+
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
 
module.exports = CrudSector;