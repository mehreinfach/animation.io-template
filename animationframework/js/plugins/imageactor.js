Scene.prototype.createActor = function (filename, startAtX, startAtY, width, height) {
  // check incoming data START
  if (typeof width !== 'undefined' && typeof height === 'undefined') {
    console.error('Missing height-value for ' + filename + ' in ' + this.id + ', please set both. (Browsers deal with the missing height value differently.)');
  };
  // check incoming data END

  var actor = new Actor(startAtX, startAtY, width, height);
  actor.scene = this;
  actor.actortype = "image";
  var defaultImageDirectory = onLocalhost() ? 'images/' : window.animation.config.cdnDomain + '/images/';

  actor.setup = function () {
    actor.image = document.createElement('img');
    actor.image.originalPath = filename;
    actor.filename = filename.substring(filename.lastIndexOf('/') + 1)
    actor.image.setAttribute('src', relativeOrAbsolutePath(defaultImageDirectory, actor.image.originalPath));
    actor.image.setAttribute('class', 'actor');
    this.image.setAttribute('draggable', 'false');
    actor.image.actor = actor;
    actor.phases.push(relativeOrAbsolutePath(defaultImageDirectory, filename));
    actor.defaultdirectory = defaultImageDirectory;
    actor.position = { x: startAtX, y: startAtY };
    actor.setSize(width, height);
    actor.vector = { x: 0, y: 0 };

    // bindEvent(actor.image, 'mousedown', function () { actor.react() });
    bindEvent(actor.image, 'load', function () {
      //console.log(actor.filename + ' loaded');
      actor.hasLoaded = function () {
        // Norman, have fun! :-)
        return true;
      };
      this.removeEventListener('load', arguments.callee);
    });
    moveActor(actor);
  };
  actor.setup();

  // mediaType = 'image'; // seems to be unused
  actor.scene = this;
  this.addActor(actor);
  return actor;
};

Actor.prototype.addPhase = function (phaseImagePath) {
    var tmpImage = document.createElement('img');
    tmpImage.setAttribute('src', relativeOrAbsolutePath(this.defaultdirectory, phaseImagePath));
    tmpImage.setAttribute('draggable', 'false');
    this.phases.push(relativeOrAbsolutePath(this.defaultdirectory, phaseImagePath));
};