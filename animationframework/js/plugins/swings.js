function Swinging(actor, radius, hertz, swingcenterX, swingcenterY, degreeOffset, triggeredByAction, reactionTargetIndex){
  var swinging = new Plugin(0, 0, actor, triggeredByAction, reactionTargetIndex);
  swinging.degrees = 0; // used/set later
  swinging.runningValue = 0; // used/set later
  swinging.radius = radius;
  swinging.hertz = hertz;
  swinging.swingcenterX = swingcenterX;
  swinging.swingcenterY = swingcenterY;
  swinging.degreeOffset = degreeOffset;

  swinging.reset = function(){
    this.oldDegrees = 0;
    this.newDegrees = 0;
    this.firstRun = true;
  }

	swinging.applybehavior = function(){
		this.runningValue = Math.sin(this.targetObject.age() * this.hertz/1000);
		this.degrees = (this.runningValue * this.radius)/2;

    if (this.firstRun) {
      this.firstRun = false;
      this.oldDegrees = this.degrees;
      this.spin = this.degreeOffset;
    } else {
      this.targetObject.image.style.transformOrigin = this.swingcenterX + 'px ' + this.swingcenterY + 'px';
      this.targetObject.image.style.webkitTransformOrigin = this.swingcenterX + 'px ' + this.swingcenterY + 'px';
      this.targetObject.image.style.msTransformOrigin = this.swingcenterX + 'px ' + this.swingcenterY + 'px';

      this.targetObject.spin = this.oldDegrees - this.degrees;
    }

    this.oldDegrees = this.degrees;
	};

  return swinging;
};

Actor.prototype.swings = function(radius, hertz, swingcenterX, swingcenterY, degreeOffset, triggeredByAction, reactionTargetIndex) {
  this.addBehavior(new Swinging(this, radius, hertz, swingcenterX, swingcenterY, degreeOffset, triggeredByAction, reactionTargetIndex));
  return this;
};
