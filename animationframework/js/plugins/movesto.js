// moves the actor towards a certain point

function MovingTo(actor, targetX, targetY, forceX, forceY, triggeredByAction, reactionTargetIndex){
  var movingto = new Plugin(0,0.5, actor, triggeredByAction, reactionTargetIndex);

  movingto.targetObject.targetX = targetX; // we hardly can be moving into two different directions
  movingto.targetObject.targetY = targetY;

  movingto.triggeredByAction = triggeredByAction;
  movingto.actor = actor;

  if (isNumeric(reactionTargetIndex)) {
    movingto.targetObject = actor.reactionTargets[reactionTargetIndex];
  } else {
    movingto.targetObject = actor;
  };

  movingto.reset = function(){
    this.force = {x: forceX, y: forceY};
    this.finishedMovingTo = false;
  };
  movingto.reset();

  movingto.applybehavior = function(){
    if (!this.finishedMovingTo) {
      var moveVector = vector(this.targetObject.position.x, this.targetObject.position.y, movingto.targetObject.targetX, movingto.targetObject.targetY);
      if(moveVector.distance > 2){
        this.targetObject.vector.x += this.force.x * moveVector.x;
        this.targetObject.vector.y += this.force.y * moveVector.y;
      } else {
        moveVector.distance = 10;
        this.finishedMovingTo = true;
      };
    };
  };
  return movingto;
};

// --------------------------------

Actor.prototype.movesTo = function(targetX, targetY, forceX, forceY, triggeredByAction, reactionTargetIndex) {
  triggeredByAction = (typeof triggeredByAction === 'undefined') ? false : triggeredByAction

  // for (var i = this.behaviors.length - 1; i >= 0; i--) {
  //   try {
  //     this.behaviors[i].finishedMovingTo = true;
  //   }
  //   catch(e){}
  // };

  // for (var i = this.scene.actors.length - 1; i >= 0; i--) {
  //   for (var j = 0; j < this.scene.actors[i].behaviors.length; j++){
  //     try {
  //       if (this.scene.actors[i].reactionTargets[j].filename === this.filename) {
  //         this.scene.actors[i].behaviors[j].finishedMovingTo = true;
  //         console.log("finished");
  //       };
  //     }
  //     catch(e){
  //       console.log("not applicable");
  //     }
  //   };
  // };

  var behavior = new MovingTo(this, targetX, targetY, forceX, forceY, triggeredByAction, reactionTargetIndex)
  this.addBehavior(behavior);
  return this;
};

Actor.prototype.movesToOnTouch = function(targetX, targetY, forceX, forceY){
  this.reacts("this.movesTo(" + targetX + "," + targetY + "," + forceX + "," + forceY + ", true, reactionTargetIndex);", 0);
  return this;
};

Actor.prototype.letsMoveTo = function(targetObject, targetX, targetY, forceX, forceY){
  this.reacts("this.movesTo(" + targetX + "," + targetY + "," + forceX + "," + forceY + ", true, reactionTargetIndex);", 0, targetObject);
  return this;
};

Actor.prototype.movesToOnTouch = function(targetX, targetY, forceX, forceY){
  this.reacts("this.movesTo(" + targetX + "," + targetY + "," + forceX + "," + forceY + ", true, reactionTargetIndex);", 0);
  return this;
};
