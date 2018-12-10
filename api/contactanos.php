<?php
/**
 * Created by IntelliJ IDEA.
 * User: Raquel Jackson
 * Date: 25/8/2018
 * Time: 06:33
 */

require_once './conn.php';

$POST_DATA = file_get_contents("php://input");
$request = json_decode($POST_DATA);

$USER_EMAIL = $request->email;
$USER_NAME = $request->name;
$USER_PHONE = $request->phone;
$COMMENT = $request->message;

echo createComment($USER_EMAIL, $USER_NAME, $USER_PHONE, $COMMENT);
