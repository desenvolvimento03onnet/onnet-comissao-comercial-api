const OperationModel = require('../models/OperationModel.js'); // Importe o modelo

const operationController = {
    getAllOperations: async (req, res) => {
    const { } = req.body;
    try {
      const operation = await OperationModel.getAllOperations();
      res.status(200).json(operation);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter lista de operações.' });
    }
  }
};
 
module.exports = operationController;