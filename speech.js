export function supportsRecognition() { return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition); }
export function createRecognition({ onStart, onResult, onError, onEnd }) {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) return null;
  const recognition = new Recognition(); recognition.lang = 'en-US'; recognition.interimResults = false; recognition.maxAlternatives = 1; recognition.continuous = true;
  recognition.onstart = onStart;
  recognition.onresult = event => onResult(event.results[0][0].transcript);
  recognition.onerror = event => onError(event.error);
  recognition.onend = onEnd;
  return recognition;
}
export function englishVoices() { return speechSynthesis.getVoices().filter(v => v.lang.toLowerCase().startsWith('en')); }
export function speak(text, rate = 1, voiceUri = '', { onStart, onEnd } = {}) { const utterance = new SpeechSynthesisUtterance(text); utterance.lang = 'en-US'; utterance.rate = rate; const voices = englishVoices(); const voice = voices.find(v => v.voiceURI === voiceUri) || voices[0]; if (voice) utterance.voice = voice; utterance.onstart = onStart; utterance.onend = onEnd; utterance.onerror = onEnd; speechSynthesis.cancel(); speechSynthesis.speak(utterance); return Boolean(voice); }
