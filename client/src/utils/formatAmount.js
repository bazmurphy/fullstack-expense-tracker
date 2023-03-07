// const formatAmount = (number) => {
//   let preDot = number.toString().split(".")[0].split("").reverse();
//   let postDot = number.toString().split(".")[1];
//   let chunks = [];
//   for (let i = 0; i < preDot.length; i += 3) {
//     const chunk = preDot.slice(i, i + 3);
//     chunks.push(chunk);
//   }
//   chunks.forEach((chunk) => chunk.reverse());
//   chunks = chunks
//     .reverse()
//     .map((chunk) => chunk.join(""))
//     .join(",");
//   const result = chunks.concat(".").concat(postDot);
//   return result;
// };

// console.log(formatAmount(123456.78));
