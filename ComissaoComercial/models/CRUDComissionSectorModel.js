const dbComissao = require('../../config/dbComissaoComercial.js');

const CrudComissionSector = {
  insertNewComissionSector: async (id_comission, id_sector) => {
    try {
      const query = 
      "insert into\n"+
      "comissions_sectors\n"+
      "(id_comission, id_sector)\n"+
      "VALUES\n"+
      "($1, $2)";
      const values = [id_comission, id_sector];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  selectComissionSector: async (campo) => {
    var recebe = '%' + campo + '%';
    try {
      const query = 
      "select distinct\n"+
      "*\n"+
      "from comissions_sectors cs\n"+
      "where\n"+
      "cs.id_comission ilike $1 or\n"+
      "cs.id_sector ilike $1";
      const values = [recebe];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  selectAllComissionSector: async () => {
    try {
      const query = 
      "select\n"+
      "*\n"+
      "from comissions_sectors";
      const result = await dbComissao.query(query);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  updateComissionSector: async (campo, valor, id_comission, id_sector) => {
    let valorV = valor+",";
    try {
      const query = 
      "update comissions_sectors\n"+
      "set\n"+
      "$1 = $2\n"+
      "where\n"+
      "id_comission = $3 and\n"+
      "id_comission = $4";
      const values = [campo, valorV, id_comission, id_sector];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  deleteComissionSector: async (campo, valor) => {
    let valorV = valor+" and";
    try {
      const query = 
      "delete from\n"+
      "comissions_sectors\n"+
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
 
module.exports = CrudComissionSector;