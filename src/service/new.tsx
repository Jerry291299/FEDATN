import { axiosservice } from "../config/API";
import { Inews, InewsLite } from "../interface/news";

// Lấy tất cả bài viết
export const getAllPosts = async (): Promise<InewsLite[] | null> => {
    try {
        const { data } = await axiosservice.get("/posts");
        return data; // Đảm bảo API trả về danh sách dạng InewsLite[]
    } catch (error: any) {
        console.error("Error fetching posts:", error.response?.data?.message || error.message);
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

// Xóa bài viết theo ID
export const deletePost = async (id: string): Promise<string | null> => {
    try {
        const { data } = await axiosservice.delete(`/posts/delete/${id}`);
        return data.message; // API trả về thông báo xóa thành công
    } catch (error: any) {
        console.error("Error deleting post:", error.response?.data?.message || error.message);
        return null;
    }
};
