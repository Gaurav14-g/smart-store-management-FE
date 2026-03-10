import { useState, useRef, useEffect } from 'react';
import Toast from './Toast';
import axios from 'axios';
import global from '../../config/Global.json';

interface VoiceCommandButtonProps {
  commands?: Array<{ command: string; action: (data?: any) => void }>;
}

export default function VoiceCommandButton({ commands }: VoiceCommandButtonProps) {
  const [isListening, setIsListening] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState<'info' | 'danger'>('info');
  const [responseData, setResponseData] = useState<any>(null);
  const recognitionRef = useRef<any>(null);
  const autoStartRef = useRef(true);

  const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  };

  const processCommand = async (text: string) => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        setToastMessage('Not authenticated');
        setToastVariant('danger');
        setShowToast(true);
        return;
      }

      const token = JSON.parse(authToken).access;

      const response = await axios.post(
        `${global.api.host}/api/v1/voice-command/`,
        { command: text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const message = response.data.message || 'Command executed';
      setResponseData(response.data);
      if (response.data.success !== false) {
        setToastMessage(` ${message}`);
        setToastVariant('info');
        speak(message);
        if (response.data.action === 'add_product' || response.data.action === 'update_product') {
          setTimeout(() => window.location.reload(), 1500);
        }
      } else {
        setToastMessage(` ${message}`);
        setToastVariant('danger');
        speak(message);
      }
    } catch (err: any) {
      console.error('Error:', err);
      const errorMsg = err.response?.data?.message || 'Failed to process command';
      setToastMessage(` ${errorMsg}`);
      setToastVariant('danger');
      setResponseData(null);
      speak(errorMsg);
    }
    setShowToast(true);
  };

  const startListening = () => {
    if (!SpeechRecognition) {
      setToastMessage('Speech Recognition not supported');
      setToastVariant('danger');
      setShowToast(true);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setToastMessage(' Listening...');
      setToastVariant('info');
      setShowToast(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = async (event: any) => {
      const text = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join('')
        .toLowerCase();

      setToastMessage(`Heard: "${text}"`);
      setShowToast(true);

      await processCommand(text);
    };

    recognition.onerror = (event: any) => {
      setToastMessage(`Error: ${event.error}`);
      setToastVariant('danger');
      setShowToast(true);
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  useEffect(() => {
    if (autoStartRef.current) {
      autoStartRef.current = false;
      const timer = setTimeout(() => startListening(), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <button
        className={`btn btn-lg rounded-circle ${isListening ? 'btn-danger' : 'btn-primary'}`}
        onClick={startListening}
        disabled={isListening}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '70px',
          height: '70px',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}
        title="Click to use voice commands"
      >
        <i className={`bi bi-${isListening ? 'mic-fill' : 'mic'}`} style={{ fontSize: '1.5rem' }}></i>
      </button>

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        variant={toastVariant}
      />

      {responseData && (
        <div
          style={{
            position: 'fixed',
            bottom: '120px',
            right: '30px',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '15px',
            maxWidth: '300px',
            maxHeight: '400px',
            overflowY: 'auto',
            zIndex: 999,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}
        >
          {responseData.products && responseData.products.length > 0 && (
            <div>
              <h6 className="mb-2">Products:</h6>
              {responseData.products.map((product: any, idx: number) => (
                <div key={idx} className="mb-2 pb-2" style={{ borderBottom: '1px solid #eee' }}>
                  <strong>{product.name}</strong>
                  <div className="text-muted small">
                    Stock: {product.stock || product.quantity}
                    {product.price && ` | Price: ${product.price}`}
                  </div>
                </div>
              ))}
            </div>
          )}
          {responseData.total_revenue !== undefined && (
            <div>
              <div><strong>Revenue:</strong> {responseData.total_revenue}</div>
              <div><strong>Bills:</strong> {responseData.total_bills}</div>
            </div>
          )}
          {responseData.total_products !== undefined && (
            <div>
              <div><strong>Products:</strong> {responseData.total_products}</div>
              <div><strong>Customers:</strong> {responseData.total_customers}</div>
              <div><strong>Low Stock:</strong> {responseData.low_stock_products}</div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
