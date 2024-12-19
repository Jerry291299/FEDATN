import React, { useEffect, useState } from "react";
import { IUser } from "./../interface/user";
import { IComment } from "../interface/comment";

const CommentSection: React.FC<{
  productId: string;
  user: IUser | any;
  averageRating: number;
}> = ({ productId, user, averageRating }) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [editingComment, setEditingComment] = useState<IComment | null>(null);
  const [newRating, setNewRating] = useState<number | null>(null);
  const [ratingCounts, setRatingCounts] = useState<number[]>(Array(5).fill(0));
  const [commentCount, setCommentCount] = useState<number>(0);
  const [totalRatings, setTotalRatings] = useState<number>(0);
  const [averageStarRating, setAverageStarRating] = useState<number>(0);

  useEffect(() => {
    const storedComments = localStorage.getItem(`comments_${productId}`);
    if (storedComments) {
      const cmts = JSON.parse(storedComments);
      setComments(cmts);
      updateRatingCounts(cmts);
      updateStatistics(cmts);
    }
  }, [productId]);

  const updateStatistics = (comments: IComment[]) => {
    const count = comments.length;
    const total = comments.reduce(
      (sum: number, comment: IComment) => sum + (comment.rating || 0),
      0
    );
    setCommentCount(count);
    setTotalRatings(total);
    setAverageStarRating(count > 0 ? total / count : 0);
  };

  const updateRatingCounts = (comments: IComment[]) => {
    const counts = Array(5).fill(0);
    comments.forEach((comment) => {
      if (comment.rating) {
        counts[comment.rating - 1] += 1;
      }
    });
    setRatingCounts(counts);
  };

  const saveComments = (updatedComments: IComment[]) => {
    setComments(updatedComments);
    localStorage.setItem(
      `comments_${productId}`,
      JSON.stringify(updatedComments)
    );
    updateStatistics(updatedComments);
  };

  const handleAddComment = () => {
    if (newComment.trim() && newRating !== null) {
      const newCommentObj: IComment = {
        id: comments.length > 0 ? comments[comments.length - 1].id + 1 : 1,
        user: user.role === "admin" ? "Admin" : user.info.name,
        text: newComment.trim(),
        createdAt: new Date(),
        name: user.info.name,
        rating: newRating,
        productId: productId,
      };

      saveComments([...comments, newCommentObj]);
      setNewComment("");
      setNewRating(null);
    }
  };

  const handleEditComment = (comment: IComment) => {
    setEditingComment(comment);
  };

  const handleUpdateComment = () => {
    if (editingComment && editingComment.text.trim()) {
      const updatedComments = comments.map((comment) =>
        comment.id === editingComment.id
          ? {
              ...comment,
              text: editingComment.text.trim(),
              rating: editingComment.rating,
            }
          : comment
      );
      saveComments(updatedComments);
      setEditingComment(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
  };

  const handleDeleteComment = (id: number) => {
    const updatedComments = comments.filter((comment) => comment.id !== id);
    saveComments(updatedComments);
  };

  return (
    <div className="comment-section bg-gray-100 p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Bình luận</h2>
      {/* <p className="text-lg font-semibold">Số lần bình luận: {commentCount}</p>
      <p className="text-lg font-semibold">Tổng số đánh giá: {totalRatings}</p>
      <p className="text-lg font-semibold">
        Đánh giá trung bình: {averageStarRating.toFixed(1)} sao
      </p> */}
      <div className="my-2">
        <span className="font-bold text-gray-600">Đánh giá trung bình : </span>
        <span className="text-yellow-500" style={{ fontSize: "1.5em" }}>
          {Array.from({ length: 5 }, (_, index) => {
            if (index < Math.floor(averageStarRating)) {
              return <span key={index}>&#9733;</span>; // Full star
            } else if (
              index === Math.floor(averageStarRating) &&
              averageStarRating % 1 >= 0.5
            ) {
              return <span key={index}>&#9733;</span>; // Half star as full for clarity
            }
            return (
              <span key={index} className="text-gray-400">
                &#9734;
              </span> // Empty star
            );
          })}
        </span>
        <span className="text-gray-600"> ({comments.length} đánh giá)</span>
      </div>

      {/* <div className="rating-counts mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <div key={star} className="flex items-center">
            <span className="text-yellow-400">{"★".repeat(star)}</span>
            <span className="ml-2 text-gray-700">
              {ratingCounts[star - 1]} đánh giá
            </span>
          </div>
        ))}
      </div> */}

      <div className="comments mb-4 space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="comment flex items-center p-4 bg-white rounded-lg shadow-md"
            >
              {editingComment && editingComment.id === comment.id ? (
                <div className="flex flex-col w-full space-y-2">
                  <textarea
                    value={editingComment.text}
                    onChange={(e) =>
                      setEditingComment({
                        ...editingComment,
                        text: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded-md p-2 w-full"
                  />
                  <div className="flex justify-start items-center space-x-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div key={star}>
                        <input
                          type="radio"
                          id={`${star}-stars`}
                          name="rating"
                          value={star}
                          className="hidden"
                          checked={editingComment.rating === star}
                          onChange={() =>
                            setEditingComment({
                              ...editingComment,
                              rating: star,
                            })
                          }
                        />
                        <label
                          htmlFor={`${star}-stars`}
                          className="text-yellow-400 text-2xl cursor-pointer hover:scale-110"
                        >
                          ★
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleUpdateComment}
                      className="bg-green-500 text-white px-4 py-2 rounded-md"
                    >
                      Cập nhật
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-300 px-4 py-2 rounded-md"
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col w-full">
                  <span className="text-lg font-semibold">{comment.name}</span>
                  <p className="text-yellow-400">
                    {"★".repeat(comment.rating || 0)}
                  </p>
                  <p className="text-gray-700">{comment.text}</p>
                  <p className="text-xs text-gray-500">
                    {comment.createdAt.toLocaleString()}
                  </p>
                  {(user.info.name === comment.name ||
                    user.role === "admin") && (
                    <div className="flex space-x-2 mt-2">
                      <button
                        className="text-yellow-500"
                        onClick={() => handleEditComment(comment)}
                      >
                        Chỉnh sửa
                      </button>
                      <button
                        className="text-red-500"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        Xóa
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">Chưa có bình luận nào.</p>
        )}
      </div>
      <div className="add-comment mt-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Thêm bình luận..."
          className="border border-gray-300 rounded-md p-2 w-full"
        />
        <div className="flex justify-start items-center space-x-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <div key={star}>
              <input
                type="radio"
                id={`new-${star}-stars`}
                name="newRating"
                value={star}
                className="hidden"
                checked={newRating === star}
                onChange={() => setNewRating(star)}
              />
              <label
                htmlFor={`new-${star}-stars`}
                className="text-yellow-400 text-2xl cursor-pointer hover:scale-110"
              >
                ★
              </label>
            </div>
          ))}
        </div>
        <button
          onClick={handleAddComment}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Gửi bình luận
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
