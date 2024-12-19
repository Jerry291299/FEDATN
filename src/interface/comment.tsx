export interface IComment {
  id: number;        // ID của bình luận
  user: string;       // Người dùng đã bình luận
  text: string;       // Nội dung bình luận
  createdAt: Date;    // thời gian khi bình luận được tạo
  productId: string;  // ID của sản phẩm 
  name: string;       // Tên của người dùng 
  rating: number;    // Đánh giá tùy chọn (1-5 sao)
}


// const CommentSection: React.FC<{
//   productId: string;
//   user: IUser | any;
//   averageRating?: number;
// }> = ({ productId, user }) => {
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [newComment, setNewComment] = useState<string>("");
//   const [editingComment, setEditingComment] = useState<Comment | null>(null);
//   const [newRating, setNewRating] = useState<number | null>(null);
//   const [ratingCounts, setRatingCounts] = useState<number[]>(Array(5).fill(0));
//   const [averageRating, setAverageRating] = useState<number>(0);
//   const [filteredRating, setFilteredRating] = useState<number | null>(null); // State cho lọc

//   useEffect(() => {
//     const storedComments = localStorage.getItem(`comments_${productId}`);
//     if (storedComments) {
//       const cmts = JSON.parse(storedComments);
//       setComments(cmts);
//       updateRatingCounts(cmts); // Cập nhật thống kê số sao
//     }
//   }, [productId]);

//   const updateRatingCounts = (comments: Comment[]) => {
//     const counts = Array(5).fill(0);
//     let totalStars = 0;
//     let totalRatings = 0;

//     comments.forEach((comment) => {
//       if (comment.rating) {
//         counts[comment.rating - 1] += 1;
//         totalStars += comment.rating;
//         totalRatings += 1;
//       }
//     });

//     setRatingCounts(counts);
//     const average = totalRatings > 0 ? totalStars / totalRatings : 0;
//     setAverageRating(parseFloat(average.toFixed(1))); // Làm tròn 1 chữ số thập phân
//   };

//   const saveComments = (updatedComments: Comment[]) => {
//     setComments(updatedComments);
//     localStorage.setItem(`comments_${productId}`, JSON.stringify(updatedComments));
//     updateRatingCounts(updatedComments);
//   };

//   const handleAddComment = () => {
//     if (newComment.trim() && newRating !== null) {
//       const newCommentObj: Comment = {
//         id: comments.length > 0 ? comments[comments.length - 1].id + 1 : 1,
//         user: user.role === "admin" ? "Admin" : user.info.name,
//         text: newComment.trim(),
//         createdAt: new Date().toLocaleString(),
//         name: user.info.name,
//         rating: newRating,
//       };
//       saveComments([...comments, newCommentObj]);
//       setNewComment("");
//       setNewRating(null);
//     }
//   };

//   const handleEditComment = (comment: Comment) => {
//     setEditingComment(comment);
//   };

//   const filteredComments =
//     filteredRating === null
//       ? comments
//       : comments.filter((comment) => comment.rating === filteredRating);

//   const handleUpdateComment = () => {
//     if (editingComment && editingComment.text.trim()) {
//       const updatedComments = comments.map((comment) =>
//         comment.id === editingComment.id
//           ? {
//               ...comment,
//               text: editingComment.text.trim(),
//               rating: editingComment.rating,
//             }
//           : comment
//       );
//       saveComments(updatedComments);
//       setEditingComment(null);
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditingComment(null);
//   };

//   const handleDeleteComment = (id: number) => {
//     const updatedComments = comments.filter((comment) => comment.id !== id);
//     saveComments(updatedComments);
//   };

//   const handleStarClick = (star: number) => {
//     setFilteredRating(star); // Cập nhật trạng thái để lọc bình luận theo sao
//   };

//   return (
//     <div className="comment-section bg-gray-50 p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-6">Bình luận</h2>

//       {/* Hiển thị tổng kết đánh giá */}
//       <div className="rating-summary bg-gradient-to-br from-blue-600 to-purple-600 p-6 rounded-lg shadow-lg text-white mb-6">
//   <h3 className="text-2xl font-bold mb-4">Tổng kết đánh giá</h3>
//   <div className="flex items-center justify-between mb-6">
//     <div>
//       <p className="text-4xl font-extrabold">
//         {averageRating}{" "}
//         <span className="text-yellow-400">★</span>
//       </p>
//     </div>
//     <div className="text-right">
//       <p className="text-lg font-semibold">{comments.length} đánh giá</p>
//       <p className="text-sm opacity-80">Tổng số bình luận</p>
//     </div>
//   </div>
//   <div className="rating-counts space-y-3">
//     {[5, 4, 3, 2, 1].map((star) => (
//       <div
//         key={star}
//         className={`flex items-center justify-between p-2 bg-opacity-20 rounded-lg transition ${
//           filteredRating === star ? "bg-yellow-500 text-black" : "hover:bg-opacity-30"
//         }`}
//         onClick={() =>
//           setFilteredRating(filteredRating === star ? null : star)
//         }
//       >
//         <div className="flex items-center space-x-2">
//           <span className="flex text-yellow-400">
//             {Array.from({ length: star }).map((_, i) => (
//               <span key={i}>★</span>
//             ))}
//           </span>
//           <span className="ml-2 text-sm">
//             {ratingCounts[star - 1]} đánh giá
//           </span>
//         </div>
//         <span className="text-xs font-medium opacity-80">
//           {((ratingCounts[star - 1] / comments.length) * 100).toFixed(1)}%
//         </span>
//       </div>
//     ))}
//   </div>
// </div>


//       {/* Danh sách bình luận */}
//       <div className="comments mb-6 space-y-4">
//         {filteredComments.length > 0 ? (
//           filteredComments.map((comment) => (
//             <div
//               key={comment.id}
//               className="comment bg-white p-5 rounded-md shadow-md flex flex-col"
//             >
//               {editingComment && editingComment.id === comment.id ? (
//                 <div className="space-y-3">
//                   <textarea
//                     value={editingComment.text}
//                     onChange={(e) =>
//                       setEditingComment({
//                         ...editingComment,
//                         text: e.target.value,
//                       })
//                     }
//                     className="border border-gray-300 rounded-md p-3 w-full"
//                   />
//                   <div className="flex space-x-3">
//                     <button
//                       onClick={handleUpdateComment}
//                       className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
//                     >
//                       Cập nhật
//                     </button>
//                     <button
//                       onClick={handleCancelEdit}
//                       className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
//                     >
//                       Hủy
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div>
//                   <p className="font-medium text-gray-800">{comment.name}</p>
//                   <p className="text-yellow-400">{'★'.repeat(comment.rating || 0)}</p>
//                   <p className="text-gray-700">{comment.text}</p>
//                   <p className="text-xs text-gray-500">{comment.createdAt}</p>
//                   {(user.info.name === comment.name || user.role === "admin") && (
//                     <div className="flex space-x-3 mt-3">
//                       <button
//                         className="text-blue-500 hover:text-blue-600"
//                         onClick={() => handleEditComment(comment)}
//                       >
//                         Chỉnh sửa
//                       </button>
//                       <button
//                         className="text-red-500 hover:text-red-600"
//                         onClick={() => handleDeleteComment(comment.id)}
//                       >
//                         Xóa
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">Không có bình luận nào cho đánh giá này.</p>
//         )}
//       </div>

//       {/* Thêm bình luận */}
//       <div className="add-comment space-y-3">
//         <textarea
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           placeholder="Thêm bình luận..."
//           className="border border-gray-300 rounded-md p-3 w-full"
//         />
//         <div className="flex space-x-2">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <label key={star} className="text-yellow-400 text-2xl cursor-pointer">
//               <input
//                 type="radio"
//                 name="newRating"
//                 className="hidden"
//                 checked={newRating === star}
//                 onChange={() => setNewRating(star)}
//               />
//               ★
//             </label>
//           ))}
//         </div>
//         <button
//           onClick={handleAddComment}
//           className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//         >
//           Gửi bình luận
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CommentSection;

