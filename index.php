<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Kissy Demo</title>
    <link rel="stylesheet" href="./assets/build/style-min.css">
  </head>
  <body>
    <div class="wrap">
      <header class="head">
        <div id="J_Tips" class="tips"></div>
      </header>
      <div id="J_Cont" class="cont">

        <!--S list -->
        <article id="J_List" class="main list">
          <header id="J_ListHd" class="main-hd">
            <a href="javascript:;" id="J_Add" class="add">+ 添加</a>
            <h1></h1>
          </header>
          <div id="J_ListBd" class="main-bd">
          </div>
        </article>
        <!--E list -->

        <!--S code -->
        <article id="J_Code" class="main code">
          <header id="J_CodeHd" class="main-hd">
            <a href="javascript:;" id="J_Back" class="back">← 返回</a>
            <a href="javascript:;" id="J_Commit" class="btn"><i class="icon-pencil"></i>提交</a>
            <a href="javascript:;" id="J_Update" class="btn"><i class="icon-refresh"></i>更新</a>
            <a href="javascript:;" id="J_Debug" class="btn"><i class="icon-check"></i>预览</a>
          </header>
          <div id="J_CodeBd" class="main-bd">
            <fieldset class="column left">
              <div class="J_EditorWrap editor-wrap top">
                <span class="J_EditorLabel editor-label">HTML<i class="J_EditorResize icon-fullscreen" data-editor="Html" data-screen="small"></i></span>
                <div id="J_Html" class="editor"></div>
              </div>
              <div class="J_EditorWrap editor-wrap bottom">
                <span class="J_EditorLabel editor-label">JavaScript<i class="J_EditorResize icon-fullscreen" data-editor="Js" data-screen="small"></i></span>
                <div id="J_Js" class="editor"></div>
              </div>
            </fieldset>
            <fieldset class="column right">
              <div class="J_EditorWrap editor-wrap top">
                <span class="J_EditorLabel editor-label">CSS<i class="J_EditorResize icon-fullscreen" data-editor="Css" data-screen="small"></i></span>
                <div id="J_Css" class="editor"></div>
              </div>
              <div class="J_EditorWrap editor-wrap bottom">
                <span class="J_EditorLabel editor-label">预览<i class="J_EditorResize icon-fullscreen" data-editor="Preview" data-screen="small"></i></span>
                <div id="J_Preview" class="editor">
                  <iframe id="J_PreviewIframe" width="100%" height="100%"></iframe>
                </div>
              </div>
            </fieldset>
          </div>
        </article>
        <!--E code -->

      </div>
      <aside id="J_Side" class="side">
        <nav id="J_Sidebar" class="sidebar"></nav>
        <div id="J_Config" class="config"></div>
      </aside>
    </div>

    <?php
      /* 开发环境 */
      $isDev = isset($_GET['__dev__']);
      /* seed 配置 */
      if ($isDev) {
        $seed = 'seed.js';
      } else {
        $seed = 'seed-min.js';
      }
    ?>

    <script src="http://a.tbcdn.cn/s/kissy/1.3.0/<?=$seed?>"></script>
    <script src="./assets/build/ace/ace.js"></script>
    <script src="./assets/build/core.js"></script>
  </body>
</html>