// Reverse integer
// Given an integer, return the integer with reversed digits.
// Note: The integer could be either positive or negative.

const reverse = n => {
  const helper = n => n.toString().split("").reverse().join("");
  if (Math.sign(n) === 1) {
    return +helper(n);
  } else {
    let positive = n * -1;
    return helper(positive) * -1;
  }
};

// Average Sentence Length
// For a given sentence, return the average word length.
// Note: Remember to remove punctuation first.

const avgWordLength = sentence => {
  // edge case
  if (sentence.includes("...")) {
    sentence = sentence.replace("...", " ");
  }
  // had to lookup regex for stripping
  const stripped = sentence.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");

  let arr = stripped.split(" ");
  let charCount = arr.reduce((acc, word) => (acc += word.length), 0);
  return +(charCount / arr.length).toFixed(2);
};

// ALT SOLUTION - more reduce

// const avgWordLength = sentence => {
//   // edge case
//   if (sentence.includes("...")) {
//     sentence = sentence.replace("...", " ");
//   }

//   // had to lookup regex for stripping
//   const stripped = sentence.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");

//   let arr = stripped.split(" ").reduce(
//     (acc, word) => {
//       acc.length++;
//       acc.char += word.length;
//       return acc;
//     },
//     { char: 0, length: 0 }
//   );
//   return +(arr.char / arr.length).toFixed(2);
// };

// Given two non-negative integers num1 and num2 represented as string, return the sum of num1 and num2.
// You must not use any built-in BigInteger library or convert the inputs to integer directly.

methodlessSum = (num1, num2) => {
  const sumHelper = n => {
    let numArr = n.split("");
    let decimalPlace = 1;
    let newArr = [];
    for (let i = numArr.length - 1; i >= 0; i--) {
      newArr.push(numArr[i] * decimalPlace);
      decimalPlace *= 10;
    }
    return newArr;
  };

  let wholeArr = [...sumHelper(num1), ...sumHelper(num2)];
  return wholeArr.reduce((sum, el) => (sum += el), 0);
};

// First unique character
// Given a string, find the first non-repeating character in it and return its index.
// If it doesn't exist, return -1.

const unique = str => {
  let map = {};

  for (char of str) {
    map[char] = map[char] + 1 || 1;
  }
  for (char of str) {
    if (map[char] === 1) {
      return char;
    }
  }
  return -1;
};

// Valid Palindrome
// Given a non-empty string s, you may delete at most one character. Judge whether you can make it a palindrome.
// The string will only contain lowercase characters a-z.

const palindrome = s => {
  // If normal palindrome, return true
  let rev = s.split("").reduce((rev, char) => char + rev, "");
  if (rev === s) {
    return true;
  }
  //counter flag for deletes
  let delCount = 0;
  for (let i = 0; i < s.length; i++) {
    // find letter in string where mirrored index doesn't match && limit to one delete
    if (s[s.length - 1 - i] !== s[i] && delCount < 1) {
      // remove offending letter from both original string and reverse, increment delete
      // edge case
      if (i === 0) {
        s = s.slice(1);
        rev = rev.slice(0, rev.length - 1);
      } else {
        s = s.slice(0, s.length - 1 - i) + s.slice(s.length - 1 - i + 1);
        rev = rev.slice(0, i) + rev.slice(i + 1);
      }
      delCount++;
    }
  }
  // if reverse string equals string, then it's a palindrome
  return rev === s;
};
