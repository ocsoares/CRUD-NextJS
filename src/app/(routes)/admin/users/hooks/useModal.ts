import { useState } from "react";

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean[]>([false]);

  const handleOpenModal = (index: number) => {
    handleModalChanges(index, true);
  };

  const handleCloseModal = (index: number) => {
    handleModalChanges(index, false);
  };

  const handleModalChanges = (index: number, value: boolean) => {
    const items = [...isModalOpen];

    items[index] = value;

    setIsModalOpen(items);
  };

  return {
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
  };
};
