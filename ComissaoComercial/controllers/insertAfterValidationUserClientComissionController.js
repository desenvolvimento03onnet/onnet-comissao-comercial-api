const UserModel = require('../models/CRUDUserModel.js');
const UserClientComissionModel = require('../models/CRUDUserClientComissionModel.js');
const charts = require('../models/CreateChart.js');

const insertAfterValidationUserClientComissionController = {
  insertDB: async (req, res) => {
    const dataAtual = new Date().toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"});
    const {  } = req.body;
    try {
      const usuario = await UserModel.selectAllUser();

      const grafico = await Promise.all(
        usuario.map(async(item) => {
          return await charts.CreateUserComissionChart(item.user);
        })
      );

      const insere = grafico[0].map(item => ({
        ...item,
        value: parseFloat(eval(item.value).toFixed(2))
      }));

      const valida = await UserClientComissionModel.selectAllUserClientComission();

      const resultado = insere.filter(inserir => !valida.some(cadastrados => inserir.id_client == cadastrados.id_client) || !valida.some(cadastrados => inserir.id_client == cadastrados.id_client && usuario.some(users => users.id == cadastrados.id_user)) || !valida.some(cadastrados => inserir.id_client == cadastrados.id_client && usuario.some(users => users.id == cadastrados.id_user) && inserir.value == cadastrados.comission_value));

      resultado.map(async(item) => {
        await UserClientComissionModel.insertNewUserClientComission(item.id_user, item.id_client, item.value, dataAtual);
      });
      //await charts.CreateUserComissionChart();
      // const cliente = await ClientModel.selectAllClient();
      // const comissao = await ComissionModel.selectAllComission();
      // const usuarioClienteComissao = await UserClientComissionModel.selectAllUserClientComission();
      // const insere = await UserClientComissionModel.insertNewUserClientComission();

      // const resultado = carrega.filter(inserir => !valida.some(cadastrados => inserir.id_client == cadastrados.id_client));
      res.status(200).json(resultado);
      //res.status(200).json(valida);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao inserir dados no Banco Comissões. '+error });
    }
  }
};
 
module.exports = insertAfterValidationUserClientComissionController;

