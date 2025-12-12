import React from 'react';
import { Service } from '../types';
import { ServiceIcon } from './icons';

interface ServiceButtonProps {
  service: Service;
  onClick: (service: Service) => void;
  disabled: boolean;
}

const serviceColors: Record<Service, { bg: string, text: string, hoverBg: string, ring: string }> = {
  [Service.Phone]: { bg: 'bg-sky-500', text: 'text-white', hoverBg: 'hover:bg-sky-600', ring: 'focus:ring-sky-400' },
  [Service.WhatsApp]: { bg: 'bg-emerald-500', text: 'text-white', hoverBg: 'hover:bg-emerald-600', ring: 'focus:ring-emerald-400' },
  [Service.Viber]: { bg: 'bg-violet-600', text: 'text-white', hoverBg: 'hover:bg-violet-700', ring: 'focus:ring-violet-500' },
  [Service.GoogleVoice]: { bg: 'bg-teal-500', text: 'text-white', hoverBg: 'hover:bg-teal-600', ring: 'focus:ring-teal-400' },
};

export const ServiceButton: React.FC<ServiceButtonProps> = ({ service, onClick, disabled }) => {
  const colors = serviceColors[service];

  return (
    <button
      onClick={() => onClick(service)}
      disabled={disabled}
      className={`
        flex flex-col items-center justify-center p-4 rounded-lg
        shadow-lg transition-all duration-200 ease-in-out
        transform hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800
        ${colors.bg} ${colors.text} ${colors.hoverBg} ${colors.ring}
        disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:opacity-50
      `}
    >
      <ServiceIcon service={service} className="w-10 h-10 mb-2" />
      <span className="font-semibold text-sm">{service}</span>
    </button>
  );
};
