import React, { useState } from 'react';

export default function useModal(): { onToggleModal: () => void; isOpen: boolean } {
  const [isOpen, setIsOpen] = useState(false);

  const onToggleModal = () => {
    setIsOpen(!isOpen);
  };

  return {
    onToggleModal,
    isOpen,
  };
}
