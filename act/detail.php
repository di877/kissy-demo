<?php

  include("../inc/interface.php");

  $method = $_REQUEST["_method"];

  if ($method === 'read') {
    $id     = $_GET["id"];
    $result = demoDetail($id);
  }

  if ($method === 'update') {
    $model  = json_decode($_POST['model']);
    $result = demoUpdate($model);
  }

  header('Content-type:text/json');
  echo json_encode($result);