# VoiceControl
Voice input and output for DataFlex WebApps.

ATM, this is limited to use in Chrome and Edge desktop browsers, since they are
the only ones which support the required speech recognition API.  Safari,
Firefox, Opera and Brave do not, nor do any mobile browsers I have tried so 
far.

The core is made up of two classes: cWebSpeechControl (the browser speaks to
you) and cWebVoiceControl (the browser listens to you) in their two respective
.pkg files, and their client-side JavaScript counterparts: WebSpeechControl.js
and WebVoiceControl.js.

The sample "In the bar" view lets you test out the interface - it makes use of
the cOrderParser class, which is a moron-level bit of AI (well, how bright do
you have to be to work behind a bar? <g>) - it thinks gin and tonic are two
seperate drinks, FFS! ;-)

Mike