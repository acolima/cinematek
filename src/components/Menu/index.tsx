import { useNavigate } from "react-router-dom";

import {
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	SwipeableDrawer
} from "@mui/material";
import { HomeRounded, ListAlt, Logout, Search } from "@mui/icons-material";

import { api } from "../../services/api";
import { useAuth, useMenu } from "../../hooks";
import { Avatar, Container, Username } from "./styles";

const menuOptions = [
	{ icon: <HomeRounded />, name: "Home", path: "movies" },
	{ icon: <ListAlt />, name: "Lists", path: "lists" },
	{ icon: <Search />, name: "Search", path: "search" }
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
		<>
			<SwipeableDrawer
				anchor="right"
				open={showMenu}
				onClose={toggleDrawer}
				onOpen={toggleDrawer}
			>
				<Container onClick={toggleDrawer}>
					<List>
						<ListItem disablePadding onClick={() => navigate("/user")}>
							<Avatar alt={auth?.username} src={auth?.pictureUrl} />
							<Username>{auth?.username}</Username>
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
									<Logout />
								</ListItemIcon>
								<ListItemText primary="Logout" />
							</ListItemButton>
						</ListItem>
					</List>
				</Container>
			</SwipeableDrawer>
		</>
	);
}

export default Menu;
