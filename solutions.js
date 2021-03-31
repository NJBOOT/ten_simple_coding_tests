// 1- Reverse integer
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

// ES6 ternary expressions version of the above
const reverse = n => {
  const helper = n => n.toString().split("").reverse().join("");
  return Math.sign(n) === 1 ? +helper(n) : helper(n * -1) * -1;
};

// 2 - Average Sentence Length
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

// 3 - Given two non-negative integers num1 and num2 represented as string, return the sum of num1 and num2.
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

// 4 - First unique character
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

// 5 - Valid Palindrome
// Given a non-empty string s, you may delete at most one character. Judge whether you can make it a palindrome.
// The string will only contain lowercase characters a-z.

// INCORRECT/INCOMPLETE. ATTEMPT ONE
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
        s = s.slice(0, s.length - 1 - i) + s.slice(s.length - i);
        rev = rev.slice(0, i) + rev.slice(i + 1);
      }
      delCount++;
    }
  }
  // if reverse string equals string, then it's a palindrome
  return rev === s;
};

// THIS SOLUTION WORKS BUT TIMES OUT ON LEETCODE

const validPalindrome = s => {
  // palindrom check helper function. Returns boolean
  //   const isValid = s => s.split("").reduce((rev, char) => char + rev, "") === s;

  const isValid = s => {
    for (let i = 0; i < s.length / 2; i++) {
      if (s[i] !== s[s.length - 1 - i]) {
        return false;
      }
    }
    return true;
  };

  // If normal palindrome, return true
  if (isValid(s)) {
    return true;
  }

  //If not, continue. We will then loop through the string, remove one character at a time, and check if that substring is valid
  for (let i = 0; i < s.length; i++) {
    //remove letter at current index
    let temp = s.substring(0, i) + s.substring(i + 1, s.length);
    //test the "temp" string to see if it's a palindrome
    if (isValid(temp)) {
      //if you found a valid palindrome, return true
      return true;
    }
  }
  //  return false otherwise
  return false;
};

// CORRECT SOLUTION

const palindrome = s => {
  // palindrom check helper function. Returns boolean
  //   const isValid = s => s.split("").reduce((rev, char) => char + rev, "") === s;

  const isValid = s => {
    for (let i = 0; i < s.length / 2; i++) {
      if (s[i] !== s[s.length - 1 - i]) {
        return false;
      }
    }
    return true;
  };

  // If normal palindrome, return true
  if (isValid(s)) {
    return true;
  }
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) {
      return (
        isValid(s.slice(left, right)) || isValid(s.slice(left + 1, right + 1))
      );
    }
    left++;
    right--;
  }
  return false;
};

// 6 - Given an array of integers, determine whether the array is monotonic or not.

const isMonotonic = arr => {
  let ascending = true;
  let descending = true;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) {
      ascending = false;
    } else if (arr[i - 1] < arr[i]) {
      descending = false;
    }
  }
  return ascending || descending;
};

// 7 - Move Zeroes
// Given an array nums, write a function to move all zeroes to the end of it while maintaining the relative order of the non-zero elements.

// Using splice to remove zeroes, traversing array backwards, then pushing zeroes on at the end.
const moveZeroes = arr => {
  let count = 0;
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === 0) {
      arr.splice(i, 1);
      count++;
    }
  }
  for (let i = 0; i < count; i++) {
    arr.push(0);
  }
  return arr;
};

// Swapping elements way
const moveZeroes = arr => {
  // idx to move non-zero element to
  let index = 0;
  for (let i = 0; i < arr.length; i++) {
    // if element ISN'T ZERO
    if (arr[i] !== 0) {
      //swap element to beginning of arr
      let temp = arr[i];
      arr[i] = arr[index];
      arr[index] = temp;
      // increment "swap" index by one for next swap
      index++;
    }
  }
  return arr;
};

// 8 Fill The Blanks
// Given an array containing None values fill in the None values with most recent non-None value in the array
// array1 = [1, None, 2, 3, None, None, 5, None]
// assert solution(array1) == [1, 1, 2, 3, 3, 3, 5, 5]

const fillBlanks = arr => {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === "None") {
      arr[i] = arr[i - 1];
    }
  }
  return arr;
};

// 9. Matched & Mismatched Words
// Given two sentences, return an array that has the words that appear in one sentence and not the other
// and an array with the words in common.

// THIS DOESN'T WORK I REALIZED. IF SAME WORD APPEARS TWICE IN ONE SENTENCE, STILL APPEARS IN DUPLICATES ARRAY.
const matchedWords = (one, two) => {
  //   combine words into one big sentence and split sentence into an array of words
  const combined = `${one} ${two}`.toLowerCase().split(" ");

  //  create a hash map of the words (each word and corresponding count)
  let map = {};
  for (let word of combined) {
    map[word] = map[word] + 1 || 1;
  }
  // return object
  let res = {
    unique: [],
    duplicate: [],
  };
  // if word appears > 1, push into duplicate array. Else, push into unique array
  for (let word in map) {
    if (map[word] === 1) {
      res.unique.push(word);
    } else {
      res.duplicate.push(word);
    }
  }
  return res;
};

const matchedWords = (one, two) => {
  // strip duplicates from EACH sentence before combining
  const stripDuplicates = sentence => {
    let arr = sentence.toLowerCase().split(" ");
    return [...new Set(arr)];
  };

  //combine words into one big sentence and split sentence into an array of words
  const combined = [...stripDuplicates(one), ...stripDuplicates(two)];
  console.log(combined);
  //  create a hash map of the words (each word and corresponding count)
  let map = {};
  for (let word of combined) {
    map[word] = map[word] + 1 || 1;
  }
  // return object
  let res = {
    unique: [],
    duplicate: [],
  };
  // if word appears > 1, push into duplicate array. Else, push into unique array
  for (let word in map) {
    if (map[word] === 1) {
      res.unique.push(word);
    } else {
      res.duplicate.push(word);
    }
  }
  return res;
};

// 10. Prime Numbers Array
// Given k numbers which are less than n, return the set of prime number among them
// Note: The task is to write a program to print all Prime numbers in an Interval.
// assert solution(35) == [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31]

// THIS DOESNT WORK FOR LARGE NUMBERS BECAUSE IT DOESNT TEST IF NUMBER IS DIVISIBLE BY PRIME NUMBER > 10
const primes = N => {
  let primes = [2];
  for (let k = 3; k < N; k += 2) {
    let prime = true;
    for (let j = 3; j < 10 && k > 8; j++) {
      if (k % j === 0 && !primes.includes(k)) {
        prime = false;
      }
    }
    if (prime) {
      primes.push(k);
    }
  }
  return primes;
};
// THIS TIMES OUT ON LEETCODE
const countPrimes = N => {
  if (N < 3) return 0;
  let primes = [2];
  for (let k = 3; k < N; k += 2) {
    let prime = true;
    for (let h = 0; h < primes.length; h++) {
      if (k % primes[h] === 0) {
        prime = false;
      }
    }
    for (let j = 3; j < 10 && k > 8; j++) {
      if (k % j === 0 && !primes.includes(k)) {
        prime = false;
      }
    }
    if (prime) {
      primes.push(k);
    }
  }
  return primes;
};

// THIS TOOK A MINUTE TO FIGURE OUT, I GOOGLED A BIT...TIME LIMIT EXCEEDED ON LEETCODE
const primesArr = N => {
  //   helper to figure out if each number k is prime. if num is [1,]
  const countPrimes = N => {
    //   helper to figure out if each number k is prime. if num is [1,]
    const isPrime = num => {
      if (num < 2) return false;
      // OPTIMIZE HELPER USING MATH.SQRT(num) instead of num!!!!
      // once you hit Math.sqrt(num), that's a factor of num other than 1 or num.
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
      }
      return true;
    };
    //   prime array. If N=3, return [2]
    const primes = N < 3 ? [] : [2];
    //  loop for k through N-1 numbers.
    for (let i = 1; i < N; i += 2) {
      // check if prime using helper. if prime, push to prime array
      if (isPrime(i)) {
        primes.push(i);
      }
    }
    return primes.length;
  };
};

// 10. Prime Numbers Array
// Given k numbers which are less than n, return the set of prime number among them
// Note: The task is to write a program to print all Prime numbers in an Interval.
// assert solution(35) == [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31]

const primesArr = N => {
  //   helper to figure out if each number k is prime. if num is [1,]
  const isPrime = num => {
    if (num < 2) return false;
    // OPTIMIZE HELPER USING MATH.SQRT(num) instead of num
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };
  //   prime array. If N=3, return [2]
  const primes = N < 3 ? [] : [2];
  //  loop for k through N-1 numbers.
  for (let i = 1; i < N; i += 2) {
    // check if prime using helper. if prime, push to prime array
    if (isPrime(i)) {
      primes.push(i);
    }
  }
  return primes;
};

// LOOKED UP SIEVES PRIME NUMBER ALGO
