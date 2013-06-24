<?php

  include("../inc/interface.php");

  $id     = $_GET["id"];
  $result = demoDetail($id);

  header('Content-type:text/json');
  echo json_encode($result);