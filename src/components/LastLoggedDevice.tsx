import { FiMonitor } from "react-icons/fi";

interface LastLoggedDeviceProps {
	device: string;
	localization: string;
	status: boolean;
	lastTimeLogged: Date;
}

const LastLoggedDevice = ({
	device,
	localization,
	status,
	lastTimeLogged,
}: LastLoggedDeviceProps) => {
	const deviceStatus = status ? (
		<div className="text-green-500">Aktualnie</div>
	) : (
		<div className="text-orange-500">
			{lastTimeLogged.getMinutes()} minut temu
		</div>
	);

	return (
		<div className="flex items-center gap-4">
			<FiMonitor className="text-3xl " />
			<div className="text-sm">
				<div className="flex gap-2 font-medium text-default-text dark:text-default-white">
					<div>{device}</div>
					<div>{localization}</div>
				</div>
				{deviceStatus}
			</div>
		</div>
	);
};

export default LastLoggedDevice;
