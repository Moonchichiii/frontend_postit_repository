import axiosInstance from "../../Api/AxiosDefaults";

async function updateProfile(userId, formData, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    }
  };
  await axiosInstance.put(`/profiles/${userId}/`, formData, config);
}

export default updateProfile;
