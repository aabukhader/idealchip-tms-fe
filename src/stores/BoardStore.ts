import { createModel } from "@rematch/core";
import http from "../util/http";
const BoardStore = createModel()({
  name: "board",
  state: {
    boards: [],
  },
  reducers: {
    getBoardsListReducer(state, payload) {
      return {
        ...state,
        boards: payload,
      };
    },
    appendBoardReducer(state: any, payload: any) {
      const boards = state.boards;
      boards.push(payload);
      return {
        ...state,
        boards,
      };
    },
  },
  effects: (dispatch) => ({
    async getBoardsList() {
      const res = await http.get("board");
      dispatch.board.getBoardsListReducer(res.data.data);
    },
    async createBoard(data) {
      const res = await http.post("board", {
        data,
      });
      dispatch.board.appendBoardReducer(res.data.data);
    },
  }),
});

export default BoardStore;
