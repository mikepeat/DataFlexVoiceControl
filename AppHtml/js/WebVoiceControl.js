/*
Class:
    uig.WebVoiceControl
Extends:
    df.WebBaseControl

This is the client-side representation of the cWebVoiceControl
    
Revision:
    2021-06-16 (MJP, UIG)
        Initial version.
*/

// Define uig Namespace:
if (!uig){
    var uig = {};
}

uig.WebVoiceControl = function WebVoiceControl(sName, oParent){
    uig.WebVoiceControl.base.constructor.call(this, sName, oParent);
    
    this.prop(df.tInt,    "piListenFor", 0);
    this.prop(df.tBool,   "pbInterimResults", false);
    this.prop(df.tString, "psLanguage", "");
    this.prop(df.tInt,    "piMaxAlternatives", 1);
    this.prop(df.tBool,   "pbStopOnResult", false)

    // ServerOnXxxx settings
    this.prop(df.tBool, "pbServerOnStart", false);
    this.prop(df.tBool, "pbServerOnEnd", false);
    this.prop(df.tBool, "pbServerOnAudioStart", false);
    this.prop(df.tBool, "pbServerOnAudioEnd", false);
    this.prop(df.tBool, "pbServerOnError", false);
    this.prop(df.tBool, "pbServerOnNoMatch", false);
    this.prop(df.tBool, "pbServerOnResult", true);
    this.prop(df.tBool, "pbServerOnSoundStart", false);
    this.prop(df.tBool, "pbServerOnSoundEnd", false);
    this.prop(df.tBool, "pbServerOnSpeechStart", false);
    this.prop(df.tBool, "pbServerOnSpeechEnd", false);

    // @privates
    this._bListening = false;
};

/*
This class is the implementation of the client-side part of the WebVoiceControl object.
*/
df.defineClass("uig.WebVoiceControl", "df.WebBaseControl", {

startListening : function(){
    var that = this, SpeechRecognition, recognition;

    try {
        SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || SpeechRecognition;
        recognition = new SpeechRecognition();
    } catch(e) { // Looks like we can't do speech recognition here. :-(
        this.serverAction("OnVoiceError", ["Sorry - voice input is not supported in this browser"])
        return;
    }

    // Configure speech recognition:
    recognition.continuous      = !this.piListenFor;  // 0 = continuous; anything else has a limit
    recognition.interimResults  = this.pbInterimResults;
    recognition.maxAlternatives = this.piMaxAlternatives;
    recognition.lang            = this.psLanguage;

    // Trap the various speech recognition events:
    recognition.onstart = function(){
        that._bListening = true;

        if (that.piListenFor){
            setTimeout(function(){
                recognition.stop();
            }, that.listenFor);
        }

        if (that.pbServerOnStart){
            that.serverAction("OnVoiceStart");
        }
    }

    recognition.onend = function(){
        recognition = null;
        that._bListening = false;

        if (that.pbServerOnEnd){
            that.serverAction("OnVoiceOnEnd");
        }
    }

    recognition.onresult = function(event) {
        var current = event.resultIndex;
        var transcript = event.results[current][0].transcript;

        if (that.pbStopOnResult){
            recognition.stop();
        }

        if (that.pbServerOnResult){
            that.serverAction("OnVoiceReceived", [transcript]);
        }

    }

    recognition.onerror = function(e){
        var err = e.error;

        if (that.pbServerOnError){
            that.serverAction("OnVoiceError", [err]);
        }
    }

    recognition.onnomatch = function(){
        if (that.pbServerOnNoMatch){
            that.serverAction("OnVoiceNoMatch");
        }
    }

    recognition.onaudiostart = function(){
        if (that.pbServerOnAudioStart){
            that.serverAction("OnVoiceAudioStart")
        }
    }

    recognition.onaudioend = function(){
        if (that.pbServerOnAudioEnd){
            that.serverAction("OnVoiceAudioEnd")
        }
    }

    recognition.onsoundstart = function(){
        if (that.pbServerOnSoundStart){
            that.serverAction("OnVoiceSoundStart")
        }
    }

    recognition.onsoundend = function(){
        if (that.pbServerSoundEnd){
            that.serverAction("OnVoiceSoundEnd")
        }
    }

    recognition.onspeechstart = function(){
        if (that.pbServerOnSpeechStart){
            that.serverAction("OnVoiceSpeechStart")
        }
    }

    recognition.onspeechend = function(){
        if (that.pbServerOnSpeechEnd){
            that.serverAction("OnVoiceSpeechEnd")
        }
    }

    // Start speech recognition:
    if (!this._bListening){
        recognition.start();
    }

},

// stopListening : function(){

//     if (this._eRecognition) {
//         this._eRecognition.stop();
//     }

// }

});