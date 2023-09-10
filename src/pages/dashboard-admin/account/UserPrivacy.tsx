import LastLoggedDevice from "../../../components/LastLoggedDevice";

const UserPrivacy = () => {
	return (
		<section className="flex flex-col gap-4">
			<>
				<div className="font-semibold text-fontColor">Zabezpieczenia</div>
				<div className="flex items-center text-sm text-fontColor">
					<div className="mr-20">
						<div className="">Hasło</div>
						<div className="">************</div>
					</div>
					<button className="px-4 py-2 text-sm text-white transition-colors bg-primary-600 hover:bg-primary-500 rounded-xl">
						Zmień hasło
					</button>
				</div>
			</>
			<div>
				<div className="mb-4 text-sm font-semibold text-fontColor">
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
				<button className="px-4 py-2 mt-4 text-sm text-white transition-colors bg-primary-600 hover:bg-primary-500 rounded-xl">
					Wyloguj ze wszystkich urządzeń
				</button>
			</div>
		</section>
	);
};

export default UserPrivacy;
