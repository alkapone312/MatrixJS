var abc = function (options, limit) {
    var holdingArr = [];
    var opt = options;
    var recursiveABC = function(singleSolution) {
        if (singleSolution.length >= limit) {
          holdingArr.push(singleSolution);
          return;
        }
        for (var i=0; i < opt.length; i++) {
          recursiveABC(singleSolution.concat([opt[i]]));
        }
    };
    recursiveABC([]);
    return holdingArr;
  };

  export default abc;