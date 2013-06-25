<?php

  include("../inc/interface.php");

  $method = $_REQUEST["_method"];

  if ($method === 'read') {
    $id     = $_GET["id"];
    $result = getDemo($id);
  }

  if ($method === 'create') {
    $model  = json_decode($_POST['model']);
    $result = addDemo($model);
  }

  if ($method === 'update') {
    $model  = json_decode($_POST['model']);
    $result = updateDemo($model);
  }



  header('Content-type:text/json');
  echo json_encode($result);