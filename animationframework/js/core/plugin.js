function Plugin(delay, easeIn, actor, triggeredByAction, reactionTargetIndex){
  this.delay = delay;
  this.easeIn = (typeof easeIn != 'undefined') ? easeIn : 0;
  this.needsToCalculateEasein = this.easeIn > 0;
  this.startAnimationTimestamp = new Date();
  this.triggeredByAction = false;
  this.sync = false
  this.done = false;
  this.running = false;
  this.plugintype = false;

  var targetObject = null;

  this.setup = function(){
    this.actor = actor;
    this.triggeredByAction = truth(triggeredByAction);
    if (isNumeric(reactionTargetIndex)) {
      this.targetObject = actor.reactionTargets[reactionTargetIndex];
    } else {
      this.targetObject = actor;
    }
  };
  this.setup();

  this.resetStartAnimationTimestamp = function(){
    this.startAnimationTimestamp = now();
  };

  this.applybehavior =  function(){
    // should be overwritten, if actually used.
  };

  this.resetPlugin = function(){
    this.done = false;
    this.resetStartAnimationTimestamp();
    this.needsToCalculateEasein = this.easeIn > 0;
  };

  this.isDoneWhen = function(condition, functionToDoIfDone){
    this.done = condition;
    if ((typeof functionToDoIfDone !== 'undefined') && condition) {
      functionToDoIfDone(this);
    }
  };

  this.reset = function(){
    // use this function as a template when writing
    // resets in your plugin
    this.resetPlugin();
    // ... do resetting-stuff here
  };

  this.cleanupPlugin = function(){
    // we could put some cleanup procedures here
    // that apply to all behaviors
  };

  this.cleanup = function(){
    // use this function as a template when writing
    // cleanups in your plugin
    this.cleanupPlugin();
    // ... do resetting-stuff here
  };

  this.age = function(){
    return (new Date() - this.startAnimationTimestamp);
  };

  this.factor = function(){
    // cosinus ease-in
    if (this.needsToCalculateEasein && this.easeIn > 0 && this.age() < this.easeIn) {
      return Math.cos(((this.age()/this.easeIn) * (Math.PI/2)) - (Math.PI/2));
    } else {
      this.needsToCalculateEasein = false;
      return 1;
    }
  };

  return this;
}
