select
	cli.codclient codcliente,
	cli.date "data",
	cli.contract,
	cli.operation,
	cli.cod_old_plan,
	cli.cod_new_plan,
	cli.invoice fatura
from
	clients cli
where
	cli.paid is false