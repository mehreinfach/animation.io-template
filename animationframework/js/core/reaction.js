/* jshint -W061 */

var Reaction = function(actor, reactioncode, reactHowOften){
  this.actor = actor;
  this.reactioncode = reactioncode;
  this.reactHowOften = reactHowOften;
  this.runs = this.actor.syncs() ? keyOr(actor.synckey + "_resetcounter", 0) : 0;
  // console.log(this.actor.filename + ".runs: " + this.runs);

  if (notNumeric(this.reactHowOften) || this.reactHowOften < 0) {
    this.reactHowOften = 0;
  }

  this.reset = function(){
    this.runs = this.actor.syncs() ? keyOr(actor.synckey + "_resetcounter", 0) : 0;
  };
  return this;
};

Actor.prototype.react = function(){
  for (var i = 0; i < this.reactions.length; i++) {
    var myReaction = this.reactions[i];

    if ((myReaction.reactHowOften === 0) || (myReaction.runs < myReaction.reactHowOften)) {

      eval(myReaction.reactioncode.replace('reactionTargetIndex', i));

      // update reaction counter:
      myReaction.runs++;
      if (this.syncs()) updateKey(this.synckey + "_resetcounter", myReaction.runs);
    }
  }
};

// The following are called via plugin/script:

Actor.prototype.reacts = function(reactioncode, reactHowOften, reactionTarget){
  if (notNumeric(this.imagesize.x)) {
    console.error("Actor " + this.filename + " in " + this.scene.id + " has no width set and can therefore not react.")
    return;
  };
  if (notNumeric(this.imagesize.y)) {
    console.error("Actor " + this.filename + " in " + this.scene.id + " has no height set and can therefore not react.")
    return;
  };

  // this.image.style.cursor = 'pointer';
  reactionTarget = (typeof reactionTarget === 'undefined') ? this : reactionTarget;
  var reaction = new Reaction(this, reactioncode, reactHowOften, reactionTarget);
  this.reactions.push(reaction);
  this.reactionTargets.push(reactionTarget);
};


