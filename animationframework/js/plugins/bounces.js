/* Simple bouncing plugin, makes an actor bounce upward, using a sine function
(not physically accurate, but looks more believable than a quadratic curve)
 Parameters:
 - amplitude: Height of bounce in screen units
 - speed: Bounces per second
 - times: Number of bounces, specify 0 for infinite bouncing
 - damping: Amplitude reduction (0.0-1.0) or increase (>1.0) over time. Specify 1.0 for constant amplitude.
*/

function Bouncing(actor, amplitude, speed, times, damping, triggeredByAction, reactionTargetIndex) {
  var bouncing = new Plugin(0,0, actor, triggeredByAction, reactionTargetIndex);

  bouncing.reset = function(){
    this.resetPlugin(); // quasi "call to super";
    this.amplitude = amplitude;
    this.speed = speed;
    this.times = times;
    this.damping = damping;
    this.startedAt = now();
    this.lastX = 0;
    this.lastY = 0;
 };

  bouncing.reset();

  bouncing.applybehavior = function(){
    var time = ((now() - this.startedAt) * this.speed / 1000);      //bounces since start of behaviour
    var y = (this.times < 1) || (time < this.times) ?  //Bounce or not?
		(-Math.abs(this.amplitude * Math.sin(time * this.speed * Math.PI)) * Math.pow(this.damping, time)) :
	 	0;
    this.targetObject.vector.y += y - this.lastY;      //Modify position of actor (delta to last)
    this.lastY = y;                                    //Remember last
  };

  return bouncing;
};

Actor.prototype.bounces = function(amplitude, speed, times, damping, triggeredByAction, reactionTargetIndex) {
  this.addBehavior(new Bouncing(this, amplitude, speed, times, damping, triggeredByAction, reactionTargetIndex));
  return this;
};

Actor.prototype.bouncesOnTouch = function(amplitude, speed, times, damping){
  this.reacts("this.bounces(" + amplitude + "," + speed + "," + times + "," + damping + ", true, reactionTargetIndex);", 0);
  return this;
};

Actor.prototype.letsBounce = function(targetObject, amplitude, speed, times, damping){
  this.reacts("this.bounces(" + amplitude + "," + speed + "," + times + "," + damping + ", true, reactionTargetIndex);", 1, targetObject);
  return this;
};