import { Form, FormProps, Input, Select, SelectProps } from "antd";
import React, { useEffect, useState } from "react";
import { addProduct } from "../../../service/products";
import { Iproduct } from "../../../interface/products";
import { useNavigate } from "react-router-dom";
import { Button, message } from "antd";
import { upload } from "../../../service/upload";
import { url } from "inspector";

import { Icategory } from "../../../interface/category";
import { getAllCategories } from "../../../service/category";
import LoadingComponent from "../../Loading";

type Props = {};
type LabelRender = SelectProps["labelRender"];
const Add = (props: Props) => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [img, setImg] = useState<string>("");
  const [category, setCategory] = useState<Icategory[]>([]);
  const [products, setProducts] = useState<Iproduct[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [tailen, setTailen] = useState<any>(null);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false)




  const info = () => {
    messageApi.open({
      type: "success",
      content: "Product added successfully",
    });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategory(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  const activeCategories = category.filter(category => category.status === "active");

  const labelRender: LabelRender = (props) => {
    const { label, value } = props;

    if (label) {
      return value;
    }
    return <span>Please choose the category: </span>;
  };

  const uploadImage = async (files: any) => {
    const formdata = new FormData();
    formdata.append("images", files);
    const upImage = await upload(formdata);
    console.log(upImage, "url img");

    console.log(upImage.payload[0].url);
    return upImage.payload[0].url;
  };

  const onFinish = async (values: any) => {
    setLoading(true);

    try {
        // Tải ảnh lên và lấy URL
        const fileResult = await uploadImage(tailen);

        // Tạo payload, thêm trường status: 'active'
        const payload = {
            ...values,
            moTa: values.moTa,
            soLuong: values.soLuong,
            img: fileResult,
            categoryID: values.category,
            status: true, // Mặc định trạng thái là active
        };

        // Gọi API để thêm sản phẩm mới
        const product = await addProduct(payload);

        // Cập nhật danh sách sản phẩm và thông báo thành công
        info();

        // Reset form và trạng thái
        form.resetFields();
        setName("");
        setImg("");
        setPrice(0);
        setLoading(false);
    } catch (error) {
        console.error("Error adding product:", error);
        setLoading(false);
        message.error("Something went wrong. Please try again.");
    }
};

return (
  <>
      {loading && <LoadingComponent />}
      {contextHolder}
      <div className="space-y-6 font-[sans-serif] max-w-md mx-auto">
          <Form
              form={form}
              initialValues={{ category: "1" }}
              onFinish={onFinish}
          >
              <div>
                  <label className="mb-2 text-2xl text-black block">
                      Tên sản phẩm:
                  </label>
                  <Form.Item
                      name="name"
                      rules={[
                          {
                              required: true,
                              message: "Bắt buộc nhập tên Sản Phẩm!",
                          },
                      ]}
                  >
                      <Input
                          className="pr-4 pl-14 py-3 text-sm text-black rounded bg-white border border-gray-400 w-full outline-[#333]"
                          placeholder="Enter product name"
                      />
                  </Form.Item>
              </div>

              <div>
                  <label className="mb-2 text-2xl text-black block">
                      Số Lượng
                  </label>
                  <Form.Item
                      name="soLuong"
                      rules={[
                          {
                              required: true,
                              message: "Bắt buộc nhập số lượng!",
                          },
                      ]}
                  >
                      <Input
                          className="pr-4 pl-14 py-3 text-sm text-black rounded bg-white border border-gray-400 w-full outline-[#333]"
                          placeholder="Enter product quantity"
                      />
                  </Form.Item>
              </div>

              <div>
                  <label className="mb-2 text-2xl text-black block">
                      Mô tả
                  </label>
                  <Form.Item
                      name="moTa"
                      rules={[
                          {
                              required: true,
                              message: "Bắt buộc nhập mô tả!",
                          },
                      ]}
                  >
                      <Input
                          className="pr-4 pl-14 py-3 text-sm text-black rounded bg-white border border-gray-400 w-full outline-[#333]"
                          placeholder="Enter product description"
                      />
                  </Form.Item>
              </div><div>
                        <label className="mb-2 text-sm text-black block">
                            Giá sản phẩm:
                        </label>
                        <div className="relative flex items-center">
                            <Form.Item
                                name="price"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input your product price!",
                                    },
                                ]}
                            >
                                <Input
                                    className="pr-4 pl-14 py-3 text-sm text-black rounded bg-white border border-gray-400 w-full outline-[#333]"
                                    placeholder="Enter Price $$$"
                                />
                            </Form.Item>
                        </div>

                        <label className="mb-2 text-sm text-black block">
                            Ảnh sản phẩm:
                        </label>
                        <div className="relative flex items-center">
                            <Form.Item
                                name="img"
                                rules={[
                                    {
                                        required: false,
                                        message:
                                            "Please input your product image!",
                                    },
                                ]}
                            >
                                <Input
                                    type="file"
                                    onChange={(e: any) =>
                                        setTailen(e.target.files[0])
                                    }
                                    className="pr-4 pl-14 py-3 text-sm text-black rounded bg-white border border-gray-400 w-full outline-[#333]"
                                    placeholder="Enter product image"
                                />
                            </Form.Item>
                        </div>

                        <div className="pt-[20px]">
                            <Form.Item
                                name="category"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select a category!",
                                    },
                                ]}
                            >
                                <Select style={{ width: "100%" }}>
                                    {activeCategories.map((categoryID: Icategory) => (
                                        <Select.Option 
                                        key={categoryID._id}
                                            value={categoryID._id}
                                        >
                                            {categoryID.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="!mt-8 w-full px-4 py-2.5 mx-auto block text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Thêm mới sản phẩm
                    </button>
                </Form>
            </div>
        </>
    );
};

export default Add;
