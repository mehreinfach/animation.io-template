function ScrollText(actor, scrollCountX, scrollCountY, triggeredByAction, reactionTargetIndex){
  var scrollText = new Plugin(0,0, actor, triggeredByAction, reactionTargetIndex);

  scrollText.triggeredByAction = triggeredByAction;

  scrollText.reset = function(){
    this.finishedScrolling = false;
  };
  scrollText.reset();

  scrollText.applybehavior = function () {
    if (!this.finishedScrolling) {
      if (typeof this.targetObject.textDiv != 'undefined') {
        this.targetObject.textDiv.scrollTop += scrollCountY;
      }
    };
    this.finishedScrolling = true;
  };
  return scrollText;
};

// --------------------------------

Actor.prototype.scrollText = function(scrollCountX, scrollCountY, triggeredByAction, reactionTargetIndex) {
  triggeredByAction = (typeof triggeredByAction === 'undefined') ? false : triggeredByAction
  var behavior = new ScrollText(this, scrollCountX, scrollCountY, triggeredByAction, reactionTargetIndex)
  this.addBehavior(behavior);
  return this;
};

Actor.prototype.letsScrollTextOnTouch = function(targetObject, scrollCountX, scrollCountY){
  this.reacts("this.scrollText(" + scrollCountX + "," + scrollCountY + ", true, reactionTargetIndex);", 0, targetObject);
  return this;
};





