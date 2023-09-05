import LastLoggedDevice from "../../../../components/LastLoggedDevice";

const UserPrivacy = () => {
	return (
		<section className="flex flex-col gap-4">
			<>
				<div className="font-semibold text-default-text">Zabezpieczenia</div>
				<div className="flex items-center text-sm text-default-text">
					<div className="mr-20">
						<div className="">Hasło</div>
						<div className="">************</div>
					</div>
					<button className="px-4 py-2 text-sm bg-primary-600 rounded-xl text-default-white">
						Zmień hasło
					</button>
				</div>
			</>
			<div>
				<div className="mb-4 text-sm font-semibold text-default-text">
					Ostatnie logowania
				</div>
				<div className="flex flex-col gap-4">
					<LastLoggedDevice
						device="MacBook Pro"
						localization="Sosnowiec, Poland"
						status={false}
						lastTimeLogged={new Date()}
					/>
					<LastLoggedDevice
						device="Samsung S23 Ultra"
						localization="Sosnowiec, Poland"
						status={true}
						lastTimeLogged={new Date()}
					/>
				</div>
				<button className="px-4 py-2 mt-4 text-sm bg-primary-600 rounded-xl text-default-white">
					Wyloguj ze wszystkich urządzeń
				</button>
			</div>
		</section>
	);
};

export default UserPrivacy;
