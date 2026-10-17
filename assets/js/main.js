/* ~/shijianlin 站点脚本
   1) hero 终端打字效果：PS1 常驻，命令逐字敲入，输出行逐行浮现
      （尊重 prefers-reduced-motion；无 JS/无 IO 时直接全量展示）
   2) 页脚年份
*/
(function () {
  "use strict";

  var reduce = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- hero 终端 ---------- */
  var term = document.getElementById("term-hero");
  if (term) {
    var cmdLines = term.querySelectorAll(".term-cmd");   /* [0]=命令行 [1]=末尾提示符行 */
    var cmdLine = cmdLines[0];
    var typed = cmdLine ? cmdLine.querySelector(".k") : null;
    var outLines = Array.prototype.slice.call(
      term.querySelectorAll(".term-line:not(.term-cmd)"));
    var tail = cmdLines[1] || null;
    var cmdText = term.getAttribute("data-cmd") || "cat /proc/shijianlin";

    var ready = cmdLine && typed &&
      !reduce && "IntersectionObserver" in window;

    if (ready) {
      /* 初始：只显示 PS1（命令区置空），其余行隐藏占位 */
      typed.textContent = "";
      outLines.forEach(function (l) { l.classList.add("hidden"); });
      if (tail) tail.classList.add("hidden");

      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { io.disconnect(); startTyping(); }
        });
      }, { threshold: 0.3 });
      io.observe(term);
    }
  }

  function startTyping() {
    var typedEl = document.querySelector("#term-hero .term-cmd .k");
    var termEl = document.getElementById("term-hero");
    var outs = Array.prototype.slice.call(
      termEl.querySelectorAll(".term-line.out"));
    var tail = termEl.querySelectorAll(".term-cmd")[1];
    var cmdText = termEl.getAttribute("data-cmd") || "cat /proc/shijianlin";

    var i = 0;
    (function typeChar() {
      if (i <= cmdText.length) {
        typedEl.textContent = cmdText.slice(0, i);
        i++;
        setTimeout(typeChar, 26 + Math.random() * 34);
      } else {
        setTimeout(nextLine, 240);
      }
    })();

    function nextLine() {
      if (outs.length) {
        outs.shift().classList.remove("hidden");
        setTimeout(nextLine, 90);
      } else if (tail) {
        tail.classList.remove("hidden");
      }
    }
  }

  /* ---------- 页脚年份 ---------- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = String(new Date().getFullYear());
})();
