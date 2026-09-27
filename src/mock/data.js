/* ============================================================
   语流 LinguaFlow · 模拟数据层
   语言/分级/画像/课程/课时内容/社区/徽章
   ============================================================ */

/* ---------- 能力分级体系（面向不同语言能力分层服务） ---------- */
export const LEVELS = [
  { id: 'starter',    name: '零基础',   icon: '🌱', tag: '从零开始', desc: '字母发音、最基础词汇与日常寒暄', xp: 0 },
  { id: 'elementary', name: '小学水平', icon: '🎒', tag: '打牢地基', desc: '基础词汇、简单句型与生活场景表达', xp: 600 },
  { id: 'junior',     name: '初中水平', icon: '📘', tag: '日常会话', desc: '高频词汇、核心语法与情景对话', xp: 1600 },
  { id: 'senior',     name: '高中水平', icon: '📚', tag: '进阶提升', desc: '进阶语法、学术词汇与流畅表达', xp: 3200 },
  { id: 'advanced',   name: '专业等级', icon: '🎓', tag: '专业深耕', desc: '母语级表达、领域语料与思辨能力', xp: 6400 },
];

/* ---------- 用户精准画像（按客户需求细分） ---------- */
export const PERSONAS = [
  { id: 'abroad',      name: '出国留学', icon: '✈️', desc: '备考冲刺、学术写作与海外校园生活场景', focus: ['雅思 / 托福', '学术写作', '校园口语'], color: '#2563EB' },
  { id: 'career',      name: '职场商务', icon: '💼', desc: '商务会议、邮件沟通与跨文化协作表达', focus: ['商务会话', '邮件写作', '面试表达'], color: '#0EA5E9' },
  { id: 'translation', name: '文学翻译', icon: '📖', desc: '文学鉴赏、翻译技巧与双语思维深度训练', focus: ['文本精读', '翻译练习', '文化意象'], color: '#8B5CF6' },
  { id: 'travel',      name: '旅游出行', icon: '🧳', desc: '出行必备表达与目的地文化融入', focus: ['问路点餐', '住宿出行', '文化礼仪'], color: '#F59E0B' },
  { id: 'exam',        name: '考试应试', icon: '🏆', desc: '系统备考规划与高效提分策略', focus: ['题型训练', '词汇攻坚', '真题解析'], color: '#EF4444' },
  { id: 'interest',    name: '兴趣文化', icon: '🎌', desc: '从影视、动漫与音乐中轻松进阶', focus: ['追剧学语言', '歌词跟唱', '社交表达'], color: '#EC4899' },
];

/* ---------- 语言（主流语言 + 规划中语言） ---------- */
export const LANGUAGES = [
  { id: 'en', name: '英语', native: 'English', flag: '🇬🇧', desc: '全球最通用的交流语言', color: '#2563EB', tts: 'en-US' },
  { id: 'ja', name: '日语', native: '日本語', flag: '🇯🇵', desc: '动漫与东方文化的进阶之选', color: '#E11D48', tts: 'ja-JP' },
  { id: 'ko', name: '韩语', native: '한국어', flag: '🇰🇷', desc: '潮流文化与 K-Pop 的通行证', color: '#7C3AED', tts: 'ko-KR' },
  { id: 'fr', name: '法语', native: 'Français', flag: '🇫🇷', desc: '浪漫之都的优雅表达', color: '#0EA5E9', tts: 'fr-FR', comingSoon: true },
  { id: 'de', name: '德语', native: 'Deutsch', flag: '🇩🇪', desc: '严谨思维的精准语言', color: '#F59E0B', tts: 'de-DE', comingSoon: true },
  { id: 'es', name: '西班牙语', native: 'Español', flag: '🇪🇸', desc: '世界第三大语种的热情', color: '#EF4444', tts: 'es-ES', comingSoon: true },
];

/* ---------- 四大互动学习模块 ---------- */
export const MODULES = [
  { id: 'vocab',     name: '单词记忆', icon: '🃏', desc: '闪卡速记 · 拼写测验' },
  { id: 'grammar',   name: '语法练习', icon: '✍️', desc: '规则精讲 · 即时纠错' },
  { id: 'listening', name: '听力训练', icon: '🎧', desc: '情景对话 · 理解检测' },
  { id: 'speaking',  name: '口语跟读', icon: '🎙️', desc: '跟读模仿 · 发音反馈' },
];

/* ---------- 内容词库 / 语法 / 听力 / 口语 ---------- */
const EN = {
  tts: 'en-US',
  words: {
    starter: [
      { text: 'hello',      phonetic: '/həˈloʊ/',        meaning: '你好', example: 'Hello! Nice to meet you.', exampleCn: '你好！很高兴认识你。' },
      { text: 'thanks',     phonetic: '/θæŋks/',         meaning: '谢谢', example: 'Thanks for your help.', exampleCn: '谢谢你的帮助。' },
      { text: 'water',      phonetic: '/ˈwɔːtər/',       meaning: '水', example: 'I drink water every day.', exampleCn: '我每天喝水。' },
      { text: 'book',       phonetic: '/bʊk/',           meaning: '书', example: 'This is my favorite book.', exampleCn: '这是我最喜欢的书。' },
      { text: 'friend',     phonetic: '/frend/',         meaning: '朋友', example: 'She is my good friend.', exampleCn: '她是我的好朋友。' },
      { text: 'morning',    phonetic: '/ˈmɔːrnɪŋ/',      meaning: '早晨', example: 'Good morning, everyone!', exampleCn: '大家早上好！' },
    ],
    elementary: [
      { text: 'school',     phonetic: '/skuːl/',         meaning: '学校', example: 'We go to school by bus.', exampleCn: '我们坐公交去上学。' },
      { text: 'teacher',    phonetic: '/ˈtiːtʃər/',      meaning: '老师', example: 'Our teacher is very kind.', exampleCn: '我们的老师非常和蔼。' },
      { text: 'weather',    phonetic: '/ˈweðər/',        meaning: '天气', example: 'The weather is nice today.', exampleCn: '今天天气很好。' },
      { text: 'travel',     phonetic: '/ˈtrævl/',        meaning: '旅行', example: 'I love to travel around the world.', exampleCn: '我喜欢环游世界。' },
      { text: 'market',     phonetic: '/ˈmɑːrkɪt/',      meaning: '市场', example: 'The market is crowded on weekends.', exampleCn: '周末市场很拥挤。' },
      { text: 'happy',      phonetic: '/ˈhæpi/',         meaning: '开心的', example: 'I am so happy to see you.', exampleCn: '见到你我非常开心。' },
    ],
    junior: [
      { text: 'environment',  phonetic: '/ɪnˈvaɪrənmənt/', meaning: '环境', example: 'We should protect the environment.', exampleCn: '我们应该保护环境。' },
      { text: 'experience',   phonetic: '/ɪkˈspɪriəns/',    meaning: '经验；经历', example: 'Travel gives you rich experience.', exampleCn: '旅行给你丰富的阅历。' },
      { text: 'conversation', phonetic: '/ˌkɑːnvərˈseɪʃn/', meaning: '对话', example: 'We had a long conversation.', exampleCn: '我们进行了一次长谈。' },
      { text: 'opportunity',  phonetic: '/ˌɑːpərˈtuːnəti/', meaning: '机会', example: 'This is a great opportunity for you.', exampleCn: '这对你是个绝佳的机会。' },
      { text: 'improve',      phonetic: '/ɪmˈpruːv/',       meaning: '提高', example: 'Practice helps improve your English.', exampleCn: '练习有助于提高你的英语。' },
      { text: 'achieve',      phonetic: '/əˈtʃiːv/',        meaning: '实现；达成', example: 'You can achieve your dream.', exampleCn: '你能实现你的梦想。' },
    ],
    senior: [
      { text: 'analyze',     phonetic: '/ˈænəlaɪz/',     meaning: '分析', example: 'Let us analyze the data carefully.', exampleCn: '让我们仔细分析这些数据。' },
      { text: 'significant', phonetic: '/sɪɡˈnɪfɪkənt/', meaning: '重要的；显著的', example: 'This is a significant discovery.', exampleCn: '这是一个重大发现。' },
      { text: 'perspective', phonetic: '/pərˈspektɪv/',  meaning: '视角；观点', example: 'See it from another perspective.', exampleCn: '换个视角看待它。' },
      { text: 'influence',   phonetic: '/ˈɪnfluəns/',    meaning: '影响', example: 'Media influences public opinion.', exampleCn: '媒体影响公众舆论。' },
      { text: 'alternative', phonetic: '/ɔːlˈtɜːrnətɪv/', meaning: '替代方案', example: 'We need an alternative plan.', exampleCn: '我们需要一个备选方案。' },
      { text: 'demonstrate', phonetic: '/ˈdemənstreɪt/', meaning: '证明；展示', example: 'The experiment demonstrates the theory.', exampleCn: '实验证明了该理论。' },
    ],
    advanced: [
      { text: 'nuanced',    phonetic: '/ˈnuːɑːnst/',    meaning: '细致微妙的', example: 'The novel has nuanced characters.', exampleCn: '这部小说的人物刻画细致入微。' },
      { text: 'eloquent',   phonetic: '/ˈeləkwənt/',    meaning: '雄辩的；有说服力的', example: 'She gave an eloquent speech.', exampleCn: '她发表了雄辩的演讲。' },
      { text: 'plausible',  phonetic: '/ˈplɔːzəbl/',    meaning: '貌似可信的', example: 'His excuse sounds plausible.', exampleCn: '他的借口听起来貌似可信。' },
      { text: 'reconcile',  phonetic: '/ˈrekənsaɪl/',   meaning: '调和；使和解', example: 'We must reconcile the two views.', exampleCn: '我们必须调和这两种观点。' },
      { text: 'resonate',   phonetic: '/ˈrezəneɪt/',    meaning: '引起共鸣', example: 'Her words resonate with young people.', exampleCn: '她的话引起了年轻人的共鸣。' },
      { text: 'scrutinize', phonetic: '/ˈskruːtənaɪz/', meaning: '仔细审查', example: 'Experts scrutinize every detail.', exampleCn: '专家们仔细审查每一个细节。' },
    ],
  },
  grammar: {
    starter: {
      title: '主系表结构',
      intro: '最简单的句子由「主语 + be 动词 + 表语」构成，用来介绍人、物或状态。',
      pattern: '主语 + am / is / are + 表语',
      examples: [
        { src: 'This is a book.', cn: '这是一本书。' },
        { src: 'She is my friend.', cn: '她是我的朋友。' },
      ],
      quiz: [
        { q: '“他是我的老师。” 的正确翻译是？', opts: ['He is my teacher.', 'He are my teacher.', 'Him is my teacher.'], ans: 0, why: 'be 动词第三人称单数用 is，主语用主格 He。' },
        { q: 'I ___ a student.', opts: ['is', 'am', 'are'], ans: 1, why: '主语是 I 时，be 动词固定用 am。' },
      ],
    },
    elementary: {
      title: '一般现在时 & 现在进行时',
      intro: '一般现在时表习惯与事实，现在进行时表此刻正在发生的事，两者常搭配的时间词不同。',
      pattern: 'do / does（一般现在时）；am/is/are + doing（进行时）',
      examples: [
        { src: 'She reads books every night.', cn: '她每晚都读书。' },
        { src: 'She is reading a book now.', cn: '她现在正在读书。' },
      ],
      quiz: [
        { q: '选择正确的时态：Look! It ___ outside.', opts: ['rains', 'is raining', 'rained'], ans: 1, why: 'Look! 提示此刻正在下雨，用现在进行时。' },
        { q: 'My father ___ to work by car every day.', opts: ['go', 'goes', 'is going'], ans: 1, why: 'every day 表习惯，主语第三人称单数，动词加 -es。' },
      ],
    },
    junior: {
      title: '比较级与最高级',
      intro: '两者比较用比较级（-er / more），三者以上比较用最高级（-est / most）。',
      pattern: '比较级 + than；the + 最高级 + 范围',
      examples: [
        { src: 'This lesson is easier than that one.', cn: '这节课比那节简单。' },
        { src: 'She is the best student in our class.', cn: '她是我们班最好的学生。' },
      ],
      quiz: [
        { q: 'This movie is ___ than the last one.', opts: ['interesting', 'more interesting', 'most interesting'], ans: 1, why: '较长形容词的比较级用 more + 原级，与 than 连用。' },
        { q: 'Mount Qomolangma is the ___ mountain in the world.', opts: ['high', 'higher', 'highest'], ans: 2, why: 'in the world 表范围，三者以上用最高级。' },
      ],
    },
    senior: {
      title: '定语从句',
      intro: '定语从句用来修饰名词，关系代词 who 指人、which 指物、that 两者皆可。',
      pattern: '先行词 + who / which / that + 从句',
      examples: [
        { src: 'The girl who sings well is my sister.', cn: '唱歌很好听的女孩是我妹妹。' },
        { src: 'This is the book that I bought yesterday.', cn: '这就是我昨天买的那本书。' },
      ],
      quiz: [
        { q: 'The man ___ is standing there is my uncle.', opts: ['who', 'which', 'whom'], ans: 0, why: '先行词 the man 指人且在从句中作主语，用 who。' },
        { q: 'I like the coffee ___ you made.', opts: ['who', 'which', 'whose'], ans: 1, why: '先行词 the coffee 指物，用 which。' },
      ],
    },
    advanced: {
      title: '虚拟语气',
      intro: '虚拟语气表达与事实相反的假设：对现在的假设用过去式，对过去的假设用 had + 过去分词。',
      pattern: 'If + 过去式 / had done，主语 + would / could + 动词原形 / have done',
      examples: [
        { src: 'If I were you, I would take the job.', cn: '如果我是你，我会接受这份工作。' },
        { src: 'If she had studied harder, she would have passed.', cn: '如果她当初更努力，就通过考试了。' },
      ],
      quiz: [
        { q: 'If I ___ you, I would not say that.', opts: ['am', 'were', 'was'], ans: 1, why: '对现在的虚拟假设，be 动词一律用 were。' },
        { q: 'If he had arrived earlier, he ___ the meeting.', opts: ['would catch', 'would have caught', 'catches'], ans: 1, why: '对过去事实的虚拟，主句用 would have + 过去分词。' },
      ],
    },
  },
  listening: {
    starter: {
      title: '初次见面 · 问候',
      script: 'A: Hello! How are you?\nB: I am fine, thank you. And you?\nA: I am great, thanks. Nice to see you!\nB: Nice to see you too. Have a good day!',
      cn: 'A：你好！你好吗？\nB：我很好，谢谢。你呢？\nA：我很好，谢谢。见到你真高兴！\nB：我也很高兴见到你。祝你今天愉快！',
      questions: [
        { q: 'How is B?', opts: ['Fine', 'Tired', 'Busy'], ans: 0, why: 'B 回答 "I am fine"——我很好。' },
        { q: 'What does A say at the end?', opts: ['Good night!', 'Have a good day!', 'See you tomorrow!'], ans: 1, why: 'A 最后说的是 "Have a good day!"（祝你今天愉快）。' },
        { q: 'The dialogue is mostly about ____.', opts: ['weather', 'greeting', 'shopping'], ans: 1, why: '整段对话是初次见面的问候寒暄。' },
      ],
    },
    elementary: {
      title: '在市场买东西',
      script: 'A: Good morning! How much are these apples?\nB: They are three yuan a kilo.\nA: I would like two kilos, please.\nB: OK, here you are. That will be six yuan.\nA: Here is the money. Thank you!\nB: You are welcome!',
      cn: 'A：早上好！这些苹果多少钱？\nB：三元一公斤。\nA：我要两公斤。\nB：好的，给您，一共六元。\nA：给你钱，谢谢！\nB：不客气！',
      questions: [
        { q: 'What does A want to buy?', opts: ['Bananas', 'Apples', 'Oranges'], ans: 1, why: 'A 询问的是 apples（苹果）的价格。' },
        { q: 'How much do two kilos cost?', opts: ['Three yuan', 'Five yuan', 'Six yuan'], ans: 2, why: '每公斤三元，两公斤共六元。' },
        { q: 'Where does the dialogue happen?', opts: ['In a market', 'In a school', 'In a library'], ans: 0, why: '从价格和购买量可判断是在市场购物。' },
      ],
    },
    junior: {
      title: '周末计划',
      script: 'A: What are you going to do this weekend?\nB: I am going hiking with my classmates on Saturday.\nA: Sounds fun! I heard the weather will be sunny.\nB: Great! Would you like to join us?\nA: Sure, I would love to. Where shall we meet?\nB: Let us meet at the park gate at eight.',
      cn: 'A：这周末你打算做什么？\nB：周六我要和同学去远足。\nA：听起来不错！我听说会是晴天。\nB：太好了！你想一起来吗？\nA：当然，我很乐意。我们在哪里碰面？\nB：早上八点公园门口见吧。',
      questions: [
        { q: 'When will B go hiking?', opts: ['On Sunday', 'On Saturday', 'On Friday'], ans: 1, why: 'B 说 "on Saturday"——周六去远足。' },
        { q: 'What will the weather be like?', opts: ['Sunny', 'Rainy', 'Cloudy'], ans: 0, why: 'A 听说周末会是 sunny（晴天）。' },
        { q: 'Where will they meet?', opts: ['At the station', 'At the park gate', 'At the mall'], ans: 1, why: '约定在公园门口（park gate）八点集合。' },
      ],
    },
    senior: {
      title: '校园讲座片段',
      script: 'Good morning, everyone. Today I would like to talk about the influence of technology on our daily communication. Studies show that while we send more messages than ever, face-to-face conversations are decreasing. This shift affects how we build trust and empathy with others. I encourage you to reflect on your own communication habits this week.',
      cn: '大家早上好。今天我想谈谈科技对日常沟通的影响。研究表明，尽管我们发送的信息比以往任何时候都多，面对面的交谈却在减少。这种转变影响了我们与他人建立信任与同理心的方式。我鼓励你们这周反思自己的沟通习惯。',
      questions: [
        { q: 'What is the lecture mainly about?', opts: ['Technology and communication', 'History of messages', 'How to send emails'], ans: 0, why: '讲座主题是科技对日常沟通的影响。' },
        { q: 'According to the lecture, face-to-face conversations are ____.', opts: ['increasing', 'decreasing', 'unchanged'], ans: 1, why: '讲座指出面对面的交谈在减少（decreasing）。' },
        { q: 'What does the speaker encourage students to do?', opts: ['Send more messages', 'Reflect on communication habits', 'Stop using phones'], ans: 1, why: '演讲者鼓励大家反思自己的沟通习惯。' },
      ],
    },
    advanced: {
      title: '商务谈判观点',
      script: 'Let me summarize our position. We believe the proposed budget is both ambitious and achievable, provided we streamline our production process. However, we remain open to alternative pricing structures if your team can demonstrate clear long-term value. Ultimately, our goal is a partnership built on mutual growth, not a short-term deal.',
      cn: '让我总结一下我们的立场。我们认为，只要优化生产流程，这份预算既雄心勃勃又切实可行。但如果贵团队能证明长期价值，我们也对替代定价方案持开放态度。归根结底，我们的目标是建立在共同成长之上的伙伴关系，而不是短期交易。',
      questions: [
        { q: 'What is the speaker’s attitude toward the budget?', opts: ['Fully opposed', 'Supportive with conditions', 'Indifferent'], ans: 1, why: '发言人认为预算可行，但前提是优化生产流程——有条件支持。' },
        { q: 'The speaker is open to ____.', opts: ['ending the deal', 'alternative pricing', 'lowering quality'], ans: 1, why: '如果对方能证明长期价值，愿意考虑替代定价方案。' },
        { q: 'What is the ultimate goal of the negotiation?', opts: ['A short-term deal', 'A partnership for mutual growth', 'Reducing budget'], ans: 1, why: '目标是建立在共同成长之上的长期伙伴关系。' },
      ],
    },
  },
  speaking: {
    starter: {
      prompt: '用目标语言做一次简单自我介绍',
      reference: 'Hello! My name is Lily. I am very happy to meet you.',
      keywords: ['hello', 'name', 'happy', 'meet'],
      tip: '先慢速跟读，注意连读，如 "My name is" 可自然连读。',
    },
    elementary: {
      prompt: '在咖啡馆点一杯饮品',
      reference: 'I would like a cup of coffee with milk, please.',
      keywords: ['would like', 'cup', 'please'],
      tip: '用 "I would like..." 比 "I want..." 更礼貌得体。',
    },
    junior: {
      prompt: '介绍你的工作和周末爱好',
      reference: 'I work as an engineer, and I enjoy traveling on weekends.',
      keywords: ['work as', 'enjoy', 'weekends'],
      tip: '介绍自己时先讲职业，再用 and 连接爱好，句尾降调自然结束。',
    },
    senior: {
      prompt: '就「在线学习的重要性」发表观点',
      reference: 'In my opinion, online learning is becoming increasingly important for modern students.',
      keywords: ['in my opinion', 'increasingly', 'modern'],
      tip: '用 "In my opinion" 引出观点，重读 important 一词突出立场。',
    },
    advanced: {
      prompt: '用一段开场白开启主题演讲',
      reference: 'It is a great honor to be here today to discuss the future of language education.',
      keywords: ['a great honor', 'discuss', 'future'],
      tip: '正式开场注意停顿与重音：It is a GREAT honor...，语速放稳显从容。',
    },
  },
};

const JA = {
  tts: 'ja-JP',
  words: {
    starter: [
      { text: 'こんにちは',   phonetic: 'konnichiwa',  meaning: '你好', example: 'こんにちは、田中です。', exampleCn: '你好，我是田中。' },
      { text: 'ありがとう',   phonetic: 'arigatou',    meaning: '谢谢', example: 'ありがとうございます。', exampleCn: '非常感谢。' },
      { text: 'すみません',   phonetic: 'sumimasen',   meaning: '对不起；劳驾', example: 'すみません、お手洗いはどこですか。', exampleCn: '请问，洗手间在哪里？' },
      { text: 'はい',         phonetic: 'hai',         meaning: '是；好的', example: 'はい、わかりました。', exampleCn: '好的，我明白了。' },
      { text: 'みず',         phonetic: 'mizu',        meaning: '水', example: 'みずを一杯ください。', exampleCn: '请给我一杯水。' },
      { text: 'さようなら',   phonetic: 'sayounara',   meaning: '再见', example: 'さようなら、また明日。', exampleCn: '再见，明天见。' },
    ],
    elementary: [
      { text: 'たべる',   phonetic: 'taberu',   meaning: '吃', example: '朝ご飯をたべます。', exampleCn: '我吃早饭。' },
      { text: 'のむ',     phonetic: 'nomu',     meaning: '喝', example: 'コーヒーをのむのが好きです。', exampleCn: '我喜欢喝咖啡。' },
      { text: 'いく',     phonetic: 'iku',      meaning: '去', example: '学校へいきます。', exampleCn: '我去学校。' },
      { text: 'みる',     phonetic: 'miru',     meaning: '看', example: '映画をみます。', exampleCn: '我看电影。' },
      { text: 'かう',     phonetic: 'kau',      meaning: '买', example: '本をかいました。', exampleCn: '我买了书。' },
      { text: 'たかい',   phonetic: 'takai',    meaning: '贵的', example: 'この店はちょっとたかいです。', exampleCn: '这家店有点贵。' },
    ],
    junior: [
      { text: 'でんしゃ',   phonetic: 'densha',    meaning: '电车', example: 'でんしゃで会社へ行きます。', exampleCn: '我乘电车去公司。' },
      { text: 'かいしゃ',   phonetic: 'kaisha',    meaning: '公司', example: 'かいしゃは駅の近くです。', exampleCn: '公司在车站附近。' },
      { text: 'しごと',     phonetic: 'shigoto',   meaning: '工作', example: 'しごとは忙しいです。', exampleCn: '工作很忙。' },
      { text: 'ともだち',   phonetic: 'tomodachi', meaning: '朋友', example: 'ともだちと遊びます。', exampleCn: '我和朋友玩。' },
      { text: 'やすみ',     phonetic: 'yasumi',    meaning: '休息；假期', example: '週末はやすみです。', exampleCn: '周末休息。' },
      { text: 'はなし',     phonetic: 'hanashi',   meaning: '谈话；故事', example: '先生とはなしをします。', exampleCn: '我和老师谈话。' },
    ],
    senior: [
      { text: 'けんきゅう',   phonetic: 'kenkyuu',    meaning: '研究', example: '日本文化をけんきゅうしています。', exampleCn: '我在研究日本文化。' },
      { text: 'はってん',     phonetic: 'hatten',     meaning: '发展', example: '技術のはってんが速いです。', exampleCn: '技术发展很快。' },
      { text: 'かんきょう',   phonetic: 'kankyou',    meaning: '环境', example: 'かんきょうを守りましょう。', exampleCn: '让我们一起保护环境。' },
      { text: 'きかい',       phonetic: 'kikai',      meaning: '机会', example: 'いいきかいを逃さないでください。', exampleCn: '请不要错过好机会。' },
      { text: 'せいこう',     phonetic: 'seikou',     meaning: '成功', example: '試験にせいこうしました。', exampleCn: '我考试成功了。' },
      { text: 'どりょく',     phonetic: 'doryoku',    meaning: '努力', example: 'どりょくが実りました。', exampleCn: '努力有了回报。' },
    ],
    advanced: [
      { text: 'ほんしつ',   phonetic: 'honshitsu', meaning: '本质', example: '問題のほんしつを考える。', exampleCn: '思考问题的本质。' },
      { text: 'じつげん',   phonetic: 'jitsugen',  meaning: '实现', example: '夢をじつげんする。', exampleCn: '实现梦想。' },
      { text: 'はかる',     phonetic: 'hakaru',    meaning: '衡量；测量', example: '成果をはかる指標。', exampleCn: '衡量成果的指标。' },
      { text: 'ゆうき',     phonetic: 'yuuki',     meaning: '勇气', example: 'ゆうきを出して挑戦する。', exampleCn: '鼓起勇气去挑战。' },
      { text: 'たくみ',     phonetic: 'takumi',    meaning: '巧妙', example: 'たくみな話術に感心する。', exampleCn: '佩服巧妙的说话技巧。' },
      { text: 'みがく',     phonetic: 'migaku',    meaning: '打磨；磨练', example: '語学力をみがく。', exampleCn: '磨练语言能力。' },
    ],
  },
  grammar: {
    starter: {
      title: '「〜です」断定句与「は」助词',
      intro: '日语基础句为「A は B です」，助词「は」提示主题，「です」表示断定（是）。',
      pattern: 'A は B です。',
      examples: [
        { src: 'わたしは 学生です。', cn: '我是学生。' },
        { src: 'これは 本です。', cn: '这是书。' },
      ],
      quiz: [
        { q: '“我是小林。” 的正确说法是？', opts: ['わたしは 小林さんです。', 'わたしは 小林です。', '小林は わたしです。'], ans: 1, why: '自我介绍时自己的名字后不加「さん」尊称。' },
        { q: '「これは 本です。」中「は」的作用是？', opts: ['提示主题', '表示方向', '表示所有'], ans: 0, why: '助词「は」用来提示句子的主题。' },
      ],
    },
    elementary: {
      title: '动词ます形',
      intro: '动词ます形是日语礼貌体的核心，由辞书形变化而来，如 たべる → たべます。',
      pattern: '动词ます形 + ます / ました',
      examples: [
        { src: 'ご飯を たべます。', cn: '我吃饭。（现在/将来）' },
        { src: 'きのう 学校へ 行きました。', cn: '昨天去了学校。（过去）' },
      ],
      quiz: [
        { q: '「のむ（喝）」的ます形是？', opts: ['のみます', 'のます', 'のんます'], ans: 0, why: '「のむ」连用形「のみ」+ます → のみます。' },
        { q: '「行きました」表达的时态是？', opts: ['现在', '过去', '将来'], ans: 1, why: 'ました 是过去式标志。' },
      ],
    },
    junior: {
      title: 'て形连接',
      intro: '「て形」用来连接动作或句子，表示先后顺序、方式或原因。',
      pattern: '动词て形 + 后续动作',
      examples: [
        { src: '朝起きて、コーヒーを飲みます。', cn: '早上起床后喝咖啡。' },
        { src: '電車に乗って、会社へ行きます。', cn: '坐电车去公司。' },
      ],
      quiz: [
        { q: '「起きる」的て形是？', opts: ['起きて', '起きって', '起きで'], ans: 0, why: '一段动词て形：去「る」加「て」→ 起きて。' },
        { q: '「歩いて、駅へ行きます」中「て」表示？', opts: ['方式', '原因', '逆接'], ans: 0, why: '此处て形表示动作的方式（步行）。' },
      ],
    },
    senior: {
      title: '被动形',
      intro: '被动形表示「被…」，动词变化为 〜られる / 〜れる，句中用「に」引出施事者。',
      pattern: '主体 は 施事者 に + 动词被动形',
      examples: [
        { src: '先生に ほめられました。', cn: '被老师表扬了。' },
        { src: '犬に おいかけられました。', cn: '被狗追了。' },
      ],
      quiz: [
        { q: '「ほめる（表扬）」的被动形是？', opts: ['ほめられる', 'ほめれる', 'ほまれる'], ans: 0, why: '一段动词被动形：去「る」+られる → ほめられる。' },
        { q: '被动句中施事者用什么助词引出？', opts: ['は', 'に', 'を'], ans: 1, why: '被动句中「に」用来引出动作的施加者。' },
      ],
    },
    advanced: {
      title: '敬语（お〜ください）',
      intro: '敬语在商务与正式场合使用，「お＋ます形＋ください」表示礼貌的请求。',
      pattern: 'お + 动词连用形 + ください',
      examples: [
        { src: '少々お待ちください。', cn: '请稍等。' },
        { src: 'こちらに おかけください。', cn: '请坐这里。' },
      ],
      quiz: [
        { q: '「待つ」的礼貌请求形式是？', opts: ['待ってください', 'お待ちください', '待つください'], ans: 1, why: '敬语请求用「お＋待ち＋ください」。' },
        { q: '「お読みください」的意思是？', opts: ['请读', '我读', '读完了'], ans: 0, why: 'お読みください = 请您阅读。' },
      ],
    },
  },
  listening: {
    starter: {
      title: '自我介绍',
      script: 'はじめまして。わたしは タナカ です。日本から 来ました。どうぞ よろしくお願いします。',
      cn: '初次见面。我是田中。来自日本。请多多关照。',
      questions: [
        { q: '说话人的名字是？', opts: ['さとう', 'たなか', 'すずき'], ans: 1, why: '原文「わたしは タナカ です」——我是田中。' },
        { q: '说话人来自哪里？', opts: ['中国', '韩国', '日本'], ans: 2, why: '「日本から 来ました」——来自日本。' },
        { q: '「よろしくお願いします」常用于？', opts: ['初次见面问候', '告别', '道歉'], ans: 0, why: '「请多多关照」是初次见面的常用寒暄。' },
      ],
    },
    elementary: {
      title: '在便利店买东西',
      script: '店員：いらっしゃいませ。\n客：すみません、この お弁当は いくらですか。\n店員：400円です。\n客：じゃあ、これを ください。\n店員：ありがとうございます。500円 お預かりします。\n客：はい、おつりを 100円 いただきます。',
      cn: '店员：欢迎光临。\n顾客：请问，这个便当多少钱？\n店员：400日元。\n顾客：那我要这个。\n店员：谢谢。收您500日元。\n顾客：好的，找回我100日元。',
      questions: [
        { q: '顾客在买什么？', opts: ['お弁当（便当）', 'お茶', '雑誌'], ans: 0, why: '顾客询问的是お弁当（便当）的价格。' },
        { q: '便当多少钱？', opts: ['300円', '400円', '500円'], ans: 1, why: '店员回答「400円です」。' },
        { q: '顾客付了500日元，应该找多少？', opts: ['50円', '100円', '200円'], ans: 1, why: '500 - 400 = 100円。' },
      ],
    },
    junior: {
      title: '在电车上问路',
      script: 'A：すみません、渋谷駅へは どう行きますか。\nB：この電車で 三つ目の駅です。\nA：どのぐらい かかりますか。\nB：十分ぐらいです。\nA：どうも ありがとうございます。\nB：いいえ、どういたしまして。',
      cn: 'A：请问，去涩谷站怎么走？\nB：坐这趟电车，第三个站就是。\nA：大概要多久？\nB：十分钟左右。\nA：非常感谢。\nB：不客气。',
      questions: [
        { q: 'A 要去哪里？', opts: ['新宿駅', '渋谷駅', '上野駅'], ans: 1, why: 'A 询问去渋谷駅（涩谷站）怎么走。' },
        { q: '去涩谷需要坐几站？', opts: ['两个站', '三个站', '四个站'], ans: 1, why: 'B 说「三つ目の駅」——第三个站。' },
        { q: '大约需要多长时间？', opts: ['五分钟', '十分钟', '二十分钟'], ans: 1, why: '「十分ぐらい」——十分钟左右。' },
      ],
    },
    senior: {
      title: '公司会议片段',
      script: '本日の会議では、新製品の販売計画について 意見を 出してください。市場調査の結果、若い世代に 人気が 高まっています。ですから、SNSを 中心とした プロモーションを 提案します。皆さんの 意見を 聞かせてください。',
      cn: '今天的会议，请大家就新产品的销售计划发表意见。市场调查结果显示，它在年轻一代中人气正在上升。因此，我提议以社交媒体为中心进行推广。请听听大家的意见。',
      questions: [
        { q: '会议讨论的主题是？', opts: ['新产品的销售计划', '人事安排', '办公地点'], ans: 0, why: '「新製品の販売計画」——新产品销售计划。' },
        { q: '市场调查显示了什么？', opts: ['年轻人中人气上升', '老年人中人气上升', '销量下降'], ans: 0, why: '「若い世代に 人気が 高まっています」——年轻一代人气上升。' },
        { q: '发言者建议用什么方式推广？', opts: ['电视广告', 'SNS（社交媒体）', '报纸'], ans: 1, why: '「SNSを 中心とした プロモーション」——以社交媒中心推广。' },
      ],
    },
    advanced: {
      title: '新闻报道片段',
      script: '本日、政府は 再生可能エネルギーへの 投資を 拡大する 新たな政策を 発表しました。専門家は、これにより 二酸化炭素の 排出量が 大幅に 削減される と 期待しています。一方で、企業の コスト負担に ついては 今後の 課題だと 指摘しています。',
      cn: '今天，政府公布了扩大可再生能源投资的新政策。专家期待这将大幅减少二氧化碳排放。另一方面，也有人指出企业的成本负担是今后的课题。',
      questions: [
        { q: '政府公布了什么？', opts: ['扩大可再生能源投资的政策', '新税率政策', '教育政策'], ans: 0, why: '「再生可能エネルギーへの 投資を 拡大する 新たな政策」——扩大可再生能源投资的新政策。' },
        { q: '专家期待这个政策能带来什么？', opts: ['减少就业', '大幅减少二氧化碳排放', '提高房价'], ans: 1, why: '期待「排出量が 大幅に 削減される」——排放量大幅减少。' },
        { q: '今后的课题是什么？', opts: ['企业的成本负担', '技术水平', '法律修订'], ans: 0, why: '「企業の コスト負担に ついては 今後の 課題」——企业的成本负担是课题。' },
      ],
    },
  },
  speaking: {
    starter: {
      prompt: '用日语做一次礼貌的自我介绍',
      reference: 'はじめまして。わたしは リン です。どうぞ よろしくお願いします。',
      keywords: ['はじめまして', 'わたしは', 'よろしく'],
      tip: '「はじめまして」后稍作停顿，名字部分放慢语速，保持语调平稳。',
    },
    elementary: {
      prompt: '在店里买东西时请店员拿商品',
      reference: 'すみません、これを ください。',
      keywords: ['すみません', 'これ', 'ください'],
      tip: '开头用「すみません」引起注意，结尾「ください」清晰收尾。',
    },
    junior: {
      prompt: '介绍自己的工作和爱好',
      reference: 'わたしは 会社員で、週末に よく 旅行を します。',
      keywords: ['会社員', '週末', '旅行'],
      tip: '「会社員で」的「で」轻轻带过，句尾「します」用降调结束。',
    },
    senior: {
      prompt: '就「在线学习」发表自己的观点',
      reference: 'わたしは オンライン学習は とても 便利だと 思います。',
      keywords: ['オンライン学習', '便利', '思います'],
      tip: '「〜と思います」前稍作停顿，重读「便利」以表达态度。',
    },
    advanced: {
      prompt: '在正式场合发表感谢致辞',
      reference: '本日は お忙しい中、お越しいただき、誠に ありがとうございます。',
      keywords: ['本日', 'お忙しい中', '誠に'],
      tip: '敬语致辞注意「お越しいただき」的节奏，字与字之间平稳清晰。',
    },
  },
};

const KO = {
  tts: 'ko-KR',
  words: {
    starter: [
      { text: '안녕하세요',    phonetic: 'annyeonghaseyo', meaning: '你好', example: '안녕하세요, 저는 민수입니다.', exampleCn: '你好，我是敏秀。' },
      { text: '감사합니다',    phonetic: 'gamsahamnida',   meaning: '谢谢', example: '도와주셔서 감사합니다.', exampleCn: '谢谢您的帮助。' },
      { text: '죄송합니다',    phonetic: 'joesonghamnida', meaning: '对不起', example: '죄송합니다, 늦었습니다.', exampleCn: '对不起，我来晚了。' },
      { text: '네',            phonetic: 'ne',             meaning: '是；好的', example: '네, 알겠습니다.', exampleCn: '好的，我知道了。' },
      { text: '물',            phonetic: 'mul',            meaning: '水', example: '물 한 잔 주세요.', exampleCn: '请给我一杯水。' },
      { text: '안녕히 가세요', phonetic: 'annyeonghi gaseyo', meaning: '再见（对要走的人说）', example: '안녕히 가세요, 내일 봐요.', exampleCn: '再见，明天见。' },
    ],
    elementary: [
      { text: '먹다',   phonetic: 'meokda',    meaning: '吃', example: '아침을 먹습니다.', exampleCn: '我吃早饭。' },
      { text: '마시다', phonetic: 'masida',    meaning: '喝', example: '물을 마십니다.', exampleCn: '我喝水。' },
      { text: '가다',   phonetic: 'gada',      meaning: '去', example: '학교에 갑니다.', exampleCn: '我去学校。' },
      { text: '보다',   phonetic: 'boda',      meaning: '看', example: '영화를 봅니다.', exampleCn: '我看电影。' },
      { text: '사다',   phonetic: 'sada',      meaning: '买', example: '책을 샀습니다.', exampleCn: '我买了书。' },
      { text: '비싸다', phonetic: 'bissada',   meaning: '贵', example: '이 가방은 비쌉니다.', exampleCn: '这个包很贵。' },
    ],
    junior: [
      { text: '회사',     phonetic: 'hoesa',     meaning: '公司', example: '회사는 역 근처에 있어요.', exampleCn: '公司在车站附近。' },
      { text: '친구',     phonetic: 'chingu',    meaning: '朋友', example: '친구와 같이 놀아요.', exampleCn: '我和朋友一起玩。' },
      { text: '일',       phonetic: 'il',        meaning: '工作', example: '일이 아주 바빠요.', exampleCn: '工作非常忙。' },
      { text: '쉬다',     phonetic: 'swida',     meaning: '休息', example: '주말에 쉬어요.', exampleCn: '周末休息。' },
      { text: '말하다',   phonetic: 'malhada',   meaning: '说话', example: '천천히 말해 주세요.', exampleCn: '请慢慢说。' },
      { text: '믿다',     phonetic: 'mitda',     meaning: '相信', example: '저는 그를 믿어요.', exampleCn: '我相信他。' },
    ],
    senior: [
      { text: '연구',     phonetic: 'yeongu',    meaning: '研究', example: '한국 문화를 연구합니다.', exampleCn: '我研究韩国文化。' },
      { text: '발전',     phonetic: 'baljeon',   meaning: '发展', example: '기술 발전이 빠릅니다.', exampleCn: '技术发展很快。' },
      { text: '환경',     phonetic: 'hwankyung', meaning: '环境', example: '환경을 보호합시다.', exampleCn: '让我们保护环境。' },
      { text: '기회',     phonetic: 'gihoe',     meaning: '机会', example: '좋은 기회를 놓치지 마세요.', exampleCn: '请不要错过好机会。' },
      { text: '성공',     phonetic: 'seonggong', meaning: '成功', example: '시험에 성공했습니다.', exampleCn: '考试成功了。' },
      { text: '노력',     phonetic: 'noryeok',   meaning: '努力', example: '노력이 결실을 맺었어요.', exampleCn: '努力有了成果。' },
    ],
    advanced: [
      { text: '본질',       phonetic: 'bonjil',      meaning: '本质', example: '문제의 본질을 생각해요.', exampleCn: '思考问题的本质。' },
      { text: '성취',       phonetic: 'seongchwi',   meaning: '成就', example: '작은 성취를 축하해요.', exampleCn: '为小小的成就庆祝。' },
      { text: '조화',       phonetic: 'johwa',       meaning: '和谐', example: '자연과의 조화가 중요해요.', exampleCn: '与自然的和谐很重要。' },
      { text: '통찰',       phonetic: 'tongchal',    meaning: '洞察', example: '그의 통찰이 놀랍습니다.', exampleCn: '他的洞察力令人惊叹。' },
      { text: '묘미',       phonetic: 'myomi',       meaning: '妙趣', example: '언어 학습의 묘미를 느껴요.', exampleCn: '感受语言学习的妙趣。' },
      { text: '심오하다',   phonetic: 'simohada',    meaning: '深邃的', example: '그 시는 의미가 심오합니다.', exampleCn: '那首诗意义深邃。' },
    ],
  },
  grammar: {
    starter: {
      title: '「〜입니다」断定句与助词「은/는」',
      intro: '韩语基础句为「A 은/는 B 입니다」，助词「은/는」提示主题，「입니다」表示断定。',
      pattern: 'A 은/는 B 입니다.',
      examples: [
        { src: '저는 학생입니다.', cn: '我是学生。' },
        { src: '이것은 책입니다.', cn: '这是书。' },
      ],
      quiz: [
        { q: '“我是敏秀。” 的正确说法是？', opts: ['저는 민수입니다.', '저는 민수예요?', '민수는 저입니다.'], ans: 0, why: '「저는 ~입니다」是正式自我介绍句式。' },
        { q: '「이것은 책입니다」中「은」的作用是？', opts: ['提示主题', '表示方向', '表示否定'], ans: 0, why: '助词「은/는」用来提示句子的主题。' },
      ],
    },
    elementary: {
      title: '动词 아요/어요 形（해요体）',
      intro: '해요体是韩语最常用的礼貌表达，动词词干加 아요/어요 或 해요。',
      pattern: '词干 + 아요 / 어요 / 해요',
      examples: [
        { src: '밥을 먹어요.', cn: '我吃饭。' },
        { src: '학교에 가요.', cn: '我去学校。' },
      ],
      quiz: [
        { q: '「가다（去）」的 해요体是？', opts: ['가요', '가아요', '갑니다요'], ans: 0, why: '词干以「아」结尾加 아요 → 가요。' },
        { q: '「보다（看）」的 해요体是？', opts: ['보요', '봐요', '보다요'], ans: 1, why: '「보아요」缩略为「봐요」。' },
      ],
    },
    junior: {
      title: '连接词尾 -고 / -서',
      intro: '「-고」表示并列，「-서」表示先后顺序或原因，用来连接两个动作。',
      pattern: '动词 + 고 / 서 + 动词',
      examples: [
        { src: '아침에 일어나서 커피를 마셔요.', cn: '早上起床后喝咖啡。' },
        { src: '음악을 듣고 책을 읽어요.', cn: '听音乐并看书。' },
      ],
      quiz: [
        { q: '“起床后洗脸” 用哪个连接词尾？', opts: ['-고', '-서', '-지만'], ans: 1, why: '「-서」表示动作的先后顺序（起床后洗脸）。' },
        { q: '「노래하고 춤춰요」的意思是？', opts: ['又唱歌又跳舞', '唱完歌再跳舞', '不唱也不跳'], ans: 0, why: '「-고」表示并列，两者同时进行。' },
      ],
    },
    senior: {
      title: '被动 -아지다',
      intro: '「-아지다 / -어지다」加在动词后表示被动或状态变化。',
      pattern: '动词词干 + 아지다 / 어지다',
      examples: [
        { src: '문이 닫혀 있어요.', cn: '门关着。' },
        { src: '이 책은 많이 읽혀요.', cn: '这本书读的人很多。（被广泛阅读）' },
      ],
      quiz: [
        { q: '「열다（打开）」的被动形是？', opts: ['열리다', '열어지다', '열려다'], ans: 0, why: '「열다」的被动是「열리다」（被打开）。' },
        { q: '「닫히다」的意思是？', opts: ['打开', '被关闭', '飞走'], ans: 1, why: '「닫히다」是「닫다」的被动形，意为被关闭。' },
      ],
    },
    advanced: {
      title: '敬语 -시- 与间接引语',
      intro: '对长辈用敬语词尾「-시-」，间接引语「~다고 하다」用来转述他人的话。',
      pattern: '动词词干 + 시 + 词尾；引用内容 + 다고 하다',
      examples: [
        { src: '선생님께서 오십니다.', cn: '老师来了。（敬语）' },
        { src: '민수 씨가 내일 온다고 했어요.', cn: '敏秀说明天来。' },
      ],
      quiz: [
        { q: '「가다」对长辈的敬语形式是？', opts: ['가시다', '갑니다', '가세요?'], ans: 0, why: '「가다」词干加敬语词尾「-시-」→ 가시다。' },
        { q: '「他说很忙」的正确转述是？', opts: ['바쁘다고 했어요', '바빠요 하고요', '바쁘게 말해요'], ans: 0, why: '间接引语「~다고 하다」转述他人话语。' },
      ],
    },
  },
  listening: {
    starter: {
      title: '自我介绍',
      script: '안녕하세요. 저는 김민수입니다. 한국에서 왔습니다. 만나서 반갑습니다.',
      cn: '你好。我是金敏秀。来自韩国。很高兴见到你。',
      questions: [
        { q: '说话人叫什么名字？', opts: ['김민수', '박지훈', '이수진'], ans: 0, why: '「저는 김민수입니다」——我叫金敏秀。' },
        { q: '说话人来自哪里？', opts: ['中国', '韩国', '日本'], ans: 1, why: '「한국에서 왔습니다」——来自韩国。' },
        { q: '「만나서 반갑습니다」的意思是？', opts: ['很高兴见到你', '再见', '对不起'], ans: 0, why: '「만나서 반갑습니다」= 见到你很高兴。' },
      ],
    },
    elementary: {
      title: '在市场买东西',
      script: '손님: 아저씨, 이 사과 얼마예요?\n가게: 한 킬로에 3,000원이에요.\n손님: 두 킬로 주세요.\n가게: 네, 여기 있어요. 모두 6,000원이에요.\n손님: 여기 있어요. 감사합니다!\n가게: 네, 또 오세요!',
      cn: '顾客：大叔，这苹果多少钱？\n店主：一公斤3000韩元。\n顾客：给我两公斤。\n店主：好的，给您。一共6000韩元。\n顾客：给您钱。谢谢！\n店主：好的，欢迎再来！',
      questions: [
        { q: '顾客买了什么？', opts: ['사과（苹果）', '배（梨）', '포도（葡萄）'], ans: 0, why: '顾客询问的是 사과（苹果）的价格。' },
        { q: '两公斤苹果多少钱？', opts: ['3,000원', '6,000원', '9,000원'], ans: 1, why: '一公斤3000韩元，两公斤6000韩元。' },
        { q: '这个对话发生的地点最可能是？', opts: ['시장（市场）', '학교（学校）', '도서관（图书馆）'], ans: 0, why: '从讨价还价和购买量判断是在市场。' },
      ],
    },
    junior: {
      title: '周末计划',
      script: 'A: 이번 주말에 뭐 할 거예요?\nB: 토요일에 친구와 같이 등산할 거예요.\nA: 좋겠네요! 저도 같이 가도 돼요?\nB: 물론이죠! 오전 9시에 공원 앞에서 만나요.\nA: 좋아요, 그럼 그때 봐요!',
      cn: 'A：这个周末打算做什么？\nB：周六要和朋友一起去爬山。\nA：真好！我也能一起去吗？\nB：当然！上午九点在公园前面见面。\nA：好的，到时候见！',
      questions: [
        { q: 'B 周末要做什么？', opts: ['등산（爬山）', '영화 보기（看电影）', '쇼핑（购物）'], ans: 0, why: 'B 说「등산할 거예요」——要去爬山。' },
        { q: '他们几点在哪儿见面？', opts: ['9点在公园前', '10点在车站', '8点在学校'], ans: 0, why: '「오전 9시에 공원 앞에서 만나요」——上午9点公园前。' },
        { q: 'A 对一起去的态度是？', opts: ['不愿意', '想一起去', '无所谓'], ans: 1, why: 'A 主动问「저도 같이 가도 돼요?」——想一起去。' },
      ],
    },
    senior: {
      title: '公司会议片段',
      script: '오늘 회의에서는 신제품 판매 계획에 대해 의견을 주세요. 시장 조사 결과, 젊은 세대 사이에서 인기가 높아지고 있습니다. 그래서 SNS 중심의 프로모션을 제안합니다. 여러분의 의견을 듣고 싶습니다.',
      cn: '今天的会议，请大家就新产品的销售计划发表意见。市场调查结果显示，它在年轻一代中人气正在上升。因此，我提议以社交媒体为中心进行推广。我想听听大家的意见。',
      questions: [
        { q: '会议讨论的主题是什么？', opts: ['신제품 판매 계획（新产品销售计划）', '인사 배치（人事安排）', '사무실 이전（办公室搬迁）'], ans: 0, why: '「신제품 판매 계획」——新产品销售计划。' },
        { q: '市场调查显示了什么？', opts: ['年轻人中人气上升', '销量下降', '价格下降'], ans: 0, why: '「젊은 세대 사이에서 인기가 높아지고 있습니다」——年轻一代中人气上升。' },
        { q: '发言者建议怎样推广？', opts: ['电视广告', 'SNS（社交媒体）', '报纸广告'], ans: 1, why: '「SNS 중심의 프로모션」——以社交媒体为中心的推广。' },
      ],
    },
    advanced: {
      title: '新闻报道片段',
      script: '오늘 정부는 재생 에너지 투자를 확대하는 새로운 정책을 발표했습니다. 전문가들은 이를 통해 이산화탄소 배출량이 크게 줄어들 것으로 기대합니다. 한편, 기업의 비용 부담은 앞으로의 과제라고 지적했습니다.',
      cn: '今天，政府公布了扩大可再生能源投资的新政策。专家期待这将大幅减少二氧化碳排放。另一方面，也有人指出企业的成本负担是今后的课题。',
      questions: [
        { q: '政府公布了什么？', opts: ['扩大可再生能源投资的政策', '新的税收政策', '教育改革政策'], ans: 0, why: '「재생 에너지 투자를 확대하는 새로운 정책」——扩大可再生能源投资的新政策。' },
        { q: '专家期待什么？', opts: ['大幅减少二氧化碳排放', '增加就业机会', '提高工资'], ans: 0, why: '「이산화탄소 배출량이 크게 줄어들 것으로 기대합니다」——期待排放量大幅减少。' },
        { q: '今后的课题是什么？', opts: ['기업의 비용 부담（企业成本负担）', '技术水平', '法律修改'], ans: 0, why: '「기업의 비용 부담은 앞으로의 과제」——企业的成本负担是课题。' },
      ],
    },
  },
  speaking: {
    starter: {
      prompt: '用韩语做一次礼貌的自我介绍',
      reference: '안녕하세요. 저는 리리입니다. 만나서 반갑습니다.',
      keywords: ['안녕하세요', '저는', '반갑습니다'],
      tip: '「안녕하세요」发音清晰，名字部分放慢语速，「반갑습니다」自然收尾。',
    },
    elementary: {
      prompt: '在店里点一份菜单上的食品',
      reference: '이거 주세요. 맛있어 보여요.',
      keywords: ['이거', '주세요', '맛있어'],
      tip: '「이거 주세요」简洁礼貌，加一句「맛있어 보여요」显得更自然亲切。',
    },
    junior: {
      prompt: '介绍自己的工作与爱好',
      reference: '저는 회사원이고, 주말에 자주 여행을 다녀요.',
      keywords: ['회사원', '주말', '여행'],
      tip: '「-이고」连接两个信息，句尾「다녀요」用自然降调。',
    },
    senior: {
      prompt: '就「在线学习」发表观点',
      reference: '저는 온라인 학습이 아주 편리하다고 생각합니다.',
      keywords: ['온라인 학습', '편리하다', '생각합니다'],
      tip: '「~다고 생각합니다」前稍作停顿，重读「편리하다」突出立场。',
    },
    advanced: {
      prompt: '在正式场合发表感谢致辞',
      reference: '오늘 바쁘신 중에 와 주셔서 진심으로 감사드립니다.',
      keywords: ['바쁘신 중에', '와 주셔서', '감사드립니다'],
      tip: '敬语致辞注意「바쁘신 중에」的节奏，语速放稳、字字清晰。',
    },
  },
};

const CONTENT = { en: EN, ja: JA, ko: KO };

/* ---------- 课程目录生成（语言 × 分级） ---------- */
export const COURSES = [];
export const LESSONS = [];

LANGUAGES.filter((l) => !l.comingSoon).forEach((lang) => {
  const bank = CONTENT[lang.id];
  LEVELS.forEach((level) => {
    const courseId = `${lang.id}-${level.id}`;
    const words = bank.words[level.id];
    const grammar = bank.grammar[level.id];
    const listening = bank.listening[level.id];
    const speaking = bank.speaking[level.id];

    const fullContent = { words, grammar, listening, speaking };
    const lessonDefs = [
      { type: 'vocab', title: `${level.name} · 核心词汇`, subtitle: `${words.length} 个高频单词闪卡速记`, featured: true, content: fullContent },
      { type: 'grammar', title: `${level.name} · 实用语法`, subtitle: `「${grammar.title}」规则精讲与练习`, featured: true, content: fullContent },
      { type: 'listening', title: `${level.name} · 听力训练`, subtitle: `「${listening.title}」情景对话理解`, featured: true, content: fullContent },
      { type: 'speaking', title: `${level.name} · 口语跟读`, subtitle: `「${speaking.prompt}」跟读训练`, featured: true, content: fullContent },
    ];

    const lessonIds = [];
    lessonDefs.forEach((def, i) => {
      const id = `${courseId}-l${i + 1}`;
      lessonIds.push(id);
      LESSONS.push({ id, courseId, languageId: lang.id, levelId: level.id, type: def.type, title: def.title, subtitle: def.subtitle, featured: true, content: def.content, order: i + 1 });
    });

    COURSES.push({
      id: courseId,
      languageId: lang.id,
      levelId: level.id,
      title: `${lang.name} · ${level.name}`,
      tagline: `${level.tag}：${level.desc}`,
      lessons: lessonIds,
      totalXp: 120,
    });
  });
});

/* ---------- 社区帖子 ---------- */
export const SEED_POSTS = [
  {
    id: 'p1', authorId: 'seed-1', authorName: '小鹿在冲浪', avatar: '🦌', time: '2小时前',
    text: '🇬🇧 分享一个英语听力入门心得：不要追求每个词都听懂！先抓住"信号词"（but / because / actually），再补全画面感。坚持两周，泛听感觉会完全不同～',
    likes: 42, comments: [
      { id: 'c1', authorId: 'seed-2', authorName: '阿泽', avatar: '🧑‍💻', time: '1小时前', text: '信号词这个方法真的很管用，我练了一周就能听懂 VOA 慢速了！' },
    ],
  },
  {
    id: 'p2', authorId: 'seed-2', authorName: '阿泽', avatar: '🧑‍💻', time: '5小时前',
    text: '背单词效率低？试试「间隔重复 + 语境记忆」：第一天学，第三天复习，第七天再用例句造句。语流平台的闪卡模式就带例句，复习时遮住释义自己先回忆，效果翻倍。',
    likes: 28, comments: [],
  },
  {
    id: 'p3', authorId: 'seed-3', authorName: '樱井のN1', avatar: '🌸', time: '昨天',
    text: '📕 日语 N1 备考倒计时 90 天！每日计划：\n・早上：30分钟 N1 词汇 + 例句跟读\n・中午：1 篇真题听力精听\n・晚上：语法题 20 道 + 复盘错题\n想找一起打卡的伙伴，互相监督～',
    likes: 56, comments: [
      { id: 'c2', authorId: 'seed-4', authorName: '芋泥啵啵', avatar: '🍠', time: '昨天', text: '我可以！求组队，我目标是 12 月 N2。' },
      { id: 'c3', authorId: 'seed-5', authorName: '北野', avatar: '🍵', time: '昨天', text: '听力精听用哪里的材料？求推荐。' },
    ],
  },
  {
    id: 'p4', authorId: 'seed-4', authorName: '芋泥啵啵', avatar: '🍠', time: '昨天',
    text: '🇰🇷 韩语零基础三个月，能听懂爱豆综艺里的日常对话啦！秘诀就是「影子跟读」：跟着原声模仿语气和停顿，不要只看字幕。语流的口语跟读模块录完音自己回放对比，进步看得见。',
    likes: 35, comments: [],
  },
  {
    id: 'p5', authorId: 'seed-6', authorName: 'Mia要上岸', avatar: '🌊', time: '2天前',
    text: '口语总是卡壳怎么办？我的方法是「10秒即兴」：随机抽一个话题，用英语说 10 秒不停。从「I think...」开始，逼自己输出。练到第 30 天，明显感觉大脑里的"语言开关"被打开了。',
    likes: 61, comments: [
      { id: 'c4', authorId: 'seed-1', authorName: '小鹿在冲浪', avatar: '🦌', time: '1天前', text: '这个方法我也在用，搭配平台的口语评分反馈更佳！' },
    ],
  },
  {
    id: 'p6', authorId: 'seed-5', authorName: '北野', avatar: '🍵', time: '3天前',
    text: '🍵 日语敬语避坑：商务邮件里「ご連絡ください」vs「ご連絡いただけますか」，前者是命令式请求，后者更委婉礼貌。面试和客户沟通多用后者，好感度 +100。',
    likes: 47, comments: [],
  },
  {
    id: 'p7', authorId: 'seed-7', authorName: '简言', avatar: '📖', time: '3天前',
    text: '文学翻译方向的同学：推荐「对照阅读法」——同一段落先读原文，再读名家译文，最后自己译一遍对比。重点看处理文化意象时的取舍。翻译是艺术，也是反复打磨的手艺。',
    likes: 33, comments: [
      { id: 'c5', authorId: 'seed-3', authorName: '樱井のN1', avatar: '🌸', time: '2天前', text: '受教了！收藏。' },
    ],
  },
  {
    id: 'p8', authorId: 'seed-8', authorName: 'Kim 小迷妹', avatar: '🎤', time: '4天前',
    text: '🇰🇷 有没有人一起刷韩语语法？「-아지다」被动用法总是记混……求推荐好记的口诀！',
    likes: 12, comments: [
      { id: 'c6', authorId: 'seed-2', authorName: '阿泽', avatar: '🧑‍💻', time: '3天前', text: '记成「被 x 得 xxx」：문이 닫혀 있어요 = 门被关着。多造句就顺了。' },
    ],
  },
];

/* ---------- 成就徽章 ---------- */
export const BADGES = [
  { id: 'first-lesson', name: '初次启程', icon: '🚀', desc: '完成第 1 个课时', check: (s) => s.lessons >= 1 },
  { id: 'streak-3', name: '持之以恒', icon: '🔥', desc: '连续学习 3 天', check: (s) => s.streak >= 3 },
  { id: 'words-50', name: '词汇达人', icon: '📦', desc: '累计学习 50 个单词', check: (s) => s.words >= 50 },
  { id: 'grammar-10', name: '语法大师', icon: '🧩', desc: '完成 10 次语法练习', check: (s) => s.grammar >= 10 },
  { id: 'listening-5', name: '听力之星', icon: '🎧', desc: '完成 5 次听力训练', check: (s) => s.listening >= 5 },
  { id: 'speaking-5', name: '口语先锋', icon: '🎙️', desc: '完成 5 次口语跟读', check: (s) => s.speaking >= 5 },
  { id: 'xp-1000', name: '学海无涯', icon: '🏔️', desc: '累计获得 1000 XP', check: (s) => s.xp >= 1000 },
  { id: 'lessons-10', name: '学霸之路', icon: '📚', desc: '完成 10 个课时', check: (s) => s.lessons >= 10 },
  { id: 'post-1', name: '社群之星', icon: '💬', desc: '在社区发布第 1 条内容', check: (s) => s.posts >= 1 },
];

/* ---------- 工具函数 ---------- */
export const getLang = (id) => LANGUAGES.find((l) => l.id === id);
export const getLevel = (id) => LEVELS.find((l) => l.id === id);
export const getPersona = (id) => PERSONAS.find((p) => p.id === id);
export const getCourse = (id) => COURSES.find((c) => c.id === id);
export const getLesson = (id) => LESSONS.find((l) => l.id === id);
export const getLessonsOfCourse = (courseId) => LESSONS.filter((l) => l.courseId === courseId).sort((a, b) => a.order - b.order);
export const getModule = (id) => MODULES.find((m) => m.id === id);
export const getCourseProgressPct = (courseId, completed) => {
  const lessons = getLessonsOfCourse(courseId);
  if (!lessons.length) return 0;
  const done = lessons.filter((l) => completed.includes(l.id)).length;
  return Math.round((done / lessons.length) * 100);
};
export const getLevelNameByXp = (xp) => {
  let current = LEVELS[0];
  for (const lv of LEVELS) if (xp >= lv.xp) current = lv;
  return current;
};

/* ---------- 个性化学习路径推荐 ---------- */
const PERSONA_LEVEL_BIAS = {
  abroad: ['senior', 'advanced', 'junior'],
  career: ['junior', 'senior', 'advanced'],
  translation: ['senior', 'advanced', 'junior'],
  travel: ['starter', 'elementary', 'junior'],
  exam: ['junior', 'senior', 'elementary'],
  interest: ['starter', 'elementary', 'junior'],
};

export function recommendCourses(user) {
  if (!user) return [];
  const bias = PERSONA_LEVEL_BIAS[user.personaId] || ['starter', 'elementary', 'junior'];
  const startIdx = bias.indexOf(user.levelId) === -1 ? 0 : bias.indexOf(user.levelId);
  const ordered = [...bias.slice(startIdx), ...bias.slice(0, startIdx)];
  const langCourses = COURSES.filter((c) => c.languageId === user.langId);
  const byLevel = (id) => langCourses.find((c) => c.levelId === id);
  const list = ordered.map((lv) => byLevel(lv)).filter(Boolean);
  return list;
}

export const PERSONA_MOTTO = {
  abroad: '为你的留学之路，铺好语言的阶梯',
  career: '让每一次商务沟通，都从容自信',
  translation: '在两种语言之间，找到最动人的落点',
  travel: '背上行囊之前，先学会一句"你好"',
  exam: '科学备考，让每一分努力都算数',
  interest: '从热爱开始，让学习变成享受',
};

export function defaultProgress() {
  return {
    completed: [],
    xp: 0,
    streak: 0,
    lastStudyDate: null,
    stats: { words: 0, grammar: 0, listening: 0, speaking: 0, lessons: 0, posts: 0 },
    badges: [],
    week: { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 },
    likedPosts: [],
    studyMins: 0,
  };
}
