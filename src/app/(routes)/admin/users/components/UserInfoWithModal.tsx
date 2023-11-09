import { AdminUserModal } from "./AdminUserModal";
import { UserInfo } from "./UserInfo";

interface IUserInfoWithModalProps {
  readonly onClick: () => void;
  readonly text: string;
  readonly isModalOpen: boolean;
  readonly handleCloseModal: () => void;
  readonly username: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export function UserInfoWithModal({
  onClick,
  text,
  isModalOpen,
  handleCloseModal,
  username,
  createdAt,
  updatedAt,
}: IUserInfoWithModalProps) {
  return (
    <>
      <UserInfo
        onClick={onClick}
        text={text}
        createdAt={createdAt}
        updatedAt={updatedAt}
      />
      <AdminUserModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        username={username}
      />
    </>
  );
}
