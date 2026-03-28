// import { useState } from "react"

// function App() {

//   const [status, setStatus] = useState("")
//   const [result, setResult] = useState(null)

//   // 📌 Upload Resume
//   const handleFileChange = async (e) => {

//     const file = e.target.files[0]
//     if (!file) return

//     setStatus("Uploading resume...")

//     const formData = new FormData()
//     formData.append("resume", file)

//     try {
//       const response = await fetch("http://localhost:9000/extractResume", {
//         method: "POST",
//         body: formData
//       })

//       const data = await response.json()

//       chrome.storage.local.set({ resumeText: data.resumeText }, () => {
//         setStatus("Resume stored successfully ✅")
//       })

//     } catch (err) {
//       console.error(err)
//       setStatus("Upload failed ❌")
//     }
//   }

//   // 📌 Check Score (JD from selected text)
//   const checkScore = () => {

//     setStatus("Getting selected Job Description...")

//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

//       chrome.tabs.sendMessage(
//         tabs[0].id,
//         { type: "GET_SELECTED_TEXT" },
//         (response) => {

//           if (!response || !response.text) {
//             setStatus("No text selected ❌")
//             return
//           }

//           setStatus("Analyzing with AI... 🤖")

//           chrome.runtime.sendMessage(
//             {
//               type: "CHECK_SCORE",
//               jobDescription: response.text
//             },
//             (aiResult) => {

//               if (aiResult?.error) {
//                 setStatus("Error: " + aiResult.error)
//                 return
//               }

//               setResult(aiResult)
//               setStatus("Analysis Complete ✅")
//             }
//           )
//         }
//       )
//     })
//   }

//   return (
//     <div style={{ padding: "20px", width: "350px", fontFamily: "Arial" }}>

//       <h3>Resume JD Matcher</h3>

//       <input
//         type="file"
//         accept="application/pdf"
//         onChange={handleFileChange}
//       />

//       <br /><br />

//       <button onClick={checkScore} style={{ width: "100%" }}>
//         Check Score (Use Selected JD)
//       </button>

//       <p>{status}</p>

//       {result && (
//         <div style={{ marginTop: "15px" }}>

//           <h4>Match Score: {result.score}%</h4>

//           <div style={{
//             height: "10px",
//             background: "#ddd",
//             borderRadius: "5px"
//           }}>
//             <div style={{
//               height: "10px",
//               width: `${result.score}%`,
//               background:
//                 result.score > 70 ? "green" :
//                 result.score > 40 ? "orange" : "red",
//               borderRadius: "5px"
//             }} />
//           </div>

//           <h4>Matched Skills ✅</h4>
//           <ul>
//             {result.matchedSkills?.map((skill, index) => (
//               <li key={index}>{skill}</li>
//             ))}
//           </ul>

//           <h4>Missing Skills ❌</h4>
//           <ul>
//             {result.missingSkills?.map((skill, index) => (
//               <li key={index}>{skill}</li>
//             ))}
//           </ul>

//           <h4>Feedback 💬</h4>
//           <p>{result.feedback}</p>

//         </div>
//       )}
//     </div>
//   )
// }

// export default App

// import { useState, useEffect } from "react"

// function App() {

//   const [file, setFile] = useState(null)
//   const [status, setStatus] = useState("")
//   const [resumeName, setResumeName] = useState("")

//   // Check if resume already stored
//   useEffect(() => {
//     chrome.storage.local.get(["resumeText", "resumeName"], (data) => {
//       if (data.resumeText) {
//         console.log(resumeText,"resume Text")
//         setStatus("Resume already uploaded ✅")
//         setResumeName(data.resumeName)
//       }
//     })
//   }, [])

//   async function handleUpload(e) {
//     e.preventDefault()

//     if (!file) {
//       alert("Please select a PDF resume")
//       return
//     }

//     setStatus("Uploading and extracting...")

//     const formData = new FormData()
//     formData.append("resume", file)

//     try {
//       const response = await fetch("http://localhost:9000/extractResume", {
//         method: "POST",
//         body: formData
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         setStatus("Extraction failed ❌")
//         return
//       }

//       chrome.storage.local.set({
//         resumeText: data.resumeText,
//         resumeName: file.name
//       }, () => {
//         setStatus("Resume uploaded successfully ✅")
//         setResumeName(file.name)
//       })

//     } catch (err) {
//       console.error(err)
//       setStatus("Server error ❌")
//     }
//   }

//   function clearResume() {
//     chrome.storage.local.remove(["resumeText", "resumeName"], () => {
//       setStatus("Resume removed 🗑️")
//       setResumeName("")
//     })
//   }

//   return (
//     <div style={{ padding: "20px", width: "350px" }}>
//       <h3>Resume JD Matcher</h3>

//       <form onSubmit={handleUpload}>
//         <input
//           type="file"
//           accept="application/pdf"
//           onChange={(e) => setFile(e.target.files[0])}
//         />
//         <br /><br />
//         <button type="submit">Upload Resume</button>
//       </form>

//       {resumeName && <p><b>Stored Resume:</b> {resumeName}</p>}

//       <p>{status}</p>

//       {resumeName && (
//         <button onClick={clearResume}>
//           Remove Resume
//         </button>
//       )}
//     </div>
//   )
// }

// export default App



// import { useState, useEffect } from "react"

// function App() {

//   const [file, setFile] = useState(null)
//   const [status, setStatus] = useState("")
//   const [resumeName, setResumeName] = useState("")
//   const [result, setResult] = useState(null)

//   // Check if resume already stored
//   useEffect(() => {
//     chrome.storage.local.get(["resumeText", "resumeName"], (data) => {
//       if (data.resumeText) {
//         setStatus("Resume already uploaded ✅")
//         setResumeName(data.resumeName)
//       }
//     })
//   }, [])

//   async function handleUpload(e) {
//     e.preventDefault()

//     if (!file) {
//       alert("Please select a PDF resume")
//       return
//     }

//     setStatus("Uploading and extracting...")

//     const formData = new FormData()
//     formData.append("resume", file)

//     try {
//       const response = await fetch("http://localhost:9000/extractResume", {
//         method: "POST",
//         body: formData
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         setStatus("Extraction failed ❌")
//         return
//       }

//       chrome.storage.local.set({
//         resumeText: data.resumeText,
//         resumeName: file.name
//       }, () => {
//         setStatus("Resume uploaded successfully ✅")
//         setResumeName(file.name)
//       })

//     } catch (err) {
//       console.error(err)
//       setStatus("Server error ❌")
//     }
//   }

//   function clearResume() {
//     chrome.storage.local.remove(["resumeText", "resumeName"], () => {
//       setStatus("Resume removed 🗑️")
//       setResumeName("")
//       setResult(null)
//     })
//   }

//   // ⭐ Check JD score
//   // function checkScore() {

//   //   setStatus("Getting selected Job Description...")

//   //   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

//   //     chrome.tabs.sendMessage(
//   //       tabs[0].id,
//   //       { type: "GET_SELECTED_TEXT" },
//   //       (response) => {

//   //         if (chrome.runtime.lastError) {
//   //           setStatus("Content script not loaded ❌")
//   //           return
//   //         }

//   //         if (!response || !response.text) {
//   //           setStatus("No text selected ❌")
//   //           return
//   //         }

//   //         setStatus("Analyzing with AI... 🤖")

//   //         chrome.runtime.sendMessage(
//   //           {
//   //             type: "CHECK_SCORE",
//   //             jobDescription: response.text
//   //           },
//   //           (aiResult) => {

//   //             if (aiResult?.error) {
//   //               setStatus("Error: " + aiResult.error)
//   //               return
//   //             }

//   //             setResult(aiResult)
//   //             setStatus("Analysis Complete ✅")
//   //           }
//   //         )
//   //       }
//   //     )
//   //   })
//   // }
//   function checkScore() {

//     setStatus("Getting selected Job Description...")

//     chrome.storage.local.get(["selectedJD"], (data) => {

//       if (!data.selectedJD) {
//         setStatus("No text selected ❌")
//         return
//       }

//       setStatus("Analyzing with AI... 🤖")

//       chrome.runtime.sendMessage(
//         {
//           type: "CHECK_SCORE",
//           jobDescription: data.selectedJD
//         },
//         (aiResult) => {

//           if (aiResult?.error) {
//             setStatus("Error: " + aiResult.error)
//             return
//           }

//           setResult(aiResult)
//           setStatus("Analysis Complete ✅")
//         }
//       )
//     })
//   }

//   return (
//     <div style={{ padding: "20px", width: "350px", fontFamily: "Arial" }}>
//       <h3>Resume JD Matcher</h3>

//       <form onSubmit={handleUpload}>
//         <input
//           type="file"
//           accept="application/pdf"
//           onChange={(e) => setFile(e.target.files[0])}
//         />
//         <br /><br />
//         <button type="submit">Upload Resume</button>
//       </form>

//       {resumeName && <p><b>Stored Resume:</b> {resumeName}</p>}

//       <p>{status}</p>

//       {resumeName && (
//         <>
//           <button onClick={checkScore} style={{ width: "100%" }}>
//             Check Score (Use Selected JD)
//           </button>

//           <br /><br />

//           <button onClick={clearResume}>
//             Remove Resume
//           </button>
//         </>
//       )}

//       {/* ⭐ RESULT UI */}
//       {result && (
//         <div style={{ marginTop: "20px" }}>

//           <h4>Match Score: {result.score}%</h4>

//           <div style={{
//             height: "10px",
//             background: "#ddd",
//             borderRadius: "5px"
//           }}>
//             <div style={{
//               height: "10px",
//               width: `${result.score}%`,
//               background:
//                 result.score > 70 ? "green" :
//                   result.score > 40 ? "orange" : "red",
//               borderRadius: "5px"
//             }} />
//           </div>

//           <h4>Matched Skills ✅</h4>
//           <ul>
//             {result.matchedSkills?.map((skill, index) => (
//               <li key={index}>{skill}</li>
//             ))}
//           </ul>

//           <h4>Missing Skills ❌</h4>
//           <ul>
//             {result.missingSkills?.map((skill, index) => (
//               <li key={index}>{skill}</li>
//             ))}
//           </ul>

//           <h4>Feedback 💬</h4>
//           <p>{result.feedback}</p>

//         </div>
//       )}
//     </div>
//   )
// }

// export default App


import { useState, useEffect } from "react"

function App() {

  const [file, setFile] = useState(null)
  const [status, setStatus] = useState("")
  const [resumeName, setResumeName] = useState("")
  const [result, setResult] = useState(null)

  useEffect(() => {
    chrome.storage.local.get(["resumeText", "resumeName"], (data) => {
      if (data.resumeText) {
        setResumeName(data.resumeName)
        setStatus("Resume already uploaded ✅")
      }
    })
  }, [])

  async function handleUpload(e) {
    e.preventDefault()

    if (!file) {
      setStatus("Please select resume ❌")
      return
    }

    setStatus("Uploading resume...")

    const formData = new FormData()
    formData.append("resume", file)

    try {

      const response = await fetch("http://localhost:9000/extractResume", {
        method: "POST",
        body: formData
      })

      const data = await response.json()

      chrome.storage.local.set({
        resumeText: data.resumeText,
        resumeName: file.name
      }, () => {

        setResumeName(file.name)
        setStatus("Resume uploaded successfully ✅")

      })

    } catch {
      setStatus("Server error ❌")
    }
  }

  function clearResume() {

    chrome.storage.local.remove(["resumeText", "resumeName"], () => {
      setResumeName("")
      setResult(null)
      setStatus("Resume removed 🗑️")
    })
  }

  function checkScore() {

    setStatus("Fetching selected JD...")

    chrome.storage.local.get(["selectedJD"], (data) => {

      if (!data.selectedJD) {
        setStatus("No text selected ❌")
        return
      }

      setStatus("Analyzing with AI 🤖")

      chrome.runtime.sendMessage(
        {
          type: "CHECK_SCORE",
          jobDescription: data.selectedJD
        },
        (aiResult) => {

          if (aiResult?.error) {
            setStatus("Error: " + aiResult.error)
            return
          }

          setResult(aiResult)
          setStatus("Analysis Complete ✅")

        }
      )

    })
  }

  const score = result?.score || 0

  const circleStyle = {
    background: `conic-gradient(#4f46e5 ${score * 3.6}deg, #e5e7eb 0deg)`
  }

  return (
    <div style={styles.container}>

      <h2 style={styles.title}>Resume JD Matcher</h2>

      {/* Upload */}

      <form onSubmit={handleUpload} style={styles.uploadBox}>

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button style={styles.uploadBtn}>
          Upload Resume
        </button>

      </form>

      {resumeName && (
        <div style={styles.resumeCard}>
          📄 {resumeName}
        </div>
      )}

      <p style={styles.status}>{status}</p>

      {resumeName && (
        <div style={styles.buttons}>

          <button style={styles.checkBtn} onClick={checkScore}>
            Check Match Score
          </button>

          <button style={styles.removeBtn} onClick={clearResume}>
            Remove Resume
          </button>

        </div>
      )}

      {result && (

        <div style={styles.resultBox}>

          {/* Circular Score */}

          <div style={styles.circleWrapper}>

            <div style={{ ...styles.circle, ...circleStyle }}>

              <div style={styles.circleInner}>
                {score}%
              </div>

            </div>

          </div>

          {/* Animated Progress */}

          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: `${score}%`
              }}
            />
          </div>

          {/* Matched Skills */}

          <h4>Matched Skills</h4>

          <div style={styles.skills}>

            {result.matchedSkills?.map((skill, i) => (

              <span key={i} style={styles.skillMatch}>
                {skill}
              </span>

            ))}

          </div>

          {/* Missing Skills */}

          <h4>Missing Skills</h4>

          <div style={styles.skills}>

            {result.missingSkills?.map((skill, i) => (

              <span key={i} style={styles.skillMissing}>
                {skill}
              </span>

            ))}

          </div>

          <h4>AI Feedback</h4>

          <p style={styles.feedback}>
            {result.feedback}
          </p>

        </div>

      )}

    </div>
  )
}

export default App

const styles = {

  container: {
    width: "360px",
    padding: "18px",
    fontFamily: "Arial",
    background: "#f3f4f6"
  },

  title: {
    textAlign: "center",
    marginBottom: "15px"
  },

  uploadBox: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },

  uploadBtn: {
    background: "#4f46e5",
    color: "white",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  resumeCard: {
    background: "#e0e7ff",
    padding: "8px",
    borderRadius: "6px",
    marginTop: "10px",
    fontSize: "13px"
  },

  status: {
    fontSize: "12px",
    marginTop: "8px"
  },

  buttons: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginTop: "10px"
  },

  checkBtn: {
    background: "#16a34a",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  removeBtn: {
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  resultBox: {
    marginTop: "15px",
    background: "white",
    padding: "12px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  },

  circleWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "15px"
  },

  circle: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.6s ease"
  },

  circleInner: {
    width: "90px",
    height: "90px",
    background: "white",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "bold"
  },

  progressBar: {
    height: "10px",
    background: "#e5e7eb",
    borderRadius: "5px",
    overflow: "hidden",
    marginBottom: "15px"
  },

  progressFill: {
    height: "100%",
    background: "#4f46e5",
    transition: "width 0.7s ease"
  },

  skills: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    marginBottom: "10px"
  },

  skillMatch: {
    background: "#dcfce7",
    padding: "4px 8px",
    borderRadius: "20px",
    fontSize: "12px"
  },

  skillMissing: {
    background: "#fee2e2",
    padding: "4px 8px",
    borderRadius: "20px",
    fontSize: "12px"
  },

  feedback: {
    fontSize: "13px",
    color: "#444"
  }

}