/* global Plugin, Actor, floatValueOfOr  */

function Appearing(actor, startAfter, appearLength, startsVisible, triggeredByAction, reactionTargetIndex){
  var appearing = new Plugin(0,0, actor, triggeredByAction, reactionTargetIndex);
  var started = false;

  appearing.startsVisible = startsVisible;
  appearing.haveTurnedItVisible = false;

  appearing.newOpacity = 0;
  appearing.opacityStep = 0;
  appearing.appearLength = appearLength;

  if ((typeof startsVisible !== 'undefined') && startsVisible === true) {
    appearing.startsVisible = true;
  } else {
    appearing.startsVisible = false;
  }

  appearing.cleanup = function(){
    this.cleanupPlugin(); // "call to super"
    if (this.startsVisible) setVisible(this.targetObject);
  };

  appearing.reset = function () {
    this.resetPlugin(); // quasi "call to super";
    started = false;

    if (this.startsVisible || this.targetObject.visibleForever) {
      setVisible(this.targetObject);
    } else {
      setInvisible(this.targetObject);
    }
    this.opacityStep = 60 / this.appearLength; // assuming 60 frames per second
  };
  appearing.reset();

  appearing.applybehavior = function () {
    if (!started) {
      this.resetStartAnimationTimestamp();
      started = true;
      return;
    }
    if (!this.done && (this.age() > startAfter)) {
      if (!this.haveTurnedItVisible) {
        if (this.sync) {
          setVisibleAndSync(this.targetObject);
        } else {
          setVisible(this.targetObject);
        }
        this.haveTurnedItVisible = true;
      }
      this.newOpacity = this.newOpacity.addUntilTarget(this.opacityStep, 1);
      this.targetObject.alterOpacity(this.newOpacity);
      this.isDoneWhen(this.targetObject.currentOpacity >= 1);
    }
  };
  return appearing;
}

Actor.prototype.appears = function(startAfter, appearLength, startsVisible, triggeredByAction, reactionTargetIndex, forever) {
  var behavior = new Appearing(this, startAfter, appearLength, startsVisible, triggeredByAction, reactionTargetIndex);

  if (typeof triggeredByAction !== 'undefined') behavior.triggeredByAction = triggeredByAction;
  if (typeof forever !== 'undefined' && forever) behavior.sync = true;

  this.addBehavior(behavior);
  return this;
};

Actor.prototype.appearsForever = function(startAfter, appearLength, startsVisible, triggeredByAction, reactionTargetIndex) {
  this.appears(startAfter, appearLength, startsVisible, triggeredByAction, reactionTargetIndex, true);
};

Actor.prototype.appearsOnTouch = function(appearLength, startAfter){
  this.setInitialOpacity(0);
  this.reacts("this.appears(" + integerValueOfOr(startAfter, 0) + "," + appearLength + ", true, false, reactionTargetIndex);", 0);
  return this;
};

Actor.prototype.appearsForeverOnTouch = function(appearLength, startAfter){
  this.setInitialOpacity(0);
  this.reacts("this.appearsForever(" + integerValueOfOr(startAfter, 0) + "," + appearLength + ", true, false, reactionTargetIndex);", 0);
  return this;
};

Actor.prototype.letsAppearStartsVisible = function(targetObject, appearLength, startAfter){
  this.reacts("this.appears(" + integerValueOfOr(startAfter, 0) + ", " + floatValueOfOr(appearLength, 1000) + ", true, true, reactionTargetIndex);", 0, targetObject);
  return this;
};

Actor.prototype.letsAppearForeverStartsVisible = function(targetObject, appearLength, startAfter){
  this.reacts("this.appearsForever(" + integerValueOfOr(startAfter, 0) + ", " + floatValueOfOr(appearLength, 1000) + ", true, true, reactionTargetIndex);", 0, targetObject);
  return this;
};

Actor.prototype.letsAppear = function(targetObject, appearLength, startAfter){
  this.extraResetFunctions.push(function(){
    setInvisible(targetObject);
  });
  this.reacts("this.appears(" + integerValueOfOr(startAfter, 0) + ", " + floatValueOfOr(appearLength, 1000) + ", false, true, reactionTargetIndex);", 0, targetObject);
  return this;
};

Actor.prototype.letsAppearForever = function(targetObject, appearLength, startAfter){
  setInvisible(targetObject);
  this.reacts("this.appearsForever(" + integerValueOfOr(startAfter, 0) + ", " + floatValueOfOr(appearLength, 1000) + ", false, true, reactionTargetIndex);", 1, targetObject);
  return this;
};

////////////////////////////////////

Actor.prototype.letsAppearsForeverSynced = function(synckey, howOften){
  if (typeof howOften === 'undefined') howoften = 1; // howOften is optional, defaults to 1
  this.reacts("syncVisibleByKey('" + synckey + ");", howOften);
  return this;
};