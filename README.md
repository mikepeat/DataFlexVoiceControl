# VoiceControl
Voice input and output for DataFlex WebApps.

Note: all files are DataFlex 20.0, so Unicode (UTF-8).

ATM, this is limited to use in Chrome, Edge and Safari (and Safari puts up a 
bit of a fight! <g>) desktop browsers, since they are the only ones which seem
support the required speech recognition API.  AFAICS, Firefox, Opera and Brave
do not, nor do any mobile browsers I have tried so far.  Brave *should* work,
but ATM the voice input seems to end as soon as it starts, so doesn't.
Firefox and Opera simply don't support the voice recognition API (yet).

The core is made up of two classes: cWebSpeechControl (the browser speaks to
you) and cWebVoiceControl (the browser listens to you) in their two respective
.pkg files, and their client-side JavaScript counterparts: WebSpeechControl.js
and WebVoiceControl.js.

To get things to work in any given browser you may have to allow it to access
your microphone.

The sample "In the bar" view lets you test out the interface.  It makes use of
the cOrderParser class, which is a moron-level bit of AI (well, how bright do
you have to be to work behind a bar? <g>  Not really a challenger to Jarvis or
SkyNet, I'm afraid!) - it thinks gin and tonic are two separate drinks! ;-)

It offers a choice of bartenders (different in the different browsers),
although for the best bar experience I'd stick to the English speakers! ;-)

For the prices for your round of drinks in the currency of your choice, you
will need to get your browser to send the appropriate language code (en-US, 
en-GB, etc.) to the server.  In Chrome you can do this in settings: Advanced;
Language; Add Language; Move to Top.  In Edge it is in Settings; Hambutger
<<<<<<< HEAD
Menu; Languages.  You'll have to reload the web app for that to take effect.
=======
Menu; Languages.  You'll have to reload the web page for it to take effect.
>>>>>>> 6b06816ca9921e4262ee70c9847decaff44f91d0

There are a range of drinks on offer.  I have hard-coded these in an array to
avoid the need to add a database table, but the mechaisim in the cOrderParser
class should be easy to adapt to use such instead.

Mike
