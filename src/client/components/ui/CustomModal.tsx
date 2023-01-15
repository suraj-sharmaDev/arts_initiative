import { XCircleIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { Modal } from "react-daisyui";

interface Props {
  isVisible: boolean;
  toggleVisible?: () => void;
  responsive?: boolean;
  children: React.ReactNode;
}
const CustomModal = ({
  isVisible,
  toggleVisible,
  responsive = true,
  children,
}: Props) => {
  return (
    <Modal
      open={isVisible}
      onClickBackdrop={toggleVisible}
      responsive={responsive}
    >
      {children}
    </Modal>
  );
};

const Header = ({
  className,
  children,
  hasCloseBtn,
  closeBtnAction,
}: {
  className?: string;
  children: React.ReactNode;
  hasCloseBtn?: boolean;
  closeBtnAction?: () => void;
}) => {
  return (
    <Modal.Header className={`${className} flex items-center text-gray-700`}>
      {children}
      {hasCloseBtn && (
        <button className="absolute -top-0 -right-0" onClick={closeBtnAction}>
          <XCircleIcon className="h-8 w-8 text-primary" />
        </button>
      )}
    </Modal.Header>
  );
};

const Body = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <Modal.Body className={`${classNames("pb-20 lg:pb-0", className)}`}>
      {children}
    </Modal.Body>
  );
};

CustomModal.Header = Header;
CustomModal.Body = Body;

export default CustomModal;
