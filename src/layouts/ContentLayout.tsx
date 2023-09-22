interface ContentFlexLayoutProps {
	children: JSX.Element | JSX.Element[];
}
const ContentLayout = ({ children }: ContentFlexLayoutProps) => {
	return (
		<main className="flex p-4 bg-white rounded dark:bg-dark-background-ligher">
			{children}
		</main>
	);
};
export default ContentLayout;
