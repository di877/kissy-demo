<?php

  include("../inc/config.php");
  include("../inc/util.php");

  $params = array(
    client_id     => $GITHUB["client_id"],
    client_secret => $GITHUB["client_secret"],
    code          => $_GET["code"]
  );

  // 获取Token
  $token  = Util::post("https://github.com/login/oauth/access_token", $params);

  // 设置Token
  setcookie('token', $token, time() + 86400, '/');

  // 返回上一页
  echo "<script> history.go(-1) </script>";