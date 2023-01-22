import React, { useState, useEffect } from "react";
import SideNav from "../Common/SideNav";
import Heading from "../Common/Heading";
import {
  awsurl,
  displayModal,
  GetRequest,
  multipleMediaIdentifier,
  PostRequestFormControl,
} from "./../ApiHandler/ApiHandler";
import { Country, State, City } from "country-state-city";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import Modal from "../Common/Modal";
const Registration = () => {
  let currentDate = new Date().toISOString().split("T")[0];
  let history = useHistory();
  const [search, setSearch] = useState("");
  const [searchTkn, setSearchTkn] = useState(false);
  let [categoryData, setCategoryData] = useState([]);
  let [subcategoryData, setSubcategoryData] = useState([]);
  let [categoryId, setCategoryId] = useState("");
  let [occupationId, setOccupationId] = useState("");
  let [category, setCategory] = useState("");
  let [occupationData, setOccupationData] = useState([]);
  let [stateCode, setStateCode] = useState("");
  let [countryCode, setCountryCode] = useState("IN");
  let [dob, setDob] = useState("");
  let [age, setAge] = useState("");
  let [type_of_employement, setType_of_employement] = useState("");
  let [sub_category, setSub_category] = useState("");
  let [name_of_candidate, setName_of_candidate] = useState("");
  let [permanent_address, setPermanent_address] = useState("");
  let [contactno1, setContactno1] = useState("");
  let [contactno2, setContactno2] = useState("");
  let [suggestionData, setSuggestionData] = useState([]);
  let [aadhar_card_no, setAadhar_card_no] = useState("");
  let [pan_card_no, setPan_card_no] = useState("");
  let [identification, setIdentification] = useState("");
  let [passportNo, setPassportNo] = useState("");
  let [date_of_expiry, setDate_of_expiry] = useState("");
  let [email_address, setEmail_address] = useState("");
  let [relative_contact_no, setRelative_contact_no] = useState("");
  let [father_name, setFather_name] = useState("");
  let [education, setEducation] = useState("");
  let [hobbies_and_interest, setHobbies_and_interest] = useState("");
  let [religion, setReligion] = useState("");
  let [marital_status, setMarital_status] = useState("");
  let [location_of_work, setLocation_of_work] = useState("");
  let [certificateImage, setCertificateImage] = useState("");
  let [photograph, setPhotograph] = useState("");
  let [video, setVideo] = useState("");
  let [experienceIndian, setExperienceIndian] = useState("no");
  let [experienceAbroad, setExperienceAbroad] = useState("no");
  let [salaryExpectation, setSalaryExpectation] = useState("");
  let [showCountryStateCityContainer, setShowCountryStateCityContainer] =
    useState(false);
  let [chefType, setChefType] = useState("");
  let [experience, setExperience] = useState(0);
  let [candidate_rating, setCandidate_rating] = useState("4.2");
  let [expOutletName, setExpOutletName] = useState("");
  let [expDesignation, setExpDesignation] = useState("");
  let [expPlace, setExpPlace] = useState("");
  let [expCity, setExpCity] = useState("");
  let [expStartDate, setExpStartDate] = useState("");
  let [expStartMonth, setExpStartMonth] = useState("");
  let [expStartYear, setExpStartYear] = useState("");
  let [expEndMonth, setExpEndMonth] = useState("");
  let [expEndYear, setExpEndYear] = useState("");
  let [expEndDate, setExpEndDate] = useState("");
  let [experiences, setExperiences] = useState([]);
  const [mediaForPreviewApp, setMediaForPreviewApp] = useState([]);
  const [profilePreview, setProfilePreview] = useState([]);
  const [videoProfile, setVideoPreview] = useState([]);
  const [certificatePreview, setCertificatePreview] = useState([]);
  const [selectImage, setSelectImage] = useState([]);
  let [gender, setGender] = useState("");
  let [languages, setLanguages] = useState("");
  let [objective, setObjective] = useState("");
  // let [expInMonth, setExpInMonth] = useState();
  let [expDetailsData, setExpDetailsData] = useState([]);
  let [expParticularId, setExpParticularId] = useState("");
  // let [singleMonth, setSingleMonth] = useState(0);
  let [additionalEducation, setAdditionalEducation] = useState("");
  // let [totalMonthsAdd, setTotalMonthsAdd] = useState(0);
  let [loading, setLoading] = useState(false);
  useEffect(() => {
    var currentYear = new Date().getFullYear();
    var ddYears = document.getElementById("ddYears");
    for (var i = 1950; i <= currentYear; i++) {
      var option = document.createElement("OPTION");
      option.innerHTML = i;
      option.value = i;
      ddYears.appendChild(option);
    }
  }, []);

  useEffect(() => {
    getCandidateByKeyWord(name_of_candidate);
  }, [name_of_candidate]);

  useEffect(() => {
    var currentYear = new Date().getFullYear();
    var ddlYears = document.getElementById("ddlYears");
    for (var i = 1950; i <= currentYear; i++) {
      var option = document.createElement("OPTION");
      option.innerHTML = i;
      option.value = i;
      ddlYears.appendChild(option);
    }
  }, []);

  useEffect(() => {
    setExpParticularId(expDetailsData.id);
    setExpOutletName(expDetailsData.expOutletName);
    setExpDesignation(expDetailsData.expDesignation);
    setExpPlace(expDetailsData.expPlace);
    setExpCity(expDetailsData.expCity);
    setExpStartDate(expDetailsData.expStartDate);
    setExpEndDate(expDetailsData.expEndDate);
    setExpStartMonth(expDetailsData?.expStartDate?.split("-")[0]);
    setExpStartYear(expDetailsData?.expStartDate?.split("-")[1]);
    setExpEndMonth(expDetailsData?.expEndDate?.split("-")[0]);
    setExpEndYear(expDetailsData?.expEndDate?.split("-")[1]);
  }, [expDetailsData]);
  useEffect(() => {
    if (expPlace === "INDIA") {
      setExperienceIndian("yes");
    } else if (expPlace === "ABROAD") {
      setExperienceAbroad("yes");
    }
  }, [expPlace]);

  const submitExp = (e) => {
    e.preventDefault();

    if (!expDesignation || !expCity || !expPlace) {
      swal({
        title: "Error",
        text: "Please fill experience details",
        icon: "error",
        buttons: "Ok",
      });
      return false;
    }

    var experiencesDetails = {};
    experiencesDetails.expOutletName = expOutletName;
    experiencesDetails.expDesignation = expDesignation;
    experiencesDetails.expPlace = expPlace;
    experiencesDetails.expCity = expCity;
    experiencesDetails.expStartDate =
      expStartMonth !== undefined ? expStartMonth + "-" + expStartYear : "";
    experiencesDetails.expEndDate =
      expEndMonth !== undefined
        ? expEndMonth === "00"
          ? new Date().getMonth() + "-" + new Date().getFullYear()
          : expEndMonth + "-" + expEndYear
        : "";

    if (new Date("01-" + experiencesDetails.expStartDate) > new Date()) {
      swal({
        title: "Error",
        text: "Start date can not be more than current date",
        icon: "error",
        buttons: "Ok",
      });
      return false;
    }
    if (new Date("01-" + experiencesDetails.expEndDate) > new Date()) {
      swal({
        title: "Error",
        text: "Start date can not be less than current date ",
        icon: "error",
        buttons: "Ok",
      });
      return false;
    }
    if (
      !expStartMonth ||
      !expStartYear ||
      !expEndMonth ||
      (!expEndYear && expEndMonth !== "00")
    ) {
      swal({
        title: "Error",
        text: "Please select date",
        icon: "error",
        buttons: "Ok",
      });
      return false;
    }
    // return;
    var validityToken = true;
    if (
      expStartMonth !== "" &&
      expStartYear !== "" &&
      expEndMonth !== "" &&
      expEndYear !== "" &&
      expStartMonth !== undefined &&
      expStartYear !== undefined &&
      expEndMonth !== undefined &&
      expEndYear !== undefined
    ) {
      validityToken = monthDiff(
        expStartYear + "-" + expStartMonth,
        expEndMonth === "00"
          ? new Date().getFullYear() + "-" + new Date().getMonth()
          : expEndYear + "-" + expEndMonth
      );
    } else {
      validityToken = monthDiff("", "");
    }
    if (validityToken === true) {
      setExperiences((prev) => [...prev, experiencesDetails]);
    }

    setExpOutletName("");
    setExpDesignation("");
    setExpPlace("");
    // setSingleMonth(0);
    setExpCity("");
    // setExpInMonth("");
    setExpStartDate("");
    setExpStartMonth("");
    setExpStartYear("");
    setExpEndMonth("");
    setExpEndYear("");
    setExpEndDate("");
  };

  function monthDiff(date1, date2) {
    if (date1 !== "" || date2 !== "") {
      const d1 = new Date(date1);
      const d2 = new Date(date2);
      var months;
      months = (d2.getFullYear() - d1.getFullYear()) * 12;
      months -= d1.getMonth();
      months += d2.getMonth();
      let finalMonth = months <= 0 ? 0 : months;
      if (finalMonth <= 0) {
        swal({
          title: "Error",
          text: "End Date Can Not Be Smaller Then Start Date",
          icon: "error",
          buttons: "Ok",
        });
        return false;
      } else {
        setExperience((prev) => prev + finalMonth);
        return true;
      }
    } else {
      let n = 0;
      setExperience((prev) => prev + n);
      return true;
    }
  }

  async function registration() {
    setLoading(true);
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
    data.append("identification", identification);
    data.append("passportNo", passportNo);
    data.append("candidate_rating", candidate_rating);
    data.append("date_of_expiry", date_of_expiry);
    data.append("email_address", email_address);
    data.append("relative_contact_no", relative_contact_no);
    data.append("dob", dob);
    data.append("age", age);
    data.append("father_name", "Mr. " + father_name);
    data.append("education", education);
    data.append("hobbies_and_interest", hobbies_and_interest);
    data.append("religion", religion);
    data.append("marital_status", marital_status);
    data.append("experience_in_month", experience);
    data.append("indian", experienceIndian);
    data.append("additionalEducation", additionalEducation);
    data.append("gender", gender);
    data.append("languages", languages);
    data.append("objective", objective);
    data.append("abroad", experienceAbroad);
    [...location_of_work].forEach((locationDetails) => {
      data.append("location_of_work", locationDetails);
    });

    [...selectImage].forEach((dishPhoto) => {
      Array.from(dishPhoto).forEach((file) => data.append("dish", file));
    });
    [...certificateImage].forEach((photo) => {
      Array.from(photo).forEach((file) => data.append("certificate", file));
    });

    [...photograph].forEach((photo) => {
      Array.from(photo).forEach((file) => data.append("picture", file));
    });
    [...video].forEach((vdo) => {
      Array.from(vdo).forEach((file) => data.append("video", file));
    });
    data.append("salary_expectation", salaryExpectation);

    [...experiences].forEach((experiencesDetails) => {
      data.append("experiences", JSON.stringify(experiencesDetails));
    });
    try {
      let returnValue = await PostRequestFormControl(
        "registerCandidates",
        data
      );

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
    } catch (err) {
      swal({
        title: "Error",
        text: "Something went wrong",
        icon: "error",
        buttons: "Ok",
      });
    } finally {
      setLoading(false);
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
  async function getCandidateByKeyWord(searchKey) {
    let res = await GetRequest(
      `getCandidatesDetailsByKeyword?search=${searchKey}`
    );
    if (res.length) {
      setSuggestionData(res);
    } else {
      setSuggestionData([]);
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
    if (value === "Anywhere") {
      setShowCountryStateCityContainer(false);
    } else {
      setShowCountryStateCityContainer(true);
      setLocation_of_work([]);
    }
  };

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

  const removeExpDetails = (expData) => {
    let updatedExpArr = experiences.filter((exp) => exp !== expData);
    setExperiences(updatedExpArr);
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
    } else {
      document.getElementById("email").style.border = "";
      return true;
    }
  }
  useEffect(() => {
    if (document.getElementById("age") !== null && age !== "")
      if (age < 18) {
        document.getElementById("age").style.border = "1px solid red";
        document.getElementById("ageError").style.display = "block";
      } else {
        document.getElementById("age").style.border = "";
        document.getElementById("ageError").style.display = "none";
      }
  }, [age]);
  useEffect(() => {
    emailFormateValidation(email_address);
  }, [email_address]);
  useEffect(() => {
    if (name_of_candidate) {
      document.getElementById("name").style.border = "";
    }
    if (dob) {
      document.getElementById("dob").style.border = "";
    }
    if (age) {
      document.getElementById("age").style.border = "";
    }
    if (languages) {
      document.getElementById("languages").style.border = "";
    }
    if (category?.length) {
      document.getElementById("Category").style.border = "";
    }
    if (type_of_employement) {
      document.getElementById("employemntType").style.border = "";
    }
    if (sub_category) {
      document.getElementById("subCategory").style.border = "";
    }
    if (permanent_address) {
      document.getElementById("permanentAddress").style.border = "";
    }
    if (contactno1) {
      document.getElementById("contact1").style.border = "";
    }
    if (relative_contact_no) {
      document.getElementById("relativePhone").style.border = "";
    }
    if (education) {
      document.getElementById("education").style.border = "";
    }
    if (religion) {
      document.getElementById("religion").style.border = "";
    }
    if (marital_status) {
      document.getElementById("maritalStatue").style.border = "";
    }
  }, [
    marital_status,
    religion,
    education,
    relative_contact_no,
    contactno1,
    name_of_candidate,
    dob,
    age,
    languages,
    category,
    type_of_employement,
    sub_category,
    permanent_address,
  ]);
  const validateIfFieldEmpty = () => {
    if (
      category === "" ||
      !category?.length ||
      type_of_employement === "" ||
      sub_category === "" ||
      name_of_candidate === "" ||
      permanent_address === "" ||
      contactno1 === "" ||
      relative_contact_no === "" ||
      dob === "" ||
      age === "" ||
      education === "" ||
      religion === "" ||
      marital_status === "" ||
      location_of_work === "" ||
      languages === ""
    ) {
      if (name_of_candidate === "") {
        document.getElementById("name").style.border = "1px solid red";
        swal({
          title: "",
          text: "Please enter your name",
          icon: "info",
          buttons: "Ok",
        });
      }
      if (dob === "") {
        document.getElementById("dob").style.border = "1px solid red";
        swal({
          title: "",
          text: "Please enter your age",
          icon: "info",
          buttons: "Ok",
        });
      }
      if (age === "") {
        document.getElementById("age").style.border = "1px solid red";
      }
      if (languages === "") {
        document.getElementById("languages").style.border = "1px solid red";
        swal({
          title: "",
          text: "Please enter Languages",
          icon: "info",
          buttons: "Ok",
        });
      }
      if (gender === "") {
        // document.getElementById("gender").style.border = "1px solid red";
        swal({
          title: "",
          text: "Please select gender",
          icon: "info",
          buttons: "Ok",
        });
      }
      if (category === "" || !category?.length) {
        document.getElementById("Category").style.border = "1px solid red";
        swal({
          title: "",
          text: "Please select Category",
          icon: "info",
          buttons: "Ok",
        });
      }
      if (type_of_employement === "") {
        document.getElementById("employemntType").style.border =
          "1px solid red";
        swal({
          title: "",
          text: "Please select employement type",
          icon: "info",
          buttons: "Ok",
        });
      }
      if (sub_category === "") {
        document.getElementById("subCategory").style.border = "1px solid red";
      }
      if (permanent_address === "") {
        document.getElementById("permanentAddress").style.border =
          "1px solid red";
        swal({
          title: "",
          text: "Please enter your permanent address",
          icon: "info",
          buttons: "Ok",
        });
      }
      if (contactno1 === "") {
        document.getElementById("contact1").style.border = "1px solid red";
        swal({
          title: "",
          text: "Please enter contact number",
          icon: "info",
          buttons: "Ok",
        });
      }
      if (relative_contact_no === "") {
        document.getElementById("relativePhone").style.border = "1px solid red";
        swal({
          title: "",
          text: "Please enter relative number",
          icon: "info",
          buttons: "Ok",
        });
      }
      if (education === "") {
        document.getElementById("education").style.border = "1px solid red";
        swal({
          title: "",
          text: "Please select your education",
          icon: "info",
          buttons: "Ok",
        });
      }
      if (religion === "") {
        document.getElementById("religion").style.border = "1px solid red";
        swal({
          title: "",
          text: "Please select religion",
          icon: "info",
          buttons: "Ok",
        });
      }
      if (marital_status === "") {
        document.getElementById("maritalStatue").style.border = "1px solid red";
        swal({
          title: "",
          text: "Please select marital status",
          icon: "info",
          buttons: "Ok",
        });
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
      if (!(contactno1?.length >= 10 && contactno1?.length <= 15)) {
        document.getElementById("contact1").style.border = "1px solid red";
        swal({
          title: "",
          text: "Please enter valid contact number",
          icon: "info",
          buttons: "Ok",
        });
      } else if (
        !(relative_contact_no?.length >= 10 &&
        relative_contact_no?.length <= 15)
      ) {
        document.getElementById("relativePhone").style.border = "1px solid red";
        swal({
          title: "",
          text: "Please enter valid contact number",
          icon: "info",
          buttons: "Ok",
        });
      } else {
        if (age >= 18) {
          if (emailFormateValidation(email_address) === true) {
            displayModal("previewRegistration");
            // registration();
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
    }
  };

  // multiple candidate profile image

  const ProfileImageHandleChange = () => {
    document.getElementById("profilePicInput").click();
  };
  const ProfileVideoHandleChange = () => {
    document.getElementById("profileVideoInput").click();
  };
  function UploadProfilePic(file) {
    if (file) {
      setPhotograph((prev) => [...prev, file]);
      readAndPreviewProfile(file);
    }
  }
  function UploadProfileVideo(file) {
    if (file) {
      setVideo((prev) => [...prev, file]);
      readAndPreviewVideo(file);
    }
  }
  function readAndPreviewProfile(files) {
    if (files) {
      const fileArray = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setProfilePreview((prevImages) => prevImages.concat(fileArray));
      Array.from(files).map((file) => URL.revokeObjectURL(file));
    }
  }
  function readAndPreviewVideo(files) {
    if (files) {
      const fileArray = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setVideoPreview((prevVideos) => prevVideos.concat(fileArray));
      Array.from(files).map((file) => URL.revokeObjectURL(file));
    }
  }
  // multiple certificate

  const CertificateHandleChange = () => {
    document.getElementById("certificatePicInput").click();
  };

  function UploadCertificatePic(file) {
    if (file) {
      setCertificateImage((prev) => [...prev, file]);
      readAndPreviewCertificate(file);
    }
  }
  function readAndPreviewCertificate(files) {
    if (files) {
      const fileArray = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setCertificatePreview((prevImages) => prevImages.concat(fileArray));
      Array.from(files).map((file) => URL.revokeObjectURL(file));
    }
  }

  // multiple dish image

  const imageHandleChange = () => {
    document.getElementById("dishPicInput").click();
  };
  function UploadDishPic(file) {
    if (file) {
      setSelectImage((prev) => [...prev, file]);
      readAndPreviewDish(file);
    }
  }
  function readAndPreviewDish(files) {
    if (files) {
      const fileArray = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setMediaForPreviewApp((prevImages) => prevImages.concat(fileArray));
      Array.from(files).map((file) => URL.revokeObjectURL(file));
    }
  }

  const renderMedia = (source) => {
    return source.map((media, index) => {
      return (
        <img
          alt="Exclusive photo platform"
          src={media}
          key={index}
          className="previewImage"
        />
      );
    });
  };
  const renderVideoMedia = (source) => {
    return source.map((media, index) => {
      return (
        <video
          alt="Exclusive photo platform"
          src={media}
          key={index}
          controls
          className="previewImage"
        />
      );
    });
  };
  const filterData = (searchedData, search) => {
    return searchedData?.filter(
      (el) => el.name?.toLowerCase().indexOf(search?.toLowerCase()) !== -1
    );
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
                    <div className="row d-flex justify-content-center m-0">
                      <div className="col-md-8">
                        <div className="form-group row mt-4">
                          <label className="col-sm-4 col-form-label text-dark text-md-right">
                            Name *
                          </label>
                          <div className="col-sm-7">
                            <input
                              type="text"
                              className="form-control"
                              style={{ textTransform: "uppercase" }}
                              id="name"
                              onChange={(e) =>
                                setName_of_candidate(e.target.value)
                              }
                              placeholder="Name"
                            />
                            <div className="suggestion-box">
                              {suggestionData &&
                                name_of_candidate &&
                                suggestionData.map((suggestion, i) => (
                                  <div className="suggestion">
                                    <label className="col-8 col-form-label text-dark text-md-right font-weight-bold">
                                      {suggestion.name_of_candidate}
                                    </label>
                                    <div className="col-4">
                                      {suggestion.photo_of_candidate !== "" ? (
                                        <>
                                          {multipleMediaIdentifier(
                                            suggestion.photo_of_candidate
                                          ).map((candidate, i) => {
                                            return (
                                              <img
                                                key={i}
                                                alt=""
                                                src={awsurl + candidate.media}
                                                style={{
                                                  height: "50px",
                                                  width: "50px",
                                                  marginLeft: "10px",
                                                }}
                                              />
                                            );
                                          })}
                                        </>
                                      ) : (
                                        <p className="form-control text-capitalize border-0 bg-white">
                                          NA
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                        <div className="form-group row mt-4">
                          <label className="col-sm-4 col-form-label text-dark text-md-right">
                            Father Name
                          </label>
                          <div className="col-sm-7">
                            <div className="row p-0 m-0">
                              <label
                                className=" form-control"
                                style={{ width: "15%" }}
                              >
                                Mr.
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                style={{ width: "85%" }}
                                onChange={(e) => setFather_name(e.target.value)}
                                placeholder="Father Name"
                              />
                            </div>
                          </div>
                        </div>
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
                            Email
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
                            Contact no 1 *
                          </label>
                          <div className="col-sm-7">
                            <input
                              type="text"
                              className="form-control"
                              id="contact1"
                              maxLength="15"
                              minLength="10"
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
                              maxLength="15"
                              minLength="10"
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
                              maxLength="15"
                              minLength="10"
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
                            Gender *
                          </label>
                          <div className="col-sm-7 row pl-5 ">
                            <div className="row p-0 m-0 ">
                              <input
                                className="mr-2 mt-2"
                                type="radio"
                                name="gender"
                                value="Male"
                                tabIndex="1"
                                onChange={(e) => setGender(e.target.value)}
                              />
                              <label className=" mr-4 mt-1 expDetailsText">
                                Male
                              </label>
                            </div>
                            <div className="row p-0 m-0">
                              <input
                                className="mr-2 mt-2"
                                type="radio"
                                name="gender"
                                value="Female"
                                tabIndex="2"
                                onChange={(e) => setGender(e.target.value)}
                              />
                              <label className=" mr-4 mt-1 expDetailsText">
                                Female
                              </label>
                            </div>
                            <div className="row p-0 m-0">
                              <input
                                className="mr-2 mt-2"
                                type="radio"
                                name="gender"
                                value="Other"
                                tabIndex="3"
                                onChange={(e) => setGender(e.target.value)}
                              />
                              <label className=" mr-4 mt-1 expDetailsText">
                                Other
                              </label>
                            </div>
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
                            Additional Education
                          </label>
                          <div className="col-sm-7">
                            <select
                              className="form-control"
                              onChange={(e) =>
                                setAdditionalEducation(e.target.value)
                              }
                            >
                              <option disabled selected>
                                Select Additional Education
                              </option>
                              <option value="Diploma in hotel management ">
                                Diploma in hotel management
                              </option>
                              <option value="Degrees in hotel management">
                                Degrees in hotel management
                              </option>
                            </select>
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
                              style={{ textTransform: "uppercase" }}
                              className="form-control"
                              maxLength="10"
                              onChange={(e) => setPan_card_no(e.target.value)}
                              placeholder="Pan No"
                            />
                          </div>
                        </div>
                        <div className="form-group row mt-4">
                          <label className="col-sm-4 col-form-label text-dark text-md-right">
                            Identification
                          </label>
                          <div className="col-sm-7">
                            <input
                              type="text"
                              id="identification"
                              className="form-control"
                              onChange={(e) =>
                                setIdentification(e.target.value)
                              }
                              placeholder="Aadhar Card No/Pan No/Driving Licence"
                            />
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
                            Language *
                          </label>
                          <div className="col-sm-7">
                            <input
                              type="text"
                              className="form-control"
                              id="languages"
                              onChange={(e) => setLanguages(e.target.value)}
                              placeholder="Enter Languages"
                            />
                          </div>
                        </div>
                        <div className="form-group row mt-4">
                          <label className="col-sm-4 col-form-label text-dark text-md-right">
                            Candidate Photograph
                          </label>
                          <div className="col-sm-7">
                            <div className="row p-0 m-0">
                              <input
                                className="form-control mt-1 w-50"
                                multiple
                                accept="image/*"
                                type="file"
                                id="profilePicInput"
                                // value={selectImage.name}
                                onChange={(e) => {
                                  UploadProfilePic(e.target.files);
                                }}
                              />
                              <button
                                onClick={() => ProfileImageHandleChange()}
                                className="ml-5 expDetailsBtn"
                              >
                                Add more
                              </button>
                            </div>
                            <div id="preview">
                              {renderMedia(profilePreview)}
                            </div>
                          </div>
                        </div>

                        <div className="form-group row mt-4">
                          <label className="col-sm-4 col-form-label text-dark text-md-right">
                            Candidate Video
                          </label>
                          <div className="col-sm-7">
                            <div className="row p-0 m-0">
                              <input
                                className="form-control mt-1 w-50"
                                multiple
                                accept="video/mp4,video/x-m4v,video/*"
                                type="file"
                                id="profileVideoInput"
                                // value={selectImage.name}

                                onChange={(e) => {
                                  UploadProfileVideo(e.target.files);
                                }}
                              />
                              <button
                                onClick={() => ProfileVideoHandleChange()}
                                className="ml-5 expDetailsBtn"
                              >
                                Add more
                              </button>
                            </div>
                            <div id="preview">
                              {renderVideoMedia(videoProfile)}
                            </div>
                          </div>
                        </div>

                        <div className="form-group row mt-4">
                          <label className="col-sm-4 col-form-label text-dark text-md-right">
                            Objective
                          </label>
                          <div className="col-sm-7">
                            <textarea
                              type="text"
                              className="form-control"
                              onChange={(e) => setObjective(e.target.value)}
                              placeholder="Enter your objective"
                            />
                          </div>
                        </div>
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
                        {category.length > 0 ? (
                          <>
                            <div className="form-group row p-0 m-0">
                              <label className="col-sm-4 col-form-label text-dark text-md-right"></label>
                              <div className="col-sm-7">
                                <a className="">You can select more category</a>
                              </div>
                            </div>
                          </>
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
                        {sub_category.length > 0 ? (
                          <>
                            <div className="form-group row p-0 m-0">
                              <label className="col-sm-4 col-form-label text-dark text-md-right"></label>
                              <div className="col-sm-7">
                                <a className="">
                                  You can select more sub category
                                </a>
                              </div>
                            </div>
                          </>
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
                                        className="position-relative row p-0 mt-2 m-0 expDetailsBox"
                                        key={i}
                                      >
                                        <div className="col-12 col-sm-6 pt-1 ">
                                          <div className="row p-0 m-0">
                                            <label className="expDetailsText">
                                              Outlet Name :
                                            </label>
                                            <p className="pl-2 expDetailsText">
                                              {value.expOutletName}
                                            </p>
                                          </div>
                                          <div className="row p-0 m-0">
                                            <label className="expDetailsText">
                                              Designation :
                                            </label>
                                            <p className="pl-2 expDetailsText">
                                              {value.expDesignation}
                                            </p>
                                          </div>
                                          <div className="row p-0 m-0">
                                            <label className="expDetailsText">
                                              Place :
                                            </label>
                                            <p className="pl-2 expDetailsText">
                                              {value.expPlace}
                                            </p>
                                          </div>
                                          <div className="row p-0 m-0">
                                            <label className="expDetailsText">
                                              City :
                                            </label>
                                            <p className="pl-2 expDetailsText">
                                              {value.expCity}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="col-12 col-sm-6 mt-1">
                                          <div className="row p-0 m-0">
                                            <label className="expDetailsText">
                                              Start date :
                                            </label>
                                            <p className="pl-2 expDetailsText">
                                              {value.expStartDate}
                                            </p>
                                          </div>
                                          <div className="row p-0 m-0">
                                            <label className="expDetailsText">
                                              End date :
                                            </label>
                                            <p className="pl-2 expDetailsText">
                                              {value.expEndDate}
                                            </p>
                                          </div>
                                          {/* <div className="row p-0 m-0">
                                          <label className="expDetailsText">
                                            Experience :
                                            </label>
                                          <p className="pl-2 expDetailsText">
                                            {value.expInMonth === undefined ||
                                              value.expInMonth === ""
                                              ? value.singleMonth
                                              : value.expInMonth}
                                          </p>
                                        </div> */}
                                          <div className="row p-0 m-0 text-center pt-1 pb-2">
                                            <button
                                              className="expDetailsRemoveBtn "
                                              onClick={() => {
                                                setExpDetailsData(value);
                                                removeExpDetails(value);
                                              }}
                                            >
                                              Edit
                                            </button>
                                            <button
                                              className="expDetailsRemoveBtn "
                                              onClick={() =>
                                                removeExpDetails(value)
                                              }
                                            >
                                              Remove
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
                            <label className="col-sm-4 col-form-label mt-2 text-dark text-md-right">
                              Place
                            </label>
                            <div className="col-sm-7 mt-2">
                              <select
                                className="form-control"
                                value={expPlace}
                                onChange={(e) => setExpPlace(e.target.value)}
                              >
                                <option selected>Select place</option>
                                <option value="INDIA">INDIA</option>
                                <option value="ABROAD">ABROAD</option>
                              </select>
                            </div>
                            <label className="col-sm-4 mt-2 col-form-label text-dark text-md-right">
                              Outlet Name
                            </label>
                            <div className="col-sm-7 mt-2">
                              <input
                                type="text"
                                className="form-control"
                                value={expOutletName}
                                onChange={(e) =>
                                  setExpOutletName(e.target.value)
                                }
                                placeholder="Outlet Name"
                              />
                            </div>

                            <label className="col-sm-4 col-form-label mt-2 text-dark text-md-right">
                              Designation
                            </label>
                            <div className="col-sm-7 mt-2">
                              <input
                                type="text"
                                className="form-control"
                                value={expDesignation}
                                onChange={(e) =>
                                  setExpDesignation(e.target.value)
                                }
                                placeholder="Enter your designation"
                              />
                            </div>

                            <label className="col-sm-4 col-form-label mt-2 text-dark text-md-right">
                              City
                            </label>
                            {expPlace === "INDIA" ? (
                              <div className="col-sm-7 mt-2 position-relative">
                                <input
                                  type="text"
                                  value={search}
                                  onChange={(e) => {
                                    setSearch(e.target.value);
                                    setSearchTkn(true);
                                  }}
                                  className="form-control"
                                  placeholder="Enter city name"
                                />
                                {filterData(
                                  City.getCitiesOfCountry("IN"),
                                  search
                                ).length === 0 || search === "" ? (
                                  ""
                                ) : searchTkn ? (
                                  <ul className="autoselect-custom shadow">
                                    {City.getCitiesOfCountry("IN") !== undefined
                                      ? filterData(
                                          City.getCitiesOfCountry("IN"),
                                          search
                                        ).map((cityVal) => {
                                          return (
                                            <li
                                              onClick={() => {
                                                setExpCity(cityVal.name);
                                                setSearch(cityVal.name);
                                                setSearchTkn(false);
                                              }}
                                            >
                                              {cityVal.name}
                                            </li>
                                          );
                                        })
                                      : ""}
                                  </ul>
                                ) : (
                                  ""
                                )}
                              </div>
                            ) : (
                              <div className="col-sm-7 mt-2">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={expCity}
                                  onChange={(e) => setExpCity(e.target.value)}
                                  placeholder="Enter your city"
                                />
                              </div>
                            )}

                            <label className="col-sm-4 col-form-label mt-2 text-dark text-md-right">
                              Start date
                            </label>
                            <div className="col-sm-7 mt-2 row m-0 ">
                              <div style={{ width: "50%" }}>
                                <select
                                  value={expStartMonth}
                                  onChange={(e) =>
                                    setExpStartMonth(e.target.value)
                                  }
                                  className="form-control"
                                >
                                  <option disabled selected value="">
                                    Select month
                                  </option>
                                  <option value="01">January</option>
                                  <option value="02">February</option>
                                  <option value="03">March</option>
                                  <option value="04">April</option>
                                  <option value="05">May</option>
                                  <option value="06">June</option>
                                  <option value="07">July</option>
                                  <option value="08">August</option>
                                  <option value="09">September</option>
                                  <option value="10">October</option>
                                  <option value="11">November</option>
                                  <option value="12">December</option>
                                </select>
                              </div>
                              <div
                                style={{ width: "50%", paddingLeft: "10px" }}
                              >
                                <select
                                  id="ddlYears"
                                  value={expStartYear}
                                  onChange={(e) =>
                                    setExpStartYear(e.target.value)
                                  }
                                  className="form-control"
                                >
                                  <option value="" disabled selected>
                                    Select year
                                  </option>
                                </select>
                              </div>
                            </div>
                            <label className="col-sm-4 col-form-label mt-2 text-dark text-md-right">
                              End date
                            </label>
                            <div className="col-sm-7 row mt-2 m-0">
                              <div style={{ width: "50%" }}>
                                <select
                                  value={expEndMonth}
                                  onChange={(e) =>
                                    setExpEndMonth(e.target.value)
                                  }
                                  className="form-control"
                                >
                                  <option disabled selected value="">
                                    Select month
                                  </option>
                                  <option value="00">
                                    Currently Working Here
                                  </option>
                                  <option value="01">January</option>
                                  <option value="02">February</option>
                                  <option value="03">March</option>
                                  <option value="04">April</option>
                                  <option value="05">May</option>
                                  <option value="06">June</option>
                                  <option value="07">July</option>
                                  <option value="08">August</option>
                                  <option value="09">September</option>
                                  <option value="10">October</option>
                                  <option value="11">November</option>
                                  <option value="12">December</option>
                                </select>
                              </div>
                              <div
                                style={{ width: "50%", paddingLeft: "10px" }}
                              >
                                <select
                                  id="ddYears"
                                  value={expEndYear}
                                  onChange={(e) =>
                                    setExpEndYear(e.target.value)
                                  }
                                  disabled={expEndMonth === "00" ? true : false}
                                  className="form-control"
                                >
                                  <option value="" disabled selected>
                                    Select year
                                  </option>
                                </select>
                              </div>
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
                            Experience Certificates
                          </label>
                          <div className="col-sm-7">
                            <div className="row p-0 m-0">
                              <input
                                className="form-control w-50 mt-1"
                                multiple
                                accept="image/*"
                                type="file"
                                id="certificatePicInput"
                                // value={selectImage.name}
                                onChange={(e) => {
                                  UploadCertificatePic(e.target.files);
                                }}
                              />
                              <button
                                onClick={() => CertificateHandleChange()}
                                className="expDetailsBtn ml-5"
                              >
                                Add more
                              </button>
                            </div>
                            <div id="preview">
                              {renderMedia(certificatePreview)}
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
                        {type_of_employement === "COOKS / CHEFS" ? (
                          <div className="form-group row mt-4">
                            <label className="col-sm-4 col-form-label text-dark text-md-right">
                              Dish Photographs
                            </label>
                            <div className="col-sm-7">
                              <div className="row p-0 m-0">
                                <input
                                  className="form-control mt-1 w-50"
                                  multiple
                                  accept="image/*"
                                  type="file"
                                  id="dishPicInput"
                                  // value={selectImage.name}
                                  onChange={(e) => {
                                    UploadDishPic(e.target.files);
                                  }}
                                />
                                <button
                                  onClick={() => imageHandleChange()}
                                  className="ml-5 expDetailsBtn"
                                >
                                  Add more
                                </button>
                              </div>
                              <span className="text-info small">
                                If you are a chef/cook please add images of your
                                dishes
                              </span>
                              <div id="preview">
                                {renderMedia(mediaForPreviewApp)}
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        {type_of_employement === "COOKS / CHEFS" ? (
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
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col-md-8">
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
                            Work Places *
                          </label>
                          <div className="col-sm-7">
                            <input
                              className="mr-2 mt-2"
                              type="radio"
                              name="workPlace"
                              value="Anywhere"
                              onChange={(e) => {
                                selectWorkPlaceValue(e.target.value);
                                setLocation_of_work(["Anywhere"]);
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
                                  vlaue={countryCode}
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
                                            selected={
                                              categoryVal.isoCode === "IN"
                                                ? "selected"
                                                : ""
                                            }
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
                  <Modal
                    modalId="previewRegistration"
                    ModalHeading="Candidate Registration Preview"
                    ModalBody={
                      <div className="col-12 row text-dark pt-2 pb-2 p-0 m-0">
                        <div className="col-5">
                          <div className="row p-0 m-0">
                            <div className="col-5 p-0 m-0 text-right">
                              <label className=""> contact number 1 :</label>
                            </div>
                            <div className="col-7 p-0 m-0">
                              <p className="pl-2 ">{contactno1}</p>
                            </div>
                          </div>
                          <div className="row p-0 m-0">
                            <div className="col-5 p-0 m-0 text-right">
                              <label className=""> contact number 2 :</label>
                            </div>
                            <div className="col-7 p-0 m-0">
                              <p className="pl-2 ">{contactno2}</p>
                            </div>
                          </div>
                          <div className="row p-0 m-0">
                            <div className="col-5 p-0 m-0 text-right">
                              <label className=""> Relative Contact :</label>
                            </div>
                            <div className="col-7 p-0 m-0">
                              <p className="pl-2 ">{relative_contact_no}</p>
                            </div>
                          </div>
                          <div className="row p-0 m-0">
                            <div className="col-5 p-0 m-0 text-right">
                              <label className=""> Gmail :</label>
                            </div>
                            <div className="col-7 p-0 m-0">
                              <p className="pl-2 ">{email_address}</p>
                            </div>
                          </div>
                          <div className="row p-0 m-0">
                            <div className="col-5 p-0 m-0 text-right">
                              <label className=""> Permanent Address :</label>
                            </div>
                            <div className="col-7 p-0 m-0">
                              <p className="pl-2 ">{permanent_address}</p>
                            </div>
                          </div>
                          <div className="row p-0 m-0">
                            <div className="col-5 p-0 m-0 text-right">
                              <label className=""> Employement type :</label>
                            </div>
                            <div className="col-7 p-0 m-0">
                              <p className="pl-2 ">{type_of_employement}</p>
                            </div>
                          </div>
                          
                          <div className="row p-0 m-0">
                            <div className="col-5 p-0 m-0 text-right">
                              <label className=""> Salary Expectation :</label>
                            </div>
                            <div className="col-7 p-0 m-0">
                              <p className="pl-2 ">
                                {salaryExpectation + "/month"}
                              </p>
                            </div>
                          </div>
                          <div className="row p-0 m-0">
                            <div className="col-5 p-0 m-0 text-right">
                              <label className=""> Experience :</label>
                            </div>
                            <div className="col-7 p-0 m-0">
                              <p className="pl-2 ">{experience} months</p>
                            </div>
                          </div>
                          <div className="row p-0 m-0">
                            <div className="col-5 p-0 m-0 text-right">
                              <label className=""> Education :</label>
                            </div>
                            <div className="col-7 p-0 m-0">
                              <p className="pl-2 ">{education}</p>
                            </div>
                          </div>
                          <div className="row p-0 m-0">
                            <div className="col-5 p-0 m-0 text-right">
                              <label className=""> Languages :</label>
                            </div>
                            <div className="col-7 p-0 m-0">
                              <p className="pl-2 ">{languages}</p>
                            </div>
                          </div>
                          <div className="row p-0 m-0">
                            <div className="col-5 p-0 m-0 text-right">
                              <label className=""> Gender :</label>
                            </div>
                            <div className="col-7 p-0 m-0">
                              <p className="pl-2 ">{gender}</p>
                            </div>
                          </div>
                          <div className="row p-0 m-0">
                            <div className="col-5 p-0 m-0 text-right">
                              <label className="">Identification : </label>
                            </div>

                            <div className="col-7 p-0 m-0">
                              <p className="pl-2 ">{identification}</p>
                            </div>
                          </div>
                          <div className="row p-0 m-0">
                            <div className="col-5 p-0 m-0 text-right">
                              <label className="">Category :</label>
                            </div>

                            <div className="col-7 p-0 m-0">
                              <p className="pl-2 ">{category.toString()}</p>
                            </div>
                          </div>
                          <div className="row p-0 m-0">
                            <div className="col-5 p-0 m-0 text-right">
                              <label className=""> Sub Category :</label>
                            </div>

                            <div className="col-7 p-0 m-0">
                              <p className="pl-2 ">{sub_category.toString()}</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-7">
                          <h2 className="">{name_of_candidate}</h2>
                          <p className="">{objective}</p>
                          <label className="expDetailsText">
                            Work Experience
                          </label>
                          {experiences.length > 0
                            ? experiences.map((value, i) => {
                                return (
                                  <div
                                    className="position-relative row p-0 mt-2 m-0 expDetailsBox"
                                    key={i}
                                  >
                                    <div className="col-12 col-sm-6 pt-1 ">
                                      <div className="row p-0 m-0">
                                        <label className="expDetailsText">
                                          Outlet Name :
                                        </label>
                                        <p className="pl-2 expDetailsText">
                                          {value.expOutletName}
                                        </p>
                                      </div>
                                      <div className="row p-0 m-0">
                                        <label className="expDetailsText">
                                          Designation :
                                        </label>
                                        <p className="pl-2 expDetailsText">
                                          {value.expDesignation}
                                        </p>
                                      </div>
                                      <div className="row p-0 m-0">
                                        <label className="expDetailsText">
                                          Place :
                                        </label>
                                        <p className="pl-2 expDetailsText">
                                          {value.expPlace}
                                        </p>
                                      </div>
                                      <div className="row p-0 m-0">
                                        <label className="expDetailsText">
                                          City :
                                        </label>
                                        <p className="pl-2 expDetailsText">
                                          {value.expCity}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="col-12 col-sm-6 mt-1">
                                      <div className="row p-0 m-0">
                                        <label className="expDetailsText">
                                          Start date :
                                        </label>
                                        <p className="pl-2 expDetailsText">
                                          {value.expStartDate}
                                        </p>
                                      </div>
                                      <div className="row p-0 m-0">
                                        <label className="expDetailsText">
                                          End date :
                                        </label>
                                        <p className="pl-2 expDetailsText">
                                          {value.expEndDate}
                                        </p>
                                      </div>
                                      {/* <div className="row p-0 m-0">
                                      <label className="expDetailsText">
                                        Experience :
                                        </label>
                                      <p className="pl-2 expDetailsText">
                                        {value.expInMonth}
                                      </p>
                                    </div> */}
                                    </div>
                                  </div>
                                );
                              })
                            : ""}
                          {!!profilePreview?.length && (
                            <div className="pt-3 pb-3">
                              <label className="expDetailsText">
                                Candidate Photograph
                              </label>
                              <div id="preview">
                                {renderMedia(profilePreview)}
                              </div>
                            </div>
                          )}
                          {!!videoProfile?.length && (
                            <div className="pt-3 pb-3">
                              <label className="expDetailsText">
                                Candidate Video
                              </label>
                              <div id="preview">
                                {renderVideoMedia(videoProfile)}
                              </div>
                            </div>
                          )}
                          {!!certificatePreview?.length && (
                            <div className="pt-3 pb-3">
                              <label className="expDetailsText">
                                Candidate Certificate
                              </label>
                              <div id="preview">
                                {renderMedia(certificatePreview)}
                              </div>
                            </div>
                          )}
                          {!!mediaForPreviewApp?.length && (
                            <div className="pt-3 pb-3">
                              <label className="expDetailsText">
                                Dish Photos
                              </label>
                              <div id="preview">
                                {renderMedia(mediaForPreviewApp)}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    }
                    SubmitButton={registration}
                    ModalType="registration"
                    buttonStatus={loading}
                  />
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
