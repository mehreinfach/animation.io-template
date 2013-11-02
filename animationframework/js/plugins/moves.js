function Moving(actor, initialForceX, initialForceY, friction, gravitation, delay, easeIn){
	var moving = new Plugin(delay, easeIn);

	moving.actor = actor;
	moving.force = {x: initialForceX, y: initialForceY};
	moving.speed = {x: 0, y: 0};
	moving.friction = friction;
	moving.gravitation = gravitation;
	moving.triggeredByTouch = false;

	moving.reset = function(){
		this.resetPlugin();
		moving.speed = {x: 0, y: 0};
		moving.force = {x: initialForceX, y: initialForceY};
	};
	moving.reset();

	moving.applybehavior = function(){
		if (this.factor() != 1) {
			console.log("this.factor(): " + this.factor());
			console.log("this.age(): " + this.age());
		};
		// reduce force
		moving.force.x = moving.force.x * 0.9;
		moving.force.y = moving.force.y * 0.9;

		// applybehavior gravity
		if (typeof moving.gravitation != 'undefined') {
			moving.force.y +=  moving.gravitation/50;
		};

		// applybehavior moving.force
		moving.speed.x += moving.force.x;
		moving.speed.y += moving.force.y;

		// applybehavior friction
		if (typeof moving.friction != 'undefined') {
			moving.speed.x = moving.speed.x * (1 - (moving.friction/50));
			moving.speed.y = moving.speed.y * (1 - (moving.friction/50));
		};

		// applybehavior results to actor's vector
		moving.actor.vector.x += (moving.speed.x * this.factor());
		moving.actor.vector.y += (moving.speed.y * this.factor());
	};

	return moving;
}

Actor.prototype.moves = function(initialForceX, initialForceY, friction, gravitation, delay, easeIn) {
	this.addBehavior(new Moving(this, initialForceX, initialForceY, friction, gravitation, delay, easeIn));
  return this;
};

Actor.prototype.movesOnTouch = function(initialForceX, initialForceY, friction, gravitation, delay, easeIn) {
	var tmpString = initialForceX + "," + initialForceY;

	if (typeof friction != 'undefined') {
		tmpString += (', ' + friction);
	};
	if (typeof gravitation != 'undefined') {
		tmpString += (', ' + gravitation);
	};
	if (typeof delay != 'undefined') {
		tmpString += (', ' + delay);
	};
	if (typeof easeIn != 'undefined') {
		tmpString += (', ' + easeIn);
	};
	this.reacts("this.moves(" + tmpString + ");");
  return this;
};