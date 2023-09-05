interface ContentFlexLayoutProps {
	children: JSX.Element | JSX.Element[];
}
const ContentFlexLayout = ({ children }: ContentFlexLayoutProps) => {
	return (
		<div className="flex p-4 rounded shadow-sm bg-default-white">
			{children}
		</div>
	);
};
export default ContentFlexLayout;
