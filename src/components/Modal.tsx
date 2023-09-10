import { Dispatch, SetStateAction } from "react";

interface ModalProps {
	toggle: boolean;
	setToggle: Dispatch<SetStateAction<boolean>>;
	children: JSX.Element | JSX.Element[];
}

const Modal = ({ toggle, setToggle, children }: ModalProps) => {
	return (
		<div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black opacity-50 ">
			<div className="p-4 bg-white rounded">{children}</div>
		</div>
	);
};

export default Modal;
