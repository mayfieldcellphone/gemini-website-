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
    speak(response);

    // Trigger booking modal if user wants to book
    if (response.toLowerCase().includes("opened the booking form") || 
        response.toLowerCase().includes("fill in your details")) {
      setTimeout(() => openBooking(), 2000);
    }
  };

  const speak = (text: string) => {
    // Cancel any current speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-AU';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    // Try to find a nice local voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.includes('en-AU') && v.name.includes('Natural')) 
                          || voices.find(v => v.lang.includes('en-AU'))
                          || voices[0];
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    window.speechSynthesis.speak(utterance);
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
                <Sparkles className="w-4 h-4" />
                <span className="font-bold text-sm tracking-tight uppercase">Mayfield AI Concierge</span>
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
                        className="w-1 bg-blue-500 rounded-full"
                      />
                    ))}
                  </div>
                  <p className="text-slate-500 text-sm italic">Listening to you...</p>
                  <p className="text-slate-800 font-medium">{transcript || "Speak now..."}</p>
                </div>
              ) : isProcessing ? (
                <div className="space-y-4">
                  <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto" />
                  <p className="text-slate-500 text-sm">Thinking...</p>
                </div>
              ) : aiResponse ? (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                  <Volume2 className="w-8 h-8 text-blue-600 mx-auto opacity-50" />
                  <p className="text-slate-800 text-sm leading-relaxed">{aiResponse}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
                    <Mic className="w-8 h-8 text-blue-600 opacity-20" />
                  </div>
                  <p className="text-slate-500 text-xs px-4">Tap the mic and tell me what's wrong with your phone.</p>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="p-6 bg-slate-50 flex justify-center">
              <button
                onClick={toggleListening}
                disabled={isProcessing}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                  isListening 
                    ? 'bg-red-500 scale-110 shadow-red-200' 
                    : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'
                }`}
                id="voice-mic-button"
              >
                {isListening ? <MicOff className="w-7 h-7 text-white" /> : <Mic className="w-7 h-7 text-white" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all text-blue-600 border border-slate-100 pointer-events-auto group relative"
        id="toggle-voice-assistant"
      >
        <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <Sparkles className="w-6 h-6" />
        <span className="absolute -top-10 right-0 bg-slate-900 text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">VOICE AI</span>
      </button>
    </div>
  );
};

export default VoiceAssistant;
