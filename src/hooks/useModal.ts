import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function useModal<T>() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const openModal = (item: T) => {
    setSelectedItem(item);
    setModalOpen(true);
    navigate(`/ingredients/${(item as any)._id}`, { state: { background: location } });
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
    navigate(-1);
  };

  useEffect(() => {
    if (!location.state?.background) {
      setModalOpen(false);
      setSelectedItem(null);
    }
  }, [location]);

  return {
    isModalOpen,
    selectedItem,
    openModal,
    closeModal,
  };
}
