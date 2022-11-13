import { toast as toastify, TypeOptions } from 'react-toastify';

interface ToastProps {
  content: string;
  type?: TypeOptions;
}

export function toast({ content, type }: ToastProps) {
  return toastify(content, {
    position: 'top-center',
    theme: 'light',
    type: type || 'success',
  });
}
