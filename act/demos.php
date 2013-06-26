<?php

  include("../inc/interface.php");

  $method = $_REQUEST["_method"];

  if ($method === 'read') {
    $p      = $_GET["p"];
    $result = getDemos($p);
  }

  if ($method === 'save') {
    $demos = $db -> getAll("SELECT * from demo");
    foreach($demos as $model) {
      saveDemo((object)$model);
    }
  }

  header('Content-type:text/json');
  echo json_encode($result);