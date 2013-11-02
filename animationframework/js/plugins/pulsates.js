/* global Plugin, Actor, notNumeric */

function Pulsating(actor, hertz, strength, pulsateHowOften, triggeredByAction, reactionTargetIndex){
  var pulsating = new Plugin(0,0, actor, triggeredByAction, reactionTargetIndex);

  var scale = 1;
  var oldScale = 1;
  var direction = 'up';
  var counter = 0;
  var counted = false;


  pulsating.reset = function(){
    this.resetPlugin();

    if (typeof pulsateHowOften === 'undefined' || notNumeric(pulsateHowOften)) {
      pulsateHowOften = 0;
    }

    scale = 1;
    oldScale = 1;
    direction = 'up';
    counter = 0;
    counted = false;
  };
  pulsating.reset();


  pulsating.applybehavior = function(){
    if(pulsateHowOften === 0 || counter <= pulsateHowOften){
      oldScale = scale;
      scale = 1 + (strength/10 * Math.sin(((new Date() - this.startAnimationTimestamp)*hertz*2) / 500));

      if ((oldScale < scale) && direction === 'down') {
        direction = 'up';
      } else if ((oldScale > scale) && direction === 'up') {
        direction = 'down';
        counted = false;
      }

      pulsating.targetObject.image.style.webkitTransform = 'scale(' + scale + ', ' + scale + ')';
      pulsating.targetObject.image.style.transform = 'scale(' + scale + ', ' + scale + ')';

      if (!counted && direction === 'up' && scale > 1) {
        counter++;
        counted = true;
      }
    }
  };
  return pulsating;
}

Actor.prototype.pulsates = function(hertz, strength, pulsateHowOften, triggeredByAction, reactionTargetIndex) {
  var behavior = new Pulsating(this, hertz, strength, pulsateHowOften, triggeredByAction, reactionTargetIndex);
  this.addBehavior(behavior);
  return this;
};

Actor.prototype.pulsatesOnTouch = function(hertz, strength, pulsatehowOften, reactHowOften){
  this.reacts("this.pulsates(" + hertz + ", " + strength + ", " + pulsatehowOften + ", true, reactionTargetIndex);", reactHowOften);
  return this;
};

Actor.prototype.letsPulsate = function(targetObject, hertz, strength, pulsateHowOften, reactHowOften){
  this.reacts("this.pulsates(" + hertz + ", " + strength + ", " + pulsateHowOften + ", true, reactionTargetIndex);", reactHowOften, targetObject);
  return this;
};



