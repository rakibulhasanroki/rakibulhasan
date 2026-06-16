/* eslint-disable react/no-unescaped-entities */
import { useEffect } from "react";
import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [cartItem, setCartItem] = useState(0);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    formNo: "",
    parentName: "",
    parentNumber: "",
    school: "",
    jobInfo: "",
    email: "",
    gender: "",
    presentAddress: "",
    permanentAddress: "",
    nid: "",
    mobile: "",
    guardianName: "",
    guardianPhone: "",
    dob: "",
    bloodGroup: "",
    admissionDate: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const course = cart[0];
    const formDataObj = new FormData();
    formDataObj.append("course_id", course?.id || course?.course_id);
    formDataObj.append("admission_date", formData.admissionDate);
    formDataObj.append("name", formData.fullName);
    formDataObj.append("father_name", formData.parentName);
    formDataObj.append("father_phone_no", formData.parentNumber);
    formDataObj.append("school_collage_name", formData.school);
    formDataObj.append("job_title", formData.jobInfo);
    formDataObj.append("email", formData.email);
    formDataObj.append("gender", formData.gender);
    formDataObj.append("present_address", formData.presentAddress);
    formDataObj.append("permanent_address", formData.permanentAddress);
    formDataObj.append("nid_no", formData.nid);
    formDataObj.append("phone_no", formData.mobile);
    formDataObj.append("local_guardian_name", formData.guardianName);
    formDataObj.append("local_guardian_phone_no", formData.guardianPhone);
    formDataObj.append("date_of_birth", formData.dob);
    formDataObj.append("blood_group", formData.bloodGroup);
    formDataObj.append("course_fee", course?.discount_price);
    formDataObj.append("course_qty", cartItem);
    formDataObj.append("total_course_fee", course?.discount_price * cartItem);
    formDataObj.append(
      "discount_course_fee",
      course?.discount_price * cartItem,
    );
    formDataObj.append(
      "sub_total_course_fee",
      course?.discount_price * cartItem,
    );
    if (photo) formDataObj.append("photo", photo);
    localStorage.setItem("formData", JSON.stringify(formData));
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://itder.org/api/course-purchase", {
        method: "POST",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formDataObj,
      });
      const data = await response.json();
      if (response.ok) {
        const orderId =
          "ORD-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
        localStorage.setItem("orderId", orderId);
        alert(`Form submitted successfully! Order ID: ${orderId}`);
      } else {
        console.log(data);
        alert(data?.message || "Submission failed.");
      }
    } catch (err) {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedData = JSON.parse(storedCart);
      setCart(parsedData);
      setCartItem(parsedData.length);
    }
  }, []);

  return (
    <div className="  mt-5 border mx-2">
      <div className="bg-[#6f42c1] text-white p-6 text-center mb-5">
        <h2 className="text-5xl font-bold">Trainee Admission Form</h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6"
      >
        <div className="form-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="fullName"
                className="block font-semibold text-base mb-2"
              >
                Full Name:
              </label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="formNo"
                className="block font-semibold text-base mb-2"
              >
                Form no:
              </label>
              <input
                type="text"
                id="formNo"
                value={formData.formNo}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="photo"
                  className="block font-semibold text-base mb-2"
                >
                  Photo:
                </label>
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="parentName"
                className="block font-semibold text-base mb-2"
              >
                Father/Mother Name:
              </label>
              <input
                type="text"
                id="parentName"
                value={formData.parentName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="parentNumber"
                className="block font-semibold text-base mb-2"
              >
                Number:
              </label>
              <input
                type="text"
                id="parentNumber"
                value={formData.parentNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="school"
                className="block font-semibold text-base mb-2"
              >
                School/College:
              </label>
              <input
                type="text"
                id="school"
                value={formData.school}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="jobInfo"
                className="block font-semibold text-base mb-2"
              >
                Job Information:
              </label>
              <input
                type="text"
                id="jobInfo"
                value={formData.jobInfo}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="email"
                className="block font-semibold text-base mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block font-semibold text-base mb-2"
              >
                Gender:
              </label>
              <select
                id="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="" disabled selected>
                  Select Gender
                </option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Others">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="presentAddress"
                className="block font-semibold text-base mb-2"
              >
                Present Address:
              </label>
              <textarea
                id="presentAddress"
                value={formData.presentAddress}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="permanentAddress"
                className="block font-semibold text-base mb-2"
              >
                Permanent Address:
              </label>
              <textarea
                id="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="nid"
                className="block font-semibold text-base mb-2"
              >
                NID Number:
              </label>
              <input
                type="text"
                id="nid"
                value={formData.nid}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="mobile"
                className="block font-semibold text-base mb-2"
              >
                Mobile No:
              </label>
              <input
                type="text"
                id="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="guardianName"
                className="block font-semibold text-base mb-2"
              >
                Local Guardian's Name:
              </label>
              <input
                type="text"
                id="guardianName"
                value={formData.guardianName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="dob"
                className="block font-semibold text-base mb-2"
              >
                Date of Birth:
              </label>
              <input
                type="date"
                id="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="bloodGroup"
                className="block font-semibold text-base mb-2"
              >
                Blood Group:
              </label>
              <select
                id="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="" disabled selected>
                  Select Blood Group
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="guardianPhone"
                className="block font-semibold text-base mb-2"
              >
                Local Guardian's Phone:
              </label>
              <input
                type="text"
                id="guardianPhone"
                value={formData.guardianPhone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label
                htmlFor="admissionDate"
                className="block font-semibold text-base mb-2"
              >
                Admission Date:
              </label>
              <input
                type="date"
                id="admissionDate"
                value={formData.admissionDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
        </div>

        <div className="m-mt_16px">
          <h1 className="text-sm text-start md:text-text_xl lg:py-0 font-bold">
            Cart
          </h1>
          {cart.map((course, key) => (
            <div key={key} className="pt-p_16px">
              <div className="lg:flex items-start gap-3">
                <div className="w-full lg:w-[58%] bg-white border-2">
                  <table className=" overflow-x-auto  w-full">
                    <thead>
                      <tr className="border-b-4 border-gray-300">
                        <th className="text-[14.4px] w-6/12 font-bold p-[7px] text-black">
                          Course
                        </th>
                        <th className="text-[14.4px] font-bold p-[7px] text-black">
                          Price
                        </th>
                        <th className="text-[14.4px] font-bold p-[7px] text-black">
                          Quantity
                        </th>
                        <th className="text-[14.4px] font-bold p-[7px] text-black">
                          Sub Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="overflow-x-auto ">
                      <tr className="border-b border-gray-300 overflow-x-auto">
                        <td>
                          <div className="flex items-center justify-center ">
                            <div className="w-[20%] text-center flex items-center justify-center ">
                              <RiDeleteBin5Line className="text-xl hover:text-footer_color cursor-pointer" />
                            </div>
                            <div className="flex flex-col text-center justify-center items-center py-2  w-[80%]">
                              <div className="mask">
                                <img
                                  className="h-[40px] w-[70px]"
                                  src={course.photo}
                                  alt="Course"
                                />
                              </div>
                              <p className="text-[14.4px] px-[7px] text-center flex ">
                                {course.course_name}
                                <span className="hidden lg:flex ">
                                  - unit name
                                </span>
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
                            {course.discount_price}
                          </p>
                        </td>
                        <td>
                          <div className="flex justify-center">
                            <div className="border">
                              <button className="px-4 w-[30px] font-bold font_standard my-1.5">
                                -
                              </button>
                            </div>
                            <div className="border-y w-[40px] flex justify-center items-center">
                              {cartItem}
                            </div>
                            <div className="border">
                              <button className="px-4 w-[30px] font-bold font_standard my-1.5">
                                +
                              </button>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
                            {course.discount_price * cartItem}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="lg:w-[41%] bg-white border-2 ">
                  <div className="px-[30px]">
                    <h2 className="font-bold text-start text-text_medium pt-2 pb-1 border-b-2 border-black">
                      Cart Summary
                    </h2>
                    <div className="py-3 flex justify-between border-b border-gray-300">
                      <p className="text-black font-bold">Total Price</p>
                      <p className="text-black font-bold">
                        {course.discount_price * cartItem}
                      </p>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="font-medium text-black mb-2 border-2 hover:bg-[#D2C5A2] duration-300 py-2 px-4  block text-center mx-auto w-full"
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default Checkout;
