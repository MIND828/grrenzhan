// 个人作品集站点数据 —— 可直接在此替换为真实内容
export const profile = {
  name: "闵叮",
  nameEn: "Mind",
  title: "UI / 视觉 / 网页设计师",
  subtitle: "专注 B 端后台 · 数据看板 · 工业产品视觉",
  location: "宁波",
  age: 26,
  avatar: "", // 可填入头像 URL 或本地资源路径，留空时显示渐变占位
  email: "15737695400@163.com",
  phone: "15737695400",
  summary:
    "视觉传达设计科班出身，5 年美术基础，主导过 C 端、B 端及数据大屏项目。擅长复杂后台交互与数据可视化设计，搭建组件库与设计规范。近年依托 AI 提效工作流，可独立完成从需求梳理、原型视觉到代码调试、项目部署的完整闭环，产出可运行的演示系统。",
  // 项目数据统计
  stats: [
    { label: "年设计经验", value: "4", suffix: "+" },
    { label: "落地项目", value: "20", suffix: "+" },
    { label: "组件库规范", value: "3", suffix: "套" },
    { label: "服务行业", value: "工业制造", suffix: "" },
  ],
};

export const workExperience = [
  {
    company: "柯力云鲸科技有限公司",
    role: "UI 设计师",
    period: "2024.09 - 2026.08",
    highlights: [
      "建立 AI 提效工作流，覆盖交互参考、配图生成、代码生成与调试，显著提升方案产出与验证效率。",
      "承接传感器海外官网版式、产品详情、电商 Banner 设计，输出工业类宣传视觉物料，适配海外推广场景。",
      "负责工业称重赛道 B 端产品 UI 与交互设计，核心落地恒企称重防错系统、ERP 企业资源管理系统。",
      "搭建统一组件库与设计规范，把控全局交互与视觉一致性，参与需求评审与设计走查。",
    ],
  },
  {
    company: "深圳同调科技有限公司",
    role: "UI 设计师",
    period: "2022.09 - 2024.07",
    highlights: [
      "负责复杂后台模块设计：数据看板、多条件筛选表格、联动表单、流程审批、角色权限、告警提示等。",
      "使用 Axure、Figma 输出原型稿与视觉稿，贴合工厂仓管、称重操作员、内勤人员的使用习惯。",
      "对齐研发团队，提前识别设计实现风险，优化交互方案，跟进上线后的用户反馈迭代。",
    ],
  },
];

export const projects = [
  {
    name: "柯力智能称重防错系统",
    role: "UI 设计师 / 产品",
    period: "2026.03 - 2026.06",
    category: "B 端后台 · 工业制造",
    intro:
      "面向生产车间，管控称重工序，规避混料、错称、漏录问题的业务管控系统。简化车间工人操作步骤，增加强视觉防错提醒与操作留痕追溯。",
    modules: ["称重录入", "条码核验", "异常告警", "称重流水", "统计报表", "账号权限"],
    gradient: "linear-gradient(135deg, #0f3443 0%, #34e89e 100%)",
    accent: "#34e89e",
    image: "/project-keli.png",
    pdf: "/portfolio.pdf",
  },
  {
    name: "中企智能销售服务平台",
    role: "UI 设计师 / 产品",
    period: "2026.04 - 2026.07",
    category: "B 端后台 · 销售服务",
    intro:
      "面向企业销售与服务团队，覆盖客户跟进、商机流转、合同订单与售后台账的一体化管理平台。针对长表单、复杂联动、批量处理等高频痛点做交互优化。",
    modules: ["客户管理", "商机跟进", "合同订单", "售后台账", "批量操作", "多级审批"],
    gradient: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
    accent: "#5b8def",
    image: "/project-zhongqi.png",
    pdf: "/pdf-zhongqi.pdf",
  },
  {
    name: "小安网络安全官网",
    role: "UI 设计师",
    period: "2025.01 - 2026.07",
    category: "网页设计 · 网络安全",
    intro:
      "为网络安全品牌打造的官方站点，涵盖产品矩阵、解决方案与安全能力展示。以沉稳克制的视觉语言传递专业可信的品牌气质，适配多端浏览体验。",
    modules: ["官网版式", "产品体系", "解决方案", "安全能力展示", "多端适配"],
    gradient: "linear-gradient(135deg, #42275a 0%, #734b6d 100%)",
    accent: "#c084fc",
    image: "/project-xiaoan.png",
    pdf: "/pdf-xiaoan.pdf",
  },
  {
    name: "集换社 APP UI 设计",
    role: "UI 设计师",
    period: "2025.06 - 2025.10",
    category: "APP · UI 设计",
    intro:
      "面向卡牌集换爱好者的社区交易类 APP，承担核心界面视觉与交互设计。围绕卡牌浏览、鉴赏、交易与社区互动，构建年轻、有活力的移动端体验。",
    modules: ["首页发现", "卡牌鉴赏", "交易市场", "社区动态", "个人中心"],
    gradient: "linear-gradient(135deg, #ff512f 0%, #dd2476 100%)",
    accent: "#ff6b6b",
    image: "/project-jihuanshe.png",
    pdf: "/pdf-jihuanshe.pdf",
  },
  {
    name: "手绘插画",
    role: "插画师 / 视觉",
    period: "持续创作",
    category: "插画 · 视觉创作",
    intro:
      "个人手绘插画系列创作，覆盖人物、场景与商业插画等题材。注重线条节奏与色彩氛围，可适配品牌宣传、运营活动与出版物等多种应用场景。",
    modules: ["人物插画", "场景插画", "商业插画", "系列设定"],
    gradient: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
    accent: "#f59e0b",
    image: "/project-illustration.png",
    pdf: "/pdf-illustration.pdf",
  },
  {
    name: "数据可视化大屏",
    role: "UI 设计师 / 数据可视化",
    period: "2025.03 - 2026.05",
    category: "数据大屏 · 可视化",
    intro:
      "为制造与运营场景设计的数据可视化大屏，整合生产、能耗、安防等多源数据。兼顾信息密度与可读性，通过图表选型与视觉层级让关键指标一目了然。",
    modules: ["指标总览", "实时监控", "趋势分析", "告警联动", "多屏适配"],
    gradient: "linear-gradient(135deg, #0b2341 0%, #11998e 100%)",
    accent: "#2dd4bf",
    image: "/project-dataviz.png",
    pdf: "/pdf-dataviz.pdf",
  },
];

export const strengths = [
  {
    title: "扎实的视觉功底",
    desc: "美术科班出身，5 年美术基础，审美在线，能精准把握主题风格与视觉创意，输出具备品牌质感的界面。",
    icon: "palette",
  },
  {
    title: "复杂 B 端交互设计",
    desc: "深耕数据看板、联动表单、流程审批、权限管理等复杂后台场景，擅长拆解需求并优化可用性。",
    icon: "layers",
  },
  {
    title: "跨平台设计能力",
    desc: "精通移动端与 PC 端设计规范，主导过 C 端、B 端、数据大屏项目，可灵活切换设计语言。",
    icon: "devices",
  },
  {
    title: "AI 全链路提效",
    desc: "构建 AI 提效工作流，可将 B 端设计方案落地为可运行演示系统，独立完成原型到代码调试部署。",
    icon: "sparkles",
  },
  {
    title: "组件库与规范沉淀",
    desc: "熟练搭建统一组件库与设计规范，把控全局交互与视觉一致性，降低团队迭代成本。",
    icon: "grid",
  },
  {
    title: "业务理解与走查",
    desc: "深入制造业业务场景，参与需求评审与设计走查，提前识别实现风险，跟进上线反馈持续迭代。",
    icon: "search",
  },
];

export const skills = {
  tools: ["Figma", "Axure RP", "Photoshop", "Illustrator", "After Effects", "C4D"],
  abilities: [
    "B 端后台交互 / 视觉设计",
    "复杂表单 & 数据看板",
    "需求拆解与可用性优化",
    "设计走查与组件库规范",
    "AI 辅助编码与项目部署",
    "海外页面视觉适配",
  ],
};

export const contacts = [
  { label: "Email", value: "15737695400@163.com", href: "mailto:15737695400@163.com" },
  { label: "Phone", value: "15737695400", href: "tel:15737695400" },
  { label: "Location", value: "宁波", href: "#" },
];
