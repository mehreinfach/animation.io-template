function PauseVideo(actor, startAfter, triggeredByAction, reactionTargetIndex){

    var pauseing = new Plugin(0,0, actor, triggeredByAction, reactionTargetIndex);
    var CRITICAL_VIDEO_READYSTATE = 3; //used as const

    pauseing.cleanup = function () {
        this.cleanupPlugin();
    };

    pauseing.reset = function () {
        this.resetPlugin(); // quasi "call to super";
    };
    pauseing.reset();

    pauseing.applybehavior = function () {
        if (actor.image.readyState < CRITICAL_VIDEO_READYSTATE) {
            this.isDoneWhen(false);
            return;
        }
        if (this.done) return;
        if (typeof startAfter == 'undefined') {
            this.targetObject.image.pause();
            this.isDoneWhen(true);
        }
        else if (this.targetObject.age() > startAfter) {
            this.targetObject.image.pause();
            this.isDoneWhen(true);
        }
    };

return pauseing;
};

Actor.prototype.pausevideo = function (startAfter, triggeredByAction, reactionTargetIndex) {
    var behavior = new PauseVideo(this, startAfter, triggeredByAction, reactionTargetIndex);
    if (typeof triggeredByAction !== 'undefined') {
        behavior.triggeredByAction = triggeredByAction;
    }
    this.addBehavior(behavior);
    return this;
};


Actor.prototype.pausevideoOnTouch = function(startAfter){
  this.reacts("this.pausevideo(" + startAfter + ", true, reactionTargetIndex);", 1);
  return this;
};

Actor.prototype.letsPausevideo = function(targetObject, startAfter, startsAt){
  this.reacts("this.pausevideo(" + startAfter + ", true, reactionTargetIndex);", 1, targetObject);
  return this;
};