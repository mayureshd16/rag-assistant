import { useState } from "react";
import axios from "axios";

// const API = "https://rag-assistant-production-39e2.up.railway.app";
const API = import.meta.env.VITE_API_URL;


function App() {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);

  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const uploadFile = async () => {

    if (!file) {
        alert("Please select a file.");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {

        setUploading(true);
        setUploadSuccess(false);

        const response = await axios.post(
            `${API}/upload`,
            formData
        );

        console.log(response.data);

        setUploadSuccess(true);
        setFile(null);

    }
    catch (error) {

        console.error(error);

        alert("Upload Failed");

    }
    finally {

        setUploading(false);

    }
  };

  const askQuestion = async () => {
    try {
      const response = await axios.post(
        `${API}/query`,
        {
          questions: question
          .split("\n")
          .filter(q => q.trim() !== "")
        }
      );

      setAnswers(response.data.answers);
    } catch (error) {
      console.error(error);
      alert("Question failed");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px" }}>
      <h1>Multi-Document RAG Assistant</h1>

      <h3>Upload Document</h3>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
      onClick={uploadFile}
      style={{ marginLeft: "10px" }}
      disabled={uploading}
      >
        {
          uploading
          ? "Uploading..."
          : "Upload"
        }
      </button>

      {
        uploadSuccess &&
        (
          <p
            style={{
                color: "limegreen",
                fontWeight: "bold",
                marginTop: "10px"
            }}
          >
            ✅ Upload completed successfully!
          </p>
        )
      }
      

      <hr />

      <h3>Ask Questions</h3>

      <textarea
        rows="6"
        cols="80"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder={`Enter one question per line

What are the candidate's technical skills?
What projects are mentioned in the resume?
Summarize the candidate's experience.`}
      />

      <br />
      <br />

      <button onClick={askQuestion}>
        Ask Questions
      </button>

      <hr />

      <h3>Answers</h3>

      {answers.length > 0 ? (
        answers.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px"
            }}
          >
            <h4>Question:</h4>
            <p>{item.question}</p>

            <h4>Answer:</h4>
            <p>{item.answer}</p>
          </div>
        ))
      ) : (
        <p>No answers yet.</p>
      )}
    </div>
  );
}

export default App;