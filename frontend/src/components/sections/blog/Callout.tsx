'use client';

import { Info, AlertTriangle, CheckCircle, Lightbulb, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type CalloutType = 'info' | 'warning' | 'success' | 'tip' | 'danger';

interface CalloutProps {
  type: CalloutType;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const calloutConfig = {
  info: {
    icon: Info,
    bgColor: 'from-blue-50 to-blue-100/50',
    borderColor: 'border-blue-200',
    iconColor: 'text-blue-600',
    titleColor: 'text-blue-900',
    textColor: 'text-blue-800',
  },
  warning: {
    icon: AlertTriangle,
    bgColor: 'from-yellow-50 to-yellow-100/50',
    borderColor: 'border-yellow-200',
    iconColor: 'text-yellow-600',
    titleColor: 'text-yellow-900',
    textColor: 'text-yellow-800',
  },
  success: {
    icon: CheckCircle,
    bgColor: 'from-green-50 to-green-100/50',
    borderColor: 'border-green-200',
    iconColor: 'text-green-600',
    titleColor: 'text-green-900',
    textColor: 'text-green-800',
  },
  tip: {
    icon: Lightbulb,
    bgColor: 'from-purple-50 to-purple-100/50',
    borderColor: 'border-purple-200',
    iconColor: 'text-purple-600',
    titleColor: 'text-purple-900',
    textColor: 'text-purple-800',
  },
  danger: {
    icon: AlertCircle,
    bgColor: 'from-red-50 to-red-100/50',
    borderColor: 'border-red-200',
    iconColor: 'text-red-600',
    titleColor: 'text-red-900',
    textColor: 'text-red-800',
  },
};

export function Callout({ type, title, children, className }: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;

  const defaultTitles = {
    info: 'Информация',
    warning: 'Внимание',
    success: 'Успех',
    tip: 'Совет',
    danger: 'Важно',
  };

  return (
    <div
      className={cn(
        'my-6 p-6 rounded-2xl border-l-4',
        'bg-gradient-to-br backdrop-blur-sm',
        config.bgColor,
        config.borderColor,
        'shadow-sm',
        className
      )}
    >
      <div className="flex gap-4">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div className={cn('p-2 rounded-lg bg-white/50', config.iconColor)}>
            <Icon className="w-6 h-6" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Title */}
          {(title || defaultTitles[type]) && (
            <h4 className={cn('font-bold text-lg mb-2', config.titleColor)}>
              {title || defaultTitles[type]}
            </h4>
          )}

          {/* Children Content */}
          <div className={cn('text-sm leading-relaxed', config.textColor)}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Convenience components for each type
export function InfoCallout({ title, children, className }: Omit<CalloutProps, 'type'>) {
  return <Callout type="info" title={title} className={className}>{children}</Callout>;
}

export function WarningCallout({ title, children, className }: Omit<CalloutProps, 'type'>) {
  return <Callout type="warning" title={title} className={className}>{children}</Callout>;
}

export function SuccessCallout({ title, children, className }: Omit<CalloutProps, 'type'>) {
  return <Callout type="success" title={title} className={className}>{children}</Callout>;
}

export function TipCallout({ title, children, className }: Omit<CalloutProps, 'type'>) {
  return <Callout type="tip" title={title} className={className}>{children}</Callout>;
}

export function DangerCallout({ title, children, className }: Omit<CalloutProps, 'type'>) {
  return <Callout type="danger" title={title} className={className}>{children}</Callout>;
}

