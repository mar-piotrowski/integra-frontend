import { AiOutlineArrowLeft } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";

const NotFoundPage = () => {
	const navigate = useNavigate();

	return (
		<section className="bg-white dark:bg-gray-900 ">
			<div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
				<div className="flex flex-col items-center max-w-sm mx-auto text-center">
					<p className="p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50 dark:bg-gray-800"></p>
					<h1 className="mt-3 font-semibold text-gray-800 text-8xl">404</h1>
					<p className="mt-4 text-lg font-medium text-gray-500 dark:text-gray-400">
						Nie znaleziono podanej strony!
					</p>
					<p className="ray-500 text-m dark:text-gray-400">
						Skontaktuj się z administratorem
					</p>
					<div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
						<button
							onClick={() => navigate(-1)}
							className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
						>
							<AiOutlineArrowLeft />
							<span>Wróć</span>
						</button>

						<NavLink
							to={"/dashboard"}
							className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 rounded-lg bg-primary-600 hover:bg-primary-500 shrink-0 sm:w-auto"
						>
							Idź do panelu
						</NavLink>
					</div>
				</div>
			</div>
		</section>
	);
};

export default NotFoundPage;
