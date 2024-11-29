import { axiosservice } from "../config/API";
import { Inews, InewsLite } from "../interface/news";

// Lấy tất cả bài viết
export const getAllPosts = async ({
    limit = 10,
    page = 1,
}: { limit?: number; page?: number }): Promise<InewsLite[] | null> => {
    try {
        const { data } = await axiosservice.get(`/posts?page=${page}&limit=${limit}`);
        return data; // Đảm bảo API trả về danh sách dạng InewsLite[]
    } catch (error: any) {
        console.error("Error fetching posts:", error.response?.data?.message || error.message);
        return null;
    }
};

// Lấy chi tiết bài viết theo ID
export const getPostByID = async (id: string): Promise<Inews | null> => {
    try {
        const { data } = await axiosservice.get(`/posts/${id}`);
        return data; // Đảm bảo API trả về đối tượng Inews
    } catch (error: any) {
        console.error("Error fetching post by ID:", error.response?.data?.message || error.message);
        return null;
    }
};

// Thêm mới bài viết
export const createPost = async (post: Omit<Inews, "_id">): Promise<Inews | null> => {
    try {
        const { data } = await axiosservice.post("/posts/create", post);
        return data.data; // API trả về bài viết mới được tạo
    } catch (error: any) {
        console.error("Error creating post:", error.response?.data?.message || error.message);
        return null;
    }
};

// Cập nhật bài viết theo ID
export const updatePost = async (
    id: string,
    post: Partial<Inews>
): Promise<Inews | null> => {
    try {
        const { data } = await axiosservice.put(`/posts/update/${id}`, post);
        return data; // API trả về đối tượng Inews sau khi cập nhật
    } catch (error: any) {
        console.error("Error updating post:", error.response?.data?.message || error.message);
        return null;
    }
};

// Xóa bài viết theo ID
export const deletePost = async (id: string): Promise<boolean> => {
    try {
        const { data } = await axiosservice.delete(`/posts/${id}`);
        return data.success; // Đảm bảo API trả về kết quả phù hợp
    } catch (error: any) {
        console.error("Error deleting post:", error.response?.data?.message || error.message);
        return false;
    }
};

 // Lấy bài viết theo danh mục
// export const getPostsByCategory = async ({
//     limit = 10,
//     page = 1,
//     category,
// }: { limit?: number; page?: number; category: string }): Promise<InewsLite[] | null> => {
//     try {
//         const { data } = await axiosservice.get(
//             `/posts?category=${category}&page=${page}&limit=${limit}`
//         );
//         return data; // Đảm bảo API trả về danh sách InewsLite[]
//     } catch (error: any) {
//         console.error(
//             "Error fetching posts by category:",
//             error.response?.data?.message || error.message
//         );
//         return null;
//     }
//};
