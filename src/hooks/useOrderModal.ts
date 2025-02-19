import { useState } from 'react';

export function useOrderModal() {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

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