function Drifting(actor, forceX, forceY, triggeredByAction, reactionTargetIndex){
  var drifting = new Plugin(0,0, actor, triggeredByAction, reactionTargetIndex);

  drifting.reset = function(){
    this.resetPlugin(); // quasi "call to super";
    this.force = {x: forceX, y: forceY};
  };
  drifting.reset();

  drifting.applybehavior = function(){
    this.targetObject.vector.x += this.force.x;
    this.targetObject.vector.y += this.force.y;
  };

  return drifting;
};

Actor.prototype.drifts = function(forceX, forceY, triggeredByAction, reactionTargetIndex) {
  this.addBehavior(new Drifting(this, forceX, forceY, triggeredByAction, reactionTargetIndex));
  return this;
};

Actor.prototype.driftsOnTouch = function(forceX, forceY){
  this.reacts("this.drifts(" + forceX + "," + forceY + ", true, reactionTargetIndex);", 1);
  return this;
};

Actor.prototype.letsDrift = function(targetObject, forceX, forceY){
  this.reacts("this.drifts(" + forceX + "," + forceY + ", true, reactionTargetIndex);", 1, targetObject);
  return this;
};