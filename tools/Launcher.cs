/* 语流 LinguaFlow · 桌面启动器（控制台版）
   作用：把单文件版页面通过本地 HTTP 服务打开，使浏览器在 http://127.0.0.1 下
        获得安全上下文，从而可正常使用麦克风（file:// 下 Chrome 会禁用）。
   编译：csc /target:exe /resource:..\语流学习平台-免安装版.html,AppHtml /r:System.dll Launcher.cs
*/
using System;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Reflection;
using System.Text;
using System.Threading;

class LinguaFlowLauncher
{
    static byte[] _html;

    static void Main()
    {
        try { Console.OutputEncoding = Encoding.UTF8; } catch { }
        try { Console.Title = "语流 LinguaFlow"; } catch { }

        _html = LoadHtml();
        if (_html == null)
        {
            Console.WriteLine("错误：未能加载内置页面文件。");
            Console.WriteLine("请确认程序文件完整后重试。");
            Console.ReadKey();
            return;
        }

        int port = FindFreePort();
        TcpListener listener = new TcpListener(IPAddress.Loopback, port);
        listener.Start();
        string url = "http://127.0.0.1:" + port + "/";

        Console.WriteLine("============================================");
        Console.WriteLine("   语流 LinguaFlow · 多语种沉浸式学习平台");
        Console.WriteLine("============================================");
        Console.WriteLine();
        Console.WriteLine("  程序已启动，正在打开浏览器：");
        Console.WriteLine("  " + url);
        Console.WriteLine();
        Console.WriteLine("  · 请勿关闭本窗口，关闭即退出程序");
        Console.WriteLine("  · 本方式通过 localhost 运行，麦克风可正常使用");
        Console.WriteLine("  · 若浏览器未自动打开，请手动复制上面地址访问");
        Console.WriteLine();

        try
        {
            Process.Start(new ProcessStartInfo(url) { UseShellExecute = true });
        }
        catch
        {
            Console.WriteLine("  （自动打开浏览器失败，请手动访问上面的地址）");
        }

        while (true)
        {
            try
            {
                TcpClient client = listener.AcceptTcpClient();
                ThreadPool.QueueUserWorkItem(new WaitCallback(HandleClient), client);
            }
            catch { break; }
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