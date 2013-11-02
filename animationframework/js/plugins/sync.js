Actor.prototype.setSynckey = function(synckey) {
	// clean the synckey
	var cleanSynckey = synckey.match(/[A-Za-z-_0-9]/g).join("");

	if (cleanSynckey !== synckey) {
		console.warn(synckey + ' uses characters not acceptable in Synckey, was changed to ' + cleanSynckey + '.');
	};

	synckey = cleanSynckey;

  this.synckey = synckey;
  // console.log("setting synckey " + synckey);
  return this;
};

Actor.prototype.syncs = function(){
  return (typeof this.synckey != 'undefined');
};