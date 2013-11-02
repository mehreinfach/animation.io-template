function ScrollingTo(actor, targetX, targetY, duration, triggeredByAction, reactionTargetIndex){
  var scrollingto = new Plugin(0, 0.5, actor, triggeredByAction, reactionTargetIndex);
  var amountX = -(actor.scene.scrollPositionX - targetX);
  var amountY = -(actor.scene.scrollPositionY - targetY);
  var horizontalDirection, verticalDirection, done;
  var startedScrollingAt = now();
  var xvector = 0;
  var oldxvector = 0;
  var currentAmountX, currentAmountY;

  scrollingto.reset = function(){
    horizontalDirection = undefined;
    if (amountX > 0) { horizontalDirection = 'right'; } else if (amountX < 0) { horizontalDirection = 'down'; }

    verticalDirection = undefined;
    if (amountY > 0) { verticalDirection = 'down'; } else if (amountY < 0) { verticalDirection = 'up'; }
    var done = false;
  };
  scrollingto.reset();

  scrollingto.applybehavior = function () {


    // TODO: Y-Scrolling

    if (!done && horizontalDirection) {
      xvector = (easeOut(now() - startedScrollingAt, 0, amountX, duration));
      if (Math.abs(xvector) >= Math.abs(amountX)) {
        done = true;
        xvector = -(actor.scene.scrollPositionX - targetX);
        oldxvector = 0;
      }
      window.currentScene.scrollPositionVectorX += (xvector - oldxvector);
      oldxvector = xvector;
    }
  };

  return scrollingto;
};



// --------------------------------

Actor.prototype.scrollsTo = function(targetX, targetY, duration, triggeredByAction, reactionTargetIndex) {
  triggeredByAction = (typeof triggeredByAction === 'undefined') ? false : triggeredByAction
  var behavior = new ScrollingTo(this, targetX, targetY, duration, triggeredByAction, reactionTargetIndex)
  this.addBehavior(behavior);
  return this;
};

Actor.prototype.scrollsToOnTouch = function(targetX, targetY, duration){
  this.reacts("this.scrollsTo(" + targetX + "," + targetY + "," + duration + ", false, true, reactionTargetIndex);", 0);
  return this;
};

//calculates the scrollbar Position of a position in a layer
Scene.prototype.getScrollAmountX = function (x, layernumber) {
    var shiftfactor = 1 - ((this.neutralLayer - layernumber) * this.layerMultiplier);
    return x/shiftfactor;
}

Scene.prototype.getScrollAmountY = function (y, layernumber) {
    var shiftfactor = 1 - ((this.neutralLayer - layernumber) * this.layerMultiplier);
    return y/shiftfactor;
}

Actor.prototype.scrollsToOnTouch3 = function(targetX, targetY, layer, duration){
  this.reacts("this.scrollsTo(" + this.scene.getScrollAmountX(targetX,layer) + "," + this.scene.getScrollAmountY(targetY,layer) + "," + duration + ", true, reactionTargetIndex);", 0);
  return this;
};
