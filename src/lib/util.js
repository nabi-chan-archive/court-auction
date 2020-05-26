import iconv from 'iconv-lite';
import moment from 'moment';

function parseHTML(textHTML) {
  return new DOMParser().parseFromString(textHTML, 'text/html');
}

function trim(text) {
  return text.replace(/^[\s][\s]*|[\s]*[\s]$/g, '');
}

function clearSpace(text) {
  return text.replace(/[\s]/g, '');
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function encodeText(text) {
  const buffer = iconv.encode(text, 'EUC-KR');
  let str = '';
  for (let i = 0; i < buffer.length; i += 1) {
    str += `%${buffer[i].toString(16)}`;
  }
  str = str.toUpperCase();
  return str;
}

function getRemaingTime(target) {
  const remaing = moment(target, 'YYYY.MM.DD')
    .fromNow(true)
    .replace(/ (days|day)/g, '일 후')
    .replace(/ (hours|hour)/g, '시간 후');

  switch (remaing) {
    case 'a일 후': return '내일';
    case '7일 후': return '다음주';
    case '14일 후': return '2주 후';
    default: return `${remaing}`;
  }
}

export {
  parseHTML,
  trim,
  clearSpace,
  numberWithCommas,
  encodeText,
  getRemaingTime,
};
