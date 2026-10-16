# tools · 桌面启动器

本目录存放 `语流学习平台.exe` 的源码。该程序是一个轻量桌面启动器：把单文件版页面通过**本地 HTTP 服务**打开，让口语录音在本地 HTTP 环境运行；首次录音仍需允许浏览器访问麦克风。

## 文件

| 文件 | 说明 |
| --- | --- |
| `Tray.cs` | **当前使用版本**：无控制台窗口，系统托盘图标（双击打开页面、右键退出） |
| `Launcher.cs` | 早期版本：带控制台窗口显示启动状态，关闭窗口即退出 |

## 实现要点

- 页面以资源形式**内嵌**进 exe（`AppHtml`），单文件即可分发
- 内嵌 `TcpListener` 提供最小 HTTP 服务，仅监听 `127.0.0.1`，自动探测 8731–8831 之间的空闲端口
- 启动后自动用默认浏览器打开 `http://127.0.0.1:<port>/`
- 若资源加载失败，会回退读取同目录下的 `语流学习平台-免安装版.html`

## 先生成页面

在项目根目录执行：

```bat
npm install
npm run build:single
```

该命令从 `src/` 打包页面、React、路由及样式，生成 `语流学习平台-免安装版.html`、内容一致的 `docs/index.html` 和第三方许可证文件。生成的页面无需 CDN，可离线打开；HashRouter 兼容本地文件和 GitHub Pages 子目录。

## 编译方式

使用 Windows 自带的 .NET Framework 编译器 `csc.exe`（位于 `C:\Windows\Microsoft.NET\Framework64\v4.0.30319\`），无需安装额外工具链：

先进入项目的 `tools` 目录。若 `csc` 不在 PATH 中，可将下方 `csc` 替换为完整编译器路径。

```bat
csc /nologo /optimize+ /target:winexe ^
    /out:..\语流学习平台.exe ^
    /resource:..\语流学习平台-免安装版.html,AppHtml ^
    /r:System.dll /r:System.Drawing.dll /r:System.Windows.Forms.dll ^
    Tray.cs
```

产物约 323 KiB，已内嵌完整页面及依赖（约 313 KiB）；实际大小随构建版本变化。HTML 或源码更新后，需重新编译 exe。

> `/target:winexe` 生成**无控制台窗口**的程序；改用 `/target:exe` 则保留控制台窗口便于观察状态。