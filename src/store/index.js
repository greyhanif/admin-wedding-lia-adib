import { selector, atom } from "recoil";
import axios from "axios";

export const authUserState = atom({
  key: "authUserState",
  default: false,
});

export const nameState = atom({
  key: "nameState",
  default: "",
});

export const tokenState = atom({
  key: "tokenState",
  default: "",
});

export const asState = atom({
  key: "asState",
  default: "",
});

export const expireState = atom({
  key: "expireState",
  default: "",
});

export const searchState = atom({
  key: "searchState",
  default: "",
});

export const resSearchState = atom({
  key: "resSearchState",
  default: [],
});

// export const contactsState = atom({
//   key: "contactsState",
//   default: [],
// });

export const dashboardState = selector({
  key: "dashboardState",
  get: async ({ get }) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/dashboard`);
    return response.data;
  },
});

export const ticketsState = selector({
  key: "ticketsState",
  get: async ({ get }) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/tickets`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  },
});

export const contactsState = selector({
  key: "contactsState",
  get: async ({ get }) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/contacts`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  },
});

export const attendancesState = selector({
  key: "attendancesState",
  get: async ({ get }) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/attendances`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  },
});

export const relationshipCodeState = selector({
  key: "relationshipCodeState",
  get: async ({ get }) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/relationship`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  },
});

export const configurationState = selector({
  key: "configurationState",
  get: async ({ get }) => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/configuration`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  },
});
