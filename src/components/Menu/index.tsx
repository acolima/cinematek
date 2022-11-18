import { useNavigate } from "react-router-dom";

import {
	Avatar,
	Box,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	SwipeableDrawer,
	Typography
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ListAltIcon from "@mui/icons-material/ListAlt";

import { api } from "../../services/api";
import { useAuth, useMenu } from "../../hooks";
import styles from "./styles";

const menuOptions = [
	{ icon: <HomeRoundedIcon />, name: "Movies", path: "movies" },
	{ icon: <ListAltIcon />, name: "Lists", path: "lists" }
];

function Menu() {
	const { toggleDrawer, showMenu } = useMenu();

	const { auth, signOut } = useAuth();

	let navigate = useNavigate();

	function handleLogout() {
		api.validateToken(auth!.token).then(() => {
			signOut();
			navigate("/");
		});
	}

	return (
		<div>
			<SwipeableDrawer
				anchor="right"
				open={showMenu}
				onClose={toggleDrawer}
				onOpen={toggleDrawer}
			>
				<Box sx={styles.listBox} onClick={toggleDrawer}>
					<List>
						<ListItem disablePadding onClick={() => navigate("/user")}>
							<Avatar
								alt={auth?.username}
								src={auth?.pictureUrl}
								sx={styles.avatar}
							/>
							<Typography sx={styles.username}>{auth?.username}</Typography>
						</ListItem>
					</List>

					<Divider />

					<List>
						{menuOptions.map((option) => (
							<ListItem
								key={option.name}
								disablePadding
								onClick={() => navigate(`/${option.path}`)}
							>
								<ListItemButton>
									<ListItemIcon>{option.icon}</ListItemIcon>
									<ListItemText primary={option.name} />
								</ListItemButton>
							</ListItem>
						))}
					</List>

					<Divider />

					<List>
						<ListItem disablePadding onClick={handleLogout}>
							<ListItemButton>
								<ListItemIcon>
									<LogoutIcon />
								</ListItemIcon>
								<ListItemText primary="Logout" />
							</ListItemButton>
						</ListItem>
					</List>
				</Box>
			</SwipeableDrawer>
		</div>
	);
}

export default Menu;
