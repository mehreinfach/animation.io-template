function config(animation) {
  animation.config = {
    maximumAnimationAge: minutesToMilliseconds(120),
    waitForServer: 1000,
    waitingText: "loading data from server",
    maximumLoadWait: minutesToMilliseconds(1.5),
    maximumLoadWaitExceededMessage1: "Die maximale Ladezeit von 90 Sekunden wurde erreicht. Die Szene wird jetzt angezeigt. Folgende Objekte haben keine Lade-Rückmeldung gegeben:\n",
    maximumLoadWaitExceededMessage2: "\n\nMöchten Sie eine E-Mail an Mehreinfach senden mit wichtigen Infos zu diesen Ladeproblemen?",
    cdnDomain: "http://merlantiscdn.animation.io"
  }
}
var developermode = false;