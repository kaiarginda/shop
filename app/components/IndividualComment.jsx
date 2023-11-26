"use client";

import { useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
const IndividualComment = ({
  comment,
  parentId,
  productId,
  allComments,
  loggedUser,
}) => {
  const router = useRouter();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");

  const toggleReplyForm = () => {
    setShowReplyForm(!showReplyForm);
  };

  const handleReplyTextChange = (event) => {
    setReplyText(event.target.value);
  };

  const submitReply = async (com) => {
    if (loggedUser) {
      await fetch("/api/reply", {
        method: "POST",
        body: JSON.stringify({
          reply: replyText,
          parentId,
          productId,
          root: "no",
          author: loggedUser.username,
        }),
      });
    }

    setReplyText("");
    setShowReplyForm(false);
    router.refresh();
  };

  return (
    <div
      key={comment._id}
      className="border rounded-lg p-4 my-4 shadow-md transition duration-300 ease-in-out transform "
    >
      {comment.author}
      <h1 className="text-lg font-bold mb-2 text-blue-800">{comment.text}</h1>
      <button
        className="text-blue-500 hover:underline transition duration-300 ease-in-out transform "
        onClick={toggleReplyForm}
      >
        Reply
      </button>
      {showReplyForm && (
        <div className="mt-4">
          <textarea
            value={replyText}
            onChange={handleReplyTextChange}
            className="w-full p-2 border rounded-md text-black"
            placeholder="Your reply..."
          />
          <button
            onClick={() => {
              submitReply(comment);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600 transition duration-300 ease-in-out transform "
          >
            Submit Reply
          </button>
        </div>
      )}

      {allComments.map((com) => {
        if (com.parentId === comment._id) {
          return (
            <IndividualComment
              key={com._id}
              allComments={allComments}
              parentId={com._id}
              productId={productId}
              comment={com}
              loggedUser={loggedUser}
            />
          );
        }
      })}
    </div>
  );
};

export default IndividualComment;
