import { useContext } from "react";
import { MenuContext } from "../contexts/menuDrawerContext";

export default function useMenu() {
	const menuContext = useContext(MenuContext);

	if (!menuContext) {
		throw new Error("useMenu must be used inside a MenuContext Provider");
	}

	return menuContext;
}
