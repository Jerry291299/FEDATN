import React, { useEffect, useState } from 'react'
import { Form, Input, message } from "antd";
import { useNavigate, useParams } from 'react-router-dom';
import { IMaterial } from '../../../interface/material';
import { getMaterialByID, updateMaterial } from '../../../service/material';

type Props = {}

const UpdateMaterial = (props: Props) => {
    const [name, setName] = useState<string>("");
    const [material, setMaterial] = useState<IMaterial | null>(null);
    const [messageApi] = message.useMessage();
    
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { id } = useParams();

    useEffect(() => {
        const fetchMaterial = async () => {
            try {
                const response = await getMaterialByID(id);
                form.setFieldsValue({
                    name: response.name,
                });
                setMaterial(response);
                console.log(response);
            } catch (error) {
                console.error("Error fetching material:", error);
            }
        };
        fetchMaterial();
    }, [id, form]);

    const info = () => {
        messageApi.success("Material updated successfully");
    };

    const onFinish = async (values: any) => {
        try {
            const materialData = { ...values };
            const updatedMaterial = await updateMaterial(id, materialData);

            if (updatedMaterial) {
                console.log("Updated Material:", updatedMaterial);
                info();
                form.resetFields();
                navigate("/admin/Material");
            } else {
                messageApi.error("Failed to update material");
            }

        } catch (error) {
            console.error("Error updating material:", error);
            messageApi.error("Server Error: Could not update material.");
        }
    };

    return (
        <>
            <div className="pt-[20px] px-[30px]">
                <div className="space-y-6 font-[sans-serif] max-w-md mx-auto">
                    <Form form={form} onFinish={onFinish}>
                        <div>
                            <label className="mb-2 text-2xl text-black block">
                                Material name:
                            </label>
                            <Form.Item
                                name="name"
                                rules={[
                                    { required: true, message: "Please input the material name!" },
                                ]}
                            >
                                <Input
                                    className="pr-4 pl-14 py-3 text-sm text-black rounded bg-white border border-gray-400 w-full outline-[#333]"
                                    placeholder="Enter Material name"
                                />
                            </Form.Item>
                        </div>

                        <button
                            type="submit"
                            className="!mt-8 w-full px-4 py-2.5 mx-auto block text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Update Material
                        </button>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default UpdateMaterial;