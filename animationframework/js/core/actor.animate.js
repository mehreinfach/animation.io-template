function moveActor(actor){
  actor.position.x += actor.vector.x;
  actor.position.y += actor.vector.y;

  actor.image.style.left = (actor.absolutePositionTopLeftX()) + 'px';
  actor.image.style.top = (actor.absolutePositionTopLeftY()) + 'px';

  actor.lastVector = actor.vector;
  actor.vector = {x: 0, y: 0};
  actor.needsMoving = false;
}

function tiltActor(actor){
	actor.tilt = (actor.tilt + actor.spin) % 360;

	actor.image.style.transformOrigin = actor.rotationCenterX + 'px ' + actor.rotationCenterY + 'px';
	actor.image.style.webkitTransformOrigin = actor.rotationCenterX + 'px ' + actor.rotationCenterY + 'px';
	actor.image.style.msTransformOrigin = actor.rotationCenterX + 'px ' + actor.rotationCenterY + 'px';

	actor.image.style.transform = 'rotate(' + actor.tilt + 'deg)'; // Firefox
	actor.image.style.webkitTransform = 'rotate(' + actor.tilt + 'deg)'; // Webkit (Chrome, Safari)
	actor.image.style.msTransform = 'rotate(' + actor.tilt + 'deg)'; // Internet Explorer
	actor.spin = 0;
}

function animateactor(actor){
	if (!actor.currentlyVisible){
    actor.image.style.visibility = 'hidden';
    // console.log("invisible: " + actor.filename);
  }

  if (actor.comesBack && notVisibleOnStage(actor)) {
		// console.log("actor " + actor.image.src + " is waiting for reset");
		if (actor.waitingForReset) {
			if ((t() - actor.waitingForResetSince) >= actor.resetDelay) {
				actor.reset();
				actor.waitingForReset = false;
			}
		} else if (actor.comesBack) {
			// console.log("actor " + actor.image.src + " should start resetting");
			actor.alterOpacity(0);
			actor.waitingForReset = true;
			actor.waitingForResetSince = t();
		}
	} else if ((actor.delay > 0) && !actor.finishedDelaying) {
		// NEEDS TO DELAY
		if (actor.startedDelayingAt === null) {
			// start delaying
			actor.startedDelayingAt = t();
		} else if (t() >= (actor.startedDelayingAt + actor.delay)) {
			// stop delaying
			actor.finishedDelaying = true;
		} /* else {
			// still delaying
		} */
	} else {
		// DOESN'T NEED TO DELAY

		if (actor.phases.length > 1) {
			if (actor.currentPhase() !== actor.oldPhase) {
				actor.image.src = actor.phases[actor.currentPhase()];
				actor.oldPhase = actor.currentPhase();
			}
		}

		// run through all behaviors
		for (var i = 0; i < actor.behaviors.length; i++){
			if (!actor.behaviors[i].done) actor.behaviors[i].applybehavior();
		}

    /*
      Moving stuff around is expensive, so do it only if needed.
    */
		if (actor.needsMoving || (actor.vector.x !== 0) || (actor.vector.y !== 0)){
			moveActor(actor);
		}

		if (actor.spin !== 0 || actor.tilt !== 0) {
			tiltActor(actor);
		}

		if (actor.showsCorners) actor.updateCorners();
	}
}
