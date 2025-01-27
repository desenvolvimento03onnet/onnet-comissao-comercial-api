const dbComissao = require('../../config/dbComissaoComercial.js');

const CrudCity = {
  insertNewCity: async (name, uf) => {
    try {
      const query = 
      "insert into\n"+
      "cities\n"+
      "(\"name\", uf)\n"+
      "VALUES\n"+
      "($1, $2)";
      const values = [name, uf];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  selectCity: async (name) => {
    try {
      const query = 
      "select distinct\n"+
      "*\n"+
      "from cities c\n"+
      "where\n"+
      "c.name ilike '%$1%'";
      const values = [name];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  selectAllCity: async () => {
    try {
      const query = 
      "select\n"+
      "*\n"+
      "from cities c";
      const result = await dbComissao.query(query);
      console.log(Buffer.from("Hello World").toString('base64'));
      console.log(Buffer.from("SGVsbG8gV29ybGQ=", 'base64').toString('ascii'));
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  updateCity: async (campo, valor, name) => {
    let valorV = valor+",";
    try {
      const query = 
      "update cities\n"+
      "set\n"+
      "$1 = $2\n"+
      "where\n"+
      "\"name\" = $3";
      const values = [campo, valorV, name];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  deleteCity: async (campo, valor) => {
    let valorV = valor+" and";
    try {
      const query = 
      "delete from\n"+
      "cities\n"+
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
 
module.exports = CrudCity;