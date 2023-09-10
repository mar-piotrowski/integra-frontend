interface ProfileDetailProps {
	header: string;
	content: string;
}

const ProfileDetail = ({ header, content }: ProfileDetailProps) => {
	return (
		<div>
			<div className="text-sm text-gray-300">{header}</div>
			<div className="">{content}</div>
		</div>
	);
};

export default ProfileDetail;
