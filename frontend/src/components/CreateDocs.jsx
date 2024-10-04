import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import JoditEditor from "jodit-pro-react";
import { api_base_url } from "../Helper";

const CreateDocs = () => {
  let docsId = useParams();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [error, setError] = useState("")


  const updateDoc = () => {
    fetch(api_base_url + "/uploadDoc", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        docId: docsId.docsId,
        content: content
      })
    }).then(res => res.json()).then(data => {
      if (data.success === false) {
        setError(data.message)
      }
      else {
        setError("")
      }
    })
  }

  useEffect(() => {
    getContent();
  }, [])

  const getContent = () => {
    fetch(api_base_url + "/getDoc", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        docId: docsId.docsId,
      })
    }).then(res => res.json()).then(data => {
      if (data.success === false) {
        setError(data.message)
      }
      else {
        setContent(data.doc.content)
      }
    })
  }

  return (
    <>
      <Navbar />
      <div className="mt-3 px-[100px]">
        <JoditEditor
          ref={editor}
          value={content}
          tabIndex={1}
          onChange={e => {
            setContent(e); updateDoc();
          }}
        />
      </div>
    </>
  );
};

export default CreateDocs;
