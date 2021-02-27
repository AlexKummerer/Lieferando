<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");


$json = file_get_contents('php://input');
if (strlen($json) > 1000000) {
    die('Payload is too long (Max. 1000000 characters).');
}
$file = 'my_json.json';
file_put_contents($file, $json);