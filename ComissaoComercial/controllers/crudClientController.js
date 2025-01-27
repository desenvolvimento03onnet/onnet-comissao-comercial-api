const crudClient = require('../models/CRUDClientModel'); // Importe o modelo

const crudClientController = {
  insertNewClient: async (req, res) => {
    const { codclient, name, city, contract, date, operation, codplan, plan, plan_value, cod_old_plan, old_plan, old_plan_value, cod_new_plan, new_plan, new_plan_value, recurring_payment, tv, telephony, invoice, paid, operator, city_operator, due_date } = req.body;
    try {
      const insertClient = await crudClient.insertNewClient(codclient, name, city, contract, date, operation, codplan, plan, plan_value, cod_old_plan, old_plan, old_plan_value, cod_new_plan, new_plan, new_plan_value, recurring_payment, tv, telephony, invoice, paid, operator, city_operator, due_date);
      res.status(200).json(insertClient);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao Inserir Usuário. '+error });
    }
  },
  selectClient: async (req, res) => {
    const { codclient, contract } = req.body;
    try {
      const selectClient = await crudClient.selectClient(codclient, contract);
      res.status(200).json(selectClient);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar Usuário. '+error });
    }
  },
  selectAllClient: async (req, res) => {
    const {  } = req.body;
    try {
      const selectAllClient = await crudClient.selectAllClient();
      res.status(200).json(selectAllClient);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar os Usuário. '+error });
    }
  },
  updateClient: async (req, res) => {
    const { campo, valor, codclient } = req.body;
    try {
      const updateClient = await crudClient.updateClient(campo, valor, codclient);
      res.status(200).json(updateClient);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar Usuário. '+error });
    }
  },
  deleteClient: async (req, res) => {
    const { campo, valor } = req.body;
    try {
      const deleteClient = await crudClient.deleteClient(campo, valor);
      res.status(200).json(deleteClient);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar Usuário. '+error });
    }
  }
};
 
module.exports = crudClientController;