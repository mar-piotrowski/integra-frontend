interface ProfileImageProps {
	size: "sx" | "sm" | "l";
}

const styles = {
	size: {
		sx: "w-[30px] h-[30px]",
		sm: "w-[60x] h-[60px]",
		l: "w-[80px] h-[80px]",
	},
};

const ProfileImage = ({ size }: ProfileImageProps) => {
	const createStyles = `rounded-full ${styles.size[size]} bg-primary-600`;
	return <img className={createStyles} />;
};

export default ProfileImage;
