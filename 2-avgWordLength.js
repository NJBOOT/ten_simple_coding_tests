// 2 - Average Sentence Length
// For a given sentence, return the average word length.
// Note: Remember to remove punctuation first.

const avgWordLength = s => {
  // first, weird edge case where the punctuation represents a space
  // then strip the rest of the punctuation using regex
  const stripped = s
    .replace("...", " ")
    .replace(/[^\w\s]|_/g, "")
    .replace(/\s+/g, " ");
  // create an array of words. Transform each word to the length of that word using map.
  // Then, add them up using reduce.
  const arr = stripped
    .split(" ")
    .map(el => el.length)
    .reduce(
      (a, charCount) => {
        a.chars += charCount;
        a.words++;
        return a;
      },
      { words: 0, chars: 0 }
    );
  //console.log(arr) -> { words: 11, chars: 42 }. Divide one by the other for average
  return (arr.chars / arr.words).toFixed(2);
};

let sentence1 = "Hi all, my name is Tom...I am originally from Australia.";
let sentence2 =
  "I need to work very. hard to learn more about ????algo?,rithms i/n Python!";

console.log(avgWordLength(sentence1));
console.log(avgWordLength(sentence2));
