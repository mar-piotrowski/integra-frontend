import ProfileDetail from "../../../components/ProfileDetail";
import ProfileImage from "../../../components/ProfileImage";

const UserProfile = () => {
	return (
		<section className="flex flex-col gap-10 text-fontColor">
			<div className="flex items-center gap-4">
				<ProfileImage size="l" />
				<div>
					<div className="font-semibold">Wander Grinder</div>
					<div className="text-sm font-medium">Sales director</div>
					<div className="text-sm font-light">Sosnowiec, Poland</div>
				</div>
			</div>
			<div>
				<h1 className="mb-3 text-lg font-semibold">Informacje ogólne</h1>
				<div className="grid grid-cols-2 gap-x-20 gap-y-3">
					<ProfileDetail header="email" content="marcin@gmail.com" />
					<ProfileDetail header="email" content="marcin@gmail.com" />
					<ProfileDetail header="email" content="marcin@gmail.com" />
					<ProfileDetail header="email" content="marcin@gmail.com" />
					<ProfileDetail header="email" content="marcin@gmail.com" />
				</div>
			</div>
			<div>
				<h1 className="mb-3 text-lg font-semibold">Dane adresowe</h1>
				<div className="grid grid-cols-3 gap-x-20 gap-y-3">
					<ProfileDetail header="email" content="marcin@gmail.com" />
					<ProfileDetail header="email" content="marcin@gmail.com" />
					<ProfileDetail header="email" content="marcin@gmail.com" />
					<ProfileDetail header="email" content="marcin@gmail.com" />
					<ProfileDetail header="email" content="marcin@gmail.com" />
				</div>
			</div>
			<div>
				<h1 className="mb-3 text-lg font-semibold">Dane szczegółowe</h1>
				<div className="grid grid-cols-4 gap-x-20 gap-y-3">
					<ProfileDetail header="email" content="marcin@gmail.com" />
					<ProfileDetail header="email" content="marcin@gmail.com" />
					<ProfileDetail header="email" content="marcin@gmail.com" />
					<ProfileDetail header="email" content="marcin@gmail.com" />
					<ProfileDetail header="email" content="marcin@gmail.com" />
				</div>
			</div>
			<div>
				<h1 className="mb-3 text-lg font-semibold">Numery identyfikacyjne</h1>
				<div className="grid grid-cols-4 gap-x-20 gap-y-3">
					<ProfileDetail header="email" content="marcin@gmail.com" />
					<ProfileDetail header="email" content="marcin@gmail.com" />
					<ProfileDetail header="email" content="marcin@gmail.com" />
					<ProfileDetail header="email" content="marcin@gmail.com" />
					<ProfileDetail header="email" content="marcin@gmail.com" />
				</div>
			</div>
		</section>
	);
};

export default UserProfile;
