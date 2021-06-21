# VoiceControl
Voice input and output for DataFlex WebApps.

Note: all files are DataFlex 20.0, so Unicode (UTF-8).

ATM, this is limited to use in Chrome and Edge desktop browsers, since they are
the only ones which support the required speech recognition API.  Safari,
Firefox, Opera and Brave do not, nor do any mobile browsers I have tried so 
far.

The core is made up of two classes: cWebSpeechControl (the browser speaks to
you) and cWebVoiceControl (the browser listens to you) in their two respective
.pkg files, and their client-side JavaScript counterparts: WebSpeechControl.js
and WebVoiceControl.js.

The sample "In the bar" view lets you test out the interface.  It makes use of
the cOrderParser class, which is a moron-level bit of AI (well, how bright do
you have to be to work behind a bar? <g>  Not really a challenger to Jarvis or
SkyNet, I'm afraid!) - it thinks gin and tonic are two separate drinks! ;-)

It offers a choice of bartenders (different in the different browsers),
although for the best bar experience I'd stick to the English speakers! ;-)

Mike