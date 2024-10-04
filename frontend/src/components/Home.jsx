import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { BsPlusLg } from "react-icons/bs";
import { MdOutlineTitle } from "react-icons/md";
import Docs from "./Docs";
import { api_base_url } from "../Helper"
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isCreateModelShow, setIsCreateModelShow] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    getData();
  }, [])

  const createDoc = () => {
    if (title === "") {
      setError("Please Enter Title")
    }
    else {
      fetch(api_base_url + "/createDoc", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          docName: title,
          userId: localStorage.getItem("userId")
        })
      }).then(res => res.json())
        .then(data => {
          if (data.success) {
            setIsCreateModelShow(false);
            navigate(`/createDocs/${data.docId}`)
          }
          else {
            setError(data.message)
          }
        })
    }
  }

  const getData = () => {
    fetch(api_base_url + "/getAllDocs", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId")
      })
    }).then(res => res.json())
      .then(data => {
        setData(data.docs)
      })
  }


  return (
    <>
      <Navbar />
      <div className="flex items-center justify-between px-[100px]">
        <h3 className="mt-7 mb-3 text-3xl">All Documents</h3>
        <button
          className="btnBlue"
          onClick={() => {
            setIsCreateModelShow(true);
            document.getElementById('title');
          }}
        >
          <i>
            <BsPlusLg />
          </i>
          Create New Document
        </button>
      </div>

      <div className="allDocs px-[100px] mt-4">
        {
          data ? data.map((el, index) => {
            return (<>
              <Docs docs={el} key={el} docID={`doc-${index + 1}`} />
            </>)
          }) : ""
        }
      </div>

      {isCreateModelShow ? (
        <>
          <div className="createDocsModelIcon top-0 left-0 bottom-0 right-0 fixed bg-[rgb(0,0,0,0.3)] w-screen h-screen flex flex-col items-center justify-center">
            <div className="createDocsModel p-[15px] bg-[#fff] rounded-lg h-[30vh] w-[35vw]">
              <h3 className="text-[20px]">Create New Document</h3>

              <div className="inputCon mt-3">
                <p className="text-[14px] text-[grey]">Title</p>
                <div className="inputBox w-[100%]">
                  <i>
                    <MdOutlineTitle />
                  </i>
                  <input onChange={(e) => { setTitle(e.target.value) }}
                    value={title}
                    type="text"
                    placeholder="Title"
                    name="title"
                    id="title"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 w-full justify-between">
                <button onClick={createDoc} className="btnBlue !min-w-[49%]">
                  <i>
                    <BsPlusLg />
                  </i>
                  Create New Document
                </button>
                <button
                  onClick={() => {
                    setIsCreateModelShow(false);
                  }}
                  className="p-[10px] bg-[#d1d5db] text-black rounded-lg cursor-pointer border-0 min-w-[49%]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}


    </>
  );
};

export default Home;
