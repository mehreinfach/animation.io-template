function Cranking(actor, radius, length, crankcenterX, crankcenterY, degreeOffset, triggeredByAction, reactionTargetIndex){
  var cranking = new Plugin(0, 0, actor, triggeredByAction, reactionTargetIndex);
  cranking.degrees = 0; // used/set later
  cranking.runningValue = 0; // used/set later
  cranking.radius = radius;
  cranking.length = length;

  cranking.actor.rotationCenterX = crankcenterX; // can be potentially overwritten!
  cranking.actor.rotationCenterY = crankcenterY; // can be potentially overwritten!

  cranking.degreeOffset = degreeOffset;
  cranking.currentDirection = 'clockwise';
  if (typeof cranking.actor.currentCrankFunctionPointer === 'undefined') cranking.actor.currentCrankFunctionPointer = 0;

  cranking.reset = function(){
    this.oldDegrees = 0;
    this.newDegrees = 0;
    this.firstRun = true;
  }

	cranking.applybehavior = function(){
		this.runningValue = Math.sin(this.age() / this.length);
		this.degrees = (this.runningValue * this.radius);

		if (this.firstRun) {
		  this.firstRun = false;
		  this.oldDegrees = this.degrees;
		  this.spin += this.degreeOffset;
		} else {
			if (this.actor.crankdirection === 'clockwise') {
				this.targetObject.spin += this.oldDegrees - this.degrees;
			} else {
				this.targetObject.spin -= this.oldDegrees - this.degrees;
			}
		}
		this.oldDegrees = this.degrees;

		if (this.age() >= length) {
			this.done = true;
			this.actor.crankEndfunctions[this.actor.currentCrankFunctionPointer](this.actor);
			this.actor.currentCrankFunctionPointer++;
			if (this.actor.currentCrankFunctionPointer >= this.actor.crankEndfunctions.length) this.actor.currentCrankFunctionPointer = 0; // start from first crankaction again

			if (this.actor.crankEndfunctions.length > 0) this.actor.resetReactions(); // or it won't crank again
		}
	};

  return cranking;
};

Actor.prototype.cranks = function(radius, length, crankcenterX, crankcenterY, degreeOffset, endfunctions, triggeredByAction, reactionTargetIndex) {
	if (typeof this.crankdirection === 'undefined' || this.crankdirection !== 'clockwise') {
		this.crankdirection = 'clockwise';
	} else {
		this.crankdirection = 'counterclockwise';
	}
	if (endfunctions) this.crankEndfunctions = endfunctions;

	if (typeof this.crankEndfunctions === 'function') this.crankEndfunctions = [this.crankEndfunctions];

  this.addBehavior(new Cranking(this, radius, length, crankcenterX, crankcenterY, degreeOffset, triggeredByAction, reactionTargetIndex));
  return this;
};

Actor.prototype.cranksOnTouch = function(radius, length, crankcenterX, crankcenterY, degreeOffset, endfunctions){
	if (endfunctions) this.crankEndfunctions = endfunctions;
	
  this.reacts("this.cranks(" + radius + ", " + length + ", " + crankcenterX + ", " + crankcenterY + ", " + degreeOffset + ", false, true, reactionTargetIndex);", 1);
  return this;
};

Actor.prototype.addCrankEndFunction = function(myfunction){
	if (typeof this.crankEndfunctions === 'undefined'){
		this.crankEndfunctions = [myfunction];
	} else if (typeof this.crankEndfunctions === 'function'){
		this.crankEndfunctions = [this.crankEndfunctions, myfunction];
	} else {
		this.crankEndfunctions.push(myfunction);
	}
}