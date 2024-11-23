import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  deactivateMaterial,
  activateMaterial,
  getAllMaterials,
} from "../../service/material";
import { IMaterial } from "../../interface/material";
import { Popconfirm } from "antd";
import LoadingComponent from "../Loading";
import { CSVLink } from "react-csv";

type Props = {};

const ListMaterial = (props: Props) => {
  const [materials, setMaterial] = useState<IMaterial[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // Trạng thái cho ô tìm kiếm
  const param = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllMaterials(); //  getAllMaterials
        console.log(data); // Kiểm tra dữ liệu
        setMaterial(data); //  setMaterial
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeactivateMaterial = async (id: string) => {
    try {
      await deactivateMaterial(id); //  deactivateMaterial
      const updatedMaterials = materials.map((material) =>
        material._id === id
          ? { ...material, status: "deactive" as "deactive" }
          : material
      );
      setMaterial(updatedMaterials); // setMaterial
      console.log(`Material with id ${id} deactivated successfully`);
    } catch (error) {
      console.log("Error deactivating material:", error);
    }
  };

  const handleActivateMaterial = async (id: string) => {
    try {
      await activateMaterial(id); //  activateMaterial
      const updatedMaterials = materials.map((material) =>
        material._id === id
          ? { ...material, status: "active" as "active" }
          : material
      );
      setMaterial(updatedMaterials); //  setMaterial
      console.log(`Material with id ${id} activated successfully`);
    } catch (error) {
      console.log("Error activating material:", error);
    }
  };

  const updateMaterial = (id: string) => {
    navigate(`updatematerial/${id}`); //  updatematerial
  };

  // Kiểm tra materials có tồn tại và là mảng trước khi filter
  const filteredMaterials = Array.isArray(materials)
    ? materials.filter((material) =>
        material.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];
  const csvData = filteredMaterials.map((materials) => ({
    ID: materials._id,
    "Tên danh mục": materials.name,
    "Trạng thái": materials.status === "active" ? "Hoạt động" : "Vô hiệu hóa",
  }));

  return (
    <>
      {loading && <LoadingComponent />}
      <NavLink to={"/admin/addmaterial"}>
        <button className="focus:outline-none text-white bg-sky-600 hover:bg-sky-900 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
          Thêm mới
        </button>
      </NavLink>
      {/* Export button */}
      <CSVLink
        data={csvData}
        filename={"materials.csv"}
        className="focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        target="_blank"
      >
        Xuất Chất liệu
      </CSVLink>

      {/* Ô tìm kiếm vật liệu */}
      <input
        type="text"
        placeholder="Tìm kiếm vật liệu"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded mb-4"
      />

      <div className="flex flex-col w-full">
        <div className="overflow-x-auto">
          <div className="py-2 inline-block w-full px-0">
            <div className="overflow-hidden">
              <table className="min-w-full table-auto">
                <thead className="bg-white border-b">
                  <tr>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Stt
                    </th>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Tên vật liệu
                    </th>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Trạng thái
                    </th>
                    <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Handle
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMaterials.length > 0 ? (
                    filteredMaterials.map(
                      (material: IMaterial, index: number) => (
                        <tr className="bg-gray-100 border-b" key={material._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {index + 1}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {material.name}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {material.status === "active" ? (
                              <span className="text-green-600">Hoạt động</span>
                            ) : (
                              <span className="text-red-600">Vô hiệu hóa</span>
                            )}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <button
                              type="button"
                              className="focus:outline-none text-white bg-sky-600 hover:bg-sky-900 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                              onClick={() => updateMaterial(material._id)}
                            >
                              Edit
                            </button>
                            {material.status === "active" ? (
                              <Popconfirm
                                title="Vô hiệu hóa vật liệu"
                                description="Bạn có chắc chắn muốn vô hiệu hóa vật liệu này không?"
                                onConfirm={() =>
                                  handleDeactivateMaterial(material._id)
                                }
                                okText="Có"
                                cancelText="Không"
                              >
                                <button
                                  type="button"
                                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                >
                                  Deactivate
                                </button>
                              </Popconfirm>
                            ) : (
                              <Popconfirm
                                title="Kích hoạt lại vật liệu"
                                description="Bạn có chắc chắn muốn kích hoạt lại vật liệu này không?"
                                onConfirm={() =>
                                  handleActivateMaterial(material._id)
                                }
                                okText="Có"
                                cancelText="Không"
                              >
                                <button
                                  type="button"
                                  className="focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                >
                                  Activate
                                </button>
                              </Popconfirm>
                            )}
                          </td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center text-gray-500 py-4"
                      >
                        Không tìm thấy vật liệu nào.
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

export default ListMaterial;
