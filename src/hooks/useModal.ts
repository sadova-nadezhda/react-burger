import { useState } from 'react';

export function useModal<T>() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const openModal = (item: T) => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  return {
    isModalOpen,
    selectedItem,
    openModal,
    closeModal,
  };
}