
-- Demo seed for ToolHome V6. Run only in a development Supabase project.
insert into listings (seller_id,title,description,category,price_zar,condition,city,status)
select id,'Demo Makita Drill 18V','Demo listing for local testing.','Power Tools',2200,'Excellent','Cape Town','active'
from profiles limit 1;
