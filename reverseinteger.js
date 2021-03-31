// Given an integer, return the integer with reversed digits.
// Note: The integer could be either positive or negative.

const reverseInt = int => {
  const positive = Math.sign(int) === -1 ? int * -1 : int;
  const reversed = +positive.toString().split("").reverse().join("");
  return Math.sign(int) === -1 ? reversed * -1 : reversed;
};

console.log(reverseInt(-4596));
console.log(reverseInt(54321));

// Another one

const reverse = n => {
  const helper = n => n.toString().split("").reverse().join("");
  return Math.sign(n) === 1 ? +helper(n) : helper(n * -1) * -1;
};

console.log(reverse(-4596));
console.log(reverse(54321));
