import React, { useEffect, useState } from "react";
import "./Feed.css";
import CreateIcon from "@material-ui/icons/Create";
import ImageIcon from "@material-ui/icons/Image";
import InputItems from "./InputItems";
import Posts from "./Posts";
import db from "../firebase";
import firebase from "firebase/compat/app";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import FlipMove from "react-flip-move";
import UploadImage from "./UploadImage";

function Feed({ search }) {
	const user = useSelector(selectUser);
	const [selectedImage, setSelectedImage] = useState(null);
	const [input, setInput] = useState("");
	const [posts, setPosts] = useState([]);
	const [olderPosts, setOlderPosts] = useState([]);
	const [cantDeleteOthersPost, setCantDeleteOthersPost] = useState(false);
	const [postDeletionSuccess, setPostDeletionSuccess] = useState(false);
	const [updatedMessage, setUpdatedMessage] = useState("");
	const [postUpdationSuccess, setPostUpdationSuccess] = useState(false);
	const [cantUpdateOthersPost, setCantUpdateOthersPost] = useState(false);
	const [imageUrl, setImageUrl] = useState("");
	const [scrollVisible, setScrollVisible] = useState(false);
	const [closeUploadImage, setCloseUploadImage] = useState(false);
	useEffect(() => {
		getPosts();
		db.collection("posts")
			.orderBy("timestamp", "desc")
			.onSnapshot((snapshot) => {
				setPosts(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						data: doc.data(),
					}))
				);
			});
	}, []);
	useEffect(() => {}, []);
	const getPosts = () => {
		async function postData(url = "") {
			const response = await fetch(url);
			return response.json();
		}
		postData(
			"https://mocki.io/v1/6e441185-0ffc-49c7-ae5f-a5a0b2787b56"
		).then((data) => {
			setOlderPosts(data.posts);
		});
	};

	const sendPost = (e) => {
		e.preventDefault();
		if (input) {
			db.collection("posts").add({
				userIdInPost: user?.uid,
				name: user?.displayName,
				description: user?.email,
				message: input,
				photoUrl: user.photoUrl || "",
				likeCount: 0,
				likedBy: [],
				commentCount: 0,
				imageUrl: imageUrl,
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			});
		} else {
			alert("Post cannot be empty.");
		}
		setImageUrl("");
		setInput("");
	};

	const likeThePost = (id, likeCount) => {
		db.collection("posts")
			.doc(id)
			.update({
				likeCount: likeCount + 1,
				likedBy: firebase.firestore.FieldValue.arrayUnion(user.uid),
			});
	};

	const dislikeThePost = (id, likeCount) => {
		db.collection("posts")
			.doc(id)
			.update({
				likeCount: likeCount - 1,
				likedBy: firebase.firestore.FieldValue.arrayRemove(user.uid),
			});
	};

	const onlikePost = (id, likedBy, likeCount) => {
		if (likedBy.includes(user.uid)) {
			dislikeThePost(id, likeCount);
		} else {
			likeThePost(id, likeCount);
		}
	};

	const showCantDeleteOthersPost = () => (
		<div className="feed_cant_delete_others_post">
			You can't delete someone else's post
		</div>
	);

	const showPostDeleted = () => (
		<div className="feed_post_deleted">Post deleted successfully</div>
	);

	const updateThePost = (id, userIdInPost) => {
		if (userIdInPost === user.uid) {
			if (updatedMessage) {
				db.collection("posts")
					.doc(id)
					.update({
						message: updatedMessage,
					})
					.then(() => {
						setPostUpdationSuccess(true);
						postUpdated();
						setUpdatedMessage("");
					})
					.catch((err) => {
						console.log(err);
					});
			} else {
				alert("Post cannot be empty.");
			}
		} else {
			setCantUpdateOthersPost(true);
			cantUpdatePost();
			setUpdatedMessage("");
		}
	};

	const showPostUpdated = () => {
		<div className="feed_post_deleted">Post updated successfully</div>;
	};

	const showCantUpdateOthersPost = () => (
		<div className="feed_cant_delete_others_post">
			You can't update someone else's post
		</div>
	);

	const postUpdated = () => {
		setTimeout(() => {
			setPostUpdationSuccess(false);
		}, 4000);
	};

	const cantUpdatePost = () => {
		setTimeout(() => {
			setCantUpdateOthersPost(false);
		}, 4000);
	};

	const toggleVisible = () => {
		const scrolled = document.documentElement.scrollTop;
		if (scrolled > 300) {
			setScrollVisible(true);
		} else if (scrolled <= 300) {
			setScrollVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	window.addEventListener("scroll", toggleVisible);

	return (
		<div className="feed_container">
			{cantDeleteOthersPost && showCantDeleteOthersPost()}
			{postDeletionSuccess && showPostDeleted()}
			{postUpdationSuccess && showPostUpdated()}
			{cantUpdateOthersPost && showCantUpdateOthersPost()}
			{scrollVisible && (
				<button onClick={scrollToTop} className="back-to-top">
					&#8679;
				</button>
			)}
			<div className="container">
				<div className="input_container">
					<CreateIcon />
					<form>
						<input
							value={input}
							onChange={(e) => setInput(e.target.value)}
							type="text"
						/>
						<button onClick={sendPost} type="submit">
							Post
						</button>
					</form>
				</div>
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
								setCloseUploadImage(true);
							}}
						/>
						<span>
							<InputItems
								Icon={ImageIcon}
								title="Photo"
								color="#70B5F9"
								type="file"
								accept="video/*"
							/>
						</span>
					</div>
				</div>
				{closeUploadImage && (
					<UploadImage
						input={input}
						setInput={setInput}
						sendPost={(e) => sendPost(e)}
						imageUrl={imageUrl}
						setImageUrl={setImageUrl}
						selectedImage={selectedImage}
						setSelectedImage={setSelectedImage}
						closeUploadImage={closeUploadImage}
						setCloseUploadImage={setCloseUploadImage}
					/>
				)}
			</div>
			<FlipMove>
				{posts
					.filter((msg) =>
						msg?.data.name
							?.toLowerCase()
							.includes(search.toLowerCase())
					)
					.map(
						({
							id,
							data: {
								name,
								description,
								message,
								photoUrl,
								likeCount,
								likedBy,
								commentCount,
								userIdInPost,
								imageUrl,
							},
						}) => (
							<Posts
								key={id}
								id={id}
								name={name}
								description={description}
								message={message}
								photoUrl={photoUrl}
								likedBy={likedBy}
								comment={commentCount}
								imageUrl={imageUrl}
								userIdInPost={userIdInPost}
								postDeletionSuccess={postDeletionSuccess}
								setPostDeletionSuccess={setPostDeletionSuccess}
								cantDeleteOthersPost={cantDeleteOthersPost}
								setCantDeleteOthersPost={
									setCantDeleteOthersPost
								}
								showCantDeleteOthersPost={
									showCantDeleteOthersPost
								}
								hasUserLikedThePost={likedBy?.includes(
									user.uid
								)}
								onLikeClick={() =>
									onlikePost(id, likedBy, likeCount)
								}
								updatedMessage={updatedMessage}
								setUpdatedMessage={setUpdatedMessage}
								updateThePost={() =>
									updateThePost(id, userIdInPost)
								}
								usersPost={userIdInPost === user.uid}
							/>
						)
					)}
			</FlipMove>
		</div>
	);
}

export default Feed;
