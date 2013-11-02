Actor.prototype.absolutePositionTopLeftX = Actor.prototype.absolutePositionBottomLeftX = function(){
  return this.position.x + this.offsetX - this.zeroOffsX;
};

Actor.prototype.absolutePositionTopLeftY = Actor.prototype.absolutePositionTopRightY = function(){
  return this.position.y + this.offsetY - this.zeroOffsY;
};

Actor.prototype.absolutePositionTopRightX = Actor.prototype.absolutePositionBottomRightX = function(){
	if (typeof this.imagesizeX === 'undefined') return false;
  return this.position.x + this.offsetX - this.zeroOffsX + this.imagesizeX;
};

Actor.prototype.absolutePositionBottomLeftY = Actor.prototype.absolutePositionBottomRightY = function(){
	if (typeof this.imagesizeY === 'undefined') return false;
  return this.position.y + this.offsetY - this.zeroOffsY + this.imagesizeY;
};

Actor.prototype.absoluteCoordinates = function(){
	return {
		origin: {x: this.absolutePositionTopLeftX() + this.rotationCenterX, y: this.absolutePositionTopLeftY() + this.rotationCenterY},
		topLeft: {x: this.absolutePositionTopLeftX(), y: this.absolutePositionTopLeftY()},
		topRight: {x: this.absolutePositionTopRightX(), y: this.absolutePositionTopRightY()},
		bottomRight: {x: this.absolutePositionBottomRightX(), y: this.absolutePositionBottomRightY()},
		bottomLeft: {x: this.absolutePositionBottomLeftX(), y: this.absolutePositionBottomLeftY()},
	}
};

Actor.prototype.logAbsoluteCoordinates = function(){
	var ret = "absolute coordinates of " + this.filename + ":\n";
	ret += "tl: " + Math.round(this.absoluteCoordinates().topLeft.x, 2) + ", " + Math.round(this.absoluteCoordinates().topLeft.y, 2);
	ret += " ––––– tr: " + Math.round(this.absoluteCoordinates().topRight.x, 2) + ", " + Math.round(this.absoluteCoordinates().topRight.y, 2);
	ret += "\n  |                   |";
	ret += "\n  |                   |";
	ret += "\nbl: " + Math.round(this.absoluteCoordinates().bottomLeft.x, 2) + ", " + Math.round(this.absoluteCoordinates().bottomLeft.y, 2);
	ret += " ––––– br: " + Math.round(this.absoluteCoordinates().bottomRight.x, 2) + ", " + Math.round(this.absoluteCoordinates().bottomRight.y, 2);
	console.log(ret);
}


// Tilted absolute positions

Actor.prototype.absoluteTiltedPositionTopLeftX = function(){
	return rotateXaroundOriginByAngle(this.absolutePositionTopLeftX(), this.absolutePositionTopLeftY(), this.rotationCenterX + this.absolutePositionTopLeftX(), this.rotationCenterY + this.absolutePositionTopLeftY(), (this.tilt * Math.PI / 180));
};

Actor.prototype.absoluteTiltedPositionTopLeftY = function(){
	return rotateYaroundOriginByAngle(this.absolutePositionTopLeftX(), this.absolutePositionTopLeftY(), this.rotationCenterX + this.absolutePositionTopLeftX(), this.rotationCenterY + this.absolutePositionTopLeftY(), (this.tilt * Math.PI / 180));
};

Actor.prototype.absoluteTiltedPositionTopRightX = function(){
	if (typeof this.imagesizeX === 'undefined') {
		console.warn("Could not calculate top right x-coordinate of " + this.filename + " in " + this.scene.id + " because imagesize not set.");
		return false;
	};
  return rotateXaroundOriginByAngle(this.absolutePositionTopRightX(), this.absolutePositionTopRightY(), this.rotationCenterX + this.absolutePositionTopLeftX(), this.rotationCenterY + this.absolutePositionTopLeftY(), (this.tilt * Math.PI / 180));
};

Actor.prototype.absoluteTiltedPositionTopRightY = function(){
	if (typeof this.imagesizeY === 'undefined') {
		console.warn("Could not calculate top right x-coordinate of " + this.filename + " in " + this.scene.id + " because imagesize not set.");
		return false;
	};
  return rotateYaroundOriginByAngle(this.absolutePositionTopRightX(), this.absolutePositionTopRightY(), this.rotationCenterX + this.absolutePositionTopLeftX(), this.rotationCenterY + this.absolutePositionTopLeftY(), (this.tilt * Math.PI / 180));
};

Actor.prototype.absoluteTiltedPositionBottomRightX = function(){
	if (typeof this.imagesizeX === 'undefined') {
		console.warn("Could not calculate bottom right x-coordinate of " + this.filename + " in " + this.scene.id + " because imagesize not set.");
		return false;
	};
  return rotateXaroundOriginByAngle(this.absolutePositionBottomRightX(), this.absolutePositionBottomRightY(), this.rotationCenterX + this.absolutePositionTopLeftX(), this.rotationCenterY + this.absolutePositionTopLeftY(), (this.tilt * Math.PI / 180));
};

Actor.prototype.absoluteTiltedPositionBottomRightY = function(){
	if (typeof this.imagesizeY === 'undefined') {
		console.warn("Could not calculate bottom right y-coordinate of " + this.filename + " in " + this.scene.id + " because imagesize not set.");
		return false;
	};
  return rotateYaroundOriginByAngle(this.absolutePositionBottomRightX(), this.absolutePositionBottomRightY(), this.rotationCenterX + this.absolutePositionTopLeftX(), this.rotationCenterY + this.absolutePositionTopLeftY(), (this.tilt * Math.PI / 180));
};

Actor.prototype.absoluteTiltedPositionBottomLeftX = function(){
	if (typeof this.imagesizeX === 'undefined') {
		console.warn("Could not calculate bottom left x-coordinate of " + this.filename + " in " + this.scene.id + " because imagesize not set.");
		return false;
	};
  return rotateXaroundOriginByAngle(this.absolutePositionBottomLeftX(), this.absolutePositionBottomLeftY(), this.rotationCenterX + this.absolutePositionTopLeftX(), this.rotationCenterY + this.absolutePositionTopLeftY(), (this.tilt * Math.PI / 180));
};

Actor.prototype.absoluteTiltedPositionBottomLeftY = function(){
	if (typeof this.imagesizeY === 'undefined') {
		console.warn("Could not calculate bottom left y-coordinate of " + this.filename + " in " + this.scene.id + " because imagesize not set.");
		return false;
	};
  return rotateYaroundOriginByAngle(this.absolutePositionBottomLeftX(), this.absolutePositionBottomLeftY(), this.rotationCenterX + this.absolutePositionTopLeftX(), this.rotationCenterY + this.absolutePositionTopLeftY(), (this.tilt * Math.PI / 180));
};

Actor.prototype.tiltedCoordinates = function(){
	return {
		origin: {x: this.absoluteTiltedPositionTopLeftX() + this.rotationCenterX, y: this.absoluteTiltedPositionTopLeftY() + this.rotationCenterY},
		topLeft: {x: this.absoluteTiltedPositionTopLeftX(), y: this.absoluteTiltedPositionTopLeftY()},
		topRight: {x: this.absoluteTiltedPositionTopRightX(), y: this.absoluteTiltedPositionTopRightY()},
		bottomRight: {x: this.absoluteTiltedPositionBottomRightX(), y: this.absoluteTiltedPositionBottomRightY()},
		bottomLeft: {x: this.absoluteTiltedPositionBottomLeftX(), y: this.absoluteTiltedPositionBottomLeftY()},
	}
};

Actor.prototype.tiltedCoordinatesText = function(){
	var ret = "";
	ret += " topLeft: " + Math.round(this.tiltedCoordinates().topLeft.x, 2) + ", " + Math.round(this.tiltedCoordinates().topLeft.y, 2);
	ret += " | topRight: " + Math.round(this.tiltedCoordinates().topRight.x, 2) + ", " + Math.round(this.tiltedCoordinates().topRight.y, 2);
	ret += " | bottomLeft: " + Math.round(this.tiltedCoordinates().bottomLeft.x, 2) + ", " + Math.round(this.tiltedCoordinates().bottomLeft.y, 2);
	ret += " | bottomRight: " + Math.round(this.tiltedCoordinates().bottomRight.x, 2) + ", " + Math.round(this.tiltedCoordinates().bottomRight.y, 2);
	return ret;
}

Actor.prototype.pointIsAboveActor = function(x, y){
	// 1. Is it between horizontal edges?
	var leftX = Math.min(this.tiltedCoordinates().topLeft.x, this.tiltedCoordinates().topRight.x, this.tiltedCoordinates().bottomLeft.x, this.tiltedCoordinates().bottomRight.x);
	var rightX = Math.max(this.tiltedCoordinates().topLeft.x, this.tiltedCoordinates().topRight.x, this.tiltedCoordinates().bottomLeft.x, this.tiltedCoordinates().bottomRight.x);
	var horizontal = x >= leftX && x <= rightX;

	// 2. Is it between vertical edges?
	var topY = Math.min(this.tiltedCoordinates().topLeft.y, this.tiltedCoordinates().topRight.y, this.tiltedCoordinates().bottomLeft.y, this.tiltedCoordinates().bottomRight.y);
	var bottomY = Math.max(this.tiltedCoordinates().topLeft.y, this.tiltedCoordinates().topRight.y, this.tiltedCoordinates().bottomLeft.y, this.tiltedCoordinates().bottomRight.y);
	var vertical = y >= topY && y <= bottomY; 

	return (horizontal && vertical);
}

////////////////////////////

function redDot(scene, x, y, layer){
  return scene.createActor('reddot.png', x-4, y-4, 10, 10).isInLayer(layer).isOnTop();
}

Actor.prototype.showCorners = function(){
  this.showsCorners = true;
  this.topLeft = redDot(this.scene, this.absoluteTiltedPositionTopLeftX(), this.absoluteTiltedPositionTopLeftY(), this.layer);
  this.topRight = redDot(this.scene, this.absoluteTiltedPositionTopRightX(), this.absoluteTiltedPositionTopRightY(), this.layer);
  this.bottomLeft = redDot(this.scene, this.absoluteTiltedPositionBottomLeftX(), this.absoluteTiltedPositionBottomLeftY(), this.layer);
  this.bottomRight = redDot(this.scene, this.absoluteTiltedPositionBottomRightX(), this.absoluteTiltedPositionBottomRightY(), this.layer);
};

Actor.prototype.updateCorners = function(){
  // console.log(this.filename + ": " + this.tiltedCoordinatesText());
  this.topLeft.position = {x: this.absoluteTiltedPositionTopLeftX() + this.scene.scrollPositionX, y: this.absoluteTiltedPositionTopLeftY() + this.scene.scrollPositionY};
  this.topRight.position = {x: this.absoluteTiltedPositionTopRightX() + this.scene.scrollPositionX, y: this.absoluteTiltedPositionTopRightY() + this.scene.scrollPositionY};
  this.bottomLeft.position = {x: this.absoluteTiltedPositionBottomLeftX() + this.scene.scrollPositionX, y: this.absoluteTiltedPositionBottomLeftY() + this.scene.scrollPositionY};
  this.bottomRight.position = {x: this.absoluteTiltedPositionBottomRightX() + this.scene.scrollPositionX, y: this.absoluteTiltedPositionBottomRightY() + this.scene.scrollPositionY};
}
