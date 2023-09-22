import styled from "@emotion/styled";
import { ListItemButton, ListItemButtonProps } from "@mui/material";
import { ElementType } from "react";

export const CustomListItemButton = styled(ListItemButton)<
	ListItemButtonProps & { component?: ElementType; to?: string }
>({});
