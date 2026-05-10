let chartColors = [
	'rgba(5, 253, 252, 1)', 
	'rgba(58, 137, 255, 1)', 
	'rgba(246, 255, 0, 1)', 
	'rgba(151, 235, 205, 1)', 
	'rgba(9, 187, 255, 1)', 
	'rgba(255, 204, 128, 1)', 
	'rgba(250, 145, 150, 1)', 
	'rgba(128, 188, 255, 1)'
];
let linearChartColors = [
	'rgba(5, 253, 252, .5)', 
	'rgba(58, 137, 255, .5)', 
	'rgba(246, 255, 0, .5)', 
	'rgba(151, 235, 205, .5)', 
	'rgba(9, 187, 255, .5)', 
	'rgba(255, 204, 128, .5)', 
	'rgba(250, 145, 150, .5)', 
	'rgba(128, 188, 255, .5)'
];
let transparentColors = [
	'rgba(5, 253, 252, 0)', 
	'rgba(58, 137, 255, 0)', 
	'rgba(246, 255, 0, 0)', 
	'rgba(151, 235, 205, 0)', 
	'rgba(9, 187, 255, 0)', 
	'rgba(255, 204, 128, 0)', 
	'rgba(250, 145, 150, 0)', 
	'rgba(128, 188, 255, 0)'
];
// 资源分布折线图使用的颜色
let resourceLineChartColors = [ 
	'rgba(5,253,252, 1)', 
	'rgba(246, 255, 0, 1)'
];
let resourceLineChartLinearColors = [
	'rgba(5,253,252, .5)', 
	'rgba(246, 255, 0, .5)'
];
let resourceLineChartTransparentColors = [
	'rgba(5,253,252, 0)', 
	'rgba(246, 255, 0, 0)'
];
// 安全加固饼图颜色
let pieChartColors = [
	'rgb(128,188,255)', 
	'rgb(162,225,249)',
	 'rgb(151,235,205)', 'rgb(186,225,179)', 'rgb(255,204,128)', 'rgb(250,145,150)']
// 3d饼图的颜色
let pieChart3dColors = [
  'rgb(58,137,255)',
  'rgb(86,74,241)',
  'rgb(60,212,149)',
  'rgb(72,229,229)',
  'rgb(190,229,251)',
  'rgb(255,204,128)', 
]
// 转换echart图标的字体函数
function setChartSize(res) {
  const clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  if (!clientWidth) return;
  let fontSize = clientWidth / 1920;
  return res * fontSize;
}
let transferOption = {
  // 总的背景色
  backgroundColor: 'rgba(255, 255, 255, 0)',
  color: chartColors,
  // 全局字体样式
  textStyle: {
    color: '#868e97',
    fontSize: setChartSize(14)
  },
  grid: {
    // left: 35,
    // top: 35,
    // right: 20,
    // bottom: 20,
    left: setChartSize(20),
    // top: setChartSize(35),
    top: setChartSize(35),
    right: setChartSize(20),
    bottom: setChartSize(20),
    containLabel: true,
    backgroundColor: 'transparent'
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(24, 34, 107, .7)',
    borderColor: 'rgba(50, 57, 103, 0.9)',
    borderWidth: 1,
    textStyle: {
      color: '#ddeeff',
      fontSize: setChartSize(14)
    },
    axisPointer: {
      type: 'line', // 设置为线型指示器
      lineStyle: {
        type: 'dashed' // 线的类型，可以是 'solid', 'dashed', 或 'dotted'
      }
    }
  },
  legend: {
    data: [],
    // icon: 'circle',
    // itemWidth: 8,
    // itemHeight: 8,
    // icon: 'roundRect',
    icon: 'rect',
    itemWidth: setChartSize(20),
    itemHeight: setChartSize(2),
    textStyle: {
      fontSize: setChartSize(14),
      color: '#868e97'
    },
    // top: setChartSize(0),
    top: 0,
    // right: 0
    right: setChartSize(20)
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [],
    // x轴轴线刻度字
    axisLabel: {
      color: '#868e97',
      // fontSize: 14,
      fontSize: setChartSize(14),
      margin: setChartSize(12)
    },
    // 背景刻度线
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    }
  },
  // yAxis.axisLabel.formatter
  yAxis: {
    type: 'value',
    name: '单位: bps',
    nameLocation: 'end',
    nameTextStyle: {
      padding: [0, 0, 0, 0], //间距分别是 上 右 下 左
      align: 'left'
    },
    // splitLine: {
    //   lineStyle: {
    //     type: 'solid'
    //   }
    // },
    // y轴轴线刻度字
    axisLabel: {
      // 设置格式
      // formatter: '{(value / 1000).toFixed(0)}Kbps',
      color: '#868e97',
      fontSize: setChartSize(14),
      margin: setChartSize(12)
    },
    // axisLine: {
    // 	show: true
    // },
    // 背景刻度线
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
        color: '#868e97'
      }
    }
  },
  series: []
};
// 支撑态势的配置项
let supportOption = JSON.parse(JSON.stringify(transferOption));
supportOption.grid.bottom = setChartSize(0);
supportOption.xAxis.boundaryGap = setChartSize(20);
supportOption.yAxis = [
  {
    type: 'value',
    name: '任务数量(个)',
    nameLocation: 'end',
    nameTextStyle: {
      padding: [0, 0, 0, 0], //间距分别是 上 右 下 左
      align: 'left'
    },
    splitLine: {
      lineStyle: {
        type: 'solid'
      }
    },
    // y轴轴线刻度字
    axisLabel: {
      // 设置格式
      // formatter: '{value}bps',
      color: '#868e97',
      fontSize: setChartSize(14),
      margin: setChartSize(12)
    },
    axisLine: {
      show: true
    },
    // 背景刻度线
    splitLine: {
      lineStyle: {
        type: 'dashed',
        color: '#868e97'
      },
      show: false
    }
  },
  {
    type: 'value',
    name: '执行成功率(%)',
    nameLocation: 'end',
    nameTextStyle: {
      padding: [0, 0, 0, 0], //间距分别是 上 右 下 左
      align: 'right'
    },
    splitLine: {
      lineStyle: {
        type: 'solid'
      }
    },
    // y轴轴线刻度字
    axisLabel: {
      // 设置格式
      // formatter: '{value}bps',
      color: '#868e97',
      fontSize: setChartSize(14),
      margin: setChartSize(12)
    },
    axisLine: {
      show: true
    },
    // 背景刻度线
    splitLine: {
      lineStyle: {
        type: 'dashed',
        color: '#868e97'
      }
    }
  }
];
supportOption.legend = [
  {
    show: true,
    orient: 'horizontal',
    left: 'center',
    top: 0,
    align: 'auto',
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: '#ccc',
    borderRadius: 0,
    borderWidth: 0,
    padding: setChartSize(5),
    itemGap: setChartSize(10),
    itemWidth: setChartSize(25),
    itemHeight: setChartSize(14),
    textStyle: {
      color: '#868e97',
      fontSize: setChartSize(14)
    }
    // symbolRotate: 'inherit',
    // symbolKeepAspect: true,
    // inactiveColor: '#ccc',
    // inactiveBorderColor: '#ccc',
    // inactiveBorderWidth: 'auto',
  }
];
// 安全风险顶部图表配置项
let safeRiskTopOption = JSON.parse(JSON.stringify(transferOption));
safeRiskTopOption.grid.bottom = setChartSize(0);
safeRiskTopOption.xAxis.boundaryGap = setChartSize(20);
safeRiskTopOption.xAxis.axisLabel.fontSize = setChartSize(12);
safeRiskTopOption.yAxis = [
  {
    type: 'value',
    name: '攻击次数(次)',
    nameLocation: 'end',
    nameTextStyle: {
      padding: [0, 0, 0, 0], //间距分别是 上 右 下 左
      align: 'left'
    },
    splitLine: {
      lineStyle: {
        type: 'solid'
      }
    },
    // y轴轴线刻度字
    axisLabel: {
      // 设置格式
      // formatter: '{value}bps',
      color: '#868e97',
      fontSize: setChartSize(12)
    },
    axisLine: {
      show: true
    },
    // 背景刻度线
    splitLine: {
      lineStyle: {
        type: 'dashed',
        color: '#868e97'
      },
      show: false
    }
  },
  {
    type: 'value',
    name: '风险处置率(%)',
    nameLocation: 'end',
    nameTextStyle: {
      padding: [0, 0, 0, 0], //间距分别是 上 右 下 左
      align: 'right'
    },
    splitLine: {
      lineStyle: {
        type: 'solid'
      }
    },
    // y轴轴线刻度字
    axisLabel: {
      // 设置格式
      // formatter: '{value}bps',
      color: '#868e97',
      // fontSize: setChartSize(14),
      fontSize: setChartSize(12),
      // margin: setChartSize(12)
    },
    axisLine: {
      show: true
    },
    // 背景刻度线
    splitLine: {
      lineStyle: {
        type: 'dashed',
        color: '#868e97'
      }
    }
  }
];
safeRiskTopOption.legend = [
  {
    show: false,
    orient: 'horizontal',
    left: 'center',
    top: 0,
    align: 'auto',
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: '#ccc',
    borderRadius: 0,
    borderWidth: 0,
    padding: setChartSize(5),
    itemGap: setChartSize(10),
    itemWidth: setChartSize(25),
    itemHeight: setChartSize(14),
    textStyle: {
      color: '#868e97',
      fontSize: setChartSize(14)
    }
  }
];
// 安全风险中间的图表
let safeRiskCenter = JSON.parse(JSON.stringify(safeRiskTopOption));
safeRiskCenter.yAxis = [
  {
    type: 'value',
    name: '发现风险数量(个)',
    nameLocation: 'end',
    nameTextStyle: {
      padding: [0, 0, 0, 0], //间距分别是 上 右 下 左
      align: 'left'
    },
    splitLine: {
      lineStyle: {
        type: 'solid'
      }
    },
    // y轴轴线刻度字
    axisLabel: {
      // 设置格式
      // formatter: '{value}bps',
      color: '#868e97',
      fontSize: setChartSize(12)
    },
    axisLine: {
      show: true
    },
    // 背景刻度线
    splitLine: {
      lineStyle: {
        type: 'dashed',
        color: '#868e97'
      },
      show: false
    }
  },
  {
    type: 'value',
    name: '智能研判覆盖率(%)',
    nameLocation: 'end',
    nameTextStyle: {
      padding: [0, 0, 0, 0], //间距分别是 上 右 下 左
      align: 'right'
    },
    splitLine: {
      lineStyle: {
        type: 'solid'
      }
    },
    // y轴轴线刻度字
    axisLabel: {
      // 设置格式
      // formatter: '{value}bps',
      color: '#868e97',
      // fontSize: setChartSize(14),
      fontSize: setChartSize(12),
      // margin: setChartSize(12)
    },
    axisLine: {
      show: true
    },
    // 背景刻度线
    splitLine: {
      lineStyle: {
        type: 'dashed',
        color: '#868e97'
      }
    }
  }
];
safeRiskCenter.xAxis.boundaryGap = setChartSize(40);
// 资源概览图表配置项
let resourceOption = {
  color: chartColors,
  title: {
    show: true,
    text: '',
    subtext: '资源用量分布',
    left: '49%',
    // top: '42%',
    top: '39%',
    // left: '39%',
    // top: '40%',
    textAlign: 'center',
    textStyle: {
      color: '#0dffff',
      fontSize: setChartSize(24),
      fontFamily: 'NUMBER Font'
    },
    subtextStyle: {
      color: '#ddeeff',
      fontSize: setChartSize(14)
    }
  },
  grid: {
    containLabel: true
  },
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(24, 34, 107, .7)',
    borderColor: 'rgba(50, 57, 103, 0.9)',
    borderWidth: 1,
    textStyle: {
      color: '#ddeeff',
      fontSize: setChartSize(14)
    },
    confine: true
    // formatter(params){
    //   return `${params.marker}${params.name}&emsp;${params.value}&emsp;${params.logPercent}`;
    // }
  },
  legend: {
    show: false,
    data: [],
    icon: 'roundRect',
    orient: 'vertical',
    right: 30,
    itemWidth: 20,
    itemHeight: 12,
    textStyle: {
      fontSize: setChartSize(14)
    }
  },
  series: [
    {
      type: 'pie',
      // radius: ['50%', '75%'],
      radius: ['70%', '85%'],
      // center: ['40%', '50%'],ss
      width: '100%',
      height: '100%',
      avoidLabelOverlap: true,
      // itemStyle: {
      //   borderRadius: 3,
      //   borderColor: '#fff',
      //   borderWidth: 3
      // },
      label: {
        show: false
      },
      emphasis: {
        disabled: false,
        scale: false,
        label: {
          show: false
        }
      },
      labelLine: {
        show: false
      },
      data: []
    }
  ]
};
// 安全加固的默认饼图配置
let defaultPieOption = {
  backgroundColor: 'transparent',
  grid: {
    containLabel: true
  },
  legend: {
    show: false,
    data: [],
    icon: 'roundRect',
    orient: 'vertical',
    right: setChartSize(30),
    itemWidth: 20,
    itemHeight: 12,
    textStyle: {
      fontSize: 14
    }
  },
  tooltip: {
    trigger: 'item',
    confine: true,
    // formatter(params){}
    backgroundColor: 'rgba(24, 34, 107, .7)',
    borderColor: 'rgba(50, 57, 103, 0.9)',
    borderWidth: 1,
    textStyle: {
      color: '#ddeeff',
      fontSize: setChartSize(14)
    }
  },
  series: [{
    type: 'pie',
    // radius: ['16%', '28%'],
    radius: ['30%', '75%'],
    avoidLabelOverlap: true,
    itemStyle: {
      borderRadius: 2,
      borderWidth: 3,
      // borderColor: 'rgba(0, 0, 0, 0.8)'
      borderColor: 'rgb(12, 16, 48)'
    },
    label: {
      show: true,
      color: '#fff',
      fontSize: setChartSize(10),
      position: 'outside',
      // formatter: '{b}\n{d}%'
      formatter: '{b}\n{c}个'
    },
    emphasis: {
      disabled: false,
      scale: false,
      label: {
        show: true
      }
    },
    labelLine: {
      show: true
    },
    data: []
  }]
};
// 工具函数
function round(number, precision = 2) {
  return Math.round(+number + "e" + precision) / Math.pow(10, precision);
}
// 默认的左下角资源统计的中间资源对象
let defaultResourceCenter = {
  resourceType: undefined,
  key: undefined,
  count: undefined,
  districtList: undefined,
  staticCount: undefined,
  dynamicCount: undefined,
  districtCount: undefined,
  protocolCount: undefined,
  sourceCount: undefined
};

$app = new Vue({
	el: '#app',
	data(){
		return {
			dialogFlag: false,
			dialogerContent: [
				{ 
          title: '安全准入', 
          texts: [
            { text: 'IP 信誉评估', disabled: false },
            { text: '域名风险评估', disabled: false },
            { text: '多源情报综合研判', disabled: false },
            { text: '蜜罐伪装评估', disabled: true },
            { text: '木马失陷检测', disabled: true },
            { text: '资源安全评分', disabled: false },
          ],
          disabled: false 
        },
        { 
          title: '智能加固', 
          texts: [
            { text: '漏洞情报订阅', disabled: false },
            { text: '漏洞持续性监测', disabled: false },
            { text: '漏洞特征采集', disabled: false },
            { text: '漏洞影响面评估', disabled: false },
            { text: '漏洞修复策略生成', disabled: false },
            { text: '策略人机辅助校验', disabled: false },
            { text: '漏洞智能修复', disabled: false },
            { text: '系统配置基线自适应校准', disabled: false },
            { text: '系统配置漂移实时监测', disabled: false },
            { text: '合规性配置策略编排', disabled: false },
            { text: '系统配置自动化加固', disabled: false }
          ],
          disabled: false 
        },
        { 
          title: '主动免疫', 
          texts: [
            { text: '零信任终端行为混淆', disabled: true },
            { text: '攻击面动态测绘与收敛', disabled: false },
            { text: '蜜罐欺骗防御环境构建', disabled: true },
            { text: '多因子动态身份鉴权', disabled: false },
            { text: '细粒度操作权限动态分配', disabled: true },
            { text: 'EDR+NDR联合态势感知', disabled: false },
            { text: '实时风险阻断与威胁狩猎', disabled: false },
            { text: '用网异常行为基线建模', disabled: false }
          ],
          disabled: false 
        },
        { 
          title: '智能决策', 
          texts: [
            { text: '多源威胁情报聚合', disabled: false },
            { text: '多维告警关联分析', disabled: true },
            { text: '告警自主智能降噪', disabled: false },
            { text: '攻击风险即时研判', disabled: true },
            { text: '攻击趋势智能预测', disabled: true },
            { text: '隐蔽威胁面发现', disabled: false }
          ],
          disabled: false 
        },
        { 
          title: '动态响应', 
          texts: [
            { text: '响应预案自动化编排', disabled: true },
            { text: '攻击源防溯源取证', disabled: true },
            { text: '多源情报联动响应', disabled: false },
            { text: '人机协同决策处置', disabled: false },
            { text: '处置验证与证据链固化', disabled: true }
          ],
          disabled: true 
        },
        { 
          title: '溯源与分析', 
          texts: [
            { text: '攻击技战术全链路还原', disabled: true },
            { text: '数字取证与事件时间线重建', disabled: true },
            { text: '跨事件关联构建', disabled: true },
            { text: '攻击战术模式识别', disabled: true },
            { text: '攻击战术博弈抵抗', disabled: true },
            { text: '对抗环境主动验证', disabled: false }
          ],
          disabled: true 
        }
			],
			// 地球四个角的数据
      corner: {
        A: {
          num: 14,
          count: 0,
          rate: 0
        },
        B: {
          num: 0,
          count: 0,
          rate: 0
        },
        C: {
          num: 0,
          count: 0,
          rate: 0
        },
        O: { // 数据恢复成0
          num: 0,
          count: 0,
          rate: 0
        },
      },
			// 资源池数据 earthleftdata
      resourcePool: {
        key: 'total',
        // 储备
        total: {
          count: '0',
          anonymous: '0',
          open: '0'
        },
        // 用量
        use: {
          count: '0',
          anonymous: '0',
          open: '0'
        }
      },
			// 资源分布数据 earthleftdata
      resourceDistribution: {
        item1: '0',
        item2: '0',
        item3: '0',
        item4: '0',
        item5: '0'
      },
			// 资源左下角数据 earthleftdata
			resourceStatis: {
        // SAT 
        // BJ res_proxy jc_proxy tor_proxy vps iot 
        // SDWAN DPN
        sat: {
          count: 0,
          country: null,
          countryUrl: null,
          resourceType: "SAT"
        },
        // resourceCenterKeys
        center: [
          { index: 0,resourceType: 'jc_proxy', key: 'JC' },
          { index: 1,resourceType: 'BJ', key: 'BJ' },
          { index: 2,resourceType: 'res_proxy', key: 'RES' },
          { index: 3,resourceType: 'vps', key: 'vps'},
          { index: 4,resourceType: 'tor_proxy', key: 'TOR' },
          { index: 5,resourceType: 'iot', key: 'iot' }
        ],
        bottom: {
          count: 0,
          bandwidth: '0M'
        },
        resourceShowLabels: [
          { value: 'count', label: '数量' },
          { value: 'districtList', label: '分布地区' },
          { value: 'districtCount', label: '地区', unit: '个' },
          { value: 'dynamicCount', label: '动态IP', unit: '个' },
          { value: 'staticCount', label: '静态IP', unit: '个' },
          { value: 'protocolCount', label: '协议', unit: '类' },
          { value: 'sourceCount', label: '来源渠道', unit: '个' },
          { value: 'vendorCount', label: '厂商', unit: '个' },
          { value: 'deviceCount', label: '设备', unit: '个' }
        ]
      },
			// 总体安全态势上方数据
      safeSituation: {
        indexCount: '0.00',
        saferisk: {
          count: '0',
          rate: 0
        },
        warning: {
          count: '0',
          rate: 0
        },
        node: {
          count: '0',
          rate: 0
        }
      },
			// 安全加固上方数据
      safeReinforce: {
        bug: {
          count: '0',
          rate: 0
        },
        config: {
          count: '0',
          rate: 0 
        }
      },
			// 安全风险攻击源国家TOP10
      countryTopList: [
        { name: '', count: 0, change: 0 },
        { name: '', count: 0, change: -12 },
        { name: '', count: 0, change: 22 },
        { name: '', count: 0, change: 0 },
        { name: '', count: 0, change: 0 },
        { name: '', count: 0, change: 0 },
        { name: '', count: 0, change: 0 },
        { name: '', count: 0, change: 0 },
        { name: '', count: 0, change: 0 },
        { name: '', count: 0, change: 0 }
      ],
			// 威胁预警列表
      safeThreatList: [],
      // 安全风险 - 威胁预警等级
      safeThreatTypes: [
        { value: 'Critical', label: '严重' },
        { value: 'High', label: '高危' },
        { value: 'Medium', label: '中危' },
        { value: 'Low', label: '低危' }
      ],
			dateBg: 'default',
      topTimeRange: '',
			pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近2天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1); // 减去一天
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近3天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 2); // 减去两天
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近7天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近15天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 15);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近30天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近90天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      },
			// 地球上方部分的控制对象
      positionTop: {
        isfocusDisabled: false,
        // 是否正在动画
        animating: false,
        // 是否显示控制器
        showControls: false,
        showTracks: false,
        // 顶部动画时间线对象
        tl: null,
        // 地球旋转控制
        earthRotation: false,
        // 是否专注模式
        isfocus: false,
        // 是否切换飞线为虚线
        isDashed: false,
        // 关闭 / 开启起点终点的光柱
        showMarkupPoint: true,
        // 飞线的初始大小
        flyLineSize: 2
      },
			// 地球飞线的颜色
      // position-center-bottom-top
      lineColors: {
        xxts: {
          label: 'XXTS',
          key: 'xxts',
          value: '#0dffff',
          flag: true
        },
        sjhc: {
          label: 'SJHC',
          key: 'sjhc',
          value: '#ff7714',
          flag: true
        },
        zlkz: {
          label: 'ZLKZ',
          key: 'zlkz',
          value: '#ffffff',
          flag: true
        }
      },
			flyLineColors: {
        tc: {
          label: '通畅',
          key: 'tc',
          value: '#32ed6a',
          flag: true
        },
        yj: {
          label: '拥挤',
          key: 'yj',
          value: '#ffcc00',
          flag: true
        },
        zd: {
          label: '中断',
          key: 'zd',
          value: '#ff4747',
          flag: true
        }
      },
			updateTimer: null,
      taskListTopTimer: null,
      // homeTime: '2025-05-28 16:57:19',
      homeTime: Date.now(),
      // 获取的地球上的跳转数据
      jumps: [],
			// 地球上方数据
      centerTop: [
        { label: '实时通道数量', value: '13820' },
        { label: '实时网络负载', value: '1.52' },
        { label: '实时任务数量', value: '236' },
        { label: '实时任务支撑率', value: '532' }
      ],
			transfer: {
        counts: {
          sjhc: '0',
          sjhcUnit: '',
          zlkz: '0',
          xxts: '0'
        }
      },
			// echarts图表相关数据
      charts: {
        // 资源分布折线图
        distributionLine: {
          chart: null
        },
        // 资源分布饼图
        distributionPie: {
          chart: null,
          data: []
        },
        // 安全加固饼图
        safeReinforce: {
          data: [],
          chart: null
        },
        // 安全风险顶部图表
        safeRiskTop: {
          chart: null
        },
        // 安全风险中间图表
        safeRiskCenter: {
          chart: null
        },
        // 传输态势
        transfer: {
          // 请求参数
          params: {
            tag_regex: 'abc',
            group_by: 'label',
            traffic_type: 'input',
            start_time: null,
            end_time: null
          },
          chart: null
        },
        // 支撑态势
        support: {
          chart: null
        }
      }
		}
	},
	components: {
    'my-earth': MyEarth,
    'earth-map': EarthMap
  },
	created() {
    $app = this;
  },
	mounted() {
		console.log(ChannelDict)
    // 调用进入页面动画
    // this.enterAnimate();
    this.init();
    // $app.updateTimer = setInterval(this.update, 10000);
    window.addEventListener('resize', $app.resize);
    // // 驱动地球上方数字滚动动画
    // this.animateNumberItemInner('.position-center-top');
  },
	beforeDestroy() {
    window.removeEventListener('resize', $app.resize);
    $app.updateTimer && clearInterval($app.updateTimer);
  },
	computed: {
		// 根据威胁等级获取对应图标路径
    getSafeThreatItemStatus(){
      return function (status){
        let imgSrc = './img/homepage/saferisk/strict.svg';
        if (status === 'High'){
          imgSrc = './img/homepage/saferisk/hight.svg';
        } else if (status === 'Medium'){
          imgSrc = './img/homepage/saferisk/middle.svg';
        } else if (status === 'Low'){
          imgSrc = './img/homepage/saferisk/low.svg';
        }
        return imgSrc;
      }
    },
		deelHomeTimeFormat() {
      return new Date(this.homeTime).toLocaleString();
    },
    // 地球上方图例返回线的颜色
    getLineColor() {
      return function (item) {
        return item.flag ? item.value : '#ccc';
      };
    },
		// 获取地球的飞线大小对应文字
    getFlyLineSize() {
      let sizeLabel = '小';
      if (this.positionTop.flyLineSize === 1) {
        sizeLabel = '飞线-小';
      } else if (this.positionTop.flyLineSize === 2) {
        sizeLabel = '飞线-中';
      } else {
        sizeLabel = '飞线-大';
      }
      return sizeLabel;
    },
		// 自动计算资源池的用量百分比
    getResourcePoolPercentage(){
      if (!this.resourcePool.total.count || !this.resourcePool.use.count || this.resourcePool.total.count === '0' || this.resourcePool.use.count === '0') {
        return '0%';
      } else {
        let result = '0%';
        let use = Number.isNaN(+this.resourcePool.use.count) ? 0 : +this.resourcePool.use.count;
        let total = +this.resourcePool.total.count;
        if (Number.isNaN(total)){
          return result;
        }
        result = `${Math.round((use / total) * 100)}%`;
        return result;
      }
    }
	},
	methods: {
		timeRangeChange(val) {
      this.getSupport(true); // 筛选支持态势图表数据
    },
		test(e) {
      // this.$refs.earth.clearAllDatas();
      // this.$refs.earthMap.addFlightData([{start: 110000, end: 540000}])
      this.$refs.earth.outFlyToLocation(116.41995, 40.18994);
    },
    ttt(){
      this.$refs.earth.outFlyToOrigin();
    },
    render() {
      this.$refs.earth.renderDatas([
        {
          startArray: {
            name: '杭州',
            N: 30.246026,
            E: 120.210792
          },
          endArray: [
            {
              name: '曼谷',
              N: 22, //维度
              E: 100.49074172973633, //经度
              label: 'xxts',
              status: 'tc'
            }
          ]
        }
      ]);
    },
		// ============> 工具函数
    // 地球左下角资源统计 - 中间选择资源时是否展示该资源对象的条目判断
		resourceSelectIsShow(key){
      let notShow = ['resourceType', 'key'];
      return !notShow.includes(key);
    },
    // 地球左下角资源统计 - 计算回显展示的key中文名称
    computedResourceSelectLabel(key){
      // resourceShowLabels
      let findLabel = $app.resourceStatis.resourceShowLabels.find(item => item.value === key);
      if (findLabel){
        return findLabel.label ? findLabel.label : '';
      } else {
        return '';
      }
    },
		// 地球左下角资源统计 - 计算回显展示的值
    computedResourceSelectValue(value){
      if (value !== null && value !== undefined){
        return Array.isArray(value) && value.length > 0 ? value[0] : value;
      } else {
        return '--';
      }
    },
		// 工具函数 - 转换图表的流量数据单位
    // formatBytesData(value) {
    //   const units = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y', 'B'];
    //   let index = 0;
    //   while (value >= 1024 && index < units.length - 1) {
    //     value /= 1024;
    //     index++;
    //   }
    //   return { value: value.toFixed(0), unit: units[index] };
    // },
    formatBytesData(value, fixed = 0) {
      const units = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y', 'B'];
      let index = 0;
      while (value >= 1000 && index < units.length - 1) {
        value /= 1000;
        index++;
      }
      return { value: value.toFixed(fixed), unit: units[index] };
    },
		// 工具函数 - 转换普通数字数据单位
    formatNumsData(value, fixed = 1, floatFixed = 1) {
      let num = +value;
      const units = ['', '万', '亿', '兆'];
      let index = 0;
      while (num >= 10000 && index < units.length - 1) {
        num /= 10000;
        index++;
      }
      let result = 0;
      if (index > 0) {
        result = num.toFixed(fixed);
      } else {
        if (parseInt(num) === num){
          result = num.toFixed(0);
        } else {
          result = num.toFixed(floatFixed)
        }
      }
      return {
        // value: index > 0 ? num.toFixed(fixed) : num.toFixed(0),
        value: result,
        unit: units[index]
      };
    },
		formatNumsUnit(value, fixed = 1){
      let num = +value;
      let unit = '';
      let result = 0;
      if (num < 10000) {
        result = num + '';
      } else if (num >= 10000 && num < 10000 * 1000){
        num /= 10000;
        result = num.toFixed(fixed);
        unit = '万';
      } else if (num >= 1000 * 10000 && num < 10000 * 10000){
        num /= 10000 * 1000;
        result = num.toFixed(fixed);
        unit = '千万';
      } else if (num >= 10000 * 10000 && num < 10000 * 10000 * 1000){
        num /= 10000 * 10000;
        result = num.toFixed(fixed);
        unit = '亿';
      } else if (num >= 1000 * 10000 * 1000 && num < 10000 * 10000 * 10000) {
        num /= 10000 * 10000 * 1000;
        result = num.toFixed(fixed);
        unit = '千亿';
      } else if (num >= 10000 * 10000 * 10000){
        num /= 10000 * 10000 * 10000;
        result = num.tiFixed(fixed);
        unit = '兆';
      }
      return {
        value: result,
        unit
      }
    },
		// 工具函数 - 处理bps传输速率
    // deelTransferRatio(ratio){
    //   let res = ratio && !Number.isNaN(+ratio) ? ratio : 0;
    //   if (res < 1024){
    //     res = res.toFixed(2);
    //   } else if (res >= 1024 && res < 1024 * 1024){
    //     res = `${(res / 1024).toFixed(2)}K`;
    //   } else if (res >= 1024 * 1024 && res < 1024 * 1024 * 1024){
    //     res = `${(res / (1024 * 1024)).toFixed(2)}M`;
    //   } else if (res >= 1024 * 1024 * 1024) {
    //     res = `${(res / (1024 * 1024)).toFixed(2)}G`;
    //   }
    //   return res;
    // },
		deelTransferRatio(ratio) {
      let res = ratio && !Number.isNaN(+ratio) ? ratio : 0;
      if (res < 1000) {
        res = res.toFixed(2);
      } else if (res >= 1000 && res < 1000 * 1000) {
        res = `${(res / 1000).toFixed(2)}K`;
      } else if (res >= 1000 * 1000 && res < 1000 * 1000 * 1000) {
        res = `${(res / (1000 * 1000)).toFixed(2)}M`;
      } else if (res >= 1000 * 1000 * 1000) {
        res = `${(res / (1000 * 1000)).toFixed(2)}G`;
      }
      return res;
    },
		// 工具函数 - 所有图表的重置大小注册事件
    resize() {
      for (let chartKey in $app.$data.charts) {
        if ($app.$data.charts[chartKey] && $app.$data.charts[chartKey].chart && $app.$data.charts[chartKey].chart.resize) {
          $app.$data.charts[chartKey].chart.resize();
        }
      }
    },
		// 工具函数 - 初始化或修改图表
    setCharts(dataChartKey, chartId, option) {
      if (this.charts[dataChartKey].chart) {
        this.charts[dataChartKey].chart.setOption(option);
      } else {
        let dom = document.getElementById(chartId);
        this.charts[dataChartKey].chart = echarts.init(dom);
        this.charts[dataChartKey].chart.setOption(option);
      }
    },
		// 工具函数 - 根据国家代码获取对应国家国标路径
    getCountryObj(value) {
      let result = {
        chineseName: value,
        imageUrl: null
      }
      const findItem = ChannelDict.alpha_opt.find(item => value === item.chineseName);
      if (findItem){
        result.chineseName = value;
        result.imageUrl = `./assets/country/${findItem['alpha-2'].toLowerCase()}.svg`;
      }
      return result;
    },
		// 工具函数 - 映射资源类型的枚举值
    pieNameFormate(name){
      const dict = {
        vps: '云主机',
        res_proxy: '住宅代理',
        RES: '住宅代理',
        tor:'匿名网络',
        tor_proxy: '匿名网络',
        TOR:'匿名网络',
        iot: '物联网代理', 
        jc_proxy: '机场代理', 
        JC: '机场代理', 
        BJ: '边境无线', 
      };
      return dict[name] || name;
    },
		// ============> 动画函数
    // 进入页面的初始化动画
    enterAnimate() {
      this.positionTop.isfocusDisabled = true;
      gsap.fromTo('.position-right', { right: '-25.78%', opacity: 0 }, { right: '0.0833rem', opacity: 1, duration: 2, ease: 'expo.out', delay: 1.5 });
      gsap.fromTo('.position-center-bottom', { bottom: '-1.27604rem', opacity: 0 }, { bottom: '0.0833rem', opacity: 1, duration: 2, ease: 'expo.out', delay: 1.5 });
      gsap.fromTo(
        '.position-left',
        { left: '-25.78%', opacity: 0 },
        {
          left: '0.0833rem',
          opacity: 1,
          duration: 2,
          ease: 'expo.out',
          delay: 1.5,
          onComplete() {
            $app.animateNumberItemInner('.position-left-container')
            $app.animateNumberItemInner('.position-right-container')
            // 驱动地球上方数字滚动动画
            $app.animateNumberItemInner('.position-center-top');
            $app.positionTop.showTracks = true;
            gsap.fromTo('.corner-item.left', { scale: 0.5, x: '-0.6875rem' }, { opacity: 1, scale: 1, x: 0, duration: 3, ease: 'power4.inOut'});
            gsap.fromTo('.corner-item.right', { scale: 0.5, x: '50%' }, { opacity: 1, scale: 1, x: 0, duration: 3, ease: 'power4.inOut', onComplete(){
              $app.animateNumberItemInner('.position-center-top-corner');
              $app.animateNumberItemInner('.position-center-bottom-corner');
              $app.positionTop.isfocusDisabled = false;
            }});
          }
        }
      );
      gsap.fromTo('.center-top-item', { rotateY: '90deg' }, { rotateY: '0deg', duration: 2, ease: 'expo.out', delay: 1.5 });
    },
		leaveAnimate(action) {
      this.positionTop.isfocusDisabled = true;
      $app.positionTop.showTracks = false;
      gsap.fromTo('.corner-item.left', { opacity: 1, scale: 1, x: 0 }, { scale: 0.5, x: '-0.6875rem', opacity: 0, duration: 1, ease: 'power4.inOut'}) // 加快进入工作台的速度
      gsap.fromTo('.corner-item.right', { opacity: 1, scale: 1, x: 0 }, { scale: 0.5, x: '50%', opacity: 0, duration: 1, ease: 'power4.inOut', onComplete(){
        gsap.fromTo('.position-right', { right: '0.0833rem', opacity: 1 }, { right: '-25.78%', opacity: 0, duration: 1, ease: 'expo.out' });
        gsap.fromTo('.position-center-bottom', { bottom: '0.0833rem', opacity: 1 }, { bottom: '-1.27604rem', opacity: 0, duration: 1, ease: 'expo.out' });
        gsap.fromTo('.position-left', { left: '0.0833rem', opacity: 1 }, { left: '-25.78%', opacity: 0, duration: 1, ease: 'expo.out' });
        $app.positionTop.isfocusDisabled = true;
        if (!$app.positionTop.showControls) {
          gsap.fromTo('.center-top-item', { rotateY: '0deg' }, { rotateY: '90deg', duration: 1, ease: 'expo.out', onComplete(){
            action()
          } });
        } else {
          gsap.fromTo('.center-control-item', { rotateY: '0deg' }, { rotateY: '90deg', duration: 1, ease: 'expo.out' });
          gsap.fromTo('.center-earth-control', { rotateY: '0deg' }, { rotateY: '90deg', duration: 1, ease: 'expo.out', onComplete(){
            action();
          } });
        }
      }})
      // gsap.fromTo('.position-right', { right: '0.0833rem', opacity: 1 }, { right: '-25.78%', opacity: 0, duration: 2, ease: 'expo.out' });
      // gsap.fromTo('.position-center-bottom', { bottom: '0.0833rem', opacity: 1 }, { bottom: '-1.27604rem', opacity: 0, duration: 2, ease: 'expo.out' });
      // gsap.fromTo('.position-left', { left: '0.0833rem', opacity: 1 }, { left: '-25.78%', opacity: 0, duration: 2, ease: 'expo.out' });
      // if (!this.positionTop.showControls) {
      //   gsap.fromTo('.center-top-item', { rotateY: '0deg' }, { rotateY: '90deg', duration: 2, ease: 'expo.out' });
      // } else {
      //   gsap.fromTo('.center-control-item', { rotateY: '0deg' }, { rotateY: '90deg', duration: 2, ease: 'expo.out' });
      //   gsap.fromTo('.center-earth-control', { rotateY: '0deg' }, { rotateY: '90deg', duration: 2, ease: 'expo.out' });
      // }
    },
		controlAnimate() {
      this.positionTop.isfocusDisabled = true;
      gsap.fromTo('.position-right', { right: '-25.78%', opacity: 0 }, { right: '0.0833rem', opacity: 1, duration: 2, ease: 'expo.out' });
      gsap.fromTo('.position-center-bottom', { bottom: '-1.27604rem', opacity: 0 }, { bottom: '0.0833rem', opacity: 1, duration: 2, ease: 'expo.out' });
      gsap.fromTo(
        '.position-left',
        { left: '-25.78%', opacity: 0 },
        {
          left: '0.0833rem',
          opacity: 1,
          duration: 2,
          ease: 'expo.out',
          onComplete() {
            $app.animateNumberItemInner('.position-left-container')
            $app.animateNumberItemInner('.position-right-container')
            // 驱动地球上方数字滚动动画
            $app.animateNumberItemInner('.position-center-top');
            $app.positionTop.showTracks = true;
            gsap.fromTo('.corner-item.left', { scale: 0.5, x: '-0.6875rem' }, { opacity: 1, scale: 1, x: 0, duration: 3, ease: 'power4.inOut'});
            gsap.fromTo('.corner-item.right', { scale: 0.5, x: '50%' }, { opacity: 1, scale: 1, x: 0, duration: 3, ease: 'power4.inOut', onComplete(){
              $app.animateNumberItemInner('.position-center-top-corner');
              $app.animateNumberItemInner('.position-center-bottom-corner');
              $app.positionTop.isfocusDisabled = false;
            }});
          }
        }
      );
    },
		controlAnimateReverse() {
      this.positionTop.isfocusDisabled = true;
      gsap.fromTo('.corner-item.left', { opacity: 1, scale: 1, x: 0 }, { scale: 0.5, x: '-0.6875rem', opacity: 0, duration: 3, ease: 'power4.inOut'});
      gsap.fromTo('.corner-item.right', { opacity: 1, scale: 1, x: 0 }, { scale: 0.5, x: '50%', opacity: 0, duration: 3, ease: 'power4.inOut', onComplete(){
        gsap.fromTo('.position-right', { right: '0.0833rem', opacity: 1 }, { right: '-25.78%', opacity: 0, duration: 2, ease: 'expo.out' });
        gsap.fromTo('.position-center-bottom', { bottom: '0.0833rem', opacity: 1 }, { bottom: '-1.27604rem', opacity: 0, duration: 2, ease: 'expo.out' });
        gsap.fromTo('.position-left', { left: '0.0833rem', opacity: 1 }, { left: '-25.78%', opacity: 0, duration: 2, ease: 'expo.out', onComplete(){
          $app.positionTop.isfocusDisabled = false;
        }});
      }});
      // gsap.fromTo('.position-right', { right: '0.0833rem', opacity: 1 }, { right: '-25.78%', opacity: 0, duration: 2, ease: 'expo.out' });
      // gsap.fromTo('.position-center-bottom', { bottom: '0.0833rem', opacity: 1 }, { bottom: '-1.27604rem', opacity: 0, duration: 2, ease: 'expo.out' });
      // gsap.fromTo('.position-left', { left: '0.0833rem', opacity: 1 }, { left: '-25.78%', opacity: 0, duration: 2, ease: 'expo.out' });
    },
		// 驱动数字滚动动画 - 需要传入对应区域的外层选择器 - 在数值获取到并转为String后调用
    animateNumberItemInner(dom) {
      this.$nextTick(() => {
        let numContainer = document.querySelector(dom);
        let numContents = Array.from(numContainer.querySelectorAll('.num-item-inner'));
        numContents.forEach((num) => {
          gsap.to(num, { top: `-${(num.dataset.height * num.clientHeight) / 10}`, duration: 3, ease: 'power4.inOut' });
        });
      });
    },
		// 向下滚动 - 驱动动画显示地球图例及控制器
		animatePositionTopControls() {
      this.positionTop.animating = true;
      this.positionTop.showControls = true;
      if (!this.positionTop.tl) {
        this.positionTop.tl = gsap.timeline({
          // 注册完成回调
          onComplete() {
            $app.positionTop.animating = false;
          },
          onReverseComplete() {
            $app.positionTop.animating = false;
          }
        });
        let animateItems = gsap.to('.center-top-item', {
          scale: 0.5,
          opacity: 0
        });
        let animateTopControls = gsap.to('.position-center-top-controls', {
          opacity: 1,
          top: 0
        });
        this.positionTop.tl.add(animateItems);
        this.positionTop.tl.add(animateTopControls);
      } else {
        this.positionTop.tl.play();
      }
    },
		// 向上滚动 - 驱动动画显示地球图例及控制器
    animatePositionTopCounts() {
      this.positionTop.animating = true;
      this.positionTop.showControls = false;
      if (this.positionTop.tl) {
        this.positionTop.tl.reverse();
      }
    },
		// 左下角资源统计动画 - 卫星进入 2000
    // animateResourceLeftBottom
		animateResourceLeftBottom(){
      let tl = gsap.timeline();
      let leftItem = document.querySelector('.left-item');
      tl.to('.left-item', { skewX: 0, height: '18.77%', opacity: 1, duration: 1, onComplete(){
        leftItem.classList.add('show');
        tl.pause();
        setTimeout(() => {
          leftItem.classList.remove('show');
          tl.play();
          console.log('时间线play')
        }, 3000);
      }});
      tl.to('.left-item', { skewX: 50, height: '4%', opacity: 0, duration: 1, delay: 1});
      for (let item of $app.resourceStatis.center){
        let indexItemDom = document.querySelector(`.center-item-${item.index}`);
        console.log(item.index);
        tl.to(`.center-item-${item.index}`, { rotateY: '0deg', opacity: 1, duration: 1, onComplete(){
          indexItemDom.classList.add('show');
          tl.pause();
          setTimeout(() => {
            indexItemDom.classList.remove('show');
            tl.play();
          }, 3000);
        }});
        tl.to(`.center-item-${item.index}`, { rotateY: '90deg', opacity: 0, duration: 1, delay: 1 })
      }
      tl.to('.bottom-item', { filter: 'blur(0)', opacity: 1, duration: 1.5, onComplete(){
        tl.pause();
        setTimeout(() => {
          tl.play();
        }, 3000)
      } });
      tl.to('.bottom-item', { filter: 'blur(0.03125rem)', opacity: 0, duration: 1.5 });
      tl.repeat(-1)
    },
		// 左下角资源统计动画 - 卫星离开 2000
    animateResourceLeftClose(){
      let leftItem = document.querySelector('.left-item');
      setTimeout(() => {
        leftItem.classList.remove('show');
        gsap.to('.left-item', { skewX: 50, height: '4%', opacity: 0, duration: 1, delay: 1 })
      }, 15000);
    },
		// 左下角资源统计动画 - 普通资源进入 2000
    // animateResourceRightShow(){
    //   let rightItem = document.querySelector('.right-item');
    //   gsap.to('.right-item', { rotateY: '0deg', opacity: 1, duration: 1, onComplete(){
    //     rightItem.classList.add('show');
    //   }});
    // },
    // // 左下角资源统计动画 - 普通资源离开 2000
    // animateResourceRightClose(){
    //   let rightItem = document.querySelector('.right-item');
    //   setTimeout(() => {
    //     rightItem.classList.remove('show');
    //     gsap.to('.right-item', { rotateY: '90deg', opacity: 0, duration: 1, delay: 1 })
    //   })
    // },
    // 左下角资源统计动画 - 地下资源进入 1500
    animateResourceBottomShow(){
      gsap.to('.bottom-item', { filter: 'blur(0)', opacity: 1, duration: 1.5 })
    },
    // 左下角资源统计动画 - 地下资源离开 1500
    animateResourceBottomClose(){
      gsap.to('.bottom-item', { filter: 'blur(0.03125rem)', opacity: 0, duration: 1.5 });
    },
		animateResourceCallBack(){
      $app.animateResourceLeftShow();
        setTimeout(() => {
          $app.animateResourceLeftClose();
        }, 7000);
        setTimeout(() => {
          $app.animateResourceBottomShow();
        }, 28000);
        setTimeout(() => {
          $app.animateResourceBottomClose();
        }, 35500);
    },
		// ============> 事件函数
    showDialoger(){
      this.dialogFlag = true;
      gsap.to('.mask', { opacity: 1,  duration: 0.5, onComplete(){
        gsap.to('.dialoger-container', {
          duration: 0.8,
          rotateX: '0deg',
          // scale: 1
        });
      }})
    },
		closeDialoger(){
      gsap.to('.dialoger-container', {
        duration: 0.8,
        rotateX: '90deg', 
        // scale: 0.7,
        onComplete(){
          gsap.to('.mask', { duration: 0.8, opacity: 0, onComplete(){
            $app.dialogFlag = false;
          }})
        }
      });
    },
		// 切换资源池的key
    changeResourcePool(key){
      this.resourcePool.key = key;
      $app.animateNumberItemInner('.resource-pool-section')
    },
    datePickerFocus() {
      this.dateBg = 'select';
    },
    datePickerBlur() {
      this.dateBg = 'default';
    },
		// 进入工作台
    linkToIndex() {
      this.leaveAnimate(function (){
        window.location.href = 'index.html';
      });
      // setTimeout(() => {
      //   window.location.href = 'index.html';
      // }, 1000);
    },
    // 退出
    quit() {
      this.leaveAnimate(function (){
        let url = 'login.html';
        let code = sessionStorage.getItem('code');
        if (code) url += '?logout=1';
        else $api.Account.Logout();
        location.href = url;
      });
    },
		// 初始化数据
    init() {
      // earthleftdata
      // this.getEarchDatas();
      // this.getEarthDatasTest();
      this.getEarthDatasReal();
      // (地球下方)获取支撑态势图表数据
      this.getSupport();
      // 获取顶部三个数
      this.getTopThree();
      // 获取地球四个角
      this.getCorner();
      // 获取地球左侧数据 - 资源池
      this.getResourcePool();
      // 获取地球左侧数据 - 资源分布
      this.getResourceDistribution();
      // 获取地球左侧数据 - 厂商
      this.getResourceVendor();
      // 获取地球左侧数据 - 资源分布
      this.getResourceLeftBottom();
      // 获取地球右侧数据
      this.getEarthRight();
    },
		// 间隔更新数据
    update() {
      // 获取支撑态势图表数据
      this.getSupport(true);
      // 获取顶部三个数
      this.getTopThree(true);
      // 获取地球左侧数据 - 资源池
      this.getResourcePool(true);
      this.getResourceDistribution(true);
      // 获取地球左侧数据 - 厂商
      this.getResourceVendor();
      // 获取地球左侧数据 - 资源分布
      this.getResourceLeftBottom();
      this.getEarthRight(true);
    },
		// 安全加固点击自定义图例事件
    triggleSafeLegend(item){
      this.charts.safeReinforce.chart.dispatchAction({
        type: 'legendToggleSelect',
        name: item.name
      });
      item.legendFlag = !item.legendFlag;
    },
		// 资源分布饼图自定义图例事件
    triggleDistributionPie(item) {
      this.charts.distributionPie.chart.dispatchAction({
        type: 'legendToggleSelect',
        name: item.name
      });
      item.legendFlag = !item.legendFlag;
    },
		// 点击地球的图例 - 控制不同类型的飞线显隐
    clearFlyLine(key, item) {
      item.flag = !item.flag;
      if (this.$refs.earth) {
        this.$refs.earth.clearFlyLine(key, item.key, item.flag);
      }
    },
		// 地球顶部的数值和地球图例滚轮切换
    positionTopWheel(e) {
      if (this.positionTop.isfocus) {
        return;
      }
      // 向下滚动
      if (e.wheelDelta < 0 && !this.positionTop.showControls && !this.positionTop.animating) {
        this.animatePositionTopControls();
      }
      // 向下滚动
      if (e.wheelDelta > 0 && this.positionTop.showControls && !this.positionTop.animating) {
        this.animatePositionTopCounts();
      }
    },
		// 点击地球上方的上滑块激活数据部分动画及显示
    activeShowControls() {
      if (this.positionTop.isfocus) {
        return;
      }
      this.animatePositionTopCounts();
    },
    // 点击地球上方的下滑块激活专注模式动画及显示
    deactiveShowControls() {
      if (this.positionTop.isfocus) {
        return;
      }
      this.animatePositionTopControls();
    },
		// 地球上方的控制器暂停 / 恢复地球旋转
    changeRotation() {
      if (this.positionTop.earthRotation) {
        this.positionTop.earthRotation = false;
        this.$refs.earth.stopRotation();
      } else {
        this.positionTop.earthRotation = true;
        this.$refs.earth.playRotation();
      }
    },
    // 恢复初始地球视角
    resetCamera() {
      this.$refs.earth.resetCamera();
    },
		// 切换模式
    changeMode() {
      if (this.positionTop.isfocusDisabled){
        return;
      }
      if (this.positionTop.isfocus) {
        this.positionTop.isfocus = false;
        this.controlAnimate();
      } else {
        this.positionTop.isfocus = true;
        this.controlAnimateReverse();
      }
    },
		changeLineMode() {
      if (this.positionTop.isDashed) {
        this.changeFlyLineSolid();
        this.positionTop.isDashed = false;
      } else {
        this.changeFlyLineDashed();
        this.positionTop.isDashed = true;
      }
    },
		// 新增切换飞线为虚线模式
    changeFlyLineDashed() {
      let lineGroup = this.$refs.earth.earth.earthGroup.children.find((item) => {
        return item.userData['isLinesGroup'];
      }) || { children: [] };
      lineGroup.children.forEach((line) => {
        if (line.material) {
          line.material.dashSize = 1;
          line.material.gapSize = 0.5;
        }
        line.computeLineDistances();
      });
    },
		// 新增切换飞线为实线模式
    changeFlyLineSolid() {
      let lineGroup = this.$refs.earth.earth.earthGroup.children.find((item) => {
        return item.userData['isLinesGroup'];
      }) || { children: [] };
      lineGroup.children.forEach((line) => {
        if (line.material) {
          line.material.dashSize = 3;
          // line.material.dashSize = 0;
          line.material.gapSize = 0;
        }
        line.computeLineDistances();
      });
    },
		// 关闭 / 开启起终点的光柱及波纹
    closeMarkupPoint() {
      this.positionTop.showMarkupPoint = !this.positionTop.showMarkupPoint;
      let markupGroup = this.$refs.earth.earth.earthGroup.children.find((item) => {
        return item.userData['isMarkupPoint'];
      }) || { children: [] };
      markupGroup.children.forEach((item) => {
        if (item.userData['isLightPillar'] || item.userData['isWaveMesh']) {
          item.visible = this.positionTop.showMarkupPoint;
        }
      });
    },
		// 改变飞线段的大小
    changeFlyLineSize() {
      if (this.positionTop.flyLineSize == 1) {
        this.positionTop.flyLineSize = 2;
      } else if (this.positionTop.flyLineSize == 2) {
        this.positionTop.flyLineSize = 3;
      } else {
        this.positionTop.flyLineSize = 1;
      }
      let lineGroups = this.$refs.earth.earth.earthGroup.children.find((item) => {
        return item.userData['isLinesGroup'];
      });
      lineGroups.children.forEach((item) => {
        item.children[0].material.size = this.positionTop.flyLineSize;
      });
    },
		// ============> 数据函数
    // 获取地球的跳转数据
		getEarchDatas() {
      // $app.$refs.earth.init();
      $api.situation.getEarth(
        {},
        function (res) {
          console.log('老的地球数据')
          console.log(res)
          if (res.code === 200 && res.data && Array.isArray(res.data.earth) && res.data.earth.length > 0) {
            $app.jumps = res.data.earth;
            $app.$refs.earth.init();
          } else {
            $app.$refs.earth.init();
          } 
        },
        function (err) {
          console.log(err);
          $app.$refs.earth.init();
        },
        function () {
          // 调整调用页面进入动画的时机，改在地球加载后调用
          $app.enterAnimate();
          setTimeout(() => {
            $app.changeRotation();
          }, 8000);
        }
      );
    },
		// 获取地球数据 - 真实版
		getEarthDatasReal(){
			let labels = ['zlkz', 'sjhc', 'xxts'];
			let { nodes, edges } = RequestDatas.earth;
			let result = [];
			edges.forEach((endArr, nodeIndex) => {
        let node = {
          startArray: nodes[nodeIndex],
          endArray: []
        };
        endArr.forEach((end, endIndex) => {
          let endCode = end.toString(2).padStart(5, '0');
          let lineStr = endCode.slice(3);
          let lineCode = endCode.slice(0, 3);
          let lines = lineCode.split('');
          let statusCode = endCode.slice(3);
          // console.log('图表码')
          // console.log(endCode)
          if (end !== 0 && statusCode !== '00'){
            lines.forEach((line, lineType) => {
              if (line !== '0'){
                let status = 'tc'
                switch(statusCode){
                  case '01':
                    status = 'tc';
                    break;
                  case '11':
                    status = 'yj';
                    break;
                  case '10':
                    status = 'zd';
                    break;
                }
                let endNode = {
                  name: nodes[endIndex].name,
                  N: nodes[endIndex].N,
                  E: nodes[endIndex].E,
                  label: labels[lineType],
                  status
                }
                nodeIndex !== endIndex && node.endArray.push(endNode);
              }
            });
          }
        });
        result.push(node);
      });
			$app.jumps = result;
			$app.$refs.earth.init();
			$app.enterAnimate();
      setTimeout(() => {
        console.log('执行启动旋转')
        $app.changeRotation();
      }, 8000);
		},
		// 获取首页顶端前三项数据
		getTopThree(){
			$app.centerTop[0].value = '9299';
			let network_load = 0.40167945053651094;
      $app.centerTop[1].value = (network_load * 100).toFixed(2);
      $app.centerTop[2].value = '681';
			$app.centerTop[3].value = '100';
			$app.animateNumberItemInner('.position-center-top');
		},
		// 获取地球四个角的数据
		getCorner(){
			RequestDatas.corner.forEach(item => {
        if (item.sys && item.sys.toLowerCase() === 'a'){
          let upBytes = item.up_bytes || 0;
          let downBytes = item.down_bytes || 0;
          $app.corner.A.count = upBytes + downBytes;
          $app.corner.A.rate = item.rate && typeof item.rate === 'number' ? +item.rate.toFixed(1) : 0;
          // $app.corner.A.num = item.count && typeof item.count === 'number' ? item.count : 0;
          // 写死数据
          $app.corner.A.num = '14'
        } else if (item.sys && ['o', 'b', 'c'].includes(item.sys.toLowerCase())) {
          $app.corner[item.sys.toUpperCase()].count = item.request_total || 0;
          $app.corner[item.sys.toUpperCase()].rate = item.rate && typeof item.rate === 'number' ? +item.rate.toFixed(1) : 0;
          $app.corner[item.sys.toUpperCase()].num = item.count && typeof item.count === 'number' ? item.count : 0;
          // 写死数据
          $app.corner.B.count = 0;
          $app.corner.B.rate = 0;
          $app.corner.B.num = 0;
        }
      });
			$app.animateNumberItemInner('.position-center-bottom-corner');
      $app.animateNumberItemInner('.position-center-top-corner');
		},
		// 获取地球下方支撑态势图表 数据
		getSupport(isUpdate){
			let option = JSON.parse(JSON.stringify(supportOption));
      option.color = ['#3A89FF'];
      !isUpdate && $app.deelSupportError(option);
			!isUpdate && $app.charts.support.chart && $app.charts.support.chart.clear();
			let { time, percent, total } = RequestDatas.support;
			option.xAxis.data =
        Array.isArray(time) && time.length > 0
          ? time.map((t) => {
              return new Date(t).toLocaleString();
            })
          : [];
      option.series = [];
      option.legend.data = [];
			option.series.push({
        name: '任务数量',
        yAxisIndex: 0,
        data: total,
        type: 'bar',
        itemStyle: {
          color: '#05fcfc'
        }
      });
			option.series.push({
        name: '执行成功率',
        yAxisIndex: 1,
        data: percent,
        type: 'line',
        // symbol: 'none',
        symbolSize: 6,
        // smooth: true,
        lineStyle: {
          width: 1,
          // color:  'rgba(38, 249, 195, 1)'
          color: 'rgb(58, 137, 255)'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            // { offset: 0, color: linearChartColors[3]},
            // { offset: 1, color: transparentColors[3]}
            { offset: 0, color: 'rgba(58, 137, 255, .7)' },
            { offset: 1, color: 'rgba(58, 137, 255, 0)' }
          ])
        }
      });
			option.tooltip.formatter = (params) => {
        // let results = params.map(pItem => `<div class='flex_between'><span>${pItem.marker}${pItem.seriesName}</span>&emsp;<span>${pItem.value} bps</span></div>`);
        let results = params.map((pItem) => {
          let unit = pItem.seriesType === 'line' ? '%' : '个';
          let value = pItem.seriesType === 'line' ? pItem.value.toFixed(2) : pItem.value;
          return `<div class='flex_between'><span>${pItem.marker}${pItem.seriesName}</span>&emsp;<span>${value} ${unit}</span></div>`;
        });
        results.unshift(params[0].axisValue);
        return results.join('');
      };
      option.legend.data.push('执行成功率', '任务数量');
			$app.setCharts('support', 'support-chart', option);
      ////////
      console.log($app.charts.support.chart.getOption());
		},
		// 处理支撑态势数据错误或为空
    deelSupportError(option) {
      let now = Date.now();
      let times = [];
      times.length = 8;
      times.fill(now);
      times = times.map((item, index) => {
        return new Date(item - 600000 * index).toLocaleString();
      });
      times.reverse();
      option.xAxis.data = times;
      option.series = [];
      option.legend.data = [];
      // option.yAxis[0].splitLine.show = true;
      // option.yAxis[0].splitLine.showMinLine = true;
      // option.yAxis[0].splitLine.showMaxLine = true;
      // option.yAxis[0].max = 10;
      // option.yAxis[0].min = 5;
      option.yAxis[1].splitLine.show = true;
      option.yAxis[1].splitLine.showMinLine = true;
      option.yAxis[1].splitLine.showMaxLine = true;
      option.yAxis[1].max = 100;
      option.yAxis[1].min = 0;
      option.yAxis[0].splitLine.show = false;
      $app.setCharts('support', 'support-chart', option);
    },
		// 获取地球左侧数据 - 资源池数据
		getResourcePool(isUpdate){
			RequestDatas.resourcePool.forEach(item => {
        if (typeof item === 'object' && item && item.type == '1'){
          $app.resourcePool.total.count = typeof item.total === 'number' ? item.total + '' : '0'; 
          $app.resourcePool.total.anonymous = typeof item.anonymousTotal === 'number' ? item.anonymousTotal + '' : '0'; 
          $app.resourcePool.total.open = typeof item.publicTotal === 'number' ? item.publicTotal + '' : '0'; 
        }  else if (typeof item === 'object' && item && item.type == '2') {
          $app.resourcePool.use.count = typeof item.total === 'number' ? item.total + '' : '0'; 
          $app.resourcePool.use.anonymous = typeof item.anonymousTotal === 'number' ? item.anonymousTotal + '' : '0'; 
          $app.resourcePool.use.open = typeof item.publicTotal === 'number' ? item.publicTotal + '' : '0'; 
        }
      });
			isUpdate && $app.animateNumberItemInner('.resource-pool-section');
		},
		// 获取地球左侧资源分布数据 - 饼图和折线图
		getResourceDistribution(isUpdate){
			let dataKeys = ['vps', 'tor', 'jc_proxy', 'res_proxy', 'iot'];
      let times = [];
      let uses = [];
      let totals = [];
      let pie3dDatas = [];
      let datas = {
        vps: {
          use: [],
          total: []
        },
        tor: {
          use: [],
          total: []
        },
        jc_proxy: {
          use: [],
          total: []
        },
        res_proxy: {
          use: [],
          total: []
        },
        iot: {
          use: [],
          total:[]
        }
      };
			let result = RequestDatas.resourceDistribution;
			dataKeys.forEach(key => {
        let typeDatas = result.filter(item => item.type === key);
        let typeUse = Array.isArray(typeDatas) && typeDatas.length > 0 ? typeDatas.filter(data => data.dimension === 'use') : [];
        let typeTotal = Array.isArray(typeDatas) && typeDatas.length > 0 ? typeDatas.filter(data => data.dimension === 'total') : [];
        typeUse.sort((a, b) => {
          let dateA = a.time.split(/[- :]/);
          let dateB = b.time.split(/[- :]/);
          for (let i = 0; i < dateA.length; i++) {
            if (parseInt(dateA[i], 10) > parseInt(dateB[i], 10)) {
              return 1;
            } else if (parseInt(dateA[i], 10) < parseInt(dateB[i], 10)) {
              return -1;
            }
          }
          return 0;
        });
        typeTotal.sort((a, b) => {
          let dateA = a.time.split(/[- :]/);
          let dateB = b.time.split(/[- :]/);
          for (let i = 0; i < dateA.length; i++) {
            if (parseInt(dateA[i], 10) > parseInt(dateB[i], 10)) {
              return 1;
            } else if (parseInt(dateA[i], 10) < parseInt(dateB[i], 10)) {
              return -1;
            }
          }
          return 0;
        });
        times = typeTotal.map(total => total.time);
        datas[key].use = typeUse.map(use => use.count);
        datas[key].total = typeTotal.map(total => total.count);
      });
			pie3dDatas = dataKeys.map((key, ind) => {
        let item = { name: key, value: datas[key].use.at(-1), itemStyle: { opacity: 0.7, color: pieChart3dColors[ind]} }
        return item;
      });
			times.forEach((time, index) => {
        uses[index] = dataKeys.reduce((counts, key) => {
          counts += datas[key].use[index];
          return counts;
        }, 0);
        totals[index] = dataKeys.reduce((counts, key) => {
          counts += datas[key].total[index];
          return counts;
        }, 0);
      });
			$app.getDistributionLine({
        times,
        uses,
        totals
      }, isUpdate);
      $app.deelDistributionPie(pie3dDatas);
		},
		// second - 获取资源分布中间折线图数据
    getDistributionLine(datas, isUpdate){
      let option = JSON.parse(JSON.stringify(transferOption));
      option.color = resourceLineChartColors;
      !isUpdate && $app.charts.distributionLine.chart && $app.charts.distributionLine.chart.clear();
      !isUpdate && $app.deelDistributionError(option)
      option.yAxis.splitLine.show = true;
      option.yAxis.splitLine.showMinLine = true;
      option.yAxis.splitLine.showMaxLine = true;
      option.yAxis.name = undefined;
      option.series = [];
      option.legend.data = [];
      option.grid.top = setChartSize(10);
      // 填充x时间轴
      let now = Date.now();
      let times = [];
      times.length = 8;
      times.fill(now);
      times = times.map((item, index) => {
        return new Date(item - 600000 * index).toLocaleString();
      });
      times.reverse();
      option.xAxis.data = datas.times && datas.times.length > 0 ? datas.times : times;
      option.yAxis.min = function (value){
        let result = Number.isNaN(value.min) ? 5 : null;
        return result;
      }
      option.yAxis.max = function (value){
        let result = Number.isNaN(value.max) ? 5 : null;
        return result;
      }
      option.yAxis.axisLabel.formatter = function (value) {
        // if (value > 1000){
        // 	return (value / 1000).toFixed(0) + 'K';
        // }
        // return $app.deelTransferRatio(value);
        let formatObj = $app.formatNumsData(value)
        return formatObj.value + formatObj.unit;
      };
      option.yAxis.splitNumber = 3
      // 填充y值轴
      option.series.push({
        // name: item.name,
        name: '资源总量可用',
        data: datas.totals && datas.totals.length > 0 ? datas.totals : [],
        // data: [],
        type: 'line',
        symbol: 'none',
        // symbol: 'emptyCircle',
        // smooth: true,
        lineStyle: { width: 1 },
        areaStyle: { color: null }
      });
      option.series.push({
        // name: item.name,
        name: '资源使用量',
        data: datas.uses && datas.uses.length > 0 ? datas.uses : [],
        // data: [],
        type: 'line',
        symbol: 'none',
        // symbol: 'emptyCircle', 
        // smooth: true,
        lineStyle: { width: 1 },
        areaStyle: { color: null }
      });
      option.legend = {
        show: true,
        orient: 'horizontal',
        left: 'center',
        bottom: 0,
        align: 'auto',
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: '#ccc',
        borderRadius: 0,
        borderWidth: 0,
        padding: setChartSize(5),
        itemGap: setChartSize(10),
        // itemWidth: setChartSize(25),
        // itemHeight: setChartSize(14),
        itemWidth: setChartSize(20),
        itemHeight: setChartSize(2),
        textStyle: {
          color: '#868e97',
          fontSize: setChartSize(14)
        },
        icon: 'roundRect'
      };
      option.legend.data = ['资源总量可用', '资源使用量'];
      // secondchart - 资源储备
      option.tooltip.formatter = function (params){
        let results = params.map((pItem) => {
          let value = $app.formatNumsData(pItem.value).value + $app.formatNumsData(pItem.value).unit;
          return `<div class='flex_between'><span>${pItem.marker}${pItem.seriesName}</span>&emsp;<span>${value} 个</span></div>`;
        });
        results.unshift(params[0].axisValue);
        return results.join('');
      }
      // 统一处理颜色渐变样式
      option.series.forEach((item, index) => {
        item.areaStyle.color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: resourceLineChartLinearColors[index] },
          { offset: 1, color: resourceLineChartTransparentColors[index] }
        ]);
      });
      $app.setCharts('distributionLine', 'distribution-line-chart', option);
    },
    deelDistributionError(option){
      option.yAxis.splitLine.show = true;
      option.yAxis.splitLine.showMinLine = true;
      option.yAxis.splitLine.showMaxLine = true;
      option.yAxis.max = 10;
      option.yAxis.min = 5;
      option.series = [];
      option.legend.data = [];
      option.xAxis.show = true;
      option.xAxis.axisLine = {show: true};
      option.xAxis.axisTick = { show: true};
      option.xAxis.axisLabel.show = true;
      option.yAxis.show = true;
      $app.setCharts('distributionLine', 'distribution-line-chart', option);
    },
		// 渲染资源分布3d饼图
    deelDistributionPie(optionsData){
      $app.charts.distributionPie.chart && $app.charts.distributionPie.chart.clear();
      function getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, height) {
        // 计算
        const midRatio = (startRatio + endRatio) / 2
        const startRadian = startRatio * Math.PI * 2
        const endRadian = endRatio * Math.PI * 2
        const midRadian = midRatio * Math.PI * 2
        // 如果只有一个扇形，则不实现选中效果。
        if (startRatio === 0 && endRatio === 1) {
          isSelected = false
        }
        // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
        k = typeof k !== 'undefined' ? k : 1 / 3
        // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
        const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0
        const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0
        // 计算高亮效果的放大比例（未高亮，则比例为 1）
        const hoverRate = isHovered ? 1.05 : 1
          // 返回曲面参数方程
        return {
          u: {
            min: -Math.PI,
            max: Math.PI * 3,
            step: Math.PI / 32
          },
          v: {
            min: 0,
            max: Math.PI * 2,
            step: Math.PI / 20
          },
          x: function(u, v) {
            if (u < startRadian) {
              return (
                offsetX +
                Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
              )
            }
            if (u > endRadian) {
              return (
                offsetX +
                Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
              )
            }
            return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate
          },
          y: function(u, v) {
            if (u < startRadian) {
              return (
                offsetY +
                Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
              )
            }
            if (u > endRadian) {
              return (
                offsetY +
                Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
              )
            }
            return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate
          },
          z: function(u, v) {
            if (u < -Math.PI * 0.5) {
              return Math.sin(u)
            }
            if (u > Math.PI * 2.5) {
              return Math.sin(u)
            }
            return Math.sin(v) > 0 ? 1 * height : -1
          }
        }
      }
      function getPie3D(pieData, internalDiameterRatio) {
        $app.charts.distributionPie.data = []
        const series = []
        let sumValue = 0
        let startValue = 0
        let endValue = 0
        const legendData = []
        const k = typeof internalDiameterRatio !== 'undefined'? (1 - internalDiameterRatio) / (1 + internalDiameterRatio) : 1 / 3
        // 为每一个饼图数据，生成一个 series-surface 配置
        for (let i = 0; i < pieData.length; i++) {
          sumValue += pieData[i].value
          const seriesItem = {
            name:
              typeof pieData[i].name === 'undefined'
                ? `series${i}`
                : pieData[i].name,
            type: 'surface',
            parametric: true,
            wireframe: {
              show: false
            },
            pieData: pieData[i],
            pieStatus: {
              selected: false,
              hovered: false,
              k: k
            }
          }
          if (typeof pieData[i].itemStyle !== 'undefined') {
            const itemStyle = {}
            typeof pieData[i].itemStyle.color !== 'undefined'
              ? (itemStyle.color = pieData[i].itemStyle.color)
              : null
            typeof pieData[i].itemStyle.opacity !== 'undefined'
              ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
              : null
              seriesItem.itemStyle = itemStyle
          }
          series.push(seriesItem);
        }
        // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
        // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
        for (let i = 0; i < series.length; i++) {
          endValue = startValue + series[i].pieData.value
          series[i].pieData.startRatio = startValue / sumValue
          series[i].pieData.endRatio = endValue / sumValue
          series[i].parametricEquation = getParametricEquation(
            series[i].pieData.startRatio,
            series[i].pieData.endRatio,
            false,
            false,
            k,
            2000
          )
          startValue = endValue
          legendData.push(series[i].name)
          $app.charts.distributionPie.data.push({
            name: pieData[i].name,
            value: pieData[i].value,
            rate: ((pieData[i].value / sumValue) * 100).toFixed(0),
            legendFlag: true
          });
        }
        return series
      }
      const series = getPie3D(optionsData.map(item => {
        if (item.value < 5) {
          item.value = 5
        }
        return item
      }), 0, 240, 28, 26, 0.5)
      series.push({
        name: 'pie2d',
        type: 'pie',
        label: {
          show: false,
          opacity: 1,
          position: 'outside',
          fontSize: setChartSize(12),
          lineHeight: setChartSize(20),
          textStyle: {
            fontSize: setChartSize(12),
            color: '#fff'
          }
        },
        labelLine: {
          length: 30,
          length2: 30
        },
        minAngle: 10,
        startAngle: -50, // 起始角度，支持范围[0, 360]。
        clockwise: false, // 饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
        radius: ['0', '25%'],
        center: ['50%', '50%'],
        data: optionsData.map(item => {
          item.itemStyle.opacity = 0
          return item
        })
      })
      // 准备待返回的配置项，把准备好的 legendData、series 传入。
      const option = {
        legend: {
          show: false
        },
        animation: true,
        tooltip: {
          formatter: (params) => {
            if (
              params.seriesName !== 'mouseoutSeries' &&
              params.seriesName !== 'pie2d'
            ) {
              return `${
                $app.pieNameFormate(params.seriesName)
              }<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
                params.color
              };"></span>${
                // option.series[params.seriesIndex].pieData.value + '%'
                option.series[params.seriesIndex].pieData.value
              }个`
            }
          },
          backgroundColor: 'rgba(24, 34, 107, .7)',
          borderColor: 'rgba(50, 57, 103, 0.9)',
          borderWidth: 1,
          textStyle: {
            color: '#ddeeff',
            fontSize: setChartSize(14)
          }
        },
        title: {
          x: 'center',
          top: '20',
          textStyle: {
            color: '#fff',
            fontSize: 22
          }
        },
        // backgroundColor: '#0E3567',
        labelLine: {
          show: true,
          lineStyle: {
            color: '#7BC0CB'
          },
          normal: {
            show: true,
            length: 10,
            length2: 10
          }
        },
        label: {
          show: true,
          position: 'outside',
          formatter: '{b} \n{d}%',
          textStyle: {
            color: '#fff',
            fontSize: '12px'
          }
        },
        xAxis3D: {
          min: -1,
          max: 1
        },
        yAxis3D: {
          min: -1,
          max: 1
        },
        zAxis3D: {
          min: -1,
          max: 1
        },
        grid3D: {
          show: false,
          // boxHeight: 0.01,
          boxHeight: 0.02,
          // top: '30%',
          bottom: '50%',
          // environment: "rgba(255,255,255,0)",
          viewControl: {
            // distance: 300,
            distance: 200,
            // alpha: 40,
            alpha: 30,
            beta: 60,
            autoRotate: true // 自动旋转
          }
        },
        series: series
      }
      $app.setCharts('distributionPie', 'distribution-pie-chart', option);
    },
		// 获取地球左侧数据 - 资源分布(厂商5个数)
		getResourceVendor(isUpdate){
			let datas = RequestDatas.resourceVendor;
			// 云专线厂商
      $app.resourceDistribution.item1 = typeof datas.cloudVendorTotal === 'number' ? datas.cloudVendorTotal + '' : '0';
      // 云服务厂商
      $app.resourceDistribution.item2 = typeof datas.cloudOperatorTotal === 'number' ? datas.cloudOperatorTotal + '' : '0';
      // 代理供应商
      $app.resourceDistribution.item3 = typeof datas.proxyVendorTotal === 'number' ? datas.proxyVendorTotal + '' : '0';
      // 公开代理采集
      $app.resourceDistribution.item4 = typeof datas.publicVendorTotal === 'number' ? datas.publicVendorTotal + '' : '0';
      // IOT
      $app.resourceDistribution.item5 = typeof datas.iotDeviceTotal === 'number' ? datas.iotDeviceTotal + '' : '0';
			isUpdate && $app.animateNumberItemInner('.resource-distribution-bottom');
		},
		// 对地球左下角资源统计的中间资源数组进行结构初始化
    initResourceLeftBottomCenter(){
      let resourceCenterKeys = [
        { value: 'BJ', key: 'BJ' },
        { value: 'res_proxy', key: 'RES' },
        { value: 'jc_proxy', key: 'JC' },
        { value: 'tor_proxy', key: 'TOR' },
        { value: 'vps', key: 'vps' },
        { value: 'iot', key: 'iot' }
      ];
      $app.resourceStatis.center.forEach(item => {
        let findKeyObj = resourceCenterKeys.find(obj => obj.value === item.resourceType);
        item = JSON.parse(JSON.stringify(defaultResourceCenter));
        item.resourceType = findKeyObj.value;
        item.key = findKeyObj.key;
      });
    },
		// 获取地球左侧数据 - 左下角拓补图 
		getResourceLeftBottom(isUpdate){
			$app.initResourceLeftBottomCenter();
			RequestDatas.resourceStatis.forEach(item => {
        if (item.resourceType === 'SAT'){
          let countryStr = Array.isArray(item.districtList) && item.districtList.length > 0 ? item.districtList[0] : '';
          let countryResult = countryStr.split('-');
          let countryChinese = countryResult.length > 0 && countryResult[0] ? countryResult[0] : null;
          let countryUrl = countryChinese ? $app.getCountryObj(countryChinese).imageUrl : null;
          $app.resourceStatis.sat.count = item.count || 0;
          $app.resourceStatis.sat.country = Array.isArray(item.districtList) && item.districtList.length > 0 ? item.districtList[0] : '--';
          $app.resourceStatis.sat.countryUrl = countryUrl;
        }
        if ($app.resourceStatis.center.map(res => res.resourceType).includes(item.resourceType)){
          let findItem = $app.resourceStatis.center.find(res => res.resourceType === item.resourceType);
          Object.assign(findItem, item);
        }
        if (item.resourceType === 'SDWAN' || item.resourceType === 'DPN'){
          let count = item.count && typeof item.count === 'number' ? item.count : 0;
          $app.resourceStatis.bottom.count += count;
          $app.resourceStatis.bottom.bandwidth = item.bandwidth && item.bandwidth.includes('M') ? item.bandwidth : '0M';
        }
      });
			$app.animateResourceLeftBottom()
		},
		// 获取地球右侧总体数据
		getEarthRight(isUpdate){
			let safeReinforceCounts = {
        '中影响漏洞数': 0,
        '中影响配置脆弱点': 0,
        '低影响漏洞数': 0,
        '低影响配置脆弱点': 0,
        '高影响漏洞数': 0,
        '高影响配置脆弱点': 0
      }
      let safeReinforceRates = {
        '中影响漏洞修复率': 0,
        '中影响配置加固率': 0,
        '低影响漏洞修复率': 0,
        '低影响配置加固率': 0,
        '高影响漏洞修复率': 0,
        '高影响配置加固率': 0
      }
      let safeRiskTopDatas = {};
      let countrys = {};
      let safeRiskCenterDatas = {};
      let warningList = [];
			let earthRight = RequestDatas.earthRight;
			let safeSituation = earthRight['总体安全态势'];
      let safeReinforce = earthRight['安全加固状态'];
      let safeRisk = earthRight['安全风险统计'];
      let warning = earthRight['威胁预警信息'];
			if (safeReinforce && typeof safeReinforce === 'object'){
        safeReinforce['影响程度分布'] && (safeReinforceCounts = safeReinforce['影响程度分布']);
        safeReinforce['影响程度修复率分布'] && (safeReinforceRates = safeReinforce['影响程度修复率分布']);
      }
			if (safeRisk && safeRisk['风险防御攻击次数分月统计'] && safeRisk['风险防御防御率分月统计']){
        let times = Object.keys(safeRisk['风险防御攻击次数分月统计']);
        let totals = Object.keys(safeRisk['风险防御攻击次数分月统计']).map(item => {
          return safeRisk['风险防御攻击次数分月统计'][item];
        });
        let percents = Object.keys(safeRisk['风险防御防御率分月统计']).map(item => {
          let percent = safeRisk['风险防御防御率分月统计'][item];
          return typeof percent === 'number' ? (percent * 100).toFixed(2) * 1 : 0;
        });
        safeRiskTopDatas.times = times;
        safeRiskTopDatas.totals = totals;
        safeRiskTopDatas.percents = percents;
      }
			if (safeRisk && safeRisk['攻击源国家top10']){
        countrys = safeRisk['攻击源国家top10'];
      }
			if (safeRisk && safeRisk['安全风险分类别统计']){
        let times = Object.keys(safeRisk['安全风险分类别统计']);
        let totals = times.map(key => safeRisk['安全风险分类别统计'][key]['风险数量']);
        let percents = times.map(key => {
          // safeRisk['安全风险分类别统计'][key]['研判覆盖率']
          let percent = safeRisk['安全风险分类别统计'][key]['研判覆盖率'];
          return typeof percent === 'number' ? (percent * 100).toFixed(2) * 1 : 0;
        });
        safeRiskCenterDatas.times = times;
        safeRiskCenterDatas.totals = totals;
        safeRiskCenterDatas.percents = percents;
      }
			if (warning && Array.isArray(warning.latest_alert) && warning.latest_alert.length > 0){
        warningList = warning.latest_alert;
      }
			// 处理总体安全态势数据
      $app.initSafeSituation(safeSituation);
      // 处理安全加固状态上方数据
      $app.initSafeReinforceTop(safeReinforce);
      // 处理安全加固状态下方图表及数据
      $app.getSafeReinforcePie(safeReinforceCounts, safeReinforceRates, isUpdate);
      // 处理安全风险顶部图表
      $app.getSafeRiskTop(safeRiskTopDatas, isUpdate);
      // 处理攻击源国家排行数据
      $app.deelCountryTop(countrys);
      // 处理安全风险中间图表
      $app.getSafeRiskCenter(safeRiskCenterDatas, isUpdate);
      // 处理威胁预警列表
      $app.deelWarningList(warningList);
			isUpdate && $app.animateNumberItemInner('.position-right-container');
		},
		// 处理总体安全态势数据
    initSafeSituation(data){
      if(data && typeof data === 'object'){
        $app.safeSituation.indexCount = typeof data['安全评估指数'] === 'number' ? data['安全评估指数'].toFixed(2) : '0';
        $app.safeSituation.saferisk.count = typeof data['风险防御次数'] === 'number' ? data['风险防御次数'] + '' : '0';
        $app.safeSituation.saferisk.rate = typeof data['风险防御率'] === 'number' ? (data['风险防御率'] * 100).toFixed(1) * 1   : 0;
        $app.safeSituation.warning.count = typeof data['告警误告次数'] === 'number' ? data['告警误告次数'] + '' : '0';
        $app.safeSituation.warning.rate = typeof data['告警误告率'] === 'number' ? (data['告警误告率'] * 100).toFixed(1) * 1   : 0;
        $app.safeSituation.node.count = typeof data['健壮节点数'] === 'number' ? data['健壮节点数'] + '' : '0';
        $app.safeSituation.node.rate = typeof data['节点健壮率'] === 'number' ? (data['节点健壮率'] * 100).toFixed(1) * 1   : 0;
      }
    },
		// 处理安全加固上方数据
    initSafeReinforceTop(data){
      if(data && typeof data === 'object'){
        $app.safeReinforce.bug.count = typeof data['漏洞修复个数'] === 'number' ? data['漏洞修复个数'] + '' : '0';
        $app.safeReinforce.bug.rate = typeof data['漏洞修复率'] === 'number' ? (data['漏洞修复率'] * 100).toFixed(1) * 1 : 0;
        $app.safeReinforce.config.count = typeof data['配置加固个数'] === 'number' ? data['配置加固个数'] + '' : '0';
        $app.safeReinforce.config.rate = typeof data['配置加固率'] === 'number' ? (data['配置加固率'] * 100).toFixed(1) * 1 : 0;
      }
    },
		// 处理安全加固饼图及右侧数据
		getSafeReinforcePie(counts, rates, isUpdate){
      !isUpdate && $app.charts.safeReinforce.chart && $app.charts.safeReinforce.chart.clear();
      let option = JSON.parse(JSON.stringify(defaultPieOption));
      option.tooltip.formatter = (params) => {
        // return `${params.marker}${params.name}&emsp;${params.value} 个 ${params.data.logPercent}%`;
        return `${params.marker}${params.name}&emsp;${params.value} 个`;
      };
      let pieData = [
        { name: '高影响漏洞数', value: 0, rate: 0, rightRate: 0, labelName: '高影响漏洞修复率' },
        { name: '中影响漏洞数', value: 0, rate: 0, rightRate: 0, labelName: '中影响漏洞修复率' },
        { name: '低影响漏洞数', value: 0, rate: 0, rightRate: 0, labelName: '低影响漏洞修复率' },
        { name: '高影响配置脆弱点', value: 0, rate: 0, rightRate: 0, labelName: '高影响配置加固率' },
        { name: '中影响配置脆弱点', value: 0, rate: 0, rightRate: 0, labelName: '中影响配置加固率' },
        { name: '低影响配置脆弱点', value: 0, rate: 0, rightRate: 0, labelName: '低影响配置加固率' },
      ];
      option.series[0].data = [];
      pieData = pieData.map(item => {
        item.value = counts[item.name] || 0;
        item.rightRate = rates[item.labelName] || 0;
        return item;
      });
      pieData.forEach((item, index) => {
        option.series[0].data.push({
          value: item.value,
          name: item.name,
          type: 'pie',
          logPercent: (100 * item.rate).toFixed(2),
          itemStyle: { borderRadius: 3, color: pieChartColors[index],  }
        });
        option.legend.data.push(item.name);
        let it = Object.assign({}, item);
        it.legendFlag = true;
        let findLabelItem = $app.charts.safeReinforce.data.find(labelItem => labelItem.labelName === item.labelName);
        if ($app.charts.safeReinforce.data.length > 0 && findLabelItem){
          findLabelItem.rightRate = it.rightRate;
          findLabelItem.name = it.name;
          findLabelItem.value = it.value;
          findLabelItem.rate = it.rate;
        } else {
          $app.charts.safeReinforce.data.push(it);
        }
      });
      $app.setCharts('safeReinforce', 'reinforce-pie-chart', option);
    },
		// 获取安全风险顶部图表
    getSafeRiskTop(datas, isUpdate){
      let option = JSON.parse(JSON.stringify(safeRiskTopOption));
      option.color = ['#3A89FF'];
      !isUpdate && $app.charts.safeRiskTop.chart && $app.charts.safeRiskTop.chart.clear();
      !isUpdate && $app.deelSafeRiskTopError(option);
      let times = datas && Array.isArray(datas.times) && datas.times.length > 0 ? datas.times : ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'];
      option.xAxis.data = times;
      let total = datas && Array.isArray(datas.totals) && datas.totals.length > 0 ? datas.totals : [];
      let percent = datas && Array.isArray(datas.percents) && datas.percents.length > 0 ? datas.percents : [];
      option.series.push({
        name: '攻击次数',
        yAxisIndex: 0,
        data: total,
        type: 'bar',
        itemStyle: {
          color: '#05fcfc'
        }
      });
      option.series.push({
        name: '风险处置率',
        yAxisIndex: 1,
        data: percent,
        type: 'line',
        // symbol: 'none',
        symbolSize: 6,
        // smooth: true,
        lineStyle: {
          width: 1,
          // color:  'rgba(38, 249, 195, 1)'
          color: 'rgb(58, 137, 255)'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            // { offset: 0, color: linearChartColors[3]},
            // { offset: 1, color: transparentColors[3]}
            { offset: 0, color: 'rgba(58, 137, 255, .7)' },
            { offset: 1, color: 'rgba(58, 137, 255, 0)' }
          ])
        }
      });
      option.yAxis[0].axisLabel.formatter = function (value){
        return `${$app.formatNumsData(value).value}${$app.formatNumsData(value).unit}`
      }
      option.yAxis[0].nameTextStyle.padding = [0, 0, 0, setChartSize(-30)];
      option.yAxis[1].nameTextStyle.padding = [0, setChartSize(-30), 0, 0];
      // secondchart
      option.tooltip.formatter = (params) => {
        // let results = params.map(pItem => `<div class='flex_between'><span>${pItem.marker}${pItem.seriesName}</span>&emsp;<span>${pItem.value} bps</span></div>`);
        let results = params.map((pItem) => {
          let unit = pItem.seriesType === 'line' ? '%' : '个';
          let value = pItem.seriesType === 'line' ? pItem.value.toFixed(2) : $app.formatNumsData(pItem.value).value + $app.formatNumsData(pItem.value).unit;
          return `<div class='flex_between'><span>${pItem.marker}${pItem.seriesName}</span>&emsp;<span>${value} ${unit}</span></div>`;
        });
        results.unshift(params[0].axisValue);
        return results.join('');
      };
      $app.setCharts('safeRiskTop', 'risk-top-chart', option);
    },
		// 处理安全风险顶部图表数据错误或为空
    deelSafeRiskTopError(option) {
      let now = Date.now();
      let times = [];
      times.length = 8;
      times.fill(now);
      times = times.map((item, index) => {
        return new Date(item - 600000 * index).toLocaleString();
      });
      times.reverse();
      option.xAxis.data = times;
      option.series = [];
      option.legend.data = [];
      // option.yAxis[0].splitLine.show = true;
      // option.yAxis[0].splitLine.showMinLine = true;
      // option.yAxis[0].splitLine.showMaxLine = true;
      // option.yAxis[0].max = 10;
      // option.yAxis[0].min = 5;
      option.yAxis[1].splitLine.show = true;
      option.yAxis[1].splitLine.showMinLine = true;
      option.yAxis[1].splitLine.showMaxLine = true;
      option.yAxis[1].max = 100;
      option.yAxis[1].min = 0;
      option.yAxis[0].splitLine.show = false;
      $app.setCharts('safeRiskTop', 'risk-top-chart', option);
    },
		// 处理攻击源国家排行
    deelCountryTop(datas){
      let countryObj = { name: null, count: 0, change: 0 };
      let newList = [];
      let dataKeys = Object.keys(datas);
      Object.keys(datas).forEach(chineseName => {
        let findItem = $app.countryTopList.find(item => item.name && item.name === chineseName);
        if (findItem) {
          newList.push({ name: findItem.name, count: datas[chineseName], change: datas[chineseName] - findItem.count});
        } else {
          newList.push({
            name: chineseName,
            count: datas[chineseName],
            change: 0
          });
        }
      });
      if (newList.length !== 10 && newList.length < 10){
        let count = 10 - newList.length;
        for (let i = 0; i < count;i++){
          newList.push(Object.assign({}, countryObj ));
        }
      }
      newList.sort((a, b) => (b.count - a.count));
      $app.countryTopList = newList;
    },
		// 获取安全风险中间的图表
    getSafeRiskCenter(datas, isUpdate){
      let option = JSON.parse(JSON.stringify(safeRiskCenter));
      option.color = ['#ffcc00'];
      !isUpdate && $app.charts.safeRiskCenter.chart && $app.charts.safeRiskCenter.chart.clear();
      !isUpdate && $app.deelSafeRiskCenterError(option);
      let times = datas && Array.isArray(datas.times) && datas.times.length > 0 ? datas.times : ['第一类', '第二类', '第三类', '第四类', '第五类', '第六类', '第七类'];
      option.xAxis.data = times;
      let total = datas && Array.isArray(datas.totals) && datas.totals.length > 0 ? datas.totals : [];
      let percent = datas && Array.isArray(datas.percents) && datas.percents.length > 0 ? datas.percents : [];
      option.series.push({
        name: '发现风险数量',
        yAxisIndex: 0,
        data: total,
        type: 'bar',
        itemStyle: {
          color: '#05fcfc'
        },
        barCategoryGap: setChartSize(30)
      });
      option.series.push({
        name: '智能研判覆盖率',
        yAxisIndex: 1,
        data: percent,
        type: 'line',
        // symbol: 'none',
        symbolSize: 6,
        // smooth: true,
        lineStyle: {
          width: 1,
          // color:  'rgba(38, 249, 195, 1)'
          color: 'rgb(255, 204, 0)'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            // { offset: 0, color: linearChartColors[3]},
            // { offset: 1, color: transparentColors[3]}
            { offset: 0, color: 'rgba(255, 204, 0, 0.7)' },
            { offset: 1, color: 'rgba(255, 204, 0, 0)' }
          ])
        }
      });
      option.yAxis[0].nameTextStyle.padding = [0, 0, 0, setChartSize(-30)];
      option.yAxis[1].nameTextStyle.padding = [0, setChartSize(-30), 0, 0];
      option.yAxis[0].axisLabel.formatter = function (value){
        return `${$app.formatNumsData(value).value}${$app.formatNumsData(value).unit}`
      }
      option.tooltip.formatter = (params) => {
        // let results = params.map(pItem => `<div class='flex_between'><span>${pItem.marker}${pItem.seriesName}</span>&emsp;<span>${pItem.value} bps</span></div>`);
        let results = params.map((pItem) => {
          let unit = pItem.seriesType === 'line' ? '%' : '个';
          let value = pItem.seriesType === 'line' ? pItem.value.toFixed(2) : $app.formatNumsData(pItem.value).value + $app.formatNumsData(pItem.value).unit;
          return `<div class='flex_between'><span>${pItem.marker}${pItem.seriesName}</span>&emsp;<span>${value} ${unit}</span></div>`;
        });
        results.unshift(params[0].axisValue);
        return results.join('');
      };
      $app.setCharts('safeRiskCenter', 'risk-center-chart', option);
    },
		// 处理安全风险顶部图表数据错误或为空
    deelSafeRiskCenterError(option) {
      let now = Date.now();
      let times = [];
      times.length = 8;
      times.fill(now);
      times = times.map((item, index) => {
        return new Date(item - 600000 * index).toLocaleString();
      });
      times.reverse();
      option.xAxis.data = times;
      option.series = [];
      option.legend.data = [];
      // option.yAxis[0].splitLine.show = true;
      // option.yAxis[0].splitLine.showMinLine = true;
      // option.yAxis[0].splitLine.showMaxLine = true;
      // option.yAxis[0].max = 10;
      // option.yAxis[0].min = 5;
      option.yAxis[1].splitLine.show = true;
      option.yAxis[1].splitLine.showMinLine = true;
      option.yAxis[1].splitLine.showMaxLine = true;
      option.yAxis[1].max = 100;
      option.yAxis[1].min = 0;
      option.yAxis[0].splitLine.show = false;
      $app.setCharts('safeRiskCenter', 'risk-center-chart', option);
    },
		// 处理威胁预警列表数据
    deelWarningList(list){
      if (list.length > 0){
        $app.safeThreatList = list.map(item => {
          // let time = item.timestamp ? new Date(item.timestamp)
          return Object.keys(item).reduce((res, key) => {
            if (key === 'decoder_type'){
              res.name = item[key];
            } else if (key === 'decoder_level'){
              res.status = item[key]
            } else if (key === 'timestamp'){
              res.time = item[key];
            } else if (key === 'decoder_description'){
              res.des = item[key];
            } else {
              res[key] = item[key];
            }
            return res;
          },{});
        });
      } else {
        $app.safeThreatList = list;
      }
    },
	}
});