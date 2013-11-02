function Multichoicing(actor, triggeredByAction, reactionTargetIndex){
  var multichoicing = new Plugin(0,0, actor, triggeredByAction, reactionTargetIndex);

  multichoicing.reset = function(){
    this.resetPlugin(); // quasi "call to super";
  };
  multichoicing.reset();

  multichoicing.applybehavior = function(){
  };

  return multichoicing;
};

Actor.prototype.multichoices = function(triggeredByAction, reactionTargetIndex) {
  this.addBehavior(new Multichoicing(this, triggeredByAction, reactionTargetIndex));
  return this;
};

Actor.prototype.isQuestion = function(rightanswers, wronganswers, nextQuestion, imageOnRightAnswer, imageOnWrongAnswer, soundOnRightAnswer, soundOnWrongAnswer, isLast) {
  this.rightanswers = rightanswers;
  this.wronganswers = wronganswers;

  setInvisible(nextQuestion);

  for (var i = rightanswers.length - 1; i >= 0; i--) {
    if (isLast) {
      rightanswers[i].letsAppear(nextQuestion, 1);
    } else {
      rightanswers[i].letsAppearAsQuestion(nextQuestion,1);
    };
    rightanswers[i].letsChangeImageSrc(this, imageOnRightAnswer);
    rightanswers[i].plays(soundOnRightAnswer, imageOnRightAnswer);
    rightanswers[i].letsChangeImageSrc(rightanswers[i], imageOnRightAnswer);
    setInvisible(rightanswers[i]);
    for (var i = wronganswers.length - 1; i >= 0; i--) {
      rightanswers[i].letsDissolve(wronganswers[i]);
    };
  };
  for (var i = wronganswers.length - 1; i >= 0; i--) {
    setInvisible(wronganswers[i]);
  };

  for (var i = wronganswers.length - 1; i >= 0; i--) {
    wronganswers[i].letsChangeImageSrc(wronganswers[i], imageOnWrongAnswer);
    wronganswers[i].plays(soundOnWrongAnswer, imageOnWrongAnswer);
  };
};

Actor.prototype.isLastQuestion = function(rightanswers, wronganswers, nextQuestion, imageOnRightAnswer, imageOnWrongAnswer, soundOnRightAnswer, soundOnWrongAnswer) {
  this.isQuestion(rightanswers, wronganswers, nextQuestion, imageOnRightAnswer, imageOnWrongAnswer, soundOnRightAnswer, soundOnWrongAnswer, true);
  return this;
};

function AppearingAsQuestion(actor, triggeredByAction, reactionTargetIndex) {
  var appearingAsQuestion = Plugin(0,0, actor, triggeredByAction, reactionTargetIndex);

  setVisible(appearingAsQuestion.targetObject);

  for (var i = appearingAsQuestion.targetObject.rightanswers.length - 1; i >= 0; i--) {
    setVisible(appearingAsQuestion.targetObject.rightanswers[i]);
  };

  for (var i = appearingAsQuestion.targetObject.wronganswers.length - 1; i >= 0; i--) {
    setVisible(appearingAsQuestion.targetObject.wronganswers[i]);
  };

  return appearingAsQuestion;
  return this;
};

Actor.prototype.appearsAsQuestion = function(triggeredByAction, reactionTargetIndex) {
  this.addBehavior(new AppearingAsQuestion(this, triggeredByAction, reactionTargetIndex));
  return this;
};

Actor.prototype.letsAppearAsQuestion = function(targetObject){
  this.reacts("this.appearsAsQuestion(true, reactionTargetIndex);", 1, targetObject);
  return this;
};