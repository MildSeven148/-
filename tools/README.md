# tools · 桌面启动器

本目录存放 `语流学习平台.exe` 的源码。该程序是一个轻量桌面启动器：把单文件版页面通过**本地 HTTP 服务**打开，从而解决浏览器在 `file://` 协议下**禁用麦克风**的问题（口语跟读需要麦克风权限）。

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

## 编译方式

使用 Windows 自带的 .NET Framework 编译器 `csc.exe`（位于 `C:\Windows\Microsoft.NET\Framework64\v4.0.30319\`），无需安装额外工具链：

```bat
csc /nologo /optimize+ /target:winexe ^
    /out:..\语流学习平台.exe ^
    /resource:..\语流学习平台-免安装版.html,AppHtml ^
    /r:System.dll /r:System.Drawing.dll /r:System.Windows.Forms.dll ^
    Tray.cs
```

产物约 197 KB，已内嵌完整页面（约 188 KB）。

> `/target:winexe` 生成**无控制台窗口**的程序；改用 `/target:exe` 则保留控制台窗口便于观察状态。