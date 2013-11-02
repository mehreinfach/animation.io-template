function ScrollPopUp(actor, scrollCountX, scrollCountY, triggeredByAction, reactionTargetIndex){
  var scrollPopUp = new Plugin(0,0, actor, triggeredByAction, reactionTargetIndex);

  scrollPopUp.triggeredByAction = triggeredByAction;

  scrollPopUp.reset = function(){
    this.finishedVisibility = false;
  };
  scrollPopUp.reset();

  scrollPopUp.applybehavior = function () {
      if (!this.finishedVisibility) {
          this.targetObject.image.contentWindow.scrollBy(scrollCountY,scrollCountX);
      };
      this.finishedVisibility = true;
  };
  return scrollPopUp;
};

// --------------------------------

Actor.prototype.scrollPopUp = function(scrollCountX, scrollCountY, triggeredByAction, reactionTargetIndex) {
  triggeredByAction = (typeof triggeredByAction === 'undefined') ? false : triggeredByAction
  var behavior = new ScrollPopUp(this, scrollCountX, scrollCountY, triggeredByAction, reactionTargetIndex)
  this.addBehavior(behavior);
  return this;
};

Actor.prototype.letsScrollPopUpOnTouch = function(targetObject, scrollCountX, scrollCountY){
  this.reacts("this.scrollPopUp(" + scrollCountX + "," + scrollCountY + ", true, reactionTargetIndex);", 0, targetObject);
  return this;
};
