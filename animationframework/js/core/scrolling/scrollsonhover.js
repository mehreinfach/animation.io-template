function ScrollingOnHover(actor, speed, factor, maxspeed, triggeredByAction, reactionTargetIndex){
	/*
		speed: 		how many pixels are added on every animationframe (60x per second)
		factor: 	how fast does it get faster (1 not at all)
		maxspeed: maximum speed
	*/
	var scrollingonhover = new Plugin(0, 0.5);
	scrollingonhover.active = false;
	scrollingonhover.currentSpeed = speed;

  scrollingonhover.applybehavior = function () {
  	if (this.active) {
  		// console.log("scroll");
  		this.currentSpeed *= factor;
  		if (Math.abs(this.currentSpeed) > Math.abs(maxspeed)) this.currentSpeed = sameprefix(speed, maxspeed);
  		window.currentScene.scrollPositionVectorX = this.currentSpeed;
  	}
  };

  actor.scene.scrollingActors.push(actor);

  return scrollingonhover;
}

Actor.prototype.scrollsHorizontalOnHover = function(speed, factor, maxspeed){
	if (BrowserDetect.OS !== 'iPad') {

		var behavior = new ScrollingOnHover(this, speed, factor, maxspeed, false, 0)
		this.addBehavior(behavior);

		bindEvent(this.image, 'mouseover', function(myevent){
			behavior.active = true;
		});

		bindEvent(this.image, 'mouseout', function(myevent){
			behavior.active = false;
			behavior.currentSpeed = speed;
		});
	}
};