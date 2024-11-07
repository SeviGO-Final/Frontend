import FormReport from "../../components/elements/forms/formReport";
import SideBar from "../../components/elements/Sidebar/sidebar";

const NewReport = () => {
  return (
    <>
      <div className="flex">
        <SideBar />
        <div className="w-3/4">
          <div className="flex items-center">
            <h1 className="my-8 ml-8 text-3xl">Buat Laporan Baru</h1>
            <hr className="border border-black w-4/5" />
          </div>
          <FormReport />
        </div>
      </div>
    </>
  );
};

export default NewReport;
