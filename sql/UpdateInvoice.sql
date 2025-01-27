update
	clients
set
	invoice = case
		when invoice != 490283 then 490283
		else invoice
	end,
	paid = true,
	tv = false,
	telephony = false,
	recurring_payment = false
where
	codclient = 86592 and
	operation = 'Renovação' and
	"date" = date('2021-05-07')