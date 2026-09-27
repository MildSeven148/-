[README.md](https://github.com/user-attachments/files/32694007/README.md)
# 语流 LinguaFlow · 多语种沉浸式在线学习平台

面向不同语言基础与学习目标的学习者，提供英语、日语、韩语等主流语言的**分级课程**、**四维互动训练**、**学习进度追踪**、**个性化路径推荐**与**社区成就体系**，陪学习者从零基础走向专业深耕。

- **在线体验：** https://mildseven148.github.io/-/
- **仓库地址：** https://github.com/MildSeven148/-

---

## 项目简介

语流 LinguaFlow 是一个纯前端实现的多语种学习平台。核心思路是「先分层、再画像」：学习者先确定自己的**语言能力起点**，再选定**学习目标画像**，系统据此生成个性化的推荐学习路径，让每一次学习都直指目标。

项目无需后端即可完整运行——用户体系、学习进度、成就徽章与社区数据通过浏览器 `localStorage` 持久化，适合直接演示与二次开发。

---

## 六大核心能力

| 能力 | 说明 |
| --- | --- |
| **1. 分级课程体系** | 五档能力分层 × 多语种，每门课程含完整课时与学习目标 |
| **2. 互动式学习模块** | 单词记忆、语法练习、听力训练、口语跟读四维训练 |
| **3. 学习进度追踪** | XP 累计、连续打卡、学习时长、四维训练统计、课程完成度 |
| **4. 用户注册登录** | 注册 / 登录 / 会话保持，注册后进入能力测评与画像选择 |
| **5. 个性化路径推荐** | 按「能力起点 + 目标画像」双维度加权，生成专属课程顺序 |
| **6. 社区交流与成就激励** | 发帖、评论、点赞；9 枚成就徽章 + 连续打卡激励 |

---

## 分级体系

按语言能力分为五档，能力起点决定推荐路径，页面顶部「当前等级」由累计 XP 自动晋升。

| 等级 | 标识 | 定位 | 内容侧重 | 解锁 XP |
| --- | --- | --- | --- | --- |
| 零基础 | `starter` | 从零开始 | 字母发音、最基础词汇与日常寒暄 | 0 |
| 小学水平 | `elementary` | 打牢地基 | 基础词汇、简单句型与生活场景表达 | 600 |
| 初中水平 | `junior` | 日常会话 | 高频词汇、核心语法与情景对话 | 1600 |
| 高中水平 | `senior` | 进阶提升 | 进阶语法、学术词汇与流畅表达 | 3200 |
| 专业等级 | `advanced` | 专业深耕 | 母语级表达、领域语料与思辨能力 | 6400 |

## 精准画像体系

按客户真实需求细分六类画像，每类画像配有关键词方向与专属学习寄语，并影响推荐路径的等级权重。

| 画像 | 标识 | 需求描述 | 关注方向 |
| --- | --- | --- | --- |
| 出国留学 | `abroad` | 备考冲刺、学术写作与海外校园生活场景 | 雅思 / 托福、学术写作、校园口语 |
| 职场商务 | `career` | 商务会议、邮件沟通与跨文化协作表达 | 商务会话、邮件写作、面试表达 |
| 文学翻译 | `translation` | 文学鉴赏、翻译技巧与双语思维深度训练 | 文本精读、翻译练习、文化意象 |
| 旅游出行 | `travel` | 出行必备表达与目的地文化融入 | 问路点餐、住宿出行、文化礼仪 |
| 考试应试 | `exam` | 系统备考规划与高效提分策略 | 题型训练、词汇攻坚、真题解析 |
| 兴趣文化 | `interest` | 从影视、动漫与音乐中轻松进阶 | 追剧学语言、歌词跟唱、社交表达 |

## 语言与课程规模

- **已上线**：英语 `en`、日语 `ja`、韩语 `ko`
- **规划中**：法语 `fr`、德语 `de`、西班牙语 `es`
- **课程规模**：3 语种 × 5 级 = **15 门课程** × 每门 4 课时 = **60 个课时**
- **课时内容**：每个课时均包含单词、语法、听力、口语四类完整内容，可自由切换训练模块
- **成就徽章**：9 枚（初次启程、持之以恒、词汇达人、语法大师、听力之星、口语先锋、学海无涯、学霸之路、社群之星）

---

## 技术栈

| 层面 | 选型 |
| --- | --- |
| 框架 | React 18 |
| 构建 | Vite 5 |
| 路由 | react-router-dom 6（Vite 版用 BrowserRouter / 单文件版用 HashRouter） |
| 状态管理 | React Context（`AppProvider` / `useApp`） |
| 样式 | 原生 CSS 设计系统（CSS 变量、渐变、卡片、动画、响应式断点） |
| 数据层 | 前端 Mock 数据 + `localStorage` 持久化 |
| 语音合成 | Web Speech API（`speechSynthesis`），浏览器原生发声 |
| 口语录音 | Web Audio API 采集 PCM，手工编码 WAV，跨浏览器可播放 |

---

## 快速开始

### 方式一：在线访问（最省事）

直接打开：https://mildseven148.github.io/-/

### 方式二：免安装单文件版（无需 Node 环境）

双击打开根目录的 `语流学习平台-免安装版.html` 即可，依赖全部走 CDN，适合离线分享与快速体验。

### 方式三：本地开发（完整工程）

需要 Node.js 18+。

```bash
npm install
npm run dev
```

然后访问 http://localhost:5173

Windows 用户也可直接双击 `start.bat` 一键启动（脚本会自动安装依赖，失败时自动切换国内镜像重试）。

其他命令：

```bash
npm run build      # 生产构建
npm run preview    # 预览构建产物
```

---

## 目录结构

```
├── docs/
│   └── index.html                  # GitHub Pages 站点入口（免安装版的部署副本）
├── src/
│   ├── api/
│   │   └── mock.js                 # 本地持久化层（localStorage 模拟后端接口）
│   ├── components/
│   │   ├── Navbar.jsx              # 顶部导航
│   │   ├── Footer.jsx              # 页脚
│   │   ├── Layout.jsx              # 页面骨架
│   │   └── common.jsx              # 通用组件（进度条、撒花动效等）
│   ├── context/
│   │   └── AppContext.jsx          # 全局状态：用户 / 进度 / 成就 / 社区 / Toast
│   ├── mock/
│   │   └── data.js                 # 数据层：分级 / 画像 / 语言 / 课程 / 内容 / 徽章 / 推荐算法
│   ├── modules/
│   │   ├── VocabularyPlayer.jsx    # 单词记忆：闪卡翻转 + 拼写测验
│   │   ├── GrammarPlayer.jsx       # 语法练习：规则精讲 + 即时纠错
│   │   ├── ListeningPlayer.jsx     # 听力训练：语音播放 + 理解检测
│   │   └── SpeakingPlayer.jsx      # 口语跟读：语音示范 + 录音回放
│   ├── pages/
│   │   ├── Home.jsx                # 首页
│   │   ├── Courses.jsx             # 课程体系（按语言 / 分级筛选）
│   │   ├── CourseDetail.jsx        # 课程详情与课时列表
│   │   ├── LessonPage.jsx          # 课时学习页（四模块切换）
│   │   ├── Dashboard.jsx           # 学习中心：进度、路径推荐、成就
│   │   ├── Community.jsx           # 社区交流
│   │   ├── Login.jsx               # 登录
│   │   ├── Register.jsx            # 注册
│   │   ├── Onboarding.jsx          # 能力测评 + 画像选择
│   │   └── Profile.jsx             # 个人中心（画像与能力起点调整）
│   ├── styles/
│   │   └── global.css              # 全局设计系统
│   ├── utils/
│   │   └── tts.js                  # 语音合成封装（speak / stopSpeak）
│   ├── App.jsx                     # 路由配置
│   └── main.jsx                    # 应用入口
├── index.html                      # Vite 开发入口
├── 语流学习平台-免安装版.html        # 免安装单文件版（CDN + Babel standalone）
├── start.bat                       # Windows 一键启动脚本
├── package.json
├── vite.config.js
└── .gitignore
```

---

## 页面路由

| 路径 | 页面 | 是否需要登录 |
| --- | --- | --- |
| `/` | 首页 | 否 |
| `/courses` | 课程体系 | 否 |
| `/courses/:courseId` | 课程详情 | 否 |
| `/community` | 社区交流 | 否 |
| `/login` | 登录 | 否 |
| `/register` | 注册 | 否 |
| `/onboarding` | 能力测评与画像选择 | 是 |
| `/lesson/:lessonId` | 课时学习 | 是 |
| `/dashboard` | 学习中心 | 是 |
| `/profile` | 个人中心 | 是 |

---

## 数据与持久化说明

本项目为**前端 + Mock 数据**架构，不含真实服务端：

- 用户、学习进度、成就、社区帖子等数据通过浏览器 `localStorage` 持久化
- 存储键：`linguaflow_db_v4`（业务数据）、`linguaflow_session`（登录会话）
- 清除浏览器站点数据即恢复初始状态
- 替换 `src/api/mock.js` 中的读写实现即可对接真实后端接口

---

## 浏览器要求

建议使用 Chrome / Edge 最新版：

- **听力训练与发音示范**依赖 Web Speech API（`speechSynthesis`），不同系统可用的语音音色有差异
- **口语跟读录音**依赖麦克风权限，需在 `https` 或 `localhost` 环境下使用（GitHub Pages 已满足）
- 若听不到声音或录音为空，请检查浏览器麦克风授权与系统声音设备

---

## 部署说明

站点通过 GitHub Pages 发布：仓库 `Settings → Pages` 中，Source 选择 `Deploy from a branch`，分支 `main`，目录 `/docs`。

注意：`docs/index.html` 是根目录 `语流学习平台-免安装版.html` 的副本，修改任一版本后需同步另一份。
