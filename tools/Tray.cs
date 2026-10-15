/* 语流 LinguaFlow · 桌面启动器（托盘版，当前使用）
   与 Launcher.cs 的区别：编译为 Windows GUI 子系统，无控制台窗口，
   改为在系统托盘显示图标（双击打开页面 / 右键退出）。

   编译：
   csc /nologo /optimize+ /target:winexe /out:..\语流学习平台.exe ^
       /resource:..\语流学习平台-免安装版.html,AppHtml ^
       /r:System.dll /r:System.Drawing.dll /r:System.Windows.Forms.dll Tray.cs
*/
using System;
using System.Diagnostics;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Reflection;
using System.Text;
using System.Threading;
using System.Windows.Forms;

class LinguaFlowTray
{
    static byte[] _html;
    static NotifyIcon _tray;
    static string _url = "";

    [STAThread]
    static void Main()
    {
        _html = LoadHtml();
        if (_html == null)
        {
            MessageBox.Show("未能加载内置页面文件，请确认程序完整。", "语流 LinguaFlow",
                MessageBoxButtons.OK, MessageBoxIcon.Error);
            return;
        }

        try
        {
            int port = FindFreePort();
            TcpListener listener = new TcpListener(IPAddress.Loopback, port);
            listener.Start();
            _url = "http://127.0.0.1:" + port + "/";

            Thread th = new Thread(delegate()
            {
                while (true)
                {
                    try
                    {
                        TcpClient c = listener.AcceptTcpClient();
                        ThreadPool.QueueUserWorkItem(new WaitCallback(HandleClient), c);
                    }
                    catch { break; }
                }
            });
            th.IsBackground = true;
            th.Start();
        }
        catch (Exception ex)
        {
            MessageBox.Show("启动本地服务失败：" + ex.Message, "语流 LinguaFlow",
                MessageBoxButtons.OK, MessageBoxIcon.Error);
            return;
        }

        BuildTray();
        OpenBrowser();
        Application.Run();
    }

    static void OpenBrowser()
    {
        try { Process.Start(new ProcessStartInfo(_url) { UseShellExecute = true }); }
        catch { }
    }

    static void BuildTray()
    {
        _tray = new NotifyIcon();
        _tray.Icon = MakeIcon();
        _tray.Text = "语流 LinguaFlow（双击打开，右键退出）";
        _tray.Visible = true;

        ContextMenuStrip menu = new ContextMenuStrip();
        menu.Items.Add("打开语流 LinguaFlow", null, delegate { OpenBrowser(); });
        menu.Items.Add(new ToolStripSeparator());
        menu.Items.Add("退出", null, delegate
        {
            _tray.Visible = false;
            Application.Exit();
        });
        _tray.ContextMenuStrip = menu;
        _tray.MouseDoubleClick += delegate { OpenBrowser(); };
    }

    /* 运行时绘制托盘图标：紫色圆形 + 白色「语」字 */
    static Icon MakeIcon()
    {
        try
        {
            Bitmap bmp = new Bitmap(32, 32);
            using (Graphics g = Graphics.FromImage(bmp))
            {
                g.SmoothingMode = SmoothingMode.AntiAlias;
                g.Clear(Color.Transparent);
                using (SolidBrush b = new SolidBrush(Color.FromArgb(75, 63, 227)))
                {
                    g.FillEllipse(b, 1, 1, 30, 30);
                }
                using (Font f = new Font("Microsoft YaHei", 16, FontStyle.Bold, GraphicsUnit.Pixel))
                using (SolidBrush w = new SolidBrush(Color.White))
                {
                    StringFormat sf = new StringFormat();
                    sf.Alignment = StringAlignment.Center;
                    sf.LineAlignment = StringAlignment.Center;
                    g.DrawString("语", f, w, new RectangleF(0, 0, 32, 32), sf);
                }
            }
            return Icon.FromHandle(bmp.GetHicon());
        }
        catch
        {
            return SystemIcons.Application;
        }
    }

    static byte[] LoadHtml()
    {
        try
        {
            Assembly asm = Assembly.GetExecutingAssembly();
            string[] names = asm.GetManifestResourceNames();
            for (int i = 0; i < names.Length; i++)
            {
                if (names[i].EndsWith("AppHtml", StringComparison.OrdinalIgnoreCase))
                {
                    using (Stream s = asm.GetManifestResourceStream(names[i]))
                    {
                        if (s == null) continue;
                        using (MemoryStream ms = new MemoryStream())
                        {
                            byte[] buf = new byte[8192];
                            int n;
                            while ((n = s.Read(buf, 0, buf.Length)) > 0) ms.Write(buf, 0, n);
                            return ms.ToArray();
                        }
                    }
                }
            }
        }
        catch { }

        try
        {
            string side = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "语流学习平台-免安装版.html");
            if (File.Exists(side)) return File.ReadAllBytes(side);
        }
        catch { }

        return null;
    }

    static int FindFreePort()
    {
        for (int p = 8731; p <= 8831; p++)
        {
            try
            {
                TcpListener t = new TcpListener(IPAddress.Loopback, p);
                t.Start();
                t.Stop();
                return p;
            }
            catch { }
        }
        TcpListener any = new TcpListener(IPAddress.Loopback, 0);
        any.Start();
        int port = ((IPEndPoint)any.LocalEndpoint).Port;
        any.Stop();
        return port;
    }

    static void HandleClient(object state)
    {
        TcpClient client = (TcpClient)state;
        try
        {
            using (client)
            {
                using (NetworkStream ns = client.GetStream())
                {
                    ns.ReadTimeout = 5000;
                    ns.WriteTimeout = 20000;

                    byte[] buf = new byte[8192];
                    StringBuilder sb = new StringBuilder();
                    int total = 0;
                    while (total < 65536)
                    {
                        int n = ns.Read(buf, 0, buf.Length);
                        if (n <= 0) break;
                        total += n;
                        sb.Append(Encoding.ASCII.GetString(buf, 0, n));
                        if (sb.ToString().IndexOf("\r\n\r\n", StringComparison.Ordinal) >= 0) break;
                    }
                    if (sb.Length == 0) return;

                    string header = "HTTP/1.1 200 OK\r\n"
                        + "Content-Type: text/html; charset=utf-8\r\n"
                        + "Content-Length: " + _html.Length + "\r\n"
                        + "Cache-Control: no-store\r\n"
                        + "Connection: close\r\n\r\n";
                    byte[] head = Encoding.ASCII.GetBytes(header);
                    ns.Write(head, 0, head.Length);
                    ns.Write(_html, 0, _html.Length);
                    ns.Flush();
                }
            }
        }
        catch { }
    }
}