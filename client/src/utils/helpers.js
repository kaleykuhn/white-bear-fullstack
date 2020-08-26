function checkIsOver(str, num) {
   if (str.length > num) return true;
   else return false;
}
// eslint-disable-next-line
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const MAX_CARD_CHARS = 240;
export { checkIsOver, MAX_CARD_CHARS, EMAIL_REGEX };
