const dbComissao = require('../../config/dbComissaoComercial.js');

const CreateSellChart = {
  CreateAllUserChart: async (user) => {
    try {
      const query = 
      `select distinct
      cli.operation,
      cli."date",
      cli.contract
      from clients cli
      where
      cli.operator = $1`;
      const values = [user];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  CreateSellUserChart: async (user) => {
    try {
      const query = 
      `select distinct
      cli.operation,
      cli."date",
      cli.contract
      from clients cli
      where
      cli.operator = $1 and
      cli.operation = 'Venda'`;
      const values = [user];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  CreateRenewalUserChart: async (user) => {
    try {
      const query = 
      `select distinct
      cli.operation,
      cli."date",
      cli.contract
      from clients cli
      where
      cli.operator = $1 and
      cli.operation != 'Venda'`;
      const values = [user];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  CreateCityUserChart: async (user) => {
    try {
      const query = 
      `select distinct
      cli.city,
      cli."date",
      cli.contract
      from clients cli
      where
      cli.operator = $1`;
      const values = [user];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  CreateCitySellUserChart: async (user) => {
    try {
      const query = 
      `select distinct
      cli."date",
      cli.city,
      cli.contract
      from clients cli
      where
      cli.operator = $1 and
      cli.operation = 'Venda'`;
      const values = [user];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  CreateCityRenewalUserChart: async (user) => {
    try {
      const query = 
      `select distinct
      cli."date",
      cli.city,
      cli.contract
      from clients cli
      where
      cli.operator = $1 and
      cli.operation != 'Venda'`;
      const values = [user];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  CreateUserTable: async (user) => {
    try {
      const query = 
      `WITH cliente AS (
        select
          *
        from
          clients cli
        ),comissao AS (
        select
          comi.comission,
          comi.value,
          comi.id_sector,
          comi.created_at
        from
          comissions comi
        )
        SELECT DISTINCT
        *
        FROM
        (
        select distinct
        cli.id,
        cli.codclient,
        cli."name",
        cli.city,
        cli.contract,
        cli."date",
        cli.operation,
        cli.codplan,
        cli.plan,
        cli.plan_value,
        cli.cod_old_plan,
        cli.old_plan,
        cli.old_plan_value,
        cli.cod_new_plan,
        cli.new_plan,
        cli.new_plan_value,
        cli.operator,
        cli.city_operator,
        cli.recurring_payment,
        cli.tv,
        cli.telephony,
        cli.invoice,
        cli.paid,
        cli.due_date,
        CASE
        WHEN cli.date >= date(comi.created_at)
            AND cli.date < COALESCE(
                    (
                  SELECT
                  min(date(created_at))
                FROM
                  comissions
                WHERE
                  date(created_at) > date(comi.created_at) and
                  (
                    comission = comi.comission
                    OR
                    (
                      comission = comi.comission and
                      comi.comission ILIKE ANY(ARRAY['Dia 1', 'Dia 2'])
                    )
                  )and
                  id_sector = se.id
                ORDER BY 1), 
                    '9999-12-31'::date
                )
            THEN
              CASE
                when position('valor_plano' in comi.value) != 0 THEN REPLACE(comi.value, 'valor_plano', cli.plan_value||'')
                when position('novo_plano_valor' in comi.value) != 0 THEN
                  case
                    WHEN position('velho_plano_valor' in comi.value) != 0 THEN REPLACE(REPLACE(comi.value, 'novo_plano_valor', cli.new_plan_value||''), 'velho_plano_valor', cli.old_plan_value||'')
                    ELSE REPLACE(comi.value, 'novo_plano_valor', cli.new_plan_value||'')
                  end
                when position('velho_plano_valor' in comi.value) != 0 THEN 
                  case
                    WHEN position('novo_plano_valor' in comi.value) != 0 THEN REPLACE(REPLACE(comi.value, 'velho_plano_valor', cli.old_plan_value||''), 'novo_plano_valor', cli.new_plan_value||'')
                    ELSE REPLACE(comi.value, 'velho_plano_valor', cli.old_plan_value||'')
                  end
                WHEN comi.comission ILIKE ANY(ARRAY['Dia 1', 'Dia 2']) then
                  case
                    WHEN SPLIT_PART(comi.value, ' ', 1) = cli.due_date THEN SPLIT_PART(comi.value, ' ', 3)
                    ELSE NULL
                  end
                ELSE comi.value
              END
        END comission,
        comi.value formula,
        aceito.accepted
        from
        users usu
        INNER JOIN cliente cli ON (cli.operator = usu.user)
        INNER JOIN comissao comi ON (comi.comission = cli.operation OR (
        comi.comission ILIKE ANY(ARRAY['Dia 1', 'Dia 2']) and
        cli.operation = 'Venda'
        )
        )
        INNER JOIN users_sectors ususe ON (ususe.id_user = usu.id)
        INNER JOIN sectors se ON (se.id = comi.id_sector AND se.id = ususe.id_sector)
        LEFT JOIN users_clients_comissions userCC ON (userCC.id_client = cli.id AND userCC.id_user = usu.id)
        LEFT JOIN comissions_accepted aceito ON (aceito.id_user_client_comission = userCC.id)
        where
        usu.user = $1
        ) tabela
        WHERE
        tabela.comission IS NOT null
        order by 3,6,5`;
      const values = [user];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  CreateSectorAllChart: async (user) => {
    try {
      const query = 
      `select distinct
      se.name sector,
      usu.user,
      cli.operation,
      cli.date,
      cli.contract
      from
      clients cli
      INNER JOIN users_clients_comissions usuCliCom ON (usuCliCom.id_client = cli.id)
      INNER JOIN users_sectors usuSe ON (usuSe.id_user = usuCliCom.id_user)
      left JOIN users usu ON (usu.id = usuSe.id_user)
      INNER JOIN sectors se ON (se.id = usuSe.id_sector)
      where
      usu.user = $1`;
      const values = [user];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  CreateSectorSellChart: async (user) => {
    try {
      const query = 
      `select distinct
      se.name sector,
      usu.user,
      cli.operation,
      cli.date,
      cli.contract
      from
      clients cli
      INNER JOIN users_clients_comissions usuCliCom ON (usuCliCom.id_client = cli.id)
      INNER JOIN users_sectors usuSe ON (usuSe.id_user = usuCliCom.id_user)
      left JOIN users usu ON (usu.id = usuSe.id_user)
      INNER JOIN sectors se ON (se.id = usuSe.id_sector)
      where
      cli.operation = 'Venda' AND
      usu.user = $1`;
      const values = [user];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  CreateSectorRenewalChart: async (user) => {
    try {
      const query = 
      `select distinct
      se.name sector,
      usu.user,
      cli.operation,
      cli.date,
      cli.contract
      from
      clients cli
      INNER JOIN users_clients_comissions usuCliCom ON (usuCliCom.id_client = cli.id)
      INNER JOIN users_sectors usuSe ON (usuSe.id_user = usuCliCom.id_user)
      left JOIN users usu ON (usu.id = usuSe.id_user)
      INNER JOIN sectors se ON (se.id = usuSe.id_sector)
      where
      cli.operation != 'Venda' AND
      usu.user = $1`;
      const values = [user];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  CreateUserComissionChart: async (user) => {
    try {
      const query = 
      `WITH cliente AS (
          select
            *
          from
            clients cli
        ),comissao AS (
          select
            comi.comission,
            comi.value,
            comi.id_sector,
            comi.created_at
          from
            comissions comi
        )
        SELECT DISTINCT
          *
        FROM
          (
          SELECT DISTINCT
            comi.comission,
            usu.id id_user,
            cli.id id_client,
            cli."date",
            comi.value formula,
            --LEFT(REPLACE(comi.value, 'valor_plano', cli.plan_value||''), POSITION(' ' IN (REPLACE(comi.value, 'valor_plano', cli.plan_value||'')))-1)
            --right(REPLACE(comi.value, 'valor_plano', cli.plan_value||''), POSITION(' ' IN (REPLACE(comi.value, 'valor_plano', cli.plan_value||'')))-1)
            --SUBSTRING(REPLACE(comi.value, 'valor_plano', cli.plan_value||''), POSITION(' ' IN (REPLACE(comi.value, 'valor_plano', cli.plan_value||'')))+1,1)
            -- CASE
            -- 	WHEN comi.comission = 'Venda' THEN REPLACE(comi.value, 'valor_plano', cli.plan_value||'')
            -- 	WHEN comi.comission = 'Renovação' THEN comi.value
            -- 	WHEN comi.comission = 'Upgrade' THEN replace(REPLACE(comi.value, 'novo_plano_valor', cli.new_plan_value||''),'velho_plano_valor', cli.old_plan_value||'')
            -- 	ELSE comi.value
            -- end value
            cli.paid,
            CASE
              WHEN cli.date >= date(comi.created_at)
                  AND cli.date < COALESCE(
                          (
                        SELECT
                        min(date(created_at))
                      FROM
                        comissions
                      WHERE
                        date(created_at) > date(comi.created_at) and
                        (
                    comission = comi.comission
                    OR
                    (
                      comission = comi.comission and
                      comi.comission ILIKE ANY(ARRAY['Dia 1', 'Dia 2'])
                    )
                    )and
                        id_sector = se.id
                      ORDER BY 1), 
                          '9999-12-31'::date
                      )
                  THEN
                  CASE
                  when position('valor_plano' in comi.value) != 0 THEN REPLACE(comi.value, 'valor_plano', cli.plan_value||'')
                  when position('novo_plano_valor' in comi.value) != 0 THEN
                    case
                      WHEN position('velho_plano_valor' in comi.value) != 0 THEN REPLACE(REPLACE(comi.value, 'novo_plano_valor', cli.new_plan_value||''), 'velho_plano_valor', cli.old_plan_value||'')
                      ELSE REPLACE(comi.value, 'novo_plano_valor', cli.new_plan_value||'')
                    end
                  when position('velho_plano_valor' in comi.value) != 0 THEN 
                    case
                      WHEN position('novo_plano_valor' in comi.value) != 0 THEN REPLACE(REPLACE(comi.value, 'velho_plano_valor', cli.old_plan_value||''), 'novo_plano_valor', cli.new_plan_value||'')
                      ELSE REPLACE(comi.value, 'velho_plano_valor', cli.old_plan_value||'')
                    end
                  WHEN comi.comission ILIKE ANY(ARRAY['Dia 1', 'Dia 2']) then
                    case
                      WHEN SPLIT_PART(comi.value, ' ', 1) = cli.due_date THEN SPLIT_PART(comi.value, ' ', 3)
                      ELSE NULL
                    end
                  ELSE comi.value
                END
            END VALUE
          from
            users usu
            INNER JOIN cliente cli ON (cli.operator = usu.user)
            INNER JOIN comissao comi ON (comi.comission = cli.operation OR (
            comi.comission ILIKE ANY(ARRAY['Dia 1', 'Dia 2']) and
            cli.operation = 'Venda'
            )
          )
            INNER JOIN users_sectors ususe ON (ususe.id_user = usu.id)
            INNER JOIN sectors se ON (se.id = comi.id_sector AND se.id = ususe.id_sector)
          WHERE
            usu.user = $1
          ) tabela
        WHERE
          tabela.value IS NOT null
        ORDER BY 1`;
      // const query = 
      // `WITH cliente AS (
      //   select
      //     *
      //   from
      //     clients cli
      // ),comissao AS (
      //   select
      //     comi.comission,
      //     comi.value,
      //     comi.id_sector,
      //     comi.created_at
      //   from
      //     comissions comi
      // )
      // SELECT DISTINCT
      //   *
      // FROM
      //   (
      //   SELECT DISTINCT
      //     comi.comission,
      //     usu.id id_user,
      //     cli.id id_client,
      //     cli."date",
      //     comi.value formula,
      //     --LEFT(REPLACE(comi.value, 'valor_plano', cli.plan_value||''), POSITION(' ' IN (REPLACE(comi.value, 'valor_plano', cli.plan_value||'')))-1)
      //     --right(REPLACE(comi.value, 'valor_plano', cli.plan_value||''), POSITION(' ' IN (REPLACE(comi.value, 'valor_plano', cli.plan_value||'')))-1)
      //     --SUBSTRING(REPLACE(comi.value, 'valor_plano', cli.plan_value||''), POSITION(' ' IN (REPLACE(comi.value, 'valor_plano', cli.plan_value||'')))+1,1)
      //     -- CASE
      //     -- 	WHEN comi.comission = 'Venda' THEN REPLACE(comi.value, 'valor_plano', cli.plan_value||'')
      //     -- 	WHEN comi.comission = 'Renovação' THEN comi.value
      //     -- 	WHEN comi.comission = 'Upgrade' THEN replace(REPLACE(comi.value, 'novo_plano_valor', cli.new_plan_value||''),'velho_plano_valor', cli.old_plan_value||'')
      //     -- 	ELSE comi.value
      //     -- end value
      //     cli.paid,
      //     CASE
      //       WHEN cli.date >= date(comi.created_at)
      //           AND cli.date < COALESCE(
      //                   (
      //                 SELECT
      //                 min(date(created_at))
      //               FROM
      //                 comissions
      //               WHERE
      //                 date(created_at) > date(comi.created_at) and
      //                 comission = comi.comission and
      //                 id_sector = se.id
      //               ORDER BY 1), 
      //                   '9999-12-31'::date
      //               )
      //           THEN
      //           CASE
      //           when position('valor_plano' in comi.value) != 0 THEN REPLACE(comi.value, 'valor_plano', cli.plan_value||'')
      //           when position('novo_plano_valor' in comi.value) != 0 THEN
      //             case
      //               WHEN position('velho_plano_valor' in comi.value) != 0 THEN REPLACE(REPLACE(comi.value, 'novo_plano_valor', cli.new_plan_value||''), 'velho_plano_valor', cli.old_plan_value||'')
      //               ELSE REPLACE(comi.value, 'novo_plano_valor', cli.new_plan_value||'')
      //             end
      //           when position('velho_plano_valor' in comi.value) != 0 THEN 
      //             case
      //               WHEN position('novo_plano_valor' in comi.value) != 0 THEN REPLACE(REPLACE(comi.value, 'velho_plano_valor', cli.old_plan_value||''), 'novo_plano_valor', cli.new_plan_value||'')
      //               ELSE REPLACE(comi.value, 'velho_plano_valor', cli.old_plan_value||'')
      //             end
      //           ELSE comi.value
      //         END
      //     END VALUE
      //   from
      //     users usu
      //     INNER JOIN cliente cli ON (cli.operator = usu.user)
      //     INNER JOIN comissao comi ON (comi.comission = cli.operation)
      //     INNER JOIN users_sectors ususe ON (ususe.id_user = usu.id)
      //     INNER JOIN sectors se ON (se.id = comi.id_sector AND se.id = ususe.id_sector)
      //   WHERE
      //     usu.user = $1
      //   ) tabela
      // WHERE
      //   tabela.value IS NOT null
      // ORDER BY 1`;
      const values = [user];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  CreateAllOperationsUsers: async (user) => {
    try {
      const query = 
      `SELECT DISTINCT
        total.user,
        total.id id_cliente,
        total.date
        FROM
        users usu
        INNER JOIN users_permissions usuPe ON (usuPe.id_user = usu.id)
        INNER JOIN permission_level pe ON (pe.id = usuPe.id_permission_level)
        INNER JOIN users_sectors usuSe ON (usuSe.id_user = usu.id)
        LEFT JOIN (
          SELECT distinct
          usu.user,
          usuSe.id_sector,
          cliente.id,
          cliente.date
          from
          users usu
          INNER JOIN users_permissions usuPe ON (usuPe.id_user = usu.id)
          INNER JOIN permission_level pe ON (pe.id = usuPe.id_permission_level)
          INNER JOIN users_sectors usuSe ON (usuSe.id_user = usu.id)
          INNER JOIN clients cliente ON (cliente.operator = usu.user)
          where
          pe."level" = 3
        ) total ON (total.id_sector = usuSe.id_sector)
        WHERE
        pe."level" = 2 AND
        usu.user = $1`;
      const values = [user];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  CreateUsersComissionsChart: async (user) => {
    try {
      const query = 
      `WITH cliente AS (
          select
            *
          from
            clients cli
        ),comissao AS (
          select
            comi.comission,
            comi.value,
            comi.id_sector,
            comi.created_at
          from
            comissions comi
        )
        SELECT DISTINCT
          *
        FROM
          (
          SELECT DISTINCT
            comi.comission,
            usu.user,
            cli."date",
            --LEFT(REPLACE(comi.value, 'valor_plano', cli.plan_value||''), POSITION(' ' IN (REPLACE(comi.value, 'valor_plano', cli.plan_value||'')))-1)
            --right(REPLACE(comi.value, 'valor_plano', cli.plan_value||''), POSITION(' ' IN (REPLACE(comi.value, 'valor_plano', cli.plan_value||'')))-1)
            --SUBSTRING(REPLACE(comi.value, 'valor_plano', cli.plan_value||''), POSITION(' ' IN (REPLACE(comi.value, 'valor_plano', cli.plan_value||'')))+1,1)
            -- CASE
            -- 	WHEN comi.comission = 'Venda' THEN REPLACE(comi.value, 'valor_plano', cli.plan_value||'')
            -- 	WHEN comi.comission = 'Renovação' THEN comi.value
            -- 	WHEN comi.comission = 'Upgrade' THEN replace(REPLACE(comi.value, 'novo_plano_valor', cli.new_plan_value||''),'velho_plano_valor', cli.old_plan_value||'')
            -- 	ELSE comi.value
            -- end value
            cli.paid,
            CASE
              WHEN cli.date >= date(comi.created_at)
                  AND cli.date < COALESCE(
                          (
                        SELECT
                        min(date(created_at))
                      FROM
                        comissions
                      WHERE
                        date(created_at) > date(comi.created_at) and
                        (
                    comission = comi.comission
                    OR
                    (
                      comission = comi.comission and
                      comi.comission ILIKE ANY(ARRAY['Dia 1', 'Dia 2'])
                    )
                    )and
                        id_sector = se.id
                      ORDER BY 1), 
                          '9999-12-31'::date
                      )
                  THEN
                  CASE
                  when position('valor_plano' in comi.value) != 0 THEN REPLACE(comi.value, 'valor_plano', cli.plan_value||'')
                  when position('novo_plano_valor' in comi.value) != 0 THEN
                    case
                      WHEN position('velho_plano_valor' in comi.value) != 0 THEN REPLACE(REPLACE(comi.value, 'novo_plano_valor', cli.new_plan_value||''), 'velho_plano_valor', cli.old_plan_value||'')
                      ELSE REPLACE(comi.value, 'novo_plano_valor', cli.new_plan_value||'')
                    end
                  when position('velho_plano_valor' in comi.value) != 0 THEN 
                    case
                      WHEN position('novo_plano_valor' in comi.value) != 0 THEN REPLACE(REPLACE(comi.value, 'velho_plano_valor', cli.old_plan_value||''), 'novo_plano_valor', cli.new_plan_value||'')
                      ELSE REPLACE(comi.value, 'velho_plano_valor', cli.old_plan_value||'')
                    end
                  WHEN comi.comission ILIKE ANY(ARRAY['Dia 1', 'Dia 2']) then
                    case
                      WHEN SPLIT_PART(comi.value, ' ', 1) = cli.due_date THEN SPLIT_PART(comi.value, ' ', 3)
                      ELSE NULL
                    end
                  ELSE comi.value
                END
            END VALUE
          from
            users usu
            INNER JOIN cliente cli ON (cli.operator = usu.user)
            INNER JOIN comissao comi ON (comi.comission = cli.operation OR (
            comi.comission ILIKE ANY(ARRAY['Dia 1', 'Dia 2']) and
            cli.operation = 'Venda'
            )
          )
            INNER JOIN users_sectors ususe ON (ususe.id_user = usu.id)
            INNER JOIN sectors se ON (se.id = comi.id_sector AND se.id = ususe.id_sector)
            INNER JOIN users_sectors ususeSU ON (ususeSU.id_sector = se.id)
            INNER JOIN users usuSU ON (usuSU.id = ususeSU.id_user)
            INNER JOIN users_permissions permissionSU ON (permissionSU.id_user = usuSU.id)
            INNER JOIN permission_level permission ON (permission.id = permissionSU.id_permission_level)
          WHERE
            usuSU.user = $1 and
            permission."level" = 2
          ) tabela
        WHERE
          tabela.value IS NOT null
        ORDER BY 1`;
      const values = [user];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  CreatePassTimeAllChart: async (user) => {
    try {
      const query = 
      `select DISTINCT
        se.name sector,
        usu.user,
        cli.operation,
        cli.date,
        cli.contract
        from
        clients cli
        INNER JOIN users_clients_comissions usuCliCom ON (usuCliCom.id_client = cli.id)
        INNER JOIN users_sectors usuSe ON (usuSe.id_user = usuCliCom.id_user)
        inner JOIN users usu ON (usu.id = usuSe.id_user)
        INNER JOIN sectors se ON (se.id = usuSe.id_sector)
        INNER JOIN users_sectors ususeSU ON (ususeSU.id_sector = se.id)
        INNER JOIN users usuSU ON (usuSU.id = ususeSU.id_user)
        INNER JOIN users_permissions permissionSU ON (permissionSU.id_user = usuSU.id)
        INNER JOIN permission_level permission ON (permission.id = permissionSU.id_permission_level)
        where
        usuSU.user = $1 and
        permission."level" = 2`;
      const values = [user];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  CreateSupervisorTable: async (user) => {
    try {
      const query = 
      `WITH cliente AS (
        select
          *
        from
          clients cli
        ),comissao AS (
        select
          comi.comission,
          comi.value,
          comi.id_sector,
          comi.created_at
        from
          comissions comi
        )
        SELECT DISTINCT
        *
        FROM
        (
        select distinct
        cli.codclient,
        cli."name",
        cli.city,
        cli.contract,
        cli."date",
        cli.operation,
        cli.codplan,
        cli.plan,
        cli.plan_value,
        cli.cod_old_plan,
        cli.old_plan,
        cli.old_plan_value,
        cli.cod_new_plan,
        cli.new_plan,
        cli.new_plan_value,
        cli.operator,
        cli.city_operator,
        cli.recurring_payment,
        cli.tv,
        cli.telephony,
        cli.invoice,
        cli.paid,
        cli.due_date,
        CASE
        WHEN cli.date >= date(comi.created_at)
            AND cli.date < COALESCE(
                    (
                  SELECT
                  min(date(created_at))
                FROM
                  comissions
                WHERE
                  date(created_at) > date(comi.created_at) and
                  (
                    comission = comi.comission
                    OR
                    (
                      comission = comi.comission and
                      comi.comission ILIKE ANY(ARRAY['Dia 1', 'Dia 2'])
                    )
                  )and
                  id_sector = se.id
                ORDER BY 1), 
                    '9999-12-31'::date
                )
            THEN
              CASE
                when position('valor_plano' in comi.value) != 0 THEN REPLACE(comi.value, 'valor_plano', cli.plan_value||'')
                when position('novo_plano_valor' in comi.value) != 0 THEN
                  case
                    WHEN position('velho_plano_valor' in comi.value) != 0 THEN REPLACE(REPLACE(comi.value, 'novo_plano_valor', cli.new_plan_value||''), 'velho_plano_valor', cli.old_plan_value||'')
                    ELSE REPLACE(comi.value, 'novo_plano_valor', cli.new_plan_value||'')
                  end
                when position('velho_plano_valor' in comi.value) != 0 THEN 
                  case
                    WHEN position('novo_plano_valor' in comi.value) != 0 THEN REPLACE(REPLACE(comi.value, 'velho_plano_valor', cli.old_plan_value||''), 'novo_plano_valor', cli.new_plan_value||'')
                    ELSE REPLACE(comi.value, 'velho_plano_valor', cli.old_plan_value||'')
                  end
                WHEN comi.comission ILIKE ANY(ARRAY['Dia 1', 'Dia 2']) then
                  case
                    WHEN SPLIT_PART(comi.value, ' ', 1) = cli.due_date THEN SPLIT_PART(comi.value, ' ', 3)
                    ELSE NULL
                  end
                ELSE comi.value
              END
        END comission,
        aceito.accepted
        from
        users usu
        INNER JOIN cliente cli ON (cli.operator = usu.user)
        INNER JOIN comissao comi ON (comi.comission = cli.operation OR (
          comi.comission ILIKE ANY(ARRAY['Dia 1', 'Dia 2']) and
          cli.operation = 'Venda'
          )
        )
        INNER JOIN users_sectors ususe ON (ususe.id_user = usu.id)
        INNER JOIN sectors se ON (se.id = comi.id_sector AND se.id = ususe.id_sector)
        INNER JOIN users_sectors ususeSU ON (ususeSU.id_sector = se.id)
        INNER JOIN users usuSU ON (usuSU.id = ususeSU.id_user)
        INNER JOIN users_permissions permissionSU ON (permissionSU.id_user = usuSU.id)
        INNER JOIN permission_level permission ON (permission.id = permissionSU.id_permission_level)
        LEFT JOIN users_clients_comissions userCC ON (userCC.id_client = cli.id AND userCC.id_user = usu.id)
        LEFT JOIN comissions_accepted aceito ON (aceito.id_user_client_comission = userCC.id)
        where
        usuSU.user = $1 and
        permission."level" = 2
        ) tabela
        WHERE
        tabela.comission IS NOT null
        order by 3,6,5`;
      const values = [user];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  CreateCityUsersChart: async (user) => {
    try {
      const query = 
      `select distinct
        cli.city,
        cli."date",
        usu.user,
        cli.contract
        from
        clients cli
        INNER JOIN users usu ON (usu.user = cli.operator)
        INNER JOIN users_sectors ususe ON (ususe.id_user = usu.id)
          INNER JOIN sectors se ON (se.id = ususe.id_sector)
          INNER JOIN users_sectors ususeSU ON (ususeSU.id_sector = se.id)
          INNER JOIN users usuSU ON (usuSU.id = ususeSU.id_user)
          INNER JOIN users_permissions permissionSU ON (permissionSU.id_user = usuSU.id)
          INNER JOIN permission_level permission ON (permission.id = permissionSU.id_permission_level)
        where
        usuSU.user = $1 and
        permission.level = 2`;
      const values = [user];
      const result = await dbComissao.query(query, values);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
  CreateAllTable: async () => {
    try {
      const query = 
      `WITH cliente AS (
        select
        *
        from
        clients cli
        ),comissao AS (
        select
        comi.comission,
        comi.value,
        comi.id_sector,
        comi.created_at
        from
        comissions comi
        )
        SELECT DISTINCT
        *
        FROM
        (
        select distinct
        cli.codclient,
        cli."name",
        cli.city,
        cli.contract,
        cli."date",
        cli.operation,
        cli.codplan,
        cli.plan,
        cli.plan_value,
        cli.cod_old_plan,
        cli.old_plan,
        cli.old_plan_value,
        cli.cod_new_plan,
        cli.new_plan,
        cli.new_plan_value,
        cli.operator,
        cli.city_operator,
        cli.recurring_payment,
        cli.tv,
        cli.telephony,
        cli.invoice,
        cli.paid,
        cli.due_date,
        CASE
        WHEN cli.date >= date(comi.created_at)
          AND cli.date < COALESCE(
                  (
                SELECT
                min(date(created_at))
              FROM
                comissions
              WHERE
                date(created_at) > date(comi.created_at) and
                (
                  comission = comi.comission
                  OR
                  (
                    comission = comi.comission and
                    comi.comission ILIKE ANY(ARRAY['Dia 1', 'Dia 2'])
                  )
                )and
                id_sector = se.id
              ORDER BY 1), 
                  '9999-12-31'::date
              )
          THEN
            CASE
              when position('valor_plano' in comi.value) != 0 THEN REPLACE(comi.value, 'valor_plano', cli.plan_value||'')
              when position('novo_plano_valor' in comi.value) != 0 THEN
                case
                  WHEN position('velho_plano_valor' in comi.value) != 0 THEN REPLACE(REPLACE(comi.value, 'novo_plano_valor', cli.new_plan_value||''), 'velho_plano_valor', cli.old_plan_value||'')
                  ELSE REPLACE(comi.value, 'novo_plano_valor', cli.new_plan_value||'')
                end
              when position('velho_plano_valor' in comi.value) != 0 THEN 
                case
                  WHEN position('novo_plano_valor' in comi.value) != 0 THEN REPLACE(REPLACE(comi.value, 'velho_plano_valor', cli.old_plan_value||''), 'novo_plano_valor', cli.new_plan_value||'')
                  ELSE REPLACE(comi.value, 'velho_plano_valor', cli.old_plan_value||'')
                end
              WHEN comi.comission ILIKE ANY(ARRAY['Dia 1', 'Dia 2']) then
                case
                  WHEN SPLIT_PART(comi.value, ' ', 1) = cli.due_date THEN SPLIT_PART(comi.value, ' ', 3)
                  ELSE NULL
                end
              ELSE comi.value
            END
        END comission,
        comi.value formula,
        se.name sector
        from
        users usu
        INNER JOIN cliente cli ON (cli.operator = usu.user)
        INNER JOIN comissao comi ON (comi.comission = cli.operation OR (
        comi.comission ILIKE ANY(ARRAY['Dia 1', 'Dia 2']) and
        cli.operation = 'Venda'
        )
        )
        INNER JOIN users_sectors ususe ON (ususe.id_user = usu.id)
        INNER JOIN sectors se ON (se.id = comi.id_sector AND se.id = ususe.id_sector)
        ) tabela
        WHERE
        tabela.comission IS NOT null
        order by 3,6,5`;
      const result = await dbComissao.query(query);
      return result.rows;
    } catch (error) {
     throw error;
    }
  },
};
 
module.exports = CreateSellChart;