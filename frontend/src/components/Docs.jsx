import React, { useState } from "react";
import docsIcon from "../images/docsIcon.png";
import { MdDelete } from "react-icons/md";
import deleteImg from "../images/delete.png";
import { api_base_url } from "../Helper";
import { useNavigate } from "react-router-dom";

const Docs = ({ docs }) => {
    const [error, setError] = useState("");
    const [isDeleteModelShow, setIsDeleteModelShow] = useState(false);
    const navigate = useNavigate();
    const docID = `doc-${docs._id}`;

    const deleteDoc = (id, docID) => {
        let doc = document.getElementById(docID);
        fetch(api_base_url + "/deleteDoc", {
            mode: "cors",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                docId: id,
                userId: localStorage.getItem("userId"),
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success === false) {
                    setError(data.message);
                } else {
                    setIsDeleteModelShow(false);
                    setTimeout(() => {
                        alert(data.message);
                    }, 500);
                    doc.remove();
                }
            });
    };

    return (
        <>
            {/* Document Card */}
            <div
                id={docID}
                className="docs cursor-pointer rounded-lg flex items-center justify-between mt-2 p-4 transition-all bg-[#f0f0f0] hover:bg-[#dcdcdc]"
            >
                <div
                    onClick={() => {
                        navigate(`/createDocs/${docs._id}`);
                    }}
                    className="left flex items-center gap-4 w-full sm:w-auto"
                >
                    <img
                        src={docsIcon}
                        alt="Document Icon"
                        className="h-10 w-10 sm:h-12 sm:w-12"
                    />
                    <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-medium">{docs.title}</h3>
                        <p className="text-sm sm:text-base text-gray-500">
                            Created: {new Date(docs.date).toDateString()} | Updated:{" "}
                            {new Date(docs.lastUpdate).toDateString()}
                        </p>
                    </div>
                </div>

                {/* Delete Button aligned with the title */}
                <div className="docsRight">
                    <i
                        onClick={() => {
                            setIsDeleteModelShow(true);
                        }}
                        className="delete text-3xl sm:text-4xl text-red-500 cursor-pointer transition-all hover:text-red-600"
                    >
                        <MdDelete />
                    </i>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {isDeleteModelShow && (
                <div className="deleteDocsModelCon fixed inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center">
                    <div className="deleteModel flex flex-col justify-center p-4 sm:p-6 bg-white rounded-lg max-w-sm w-full">
                        <h3 className="text-lg sm:text-xl font-semibold mb-4">
                            Delete Document
                        </h3>
                        <div className="flex items-start sm:items-center gap-3 mb-4">
                            <img src={deleteImg} alt="Delete Icon" className="h-12 w-12" />
                            <div>
                                <h3 className="text-base sm:text-lg font-medium">
                                    Do you want to delete this document?
                                </h3>
                                <p className="text-sm text-gray-500">Delete or Cancel</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => {
                                    deleteDoc(docs._id, docID);
                                }}
                                className="p-2 sm:p-3 bg-red-500 text-white rounded-lg cursor-pointer flex-1 transition hover:bg-red-600"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => {
                                    setIsDeleteModelShow(false);
                                }}
                                className="p-2 sm:p-3 bg-gray-300 text-gray-800 rounded-lg cursor-pointer flex-1 transition hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Docs;
