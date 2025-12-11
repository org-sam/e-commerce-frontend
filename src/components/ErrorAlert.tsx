import { AlertTriangle, RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ApiError } from '@/types/product';

interface ErrorAlertProps {
  error: ApiError;
  onRetry?: () => void;
  onDismiss?: () => void;
}

export function ErrorAlert({ error, onRetry, onDismiss }: ErrorAlertProps) {
  return (
    <div className="animate-slide-up rounded-xl border border-destructive/30 bg-destructive/10 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-destructive/20">
          <AlertTriangle className="h-5 w-5 text-destructive" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-foreground">{error.message}</h4>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                Error Code: {error.code}
              </p>
            </div>
            {onDismiss && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onDismiss}
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          {error.details && (
            <p className="mt-2 text-sm text-muted-foreground">
              {error.details}
            </p>
          )}
          
          {onRetry && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="mt-3"
            >
              <RefreshCw className="h-4 w-4" />
              Retry Connection
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
