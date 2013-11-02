function ScrollingBy(actor, amountX, amountY, duration, triggeredByAction, reactionTargetIndex){
  var scrollingby = new Plugin(0, 0.5);

  amountX = -amountX;
  amountY = -amountY;

  scrollingby.triggeredByAction = triggeredByAction;

  var horizontalDirection, verticalDirection, done;

  var borderReached = false;

  var startedScrollingAt = now();

  var xvector = 0;
  var oldxvector = 0;

  scrollingby.reset = function(){
  	if (amountX > 0) { horizontalDirection = 'right'; } else if (amountX < 0) { horizontalDirection = 'down'; }
  	if (amountY > 0) { verticalDirection = 'down'; } else if (amountY < 0) { verticalDirection = 'up'; }
  	var done = false;
  };
  scrollingby.reset();

  scrollingby.applybehavior = function () {
    // TODO: Y-Scrolling

  	if (!done && !borderReached && horizontalDirection) {

      xvector = easeOut(now() - startedScrollingAt, 0, amountX, duration);
      done = Math.abs(xvector) >= Math.abs(amountX);

      if (!done) {
        // console.log("" + (xvector - oldxvector));
        window.currentScene.scrollPositionVectorX += (xvector - oldxvector);
        oldxvector = xvector;        
      }
  	}
  };

  return scrollingby;
}

Actor.prototype.scrollsBy = function(amountX, amountY, duration, triggeredByAction, reactionTargetIndex) {
  triggeredByAction = (typeof triggeredByAction === 'undefined') ? false : triggeredByAction
  var behavior = new ScrollingBy(this, amountX, amountY, duration, triggeredByAction, reactionTargetIndex)
  this.addBehavior(behavior);
  return this;
};

Actor.prototype.scrollsByOnTouch = function(amountX, amountY, duration){

  this.scene.scrollingActors.push(this);

  this.reacts("this.scrollsBy(" + -amountX + "," + -amountY + "," + duration + ", false, true, reactionTargetIndex);", 0);
  return this;
};

Scene.prototype.getScrollAmountX = function (x, layernumber) {
    var shiftfactor = 1 - ((this.neutralLayer - layernumber) * this.layerMultiplier);
    return x/shiftfactor;
}

Scene.prototype.getScrollAmountY = function (y, layernumber) {
    var shiftfactor = 1 - ((this.neutralLayer - layernumber) * this.layerMultiplier);
    return y/shiftfactor;
}