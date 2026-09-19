import type { Language } from "@/components/LanguageProvider";

const ui = {
  home: { en: "Home", zh: "首页" },
  projects: { en: "Projects", zh: "项目" },
  playground: { en: "Playground", zh: "探索" },
  thoughts: { en: "Thoughts", zh: "随想" },
  about: { en: "About", zh: "简介" },
  toggleNavigation: { en: "Toggle navigation", zh: "展开或收起导航" },
  seasonalSpecials: { en: "Seasonal Specials", zh: "本季精选" },
  seeMoreWorks: { en: "See more works →", zh: "查看更多作品 →" },
  contact: { en: "Contact", zh: "联系我" },
  filters: { en: "Filters", zh: "筛选" },
  all: { en: "All", zh: "全部" },
  selectFilter: { en: "Select a filter", zh: "选择筛选条件" },
  projectFilters: { en: "Project filters", zh: "项目筛选" },
  noMatchingWorks: { en: "No works match the selected tag yet.", zh: "暂时没有符合该标签的作品。" },
  works: { en: "works", zh: "件作品" },
  year: { en: "Year", zh: "年份" },
  upcoming: { en: "Upcoming", zh: "即将发布" },
  viewProject: { en: "View project ↗", zh: "查看项目 ↗" },
  backToProjects: { en: "Back to Projects", zh: "返回项目列表" },
  role: { en: "Role", zh: "角色" },
  techStack: { en: "Tech Stack", zh: "技术栈" },
  tools: { en: "Tools", zh: "工具" },
  tags: { en: "Tags", zh: "标签" },
  related: { en: "Related", zh: "相关链接" },
  openLink: { en: "Open Link", zh: "打开链接" },
  viewProcess: { en: "View Process", zh: "查看过程" },
  backToImages: { en: "Back to Images", zh: "返回图片" },
  mediaComingSoon: { en: "Media coming soon.", zh: "媒体内容即将上线。" },
  processDevelopment: { en: "Process & Development", zh: "过程与开发" },
  inspirations: { en: "Inspirations", zh: "灵感" },
  development: { en: "Development", zh: "开发" },
  testingRefinement: { en: "Testing & Refinement", zh: "测试与完善" },
  stillHungry: { en: "Still hungry? Dessert is served in the", zh: "还想看更多？甜点在" },
  writing: { en: "Writing", zh: "写作" },
  project: { en: "Project", zh: "项目" },
  date: { en: "Date", zh: "日期" },
} as const;

export type UiKey = keyof typeof ui;
export const t = (key: UiKey, language: Language) => ui[key][language];

export const tagZh: Record<string, string> = {
  "Visual Identity": "视觉识别",
  "Web Development": "网站开发",
  "3D Modeling": "3D 建模",
  "Physical Computing": "实体交互",
  "Creative Coding": "创意编程",
  "Web Design": "网页设计",
  "UX Design": "用户体验设计",
  "Game Design": "游戏设计",
  "Data Visualization": "数据可视化",
  Illustration: "插画",
  Sculpture: "雕塑",
  Jewelry: "首饰",
  Painting: "绘画",
};

type ProjectTranslation = { title?: string; intro?: string; subtitle?: string; role?: string; description?: string };

export const projectZh: Record<string, ProjectTranslation> = {
  "zq-sports": { intro: "为众祺匹克球俱乐部设计视觉识别与网站，将球场上的品牌形象延伸到线上。", subtitle: "视觉识别、网站设计与搭建", role: "视觉识别、网站设计与开发" },
  lifemart: { title: "LifeMart™［进行中］", intro: "一项重新思考日常消费与生活方式的体验设计。" },
  "i-want-home-i-could-carry-with": { title: "一座我能随身携带的家", intro: "探索归属感、记忆与可携带空间的设计研究。" },
  divedex: { intro: "一款潜水后的探索伙伴概念，帮助休闲潜水员从照片和视频中探索海洋生物、比较可能的识别结果，并将发现保存到个人收藏。" },
  labyrinth: { intro: "一款发生在黑暗迷宫中的双人非对称捉迷藏游戏：一人是试图逃离的生者，另一人是依靠声音追猎的幽灵。" },
  "chester-choiceworth": { intro: "一件把消费习惯转化为体验的互动装置：上传个人交易记录后，系统会打印为你量身定制的生活方式广告。" },
  spinphony: { intro: "一款俏皮的 Unity 平台游戏：迷路的音符 Do 使用自制唱盘控制器和街机按钮，旋转穿过节奏谜题。" },
  marbility: { intro: "一项以弹珠与运动来可视化量子计算逻辑的实验性物理玩法。" },
  "/works/Moth_Scene_Render.html": { title: "飞蛾场景渲染", intro: "使用 Maya 制作的飞蛾渲染。", description: "仍然是我建模并制作动画的飞蛾，这次使用 Maya 的 Arnold 渲染，以呈现材质和灯光。" },
  "/works/Moth_Animation.html": { title: "飞蛾", intro: "使用 Maya 制作的飞蛾动画。", description: "一段使用 Maya 制作的飞蛾动画；角色设计、建模、绑定与动画均由我独立完成。" },
  "/works/Apple_Universe.html": { title: "苹果宇宙", intro: "使用 Maya 构建的复古未来主义世界。", description: "这段 Maya 动画把一个苹果里的“瞬息全宇宙”具象化。形态、材质与视角不断变换，苹果成为自身的宇宙，在微观与宇宙尺度之间穿梭。完整体验建议打开声音观看。" },
  "/works/Sailor_Moon.html": { title: "美少女战士!!!", intro: "一段简单的 Maya 动画。", description: "一段使用 Maya 完成的简单动画练习。" },
  "/works/Orbit.html": { intro: "使用 Maya 构建的复古未来主义餐厅。", description: "Orbit 是一间受到 1950 年代美国餐厅和世纪中期现代主义启发的复古未来主义餐厅。家具设计体现了我对太空时代风格的兴趣，也是我对理想居所的一种想象。" },
  "/works/SwallowArcBracelet.html": { title: "燕弧手镯", intro: "一只手镯。", description: "灵感来自燕子飞行时迅捷而流畅的动作，使用 Rhino 制作。" },
  "/works/Aster.html": { title: "Aster 珐琅戒指", intro: "一枚珐琅戒指。", description: "灵感来自星星和鸟的形态，使用 Rhino 制作。" },
  "/works/Ripple.html": { intro: "我制作的一条可爱项链。", description: "我制作的一条可爱项链。" },
  "/works/Dragonfly.html": { title: "蜻蜓", intro: "我制作的一只可爱蜻蜓。", description: "我制作的一只可爱蜻蜓。" },
  "/works/Carry_me.html": { title: "带我走", intro: "我制作的一条可爱项链。", description: "我制作的一条可爱项链。" },
  "/works/python_playground.html": { title: "Python 实验场", intro: "“不是你选择生活方式，而是数据替你选择。”", description: "我在学习 Python 时完成的一组小项目，包括终端滚动字符画、Kirby 游戏、简单网页爬虫和星露谷农场规划器。" },
  "/works/funguide.html": { intro: "一款利用 AI 从图片识别蘑菇品种并生成独特食谱的网页应用，使用 Gemini API 与 React 构建。", description: "Funguide 是一个蘑菇识别与食谱生成器。上传蘑菇照片后，系统会识别品种、提供基本信息，并生成一道使用这种蘑菇的食谱。目前因为 API 密钥问题暂时无法运行，但可以查看代码与演示链接。" },
  "/works/DescentAscent.html": { title: "下潜｜上升", intro: "一本探索潜水员无声手势语言的互动小志。", description: "这本 zine 以轻松的方式探索潜水员无声而湿漉漉的语言。它沿着下潜到上升的旅程展开，记录语言在水下消失后，手势如何成为交流方式；既是观察，也是误读，更是向“听不见时用手说话”致敬。" },
  "/works/Mountain_Spirit.html": { title: "山鬼", intro: "一件关于神祇、意义与集体想象的互动装置。", description: "《山鬼》是一件受中国神话人物山鬼与《耶利米书》10:3–5 启发的互动装置。作品思考社会如何通过共同的想象、信念与重复创造神祇，也创造意义本身。" },
  "/works/apple.html": { title: "一个苹果", intro: "我们能从多少种角度看一只苹果？", description: "对我来说，苹果普通到常常不想吃，但妈妈总劝我吃，还不断强调它有多健康。因此我想了解世界各地的人如何看待这种平凡的水果，并在最后加入了我自己更私人的苹果视角。" },
  "/works/what_to_cook_today.html": { title: "今天吃什么？", intro: "一本给孩子的简单食谱。", description: "一本为孩子设计的简单食谱，让他们选择食材并组合自己的餐点。" },
  "/works/what-to-drink-today.html": { title: "今天喝什么？", intro: "通过数字化中国占卜决定喝什么。", description: "网站使用抽签与求签两种数字化中国占卜方式帮助用户决定喝什么。用户完成互动后，会从鸡尾酒 API 获得一款饮品建议。" },
  "/works/marriage_premium.html": { title: "婚姻溢价", intro: "通过游戏与机械运动呈现性别不平等的实体交互作品。", description: "一款基于我父母故事的 p5.js 游戏。玩家为一对面对“婚姻溢价”的伴侣选择人生路径，连接 Arduino 的舵机天平会倾斜并揭示不平等结果：即使拥有选择，个人努力也无法抹去结构性不平等。" },
  "/works/autobiographical_game.html": { title: "自传游戏", intro: "一款探索自我认知与选择的 p5.js 自传游戏。", description: "这款 p5.js 游戏来自我与多年前离世的小狗小五的记忆。童年的我想象自己是女巫，小五是我的使魔。游戏使用 p5.play 创建场景和互动，玩家可以探索环境并体验故事。我很想念小五。" },
  "/works/heartbeat_fireworks.html": { title: "心跳烟花", intro: "一件由心跳触发灯光的 PCB 蚀刻作品。", description: "使用脉搏传感器检测心跳并触发灯光的 PCB 蚀刻项目。" },
  "/works/misty_mountains.html": { title: "雾山", intro: "一段响应传感器输入的 p5.js 动画。", description: "一段会根据弯曲传感器变化的响应式 p5.js 动画。" },
  "/works/day_and_night.html": { title: "昼与夜", intro: "一段响应鼠标与光线的 p5.js 动画。", description: "一段根据鼠标位置及光敏电阻检测到的光线变化而改变的响应式 p5.js 动画。" },
  "/works/data_portrait.html": { title: "数据肖像", intro: "数据可视化。", description: "一项记录我无意识打开手机频率的 p5.js 数据可视化。僵硬而重复的点击动作，成为数字依赖中无意识习惯的视觉隐喻。" },
  "/works/experimental_camera.html": { title: "实验相机", intro: "数据可视化。", description: "一件点击时不断变化的 p5.js 人脸拼贴。作品使用摄像头捕捉面部，并通过人脸关键点机器学习模型，根据面部位置生成拼贴。" },
  "/works/experimental_clock.html": { title: "实验时钟", intro: "数据可视化。", description: "这件作品用涟漪数量表示小时，用每圈涟漪的圆环数量表示分钟；中心的点表示个位数。按住并移动鼠标，还可以让时间快进或倒退。" },
  "/works/Land.html": { title: "陆地", intro: "一款探索观察与想象边界的 p5.js 游戏。", description: "《陆地》探索观察与想象之间的边界。原本用于记录现实的相机，在这里成为容纳想象生物的画布。" },
  "/works/Portart_of_Pierre.html": { title: "Pierre 的肖像", intro: "一幅关于 Pierre 的肖像。", description: "Pierre 的肖像。" },
  "/works/ophelia.html": { title: "奥菲莉娅", intro: "一件以石膏翻模捕捉漂浮身体轻盈感的雕塑。", description: "这件石膏翻模雕塑尝试捕捉漂浮人体的空灵感。由于全身翻模困难，我选择面部与手部进行组合，灵感来自游泳者与奥菲莉娅的绘画形象。作品在石膏坚实、可触的质感与失重感之间制造张力。" },
  "/works/Mist.html": { title: "雾", intro: "一只香座。", description: "一只黑色、禅意的香座，以雾状轮廓和柔和圆形构成。" },
  "/works/Bone_Clock.html": { title: "骨钟", intro: "一件可穿戴雕塑。", description: "这件可穿戴雕塑把我对时间的焦虑变成身体体验。激光切割部件组成背部机械脊柱，随着时钟机构运动而逐渐绷紧，让时间无形的重量变得可见，也能被身体感受。" },
  "/works/maternity.html": { title: "母性", intro: "探索母亲身份的水彩绘画。", description: "这组绘画受到我母亲的启发。高中时期，她同时努力承担母亲、妻子与女儿的角色；外公受到抑郁症困扰，外婆身体欠佳，而我也正处于大学申请阶段。作品记录她安静的韧性，以及家庭责任的重量。" },
  "/works/environmental_friendly.html": { title: "“环保”", intro: "一幅关于消费化环保概念的水彩作品。", description: "作品源于“环保”如何成为一种可消费概念的思考。它看似被小心托在手中，实际上却被放在盘子上，等待被消费。" },
};

const caseStudyTextZh: Record<string, string> = {
  "ZQ Sports is a visual identity and website project for Zhongqi Pickleball Club. I designed the club’s visual identity and website, then built the site to bring its match coverage, learning content, equipment, and club merchandise into one experience.": "ZQ Sports 是为众祺匹克球俱乐部完成的视觉识别与网站项目。我负责品牌视觉、网站设计与搭建，将赛事、知识、装备与俱乐部周边组织成统一的线上体验。",
  "The identity pairs a circular club emblem with bold, textured lettering. Black, light grey, and yellow-green versions give the mark distinct expressions while keeping the same silhouette and typographic arrangement. The website carries this contrast into its large headings, fine rules, and bright accents.": "视觉识别以圆形俱乐部徽标搭配粗重、带有磨损质感的字母。黑色、浅灰与黄绿色三个版本保留相同的轮廓和文字结构，呈现不同的色彩表达。网站将这种对比延续到大标题、细线分隔与亮色强调中。",
  "“Find Your Pace” introduces the site through oversized typography and an abstract court graphic. The page moves from global competitions to pickleball knowledge, paddle selection, and club merchandise. Alternating light, dark, and yellow-green sections give each part a clear place in the reading sequence.": "网站以 “Find Your Pace” 开场，通过大字排版与抽象球场图形建立第一印象。页面依次展开全球赛事、匹克球知识、球拍选择和俱乐部周边，以浅色、深色和黄绿色区块区分内容，形成清晰的阅读顺序。",
  "The opening composition sets the pace with a split layout and court-inspired geometry. In the learning section, an editorial grid turns rules, technique, and terminology into individual articles that visitors can explore at their own pace.": "首屏以左右分栏和球场几何图形建立节奏。知识区采用文章式网格，将规则、技术和术语拆分为独立内容，方便访客按自己的节奏阅读。",
  "I built the site with HTML, CSS, and JavaScript, using GSAP for entrance motion, the animated ball, and desktop scroll transitions. The implementation includes a collapsible mobile navigation, separate learning articles, and reduced-motion support. Club membership, paddle purchasing, and merchandise are presented as upcoming features; competition information is marked for confirmation rather than shown as a live results feed.": "网站使用 HTML、CSS 与 JavaScript 搭建，通过 GSAP 实现入场动效、球体运动和桌面端滚动过渡。实现包含可折叠的移动端导航、独立知识文章与减少动态效果的适配。俱乐部加入、球拍购买和周边入口标明尚未开放，赛事信息标记为待确认，并非实时赛况。",
  "Visual Identity": "视觉识别",
  "Website Design": "网站设计",
  "Website Details": "网站细节",
  "Website Development": "网站搭建",
  "User Research": "用户研究",
  "Earlier Exploration": "早期探索",
  "Earlier Phone App UI Design": "早期手机应用界面设计",
  "Earlier Prototype: Planned Next Steps": "早期原型：当时规划的下一步",
  "DiveDex explores how underwater photos and videos can become a starting point for learning and remembering after a dive. The revised concept helps recreational divers import their media, compare candidate species, learn distinguishing features, and save discoveries to My Ocean, a personal collection. The focus is on helping divers make sense of what they encountered and take part in the identification, rather than simply receiving a species name.": "DiveDex 探索如何让水下照片和视频成为潜水后学习与记录的起点。新版概念帮助休闲潜水员导入影像、比较候选物种、学习辨识特征，并将发现保存到个人收藏 My Ocean。重点在于帮助潜水员理解自己的水下相遇并参与识别判断，而不只是得到一个物种名称。",
  "The project began with an exploration of smart goggles for real-time marine recognition and a companion phone app. The revised direction above focuses on the post-dive experience. The designs and prototypes below document the earlier concept, developed in Oct–Dec 2024 using Figma, Rhino, Google Coral Dev Board, TensorFlow.js, and Arduino.": "项目最初探索的是实时识别海洋生物的智能潜水镜，以及配套手机应用。上方的新版方向聚焦潜水后的体验。以下设计与原型记录了早期方案，于 2024 年 10–12 月使用 Figma、Rhino、Google Coral Dev Board、TensorFlow.js 和 Arduino 开发。",
  "These screens belong to the original goggles-connected app concept. They are retained here as part of the earlier exploration, rather than as interfaces for the revised post-dive direction.": "这些界面属于最初连接智能潜水镜的应用概念，作为早期探索过程保留在此，并非新版潜后体验的界面。",
  "Project Overview": "项目概览",
  "LifeMart Research": "LifeMart 研究",
  "LifeMart Tech Stack": "LifeMart 技术栈",
  "LifeMart Userflow": "LifeMart 用户流程",
  "Setup Design and Renderings": "装置设计与渲染",
  "1st Website Prototype Demo": "第一版网站原型演示",
  "1st Userflow Prototype Demo": "第一版用户流程演示",
  "Related Writing": "相关文章",
  "Final Outcome": "最终成果",
  "Smart Goggles Design": "智能潜水镜设计",
  "Smart Goggles Model": "智能潜水镜模型",
  "Phone App UI Design": "手机应用界面设计",
  "UI Design of the Phone App": "手机应用界面设计",
  "Tech Prototype setup": "技术原型搭建",
  "Future Iteration": "未来迭代",
  "Prototypes & Process": "原型与过程",
  "Video Demo": "视频演示",
  "What is Chester Choiceworth?": "什么是 Chester Choiceworth？",
  "Next Iteration": "下一步迭代",
  "Process": "过程",
  "Concept": "概念",
  "How to Play": "玩法说明",
  "Development Process": "开发过程",
  "LifeMart is an interactive system that examines how living beings become measurable inside market, biological, and emotional frameworks. Using a barcode scanner, a physical slider, and dynamic pricing algorithms, the project simulates the full journey of a life entering a retail logic: from pet, to species unit, to commodity, and—rarely—to an unquantifiable existence that resists valuation. Each scan generates a price label, breaking down how emotional value, ecological data, farming cost, labor, transport, and market forces shape the “worth” of a single creature. By pushing users to slide between layers of killability and care, LifeMart exposes the absurdity and violence of converting living beings into products, inviting viewers to reconsider what it means for a life to have value at all.": "LifeMart 是一套互动系统，研究生命如何在市场、生物与情感框架中变成可衡量的对象。作品使用条码扫描器、实体滑杆与动态定价算法，模拟生命进入零售逻辑的完整旅程：从宠物到物种单位，再到商品，偶尔也会成为拒绝被估价、无法量化的存在。每次扫描都会生成价格标签，拆解情感价值、生态数据、养殖成本、劳动力、运输与市场力量如何塑造一只生物的“价值”。用户在可被杀害与被关怀的不同层次之间滑动，从而直面把生命转化为商品的荒谬与暴力，并重新思考生命拥有价值究竟意味着什么。",
  "I Want a Home I Could Carry With is a portable, personal “house” that exists not as architecture, but through my sense of possession. Inspired by my habit of treating my 23-kg luggage as a movable home, this project explores what “home” becomes when stability is impossible or constantly shifting. Through a compact, wearable form, it stores fragments of my routines, comforts, and identity, challenging the idea that home must be rooted in a place. Instead, it becomes something I assemble, carry, and rebuild wherever I go.": "《一座我能随身携带的家》是一栋便携而私人的“房子”。它并非以建筑形式存在，而是由我的占有感构成。作品源于我把 23 公斤行李箱当作移动居所的习惯，探索当稳定不可能存在或不断变化时，“家”会变成什么。紧凑、可穿戴的形态保存了日常习惯、安慰与身份的碎片，挑战家必须扎根于某个地点的观念；家成为我无论走到哪里都能重新组装、携带与建造的东西。",
  " This project combines smart diving goggles that run on-device, real-time fish recognition with a mobile app that syncs the detections after the dive. When a diver encounters a fish, the goggles highlight it and classify the species; once back on the surface, the recorded detections automatically transfer to the app, where they are organized by dive session and turned into a searchable personal log of underwater encounters.": "本项目结合可在设备端运行的智能潜水镜、实时鱼类识别，以及潜水结束后同步识别记录的手机应用。潜水员遇见鱼类时，潜水镜会高亮目标并识别物种；回到水面后，记录会自动传输至应用，按潜水场次整理成可搜索的个人水下观察日志。",
  "Chester Choiceworth is an interactive installation that turns your spending habits into a playful but slightly uncomfortable mirror. By uploading your monthly transaction record, the system generates two things: (1) a digital receipt summarizing what you spent and where, and (2) a stream of targeted 'lifestyle suggestions' printed on a physical receipt printer. The tone is fake-friendly, like a personal financial assistant that thinks it knows who you are and what kind of life you deserve.": "Chester Choiceworth 是一件互动装置，把消费习惯变成一面有趣却略令人不适的镜子。上传每月交易记录后，系统会生成两样东西：一张总结消费内容与地点的数字收据，以及由实体小票打印机不断输出的定向“生活方式建议”。它使用一种虚假的友好语气，像是自认为了解你是谁、又认为你应该过怎样生活的私人理财助手。",
  "Spinphony turns a turntable into both controller and narrative device. Rotating the platter moves Do, a lost note, through rhythmic looping levels, while four buttons handle jump and walking. Hardware and software co-evolved—encoder prototypes shaped the physical feel, and Unity visuals and audio cues kept players in rhythm.": "Spinphony 把唱盘同时变成控制器与叙事装置。旋转唱盘会带领迷路的音符 Do 穿过循环的节奏关卡，四个按钮负责跳跃与行走。硬件与软件共同演化：编码器原型塑造实体操作手感，Unity 的视觉和声音提示则帮助玩家保持节奏。",
  "This interactive exhibit introduces the audience to quantum concepts of entanglement, gates, probability, and qubits through an interactive game.\n\nIn the game, you and your teammate each control a qubit and try to score the correct probability given to you. You interact with gates and learn about probability and entanglement. With the aesthetics of Pinball and Plinko–widely-known, nostalgic games that are easy to understand–we attract people of all ages and backgrounds.\n\nInspired by old arcade games such as Plinko and Pinball.": "这件互动展品通过游戏向观众介绍纠缠、量子门、概率与量子比特等概念。你和队友分别控制一个量子比特，并尝试达到系统给出的目标概率；在操作量子门的过程中理解概率与纠缠。作品采用弹珠台与 Plinko 的怀旧视觉语言，以熟悉且易懂的游戏形式吸引不同年龄与背景的观众。",
};

const localizeSections = (sections: unknown[]) => sections.map((section) => {
  if (!section || typeof section !== "object") return section;
  const item = section as Record<string, unknown>;
  const translated: Record<string, unknown> = { ...item };
  if (typeof item.title === "string") translated.title = caseStudyTextZh[item.title] ?? item.title;
  if (typeof item.body === "string") translated.body = caseStudyTextZh[item.body] ?? item.body;
  return translated;
});

export function localizeProject<T extends { id: string; title: string; intro?: string; subtitle?: string; tags?: string[]; meta?: { role?: string }; details?: { description?: string } }>(project: T, language: Language): T {
  if (language === "en") return project;
  const translated = projectZh[project.id] ?? {};
  const sections = (project as { sections?: unknown[] }).sections;
  return {
    ...project,
    title: translated.title ?? project.title,
    intro: translated.intro ?? project.intro,
    subtitle: translated.subtitle ?? translated.intro ?? project.subtitle,
    ...(project.meta && translated.role ? { meta: { ...project.meta, role: translated.role } } : {}),
    tags: project.tags?.map((tag) => tagZh[tag] ?? tag),
    details: project.details
      ? { ...project.details, description: translated.description ?? project.details.description }
      : project.details,
    ...(sections ? { sections: localizeSections(sections) } : {}),
  } as T;
}
