import React, { useState, useMemo } from 'react';
import { ServiceButton } from './components/ServiceButton';
import { Service } from './types';

const App: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const services: Service[] = [
    Service.Phone,
    Service.WhatsApp,
    Service.Viber,
    Service.GoogleVoice,
  ];

  const isNumberValid = useMemo(() => {
    // A simple validation: at least 5 digits, ignoring any formatting characters.
    return phoneNumber.replace(/\D/g, '').length >= 5;
  }, [phoneNumber]);

  const handleDial = (service: Service) => {
    if (!isNumberValid) return;

    let url: string;
    // Sanitize number by removing spaces, dashes, and parentheses. Keep the '+' if present.
    const sanitizedNumber = phoneNumber.replace(/[\s-()]/g, '');

    switch (service) {
      case Service.Phone:
        url = `tel:${sanitizedNumber}`;
        break;
      case Service.WhatsApp:
        // The wa.me link requires only digits, without the leading '+'.
        url = `https://wa.me/${sanitizedNumber.replace('+', '')}`;
        break;
      case Service.Viber:
        // The viber protocol can handle the '+' for international numbers.
        url = `viber://call?number=${encodeURIComponent(sanitizedNumber)}`;
        break;
      case Service.GoogleVoice:
        // The Google Voice web app can handle the '+' for international numbers.
        url = `https://voice.google.com/u/0/calls?a=nc,${encodeURIComponent(sanitizedNumber)}`;
        break;
      default:
        console.error('Unknown service selected');
        return;
    }

    window.location.href = url;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white flex items-center justify-center p-4 font-sans">
      <main className="w-full max-w-sm mx-auto bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 space-y-6 border border-gray-700">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-sky-400">
            Direct Dialer
          </h1>
          <p className="text-gray-400 mt-2">Enter a number and choose a service to call.</p>
        </div>

        <div className="relative">
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="e.g., +1 555 123 4567"
            className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-lg text-lg text-center text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {services.map((service) => (
            <ServiceButton
              key={service}
              service={service}
              onClick={handleDial}
              disabled={!isNumberValid}
            />
          ))}
        </div>

        <div className="text-center text-xs text-gray-500 pt-4">
          <p>This app attempts to open the selected calling service on your device. Standard call and data rates may apply.</p>
        </div>
      </main>
    </div>
  );
};

export default App;
