"use client";
import { useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
const UserPage = ({ user, loggedUser }) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [modalList, setModalList] = useState([]);
  const [modalTitle, setModalTitle] = useState("");

  const handleFollowers = () => {
    setModalList(user.followers);
    setModalTitle("Followers");
    setShowModal(true);
  };

  const handleFollowing = () => {
    setModalList(user.following);
    setModalTitle("Following");
    setShowModal(true);
  };

  const handleFollow = async (e) => {
    await fetch("/api/follow", {
      method: "PATCH",
      body: JSON.stringify({
        followerUsername: loggedUser.username,
        following: user,
      }),
    });

    router.refresh();
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 m-10">
      <div className="flex items-center">
        {/* <img
          // src={user.profileImage}
          alt={`${user.username}'s Profile`}
          className="h-16 w-16 rounded-full object-cover"
        /> */}
        <h1 className="text-2xl font-semibold">{user.username}</h1>
        <div className="ml-4">
          {/* <p className="text-gray-500">{user.bio}</p> */}
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <ul className="flex justify-between">
          <div className="flex">
            <li className="mr-4 cursor-pointer" onClick={handleFollowers}>
              <span className="font-semibold">{user.followers.length}</span>{" "}
              Followers
            </li>
            <li className="mr-4 cursor-pointer" onClick={handleFollowing}>
              <span className="font-semibold">{user.following.length}</span>{" "}
              Following
            </li>
            <div>
              {user.username == loggedUser.username ? null : (
                <li className="mr-4">
                  {user.followers.includes(loggedUser.username) ? (
                    <button
                      onClick={handleFollow}
                      className="px-4 py-2 bg-red-500 text-white rounded-full focus:outline-none focus:ring focus:ring-red-200 transform hover:scale-105"
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      onClick={handleFollow}
                      className="px-4 py-2 bg-green-500 text-white rounded-full focus:outline-none focus:ring focus:ring-green-200 transform hover:scale-105"
                    >
                      Follow
                    </button>
                  )}
                </li>
              )}
            </div>
          </div>
        </ul>
      </div>
      {/* Add more user details or content here */}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white w-96 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">{modalTitle}</h2>
            <ul>
              {modalList.map((item) => (
                <Link href={`/user/${item}`} key={item}>
                  {item}
                </Link>
              ))}
            </ul>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full focus:outline-none focus:ring focus:ring-blue-200 transform hover:scale-105"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
