import { createModel } from "@rematch/core";
import http from "../util/http";

const ListStore = createModel()({
  name: "list",
  state: {
    lists: [],
  },
  reducers: {
    getBoardsListReducer(state, payload) {
      return {
        ...state,
        lists: payload,
      };
    },
  },
  effects: (dispatch) => ({
    async getBoardLists(boardId: string) {
      const res = await http.get(`list/${boardId}`);
      dispatch.list.getBoardsListReducer(
        res.data.data.sort((a: any, b: any) => a.order - b.order)
      );
    },
    async addNewTicket(data: any, state: any) {
      let listId: string;
      if (data.oldListId) {
        listId = data.oldListId;
        let oldList = state.list.lists.filter((item: any) => {
          return item.id == listId;
        })[0];
        oldList.tasks.splice(data.index, 1);
        delete data.index;
        delete data.oldListId;
        await http.put(`list/${listId}`, { data: oldList });
      }
      listId = data.listId;
      const todoTasks = state.list.lists.filter((item: any) => {
        return item.id == listId;
      })[0];
      data["created_at"] = new Date().toISOString();
      if (todoTasks.tasks && todoTasks.tasks.length > 0) {
        todoTasks.tasks.push(data);
      } else {
        todoTasks["tasks"] = [data];
      }
      const res = await http.put(`list/${listId}`, { data: todoTasks });
      console.log(res.data);
    },
  }),
});

export default ListStore;
