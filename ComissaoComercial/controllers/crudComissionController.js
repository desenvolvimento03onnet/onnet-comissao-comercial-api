const crudComisson = require('../models/CRUDComissionModel'); // Importe o modelo

const crudComissionController = {
  insertNewComission: async (req, res) => {
    const { active, comission, value } = req.body;
    try {
      const insertComission = await crudComisson.insertNewComission(active, comission, value);
      res.status(200).json(insertComission);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao Inserir Comissão. '+error });
    }
  },
  selectComission: async (req, res) => {
    const { comission } = req.body;
    try {
      const selectComission = await crudComisson.selectComission(comission);
      res.status(200).json(selectComission);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar Comissão. '+error });
    }
  },
  selectAllComission: async (req, res) => {
    const {  } = req.body;
    try {
      const selectAllComission = await crudComisson.selectAllComission();
      res.status(200).json(selectAllComission);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar os Comissões. '+error });
    }
  },
  updateComission: async (req, res) => {
    const { campo, valor, comission } = req.body;
    try {
      const updateComission = await crudComisson.updateComission(campo, valor, comission);
      res.status(200).json(updateComission);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar Comissão. '+error });
    }
  },
  deleteComission: async (req, res) => {
    const { campo, valor } = req.body;
    try {
      const deleteComission = await crudComisson.deleteComission(campo, valor);
      res.status(200).json(deleteComission);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar Comissão. '+error });
    }
  }
};
 
module.exports = crudComissionController;