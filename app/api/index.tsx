import axios from "axios";

const baseURLApi = "https://royalcargo225.com:9001";

const api = axios.create({
  baseURL: "https://royalcargo225.com:9001", // Assurez  vous que l'URL de base correspond à votre backend
});

export const getAllUserApp = async (token: string) => {
  try {
    const response = await api.get(`/api/v01/alluser`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getAllReservation = async (token: string) => {
  try {
    const response = await api.get(`/api/v01/allreservation`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getAllReservationAnonyme = async () =>
  // token: string
  {
    try {
      const response = await api.get(`/api/v01/allreservationanonyme`, {
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (err) {
      return err;
    }
  };

// allreservation

export const postNewAdress = async (data: any) => {
  try {
    const response = await api.post("/api/v01/createadress", data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const postNewImage = async (data: any) => {
  try {
    const response = await api.post("/api/v01/imageadress", data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const postNewImageAnonime = async (data: any) => {
  try {
    const response = await api.post("/api/v01/imageadresanonyme", data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const postNewImage2 = async (data: any) => {
  try {
    const response = await api.post("/api/v01/imageadress2", data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const postNewImage3 = async (data: any) => {
  try {
    const response = await api.post("/api/v01/imageadress3", data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const putAdress = async (data: any) => {
  // export const putAdress = async (data: any, token: string) => {
  try {
    const response = await api.put("/api/v01/reservationput", data, {
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getDataById = async (id: any) => {
  try {
    const response = await fetch(`${baseURLApi}/api/v01/adress/${id}`, {
      method: "GET",
    });
    if (!response.ok) {
      if (response.status === 404) {
        return "invalide";
      } else {
        throw new Error("Une erreur est survenue");
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getAllData = async (token: string) => {
  try {
    const response = await api.get(`/api/v01/adress`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getAllUser = async (token: any) => {
  try {
    const response = await api.get(`/api/v01/alluser`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err) {
    return err;
  }
};
export const postUser = async (data: any, token: string) => {
  try {
    const response = await api.post("/api/v01/register", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const postLog = async (dataform: any) => {
  try {
    const response = await fetch(`${baseURLApi}/api/v01/logbro`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataform),
    });
    if (!response.ok) {
      if (response.status === 401) {
        return "Incorrect password";
      } else if (response.status === 404) {
        return "User not found";
      } else {
        throw new Error("Une erreur est survenue");
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const delUser = async (id: any, token: string) => {
  try {
    const response = await api.delete(`/api/v01/deladress/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const logUserDash = async (data: any, token: string) => {
  try {
    const response = await api.post("/api/v01/adminlog", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getAllBlog = async (token: any) => {
  try {
    const response = await api.get(`/api/v01/getarticles`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getAllBlogId = async (token: any, id: number) => {
  try {
    const response = await api.get(`/api/v01/getarticlesid/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const postDataById2 = async (
  data: any
  // id: any
  // token: any,
) => {
  try {
    const response = await api.post(`/api/v01/postreservationanonyme`, data, {
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const postNewAdressAnonyme = async (data: any) => {
  try {
    const response = await api.post("/api/v01/reservationanonyme", data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getAdressAnonyme = async (
  // token: any,

  id: any
) => {
  try {
    const response = await api.get(`/api/v01/reservationanonyme/${id}`, {
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const putAdressAnonyme = async (data: any) => {
  // export const putAdress = async (data: any, token: string) => {
  try {
    const response = await api.put("/api/v01/reservationputanonyme", data, {
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getDataByAnonyme = async (
  // token: any,
  id: string
) => {
  try {
    const response = await api.get(`/api/v01/reservationanonyme/${id}`, {
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err) {
    return err;
  }
};
