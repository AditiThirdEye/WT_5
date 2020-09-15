<?php
header("Content-Type: application/json; charset=UTF-8");
require 'dbase.php';
require 'user.php';

$req = $_GET['req'] ?? null;
$db=new database();
$user = new candi($db->connect());

switch($req)
{
    case 'add':
        $obj=$_GET['object'];
        $temp=json_decode($obj);
        echo $user->adddetails($temp);
        break;

    case 'getD':
        echo $user->getData();
        break;

    default:
        echo json_encode(["Invalid request"]);
        break;
}

?>