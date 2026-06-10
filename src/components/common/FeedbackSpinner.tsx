import React from 'react';
import { Loader2 } from 'lucide-react';

interface FeedbackSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  fullScreen?: boolean;
}

const FeedbackSpinner: React.FC<FeedbackSpinnerProps> = ({ size = 'md', label, fullScreen = false }) => {
  const sizeClasses = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-10 h-10' };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-50 animate-fade-in">
        <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center shadow-xl animate-bounce-soft">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
        {label && <p className="mt-4 text-sm font-medium text-muted-foreground">{label}</p>}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Loader2 className={`${sizeClasses[size]} text-primary animate-spin`} />
      {label && <span className="text-sm text-muted-foreground">{label}</span>}
    </div>
  );
};

export default FeedbackSpinner;
