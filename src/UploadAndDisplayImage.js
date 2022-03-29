import React, { useState } from "react";
import "./UploadAndDisplayImage.css";
import ImageIcon from "@material-ui/icons/Image";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import InputItems from "./Feed/InputItems";

const UploadAndDisplayImage = () => {
	const [selectedImage, setSelectedImage] = useState(null);
	return (
		<div className="display-image">
			<h1>Upload and Display Image usign React Hook's</h1>
			{selectedImage && (
				<div>
					<img
						alt="not fount"
						width={"250px"}
						src={URL.createObjectURL(selectedImage)}
					/>
					<br />
					<button onClick={() => setSelectedImage(null)}>
						Remove
					</button>
				</div>
			)}
			<br />
			<br />

			<div className="input_items">
				<div className="fileUpload">
					<input
						type="file"
						className="upload"
						id="file-selector"
						accept="image/png, image/gif, image/jpeg"
						type="file"
						name="myImage"
						onChange={(event) => {
							setSelectedImage(event.target.files[0]);
						}}
					/>
					<span>
						<InputItems
							Icon={ImageIcon}
							title="Photo"
							color="#70B5F9"
						/>
					</span>
				</div>
				<div className="fileUpload">
					<input type="file" className="upload" accept="video/*" />
					<span>
						<InputItems
							Icon={SubscriptionsIcon}
							title="Video"
							color="#E7A33E"
						/>
					</span>
				</div>
			</div>
		</div>
	);
};

export default UploadAndDisplayImage;
