// Set this to a locally bundled original recording later; null keeps the built-in TTS fallback.
export const ANNOUNCER_ASSET_URL=null;
function voice(){return speechSynthesis.getVoices().find(v=>/^en/i.test(v.lang)&&/(david|mark|guy|male|daniel)/i.test(v.name))||speechSynthesis.getVoices().find(v=>/^en/i.test(v.lang));}
export function announce(text,enabled=true){return new Promise(resolve=>{if(!enabled||!('speechSynthesis'in window)){resolve();return;}const u=new SpeechSynthesisUtterance(text);u.lang='en-US';u.rate=.86;u.pitch=.7;u.volume=.9;u.voice=voice();u.onend=u.onerror=resolve;speechSynthesis.cancel();speechSynthesis.speak(u);setTimeout(resolve,3500);});}
