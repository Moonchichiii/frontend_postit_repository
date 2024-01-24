import { axiosFormInstance } from '../../../Api/AxiosDefaults';

async function updateProfile(user, formData, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    }
  };
  try {
    const response = await axiosFormInstance.put(`/profiles/${user}/`, formData, config);
    console.log("Profile update response:", response.data); 
  } catch (error) {
    console.error("Profile update error:", error.response?.data || error); 
  }
}

export default updateProfile;
