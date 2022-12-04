/** @format */

import  * as dayjs from 'dayjs'

const EIGHT_HOURS = 8 * 60 * 60 * 1000

/**
 *  格式化时间 统一处理8小时时差问题
 *  YYYY-MM-DDTHH:mm:ss
 *
 *  formatDate().format('YYYY-MM-DD HH:mm:ss')
 *  formatDate('2021/01/21').getStartTimestamp()
 *  formatDate('2021/01/21').getEndTimestamp()
 *  formatDate('2021/01/21').getTimestamp()
 * @export
 * @param {(string | number)} date
 * @return {
 *  format 格式化时间
 *  getTimestamp  时间戳
 *  getStartTimestamp 某天开始的时间戳
 *  getEndTimestamp 某天结束的时间戳
 *  getYear 获取年份
 *  getMonth 获取月份
 *  getDate 获取几号 1-31
 *  getDay 获取周几 0-6
 *  getHour 获取小时
 *  getMinute 获取分钟
 *  geSecond 获取秒数
 *  getMillisecond 获取毫秒
 * }
 */
export function dateFormat(date: string | number = Date.now()) {
  const beijingDate = typeof date === 'string' ? new Date(date) : transformBeijingDate(date)
  return {
    format: (template = 'YYYY/MM/DD') => dayjs(beijingDate).format(template),
    getTimestamp: () => (typeof date === 'number' ? date : dayjs(date).valueOf() - EIGHT_HOURS),
    getStartTimestamp: () => getStartTimestamp(dayjs(beijingDate).format('YYYY/MM/DD')),
    getEndTimestamp: () => getEndTimestamp(dayjs(beijingDate).format('YYYY/MM/DD')),
    getYear: () => dayjs(beijingDate).get('year'),
    getMonth: () => dayjs(beijingDate).get('month') + 1,
    getDay: () => dayjs(beijingDate).get('day'),
    getDate: () => dayjs(beijingDate).date(),
    getHour: () => dayjs(beijingDate).get('hour'),
    getMinute: () => dayjs(beijingDate).get('minute'),
    geSecond: () => dayjs(beijingDate).get('second'),
    getMillisecond: () => dayjs(beijingDate).get('millisecond'),
    dayjs: () => dayjs(beijingDate)
  }
}

export function getToday(timeStamp = Date.now()) {
  return dateFormat(timeStamp).format()
}

export const transformBeijingDate = (day: number | string) => {
  let time = new Date().getTime();
  if (day) {
    if (typeof day === "string") {
      day = day.replace(/-/g, "/");
    }
    time = new Date(day).getTime();
  }
  return new Date(time + 8 * 60 * 60 * 1000);
};

/**
 * 获取开始时间
 * @param day
 */
export const getStartTimestamp = (day: string) => {
  if (!day) {
    throw new Error("参数不能为空");
  }
  day = day.replace(/-/g, "/");
  const date = new Date(`${day} 00:00:00`).getTime();
  const start = date - 8 * 60 * 60 * 1000;
  return start;
};

/**
 * 获取结束时间
 * @param day
 */
export const getEndTimestamp = (day: string) => {
  if (!day) {
    throw new Error("参数不能为空");
  }
  day = day.replace(/-/g, "/");
  const date = new Date(`${day} 23:59:59`).getTime();
  const end = date - 8 * 60 * 60 * 1000;
  return end;
};
