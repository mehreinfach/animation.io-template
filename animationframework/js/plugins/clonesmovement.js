function MovementCloning(actor, parentActor, distanceX, distanceY, triggeredByAction, reactionTargetIndex){
  var movementCloning = new Plugin(0,0, actor, triggeredByAction, reactionTargetIndex);

  movementCloning.applybehavior = function(){
    this.targetObject.position.x = parentActor.position.x + distanceX;
    this.targetObject.position.y = parentActor.position.y + distanceY;
    this.targetObject.image.style.left = this.targetObject.position.x + 'px';
    this.targetObject.image.style.top = this.targetObject.position.y + 'px';
    this.targetObject.tilt = parentActor.tilt;
  };

  return movementCloning;
}

Actor.prototype.clonesMovement = function(parentActor, distanceX, distanceY, triggeredByAction, reactionTargetIndex) {
  this.addBehavior(new MovementCloning(this, parentActor, distanceX, distanceY, triggeredByAction, reactionTargetIndex));
  return this;
};