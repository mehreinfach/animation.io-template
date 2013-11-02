Actor.prototype.addBehavior = function (myBehavior) {
  try {
    myBehavior.reset();
  } catch (e) { }
  this.behaviors.push(myBehavior);
};

Actor.prototype.cleanupBehaviors = function () {
  for (var i = this.behaviors.length - 1; i >= 0; i--) {
    this.behaviors[i].cleanup();
  }
};

Actor.prototype.removeBehaviorsThatCameFromReacts = function () {
  var newBehaviors = [];

  for (var i = this.behaviors.length - 1; i >= 0; i--) {
    if (!this.behaviors[i].triggeredByAction) {
      newBehaviors.push(this.behaviors[i]);
    }
  }

  if (this.behaviors.length !== newBehaviors.length) {
    this.behaviors = newBehaviors;
  }
};