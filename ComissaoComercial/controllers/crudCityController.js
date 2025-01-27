const crudCity = require('../models/CRUDCityModel'); // Importe o modelo

const crudCityController = {
  insertNewCity: async (req, res) => {
    const { name, uf } = req.body;
    try {
      const insertCity = await crudCity.insertNewCity(name, uf);
      res.status(200).json(insertCity);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao Inserir Cidade. '+error });
    }
  },
  selectCity: async (req, res) => {
    const { name } = req.body;
    try {
      const selectCity = await crudCity.selectCity(name);
      res.status(200).json(selectCity);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar Cidade. '+error });
    }
  },
  selectAllCity: async (req, res) => {
    const {  } = req.body;
    try {
      const selectAllCity = await crudCity.selectAllCity();
      res.status(200).json(selectAllCity);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar as Cidades. '+error });
    }
  },
  updateCity: async (req, res) => {
    const { campo, valor, name } = req.body;
    try {
      const updateCity = await crudCity.updateCity(campo, valor, name);
      res.status(200).json(updateCity);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar Cidade. '+error });
    }
  },
  deleteCity: async (req, res) => {
    const { campo, valor } = req.body;
    try {
      const deleteCity = await crudCity.deleteCity(campo, valor);
      res.status(200).json(deleteCity);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar Cidade. '+error });
    }
  }
};
 
module.exports = crudCityController;