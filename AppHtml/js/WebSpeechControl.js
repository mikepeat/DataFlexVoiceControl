/*
Class:
    uig.WebSpeechControl
Extends:
    df.WebBaseControl

This is the client-side representation of the cWebSpeechControl
    
Revision:
    2021-06-17 (MJP, UIG)
        Initial version.
*/

// Define uig Namespace:
if (!uig){
    var uig = {};
}

uig.WebSpeechControl = function WebSpeechControl(sName, oParent){
    uig.WebSpeechControl.base.constructor.call(this, sName, oParent);
    
    this.prop(df.tInt,    "piVoice", 0);
    this.prop(df.tNumber, "piVolume", 1);   // 0 to 1
    this.prop(df.tNumber, "piRate", 1);     // 0.1 to 10
    this.prop(df.tNumber, "piPitch", 1);    // 0 to 2 
};

/*
This class is the implementation of the client-side part of the WebVoiceControl object.
*/
df.defineClass("uig.WebSpeechControl", "df.WebBaseControl", {

speak : function(sWords){
    var that = this;

    try {
        var msg = new SpeechSynthesisUtterance(sWords);
    } catch(e) {
        this.serverAction("OnSpeachError", ["Sorry - speech is not supported in this browser"])
        return;
    }

    var voices = window.speechSynthesis.getVoices()
    var voice = this.piVoice;

    msg.voice   = voices[voice];
    msg.volume  = this.piVolume;
    msg.rate    = this.piRate;
    msg.pitch   = this.piPitch;

    msg.onend = (function(){
        that.serverAction("OnSpeechEnded");
    });

    window.speechSynthesis.speak(msg);
},

voicesSerializer : df.sys.vt.generateSerializer([df.tString]),

getVoices : function(){
    var aVoices = [];

    window.speechSynthesis.getVoices().forEach(function(voice){
        aVoices.push(voice.name);
    });

    var ser = this.voicesSerializer(aVoices);

    this.serverAction("OnGetVoices", [], ser, null);
}

});
