import numberConverter from 'number-to-words';

export function wordifyNumber(number) {
  let wordifiedNumber = numberConverter.toWords(number);
  return wordifiedNumber[0].toUpperCase() + wordifiedNumber.substring(1);
}
