export interface ToastProps {
    message: string;
    type: ToastType;
    onClose: () => void;
}

export interface ToastContextType {
    showToast: (message: string, type: ToastType) => void;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';
