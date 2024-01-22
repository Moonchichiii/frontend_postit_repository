import axiosInstance, { ImageInstance } from "../../Api/AxiosDefaults";

async function ProfileImageUpload(file) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axiosInstance.post('/profiles/', formData, ImageInstance);
    return response.data.url; 
  } catch (error) {
    console.error("Error uploading profile image:", error.message);
    return null; 
  }
}

export default ProfileImageUpload;
