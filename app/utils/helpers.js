import numberConverter from 'number-to-words';

export function wordifyNumber(number) {
  let wordifiedNumber = numberConverter.toWords(number);
  return wordifiedNumber[0].toUpperCase() + wordifiedNumber.substring(1);
}

export function decodeHtml(html) {
  let doc = new DOMParser().parseFromString(html, "text/html");
  return doc.documentElement.textContent;
}
