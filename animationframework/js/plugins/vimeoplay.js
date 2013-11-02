function PlayVimeo(actor, triggeredByAction, reactionTargetIndex){

    var playing = new Plugin(0,0, actor, triggeredByAction, reactionTargetIndex);

    playing.cleanup = function () {
        this.cleanupPlugin();
        var command = { method: 'pause' };
        targetOrigin = this.targetObject.image.src.split('?')[0];
        this.targetObject.image.contentWindow.postMessage(JSON.stringify(command), targetOrigin);
        //curr time = 0
    };

    playing.reset = function () {
        this.resetPlugin(); // quasi "call to super";
    };
    playing.reset();

    playing.applybehavior = function () {
        if (this.done) return;
        var command = { method: 'play' };
        targetOrigin = this.targetObject.image.src.split('?')[0];
        this.targetObject.image.contentWindow.postMessage(JSON.stringify(command), targetOrigin);
        this.isDoneWhen(true);
    };

return playing;
};

Actor.prototype.playvimeo = function (triggeredByAction, reactionTargetIndex) {
    var behavior = new PlayVimeo(this, triggeredByAction, reactionTargetIndex);
    if (typeof triggeredByAction !== 'undefined') {
        behavior.triggeredByAction = triggeredByAction;
    }
    this.addBehavior(behavior);
    return this;
};

Actor.prototype.playvimeoOnTouch = function(){
  this.reacts("this.playvimeo(true, reactionTargetIndex);", 0);
  return this;
};

Actor.prototype.letsPlayvimeo = function(targetObject, startAfter, startsAt, playLength){
  this.reacts("this.playvimeo(true, reactionTargetIndex);", 0, targetObject);
  return this;
};