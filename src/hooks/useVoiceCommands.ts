import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import global from '../../config/Global.json';

interface VoiceCommand {
  command: string;
  action: (data?: any) => void;
}

export const useVoiceCommands = (commands: VoiceCommand[]) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');

  const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

  const startListening = useCallback(() => {
    if (!SpeechRecognition) {
      setError('Speech Recognition not supported');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = async (event) => {
      const text = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join('')
        .toLowerCase();

      setTranscript(text);

      try {
        const response = await axios.post(
          `${global.api.host}/api/v1/voice-command/`,
          { command: text },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')!).access : ''}`
            }
          }
        );

        const matchedCommand = commands.find(cmd => 
          text.includes(cmd.command.toLowerCase())
        );

        if (matchedCommand) {
          matchedCommand.action(response.data);
        }
      } catch (err) {
        console.error('Voice command error:', err);
      }
    };

    recognition.onerror = (event) => {
      setError(`Error: ${event.error}`);
    };

    recognition.start();
  }, [commands, SpeechRecognition]);

  return { isListening, transcript, error, startListening };
};
