import SideBar from "../../components/elements/Sidebar/sidebar";
import HistoryTable from "../../components/elements/table/user/historytable";

const HistoryPage: React.FC = () => {
  return (
    <>
      <div className="flex flex-row lg:w-full w-3/4">
        <SideBar />
        <HistoryTable />
      </div>
    </>
  );
};

export default HistoryPage;
