import { connect } from "react-redux";
import { Dialog } from "primereact/dialog";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
const ListAndTickets = ({
  lists,
  users,
  addNewTicket,
}: {
  lists: any[];
  users: any[];
  addNewTicket: (data: any) => Promise<void>;
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string | null>(" ");
  const [selectedUser, setSelectedUser] = useState();
  const [selectedStatus, setSelectedStatus] = useState<any>();
  const [todoId, setTodoId] = useState<string>("");
  const [isUpdate, setUpdate] = useState<boolean>(false);
  const [ticketIndx, setTicketIndex] = useState<number>(0);
  const [currentList, setCurrentList] = useState<any>();
  const usersList = users?.map((item) => {
    return {
      name: item.name,
      code: item.id,
    };
  });
  const statusList = lists?.map((item) => {
    return {
      name: item.title,
      code: item.id,
    };
  });

  const handleSubmit = async () => {
    if (isUpdate) {
      await addNewTicket({
        oldListId: currentList,
        index: ticketIndx,
        listId: selectedStatus.code,
        title,
        description: text,
        assignee: selectedUser,
      });
    } else {
      await addNewTicket({
        listId: todoId,
        title,
        description: text,
        assignee: selectedUser,
      });
    }
    setVisible(false);
    setSelectedStatus(null);
    setSelectedStatus(null);
    setText(null);
    setTitle("");
    setUpdate(false)
  };

  const footerContent = (
    <div className="w-full flex justify-end items-center ">
      <button
        className="hover:text-blue-700 border p-2 rounded-md hover:border-blue-700"
        onClick={async () => {
          await handleSubmit();
        }}
      >
        {!isUpdate ? "Create" : "Update"}
      </button>
    </div>
  );
  return (
    <div className="flex justify-center items-start w-full  gap-x-3">
      {lists?.length > 0 &&
        lists.map((item: any, idx: number) => {
          return (
            <div
              key={idx}
              className="flex flex-1 rounded-md border-2 p-3 justify-start items-start gap-y-2"
            >
              <div className="w-full flex flex-col justify-center items-start">
                <h1 className="felx justify-between items-center px-4 w-full text-lg text-gray-600 pb-3">
                  <span>{item?.title}</span>

                  {item.title == "To Do" ? (
                    <i
                      onClick={() => {
                        setVisible(true);
                        setTodoId(item.id);
                      }}
                      className="pi pi-plus p-4 text-blue-700 cursor-pointer rounded-full hover:bg-gray-200"
                    ></i>
                  ) : null}
                </h1>
                {item?.tasks &&
                  item?.tasks.map((ticket: any, idx: number) => {
                    return (
                      <div
                        key={idx}
                        className={`flex flex-col w-full h-20 justify-between rounded-md border-2 p-3 my-1 cursor-pointer `}
                        onClick={() => {
                          setUpdate(true);
                          setVisible(true);
                          setTitle(ticket.title);
                          setText(ticket.description);
                          setSelectedUser(ticket.assignee);
                          setTicketIndex(idx);
                          setCurrentList(item.id);
                        }}
                      >
                        <h1 className="text-gray-500 ">
                          Ticket:{" "}
                          <span className="text-blue-700">{ticket.title}</span>
                        </h1>

                        <span className="text-xs text-gray-500">
                          {ticket.created_at}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      <Dialog
        header={!isUpdate ? "Create New Ticket" : "update Ticket"}
        visible={visible}
        className="w-2/3"
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        footer={footerContent}
      >
        <div className="flex justify-center items-start w-full gap-x-2">
          <div className="w-3/4 p-4 flex flex-col justify-center items-center min-h-32">
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
              className="w-full border rounded p-2 mb-3"
            />
            <label htmlFor="description" className="text-left w-full">
              Description
            </label>
            <Editor
              id="description"
              value={text ? text : ""}
              onTextChange={(e: EditorTextChangeEvent) => setText(e.htmlValue)}
              style={{ height: "320px" }}
              className="w-full mb-3"
            />
          </div>
          <div className="w-1/4 px-4 flex flex-col justify-center items-center min-h-32 ">
            <label htmlFor="developer" className="text-left w-full">
              Developer
            </label>
            <Dropdown
              id="developer"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.value)}
              options={usersList}
              optionLabel="name"
              placeholder="Select a Developer"
              className="w-full border mb-3"
            />
            {isUpdate && (
              <>
                <label htmlFor="Status" className="text-left w-full">
                  Status
                </label>
                <Dropdown
                  id="Status"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.value)}
                  options={statusList}
                  optionLabel="name"
                  placeholder="Select a Status"
                  className="w-full border"
                />
              </>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
};

const mapState = (state: any) => ({
  lists: state.list.lists,
  users: state.users.users,
});
const mapDispatch = (dispatch: any) => ({
  addNewTicket: (data: any) => dispatch.list.addNewTicket(data),
});
export default connect(mapState, mapDispatch)(ListAndTickets);
