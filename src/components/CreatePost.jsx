import React, { useState } from "react";
import axios from "axios";
// import { useSelector } from "react-redux";

import Editor from './Editor'
import 'react-quill/dist/quill.snow.css';

const CreatePage = () => {
  // get user data from store
  // const user = useSelector(state => state.user);

  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);

  const onEditorChange = (value) => {
    setContent(value);
    console.log(content);
  };

  const onFilesChange = (files) => {
    setFiles(files);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // check if user exist && logged (store)

    const variables = {
      content: content,
      userID: "user id"
    };

    console.log(variables)

    // API call --> create Post
    axios.post("http://localhost:5000/api/blog/createPost", variables).then((response) => {
      if (response) {;
        console.log("Notif --> Post Created !");
        console.log(response.data)

        // setTimeout(() => {
        //   history.push('/Blog')
        // }, 2000);
      }
    })
  }

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <h2 style={{ textAlign: "center" }}> Create Post </h2>
      
      <Editor
        placeholder={"Start Posting Something"}
        onEditorChange={onEditorChange}
        onFilesChange={onFilesChange}
      />

      <form onSubmit={onSubmit}>
        <div style={{ textAlign: "center", margin: "2rem" }}>
          <button> Submit </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePage;
