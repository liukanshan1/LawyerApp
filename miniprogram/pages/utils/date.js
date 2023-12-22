/**
 * 获取指定月份的第一和最后一天
 */
export function getDay(year, month) {
  if (year != '' && month != '') {
    var firstDay = new Date(year, month, 1) //这个月的第一天
    var currentMonth = firstDay.getMonth() //取得月份数
    var lastDay = new Date(firstDay.getFullYear(), currentMonth + 1, 0) //是0而不是-1
    firstDay = firstDay.Format('yyyy-MM-dd')
    lastDay = lastDay.Format('yyyy-MM-dd')
    console.log(firstDay,lastDay)
    return [firstDay, lastDay]
  }
}
Date.prototype.Format = function (fmt) { //author: meizz 
  var o = {
      "M+": this.getMonth() + 1, //月份 
      "d+": this.getDate(), //日 
      "h+": this.getHours(), //小时 
      "m+": this.getMinutes(), //分 
      "s+": this.getSeconds(), //秒 
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
      "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}