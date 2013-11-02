// IE9 fix for console-log
if(!window.console) {
  var console = {
    log : function(){},
    warn : function(){},
    error : function(){},
    time : function(){},
    timeEnd : function(){}
  };
}

function onLocalhost(){
  return /localhost/.exec(window.location.hostname) ? true : false;
}

function sameprefix(firstvalue, secondvalue){
  // gives the secondvalue (numeric) the same prefix as the firstvalue has
  return firstvalue < 0 ? -Math.abs(secondvalue) : Math.abs(secondvalue);
}

function relativeOrAbsolutePath(defaultLocalPathPrefix, filePath){
  if(/^https?:\/\//.exec(filePath.toLowerCase())){
    return filePath;
  } else {
    return defaultLocalPathPrefix + filePath;
  }
}

function uuid(){
  // UUID-generator inspired by http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

function easeOut(t, b, c, d) {
  t /= d;
  t--;
  return c*(t*t*t + 1) + b;
}

function randomId(){
  return 'id' + Math.floor(Math.random()*10000) + Date.now();
}

function truth(expression){
  if (typeof expression === 'undefined' || expression === 'undefined') {
    return false;
  } else {
    return Boolean(expression);
  }
}

function getParameterFromUrlByName(name) {
    // code from http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values/901144#901144
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function distance(x1, y1, x2, y2){
  return Math.abs(Math.sqrt(((x2-x1)*(x2-x1)) + ((y2-y1)*(y2-y1))));
}

function vector(x1, y1, x2, y2){
  var d = distance(x1, y1, x2, y2);
  return {x: (x2 - x1)/d, y: (y2 - y1)/d, distance: d};
}

function now(){
  return new Date().getTime();
}

function timeInMinutes(minutes){
  console.log("DEPRECATION-WARNING: timeInMinutes() is deprecated, please use minutesToMilliseconds()")
  return minutesToMilliseconds(minutes);
}

function minutesToMilliseconds(minutes){
  return minutes * 1000 * 60;
}

function seconds(){
  return parseInt((now()/1000), 10);
}

function floatValueOfOr(n, or){
  return isNumeric(n) ? parseFloat(n) : or;
}

function integerValueOfOr(n, or){
  return isNumeric(n) ? parseInt(n) : or;
}

Number.prototype.subtractUntilZero = function(subtract){
  return subtract >= this ? 0 : (this - subtract);
};

Number.prototype.addUntilTarget = function(addAmount, target){
  var ret = this + addAmount;
  return ret > target ? target : ret;
};

function isNumeric(n) {
  return !notNumeric(n);
}

function notNumeric(n) {
  return (typeof n === 'undefined') || isNaN(parseFloat(n)) || !isFinite(n);
}

function round(number, decimals){
  if (decimals < 0) decimals = 0;
  this.q = Math.pow(10, decimals);
  return Math.round(number * this.q)/this.q;
}

function cutOffPx(value){
  var length = value.length;
  return parseFloat(value.toString().substring(0, length-2));
}

function createDiv(id, cssclass){
  var div = document.createElement('div');
  div.setAttribute('id', id);
  div.setAttribute('class', cssclass);
  return div;
}

function t(){
  return now();
}

function browserCompatible(){
  try {
    var tmp = new Audio();
    return true;
  } catch(e) {
    return false;
  }
}

function minutesToTime(minutes){
  return minutes * 60 * 1000;
}

function getIntegerFromEndOfString(myString){
  return parseInt((myString.match(/\d+$/)[0]), 10);
}

function setDivSize(div, width, height){
  div.style.width = width + "px";
  div.style.height = height + "px";
}

function dowhen(theAction, conditionAsString, tryAgainIn, doAnywayAfter){
  /*
    Checks every 'tryAgainIn' milliseconds for 'conditionAsString'.
    If 'conditionAsString' is the case it executes 'theAction'.
    After 'doAnywayAfter' milliseconds 'theAction' will execute anway.
  */
  if (eval(conditionAsString) || doAnywayAfter <= 0) {
    // condition satisfied or time up, fire!
    theAction();
  } else {
    // condition not satisfied, let's try again later
    window.setTimeout(function(){dowhen(theAction, conditionAsString, tryAgainIn, doAnywayAfter - tryAgainIn)}, tryAgainIn);
  };
}

function pluralize(count, nullform, singularform, pluralform){
  if (count == 0) return nullform.replace("%count%", 0);
  if (count == 1) return singularform.replace("%count%", 1);
  return pluralform.replace("%count%", integerValueOfOr(count, 0));
}

function rotateXaroundOriginByAngle(x,y,rotationCenterX,rotationCenterY,angle){
  return rotationCenterX + (Math.cos(angle) * (x - rotationCenterX)) - (Math.sin(angle) * (y - rotationCenterY));
}

function rotateYaroundOriginByAngle(x,y,rotationCenterX,rotationCenterY,angle){
  return rotationCenterY + (Math.sin(angle) * (x - rotationCenterX)) + (Math.cos(angle) * (y - rotationCenterY));
}

function logActors(){
  for (var i = 0; i < window.currentScene.actors.length; i++) {
    console.log("" + i + ": " + window.currentScene.actors[i].filename);
  };
}

function logActorsSorted(){
  var arr = [];
  for (var i = 0; i < window.currentScene.actors.length; i++) {
    arr.push(window.currentScene.actors[i].filename + ": " + i);
  }
  arr.sort();
  for(var i = 0; i < arr.length; i++){
    console.log(arr[i]);
  }
}

function actor(number) {
  console.log(window.currentScene.actors[number].filename);
  return window.currentScene.actors[number];
}