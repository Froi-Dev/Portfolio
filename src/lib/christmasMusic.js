// A soft music-box arrangement of the traditional public-domain carol.
export function createChristmasMusic(volume = .85, onPlaybackChange = () => {}) {
  const Audio = window.AudioContext || window.webkitAudioContext;
  if (!Audio) throw new Error('Web Audio is unavailable');
  const audio = new Audio();
  const master = audio.createGain();
  master.gain.value = volume;
  const compressor = audio.createDynamicsCompressor();
  compressor.threshold.value = -12; compressor.knee.value = 12;
  compressor.ratio.value = 3; compressor.attack.value = .006; compressor.release.value = .2;
  master.connect(compressor); compressor.connect(audio.destination);
  let playing = false, wanted = false, timer, nextEvent = 0, startTime = 0, epoch = 0;
  const voices = new Set();
  const beat = .43;
  // Traditional "We Wish You a Merry Christmas", arranged for soft music-box tones.
  const melody = [
    ['D4',1],['G4',1],['G4',.5],['A4',.5],['G4',.5],['F#4',.5],['E4',1],['E4',1],
    ['E4',1],['A4',1],['A4',.5],['B4',.5],['A4',.5],['G4',.5],['F#4',1],['D4',1],
    ['D4',1],['B4',1],['B4',.5],['C5',.5],['B4',.5],['A4',.5],['G4',1],['E4',1],
    ['D4',.5],['D4',.5],['E4',1],['A4',1],['F#4',1],['G4',2],['R',1],
    ['D4',1],['G4',1],['G4',1],['G4',1],['F#4',2],['F#4',1],['G4',1],['F#4',1],['E4',1],['D4',2],
    ['A4',1],['B4',1],['A4',.5],['A4',.5],['G4',1],['G4',1],['D5',1],['D4',.5],['D4',.5],['E4',1],['A4',1],['F#4',1],['G4',2],['R',3]
  ];
  const events = []; let duration = 0;
  melody.forEach(([note, beats]) => { if (note !== 'R') events.push({ time: duration, note, duration: beats * beat, volume: .28 }); duration += beats * beat; });
  const chords = [['G3','B3','D4'],['C3','E3','G3'],['A3','C4','E4'],['D3','F#3','A3']];
  for (let t = beat; t < duration - 2 * beat; t += 3 * beat) {
    const chord = chords[Math.floor(t / (3 * beat)) % chords.length];
    chord.forEach((note, index) => events.push({ time: t + index * .035, note, duration: 2 * beat, volume: .045 }));
  }
  events.sort((a, b) => a.time - b.time);
  function frequency(note) {
    const [, pitch, sharp, octave] = /^([A-G])(#?)(\d)$/.exec(note);
    const semitones = { C: -9, D: -7, E: -5, F: -4, G: -2, A: 0, B: 2 };
    return 440 * 2 ** ((semitones[pitch] + (sharp ? 1 : 0) + (Number(octave) - 4) * 12) / 12);
  }
  function chime(event, when) {
    const voice = audio.createOscillator(); const envelope = audio.createGain();
    voice.type = 'sine'; voice.frequency.value = frequency(event.note);
    envelope.gain.setValueAtTime(0, when);
    envelope.gain.linearRampToValueAtTime(event.volume, when + .012);
    envelope.gain.exponentialRampToValueAtTime(.0001, when + event.duration + .4);
    voice.connect(envelope); envelope.connect(master);
    voice.start(when); voice.stop(when + event.duration + .45); voices.add(voice);
    voice.onended = () => { voices.delete(voice); voice.disconnect(); envelope.disconnect(); };
  }
  function schedule() {
    if (!playing) return;
    while (startTime + events[nextEvent].time < audio.currentTime + .3) {
      chime(events[nextEvent], startTime + events[nextEvent].time);
      nextEvent++;
      if (nextEvent === events.length) { nextEvent = 0; startTime += duration; }
    }
    timer = setTimeout(schedule, 100);
  }
  function begin() {
    if (playing || !wanted || audio.state !== 'running' || document.hidden) return false;
    playing = true; nextEvent = 0; startTime = audio.currentTime + .06;
    schedule(); onPlaybackChange(true); return true;
  }
  audio.addEventListener('statechange', () => {
    // Some browsers leave resume() pending until they allow sound playback.
    // Start the song when that pending request is eventually granted.
    if (audio.state === 'running') begin();
  });
  function stop() {
    epoch++; wanted = false; playing = false; clearTimeout(timer);
    voices.forEach(voice => { try { voice.stop(); } catch { /* Already ended. */ } });
    voices.clear();
  }
  return {
    async play({ autoplay = false } = {}) {
      const attempt = epoch;
      if (playing) return true;
      wanted = true;
      if (audio.state !== 'running') {
        if (autoplay) {
          // Keep the browser's resume request alive. It may be granted later
          // without another play-button click, depending on site autoplay rules.
          await Promise.race([audio.resume().catch(() => {}), new Promise(resolve => setTimeout(resolve, 200))]);
          if (audio.state !== 'running') return false;
        } else await audio.resume();
      }
      if (audio.state !== 'running' || document.hidden || attempt !== epoch) return false;
      return begin() || playing;
    },
    stop,
    destroy() { stop(); void audio.close(); }
  };
}
