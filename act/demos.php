<?php

  include("../inc/interface.php");

  $p      = $_GET["p"];
  $result = getDemos($p);

  header('Content-type:text/json');
  echo json_encode($result);