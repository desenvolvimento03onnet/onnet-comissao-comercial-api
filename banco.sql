--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: insert_comission_accepted(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.insert_comission_accepted() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO comissions_accepted (id_user_client_comission, accepted)
    VALUES (NEW.id, 'Não');
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.insert_comission_accepted() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cities (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    uf character varying(2) NOT NULL
);


ALTER TABLE public.cities OWNER TO postgres;

--
-- Name: cities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cities_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cities_id_seq OWNER TO postgres;

--
-- Name: cities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cities_id_seq OWNED BY public.cities.id;


--
-- Name: clients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clients (
    id integer NOT NULL,
    codclient integer NOT NULL,
    name character varying(150) NOT NULL,
    city character varying(50) NOT NULL,
    contract integer NOT NULL,
    date date NOT NULL,
    operation character varying(20),
    codplan integer NOT NULL,
    plan character varying(60) NOT NULL,
    plan_value double precision NOT NULL,
    cod_old_plan integer,
    old_plan character varying(60),
    old_plan_value double precision,
    cod_new_plan integer,
    new_plan character varying(60),
    new_plan_value double precision,
    operator character varying(20) NOT NULL,
    city_operator character varying(50),
    recurring_payment boolean NOT NULL,
    tv boolean NOT NULL,
    telephony boolean NOT NULL,
    invoice integer NOT NULL,
    paid boolean NOT NULL,
    due_date character varying(2) NOT NULL
);


ALTER TABLE public.clients OWNER TO postgres;

--
-- Name: clients_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.clients_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.clients_id_seq OWNER TO postgres;

--
-- Name: clients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.clients_id_seq OWNED BY public.clients.id;


--
-- Name: comissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comissions (
    id integer NOT NULL,
    active boolean NOT NULL,
    comission character varying(20) NOT NULL,
    value character varying(50) NOT NULL,
    id_sector integer,
    created_at timestamp without time zone
);


ALTER TABLE public.comissions OWNER TO postgres;

--
-- Name: comissions_accepted_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comissions_accepted_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comissions_accepted_id_seq OWNER TO postgres;

--
-- Name: comissions_accepted; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comissions_accepted (
    id integer DEFAULT nextval('public.comissions_accepted_id_seq'::regclass) NOT NULL,
    id_user_client_comission integer NOT NULL,
    accepted character(3) NOT NULL
);


ALTER TABLE public.comissions_accepted OWNER TO postgres;

--
-- Name: comissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comissions_id_seq OWNER TO postgres;

--
-- Name: comissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comissions_id_seq OWNED BY public.comissions.id;


--
-- Name: comissions_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comissions_logs (
    id integer NOT NULL,
    date timestamp without time zone NOT NULL,
    id_comission integer NOT NULL,
    id_user integer NOT NULL,
    description character varying(150) NOT NULL
);


ALTER TABLE public.comissions_logs OWNER TO postgres;

--
-- Name: comissions_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comissions_logs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comissions_logs_id_seq OWNER TO postgres;

--
-- Name: comissions_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comissions_logs_id_seq OWNED BY public.comissions_logs.id;


--
-- Name: permission_cities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.permission_cities (
    id integer NOT NULL,
    id_permission_level integer NOT NULL,
    id_city integer NOT NULL
);


ALTER TABLE public.permission_cities OWNER TO postgres;

--
-- Name: permission_cities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.permission_cities_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.permission_cities_id_seq OWNER TO postgres;

--
-- Name: permission_cities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.permission_cities_id_seq OWNED BY public.permission_cities.id;


--
-- Name: permission_level; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.permission_level (
    id integer NOT NULL,
    level integer NOT NULL,
    description character varying(50) NOT NULL,
    active boolean NOT NULL
);


ALTER TABLE public.permission_level OWNER TO postgres;

--
-- Name: permission_level_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.permission_level_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.permission_level_id_seq OWNER TO postgres;

--
-- Name: permission_level_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.permission_level_id_seq OWNED BY public.permission_level.id;


--
-- Name: sectors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sectors (
    id integer NOT NULL,
    active boolean NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.sectors OWNER TO postgres;

--
-- Name: sectors_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sectors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sectors_id_seq OWNER TO postgres;

--
-- Name: sectors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sectors_id_seq OWNED BY public.sectors.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    "user" character varying(20) NOT NULL,
    name character varying(100) NOT NULL,
    password character varying(50) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    id_city integer NOT NULL,
    active boolean
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_clients_comissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_clients_comissions (
    id integer NOT NULL,
    id_user integer NOT NULL,
    id_client integer NOT NULL,
    created_at timestamp without time zone NOT NULL,
    comission_value double precision NOT NULL
);


ALTER TABLE public.users_clients_comissions OWNER TO postgres;

--
-- Name: users_clients_comissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_clients_comissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_clients_comissions_id_seq OWNER TO postgres;

--
-- Name: users_clients_comissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_clients_comissions_id_seq OWNED BY public.users_clients_comissions.id;


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_logs (
    id integer NOT NULL,
    date timestamp without time zone NOT NULL,
    id_user integer NOT NULL,
    description character varying(150) NOT NULL,
    type character varying(30) NOT NULL
);


ALTER TABLE public.users_logs OWNER TO postgres;

--
-- Name: users_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_logs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_logs_id_seq OWNER TO postgres;

--
-- Name: users_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_logs_id_seq OWNED BY public.users_logs.id;


--
-- Name: users_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_permissions (
    id integer NOT NULL,
    id_user integer NOT NULL,
    id_permission_level integer NOT NULL
);


ALTER TABLE public.users_permissions OWNER TO postgres;

--
-- Name: users_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_permissions_id_seq OWNER TO postgres;

--
-- Name: users_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_permissions_id_seq OWNED BY public.users_permissions.id;


--
-- Name: users_sectors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_sectors (
    id integer NOT NULL,
    id_sector integer NOT NULL,
    id_user integer NOT NULL
);


ALTER TABLE public.users_sectors OWNER TO postgres;

--
-- Name: users_sectors_id_user_sector_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_sectors_id_user_sector_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_sectors_id_user_sector_seq OWNER TO postgres;

--
-- Name: users_sectors_id_user_sector_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_sectors_id_user_sector_seq OWNED BY public.users_sectors.id;


--
-- Name: cities id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cities ALTER COLUMN id SET DEFAULT nextval('public.cities_id_seq'::regclass);


--
-- Name: clients id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients ALTER COLUMN id SET DEFAULT nextval('public.clients_id_seq'::regclass);


--
-- Name: comissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comissions ALTER COLUMN id SET DEFAULT nextval('public.comissions_id_seq'::regclass);


--
-- Name: comissions_logs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comissions_logs ALTER COLUMN id SET DEFAULT nextval('public.comissions_logs_id_seq'::regclass);


--
-- Name: permission_cities id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permission_cities ALTER COLUMN id SET DEFAULT nextval('public.permission_cities_id_seq'::regclass);


--
-- Name: permission_level id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permission_level ALTER COLUMN id SET DEFAULT nextval('public.permission_level_id_seq'::regclass);


--
-- Name: sectors id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sectors ALTER COLUMN id SET DEFAULT nextval('public.sectors_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: users_clients_comissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_clients_comissions ALTER COLUMN id SET DEFAULT nextval('public.users_clients_comissions_id_seq'::regclass);


--
-- Name: users_logs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_logs ALTER COLUMN id SET DEFAULT nextval('public.users_logs_id_seq'::regclass);


--
-- Name: users_permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_permissions ALTER COLUMN id SET DEFAULT nextval('public.users_permissions_id_seq'::regclass);


--
-- Name: users_sectors id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_sectors ALTER COLUMN id SET DEFAULT nextval('public.users_sectors_id_user_sector_seq'::regclass);


--
-- Data for Name: cities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cities (id, name, uf) FROM stdin;
1	Abadia dos Dourados	MG
2	Araguari	MG
3	Buritizeiro	MG
4	Cruzeiro da Fortaleza	MG
5	Guimarânia	MG
6	Iraí de Minas	MG
7	João Pinheiro	MG
8	Lagoa Formosa	MG
9	Patos de Minas	MG
10	Patrocínio	MG
11	Pirapora	MG
12	Presidente Olegário	MG
13	São Gonçalo do Abaeté	MG
14	Três Marias	MG
15	Varjão de Minas	MG
16	Várzea da Palma	MG
\.


--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clients (id, codclient, name, city, contract, date, operation, codplan, plan, plan_value, cod_old_plan, old_plan, old_plan_value, cod_new_plan, new_plan, new_plan_value, operator, city_operator, recurring_payment, tv, telephony, invoice, paid, due_date) FROM stdin;
1	1	Cliente_1	Guimarânia	1	2025-01-07	Upgrade	1	PLANO_1_108.33	108.33	8255	PLANO_ANTIGO_104,72	104.72	1	PLANO_1_108.33	108.33	teste1	Guimarânia	f	f	f	1	t	10
2	2	Cliente_2	Guimarânia	2	2025-01-07	Renovação	2	PLANO_2_82.90	82.9	9339	PLANO_ANTIGO_82.90	82.9	2	PLANO_2_82.90	82.9	teste1	Guimarânia	f	f	f	2	t	15
3	3	Cliente_3	Guimarânia	3	2025-01-07	Downgrade	4	PLANO_4_89.90	89.9	9095	PLANO_ANTIGO_1_99.90	99.9	4	PLANO_4_89.90	89.9	teste1	Guimarânia	f	f	f	3	t	12
4	4	Cliente_4	João Pinheiro	4	2025-02-03	Renovação	5	PLANO_5_89.90	89.9	4	PLANO_4_89.90	89.9	5	PLANO_5_89.90	89.9	francielle116	João Pinheiro	f	f	f	4	t	7
5	5	Cliente_5	Guimarânia	5	2025-02-03	Renovação	3	PLANO_3_99.90	99.9	6887	PLANO_ANTIGO_99.90	99.9	3	PLANO_3_99.90	99.9	teste1	Guimarânia	f	f	f	3	f	28
6	6	Cliente_6	Guimarânia	6	2025-01-07	Venda	6	PLANO_6_89.90	89.9	\N	\N	\N	\N	\N	\N	teste1	Guimarânia	f	f	f	6	f	12
\.


--
-- Data for Name: comissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comissions (id, active, comission, value, id_sector, created_at) FROM stdin;
2	t	Upgrade	((novo_plano_valor - velho_plano_valor) * 0.10)+2	2	2024-05-01 09:47:56.723631
3	t	Downgrade	0	2	2024-05-01 09:47:56.723631
4	t	Renovação	4	3	2024-05-01 09:47:56.723631
5	t	Upgrade	((novo_plano_valor - velho_plano_valor) * 0.25)+5	3	2024-05-01 09:47:56.723631
6	t	Downgrade	0	3	2024-05-01 09:47:56.723631
7	t	Renovação	6	4	2024-05-01 09:47:56.723631
8	t	Upgrade	7	4	2024-05-01 09:47:56.723631
9	t	Downgrade	0	4	2024-05-01 09:47:56.723631
10	t	Venda	valor_plano * 0.10	2	2024-05-01 09:47:56.723631
11	t	Venda	valor_plano * 0.10	3	2024-05-01 09:47:56.723631
12	t	Venda	20	4	2024-05-01 09:47:56.723631
13	t	Renovação	3	2	2025-02-01 09:48:56.723631
1	t	Renovação	2	2	2025-01-01 09:47:56.723631
15	t	Dia 2	15 = 3	2	2025-01-01 09:47:56.723631
14	t	Dia 1	12 = 4	2	2025-01-06 09:47:56
16	t	Dia 1	12 = 5	2	2025-01-01 09:47:56
\.


--
-- Data for Name: comissions_accepted; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comissions_accepted (id, id_user_client_comission, accepted) FROM stdin;
1	1	Não
2	2	Não
3	3	Não
4	4	Não
6	6	Não
7	7	Não
8	8	Não
5	5	Sim
\.


--
-- Data for Name: comissions_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comissions_logs (id, date, id_comission, id_user, description) FROM stdin;
\.


--
-- Data for Name: permission_cities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.permission_cities (id, id_permission_level, id_city) FROM stdin;
\.


--
-- Data for Name: permission_level; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.permission_level (id, level, description, active) FROM stdin;
1	1	Administração	t
2	2	Gerente	t
3	3	Operador	t
\.


--
-- Data for Name: sectors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sectors (id, active, name) FROM stdin;
1	t	DESENVOLVIMENTO
4	t	PAP
2	t	FRENTE-LOJA
3	t	TELEMARKETING
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, "user", name, password, created_at, id_city, active) FROM stdin;
1	teste1	Teste1	dGVzdGUy	2025-01-02 08:00:00.729383	10	t
2	teste2	Teste2	dGVzdGU0	2025-01-02 08:00:00.729383	10	t
3	teste3	Teste3	dGVzdGU=	2025-01-02 08:00:00.729383	10	t
\.


--
-- Data for Name: users_clients_comissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_clients_comissions (id, id_user, id_client, created_at, comission_value) FROM stdin;
3	1	6	2025-04-22 08:00:00	4
1	1	2	2025-04-22 08:00:00	2
2	1	3	2025-04-22 08:00:00	0
4	1	5	2025-04-22 08:00:00	3
5	1	1	2025-04-22 08:00:00	2.36
8	1	6	2025-04-22 08:00:00	8.99
6	1	6	2025-04-22 08:00:00	4
7	1	6	2025-04-22 08:00:00	8.99
\.


--
-- Data for Name: users_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_logs (id, date, id_user, description, type) FROM stdin;
1	2025-01-01 01:01:01	1	Usuário: teste1 acessou o sistema em: 01/01/2025, 00:00:01 com o IP: 127.0.0.1	Acesso Sistema
\.


--
-- Data for Name: users_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_permissions (id, id_user, id_permission_level) FROM stdin;
2	2	2
1	1	3
3	3	1
\.


--
-- Data for Name: users_sectors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_sectors (id, id_sector, id_user) FROM stdin;
1	2	1
3	2	2
\.


--
-- Name: cities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cities_id_seq', 16, true);


--
-- Name: clients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clients_id_seq', 315, true);


--
-- Name: comissions_accepted_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comissions_accepted_id_seq', 8, true);


--
-- Name: comissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comissions_id_seq', 16, true);


--
-- Name: comissions_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comissions_logs_id_seq', 1, false);


--
-- Name: permission_cities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.permission_cities_id_seq', 1, false);


--
-- Name: permission_level_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.permission_level_id_seq', 3, true);


--
-- Name: sectors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sectors_id_seq', 4, true);


--
-- Name: users_clients_comissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_clients_comissions_id_seq', 1032, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: users_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_logs_id_seq', 209, true);


--
-- Name: users_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_permissions_id_seq', 3, true);


--
-- Name: users_sectors_id_user_sector_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_sectors_id_user_sector_seq', 3, true);


--
-- Name: cities cities_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT cities_pk PRIMARY KEY (id);


--
-- Name: clients clients_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pk PRIMARY KEY (id);


--
-- Name: comissions_accepted comissions_accepted_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comissions_accepted
    ADD CONSTRAINT comissions_accepted_pkey PRIMARY KEY (id);


--
-- Name: comissions_logs comissions_logs_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comissions_logs
    ADD CONSTRAINT comissions_logs_pk PRIMARY KEY (id);


--
-- Name: comissions comissions_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comissions
    ADD CONSTRAINT comissions_pk PRIMARY KEY (id);


--
-- Name: users id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT id PRIMARY KEY (id);


--
-- Name: permission_cities permission_cities_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permission_cities
    ADD CONSTRAINT permission_cities_pk PRIMARY KEY (id);


--
-- Name: permission_level permission_level_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permission_level
    ADD CONSTRAINT permission_level_pk PRIMARY KEY (id);


--
-- Name: sectors sectors_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sectors
    ADD CONSTRAINT sectors_pk PRIMARY KEY (id);


--
-- Name: users_clients_comissions users_clients_comissions_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_clients_comissions
    ADD CONSTRAINT users_clients_comissions_pk PRIMARY KEY (id);


--
-- Name: users_logs users_logs_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_logs
    ADD CONSTRAINT users_logs_pk PRIMARY KEY (id);


--
-- Name: users_permissions users_permissions_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_permissions
    ADD CONSTRAINT users_permissions_pk PRIMARY KEY (id);


--
-- Name: users_sectors users_sectors_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_sectors
    ADD CONSTRAINT users_sectors_pk PRIMARY KEY (id);


--
-- Name: users_clients_comissions trigger_insert_comission_accepted; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trigger_insert_comission_accepted AFTER INSERT ON public.users_clients_comissions FOR EACH ROW EXECUTE FUNCTION public.insert_comission_accepted();


--
-- Name: permission_cities cities_permission_cities_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permission_cities
    ADD CONSTRAINT cities_permission_cities_fk FOREIGN KEY (id_city) REFERENCES public.cities(id);


--
-- Name: users cities_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT cities_users_fk FOREIGN KEY (id_city) REFERENCES public.cities(id);


--
-- Name: users_clients_comissions clients_users_clients_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_clients_comissions
    ADD CONSTRAINT clients_users_clients_fk FOREIGN KEY (id_client) REFERENCES public.clients(id);


--
-- Name: comissions_accepted comissions_accepted_id_user_client_comission_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comissions_accepted
    ADD CONSTRAINT comissions_accepted_id_user_client_comission_fkey FOREIGN KEY (id_user_client_comission) REFERENCES public.users_clients_comissions(id);


--
-- Name: comissions_logs comissions_comissions_logs_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comissions_logs
    ADD CONSTRAINT comissions_comissions_logs_fk FOREIGN KEY (id_comission) REFERENCES public.comissions(id);


--
-- Name: comissions comissions_id_sector_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comissions
    ADD CONSTRAINT comissions_id_sector_fkey FOREIGN KEY (id_sector) REFERENCES public.sectors(id);


--
-- Name: permission_cities permission_level_permission_cities_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permission_cities
    ADD CONSTRAINT permission_level_permission_cities_fk FOREIGN KEY (id_permission_level) REFERENCES public.permission_level(id);


--
-- Name: users_permissions permission_level_users_permissions_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_permissions
    ADD CONSTRAINT permission_level_users_permissions_fk FOREIGN KEY (id_permission_level) REFERENCES public.permission_level(id);


--
-- Name: users_sectors sectors_users_sectors_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_sectors
    ADD CONSTRAINT sectors_users_sectors_fk FOREIGN KEY (id_sector) REFERENCES public.sectors(id);


--
-- Name: comissions_logs users_comissions_logs_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comissions_logs
    ADD CONSTRAINT users_comissions_logs_fk FOREIGN KEY (id_user) REFERENCES public.users(id);


--
-- Name: users_logs users_user_logs_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_logs
    ADD CONSTRAINT users_user_logs_fk FOREIGN KEY (id_user) REFERENCES public.users(id);


--
-- Name: users_clients_comissions users_users_clients_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_clients_comissions
    ADD CONSTRAINT users_users_clients_fk FOREIGN KEY (id_user) REFERENCES public.users(id);


--
-- Name: users_permissions users_users_permissions_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_permissions
    ADD CONSTRAINT users_users_permissions_fk FOREIGN KEY (id_user) REFERENCES public.users(id);


--
-- Name: users_sectors users_users_sectors_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_sectors
    ADD CONSTRAINT users_users_sectors_fk FOREIGN KEY (id_user) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

