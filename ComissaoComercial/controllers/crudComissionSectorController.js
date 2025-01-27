const crudComissionSector = require('../models/CRUDComissionSectorModel'); // Importe o modelo

const crudComissionSectorController = {
  insertNewComissionSector: async (req, res) => {
    const { id_comission, id_sector } = req.body;
    try {
      const insertComissionSector = await crudComissionSector.insertNewUser(id_comission, id_sector);
      res.status(200).json(insertComissionSector);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao Inserir Comissão-Setor. '+error });
    }
  },
  selectComissionSector: async (req, res) => {
    const { campo } = req.body;
    try {
      const selectComissionSector = await crudUser.selectComissionSector(campo);
      res.status(200).json(selectComissionSector);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar Comissão-Setor. '+error });
    }
  },
  selectAllComissionSector: async (req, res) => {
    const {  } = req.body;
    try {
      const selectAllComissionSector = await crudComissionSector.selectAllUser();
      res.status(200).json(selectAllComissionSector);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar os Comissão-Setor. '+error });
    }
  },
  updateComissionSector: async (req, res) => {
    const { campo, valor, id_comission, id_sector } = req.body;
    try {
      const updateComissionSector= await crudUser.updateComissionSector(campo, valor, id_comission, id_sector);
      res.status(200).json(updateComissionSector);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar Comissão-Setor. '+error });
    }
  },
  deleteComissionSector: async (req, res) => {
    const { campo, valor } = req.body;
    try {
      const deleteComissionSector = await crudComissionSector.deleteComissionSector(campo, valor);
      res.status(200).json(deleteComissionSector);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar Comissão-Setor. '+error });
    }
  }
};
 
module.exports = crudComissionSectorController;