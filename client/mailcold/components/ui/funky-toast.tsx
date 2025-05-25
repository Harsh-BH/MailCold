import { Toast, toast } from 'react-hot-toast';
import React from 'react';

interface FunkyToastProps {
  t: Toast;
  message: string;
  type: 'success' | 'error' | 'loading';
}

export const FunkyToast = ({ t, message, type }: FunkyToastProps) => {
  // Define funky color schemes that match the site's vibrant aesthetic
  const colorSchemes = {
    success: {
      background: '#fff8dc',
      border: '#ff1493',
      text: '#b23575',
      shadow: '4px 4px 0px #b23575',
      iconColor: '#fff'
    },
    error: {
      background: '#fff8dc',
      border: '#ff1493',
      text: '#b23575',
      shadow: '4px 4px 0px #b23575',
      iconColor: '#fff'
    },
    loading: {
      background: '#fff8dc',
      border: '#ff1493',
      text: '#b23575',
      shadow: '4px 4px 0px #b23575',
      iconColor: '#fff'
    }
  };
  
  const scheme = colorSchemes[type];
  
  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <div className="funky-icon-container">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        );
      case 'error':
        return (
          <div className="funky-icon-container">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
        );
      case 'loading':
        return (
          <div className="funky-icon-container">
            <div className="spinner w-8 h-8 border-3 border-t-transparent rounded-full animate-spin"></div>
          </div>
        );
    }
  };

  return (
    <div
      className={`${
        t.visible ? 'animate-bounce-in' : 'animate-bounce-out'
      } max-w-md w-full pointer-events-auto flex items-center justify-between p-5 rounded-xl overflow-hidden`}
      style={{
        background: scheme.background,
        boxShadow: scheme.shadow,
        color: scheme.text,
        transform: t.visible ? 'scale(1)' : 'scale(0.9)',
        opacity: t.visible ? 1 : 0,
        transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
        border: `3px dashed ${scheme.border}`,
        fontFamily: "'Pixelify Sans', sans-serif",
        minWidth: '320px'
      }}
    >
      <div className="flex items-center p-2">
        <div className="flex-shrink-0" style={{ color: scheme.iconColor }}>
          {getIcon()}
        </div>
        <div className="ml-4">
          <p className="text-xl font-bold" style={{ color: scheme.text }}>
            {message}
          </p>
        </div>
      </div>
      <div className="flex">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="funky-close-button rounded-full w-8 h-8 flex items-center justify-center transition-all hover:scale-110"
          style={{ 
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(4px)',
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

// Updated styling to use consistent position
export const showFunkyToast = {
  error: (message: string) => {
    return toast.custom((t) => <FunkyToast t={t} message={message} type="error" />, {
      duration: 5000,
      position: 'bottom-right',
    });
  },
  success: (message: string) => {
    return toast.custom((t) => <FunkyToast t={t} message={message} type="success" />, {
      duration: 5000,
      position: 'bottom-right',
    });
  },
  loading: (message: string) => {
    return toast.custom((t) => <FunkyToast t={t} message={message} type="loading" />, {
      duration: 12000,
      position: 'bottom-right',
    });
  },
};
