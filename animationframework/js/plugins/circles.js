function Circling(actor, radius, hertz, tilt, triggeredByAction, reactionTargetIndex){
  var circling = new Plugin(0,0, actor, triggeredByAction, reactionTargetIndex);

  circling.tilt = tilt;

  circling.reset = function(){
    circling.resetPlugin(); // quasi "call to super";
    circling.newX = 0;
    circling.newY = 0;
    circling.vectorX = 0;
    circling.vectorY = 0;
    circling.oldX = 0;
    circling.oldY = 0;
    circling.firstRun = true;
  }

  circling.counter = 0;

  circling.applybehavior = function(){
    this.counter = this.counter + 1;

    if (typeof this.circlingStartedAt === "undefined") {
      this.circlingStartedAt = now();
    };
    this.tmpValue = (this.circlingStartedAt - now());

    this.newX = (radius * Math.cos(this.tmpValue / 500*hertz)) * 2;
    this.newY = (radius * Math.sin(this.tmpValue / 500*hertz)) * 2;

    this.vectorX = (this.newX - this.oldX);
    this.vectorY = (this.newY - this.oldY);

    this.oldX = this.newX;
    this.oldY = this.newY;

    if (this.firstRun) {
      this.firstRun = false;
    } else {
      this.targetObject.vector.x += this.vectorX;
      this.targetObject.vector.y += this.vectorY;
    }

    // if (this.counter <= 10) {
    //   console.log("this.tilt: " + this.tilt) // WTF?
    // };

  };

  return circling
}

Actor.prototype.circles = function(radius, hertz, triggeredByAction, reactionTargetIndex){
  this.addBehavior(new Circling(this, radius, hertz, false, triggeredByAction, reactionTargetIndex));
}

Actor.prototype.circlesWithTilt = function(radius, hertz, triggeredByAction, reactionTargetIndex){
  this.addBehavior(new Circling(this, radius, hertz, true, triggeredByAction, reactionTargetIndex));
}