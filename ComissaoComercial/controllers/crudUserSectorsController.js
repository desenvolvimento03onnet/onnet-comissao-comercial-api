const crudUserSectors = require('../models/CRUDUserSectors'); // Importe o modelo

const crudUserSectorsController = {
  insertNewUserSector: async (req, res) => {
    const { id_user, id_sector } = req.body;
    try {
      const insertUserSector = await crudUserSectors.insertNewUserSector(id_user, id_sector);
      res.status(200).json(insertUserSector);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao Inserir Usuário. '+error });
    }
  },
  selectUserSector: async (req, res) => {
    const { user } = req.query;
    try {
      const selectUserSector = await crudUserSectors.selectUserSector(user);
      // var resultado = await Promise.all(
      //   selectUser.map(async(origem) => {
      //     return origem.password;
      //   })
      // );
      // console.log(resultado[0]);
      // console.log(buffer.from(resultado[0], 'base64').toString('ascii'));
      res.status(200).json(selectUserSector);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar Usuário. '+error });
    }
  },
  selectAllUserSector: async (req, res) => {
    const {  } = req.body;
    try {
      const selectAllUserSector = await crudUserSectors.selectAllUserSector();
      res.status(200).json(selectAllUserSector);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar os Usuários. '+error });
    }
  },
  updateUserSector: async (req, res) => {
    const {  } = req.body;
    try {
      const updateUserSector = await crudUserSectors.updateUserSector(campo, valor, user);
      res.status(200).json(updateUserSector);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar Usuário. '+error });
    }
  },
  deleteUserSector: async (req, res) => {
    const {  } = req.body;
    try {
      const deleteUserSector = await crudUserSectors.deleteUserSector(campo, valor);
      res.status(200).json(deleteUserSector);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar Usuário. '+error });
    }
  }
};
 
module.exports = crudUserSectorsController;