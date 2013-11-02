Actor.prototype.setPhaseCycleLength = function (milliseconds) {
  this.phaseCycle = milliseconds;
};

Actor.prototype.currentPhase = function () {
  var myPhase = 0;
  var numberOfPhases = this.phases.length;

  if (numberOfPhases > 1) {
    // we have an original image and an extra phase image
    var passedTimeSinceEntered = now() - this.enteredAt;
    var lengthOfPhase = this.phaseCycle / numberOfPhases;
    var rest = passedTimeSinceEntered % (numberOfPhases * lengthOfPhase);
    myPhase = parseInt((rest / lengthOfPhase), 10);
  }
  return myPhase;
};