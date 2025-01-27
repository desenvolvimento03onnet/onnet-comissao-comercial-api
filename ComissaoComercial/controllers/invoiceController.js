const InvoiceModel = require('../models/InvoiceModel.js'); // Importe o modelo

const invoiceController = {
  // getAllNonPaidInvoice: async (req, res) => {
  //   const { } = req.body;
  //   try {
  //     const nonpaid = await InvoiceModel.getAllNonPaidInvoice();
  //     res.status(200).json(nonpaid);
  //   } catch (error) {
  //     res.status(500).json({ error: 'Erro ao obter lista de faturas não pagas. '+error });
  //   }
  // },
  // validateInvoiceMK: async (req, res) => {
  //   const {  } = req.body;
  //   try {
  //     const validate = await InvoiceModel.validateInvoiceMK(await InvoiceModel.getAllNonPaidInvoice());
  //     res.status(200).json(validate);
  //   } catch (error) {
  //     res.status(500).json({ error: 'Erro ao obter lista de faturas não pagas. '+error });
  //   }
  // },
  updateInvoice: async (req, res) => {
    const {  } = req.body;
    try {
      const update = await InvoiceModel.updateInvoice(await InvoiceModel.validateInvoiceMK(await InvoiceModel.getAllNonPaidInvoice()));
      res.status(200).json(update);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar faturas. '+error });
    }
  }
};
 
module.exports = invoiceController;