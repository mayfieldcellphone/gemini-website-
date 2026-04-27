import React, { useState, useEffect, useRef } from 'react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, User, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  isAdmin: boolean;
  timestamp: any;
}

interface ChatWidgetProps {
  onOpenBooking?: () => void;
}

export default function ChatWidget({ onOpenBooking }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedId = localStorage.getItem('mayfield_chat_id');
      const savedName = localStorage.getItem('mayfield_chat_name');
      if (savedId) {
        setChatId(savedId);
        setHasStarted(true);
      }
      if (savedName) setCustomerName(savedName);
    } catch (e) {
      console.warn('LocalStorage not available');
    }
  }, []);

  useEffect(() => {
    if (!chatId) return;

    const q = query(
      collection(db, 'chats', chatId, 'messages'),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];
      setMessages(msgs);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, `chats/${chatId}/messages`);
    });

    return () => unsubscribe();
  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isBotTyping]);

  const getBotResponse = async (userMessage: string, currentChatId: string, nameOverride?: string) => {
    setIsBotTyping(true);
    const activeName = nameOverride || customerName;
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: `You are Mayfield AI, the virtual assistant for Mayfield Phone & Computer Repair.
          
          KNOWLEDGE BASE:
          - Location: 276 Maitland Rd, Mayfield, NSW 2304.
          - Primary Phone: 02 4049 1735.
          - After Hours SMS: 0431 618 100.
          - Opening Hours: Mon-Fri: 9am-5pm, Sat: 10am-4pm, Sun: 10am-2pm.
          - Services: 
              * Phone Repair: Screen, Battery, Charging Port, Back Glass, Water Damage.
              * Laptop/MacBook: Screen replacement, SSD upgrades, Fan/Battery/Keyboard repair.
              * Consoles: HDMI Port repairs for PS5/Xbox, Disc Drive fixing.
              * Others: Data Recovery, iPad/Tablet repairs.
          - Policy: No Fix No Fee. 3-month warranty on most repairs.
          
          TONE & GUIDELINES:
          - Be professional, friendly, and expert.
          - Keep responses concise (1-3 sentences).
          - If the user asks for a price you aren't sure of, ask them to leave their number so a technician can quote them.
          - Inform users they can now "Book Online" using the button in the header to reserve a repair slot instantly.
          - Encourage them to visit the shop at 276 Maitland Rd.
          - Reassure them that a human technician will also see their message soon.
          
          Current Customer: ${activeName}`
        }
      });

      const botText = response.text || "I'm looking into that for you. Our team will be with you shortly!";

      await addDoc(collection(db, 'chats', currentChatId, 'messages'), {
        text: botText,
        senderId: 'mayfield_ai',
        senderName: 'Mayfield AI',
        isAdmin: false,
        timestamp: serverTimestamp()
      });

      await updateDoc(doc(db, 'chats', currentChatId), {
        lastMessage: botText,
        lastUpdatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Bot Error:', error);
    } finally {
      setIsBotTyping(false);
    }
  };

  const startChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) return;

    try {
      const chatRef = await addDoc(collection(db, 'chats'), {
        customerName: customerName.trim(),
        status: 'active',
        createdAt: serverTimestamp(),
        lastUpdatedAt: serverTimestamp(),
        lastMessage: 'Chat started'
      });

      const newId = chatRef.id;
      try {
        localStorage.setItem('mayfield_chat_id', newId);
        localStorage.setItem('mayfield_chat_name', customerName.trim());
      } catch (e) {}
      
      setChatId(newId);
      setHasStarted(true);

      // Initial bot welcome
      await getBotResponse("Hello!", newId, customerName.trim());
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'chats');
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !chatId) return;

    try {
      const text = inputText.trim();
      setInputText('');

      await addDoc(collection(db, 'chats', chatId, 'messages'), {
        text,
        senderId: 'customer',
        senderName: customerName,
        isAdmin: false,
        timestamp: serverTimestamp()
      });

      await updateDoc(doc(db, 'chats', chatId), {
        lastMessage: text,
        lastUpdatedAt: serverTimestamp()
      });

      // Response delay
      setTimeout(() => {
        getBotResponse(text, chatId);
      }, 1500);

    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `chats/${chatId}/messages`);
    }
  };

  return (
    <>
      <button
        id="chat-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all z-50 hover:bg-blue-700"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-[380px] h-[550px] bg-slate-50 rounded-[2.5rem] shadow-2xl z-50 overflow-hidden border border-slate-200 flex flex-col"
          >
            {/* Header */}
            <div className="bg-blue-600 p-6 text-white shrink-0">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                     <Sparkles className="w-5 h-5 text-blue-100" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Mayfield AI</h3>
                    <div className="flex items-center gap-2">
                       <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                       <span className="text-xs font-medium text-blue-100">Technician Assistant Online</span>
                    </div>
                  </div>
               </div>
            </div>

            {!hasStarted ? (
              <div className="flex-1 p-8 flex flex-col justify-center items-center text-center">
                 <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <User className="w-8 h-8" />
                 </div>
                 <h4 className="font-bold text-xl text-slate-900 mb-2">Welcome!</h4>
                 <p className="text-sm text-slate-500 mb-8 italic">Please enter your name to start a live support session with our team.</p>
                 <form onSubmit={startChat} className="w-full space-y-4">
                    <input
                      id="customer-name-input"
                      type="text"
                      placeholder="Your Name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-6 py-4 bg-white rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all text-sm font-medium"
                      required
                    />
                    <button
                      id="start-chat-button"
                      type="submit"
                      className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                    >
                      Start Conversation
                    </button>
                 </form>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col scroll-smooth">
                  {messages.length === 0 && (
                    <div className="flex justify-start">
                      <div className="max-w-[85%] space-y-1 items-start flex flex-col">
                        <div className="p-4 rounded-2xl text-sm font-medium bg-white text-slate-800 shadow-sm border border-slate-100 rounded-tl-none italic">
                          Hi {customerName}! Thanks for reaching out. How can we help you today?
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">System</span>
                      </div>
                    </div>
                  )}
                  {messages.map((msg, idx) => {
                    const isBot = msg.senderId === 'mayfield_ai';
                    const isMe = !msg.isAdmin && !isBot;
                    return (
                      <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] space-y-1 ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                          {!isMe && idx > 0 && messages[idx-1].senderId !== msg.senderId && (
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-1">{msg.senderName}</span>
                          )}
                          <div className={`p-4 rounded-2xl text-sm font-medium ${isMe ? 'bg-blue-600 text-white rounded-tr-none' : isBot ? 'bg-slate-900 text-white rounded-tl-none' : 'bg-white text-slate-800 shadow-sm border border-slate-100 rounded-tl-none group'}`}>
                            {isBot && <Sparkles className="w-3 h-3 text-blue-400 mb-1" />}
                            {msg.text}
                          </div>
                          <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">
                             {msg.timestamp ? format(msg.timestamp.toDate(), 'HH:mm') : 'Sending...'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  {isBotTyping && (
                    <div className="flex justify-start">
                      <div className="max-w-[85%] bg-white p-4 rounded-2xl shadow-sm border border-slate-100 rounded-tl-none flex gap-1">
                        <div className="w-1.5 h-1.5 bg-slate-200 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-1.5 h-1.5 bg-slate-200 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-1.5 h-1.5 bg-slate-200 rounded-full animate-bounce"></div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <form onSubmit={sendMessage} className="p-4 bg-white border-t border-slate-100 flex gap-2">
                  <input
                    id="chat-input"
                    type="text"
                    placeholder="Type a message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="flex-1 px-5 py-3 bg-slate-50 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                  />
                  <button
                    id="send-message-button"
                    type="submit"
                    disabled={!inputText.trim()}
                    className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-all disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
