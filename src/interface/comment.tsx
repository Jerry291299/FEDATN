import React, { useEffect, useState } from "react";
import { IUser } from "./user";

interface Comment {
  id: number;
  user: string; 
  text: string; 
  createdAt: string; 
  name: string;
}

const CommentSection: React.FC<{ 
  productId: string; 
  user: IUser | any;
}> = ({ 
  productId, 
  user
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [editingComment, setEditingComment] = useState<Comment | null>(null);

  useEffect(() => {
    const storedComments = localStorage.getItem(`comments_${productId}`);
    if (storedComments) {
      const cmts = JSON.parse(storedComments);
      setComments(cmts);
    }   
  }, [productId]);

  const saveComments = (updatedComments: Comment[]) => {
    setComments(updatedComments);
    localStorage.setItem(`comments_${productId}`, JSON.stringify(updatedComments));
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj: Comment = {
        id: comments.length > 0 ? comments[comments.length - 1].id + 1 : 1,
        user: user.role === "admin" ? "Admin" : user.info.name,
        text: newComment.trim(),
        createdAt: new Date().toLocaleString(),
        name: user.info.name,
      };
      saveComments([...comments, newCommentObj]);
      setNewComment("");
    }
  };

  const handleEditComment = (comment: Comment) => {
    setEditingComment(comment);
  };

  const handleUpdateComment = () => {
    if (editingComment && editingComment.text.trim()) {
      const updatedComments = comments.map((comment) =>
        comment.id === editingComment.id
          ? { ...comment, text: editingComment.text.trim() }
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
      <div className="comments mb-4 space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment flex items-center p-4 bg-white rounded-lg shadow-md">
              {editingComment && editingComment.id === comment.id ? (
                <div className="flex flex-col w-full space-y-2">
                  <textarea
                    value={editingComment.text}
                    onChange={(e) => setEditingComment({ ...editingComment, text: e.target.value })}
                    className="border border-gray-300 rounded-md p-2 w-full"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleUpdateComment}
                      className="bg-green-500 text-white px-4 py-2 rounded-md"
                    >
                      Cập nhật
                    </button>
                    <button onClick={handleCancelEdit} className="bg-gray-300 px-4 py-2 rounded-md">
                      Hủy
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col w-full">
                  <span className="text-lg font-semibold">{comment.name}</span>
                  <p className="text-gray-700">{comment.text}</p>
                  <p className="text-xs text-gray-500">{comment.createdAt}</p>
                  {(user.info.name === comment.name || user.role === "admin") && ( 
                    <div className="flex space-x-2 mt-2">
                      <button
                        className="text-yellow-500"
                        onClick={() => handleEditComment(comment)}
                      >
                        Chỉnh sửa
                      </button>
                      <button className="text-red-500" onClick={() => handleDeleteComment(comment.id)}>
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
        <button onClick={handleAddComment} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">
          Gửi bình luận
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
