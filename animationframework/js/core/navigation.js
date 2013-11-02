Actor.prototype.navigatesOnTouch = function(sceneid, secondImageFilename) {
  this.reacts("window.animation.showScene('" + sceneid + "')", 0);
  this.image.className += 'navigation';
  this.scene.preloadSceneIds.push(sceneid);
};

Actor.prototype.navigatesAndLoadsOnTouch = function(sceneid) {
	// TODO
	this.reacts("window.animation.loadAndShow('" + sceneid + "')", 0);
	this.image.className += 'navigation';
};
