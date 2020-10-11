module.exports = function getSignUpPasswordError(password, email) {
   if (password === "") {
      return "Please create a password.";
   }
   if (password.length < 9) {
      return "Your password must be at least 9 characters";
   }
   if (checkHasLocalPart(password, email)) {
      return "For your safety password cannot contain your email address";
   }
   const uniqChars = [...new Set(password)];
   if (uniqChars.length < 3) {
      return "For your safety, your password must contain at least 3 unique characters.";
   }
   return "";
};
function checkHasLocalPart(password, email) {
   //split returns an array and you need to get first thing in that array
   const localPart = email.split("@")[0];

   //includes method returns true or false
   if (localPart === "") return false;
   else if (localPart.length < 4) return false;
   else return password.includes(localPart);
}
