const crudPermissionCity = require('../models/CRUDPermissionCityModel'); // Importe o modelo

const crudPermissionCityController = {
  insertNewPermissionCity: async (req, res) => {
    const { id_permission_level, id_city } = req.body;
    try {
      const insertPermissionCity = await crudPermissionCity.insertNewPermissionCity(id_permission_level, id_city);
      res.status(200).json(insertPermissionCity);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao Inserir Usuário. '+error });
    }
  },
  selectPermissionCity: async (req, res) => {
    const { campo } = req.body;
    try {
      const selectPermissionCity = await crudPermissionCity.selectPermissionCity(campo);
      res.status(200).json(selectPermissionCity);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar Usuário. '+error });
    }
  },
  selectAllPermissionCity: async (req, res) => {
    const {  } = req.body;
    try {
      const selectAllPermissionCity = await crudPermissionCity.selectAllPermissionCity();
      res.status(200).json(selectAllPermissionCity);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar os Usuário. '+error });
    }
  },
  updatePermissionCity: async (req, res) => {
    const { campo, valor, id_permission_level, id_city } = req.body;
    try {
      const updatePermissionCity = await crudPermissionCity.updatePermissionCity(campo, valor, id_permission_level, id_city);
      res.status(200).json(updatePermissionCity);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar Usuário. '+error });
    }
  },
  deletePermissionCity: async (req, res) => {
    const {  } = req.body;
    try {
      const deletePermissionCity = await crudPermissionCity.deletePermissionCity(campo, valor);
      res.status(200).json(deletePermissionCity);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar Usuário. '+error });
    }
  }
};
 
module.exports = crudPermissionCityController;