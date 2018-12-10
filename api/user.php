<?php
session_start();

header('Access-Control-Allow-Origin: *');

$servername = '184.168.194.62';
$serverName = "http://www.mssql.baprosa.com";
$username = 'shoppingCart';
$password = '#kQ56rm0';

$conn = mssql_connect($servername, $username, $password);

$requestResponse = array();

if( !$conn ) {
    die( mssql_get_last_message());
} else {

    $USER_CODE = $_REQUEST["cardCode"];
    $USER_PASS = $_REQUEST["password"];

    $SQL_QUERY = "SELECT * FROM Users WHERE cardCode='$USER_CODE' AND password='$USER_PASS'";

    $result = mssql_query($SQL_QUERY) or die('A error occured: ' . mysql_error());

    if (mssql_num_rows( $result )) {
        $row = mssql_fetch_object($result);

        if ($row->active) {

            $updateState = "UPDATE Users SET lastIn = GETDATE() WHERE cardCode = '$row->cardCode'";

            $updateQuery = mssql_query($updateState) or die('A error occured: ' . mysql_error());

            $_SESSION['valid_user'] = true;
            $_SESSION['cardName'] = $row->cardName;

            $requestResponse = (object) array(
                'success' => true,
                'name' => $row->cardName,
                'email' => $row->email
            );

        } else {
            $requestResponse = (object) array(
                'success'=>false,
                'message'=>'Usuario inactivo'
            );
        }

        echo json_encode((object)$requestResponse);

        die();

    } else {
        $requestResponse = (object) array(
            'success'=>false,
            'message'=>'Usuario no encontrado');
        echo json_encode((object)$requestResponse);
    }

    mssql_close($conn);
}