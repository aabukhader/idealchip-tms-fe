import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dialog } from "primereact/dialog";
const BoardsList: React.FC<{
  boards: any[];
  getlists: (id: string) => Promise<void>;
  createBoard: ({ title }: { title: string }) => Promise<void>;
}> = ({ boards, getlists, createBoard }) => {
  const [selectedBoard, setSelectedBoard] = useState<string | undefined>();
  const [visible, setVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");

  const handleSubmit = async () => {
    await createBoard({ title });
    setVisible(false);
  };
  const footerContent = (
    <div className="w-full flex justify-end items-center ">
      <button
        className="hover:text-blue-700 border p-2 rounded-md hover:border-blue-700"
        onClick={() => {
          handleSubmit();
        }}
      >
        Create
      </button>
    </div>
  );
  return (
    <>
      <div className="w-full flex justify-between px-4  items-center">
        <h1 className="text-3xl text-gray-600">Boards List</h1>
        <i
          onClick={() => {
            setVisible(true);
          }}
          className="pi pi-plus p-4 text-blue-700 cursor-pointer rounded-full hover:bg-gray-200"
        ></i>
      </div>
      <div className="w-full gap-y-2 flex-col flex h-1/2 overflow-auto justify-start items-center px-4">
        {boards.map((board: any, idx: number) => {
          return (
            <div
              key={idx}
              className={`flex flex-col w-full h-20 justify-between rounded-md border-2 p-3 cursor-pointer ${
                board.id == selectedBoard ? "bg-gray-200" : ""
              }`}
              onClick={() => {
                setSelectedBoard(board.id);

                getlists(board.id);
              }}
            >
              <h1 className="text-gray-500 ">
                Board: <span className="text-blue-700">{board.title}</span>
              </h1>

              <span className="text-xs text-gray-500">{board.created_at}</span>
            </div>
          );
        })}
      </div>
      <Dialog
        header="Create New Board"
        visible={visible}
        className="w-1/3"
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        footer={footerContent}
      >
        <div className="w-full p-4 flex flex-col justify-center items-center h-32">
          <label htmlFor="Title" className="text-left w-full">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            id="Title"
            className="w-full border rounded p-2"
          />
        </div>
      </Dialog>
    </>
  );
};
const mapState = (state: any) => ({});

const mapDispatch = (dispatch: any) => ({
  getlists: (id: string) => dispatch.list.getBoardLists(id),
  createBoard: (data: { title: string }) => dispatch.board.createBoard(data),
});
export default connect(mapState, mapDispatch)(BoardsList);
