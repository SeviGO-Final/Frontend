import SideBar from "../../components/elements/Sidebar/sidebar";
import Complain from "../../components/elements/table/admin/contentComplainList";

const ComplaintList = () => {
    return (
        <>
            <div className="flex min-h-screen bg-gray-100">
                <SideBar />
                <Complain />
            </div>
        </>
    )
}

export default ComplaintList;