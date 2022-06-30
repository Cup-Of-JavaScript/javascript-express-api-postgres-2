/** 
 * book
 */
 
create sequence book_seq as integer;

CREATE TABLE IF NOT EXISTS public.book
(
    book_id integer NOT NULL DEFAULT nextval('book_seq'::regclass),
    title character varying(50) COLLATE pg_catalog."default",
	isbn character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT book_id_pkey PRIMARY KEY (book_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.book
    OWNER to postgres;
	
alter sequence book_seq owned by book.book_id;

/** 
 * book_store
 */
 
create sequence book_store_seq as integer;

CREATE TABLE IF NOT EXISTS public.book_store
(
    book_store_id integer NOT NULL DEFAULT nextval('book_store_seq'::regclass),
    book_store_name character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT book_store_pkey PRIMARY KEY (book_store_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.book_store
    OWNER to postgres;
	
alter sequence book_store_seq owned by book_store.book_store_id;

/**
 * book_store_book
 */
 
create sequence book_store_book_seq as integer;

CREATE TABLE IF NOT EXISTS public.book_store_book
(
    book_store_book_id integer NOT NULL DEFAULT nextval('book_store_book_seq'::regclass),
    book_id integer,
	book_store_id integer,
    CONSTRAINT book_store_book_id_pkey PRIMARY KEY (book_store_book_id),
	CONSTRAINT book_fk FOREIGN KEY (book_id)
		REFERENCES public.book (book_id) MATCH SIMPLE
		ON UPDATE NO ACTION
		ON DELETE NO ACTION
		NOT VALID,
	CONSTRAINT book_store_fk FOREIGN KEY (book_store_id)
		REFERENCES public.book_store (book_store_id) MATCH SIMPLE
		ON UPDATE NO ACTION
		ON DELETE NO ACTION
		NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.book_store_book
    OWNER to postgres;
	
alter sequence book_store_book_seq owned by book_store_book.book_store_book_id;

/**
 * person_type
 */
create sequence person_type_seq as integer;

CREATE TABLE IF NOT EXISTS public.person_type
(
    person_type_id integer NOT NULL DEFAULT nextval('person_type_seq'::regclass),
    person_type character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT person_type_pkey PRIMARY KEY (person_type_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.person_type
    OWNER to postgres;
	
alter sequence person_type_seq owned by person_type.person_type_id;

/**
 * person
 */
create sequence person_seq as integer;

CREATE TABLE IF NOT EXISTS public.person
(
    person_id integer NOT NULL DEFAULT nextval('person_seq'::regclass),
    person_type_id integer,
	book_store_id integer,
    first_name character varying(50) COLLATE pg_catalog."default",
    last_name character varying(50) COLLATE pg_catalog."default",
    dob date,
    CONSTRAINT person_pkey PRIMARY KEY (person_id),
    CONSTRAINT "bs-fk" FOREIGN KEY (book_store_id)
        REFERENCES public.book_store (book_store_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "pt-fk" FOREIGN KEY (person_type_id)
        REFERENCES public.person_type (person_type_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.person
    OWNER to postgres;
	
alter sequence person_seq owned by person.person_id;

/*----------------------------------------------------------------------------*/

INSERT INTO public.book(title, isbn) values ('Relentless', '111-1-11-11111-1');
INSERT INTO public.book(title, isbn) values ('Alice in Wonderland', '222-2-22-22222-2');
INSERT INTO public.book(title, isbn) values ('Do Androids Dream of Electric Sleep', '333-3-33-33333-3');
INSERT INTO public.book(title, isbn) values ('Everything I Never Told You', '444-4-44-44444-4');
INSERT INTO public.book(title, isbn) values ('Are You There, Vodka', '555-5-55-55555-5');
INSERT INTO public.book(title, isbn) values ('The Devil Drives a Tesla', '666-6-66-66666-6');
INSERT INTO public.book(title, isbn) values ('Capser the Friendly Ghost', '777-7-77-77777-7');
INSERT INTO public.book(title, isbn) values ('Cloudy with a Chance of Meatballs', '888-8-88-88888-8');
INSERT INTO public.book(title, isbn) values ('A Day at the Beach', '999-9-99-99999-9');

INSERT INTO public.book_store(book_store_name) VALUES ('Barnes & Nobles');
INSERT INTO public.book_store(book_store_name) VALUES ('Books are Us');
INSERT INTO public.book_store(book_store_name) VALUES ('Best Books in Town');

INSERT INTO public.person_type(person_type) VALUES ('Manager');
INSERT INTO public.person_type(person_type) VALUES ('Cashier');
INSERT INTO public.person_type(person_type) VALUES ('Stock Person');

INSERT INTO person(person_type_id, book_store_id, first_name, last_name, dob) values (1, 1, 'Alice', 'Jones', '8/29/1970');
INSERT INTO person(person_type_id, book_store_id, first_name, last_name, dob) values (1, 2, 'Bob', 'Marley', '2/15/1975');
INSERT INTO person(person_type_id, book_store_id, first_name, last_name, dob) values (1, 3, 'Charlie', 'Thomas', '9/12/1976');
INSERT INTO person(person_type_id, book_store_id, first_name, last_name, dob) values (2, 1, 'Dave', 'Campbell', '7/10/1979');
INSERT INTO person(person_type_id, book_store_id, first_name, last_name, dob) values (2, 1, 'Earl', 'Jendkins', '9/8/1980');
INSERT INTO person(person_type_id, book_store_id, first_name, last_name, dob) values (2, 2, 'Frank', 'Zappa', '1/8/1981');
INSERT INTO person(person_type_id, book_store_id, first_name, last_name, dob) values (2, 2, 'George', 'Smith', '3/8/1986');
INSERT INTO person(person_type_id, book_store_id, first_name, last_name, dob) values (3, 3, 'Harry', 'Chapmin', '6/9/1980');
INSERT INTO person(person_type_id, book_store_id, first_name, last_name, dob) values (3, 3, 'Jack', 'Grow', '10/8/1988');
INSERT INTO person(person_type_id, book_store_id, first_name, last_name, dob) values (3, 3, 'Kim', 'Weldon', '11/8/1970');

INSERT INTO public.book_store_book (book_id, book_store_id) values (1,1);
INSERT INTO public.book_store_book (book_id, book_store_id) values (2,1);
INSERT INTO public.book_store_book (book_id, book_store_id) values (3,1);
INSERT INTO public.book_store_book (book_id, book_store_id) values (4,2);
INSERT INTO public.book_store_book (book_id, book_store_id) values (5,2);
INSERT INTO public.book_store_book (book_id, book_store_id) values (6,2);
INSERT INTO public.book_store_book (book_id, book_store_id) values (1,3);
INSERT INTO public.book_store_book (book_id, book_store_id) values (2,3);
INSERT INTO public.book_store_book (book_id, book_store_id) values (3,3);
INSERT INTO public.book_store_book (book_id, book_store_id) values (4,3);
INSERT INTO public.book_store_book (book_id, book_store_id) values (5,3);
INSERT INTO public.book_store_book (book_id, book_store_id) values (6,3);
INSERT INTO public.book_store_book (book_id, book_store_id) values (7,3);
INSERT INTO public.book_store_book (book_id, book_store_id) values (8,3);
INSERT INTO public.book_store_book (book_id, book_store_id) values (9,3);

create view view_person as
select 
	p.person_id, 
	p.person_type_id,
	p.book_store_id,
	p.first_name, 
	p.last_name,
	p.dob, 
	pt.person_type,
	bs.book_store_name
from person p
 join person_type pt on p.person_type_id = pt.person_type_id
 join book_store bs on p.book_store_id = bs.book_store_id;
 
create view view_bookstore as
select b.*, bs.* 
from book b
  join book_store_book bsb on bsb.book_id = b.book_id
  join book_store bs on bsb.book_store_id = bs.book_store_id

/* 
  drop table person_type cascade;
  drop table person cascade;
  drop table book_store cascade;
  drop table book cascade;
  drop table book_store_book;
  
  select * from view_person;
  select * from view_bookstore;
*/