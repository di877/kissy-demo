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

// 获取 DEMO List
function demoList($p) {
  global $db;

  $result = $db -> getAll("SELECT * from demo where module='{$p}'");

  if (!$result) {
    $result = array();
  }

  return $result;
}

// 获取 DEMO Detail
function demoDetail($id) {
  global $db;

  $result = $db -> getRow("SELECT * from demo where id='{$id}'");

  if ($result) {
    return response(true, "获取成功", $result);
  } else {
    return response(false, "获取失败", $result);
  }
}

// 添加 DEMO
function addDemo($module, $intro, $version, $html, $js, $css, $author) {
  global $db;

  if ($module == "") {
    return response(false, "请填写 DEMO 模块", null);
  }

  if ($intro == "") {
    return response(false, "请填写 DEMO 简介", null);
  }

  if (!preg_match ("/^\d{1}\.\d{1}\.\d{1}$/", $version)) {
    return response(false, "请填写 DEMO 版本", null);
  }

  if ($html == "") {
    return response(false, "请填写 DEMO 内容", null);
  }

  if ($author == "") {
    return response(false, "请填写您的花名", null);
  }

  $result = $db->autoExecute("demo", array(
    "id"      => getID(),
    "module"  => $module,
    "intro"   => $intro,
    "version" => $version,
    "html"    => mysql_real_escape_string($html),
    "js"      => mysql_real_escape_string($js),
    "css"     => mysql_real_escape_string($css),
    "author"  => $author
  ), 1);

  if ($result) {
    return response(true, "添加成功", null);
  } else {
    return response(true, "添加失败", null);
  }
}

// 修改 DEMO
function demoUpdate($model) {
  global $db;

  $id      = $model -> id;
  $module  = $model -> module;
  $intro   = $model -> intro;
  $version = $model -> version;
  $html    = $model -> html;
  $js      = $model -> js;
  $css     = $model -> css;
  $author  = $model -> author;

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
    return response(true, "修改成功", $model);
  } else {
    return response(true, "修改成功", $model);
  }
}

// 删除 DEMO
function delDemo($id) {
  global $db;

  if ($id == "") {
    return response(true, "要删除的ID错误", null);
  }

  $result = $db->execute("delete from demo WHERE id = '{$id}' ");

  if($result){
    return response(true, "删除成功", null);
  } else {
    return response(false, "删除失败", null);
  }
}