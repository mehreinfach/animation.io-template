function Rotating(actor, hertz, rotations, triggeredByAction, reactionTargetIndex){
  console.log("SHOULD START Rotating");

  var rotating = new Plugin(0,0, actor, triggeredByAction, reactionTargetIndex);
  rotating.plugintype = "rotating";
  rotating.spin = 360/60*hertz; // framerate 60
  var targetAge = (rotations * 1000) * hertz;

  actor.rotationCenterX = actor.imagesizeX/2;
  actor.rotationCenterY = actor.imagesizeY/2;

  // TODO set the evaluate the origin

  rotating.applybehavior = function(){
    if (!this.done) {
      this.targetObject.spin += this.spin;
      if (!this.running) this.running = true;

      this.done = this.done || !(rotations !== 0 || (this.age() > targetAge));
      if (this.done) {
        console.log("rotations !== 0: " + (rotations !== 0));
        console.log("this.age(): " + this.age());
        console.log("targetAge: " + targetAge);
        console.log("rotations: " + rotations);
      }    
    }
  };
  return rotating;
};

Actor.prototype.rotates = function(hertz, rotations, triggeredByAction, reactionTargetIndex) {
  if (typeof rotations === 'undefined') rotations = 0;
  var behaviour = new Rotating(this, hertz, rotations, triggeredByAction, reactionTargetIndex);
  this.addBehavior(behaviour);
  return this;
};

Actor.prototype.rotatesOnTouch = function(hertz, rotations, reactsHowOften, triggeredByAction, reactionTargetIndex) {
  if (typeof rotations === 'undefined') rotations = 0;
  this.reacts("this.rotates(" + hertz + ", " + rotations + ", true, reactionTargetIndex);", reactsHowOften);
  return this;
};

Actor.prototype.togglesRotationOnTouch = function(hertz, rotations, reactsHowOften, triggeredByAction, reactionTargetIndex) {
  if (typeof rotations === 'undefined') rotations = 0;
  this.reacts("this.rotates(" + hertz + ", " + rotations + ", true, reactionTargetIndex);", reactsHowOften);
  return this;
};

Actor.prototype.letsRotate = function(targetObject, hertz, rotations, reactsHowOften){
  if (typeof rotations === 'undefined') rotations = 0;
  this.reacts("this.rotates(" + hertz + ", " + rotations + ", true, reactionTargetIndex);", reactsHowOften, targetObject);
  return this;
};
