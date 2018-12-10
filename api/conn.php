<?php
/**
 * Created by IntelliJ IDEA.
 * User: Raquel Jackson
 * Date: 16/8/2018
 * Time: 18:38
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: application/json');

//$servername = '184.168.194.62';
//$serverName = "http://www.mssql.baprosa.com";
/*$servername = '184.168.194.62';
$username = 'shoppingCart';
$password = '#kQ56rm0';

$conn = mssql_connect($servername, $username, $password);

if( !$conn ) {
    die( mssql_get_last_message());
} else {
    function getBrands() {
        //$SQL_QUERY = "SELECT * FROM baprosa.[OMRC] WHERE firmCode <> -1  AND firmName IS NOT NULL";
        $SQL_QUERY = "SELECT * FROM baprosa.[OMRC] WHERE firmCode <> -1";

        $RESULT = mssql_query($SQL_QUERY) or die('A error occured: ' . mssql_get_last_message ());

        $JSON_RESPONSE = array();

        while ($row = mssql_fetch_object($RESULT)){
            array_push($JSON_RESPONSE, $row);
        }

        mssql_free_result($RESULT);

        return json_encode($JSON_RESPONSE);
    }
    function getInventoryByBrand($FIRM_CODE) {
        $SQL_QUERY = "SELECT * FROM Inventory WHERE firmCode='$FIRM_CODE' and Active=1";

        $RESULT = mssql_query($SQL_QUERY) or die('A error occured: ' . mssql_get_last_message ());

        $JSON_RESPONSE = array();

        while ($row = mssql_fetch_object($RESULT)){
            array_push($JSON_RESPONSE, $row);

        }

        mssql_free_result($RESULT);

        return json_encode($JSON_RESPONSE);
    }
}*/

if( !$conn ) {
    $servername = '184.168.194.62';
    $username = 'shoppingCart';
    $password = '#kQ56rm0';

    $conn = mssql_connect($servername, $username, $password);
}

function getBrands() {
    //$SQL_QUERY = "SELECT * FROM baprosa.[OMRC] WHERE firmCode <> -1  AND firmName IS NOT NULL";
    $SQL_QUERY = "SELECT * FROM baprosa.[OMRC] WHERE firmCode <> -1";

    $RESULT = mssql_query($SQL_QUERY) or die('A error occured: ' . mssql_get_last_message ());

    $JSON_RESPONSE = array();

    while ($row = mssql_fetch_object($RESULT)){
        array_push($JSON_RESPONSE, $row);
    }

    mssql_free_result($RESULT);

    return json_encode($JSON_RESPONSE);
}
function getInventoryByBrand($FIRM_CODE) {
    $SQL_QUERY = "SELECT * FROM Inventory WHERE firmCode='$FIRM_CODE' and Active=1";

    $RESULT = mssql_query($SQL_QUERY) or die('A error occured: ' . mssql_get_last_message ());

    $JSON_RESPONSE = array();

    while ($row = mssql_fetch_object($RESULT)){
        array_push($JSON_RESPONSE, $row);

    }

    mssql_free_result($RESULT);

    return json_encode($JSON_RESPONSE);
}
function login($USER_CODE, $USER_EMAIL, $USER_PASS) {
    /*$USER_CODE = $_REQUEST["cardCode"];
    $USER_EMAIL = $_REQUEST["email"];
    $USER_PASS = $_REQUEST["password"];*/

    $SQL_QUERY = "SELECT * FROM Users WHERE cardCode='$USER_CODE' AND password='$USER_PASS'";

    $result = mssql_query($SQL_QUERY) or die('A error occured: ' . mysql_error());

    if (mssql_num_rows( $result )) {
        $row = mssql_fetch_object($result);

        if ($row->active) {

            $updateState = "UPDATE Users SET lastIn = GETDATE() WHERE cardCode = '$row->cardCode'";

            $updateQuery = mssql_query($updateState) or die('A error occured: ' . mysql_error());

            $requestResponse = (object) array(
                'success' => true,
                'name' => $row->cardName,
                'cardCode' => $row->cardCode,
                'email' => $row->email
            );

        } else {
            $requestResponse = (object) array(
                'success'=>false,
                'message'=>'Usuario inactivo'
            );
        }

        return json_encode((object)$requestResponse);


    } else {
        $requestResponse = (object) array(
            'success'=>false,
            'message'=>'Usuario no encontrado');
        return json_encode((object)$requestResponse);
    }
}
function updateUserProfile($USER_CARDCODE, $USER_NAME, $USER_EMAIL, $USER_PASSWORD) {

    $updateState = "UPDATE Users SET cardName = '$USER_NAME', email = '$USER_EMAIL', password = '$USER_PASSWORD' WHERE cardCode = '$USER_CARDCODE'";

    $updateQuery = mssql_query($updateState) or die('A error occured: ' . mysql_error());

    $requestResponse = (object) array(
        'success' => true,
        'name' => $USER_NAME,
        'cardCode' => $USER_CARDCODE,
        'email' => $USER_EMAIL
    );

    return json_encode((object)$requestResponse);
}
function createComment($USER_EMAIL, $USER_NAME, $USER_PHONE, $COMMENT) {

    $QUERY_SET_COMMENT = "INSERT baprosa.[Comments] SELECT '$USER_NAME', '$USER_EMAIL', '$USER_PHONE', '$COMMENT'";

    $comment_query = mssql_query($QUERY_SET_COMMENT) or die('A error occured: ' . mssql_get_last_message());

    $requestResponse = (object) array('success'=>true);

    return json_encode((object)$requestResponse);
}
