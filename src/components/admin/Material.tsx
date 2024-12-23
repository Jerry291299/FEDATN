import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  deactivateMaterial,
  activateMaterial,
  getAllMaterials,
} from "../../service/material";
import { IMaterial } from "../../interface/material";
import { Popconfirm, Pagination } from "antd";
import LoadingComponent from "../Loading";
import { CSVLink } from "react-csv";

type Props = {};

const ListMaterial = (props: Props) => {
  const [materials, setMaterial] = useState<IMaterial[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllMaterials();
        setMaterial(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeactivateMaterial = async (id: string) => {
    try {
      await deactivateMaterial(id);
      const updatedMaterials = materials.map((material) =>
        material._id === id ? { ...material, status: "deactive" as "deactive" } : material
      );
      setMaterial(updatedMaterials);
    } catch (error) {
      console.error("Error deactivating material:", error);
    }
  };

  const handleActivateMaterial = async (id: string) => {
    try {
      await activateMaterial(id);
      const updatedMaterials = materials.map((material) =>
        material._id === id ? { ...material, status: "active" as "active" } : material
      );
      setMaterial(updatedMaterials);
    } catch (error) {
      console.error("Error activating material:", error);
    }
  };

  const updateMaterial = (id: string) => {
    navigate(`updatematerial/${id}`);
  };

  const filteredMaterials = Array.isArray(materials)
    ? materials.filter((material) =>
        material.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMaterials = filteredMaterials.slice(startIndex, startIndex + itemsPerPage);

  const csvData = filteredMaterials.map((material) => ({
    ID: material._id,
    "Tên vật liệu": material.name,
    "Trạng thái": material.status === "active" ? "Hoạt động" : "Vô hiệu hóa",
  }));

  return (
    <>
      {loading && <LoadingComponent />}

      <div className="flex justify-between items-center mb-4">
        <NavLink to="/admin/addmaterial">
          <button className="focus:outline-none text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
            Thêm mới
          </button>
        </NavLink>

        <CSVLink
          data={csvData}
          filename={"materials.csv"}
          className="focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
          target="_blank"
        >
          Xuất file chất liệu
        </CSVLink>
      </div>

      <input
        type="text"
        placeholder="Tìm kiếm vật liệu"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded-lg w-full mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full table-auto">
          <thead className="bg-blue-100">
            <tr>
              <th className="text-sm font-medium text-gray-700 px-6 py-3 text-left">Stt</th>
              <th className="text-sm font-medium text-gray-700 px-6 py-3 text-left">Tên vật liệu</th>
              <th className="text-sm font-medium text-gray-700 px-6 py-3 text-left">Trạng thái</th>
              <th className="text-sm font-medium text-gray-700 px-6 py-3 text-left">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {paginatedMaterials.length > 0 ? (
              paginatedMaterials.map((material, index) => (
                <tr key={material._id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800">{startIndex + index + 1}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{material.name}</td>
                  <td className="px-6 py-4 text-sm">
                    {material.status === "active" ? (
                      <span className="text-green-600 font-semibold">Hoạt động</span>
                    ) : (
                      <span className="text-red-600 font-semibold">Vô hiệu hóa</span>
                    )}
                  </td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button
                      className="focus:outline-none text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                      onClick={() => updateMaterial(material._id)}
                    >
                      Sửa
                    </button>
                    {material.status === "active" ? (
                      <Popconfirm
                        title="Vô hiệu hóa vật liệu"
                        description="Bạn có chắc chắn muốn vô hiệu hóa vật liệu này không?"
                        onConfirm={() => handleDeactivateMaterial(material._id)}
                        okText="Có"
                        cancelText="Không"
                      >
                        <button className="focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2">
                          Vô hiệu hóa
                        </button>
                      </Popconfirm>
                    ) : (
                      <Popconfirm
                        title="Kích hoạt lại vật liệu"
                        description="Bạn có chắc chắn muốn kích hoạt lại vật liệu này không?"
                        onConfirm={() => handleActivateMaterial(material._id)}
                        okText="Có"
                        cancelText="Không"
                      >
                        <button className="focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2">
                          Kích hoạt
                        </button>
                      </Popconfirm>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center text-gray-500 py-4">
                  Không tìm thấy vật liệu nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-center mt-4">
          <Pagination
            current={currentPage}
            total={filteredMaterials.length}
            pageSize={itemsPerPage}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      </div>
    </>
  );
};

export default ListMaterial;
