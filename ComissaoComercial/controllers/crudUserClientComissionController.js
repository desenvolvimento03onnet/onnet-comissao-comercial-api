const crudUserClientComission = require('../models/CRUDUserClientComissionModel'); // Importe o modelo

const crudUserClientComissionController = {
  insertNewUserClientComission: async (req, res) => {
    const { id_user, id_client, id_comission } = req.body;
    try {
      const insertUserClientComission = await crudUserClientComission.insertNewUserClientComission(id_user, id_client, id_comission);
      res.status(200).json(insertUserClientComission);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao Inserir Usuário. '+error });
    }
  },
  selectUserClientComission: async (req, res) => {
    const { campo } = req.body;
    try {
      const selectUserClientComission = await crudUserClientComission.selectUserClientComission(campo);
      res.status(200).json(selectUserClientComission);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar Usuário. '+error });
    }
  },
  selectAllUserClientComission: async (req, res) => {
    const {  } = req.body;
    try {
      const selectAllUserClientComission = await crudUserClientComission.selectAllUserClientComission();
      res.status(200).json(selectAllUserClientComission);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar os Usuário. '+error });
    }
  },
  updateUserClientComission: async (req, res) => {
    const { campo, valor, id_user, id_client, id_comission } = req.body;
    try {
      const updateUserClientComission = await crudUserClientComission.updateUserClientComission(campo, valor, id_user, id_client, id_comission);
      res.status(200).json(updateUserClientComission);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar Usuário. '+error });
    }
  },
  deleteUserClientComission: async (req, res) => {
    const { campo, valor } = req.body;
    try {
      const deleteUserClientComission = await crudUserClientComission.deleteUserClientComission(campo, valor);
      res.status(200).json(deleteUserClientComission);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar Usuário. '+error });
    }
  }
};
 
module.exports = crudUserClientComissionController;