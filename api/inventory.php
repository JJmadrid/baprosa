<?php

/*select t0.itemCode,t0.itemName,t1.firmName,t0.barCode,t0.Price
from shoppingCart.Inventory t0
inner join OMRC t1 on t0.firmCode=t1.firmcode
where t1.firmName='Arroz Progreso'*/

require_once './conn.php';

$POST_DATA = file_get_contents("php://input");
$request = json_decode($POST_DATA);

$FIRM_CODE = $request->firmCode;

echo getInventoryByBrand($FIRM_CODE);
