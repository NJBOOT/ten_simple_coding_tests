// 3 - Given two non-negative integers num1 and num2 represented as string, return the sum of num1 and num2.
// You must not use any built-in BigInteger library or convert the inputs to integer directly.

// I don't really get what this means, but I'm going to simulate "long additon"

const methodlessSum = (num1, num2) => {
  // simple helper function to transform "482" to [ 4, 8, 2 ]
  const fakeNumber = num => {
    const numberArr = num.split("").map(el => +el);
    return numberArr;
  };

  const firstNum = fakeNumber(num1);
  const secondNum = fakeNumber(num2);

  // set up variables
  let longer = firstNum,
    shorter = secondNum,
    diff,
    res = [];
  // if length of numbers vary, we need to adjust the arrays for addition
  if (firstNum.length !== secondNum.length) {
    longer = firstNum.length > secondNum.length ? firstNum : secondNum;
    shorter = firstNum.length > secondNum.length ? secondNum : firstNum;
    diff = longer.length - shorter.length;
    //   add leading zeroes to shorter number
    for (i = 0; i < diff; i++) {
      shorter.unshift(0);
    }
  }
  //   loop through the longer one
  for (let i = longer.length - 1; i >= 0; i--) {
    let sum = shorter[i] + longer[i];
    // if sum < 10, just add it to the result
    if (sum < 10) {
      res.push(sum);
    } else {
      // if it's greater than ten, we need to "carry" the first digit
      sum = sum.toString().split("");
      //add the second digit of the sum to the result
      res.push(+sum[1]);
      //   carry the first digit to prev column and add it.
      longer[i - 1] += +sum[0];
    }
  }
  //   the result array is backward now. We need to flip it for the correct total
  return res.reverse().join("");
};

console.log(methodlessSum("1500000", "15"));
