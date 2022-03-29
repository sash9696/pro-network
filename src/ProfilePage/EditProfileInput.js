import React from "react";
import TextField from "@mui/material/TextField";
import "./EditProfileInput.css";
import Button from "@material-ui/core/Button";

function EditProfileInput({
	label,
	defaultValue,
	setName,
	setEmail,
	nameEditClick,
	emailEditClick,
	editName,
	editEmail,
	updateName,
	updateUserEmail,
}) {
	return (
		<div className="edit_profile_input">
			<TextField
				disabled={label === "Name" ? !nameEditClick : !emailEditClick}
				id="outlined-disabled"
				label={label}
				defaultValue={defaultValue}
				style={{ width: "300px" }}
				type={label !== "Name" ? "email" : "text"}
				onChange={
					label === "Name"
						? (e) => setName(e.target.value)
						: (e) => setEmail(e.target.value)
				}
			/>
			<span>
				<Button
					style={{ border: "none", color: "#0047ab" }}
					variant="outlined"
					onClick={label === "Name" ? editName : editEmail}>
					{label === "Name" ? (
						!nameEditClick ? (
							"Edit"
						) : (
							<p onClick={updateName}>Save</p>
						)
					) : !emailEditClick ? (
						"Edit"
					) : (
						<p onClick={updateUserEmail}>Save</p>
					)}
				</Button>
			</span>
		</div>
	);
}

export default EditProfileInput;
