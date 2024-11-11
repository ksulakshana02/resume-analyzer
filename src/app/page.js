"use client"

import Image from "next/image";
import {useEffect, useState} from "react";
import Handler from "@/api/analyzer";
// import Markdown from "react-markdown";

const Home = () => {
  const [resume, setResume] = useState(null);
  const [description, setDescription] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedResume = localStorage.getItem("resume");
    const savedDescription = localStorage.getItem("description");
    // const savedResult = localStorage.getItem("result");

    if (savedResume) {
      setResume(new Blob([savedResume], {type: "text/plain"}));
    }
    if (savedDescription) {
      setDescription(savedDescription);
    }
    // if (savedResult) {
    //   setResult(JSON.parse(savedResult));
    // }
  }, []);

  useEffect(() => {
    if (description) {
      localStorage.setItem("description", description);
    }

  }, [description]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResume(file);

    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem("resume", reader.result);
    };
    reader.readAsText(file);
  }


  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume || !description) {
      alert("Please upload a resume and enter a job description.");
      return;
    }

    setLoading(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const resumeContent = e.target.result;

      try {
        const data = await Handler(resumeContent, description);
        if (data.success) {
          setResult(data.analysis);
          // localStorage.setItem("result", data.analysis);

        } else {
          alert("An error occurred during analysis.");
        }

      } catch (err) {
        console.log("---------Error during analysis: ", err.message);
        alert("An error occurred during analyzing the resume.");
      } finally {
        setLoading(false);
      }
    };

    reader.readAsText(resume);
  };


  return (
      <div>
        <div className="bg-white font-roboto flex flex-col items-center justify-center gap-4">
          <div className="flex bg-blue-600 w-full justify-center text-white p-4 items-center">
            <h1 className="text-2xl font-bold">ATS Friendly Resume Analyzer</h1>
          </div>

          <div className="w-4/5 lg:w-3/5 p-4 bg-white border border-gray-400 rounded-lg items-center">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Analyze Your Resume for ATS Compatibility</h2>
              <p className="text-gray-700">Upload your resume and job description to get a detailed analysis
                to
                ensure it passes through Applicant Tracking Systems.</p>
            </div>

            <div className="mb-8">
              <form className="bg-gray-100 p-6 rounded-lg" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="font-bold text-gray-700 mb-2 block text-[16px]">Upload a
                    resume</label>
                  <label
                      className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer border self-center p-4 justify-center"
                      htmlFor="resume">
                    <Image src="/upload.png" alt="" width={28} height={28}/>
                    <span>Upload a resume</span>
                  </label>
                  <input type="file" id="resume" onChange={handleFileChange}
                         className="w-full hidden p-2 border border-gray-300 rounded-lg"/>
                </div>
                <div className="mb-4">
                  <label form="job-description" className="block text-gray-700 font-bold mb-2">Job
                    Description</label>
                  <textarea id="job-description" rows={5} value={description}
                            onChange={handleDescriptionChange} placeholder="Enter the job description"
                            className="w-full p-2 border border-gray-300 rounded-lg"/>
                </div>
                <button type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 items-center flex self-center"
                        disabled={loading}>{loading ? 'Analyzing...' : 'Analyze Resume'}</button>
              </form>
            </div>
            {result && (
                <div className="bg-gray-100 rounded-lg p-4">
                  <h3 className="text-2xl font-bold mb-4 text-center">Analysis Result</h3>
                  <div className="p-4 rounded-lg text-center">
                    <p className="text-gray-700">{result}</p>
                  </div>
                </div>
            )}
          </div>

          <div className="bg-blue-600 p-4 w-full align-bottom">
            <div className="container text-white text-center">
              <p>&copy; 2024 <a href="https://www.linkedin.com/in/ksulakshana/">@kSulakshana</a>. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Home;
