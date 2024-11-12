import Createreport from "../../components/elements/table/admin/ContentCreateReport";
import SideBar from "../../components/elements/Sidebar/sidebar";

const CreateReport = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <SideBar />
            <Createreport />
        </div>
    )
}

export default CreateReport;