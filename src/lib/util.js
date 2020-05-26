import iconv from 'iconv-lite';
import moment from 'moment';

function parseHTML(textHTML) {
  return new DOMParser().parseFromString(textHTML, 'text/html');
}

function trim(text) {
  return text.replace(/^[\s]|[\s]$/g, '');
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
    .replace(/[a-z]{3,5}| /g, '');

  switch (remaing) {
    case 'a': return '내일';
    case '7': return '일주일 후';
    case '999': return '비둘기야 먹자~';
    default: return `${remaing}일 후`;
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
