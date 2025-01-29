const InsertModel = require('../models/InsertBDModel.js'); // Importe o modelo

const insertDBController = {
  validaDB: async (req, res) => {
    const {  } = req.body;
    try {
      const valida = await InsertModel.validaBD();
      res.status(200).json(valida);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao inserir dados no Banco Comissões. '+error });
    }
  },
  insertDB: async (req, res) => {
    const {  } = req.body;
    try {
      const insert = await InsertModel.insertDB(await InsertModel.validaBD());
      res.status(200).json(insert);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao inserir dados no Banco Comissões. '+error });
    }
  }
};
 
module.exports = insertDBController;

