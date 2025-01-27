const crudUser = require('../models/CRUDUserModel'); // Importe o modelo
var buffer = require('buffer/').Buffer;

const crudUserController = {
  insertNewUser: async (req, res) => {
    const { user, name, password, created_at, id_city, id_sector } = req.body;
    try {
      var pass = buffer.from(password).toString('base64');
      const insertUser = await crudUser.insertNewUser(user, name, pass, created_at, id_city, id_sector);
      res.status(200).json(insertUser);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao Inserir Usuário. '+error });
    }
  },
  selectUser: async (req, res) => {
    const { user } = req.body;
    try {
      const selectUser = await crudUser.selectUser(user);
      // var resultado = await Promise.all(
      //   selectUser.map(async(origem) => {
      //     return origem.password;
      //   })
      // );
      // console.log(resultado[0]);
      // console.log(buffer.from(resultado[0], 'base64').toString('ascii'));
      res.status(200).json(selectUser);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar Usuário. '+error });
    }
  },
  selectAllUser: async (req, res) => {
    const {  } = req.body;
    try {
      const selectAllUser = await crudUser.selectAllUser();
      res.status(200).json(selectAllUser);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar os Usuários. '+error });
    }
  },
  updateUser: async (req, res) => {
    const {  } = req.body;
    try {
      const updateUser = await crudUser.updateUser(campo, valor, user);
      res.status(200).json(updateUser);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar Usuário. '+error });
    }
  },
  deleteUser: async (req, res) => {
    const {  } = req.body;
    try {
      const deleteUser = await crudUser.deleteUser(campo, valor);
      res.status(200).json(deleteUser);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar Usuário. '+error });
    }
  }
};
 
module.exports = crudUserController;