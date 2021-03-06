// Assignment Code
var generateBtn = document.querySelector("#generate");
let passwordLength = 0;
let isSymbolsAllowed = false;
let isNumbersAllowed = false;
let isUpperCaseAllowed = false;
let isLowerCaseAllowed = false;
let availableCharacters = [];
let password = "";

//checks if value is an integer
let isInteger = (num) => {
  if (typeof parseInt(num) === "number") {
    return true;
  } else {
    return false;
  }
}

//sets the length of the password you would like to generate
let askPasswordLength = () => {
  passwordLength = prompt('Length\nHow many characters would you like your password to be?\n(type an integer between 8-128)');
  //checks if value is an integer before continuing
  if (isInteger(passwordLength)) {
    //checks if value is between 8 and 128
    if (passwordLength >= 8 && passwordLength <= 128) {
      passwordLength = parseInt(passwordLength);
      return passwordLength;
    } else {
      alert("Password length must be an integer between 8 and 128");
      setPasswordLength();
    }
  } else {
    alert("Password length must be an integer between 8 and 128");
    setPasswordLength();
  }
}

//sets if the user would like to include symbols in their password
let askIsSymbolsAllowed = () => {
  isSymbolsAllowed = confirm('Would you like to include symbols in your password?\n(Click "OK" for yes or "Cancel" for no)');
  return isSymbolsAllowed;
}

//sets if the user would like to include numbers in their password
let askIsNumbersAllowed = () => {
  isNumbersAllowed = confirm('Would you like to include numbers in your password?\n(Click "OK" for yes or "Cancel" for no)');
  return isNumbersAllowed;
}

//sets if the user would like to include upper case letters in their password
let askIsUpperCaseAllowed = () => {
  isUpperCaseAllowed = confirm('Would you like to include upper case letters in your password?\n(Click "OK" for yes or "Cancel" for no)');
  return isUpperCaseAllowed;
}

//sets if the user would like to include lower case letters in their password
let askIsLowerCaseAllowed = () => {
  isLowerCaseAllowed = confirm('Would you like to include lower case letters in your password?\n(Click "OK" for yes or "Cancel" for no)');
  return isLowerCaseAllowed;
}

//set available characters for password
let askAvailableCharacters = () => {
  if (isSymbolsAllowed) {
    availableCharacters.push("!", "@", "#", "$", "%", "^", "&", "*", "-", "_", "+", "=", "[", "]", "{", "}", ";", ":", "'", ",", "<", ".", ">", "/", "?");
  }
  if (isNumbersAllowed) {
    availableCharacters.push("0", "1", "2", "3", "4", "5", "6", "7", "8", "9");
  }
  if (isUpperCaseAllowed) {
    availableCharacters.push("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");
  }
  if (isLowerCaseAllowed) {
    availableCharacters.push("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z");
  }
}

//generate characters for password
function generateCharacter() {
  let randomIndex = Math.floor(Math.random() * availableCharacters.length);
  return availableCharacters[randomIndex];
}

//generates the password string
let generateString = () => {
  password = "";
  for (let i = 0; i < passwordLength; i++) {
    password += generateCharacter();
  }
  if (password.includes("undefined")) {
    password = "Please try again at least one character type is required";
  }
}

//checks if all allowed character types are used
let isCharactersUsed = () => {
  //checks for symbols
  if (isSymbolsAllowed) {
    if (!password.match(/([!@#$%^&*-_+=[\]{};:',<.>/?])+/g)) {
      generateString();
      isCharactersUsed();
    }
  }
  //checks for numbers
  if (isNumbersAllowed) {
    if (!password.match(/([0-9])+/g)) {
      generateString();
      isCharactersUsed();
    }
  }
  //checks for upper case letters
  if (isUpperCaseAllowed) {
    if (!password.match(/([A-Z])+/g)) {
      generateString();
      isCharactersUsed();
    }
  }
  //checks for lower case letters
  if (isLowerCaseAllowed) {
    if (!password.match(/([a-z])+/g)) {
      generateString();
      isCharactersUsed();
    }
  }
}

//pulls all of the functions together to generate the password
let generatePassword = () => {
  askPasswordLength();
  askIsSymbolsAllowed();
  askIsNumbersAllowed();
  askIsUpperCaseAllowed();
  askIsLowerCaseAllowed();
  askAvailableCharacters();
  generateString();
  isCharactersUsed();
  //notifies user of the types they selected
  alert("Password settings: \nSymbols: " + isSymbolsAllowed + "\nNumbers: " + isNumbersAllowed + "\nUpper case letters: " + isUpperCaseAllowed + "\nLower case letters: " + isLowerCaseAllowed);

  availableCharacters = [];
}

// Write password to the #password input
function writePassword() {
  generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
  password = "";

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);