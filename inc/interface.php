<?php
include("conn.php");

function response($status, $msg, $data, $code = ''){
	$result = array(
		"status"  => $status,
		"message" => $msg,
		"data"    => $data,
		"code"    => $code
	);
	return $result;
}

function getRandStr($len) {
	$str    = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	$output = "";
	for ($i=0; $i<$len; $i++){ 
		$output .= $str{mt_rand(0, 52)};
	}
	return $output;
}

function getID() {
	global $db;
	
	$id   = getRandStr(6);
	$demo = $db->getRow("select id from demo where id='{$id}'");

	if ($demo) {
		return getID();
	} else {
		return $id;
	}
}

// 获取 DEMO 列表
function getDemos($p) {
  global $db;

  $result = $db -> getAll("SELECT * from demo where module='{$p}'");

  if ($result) {
    return response(true, "获取成功", $result);
  } else {
    return response(true, "获取成功", array());
  }
}

// 获取 DEMO 详情
function getDemo($id) {
  global $db;

  $result = $db -> getRow("SELECT * from demo where id='{$id}'");

  if ($result) {
    return response(true, "获取成功", $result);
  } else {
    return response(false, "获取失败", null);
  }
}

// 添加 DEMO
function addDemo($model) {
  global $db;

  $id      = getID();
  $module  = $model -> module;
  $author  = $model -> author;
  $intro   = $model -> intro;
  $version = $model -> version;
  $html    = $model -> html;
  $js      = $model -> js;
  $css     = $model -> css;

  if ($module == "") {
    return response(false, "请填写 DEMO 模块", $model);
  }

  if ($intro == "") {
    return response(false, "请填写 DEMO 简介", $model);
  }

  if (!preg_match ("/^\d{1}\.\d{1}\.\d{1}$/", $version)) {
    return response(false, "请填写 DEMO 版本", $model);
  }

  if ($html == "") {
    return response(false, "请填写 DEMO 内容", $model);
  }

  if ($author == "") {
    return response(false, "请填写您的花名", $model);
  }

  $result = $db -> autoExecute("demo", array(
    "id"      => $id,
    "module"  => $module,
    "intro"   => $intro,
    "version" => $version,
    "html"    => mysql_real_escape_string($html),
    "js"      => mysql_real_escape_string($js),
    "css"     => mysql_real_escape_string($css),
    "author"  => $author
  ), 1);

  if ($result) {
    $model -> id = $id;
    saveDemo($model);
    return response(true, "添加成功", $model);
  } else {
    return response(false, "添加失败", $model);
  }
}

// 删除 DEMO
function delDemo($model) {
  global $db;

  $id = $model -> id;

  if ($id == "") {
    return response(true, "ID 错误", null);
  }

  $result = $db -> execute("delete from demo WHERE id = '{$id}' ");

  if ($result) {
    return response(true, "删除成功", null);
  } else {
    return response(false, "删除失败", null);
  }
}

// 更新 DEMO
function updateDemo($model) {
  global $db;

  $id      = $model -> id;
  $module  = $model -> module;
  $author  = $model -> author;
  $intro   = $model -> intro;
  $version = $model -> version;
  $html    = $model -> html;
  $js      = $model -> js;
  $css     = $model -> css;

  if ($id == "") {
    return response(false, "请填写 DEMO ID", $model);
  }

  if ($module == "") {
    return response(false, "请填写 DEMO 模块", $model);
  }

  if ($intro == "") {
    return response(false, "请填写 DEMO 简介", $model);
  }

  if (!preg_match ("/^\d{1}\.\d{1}\.\d{1}$/", $version)) {
    return response(false, "请填写 DEMO 版本", $model);
  }

  if ($html == "") {
    return response(false, "请填写 DEMO 内容", $model);
  }

  if ($author == "") {
    return response(false, "请填写您的花名", $model);
  }

  $result = $db -> autoExecute("demo", array(
    "module"  => $module,
    "intro"   => $intro,
    "version" => $version,
    "html"    => mysql_real_escape_string($html),
    "js"      => mysql_real_escape_string($js),
    "css"     => mysql_real_escape_string($css),
    "author"  => $author
  ), 2, "id='{$id}'");

  if ($result) {
    saveDemo($model);
    return response(true, "更新成功", $model);
  } else {
    return response(true, "更新成功", $model);
  }
}

// 保存 DEMO
function saveDemo($model) {
  $id     = $model -> id;
  $module = $model -> module;
  $html   = $model -> html;
  $css    = $model -> css;
  $js     = $model -> js;

$html = <<<END
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>$module</title>
    <style>
      $css
    </style>
  </head>
  <body>
    $html
    <script src="http://a.tbcdn.cn/s/kissy/1.3.0/seed-min.js" data-config="{combine:true}"></script>
    <script>
      try {
        $js
      } catch(e) {
      }
    </script>
  </body>
</html>
END;

  $dir = '../demo/'.$id.'.html';

  $file = fopen($dir, 'w+');
  fwrite($file, $html);
  fclose($file);
}