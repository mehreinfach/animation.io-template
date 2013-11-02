function Cloning(actor, parentActor, distanceX, distanceY, triggeredByAction, reactionTargetIndex){

}

Actor.prototype.clones = function(parentActor) {
  this.addBehavior(new Drifting(this, forceX, forceY, triggeredByAction, reactionTargetIndex));
  return this;
};

Actor.prototype.clonesOnTouch = function(forceX, forceY){
  this.reacts("this.clones(" + forceX + "," + forceY + ", true, reactionTargetIndex);", 1);
  return this;
};

Actor.prototype.letsDrift = function(targetObject, forceX, forceY){
  this.reacts("this.clones(" + forceX + "," + forceY + ", true, reactionTargetIndex);", 1, targetObject);
  return this;
};