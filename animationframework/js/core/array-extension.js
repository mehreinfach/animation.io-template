// Array.prototype.minus = function(secondarr){
//   // subtracts the secondarr from this,
//   // works best with arrays of strings
//   var result = this;
//   for (var i = result.length - 1; i >= 0; i--) {
//     for (var j = secondarr.length - 1; j >= 0; j--) {
//       if (secondarr[j].match(result[i])){
//         // result = result.without(i);
//         result = arrayWithout(result, i);
//         break;
//       }
//     }
//   }
//   return result;
// };

function arrayMinus(firstArray, secondArray){
  // subtracts the secondArray from this,
  // works best with arrays of strings
  var result = firstArray;
  for (var i = result.length - 1; i >= 0; i--) {
    for (var j = secondArray.length - 1; j >= 0; j--) {
      if (secondArray[j].match(result[i])){
        // result = result.without(i);
        result = arrayWithout(result, i);
        break;
      }
    }
  }
  return result;
}

function arrayWithout(firstArray, index){
  var part1 = index > 0 ? firstArray.slice(0,index) : [];
  var part2 = firstArray.slice(index+1);
  return part1.concat(part2);
}

// Array.prototype.without = function(array, index){
//   // or learn to understand SLICE?!
//   var part1 = index > 0 ? this.slice(0,index) : [];
//   var part2 = this.slice(index+1);
//   return part1.concat(part2);
// };
