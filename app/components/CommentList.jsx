import React from "react";
import Comment from "../models/Comments";
import IndividualComment from "../components/IndividualComment";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import { connectMongoDB } from "../mongodb";

const CommentList = async ({ productId }) => {
  await connectMongoDB();
  const comments = await Comment.find({ root: "root" });
  const allComments = await Comment.find();

  const cookieStore = cookies();
  const token = cookieStore.get("OutSideJWT");
  let user = null; // Initialize user as null

  if (token) {
    user = verify(token.value, "secret");
    // console.log(user, "verify");
  }
  // console.log(user, "from ficking asdfasufasfasd");
  return (
    <div key={Math.random()} className="bg-slate-900">
      {comments.map((comment) => {
        if (comment.productId !== productId) {
          return null; // Return null to skip rendering
        }
        return (
          <IndividualComment
            comment={comment}
            parentId={comment._id}
            productId={productId}
            allComments={allComments}
            loggedUser={user} // Pass user to loggedUser
          />
        );
      })}
    </div>
  );
};

export default CommentList;
