Actor.prototype.triggerResetReactions = function(triggeredByAction, reactionTargetIndex){
  // not intended for human consumption!
  this.reactionTargets[reactionTargetIndex].resetReactions();
  this.reactionTargets[reactionTargetIndex].removeBehaviorsThatCameFromReacts();
  return this;
};

Actor.prototype.letsResetReactions = function(targetObject, appearLength, startVisible){
  this.reacts("this.triggerResetReactions(true, reactionTargetIndex)", 1, targetObject);
  return this;
};
