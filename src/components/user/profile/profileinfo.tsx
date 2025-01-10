import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { upload } from "../../../service/upload";
import { notification } from "antd";
import LoadingComponent from "../../Loading";

type Props = {};

const Profileinfo = (props: Props) => {
  const [userId, setUserId] = useState<string | null>(null);
    const [files, setFiles] = useState<File[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const showNotification = (
        type: "success" | "error",
        title: string,
        description: string
      ) => {
        notification[type]({
          message: title,
          description,
          placement: "topRight",
        });
      };
  const [profileData, setProfileData] = useState({
    img: "",
    name: "",
    dob: "",
    gender: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      const { id } = JSON.parse(userData);
      if (id) {
        setUserId(id);
        // Fetch user profile
        fetchUserProfile(id);
      }
    }
  }, []);

  const fetchUserProfile = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:28017/user/${id}`);
    //   setExistingImages(response.img || []);

      if (response.data) {
        setProfileData({
          img: response.data.img || "",
          name: response.data.name || "",
          dob: response.data.dob || "",
          gender: response.data.gender || "",
          address: response.data.address || "",
          phone: response.data.phone || "",
        });
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    setFiles(newFiles); // Replace existing files for single profile picture
  };
  
    const handleRemoveImage = (url: string) => {
      setExistingImages((prev) => prev.filter((img) => img !== url));
    };

    const uploadImages = async (files: File[]): Promise<string[]> => {
        const urls: string[] = [];
        for (const file of files) {
          const formData = new FormData();
          formData.append("images", file);
    
          try {
            const response = await upload(formData);
            const imageUrl = response.payload[0].url;
            urls.push(imageUrl);
          } catch (error) {
            console.error("Error uploading image:", error);
            showNotification(
              "error",
              "Lỗi tải ảnh",
              "Không thể tải ảnh lên, vui lòng thử lại!"
            );
          }
        }
        return urls;
      };

      const handleSave = async () => {
        setLoading(true);
        if (!userId) {
          alert("User ID not found");
          return;
        }
      
        try {
          setLoading(true);
      
          // Upload images if there are new files
          let uploadedImageUrl = profileData.img;
          if (files.length > 0) {
            const uploadedUrls = await uploadImages(files);
            if (uploadedUrls.length > 0) {
              uploadedImageUrl = uploadedUrls[0]; // Assuming only one profile image
            }
          }
      
          // Update the profileData with the new image URL
          const updatedProfileData = { ...profileData, img: uploadedImageUrl };
      
          // Send the updated profile data to the server
          const response = await axios.put(
            `http://localhost:28017/updateProfile/${userId}`,
            updatedProfileData
          );
      
          showNotification(
            "success",
            "Thành công",
            "Cập nhật thông tin thành công!"
          );
          setProfileData(updatedProfileData);
          console.log("Updated profile:", response.data);
        } catch (error) {
          console.error("Error updating profile:", error);
          alert("Failed to update profile.");
        } finally {
          setLoading(false);
        }
      };

  return (
    <>
    {loading && <LoadingComponent />}
    <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center space-x-6">
        <div>
          <img
            className="w-24 h-24 rounded-full"
            src={profileData.img}
            alt="Profile Picture"
          />
        </div>
        

        <div>
          <h1 className="text-xl font-bold text-gray-800">{profileData.name}</h1>
          <p className="text-sm text-gray-600">Web Developer</p>
        </div>
      </div>

      <div>
          <label className="block text-sm font-medium text-gray-700">
            Profile Image
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
          />
        </div>

      <div className="grid grid-cols-2 gap-6 mt-8">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={profileData.dob}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            value={profileData.gender}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Choose your gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={profileData.address}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={profileData.phone}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="mt-4 px-6 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg"
      >
        Save
      </button>
    </div>
    </>
  );
};

export default Profileinfo;
