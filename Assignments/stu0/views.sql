create view view_account as 
    select 
    a.account_id,
    bu.bank_user_id,
    at.account_type_id,
    a.create_date,
    bu.first_name,
    bu.last_name,
    bu.dob,
    at.account_name
    from account a
    join bank_user bu on a.bank_user_id = bu.bank_user_id
    join account_type at on a.account_type_id = at.account_type_id
  

create view view_transaction as
    select 
    t.transaction_id,
    t.account_id,
    t.transaction_type_id,
    t.dollar_amount,
    bu.bank_user_id,
    bu.first_name,
    bu.last_name,
    bu.dob,
    t.transaction_date,
    tt.the_type
    from transaction t
    join transaction_type tt on t.transaction_type_id = tt.transaction_type_id
    join account a on a.account_id = t.account_id
    join bank_user bu on bu.bank_user_id = a.bank_user_id
