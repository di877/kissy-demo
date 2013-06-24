<?php

  include("../inc/interface.php");

  $p      = $_GET["p"];
  $result = demoList($p);

  header('Content-type:text/json');
  echo json_encode($result);