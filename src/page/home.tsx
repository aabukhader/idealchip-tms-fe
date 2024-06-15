import { connect } from "react-redux";
import { THomePage } from "../interface/THomePage";
import { useEffect } from "react";
import BoardsList from "../components/BoardsList";
import UsersList from "../components/UsersList";
import ListAndTickets from "../components/ListAndTickets";
const HomePage: React.FC<THomePage> = ({ boards, getBoards }) => {
  const getData = async () => {
    await getBoards();
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="w-full flex justify-start items-start ">
      <div className="w-1/4 flex justify-start items-start py-4 flex-col h-auto min-h-full">
        <BoardsList boards={boards} />
        <UsersList />
      </div>
      <div className="w-3/4 flex flex-col justify-start items-start py-4 h-full min-h-96">
        <h1 className="px-4 w-full text-3xl text-gray-600 pb-3">Board Lists</h1>
       <ListAndTickets></ListAndTickets>
      </div>
    </div>
  );
};
const mapState = (state: any) => ({
  boards: state.board.boards,
});

const mapDispatch = (dispatch: any) => ({
  getBoards: () => dispatch.board.getBoardsList(),
});
export default connect(mapState, mapDispatch)(HomePage);
