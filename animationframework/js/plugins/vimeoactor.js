Scene.prototype.createVimeoActor = function (videoID, startAtX, startAtY, width, height) {
  var actor = new Actor(startAtX, startAtY, width, height);
  actor.actortype = "vimeo";
  actor.filename = "Vimeo video #" + videoID;

  actor.setup = function () {
    actor.image = document.createElement('iframe');
    actor.image.originalPath = videoID;
    actor.image.setAttribute('src', 'http://player.vimeo.com/video/' + videoID + '?portrait=0&byline=0&portrait=0&api=1&title=0&player_id=' + videoID + '&color=333');
    actor.image.setAttribute('width', width);
    actor.image.setAttribute('height', height);
    actor.image.setAttribute('frameborder', '0');
    // actor.image.setAttribute('ALLOWTRANSPARENCY', 'TRUE'); // seems to be useless
    actor.image.setAttribute('webkitAllowFullScreen', '');
    actor.image.setAttribute('mozallowfullscreen', '');
    actor.image.setAttribute('allowFullScreen', '');

    // mediaType = 'vimeo'; // seems to be unused

    actor.image.actor = actor;
    actor.position = { x: startAtX, y: startAtY };
    actor.setSize(width, height);
    actor.vector = { x: 0, y: 0 };

    bindEvent(actor.image, 'mousedown', function () { actor.react() });

    moveActor(actor);
  };
  actor.setup();

  actor.scene = this;
  this.addActor(actor);

  actor.hasLoaded = function(){
    // always treat Vimeo as "loaded", don't wait for it
    return true;
  };

return actor;

};
