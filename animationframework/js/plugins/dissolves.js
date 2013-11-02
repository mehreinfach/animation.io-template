/* global Plugin, Actor, floatValueOfOr  */

function Dissolving(actor, startAfter, dissolveLength, triggeredByAction, reactionTargetIndex){
  var dissolving = new Plugin(0,0, actor, triggeredByAction, reactionTargetIndex);
  dissolving.originalOpacity = actor.currentOpacity;
  dissolving.originalVisibility = actor.image.style.visibility;
  dissolving.startAfter = startAfter;
  dissolving.newOpacity = 0;
  dissolving.opacityStep = 60 / dissolveLength; // assuming 60 frames per seconds

  var started = false;

  dissolving.reset = function(){
    this.resetPlugin();
    started = false;
    this.newOpacity = this.originalOpacity;
    this.targetObject.image.style.visibility = this.originalVisibility;
    this.targetObject.alterOpacity(this.originalOpacity);
  };
  dissolving.reset();

  dissolving.cleanup = function(){
    this.targetObject.image.style.visibility = this.originalVisibility;
    this.targetObject.alterOpacity(this.originalOpacity);
  };

  dissolving.applybehavior = function(){
    if (this.targetObject);

    if (!started) {
      this.resetStartAnimationTimestamp();
      started = true;
    }
    if (!this.done && (this.age() > this.startAfter)) {
      this.newOpacity = this.newOpacity.subtractUntilZero(this.opacityStep);
      this.targetObject.alterOpacity(this.newOpacity);

      this.isDoneWhen(this.newOpacity <= 0 && this.targetObject.currentOpacity <= 0);

      if (this.done) {
        if (this.sync) {
          setInvisibleAndSync(this.targetObject);        
        } else {
          setInvisible(this.targetObject);
        }
      }
    }
  };

  return dissolving;
}

Actor.prototype.dissolves = function(startAfter, dissolveLength, triggeredByAction, reactionTargetIndex, forever) {
  var behavior = new Dissolving(this, startAfter, dissolveLength, triggeredByAction, reactionTargetIndex);
  if(typeof triggeredByAction !== 'undefined'){
    behavior.triggeredByAction = triggeredByAction;
  }
  if (typeof forever !== 'undefined' && forever) behavior.sync = true;

  this.addBehavior(behavior);
  return this;
};

Actor.prototype.dissolvesForever = function(startAfter, dissolveLength, triggeredByAction, reactionTargetIndex){
  this.dissolves(startAfter, dissolveLength, triggeredByAction, reactionTargetIndex, true);
  return this;
};

Actor.prototype.dissolvesOnTouch = function(dissolveLength, startAfter){
  this.reacts("this.dissolves(" + integerValueOfOr(startAfter, 0) + ", " + floatValueOfOr(dissolveLength, 1000) + ", true, reactionTargetIndex);", 0);
  return this;
};

Actor.prototype.dissolvesForeverOnTouch = function(dissolveLength, startAfter){
  this.reacts("this.dissolvesForever(" + integerValueOfOr(startAfter, 0) + ", " + floatValueOfOr(dissolveLength, 1000) + ", true, reactionTargetIndex);", 0);
  return this;
};

Actor.prototype.letsDissolveForever = function(targetObject, dissolveLength, startAfter){
  this.reacts("this.dissolvesForever(" + integerValueOfOr(startAfter, 0) + ", " + floatValueOfOr(dissolveLength, 1000) + ", true, reactionTargetIndex);", 0, targetObject);
  return this;
};

Actor.prototype.letsDissolve = function(targetObject, dissolveLength, startAfter){
  this.reacts("this.dissolves(" + integerValueOfOr(startAfter, 0) + ", " + floatValueOfOr(dissolveLength, 1000) + ", true, reactionTargetIndex);", 0, targetObject);
  return this;
};
Actor.prototype.letsForeverDissolve = function(targetObject, dissolveLength, startAfter){
  this.reacts("this.dissolvesForever(" + integerValueOfOr(startAfter, 0) + ", " + floatValueOfOr(dissolveLength, 1000) + ", true, reactionTargetIndex);", 0, targetObject);
  return this;
};
