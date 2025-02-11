import { useState } from 'react';

export function useOrderModal() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
}
