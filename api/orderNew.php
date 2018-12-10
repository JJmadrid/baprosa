<?php
//session_start();

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: application/json');

$servername = '184.168.194.62';
$serverName = "http://www.mssql.baprosa.com";
$username = 'shoppingCart';
$password = '#kQ56rm0';

$conn = mssql_connect($servername, $username, $password);

$requestResponse = array();

if( !$conn ) {
    die( mssql_get_last_message());
} else {

    $POST_DATA = file_get_contents("php://input");
    $request = json_decode($POST_DATA);

    $USER_ORDER_DETAIL = json_decode($request->orderDetails);

    /** CAPTURAR EL ULTIMO DOCNUM EN LA BASE DE DATOS **/
    $SQL_QUERY = "SELECT docNum FROM baprosa.[Order]";
    $RESULT = mssql_query($SQL_QUERY) or die('A error occured: ' . mysql_error());

    $DOC_NUM = mssql_num_rows($RESULT) + 1;
    mssql_free_result($RESULT);


    //$DOC_NUM = 0;
    //$DOC_DATE = GETDATE();
    $CARD_CODE = $request->cardCode;
    $STATUS = 0;
    $IN_SAP = 0;
    $DOC_TOTAL = (float)$request->docTotal;
    $RTN = "";
    $USER_ID = 0;


    for ($x = 0; $x < count($USER_ORDER_DETAIL); $x++) {
        //echo "The number is: $x <br>";


        $ITEM_CODE = $USER_ORDER_DETAIL[$x]->itemCode;
        $ITEM_QUANTITY = (int)$USER_ORDER_DETAIL[$x]->quantity;
        $ITEM_PRICE = (float)$USER_ORDER_DETAIL[$x]->price;

        $QUERY_SET_ORDER_DETAILS = "INSERT baprosa.[OrderEntry] SELECT '$DOC_NUM', '$x', '$ITEM_CODE', '$ITEM_QUANTITY', '$ITEM_PRICE'";
        $order_details_insert = mssql_query($QUERY_SET_ORDER_DETAILS) or die('A error occured: ' . mysql_error());

        //mssql_free_result($order_details_insert);
    }

    $QUERY_SET_ORDER = "INSERT INTO baprosa.[Order] SELECT '$DOC_NUM', GETDATE(), '$CARD_CODE', '$STATUS', '$IN_SAP', '$DOC_TOTAL', '$RTN', '$USER_ID'";
    $order_insert = mssql_query($QUERY_SET_ORDER) or die('A error occured: ' . mysql_error());

    //mssql_free_result($order_insert);

    $requestResponse = (object) array(
        'success' => true
    );

    echo json_encode((object)$requestResponse);
    mssql_close($conn);
}