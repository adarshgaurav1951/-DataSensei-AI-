/**
 * Voice Assistant Engine: Speech-to-Text (STT) and Text-to-Speech (TTS)
 * Provides hands-free voice interaction, audio frequency visualization,
 * and integration with the 3D Neural Canvas.
 */

class VoiceAssistantService {
  constructor() {
    this.recognition = null;
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.isListening = false;
    this.isSpeaking = false;
    this.voice = null;
    this.onListeningChange = null;
    this.onSpeakingChange = null;
    this.onTranscriptUpdate = null;
    this.onAudioPulse = null;
    this.pulseInterval = null;

    this.initRecognition();
    this.initVoice();
  }

  initVoice() {
    if (!this.synth) return;
    const loadVoices = () => {
      const voices = this.synth.getVoices();
      // Find a crisp, modern natural English voice
      this.voice = 
        voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Daniel') || v.name.includes('Karen'))) ||
        voices.find(v => v.lang.startsWith('en')) ||
        voices[0];
    };

    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = loadVoices;
    }
    loadVoices();
  }

  initRecognition() {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('Web Speech Recognition API is not supported in this browser.');
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.onstart = () => {
      this.isListening = true;
      if (this.onListeningChange) this.onListeningChange(true);
    };

    this.recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      if (this.onTranscriptUpdate) {
        this.onTranscriptUpdate({
          text: finalTranscript || interimTranscript,
          isFinal: Boolean(finalTranscript)
        });
      }
    };

    this.recognition.onerror = (event) => {
      console.warn('Speech recognition error:', event.error);
      this.isListening = false;
      if (this.onListeningChange) this.onListeningChange(false);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (this.onListeningChange) this.onListeningChange(false);
    };
  }

  startListening(onTranscript) {
    if (onTranscript) this.onTranscriptUpdate = onTranscript;
    if (this.isSpeaking) {
      this.stopSpeaking();
    }
    if (this.recognition && !this.isListening) {
      try {
        this.recognition.start();
      } catch (err) {
        console.warn('Failed to start speech recognition:', err);
      }
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (err) {
        console.warn('Failed to stop speech recognition:', err);
      }
    }
  }

  speak(text, onComplete) {
    if (!this.synth) return;
    this.stopSpeaking();

    if (!text || text.trim() === '') return;

    // Clean text of markdown asterisks or code symbols for smooth audio pronunciation
    const cleanSpeech = text
      .replace(/[`*_#]/g, '')
      .replace(/https?:\/\/\S+/g, 'link')
      .replace(/p < 0.05/g, 'p less than 0.05')
      .replace(/PR-AUC/g, 'P R A U C')
      .replace(/XGBoost/g, 'X G Boost')
      .replace(/PyTorch/g, 'Py Torch');

    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    if (this.voice) utterance.voice = this.voice;
    utterance.rate = 1.04; // Confident crisp delivery
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      this.isSpeaking = true;
      if (this.onSpeakingChange) this.onSpeakingChange(true);
      this.startAudioPulseSimulation();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.stopAudioPulseSimulation();
      if (this.onSpeakingChange) this.onSpeakingChange(false);
      if (onComplete) onComplete();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      this.stopAudioPulseSimulation();
      if (this.onSpeakingChange) this.onSpeakingChange(false);
    };

    this.synth.speak(utterance);
  }

  stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
      this.stopAudioPulseSimulation();
      if (this.onSpeakingChange) this.onSpeakingChange(false);
    }
  }

  startAudioPulseSimulation() {
    if (this.pulseInterval) clearInterval(this.pulseInterval);
    this.pulseInterval = setInterval(() => {
      if (this.onAudioPulse) {
        // Generate dynamic waveform bars
        const bars = Array.from({ length: 6 }, () => Math.floor(6 + Math.random() * 22));
        this.onAudioPulse(bars);
      }
    }, 120);
  }

  stopAudioPulseSimulation() {
    if (this.pulseInterval) {
      clearInterval(this.pulseInterval);
      this.pulseInterval = null;
    }
    if (this.onAudioPulse) {
      this.onAudioPulse([4, 4, 4, 4, 4, 4]);
    }
  }
}

export const voiceService = new VoiceAssistantService();
