<?php
require_once './conn.php';

$USER_CODE = $_REQUEST["cardCode"];
$USER_EMAIL = $_REQUEST["email"];
$USER_PASS = $_REQUEST["password"];

echo login($USER_CODE, $USER_EMAIL, $USER_PASS);
