function HideObject(actor, objectId, hideValue, triggeredByAction, reactionTargetIndex){
  var hideObject = new Plugin(0,0, actor, triggeredByAction, reactionTargetIndex);

  hideObject.triggeredByAction = triggeredByAction;

  hideObject.reset = function(){
    this.finished = false;
  };
  hideObject.reset();

  hideObject.applybehavior = function () {
      if (!this.finished) {
                console.log('tryhide: ' + objectId);
          //var hideObj = document.getElementById(objectId);
          if (hideValue) {
              objectId.style.visibility = 'hidden';
          } else {
              objectId.style.visibility = '';
          }
      };
      this.finished = true;
  };
  return hideObject;
};

// --------------------------------

Actor.prototype.hideObject = function(objectId, hideValue, triggeredByAction, reactionTargetIndex) {
  triggeredByAction = (typeof triggeredByAction === 'undefined') ? false : triggeredByAction
  var behavior = new HideObject(this, objectId, hideValue, triggeredByAction, reactionTargetIndex)
  this.addBehavior(behavior);
  return this;
};


Actor.prototype.hideObjectOnTouch = function(targetObject, objectId, hideValue){
  this.reacts("this.hideObject(" + objectId + "," + hideValue + ", true, reactionTargetIndex);", 0, targetObject);
  return this;
};
