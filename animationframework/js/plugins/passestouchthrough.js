// doesn't work in Internet Explorer and Opera, only Webkit & Mozilla

Actor.prototype.passesTouchThrough = function(){
	this.passesTouchThroughSet = true;

	this.image.style.pointerEvents = "none";
  return this;
};