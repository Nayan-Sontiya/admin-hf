import React, { useState, useEffect } from 'react';
import SideNav from "../Common/SideNav";
import Heading from '../Common/Heading';
import DataTableComponent from "../Common/DataTableComponent";
import Loader from '../Common/Loader';
import {
    GetRequest, dateFormator
} from "../ApiHandler/ApiHandler";
const UserRequirement = () => {

    let [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPosts()
    }, [])

    async function fetchPosts() {
        setLoading(true);
        let res = await GetRequest("getRequirements");
        if (res.status ===200) {
            setData(res.data);
        } else {
            setData([]);
        }
        setLoading(false);
    }
    const columns = [
        {
            name: "Sr. No.",
            selector: "",
            sortable: true,
            cell: (row, index) => index + 1,
        },
        {
            name: "Name",
            selector: "name",
            sortable: true,
            cell: (row) => (row["name"] === "" ? "NA" : (row["name"])),
        },

        {
            name: "Email",
            selector: "email",
            sortable: true,
            cell: (row) => (row["email"] === "" ? "NA" : (row["email"])),
        },
        {
            name: "Message",
            selector: "requirement_message",
            sortable: true,
            cell: (row) => (row["requirement_message"] === "" ? "NA" : (row["requirement_message"])),
        },
    
        {
            name: "Created at",
            selector: "createdAt",
            sortable: true,
            cell: (row) => (row["createdAt"] === "" ? "NA" : dateFormator(row["createdAt"])),
        },

    ]
    return (
        <div className="page-content d-flex align-items-stretch">
            <div className="default-sidebar">
                <SideNav />
            </div>
            <div className="content-inner">
                <div className="container-fluid bgBlue">
                    <Heading headingText="User Requirement" buttonComponent='' />
                    <div className="row flex-row">
                        <div className="col-xl-12">
                            <div className="widget has-shadow" id="manageRestaurant">
                                <div className="widget-body positionRelative p-0">
                                    {loading ? (
                                        <div className="loader">
                                            <Loader
                                                size={40}
                                                className="loader"
                                                color="#5d5386"
                                            />
                                        </div>
                                    ) : (
                                            <div style={{ display: "none" }}></div>
                                        )}
                                    <DataTableComponent columns={columns} data={data} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserRequirement
