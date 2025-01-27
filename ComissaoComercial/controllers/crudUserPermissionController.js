const crudUserPermission = require('../models/CRUDUserPermissionModel'); // Importe o modelo

const crudUserPermissionController = {
  insertNewUserPermission: async (req, res) => {
    const { id_user, id_permission_level } = req.body;
    try {
      const insertUserPermission = await crudUserPermission.insertNewUserPermission(id_user, id_permission_level);
      res.status(200).json(insertUserPermission);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao Inserir Usuário. '+error });
    }
  },
  selectUserPermission: async (req, res) => {
    const { campo } = req.body;
    try {
      const selectUserPermission = await crudUserPermission.selectUserPermission(campo);
      res.status(200).json(selectUserPermission);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar Usuário. '+error });
    }
  },
  selectAllUserPermission: async (req, res) => {
    const {  } = req.body;
    try {
      const selectAllUserPermission = await crudUserPermission.selectAllUserPermission();
      res.status(200).json(selectAllUserPermission);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar os Usuário. '+error });
    }
  },
  updateUserPermission: async (req, res) => {
    const { campo, valor, id_user, id_permission_level } = req.body;
    try {
      const updateUserPermission = await crudUserPermission.updateUserPermission(campo, valor, id_user, id_permission_level);
      res.status(200).json(updateUserPermission);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar Usuário. '+error });
    }
  },
  deleteUserPermission: async (req, res) => {
    const { campo, valor } = req.body;
    try {
      const deleteUserPermission = await crudUserPermission.deleteUserPermission(campo, valor);
      res.status(200).json(deleteUserPermission);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar Usuário. '+error });
    }
  }
};
 
module.exports = crudUserPermissionController;