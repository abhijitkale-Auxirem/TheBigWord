import React from 'react';
import { AlertTriangle, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'default';
  loading?: boolean;
}

const variantConfig = {
  danger: { icon: <AlertTriangle className="w-6 h-6 text-red-500" />, btnClass: 'bg-red-500 hover:bg-red-600 text-white border-0', iconBg: 'bg-red-100' },
  warning: { icon: <AlertTriangle className="w-6 h-6 text-yellow-500" />, btnClass: 'bg-yellow-500 hover:bg-yellow-600 text-white border-0', iconBg: 'bg-yellow-100' },
  default: { icon: <AlertTriangle className="w-6 h-6 text-primary" />, btnClass: 'gradient-primary text-white border-0', iconBg: 'bg-primary/10' },
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open, onClose, onConfirm, title, description,
  confirmLabel = 'Confirm', cancelLabel = 'Cancel',
  variant = 'default', loading = false,
}) => {
  if (!open) return null;
  const config = variantConfig[variant];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fade-in-scale">
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-muted transition-colors">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
        <div className={`w-14 h-14 ${config.iconBg} rounded-2xl flex items-center justify-center mb-5`}>
          {config.icon}
        </div>
        <h3 className="font-heading font-bold text-xl mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{description}</p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1 rounded-xl" disabled={loading}>{cancelLabel}</Button>
          <Button onClick={onConfirm} className={`flex-1 rounded-xl ${config.btnClass}`} disabled={loading}>
            {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
