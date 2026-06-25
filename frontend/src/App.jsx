import { useState } from "react";
import axios from "axios";
import "./App.css";

const API = import.meta.env.VITE_API_URL;

function App() {

  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);

  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // ---------------- Upload ----------------

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

  // ---------------- Questions ----------------

  const askQuestion = async () => {

    const questions = question
      .split("\n")
      .filter(q => q.trim() !== "");

    if (questions.length === 0) {

      alert("Please enter at least one question.");
      return;

    }

    try {

      setLoading(true);

      const response = await axios.post(
        `${API}/query`,
        {
          questions
        }
      );

      setAnswers(response.data.answers);

    }
    catch (error) {

      console.error(error);

      alert("Failed to get answer.");

    }
    finally {

      setLoading(false);

    }

  };

  return (

    <div
      style={{
        padding: "20px",
        maxWidth: "900px",
        margin: "auto"
      }}
    >

      <h1>Multi-Document RAG Assistant</h1>

      {/* ---------------- Upload ---------------- */}

      <h3>Upload Document</h3>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={uploadFile}
        style={{ marginLeft: "10px" }}
        disabled={uploading || loading}
      >

        {
          uploading
            ? "Uploading..."
            : "Upload"
        }

      </button>

      {

        uploadSuccess &&

        <p
          style={{
            color: "limegreen",
            fontWeight: "bold"
          }}
        >
          ✅ Upload completed successfully!
        </p>

      }

      <hr />

      {/* ---------------- Ask Questions ---------------- */}

      <h3>Ask Questions</h3>

      <textarea

        rows="6"
        cols="80"

        value={question}

        disabled={loading}

        onChange={(e) => setQuestion(e.target.value)}

        placeholder={`Enter one question per line

What are the candidate's technical skills?
What projects are mentioned in the resume?
Summarize the candidate's experience.`}

      />

      <br />
      <br />

      <button

        onClick={askQuestion}

        disabled={loading}

      >

        {

          loading

            ? "Thinking..."

            : "Ask Questions"

        }

      </button>

      {/* ---------- Loading Spinner ---------- */}

      {

        loading &&

        <div
          style={{
            textAlign: "center",
            marginTop: "25px"
          }}
        >

          <div className="spinner"></div>

          <h3>Thinking...</h3>

          <p>
            Generating answers from your documents...
          </p>

        </div>

      }

      <hr />

      {/* ---------------- Answers ---------------- */}

      <h2>Answers</h2>

      {

        answers.length > 0

          ?

          answers.map((item, index) => (

            <div

              key={index}

              style={{

                border: "1px solid #888",

                borderRadius: "8px",

                padding: "15px",

                marginBottom: "20px"

              }}

            >

              <h4>Question</h4>

              <p>{item.question}</p>

              <h4>Answer</h4>

              <p>{item.answer}</p>

            </div>

          ))

          :

          <p>No answers yet.</p>

      }

    </div>

  );

}

export default App;