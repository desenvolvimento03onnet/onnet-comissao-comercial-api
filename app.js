const express = require('express');
const cors = require('cors');
const operationController = require('./MK/controllers/operationController');
const invoiceController = require('./ComissaoComercial/controllers/invoiceController');
const insertBDComissao = require('./ComissaoComercial/controllers/insertBDController');
const crudUser = require('./ComissaoComercial/controllers/crudUserController');
const crudSector = require('./ComissaoComercial/controllers/crudSectorController');
const crudCity = require('./ComissaoComercial/controllers/crudCityController');
const crudClient = require('./ComissaoComercial/controllers/crudClientController');
const crudComission = require('./ComissaoComercial/controllers/crudComissionController');
const crudComissionLogs = require('./ComissaoComercial/controllers/crudComissionLogsController');
const crudPermissionCity = require('./ComissaoComercial/controllers/crudPermissionCityController');
const crudPermissionLevel = require('./ComissaoComercial/controllers/crudPermissionLevelController');
const crudUserClientComission = require('./ComissaoComercial/controllers/crudUserClientComissionController');
const crudUserLogs = require('./ComissaoComercial/controllers/crudUserLogsController');
const crudUserPermission = require('./ComissaoComercial/controllers/crudUserPermissionController');
const createChart = require('./ComissaoComercial/controllers/createChartController');
const insertAfterValidation = require('./ComissaoComercial/controllers/insertAfterValidationUserClientComissionController');
 
const app = express();
const PORT = 3000;
 
app.use(express.json());
app.use(cors());

// -- MK --

// - Busca todas as operações realizadas
app.get('/api/Operations', operationController.getAllOperations);
//app.get('/api/ValidateInvoice', invoiceController.validateInvoiceMK);

// -- Comissão Comercial --

// - Atualiza Faturas Não Pagas
//app.get('/api/NonPaidInvoices', invoiceController.getAllNonPaidInvoice);
app.post('/api/UpdateInvoice', invoiceController.updateInvoice);

// - Insere Comissões no Banco
app.get('/api/ValidaBDComissao', insertBDComissao.validaDB);
app.post('/api/InsertBDComissao', insertBDComissao.insertDB);

// - Crud tabela de Usuários
app.post('/api/InsertUser', crudUser.insertNewUser);
app.post('/api/UpdateUser', crudUser.updateUser);
app.post('/api/DeleteUser', crudUser.deleteUser);
app.get('/api/SelectUser', crudUser.selectUser);
app.get('/api/SelectAllUser', crudUser.selectAllUser);

// - Crud tabela de Setores
app.post('/api/InsertSector', crudSector.insertNewSector);
app.post('/api/UpdateSector', crudSector.updateSector);
app.post('/api/DeleteSector', crudSector.deleteSector);
app.get('/api/SelectSector', crudSector.selectSector);
app.get('/api/SelectAllSector', crudSector.selectAllSector);

// - Crud tabela de Comissão
app.post('/api/InsertComission', crudComission.insertNewComission);
app.post('/api/UpdateComission', crudComission.updateComission);
app.post('/api/DeleteComission', crudComission.deleteComission);
app.get('/api/SelectComission', crudComission.selectComission);
app.get('/api/SelectAllComission', crudComission.selectAllComission);

// - Crud tabela de Comissões-Logs
app.post('/api/InsertComissionLog', crudComissionLogs.insertNewComissionLogs);
app.post('/api/UpdateComissionLog', crudComissionLogs.updateComissionLogs);
app.post('/api/DeleteComissionLog', crudComissionLogs.deleteComissionLogs);
app.get('/api/SelectComissionLog', crudComissionLogs.selectComissionLogs);
app.get('/api/SelectAllComissionLog', crudComissionLogs.selectAllComissionLogs);

// - Crud tabela de Usuários-Logs
app.post('/api/InsertUserLog', crudUserLogs.insertNewUserLogs);
app.post('/api/UpdateUserLog', crudUserLogs.updateUserLogs);
app.post('/api/DeleteUserLog', crudUserLogs.deleteUserLogs);
app.get('/api/SelectUserLog', crudUserLogs.selectUserLogs);
app.get('/api/SelectAllUserLog', crudUserLogs.selectAllUserLogs);

// - Crud tabela de Cidades
app.post('/api/InsertCity', crudCity.insertNewCity);
app.post('/api/UpdateCity', crudCity.updateCity);
app.post('/api/DeleteCity', crudCity.deleteCity);
app.get('/api/SelectCity', crudCity.selectCity);
app.get('/api/SelectAllCity', crudCity.selectAllCity);

// - Crud tabela de Permissão-Cidade
app.post('/api/InsertPermissionCity', crudPermissionCity.insertNewPermissionCity);
app.post('/api/UpdatePermissionCity', crudPermissionCity.updatePermissionCity);
app.post('/api/DeletePermissionCity', crudPermissionCity.deletePermissionCity);
app.get('/api/SelectPermissionCity', crudPermissionCity.selectPermissionCity);
app.get('/api/SelectAllPermissionCity', crudPermissionCity.selectAllPermissionCity);

// - Crud tabela de Nível de Permissão
app.post('/api/InsertPermissionLevel', crudPermissionLevel.insertNewPermissionLevel);
app.post('/api/UpdatePermissionLevel', crudPermissionLevel.updatePermissionLevel);
app.post('/api/DeletePermissionLevel', crudPermissionLevel.deletePermissionLevel);
app.get('/api/SelectPermissionLevel', crudPermissionLevel.selectPermissionLevel);
app.get('/api/SelectAllPermissionLevel', crudPermissionLevel.selectAllPermissionLevel);

// - Crud tabela de Usuários-Permissão
app.post('/api/InsertUserPermission', crudUserPermission.insertNewUserPermission);
app.post('/api/UpdateUserPermission', crudUserPermission.updateUserPermission);
app.post('/api/DeleteUserPermission', crudUserPermission.deleteUserPermission);
app.get('/api/SelectUserPermission', crudUserPermission.selectUserPermission);
app.get('/api/SelectAllUserPermission', crudUserPermission.selectAllUserPermission);

// - Crud tabela de Usuários-Clientes-Comissão
app.post('/api/InsertUserClientComission', crudUserClientComission.insertNewUserClientComission);
app.post('/api/UpdateUserClientComission', crudUserClientComission.updateUserClientComission);
app.post('/api/DeleteUserClientComission', crudUserClientComission.deleteUserClientComission);
app.get('/api/SelectUserClientComission', crudUserClientComission.selectUserClientComission);
app.get('/api/SelectAllUserClientComission', crudUserClientComission.selectAllUserClientComission);

// - Crud tabela de Clientes
//app.post('/api/InsertClient', crudClient.insertNewClient);
app.post('/api/UpdateClient', crudClient.updateClient);
app.post('/api/DeleteClient', crudClient.deleteClient);
app.get('/api/SelectClient', crudClient.selectClient);
app.get('/api/SelectAllClient', crudClient.selectAllClient);

// - Retorno dos dados para a criação dos gráficos
app.get('/api/AllUserChart', createChart.CreateAllUserChart);
app.get('/api/SellUserChart', createChart.CreateSellUserChart);
app.get('/api/RenewalUserChart', createChart.CreateRenewalUserChart);
app.get('/api/CityUserChart', createChart.CreateCityUserChart);
app.get('/api/CitySellUserChart', createChart.CreateCitySellUserChart);
app.get('/api/CityRenewalUserChart', createChart.CreateCityRenewalUserChart);
app.get('/api/UserTable', createChart.CreateUserTable);
app.get('/api/SectorAllChart', createChart.CreateSectorAllChart);
app.get('/api/SectorSellChart', createChart.CreateSectorSellChart);
app.get('/api/SectorRenewalChart', createChart.CreateSectorRenewalChart);
app.get('/api/UserComissionChart', createChart.CreateUserComissionChart);

// - Recebe os dados do cliente, usuário e comissão, valida se já não existe e, se não existir, insere no banco
app.post('/api/InsereAfterValidation', insertAfterValidation.insertDB);

app.listen(PORT, () => {
  console.log(`Servidor na porta ${PORT}`);
}); 