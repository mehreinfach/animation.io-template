function togglesText(actor, initiallyVisible, alternativeImagePath){
	this.reset = function(){
		this.force = {x: forceX, y: forceY};
	};
	this.reset();

	this.applybehavior = function(){
		actor.vector.x += this.force.x;
		actor.vector.y += this.force.y;
	};
};

Actor.prototype.toggle = function(alternativeImagePath) {
  if (this.scene.textDisplaying) {
  	this.image.src = 'images/' + this.textToggleAlternativeImagePath; // TODO centralize 'images'-path!
  	this.scene.hideText();
  } else {
  	this.image.src = 'images/' + this.image.originalPath;
  	this.scene.showText();
  };
  return this;
};

Actor.prototype.togglesTextOnTouch = function(alternativeImagePath) {
	this.textToggleAlternativeImagePath = alternativeImagePath; // TODO centralize 'images'-path!
	this.reacts("this.toggle();")
  return this;
};