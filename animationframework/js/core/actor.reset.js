Actor.prototype.extraResetFunctions = [];

Actor.prototype.reset = function () {
  this.resetBehaviors();
  this.resetReactions();
  this.resetStartAnimationTimestamp();
  this.position = { x: this.startX, y: this.startY };
  this.vector = { x: 0, y: 0 };
  this.lastVector = { x: 0, y: 0 };
  this.setSize(this.imagesizeX, this.imagesizeY);
  // this.setInitialOpacity(this.originalOpacity);
  this.delay = this.originaldelay;
  this.finishedDelaying = false;
  this.startedDelayingAt = null;
  this.tilt = 0;
  moveActor(this);
  tiltActor(this);
  for (var i = this.extraResetFunctions.length - 1; i >= 0; i--) {
    this.extraResetFunctions[i](this);
  };

  if (typeof this.flippinghorizontally !== 'undefined' && this.flippinghorizontally) {
    if (this.image && this.image.filters && this.image.filters.item)
    {
      this.image.style.filter = "progid:DXImageTransform.Microsoft.BasicImage(mirror=1)";
    } else {
      this.image.style.transform += " scaleX(-1)";
      this.image.style.webkitTransform += " scaleX(-1)";
    }
  }
};

Actor.prototype.resetStartAnimationTimestamp = function () {
  this.startAnimationTimestamp = now();
};

Actor.prototype.resetReactions = function(){
  for (var i = this.reactions.length - 1; i >= 0; i--) {
    this.reactions[i].reset();
  }
};

Actor.prototype.resetBehaviors = function(){
	for (var i = this.behaviors.length - 1; i >= 0; i--) {
		this.behaviors[i].reset();
	}
};