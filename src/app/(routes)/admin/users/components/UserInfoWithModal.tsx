import { AdminUserModal } from "./AdminUserModal";
import { UserInfo } from "./UserInfo";

interface IUserInfoWithModalProps {
  onClick: () => void;
  text: string;
  isModalOpen: boolean;
  handleCloseModal: () => void;
}

export function UserInfoWithModal({
  onClick,
  text,
  isModalOpen,
  handleCloseModal,
}: IUserInfoWithModalProps) {
  return (
    <>
      <UserInfo onClick={onClick} text={text} />
      <AdminUserModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        // ARRUMAR ISSO, pq usando "text" BUGA pq a variável fica FIXA, acho q usar useState resolve !!!!
        username={"COLOCAR !"}
      />
    </>
  );
}
