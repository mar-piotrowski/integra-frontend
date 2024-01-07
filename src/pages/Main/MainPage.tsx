import React from "react";
import MainNavBar from "./components/MainNavBar";
import { Box, CssBaseline } from "@mui/material";
import Footer from "./footer/Footer";
import ModulesSection from "./modulesSection/ModulesSection";
import TrustedCompaniesSection from "./trustedCompaniesSection/TrustedCompaniesSection";
import WelcomeSection from "./welcomeSection/WelcomeSection";

const MainPage = () => {
	return (
		<>
			<CssBaseline />
			<MainNavBar />
			<Box
				component="main"
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: 10,
					marginTop: "80px",
					width: "100%",
				}}>
				<WelcomeSection />
				<TrustedCompaniesSection />
				<ModulesSection />
				<Footer />
			</Box>
		</>
	);
};

export default MainPage;
