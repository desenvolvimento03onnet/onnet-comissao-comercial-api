const crudUserLogs = require('../models/CRUDUserLogsModel'); // Importe o modelo

const crudUserLogsController = {
  insertNewUserLogs: async (req, res) => {
    const { date, type, id_user, description } = req.query;
    try {
      const insertUserLogs = await crudUserLogs.insertNewUserLogs(date, type, id_user, description);
      res.status(200).json(insertUserLogs);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao Inserir Usuários Logs. '+error });
    }
  },
  selectUserLogs: async (req, res) => {
    const { id_user } = req.body;
    try {
      const selectUserLogs = await crudUserLogs.selectUserLogs(id_user);
      res.status(200).json(selectUserLogs);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar Usuários Logs. '+error });
    }
  },
  selectAllUserLogs: async (req, res) => {
    const {  } = req.body;
    try {
      const selectAllUserLogs = await crudUserLogs.selectAllUserLogs();
      res.status(200).json(selectAllUserLogs);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar os Usuários Logs. '+error });
    }
  },
  updateUserLogs: async (req, res) => {
    const { campo, valor, id_user } = req.body;
    try {
      const updateUserLogs = await crudUserLogs.updateUserLogs(campo, valor, id_user);
      res.status(200).json(updateUserLogs);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar Usuários Logs. '+error });
    }
  },
  deleteUserLogs: async (req, res) => {
    const { campo, valor } = req.body;
    try {
      const deleteUserLogs = await crudUserLogs.deleteUserLogs(campo, valor);
      res.status(200).json(deleteUserLogs);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar Usuários Logs. '+error });
    }
  }
};
 
module.exports = crudUserLogsController;