if (self !== parent) {
  window.onmousedown = function () {
    parent.postMessage('{"type":"invoke","name":"online"}', '*');
  };
}

function utctime1(cellValue, defvalue) {
  if (cellValue && !cellValue.startsWith('0001-')) return cellValue ? cellValue.replace('T', ' ').substr(0, 11) : '';
  return defvalue ? defvalue : '';
}
// function getTableHeight(dom, height = 0) {
//   let target = document.getElementsByClassName(`${dom}`);
//   let bot = height || 74;
//   return document.documentElement.clientHeight - target[0].getBoundingClientRect().top - bot + 'px';
// }
function getTableHeight(dom, height = 0) {
  const targets = document.getElementsByClassName(dom);
  if (!targets.length) {
    console.warn(`Element with class "${dom}" not found.`);
    return '0px'; // 或者返回默认高度
  }

  const target = targets[0];
  const bot = height || 74;
  let availableHeight = document.documentElement.clientHeight - target.getBoundingClientRect().top - bot;
  if(availableHeight < 150){
    availableHeight = 150
  }
  return availableHeight > 0 ? `${availableHeight}px` : '0px';
}
// function getTemplateContainer() {
//   let target = document.getElementsByClassName('template-container')[0];
//   target.style.height = document.documentElement.clientHeight - target.getBoundingClientRect().top - 16 + 'px';
// }
function getTemplateContainer() {
  const target = document.getElementsByClassName('template-container')[0];
  if (!target) {
    console.warn('Element with class "template-container" not found.');
    return;
  }

  const topOffset = target.getBoundingClientRect().top;
  const availableHeight = document.documentElement.clientHeight - topOffset - 16;
  target.style.height = `${availableHeight > 0 ? availableHeight : 0}px`;
}
// 处理循环引用
// function replacer(key, value) {
//   if (this[key] instanceof Object && this[key] === value) {
//     return '[Circular]';
//   }
//   return value;
// }
function pageJump(page, cacheData, isFrame, isNewTab = false) {
  //2025.02.24 修复iframe嵌入子页面无法使用pageJump的问题
  // const url = new URL(page, window.location.origin);
  //   url.searchParams.set('cacheData', JSON.stringify(cacheData));
  //   window.open(url.href, '_blank');
  if (isFrame) {
    window.top.postMessage({ type: 'jump', page: page, cacheData: JSON.stringify(cacheData) });
  } else {
    window.parent.postMessage({ type: 'jump', page: page, cacheData: JSON.stringify(cacheData) });
  }
}
function setTableRowId(id) {
  localStorage.setItem('tableRowId', JSON.stringify(id));
}
function getTableRowId() {
  setTimeout(() => {
    localStorage.removeItem('tableRowId');
  }, 3000);
  let a = localStorage.getItem('tableRowId');
  if (a) {
    return JSON.parse(a);
  } else {
    return [];
  }
}

function pageBack() {
  window.history.back();
}

function pageCacheData() {
  // return window.parent.$app.getCacheData();
  return window.parent.$app.getCacheData() || window.top.$app.getCacheData();
}
//设置全局组件大小
Vue.prototype.$ELEMENT = { size: 'medium' };

function handleAppData(app, cacheData) {
  for (let key in cacheData) {
    if (typeof cacheData[key] === 'object' && app[key]) handleAppData(app[key], cacheData[key]);
    else {
      app[key] = cacheData[key];
    }
  }
}
// 关于时间格式化
function unifyUIFormatTime(duration) {
  let seconds = duration / 1000; // 将毫秒数转换为秒数
  if (seconds < 1) {
    return `${seconds.toFixed(2)}秒`;
  } else if (seconds < 60) {
    return `${Math.floor(seconds)}秒`;
  } else if (seconds < 3600) {
    let minutes = Math.floor(seconds / 60);
    let secondsRemainder = Math.floor(seconds % 60);
    return `${minutes}分${secondsRemainder}秒`;
  } else {
    let hours = Math.floor(seconds / 3600);
    let minutesRemainder = Math.floor((seconds % 3600) / 60);
    let secondsRemainder = Math.floor((seconds % 3600) % 60);
    return `${hours}时${minutesRemainder}分${secondsRemainder}秒`;
  }
}

function padZero(num) {
  return num < 10 ? `0${num}` : num;
}

async function viewCopyText(text) {
  if (!text) return false;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
    return true;
  } else {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textarea);
    return successful;
  }
}

// 错误详情弹窗的方法
function errDetails_callErrOuterMessage(mainMsg, defaultMsg, spanId, callBack) {
  // 查看详情错误信息提示
  $app.$message({
    type: 'error',
    center: true,
    duration: 0,
    showClose: true,
    dangerouslyUseHTMLString: true,
    message: `<div style="display: flex; align-items: center; justify-content: center;">
<div>${mainMsg || defaultMsg}</div>
<span id="${spanId}" style="margin-left:10px;margin-right:10px; cursor:pointer; color:#D9001B; text-decoration: underline;">查看详情</span>
</div> `
  });
  // 只能使用事件委托
  $app.$nextTick(() => {
    const detailsMessage = document.getElementById(`${spanId}`);
    if (detailsMessage) {
      // 存在
      detailsMessage.addEventListener('click', () => {
        // 触发点击事件
        // 接口错误回调应该返回 错误信息和详细错误信息数组
        callBack(); // 调用这个回调函数，拿到我们需要的数据,并且弹出弹窗等逻辑
      });
    }
  });
}
//+---------------------------------------------------
//| 计算天数 object为任务，应包含begin_time和end_time，如果begin_time为“0001-%”，则应包含create_time
//+---------------------------------------------------
function ensureDays(object, mapDate) {
  //计算保障天数
  if (!object) return 0;
  let mapDate1 = new Map();
  let start = new Date(object.begin_time);
  let end = new Date(object.end_time);
  if (!object.begin_time || object.begin_time.startsWith('0001-')) return mapDate1.size;
  if (object.end_time && !object.end_time.startsWith('0001-') && end.getTime() < new Date().getTime()) {
    while (start <= end && start < new Date()) {
      mapDate.set(start.Format('yyyy-MM-dd'), start.Format('yyyy-MM-dd'));
      mapDate1.set(start.Format('yyyy-MM-dd'), start.Format('yyyy-MM-dd'));
      start = start.DateAdd('d', 1);
    }
  } else {
    while (start < new Date()) {
      mapDate.set(start.Format('yyyy-MM-dd'), start.Format('yyyy-MM-dd'));
      mapDate1.set(start.Format('yyyy-MM-dd'), start.Format('yyyy-MM-dd'));
      start = start.DateAdd('d', 1);
    }
    mapDate.set(new Date().Format('yyyy-MM-dd'), new Date().Format('yyyy-MM-dd'));
    mapDate1.set(new Date().Format('yyyy-MM-dd'), new Date().Format('yyyy-MM-dd'));
  }
  return mapDate1.size;
}

function addWaterMarker(str) {
  let can = document.createElement('canvas');
  let body = document.body;
  body.appendChild(can);

  can.width = 250;
  can.height = 150;
  can.style.display = 'none';

  let cans = can.getContext('2d');
  //水印旋转
  cans.rotate((-20 * Math.PI) / 180);
  //画布上显示文字的大小和字体
  cans.font = '14px 微软雅黑';
  cans.fillStyle = 'rgba(81,81,81,0.25)';
  cans.textAlign = 'left';
  cans.textBaseline = 'Middle';
  //str:画布上显示的文本；can.width/4：开始绘制文本的X坐标；can.height/2：开始绘制文本的Y坐标
  cans.fillText(str + '\r' + new Date().Format('yyyy-MM-dd hh:mm:ss'), 0, can.height);

  body.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')';
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) {
  //author: meizz
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'H+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (var k in o) if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
  return fmt;
};

//+---------------------------------------------------
//| 日期计算
//+---------------------------------------------------
Date.prototype.DateAdd = function (strInterval, Number) {
  var dtTmp = this;
  switch (strInterval) {
    case 's':
      return new Date(Date.parse(dtTmp) + 1000 * Number);
    case 'n':
      return new Date(Date.parse(dtTmp) + 60000 * Number);
    case 'h':
      return new Date(Date.parse(dtTmp) + 3600000 * Number);
    case 'd':
      return new Date(Date.parse(dtTmp) + 86400000 * Number);
    case 'w':
      return new Date(Date.parse(dtTmp) + 86400000 * 7 * Number);
    case 'q':
      return new Date(dtTmp.getFullYear(), dtTmp.getMonth() + Number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
    case 'm':
      return new Date(dtTmp.getFullYear(), dtTmp.getMonth() + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
    case 'y':
      return new Date(dtTmp.getFullYear() + Number, dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
  }
};

//+---------------------------------------------------
//| 月份计算
//+---------------------------------------------------
Date.prototype.MouthAdd = function (strInterval, Number) {
  var dtTmp = this;
  switch (strInterval) {
    case 's':
      return new Date(Date.parse(dtTmp) + 1000 * Number);
    case 'n':
      return new Date(Date.parse(dtTmp) + 60000 * Number);
    case 'h':
      return new Date(Date.parse(dtTmp) + 3600000 * Number);
    case 'd':
      return new Date(Date.parse(dtTmp) + 86400000 * Number);
    case 'w':
      return new Date(Date.parse(dtTmp) + 86400000 * 7 * Number);
    case 'q':
      return new Date(dtTmp.getFullYear(), dtTmp.getMonth() + Number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
    case 'm':
      return new Date(dtTmp.getFullYear(), dtTmp.getMonth() + Number);
    case 'y':
      return new Date(dtTmp.getFullYear() + Number, dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
  }
};

//+---------------------------------------------------
//| 设置当某天最晚时间
//+---------------------------------------------------
Date.prototype.timeSet = function (value) {
  var date = new Date(value); //new Date(value*1000);根据时间戳格式进行选择乘1000或否
  var timeDate;
  Y = date.getFullYear() + '-';
  M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
  h = 23 + ':';
  m = 59 + ':';
  s = 59;
  timeDate = Y + M + D + h + m + s;
  return new Date(timeDate);
};

//+---------------------------------------------------
//| 计算两个日期的天数差
//+---------------------------------------------------
function dateDiff(firstDate, secondDate) {
  if (secondDate && secondDate.indexOf && secondDate.indexOf('0001-') == 0) return '未设置起始时间';
  if (firstDate && firstDate.indexOf && firstDate.indexOf('0001-') == 0) return '未设置结束时间';
  var firstDate = new Date(firstDate);
  var secondDate = new Date(secondDate);
  var diff = Math.abs(firstDate.getTime() - secondDate.getTime());
  var result = parseInt(diff / (1000 * 60 * 60 * 24));
  return result;
}

//+---------------------------------------------------
//| 计算两个日期的天数差
//+---------------------------------------------------
function totalTime(firstDate, secondDate) {
  var result = dateDiff(firstDate, secondDate);
  if (result != '未设置起始时间' && result != '未设置结束时间') return '共计' + result + '天';
  else return result;
}

/**
 * String.padEnd()
 * version 1.0.1
 * Feature	        Chrome  Firefox Internet Explorer   Opera	Safari	Edge
 * Basic support	57   	48      (No)	            44   	10      15
 * -------------------------------------------------------------------------------
 */
if (!String.prototype.padEnd) {
  String.prototype.padEnd = function padEnd(targetLength, padString) {
    targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
    padString = String(typeof padString !== 'undefined' ? padString : ' ');
    if (this.length > targetLength) {
      return String(this);
    } else {
      targetLength = targetLength - this.length;
      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
      }
      return String(this) + padString.slice(0, targetLength);
    }
  };
}

/**
 * 大数字转换，将大额数字转换为万、千万、亿等
 * @param value 数字值
 */
function bigNumberTransform(value) {
  if (!value) return 0;
  const newValue = ['', '', ''];
  let fr = 1000;
  let num = 3;
  let text1 = '';
  let fm = 1;
  while (value / fr >= 1) {
    fr *= 10;
    num += 1;
    // console.log('数字', value / fr, 'num:', num)
  }
  if (num <= 4) {
    // 千
    text1 = '千';
    fm = 1000;
    if (value % fm === 0) {
      newValue[0] = parseInt(value / fm) + '';
    } else {
      newValue[0] = parseFloat(value / fm).toFixed(2) + '';
    }
    newValue[1] = '千';
  } else if (num <= 8) {
    // 万
    text1 = parseInt(num - 4) / 3 > 1 ? '千万' : '万';
    // tslint:disable-next-line:no-shadowed-variable
    fm = text1 === '万' ? 10000 : 10000000;
    if (value % fm === 0) {
      newValue[0] = parseInt(value / fm) + '';
    } else {
      newValue[0] = parseFloat(value / fm).toFixed(2) + '';
    }
    newValue[1] = text1;
  } else if (num <= 16) {
    // 亿
    text1 = (num - 8) / 3 > 1 ? '千亿' : '亿';
    text1 = (num - 8) / 4 > 1 ? '万亿' : text1;
    text1 = (num - 8) / 7 > 1 ? '千万亿' : text1;
    // tslint:disable-next-line:no-shadowed-variable
    fm = 1;
    if (text1 === '亿') {
      fm = 100000000;
    } else if (text1 === '千亿') {
      fm = 100000000000;
    } else if (text1 === '万亿') {
      fm = 1000000000000;
    } else if (text1 === '千万亿') {
      fm = 1000000000000000;
    }
    if (value % fm === 0) {
      newValue[0] = parseInt(value / fm) + '';
    } else {
      newValue[0] = parseFloat(value / fm).toFixed(2) + '';
    }
    newValue[1] = text1;
  }
  if (value < 1000) {
    newValue[0] = value + '';
    newValue[1] = '';
  }
  return newValue.join('');
}

/**
 * 百分比转换，将数字转换为百分比
 * @param value 数字值
 */
function percentTransform(value) {
  if (!value) return '0%';
  if (typeof value == 'number') {
    return Number(value * 100).toFixed(0) + '%';
  }
  return value;
}
/**
 * 存储转换，将数字转换为T以及PT
 * @param value 数字值
 */
function storageTransform(value) {
  if (!value) return '0MB';
  if (typeof value == 'number') {
    if (value > 1000000) return parseInt(value / 10000 + 0.5) / 100 + 'PB';
    if (value > 1000) return parseInt(value / 10 + 0.5) / 100 + 'TB';
    return value + 'GB';
  }
  return value;
}
function byteTransform(value, type = 0) {
  const arr = [
    ['B', 'KB', 'MB', 'GB', 'TB'],
    ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps']
  ];
  const item = arr[type];
  if (!value) return '0' + item[0];
  if (typeof value == 'number') {
    if (value > 1000000000000) return parseInt(value / 10000000000 + 0.5) / 100 + item[4];
    else if (value > 1000000000) return parseInt(value / 10000000 + 0.5) / 100 + item[3];
    else if (value > 1000000) return parseInt(value / 10000 + 0.5) / 100 + item[2];
    else if (value > 1000) return parseInt(value / 10 + 0.5) / 100 + item[1];
    else if (value >= 0) return Number(value).toFixed(2) + item[0];
    return Number(value).toFixed(2) + item[3];
  }
  return Number(value).toFixed(2);
}

function removeEmoji(value) {
  return value.replace(/[\u{1F600}-\u{1F64F}]/gu, '');
}

function replaceAllChar(str, old, n) {
  return str
    .split(old)
    .filter((a) => a)
    .join(n);
}
function getQueryString(name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  const r = decodeURI(window.location.search).substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return '';
}
function getQueryInt(name) {
  let v = getQueryString(name);
  return v ? parseInt(v) : null;
}
function getHashString(name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  const r = decodeURI(window.location.hash).substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
function getHashInt(name) {
  let v = getHashString(name);
  return v ? parseInt(v) : 0;
}
function getAbsoluteUrl(url) {
  const a = document.createElement('A');
  a.href = url; // 设置相对路径给Image, 此时会发送出请求
  url = a.href; // 此时相对路径已经变成绝对路径
  return url;
}

function formatMilliseconds(milliseconds) {
  if (milliseconds < 1000) {
    return `${milliseconds}ms`;
  } else {
    const seconds = (milliseconds / 1000).toFixed(2);
    return seconds.replace(/\.00$/, '').replace(/\.0$/, '') + 's';
  }
}
// history.pushState(null, null, location.href);
// window.addEventListener('popstate', function (e) {
//   history.pushState(null, null, location.href);
//   //console.log(e)
//   //if (Wil&&Wil.invokeParent) Wil.invokeParent("back");
//   //else if (window.handleBack&&window.handleBack()) {}
// });

/**
 * 内存单位换算工具
 * @param {number} value - 待转换的数值
 * @param {string} fromUnit - 原始单位 ('B', 'KB', 'MB', 'GB', 'TB')
 * @param {string} toUnit - 目标单位 ('B', 'KB', 'MB', 'GB', 'TB')
 * @returns {number} 转换后的数值（保留2位小数）
 */
function convertMemory(value, fromUnit, toUnit) {
  // 单位换算基准（以字节为基准）
  const units = {
    'B': 1,
    'KB': 1024,
    'MB': 1024 * 1024,
    'GB': 1024 * 1024 * 1024,
    'TB': 1024 * 1024 * 1024 * 1024
  };

  // 验证输入有效性
  if (!units[fromUnit] || !units[toUnit]) {
    throw new Error('Invalid memory unit');
  }
  if (isNaN(value) || value < 0) {
    throw new Error('Invalid value');
  }

  // 转换为字节后再转换到目标单位
  const bytes = value * units[fromUnit];
  const result = bytes / units[toUnit];
  
  // 保留2位小数（不四舍五入）
  return Math.floor(result * 100) / 100;
}

Vue.directive('drag', {
  bind(el, binding, vnode, oldVnode) {
    if (!binding.value) binding.value = { drag: '.el-dialog__header', move: '.el-dialog' };
    // 获取拖拽内容头部
    const dialogHeaderEl = el.querySelector(binding.value.drag);
    // 获取拖拽内容整体 这个rrc-dialog是我自己封装的组件 如果使用element的组件应写成.el-dialog
    const dragDom = el.querySelector(binding.value.move);
    dialogHeaderEl.style.cursor = 'move';

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);

    // 鼠标按下事件
    dialogHeaderEl.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离 (鼠标点击位置距离可视窗口的距离)
      const disX = e.clientX; // - dialogHeaderEl.offsetLeft;
      const disY = e.clientY; // - dialogHeaderEl.offsetTop;

      // 获取到的值带px 正则匹配替换
      let styL, styT;

      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (sty.left.includes('%')) {
        styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
        styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
      } else {
        styL = +sty.left.replace(/\px/g, '');
        styT = +sty.top.replace(/\px/g, '');
      }

      // 鼠标拖拽事件
      document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离 （开始拖拽至结束拖拽的距离）
        const l = e.clientX - disX;
        const t = e.clientY - disY;

        let finallyL = l + styL;
        let finallyT = t + styT;

        // 移动当前元素
        dragDom.style.left = `${finallyL}px`;
        dragDom.style.top = `${finallyT}px`;

        //将此时的位置传出去
        //binding.value({x:e.pageX,y:e.pageY})
      };

      document.onmouseup = function (e) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  }
});

const $components = {};

function request(name, path) {
  if ($components[name]) return;
  if (!path) path = '';
  $components[name] = true;
  Vue.component(name, function (resolve, reject) {
    axios
      .get(path + 'component/' + name + '.vue')
      .then(function (r) {
        let a = r.data;
        let template = a.substring(a.indexOf('<template>') + 10, a.lastIndexOf('</template>'));
        let script = a.substring(a.indexOf('<script>') + 8, a.indexOf('</script>'));
        script = script.substring(script.indexOf('{'), script.length);
        let mod = {};
        eval('mod=' + script);
        if (mod) {
          mod.template = template;
          resolve(mod);
        } else {
          reject(name + '.vue文件内容无法解析');
        }
      })
      .catch((err) => reject(err));
  });
}
function loadJS(url, callback) {
  let script = document.createElement('script'),
    fn = callback || function () {};
  script.type = 'text/javascript';
  //script.async = true;
  //IE
  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState == 'loaded' || script.readyState == 'complete') {
        script.onreadystatechange = null;
        fn();
      }
    };
  } else {
    //其他浏览器
    script.onload = function () {
      fn();
    };
  }
  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
}
function copy(obj) {
  return JSON.parse(JSON.stringify(obj));
}
function extend(base, ...obj) {
  for (let o of obj) {
    for (let p in o) Vue.set(base, p, o[p]);
  }
  return base;
}
window.$cache = new (function () {
  const __objects = {};
  const __waiting = {};
  this.getByCode = function (name, code, def, cb) {
    let key = code + '@' + name;
    let v = __objects[key];
    if (!v) {
      v = copy(def || {});
      extend(v, { code: code, __loading: 1, __error: null });
      __objects[key] = v;
      __waiting[key] = [];
      $api[name].GetByCode(
        { code: code },
        (d) => {
          delete v.__loading;
          extend(v, d);
          if (cb) cb(copy(v));
          for (let c of __waiting[key]) {
            c(copy(v));
          }
          delete __waiting[key];
        },
        (err) => {
          v.__error = err;
          delete v.__loading;
          delete __waiting[key];
        }
      );
    }
    if (cb) {
      if (v.__loading) {
        __waiting[key].push(cb);
      } else {
        cb(copy(v));
      }
    }
    return v;
  };
})();
window.$dict = new (function () {
  const __dicts = {};
  const __loading = {};
  this.get = function (name, refresh, cb, query) {
    if (typeof refresh === 'function' && !cb) {
      cb = refresh;
    }
    let dict = __dicts[name];
    if (!dict || refresh) {
      if (!dict) {
        dict = { __cb: [], __data: null };
        dict.__load = function (list) {
          if (list) {
            dict.__data = list;
            if (dict.__cb.length) {
              for (let cb of dict.__cb) cb(list);
              dict.__cb = [];
            }
            for (let i of list) {
              let v = dict[i.code];
              if (!v) {
                i.__load = 2;
                Vue.set(dict, i.code, i);
              } else {
                Vue.set(v, '__load', 2);
                for (let p in i) {
                  Vue.set(v, p, i[p]);
                }
              }
            }
          }
        };
        __dicts[name] = dict;
      }
      if (refresh && !__loading[name]) {
        __loading[name] = true;
        $api[name].List(
          query || { filter: {} },
          (d) => {
            if (d) dict.__load(d.data);
          },
          (e) => {
            console.log(e);
          },
          () => (__loading[name] = false)
        );
      }
    }
    if (cb) {
      if (dict.__data) cb(dict.__data);
      else dict.__cb.push(cb);
    }
    return dict;
  };
  this.load = function (name, code, cb, refresh) {
    let _this = this.get(name);
    let v = _this[code];
    if (!v || refresh) {
      if (!v) {
        v = { code: code, name: code + '', __load: 1 };
        setTimeout(function () {
          v.__load--;
        }, 2000);
        Vue.set(_this, code, v);
      }
      if (!__loading[name + ':' + code]) {
        __loading[name + ':' + code] = true;
        $api[name].GetByCode(
          { code: code },
          (d) => {
            if (d) {
              v = _this[d.code];
              Vue.set(v, '__load', 2);
              for (let p in d) Vue.set(v, p, d[p]);
              if (cb) cb(_this[code]);
              return;
            }
          },
          (e) => {
            console.log(e);
          },
          () => (__loading[name + ':' + code] = false)
        );
      }
    } else if (cb) {
      cb(v);
    }
    return v;
  };
})();

Vue.component('column-selector', {
  props: ['table', 'column', 'value', 'sort', 'filter', 'placeholder', 'multiple'],
  data: function () {
    return {
      data: null
    };
  },
  created: function () {},
  computed: {
    options: function () {
      if (!this.data) {
        this.data = [];
        $api.Count.ListDistinct(
          { name: this.table, column: this.column, filter: this.filter },
          (v) => {
            if (!v) v = [];
            v = v.filter((f) => f);
            if (this.sort) v = this.sort(v);
            else
              v = v.sort((a, b) => {
                return a.localeCompare(b);
              });
            this.data = v;
          },
          (e, v) => {
            if (!v) v = [];
            else v = v.response;
            v = v.filter((f) => f);
            if (this.sort) v = this.sort(v);
            else
              v = v.sort((a, b) => {
                return a.localeCompare(b);
              });
            this.data = v;
          }
        );
      }
      return this.data;
    },
    selectValue: {
      get: function () {
        return this.value;
      },
      set: function (v) {
        this.$emit('input', v);
        this.$emit('change');
      }
    }
  },
  template: `
    <el-select v-model="selectValue" :placeholder="placeholder" clearable filterable allow-create :multiple="multiple" style="width:100%;">
        <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
    </el-select>
  `
});

Vue.component('dict-view', {
  props: ['dict', 'prop', 'code', 'old', 'unload_title', 'number'],
  data: function () {
    return {
      data: [],
      lastcode: null
    };
  },
  created: function () {
    this.number = this.number || this.number === '';
    this.reload();
  },
  computed: {
    label: function () {
      if (!this.prop) this.prop = 'name';
      if (!this.code) return '';
      if (this.code != this.lastcode) this.reload();
      return this.data;
    },
    unload: function () {
      for (let n of this.data) {
        if (!n.__load) {
          return 'unload';
        }
      }
      return '';
    }
  },
  methods: {
    reload: function () {
      this.lastcode = this.code;
      this.data = [];
      let dict = $dict.get(this.dict);
      if (!this.prop) this.prop = 'name';
      if (!this.code) return;
      let c = this.code;
      if (typeof c === 'string' && c.startsWith(' ')) {
        let cs = c.trim().split(' ');
        for (let n of cs) {
          if (this.number && n == parseInt(n)) n = parseInt(n);
          let i = $dict.load(this.dict, n);
          if (!i[this.prop]) i[this.prop] = null;
          this.data.push(i);
        }
      } else {
        let i = $dict.load(this.dict, this.code);
        if (!i[this.prop]) i[this.prop] = null;
        this.data.push(i);
      }
      if (this.old && this.old != this.code) {
        for (let i of this.data) i.__new = true;
        c = this.old;
        if (typeof c === 'string' && c.startsWith(' ')) {
          let cs = c.trim().split(' ');
          for (let n of cs) {
            if (this.number && n == parseInt(n)) n = parseInt(n);
            let i = $dict.load(this.dict, n);
            if (i.__new) i.__new = false;
            else {
              if (!i[this.prop]) i[this.prop] = null;
              i.__old = true;
              this.data.push(i);
            }
          }
        } else {
          let i = $dict.load(this.dict, this.old);
          if (!i[this.prop]) i[this.prop] = null;
          i.__old = true;
          this.data.push(i);
        }
      }
    }
  },
  template: `
  <label :key="dict+':'+code" :class="unload" :title="unload?unload_title:''">
    <label v-for="item in label" :class="item.__new?'label-new':(item.__old?'label-old':null)" :title="item.__new?'新添加':(item.__old?'已删除':null)" style="padding: 4px;"> <slot v-bind:item="item"> {{item[prop]}} </slot></label>
  </label>`
});
Vue.component('dict-view-title', {
  props: ['dict', 'code', 'old', 'unload_title', 'number'],
  data: function () {
    return {
      data: [],
      lastcode: null
    };
  },
  created: function () {
    this.number = this.number || this.number === '';
    this.reload();
  },
  computed: {
    list: function () {
      if (!this.code) return [];
      if (this.code != this.lastcode) this.reload();
      return this.data;
    }
  },
  methods: {
    reload: function () {
      this.lastcode = this.code;
      this.data = [];
      let dict = $dict.get(this.dict);
      if (!this.code) return;
      let c = this.code;
      if (typeof c === 'string' && c.startsWith(' ')) {
        let cs = c.trim().split(' ');
        for (let n of cs) {
          if (this.number) n = parseInt(n);
          let i = $dict.load(this.dict, n);
          this.data.push(i);
        }
      } else {
        let i = $dict.load(this.dict, this.code);
        this.data.push(i);
      }

      if (this.old && this.old != this.code) {
        for (let i of this.data) i.__new = true;
        c = this.old;
        if (typeof c === 'string' && c.startsWith(' ')) {
          let cs = c.trim().split(' ');
          for (let n of cs) {
            if (this.number && n == parseInt(n)) n = parseInt(n);
            let i = $dict.load(this.dict, n);
            if (i.__new) i.__new = false;
            else {
              i.__old = true;
              this.data.push(i);
            }
          }
        } else {
          let i = $dict.load(this.dict, this.old);
          i.__old = true;
          this.data.push(i);
        }
      }
    }
  },
  template: `
  <label>
    <label v-for="item in list" :class="item.__new?'label-new':(item.__old?'label-old':(item.__load?'':'unload'))" :title="item.__load?item.name:unload_title" style="padding: 4px;"> {{item.code}} </label>
  </label>
  `
});
Vue.component('dict-selector', {
  props: ['dict', 'box', 'value', 'number', 'filter', 'query', 'multiple', 'clearable', 'placeholder', 'refresh'],
  data: function () {
    let data = $dict.get(this.dict, true, null, this.query);
    let multi = this.multiple || this.multiple === '';
    let type = '';
    if (this.box && this.box === 'tab') {
      type = 'tab';
    } else if (this.box || this.box === '') {
      type = multi ? 'checkbox' : 'radio';
    }
    return {
      data: data,
      multi: multi,
      type: type
    };
  },
  created: function () {},
  computed: {
    options: function () {
      let d = [];
      for (let i in this.data) {
        if (typeof i === 'string' && i.startsWith('__')) continue;
        let o = this.data[i];
        if (o) d.push(o);
      }
      if (this.filter) d = d.filter(this.filter);
      return d; //.sort((a,b)=>a.code > b.code ? 1 : -1);
    },
    selectValue: {
      get: function () {
        if (typeof this.value === 'number') return this.value ? this.value + '' : '';
        if (!this.value || !this.value.trim()) return this.multi ? [] : '';
        return this.multi ? this.value.trim().split(' ') : this.value ? this.value + '' : '';
      },
      set: function (v) {
        if (this.multi) v = ' ' + v.join(' ') + ' ';
        //else v = ' '+v+' '
        this.$emit('input', v);
        this.$emit('change');
      }
    }
  },
  template: `
  <div>
    <el-checkbox-group v-if="type=='checkbox'" :key="dict+':'+value" v-model="selectValue">
        <el-checkbox v-for="item in options" :label="item.code+''">{{item.name}}</el-checkbox>
    </el-checkbox-group>
    <el-radio-group v-else-if="type=='radio'" :key="dict+':'+value" v-model="selectValue">
        <el-radio v-if="clearable||clearable===''" label="">无</el-radio>
        <el-radio v-for="item in options" :label="item.code+''">{{item.name}}</el-radio>
    </el-radio-group>
    <el-tabs v-else-if="type=='tab'" type="card" :key="dict+':'+value" v-model="selectValue">
        <el-tab-pane v-for="item in options" :label="item.name" :name="item.code+''"></el-tab-pane>
    </el-tabs>
    <el-select v-else :key="dict+':'+value" v-model="selectValue" :multiple="multiple" :clearable="clearable" :placeholder="placeholder" @remove-tag="tag=>$emit('remove-tag',tag)" filterable style="width:100%;">
        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.code+''">
            <slot v-bind:item="item"> 
            <span>
                <el-tag v-if="item.domain" size="mini" :type="item.domain==7?null:'info'"><enum-view enum="1:互联网|3:专网|4:专用系统|7:内网" :value="item.domain"></enum-view></el-tag>
                {{ item.name }}
            </span>
            <span style="color: #C0C4CC; font-size: 12px;padding-left: 32px;">{{ item.code }}</span>
            </slot> 
        </el-option>
    </el-select>
  
  </div>
  `
});
Vue.component('dict-selector-title', {
  props: ['dict', 'box', 'value', 'number', 'filter', 'query', 'multiple', 'clearable', 'allowCreate', 'placeholder', 'refresh'],
  data: function () {
    let data = $dict.get(this.dict, true, null, this.query);
    let multi = this.multiple || this.multiple === '';
    let type = '';
    if (this.box || this.box === '') {
      type = multi ? 'checkbox' : 'radio';
    }
    return {
      data: data,
      multi: multi,
      type: type
    };
  },
  created: function () {},
  computed: {
    options: function () {
      let d = [];
      for (let i in this.data) {
        if (typeof i === 'string' && i.startsWith('__')) continue;
        let o = this.data[i];
        if (o) d.push(o);
      }
      if (this.filter) d = d.filter(this.filter);
      return d.sort((a, b) => (a.code > b.code ? 1 : -1));
    },
    selectValue: {
      get: function () {
        if (typeof this.value === 'number') return this.value ? this.value + '' : '';
        if (!this.value || !this.value.trim()) return this.multi ? [] : '';
        return this.multi ? this.value.trim().split(' ') : this.value ? this.value + '' : '';
      },
      set: function (v) {
        if (this.multi) v = ' ' + v.join(' ') + ' ';
        this.$emit('input', v);
        this.$emit('change');
      }
    }
  },
  template: `
  <div>
    <el-checkbox-group v-if="type=='checkbox'" :key="dict+':'+value" v-model="selectValue">
        <slot :data="options">
            <el-checkbox v-for="item in options" :label="item.code+''" :title="item.name">{{item.code}}</el-checkbox>
        </slot>
    </el-checkbox-group>
    <el-radio-group v-else-if="type=='radio'" :key="dict+':'+value" v-model="selectValue">
        <slot :data="options">
            <el-radio v-for="item in options" :label="item.code+''" :title="item.name">{{item.code}}</el-radio>
        </slot>
    </el-radio-group>
    <el-select v-else :key="dict+':'+value" v-model="selectValue" :allow-create="allowCreate"  :multiple="multiple" :clearable="clearable" :placeholder="placeholder" @remove-tag="tag=>$emit('remove-tag',tag)" filterable style="width:100%;">
        <el-option v-for="item in options" :key="item.id" :label="item.code" :value="item.code+''">
            <slot v-bind:item="item"> 
            <span>
                {{ item.code }}
            </span>
            <span style="color: #C0C4CC; font-size: 12px;padding-left: 32px;">{{ item.name }}</span>
            </slot> 
        </el-option>
    </el-select>
  </div>
  `
});

window.$objectset = new (function () {
  const __dicts = {};
  this.get = function (name, preload, cb, refresh, filter) {
    let key = name;
    if (filter) key = name + ':' + JSON.stringify(filter);
    if (!__dicts[key] || refresh) {
      let _this = {};
      if (__dicts[key]) _this = __dicts[key];
      else {
        _this.load = function (id, cb, def) {
          if (typeof id === 'string') {
            let cs = id.trim().split(' ');
            let pp = [];
            for (let n of cs) {
              pp.push(_this.load(parseInt(n)));
            }
            return pp;
          }
          let v = _this[id];
          if (!v) {
            v = { id: id, name: id + '', load: false };
            if (def) {
              for (let p in def) v[p] = def[p];
            }
            Vue.set(_this, id, v);
            $api[name].Get(
              { id: id, objectset: true },
              function (o) {
                for (let i in o) {
                  v.load = true;
                  Vue.set(v, i, o[i]);
                }
                if (cb) cb(_this[id]);
              },
              (e) => {
                console.log(e);
              }
            );
          } else if (cb) cb(v);
          return v;
        };
        _this.search = function (prop, val, cb) {
          let p = {};
          if (filter) p = JSON.parse(JSON.stringify(filter));
          p[prop] = val;
          $api[name].List(
            { filter: p, objectset: true },
            function (d) {
              if (d && d.data)
                for (let i of d.data) {
                  Vue.set(_this, i.id, i);
                }
            },
            (e) => {
              console.log(e);
            },
            function () {
              if (cb) cb();
            }
          );
        };

        __dicts[key] = _this;
      }
      if (preload)
        $api[name].List(
          { filter: filter, objectset: true, size: 500 },
          function (d) {
            if (d && d.data)
              for (let i of d.data) {
                let v = _this[i.id];
                if (v) {
                  for (let c in i) {
                    v.load = true;
                    Vue.set(v, c, i[c]);
                  }
                } else Vue.set(_this, i.id, i);
              }
          },
          (e) => {
            console.log(e);
          },
          function () {
            if (cb) cb();
          }
        );
    }
    return __dicts[key];
  };
  this.load = function (name, id, cb, def) {
    return this.get(name).load(id, cb, def);
  };
})();

Vue.component('object-view', {
  props: ['name', 'prop', 'value', 'old', 'titleProp', 'box'],
  data: function () {
    return {
      data: [],
      lastcode: null
    };
  },
  created: function () {
    this.reload();
  },
  computed: {
    label: function () {
      if (!this.prop) this.prop = 'name';
      if (!this.value) return '';
      if (this.value != this.lastcode) this.reload();
      return this.data;
    }
  },
  methods: {
    reload: function () {
      this.lastcode = this.value;
      this.data = [];
      let dict = $objectset.get(this.name);
      if (!this.prop) this.prop = 'name';
      if (!this.value) return;
      let c = this.value;
      if (typeof c === 'string' && c.startsWith(' ')) {
        let cs = c.trim().split(' ');
        let r = [];
        for (let n of cs) {
          if (n == parseInt(n)) n = parseInt(n);
          let i = dict.load(n);
          this.data.push(i);
        }
      } else {
        let i = dict.load(this.value);
        this.data.push(i);
      }

      if (this.old && this.old != this.value) {
        for (let i of this.data) i.__new = true;
        c = this.old;
        if (typeof c === 'string' && c.startsWith(' ')) {
          let cs = c.trim().split(' ');
          for (let n of cs) {
            if (n == parseInt(n)) n = parseInt(n);
            let i = dict.load(n);
            if (i.__new) i.__new = false;
            else {
              i.__old = true;
              this.data.push(i);
            }
          }
        } else {
          let i = dict.load(this.old);
          i.__old = true;
          this.data.push(i);
        }
      }
    }
  },
  template: `
  <label :class="box||box===''?'object-view object-view-box':'object-view'">
    <label v-for="item in label" :class="item.__new?'label-new':(item.__old?'label-old':null)" :title="item.__new?'新添加':(item.__old?'已删除':(titleProp?item[titleProp]:''))"> 
        <slot v-bind:item="item"> {{item[prop]||''}}</slot> 
     </label>
  </label>`
});
Vue.component('object-selector', {
  props: ['name', 'box', 'button', 'prop', 'order', 'value', 'filterlist', 'query', 'multiple', 'clearable', 'placeholder', 'refresh', 'disabled'],
  data: function () {
    let data = $objectset.get(this.name, true, null, this.refresh, this.query);
    let multi = this.multiple || this.multiple === '';
    let type = '';
    if (this.box || this.box === '' || this.button || this.button === '') {
      type = multi ? 'checkbox' : 'radio';
    }
    return {
      data: data,
      multi: multi,
      type: type,
      loading: false,
      filter: ''
    };
  },
  created: function () {},
  computed: {
    options: function () {
      let d = [];
      let order = this.order;
      for (let i in this.data) {
        let o = this.data[i];
        if (o && o.id && (!this.filter || (o[this.prop] && o[this.prop].startsWith(this.filter)))) {
          d.push(o);
          if (!order && typeof o.seq_no !== 'undefined') order = 'seq_no';
        }
      }
      if (this.filterlist) d = d.filter(this.filterlist);
      if (d.length) {
        if (!order) order = this.prop;
        return d.sort((a, b) => (a[order] > b[order] ? 1 : -1));
      } else return d;
    },
    selectValue: {
      get: function () {
        if (typeof this.value === 'string') {
          if (!this.value || !this.value.trim()) return this.multi ? [] : '';
          if (this.multi) {
            let vv = [];
            for (let v of this.value.trim().split(' ')) {
              if (v) vv.push(parseInt(v));
            }
            return vv;
          }
          return this.value;
        }
        return this.value ? this.value : this.multi ? [] : '';
      },
      set: function (v) {
        if (this.multi) {
          if (typeof v == 'object') {
            v = v.join(' ');
            if (v) v = ' ' + v + ' ';
          } else if (v) v = ' ' + v + ' ';
        }
        this.$emit('input', v);
        this.$emit('change');
      }
    }
  },
  methods: {
    load: function (val) {
      let __this = this;
      this.filter = val;
      if (val) {
        this.loading = true;
        this.data.search(this.prop, val, function () {
          __this.loading = false;
        });
      }
    }
  },
  template: `
  <div>
    <template v-if="button||button===''">
        <el-checkbox-group v-if="type=='checkbox'" v-model="selectValue">
            <el-checkbox-button v-for="item in options" :key="item.id" :label="item.id">{{item[prop]}}</el-checkbox-button>
        </el-checkbox-group>
        <el-radio-group v-else-if="type=='radio'" v-model="selectValue">
            <el-radio-button v-if="clearable||clearable===''" label="">所有</el-radio-button>
            <el-radio-button v-for="item in options" :key="item.id" :label="item.id">{{item[prop]}}</el-radio-button>
        </el-radio-group>
    </template>
    <el-checkbox-group v-else-if="type=='checkbox'" v-model="selectValue">
        <el-checkbox v-for="item in options" :key="item.id" :label="item.id">{{item[prop]}}</el-checkbox>
    </el-checkbox-group>
    <el-radio-group v-else-if="type=='radio'" v-model="selectValue">
        <el-radio v-for="item in options" :disabled="disabled" :key="item.id" :label="item.id">{{item[prop]}}</el-radio>
    </el-radio-group>
    <el-select v-else v-model="selectValue" :multiple="multiple" :clearable="clearable" :placeholder="placeholder" filterable remote :remote-method="load" :loading="loading"  style="width:100%;">
        <el-option v-for="item in options" :key="item.id" :label="item[prop]" :value="item.id">
            <slot v-bind:item="item">
                <span>
                    <el-tag v-if="item.domain" size="mini" :type="item.domain==7?null:'info'"><enum-view enum="1:互联网|3:专网|4:专用系统|7:内网" :value="item.domain"></enum-view></el-tag>
                    {{ item[prop] }}
                 </span>
                <span v-if="item.desc" style="color: #C0C4CC; font-size: 12px;padding-left: 32px;">{{ item.desc }}</span> 
            </slot> 
        </el-option>
    </el-select>
  </div>
  `
});

function parseEnumObject(enumValue) {
  let options = {};
  for (let i of enumValue.split('|')) {
    let s = i.split(':');
    if (s.length == 2) options[s[0]] = s[1];
  }
  return options;
}

function parseEnumArray(enumValue) {
  let options = [];
  for (let i of enumValue.split('|')) {
    let s = i.split(':');
    if (s.length == 2) options.push({ key: s[0], value: s[1] });
  }
  return options;
}
Vue.component('enum-view', {
  props: ['value', 'enum'],
  data: function () {
    let options = {};
    for (let i of this.enum.split('|')) {
      let s = i.split(':');
      if (s.length == 2) options[s[0]] = s[1];
    }
    return {
      options: options
    };
  },
  created: function () {},
  computed: {
    label: function () {
      let i = this.options[this.value];
      if (i) return i;
      if (!this.value || typeof this.value !== 'string') return this.value;
      let all = [];
      for (let o of this.value.trim().split(',')) {
        let i = this.options[o];
        if (i) all.push(i);
        else if (o) all.push(o);
      }
      return all.join(',');
    }
  },
  template: '<label>{{label}}</label>'
});
Vue.component('enum-selector', {
  props: ['value', 'box', 'button', 'enum', 'multiple', 'clearable', 'placeholder'],
  data: function () {
    let multi = this.multiple || this.multiple === '';
    let type = '';
    if (this.box || this.box === '' || this.button || this.button === '') {
      type = multi ? 'checkbox' : 'radio';
    }
    let options = [];
    let zero = false;
    for (let i of this.enum.split('|')) {
      let s = i.split(':');
      if (s.length == 1) options.push({ key: i, label: i });
      else {
        options.push({ key: s[0], label: s[1] });
        if (s[0] === '0') zero = true;
      }
    }
    return {
      options: options,
      type: type,
      multi: multi,
      zero: zero
    };
  },
  created: function () {},
  computed: {
    selectValue: {
      get: function () {
        if (typeof this.value === 'string') {
          if (this.multi) return this.value.trim().split(',');
          return this.value;
        }
        if (this.zero) return this.value === null ? '' : this.value + '';
        return this.value ? this.value + '' : this.multi ? [] : '';
      },
      set: function (v) {
        if (this.multi) {
          if (typeof v == 'object') v = v.sort((a, b) => a - b).join(',');
        }
        this.$emit('input', v);
        this.$emit('change');
      }
    }
  },
  template: `
  <div>
  <template v-if="button||button===''">
    <el-checkbox-group v-if="type=='checkbox'" v-model="selectValue">
        <el-checkbox-button v-for="item in options" :key="item.key" :label="item.key">{{item.label}}</el-checkbox-button>
    </el-checkbox-group>
    <el-radio-group v-else-if="type=='radio'" v-model="selectValue">
        <el-radio-button v-for="item in options" :key="item.key" :label="item.key">{{item.label}}</el-radio-button>
    </el-radio-group>    
  </template>
  <template v-else>
    <el-checkbox-group v-if="type=='checkbox'" v-model="selectValue">
        <el-checkbox v-for="item in options" :key="item.key" :label="item.key">{{item.label}}</el-checkbox>
    </el-checkbox-group>
    <el-radio-group v-else-if="type=='radio'" v-model="selectValue">
        <el-radio v-for="item in options" :key="item.key" :label="item.key">{{item.label}}</el-radio>
    </el-radio-group>
    <el-select v-else v-model="selectValue" :multiple="multiple" :clearable="clearable" :placeholder="placeholder" style="width:100%;">
        <el-option v-for="item in options" :key="item.key" :label="item.label" :value="item.key"></el-option>
    </el-select>
  </template>
  </div>
  `
});
Vue.component('rule-enum-selector', {
  props: ['value', 'enum', 'placeholder', 'multi'],
  data: function () {
    let options = [];
    let list = this.enum.split('\n');
    if (list.length == 1) list = list[0].split(',');
    for (let i of list) {
      let s = i.split(':');
      if (s.length == 1) options.push({ key: i, label: i });
      else {
        options.push({ key: s[0], label: s[1] });
      }
    }
    let type = '';
    if (options.length < 10) {
      type = this.multi ? 'checkbox' : 'radio';
    }
    return {
      options: options,
      type: type
    };
  },
  created: function () {},
  computed: {
    selectValue: {
      get: function () {
        if (this.multi && typeof this.value === 'string') {
          return this.value.split(',');
        }
        return this.value ? this.value + '' : '';
      },
      set: function (v) {
        if (v && v.join) v = v.join(',');
        this.$emit('input', v);
      }
    }
  },
  template: `
  <div>
    <el-checkbox-group v-if="type=='checkbox'" v-model="selectValue">
        <el-checkbox v-for="item in options" :key="item.key" :label="item.key">{{item.label}}</el-checkbox>
    </el-checkbox-group>
    <el-radio-group v-else-if="type=='radio'" v-model="selectValue">
        <el-radio v-for="item in options" :key="item.key" :label="item.key">{{item.label}}</el-radio>
    </el-radio-group>
    <el-select v-else v-model="selectValue" :multiple="multi" clearable filterable :placeholder="placeholder" style="width:100%;">
        <el-option v-for="item in options" :key="item.key" :label="item.label" :value="item.key"></el-option>
    </el-select>
  </div>
  `
});

Vue.component('mask-view', {
  props: ['value', 'mask'],
  data: function () {
    return {
      options: {}
    };
  },
  created: function () {
    for (let i of this.mask.split('|')) {
      let s = i.split(':');
      if (s.length === 2) this.options[s[0]] = s[1];
    }
  },
  computed: {
    label: function () {
      let i = this.options[this.value];
      return i ? i : this.value;
    }
  },
  template: '<label>{{label}}</label>'
});
Vue.component('mask-selector', {
  props: ['value', 'mask', 'clearable', 'placeholder'],
  data: function () {
    return {
      options: []
    };
  },
  created: function () {
    for (let i of this.mask.split('|')) {
      let s = i.split(':');
      if (s.length == 1) this.options.push({ key: i, label: i });
      else this.options.push({ key: s[0], label: s[1] });
    }
  },
  computed: {
    selectValue: {
      get: function () {
        return this.value;
      },
      set: function (v) {
        this.$emit('input', v);
      }
    }
  },
  template: `
    <el-select v-model="selectValue" :clearable="clearable" :placeholder="placeholder" style="width:100%;">
        <el-option v-for="item in options" :key="item.key" :label="item.label" :value="item.key"></el-option>
    </el-select>
  `
});

Vue.component('audit-button', {
  props: ['type', 'api', 'obj', 'opr', 'ok', 'cancel'],
  data: function () {
    return {
      audit: { visible: false, desc: '' }
    };
  },
  methods: {
    handleOK: function () {
      if (!this.audit.desc) {
        alert('请输入审核备注');
        return;
      }
      this.audit.visible = false;
      const loading = this.$loading({
        lock: true,
        text: '正在执行',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.1)'
      });
      this.api(
        { id: this.obj.id, value: this.ok ? this.ok : this.obj.status + 1, opr: '通过审核', desc: this.audit.desc },
        (d) => this.$emit('change', d),
        null,
        () => loading.close()
      );
    },
    handleCancel: function () {
      if (!this.audit.desc) {
        alert('请输入审核备注');
        return;
      }
      this.audit.visible = false;
      this.api({ id: this.obj.id, value: this.cancel ? this.cancel : this.obj.status - 1, opr: '退回', desc: this.audit.desc }, (d) => this.$emit('change', d));
    }
  },
  template: `
  <el-popover placement="top" width="460" v-model="audit.visible">
    <el-row><b style="color:red">*</b>备注信息：</el-row>
    <el-row style="margin: 8px 0"><el-input type="textarea" :key="obj.id" v-model="audit.desc" placeholder="请输入审核备注"></el-input></el-row>
    <el-row style="text-align: right">
        <el-button type="success" icon="el-icon-circle-check" size="mini" @click="handleOK">通过审核</el-button>
        <el-button type="danger" icon="el-icon-circle-close" size="mini" @click="handleCancel">退回</el-button>
    </el-row>
    <el-button :type="type" plain size="mini" slot="reference" icon="el-icon-check"><slot></slot></el-button>
  </el-popover>`
});
Vue.component('audit-req-button', {
  props: ['type', 'api', 'obj', 'opr', 'ok', 'icon'],
  data: function () {
    return {
      audit: { visible: false, desc: '' }
    };
  },
  methods: {
    handleOK: function () {
      if (!this.audit.desc) {
        alert('请输入申请备注');
        return;
      }
      this.audit.visible = false;
      this.api({ id: this.obj.id, value: this.ok ? this.ok : this.obj.status + 1, opr: this.opr, desc: this.audit.desc }, (d) => this.$emit('change', d));
    },
    handleCancel: function () {
      this.audit.visible = false;
    }
  },
  template: `
  <el-popover placement="top" width="460" v-model="audit.visible">
    <el-row><b style="color:red">*</b>备注信息：</el-row>
    <el-row style="margin: 8px 0"><el-input type="textarea" v-model="audit.desc" placeholder="请输入申请备注"></el-input></el-row>
    <el-row style="text-align: right">
        <el-button type="success" size="mini" :icon="icon" @click="handleOK">申请{{opr}}</el-button>
        <el-button type="danger" size="mini" @click="handleCancel">取消</el-button>
    </el-row>
    <el-button :type="type" plain size="mini" slot="reference" :icon="icon"><slot></slot></el-button>
  </el-popover>`
});
Vue.component('audit-req-button2', {
  props: ['type', 'api', 'obj', 'opr', 'ok', 'icon', 'alert'],
  data: function () {
    return {
      audit: { visible: false, desc: '' }
    };
  },
  methods: {
    handleOK: function () {
      this.audit.visible = false;
      this.api({ id: this.obj.id, value: this.ok ? this.ok : this.obj.status + 1, opr: this.opr, desc: this.audit.desc }, (d) => this.$emit('change', d));
    },
    handleCancel: function () {
      this.audit.visible = false;
    }
  },
  template: `
  <el-popover placement="top" width="460" v-model="audit.visible">
    <el-row>{{alert}}</el-row>
    <el-row style="text-align: right">
        <el-button type="success" size="mini" :icon="icon" @click="handleOK">确定</el-button>
        <el-button type="danger" size="mini" @click="handleCancel">取消</el-button>
    </el-row>
    <el-button :type="type" plain size="mini" slot="reference" :icon="icon"><slot></slot></el-button>
  </el-popover>`
});
Vue.component('audit-form', {
  props: ['type', 'api', 'obj', 'opr', 'ok', 'cancel'],
  data: function () {
    return {
      audit: { visible: false, desc: '' }
    };
  },
  methods: {
    handleOK: function () {
      if (!this.audit.desc) {
        alert('请输入审核备注');
        return;
      }
      this.audit.visible = false;
      const loading = this.$loading({
        lock: true,
        text: '正在执行',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.1)'
      });
      this.api(
        { id: this.obj.id, value: this.ok ? this.ok : this.obj.status + 1, opr: '通过审核', desc: this.audit.desc },
        (d) => this.$emit('change', d),
        null,
        () => loading.close()
      );
    },
    handleCancel: function () {
      if (!this.audit.desc) {
        alert('请输入审核备注');
        return;
      }
      this.audit.visible = false;
      this.api({ id: this.obj.id, value: this.cancel ? this.cancel : this.obj.status - 1, opr: '退回', desc: this.audit.desc }, (d) => this.$emit('change', d));
    }
  },
  template: `
  <el-form style="display: inline-block;" inline>
    <el-form-item label="备注信息" required>
        <el-input v-model="audit.desc" size="mini" placeholder="请输入审核备注" style="width:500px;"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button-group>
            <el-button type="success" size="mini" icon="el-icon-circle-check" @click="handleOK">通过审核</el-button>
            <el-button type="danger" size="mini" icon="el-icon-circle-close" @click="handleCancel">退回</el-button>    
        </el-button-group>
    </el-form-item>
  </el-form>
  `
});

Vue.component('upload-to-dbus', {
  props: ['value'],
  data: function () {
    return {
      fileList: [],
      submitLoading: false
    };
  },
  created: function () {},
  computed: {
    value2() {
      if (this.value) {
        (this.fileList = []), (this.submitLoading = false);
      }
      return this.value;
    }
  },
  methods: {
    handleFileToDbus: function (params) {
      const file = params.file;
      const form = new FormData();
      form.append('file', file);
      this.submitLoading = true;
      axios({
        headers: { 'content-type': 'multipart/form-data' },
        method: 'post',
        url: '/uploadDbus',
        timeout: 30000,
        data: form
      })
        .then((res) => {
          this.submitLoading = false;
          if (res.data.msg == '文件上传成功') {
            this.value = '' + res.data.data; //JSON.stringify({name:res.data.name, id: res.data.data});
            this.$emit('input', this.value);
            return true;
          } else {
            this.value = null;
            this.$notify({ title: '导入失败', message: '文件上传失败' + res.data.data, type: 'error' });
            params.onError('文件上传失败' + res.data.data);
            return false;
          }
        })
        .catch((error) => {
          this.submitLoading = false;
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            params.onError('文件上传失败(' + error.response.status + ')，' + error.response.data);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            params.onError('文件上传失败，服务器端无响应');
          } else {
            // Something happened in setting up the request that triggered an Error
            params.onError('文件上传失败，请求封装失败');
          }
        });
    },
    handleRemove: function (file, fileList) {
      this.fileList = [];
      this.value = null;
      this.$emit('input', this.value);
    }
  },
  template: `
    <div>
        <el-input v-if="value2" readonly :value="value2">
            <span slot="prepend" style="padding: 0 10px;" >已将文件上传</span>
            <el-button slot="append" size="small" type="primary" @click="handleRemove">删除</el-button>
        </el-input>
        <el-upload v-show="!value2&&!submitLoading" drag
                class="upload-file"
                ref="upload"
                action="fakeaction"
                :http-request="handleFileToDbus"
                :on-remove="handleRemove"
                limit=1 :show-file-list="false" :multiple="false" 
                :file-list="fileList"
                :auto-upload="true">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em>（禁止导入涉密信息）</div>
            <div slot="tip" class="el-upload__tip">只能上传不超过2Gb的文件</div>
          </el-upload>
          <el-button v-if="submitLoading" style="height: 180px;width: 360px;border-style: dashed;"><i class="el-icon-loading" style="font-size: 32px;display: block;margin: 16px;"></i>正在上传文件</el-button>
    </div>
  `
});

Vue.component('key-value-def', {
  props: ['value'],
  data: function () {
    return {
      form: {
        data: []
      },
      old: null,
      rules: {
        name: [{ required: true, message: '名字不能为空', trigger: 'blur' }],
        label: [{ required: true, message: '注释不能为空', trigger: 'blur' }]
      }
    };
  },
  created: function () {
    try {
      this.form.data = JSON.parse(this.value);
    } catch (e) {
      this.form.data = [];
    }
  },
  computed: {
    data2() {
      if (this.old != this.value) {
        this.old = this.value;
        try {
          this.form.data = JSON.parse(this.value);
        } catch (e) {
          this.form.data = [];
        }
      }
      return this.form.data;
    }
  },
  methods: {
    emit: function () {
      this.$emit('input', JSON.stringify(this.form.data));
    },
    del: function (index) {
      this.form.data.splice(index, 1);
      // this.data.forEach(function(item, index, arr) {
      //     if(item.name == name) {
      //         arr.splice(index, 1);
      //     }
      // });
    }
  },
  template: `
  <div>
  <el-form ref="form" :rules="rules" :model="form">
    <el-table :data="data2" style="width: 100%">
        <el-table-column prop="type" label="字段类型" width="120px">
            <template slot-scope="scope">
                <el-form-item :prop=" 'data.' + scope.$index + '.type' ">
                    <el-select v-model="scope.row.type" placeholder="请选择" filterable default-first-option style="width: 100%;" @change="emit">
                        <el-option label="字符串" value="string"></el-option>
                        <el-option label="整数" value="long"></el-option>
                        <el-option label="枚举" value="enum"></el-option>
                        <el-option label="关键词" value="keyword"></el-option>
                        <el-option label="文件" value="file"></el-option>
                    </el-select>
                </el-form-item>
            </template>
        </el-table-column>
        <el-table-column prop="name" label="字段名称">
            <template slot-scope="scope">
                <el-form-item :prop=" 'data.' + scope.$index + '.name' " :rules="rules.name">
                    <el-input v-model="scope.row.name" @change="emit" placeholder="用于SC策略值"></el-input>
                </el-form-item>
            </template>
        </el-table-column>
        <el-table-column prop="label" label="字段标题">
            <template slot-scope="scope">
                <el-form-item :prop=" 'data.' + scope.$index + '.label' " :rules="rules.label">
                    <el-input v-model="scope.row.label" @change="emit" placeholder="用于界面显示"></el-input>
                </el-form-item>
            </template>
        </el-table-column>
        <el-table-column prop="option" label="选项">
            <template slot-scope="scope">
                <el-form-item :prop=" 'data.' + scope.$index + '.option' ">
                    <el-input v-model="scope.row.option" @change="emit" placeholder="枚举选项使用逗号分割"></el-input>
                </el-form-item>
            </template>
        </el-table-column>
        <el-table-column prop="regex" label="格式要求">
            <template slot-scope="scope">
                <el-form-item :prop=" 'data.' + scope.$index + '.regex' ">
                    <el-input v-model="scope.row.regex" @change="emit" placeholder="正则表达式"></el-input>
                </el-form-item>
            </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注">
            <template slot-scope="scope">
                <el-form-item :prop=" 'data.' + scope.$index + '.remark' " :rules="rules.remark">
                    <el-input v-model="scope.row.remark" @change="emit" placeholder="提示用户如何输入"></el-input>
                </el-form-item>
            </template>
        </el-table-column>
        <el-table-column prop="hide" label="隐藏" width="80">
            <template slot-scope="scope">
                <el-form-item :prop=" 'data.' + scope.$index + '.hide' ">
                    <el-checkbox v-model="scope.row.hide" @change="emit"></el-checkbox>
                </el-form-item>
            </template>
        </el-table-column>
        <el-table-column prop="hide" label="多选" width="80">
            <template slot-scope="scope">
                <el-form-item :prop=" 'data.' + scope.$index + '.multi' ">
                    <el-checkbox v-model="scope.row.multi" @change="emit"></el-checkbox>
                </el-form-item>
            </template>
        </el-table-column>
        <el-table-column prop="hide" label="必须" width="80">
            <template slot-scope="scope">
                <el-form-item :prop=" 'data.' + scope.$index + '.request' ">
                    <el-checkbox v-model="scope.row.request" @change="emit"></el-checkbox>
                </el-form-item>
            </template>
        </el-table-column>
        <el-table-column prop="width" label="列表宽度" width="100">
            <template slot-scope="scope">
                <el-form-item :prop=" 'data.' + scope.$index + '.width' " :rules="rules.label">
                    <el-input v-model.number="scope.row.width" @change="emit" placeholder="用于界面显示"></el-input>
                </el-form-item>
            </template>
        </el-table-column>
       <el-table-column label="操作" width="120px">
            <template slot-scope="scope">
                <el-form-item>
                    <el-button icon="el-icon-delete" @click="del(scope.$index),emit()">删除</el-button>
                </el-form-item>
            </template>
        </el-table-column>
    </el-table>
    <el-button icon="el-icon-plus" @click="form.data.push({type: 'string', name: '', label: '', regex: '',option:'',remark:'',hide:false,multi:false,request:false,width:null}),emit()">添加</el-button>
  </el-form>
  </div>
  `
});

Vue.component('key-value-editor', {
  props: ['value', 'schema', 'readonly'],
  data: function () {
    return {
      data: {},
      def: [],
      editRules: {}
    };
  },
  created: function () {
    this.def = JSON.parse(this.schema);
    this.editRules = {};
    for (let i of this.def) {
      let rules = [];
      if (i.request || i.regex) {
        let rule = {};
        rule.message = '请输入符合该参数格式要求的数据';
        rule.trigger = 'blur';
        rule.required = true;
        rules.push(rule);
      }
      if (i.regex && i.regex != '') {
        let rule = {};
        try {
          let reg = new RegExp(i.regex);
          rule.pattern = reg;
        } catch (e) {
          $app.$message({
            type: 'error',
            message: i.name + '策略值的格式校验参数不正确!'
          });
          rule.pattern = i.regex;
        }
        rules.push(rule);
      }
      if (rules.length) this.editRules[i.name] = rules;
    }

    if (this.value) this.data = JSON.parse(this.value);
    else {
      let obj = {};
      for (let i of this.def) {
        obj[i.name] = null;
        if (i.type === 'enum') {
          let ops = replaceAllChar(i.option, '，', ',').split(',');
          if (ops.length) {
            let ss = [];
            for (let k of ops) {
              ss.push(k.split(':')[0]);
            }
            if (i.multi) obj[i.name] = ss.join(',');
            else obj[i.name] = ss[0];
          }
        }
      }
      this.data = obj;
      this.emit();
    }
  },
  computed: {},
  methods: {
    emit: function () {
      this.$emit('input', JSON.stringify(this.data));
    }
  },
  template: `
  <el-form :model="data" label-width="160px"  :rules="editRules">
    <el-form-item v-for="d in def" :key="d.name" :label="d.label" :prop="d.name" style="margin-bottom:22px" :title="d.remark?d.remark:''">
        <el-input v-if="d.type=='long'" key="n" :readonly="readonly" v-model.number="data[d.name]" :placeholder="'请输入'+d.label" @change="emit"></el-input>
        <el-input v-else-if="d.type=='string'" key="s" :readonly="readonly" v-model="data[d.name]" :placeholder="'请输入'+d.label" @change="emit"></el-input>
        <rule-enum-selector v-else-if="d.type=='enum'&&d.option" v-model="data[d.name]" :enum="replaceAllChar(d.option, '，',',')" :multi="d.multi" :placeholder="'请选择'+d.label" @input="emit"></rule-enum-selector>
        <upload-to-dbus v-else-if="d.type=='file'" v-model="data[d.name]" @input="emit"></upload-to-dbus>
        <keyword-editor v-else-if="d.type=='keyword'" v-model="data[d.name]" :name="d.type" @input="emit"></keyword-editor>
        <el-input v-else v-model="data[d.name]" key="o" :readonly="readonly" :type="d.type" :placeholder="'请输入'+d.label" @change="emit"></el-input>
    </el-form-item>
  </el-form>
  `
});

Vue.component('key-value-view', {
  props: ['value', 'schema', 'filter'],
  data: function () {
    return {
      data: {},
      def: []
    };
  },
  created: function () {
    this.def = JSON.parse(this.schema);
    if (this.filter) this.def = this.def.filter(this.filter);
    if (this.value) this.data = JSON.parse(this.value);
    else {
      let obj = {};
      for (let i of this.def) {
        obj[i.name] = '';
      }
      this.data = obj;
    }
  },
  computed: {},
  template: `
  <label>
    <label v-for="d in def" :key="d.name" style="padding-right: 16px;">
        <label style="font-weight: bolder;">{{d.label}}</label>: 
        <template v-if="d.type=='file'"><dbus-file :value="data[d.name]"></dbus-file></template>
        <template v-else>{{data[d.name]}}</template>        
    </label>
  </label>
  `
});

Vue.component('key-value-descriptions-view', {
  props: ['value', 'schema', 'title', 'column', 'direction', 'border', 'filter'],
  data: function () {
    return {
      data: {},
      def: []
    };
  },
  created: function () {
    this.def = JSON.parse(this.schema);
    if (this.filter) this.def = this.def.filter(this.filter);
    if (this.value) this.data = JSON.parse(this.value);
    else {
      let obj = {};
      for (let i of this.def) {
        obj[i.name] = '';
      }
      this.data = obj;
    }
  },
  computed: {},
  template: `
  <el-descriptions class="key-value-descriptions-view" :title="title" :column="column" :border="border" :direction="direction">
    <el-descriptions-item v-for="d in def" :key="d.name" :label="d.label">
        <span :title="data[d.name]">
            <template v-if="d.type=='file'"><dbus-file :value="data[d.name]"></dbus-file></template>
            <template v-else>{{data[d.name]}}</template>       
        </span>
    </el-descriptions-item>
  </el-descriptions>
  `
});

Vue.component('range-view', {
  props: ['code', 'old', 'obj'],
  data: function () {
    return {
      lastcode: '',
      data: []
    };
  },
  created: function () {
    this.reload();
  },
  methods: {
    reload: function () {
      this.lastcode = this.code;
      this.data = [];
      if (!this.code) return;
      let c = this.code + '';
      if (c.startsWith(' ')) {
        let cs = c.trim().split(' ');
        let r = [];
        for (let n of cs) {
          n = parseInt(n);
          if (!n) {
          }
          if (!n) {
          } else if ((n & 0x3f) == 0) {
            this.data.push($dict.load('System', n));
          } else {
            this.data.push($dict.load('Engine', n));
          }
        }
      } else {
        if ((parseInt(this.code) & 0x3f) == 0) {
          this.data.push($dict.load('System', parseInt(this.code)));
        } else {
          this.data.push($dict.load('Engine', parseInt(this.code)));
        }
      }
      if (this.old && this.old != this.code) {
        for (let i of this.data) i.__new = true;
        c = this.old + '';
        let i = null;
        if (c.startsWith(' ')) {
          let cs = c.trim().split(' ');
          let r = [];
          for (let n of cs) {
            n = parseInt(n);
            if ((n & 0x3f) == 0) {
              i = $dict.load('System', n);
            } else {
              i = $dict.load('Engine', n);
            }
            if (i.__new) i.__new = false;
            else {
              i.__old = true;
              this.data.push(i);
            }
          }
          return r.join(' ');
        } else {
          if ((parseInt(this.old) & 0x3f) == 0) {
            i = $dict.load('System', parseInt(this.old));
          } else {
            i = $dict.load('Engine', parseInt(this.old));
          }
          i.__old = true;
          this.data.push(i);
        }
      }
    }
  },
  computed: {
    label: function () {
      if (this.obj) {
        this.code = this.obj.range;
      }
      if (this.lastcode != this.code) this.reload();
      return this.data;
    }
  },
  template: `
  <label>
    <el-tag v-for="item in label" :class="item.__new?'label-new':(item.__old?'label-old':null)" :title="item.__new?'新添加':(item.__old?'已删除':null)" size="small"> {{item.name}} </el-tag>
  </label>`
});
Vue.component('range-selector', {
  props: ['value', 'ruletype', 'box', 'multiple', 'clearable', 'placeholder', 'domain', 'filter'],
  data: function () {
    let multi = this.multiple || this.multiple === '';
    let type = '';
    if (this.box || this.box === '') {
      type = multi ? 'checkbox' : 'radio';
    }
    return {
      options: [],
      multi: multi,
      type: type
    };
  },
  created: function () {
    this.load();
  },
  watch: {},
  computed: {
    selectValue: {
      get: function () {
        if (typeof this.value === 'number') return this.value + '';
        if (!this.value || !this.value.trim()) return this.multi ? [] : '';
        return this.multi ? this.value.trim().split(' ') : this.value ? this.value + '' : '';
      },
      set: function (v) {
        if (this.multi) v = ' ' + v.join(' ') + ' ';
        this.$emit('input', v);
      }
    },
    options2: function () {
      return this.options.filter((x) => !this.ruletype || (x.rule_type && x.rule_type.includes(' ' + this.ruletype + ' ')));
    }
  },
  methods: {
    load: function () {
      let _this = this;
      $api.System.List({}, (sys) => {
        $api.Engine.List({}, (es) => {
          let d = [];
          let s = {};
          for (let o of sys.data) {
            d.push(o);
            s[o.code] = o;
          }
          for (let o of es.data) {
            d.push(o);
            let ss = s[o.system];
            if (ss) (o.type = ss.type), (o.system = ss);
          }
          _this.options = d.sort((a, b) => (a.code > b.code ? 1 : -1)).filter((x) => (!_this.domain || x.code >> 12 == _this.domain) && x.online_status > 1 && (!_this.filter || _this.filter(x)));
        });
      });
    }
  },
  template: `
  <div>
    <el-checkbox-group v-if="type=='checkbox'" v-model="selectValue">
        <el-checkbox v-for="item in options2" :key="item.id" :label="item.code+''"><span v-if="item.code&0x3f">{{item.system.name}}/</span>{{item.name}}</el-checkbox>
    </el-checkbox-group>
    <el-radio-group v-else-if="type=='radio'" v-model="selectValue">
        <el-radio v-for="item in options2" :key="item.id" :label="item.code+''"><span v-if="item.code&0x3f">{{item.system.name}}/</span>{{item.name}}</el-radio>
    </el-radio-group>
    <el-select v-else v-model="selectValue" :multiple="multiple" :clearable="clearable" :placeholder="placeholder" filterable style="width:100%;">
        <el-option v-for="item in options2" :key="item.id" :label="item.name" :value="item.code+''">
            <span style="float: left">
                <i v-if="item.code&0x3f">&nbsp;&nbsp;</i>
                <el-tag v-if="item.domain" size="mini" :type="item.domain==7?null:'info'"><enum-view enum="1:互联网|3:专网|4:专用系统|7:内网" :value="item.domain"></enum-view></el-tag>
                {{ item.name }}
            </span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.code }}</span>
        </el-option>
    </el-select>
  </div>`
});
Vue.component('show-value', {
  props: ['value'],
  data: function () {
    return {};
  },
  created: function () {},
  watch: {},
  computed: {},
  methods: {},
  template: `
    <div>
        {{value}}
    </div>
  `
});

Vue.component('business-view', {
  props: ['code', 'obj'],
  data: function () {
    return {
      lastcode: 0,
      data: []
    };
  },
  created: function () {
    this.reload();
  },
  methods: {
    reload: function () {
      this.lastcode = this.code;
      this.data = [];
      if (!this.code) return;
      let p = {};
      if (this.code & 0x3f) p.engines = '' + this.code;
      else p.system = '' + this.code;
      $api.Business.List({ filter: p }, (d) => {
        this.data = d.data;
      });
    }
  },
  computed: {
    list: function () {
      if (this.obj) {
        this.code = this.obj.code;
      }
      if (!this.code) return '';
      if (this.lastcode != this.code) this.reload();
      return this.data;
    }
  },
  template: `
  <label>
    <label v-if="!list.length">无</label>
    <label v-for="item in list" style="display: inline-block;padding: 4px;"><i class="el-icon-c-scale-to-original"></i>{{item.name}} </label>
  </label>`
});

Vue.component('compare-tooltip', {
  props: ['original', 'current', 'prop', 'label', 'format', 'placement'],
  data: function () {
    if (!this.placement) this.placement = 'right-start';
    return {};
  },
  methods: {
    value(v) {
      if (this.format) return this.format(v);
      else return v;
    }
  },
  template: `
  <div style="display: inline-block;margin-right: 8px;">
    <b v-if="label">{{label}}:</b> 
    <label v-if="original&&current[prop]!=original[prop]" class="label-modify">
        <el-tooltip v-if="original&&current[prop]!=original[prop]" :placement="placement" effect="light">
            <div slot="content" style="max-width: 50%;">
                <b style="margin: 0">修改前:</b> 
                <slot v-bind:item="original">{{value(original[prop])}}</slot>
            </div>
            <slot v-bind:item="current">{{value(current[prop])}}</slot>            
        </el-tooltip>
    </label>
    <label v-else-if="current[prop]"><slot v-bind:item="current">{{value(current[prop])}}</slot></label>
    <label v-else class="label-old"><slot v-bind:item="original">{{value(original[prop])}}</slot></label>
  </div>
  `
});

Vue.component('compare-value', {
  props: ['original', 'current', 'prop', 'label', 'format'],
  data: function () {
    return {
      visible: false
    };
  },
  methods: {
    value(v) {
      if (this.format) return this.format(v);
      else return v;
    }
  },
  template: `
  <div @mouseover="visible=true" @mouseout="visible=false" style="display: inline-block;margin-right: 8px;">
    <b v-if="label">{{label}}:</b> 
    <label v-if="original&&current[prop]!=original[prop]" class="label-modify">
        <slot v-bind:item="current">{{value(current[prop])}}</slot>
    </label>
    <label v-else-if="current[prop]"><slot v-bind:item="current">{{value(current[prop])}}</slot></label>
    <label v-else class="label-old"><slot v-bind:item="original">{{value(original[prop])}}</slot></label>
    <label v-if="visible&&original&&current[prop]!=original[prop]&&original[prop]"><b style="margin: 0">修改前:</b> <slot v-bind:item="original">{{value(original[prop])}}</slot></label>
  </div>
  `
});

Vue.component('modify-value', {
  props: ['original', 'current', 'always'],
  data: function () {
    return {
      visible: false
    };
  },
  created: function () {
    this.always = !(this.always === false);
  },
  methods: {},
  template: `
  <div @mouseover="visible=true" @mouseout="visible=false">
    <label v-if="original&&current!=original" class="label-modify">
        <slot v-bind:item="current">{{current}}</slot>
    </label>
    <label v-else-if="current"><slot v-bind:item="current">{{current}}</slot></label>
    <label v-else class="label-old"><slot v-bind:item="original">{{original}}</slot></label>
    <label v-if="original" v-show="(always||visible)&&current!=original"><b style="margin: 0">修改前:</b> <slot v-bind:item="original">{{original}}</slot></label>
    <label v-else v-show="(always||visible)&&current!=original"><b style="margin: 0">修改前没有设置</b></label>
  </div>
  `
});

Vue.component('star-alert', {
  props: ['type', 'title'],
  data: function () {
    return {
      visible: true
    };
  },
  methods: {},
  created: function () {
    this.$message({
      message: this.title,
      type: this.type,
      duration: 0
    });
  },
  template: ``
});

Vue.component('uas-alert', {
  props: ['title', 'type', 'message', 'duration'],
  data: function () {
    return {
      visible: true
    };
  },
  methods: {},
  created: function () {
    setTimeout(() => {
      this.$notify({
        title: this.title,
        type: this.type,
        dangerouslyUseHTMLString: true,
        message: this.message,
        duration: this.duration,
        onClick: () => this.$emit('click')
      });
    }, 100);
  },
  template: ``
});

Vue.component('uas-label', {
  props: ['label'],
  data: function () {
    return {};
  },
  methods: {},
  template: `
  <label class="uas-label"><span v-if="label" class="uas-label__label">{{label}}: </span><span class="uas-label__content"><slot></slot></span></label>`
});
Vue.component('uas-card', {
  props: ['span'],
  data: function () {
    if (!this.span) this.span = 0;
    let xl = 4,
      lg = 6,
      md = 8,
      sm = 12,
      xs = 12;
    switch (this.span) {
      case 0:
        (xl = 2), (lg = 3), (md = 4), (sm = 6), (xs = 6);
        break;
      case 1:
        (xl = 4), (lg = 6), (md = 8), (sm = 12), (xs = 12);
        break;
      case 2:
        (xl = 6), (lg = 8), (md = 12), (sm = xs = 24);
        break;
      case 3:
        (xl = 12), (lg = 12), (md = sm = xs = 24);
        break;
      case 4:
        (xl = 16), (lg = 16), (md = sm = xs = 24);
        break;
      case 5:
        (xl = 18), (lg = 18), (md = sm = xs = 24);
        break;
      default:
        xl = lg = md = sm = xs = 24;
        break;
    }
    return {
      xl: xl,
      lg: lg,
      md: md,
      sm: sm,
      xs: xs
    };
  },
  methods: {},
  template: `
        <el-col class="uas-card" :xl="xl" :lg="lg" :md="md" :sm="sm" :xs="xs">
            <el-card style="width:calc(100% - 20px);margin-bottom: 8px;">
                <template slot="header" class="clearfix"><slot name="header"></slot></template>
                <slot></slot>
            </el-card>
        </el-col>
    </el-row>
  `
});

Vue.component('box-button', {
  props: ['span', 'icon'],
  data: function () {
    if (!this.span) this.span = 0;
    let xl = 4,
      lg = 6,
      md = 8,
      sm = 12,
      xs = 12;
    switch (this.span) {
      case 0:
        (xl = 2), (lg = 3), (md = 4), (sm = 6), (xs = 6);
        break;
      case 1:
        (xl = 4), (lg = 6), (md = 8), (sm = 12), (xs = 12);
        break;
      case 2:
        (xl = 6), (lg = 8), (md = 12), (sm = xs = 24);
        break;
      case 3:
        (xl = 12), (lg = 12), (md = sm = xs = 24);
        break;
      case 4:
        (xl = 16), (lg = 16), (md = sm = xs = 24);
        break;
      case 5:
        (xl = 18), (lg = 18), (md = sm = xs = 24);
        break;
      default:
        xl = lg = md = sm = xs = 24;
        break;
    }
    return {
      xl: xl,
      lg: lg,
      md: md,
      sm: sm,
      xs: xs
    };
  },
  methods: {},
  template: `
        <el-col class="box-button" :xl="xl" :lg="lg" :md="md" :sm="sm" :xs="xs">
            <el-button :icon="icon" @click="$emit('click')"><slot></slot></el-button>
        </el-col>
    </el-row>
  `
});

Vue.component('good-box', {
  props: ['expaned', 'height'],
  data: function () {
    return {
      isExpaned: this.expaned || this.expaned === '',
      showBody: false
    };
  },
  methods: {},
  template: `
    <el-card :class="showBody?'good-box':'good-box good-box__mini'">
        <div v-if="isExpaned" slot="header">
            <table>
                <tr>
                    <td>
                        <div slot="header">
                            <slot name="header"></slot>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div v-else-if="showBody" @click="e=>showBody=false" slot="header">
            <table>
                <tr>
                    <td>
                        <div slot="header">
                            <slot name="header"></slot>
                        </div>
                    </td>
                    <td style="width: 16px;text-align: right">
                        <i class="el-icon-arrow-up"></i>
                    </td>
                </tr>
            </table>
        </div>
        <div v-else @click="e=>showBody=true">
            <table>
                <tr>
                    <td>
                        <div slot="header">
                            <slot name="header"></slot>
                        </div>
                    </td>
                    <td style="width: 16px;text-align: right">
                        <i class="el-icon-arrow-down"></i>
                    </td>
                </tr>
            </table>
        </div>
        <div v-show="showBody||isExpaned" class="good-box__content innerbox" :style="{height:height}">
            <slot></slot>
        </div>
    </el-card>
  `
});
Vue.component('uas-loading', {
  props: [],
  data: function () {
    return {
      showBody: false
    };
  },
  methods: {},
  template: `
    <div class="uas-loading">
      <slot></slot>
    </div>
  `
});

Vue.component('sso-frame', {
  props: ['width', 'height', 'addr', 'system', 'obj', 'ssoUrl'],
  data: function () {
    return {
      src2: 'about:blank',
      old: {}
    };
  },
  computed: {
    src3() {
      if (this.old != this.obj) {
        if (!this.obj) {
          this.obj = { system: this.system, addr: this.addr };
        }
        this.old = this.obj;
        if (this.obj.addr.includes('{ticket}')) {
          if (this.ssoUrl) this.ssoUrl(this.obj.system, this.obj.addr, (url) => (this.src2 = url));
          else Wil.invokeParent('ssoUrl', this.obj, (url) => (this.src2 = url));
        } else this.src2 = this.obj.addr;
      }
      return this.src2;
    }
  },
  methods: {},
  template: `
    <iframe class="sso-frame" :src="src3" frameborder="0" :style="{width:width?width:'100%', height: height?height:'100%'}" onload="window.onLoadIFrame&&onLoadIFrame(this)"></iframe>
  `
});

Vue.component('system-stat-chart', {
  props: ['title', 'total', 'system', 'engines', 'querydate', 'columns', 'width', 'height', 'unit', 'realtime', 'tab'],
  data: function () {
    this.extend = {
      grid: {
        left: 0,
        show: false,
        height: this.height / 2
      }
    };
    return {
      chartData: {
        columns: ['时间'],
        rows: []
      },
      showrt: this.realtime || this.realtime === '',
      reload: 0,
      last: 0,
      chartSettings: {
        //xAxisType: 'time',
        minInterval: 1
      },
      dimension: this.tab || '日',
      all: [],
      index: 0,
      page: 100,
      user: window.$app ? $app.user : {}
    };
  },
  watch: {
    engines() {
      this.reload++;
    },
    system() {
      this.reload++;
    }
  },
  created: function () {
    this.load();
  },
  computed: {
    chartData2() {
      if (this.last != this.reload) {
        this.last = this.reload;
        this.load();
      }
      return this.chartData;
    }
  },
  methods: {
    load() {
      let last = this.last;
      let __this = this;
      let query_dates = [];
      let q_dimension = '';
      let today = (Date.parse(new Date().Format('yyyy-MM-dd')) - 8 * 60 * 60 * 1000) / 1000;
      let formatDate;
      switch (__this.dimension) {
        case '分':
          q_dimension = 'd_minite';
          formatDate = function (v) {
            return new Date(v.time_point * 1000).Format('hh:mm');
          };
          query_dates = [(Date.parse(new Date().DateAdd('d', -1).Format('yyyy-MM-dd')) - 8 * 60 * 60 * 1000) / 1000, today];
          break;
        case '时':
          q_dimension = 'time_point';
          formatDate = function (v) {
            return new Date(v.time_point * 1000).Format('MM-dd hh:00');
          };
          query_dates = [(Date.parse(new Date().DateAdd('d', -2).Format('yyyy-MM-dd')) - 8 * 60 * 60 * 1000) / 1000, Date.parse(new Date().Format('yyyy-MM-dd hh:00')) / 1000];
          break;
        case '周':
          q_dimension = 'd_day';
          formatDate = function (v) {
            return new Date(v.d_day * 1000).Format('MM-dd');
          };
          let time1 = (Date.parse(new Date().DateAdd('d', -60).Format('yyyy-MM-dd')) - 8 * 60 * 60 * 1000) / 1000;
          query_dates = [time1, today];
          break;
        case '月':
          q_dimension = 'd_mouth';
          formatDate = function (v) {
            return new Date(v.d_mouth * 1000).Format('MM');
          };
          let time2 = Date.parse(new Date().DateAdd('m', -12).Format('yyyy-MM')) / 1000;
          let time3 = Date.parse(new Date().Format('yyyy-MM')) / 1000;
          query_dates = [time2, time3];
          break;
        default:
          q_dimension = 'd_day';
          formatDate = function (v) {
            return new Date(v.d_day * 1000).Format('MM-dd');
          };
          let time4 = (Date.parse(new Date().DateAdd('d', -32).Format('yyyy-MM-dd')) - 8 * 60 * 60 * 1000) / 1000;
          query_dates = [time4, today];
      }
      let ids = __this.engines;
      if (__this.engines) {
        if (typeof __this.engines === 'number') ids = [__this.engines];
        else if (typeof __this.engines === 'string') ids = __this.engines.trim().split(' ').map(Number);
      } else if (__this.system) {
        if (typeof __this.system === 'number') ids = [__this.system];
        else if (typeof __this.system === 'string') ids = parseInt(__this.system.trim());
      }
      if (!ids || ids.length == 0 || !ids[0]) return;
      $api.Status.StaticByDimension(
        {
          ids: ids,
          status: 'run',
          dates: query_dates,
          dimension: q_dimension,
          limit: 100000,
          order: 'data'
        },
        function (d) {
          if (last != __this.last) return;
          let rows = [],
            rowsMap = {};
          let now = new Date();
          switch (__this.dimension) {
            case '分':
              break;
            case '时':
              rows.push({ 时间: now.Format('MM-dd hh:00') });
              for (let i = 0; i < 48; i++) {
                let temp = now.DateAdd('h', ~i).Format('MM-dd hh:00');
                let r = {};
                r['时间'] = temp;
                rows.push(r);
              }
              break;
            case '周':
              rows.push({ 时间: new Date().Format('MM-dd') });
              for (let i = 0; i < 8; i++) {
                let temp = new Date().DateAdd('d', ~i * 7).Format('MM-dd');
                let r = {};
                r['时间'] = temp;
                rows.push(r);
              }
              break;
            case '月':
              rows.push({ 时间: new Date().Format('MM') });
              for (let i = 0; i < 11; i++) {
                let temp = new Date().MouthAdd('m', ~i).Format('MM');
                let r = {};
                r['时间'] = temp;
                rows.push(r);
              }
              break;
            default:
              rows.push({ 时间: new Date().Format('MM-dd') });
              for (let i = 0; i < 31; i++) {
                let temp = new Date().DateAdd('d', ~i).Format('MM-dd');
                let r = {};
                r['时间'] = temp;
                rows.push(r);
              }
          }
          for (let r of rows) rowsMap[r['时间']] = r;
          __this.chartData.columns = ['时间'];
          if (__this.system) {
            let columns = ['业务数据'];
            if (__this.columns) {
              if (typeof __this.columns == 'string') columns = __this.columns.trim().split(' ');
              else columns = __this.columns;
            }
            for (let o of columns) {
              if (typeof o === 'object') __this.chartData.columns.push(o.name);
              else if (o.indexOf(':') > 0) {
                if (!__this.chartData.columns.includes(o)) __this.chartData.columns.push(o);
              } else if (d && d.length) {
                let v = JSON.parse(d[d.length - 1].others);
                for (let p in v) {
                  if (p.indexOf(o + ':') == 0) __this.chartData.columns.push(p);
                }
              }
            }
            for (let v of d) {
              let w = rowsMap[formatDate(v)];
              if (__this.dimension == '分' && (__this.dimension === '分' || !w)) {
                w = { 时间: formatDate(v) };
                rows.push(w);
                rowsMap[formatDate(v)] = w;
              }
              if (w && v.others) {
                let source_data = JSON.parse(v.others);
                for (let f of __this.chartData.columns) {
                  if (f == '时间') continue;
                  let cc = __this.columns[0];
                  if (typeof cc === 'object') {
                    for (let o of columns) {
                      if (f == o.name) w[f] = source_data[o.value];
                    }
                  } else if (source_data.hasOwnProperty(f)) {
                    w[f] = source_data[f];
                  }
                }
              }
            }
          } else {
            let columns = __this.columns || '业务数据:采集数据';
            for (let v of d) {
              let w = rowsMap[formatDate(v)];
              if (w && v.others) {
                let source_data = JSON.parse(v.others);
                w[v.obj.name] = source_data[columns];
              }
              if (!__this.chartData.columns.includes(v.obj.name)) {
                __this.chartData.columns.push(v.obj.name);
              }
            }
          }

          for (let w of rows) {
            for (let c of __this.chartData.columns) {
              if (c != '时间' && !w[c]) {
                w[c] = 0;
              }
            }
          }
          if (__this.dimension != '分') rows = rows.reverse();
          for (let ii = 1; ii < rows.length; ii++) {
            for (let c of __this.chartData.columns) {
              if (c != '时间' && c.indexOf('速率') < 0) {
                if (!rows[ii][c]) rows[ii][c] = rows[ii - 1][c];
              }
            }
          }
          for (let c of __this.chartData.columns) {
            if (c != '时间' && c.indexOf('速率') < 0) {
              for (let jj = 0; jj < rows.length - 1; jj++) {
                if (rows[jj][c]) {
                  for (let ii = rows.length - 1; ii > jj; ii--) {
                    let v = rows[ii][c] - rows[ii - 1][c];
                    rows[ii][c] = v > 0 && rows[ii][c] > 0 ? v : 0;
                  }
                  for (; jj > 0; jj--) rows[jj][c] = 0;
                  break;
                }
              }
            }
          }
          rows.shift();
          __this.chartData.rows = rows;
          __this.all = __this.chartData.columns;
          __this.chartData.columns = __this.all.slice(0, __this.page);
          __this.extend = {
            color: ['#5b8ff9', '#61ddaa', '#65789b', '#f6bd16', '#7262fd', '#78d3f8', '#9661bc', '#f6903d', '#008685', '#f08bb4'],
            yAxis: {
              show: true,
              splitLine: {
                show: false
              },
              axisLine: {
                show: true
              },
              axisLabel: {
                formatter: (v) => {
                  if (__this.unit == 'bps') {
                    if (typeof v == 'number' && v > 100) return parseInt(v / 10 + 0.5) / 100 + 'M';
                    else if (('' + v).includes('.')) return ' ';
                    else return v;
                  } else if (__this.unit == '百分比') {
                    if (typeof v == 'number') return percentTransform(v);
                    else if (('' + v).includes('.')) return ' ';
                    else return v;
                  } else {
                    if (typeof v == 'number' && v > 100) return bigNumberTransform(v);
                    else if (('' + v).includes('.')) return ' ';
                    else return v;
                  }
                }
              }
            },
            xAxis: {
              show: true,
              splitLine: {
                show: false
              },
              axisLine: {
                show: true
              }
            },
            grid: {
              left: 0,
              top: 25,
              bottom: 10,
              show: false
            },
            legend: {
              type: 'scroll',
              show: true,
              top: 0,
              textStyle: {
                fontSize: 12
              },
              formatter: (name) => {
                if (name.indexOf(':') > 0) return name.substr(name.indexOf(':') + 1);
                else return name;
              }
            },
            tooltip: {
              trigger: 'axis',
              position: function (pos, params, dom, rect, size) {
                var obj = { top: 20 };
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                return obj;
              },
              formatter: (params) => {
                if (params.length > 0) {
                  if (__this.name == 'flow') {
                    let res = params[0].axisValue + '</br>';
                    for (let p of params) {
                      let sname = p.seriesName;
                      if (sname.indexOf(':') > 0) sname = sname.substr(sname.indexOf(':') + 1);
                      res += sname + '的日志数为' + bigNumberTransform(p.data[1]) + '条' + '</br>';
                    }
                    return res;
                  } else {
                    let res = params[0].axisValue + '</br>';
                    for (let p of params) {
                      let sname = p.seriesName;
                      if (sname.indexOf(':') > 0) sname = sname.substr(sname.indexOf(':') + 1);
                      res += sname + '的数据量为' + bigNumberTransform(p.data[1]) + (__this.unit || '') + '</br>';
                    }
                    return res;
                  }
                }
              }
            }
          };
        },
        function (err) {
          console.log(err);
        }
      );
    },
    resizeTheChart() {
      if (this.$refs.chart1) {
        this.$refs.chart1.resize();
      }
    },
    showName(index) {
      return this.chartData.rows[index].name;
    },
    next(num) {
      this.index += num * this.page;
      if (this.index >= this.all.length) this.index = 0;
      if (this.index + this.page > this.all.length) this.index = this.all.length - this.page;
      if (this.index < 0) this.index = 0;
      this.chartData.columns = this.all.slice(this.index, this.index + this.page);
    },
    deleteMax() {
      let data = this.chartData.rows;
      let max = 0;
      for (let row of data) {
        for (let i in row) {
          if (i != '时间' && row[i] > max) max = row[i];
        }
      }
      for (let row of data) {
        for (let i in row) {
          if (i != '时间' && row[i] == max) row[i] = 0;
        }
      }
    }
  },
  template: `
    <el-card class="box-card" style="margin:10px;">
        <div>
            <slot> 
                {{title}}
                <el-tag v-if="total" effect="plain" type="success">
                    <label>{{total}}</label>
                </el-tag>
            </slot>
            <span style="float:right;display: inline-block;" >
                <el-radio-group v-model="dimension" @change="reload++" size="mini">
                    <el-radio-button v-if="showrt" label="分"></el-radio-button>
                    <el-radio-button label="时"></el-radio-button>
                    <el-radio-button label="日"></el-radio-button>
                    <el-radio-button label="周"></el-radio-button>
                    <el-radio-button label="月"></el-radio-button>
                </el-radio-group>
                <el-button v-if="user.admin_mode" size="mini" icon="el-icon-delete" title="删除最大值" @click="deleteMax"></el-button>
            </span>
        </div>
        <div style="padding-top: 8px">
            <div>
                <el-button class="chart-button" type="text" icon="el-icon-back" v-if="index>0" style="float: left;padding-left: 8px;margin-top: -20px" @click="next(-1)"></el-button>
                <el-button v-if="all.length>page&&index+page<all.length" class="chart-button" type="text" icon="el-icon-right" style="float: right;padding-right: 8px;margin-top: -20px" @click="next(1)" title="更多"></el-button>
                <ve-line ref="chart1" :extend="extend" :settings="chartSettings"  :data="chartData2" :height="height" judge-width></ve-line>
            </div>
        </div>
    </el-card>
  `
});
Vue.component('dict-selector-name', {
  props: ['dict', 'value', 'number', 'filter', 'multiple', 'clearable', 'placeholder', 'refresh', 'max', 'width'],
  data: function () {
    return {
      data: {},
      multi: false
    };
  },
  created: function () {
    this.data = $dict.get(this.dict, true);
    this.multi = this.multiple || this.multiple === '';
  },
  computed: {
    options: function () {
      let d = [];
      for (let i in this.data) {
        if (typeof i === 'string' && i.startsWith('__')) continue;
        let o = this.data[i];
        if (o) d.push(o);
      }
      if (this.filter) d = d.filter(this.filter);
      return d; //.sort((a,b)=>a.code > b.code ? 1 : -1);
    },
    selectValue: {
      get: function () {
        if (typeof this.value === 'number') return this.value ? this.value + '' : '';
        if (!this.value || !this.value.trim()) return this.multi ? [] : '';
        return this.multi ? this.value.trim().split(' ') : this.value ? this.value + '' : '';
      },
      set: function (v) {
        if (this.max && v.length > this.max) {
          alert('最多只能选择' + this.max + '个来源进行展示,请先删除一个已展示的来源');
          return;
        }
        if (this.multi) v = ' ' + v.join(' ') + ' ';
        this.$emit('input', v);
      }
    }
  },
  template: `
    <el-select  collapse-tags :key="dict+':'+value" v-model="selectValue" :multiple="multiple" :clearable="clearable" :placeholder="placeholder" @remove-tag="tag=>$emit('remove-tag',tag)" filterable style="width:25%;font-size: 10px;" size="mini">
        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.code+''">
            <span>
                <el-tag v-if="item.domain" size="mini" :type="item.domain==7?null:'info'"><enum-view enum="1:互联网|3:专网|4:专用系统|7:内网" :value="item.domain"></enum-view></el-tag>
                {{ item.name }}
            </span>
            <span style="color: #C0C4CC; font-size: 12px;padding-left: 0px;">{{ item.code }}</span>
        </el-option>
    </el-select>
  `
});
Vue.component('number-card', {
  props: ['name', 'num', 'plus', 'plusnum', 'hi', 'hinum'],
  data: function () {
    return {
      plusLabel: this.plus
    };
  },
  methods: {},
  template: `
    <el-card class="box-card number-card">
        <div style="text-align: center">
            <div>
                <span class="box4Title">{{name}}</span>
            </div>
            <div style="margin-top: 10px;" :class="plusLabel&&hi?'number-card__plus-hi':(plusLabel?'number-card__plus':(hi?'number-card__hi':null))">
                <template v-if="typeof(num)==='object'">
                    <span class="box4Text" v-for="(v,k) in num">{{k}}: {{v}}</span>
                </template>
                <template v-else>
                    <span class="box4Text">{{num}}</span>
                    <span class="comp-last">
                        <div v-if="plusLabel">今日<span>+{{plusnum}}</span></div>
                        <div v-if="hi">历史<span>+{{hinum}}</span></div>
                    </span>
                </template>
            </div>
        </div>
    </el-card>
  `
});
Vue.component('number-card2', {
  props: ['name', 'num', 'plus', 'plusnum', 'hi', 'hinum'],
  data: function () {
    return {
      plusLabel: this.plus
    };
  },
  methods: {},
  template: `
    <el-card class="box-card number-card">
        <table style="width:100%;">
            <tr>
                <td style="width:100px;text-align: center;padding-left: 10px;"><span class="box4Title">{{name}}</span></td>
                <td>
                    <div class="box4Value" v-for="(v,k) in num">{{k}}: {{v}}</div>
                </td>
            </tr>
        </table>
    </el-card>
  `
});

Vue.component('label-value-card', {
  props: ['label', 'value', 'plus'],
  data: function () {
    return {
      plusLabel: this.plus
    };
  },
  methods: {},
  template: `
    <div class="label-value-card" style="display: inline-block;margin: 0 10px;">
                <span style="font-size: 12px;">{{label}}</span>
                <span style="font-size: 20px;"><slot>{{value}}</slot></span>
                <span class="comp-last" v-if="plus">
                    今日  <span style="color: #ff4d51">+{{plus}}</span>
                </span>
    </div>
  `
});

Vue.component('static-file-list', {
  props: ['clazz'],
  data: function () {
    return {
      list: []
    };
  },
  created: function () {
    $api.StaticFile.List({ filter: { clazz: this.clazz }, order: 'id desc', page: 1, size: 6 }, (d) => (this.list = d.data));
  },
  computed: {},
  methods: {},
  template: `
    <el-card :header="clazz">
        <div slot="header" class="clearfix" style="font-size: 18px;">
            <span>{{clazz}}</span>
            <div style="float: right;">
                <el-link :href="'staticfile-list.html?clazz='+encodeURI(clazz)" target="_blank" style="height: 40px;">更多<i class="el-icon-arrow-right el-icon--right"></i></el-link>
            </div>
        </div>
        <ul>
            <li v-for="item in list">
                <el-link :href="'staticfile-view.html?id='+item.id" target="_blank">{{item.name}}</el-link>
                <span style="display: inline-block;float: right;">{{item.create_time.replace('T', ' ').substr(0, 19)}}</span>
            </li>
        </ul>
    </el-card>
  `
});
