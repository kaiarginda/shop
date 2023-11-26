"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
const CommentInput = ({ postID, author }) => {
  const router = useRouter();

  const [comment, setComment] = useState("");

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({
        comment,
        postID,
        parentId: Date.now() + Math.random(),
        onroot: "root",
        author,
      }),
    });
    setComment("");
    router.refresh();
  };

  return (
    <div>
      <form
        onSubmit={formSubmitHandler}
        className="bg-white p-4 rounded-md shadow-md"
      >
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-4 py-2 text-gray-950 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          placeholder="Add a comment..."
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default CommentInput;
