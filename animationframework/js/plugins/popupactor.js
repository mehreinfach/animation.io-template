Scene.prototype.createPopUpActor = function (URI, startAtX, startAtY, width, height) {
    var actor = new Actor(startAtX, startAtY, width, height);
    actor.filename = actor.URI = URI;
    actor.actortype = "popup";

    actor.setup = function () {
        actor.image = document.createElement('IFRAME');
        actor.image.setAttribute('class', 'popupiframe');
        actor.image.setAttribute('src', actor.URI);
        // actor.image.setAttribute('scrolling', 'yes');
        // actor.image.style.border = '0';
        // actor.image.style.zIndex = '0';
        // mediaType = 'popup'; // seems to be unused

        actor.image.actor = actor;
        actor.position = { x: startAtX, y: startAtY };
        actor.setSize(width, height);
        actor.vector = { x: 0, y: 0 };

        // bindEvent(actor.image, 'mousedown', function () { actor.react() });
        actor.hasLoaded = function(){
            return true;
        };

        moveActor(actor);
    };
    actor.setup();

    actor.scene = this;
    this.addActor(actor);
    return actor;
};