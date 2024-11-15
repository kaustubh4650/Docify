import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { BsPlusLg } from "react-icons/bs";
import { MdOutlineTitle } from "react-icons/md";
import Docs from "./Docs";
import { api_base_url } from "../Helper";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isCreateModelShow, setIsCreateModelShow] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const createDoc = () => {
    if (title === "") {
      setError("Please Enter Title");
    } else {
      fetch(api_base_url + "/createDoc", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          docName: title,
          userId: localStorage.getItem("userId"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setIsCreateModelShow(false);
            navigate(`/createDocs/${data.docId}`);
          } else {
            setError(data.message);
          }
        });
    }
  };

  const getData = () => {
    fetch(api_base_url + "/getAllDocs", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.docs);
      });
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 sm:px-10 lg:px-[100px] mt-6">
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 sm:mb-0">
          All Documents
        </h3>
        <button
          className="btnBlue flex items-center gap-2 text-sm sm:text-base"
          onClick={() => {
            setIsCreateModelShow(true);
          }}
        >
          <BsPlusLg />
          Create New Document
        </button>
      </div>


      <div className="allDocs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 sm:px-10 lg:px-[100px] mt-6">
        {data
          ? data.map((el, index) => (
            <Docs docs={el} key={index} docID={`doc-${index + 1}`} />
          ))
          : ""}
      </div>

      {isCreateModelShow ? (
        <>

          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-11/12 sm:w-3/4 lg:w-1/3">
              <h3 className="text-lg sm:text-xl font-semibold">
                Create New Document
              </h3>

              <div className="mt-4">
                <label htmlFor="title" className="block text-gray-500 mb-1">
                  Title
                </label>
                <div className="flex items-center border rounded px-3 py-2">
                  <MdOutlineTitle className="text-gray-400 mr-2" />
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    type="text"
                    placeholder="Enter Title"
                    name="title"
                    id="title"
                    required
                    className="flex-1 bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}

              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={createDoc}
                  className="btnBlue w-[48%] text-sm sm:text-base"
                >
                  <BsPlusLg className="mr-2" />
                  Create Document
                </button>
                <button
                  onClick={() => setIsCreateModelShow(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-black rounded-lg px-4 py-2 w-[48%] text-sm sm:text-base"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Home;
