import React from "react";
import "./HeaderOptions.css";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

function HeaderOptions({ avatar, Icon, title, onClick }) {
	const user = useSelector(selectUser);
	return (
		<div onClick={onClick} className="headerOptions_container">
			{Icon && <Icon className="headerOptions_icon" />}
			{avatar && (
				<Avatar className="h" src={user?.photoUrl}>
					{user?.email[0].toUpperCase()}
				</Avatar>
			)}
			<h3>{title}</h3>
		</div>
	);
}

export default HeaderOptions;
