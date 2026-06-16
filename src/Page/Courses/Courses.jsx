import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Courses = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("https://itder.org/api/get-course-list")
      .then((res) => res.json())
      .then((data) => setData(data.courseData))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  const addToCart = (course) => {
    const cartItem = localStorage.getItem("cart");
    if (cartItem) {
      toast.warning("You already added to cart");
    } else {
      localStorage.setItem("cart", JSON.stringify([course]));
      toast.success("Course added to cart");
      window.location.reload();
    }
  };

  return (
    <div className="grid grid-cols-3 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {loading ? (
        <p>Loading...</p>
      ) : (
        data.map((course) => (
          <div key={course.id}>
            <div className="m-mt_16px ">
              <div className=" bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="relative ">
                  <img
                    src={course.photo}
                    alt="Course Image"
                    className="w-full h-52 object-cover"
                  />
                  <div className="absolute top-0 left-0 p-2">
                    <h3 className="text-white text-xl font-bold">Data Entry</h3>
                  </div>
                </div>
                <div className="p-4 flex flex-col">
                  <h2 className="text-gray-800 text-lg font-semibold mb-2">
                    {course.course_name}
                  </h2>
                  <div className="flex items-center justify-between mb-4">
                    <span className="flex text-blue-500 text-md">
                      ★★★★★(no need to change)
                    </span>
                    <span className="ml-2 text-gray-600 text-md font-bold">
                      {course.trainer_data.name}
                    </span>
                  </div>
                  {/* <div className="flex gap-2 mb-4 flex-wrap">
                                {['Photography', 'Light set up', 'Camera angle', 'Self Development'].map((tag) => (
                                    <span key={tag} className="bg-yellow-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div> */}
                  <p className="text-gray-600 text-md mb-4">
                    Course Details{" "}
                    <span className="text-blue-500">
                      Show Details(no need to change)
                    </span>
                  </p>
                  <hr />
                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <span className="line-through text-gray-400 text-sm">
                        BDT {course.regular_price} TK
                      </span>
                      <span className="text-green-600 text-md font-bold ml-2">
                        {course.discount_price === course.regular_price
                          ? "Free"
                          : `-${Math.ceil((course.discount_price / course.regular_price) * 100)}%`}
                      </span>
                      <span className="text-black text-lg font-bold ml-2">
                        BDT {course.discount_price} TK
                      </span>
                    </div>
                    {/* <span className="text-green-600 text-sm">Earn Tk 48</span> */}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => addToCart(course)}
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-500 w-full font-bold text-md"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Courses;
