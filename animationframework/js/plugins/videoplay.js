function PlayVideo(actor, startAfter, startsAt, playLength, triggeredByAction, reactionTargetIndex){

    var playing = new Plugin(0,0, actor, triggeredByAction, reactionTargetIndex);
    var CRITICAL_VIDEO_READYSTATE = 3; //used as const
    playing.newPlayTime = startsAt;
    playing.playLength = playLength;
    playing.videoReadyToPlay = false;

    playing.cleanup = function () {
        this.cleanupPlugin();
        this.targetObject.image.pause();
        if (typeof startsAt == 'undefined') {
            this.targetObject.image.currentTime = 0;
        } else {
            this.targetObject.image.currentTime = playing.newPlayTime/1000;
        }
    };

    playing.reset = function () {
        playing.videoReadyToPlay = false;
        this.resetPlugin(); // quasi "call to super";
    };
    playing.reset();

    playing.applybehavior = function () {
        if (actor.image.readyState < CRITICAL_VIDEO_READYSTATE) {
            //warten bis video bereit
            this.isDoneWhen(false);
            return;
        } else if (!playing.videoReadyToPlay) {
            if ((typeof startsAt != 'undefined')) {
                this.targetObject.image.currentTime = playing.newPlayTime / 1000;
            }
            playing.videoReadyToPlay = true;
        }
        if ((typeof playing.playLength != 'undefined') && this.targetObject.image.currentTime > ((playing.newPlayTime + playing.playLength) / 1000)) {
            this.targetObject.image.pause();
        }
        if (this.done) return;
        if (typeof startAfter == 'undefined') {
            this.targetObject.image.play();
            this.isDoneWhen(true);
        }
        else if (this.targetObject.age() > startAfter) {
            this.targetObject.image.play();
            this.isDoneWhen(true);
        }
    };

return playing;
};


Actor.prototype.triggerOnEvent = function (triggeredActor, eventName) {
    bindEvent(this.image, eventName, function () { triggeredActor.react(); });
};


Actor.prototype.playvideo = function (startAfter, startsAt, playLength, triggeredByAction, reactionTargetIndex) {
    var behavior = new PlayVideo(this, startAfter, startsAt, playLength, triggeredByAction, reactionTargetIndex);
    if (typeof triggeredByAction !== 'undefined') {
        behavior.triggeredByAction = triggeredByAction;
    }
    this.addBehavior(behavior);
    return this;
};


Actor.prototype.playvideoOnTouch = function(startAfter, startsAt, playLength){
  this.reacts("this.playvideo(" + startAfter + "," + startsAt + ", " + playLength + ", true, reactionTargetIndex);", 1);
  return this;
};

Actor.prototype.letsPlayvideo = function(targetObject, startAfter, startsAt, playLength){
  this.reacts("this.playvideo(" + startAfter + "," + startsAt + ", " + playLength + ", true, reactionTargetIndex);", 1, targetObject);
  return this;
};

