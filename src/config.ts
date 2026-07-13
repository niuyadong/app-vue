export interface SiteConfig {
  language: string
  siteTitle: string
  siteDescription: string
}

export interface NavLink {
  label: string
  targetId: string
}

export interface NavigationConfig {
  brandMark: string
  brandLogo?: string
  links: NavLink[]
}

export interface HeroConfig {
  wordmarkText: string
  wordmarkLogo?: string
  eyebrow: string
  titleLine1: string
  titleLine2: string
  descriptionLine1: string
  descriptionLine2: string
  ctaText: string
  ctaTargetId: string
}

export interface AboutStep {
  phase: string
  items: string[]
}

export interface AboutConfig {
  sectionLabel: string
  title: string
  intro: string
  keywords: string[]
  steps: AboutStep[]
}

export interface ServiceCategory {
  title: string
  items: string[]
}

export interface ServicesConfig {
  sectionLabel: string
  title: string
  categories: ServiceCategory[]
}

export interface ProjectMeta {
  label: string
  value: string
}

export interface ProjectData {
  id: string
  title: string
  location: string
  year: string
  image: string
  images: string[]
  subtitle: string
  meta: ProjectMeta[]
  paragraphs: string[]
}

export interface GalleryConfig {
  sectionLabel: string
  title: string
  projects: ProjectData[]
}

export interface FooterEntry {
  text: string
  href?: string
}

export interface FooterColumn {
  heading: string
  entries: FooterEntry[]
}

export interface FooterConfig {
  visionText: string
  brandName: string
  columns: FooterColumn[]
  copyright: string
  videoPath: string
  qrImage?: string
}

export interface ProjectDetailConfig {
  backLabel: string
}

export interface ContactConfig {
  address: string
  phone: string
  email: string
}

export interface MediumItem {
  cn: string
  en: string
  description: string
}

export interface MediumsConfig {
  sectionLabel: string
  items: MediumItem[]
}

export interface PhilosophyConfig {
  eyebrow: string
  title: string
  body: string
  rollingWords: string[]
}

export const siteConfig: SiteConfig = {
  language: 'zh-CN',
  siteTitle: '至禾装饰 — 全案设计与施工落地',
  siteDescription: '至禾装饰一体化工作室提供原创空间设计、施工现场管控、全屋软装配套及竣工售后维保的一站式全链条服务。一人统筹全流程，设计效果图 1:1 实景落地。',
}

export const navigationConfig: NavigationConfig = {
  brandMark: '至禾',
  brandLogo: '/images/topLeftLogo.png',
  links: [
    { label: '首页', targetId: 'hero-section' },
    { label: '案例', targetId: 'gallery' },
    { label: '联系', targetId: 'footer' },
    { label: '服务', targetId: 'services' },
    { label: '关于我们', targetId: 'about' },
  ],
}

export const heroConfig: HeroConfig = {
  wordmarkText: '至禾装饰',
  wordmarkLogo: '/images/centerLogo.png',
  eyebrow: 'KISSH HOME DESIGN',
  titleLine1: '一人统筹',
  titleLine2: '全案落地',
  descriptionLine1: '从实地量房、方案规划、图纸深化、主材甄选，',
  descriptionLine2: '到工地巡检、软装搭配、竣工售后，全程一对一跟进把控。',
  ctaText: '查看案例',
  ctaTargetId: 'gallery',
}

export const aboutConfig: AboutConfig = {
  sectionLabel: 'ABOUT US / 关于我们',
  title: '独立运营，一人统筹全流程',
  intro: '至禾装饰一体化工作室坚持独立运营、无中间转包。从前期设计到施工落地再到售后维保，每个环节由负责人一对一全程跟进，确保设计效果图 1:1 实景还原。',
  keywords: ['独立运营', '一人统筹', '无中间转包', '1:1 实景落地'],
  steps: [
    {
      phase: '前期设计',
      items: [
        '免费上门量房',
        '需求梳理与平面布局规划',
        '原创全套方案（效果图/施工图）',
        '一对一主材陪同选购',
        '清单式明码报价',
      ],
    },
    {
      phase: '施工现场管控',
      items: [
        '开工现场交底',
        '定期工地巡检（水电/防水/墙面/吊顶/竣工）',
        '问题现场协调整改',
        '工艺与材料规格全程把控',
      ],
    },
    {
      phase: '软装配套',
      items: [
        '整体搭配设计（家具/窗帘/灯具/摆件）',
        '尺寸色彩统一协调',
        '现场摆放调整',
        '完工保洁交付',
      ],
    },
    {
      phase: '售后保障',
      items: [
        '完工整体验收',
        '基础工程及水电隐蔽工程长效质保',
        '后期维修/改造/翻新一人快速响应',
      ],
    },
  ],
}

export const servicesConfig: ServicesConfig = {
  sectionLabel: 'SERVICES / 服务体系',
  title: '五大经营类目',
  categories: [
    {
      title: '空间设计类',
      items: [
        '全屋家装',
        '商铺门店',
        '小型办公',
        '旧房改造',
        '别墅私宅全案',
        '软装搭配',
        '平面布局',
        '效果图/施工图深化',
        '户型优化收纳设计',
      ],
    },
    {
      title: '装饰施工类',
      items: [
        '住宅室内整装',
        '商铺工装基础装修',
        '水电改造',
        '防水工程',
        '墙地面铺装',
        '吊顶造型',
        '门窗安装',
        '局部翻新',
        '拆除改造',
        '工地全程监理验收',
      ],
    },
    {
      title: '软装配套一体化',
      items: [
        '全屋家具搭配',
        '窗帘灯具定制',
        '装饰摆件配色',
        '全屋软装落地陈设',
        '成品家具上门安装',
      ],
    },
    {
      title: '配套增值服务',
      items: [
        '免费上门量房',
        '预算方案规划',
        '主材陪同选购',
        '完工保洁',
        '竣工售后维修',
        '局部修补翻新',
        '空间改造咨询',
      ],
    },
    {
      title: '材料销售配套',
      items: [
        '瓷砖',
        '地板',
        '木门',
        '橱柜',
        '卫浴',
        '涂料',
        '五金',
        '灯具',
      ],
    },
  ],
}

export const galleryConfig: GalleryConfig = {
  sectionLabel: 'FEATURED WORKS / 精选案例',
  title: '实景作品集',
  projects: [
    {
      id: '001',
      title: '青禾校园',
      location: '青海·格尔木',
      year: '2022',
      image: 'images/qinghe-campus-01.jpg',
      images: [
        'images/qinghe-campus-01.jpg',
        'images/qinghe-campus-02.png',
        'images/qinghe-campus-03.png',
      ],
      subtitle: '以唐诗国学文化为主线的现代化公共阅读空间',
      meta: [
        { label: '类型', value: '公建学校' },
        { label: '面积', value: '316㎡' },
        { label: '周期', value: '3个月' },
        { label: '主材', value: '多层实木生态木 / 防水耐磨科技布 / 黑色哑光金属' },
      ],
      paragraphs: [
        '青禾校园位于青海格尔木，是一座以唐诗国学文化为主线的公共阅读空间。项目将现代简约与东方美学相融合，在有限面积内划分出深度阅览区与轻休憩区，为学生与读者营造安静、沉浸的学习氛围。',
        '材质上选用多层实木生态木构建温暖基调，防水耐磨科技布满足高频使用的耐久需求，黑色哑光金属作为细节收边，增添克制而现代的秩序感。',
        '空间动线围绕“静读—小憩—交流”三种行为展开，通过书架隔断与顶面光带的引导，形成层层递进的阅读节奏。落地窗外引入自然光线，让室内在不同时间呈现出温润的光影变化。',
        '从方案设计到施工落地，负责人全程跟进每个环节，确保图纸细节、材料规格与现场工艺一致，最终实现设计效果的 1:1 还原。',
      ],
    },
    {
      id: '002',
      title: '书香私宅',
      location: '项城·如意湖',
      year: '2026',
      image: 'images/shuxiang-residence-01.jpg',
      images: [
        'images/shuxiang-residence-01.jpg',
        'images/shuxiang-residence-02.jpg',
        'images/shuxiang-residence-03.jpg',
      ],
      subtitle: '宋式美学新中式，极简线条与原木基底重构东方禅意',
      meta: [
        { label: '类型', value: '宋式私宅' },
        { label: '面积', value: '126㎡' },
        { label: '周期', value: '4个月' },
        { label: '主材', value: '木饰面 / 艺术漆 / 木纹砖' },
      ],
      paragraphs: [
        '书香私宅坐落于项城如意湖畔，是一套以宋式美学为精神内核的新中式住宅。设计以极简线条与原木基底重构东方禅意，通过大面积留白与无主灯系统，营造出高级质感与日常温馨并存的居住氛围。',
        '客厅茶台与沙发区形成核心生活场景，木饰面背景墙与艺术漆的细腻肌理相互映衬。阳台洗衣区被巧妙纳入整体动线，功能与审美达成统一。',
        '全屋采用木纹砖铺陈，既保留木材温润触感，又提升了空间的耐用性与易维护性。照明设计摒弃繁复吊灯，以隐藏灯带与点位射灯勾勒空间层次。',
        '项目负责人从量房到竣工全程一对一跟进，确保木饰面收口、艺术漆分色、灯光点位等细节按图纸精准落地。',
      ],
    },
    {
      id: '003',
      title: '胶片市井',
      location: '河南·项城',
      year: '2025',
      image: 'images/jiaopian-shijing-01.jpg',
      images: [
        'images/jiaopian-shijing-01.jpg',
        'images/jiaopian-shijing-02.jpg',
        'images/jiaopian-shijing-03.jpg',
      ],
      subtitle: '轻工业复古市井风，粗犷基底与复古撞色的商业空间',
      meta: [
        { label: '类型', value: '市井餐馆' },
        { label: '面积', value: '230㎡' },
        { label: '周期', value: '4个月' },
        { label: '主材', value: '水磨石 / 复古砖 / 微水泥' },
      ],
      paragraphs: [
        '胶片市井位于河南项城，是一处以轻工业复古市井风为定位的餐饮空间。设计保留裸露梁柱与微水泥构建的粗犷基底，通过复古墨绿墙裙撞色、开放式明厨档口与竹帘隔断，唤起市井烟火气与怀旧影像感。',
        '入口处借鉴录像厅风格的场景营造，用餐区以竹帘与书法灯柱划分功能分区，既保证用餐私密性，又形成丰富的视觉层次。',
        '材质选择兼顾商业空间的高频使用需求：水磨石地面耐磨易清洁，复古砖墙面经得起油烟与水汽，微水泥天花与梁柱保留原始肌理，降低维护成本的同时强化空间性格。',
        '施工阶段负责人全程驻场把控，从水电隐蔽工程到防水验收，再到软装陈设进场，确保商业空间按期、按质、按图交付。',
      ],
    },
    {
      id: '004',
      title: '意式私宅',
      location: '项城·如意湖',
      year: '2026',
      image: 'images/italian-residence-01.jpg',
      images: [
        'images/italian-residence-01.jpg',
        'images/italian-residence-02.jpg',
        'images/italian-residence-03.jpg',
      ],
      subtitle: '客餐厨一体化，低饱和中性色调的现代意式住宅',
      meta: [
        { label: '类型', value: '意式私宅' },
        { label: '面积', value: '142㎡' },
        { label: '周期', value: '4个月' },
        { label: '主材', value: '木饰面 / 大理石 / 哑光金属' },
      ],
      paragraphs: [
        '意式私宅是一套 142㎡ 的现代意式住宅，以客餐厨一体化布局释放公共空间尺度。双层悬浮跌级吊顶与全屋无主灯设计，让天花呈现出简洁而富有层次的几何关系。',
        '深咖直纹木饰面与哑光白柜门形成冷暖对话，无拉手隐形按压工艺让柜体立面保持纯粹。低饱和中性色调贯穿全屋，局部以哑光金属细节点亮精致感。',
        '走廊作为公私区域的过渡，通过材质延续与灯光引导，营造出归家的仪式感。卧室延续低饱和基调，以柔和织物与隐藏光源构建静谧休憩氛围。',
        '从木饰面下单到柜门安装，从大理石铺贴到金属收口，项目负责人对每个材料节点进行现场核对，确保最终效果与设计方案高度一致。',
      ],
    },
  ],
}

export const contactConfig: ContactConfig = {
  address: '项城市光武街道 书香铭筑 8-D-08 至禾装饰 1F',
  phone: '+86 15936902529',
  email: 'decoration@xcszhs.cn',
}

export const footerConfig: FooterConfig = {
  visionText: '我们坚持独立运营、一人统筹全流程，从设计到施工再到售后，每一个环节都亲自把控。在至禾装饰，我们不只是设计师，更是您空间落地的全权负责人。',
  brandName: '合作伙伴',
  columns: [
    {
      heading: '导航',
      entries: [
        { text: '关于我们', href: '#about' },
        { text: '服务体系', href: '#services' },
        { text: '精选案例', href: '#gallery' },
        { text: '联系我们', href: '#footer' },
      ],
    },
    {
      heading: '服务',
      entries: [
        { text: '空间设计', href: '#services' },
        { text: '装饰施工', href: '#services' },
        { text: '软装配套', href: '#services' },
        { text: '材料配套', href: '#services' },
      ],
    },
    {
      heading: '联系',
      entries: [
        { text: contactConfig.address },
        { text: contactConfig.phone, href: `tel:${contactConfig.phone.replace(/\s/g, '')}` },
        { text: contactConfig.email, href: `mailto:${contactConfig.email}` },
      ],
    },
  ],
  copyright: '© 2026 至禾装饰 KISSH Design. All rights reserved.',
  videoPath: '',
  qrImage: '/images/qr_candidate.bmp',
}

export const philosophyConfig: PhilosophyConfig = {
  eyebrow: 'DESIGN PHILOSOPHY',
  title: '空间即情绪',
  body: '每一个空间都承载着独特的生活叙事。我们相信，设计的本质不是装饰，而是创造一种让灵魂安放的氛围。在材质、光线与比例的交织中，我们寻找那些无法言说的居住诗意。',
  rollingWords: ['光影', '侘寂', '呼吸', '静谧'],
}

export const mediumsConfig: MediumsConfig = {
  sectionLabel: 'DESIGN MEDIUMS',
  items: [
    {
      cn: '建筑',
      en: 'ARCHITECTURE',
      description: '空间是建筑的灵魂。我们从建筑本体出发，以结构的力量定义空间的性格，让每一个角落都拥有独特的精神张力。',
    },
    {
      cn: '光影',
      en: 'LIGHT & SHADOW',
      description: '光是空间的雕塑家。我们利用自然光与人工照明塑造层次，让明暗在墙面、地面与材质之间流动，赋予空间情绪与温度。',
    },
    {
      cn: '材质',
      en: 'MATERIAL',
      description: '材质是空间的真实触感。我们甄选木、石、金属与织物，让每一种材料在视觉与触觉上相互回应，构建可信赖的居住质感。',
    },
    {
      cn: '陈设',
      en: 'FURNISHING',
      description: '陈设是生活的脚本。我们通过家具、灯具与器物的尺度关系，让空间从图纸落地为可日常使用的场景。',
    },
    {
      cn: '景观',
      en: 'LANDSCAPE',
      description: '景观是室内向自然的延伸。我们关注窗景、庭院与绿植的介入，让室内外形成连续的视觉与情绪体验。',
    },
  ],
}

export const projectDetailConfig: ProjectDetailConfig = {
  backLabel: '← 返回',
}

export function getProjectById(id: string): ProjectData | undefined {
  return galleryConfig.projects.find((p) => p.id === id)
}
