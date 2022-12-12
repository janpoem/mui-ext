import { format as timeAgoFormat } from 'timeago.js';

export const isValidDate = (d: unknown): boolean => d instanceof Date && !Number.isNaN(d.getTime());

export const dateSeconds = (d: Date): number => isValidDate(d) ? Math.floor(d.valueOf() / 1000) : 0;

export const nowSeconds = (): number => dateSeconds(new Date());

const padStart = (value: unknown, length = 2, pad = '0'): string => {
  const s = value + '';
  if (s.length < length) {
    return pad.repeat(length - s.length) + s;
  }
  return s;
};

const DaySeconds = 86400;
const DayMS = DaySeconds * 1000;
const Now = new Date();
const Today = Now;

export enum DateTimeFormat {
  default = 'default',
  timeAgo = 'timeAgo',
  minify = 'minify',
  chinese = 'chinese',
  chineseMinify = 'chineseMinify',
  fileFlag = 'fileFlag',
  yyyyMM = 'yyyyMM',
  yyyyMMDD = 'yyyyMMDD',
  gitee = 'gitee',
}

export type DiffDateResult = {
  days: number,
  hours: number,
  minutes: number,
  seconds: number,
  isDifferent: boolean,
};

export type DateKit = {
  seconds: number,
  rawDate: Date,
  diff(target: Date | string | number | null, diffSeconds: number): boolean,
  dateFormat(format?: boolean | DateTimeFormat, isDiffToday?: boolean): string,
  timeFormat(pad?: boolean, withSecond?: boolean): string,
  format(format?: DateTimeFormat): string,
  getWeekRange(weekStart?: number): [Date, Date],
  getLastDaysRange(days: number): [Date, Date],
  getMonthRange(): [Date, Date],
  inRange(range: [Date, Date]): boolean,
  diffDays(target?: Date | string | number | null): number,
  isToday(): boolean,
  getWeekNumber(): { year: number, week: number },
  getWeekNumberStr(): string,
  getYearMonthStr(): string,
}

export const DateTimeFormatNames = {
  [DateTimeFormat.default]      : '日期时间',
  [DateTimeFormat.timeAgo]      : '多久以前',
  [DateTimeFormat.minify]       : '极简模式',
  [DateTimeFormat.chinese]      : '中文格式',
  [DateTimeFormat.chineseMinify]: '中文极简',
  // [DateTimeFormat.yyyyMM]       : '年-月',
  // [DateTimeFormat.yyyyMMDD]     : '年-月-日',
};

export const DateTimeFormatNeedExplain = {
  [DateTimeFormat.timeAgo]: '多久以前',
};

export function dateKit(input?: Date | string | number | null): DateKit {
  let d: Date;
  if (input == null || input === '' || input < 0) {
    d = new Date(Date.now());
  } else if (typeof input === 'string') {
    // @todo 这里需要进行一定的优化，ios SDK 无法正确解析 2021-10-8 这样的日期字符
    d = new Date(Date.parse(input));
  } else if (typeof input === 'number') {
    d = new Date(input);
  } else if (input instanceof Date) {
    d = input;
  }

  // @ts-ignore ignore
  if (!isValidDate(d)) {
    throw new Error('无效的日期输入');
  }

  // 周一为开始
  const weekStart = 1;

  const yearOf = (isFull = true) => {
    const value = d.getFullYear();
    if (!isFull) {
      return (value + '').substr(2);
    }
    return value;
  };
  const monthOf = (pad?: boolean) => {
    const value = d.getMonth() + 1;
    return pad ? padStart(value) : value;
  };
  const dayOf = (pad?: boolean) => {
    const value = d.getDate();
    return pad ? padStart(value) : value;
  };

  const hourOf = (pad?: boolean) => {
    const value = d.getHours();
    return pad ? padStart(value) : value;
  };

  const minuteOF = (pad?: boolean) => {
    const value = d.getMinutes();
    return pad ? padStart(value) : value;
  };

  const secondOf = (pad?: boolean) => {
    const value = d.getSeconds();
    return pad ? padStart(value) : value;
  };

  const weekOf = (_weekStart: number = weekStart): [Date, Date] => {
    const offsetDate = dateKit(`${yearOf()}-${monthOf(true)}-${dayOf(true)}`).rawDate;

    offsetDate.setHours(0, 0, 0);
    const weekDay = d.getDay(), v = offsetDate.valueOf();
    const startDay = weekDay < _weekStart ? weekDay - 6 : (_weekStart - weekDay);
    const endDate = new Date(v + (startDay + 6) * DayMS);
    endDate.setHours(23, 59, 59);
    return [
      new Date(v + startDay * DayMS),
      endDate,
    ];
  };

  const isThisYear = () => {
    return d.getFullYear() === Today.getFullYear();
  };

  const monthRange = (): [Date, Date] => {
    // ios 小程序 日期格式处理
    const start = new Date(d.valueOf());
    start.setDate(1);
    start.setHours(0, 0, 0);
    const d2 = new Date(start.valueOf());
    let endMonth = d.getMonth() + 1, endYear = d.getFullYear();
    if (endMonth > 12) {
      endMonth = endMonth - 12;
      endYear += 1;
    }
    d2.setFullYear(endYear);
    d2.setMonth(endMonth);
    const end = new Date(d2.valueOf() - DayMS);
    end.setHours(23, 59, 59);
    return [start, end];
  };

  return {
    get seconds(): number {
      return Math.floor(d.valueOf() / 1000);
    },
    get rawDate(): Date {
      return d;
    },
    diff(target: Date | string | number | null, diffSeconds = 60 * 10): boolean {
      // 该方法暂时粗放一点
      const targetDate = dateKit(target).rawDate, tv = targetDate.valueOf();
      const v = d.valueOf();
      const diff = (tv - v) / 1000;
      // console.log(targetDate, d, diff);
      if (diff > diffSeconds) {
        return true;
      } else {
        return false;
      }
    },
    dateFormat(format: boolean | DateTimeFormat = true, isDiffToday = false): string {
      if (isDiffToday) {
        const diffSeconds = TodayKit.seconds - dateKit(this.dateFormat()).seconds;
        const diffDays = (diffSeconds < 0 ? -1 : 1) * Math.floor(Math.abs(diffSeconds) / 86400);
        if (diffDays === 0) return '今天';
        else if (diffDays === 1) return '昨天';
        else if (diffDays === -1) return '明天';
      }

      switch (format) {
        case DateTimeFormat.timeAgo :
          return timeAgoFormat(d, 'zh_CN');
        case DateTimeFormat.minify :
          return (`${!isThisYear() ? yearOf(false) + '/' : ''}${monthOf(false)}/${dayOf(false)}`);
        case DateTimeFormat.chinese :
          return (`${yearOf(true)}年${monthOf(false)}月${dayOf(false)}日`);
        case DateTimeFormat.chineseMinify :
          return (`${!isThisYear() ? yearOf(false) + '年' : ''}${monthOf(false)}月${dayOf(false)}日`);
        case DateTimeFormat.yyyyMM :
          return (`${yearOf(true)}-${monthOf(true)}`);
        case DateTimeFormat.yyyyMMDD :
          return this.dateFormat(true);
        case DateTimeFormat.gitee :
          return `${yearOf()}-${monthOf(true)}-${dayOf(true)}`;
        default:
          format = !!format;
          return `${yearOf()}-${monthOf(format)}-${dayOf(format)}`;
      }
    },
    timeFormat(pad = true, withSecond = true): string {
      return `${hourOf(pad)}:${minuteOF(pad)}` + (withSecond ? `:${secondOf(pad)}` : '');
    },
    format(format?: DateTimeFormat): string {
      switch (format) {
        case DateTimeFormat.timeAgo :
          return timeAgoFormat(d, 'zh_CN');
        case DateTimeFormat.minify :
          return (`${!isThisYear() ? yearOf(false) + '/' : ''}${monthOf(false)}/${dayOf(false)}`) +
            ' ' + this.timeFormat(true, false);
        case DateTimeFormat.chinese :
          return (`${yearOf(true)}年${monthOf(false)}月${dayOf(false)}日`) + ' ' + this.timeFormat(true, false);
        case DateTimeFormat.chineseMinify :
          return (`${!isThisYear() ? yearOf(false) + '年' : ''}${monthOf(false)}月${dayOf(false)}日`) +
            ' ' + this.timeFormat(true, false);
        case DateTimeFormat.fileFlag :
          return (`${yearOf(true)}${monthOf(true)}${dayOf(true)}${hourOf(true)}${minuteOF(true)}${secondOf(true)}`);
        case DateTimeFormat.yyyyMM :
          return (`${yearOf(true)}-${monthOf(true)}`);
        case DateTimeFormat.yyyyMMDD :
          return this.dateFormat(true);
        case DateTimeFormat.gitee :
          return `${yearOf()}${monthOf(true)}${dayOf(true)}T${hourOf(true)}:${minuteOF(true)}:${secondOf(true)}`;
        default:
          return this.dateFormat(true) + ' ' + this.timeFormat(true, false);
      }
    },
    getWeekRange(_weekStart?: number): [Date, Date] {
      return weekOf(_weekStart);
    },
    getLastDaysRange(days = 7): [Date, Date] {
      if (days <= 1) days = 1;
      const v = d.valueOf();
      return [
        new Date(v - (days - 1) * DayMS),
        d,
      ];
    },
    getMonthRange(): [Date, Date] {
      return monthRange();
    },
    inRange(range: [Date, Date]): boolean {
      return d >= range[0] && d <= range[1];
    },
    diffDays(target?: Date | string | number | null): number {
      const diffDay = target == null ? TodayKit : dateKit(target);
      const diffSeconds = this.seconds - diffDay.seconds;
      return (diffSeconds < 0 ? -1 : 1) * Math.floor(Math.abs(diffSeconds) / 86400);
    },
    isToday(): boolean {
      return this.diffDays() === 0;
    },
    getWeekNumber(): { year: number, week: number } {
      // Copy date so don't modify original
      const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
      // Set to nearest Thursday: current date + 4 - current day number
      // Make Sunday's day number 7
      date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
      // Get first day of year
      const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
      // Calculate full weeks to nearest Thursday
      const week = Math.ceil((((date.valueOf() - yearStart.valueOf()) / 86400000) + 1) / 7);
      return {
        year: date.getUTCFullYear(),
        week,
      };
    },
    getWeekNumberStr(): string {
      const { year, week } = this.getWeekNumber();
      return `${year}-${padStart(week)}`;
    },
    getYearMonthStr(): string {
      const year = yearOf(), month = monthOf(true);
      return `${year}-${month}`;
    },
  };
}

export const NowKit = dateKit(Now);
export const TodayKit = dateKit(NowKit.dateFormat());
export const TodayWeekRange = TodayKit.getWeekRange();
export const TodayMonthRange = TodayKit.getMonthRange();
