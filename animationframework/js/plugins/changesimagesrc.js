function ChangingImageSrc(actor, newPath, triggeredByAction, reactionTargetIndex){
  var changingImageSrc = new Plugin(0,0, actor, triggeredByAction, reactionTargetIndex);

  changingImageSrc.applybehavior = function(){
    this.targetObject.changeImageSrc(newPath);
  };

  return changingImageSrc;
};

Actor.prototype.changesImageSrc = function(newPath, triggeredByAction, reactionTargetIndex) {
  this.addBehavior(new ChangingImageSrc(this, newPath, triggeredByAction, reactionTargetIndex));
};

Actor.prototype.changesImageSrcOnTouch = function(newPath){
  this.reacts("this.changesImageSrc('" + newPath + "', true, reactionTargetIndex);", 1);
};

Actor.prototype.letsChangeImageSrc = function(targetObject, newPath){
  this.reacts("this.changesImageSrc('" + newPath + "', true, reactionTargetIndex);", 1, targetObject);
};