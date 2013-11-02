function fadeIn(domobject, length){
  if (notNumeric(domobject.style.opacity) || domobject.style.opacity < 0) {domobject.style.opacity = 0;}
  if (notNumeric(length)) {length = 1000;}
  prepareFade(domobject, length, 1);
}

function fadeOut(domobject, length){
  if (notNumeric(domobject.style.opacity) || domobject.style.opacity > 1) {domobject.style.opacity = 1;}
  if (notNumeric(length)) {length = 1000;}
  prepareFade(domobject, length, 0);
}

// -------------------------------------------------------

function executeFadeInTimeoutLoop(domobject, startOpacity, targetOpacity, length, framesPerSecond, frameLength){
  // not intended to be called directly, please use fadeIn/fadeOut
  var opacityDifference = targetOpacity - startOpacity;
  var stepSize = opacityDifference / (length / framesPerSecond);
  var stepAmount = opacityDifference / stepSize;
  var newOpacity = startOpacity + stepSize;

  if (newOpacity > 1 || newOpacity < 0) {
    domobject.style.opacity = targetOpacity;
  } else {
    domobject.style.opacity = newOpacity;
    setTimeout(function(){executeFadeInTimeoutLoop(domobject, newOpacity, targetOpacity, length - frameLength, framesPerSecond, frameLength);}, frameLength);
  }
}

function prepareFade(domobject, length, targetOpacity){
  // not intended to be called directly, please use fadeIn/fadeOut
  var startOpacity = parseFloat(domobject.style.opacity);
  var framesPerSecond = 30;
  var frameLength = (1000 / framesPerSecond);

  executeFadeInTimeoutLoop(domobject, startOpacity, targetOpacity, length, framesPerSecond, frameLength);
}