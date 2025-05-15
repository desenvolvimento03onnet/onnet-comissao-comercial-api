# OnNet Comissão Comercial Back-End

![Tamanho](https://img.shields.io/github/repo-size/desenvolvimento03onnet/onnet-comissao-comercial-api?style=for-the-badge&label=TAMANHO)
![Linguagem](https://img.shields.io/badge/Linguagem-Node.js-6cc24a?style=for-the-badge)
![Node](https://img.shields.io/badge/Vers%C3%A3o_Node.js-v20.9.0-6cc24a?style=for-the-badge&logo=nodedotjs&logoColor=6cc24a)
![Problemas](https://img.shields.io/bitbucket/issues/desenvolvimento03onnet/onnet-comissao-comercial-api?style=for-the-badge&label=PROBLEMAS)

> [!IMPORTANT]
> Back-end do projeto OnNet Comissão Comercial, constando acesso à API do MK e o back-end relacionado ao banco das comissões.

### Ajustes e melhorias

O projeto ainda está em desenvolvimento e as próximas atualizações serão voltadas para as seguintes tarefas:

- [x] Criação das Rotas de todas as Tabelas
- [ ] Finalizar os testes de rotas

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Versão do Node.js utilizada `v20.9.0`.

## 🔀 Rotas

### 🇧🇩 MK

#### Busca Todas as Operações Realizadas

- 📥 `/api/Operations` --> Rota que busca no banco do mk, todas as Vendas/Renovações realizadas na data anterior
- 📥 `/api/ValidateInvoice` --> Rota valida no banco do mk se, as faturas que vieram da rota anterior, já foram pagas;

### 🇧🇩 Comissões-Comercial

#### Atualiza Faturas Não Pagas

- 📥 `/api/NonPaidInvoices` --> Rota que busca no banco comissoes_comercial, todas as faturas com status: `paid: false`;
- 📤 `/api/UpdateInvoice` --> Rota que atualiza as faturas, no banco comissoes_comercial, as faturas que já foram pagas;

#### Insere Comissões no Banco

- 📤 `/api/InsertBDComissao` --> Rota que insere as operações que foram buscadas na rota `/api/Operations` e insere no banco comissoes_comercial;

#### Crud tabela de Usuários

- 📤 `/api/InsertUser` --> Rota que insere os usuários do sistema no banco de dados, com os dados: `usuário`, `nome`, `senha`, `data de criação`, `código da cidade` e `código do setor`;
- 📤 `/api/UpdateUser` --> Rota que recebe um `campo`, um `valor` e um `usuário` para atualizar esse mesmo usuário, no banco comissoes_comercial;
- 📤 `/api/DeleteUser` --> Rota que recebe um `campo` e um `valor` para excluir um usuário no banco comissoes_comercial;
- 📥 `/api/SelectUser` --> Rota que recebe um `usuário` e retorna as informações dele;
- 📥 `/api/SelectAllUser` --> Rota que busca no banco comissoes_comercial, todas os usuários do sistema;

#### Crud tabela de Setores

- 📤 `/api/InsertSector` --> Rota que insere os setores do sistema no banco de dados, com os dados: `ativo` e `nome`;
- 📤 `/api/UpdateSector` --> Rota que recebe um `campo`, um `valor` e um `nome de setor` para atualizar esse mesmo setor, no banco comissoes_comercial;
- 📤 `/api/DeleteSector` --> Rota que recebe um `campo` e um `valor` para excluir um setor no banco comissoes_comercial;
- 📥 `/api/SelectSector` --> Rota que recebe um `nome de setor` e retorna as informações dele;
- 📥 `/api/SelectAllSector` --> Rota que busca no banco comissoes_comercial, todas os setores do sistema;

#### Crud tabela de Comissão-Setor

- 📤 `/api/InsertComissionSector` --> Rota que insere as comissões dos setores do sistema no banco de dados, com os dados: `código da comissão`, `código do setor`;
- 📤 `/api/UpdateComissionSector` --> Rota que recebe um `campo`, um `valor`, um `código da comissão` e um `código do setor` para atualizar, no banco comissoes_comercial;
- 📤 `/api/DeleteComissionSector` --> Rota que recebe um `campo` e um `valor` para excluir uma comissão-setor no banco comissoes_comercial;
- 📥 `/api/SelectComissionSector` --> Rota que recebe um `código da comissão` e `código do setor` e retorna as informações dele;
- 📥 `/api/SelectAllComissionSector` --> Rota que busca no banco comissoes_comercial, todas as comissões-setores do sistema;

#### Crud tabela de Comissão

- 📤 `/api/InsertComission` --> Rota que insere os usuários do sistema no banco de dados, com os dados: `ativo`, `nome da comissão` e `valor`;
- 📤 `/api/UpdateComission` --> Rota que recebe um `campo`, um `valor` e o `nome da comissão` para atualizar essa mesma comissão, no banco comissoes_comercial;
- 📤 `/api/DeleteComission` --> Rota que recebe um `campo` e um `valor` para excluir uma comissão no banco comissoes_comercial;
- 📥 `/api/SelectComission` --> Rota que recebe um `nome da comissão` e retorna as informações dele;
- 📥 `/api/SelectAllComission` --> Rota que busca no banco comissoes_comercial, todas as comissões do sistema;

#### Crud tabela de Comissões-Logs

- 📤 `/api/InsertComissionLog` --> Rota que insere os usuários do sistema no banco de dados, com os dados: `data`, `código da comissão`, `código do usuário` e `descrição`;
- 📤 `/api/UpdateComissionLog` --> Rota que recebe um `campo`, um `valor`, `código da comissão` e `código do usuário` para atualizar esse mesmo log, no banco comissoes_comercial;
- 📤 `/api/DeleteComissionLog` --> Rota que recebe um `campo` e um `valor` para excluir um log no banco comissoes_comercial;
- 📥 `/api/SelectComissionLog` --> Rota que recebe um `código da comissão` e `código do usuário` e retorna as informações dele;
- 📥 `/api/SelectAllComissionLog` --> Rota que busca no banco comissoes_comercial, todas os logs do sistema;

#### Crud tabela de Usuários-Logs

- 📤 `/api/InsertUserLog` --> Rota que insere os usuários do sistema no banco de dados, com os dados: `data`, `código do usuário` e `descrição`;
- 📤 `/api/UpdateUserLog` --> Rota que recebe um `campo`, um `valor` e um `código do usuário` para atualizar esse mesmo log, no banco comissoes_comercial;
- 📤 `/api/DeleteUserLog` --> Rota que recebe um `campo` e um `valor` para excluir um log no banco comissoes_comercial;
- 📥 `/api/SelectUserLog` --> Rota que recebe um `código do usuário` e retorna as informações dele;
- 📥 `/api/SelectAllUserLog` --> Rota que busca no banco comissoes_comercial, todas os logs do sistema;

#### Crud tabela de Cidades

- 📤 `/api/InsertCity` --> Rota que insere os usuários do sistema no banco de dados, com os dados: `nome` e `uf`;
- 📤 `/api/UpdateCity` --> Rota que recebe um `campo`, um `valor` e um `nome da cidade` para atualizar essa mesma cidade, no banco comissoes_comercial;
- 📤 `/api/DeleteCity` --> Rota que recebe um `campo` e um `valor` para excluir uma cidade no banco comissoes_comercial;
- 📥 `/api/SelectCity` --> Rota que recebe um `nome da cidade` e retorna as informações dele;
- 📥 `/api/SelectAllCity` --> Rota que busca no banco comissoes_comercial, todas as cidades do sistema;

#### Crud tabela de Permissão-Cidade

- 📤 `/api/InsertPermissionCity` --> Rota que insere as permissões-cidade do sistema no banco de dados, com os dados: `código da permissão` e `código da cidade`;
- 📤 `/api/UpdatePermissionCity` --> Rota que recebe um `campo`, um `valor`, um `código da permissão` e um `código da cidade` para atualizar esse mesmo usuário, no banco comissoes_comercial;
- 📤 `/api/DeletePermissionCity` --> Rota que recebe um `campo` e um `valor` para excluir uma permissão no banco comissoes_comercial;
- 📥 `/api/SelectPermissionCity` --> Rota que recebe um `código da permissão` e um `código da cidade` e retorna as informações dele;
- 📥 `/api/SelectAllPermissionCity` --> Rota que busca no banco comissoes_comercial, todas as permissões de cidade do sistema;

#### Crud tabela de Nível de Permissão

- 📤 `/api/InsertPermissionLevel` --> Rota que insere as permissões do sistema no banco de dados, com os dados: `nível`, `descrição` e `ativo`;
- 📤 `/api/UpdatePermissionLevel` --> Rota que recebe um `campo`, um `valor` e um `nível` para atualizar essa mesma permissão, no banco comissoes_comercial;
- 📤 `/api/DeletePermissionLevel` --> Rota que recebe um `campo` e um `valor` para excluir uma permissão no banco comissoes_comercial;
- 📥 `/api/SelectPermissionLevel` --> Rota que recebe um `nível` e retorna as informações dela;
- 📥 `/api/SelectAllPermissionLevel` --> Rota que busca no banco comissoes_comercial, todas as permissões do sistema;

#### Crud tabela de Usuários-Permissão

- 📤 `/api/InsertUserPermission` --> Rota que insere os permissões dos usuários do sistema no banco de dados, com os dados: `código do usuário` e `código de permissão`;
- 📤 `/api/UpdateUserPermission` --> Rota que recebe um `campo`, um `valor`, um `código do usuário` e um `código de permissão` para atualizar essa mesma permissão, no banco comissoes_comercial;
- 📤 `/api/DeleteUserPermission` --> Rota que recebe um `campo` e um `valor` para excluir uma permissão no banco comissoes_comercial;
- 📥 `/api/SelectUserPermission` --> Rota que recebe um `código do usuário` e um `código de permissão` e retorna as informações dela;
- 📥 `/api/SelectAllUserPermission` --> Rota que busca no banco comissoes_comercial, todas as permissões do sistema;

#### Crud tabela de Usuários-Clientes-Comissão

- 📤 `/api/InsertUserClientComission` --> Rota que insere as comissões dos usuários-clientes do sistema no banco de dados, com os dados: `código do usuário`, `código do cliente` e `código da comissão`;
- 📤 `/api/UpdateUserClientComission` --> Rota que recebe um `campo`, um `valor`, `código do usuário`, `código do cliente` e `código da comissão` para atualizar essa mesma comissão, no banco comissoes_comercial;
- 📤 `/api/DeleteUserClientComission` --> Rota que recebe um `campo` e um `valor` para excluir uma comissão no banco comissoes_comercial;
- 📥 `/api/SelectUserClientComission` --> Rota que recebe um `campo` e retorna as informações dele;
- 📥 `/api/SelectAllUserClientComission` --> Rota que busca no banco comissoes_comercial, todas as comissões do sistema;

#### Crud tabela de Clientes

- 📤 `/api/InsertClient` --> Rota que insere os clientes do sistema no banco de dados, com os dados: `código do cliente`, `nome`, `cidade`, `contrato`, `data`, `operação`, `código do plano`, `plano`, `valor do plano`, `código do plano antigo`, `plano antigo`, `valor do plano antigo`, `código do plano novo`, `plano novo`, `valor do plano novo`, `pagamento recorrente`, `tv`, `telefonia`, `fatura`, `pago`, `operador`, `cidade do operador` e `data de vencimento`;
- 📤 `/api/UpdateClient` --> Rota que recebe um `campo`, um `valor` e um `código do cliente` para atualizar esse mesmo cliente, no banco comissoes_comercial;
- 📤 `/api/DeleteClient` --> Rota que recebe um `campo` e um `valor` para excluir um cliente no banco comissoes_comercial;
- 📥 `/api/SelectClient` --> Rota que recebe um `código do cliente` e um `contrato` e retorna as informações dele;
- 📥 `/api/SelectAllClient` --> Rota que busca no banco comissoes_comercial, todas os clientes do sistema;

#### Retorno dos dados para a criação dos gráficos

- 📥 `/api/AllUserChart` --> Rota que recebe um `usuário` e retorna as todas as operações dele;
- 📥 `/api/SellUserChart` --> Rota que recebe um `usuário` e retorna as todas as vendas dele;
- 📥 `/api/RenewalUserChart` --> Rota que recebe um `usuário` e retorna as todas as renovações(`Renovações`, `Upgrade`e `Downgrade`) dele;
- 📥 `/api/CityUserChart` --> Rota que recebe um `usuário` e retorna as todas as operações, por cidade, dele;
- 📥 `/api/CitySellUserChart` --> Rota que recebe um `usuário` e retorna as todas as vendas, por cidade, dele;
- 📥 `/api/CityRenewalUserChart` --> Rota que recebe um `usuário` e retorna as todas as renovações(`Renovações`, `Upgrade`e `Downgrade`), por cidade, dele;
- 📥 `/api/UserTable` --> Rota que recebe um `usuário` e retorna as todas as operações dele;
- 📥 `/api/SectorAllChart` --> Rota que recebe um `usuário` e retorna as todas as operações, por setor, caso o usuário esteja com nível de permissão diferente de `2 - Operador`;
- 📥 `/api/SectorSellChart` --> Rota que recebe um `usuário` e retorna as todas as vendas, por setor, caso o usuário esteja com nível de permissão diferente de `2 - Operador`;
- 📥 `/api/SectorRenewalChart` --> Rota que recebe um `usuário` e retorna as todas as renovações(`Renovações`, `Upgrade`e `Downgrade`), por setor, caso o usuário esteja com nível de permissão diferente de `2 - Operador`;

## 🤝 Colaboradores

Agradecemos às seguintes pessoas que contribuíram para este projeto:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/desenvolvimento01onnet" title="Daniel Gomes Januário Júnior">
        <img src="img/daniel.jpg" width="100px;" alt="Foto do Daniel Gomes no GitHub"/><br>
        <sub>
          <b>Daniel Gomes</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/desenvolvimento02onnet" title="Lucas Moreira da Silva">
        <img src="img/lucas.jpg" width="100px;" alt="Foto do Lucas Moreira no GitHub"/><br>
        <sub>
          <b>Lucas Moreira</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/desenvolvimento08onnet" title="Vitória Stéfane de Souza">
        <img src="img/vitoria.jpg" width="100px;" alt="Foto do Vitória Stéfane no GitHub"/><br>
        <sub>
          <b>Vitória Stéfane</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/desenvolvimentoonnet" title="Welington Luiz Borges">
        <img src="img/pepsi.jpg" width="100px;" alt="Foto do Welington Luiz no GitHub"/><br>
        <sub>
          <b>Welington Luiz<img src="img/pepsi_can.png" width="30px;" alt="Lata de Pepsi"/></b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## 📝 Template

Esse template que eu utilizei, foi encontrato no seguinte site: [TEMPLATE](https://github.com/iuricode/readme-template/blob/main/repositorio/exemplo-01.md).

## 🏷️ Badges

As badges, eu consegui criar no site: [BADGES](https://shields.io/badges/git-hub-repo-size).

## 🛢 Banco de Dados (Exemplo)

Eu criei um arquivo exemplo em formato .sql para que você consiga, realizar um dump em um BD já criado e testar a aplicação: [dump](banco.sql).

Como o arquivo, está em formato .sql, vc vai precisar fazer um restore diretamente no psql, da seguinte forma:
```
psql -U [Seu_usuario] -h [IP onde está o banco] -p [Porta] -d [Nome do Novo Banco] -f [Local onde o .sql foi salvo]
```

> [!IMPORTANT]
> Se você colocar um nome diferente no banco de dados, certifique-se de mudar na conf/db.js também, senão o projeto não irá funcionar.