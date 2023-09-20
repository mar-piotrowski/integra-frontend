import { ThemeOptions, createTheme } from "@mui/material";
import colors from "./_colors.module.scss";
import { componentStyleOverrides } from "./overridedStyles";
import { themePalette } from "./palette";
import { typography } from "./typography";

interface Colors {
	[x: string]: string;
}

export interface ThemeOption {
	colors: Colors;
	heading: string;
	paper: string;
	backgroundDefault: string;
	background: string;
	darkTextPrimary: string;
	darkTextSecondary: string;
	textDark: string;
	menuSelected: string;
	menuSelectedBack: string;
	divider: string;
}

export const themeOption = {
	colors,
	heading: colors.grey900,
	paper: colors.paper,
	backgroundDefault: colors.paper,
	background: colors.primaryLight,
	darkTextPrimary: colors.grey700,
	darkTextSecondary: colors.grey500,
	textDark: colors.grey900,
	menuSelected: colors.secondaryDark,
	menuSelectedBack: colors.secondaryLight,
	divider: colors.grey200,
};

const themeOptions = {
	palette: themePalette(themeOption),
	mixins: {
		toolbar: {
			minHeight: "48px",
			padding: "16px",
			"@media (min-width: 600px)": {
				minHeight: "48px",
			},
		},
	},
	typography: typography(themeOption),
	components: componentStyleOverrides(themeOption),
};

export default createTheme(themeOptions) as ThemeOptions;
