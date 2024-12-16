import React, { useEffect, useState } from "react";
import { Popconfirm } from "antd";
import LoadingComponent from "../Loading";

interface Comment {
  id: number;
  user: string;
  text: string;
  createdAt: string;
  productId: string;
  name: string;
  rating?: number;
}

const CommentDashboard = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchComments = () => {
      const keys = Object.keys(localStorage);
      const allComments: Comment[] = [];
      keys.forEach((key) => {
        if (key.startsWith("comments_")) {
          const productComments = JSON.parse(localStorage.getItem(key) || "[]");
          productComments.forEach((comment: Comment) => {
            allComments.push({ ...comment, productId: key.replace("comments_", "") });
          });
        }
      });
      setComments(allComments);
    };
    fetchComments();
  }, []);

  const handleDeleteComment = (id: number) => {
    // Lọc bỏ bình luận đã xóa
    const updatedComments = comments.filter((comment) => comment.id !== id);
    setComments(updatedComments);

    // Cập nhật lại localStorage sau khi xóa
    const groupedComments: Record<string, Comment[]> = {};
    updatedComments.forEach((comment) => {
      if (!groupedComments[comment.productId]) groupedComments[comment.productId] = [];
      groupedComments[comment.productId].push(comment);
    });

    // Cập nhật lại từng sản phẩm trong localStorage
    Object.keys(groupedComments).forEach((productId) => {
      localStorage.setItem(`comments_${productId}`, JSON.stringify(groupedComments[productId]));
    });

    // Log để kiểm tra
    console.log("Updated comments:", updatedComments);
    console.log("Updated localStorage:", Object.keys(groupedComments));
  };

  const filteredComments = comments.filter((comment) =>
    comment.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Tìm kiếm bình luận */}
      <input
        type="text"
        placeholder="Tìm kiếm bình luận"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />

      <div className="flex flex-col w-full">
        <div className="overflow-x-auto">
          <div className="py-2 inline-block w-full px-0">
            <div className="overflow-hidden">
              <table className="min-w-full table-auto">
                <thead className="bg-white border-b">
                  <tr>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">ID</th>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Người dùng</th>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Sản phẩm</th>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Nội dung</th>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Số sao đánh giá</th>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Thời gian</th>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredComments.length > 0 ? (
                    filteredComments.map((comment, index) => (
                      <tr className="bg-gray-100 border-b" key={comment.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {comment.name}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {comment.productId}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {comment.text}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {comment.rating}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {comment.createdAt}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <Popconfirm
                            title="Xóa bình luận"
                            description="Bạn có chắc chắn muốn xóa bình luận này không?"
                            onConfirm={() => handleDeleteComment(comment.id)}
                            okText="Có"
                            cancelText="Không"
                          >
                            <button
                              type="button"
                              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                            >
                              Xóa
                            </button>
                          </Popconfirm>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center text-gray-500 py-4">
                        Không tìm thấy bình luận nào.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentDashboard;
