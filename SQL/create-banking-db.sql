BEGIN;

CREATE TABLE IF NOT EXISTS public.account
(
    account_id serial NOT NULL,
    bank_user_id integer,
    create_date date,
    account_type_id integer,
    PRIMARY KEY (account_id)
);

CREATE TABLE IF NOT EXISTS public.bank_user
(
    first_name text,
    last_name text,
    dob date,
    bank_user_id serial NOT NULL,
    PRIMARY KEY (bank_user_id)
);

CREATE TABLE IF NOT EXISTS public.transaction
(
    transaction_id serial NOT NULL,
    account_id integer,
    transaction_type_id integer,
    dollar_amount money,
    transaction_date date,
    PRIMARY KEY (transaction_id)
);

CREATE TABLE IF NOT EXISTS public.transaction_type
(
    transaction_type_id serial NOT NULL,
    the_type text,
    PRIMARY KEY (transaction_type_id)
);

CREATE TABLE IF NOT EXISTS public.account_type
(
    account_type_id serial NOT NULL,
    account_name text,
    PRIMARY KEY (account_type_id)
);

ALTER TABLE IF EXISTS public.account
    ADD FOREIGN KEY (bank_user_id)
    REFERENCES public.bank_user (bank_user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

ALTER TABLE IF EXISTS public.account
    ADD FOREIGN KEY (account_type_id)
    REFERENCES public.account_type (account_type_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

ALTER TABLE IF EXISTS public.transaction
    ADD FOREIGN KEY (transaction_type_id)
    REFERENCES public.transaction_type (transaction_type_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

ALTER TABLE IF EXISTS public.transaction
    ADD FOREIGN KEY (account_id)
    REFERENCES public.account (account_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

END;

insert into transaction_type (the_type) values ('deposit');
insert into transaction_type (the_type) values ('withdraw');

insert into account_type (account_name) values ('checking');
insert into account_type (account_name) values ('savings');
insert into account_type (account_name) values ('retirement');

insert into bank_user (first_name, last_name, dob) values ('Alice', 'Jones', '8/29/1970');
insert into bank_user (first_name, last_name, dob) values ('Bob', 'Marley', '1/29/1975');
insert into bank_user (first_name, last_name, dob) values ('Charlies', 'Daniels', '8/29/1973');

insert into account (bank_user_id, account_type_id, create_date) values (1, 1, '3/15/2020');
insert into account (bank_user_id, account_type_id, create_date) values (1, 2, '4/15/2020');
insert into account (bank_user_id, account_type_id, create_date) values (1, 3, '8/15/2020');
insert into account (bank_user_id, account_type_id, create_date) values (2, 1, '1/10/2021');
insert into account (bank_user_id, account_type_id, create_date) values (3, 1, '2/19/2022');
insert into account (bank_user_id, account_type_id, create_date) values (3, 2, '2/19/2022');

insert into transaction (account_id, transaction_type_id, dollar_amount, transaction_date) values (1, 1, 10.00, '1/1/2022');
insert into transaction (account_id, transaction_type_id, dollar_amount, transaction_date) values (1, 1, 10.00, '1/2/2022');
insert into transaction (account_id, transaction_type_id, dollar_amount, transaction_date) values (1, 1, 10.00, '1/3/2022');
insert into transaction (account_id, transaction_type_id, dollar_amount, transaction_date) values (1, 2, 1.00, '1/4/2022');
insert into transaction (account_id, transaction_type_id, dollar_amount, transaction_date) values (4, 1, 40.00, '1/1/2022');
insert into transaction (account_id, transaction_type_id, dollar_amount, transaction_date) values (4, 1, 40.00, '1/2/2022');
insert into transaction (account_id, transaction_type_id, dollar_amount, transaction_date) values (4, 1, 40.00, '1/3/2022');
insert into transaction (account_id, transaction_type_id, dollar_amount, transaction_date) values (4, 2, 4.00, '1/4/2022');
insert into transaction (account_id, transaction_type_id, dollar_amount, transaction_date) values (5, 1, 100.00, '1/4/2022');
insert into transaction (account_id, transaction_type_id, dollar_amount, transaction_date) values (5, 1, 100.00, '2/4/2022');
insert into transaction (account_id, transaction_type_id, dollar_amount, transaction_date) values (5, 1, 100.00, '3/4/2022');

insert into transaction (account_id, transaction_type_id, dollar_amount, transaction_date) values (2, 1, 20.00, '2/1/2022');
insert into transaction (account_id, transaction_type_id, dollar_amount, transaction_date) values (2, 1, 20.00, '2/2/2022');
insert into transaction (account_id, transaction_type_id, dollar_amount, transaction_date) values (2, 1, 20.00, '2/3/2022');
insert into transaction (account_id, transaction_type_id, dollar_amount, transaction_date) values (2, 2, 2.00, '2/4/2022');

insert into transaction (account_id, transaction_type_id, dollar_amount, transaction_date) values (3, 1, 30.00, '3/1/2022');
insert into transaction (account_id, transaction_type_id, dollar_amount, transaction_date) values (3, 1, 30.00, '3/2/2022');
insert into transaction (account_id, transaction_type_id, dollar_amount, transaction_date) values (3, 1, 30.00, '3/3/2022');
insert into transaction (account_id, transaction_type_id, dollar_amount, transaction_date) values (3, 2, 3.00, '3/4/2022');
insert into transaction (account_id, transaction_type_id, dollar_amount, transaction_date) values (6, 2, 60.00, '8/4/2022');
insert into transaction (account_id, transaction_type_id, dollar_amount, transaction_date) values (6, 2, 70.00, '9/4/2022');
