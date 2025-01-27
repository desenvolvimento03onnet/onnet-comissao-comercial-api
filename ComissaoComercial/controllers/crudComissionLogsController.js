const crudComissionLogs = require('../models/CRUDComissionLogsModel'); // Importe o modelo

const crudComissionLogsController = {
  insertNewComissionLogs: async (req, res) => {
    const { date, id_comission, id_user, description } = req.body;
    try {
      const insertComissionLogs = await crudComissionLogs.insertNewComissionLogs(date, id_comission, id_user, description);
      res.status(200).json(insertComissionLogs);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao Inserir Logs de Comissões. '+error });
    }
  },
  selectComissionLogs: async (req, res) => {
    const { id_comission, id_user } = req.body;
    try {
      const selectComissionLogs = await crudComissionLogs.selectComissionLogs(id_comission, id_user);
      res.status(200).json(selectComissionLogs);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar Logs de Comissões. '+error });
    }
  },
  selectAllComissionLogs: async (req, res) => {
    const {  } = req.body;
    try {
      const selectAllComissionLogs = await crudComissionLogs.selectAllComissionLogs();
      res.status(200).json(selectAllComissionLogs);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar os Logs de Comissões. '+error });
    }
  },
  updateComissionLogs: async (req, res) => {
    const { campo, valor, id_comission, id_user } = req.body;
    try {
      const updateComissionLogs = await crudComissionLogs.updateComissionLogs(campo, valor, id_comission, id_user);
      res.status(200).json(updateComissionLogs);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar Logs de Comissões. '+error });
    }
  },
  deleteComissionLogs: async (req, res) => {
    const { campo, valor } = req.body;
    try {
      const deleteComissionLogs = await crudComissionLogs.deleteComissionLogs(campo, valor);
      res.status(200).json(deleteComissionLogs);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar Logs de Comissões. '+error });
    }
  }
};
 
module.exports = crudComissionLogsController;