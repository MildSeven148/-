@echo off
chcp 65001 >nul
title 语流 LinguaFlow - 启动器
cd /d "%~dp0"

echo ============================================
echo   语流 LinguaFlow · 一键启动
echo ============================================
echo.

if not exist node_modules (
  echo [1/2] 首次运行，正在安装依赖（可能需要几分钟）...
  call npm install
  if errorlevel 1 (
    echo.
    echo [提示] 安装失败，改用国内镜像重试一次...
    call npm install --registry=https://registry.npmmirror.com
    if errorlevel 1 (
      echo.
      echo [错误] npm install 仍失败。请检查网络后重试。
      echo 排查命令：node -v   ^&   npm -v
      pause
      exit /b 1
    )
  )
) else (
  echo [1/2] 依赖已就绪，跳过安装。
)

echo [2/2] 正在启动开发服务器...
echo.
echo 启动后请用浏览器访问： http://localhost:5173
echo 按 Ctrl+C 可停止服务器。
echo.
call npm run dev
pause
