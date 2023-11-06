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
        username={"COLOCAR Nome vindo do Banco de Dados !"} // Passar como PROPRIEDADE pra passar no "AdminUserActions" !!!
      />
    </>
  );
}
