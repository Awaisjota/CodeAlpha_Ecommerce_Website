import Api from "../config/api";

export const registerUser = async (userData) => {
  try {
    const response = await Api.post("/users/register", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const loginUser = async (userData) => {
    try {
        const res = await Api.post("/users/login", userData);
        return res.data
    } catch (error) {
        throw error
    }
};

