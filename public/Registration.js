import React, { useState, useEffect } from "react";
import SideNav from "../Common/SideNav";
import Heading from "../Common/Heading";
import { GetRequest, PostRequestFormControl } from "./../ApiHandler/ApiHandler";
import { Country, State, City } from "country-state-city";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
const Registration = () => {
  let currentDate = new Date().toISOString().split("T")[0];
  let history = useHistory();
  let [categoryData, setCategoryData] = useState([]);
  let [subcategoryData, setSubcategoryData] = useState([]);
  let [categoryId, setCategoryId] = useState("");
  let [occupationId, setOccupationId] = useState("");
  let [category, setCategory] = useState("");
  let [occupationData, setOccupationData] = useState([]);
  let [stateCode, setStateCode] = useState("");
  let [countryCode, setCountryCode] = useState("");
  let [dob, setDob] = useState("");
  let [age, setAge] = useState("");
  let [type_of_employement, setType_of_employement] = useState("");
  let [sub_category, setSub_category] = useState("");
  let [name_of_candidate, setName_of_candidate] = useState("");
  let [permanent_address, setPermanent_address] = useState("");
  let [contactno1, setContactno1] = useState("");
  let [contactno2, setContactno2] = useState("");
  let [aadhar_card_no, setAadhar_card_no] = useState("");
  let [pan_card_no, setPan_card_no] = useState("");
  let [passportNo, setPassportNo] = useState("");
  let [date_of_expiry, setDate_of_expiry] = useState("");
  // let [place_of_issue, setPlace_of_issue] = useState("");
  let [email_address, setEmail_address] = useState("");
  let [relative_contact_no, setRelative_contact_no] = useState("");
  let [father_name, setFather_name] = useState("");
  let [education, setEducation] = useState("");
  let [hobbies_and_interest, setHobbies_and_interest] = useState("");
  let [religion, setReligion] = useState("");
  let [marital_status, setMarital_status] = useState("");
  let [location_of_work, setLocation_of_work] = useState("");
  let [certificateImage, setCertificateImage] = useState("");
  let [Photograph, setPhotograph] = useState("");
  let [experienceIndian, setExperienceIndian] = useState("");
  let [experienceAbroad, setExperienceAbroad] = useState("");
  // let [dishPhotograph, setDishPhotograph] = useState("");
  let [salaryExpectation, setSalaryExpectation] = useState("");
  let [showCountryStateCityContainer, setShowCountryStateCityContainer] =
    useState(false);
  let [chefType, setChefType] = useState("");
  let [experience, setExperience] = useState("");
  let [candidate_rating, setCandidate_rating] = useState("");
  let [expOutletName, setExpOutletName] = useState("");
  let [expDesignation, setExpDesignation] = useState("");
  let [expPlace, setExpPlace] = useState("");
  let [expStartDate, setExpStartDate] = useState("");
  let [expEndDate, setExpEndDate] = useState("");

  let [experiences, setExperiences] = useState([]);

  
  const submitExp = (e) => {
    e.preventDefault();
    var experiencesDetails = {}
    experiencesDetails.expOutletName = expOutletName;
    experiencesDetails.expDesignation = expDesignation;
    experiencesDetails.expPlace = expPlace;
    experiencesDetails.expStartDate = expStartDate;
    experiencesDetails.expEndDate = expEndDate;
    setExperiences((prev)=> [...prev , experiencesDetails]);
  };
  async function registration() {
    const data = new FormData();
    data.append("type_of_employement", type_of_employement);
    [...category].forEach((categoryDetails) => {
      data.append("category", categoryDetails);
    });
    [...sub_category].forEach((subcategoryDetails) => {
      data.append("sub_category", subcategoryDetails);
    });

    data.append("name_of_candidate", name_of_candidate);
    data.append("permanent_address", permanent_address);
    data.append("contactno1", contactno1);
    data.append("contactno2", contactno2);
    data.append("chef_type", chefType);
    data.append("aadhar_card_no", aadhar_card_no);
    data.append("pan_card_no", pan_card_no);
    data.append("passportNo", passportNo);
    data.append("candidate_rating", candidate_rating);
    data.append("date_of_expiry", date_of_expiry);
    data.append("email_address", email_address);
    data.append("relative_contact_no", relative_contact_no);
    data.append("dob", dob);
    data.append("age", age);
    data.append("father_name", father_name);
    data.append("education", education);
    data.append("hobbies_and_interest", hobbies_and_interest);
    data.append("religion", religion);
    data.append("marital_status", marital_status);
    data.append("experience_in_month", experience);

    [...location_of_work].forEach((locationDetails) => {
      data.append("location_of_work", locationDetails);
    });
    [...certificateImage].forEach((certificate) => {
      data.append("certificate", certificate);
    });
    [...Photograph].forEach((photograph) => {
      data.append("picture", photograph);
    });
   
    if (experienceIndian === "Indian") {
      data.append("indian", "yes");
    } else {
      data.append("indian", "no");
    }
    if (experienceAbroad === "Abroad") {
      data.append("abroad", "yes");
    } else {
      data.append("abroad", "no");
    }
    data.append("salary_expectation", salaryExpectation);
    // data.append("experiences",experiences);
    [...experiences].forEach((experiencesDetails) => {
      console.log(experiencesDetails)
      data.append("experiences", JSON.stringify(experiencesDetails));
    });
    let returnValue = await PostRequestFormControl("registerCandidates", data);
    if (returnValue._id !== undefined) {
      swal({
        title: "Success",
        text: "Candidate added successfully!",
        icon: "success",
        buttons: true,
      }).then(function (isConfirm) {
        if (isConfirm) {
          history.push("/view-registration");
        }
      });
    } else {
      swal({
        title: "Error",
        text: returnValue.message,
        icon: "error",
        buttons: "Ok",
      });
    }
  }

  useEffect(() => {
    getOccupation();
  }, []);
  useEffect(() => {
    getCategoryList();
    setSub_category([]);
    setCategory([]);
    if (document.getElementById("subCategory") !== null) {
      document.getElementById("subCategory").selectedIndex = 0;
      document.getElementById("Category").selectedIndex = 0;
    }
  }, [occupationId]);
  useEffect(() => {
    getSubCategory();
  }, [categoryId]);

  useEffect(() => {
    if (dob !== "") {
      var birthday = +new Date(dob);
      setAge(~~((Date.now() - birthday) / 31557600000));
    }
  }, [dob]);
  useEffect(() => {
    if (document.getElementById("cityDropdown") !== null) {
      document.getElementById("cityDropdown").selectedIndex = 0;
    }
  }, [countryCode, stateCode]);
  async function getOccupation() {
    let res = await GetRequest("getOccupations/all");
    if (res.status === 200) {
      setOccupationData(res.data);
    } else {
      setOccupationData([]);
    }
  }
  async function getCategoryList() {
    let res = await GetRequest("getCategory/occupationId_" + occupationId);
    if (res.status === 200) {
      setCategoryData(res.data);
    } else {
      setCategoryData([]);
    }
  }

  async function getSubCategory() {
    let res = await GetRequest("getSubCategory/catId_" + categoryId);
    if (res.status === 200) {
      setSubcategoryData(res.data);
    } else {
      setSubcategoryData([]);
    }
  }
  const CheckIfCategoryPresent = (categoryOpt) => {
    const token = category.includes(categoryOpt);
    return token;
  };
  const categoryArr = (categoryArr) => {
    if (CheckIfCategoryPresent(categoryArr) === false) {
      setCategory([...category, categoryArr]);
    } else {
      swal({
        title: "",
        text: "Category already added",
        icon: "info",
        buttons: "Ok",
      });
    }
    document.getElementById("subCategory").selectedIndex = 0;
  };
  const CheckIfSubCategoryPresent = (categoryOpt) => {
    const token = sub_category.includes(categoryOpt);
    return token;
  };
  const subCategoryArr = (subCategoryArr) => {
    if (CheckIfSubCategoryPresent(subCategoryArr) === false) {
      setSub_category([...sub_category, subCategoryArr]);
    } else {
      swal({
        title: "",
        text: "Sub Category already added",
        icon: "info",
        buttons: "Ok",
      });
    }
  };
  const CheckIfCityPresent = (categoryOpt) => {
    const token = location_of_work.includes(categoryOpt);
    return token;
  };
  const cityArr = (cityArr) => {
    if (CheckIfCityPresent(cityArr) === false) {
      setLocation_of_work([...location_of_work, cityArr]);
    } else {
      swal({
        title: "",
        text: "City already added",
        icon: "info",
        buttons: "Ok",
      });
    }
  };
  const selectWorkPlaceValue = (value) => {
    if (value === "anywhere") {
      setShowCountryStateCityContainer(false);
    } else {
      setShowCountryStateCityContainer(true);
      setLocation_of_work([]);
    }
  };
  // console.log("location_of_work", location_of_work);
  // console.log(
  //   "setShowCountryStateCityContainer",
  //   showCountryStateCityContainer
  // );
  const removeSubCategoryArr = (subCategoryArr) => {
    let updatedSubCatArr = sub_category.filter(
      (subCat) => subCat !== subCategoryArr
    );
    setSub_category(updatedSubCatArr);
  };
  const removeCategoryArr = (categoryArr) => {
    let updatedSubCatArr = category.filter((subCat) => subCat !== categoryArr);
    setCategory(updatedSubCatArr);
  };
  const removeCityArr = (city) => {
    let updatedSubCatArr = location_of_work.filter((subCat) => subCat !== city);
    setLocation_of_work(updatedSubCatArr);
  };
  function emailFormateValidation(email) {
    if (email !== "") {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(email) === false) {
        document.getElementById("email").style.border = "1px solid red";
        return false;
      } else {
        document.getElementById("email").style.border = "";
        return true;
      }
    }
  }
  useEffect(() => {
    if (document.getElementById("age") !== null && age !== "")
      if (age < 18) {
        document.getElementById("age").style.border = "1px solid red";
        document.getElementById("ageError").style.display = "block";
      }
  }, [age]);
  useEffect(() => {
    emailFormateValidation(email_address);
  }, [email_address]);
  const validateIfFieldEmpty = () => {
    if (
      category === "" ||
      type_of_employement === "" ||
      sub_category === "" ||
      name_of_candidate === "" ||
      permanent_address === "" ||
      contactno1 === "" ||
      email_address === "" ||
      relative_contact_no === "" ||
      dob === "" ||
      age === "" ||
      father_name === "" ||
      education === "" ||
      religion === "" ||
      marital_status === "" ||
      location_of_work === "" ||
      experience === ""
    ) {
      if (experience === "") {
        document.getElementById("experience").style.border = "1px solid red";
      }
      if (category === "") {
        document.getElementById("Category").style.border = "1px solid red";
      }
      if (type_of_employement === "") {
        document.getElementById("employemntType").style.border =
          "1px solid red";
      }
      if (sub_category === "") {
        document.getElementById("subCategory").style.border = "1px solid red";
      }
      if (name_of_candidate === "") {
        document.getElementById("name").style.border = "1px solid red";
      }
      if (permanent_address === "") {
        document.getElementById("permanentAddress").style.border =
          "1px solid red";
      }

      if (contactno1 === "") {
        document.getElementById("contact1").style.border = "1px solid red";
      }
      if (email_address === "") {
        document.getElementById("email").style.border = "1px solid red";
      }
      if (relative_contact_no === "") {
        document.getElementById("relativePhone").style.border = "1px solid red";
      }
      if (dob === "") {
        document.getElementById("dob").style.border = "1px solid red";
      }
      if (age === "") {
        document.getElementById("age").style.border = "1px solid red";
      }
      if (father_name === "") {
        document.getElementById("fatherName").style.border = "1px solid red";
      }
      if (education === "") {
        document.getElementById("education").style.border = "1px solid red";
      }
      if (religion === "") {
        document.getElementById("religion").style.border = "1px solid red";
      }
      if (marital_status === "") {
        document.getElementById("maritalStatue").style.border = "1px solid red";
      }
      if (location_of_work === "") {
        swal({
          title: "Error",
          text: "Work Location Can Not Be Empty!",
          icon: "error",
          buttons: "Ok",
        });
      }
    } else {
      if (age >= 18) {
        if (emailFormateValidation(email_address) === true) {
          registration();
        } else {
          swal({
            title: "",
            text: "Email is invalid!",
            icon: "error",
            buttons: "Ok",
          });
        }
      } else {
        swal({
          title: "Error",
          text: "Candidate's age can not be less then 18 years!",
          icon: "Error",
          buttons: "Ok",
        });
      }
    }
  };


  return (
    <div className="page-content d-flex align-items-stretch">
      <div className="default-sidebar">
        <SideNav />
      </div>
      <div className="content-inner">
        <div className="container-fluid bgBlue">
          <Heading headingText="Candidate Registration" buttonComponent="" />
          <div className="row flex-row">
            <div className="col-xl-12">
              <div className="widget has-shadow" id="manageRestaurant">
                <div className="widget-body positionRelative p-0">
                  <div>
                    <h5 className="pl-4 pt-4">Candidate Registration Form</h5>
                    <hr />
                     <select
                              className="form-control"
                              onChange={(e) => cityArr(e.target.value)}
                              id="cityDropdown"
                            >
                              {
                                City.getAllCities().map((categoryVal, i) => {
                                  return (
                                    <option
                                      value={categoryVal.name}
                                      key={i}
                                    >
                                      {categoryVal.name}
                                    </option>
                                  );
                                })
                              }
                            </select>
                    <div className="row d-flex justify-content-center m-0">
                      <div className="col-md-8">
                        <div className="form-group row mt-4">
                          <label className="col-sm-4 col-form-label text-dark text-md-right">
                            Employment Type *
                          </label>
                          <div className="col-sm-7">
                            <select
                              className="form-control"
                              id="employemntType"
                              onChange={(e) => {
                                setType_of_employement(
                                  e.target.options[e.target.selectedIndex].text
                                );
                                setOccupationId(e.target.value);
                              }}
                            >
                              {occupationData.length !== 0 ? (
                                <option disabled selected>
                                  Select Occupation
                                </option>
                              ) : (
                                ""
                              )}
                              {occupationData.length !== 0 ? (
                                occupationData.map((categoryVal, i) => {
                                  return (
                                    <option key={i} value={categoryVal._id}>
                                      {categoryVal.type}
                                    </option>
                                  );
                                })
                              ) : (
                                <option disabled selected>
                                  No Employment Type found
                                </option>
                              )}
                            </select>
                          </div>
                        </div>
                        {category.length > 0 ? (
                          <div className="form-group row mt-4">
                            <label className="col-sm-4 col-form-label text-dark text-md-right"></label>
                            <div className="col-sm-7 border pb-4 pt-3">
                              <p className="font-weight-bold">
                                Selected Category
                              </p>
                              {category.length > 0
                                ? category.map((value) => {
                                    return (
                                      <span className="position-relative">
                                        <span className="cityButton">
                                          {value}
                                        </span>
                                        <span
                                          onClick={() =>
                                            removeCategoryArr(value)
                                          }
                                          className="crossButtonPreview"
                                        >
                                          X
                                        </span>
                                      </span>
                                    );
                                  })
                                : ""}
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="form-group row mt-4">
                          <label className="col-sm-4 col-form-label text-dark text-md-right">
                            Category
                          </label>
                          <div className="col-sm-7">
                            <select
                              className="form-control"
                              id="Category"
                              onChange={(e) => {
                                setCategoryId(e.target.value);
                                categoryArr(
                                  e.target.options[e.target.selectedIndex].text
                                );
                              }}
                            >
                              {categoryData.length !== 0 ? (
                                <option disabled selected>
                                  Select Category
                                </option>
                              ) : (
                                ""
                              )}

                              {categoryData.length !== 0 ? (
                                categoryData.map((categoryVal, i) => {
                                  return (
                                    <option value={categoryVal._id}>
                                      {categoryVal.category}
                                    </option>
                                  );
                                })
                              ) : (
                                <option disabled selected>
                                  No Category Added
                                </option>
                              )}
                            </select>
                          </div>
                        </div>
                        {sub_category.length > 0 ? (
                          <div className="form-group row mt-4">
                            <label className="col-sm-4 col-form-label text-dark text-md-right"></label>
                            <div className="col-sm-7 border pb-4 pt-3">
                              <p className="font-weight-bold">
                                Selected Sub Category
                              </p>
                              {sub_category.length > 0
                                ? sub_category.map((value) => {
                                    return (
                                      <span className="position-relative">
                                        <span className="cityButton">
                                          {value}
                                        </span>
                                        <span
                                          onClick={() =>
                                            removeSubCategoryArr(value)
                                          }
                                          className="crossButtonPreview"
                                        >
                                          X
                                        </span>
                                      </span>
                                    );
                                  })
                                : ""}
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="form-group row mt-4">
                          <label className="col-sm-4 col-form-label text-dark text-md-right">
                            Sub Category
                          </label>
                          <div className="col-sm-7">
                            <select
                              className="form-control"
                              id="subCategory"
                              onChange={(e) => subCategoryArr(e.target.value)}
                            >
                              {subcategoryData.length !== 0 ? (
                                <option disabled selected>
                                  Select Sub Category
                                </option>
                              ) : (
                                ""
                              )}

                              {subcategoryData.length !== 0 ? (
                                subcategoryData.map((categoryVal, i) => {
                                  return (
                                    <option value={categoryVal.subcategory}>
                                      {categoryVal.subcategory}
                                    </option>
                                  );
                                })
                              ) : (
                                <option disabled selected>
                                  Select Category First
                                </option>
                              )}
                            </select>
                          </div>
                        </div>

                        <div className="form-group row mt-4">
                          <label className="col-sm-4 col-form-label text-dark text-md-right">
                            Name *
                          </label>
                          <div className="col-sm-7">
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                              onChange={(e) =>
                                setName_of_candidate(e.target.value)
                              }
                              placeholder="Name"
                            />
                          </div>
                        </div>

                        <div className="form-group row mt-4">
                          <label className="col-sm-4 col-form-label text-dark text-md-right">
                            Aadhar Card No
                          </label>
                          <div className="col-sm-7">
                            <input
                              type="text"
                              className="form-control"
                              id="aadharCard"
                              onInput={(e) =>
                                (e.target.value = e.target.value
                                  .replace(/[^0-9.]/g, "")
                                  .replace(/(\..*?)\..*/g, "$1"))
                              }
                              onChange={(e) =>
                                setAadhar_card_no(e.target.value)
                              }
                              maxLength="12"
                              placeholder="Aadhar Card No"
                            />
                          </div>
                        </div>
                        <div className="form-group row mt-4">
                          <label className="col-sm-4 col-form-label text-dark text-md-right">
                            PAN No
                          </label>
                          <div className="col-sm-7">
                            <input
                              type="text"
                              className="form-control"
                              maxLength="10"
                              onChange={(e) => setPan_card_no(e.target.value)}
                              placeholder="Pan No"
                            />
                          </div>
                        </div>

                        <div className="form-group row mt-4">
                          <label className="col-sm-4 col-form-label text-dark text-md-right">
                            Email *
                          </label>
                          <div className="col-sm-7">
                            <input
                              type="email"
                              id="email"
                              onChange={(e) => setEmail_address(e.target.value)}
                              className="form-control"
                              placeholder="Email"
                            />
                          </div>
                        </div>
                        <div className="form-group row mt-4">
                          <label className="col-sm-4 col-form-label text-dark text-md-right">
                            Candidate Photograph
                          </label>
                          <div className="col-sm-7">
                            <input
                              type="file"
                              id="candidatePhotograph"
                              className="form-control"
                              accept="image/*"
                              onChange={(e) => setPhotograph(e.target.files)}
                            />
                          </div>
                        </div>
                        <div className="form-group row mt-4">
                          <label className="col-sm-4 col-form-label text-dark text-md-right">
                            DOB *
                          </label>
                          <div className="col-sm-7">
                            <input
                              type="date"
                              id="dob"
                              max={currentDate}
                              className="form-control"
                              onChange={(e) => setDob(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="form-group row mt-4">
                          <label className="col-sm-4 col-form-label text-dark text-md-right">
                            Age
                          </label>
                          <div className="col-sm-7">
                            <input
                              type="text"
                              readOnly
                              className="form-control"
                              id="age"
                              onChange={(e) => {
                                setAge(e.target.value);
                              }}
                              placeholder="Age"
                              value={age}
                            />
                            <span
                              style={{ display: "none" }}
                              id="ageError"
                              className="text-danger small"
                            >
                              Age can not be less then 18 years
                            </span>
                          </div>
                        </div>
                        <div className="form-group row mt-4">
                          <label className="col-sm-4 col-form-label text-dark text-md-right">
                            Father Name *
                          </label>
                          <div className="col-sm-7">
                            <input
                              type="text"
                              className="form-control"
                              id="fatherName"
                              onChange={(e) => setFather_name(e.target.value)}
                              placeholder="Father Name"
                            />
                          </div>
                        </div>
                        <div className="form-group row mt-4">
                          <label className="col-sm-4 col-form-label text-dark text-md-right">
                            Work Experience
                          </label>
                          <div className="col-sm-7">
                            <input
                              className="mr-2 mt-2"
                              type="checkbox"
                              value="Indian"
                              onChange={(e) =>
                                setExperienceIndian(e.target.value)
                              }
                            />
                            <label className=" mr-4 mt-2">Indian</label>
                            <input
                              className="mr-2 mt-2"
                              type="checkbox"
                              value="Abroad"
                              onChange={(e) =>
                                setExperienceAbroad(e.target.value)
                              }
                            />
                            <label className="mt-2">Abroad</label>
                          </div>
                        </div>
                        <div className="form-group row mt-4">
                          <label className="col-sm-4 col-form-label text-dark text-md-right">
                            Work Experience*
                          </label>
                          <div className="col-sm-7">
                            <select
                              className="form-control"
                              id="experience"
                              onChange={(e) => setExperience(e.target.value)}
                            >
                              <option selected disabled>
                                Select Work Experience
                              </option>
                              <option value="6">0-6 months</option>
                              <option value="12">6-12 months</option>
                              <option value="18">1-1.5 year </option>
                              <option value="24">2 year</option>
                              <option value="36">3 year</option>
                              <option value="48">4 year</option>
                              <option value="60">5 year</option>
                              <option value="72">6 year</option>
                              <option value="84">7 year</option>
                              <option value="96">8 year</option>
                              <option value="108">9 year</option>
                              <option value="120">10 year</option>
                            </select>
                          </div>
                        </div>
                        {experiences.length > 0 ? (
                          <div className="form-group row mt-4">
                            <label className="col-sm-2 col-form-label text-dark text-md-right"></label>
                            <div className="col-sm-9 border pb-4 pt-3">
                              <p className="font-weight-bold">
                                Experience Details
                              </p>
                              {experiences.length > 0
                                ? experiences.map((value, i) => {
                                    return (
                                      <div
                                        className="position-relative row p-0 p-2 m-0 expDetailsBox"
                                        key={i}
                                      >
                                        <div className="col-12 col-sm-6 pt-1 ">
                                          <div className="row p-0 m-0">
                                            <label>Outlet Name :</label>
                                            <p className="pl-2">
                                              {value.expOutletName}
                                            </p>
                                          </div>
                                          <div className="row p-0 m-0">
                                            <label>Designation : </label>
                                            <p className="pl-2">
                                              {value.expDesignation}
                                            </p>
                                          </div>
                                          <div className="row p-0 m-0">
                                            <label>Place :</label>
                                            <p className="pl-2">
                                              {value.expPlace}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="col-12 col-sm-6 mt-1">
                                          <div className="row p-0 m-0">
                                            <label> Start date :</label>
                                            <p className="pl-2">
                                              {value.expStartDate}
                                            </p>
                                          </div>
                                          <div className="row p-0 m-0">
                                            <label> End date :</label>
                                            <p className="pl-2">
                                              {value.expEndDate}
                                            </p>
                                          </div>
                                          <div className="row p-0 m-0 text-center pt-1 pb-2">
                                            <button className="expDetailsRemoveBtn ">
                                              Remove Details
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })
                                : ""}
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="form-group row mt-4">
                          <label className="col-sm-4 col-form-label text-dark text-md-right">
                            Work Experience Details
                          </label>
                          <div className="col-sm-7 row p-0 m-0">
                            <label className="col-sm-4 col-form-label text-dark text-md-right">
                              Outlet Name
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="text"
                                className="form-control"
                                onChange={(e) =>
                                  setExpOutletName(e.target.value)
                                }
                                placeholder="Outlet Name"
                              />
                            </div>

                            <label className="col-sm-4 col-form-label mt-2 text-dark text-md-right">
                              Designation
                            </label>
                            <div className="col-sm-8 mt-2">
                              <input
                                type="text"
                                className="form-control"
                                onChange={(e) =>
                                  setExpDesignation(e.target.value)
                                }
                                placeholder="Enter your designation"
                              />
                            </div>
                            <label className="col-sm-4 col-form-label mt-2 text-dark text-md-right">
                              Place
                            </label>
                            <div className="col-sm-8 mt-2">
                              <input
                                type="text"
                                onChange={(e) => setExpPlace(e.target.value)}
                                className="form-control"
                                placeholder="Place"
                              />
                            </div>
                            <label className="col-sm-4 col-form-label mt-2 text-dark text-md-right">
                              Start date
                            </label>
                            <div className="col-sm-8 mt-2">
                              <input
                                type="date"
                                onChange={(e) =>
                                  setExpStartDate(e.target.value)
                                }
                                className="form-control"
                              />
                            </div>
                            <label className="col-sm-4 col-form-label mt-2 text-dark text-md-right">
                              End date
                            </label>
                            <div className="col-sm-8 mt-2">
                              <input
                                type="date"
                                onChange={(e) => setExpEndDate(e.target.value)}
                                className="form-control"
                              />
                            </div>
                            <div className="col-md-12 text-center pt-3">
                              <button
                                onClick={submitExp}
                                className="expDetailsBtn"
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="form-group row mt-4">
                          <label className="col-sm-4 col-form-label text-dark text-md-right">
                            Salary Expectation *
                          </label>
                          <div className="col-sm-7">
                            <input
                              type="text"
                              id="salaryExpectation"
                              onInput={(e) =>
                                (e.target.value = e.target.value
                                  .replace(/[^0-9.]/g, "")
                                  .replace(/(\..*?)\..*/g, "$1"))
                              }
                              className="form-control"
                              onChange={(e) =>
                                setSalaryExpectation(e.target.value)
                              }
                              placeholder="Salary Expectation per month"
                            />
                          </div>
                        </div>
                        {/* <div className="form-group row mt-4">
                          <label className="col-sm-4 col-form-label text-dark text-md-right">
                            Dish Photographs
                          </label>
                          <div className="col-sm-7">
                            <input
                              type="file"
                              className="form-control"
                              multiple
                              accept="image/*"
                              onChange={(e) =>
                                setDishPhotograph(e.target.files)
                              }
                            />
                            <span className="text-info small">
                              If you are a chef/cook please add images of your
                              dishes
                            </span>
                          </div>
                        </div> */}
                        <div className="form-group row mt-4">
                          <label className="col-sm-4 col-form-label text-dark text-md-right">
                            Chef Type
                          </label>
                          <div className="col-sm-7">
                            <select
                              className="form-control"
                              id=""
                              onChange={(e) => setChefType(e.target.value)}
                            >
                              <option selected disabled>
                                Select Type
                              </option>
                              <option value="Domestic">Domestic</option>
                              <option value="Restaurant">Restaurant</option>
                            </select>
                            <span className="text-info small">
                              If you are a chef/cook please select type
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group row mt-4">
                          <label className="col-sm-4 col-form-label text-dark text-md-right">
                            Permanent Address *
                          </label>
                          <div className="col-sm-7">
                            <input
                              type="text"
                              className="form-control"
                              id="permanentAddress"
                              onChange={(e) =>
                                setPermanent_address(e.target.value)
                              }
                              placeholder="Permanent Address"
                            />
                          </div>
                        </div>
                        <div className="form-group row mt-4">
                          <label className="col-sm-4 col-form-label text-dark text-md-right">
                            Contact no 1 *
                          </label>
                          <div className="col-sm-7">
                            <input
                              type="text"
                              className="form-control"
                              id="contact1"
                              maxLength="10"
                              onInput={(e) =>
                                (e.target.value = e.target.value
                                  .replace(/[^0-9.]/g, "")
                                  .replace(/(\..*?)\..*/g, "$1"))
                              }
                              onChange={(e) => setContactno1(e.target.value)}
                              placeholder="Contact no 1"
                            />
                          </div>
                        </div>
                        <div className="form-group row mt-4">
                          <label className="col-sm-4 col-form-label text-dark text-md-right">
                            Contact no 2
                          </label>
                          <div className="col-sm-7">
                            <input
                              type="text"
                              className="form-control"
                              maxLength="10"
                              onInput={(e) =>
                                (e.target.value = e.target.value
                                  .replace(/[^0-9.]/g, "")
                                  .replace(/(\..*?)\..*/g, "$1"))
                              }
                              onChange={(e) => setContactno2(e.target.value)}
                              placeholder="Contact no 2"
                            />
                          </div>
                        </div>
                        <div className="form-group row mt-4">
                          <label className="col-sm-4 col-form-label text-dark text-md-right">
                            Relative Phone No *
                          </label>
                          <div className="col-sm-7">
                            <input
                              type="text"
                              id="relativePhone"
                              maxLength="10"
                              className="form-control"
                              onInput={(e) =>
                                (e.target.value = e.target.value
                                  .replace(/[^0-9.]/g, "")
                                  .replace(/(\..*?)\..*/g, "$1"))
                              }
                              onChange={(e) =>
                                setRelative_contact_no(e.target.value)
                              }
                              placeholder="Sibling / Relative Phone No"
                            />
                          </div>
                        </div>
                        <div className="form-group row mt-4">
                          <label className="col-sm-4 col-form-label text-dark text-md-right">
                            Ratings
                          </label>
                          <div className="col-sm-7">
                            <input
                              type="text"
                              id="ratings"
                              maxLength="3"
                              className="form-control"
                              onInput={(e) =>
                                (e.target.value = e.target.value
                                  .replace(/[^0-9.]/g, "")
                                  .replace(/(\..*?)\..*/g, "$1"))
                              }
                              onChange={(e) =>
                                setCandidate_rating(e.target.value)
                              }
                              placeholder="Enter candidates ratings"
                            />
                          </div>
                        </div>
                        <div className="form-group row mt-4">
                          <label className="col-sm-4 col-form-label text-dark text-md-right">
                            Passport No
                          </label>
                          <div className="col-sm-7">
                            <input
                              type="text"
                              className="form-control"
                              id="passportNo"
                              maxLength="9"
                              onChange={(e) => setPassportNo(e.target.value)}
                              placeholder="Passport No"
                            />
                          </div>
                        </div>
                        <div className="form-group row mt-4">
                          <label className="col-sm-4 col-form-label text-dark text-md-right">
                            Passport expiry Date
                          </label>
                          <div className="col-sm-7">
                            <input
                              type="date"
                              id="issueDate"
                              min={currentDate}
                              onChange={(e) =>
                                setDate_of_expiry(e.target.value)
                              }
                              className="form-control"
                            />
                          </div>
                        </div>
                        {/* <div className="form-group row mt-4">
                          <label className="col-sm-4 col-form-label text-dark text-md-right">
                            Passport Issue Place
                          </label>
                          <div className="col-sm-7">
                            <input
                              type="text"
                              className="form-control"
                              id="issuePlace"
                              onChange={(e) =>
                                setPlace_of_issue(e.target.value)
                              }
                              placeholder="Place Of Issue"
                            />
                          </div>
                        </div> */}

                        <div className="form-group row mt-4">
                          <label className="col-sm-4 col-form-label text-dark text-md-right">
                            Education *
                          </label>
                          <div className="col-sm-7">
                            <select
                              className="form-control"
                              onChange={(e) => setEducation(e.target.value)}
                              id="education"
                            >
                              <option disabled selected>
                                Select Education
                              </option>
                              <option value="Matric/High School">
                                Matric/High School
                              </option>
                              <option value="Higher Secondary/12th Standard">
                                Higher Secondary/12th Standard
                              </option>
                              <option value="Certificate">Certificate</option>
                              <option value="Diploma">Diploma</option>
                              <option value="BA">BA</option>
                              <option value="B. Com.">B. Com. </option>
                              <option value="BA (Hons.)">BA (Hons.)</option>
                              <option value="HM Passout">HM Passout</option>
                              <option value="B.Com. (Hons.)">
                                B.Com. (Hons.)
                              </option>
                              <option value="B.sc.">B.sc.</option>
                              <option value="B.Sc. (Hons.)">
                                B.Sc. (Hons.)
                              </option>
                              <option value="B. Ed.">B. Ed.</option>
                              <option value="LLB">LLB</option>
                              <option value="BE">BE</option>
                              <option value="B. Tech">B. Tech</option>
                              <option value="AMIE (Part A & Part B)">
                                AMIE (Part A & Part B)
                              </option>
                              <option value="B.Sc. (Engg.)">
                                B.Sc. (Engg.)
                              </option>
                              <option value="BCA">BCA</option>
                              <option value="BBA">BBA</option>
                              <option value="Graduation issued by Defence (Indian Army, Air Force, Navy)">
                                Graduation issued by Defence (Indian Army, Air
                                Force, Navy)
                              </option>
                              <option value="B. Lib.">B. Lib.</option>
                              <option value="B. Pharm.">B. Pharm.</option>
                              <option value="ICWA">ICWA</option>
                              <option value="CA">CA</option>
                              <option value="PG Diploma">PG Diploma</option>
                              <option value="MA">MA</option>
                              <option value="M.Com.">M.Com.</option>
                              <option value="M. Sc">M. Sc</option>
                              <option value="M.Ed.">M.Ed.</option>
                              <option value="LLM">LLM</option>
                              <option value="ME">ME</option>
                              <option value="M. Tech.">M. Tech.</option>
                              <option value="M. Sc. (Engg.)">
                                M. Sc. (Engg.)
                              </option>
                              <option value="MCA">MCA</option>
                              <option value="MBA">MBA</option>

                              <option value="Others">Others</option>
                            </select>
                          </div>
                        </div>
                        <div className="form-group row mt-4">
                          <label className="col-sm-4 col-form-label text-dark text-md-right">
                            Hobby and interest
                          </label>
                          <div className="col-sm-7">
                            <input
                              type="text"
                              className="form-control"
                              onChange={(e) =>
                                setHobbies_and_interest(e.target.value)
                              }
                              placeholder="Hobby and interest"
                            />
                          </div>
                        </div>
                        <div className="form-group row mt-4">
                          <label className="col-sm-4 col-form-label text-dark text-md-right">
                            Religion *
                          </label>
                          <div className="col-sm-7">
                            <select
                              className="form-control"
                              id="religion"
                              onChange={(e) => setReligion(e.target.value)}
                            >
                              <option disabled selected>
                                Select Religion
                              </option>
                              <option value="Christianity">Christianity</option>
                              <option value="Islam">Islam</option>
                              <option value="Hinduism">Hinduism</option>
                              <option value="Buddhism">Buddhism</option>
                              <option value="Sikhism">Sikhism</option>
                              <option value="Others">Others</option>
                            </select>
                          </div>
                        </div>
                        <div className="form-group row mt-4">
                          <label className="col-sm-4 col-form-label text-dark text-md-right">
                            Marital Status *
                          </label>
                          <div className="col-sm-7">
                            <select
                              className="form-control"
                              id="maritalStatue"
                              onChange={(e) =>
                                setMarital_status(e.target.value)
                              }
                            >
                              <option selected disabled>
                                Select Marital Status
                              </option>
                              <option value="Married">Married</option>
                              <option value="Single">Unmarried</option>
                            </select>
                          </div>
                        </div>
                        <div className="form-group row mt-4">
                          <label className="col-sm-4 col-form-label text-dark text-md-right">
                            Experience Certificates
                          </label>
                          <div className="col-sm-7">
                            <input
                              type="file"
                              id="experienceCertificate"
                              className="form-control"
                              accept="image/*"
                              multiple
                              onChange={(e) =>
                                setCertificateImage(e.target.files)
                              }
                            />
                          </div>
                        </div>

                        <div className="form-group row mt-4">
                          <label className="col-sm-4 col-form-label text-dark text-md-right">
                            Work Places *
                          </label>
                          <div className="col-sm-7">
                            <input
                              className="mr-2 mt-2"
                              type="radio"
                              name="workPlace"
                              value="anywhere"
                              onChange={(e) => {
                                selectWorkPlaceValue(e.target.value);
                                setLocation_of_work(["anywhere"]);
                              }}
                            />
                            <label className=" mr-4 mt-2">Anywhere</label>
                            <input
                              className="mr-2 mt-2"
                              type="radio"
                              name="workPlace"
                              value="selected"
                              onChange={(e) =>
                                selectWorkPlaceValue(e.target.value)
                              }
                            />
                            <label className="mt-2">Select Cities</label>
                          </div>
                        </div>
                        {showCountryStateCityContainer === true ? (
                          <>
                            <div className="form-group row mt-4">
                              <label className="col-sm-4 col-form-label text-dark text-md-right">
                                Work Country
                              </label>
                              <div className="col-sm-7">
                                <select
                                  className="form-control"
                                  onChange={(e) =>
                                    setCountryCode(e.target.value)
                                  }
                                >
                                  <option disabled selected>
                                    Select Work Country
                                  </option>
                                  {Country.getAllCountries().length !== 0 ? (
                                    Country.getAllCountries().map(
                                      (categoryVal, i) => {
                                        return (
                                          <option
                                            key={i}
                                            value={categoryVal.isoCode}
                                          >
                                            {categoryVal.name}
                                          </option>
                                        );
                                      }
                                    )
                                  ) : (
                                    <option disabled selected>
                                      No Work Country Added
                                    </option>
                                  )}
                                </select>
                              </div>
                            </div>
                            <div className="form-group row mt-4">
                              <label className="col-sm-4 col-form-label text-dark text-md-right">
                                Work State
                              </label>
                              <div className="col-sm-7">
                                <select
                                  className="form-control"
                                  onChange={(e) => setStateCode(e.target.value)}
                                >
                                  {State.getStatesOfCountry(countryCode)
                                    .length !== 0 ? (
                                    <option disabled selected>
                                      Select States
                                    </option>
                                  ) : (
                                    ""
                                  )}

                                  {State.getStatesOfCountry(countryCode)
                                    .length !== 0 ? (
                                    State.getStatesOfCountry(countryCode).map(
                                      (categoryVal, i) => {
                                        return (
                                          <option value={categoryVal.isoCode}>
                                            {categoryVal.name}
                                          </option>
                                        );
                                      }
                                    )
                                  ) : (
                                    <option disabled selected>
                                      Select Country First
                                    </option>
                                  )}
                                </select>
                              </div>
                            </div>
                            {location_of_work.length > 0 ? (
                              <div className="form-group row mt-4">
                                <label className="col-sm-4 col-form-label text-dark text-md-right"></label>
                                <div className="col-sm-7 border pb-4 pt-3">
                                  <p className="font-weight-bold">
                                    Selected Cities
                                  </p>
                                  {location_of_work.length > 0
                                    ? location_of_work.map((value) => {
                                        return (
                                          <span className="position-relative">
                                            <span className="cityButton">
                                              {value}
                                            </span>
                                            <span
                                              onClick={() =>
                                                removeCityArr(value)
                                              }
                                              className="crossButtonPreview"
                                            >
                                              X
                                            </span>
                                          </span>
                                        );
                                      })
                                    : ""}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                           
                            <div className="form-group row mt-4">
                              <label className="col-sm-4 col-form-label text-dark text-md-right">
                                Work City *
                              </label>
                              <div className="col-sm-7">
                                <select
                                  className="form-control"
                                  onChange={(e) => cityArr(e.target.value)}
                                  id="cityDropdown"
                                >
                                
                                  {City.getCitiesOfState(countryCode, stateCode)
                                    .length !== 0 ? (
                                    <option selected disabled hidden>
                                      Select City
                                    </option>
                                  ) : (
                                    ""
                                  )}

                                  {City.getCitiesOfState(countryCode, stateCode)
                                    .length !== 0 ? (
                                    City.getCitiesOfState(
                                      countryCode,
                                      stateCode
                                    ).map((categoryVal, i) => {
                                      return (
                                        <option
                                          value={categoryVal.name}
                                          key={i}
                                        >
                                          {categoryVal.name}
                                        </option>
                                      );
                                    })
                                  ) : (
                                    <option disabled selected>
                                      Select State First
                                    </option>
                                  )}
                                </select>
                              </div>
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="col-12 text-center">
                        <button
                          className="btn btn-grad"
                          onClick={validateIfFieldEmpty}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
