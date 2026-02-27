--
-- PostgreSQL database dump
--

\restrict JyAdpvgrDqu3nSr0r3Sx7au5SREmpagsq8A0GEHCyFYtyHMN09ZIvXVGkQtwFCW

-- Dumped from database version 16.12 (Debian 16.12-1.pgdg13+1)
-- Dumped by pg_dump version 16.12 (Debian 16.12-1.pgdg13+1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: foods; Type: TABLE; Schema: public; Owner: calories_user
--

CREATE TABLE public.foods (
    id integer NOT NULL,
    name character varying NOT NULL,
    calories_per_100g double precision NOT NULL,
    category character varying
);


ALTER TABLE public.foods OWNER TO calories_user;

--
-- Name: foods_id_seq; Type: SEQUENCE; Schema: public; Owner: calories_user
--

CREATE SEQUENCE public.foods_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.foods_id_seq OWNER TO calories_user;

--
-- Name: foods_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: calories_user
--

ALTER SEQUENCE public.foods_id_seq OWNED BY public.foods.id;


--
-- Name: foods id; Type: DEFAULT; Schema: public; Owner: calories_user
--

ALTER TABLE ONLY public.foods ALTER COLUMN id SET DEFAULT nextval('public.foods_id_seq'::regclass);


--
-- Data for Name: foods; Type: TABLE DATA; Schema: public; Owner: calories_user
--

COPY public.foods (id, name, calories_per_100g, category) FROM stdin;
1	Huevo	80	protein
2	Harina Pan	360	harina
3	Avena	380	harina
4	Harina de Garbanzos	370	harina
\.


--
-- Name: foods_id_seq; Type: SEQUENCE SET; Schema: public; Owner: calories_user
--

SELECT pg_catalog.setval('public.foods_id_seq', 4, true);


--
-- Name: foods foods_pkey; Type: CONSTRAINT; Schema: public; Owner: calories_user
--

ALTER TABLE ONLY public.foods
    ADD CONSTRAINT foods_pkey PRIMARY KEY (id);


--
-- Name: ix_foods_id; Type: INDEX; Schema: public; Owner: calories_user
--

CREATE INDEX ix_foods_id ON public.foods USING btree (id);


--
-- PostgreSQL database dump complete
--

\unrestrict JyAdpvgrDqu3nSr0r3Sx7au5SREmpagsq8A0GEHCyFYtyHMN09ZIvXVGkQtwFCW

