import { createModel } from "@rematch/core";
import http from "../util/http";
const UsersStore = createModel()({
  name: "users",
  state: {
    userInfo: [],
    users: [],
  },
  reducers: {
    getUsersListsReducer(state, payload) {
      return {
        ...state,
        users: payload,
      };
    },
    appendUserReducer(state: any, payload: any) {
      const users = state.boards;
      users.push(payload);
      return {
        ...state,
        users,
      };
    },
  },
  effects: (dispatch) => ({
    async getUsersLists() {
      let res = await http.get("users");
      dispatch.users.getUsersListsReducer(res.data.data);
    },
    async createUser(data) {
      let res = await http.post("users", { data });
      dispatch.users.appendUserReducer(res.data.data);
    },
  }),
});

export default UsersStore;
