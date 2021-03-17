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
