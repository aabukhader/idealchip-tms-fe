import Header from "../components/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" w-full h-screen ">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
