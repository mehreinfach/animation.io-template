Actor.prototype.triggerResetBehaviors = function(triggeredByAction, reactionTargetIndex){
  // not intended for human consumption!
  this.reactionTargets[reactionTargetIndex].resetBehaviors();
  //this.reactionTargets[reactionTargetIndex].removeBehaviorsThatCameFromReacts();
  return this;
};

Actor.prototype.letsResetBehaviors = function(targetObject, appearLength, startVisible){
  this.reacts("this.triggerResetBehaviors(true, reactionTargetIndex)", 1, targetObject);
  return this;
};
