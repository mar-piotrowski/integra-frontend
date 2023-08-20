import { useEffect, useRef, useState } from "react";

type AccordionProps = {
	children: JSX.Element | JSX.Element[];
	isOpen: boolean;
};

const Accordion = ({ children, isOpen }: AccordionProps) => {
	const [childrenHeight, setChildrenHeight] = useState(0);
	const elementRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (elementRef.current == null) return;
		setChildrenHeight(elementRef.current.clientHeight);
	}, []);

	return (
		<div
			className={`overflow-hidden transition-max-height ease-linear`}
			style={{ maxHeight: isOpen ? childrenHeight : 0 }}
		>
			<div ref={elementRef}>{children}</div>
		</div>
	);
};

export default Accordion;
