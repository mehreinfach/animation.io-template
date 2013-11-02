Scene.prototype.scrollingActors = []; // TODO: why is stuff been added twice?!

Scene.prototype.hideLeftScrolling = function(duration){
  // debugger;
  if (typeof duration === 'undefined') duration = 1000;
  for (var i = this.scrollingActors.length - 1; i >= 0; i--) {
    if (typeof this.scrollingActors[i].direction !== 'undefined' && this.scrollingActors[i].direction === 'left') {
      if (this.scrollingActors[i].currentlyVisible) this.scrollingActors[i].dissolves(0,500);      
    }
  };
  return this;
};

Scene.prototype.hideRightScrolling = function(){
  if (typeof duration === 'undefined') duration = 1000;
  for (var i = this.scrollingActors.length - 1; i >= 0; i--) {
    if (typeof this.scrollingActors[i].direction !== 'undefined' && this.scrollingActors[i].direction === 'right') {
      if (this.scrollingActors[i].currentlyVisible) this.scrollingActors[i].dissolves(0,500);      
    }
  };
  return this;
};

Scene.prototype.showLeftScrolling = function(){
  if (typeof duration === 'undefined') duration = 1000;
  for (var i = this.scrollingActors.length - 1; i >= 0; i--) {
    if (typeof this.scrollingActors[i].direction !== 'undefined' && this.scrollingActors[i].direction === 'left') {
      if (!this.scrollingActors[i].currentlyVisible) this.scrollingActors[i].appears(0,500);      
    }
  };
  return this;
};

Scene.prototype.showRightScrolling = function(){
  if (typeof duration === 'undefined') duration = 1000;
  for (var i = this.scrollingActors.length - 1; i >= 0; i--) {
    if (typeof this.scrollingActors[i].direction !== 'undefined' && this.scrollingActors[i].direction === 'right') {
      if (!this.scrollingActors[i].currentlyVisible) this.scrollingActors[i].appears(0,500);
    }
  };
  return this;
};

Scene.prototype.hideScrolling = function(duration){
  if (typeof duration === 'undefined') duration = 1000;
  for (var i = this.scrollingActors.length - 1; i >= 0; i--) {
    this.scrollingActors[i].dissolves(0,duration);
  };
  return this;  
};

Actor.prototype.hideScrolling = function(duration){
  if (typeof duration === 'undefined') duration = 1000;
  this.scene.hideScrolling(duration);
  return this;
};

Scene.prototype.showScrolling = function(duration){
  if (typeof duration === 'undefined') duration = 1000;
  for (var i = this.scrollingActors.length - 1; i >= 0; i--) {
    this.scrollingActors[i].appears(0,duration);
  };
  return this;  
};

Actor.prototype.showScrolling = function(duration){
  if (typeof duration === 'undefined') duration = 1000;
  this.scene.showScrolling(duration);
  return this;
};

Scene.prototype.hideScrollingForever = function(duration){
  if (typeof duration === 'undefined') duration = 1000;
  for (var i = this.scrollingActors.length - 1; i >= 0; i--) {
    this.scrollingActors[i].dissolvesForever(0,duration);
  };
  return this;  
};

Actor.prototype.hideScrollingForever = function(duration){
  if (typeof duration === 'undefined') duration = 1000;
  this.scene.hideScrollingForever(duration);
  return this;
};

Scene.prototype.showScrollingForever = function(duration){
  if (typeof duration === 'undefined') duration = 1000;
  for (var i = this.scrollingActors.length - 1; i >= 0; i--) {
    this.scrollingActors[i].appears(0,duration);
  };
  return this;  
};

Actor.prototype.showScrollingForever = function(duration){
  if (typeof duration === 'undefined') duration = 1000;
  this.scene.showScrollingForever(duration);
  return this;
};

Actor.prototype.hidesScrollingOnTouch = function(duration){
  if (typeof duration === 'undefined') duration = 1000;
  this.reacts("this.scene.hideScrolling(" + parseInt(duration) + ");", 0, this);
  return this;
};

Actor.prototype.showsScrollingOnTouch = function(duration){
  if (typeof duration === 'undefined') duration = 1000;
  this.reacts("this.scene.showScrolling(" + parseInt(duration) + ");", 0, this);
  return this;
};

Actor.prototype.hidesScrollingForeverOnTouch = function(duration){
  if (typeof duration === 'undefined') duration = 1000;
  this.reacts("this.scene.hideScrollingForever(" + parseInt(duration) + ");", 0, this);
  return this;
};

Actor.prototype.showsScrollingForeverOnTouch = function(duration){
  if (typeof duration === 'undefined') duration = 1000;
  this.reacts("this.scene.showScrollingForever(" + parseInt(duration) + ");", 0, this);
  return this;
};

Scene.prototype.extraResetFunctions.push(function(scene){
  // scene.createActor('blank.png', 0,0).scrollsTo(10,0,0);
  // scene.createActor('blank.png', 0,0).scrollsTo(0,0,0);
});

function alterScrollingVector(valueX, valueY){
  window.currentScene.scrollPositionVectorX += valueX;
  window.currentScene.scrollPositionVectorY += valueY;
}

function updateScrolling(scene, updateanyway){
  // debugger;
  if (scene.scrollPositionVectorX != 0 || updateanyway) {
    if ((scene.scrollPositionX + scene.scrollPositionVectorX) <= 0) {
      // we have reached the left border
      scene.scrollPositionX = 0;
      scene.hideLeftScrolling();
      scene.showRightScrolling();

    } else if ((scene.scrollPositionX + scene.scrollPositionVectorX) >= (window.currentScene.dimensions.x - window.animation.dimensions.x)) {
      // we have reached te right border
      scene.hideRightScrolling();
      scene.showLeftScrolling();
      scene.scrollPositionX = (window.currentScene.dimensions.x - window.animation.dimensions.x);

    } else {
      scene.scrollPositionX += scene.scrollPositionVectorX;    
      scene.showLeftScrolling();
      scene.showRightScrolling();
    }
  }

  if (updateanyway || Math.abs(-scene.scrollPositionX) || Math.abs(-scene.scrollPositionY)) {
    scene.setPerspective(-scene.scrollPositionX, -scene.scrollPositionY);    
  }
  scene.scrollPositionVectorX = scene.scrollPositionVectorY = 0;  
}