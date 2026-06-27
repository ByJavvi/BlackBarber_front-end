import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';

/**
 * Diálogo de confirmación (ideal para borrados). Maneja su propio estado de carga.
 */
export const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title = 'Confirmar acción',
  message = '¿Estás seguro? Esta acción no se puede deshacer.',
  confirmText = 'Eliminar',
  variant = 'danger',
}) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm?.();
      onClose?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={loading ? undefined : onClose}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="subtle" onClick={onClose} disabled={loading}>Cancelar</Button>
          <Button variant={variant} loading={loading} onClick={handleConfirm}>{confirmText}</Button>
        </>
      }
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-11 h-11 rounded-full bg-red-500/15 border border-red-500/40 flex items-center justify-center animate-gold-glow">
          <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
        </div>
        <p className="text-gray-300 leading-relaxed">{message}</p>
      </div>
    </Modal>
  );
};
