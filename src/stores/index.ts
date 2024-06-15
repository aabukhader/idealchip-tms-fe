import { init } from "@rematch/core";
import BoardStore from "./BoardStore";
import ListStore from "./ListStore"
import UsersStore from "./UsersStore";
const store = init({
  models: {
    BoardStore,
    ListStore, 
    UsersStore
  },
});
export default store;
