Actor.prototype.isInLayer = function(layerNumber, factorX, factorY) {
  this.layer = layerNumber;

  if (typeof(this.scene.layers) == 'undefined') {
    // create the layers-array in this scene if necessary
    this.scene.layers = [];
  }

  if (typeof this.scene.layers[layerNumber] == 'undefined') {
    // create this layer if missing
    this.scene.layers[layerNumber] = [];
  }

  // put this actor in its layer
  this.scene.layers[layerNumber].push(this);

  var myactor = this;

  return this;
};

Scene.prototype.scrollingPerspective = function (neutralLayer, horizonLayer) {
  /*
  * “neutralLayer” moves exactly the same speed as the scroll bar, default is layer 10.
  * “horizonLayer“ doesn't move at all, default is layer 0.
  */

  this.neutralLayer = (typeof neutralLayer === 'undefined' ? 10 : neutralLayer);
  this.horizonLayer = (typeof horizonLayer === 'undefined' ? 0 : horizonLayer);
  this.layerMultiplier = 1 / (this.neutralLayer - this.horizonLayer);

  var myscene = this;
};

Scene.prototype.setPerspective = function (shiftingAmountX, shiftingAmountY) {
  // go through all layers…
  if (this.layers) {
    for (var layernumber = 0; layernumber < this.layers.length; layernumber++) {
      // shift the images in this layer if there are any:
      if (typeof this.layers[layernumber] != "undefined") {
        // calculate shifting-strength for this layer:
        var shiftfactor = 1 - ((this.neutralLayer - layernumber) * this.layerMultiplier);
        for (var actorCounterInLayer = this.layers[layernumber].length - 1; actorCounterInLayer >= 0; actorCounterInLayer--) {
          var obj = this.layers[layernumber][actorCounterInLayer];
          if (shiftingAmountX) {
            if (obj.zeroOffsX == 0) {
              if (layernumber >= this.horizonLayer){
                 obj.zeroOffsX = shiftingAmountX * shiftfactor ;
              } else
              {
                obj.zeroOffsX = -(shiftingAmountX * shiftfactor );
              }
            }
            obj.offsetX = shiftingAmountX * shiftfactor ;
            obj.needsMoving = true;
          }
          if (shiftingAmountY) {
            if (obj.zeroOffsY == 0) {
              if (layernumber >= this.horizonLayer){
                obj.zeroOffsY = shiftingAmountY * shiftfactor ;
              } else
              {
                obj.zeroOffsY = -(shiftingAmountY * shiftfactor * 2);
              }
            }
            obj.offsetY = shiftingAmountY * shiftfactor;
            obj.needsMoving = true;
          }
        }
      }
    }
  }
};

Actor.prototype.shiftsPerspective = function(shiftingAmountX, shiftingAmountY, triggeredByAction, reactionTargetIndex){
  this.scene.shiftPerspective(shiftingAmountX, shiftingAmountY);
  return this;
};

Actor.prototype.shiftsPerspectiveOnTouch = function(shiftingAmountX, shiftingAmountY){
  this.reacts("this.shiftsPerspective(" + shiftingAmountX + ", " + shiftingAmountY + ", true, reactionTargetIndex)", 0);
  return this;
};

Scene.prototype.shiftPerspective = function(shiftingAmountX, shiftingAmountY){
  for (var layernumber = 0; layernumber < this.layers.length; layernumber++) {
    if (typeof this.layers[layernumber] != "undefined") {
      for (var actorCounterInLayer = this.layers[layernumber].length - 1; actorCounterInLayer >= 0; actorCounterInLayer--) {
        var obj = this.layers[layernumber][actorCounterInLayer];
        if (shiftingAmountX) {
          obj.offsetX += shiftingAmountX * (layernumber-1);
          obj.needsMoving = true;
        }
        if (shiftingAmountY) {
          obj.offsetY += shiftingAmountY * (layernumber-1);
          obj.needsMoving = true;
        }
      }
    }
  }
};


