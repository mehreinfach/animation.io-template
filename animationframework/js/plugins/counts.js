function CountResetter(actor, triggeredByAction, reactionTargetIndex){
  var countresetter = new Plugin(0,0, actor, triggeredByAction, reactionTargetIndex);

  countresetter.reset = function(){
    this.resetPlugin(); // quasi "call to super";
    if (this.targetObject.syncs()) {
      this.targetObject.counter = parseInt(keyOr(this.synckey + "-counter", integerValueOfOr(this.targetObject.counterInitialAmount || 0)));      
    } else {
      this.targetObject.counter = integerValueOfOr(this.targetObject.counterInitialAmount || 0);
    }

    this.targetObject.autosetCountertext();
  };
  countresetter.reset();

  return countresetter;
}

////////////////////

Actor.prototype.initializeCounterIfNeeded = function(initialAmount){

  console.log("initializing counter " + this.filename);
  
  if (typeof this.counterInitialized === 'undefined') {
    this.addBehavior(new CountResetter(this));
    if (typeof initialAmount !== 'undefined') this.counterInitialAmount = initialAmount; 

    if (this.syncs()) {
      this.counter = parseInt(keyOr(this.synckey + "-counter", integerValueOfOr(initialAmount || 0)));     
      console.log("got value: " + this.counter);
    } else {
      this.counter = integerValueOfOr(initialAmount || 0);
    }
    this.counterInitialized = true;
    this.onMinimumReactions = [];
    this.onExactReactions = [];
  }
};

Actor.prototype.actOnReactions = function(){
  // console.log("****** this.counter: " + this.counter);

  for (var i = 0; i < this.onMinimumReactions.length; i++) {
    if (this.counter >= this.onMinimumReactions[i][0]) this.onMinimumReactions[i][1]();
  };
  for (var i = 0; i < this.onExactReactions.length; i++) {
    // console.log("this.onExactReactions[i][0]: " + this.onExactReactions[i][0]);
    // console.log("should execute!");
    // console.log("this.counter: " + this.counter);
    // console.log(this.onExactReactions[i][1]);
    
    if (this.counter === this.onExactReactions[i][0]) {
      this.onExactReactions[i][1]();
    };
  };
};

Actor.prototype.reactOnMinimum = function(minimumValue, reaction){
  this.onMinimumReactions.push([minimumValue, reaction]);
};

Actor.prototype.reactOnEqual = function(minimumValue, reaction){
  this.onExactReactions.push([minimumValue, reaction]);
};

Actor.prototype.autosetCountertext = function(){
  if ((typeof this.textDiv !== 'undefined') && (this.originalText.indexOf('%count%') >= 0)) {
    this.setText(this.originalText.replace('%count%', this.counter));
  } else {
    this.setText(this.counter);
  }
  if(this.syncs) updateKey(this.synckey + "-counter", this.counter);
  return this;
};

////////////////////

Actor.prototype.addsToCounter = function(amount, triggeredByAction, reactionTargetIndex) {
  // This really doesn't make sense in scripting, as it would add during loading
  // of the scene. You may want to user "letsAddToCounter" instead.
  console.log("adding to counter");
  
  var addCounter = 0;
  var targetObject = triggeredByAction ? this.reactionTargets[reactionTargetIndex] : this;
  targetObject.counter = parseInt(targetObject.counter) + amount;
  targetObject.autosetCountertext();
  targetObject.actOnReactions();
  return this;
};

Actor.prototype.letsAddToCounter = function(targetObject, amount, howOften){
  if (typeof howOften === 'undefined') howOften = 0;
  targetObject.initializeCounterIfNeeded();
  this.reacts("this.addsToCounter(" + amount + ", true, reactionTargetIndex);", howOften, targetObject);
  return this;
};

////////////////////

Actor.prototype.multipliesCounter = function(amount, triggeredByAction, reactionTargetIndex) {
  var targetObject = triggeredByAction ? this.reactionTargets[reactionTargetIndex] : this;
  targetObject.counter = parseInt(targetObject.counter) * amount;
  targetObject.autosetCountertext();
  return this;
};

Actor.prototype.letsMultiply = function(targetObject, amount){
  targetObject.initializeCounterIfNeeded();
  this.reacts("this.multipliesCounter(" + amount + ", true, reactionTargetIndex);", 0, targetObject);
  return this;
};