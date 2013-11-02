function compatibleBrowser(url){

  // console.log("Browser: " + BrowserDetect.browser);
  // console.log("Version: " + BrowserDetect.version);
  // console.log("Operating System: " + BrowserDetect.OS);

  var isCompatible = false;

  if (BrowserDetect.browser === 'Chrome') {
    if (BrowserDetect.version >= 27) isCompatible = true;
  };

  if (BrowserDetect.browser === 'Explorer') {
    if (BrowserDetect.version >= 9) isCompatible = true;
  };

  if (BrowserDetect.browser === 'Firefox') {
    if (BrowserDetect.version >= 22) isCompatible = true;
  };

  if (BrowserDetect.browser === 'Safari') {
    if (BrowserDetect.version >= 6) isCompatible = true;
  };


  if (!isCompatible) console.warn("Current Platform is incompatible with Animation.io.");
  return isCompatible;
}