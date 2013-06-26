<?php

  $result = Array(
    json_decode(@file_get_contents("../inc/api/core.json")),
    json_decode(@file_get_contents("../inc/api/components.json"))
  );

  header("Content-type:text/json");
  echo json_encode($result);