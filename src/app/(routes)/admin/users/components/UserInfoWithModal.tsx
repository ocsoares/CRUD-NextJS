import { AdminUserModal } from "./AdminUserModal";
import { UserInfo } from "./UserInfo";

interface IUserInfoWithModalProps {
  readonly onClick: () => void;
  readonly text: string;
  readonly isModalOpen: boolean;
  readonly handleCloseModal: () => void;
  readonly modalUsername: string;
  readonly defaultValueFirstName: string;
  readonly defaultValueLastName: string;
  readonly defaultValueEmail: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export function UserInfoWithModal({
  onClick,
  text,
  isModalOpen,
  handleCloseModal,
  modalUsername,
  defaultValueFirstName,
  defaultValueLastName,
  defaultValueEmail,
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
        modalUsername={modalUsername}
        defaultValueFirstName={defaultValueFirstName}
        defaultValueLastName={defaultValueLastName}
        defaultValueEmail={defaultValueEmail}
      />
    </>
  );
}
