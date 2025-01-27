const crudPermissionLevel = require('../models/CRUDPermissionLevelModel'); // Importe o modelo

const crudPermissionLevelController = {
  insertNewPermissionLevel: async (req, res) => {
    const { level, description, active } = req.body;
    try {
      const insertPermissionLevel = await crudPermissionLevel.insertNewPermissionLevel(level, description, active);
      res.status(200).json(insertPermissionLevel);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao Inserir Usuário. '+error });
    }
  },
  selectPermissionLevel: async (req, res) => {
    const { level, description } = req.body;
    try {
      const selectPermissionLevel = await crudPermissionLevel.selectPermissionLevel(level, description);
      res.status(200).json(selectPermissionLevel);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar Usuário. '+error });
    }
  },
  selectAllPermissionLevel: async (req, res) => {
    const {  } = req.body;
    try {
      const selectAllPermissionLevel = await crudPermissionLevel.selectAllPermissionLevel();
      res.status(200).json(selectAllPermissionLevel);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar os Usuário. '+error });
    }
  },
  updatePermissionLevel: async (req, res) => {
    const { campo, valor, level, description } = req.body;
    try {
      const updatePermissionLevel = await crudPermissionLevel.updatePermissionLevel(campo, valor, level, description);
      res.status(200).json(updatePermissionLevel);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar Usuário. '+error });
    }
  },
  deletePermissionLevel: async (req, res) => {
    const { campo, valor } = req.body;
    try {
      const deletePermissionLevel = await crudPermissionLevel.deletePermissionLevel(campo, valor);
      res.status(200).json(deletePermissionLevel);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar Usuário. '+error });
    }
  }
};
 
module.exports = crudPermissionLevelController;