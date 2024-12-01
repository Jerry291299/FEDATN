import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Pagination, Popconfirm } from "antd";
 // Đảm bảo đường dẫn đúng
import LoadingComponent from "../Loading"; // Tùy thuộc bạn đã có component này
import { Inews } from "../../interface/news";
import { deletePost, getAllPosts } from "../../service/new";

type Props = {};

const DashboardNews = (props: Props) => {
    const [news, setNews] = useState<Inews[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [pageConfig, setPageConfig] = useState<any>();
    const [page, setPage] = useState<any>({
        limit: 5,
        currentPage: 1,
    });

    const navigate = useNavigate();

    const fetchNews = async (currentPage: number) => {
        try {
            setLoading(true);
            const data = await getAllPosts({
                limit: page.limit,
                page: currentPage,
            });
            console.log(data)
            setNews(data || []);

            setPageConfig(data);
        } catch (error) {
            console.log("Error fetching news:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews(1); // Lấy dữ liệu trang đầu tiên khi render component
    }, []);

    const handlePageChange = (currentPage: number) => {
        setPage((prev: any) => ({ ...prev, currentPage }));
        fetchNews(currentPage);
    };

    const deleteSelectedNews = async (id: string) => {
        try {
            await deletePost(id);
            setNews((prev) => prev.filter((item) => item._id !== id));
        } catch (error) {
            console.log("Error deleting news:", error);
        }
    };

    const editNews = (id: string) => {
        navigate(`update/${id}`);
    };

    return (
        <>
            {loading && <LoadingComponent />}
            <NavLink to={"/admin/addNews"}>
                <button className=" focus:outline-none text-white bg-sky-600 hover:bg-sky-900 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-4">
                    Thêm tin tức mới
                </button>
            </NavLink>

            <div className="mb-4 flex flex-col w-full">
                <div className="overflow-x-auto">
                    <div className="py-2 inline-block w-full">
                        <div className="overflow-hidden">
                            <table className="min-w-full table-auto">
                                <thead className="bg-white border-b">
                                    <tr>
                                        <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            STT
                                        </th>
                                        <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Tiêu đề
                                        </th>
                                        <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Hình ảnh
                                        </th>
                                        <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Mô tả
                                        </th>
                                        <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Nội dung
                                        </th>
                                        <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Hành động
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {news.map((item, index) => (
                                        <tr
                                            className="bg-gray-100 border-b"
                                            key={item._id}
                                        >
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {item.title}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                <img
                                                    src={item.img[0]}
                                                    alt="news"
                                                    className="w-24"
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {item.descriptions.length > 50
                                                    ? `${item.descriptions.substring(
                                                          0,
                                                          50
                                                      )}...`
                                                    : item.descriptions}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {item.content.length > 50
                                                    ? `${item.content.substring(
                                                          0,
                                                          50
                                                      )}...`
                                                    : item.content}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                <button
                                                    onClick={() =>
                                                        editNews(item._id)
                                                    }
                                                    className="text-white bg-sky-600 hover:bg-sky-800 px-4 py-2 rounded"
                                                >
                                                    Sửa
                                                </button>
                                                <Popconfirm
                                                    title="Bạn có chắc muốn xóa?"
                                                    onConfirm={() =>
                                                        deleteSelectedNews(
                                                            item._id
                                                        )
                                                    }
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <button className="ml-2 text-white bg-red-600 hover:bg-red-800 px-4 py-2 rounded">
                                                        Xóa
                                                    </button>
                                                </Popconfirm>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Pagination
                onChange={handlePageChange}
                pageSize={pageConfig?.limit}
                total={pageConfig?.totalDocs || 0}
                current={page.currentPage}
            />
        </>
    );
};

export default DashboardNews;
