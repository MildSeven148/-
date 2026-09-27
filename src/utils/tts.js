/* 浏览器 TTS 朗读工具（沉浸式听力 / 口语辅助） */
export function speak(text, lang, rate = 1) {
  if (!('speechSynthesis' in window)) return false;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang || 'en-US';
    u.rate = rate;
    const voices = window.speechSynthesis.getVoices();
    if (voices.length) {
      const prefix = (lang || 'en-US').split('-')[0].toLowerCase();
      const v = voices.find((v) => v.lang.replace('_', '-').toLowerCase().startsWith(prefix));
      if (v) u.voice = v;
    }
    window.speechSynthesis.speak(u);
    return true;
  } catch (e) {
    return false;
  }
}

export function stopSpeak() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}
