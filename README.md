# ~/shijianlin — 个人博客 & 作品集

Linux 内核工程师的个人站点：博客 + 作品集，纯静态、零依赖、无框架。
视觉语言取自日常内核工作流——伪终端 hero、`git log` 风格贡献墙、dmesg 时间线、`.config` 技能表。

## 目录结构

```
mypages/
├── index.html        # 首页：伪终端 hero + 贡献墙 + 项目 + 近期文章
├── portfolio.html    # 作品集：4 组上游客贡献 + 2 大平台工程 + 生产排障
├── blog.html         # 博客列表页
├── about.html        # 关于：dmesg 时间线 + .config 技能表
├── blog/             # 文章（均为可独立阅读的静态页）
│   ├── numa-watermark-fix.html        # 已合入主线的 NUMA 修复复盘
│   ├── lowmem-reserve-ratio.html      # linux-next 性能修复复盘
│   ├── bpf-stream-series.html         # bpf_stream PATCH 0/5 系列复盘
│   ├── ebpf-observability.html        # eBPF 可观测性平台设计
│   └── rag-network-diagnosis.html     # eBPF/Netlink + RAG 自动诊断
├── assets/
│   ├── css/style.css # 全部样式（含响应式与 reduced-motion 支持）
│   └── js/main.js    # hero 终端打字动画 + 页脚年份
└── favicon.svg
```

## 部署到 GitHub Pages

### 方式一：独立站点仓库（推荐，得到 `https://<用户名>.github.io`）

```bash
cd mypages
git init
git add .
git commit -m "init: personal blog & portfolio"
# 仓库名必须是 <你的GitHub用户名>.github.io
gh repo create <你的GitHub用户名>.github.io --public --source=. --push
```

然后浏览器打开 `https://<你的GitHub用户名>.github.io` 即可（首次生效可能需要
1-2 分钟）。仓库主分支默认自动作为 Pages 源。

### 方式二：日常仓库 + 子路径部署

```bash
gh repo create mypages --public --source=. --push
gh api repos/<你的GitHub用户名>/mypages/pages -X POST \
   -f build_type=workflow   # 或在网页 Settings -> Pages 选择 main 分支
```

站点将运行在 `https://<你的GitHub用户名>.github.io/mypages/`。
本站所有资源均使用相对路径引用，主路径 / 子路径部署都不需要改代码。

### 说明

- 站点是纯静态 HTML/CSS/JS，没有任何构建步骤，push 即部署。
- 不采集访问数据、无第三方脚本；无 JS 时内容完整可读（hero 终端优雅降级）。
- 字体全部使用系统字体栈，无需外网字体服务。

## 更新内容

- 写新文章：在 `blog/` 下新建 HTML（可复制任一篇文章作为模板），
  并在 `blog.html` 与 `index.html` 的"最近文章"里加上条目。
- 改个人信息：邮箱 / GitHub / 单位等分布在各页 footer 与 about 页，直接全文搜索替换即可。

## 无障碍与性能

- 语义化 HTML + `aria-current` 导航态 + 跳转链接（skip link）
- 支持 `prefers-reduced-motion`（关闭打字与闪烁动画）
- 移动端 680px / 960px 两档响应式断点
- 零图片、零外链依赖，首屏体积 < 40KB

> AI生成
