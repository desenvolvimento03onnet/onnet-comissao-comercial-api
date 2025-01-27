const crudSector = require('../models/CRUDSectorModel'); // Importe o modelo

const crudSectorController = {
  insertNewSector: async (req, res) => {
    const { active, name } = req.body;
    try {
      const insertSector= await crudSector.insertNewSector(active, name);
      res.status(200).json(insertSector);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao Inserir Setor. '+error });
    }
  },
  selectSector: async (req, res) => {
    const { name } = req.body;
    try {
      const selectSector = await crudSector.selectSector(name);
      res.status(200).json(selectSector);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar Setor. '+error });
    }
  },
  selectAllSector: async (req, res) => {
    const {  } = req.body;
    try {
      const selectAllSector = await crudSector.selectAllSector();
      res.status(200).json(selectAllSector);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar os Setores. '+error });
    }
  },
  updateSector: async (req, res) => {
    const { active,name } = req.body;
    try {
      const updateSector = await crudSector.updateSector(active,name);
      res.status(200).json(updateSector);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar Setor. '+error });
    }
  },
  deleteSector: async (req, res) => {
    const { name } = req.body;
    try {
      const deleteSector = await crudSector.deleteSector(name);
      res.status(200).json(deleteSector);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar Setor. '+error });
    }
  }
};
 
module.exports = crudSectorController;