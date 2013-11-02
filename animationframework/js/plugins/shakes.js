function Shaking(actor, peakX, peakY, hertz, triggeredByAction, reactionTargetIndex){
	var shaking = new Plugin(0,0, actor, triggeredByAction, reactionTargetIndex);
	shaking.reset = function(){
		this.peak = {x: (peakX/2), y: (peakY/2)};
		this.hertz = hertz;
		this.actor = actor;
		this.force = {x: 0, y: 0};
    this.shakingStartedAt = null;
	};

	shaking.applybehavior = function(){
		if (typeof this.shakingStartedAt === null) {
			this.shakingStartedAt = now();
		};

		this.tmpValue = Math.sin((this.shakingStartedAt - now()) * this.hertz/250);

		if (typeof this.lastTmpValue != "undefined"){
		  this.targetObject.vector.x += (this.lastTmpValue - this.tmpValue) * this.peak.x;
		  this.targetObject.vector.y += (this.lastTmpValue - this.tmpValue) * this.peak.y;
		};
    this.lastTmpValue = this.tmpValue;
	};

	return shaking;
};

Actor.prototype.shakes = function(peakX, peakY, hertz, triggeredByAction, reactionTargetIndex) {
	this.addBehavior(new Shaking(this, peakX, peakY, hertz, triggeredByAction, reactionTargetIndex));
  return this;
};

Actor.prototype.shakesOnTouch = function(peakX, peakY, hertz, reactHowOften) {
	reactHowOften = (typeof reactHowOften === 'undefined') ? 1 : reactHowOften;
	this.reacts("this.shakes(" + peakX + "," + peakY + "," + hertz + ");", reactHowOften)
	// when tapped multiple times, the shaking becomes stronger as shaking adds up
  return this;
};

Actor.prototype.letsShake = function(targetObject, peakX, peakY, hertz, reactHowOften){
	reactHowOften = (typeof reactHowOften === 'undefined') ? 1 : reactHowOften;
	this.reacts("this.shakes(" + peakX + "," + peakY + "," + hertz + ", true, reactionTargetIndex	);", reactHowOften, targetObject)
  return this;
};
