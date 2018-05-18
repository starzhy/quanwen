export  const APPKEY = '8fda3123762827b9e64174ef8aed1249';

export { default as fetch } from './fetch';
export { default as extend } from './extend';
export { default as Validate } from './validate';
export { default as Account } from './account';

export function timeAgo(timer) {
    timer = timer * 1000;
    var n = new Date().getTime();
    var f = n - timer;
    var bs = (f >= 0 ? '前' : '后');//判断时间点是在当前时间的 之前 还是 之后
    f = Math.abs(f);
    if (f < 6e4) { return '刚刚' }//小于60秒,刚刚 
    if (f < 36e5) { return parseInt(f / 6e4) + '分钟' + bs }//小于1小时,按分钟
    if (f < 864e5) { return parseInt(f / 36e5) + '小时' + bs }//小于1天按小时
    // if (f < 2592e6) { return parseInt(f / 864e5) + '天' + bs }//小于1个月(30天),按天数
    // if (f < 31536e6) { return parseInt(f / 2592e6) + '个月' + bs }//小于1年(365天),按月数
    return convertTime(timer);
}
export function convertTime(timer){
    let date = new Date(timer);
    let y = 1900 + date.getYear(),
        m = "0" + (date.getMonth() + 1),
        d = "0" + date.getDate();
    return (y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length)) 
}