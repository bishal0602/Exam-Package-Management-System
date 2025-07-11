import { Component } from "react";
import FormFields from "../../Widgets/Form/forms.jsx";
import DepartmentTable from "./departmentHome.jsx";

class AddNewDepartment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        departmentName: {
          element: "input",
          value: "",
          required: true,
          labelText: "Department Name",
          config: {
            name: "programName_input",
            type: "text",
            placeholder: "Example: Department of Electronics Engineering",
          },
          validation: {
            required: false,
          },
          valid: true,
          touched: false,
          validationText: "",
        },
      },
      error: false,
      errorText: "",
      redirect: false,
      posted: false,
      errorOnSubmission: false,
      postedData: [],
    };
  }
  componentDidMount = () => {
    //Edit route

    const departmentID = this.props.match?.params.departmentID;
    if (departmentID !== undefined) {
      fetch(`/API/query/getOneDepartment/` + departmentID)
        .then((res) => res.json())
        .then((json) => {
          let { formData } = this.state;
          formData.departmentName.value = json[0].departmentName;
          this.setState({ formData: formData });
        });
    }
  };

  updateForm = (newState, id) => {
    this.setState({ formData: newState });
  };

  submitForm = (event) => {
    event.persist();
    let dataToSubmit = {};
    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
      const state = this.state;
      //0 check for dropdown
      if (
        dataToSubmit[key].toString() === null ||
        dataToSubmit[key].toString().match(/^ *$/) !== null
      ) {
        state.formData[key].validationText =
          state.formData[key].labelText + " cannot be empty";
        state.formData[key].valid = false;
        this.setState(state);
        return;
      } else {
        state.formData[key].validationText = "";
        state.formData[key].valid = true;
        this.setState(state);
      }
    }
    console.log(dataToSubmit);

    let url = `/API/query/addDepartment`;
    let methodType = "POST";

    //URL for update route
    const departmentID = this.props.match?.params.departmentID;
    if (departmentID !== undefined) {
      url = `/API/query/editDepartment/${departmentID}`;
      methodType = "PUT";
    }
    console.log(methodType);
    fetch(url, {
      method: methodType,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSubmit),
    })
      .then((res) => {
        res.json().then((body) => {
          console.log(body);
          let { postedData } = this.state;
          if (res.status === 200) {
            if (departmentID !== undefined || event.target.id === "save") {
              this.props.history.goBack();
              return;
            }
            console.log(body);
            let dataToDisplay = body;
            postedData.push(dataToDisplay);
            this.setState({
              posted: true,
              errorOnSubmission: false,
              postedData: postedData,
            });
          } else {
            this.setState({
              errorOnSubmission: true,
              errorText: "Invalid Value in Form",
              posted: false,
            });
          }
        });
      })
      .catch((err) => {
        this.setState({
          error: true,
          errorText: err,
        });
        console.log(err);
      });
  };
  errorCheck = () => {
    const { errorOnSubmission, errorText } = this.state;
    if (errorOnSubmission) {
      return <p>{errorText}</p>;
    }
  };

  loadForm = () => {
    return (
      <div>
        {this.errorCheck()}
        <FormFields
          formData={this.state.formData}
          change={(newState, id) => this.updateForm(newState, id)}
          submitForm={(event) => this.submitForm(event)}
        />
      </div>
    );
  };

  mainContent = () => {
    let { postedData, posted } = this.state;

    if (posted) {
      return (
        <div className="p">
          <div className="left-floated-form">{this.loadForm()}</div>
          <div>
            <DepartmentTable postedData={postedData} postedTable={true} />
          </div>
        </div>
      );
    } else {
      return <div>{this.loadForm()}</div>;
    }
  };

  render() {
    return <div className="container-fluid">{this.mainContent()}</div>;
  }
}

export default AddNewDepartment;
