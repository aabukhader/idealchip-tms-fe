import { connect } from "react-redux";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
const UsersList = ({
  users,
  getUsers,
  createUser,
}: {
  users: any[];
  getUsers: () => Promise<void>;
  createUser: (data: { name: string; email: string }) => Promise<void>;
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const getData = async () => {
    await getUsers();
  };
  useEffect(() => {
    getData();
  }, []);
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: { target: { value: any } }) => {
    const email = e.target.value;
    setEmail(email);
    setIsValid(validateEmail(email));
  };
  const footerContent = (
    <div className="w-full flex justify-end items-center ">
      <button
        disabled={!isValid}
        className={`border p-2 rounded-md ${
          !isValid
            ? "cursor-not-allowed"
            : "cursor-pointer hover:border-blue-700 hover:text-blue-700 "
        }`}
        onClick={async () => {
          await createUser({ name, email });
        }}
      >
        Create
      </button>
    </div>
  );
  return (
    <>
      <div className="w-full flex justify-between px-4  items-center">
        <h1 className="text-3xl text-gray-600">System Users List</h1>
        <i
          onClick={() => {
            setVisible(true);
          }}
          className="pi pi-plus p-4 text-blue-700 cursor-pointer rounded-full hover:bg-gray-200"
        ></i>
      </div>
      <div className="w-full gap-y-2 flex-col flex h-56 overflow-auto justify-start items-center px-4">
        {users.map((user: any, idx: number) => {
          return (
            <div
              key={idx}
              className={`flex flex-col w-full h-20 justify-between rounded-md border-2 p-3 cursor-pointer`}
            >
              <h1 className="text-gray-500 flex flex-col">
                user:
                <span className="text-blue-700 text-sm">{user.name}</span>
                <span className="text-blue-700 text-xs">{user.email}</span>
              </h1>

              <span className="text-xs text-gray-500">{user.created_at}</span>
            </div>
          );
        })}
      </div>
      <Dialog
        header="Add New User"
        visible={visible}
        className="w-1/3 h-auto"
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        footer={footerContent}
      >
        <div className="w-full p-4 flex flex-col justify-center items-center min-h-32">
          <label htmlFor="name" className="text-left w-full">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            id="name"
            className="w-full border rounded p-2"
          />
          <label htmlFor="email" className="text-left w-full">
            email
          </label>
          <input
            type="email"
            value={email}
            onChange={handleChange}
            id="email"
            className={`w-full border rounded p-2 ${
              !isValid ? "border-red-500 outline-red-500" : ""
            }`}
          />
        </div>
      </Dialog>
    </>
  );
};
const mapState = (state: any) => ({
  users: state.users.users,
});

const mapDispatch = (dispatch: any) => ({
  getUsers: () => dispatch.users.getUsersLists(),
  createUser: (data: { name: string; email: string }) =>
    dispatch.users.createUser(data),
});
export default connect(mapState, mapDispatch)(UsersList);
