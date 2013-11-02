Scene.prototype.extraResetFunctions = [];

Scene.prototype.reset = function(){
  console.log('resetting scene \"' + this.id + '"');
  this.resetActors();
  this.resetAge();

  for (var i = this.extraResetFunctions.length - 1; i >= 0; i--) {
  	this.extraResetFunctions[i](this);
  }

  return this;
};

Scene.prototype.resetActors = function(){
  for (var i = this.actors.length - 1; i >= 0; i--) {
    this.actors[i].reset();
  }
  return this;
};

Scene.prototype.resetAge = function(){
  this.displayedAt = Date.now();
  return this;
};