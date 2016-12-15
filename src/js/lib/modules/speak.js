/**
* @Author: Stijn Van Hulle <stijnvanhulle>
* @Date:   2016-12-13T21:53:36+01:00
* @Email:  me@stijnvanhulle.be
* @Last modified by:   stijnvanhulle
* @Last modified time: 2016-12-13T22:11:11+01:00
* @License: stijnvanhulle.be
*/

export default function(text) {
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();

  const msg = new SpeechSynthesisUtterance(text);
  msg.voice = voices.filter(function(voice) {
    return voice.name === `Alex`;
  })[0];
  synth.speak(msg);
}
