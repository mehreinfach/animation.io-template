var Actor = function (startX, startY, imagesizeX, imagesizeY) {
  this.startAnimationTimestamp = now();
  this.actortype = "actor template";

  this.startPosition = { x: startX, y: startY }; // for resetting

  // FOR PLUGIN-WRITERS:
  // 'vector' and 'spin' are the two things that plugins _should_ be
  // modifiying. Only those are truly "stackable" (i.e. can be changed
  // by multiple plugins in a row.)
  this.vector = { x: 0, y: 0 };
  this.startX = startX;
  this.startY = startY;


  // size of image
  this.imagesizeX = imagesizeX;
  this.imagesizeY = imagesizeY;

  // re-set by plugins that change the tilt
  this.rotationCenterX =  typeof imagesizeX !== 'undefined' ? (imagesizeX/2) : 0;
  this.rotationCenterY =  typeof imagesizeY !== 'undefined' ? (imagesizeY/2) : 0;

  this.spin = 0;
  this.offsetX = 0;
  this.offsetY = 0;
  this.zeroOffsX = 0;
  this.zeroOffsY = 0;
  this.needsMoving = false; // will move the actor even of the vector is 0-0

  
  this.defaultdirectory = "";
  this.tilt = 0;
  this.behaviors = [];
  this.reactions = [];
  this.reactionTargets = [];
  // this.mediaType = '';
  this.source = '';

  this.phases = [];
  this.oldPhase = 0;
  this.phaseCycle = 1000;

  this.comesBack = false;
  this.waitingForReset = false;
  this.waitingForResetSince = null;
  this.lastVisibilityCheckInSeconds = now();

  this.originaldelay = 0;
  this.delay = 0;

  this.zIndex = 0;

  // 'scene' and 'enteredAt' will be set when putting actor on scene:
  this.scene = null;
  this.enteredAt = null;

  this.addClass = function (newclass) {
      // must be called after setup (but setup happens on object creation)
      this.image.className += (" " + newclass);
      return this;
  };
  
  this.hasId = function (newid) {
      // must be called after setup (but setup happens on object creation)
      this.image.setAttribute('id', newid);
  };

  this.setSize = function (width, height) {
    this.image.style.zIndex = this.actualZIndex();
    this.imagesize = { x: width, y: height };
    this.image.style.width = width + 'px';
    this.image.style.height = height + 'px';
  };

  this.flipHorizontal = function(){
    this.flippinghorizontally = true;
    return this;
  };

  this.flipVertical = function(){
    this.flippinghorizontally = true;
    return this;
  };

  this.enter = function (myScene) {
    if (this.overrideZIndex) {
      this.image.style.zIndex = ((this.scene.actors.length+1) * 10) + this.overrideZIndexExtraValue;      
    } else {
      this.image.style.zIndex = this.zIndex;      
    }
    myScene.div.appendChild(this.image);
    this.enteredAt = now();
  };

  // variables for delayed start:
  if (typeof delay !== 'undefined') {
    this.delay = parseInt(delay, 10); // milliseconds it takes the actor to launch
    this.startedDelayingAt = null; // should be Date.now() once started
    this.finishedDelaying = false; // should be set to true once done
  }
};

Actor.prototype.isOnTop = function(extraValue){
  // gives this actor a zIndex that makes it float above all others
  // if you have more than one "isOnTop" in a scene, the highest extraValue
  // is on Top.
  this.evaluateFirstWhenClicked = this.overrideZIndex = true;
  this.overrideZIndexExtraValue = integerValueOfOr(extraValue, 0);

  return this;
};

Actor.prototype.actualZIndex = function(){
  if (this.overrideZIndex) {
    return ((this.scene.actors.length+1) * 10) + this.overrideZIndexExtraValue;      
  } else {
    return this.zIndex;      
  }
};

Actor.prototype.comesBack = function(resetDelay){
  // called in scenes when an actor should come back after leaving the screen
  this.comesBack = true;
  if (typeof resetDelay === "undefined") {
    resetDelay = 0;
  }
  this.resetDelay = resetDelay;
};

Actor.prototype.delays = function(myDelay){
	this.originaldelay = myDelay;
	this.delay = myDelay;
};

Actor.prototype.age = function(){
	return (now() - this.startAnimationTimestamp);
};
