import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, X, Volume2, Loader2, Sparkles } from 'lucide-react';
import { getVoiceResponse } from '../lib/gemini';
import { useUI } from '../contexts/UIContext';

// Type definitions for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
}

const VoiceAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [history, setHistory] = useState<{ role: string; parts: { text: string }[] }[]>([]);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { openBooking } = useUI();

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-AU'; // Local Newcastle/Australian English

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        setTranscript(transcriptText);
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech Recognition Error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        if (transcript.length > 0) {
          handleAiCall(transcript);
        }
      };

      recognitionRef.current = recognition;
    }
  }, [transcript]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      // Prime the speech synthesis on user gesture to "unlock" audio
      // This is crucial for mobile browsers and strict desktop policies
      try {
        const silentMsg = new SpeechSynthesisUtterance("");
        window.speechSynthesis.speak(silentMsg);
      } catch (e) {
        console.warn("Audio priming failed:", e);
      }
      
      setTranscript('');
      setAiResponse('');
      setIsListening(true);
      recognitionRef.current?.start();
    }
  };

  const handleAiCall = async (text: string) => {
    setIsProcessing(true);
    const response = await getVoiceResponse(text, history);
    
    // Update local history
    const updateHistory = [
      ...history,
      { role: 'user', parts: [{ text }] },
      { role: 'model', parts: [{ text: response }] }
    ];
    setHistory(updateHistory.slice(-6)); // Keep last 3 turns
    
    setAiResponse(response);
    setIsProcessing(false);
    
    // Small delay to let the transcript settle visually
    setTimeout(() => speak(response), 100);

    // Trigger booking modal if user wants to book
    if (response.toLowerCase().includes("opened the booking form") || 
        response.toLowerCase().includes("fill in your details")) {
      setTimeout(() => openBooking(), 3000);
    }
  };

  const speak = (text: string) => {
    if (!window.speechSynthesis) {
      console.error("Speech Synthesis not supported in this browser.");
      return;
    }

    // Cancel any current speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-AU';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    // Function to set voice
    const setVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.lang.includes('en-AU') && (v.name.includes('Natural') || v.name.includes('Google'))) 
                            || voices.find(v => v.lang.includes('en-AU'))
                            || voices.find(v => v.lang.includes('en-GB'))
                            || voices[0];
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      window.speechSynthesis.speak(utterance);
    };

    // Chrome/Safari often load voices asynchronously
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = setVoice;
    } else {
      setVoice();
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 w-80 bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 pointer-events-auto"
            id="voice-assistant-panel"
          >
            {/* Header */}
            <div className="bg-blue-600 p-4 text-white flex justify-between items-center bg-gradient-to-r from-blue-600 to-indigo-600">
              <div className="flex items-center gap-2">
                <Mic className="w-4 h-4" />
                <span className="font-bold text-sm tracking-tight uppercase">Mayfield Voice AI</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-1 rounded-full transition-colors"
                id="close-voice-assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6 h-64 flex flex-col justify-center items-center text-center">
              {isListening ? (
                <div className="space-y-6">
                  <div className="flex justify-center items-center gap-1 h-8">
                    {[1, 2, 3, 4, 5, 2, 1].map((h, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [8, h * 6, 8] }}
                        transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                        className="w-1.5 bg-blue-500 rounded-full"
                      />
                    ))}
                  </div>
                  <p className="text-slate-500 text-sm italic font-medium">Listening to your issue...</p>
                  <p className="text-slate-900 font-bold text-lg">{transcript || "Speak now..."}</p>
                </div>
              ) : isProcessing ? (
                <div className="space-y-4">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Getting Answer...</p>
                </div>
              ) : aiResponse ? (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex justify-center gap-1 mb-2">
                     <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="bg-blue-100 p-2 rounded-full">
                       <Volume2 className="w-6 h-6 text-blue-600" />
                     </motion.div>
                  </div>
                  <p className="text-slate-800 text-sm leading-relaxed font-medium">{aiResponse}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto ring-8 ring-blue-50/50">
                    <Mic className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-slate-900 font-bold mb-1">Voice Help</h3>
                  <p className="text-slate-500 text-xs px-4">"Hey, what time are you open?" or "Can you fix my iPhone 15 screen?"</p>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col items-center gap-4">
              <button
                onClick={toggleListening}
                disabled={isProcessing}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl relative overflow-hidden ${
                  isListening 
                    ? 'bg-red-500 scale-110 shadow-red-200' 
                    : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200 hover:scale-105'
                }`}
                id="voice-mic-button"
              >
                {isListening ? (
                  <MicOff className="w-7 h-7 text-white" />
                ) : (
                  <Mic className="w-7 h-7 text-white" />
                )}
                {isListening && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute inset-0 bg-white/30 rounded-full"
                  />
                )}
              </button>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                {isListening ? 'Stop Listening' : 'Tap to Speak'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 flex items-center gap-3 bg-blue-600 pl-4 pr-6 rounded-full shadow-2xl hover:bg-blue-700 active:scale-95 transition-all text-white pointer-events-auto border-4 border-white/20 group overflow-hidden"
        id="toggle-voice-assistant"
      >
        <div className="relative">
          <Mic className="w-6 h-6 relative z-10" />
          <div className="absolute inset-0 bg-white/40 rounded-full animate-ping"></div>
        </div>
        <span className="font-black text-xs uppercase tracking-widest whitespace-nowrap">Talk to Us</span>
      </button>
    </div>
  );
};

export default VoiceAssistant;
