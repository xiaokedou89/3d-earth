const SystemTag = ['管理平台', '运维相关系统']; //系统接入情况
const EngineTag = ['管理平台']; //引擎接入情况

const SystemTagShort = ['管理平台', '运维']; //系统接入情况
const EngineTagShort = ['管理平台']; //引擎接入情况

function ShortName(name) {
  let i = SystemTag.indexOf(name);
  if (i >= 0) return SystemTagShort[i];
  i = EngineTag.indexOf(name);
  if (i >= 0) return EngineTagShort[i];
  return name;
}

const theme = localStorage.getItem('theme');

const RuleTypeTag = ['布网策略'];
const RuleTypeTagIcon = ['fa fa-filter', 'fa fa-filter', 'fa fa-gavel'];

const MBVersionURL = 'http://127.0.0.1:10082/MbJarInterfaceTool/label/doGetLabelVersion';
// 业务
const TaskDict = {
  // 通道状态
  dictChanneType: [
    { value: 'constructing', label: '创建中' },
    { value: 'running', label: '运行中' },
    { value: 'repairing', label: '修复中' },
    { value: 'repair_failed', label: '修复失败' },
    { value: 'destroyed', label: '已销毁' },
    { value: 'report_destroyed', label: '报故销毁' },
    { value: 'deleted', label: '已删除' },
    { value: 'create_failed', label: '创建失败' }
  ],
  // 终端容器类型
  containerTypeJs: [
    { value: 'no', label: '无容器终端' },
    { value: 'internet', label: '本地网页终端' },
    { value: 'similator', label: '移动虚拟终端' },
    { value: 'phone', label: '移动物理终端' },
    { value: 'yun', label: '云网页终端' },
    { value: 'arm', label: 'ARM' },
    { value: 'any', label: '任意' },
    { value: 'arm_2', label: 'ARM2型' }
  ],
  // 账号等级
  gradeJs: [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' }
  ],
  // 动作类型
  actionTypeJs: [
    { value: '注册', label: '注册' },
    { value: '发帖', label: '发帖' },
    { value: '加好友', label: '加好友' },
    { value: '申请加入指定群组', label: '申请加入指定群组' },
    { value: '关注公共主页', label: '关注公共主页' },
    { value: '浏览首页', label: '浏览首页' },
    { value: '浏览首页并点赞', label: '浏览首页并点赞' },
    { value: '浏览首页并转发', label: '浏览首页并转发' },
    { value: '浏览首页并评论', label: '浏览首页并评论' }
  ],

  // 带宽需求
  bandwidthTypeJs: [],
  // 接入协议
  accessProtocolJS: [
    { value: 'socks5', label: 'Socks5' },
    { value: 'http', label: 'HTTP(S)' }
  ],
  // 任务管理-创建方式数组
  createArrJs: [
    { value: 'manual', label: '手动创建' },
    { value: 'auto', label: '自动创建' }
  ],
  // 任务基本信息业务类型数组
  basicBusinessTypeJs: [
    { value: 'sjhc', label: 'SJHC' },
    { value: 'xxts', label: 'XXTS' },
    { value: 'zlkz', label: 'ZLKZ' },
    { value: 'rcbz', label: '日常保障' }
  ],
  // 需求解析接入协议
  accessProtocolxqJS: [
    // { value: 1, label: '不限制' },
    { value: 2, label: 'TCP' },
    { value: 3, label: 'TLS' }
  ],
  // 需求解析接入协议2
  accessProtocolxq2JS: [
    // { value: 1, label: '不限制' },
    { value: 4, label: 'HTTP（S）' },
    { value: 5, label: 'SOCKS5' }
  ],
  // 业务类型数组[通道使用 通道的全部不支持value为0的全部只支持null]
  channel_belong_services_opt: [
    { value: null, label: '全部业务类型' },
    { value: 1, label: 'SJHC' },
    { value: 2, label: 'XXTS' },
    { value: 3, label: 'ZLKZ' },
    { value: 4, label: '日常保障' }
    // 无自定义选项暂时注释【新增通道有使用】
    // { value: 4, label: "自定义" },
  ],
  // 业务类型数组
  serviceLabels: [
    { value: 1, label: 'SJHC' },
    { value: 2, label: 'XXTS' },
    { value: 3, label: 'ZLKZ' },
    // 无自定义选项暂时注释【新增通道有使用】
    { value: 4, label: '日常保障' }
  ],
  // 用于策略管理弹框的
  labelsForStrategy: [
    { value: 1, label: 'HC通道' },
    { value: 2, label: 'TS通道' },
    { value: 3, label: '控制通道' },
    { value: 4, label: '自定义通道' }
  ],
  // 获取业务列表的业务类型数组
  serviceListLabels: [
    { value: 0, label: '全部业务类型' },
    { value: 1, label: 'SJHC' },
    { value: 2, label: 'XXTS' },
    { value: 3, label: 'ZLKZ' },
    { value: 4, label: '日常保障' }
  ],
  newServiceListLabels: [
    // { value: '', label: '全部业务类型' },
    { value: 'sjhc', label: 'SJHC' },
    { value: 'xxts', label: 'XXTS' },
    { value: 'zlkz', label: 'ZLKZ' },
    { value: 'zjyk', label: '主机远控' },
    { value: 'rcbz', label: '日常保障' },
    { value: 'cjzlxf', label: '采集指令下发' }
    // { value: '', label: '全部业务类型' },
    // { value: 'SJHC', label: 'SJHC' },
    // { value: 'XXTS', label: 'XXTS' },
    // { value: 'ZLKZ' , label: 'ZLKZ' },
    // { value: 'RCBZ', label: '日常保障' },
  ],
  // 最新通道架构
  newchannelType: [
    { value: 'VPS-DPN_RTCP', label: '云专线回传型-专线转发' },
    { value: 'VPS-SDWAN_RTCP', label: '云专线回传型-飞地转发' },
    { value: 'VPS-DPN_tunnel', label: '云专线回传型-专线隧道' },
    { value: 'VPS-SDWAN_tunnel', label: '云专线回传型-飞地隧道' },
    { value: 'VPS-VPS_Zephyr', label: '受控代理型-云主机标准加密' },
    { value: 'VPS-VPS_SkyNet', label: '受控代理型-云主机加密代理' },
    { value: 'VPS-VPS_TGod', label: '受控代理型-云主机路径混淆' },
    { value: 'SDWAN-VPS', label: '受控代理型-云专线' },
    // { value: 'VPS-VPS_VPN', label: '代理寄生型-虚拟专用网络' },
    { value: 'VPS-TOR', label: '代理寄生型-匿名网络' },
    { value: 'VPS-JC', label: '代理寄生型-机场代理' },
    { value: 'VPS-JC-ZZDL', label: '代理寄生型-混合代理' },
    { value: 'VPS-IOT', label: '代理寄生型-物联网代理' },
    // { value: 'VPS-ZZDL', label: '代理寄生型-住宅代理' },
    { value: 'VPS-VPS_RCBZ', label: '日常保障型-云主机' },
    { value: 'VPS-VPS_SRCBZ', label: '日常保障型-单跳云主机' },
    { value: 'BW-VPS', label: '应急通联型-边境无线' },
    { value: 'SAT-VPS', label: '应急通联型-卫星通信' },
    { value: 'BW-IOT', label: '应急通联型-无线物联网' },
    { value: 'SAT-IOT', label: '应急通联型-卫星物联网' }
    // { value: 'VPS-BJ_tunnel', label: '应急回传型-边境无线' },
    // { value: 'VPS-SAT_tunnel', label: '应急回传型-卫星通信' }
  ],
  //资源类型数组
  resourceType: [
    // { value: '', label: '全部资源类型' },
    { value: 'VPS', label: '云主机' },
    { value: 'AIRPORT_PROXY', label: '机场代理节点' },
    // { value: 'STATIC_RESIDENCE_PROXY', label: '静态住宅代理节点' },
    { value: 'TRENDS_RESIDENCE_PROXY', label: '动态住宅代理节点' },
    { value: 'ANONYMOUS_NETWORK', label: '匿名代理节点' },
    { value: 'IOT', label: '物联网节点' },
    // { value: 'BLOCKCHAIN', label: '区块链节点' },
    { value: 'SDWAN_VPS', label: '运营商专线节点' },
    // { value: 'SDWAN_DHOST', label: '运营商专线接入主机' },
    // { value: 'SDWAN_CPE', label: '运营商专线CPE节点' },
    { value: 'DPN_VPS', label: '云专线节点' },
    { value: 'SDWAN_POP', label: '运营商专线虚拟节点' }

    // { value: 'DPN_DHOST', label: '云专线接入主机' },
  ],
  dictfirstType: [
    { value: 'FSY', label: 'anti_trace' },
    { value: '抗毁', label: 'invulnerability' },
    { value: '带宽', label: 'speed' },
    { value: '构建速度', label: 'construction_speed' },
    { value: '及时性', label: 'timeliness' },
    { value: '性价比', label: 'cost_performance' },
    { value: '数据安全性', label: 'security' }
  ],
  newServiceListStatus: [
    // { value: '', label: '全部业务' },
    { value: 'a', label: 'A' },
    { value: 'b', label: 'B' },
    { value: 'c', label: 'C' },
    { value: 'o', label: '日常保障' }
  ],
  enumerationService: [
    { value: 'a', label: 'A' },
    { value: 'b', label: 'B' },
    { value: 'c', label: 'C' },
    { value: 'o', label: '日常保障' }
  ],
  scnType: [
    { value: '视频', label: '视频' },
    { value: '图片', label: '图片' },
    { value: '其他', label: '其他' }
  ],
  sessionstatus: [
    { value: 'unbound', label: '未绑定' },
    { value: 'normal', label: '正常' },
    { value: 'suspended', label: '已暂停' },
    { value: 'cterminated', label: '已中止' }
  ],
  // 获取业务列表的状态数组 - 业务管理状态筛选
  // 测试
  // serviceListStatus: [
  //   { value: 0, label: "全部", color: "" },
  //   { value: 2, label: "创建失败", color: "#BEC5D7", type: "info" },
  //   { value: 3, label: "运行中", color: "#55CC57", type: "success" },
  //   { value: 4, label: "运行异常", color: "#BEC5D7", type: "info" },
  //   { value: 6, label: "已暂停", color: "#1677FF", type: "" },
  //   { value: 8, label: "已销毁", color: "#FF2A00", type: "danger" },
  // ],
  serviceListStatus: [
    { value: 0, label: '全部', color: '', type: '' },
    { value: 2, label: '运行中', color: '#55CC57', type: 'success' },
    { value: 3, label: '已暂停', color: '#BEC5D7', type: 'info' },
    { value: 4, label: '已中止', color: '#BEC5D7', type: 'info' },
    { value: 1, label: '待提交', color: '#1677FF', type: '' }
    //  { value: 5, label: '运行异常', color: '#FF2A00', type: 'danger' }
  ],
  // 业务状态数组 - 回显
  // serviceStatus: [
  //   { value: 0, label: "全部", color: "", type: "" },
  //   { value: 1, label: "创建中", color: "#1677FF", type: "" },
  //   { value: 2, label: "创建失败", color: "#BEC5D7", type: "info" },
  //   { value: 3, label: "运行中", color: "#55CC57", type: "success" },
  //   { value: 4, label: "运行异常", color: "#BEC5D7", type: "info" },
  //   { value: 5, label: "修复中", color: "#55CC57", type: "success" },
  //   { value: 6, label: "已暂停", color: "#1677FF", type: "" },
  //   { value: 7, label: "销毁中", color: "#FF2A00", type: "danger" },
  //   { value: 8, label: "已销毁", color: "#FF2A00", type: "danger" },
  // ],
  /*serviceStatus: [
    { value: 0, label: '全部', color: '', type: '', fontColor: '', borderColor: '' },
    { value: 1, label: '创建中', color: '#effafe', type: '', fontColor: '#2f9acc', borderColor: '#c1ebfb' },
    { value: 6, label: '创建失败', color: '#feeded', type: 'danger', fontColor: '#cf1322', borderColor: '#fcb5b9' },
    { value: 7, label: '创建中', color: '#effafe', type: '', fontColor: '#2f9acc', borderColor: '#c1ebfb' },
    { value: 8, label: '创建中', color: '#effafe', type: '', fontColor: '#2f9acc', borderColor: '#c1ebfb' },
    { value: 2, label: '运行中', color: '#fff6ea', type: 'success', fontColor: '#d97b00', borderColor: '#ffddaa' },
    { value: 9, label: '运行中', color: '#fff6ea', type: 'success', fontColor: '#d97b00', borderColor: '#ffddaa' },
    { value: 10, label: '运行中', color: '#fff6ea', type: 'success', fontColor: '#d97b00', borderColor: '#ffddaa' },
    { value: 14, label: '运行中', color: '#fff6ea', type: 'success', fontColor: '#d97b00', borderColor: '#ffddaa' },
    { value: 3, label: '已暂停', color: '#f5f5f5', type: 'info', fontColor: '#575757', borderColor: '#dbdbdb' },
    { value: 11, label: '已暂停', color: '#f5f5f5', type: 'info', fontColor: '#575757', borderColor: '#dbdbdb' },
    { value: 12, label: '已暂停', color: '#f5f5f5', type: 'info', fontColor: '#575757', borderColor: '#dbdbdb' },
    { value: 13, label: '已暂停', color: '#f5f5f5', type: 'info', fontColor: '#575757', borderColor: '#dbdbdb' },
    { value: 4, label: '已中止', color: '#f5f5f5', type: 'info', fontColor: '#575757', borderColor: '#dbdbdb' },
    { value: 19, label: '已中止', color: '#f5f5f5', type: 'info', fontColor: '#575757', borderColor: '#dbdbdb' },
    { value: 5, label: '运行异常', color: '#feeded', type: 'danger', fontColor: '#cf1322', borderColor: '#fcb5b9' },
    { value: 15, label: '运行异常', color: '#feeded', type: 'danger', fontColor: '#cf1322', borderColor: '#fcb5b9' },
    { value: 16, label: '运行异常', color: '#feeded', type: 'danger', fontColor: '#cf1322', borderColor: '#fcb5b9' },
    { value: 17, label: '运行异常', color: '#feeded', type: 'danger', fontColor: '#cf1322', borderColor: '#fcb5b9' },
    { value: 18, label: '运行异常', color: '#feeded', type: 'danger', fontColor: '#cf1322', borderColor: '#fcb5b9' }
  ],*/

  serviceStatus: [
    // 状态只对比状态码 前两位
    //{ value: 0, label: '全部',  className:'task-status-'},
    //{ value: 31, label: '创建失败', className: 'task-status-sub' },
    { value: 21, label: '待提交', className: 'status-tag-yellow' },
    { value: 11, label: '运行中', className: 'status-tag-green' },
    { value: 12, label: '运行中', className: 'status-tag-green' },
    { value: 16, label: '运行中', className: 'status-tag-green' },
    { value: 13, label: '已暂停', className: 'status-tag-gray' },
    { value: 14, label: '已中止', className: 'status-tag-gray' }
    //{ value: 23, label: '暂停中', className: 'task-status-'},
    //{ value: 33, label: '暂停失败',className: 'task-status-' },

    //{ value: 24, label: '中止中', className: 'task-status-' },

    //{ value: 34, label: '中止失败', className: 'task-status-' },

    // { value: 26, label: '重启中', className: 'task-status-' },
    // { value: 36, label: '重启失败', className: 'task-status-' },

    // { value: 22, label: '编辑中', className: 'task-status-'},
    // { value: 32, label: '编辑失败', className: 'task-status-'},

    // { value: 15, label: '删除成功', className: 'task-status-' },
    // { value: 25, label: '删除中', className: 'task-status-' },
    // { value: 35, label: '删除失败', className: 'task-status-' }
  ],

  // 业务所属通道的状态
  serviceChannelsStatus: [
    { value: 0, label: '正常', color: '' },
    { value: 1, label: '部分异常', color: 'rgb(197, 197, 7)' },
    { value: 2, label: '全部异常', color: 'red' }
  ],
  // 支撑业务数组
  serviceSupports: [
    { value: 1, label: 'A', disabled: false },
    { value: 2, label: 'B', disabled: false },
    { value: 3, label: 'C', disabled: false },
    { value: 4, label: '日常保障', disabled: false }
  ],
  newserviceSupports: [
    { value: 'a', label: 'A' },
    { value: 'b', label: 'B' },
    { value: 'c', label: 'C' },
    { value: 'o', label: '日常保障' }
  ],
  // 业务列表来源系统描述数组
  serviceListSupports: [
    { value: 1, label: 'A', disabled: false },
    { value: 2, label: 'B', disabled: false },
    { value: 3, label: 'C', disabled: false },
    { value: 4, label: '日常保障', disabled: false },
    { value: 0, label: '自定义' }
  ],
  // 任务日志的上层支撑业务
  logListSupports: [
    // { value: '', label: '全部上层支撑业务' },
    { value: 'a', label: 'A' },
    { value: 'b', label: 'B' },
    { value: 'c', label: 'C' },
    { value: 'o', label: '日常保障' }
  ],
  // 协议
  protocols: [
    { value: 1, label: 'HTTP(S)' },
    { value: 2, label: 'SOCKS5' },
    { value: 3, label: 'TCP' },
    { value: 4, label: 'TLS' },
    { value: 5, label: 'HTTPS' },
    { value: 19, label: 'UDP' }
  ],
  // SJHC
  protocols1: [
    { value: 3, label: 'TCP' },
    { value: 4, label: 'TLS' }
  ],
  // XXTS
  protocols2: [
    { value: 1, label: 'HTTP' },
    { value: 2, label: 'SOCKS5' }
  ],
  // ZLKZ
  protocols3: [
    { value: 1, label: 'HTTP' },
    { value: 2, label: 'SOCKS5' }
  ],
  // 转发模式
  forwards: [
    { value: 0, label: '无限制' },
    { value: 1, label: '逐跳转发' },
    { value: 2, label: '嵌套转发' }
  ],
  // 加密算法
  algorithms: [
    { value: 1, label: 'AES-128-CFB' },
    { value: 2, label: 'AES-128-GCM' },
    { value: 3, label: 'ChaCha20-Poly1305' }
  ],
  // 混淆模式
  confusions: [
    { value: 0, label: '无' },
    { value: 1, label: '包特征混淆' },
    { value: 2, label: '时序混淆' }
  ],
  // 伪装模式
  camouflages: [
    { value: 0, label: '无' },
    { value: 1, label: 'HTTP' }
  ],
  convert_levels: [
    { value: 1, label: '匿名网络（Tor）通道' },
    { value: 2, label: '云主机与代理混合通道' },
    { value: 3, label: '云主机YB通道' }
  ],
  convert_level2: [
    { value: 2, label: '云主机私有协议通道' },
    { value: 1, label: '云主机标准协议通道' }
    //{ value: 3, label: '密网通道' }
  ],
  // 日志类型
  logTypeOpt: [
    {
      label: '',
      value: '全部日志类型'
    },
    {
      label: '任务创建',
      value: '任务创建'
    },
    {
      label: '任务修改',
      value: '任务修改'
    },
    {
      label: '任务暂停',
      value: '任务暂停'
    },
    {
      label: '任务中止',
      value: '任务中止'
    },
    {
      label: '任务删除',
      value: '任务中止'
    },
    {
      label: '任务重启',
      value: '任务中止'
    }
  ],
  /*log_level_opt: [
    {
      label: '正常',
      value: 1,
      tag: 'success'
    },
    {
      label: '警告',
      value: 2,
      tag: 'warning'
    },
    {
      label: '错误',
      value: 3,
      tag: 'danger'
    }
  ],*/
  // 日志级别
  log_level_opt: [
    {
      label: '正常',
      value: 1,
      tag: 'success',
      color: '#eefcf7',
      fontColor: '#1eb07f',
      borderColor: '#baf1dd'
    },
    {
      label: '警告',
      value: 2,
      tag: 'warning',
      color: '#fff6ea',
      fontColor: '#d97b00',
      borderColor: '#ffddaa'
    },
    {
      label: '错误',
      value: 3,
      tag: 'danger',
      color: '#feeded',
      fontColor: '#cf1322',
      borderColor: '#fcb5b9'
    }
  ],

  // 筛选状态
  dataStatus: [
    { value: '', label: '全部', tableLabel: '', color: '' },
    {
      value: '正常',
      label: '正常',
      tableLabel: '正常',
      color: '#00a166'
    },
    {
      value: '警告',
      label: '警告',
      tableLabel: '警告',
      color: '#ff9900'
    },
    {
      value: '错误',
      label: '错误',
      tableLabel: '错误',
      color: '#ec2229'
    }
  ]
};

// 网络通道
const ChannelDict = {
  // 地域字典
  alpha_opt: [
    {
      'alpha-2': 'AF',
      name: 'Afghanistan',
      chineseName: '阿富汗',
      'country-code': 4,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Southern Asia',
      childArea: '南亚',
      'ISO 3166-2': 'ISO 3166-2:AF'
    },
    {
      'alpha-2': 'AX',
      name: '?land Islands',
      chineseName: '奥兰',
      'country-code': 248,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Northern Europe',
      childArea: '北欧',
      'ISO 3166-2': 'ISO 3166-2:AX'
    },
    {
      'alpha-2': 'AL',
      name: 'Albania',
      chineseName: '阿尔巴尼亚',
      'country-code': 8,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Southern Europe',
      childArea: '南欧',
      'ISO 3166-2': 'ISO 3166-2:AL'
    },
    {
      'alpha-2': 'DZ',
      name: 'Algeria',
      chineseName: '阿尔及利亚',
      'country-code': 12,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Northern Africa',
      childArea: '北非',
      'ISO 3166-2': 'ISO 3166-2:DZ'
    },
    {
      'alpha-2': 'AS',
      name: 'American Samoa',
      chineseName: '美属萨摩亚',
      'country-code': 16,
      region: 'Oceania',
      area: '大洋洲',
      'sub-region': 'Polynesia',
      childArea: '波利尼西亚',
      'ISO 3166-2': 'ISO 3166-2:AS'
    },
    {
      'alpha-2': 'AD',
      name: 'Andorra',
      chineseName: '安道尔',
      'country-code': 20,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Southern Europe',
      childArea: '南欧',
      'ISO 3166-2': 'ISO 3166-2:AD'
    },
    {
      'alpha-2': 'AO',
      name: 'Angola',
      chineseName: '安哥拉',
      'country-code': 24,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:AO'
    },
    {
      'alpha-2': 'AI',
      name: 'Anguilla',
      chineseName: '安圭拉',
      'country-code': 660,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:AI'
    },
    {
      'alpha-2': 'AQ',
      name: 'Antarctica',
      chineseName: '南极洲',
      'country-code': 10,
      region: '',
      area: '',
      'sub-region': '',
      childArea: '',
      'ISO 3166-2': 'ISO 3166-2:AQ'
    },
    {
      'alpha-2': 'AG',
      name: 'Antigua and Barbuda',
      chineseName: '安提瓜和巴布达',
      'country-code': 28,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:AG'
    },
    {
      'alpha-2': 'AR',
      name: 'Argentina',
      chineseName: '阿根廷',
      'country-code': 32,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:AR'
    },
    {
      'alpha-2': 'AM',
      name: 'Armenia',
      chineseName: '亚美尼亚',
      'country-code': 51,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Western Asia',
      childArea: '西亚',
      'ISO 3166-2': 'ISO 3166-2:AM'
    },
    {
      'alpha-2': 'AW',
      name: 'Aruba',
      chineseName: '阿鲁巴',
      'country-code': 533,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:AW'
    },
    {
      'alpha-2': 'AU',
      name: 'Australia',
      chineseName: '澳大利亚',
      'country-code': 36,
      region: 'Oceania',
      area: '大洋洲',
      'sub-region': 'Australia and New Zealand',
      childArea: '澳大利亚和新西兰',
      'ISO 3166-2': 'ISO 3166-2:AU'
    },
    {
      'alpha-2': 'AT',
      name: 'Austria',
      chineseName: '奥地利',
      'country-code': 40,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Western Europe',
      childArea: '西欧',
      'ISO 3166-2': 'ISO 3166-2:AT'
    },
    {
      'alpha-2': 'AZ',
      name: 'Azerbaijan',
      chineseName: '阿塞拜疆',
      'country-code': 31,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Western Asia',
      childArea: '西亚',
      'ISO 3166-2': 'ISO 3166-2:AZ'
    },
    {
      'alpha-2': 'BS',
      name: 'Bahamas',
      chineseName: '巴哈马',
      'country-code': 44,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:BS'
    },
    {
      'alpha-2': 'BH',
      name: 'Bahrain',
      chineseName: '巴林',
      'country-code': 48,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Western Asia',
      childArea: '西亚',
      'ISO 3166-2': 'ISO 3166-2:BH'
    },
    {
      'alpha-2': 'BD',
      name: 'Bangladesh',
      chineseName: '孟加拉国',
      'country-code': 50,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Southern Asia',
      childArea: '南亚',
      'ISO 3166-2': 'ISO 3166-2:BD'
    },
    {
      'alpha-2': 'BB',
      name: 'Barbados',
      chineseName: '巴巴多斯',
      'country-code': 52,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:BB'
    },
    {
      'alpha-2': 'BY',
      name: 'Belarus',
      chineseName: '白俄罗斯',
      'country-code': 112,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Eastern Europe',
      childArea: '东欧',
      'ISO 3166-2': 'ISO 3166-2:BY'
    },
    {
      'alpha-2': 'BE',
      name: 'Belgium',
      chineseName: '比利时',
      'country-code': 56,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Western Europe',
      childArea: '西欧',
      'ISO 3166-2': 'ISO 3166-2:BE'
    },
    {
      'alpha-2': 'BZ',
      name: 'Belize',
      chineseName: '伯利兹',
      'country-code': 84,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:BZ'
    },
    {
      'alpha-2': 'BJ',
      name: 'Benin',
      chineseName: '贝宁',
      'country-code': 204,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:BJ'
    },
    {
      'alpha-2': 'BM',
      name: 'Bermuda',
      chineseName: '百慕大',
      'country-code': 60,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Northern America',
      childArea: '北美',
      'ISO 3166-2': 'ISO 3166-2:BM'
    },
    {
      'alpha-2': 'BT',
      name: 'Bhutan',
      chineseName: '不丹',
      'country-code': 64,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Southern Asia',
      childArea: '南亚',
      'ISO 3166-2': 'ISO 3166-2:BT'
    },
    {
      'alpha-2': 'BO',
      name: 'Bolivia, Plurinational State of',
      chineseName: '玻利维亚',
      'country-code': 68,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:BO'
    },
    {
      'alpha-2': 'BQ',
      name: 'Bonaire, Sint Eustatius and Saba',
      chineseName: '荷兰加勒比区',
      'country-code': 535,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:BQ'
    },
    {
      'alpha-2': 'BA',
      name: 'Bosnia and Herzegovina',
      chineseName: '波黑',
      'country-code': 70,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Southern Europe',
      childArea: '南欧',
      'ISO 3166-2': 'ISO 3166-2:BA'
    },
    {
      'alpha-2': 'BW',
      name: 'Botswana',
      chineseName: '博茨瓦纳',
      'country-code': 72,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:BW'
    },
    {
      'alpha-2': 'BV',
      name: 'Bouvet Island',
      chineseName: '布韦岛',
      'country-code': 74,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:BV'
    },
    {
      'alpha-2': 'BR',
      name: 'Brazil',
      chineseName: '巴西',
      'country-code': 76,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:BR'
    },
    {
      'alpha-2': 'IO',
      name: 'British Indian Ocean Territory',
      chineseName: '英属印度洋领地',
      'country-code': 86,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:IO'
    },
    {
      'alpha-2': 'BN',
      name: 'Brunei Darussalam',
      chineseName: '文莱',
      'country-code': 96,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'South-eastern Asia',
      childArea: '东南亚',
      'ISO 3166-2': 'ISO 3166-2:BN'
    },
    {
      'alpha-2': 'BG',
      name: 'Bulgaria',
      chineseName: '保加利亚',
      'country-code': 100,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Eastern Europe',
      childArea: '东欧',
      'ISO 3166-2': 'ISO 3166-2:BG'
    },
    {
      'alpha-2': 'BF',
      name: 'Burkina Faso',
      chineseName: '布基纳法索',
      'country-code': 854,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:BF'
    },
    {
      'alpha-2': 'BI',
      name: 'Burundi',
      chineseName: '布隆迪',
      'country-code': 108,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:BI'
    },
    {
      'alpha-2': 'CV',
      name: 'Cabo Verde',
      chineseName: '佛得角',
      'country-code': 132,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:CV'
    },
    {
      'alpha-2': 'KH',
      name: 'Cambodia',
      chineseName: '柬埔寨',
      'country-code': 116,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'South-eastern Asia',
      childArea: '东南亚',
      'ISO 3166-2': 'ISO 3166-2:KH'
    },
    {
      'alpha-2': 'CM',
      name: 'Cameroon',
      chineseName: '喀麦隆',
      'country-code': 120,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:CM'
    },
    {
      'alpha-2': 'CA',
      name: 'Canada',
      chineseName: '加拿大',
      'country-code': 124,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Northern America',
      childArea: '北美',
      'ISO 3166-2': 'ISO 3166-2:CA'
    },
    {
      'alpha-2': 'KY',
      name: 'Cayman Islands',
      chineseName: '开曼群岛',
      'country-code': 136,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:KY'
    },
    {
      'alpha-2': 'CF',
      name: 'Central African Republic',
      chineseName: '中非',
      'country-code': 140,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:CF'
    },
    {
      'alpha-2': 'TD',
      name: 'Chad',
      chineseName: '乍得',
      'country-code': 148,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:TD'
    },
    {
      'alpha-2': 'CL',
      name: 'Chile',
      chineseName: '智利',
      'country-code': 152,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:CL'
    },
    {
      'alpha-2': 'CN',
      name: 'China',
      chineseName: '中国',
      'country-code': 156,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Eastern Asia',
      childArea: '东亚',
      'ISO 3166-2': 'ISO 3166-2:CN'
    },
    {
      'alpha-2': 'CX',
      name: 'Christmas Island',
      chineseName: '圣诞岛',
      'country-code': 162,
      region: 'Oceania',
      area: '大洋洲',
      'sub-region': 'Australia and New Zealand',
      childArea: '澳大利亚和新西兰',
      'ISO 3166-2': 'ISO 3166-2:CX'
    },
    {
      'alpha-2': 'CC',
      name: 'Cocos (Keeling) Islands',
      chineseName: '科科斯（基林）群岛',
      'country-code': 166,
      region: 'Oceania',
      area: '大洋洲',
      'sub-region': 'Australia and New Zealand',
      childArea: '澳大利亚和新西兰',
      'ISO 3166-2': 'ISO 3166-2:CC'
    },
    {
      'alpha-2': 'CO',
      name: 'Colombia',
      chineseName: '哥伦比亚',
      'country-code': 170,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:CO'
    },
    {
      'alpha-2': 'KM',
      name: 'Comoros',
      chineseName: '科摩罗',
      'country-code': 174,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:KM'
    },
    {
      'alpha-2': 'CG',
      name: 'Congo',
      chineseName: '刚果共和国',
      'country-code': 178,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:CG'
    },
    {
      'alpha-2': 'CD',
      name: 'Congo, Democratic Republic of the',
      chineseName: '刚果民主共和国',
      'country-code': 180,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:CD'
    },
    {
      'alpha-2': 'CK',
      name: 'Cook Islands',
      chineseName: '库克群岛',
      'country-code': 184,
      region: 'Oceania',
      area: '大洋洲',
      'sub-region': 'Polynesia',
      childArea: '波利尼西亚',
      'ISO 3166-2': 'ISO 3166-2:CK'
    },
    {
      'alpha-2': 'CR',
      name: 'Costa Rica',
      chineseName: '哥斯达黎加',
      'country-code': 188,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:CR'
    },
    {
      'alpha-2': 'CI',
      name: "C?te d'Ivoire",
      chineseName: '科特迪瓦',
      'country-code': 384,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:CI'
    },
    {
      'alpha-2': 'HR',
      name: 'Croatia',
      chineseName: '克罗地亚',
      'country-code': 191,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Southern Europe',
      childArea: '南欧',
      'ISO 3166-2': 'ISO 3166-2:HR'
    },
    {
      'alpha-2': 'CU',
      name: 'Cuba',
      chineseName: '古巴',
      'country-code': 192,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:CU'
    },
    {
      'alpha-2': 'CW',
      name: 'Cura?ao',
      chineseName: '库拉索',
      'country-code': 531,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:CW'
    },
    {
      'alpha-2': 'CY',
      name: 'Cyprus',
      chineseName: '塞浦路斯',
      'country-code': 196,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Western Asia',
      childArea: '西亚',
      'ISO 3166-2': 'ISO 3166-2:CY'
    },
    {
      'alpha-2': 'CZ',
      name: 'Czechia',
      chineseName: '捷克',
      'country-code': 203,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Eastern Europe',
      childArea: '东欧',
      'ISO 3166-2': 'ISO 3166-2:CZ'
    },
    {
      'alpha-2': 'DK',
      name: 'Denmark',
      chineseName: '丹麦',
      'country-code': 208,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Northern Europe',
      childArea: '北欧',
      'ISO 3166-2': 'ISO 3166-2:DK'
    },
    {
      'alpha-2': 'DJ',
      name: 'Djibouti',
      chineseName: '吉布提',
      'country-code': 262,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:DJ'
    },
    {
      'alpha-2': 'DM',
      name: 'Dominica',
      chineseName: '多米尼克',
      'country-code': 212,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:DM'
    },
    {
      'alpha-2': 'DO',
      name: 'Dominican Republic',
      chineseName: '多米尼加',
      'country-code': 214,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:DO'
    },
    {
      'alpha-2': 'EC',
      name: 'Ecuador',
      chineseName: '厄瓜多尔',
      'country-code': 218,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:EC'
    },
    {
      'alpha-2': 'EG',
      name: 'Egypt',
      chineseName: '埃及',
      'country-code': 818,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Northern Africa',
      childArea: '北非',
      'ISO 3166-2': 'ISO 3166-2:EG'
    },
    {
      'alpha-2': 'SV',
      name: 'El Salvador',
      chineseName: '萨尔瓦多',
      'country-code': 222,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:SV'
    },
    {
      'alpha-2': 'GQ',
      name: 'Equatorial Guinea',
      chineseName: '赤道几内亚',
      'country-code': 226,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:GQ'
    },
    {
      'alpha-2': 'ER',
      name: 'Eritrea',
      chineseName: '厄立特里亚',
      'country-code': 232,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:ER'
    },
    {
      'alpha-2': 'EE',
      name: 'Estonia',
      chineseName: '爱沙尼亚',
      'country-code': 233,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Northern Europe',
      childArea: '北欧',
      'ISO 3166-2': 'ISO 3166-2:EE'
    },
    {
      'alpha-2': 'SZ',
      name: 'Eswatini',
      chineseName: '斯威士兰',
      'country-code': 748,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:SZ'
    },
    {
      'alpha-2': 'ET',
      name: 'Ethiopia',
      chineseName: '埃塞俄比亚',
      'country-code': 231,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:ET'
    },
    {
      'alpha-2': 'FK',
      name: 'Falkland Islands (Malvinas)',
      chineseName: '福克兰群岛',
      'country-code': 238,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:FK'
    },
    {
      'alpha-2': 'FO',
      name: 'Faroe Islands',
      chineseName: '法罗群岛',
      'country-code': 234,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Northern Europe',
      childArea: '北欧',
      'ISO 3166-2': 'ISO 3166-2:FO'
    },
    {
      'alpha-2': 'FJ',
      name: 'Fiji',
      chineseName: '斐济',
      'country-code': 242,
      region: 'Oceania',
      area: '大洋洲',
      'sub-region': 'Melanesia',
      childArea: '美拉尼西亚',
      'ISO 3166-2': 'ISO 3166-2:FJ'
    },
    {
      'alpha-2': 'FI',
      name: 'Finland',
      chineseName: '芬兰',
      'country-code': 246,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Northern Europe',
      childArea: '北欧',
      'ISO 3166-2': 'ISO 3166-2:FI'
    },
    {
      'alpha-2': 'FR',
      name: 'France',
      chineseName: '法国',
      'country-code': 250,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Western Europe',
      childArea: '西欧',
      'ISO 3166-2': 'ISO 3166-2:FR'
    },
    {
      'alpha-2': 'GF',
      name: 'French Guiana',
      chineseName: '法属圭亚那',
      'country-code': 254,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:GF'
    },
    {
      'alpha-2': 'PF',
      name: 'French Polynesia',
      chineseName: '法属波利尼西亚',
      'country-code': 258,
      region: 'Oceania',
      area: '大洋洲',
      'sub-region': 'Polynesia',
      childArea: '波利尼西亚',
      'ISO 3166-2': 'ISO 3166-2:PF'
    },
    {
      'alpha-2': 'TF',
      name: 'French Southern Territories',
      chineseName: '法属南部和南极领地',
      'country-code': 260,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:TF'
    },
    {
      'alpha-2': 'GA',
      name: 'Gabon',
      chineseName: '加蓬',
      'country-code': 266,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:GA'
    },
    {
      'alpha-2': 'GM',
      name: 'Gambia',
      chineseName: '冈比亚',
      'country-code': 270,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:GM'
    },
    {
      'alpha-2': 'GE',
      name: 'Georgia',
      chineseName: '格鲁吉亚',
      'country-code': 268,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Western Asia',
      childArea: '西亚',
      'ISO 3166-2': 'ISO 3166-2:GE'
    },
    {
      'alpha-2': 'DE',
      name: 'Germany',
      chineseName: '德国',
      'country-code': 276,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Western Europe',
      childArea: '西欧',
      'ISO 3166-2': 'ISO 3166-2:DE'
    },
    {
      'alpha-2': 'GH',
      name: 'Ghana',
      chineseName: '加纳',
      'country-code': 288,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:GH'
    },
    {
      'alpha-2': 'GI',
      name: 'Gibraltar',
      chineseName: '直布罗陀',
      'country-code': 292,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Southern Europe',
      childArea: '南欧',
      'ISO 3166-2': 'ISO 3166-2:GI'
    },
    {
      'alpha-2': 'GR',
      name: 'Greece',
      chineseName: '希腊',
      'country-code': 300,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Southern Europe',
      childArea: '南欧',
      'ISO 3166-2': 'ISO 3166-2:GR'
    },
    {
      'alpha-2': 'GL',
      name: 'Greenland',
      chineseName: '格陵兰',
      'country-code': 304,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Northern America',
      childArea: '北美',
      'ISO 3166-2': 'ISO 3166-2:GL'
    },
    {
      'alpha-2': 'GD',
      name: 'Grenada',
      chineseName: '格林纳达',
      'country-code': 308,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:GD'
    },
    {
      'alpha-2': 'GP',
      name: 'Guadeloupe',
      chineseName: '瓜德罗普',
      'country-code': 312,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:GP'
    },
    {
      'alpha-2': 'GU',
      name: 'Guam',
      chineseName: '关岛',
      'country-code': 316,
      region: 'Oceania',
      area: '大洋洲',
      'sub-region': 'Micronesia',
      childArea: '密克罗尼西亚',
      'ISO 3166-2': 'ISO 3166-2:GU'
    },
    {
      'alpha-2': 'GT',
      name: 'Guatemala',
      chineseName: '危地马拉',
      'country-code': 320,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:GT'
    },
    {
      'alpha-2': 'GG',
      name: 'Guernsey',
      chineseName: '根西',
      'country-code': 831,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Northern Europe',
      childArea: '北欧',
      'ISO 3166-2': 'ISO 3166-2:GG'
    },
    {
      'alpha-2': 'GN',
      name: 'Guinea',
      chineseName: '几内亚',
      'country-code': 324,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:GN'
    },
    {
      'alpha-2': 'GW',
      name: 'Guinea-Bissau',
      chineseName: '几内亚比绍',
      'country-code': 624,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:GW'
    },
    {
      'alpha-2': 'GY',
      name: 'Guyana',
      chineseName: '圭亚那',
      'country-code': 328,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:GY'
    },
    {
      'alpha-2': 'HT',
      name: 'Haiti',
      chineseName: '海地',
      'country-code': 332,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:HT'
    },
    {
      'alpha-2': 'HM',
      name: 'Heard Island and McDonald Islands',
      chineseName: '赫德岛和麦克唐纳群岛',
      'country-code': 334,
      region: 'Oceania',
      area: '大洋洲',
      'sub-region': 'Australia and New Zealand',
      childArea: '澳大利亚和新西兰',
      'ISO 3166-2': 'ISO 3166-2:HM'
    },
    {
      'alpha-2': 'VA',
      name: 'Holy See',
      chineseName: '梵蒂冈',
      'country-code': 336,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Southern Europe',
      childArea: '南欧',
      'ISO 3166-2': 'ISO 3166-2:VA'
    },
    {
      'alpha-2': 'HN',
      name: 'Honduras',
      chineseName: '洪都拉斯',
      'country-code': 340,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:HN'
    },
    {
      'alpha-2': 'HK',
      name: 'Hong Kong',
      chineseName: '中国香港',
      'country-code': 344,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Eastern Asia',
      childArea: '东亚',
      'ISO 3166-2': 'ISO 3166-2:HK'
    },
    {
      'alpha-2': 'HU',
      name: 'Hungary',
      chineseName: '匈牙利',
      'country-code': 348,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Eastern Europe',
      childArea: '东欧',
      'ISO 3166-2': 'ISO 3166-2:HU'
    },
    {
      'alpha-2': 'IS',
      name: 'Iceland',
      chineseName: '冰岛',
      'country-code': 352,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Northern Europe',
      childArea: '北欧',
      'ISO 3166-2': 'ISO 3166-2:IS'
    },
    {
      'alpha-2': 'IN',
      name: 'India',
      chineseName: '印度',
      'country-code': 356,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Southern Asia',
      childArea: '南亚',
      'ISO 3166-2': 'ISO 3166-2:IN'
    },
    {
      'alpha-2': 'ID',
      name: 'Indonesia',
      chineseName: '印度尼西亚',
      'country-code': 360,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'South-eastern Asia',
      childArea: '东南亚',
      'ISO 3166-2': 'ISO 3166-2:ID'
    },
    {
      'alpha-2': 'IR',
      name: 'Iran, Islamic Republic of',
      chineseName: '伊朗',
      'country-code': 364,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Southern Asia',
      childArea: '南亚',
      'ISO 3166-2': 'ISO 3166-2:IR'
    },
    {
      'alpha-2': 'IQ',
      name: 'Iraq',
      chineseName: '伊拉克',
      'country-code': 368,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Western Asia',
      childArea: '西亚',
      'ISO 3166-2': 'ISO 3166-2:IQ'
    },
    {
      'alpha-2': 'IE',
      name: 'Ireland',
      chineseName: '爱尔兰',
      'country-code': 372,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Northern Europe',
      childArea: '北欧',
      'ISO 3166-2': 'ISO 3166-2:IE'
    },
    {
      'alpha-2': 'IM',
      name: 'Isle of Man',
      chineseName: '马恩岛',
      'country-code': 833,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Northern Europe',
      childArea: '北欧',
      'ISO 3166-2': 'ISO 3166-2:IM'
    },
    {
      'alpha-2': 'IL',
      name: 'Israel',
      chineseName: '以色列',
      'country-code': 376,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Western Asia',
      childArea: '西亚',
      'ISO 3166-2': 'ISO 3166-2:IL'
    },
    {
      'alpha-2': 'IT',
      name: 'Italy',
      chineseName: '意大利',
      'country-code': 380,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Southern Europe',
      childArea: '南欧',
      'ISO 3166-2': 'ISO 3166-2:IT'
    },
    {
      'alpha-2': 'JM',
      name: 'Jamaica',
      chineseName: '牙买加',
      'country-code': 388,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:JM'
    },
    {
      'alpha-2': 'JP',
      name: 'Japan',
      chineseName: '日本',
      'country-code': 392,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Eastern Asia',
      childArea: '东亚',
      'ISO 3166-2': 'ISO 3166-2:JP'
    },
    {
      'alpha-2': 'JE',
      name: 'Jersey',
      chineseName: '泽西',
      'country-code': 832,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Northern Europe',
      childArea: '北欧',
      'ISO 3166-2': 'ISO 3166-2:JE'
    },
    {
      'alpha-2': 'JO',
      name: 'Jordan',
      chineseName: '约旦',
      'country-code': 400,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Western Asia',
      childArea: '西亚',
      'ISO 3166-2': 'ISO 3166-2:JO'
    },
    {
      'alpha-2': 'KZ',
      name: 'Kazakhstan',
      chineseName: '哈萨克斯坦',
      'country-code': 398,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Central Asia',
      childArea: '中亚',
      'ISO 3166-2': 'ISO 3166-2:KZ'
    },
    {
      'alpha-2': 'KE',
      name: 'Kenya',
      chineseName: '肯尼亚',
      'country-code': 404,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:KE'
    },
    {
      'alpha-2': 'KI',
      name: 'Kiribati',
      chineseName: '基里巴斯',
      'country-code': 296,
      region: 'Oceania',
      area: '大洋洲',
      'sub-region': 'Micronesia',
      childArea: '密克罗尼西亚',
      'ISO 3166-2': 'ISO 3166-2:KI'
    },
    {
      'alpha-2': 'KP',
      name: "Korea, Democratic People's Republic of",
      chineseName: '朝鲜',
      'country-code': 408,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Eastern Asia',
      childArea: '东亚',
      'ISO 3166-2': 'ISO 3166-2:KP'
    },
    {
      'alpha-2': 'KR',
      name: 'Korea, Republic of',
      chineseName: '韩国',
      'country-code': 410,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Eastern Asia',
      childArea: '东亚',
      'ISO 3166-2': 'ISO 3166-2:KR'
    },
    {
      'alpha-2': 'KW',
      name: 'Kuwait',
      chineseName: '科威特',
      'country-code': 414,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Western Asia',
      childArea: '西亚',
      'ISO 3166-2': 'ISO 3166-2:KW'
    },
    {
      'alpha-2': 'KG',
      name: 'Kyrgyzstan',
      chineseName: '吉尔吉斯斯坦',
      'country-code': 417,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Central Asia',
      childArea: '中亚',
      'ISO 3166-2': 'ISO 3166-2:KG'
    },
    {
      'alpha-2': 'LA',
      name: "Lao People's Democratic Republic",
      chineseName: '老挝',
      'country-code': 418,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'South-eastern Asia',
      childArea: '东南亚',
      'ISO 3166-2': 'ISO 3166-2:LA'
    },
    {
      'alpha-2': 'LV',
      name: 'Latvia',
      chineseName: '拉脱维亚',
      'country-code': 428,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Northern Europe',
      childArea: '北欧',
      'ISO 3166-2': 'ISO 3166-2:LV'
    },
    {
      'alpha-2': 'LB',
      name: 'Lebanon',
      chineseName: '黎巴嫩',
      'country-code': 422,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Western Asia',
      childArea: '西亚',
      'ISO 3166-2': 'ISO 3166-2:LB'
    },
    {
      'alpha-2': 'LS',
      name: 'Lesotho',
      chineseName: '莱索托',
      'country-code': 426,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:LS'
    },
    {
      'alpha-2': 'LR',
      name: 'Liberia',
      chineseName: '利比里亚',
      'country-code': 430,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:LR'
    },
    {
      'alpha-2': 'LY',
      name: 'Libya',
      chineseName: '利比亚',
      'country-code': 434,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Northern Africa',
      childArea: '北非',
      'ISO 3166-2': 'ISO 3166-2:LY'
    },
    {
      'alpha-2': 'LI',
      name: 'Liechtenstein',
      chineseName: '列支敦士登',
      'country-code': 438,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Western Europe',
      childArea: '西欧',
      'ISO 3166-2': 'ISO 3166-2:LI'
    },
    {
      'alpha-2': 'LT',
      name: 'Lithuania',
      chineseName: '立陶宛',
      'country-code': 440,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Northern Europe',
      childArea: '北欧',
      'ISO 3166-2': 'ISO 3166-2:LT'
    },
    {
      'alpha-2': 'LU',
      name: 'Luxembourg',
      chineseName: '卢森堡',
      'country-code': 442,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Western Europe',
      childArea: '西欧',
      'ISO 3166-2': 'ISO 3166-2:LU'
    },
    {
      'alpha-2': 'MO',
      name: 'Macao',
      chineseName: '中国澳门',
      'country-code': 446,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Eastern Asia',
      childArea: '东亚',
      'ISO 3166-2': 'ISO 3166-2:MO'
    },
    {
      'alpha-2': 'MG',
      name: 'Madagascar',
      chineseName: '马达加斯加',
      'country-code': 450,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:MG'
    },
    {
      'alpha-2': 'MW',
      name: 'Malawi',
      chineseName: '马拉维',
      'country-code': 454,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:MW'
    },
    {
      'alpha-2': 'MY',
      name: 'Malaysia',
      chineseName: '马来西亚',
      'country-code': 458,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'South-eastern Asia',
      childArea: '东南亚',
      'ISO 3166-2': 'ISO 3166-2:MY'
    },
    {
      'alpha-2': 'MV',
      name: 'Maldives',
      chineseName: '马尔代夫',
      'country-code': 462,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Southern Asia',
      childArea: '南亚',
      'ISO 3166-2': 'ISO 3166-2:MV'
    },
    {
      'alpha-2': 'ML',
      name: 'Mali',
      chineseName: '马里',
      'country-code': 466,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:ML'
    },
    {
      'alpha-2': 'MT',
      name: 'Malta',
      chineseName: '马耳他',
      'country-code': 470,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Southern Europe',
      childArea: '南欧',
      'ISO 3166-2': 'ISO 3166-2:MT'
    },
    {
      'alpha-2': 'MH',
      name: 'Marshall Islands',
      chineseName: '马绍尔群岛',
      'country-code': 584,
      region: 'Oceania',
      area: '大洋洲',
      'sub-region': 'Micronesia',
      childArea: '密克罗尼西亚',
      'ISO 3166-2': 'ISO 3166-2:MH'
    },
    {
      'alpha-2': 'MQ',
      name: 'Martinique',
      chineseName: '马提尼克',
      'country-code': 474,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:MQ'
    },
    {
      'alpha-2': 'MR',
      name: 'Mauritania',
      chineseName: '毛里塔尼亚',
      'country-code': 478,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:MR'
    },
    {
      'alpha-2': 'MU',
      name: 'Mauritius',
      chineseName: '毛里求斯',
      'country-code': 480,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:MU'
    },
    {
      'alpha-2': 'YT',
      name: 'Mayotte',
      chineseName: '马约特',
      'country-code': 175,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:YT'
    },
    {
      'alpha-2': 'MX',
      name: 'Mexico',
      chineseName: '墨西哥',
      'country-code': 484,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:MX'
    },
    {
      'alpha-2': 'FM',
      name: 'Micronesia, Federated States of',
      chineseName: '密克罗尼西亚联邦',
      'country-code': 583,
      region: 'Oceania',
      area: '大洋洲',
      'sub-region': 'Micronesia',
      childArea: '密克罗尼西亚',
      'ISO 3166-2': 'ISO 3166-2:FM'
    },
    {
      'alpha-2': 'MD',
      name: 'Moldova, Republic of',
      chineseName: '摩尔多瓦',
      'country-code': 498,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Eastern Europe',
      childArea: '东欧',
      'ISO 3166-2': 'ISO 3166-2:MD'
    },
    {
      'alpha-2': 'MC',
      name: 'Monaco',
      chineseName: '摩纳哥',
      'country-code': 492,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Western Europe',
      childArea: '西欧',
      'ISO 3166-2': 'ISO 3166-2:MC'
    },
    {
      'alpha-2': 'MN',
      name: 'Mongolia',
      chineseName: '蒙古',
      'country-code': 496,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Eastern Asia',
      childArea: '东亚',
      'ISO 3166-2': 'ISO 3166-2:MN'
    },
    {
      'alpha-2': 'ME',
      name: 'Montenegro',
      chineseName: '黑山',
      'country-code': 499,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Southern Europe',
      childArea: '南欧',
      'ISO 3166-2': 'ISO 3166-2:ME'
    },
    {
      'alpha-2': 'MS',
      name: 'Montserrat',
      chineseName: '蒙特塞拉特',
      'country-code': 500,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:MS'
    },
    {
      'alpha-2': 'MA',
      name: 'Morocco',
      chineseName: '摩洛哥',
      'country-code': 504,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Northern Africa',
      childArea: '北非',
      'ISO 3166-2': 'ISO 3166-2:MA'
    },
    {
      'alpha-2': 'MZ',
      name: 'Mozambique',
      chineseName: '莫桑比克',
      'country-code': 508,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:MZ'
    },
    {
      'alpha-2': 'MM',
      name: 'Myanmar',
      chineseName: '缅甸',
      'country-code': 104,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'South-eastern Asia',
      childArea: '东南亚',
      'ISO 3166-2': 'ISO 3166-2:MM'
    },
    {
      'alpha-2': '',
      name: 'Namibia',
      chineseName: '纳米比亚',
      'country-code': 516,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:NA'
    },
    {
      'alpha-2': 'NR',
      name: 'Nauru',
      chineseName: '瑙鲁',
      'country-code': 520,
      region: 'Oceania',
      area: '大洋洲',
      'sub-region': 'Micronesia',
      childArea: '密克罗尼西亚',
      'ISO 3166-2': 'ISO 3166-2:NR'
    },
    {
      'alpha-2': 'NP',
      name: 'Nepal',
      chineseName: '尼泊尔',
      'country-code': 524,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Southern Asia',
      childArea: '南亚',
      'ISO 3166-2': 'ISO 3166-2:NP'
    },
    {
      'alpha-2': 'NL',
      name: 'Netherlands, Kingdom of the',
      chineseName: '荷兰',
      'country-code': 528,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Western Europe',
      childArea: '西欧',
      'ISO 3166-2': 'ISO 3166-2:NL'
    },
    {
      'alpha-2': 'NC',
      name: 'New Caledonia',
      chineseName: '新喀里多尼亚',
      'country-code': 540,
      region: 'Oceania',
      area: '大洋洲',
      'sub-region': 'Melanesia',
      childArea: '美拉尼西亚',
      'ISO 3166-2': 'ISO 3166-2:NC'
    },
    {
      'alpha-2': 'NZ',
      name: 'New Zealand',
      chineseName: '新西兰',
      'country-code': 554,
      region: 'Oceania',
      area: '大洋洲',
      'sub-region': 'Australia and New Zealand',
      childArea: '澳大利亚和新西兰',
      'ISO 3166-2': 'ISO 3166-2:NZ'
    },
    {
      'alpha-2': 'NI',
      name: 'Nicaragua',
      chineseName: '尼加拉瓜',
      'country-code': 558,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:NI'
    },
    {
      'alpha-2': 'NE',
      name: 'Niger',
      chineseName: '尼日尔',
      'country-code': 562,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:NE'
    },
    {
      'alpha-2': 'NG',
      name: 'Nigeria',
      chineseName: '尼日利亚',
      'country-code': 566,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:NG'
    },
    {
      'alpha-2': 'NU',
      name: 'Niue',
      chineseName: '纽埃',
      'country-code': 570,
      region: 'Oceania',
      area: '大洋洲',
      'sub-region': 'Polynesia',
      childArea: '波利尼西亚',
      'ISO 3166-2': 'ISO 3166-2:NU'
    },
    {
      'alpha-2': 'NF',
      name: 'Norfolk Island',
      chineseName: '诺福克岛',
      'country-code': 574,
      region: 'Oceania',
      area: '大洋洲',
      'sub-region': 'Australia and New Zealand',
      childArea: '澳大利亚和新西兰',
      'ISO 3166-2': 'ISO 3166-2:NF'
    },
    {
      'alpha-2': 'MK',
      name: 'North Macedonia',
      chineseName: '北马其顿',
      'country-code': 807,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Southern Europe',
      childArea: '南欧',
      'ISO 3166-2': 'ISO 3166-2:MK'
    },
    {
      'alpha-2': 'MP',
      name: 'Northern Mariana Islands',
      chineseName: '北马里亚纳群岛',
      'country-code': 580,
      region: 'Oceania',
      area: '大洋洲',
      'sub-region': 'Micronesia',
      childArea: '密克罗尼西亚',
      'ISO 3166-2': 'ISO 3166-2:MP'
    },
    {
      'alpha-2': 'NO',
      name: 'Norway',
      chineseName: '挪威',
      'country-code': 578,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Northern Europe',
      childArea: '北欧',
      'ISO 3166-2': 'ISO 3166-2:NO'
    },
    {
      'alpha-2': 'OM',
      name: 'Oman',
      chineseName: '阿曼',
      'country-code': 512,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Western Asia',
      childArea: '西亚',
      'ISO 3166-2': 'ISO 3166-2:OM'
    },
    {
      'alpha-2': 'PK',
      name: 'Pakistan',
      chineseName: '巴基斯坦',
      'country-code': 586,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Southern Asia',
      childArea: '南亚',
      'ISO 3166-2': 'ISO 3166-2:PK'
    },
    {
      'alpha-2': 'PW',
      name: 'Palau',
      chineseName: '帕劳',
      'country-code': 585,
      region: 'Oceania',
      area: '大洋洲',
      'sub-region': 'Micronesia',
      childArea: '密克罗尼西亚',
      'ISO 3166-2': 'ISO 3166-2:PW'
    },
    {
      'alpha-2': 'PS',
      name: 'Palestine, State of',
      chineseName: '巴勒斯坦',
      'country-code': 275,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Western Asia',
      childArea: '西亚',
      'ISO 3166-2': 'ISO 3166-2:PS'
    },
    {
      'alpha-2': 'PA',
      name: 'Panama',
      chineseName: '巴拿马',
      'country-code': 591,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:PA'
    },
    {
      'alpha-2': 'PG',
      name: 'Papua New Guinea',
      chineseName: '巴布亚新几内亚',
      'country-code': 598,
      region: 'Oceania',
      area: '大洋洲',
      'sub-region': 'Melanesia',
      childArea: '美拉尼西亚',
      'ISO 3166-2': 'ISO 3166-2:PG'
    },
    {
      'alpha-2': 'PY',
      name: 'Paraguay',
      chineseName: '巴拉圭',
      'country-code': 600,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:PY'
    },
    {
      'alpha-2': 'PE',
      name: 'Peru',
      chineseName: '秘鲁',
      'country-code': 604,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:PE'
    },
    {
      'alpha-2': 'PH',
      name: 'Philippines',
      chineseName: '菲律宾',
      'country-code': 608,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'South-eastern Asia',
      childArea: '东南亚',
      'ISO 3166-2': 'ISO 3166-2:PH'
    },
    {
      'alpha-2': 'PN',
      name: 'Pitcairn',
      chineseName: '皮特凯恩群岛',
      'country-code': 612,
      region: 'Oceania',
      area: '大洋洲',
      'sub-region': 'Polynesia',
      childArea: '波利尼西亚',
      'ISO 3166-2': 'ISO 3166-2:PN'
    },
    {
      'alpha-2': 'PL',
      name: 'Poland',
      chineseName: '波兰',
      'country-code': 616,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Eastern Europe',
      childArea: '东欧',
      'ISO 3166-2': 'ISO 3166-2:PL'
    },
    {
      'alpha-2': 'PT',
      name: 'Portugal',
      chineseName: '葡萄牙',
      'country-code': 620,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Southern Europe',
      childArea: '南欧',
      'ISO 3166-2': 'ISO 3166-2:PT'
    },
    {
      'alpha-2': 'PR',
      name: 'Puerto Rico',
      chineseName: '波多黎各',
      'country-code': 630,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:PR'
    },
    {
      'alpha-2': 'QA',
      name: 'Qatar',
      chineseName: '卡塔尔',
      'country-code': 634,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Western Asia',
      childArea: '西亚',
      'ISO 3166-2': 'ISO 3166-2:QA'
    },
    {
      'alpha-2': 'RE',
      name: 'Réunion',
      chineseName: '留尼汪',
      'country-code': 638,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:RE'
    },
    {
      'alpha-2': 'RO',
      name: 'Romania',
      chineseName: '罗马尼亚',
      'country-code': 642,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Eastern Europe',
      childArea: '东欧',
      'ISO 3166-2': 'ISO 3166-2:RO'
    },
    {
      'alpha-2': 'RU',
      name: 'Russian Federation',
      chineseName: '俄罗斯',
      'country-code': 643,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Eastern Europe',
      childArea: '东欧',
      'ISO 3166-2': 'ISO 3166-2:RU'
    },
    {
      'alpha-2': 'RW',
      name: 'Rwanda',
      chineseName: '卢旺达',
      'country-code': 646,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:RW'
    },
    {
      'alpha-2': 'BL',
      name: 'Saint Barthélemy',
      chineseName: '圣巴泰勒米',
      'country-code': 652,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:BL'
    },
    {
      'alpha-2': 'SH',
      name: 'Saint Helena, Ascension and Tristan da Cunha',
      chineseName: '圣赫勒拿、阿森松和特里斯坦-达库尼亚',
      'country-code': 654,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:SH'
    },
    {
      'alpha-2': 'KN',
      name: 'Saint Kitts and Nevis',
      chineseName: '圣基茨和尼维斯',
      'country-code': 659,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:KN'
    },
    {
      'alpha-2': 'LC',
      name: 'Saint Lucia',
      chineseName: '圣卢西亚',
      'country-code': 662,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:LC'
    },
    {
      'alpha-2': 'MF',
      name: 'Saint Martin (French part)',
      chineseName: '法属圣马丁',
      'country-code': 663,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:MF'
    },
    {
      'alpha-2': 'PM',
      name: 'Saint Pierre and Miquelon',
      chineseName: '圣皮埃尔和密克隆',
      'country-code': 666,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Northern America',
      childArea: '北美',
      'ISO 3166-2': 'ISO 3166-2:PM'
    },
    {
      'alpha-2': 'VC',
      name: 'Saint Vincent and the Grenadines',
      chineseName: '圣文森特和格林纳丁斯',
      'country-code': 670,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:VC'
    },
    {
      'alpha-2': 'WS',
      name: 'Samoa',
      chineseName: '萨摩亚',
      'country-code': 882,
      region: 'Oceania',
      area: '大洋洲',
      'sub-region': 'Polynesia',
      childArea: '波利尼西亚',
      'ISO 3166-2': 'ISO 3166-2:WS'
    },
    {
      'alpha-2': 'SM',
      name: 'San Marino',
      chineseName: '圣马力诺',
      'country-code': 674,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Southern Europe',
      childArea: '南欧',
      'ISO 3166-2': 'ISO 3166-2:SM'
    },
    {
      'alpha-2': 'ST',
      name: 'Sao Tome and Principe',
      chineseName: '圣多美和普林西比',
      'country-code': 678,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:ST'
    },
    {
      'alpha-2': 'SA',
      name: 'Saudi Arabia',
      chineseName: '沙特阿拉伯',
      'country-code': 682,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Western Asia',
      childArea: '西亚',
      'ISO 3166-2': 'ISO 3166-2:SA'
    },
    {
      'alpha-2': 'SN',
      name: 'Senegal',
      chineseName: '塞内加尔',
      'country-code': 686,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:SN'
    },
    {
      'alpha-2': 'RS',
      name: 'Serbia',
      chineseName: '塞尔维亚',
      'country-code': 688,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Southern Europe',
      childArea: '南欧',
      'ISO 3166-2': 'ISO 3166-2:RS'
    },
    {
      'alpha-2': 'SC',
      name: 'Seychelles',
      chineseName: '塞舌尔',
      'country-code': 690,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:SC'
    },
    {
      'alpha-2': 'SL',
      name: 'Sierra Leone',
      chineseName: '塞拉利昂',
      'country-code': 694,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:SL'
    },
    {
      'alpha-2': 'SG',
      name: 'Singapore',
      chineseName: '新加坡',
      'country-code': 702,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'South-eastern Asia',
      childArea: '东南亚',
      'ISO 3166-2': 'ISO 3166-2:SG'
    },
    {
      'alpha-2': 'SX',
      name: 'Sint Maarten (Dutch part)',
      chineseName: '荷属圣马丁',
      'country-code': 534,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:SX'
    },
    {
      'alpha-2': 'SK',
      name: 'Slovakia',
      chineseName: '斯洛伐克',
      'country-code': 703,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Eastern Europe',
      childArea: '东欧',
      'ISO 3166-2': 'ISO 3166-2:SK'
    },
    {
      'alpha-2': 'SI',
      name: 'Slovenia',
      chineseName: '斯洛文尼亚',
      'country-code': 705,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Southern Europe',
      childArea: '南欧',
      'ISO 3166-2': 'ISO 3166-2:SI'
    },
    {
      'alpha-2': 'SB',
      name: 'Solomon Islands',
      chineseName: '所罗门群岛',
      'country-code': 90,
      region: 'Oceania',
      area: '大洋洲',
      'sub-region': 'Melanesia',
      childArea: '美拉尼西亚',
      'ISO 3166-2': 'ISO 3166-2:SB'
    },
    {
      'alpha-2': 'SO',
      name: 'Somalia',
      chineseName: '索马里',
      'country-code': 706,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:SO'
    },
    {
      'alpha-2': 'ZA',
      name: 'South Africa',
      chineseName: '南非',
      'country-code': 710,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:ZA'
    },
    {
      'alpha-2': 'GS',
      name: 'South Georgia and the South Sandwich Islands',
      chineseName: '南乔治亚和南桑威奇群岛',
      'country-code': 239,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:GS'
    },
    {
      'alpha-2': 'SS',
      name: 'South Sudan',
      chineseName: '南苏丹',
      'country-code': 728,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:SS'
    },
    {
      'alpha-2': 'ES',
      name: 'Spain',
      chineseName: '西班牙',
      'country-code': 724,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Southern Europe',
      childArea: '南欧',
      'ISO 3166-2': 'ISO 3166-2:ES'
    },
    {
      'alpha-2': 'LK',
      name: 'Sri Lanka',
      chineseName: '斯里兰卡',
      'country-code': 144,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Southern Asia',
      childArea: '南亚',
      'ISO 3166-2': 'ISO 3166-2:LK'
    },
    {
      'alpha-2': 'SD',
      name: 'Sudan',
      chineseName: '苏丹',
      'country-code': 729,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Northern Africa',
      childArea: '北非',
      'ISO 3166-2': 'ISO 3166-2:SD'
    },
    {
      'alpha-2': 'SR',
      name: 'Suriname',
      chineseName: '苏里南',
      'country-code': 740,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:SR'
    },
    {
      'alpha-2': 'SJ',
      name: 'Svalbard and Jan Mayen',
      chineseName: '斯瓦尔巴和扬马延',
      'country-code': 744,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Northern Europe',
      childArea: '北欧',
      'ISO 3166-2': 'ISO 3166-2:SJ'
    },
    {
      'alpha-2': 'SE',
      name: 'Sweden',
      chineseName: '瑞典',
      'country-code': 752,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Northern Europe',
      childArea: '北欧',
      'ISO 3166-2': 'ISO 3166-2:SE'
    },
    {
      'alpha-2': 'CH',
      name: 'Switzerland',
      chineseName: '瑞士',
      'country-code': 756,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Western Europe',
      childArea: '西欧',
      'ISO 3166-2': 'ISO 3166-2:CH'
    },
    {
      'alpha-2': 'SY',
      name: 'Syrian Arab Republic',
      chineseName: '叙利亚',
      'country-code': 760,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Western Asia',
      childArea: '西亚',
      'ISO 3166-2': 'ISO 3166-2:SY'
    },
    {
      'alpha-2': 'TW',
      name: 'Taiwan, Province of China',
      chineseName: '中国台湾',
      'country-code': 158,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Eastern Asia',
      childArea: '东亚',
      'ISO 3166-2': 'ISO 3166-2:TW'
    },
    {
      'alpha-2': 'TJ',
      name: 'Tajikistan',
      chineseName: '塔吉克斯坦',
      'country-code': 762,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Central Asia',
      childArea: '中亚',
      'ISO 3166-2': 'ISO 3166-2:TJ'
    },
    {
      'alpha-2': 'TZ',
      name: 'Tanzania, United Republic of',
      chineseName: '坦桑尼亚',
      'country-code': 834,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:TZ'
    },
    {
      'alpha-2': 'TH',
      name: 'Thailand',
      chineseName: '泰国',
      'country-code': 764,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'South-eastern Asia',
      childArea: '东南亚',
      'ISO 3166-2': 'ISO 3166-2:TH'
    },
    {
      'alpha-2': 'TL',
      name: 'Timor-Leste',
      chineseName: '东帝汶',
      'country-code': 626,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'South-eastern Asia',
      childArea: '东南亚',
      'ISO 3166-2': 'ISO 3166-2:TL'
    },
    {
      'alpha-2': 'TG',
      name: 'Togo',
      chineseName: '多哥',
      'country-code': 768,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:TG'
    },
    {
      'alpha-2': 'TK',
      name: 'Tokelau',
      chineseName: '托克劳',
      'country-code': 772,
      region: 'Oceania',
      area: '大洋洲',
      'sub-region': 'Polynesia',
      childArea: '波利尼西亚',
      'ISO 3166-2': 'ISO 3166-2:TK'
    },
    {
      'alpha-2': 'TO',
      name: 'Tonga',
      chineseName: '汤加',
      'country-code': 776,
      region: 'Oceania',
      area: '大洋洲',
      'sub-region': 'Polynesia',
      childArea: '波利尼西亚',
      'ISO 3166-2': 'ISO 3166-2:TO'
    },
    {
      'alpha-2': 'TT',
      name: 'Trinidad and Tobago',
      chineseName: '特立尼达和多巴哥',
      'country-code': 780,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:TT'
    },
    {
      'alpha-2': 'TN',
      name: 'Tunisia',
      chineseName: '突尼斯',
      'country-code': 788,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Northern Africa',
      childArea: '北非',
      'ISO 3166-2': 'ISO 3166-2:TN'
    },
    {
      'alpha-2': 'TR',
      name: 'Türkiye',
      chineseName: '土耳其',
      'country-code': 792,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Western Asia',
      childArea: '西亚',
      'ISO 3166-2': 'ISO 3166-2:TR'
    },
    {
      'alpha-2': 'TM',
      name: 'Turkmenistan',
      chineseName: '土库曼斯坦',
      'country-code': 795,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Central Asia',
      childArea: '中亚',
      'ISO 3166-2': 'ISO 3166-2:TM'
    },
    {
      'alpha-2': 'TC',
      name: 'Turks and Caicos Islands',
      chineseName: '特克斯和凯科斯群岛',
      'country-code': 796,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:TC'
    },
    {
      'alpha-2': 'TV',
      name: 'Tuvalu',
      chineseName: '图瓦卢',
      'country-code': 798,
      region: 'Oceania',
      area: '大洋洲',
      'sub-region': 'Polynesia',
      childArea: '波利尼西亚',
      'ISO 3166-2': 'ISO 3166-2:TV'
    },
    {
      'alpha-2': 'UG',
      name: 'Uganda',
      chineseName: '乌干达',
      'country-code': 800,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:UG'
    },
    {
      'alpha-2': 'UA',
      name: 'Ukraine',
      chineseName: '乌克兰',
      'country-code': 804,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Eastern Europe',
      childArea: '东欧',
      'ISO 3166-2': 'ISO 3166-2:UA'
    },
    {
      'alpha-2': 'AE',
      name: 'United Arab Emirates',
      chineseName: '阿联酋',
      'country-code': 784,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Western Asia',
      childArea: '西亚',
      'ISO 3166-2': 'ISO 3166-2:AE'
    },
    {
      'alpha-2': 'GB',
      name: 'United Kingdom of Great Britain and Northern Ireland',
      chineseName: '英国',
      'country-code': 826,
      region: 'Europe',
      area: '欧洲',
      'sub-region': 'Northern Europe',
      childArea: '北欧',
      'ISO 3166-2': 'ISO 3166-2:GB'
    },
    {
      'alpha-2': 'US',
      name: 'United States of America',
      chineseName: '美国',
      'country-code': 840,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Northern America',
      childArea: '北美',
      'ISO 3166-2': 'ISO 3166-2:US'
    },
    {
      'alpha-2': 'UM',
      name: 'United States Minor Outlying Islands',
      chineseName: '美国本土外小岛屿',
      'country-code': 581,
      region: 'Oceania',
      area: '大洋洲',
      'sub-region': 'Micronesia',
      childArea: '密克罗尼西亚',
      'ISO 3166-2': 'ISO 3166-2:UM'
    },
    {
      'alpha-2': 'UY',
      name: 'Uruguay',
      chineseName: '乌拉圭',
      'country-code': 858,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:UY'
    },
    {
      'alpha-2': 'UZ',
      name: 'Uzbekistan',
      chineseName: '乌兹别克斯坦',
      'country-code': 860,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Central Asia',
      childArea: '中亚',
      'ISO 3166-2': 'ISO 3166-2:UZ'
    },
    {
      'alpha-2': 'VU',
      name: 'Vanuatu',
      chineseName: '瓦努阿图',
      'country-code': 548,
      region: 'Oceania',
      area: '大洋洲',
      'sub-region': 'Melanesia',
      childArea: '美拉尼西亚',
      'ISO 3166-2': 'ISO 3166-2:VU'
    },
    {
      'alpha-2': 'VE',
      name: 'Venezuela, Bolivarian Republic of',
      chineseName: '委内瑞拉',
      'country-code': 862,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:VE'
    },
    {
      'alpha-2': 'VN',
      name: 'Viet Nam',
      chineseName: '越南',
      'country-code': 704,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'South-eastern Asia',
      childArea: '东南亚',
      'ISO 3166-2': 'ISO 3166-2:VN'
    },
    {
      'alpha-2': 'VG',
      name: 'Virgin Islands (British)',
      chineseName: '英属维尔京群岛',
      'country-code': 92,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:VG'
    },
    {
      'alpha-2': 'VI',
      name: 'Virgin Islands (U.S.)',
      chineseName: '美属维尔京群岛',
      'country-code': 850,
      region: 'Americas',
      area: '美洲',
      'sub-region': 'Latin America and the Caribbean',
      childArea: '拉丁美洲与加勒比',
      'ISO 3166-2': 'ISO 3166-2:VI'
    },
    {
      'alpha-2': 'WF',
      name: 'Wallis and Futuna',
      chineseName: '瓦利斯和富图纳',
      'country-code': 876,
      region: 'Oceania',
      area: '大洋洲',
      'sub-region': 'Polynesia',
      childArea: '波利尼西亚',
      'ISO 3166-2': 'ISO 3166-2:WF'
    },
    {
      'alpha-2': 'EH',
      name: 'Western Sahara',
      chineseName: '西撒哈拉',
      'country-code': 732,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Northern Africa',
      childArea: '北非',
      'ISO 3166-2': 'ISO 3166-2:EH'
    },
    {
      'alpha-2': 'YE',
      name: 'Yemen',
      chineseName: '也门',
      'country-code': 887,
      region: 'Asia',
      area: '亚洲',
      'sub-region': 'Western Asia',
      childArea: '西亚',
      'ISO 3166-2': 'ISO 3166-2:YE'
    },
    {
      'alpha-2': 'ZM',
      name: 'Zambia',
      chineseName: '赞比亚',
      'country-code': 894,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:ZM'
    },
    {
      'alpha-2': 'ZW',
      name: 'Zimbabwe',
      chineseName: '津巴布韦',
      'country-code': 716,
      region: 'Africa',
      area: '非洲',
      'sub-region': 'Sub-Saharan Africa',
      childArea: '撒哈拉以南非洲',
      'ISO 3166-2': 'ISO 3166-2:ZW'
    }
  ],
  // 应急支撑管理
  emergency_status_opt: [
    { value: 0, label: '未启用' },
    {
      value: 1,
      label: '启用'
    }
  ],
  // 通道架构
  topo_opt: {
    // 0: [
    //   {
    //     label: "自定义",
    //     value: 0,
    //   },
    // ],
    // SJHC
    1: [
      // VPS，TLS
      // {
      //   label: '入口加密型通道',
      //   value: 101
      // },
      // // VPS，TCP
      // {
      //   label: '入口非加密型通道',
      //   value: 102
      // }
      {
        label: '云主机YB通道',
        value: 101
      },
      // VPS，TCP
      {
        label: '云专线YB通道',
        value: 103
      }
    ],
    // XXTSVPS，SOCKS5
    2: [
      {
        label: '云主机标准协议通道',
        value: 201
      }
      //{
      //  label: '云主机私有协议通道',
      //  value: 202
      //},
      //{
      // label: '密网通道',
      // value: 203
      //}
    ],
    // ZLKZ，
    3: [
      // 国内住宅+机场+国外住宅，SOCKS5
      // {
      //   label: '匿名网络（Tor）通道',
      //   value: 304
      // },
      // VPS+机场+国外住宅，SOCKS5
      {
        label: '云主机与代理混合通道',
        value: 302
      },
      // VPS，SOCKS5
      {
        label: '云主机YB通道',
        value: 303
      }
    ],
    4: [
      // 国内住宅+机场+国外住宅，SOCKS5
      // {
      //   label: '匿名网络（Tor）通道',
      //   value: 304
      // },
      // VPS+机场+国外住宅，SOCKS5
      {
        label: '云主机与代理混合通道',
        value: 302
      },
      // VPS，SOCKS5
      {
        label: '云主机YB通道',
        value: 303
      }
    ]
  },
  // 可选接入协议
  proxy_protocol_opt_map: {
    2: [
      {
        label: 'HTTP(S)',
        value: 1
      },
      {
        label: 'SOCKS5',
        value: 2
      }
    ],
    1: [
      {
        label: 'TCP',
        value: 3
      },
      {
        label: 'TLS',
        value: 4
      },
      {
        label: 'UDP',
        value: 19
      }
    ],
    3: [
      {
        label: 'SOCKS5',
        value: 2
      },
      {
        label: 'HTTP(S)',
        value: 1
      }
    ],
    4: [
      {
        label: 'SOCKS5',
        value: 2
      },
      {
        label: 'HTTP(S)',
        value: 1
      }
    ]
  },
  // 是否配置应急链路
  simpleDict: [
    {
      label: '是',
      value: true
    },
    {
      label: '否',
      value: false
    }
  ],

  hop_wanted_protocol_opt30: {
    1: 'HTTP',
    2: 'Socks5',
    5: 'TLS',
    6: 'WS',
    7: 'ShadowSocks',
    8: 'TLS转发'
  },
  // 目标协议列表部署主机中继转发协议
  hop_wanted_protocol_opt: [
    {
      label: 'HTTP',
      value: 1
    },
    {
      label: 'SOCKS5',
      value: 2
    },
    {
      label: 'TLS',
      value: 5
    },
    {
      label: 'WS',
      value: 6
    },
    {
      label: 'SS',
      value: 7
    },
    {
      label: 'TLS转发',
      value: 8
    }
  ],
  // 跳跃点转发模式
  hop_forward_opt: [
    {
      label: '不限制',
      value: 0
    },
    {
      label: '逐跳转发',
      value: 1
    },
    {
      label: '嵌套转发',
      value: 2
    }
  ],
  channel_forward_opt: [
    {
      label: '逐跳转发',
      value: 2
    },
    {
      label: '嵌套转发',
      value: 3
    }
  ],
  // 策略模板
  strategy_opt: [
    {
      label: '内置策略',
      value: 0
    }
  ],
  // 厂商列表
  source_opt: [
    {
      label: 'local',
      value: 0
    }
  ],
  // 老版节点类型对应图片列表
  hop_wantd_type_img_opt_old: {
    // VPS
    VPS: `../img/taskManager/${theme}/vps.svg`,
    // 机场
    AIRPORT_PROXY: `../img/taskManager/${theme}/planeNode.svg`,
    // 动态住宅代理
    TRENDS_RESIDENCE_PROXY: `../img/taskManager/${theme}/homeIn.svg`,
    // 国外住宅代理
    //4: `../img/taskManager/${theme}/homeOut.svg`,
    // Tor
    ANONYMOUS_NETWORK: `../img/taskManager/${theme}/tor.svg`,
    // IoT
    IOT: `../img/taskManager/${theme}/networkNode.svg`,
    // VPN
    VPN: `../img/taskManager/${theme}/vpn.svg`
  },
  // 拓扑图顶部图例集合
  topLegendArr: [
    {
      item: '代理服务',
      imgUrl: `../img/topoSvg/${theme}/LegendList/proxy.svg`
    },
    {
      item: '反向代理服务',
      imgUrl: `../img/topoSvg/${theme}/LegendList/ReverseProxy.svg`
    },
    {
      item: '隧道服务',
      imgUrl: `../img/topoSvg/${theme}/LegendList/tunnelServer.svg`
    },
    {
      item: '其他',
      imgUrl: `../img/topoSvg/${theme}/LegendList/other.svg`
    },
    {
      item: '代理',
      imgUrl: `../img/topoSvg/${theme}/LegendList/proxyLine.svg`
    },
    {
      item: '反向代理',
      imgUrl: `../img/topoSvg/${theme}/LegendList/ReverseProxyLine.svg`
    }
  ],
  // 新版
  //   DHOST 接入主机
  // AIRPORT_PROXY 机场
  // TRENDS_RESIDENCE_PROXY 住宅代理
  // ANONYMOUS_NETWORK  TOR
  // IOT  IOT
  // VPS VPS
  // DPN_DHOST 专线接入主机
  // SDWAN_DHOST SD-WAN接入主机
  // DPN_VPS 专线出口VPS
  // SDWAN_VPS SD-WAN出口VPS
  // class属性为Proxy 代理服务（橙色）
  // class属性为ReverseProxy 反向代理服务（蓝色）
  // class属性为TunnelServer 隧道服务器（绿色）
  hop_wantd_type_img_opt_cn: {
    DHOST: '普通接入主机',
    DPN_DHOST: '专线接入主机',
    SDWAN_DHOST: 'SD-WAN接入主机',
    SDWAN_VPS: 'SD-WAN出口VPS',
    DPN_VPS: '专线出口VPS',
    VPS: '普通VPS',
    AIRPORT_PROXY: '机场',
    TRENDS_RESIDENCE_PROXY: '住宅代理',
    ANONYMOUS_NETWORK: '匿名网络',
    IOT: 'IOT',
    SDWAN_POP: 'SD-WAN出口',
    BW_DHOST: '应急通联型-边境无线',
    BW_POP: '边境无线出口',
    SAT_DHOST: '应急通联型-卫星通信',
    SAT_POP: '卫星出口'
  },
  hop_wantd_type_img_opt: {
    // 普通接入主机
    DHOST: `simpleEntry.svg`,
    // 专线接入主机
    DPN_DHOST: `dedicatedEntry.svg`,
    // SD-WAN接入主机
    SDWAN_DHOST: `sdwanEntry.svg`,
    // SD-WAN出口VPS
    SDWAN_VPS: `sdwanOutVPS.svg`,
    // 专线出口VPS
    DPN_VPS: `dedicatedOutVps.svg`,
    // 普通VPS
    VPS: `simpleVps.svg`,
    // 机场
    AIRPORT_PROXY: `planeNode.svg`,
    // 住宅代理
    TRENDS_RESIDENCE_PROXY: `homeIn.svg`,
    // Tor
    ANONYMOUS_NETWORK: `tor.svg`,
    // IoT
    IOT: `iot.svg`,
    SDWAN_POP: 'sdwanPop.svg',
    BW_DHOST: 'bwDhost.svg',
    BW_POP: 'sdwanPop.svg',
    SAT_DHOST: 'satDhost.svg',
    SAT_POP: 'sdwanPop.svg'
  },
  // 节点类型列表
  //   节点类型枚举值映射表（来自 30 所）：
  // PROXY,机场代理
  // VPS,VPS
  // IOT,IoT
  // ANONYMOUS_NETWORK,匿名网络
  // TRENDS_RESIDENCE_PROXY,动态住宅代理
  // STATIC_RESIDENCE_PROXY,静态住宅代理
  // BLOCKCHAIN,区块链
  // HASTEN_VPS,加速VPS
  // 跟30所的对应关系
  hop_wanted_type_opt30: {
    1: 'VPS',
    2: 'PROXY'
    // 3:"",
    // 4:"",
    // 5:"",
    // 6:"",
    // 7:""
  },
  hop_wanted_type_opt: [
    // {
    //   label: "其他",
    //   value: 1,
    // },
    {
      label: 'VPS',
      value: 'VPS'
      //value: 1
    },
    {
      label: '机场',
      value: 'AIRPORT_PROXY'
      //value: 2
    },
    {
      label: '动态住宅代理',
      value: 'TRENDS_RESIDENCE_PROXY'
      // value: 3
    },
    // {
    //   label: '国外住宅代理',
    //   value: 'TRENDS_RESIDENCE_PROXY'
    //   //value: 4
    // },
    {
      label: 'Tor',
      value: 'ANONYMOUS_NETWORK'
      //value: 5
    },
    {
      label: 'IoT',
      value: 'IOT'
      //value: 6
    },
    {
      label: 'VPN',
      value: 'VPN'
      //value: 7
    }
  ],
  // 接入端口字典
  portDict: ['随机分配', '自定义端口'],
  // 认证XX
  authDict: ['随机账号密码', '自定义账号密码', '无认证'],

  // 可以调用启动接口的服务状态
  startServices: [3],
  // 可以调用暂停接口的服务状态
  suspendServices: [2],
  // 启动/暂停按钮的其他等待状态[暂停中,恢复中]
  startSupendWaintService: [10, 12],
  startSupendWaintServiceTxt: {
    10: '暂停中',
    12: '启动中'
  },
  // 销毁的等待状态
  delService: [11, 14, 18],
  // 编辑的等待状态
  editService: [8, 9, 13, 16],
  // 修复等待
  repairService: [15],
  // 删除等待
  cdelService: [7, 17, 19],
  // 所有的等待中状态
  waitingServices: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
  waitingServicesTxt: {
    7: '删除中',
    8: '修改中',
    9: '修改中',
    10: '暂停中',
    11: '中止中',
    12: '恢复中',
    13: '修改中',
    14: '销毁中',
    15: '修复中',
    16: '修改中',
    17: '删除中',
    18: '销毁中',
    19: '删除中'
  },
  // 单独把创建失败拿出来
  error_channel_status: 6,
  // 单独大类状态
  channel_single_status: [
    { value: null, label: '全部', color: '' },
    {
      value: 'constructing',
      label: '创建中',
      // 创建中[创建时失败,删除中,不存在,修改中]
      statusArr: [1, 7, 8, 20],
      color: '#1677FF',
      rgbaColor: 'rgba(22,119,255,0.1)'
    },
    {
      value: 'running',
      label: '运行中',
      // 运行中[修改中,暂停中,销毁中]
      statusArr: [2, 9, 10, 14],
      color: '#55CC57',
      rgbaColor: 'rgba(85,204,87,0.1)'
    },
    {
      value: 'destroyed',
      label: '已销毁',
      // 已销毁[销毁成功,删除中]
      statusArr: [4, 19],
      color: '#FF2A00',
      rgbaColor: 'rgba(255,42,0,0.1)'
    },
    // {
    //   value: 'report_destroyed',
    //   label: '报故销毁'
    // },
    // {
    //   value: 'create_failed',
    //   label: '创建失败',
    //   // 创建失败[创建失败]
    //   statusArr: [6],
    //   color: '#ff6a6a',
    //   rgbaColor: 'rgba(255,106,106,0.1)'
    // },
    {
      value: 'achieved',
      label: '已归档'
    }
  ],
  // 在业务列表中展示的通道状态
  channelStatusForService: [
    { value: 1, label: '创建中', color: '#effafe', type: '', fontColor: '#2f9acc', borderColor: '#c1ebfb' },
    { value: 6, label: '创建中', color: '#effafe', type: '', fontColor: '#2f9acc', borderColor: '#c1ebfb' },
    { value: 7, label: '创建中', color: '#effafe', type: '', fontColor: '#2f9acc', borderColor: '#c1ebfb' },
    { value: 8, label: '创建中', color: '#effafe', type: '', fontColor: '#2f9acc', borderColor: '#c1ebfb' },
    { value: 2, label: '运行中', color: '#fff6ea', type: 'success', fontColor: '#d97b00', borderColor: '#ffddaa' },
    { value: 9, label: '运行中', color: '#fff6ea', type: 'success', fontColor: '#d97b00', borderColor: '#ffddaa' },
    { value: 10, label: '运行中', color: '#fff6ea', type: 'success', fontColor: '#d97b00', borderColor: '#ffddaa' },
    { value: 14, label: '运行中', color: '#fff6ea', type: 'success', fontColor: '#d97b00', borderColor: '#ffddaa' },
    { value: 3, label: '已暂停', color: '#f5f5f5', type: 'info', fontColor: '#575757', borderColor: '#dbdbdb' },
    { value: 11, label: '已暂停', color: '#f5f5f5', type: 'info', fontColor: '#575757', borderColor: '#dbdbdb' },
    { value: 12, label: '已暂停', color: '#f5f5f5', type: 'info', fontColor: '#575757', borderColor: '#dbdbdb' },
    { value: 13, label: '已暂停', color: '#f5f5f5', type: 'info', fontColor: '#575757', borderColor: '#dbdbdb' },
    { value: 4, label: '已中止', color: '#f5f5f5', type: 'info', fontColor: '#575757', borderColor: '#dbdbdb' },
    { value: 19, label: '已中止', color: '#f5f5f5', type: 'info', fontColor: '#575757', borderColor: '#dbdbdb' },
    { value: 5, label: '运行异常', color: '#feeded', type: 'danger', fontColor: '#cf1322', borderColor: '#fcb5b9' },
    { value: 15, label: '运行异常', color: '#feeded', type: 'danger', fontColor: '#cf1322', borderColor: '#fcb5b9' },
    { value: 16, label: '运行异常', color: '#feeded', type: 'danger', fontColor: '#cf1322', borderColor: '#fcb5b9' },
    { value: 17, label: '运行异常', color: '#feeded', type: 'danger', fontColor: '#cf1322', borderColor: '#fcb5b9' },
    { value: 18, label: '运行异常', color: '#feeded', type: 'danger', fontColor: '#cf1322', borderColor: '#fcb5b9' }
  ],

  //新版优化状态
  channelStatusNewForService: [
    { value: 1, label: '创建中', className: 'status-tag-yellow' },
    { value: 6, label: '创建失败', className: 'status-tag-red' },
    { value: 7, label: '创建中', className: 'status-tag-yellow' },
    { value: 8, label: '创建中', className: 'status-tag-yellow' },
    { value: 2, label: '运行中', className: 'status-tag-green' },
    { value: 9, label: '运行中', className: 'status-tag-green' },
    { value: 10, label: '运行中', className: 'status-tag-green' },
    { value: 14, label: '运行中', className: 'status-tag-green' },
    { value: 3, label: '已暂停', className: 'status-tag-gray' },
    { value: 11, label: '已暂停', className: 'status-tag-gray' },
    { value: 12, label: '已暂停', className: 'status-tag-gray' },
    { value: 13, label: '已暂停', className: 'status-tag-gray' },
    { value: 4, label: '已销毁', className: 'status-tag-gray' },
    { value: 19, label: '已销毁', className: 'status-tag-gray' },
    { value: 5, label: '运行异常', className: 'status-tag-red' },
    { value: 15, label: '运行异常', className: 'status-tag-red' },
    { value: 16, label: '运行异常', className: 'status-tag-red' },
    { value: 17, label: '运行异常', className: 'status-tag-red' },
    { value: 18, label: '运行异常', className: 'status-tag-red' }
  ],

  // 通道列表的状态[暂时未使用]
  channel_list_status: [
    { value: null, label: '全部', color: '' },
    {
      value: 1,
      label: '创建中',
      color: '#1677FF',
      rgbaColor: 'rgba(22,119,255,0.1)'
    },
    {
      value: 2,
      label: '运行中',
      color: '#55CC57',
      rgbaColor: 'rgba(85,204,87,0.1)'
    },
    {
      value: 3,
      label: '已暂停',
      color: '#BEC5D7',
      rgbaColor: 'rgba(190,197,215,0.1)'
    },
    {
      value: 4,
      label: '已销毁',
      color: '#FF2A00',
      rgbaColor: 'rgba(255,42,0,0.1)'
    },
    {
      value: 5,
      label: '运行异常',
      color: '#ffbf2b',
      rgbaColor: 'rgba(255,191,43,0.1)'
    },
    {
      value: 6,
      label: '创建失败',
      color: '#ff6a6a',
      rgbaColor: 'rgba(255,106,106,0.1)'
    },
    {
      value: 7,
      label: '销毁中',
      color: '#ff9864',
      rgbaColor: 'rgba(255,152,100,0.1)'
    },
    {
      value: 15,
      label: '修复中',
      color: '#1890ff',
      rgbaColor: 'rgba(24,144,255,0.1)'
    }
  ],
  // 通道用途--可合并，与业务类型serviceLabels数组一致
  labels: TaskDict.channel_belong_services_opt,
  // 类型
  types: [
    { value: 1, label: '静态' },
    { value: 2, label: '动态' }
  ],
  // 状态
  status: [
    // { value: null, label: '全部', tableLabel: '',color: ''},
    // { value: 0, label: '连接建立', tableLabel: '连接建立', color: '#1677FF'},
    // { value: 1, label: '监听中', tableLabel: '连接建立', color: '#1677FF' },
    // { value: 2, label: '等待关闭', tableLabel: '等待关闭', color: '#BEC5D7'},
    // { value: 3, label: '已关闭', tableLabel: '已关闭', color: '#BEC5D7'},
    // { value: 4, label: '正常通信', tableLabel: '正常通信', color: '#55CC57'},
    // { value: 5, label: '异常通信', tableLabel: '异常通信', color: '#FF2A00'}
    { value: null, label: '全部', color: '' },
    { value: 1, label: '创建中', color: '#1677FF', type: '' },
    { value: 2, label: '运行中', color: '#55CC57', type: 'success' },
    { value: 3, label: '已暂停', color: '#BEC5D7', type: 'info' },
    { value: 4, label: '已中止', color: '#FF2A00', type: 'danger' }
  ],
  // 代理协议
  protocols: TaskDict.protocols,
  taskDictprotocols: TaskDict.protocols,
  // 服务状态
  services: [
    { value: 1, label: '资源申请中' },
    { value: 2, label: '创建中' },
    { value: 3, label: '运行中' },
    { value: 4, label: '已暂停' },
    { value: 5, label: '已销毁' },
    { value: 6, label: '异常' }
  ],
  selectStrategys: [
    { value: 0, label: '最佳质量优先' },
    { value: 1, label: '最少复用优先' },
    { value: 2, label: '最强YB优先' }
  ],

  // 负载均衡策略
  loadBalances: [
    { value: 4, label: '无' },
    { value: 1, label: '轮询' },
    { value: 2, label: '加权随机' },
    { value: 3, label: '主备模式' }
  ]
};

// 部署主机
const DhostDict = {
  // 主机类型
  types: [
    { value: 1, label: '轮询' },
    { value: 2, label: '加权随机' },
    { value: 3, label: '主备模式' }
  ],
  // 主机通道状态
  status: [
    // { value: null, label: '全部', color: '' },
    // { value: 0, label: '连接建立', color: '#1677FF' },
    // { value: 1, label: '监听中', color: '#1677FF' },
    // { value: 2, label: '等待关闭', color: '#BEC5D7' },
    // { value: 3, label: '已关闭', color: '#BEC5D7' },
    // { value: 4, label: '正常通信', color: '#55CC57' },
    // { value: 5, label: '异常通信', color: '#FF2A00' }
    // { value: null, label: "全部", color: "" },
    // { value: 1, label: "创建中", color: "#1677FF", type: "" },
    // { value: 2, label: "创建失败", color: "#FF2A00", type: "danger" },
    // { value: 3, label: "运行中", color: "#55CC57", type: "success" },
    // { value: 4, label: "运行异常", color: "#BEC5D7", type: "info" },
    // { value: 5, label: "修复中", color: "#1677FF", type: "" },
    // { value: 6, label: "已暂停", color: "#BEC5D7", type: "info" },
    // { value: 7, label: "销毁中", color: "#1677FF", type: "" },
    // { value: 8, label: "已中止", color: "#FF2A00", type: "danger" },
    { value: null, label: '全部', color: '' },
    { value: 1, label: '创建中', color: '#effafe', type: '', fontColor: '#2f9acc', borderColor: '#c1ebfb' },
    { value: 2, label: '创建失败', color: '#feeded', type: 'danger', fontColor: '#cf1322', borderColor: '#fcb5b9' },
    { value: 3, label: '运行中', color: '#fff6ea', type: 'success', fontColor: '#d97b00', borderColor: '#ffddaa' },
    { value: 4, label: '暂停中', color: '#effafe', type: 'info', fontColor: '#2f9acc', borderColor: '#c1ebfb' },
    { value: 5, label: '已暂停', color: '#eaf4ff', type: '', fontColor: '#0062d9', borderColor: '#aad2ff' },
    { value: 6, label: '恢复中', color: '#effafe', type: 'info', fontColor: '#2f9acc', borderColor: '#c1ebfb' },
    { value: 7, label: '修改中', color: '#effafe', type: '', fontColor: '#2f9acc', borderColor: '#c1ebfb' },
    { value: 8, label: '中止中', color: '#effafe', type: 'danger', fontColor: '#2f9acc', borderColor: '#c1ebfb' },
    { value: 9, label: '运行异常', color: '#f5f5f5', type: 'danger', fontColor: '#575757', borderColor: '#dbdbdb' },
    { value: 10, label: '已中止', color: '#f5f5f5', type: 'danger', fontColor: '#575757', borderColor: '#dbdbdb' },
    { value: 11, label: '删除中', color: '#effafe', type: 'danger', fontColor: '#2f9acc', borderColor: '#c1ebfb' },
    { value: 12, label: '已删除', color: '#eaf4ff', type: 'danger', fontColor: '#0062d9', borderColor: '#aad2ff' },
    { value: 13, label: '修复中', color: '#fff6ea', type: 'danger', fontColor: '#cf1322', borderColor: '#fcb5b9' }
  ],
  newStatus: [
    { value: 1, label: '创建中', className: 'status-tag-yellow' },
    { value: 2, label: '创建失败', className: 'status-tag-red' },
    { value: 3, label: '运行中', className: 'status-tag-green' },
    { value: 4, label: '暂停中', className: 'status-tag-blue' },
    { value: 5, label: '已暂停', className: 'status-tag-gray' },
    { value: 6, label: '恢复中', className: 'status-tag-blue' },
    { value: 7, label: '修改中', className: 'status-tag-blue' },
    { value: 8, label: '中止中', className: 'status-tag-blue' },
    { value: 9, label: '运行异常', className: 'status-tag-red' },
    { value: 10, label: '已中止', className: 'status-tag-gray' },
    { value: 11, label: '删除中', className: 'status-tag-red' },
    { value: 12, label: '已删除', className: 'status-tag-red' },
    { value: 13, label: '修复中', className: 'status-tag-blue' }
  ],
  // 列表筛选状态描述数组
  filterStatus: [
    { value: null, label: '全部', color: '' },
    { value: 1, label: '创建中', color: '#1677FF', type: '' },
    { value: 3, label: '运行中', color: '#55CC57', type: 'success' },
    { value: 6, label: '已暂停', color: '#BEC5D7', type: 'info' },
    { value: 8, label: '已中止', color: '#FF2A00', type: 'danger' }
  ],
  // SSH认证类型
  sshTypes: [
    { value: 1, label: '密码' },
    { value: 2, label: '密钥' }
  ],
  // 跳转主机编辑存入localStorage的dhost_id的key
  dhost_id: 'edit_dhost_id',
  // 添加/修改接入主机时的支撑业务
  serviceSupports: [
    { value: 0, label: '全部' },
    { value: 1, label: 'C' },
    { value: 2, label: 'B' },
    { value: 3, label: 'BC' },
    { value: 4, label: 'A' },
    { value: 5, label: 'AC' },
    { value: 6, label: 'AB' },
    { value: 7, label: 'ABC' }
  ]
};

// 策略的字典
const Strategy = {
  types: [
    {
      value: 1,
      label: '默认'
    },
    {
      value: 2,
      label: '自定义'
    }
  ]
};
