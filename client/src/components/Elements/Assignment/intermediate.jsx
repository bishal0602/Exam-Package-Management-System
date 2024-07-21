import React, { Component } from "react";
import PersonTable from "../Person/personTable.jsx";
import { MDBCard, MDBCardHeader, MDBCardBody, MDBBtn } from "mdbreact";
import BreadCrumbs from "../../Widgets/Breadcrumb/breadcrumb.jsx";
import { Link } from "react-router-dom";
import "./assignment.css";

const breadCrumbItem = [
  {
    text: "Person Table",
    link: "/admin/intermediate",
  },
];

class Intermediate extends Component {
  state = {
    tableData: [],
  };

  render() {
    return (
      <React.Fragment>
        <BreadCrumbs breadcrumbItems={breadCrumbItem} />
        <MDBCard>
          <MDBCardHeader>
            <span>Choose Person to Assign </span>
            <Link to="/admin/add-new-person" style={{ float: "right" }}>
            <MDBBtn>
              Not Registered Yet?
            </MDBBtn>
            </Link>
          </MDBCardHeader>
          <MDBCardBody>
            <PersonTable />
          </MDBCardBody>
        </MDBCard>
      </React.Fragment>
    );
  }
}

export default Intermediate;
