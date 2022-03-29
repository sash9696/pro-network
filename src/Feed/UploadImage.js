import React from "react";
import "./UploadImage.css";
import db from "../firebase";
import ClearIcon from "@material-ui/icons/Clear";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import firebase from "firebase/compat/app";

function UploadImage({
	selectedImage,
	setSelectedImage,
	closeUploadImage,
	setCloseUploadImage,
	input,
	setInput,
}) {
	const user = useSelector(selectUser);

	const addPhoto = (e) => {
		setImageToBase64();

		setCloseUploadImage(!closeUploadImage);
	};
	const closeModal = () => {
		setCloseUploadImage(!closeUploadImage);
	};

	function getBase64(file, cb) {
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			cb(reader.result);
		};
		reader.onerror = function (error) {
			console.log("Error: ", error);
		};
	}
	const setImageToBase64 = () => {
		getBase64(selectedImage, (result) => {
			db.collection("posts").add({
				userIdInPost: user?.uid,
				name: user?.displayName,
				description: user?.email,
				message: input,
				photoUrl: user.photoUrl || "",
				likeCount: 0,
				likedBy: [],
				commentCount: 0,
				imageUrl: result,
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			});
		});
		setInput("");
	};

	const removeButton = () => {
		setSelectedImage(null);
		closeModal();
	};

	return (
		<div className="uploadImage_container">
			{selectedImage && (
				<>
					<div className="uploadImage_top">
						<ClearIcon onClick={closeModal} />
					</div>
					<div className="uploadImage">
						<div className="display-image">
							{selectedImage && (
								<div>
									<img
										className="uploadImage-preview"
										alt="not fount"
										src={URL.createObjectURL(selectedImage)}
									/>
									<br />
									<div className="uploadImage-post">
										<input
											value={input}
											onChange={(e) =>
												setInput(e.target.value)
											}
											className="uploadImage-body"
											type="text"
											placeholder="Message goes here"
										/>
									</div>
									<div className="uploadImage-buttons">
										<button onClick={removeButton}>
											Remove
										</button>
										<button onClick={(e) => addPhoto(e)}>
											Post
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default UploadImage;
