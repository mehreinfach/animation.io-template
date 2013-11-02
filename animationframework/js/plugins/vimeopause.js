function PauseVimeo(actor, triggeredByAction, reactionTargetIndex){

    var pauseing = new Plugin(0,0, actor, triggeredByAction, reactionTargetIndex);


    pauseing.cleanup = function () {
        this.cleanupPlugin();
    };

    pauseing.reset = function () {
        this.resetPlugin(); // quasi "call to super";
    };
    pauseing.reset();

    pauseing.applybehavior = function () {
        if (this.done) return;
        var command = { method: 'unload' };
        targetOrigin = this.targetObject.image.src.split('?')[0];
        this.targetObject.image.contentWindow.postMessage(JSON.stringify(command), targetOrigin);
        this.isDoneWhen(true);
    };

return pauseing;
};

Actor.prototype.pausevimeo = function (triggeredByAction, reactionTargetIndex) {
    var behavior = new PauseVimeo(this, triggeredByAction, reactionTargetIndex);
    if (typeof triggeredByAction !== 'undefined') {
        behavior.triggeredByAction = triggeredByAction;
    }
    this.addBehavior(behavior);
    return this;
};


Actor.prototype.pausevimeoOnTouch = function(){
  this.reacts("this.pausevimeo(true, reactionTargetIndex);", 0);
  return this;
};

Actor.prototype.letsPausevimeo = function(targetObject){
  this.reacts("this.pausevimeo(true, reactionTargetIndex);", 0, targetObject);
  return this;
};