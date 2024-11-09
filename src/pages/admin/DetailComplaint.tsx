import React from "react";
import SideBar from "../../components/elements/Sidebar/sidebar";
import ComplaintDetail from "../../components/elements/table/admin/contentDetailComplaint"

const DetailComplaintPage: React.FC = () => {
    return (
        <div className="flex min-h-screen">
            <SideBar />
            <ComplaintDetail />
        </div>
    )
}

export default DetailComplaintPage;