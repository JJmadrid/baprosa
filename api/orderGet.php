select t0.Docnum,t0.Docdate,t0.cardCode,t0.[Status]
,t0.Status,t0.inSAP,t0.docTotal,t0.RTN,t0.userID
,t1.lineNum,t1.itemCode,t1.Quantity,t1.Price
from [Order] t0
inner join OrderEntry t1 on t0.docnum=t1.docnum
where t0.docnum=$docNum