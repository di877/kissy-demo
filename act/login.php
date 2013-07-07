<?php

  include("../inc/config.php");
  include("../inc/util.php");

  $params = array(
    client_id     => $GITHUB["client_id"],
    client_secret => $GITHUB["client_secret"],
    code          => $_GET["code"]
  );

  $token  = Util::post("https://github.com/login/oauth/access_token", $params);
  $user   = Util::get("https://api.github.com/user?".$token);