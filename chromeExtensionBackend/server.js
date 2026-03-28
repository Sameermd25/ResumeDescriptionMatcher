const express = require("express")
const cors = require("cors")
const multer = require("multer")
const pdf = require("pdf-parse")
const Groq = require("groq-sdk")
require("dotenv").config()

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})


const app = express()

app.use(cors({ origin: "*" }))
app.use(express.json({ limit: "10mb" }))

const upload = multer({
  storage: multer.memoryStorage()
})

/*
-----------------------------------
1️⃣ Extract Resume Route
-----------------------------------
*/
// app.post("/extractResume", upload.single("resume"), async (req, res) => {
//     try {
//         const buffer = req.file.buffer
//         const data = await pdf(buffer)

//         res.json({
//             resumeText: data.text
//         })

//     } catch (err) {
//         console.log(err)
//         res.status(500).json({ error: "Resume extraction failed" })
//     }
// })

app.post("/extractResume", upload.single("resume"), async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({ error: "No file received" })
    }

    const buffer = req.file.buffer
    const data = await pdf(buffer)

    res.json({
      resumeText: data.text
    })

  } catch (err) {
    console.error("Extract Resume Error:", err)
    res.status(500).json({ error: "Resume extraction failed" })
  }
})

/*
-----------------------------------
2️⃣ Calculate Score Route
-----------------------------------
*/
// app.post("/calculateScore", async (req, res) => {
//     try {
//         const { jd, resumeText } = req.body

//         console.log("JD Preview:", jd.substring(0, 100))
//         console.log("Resume Preview:", resumeText.substring(0, 100))

//         // Very simple matching logic (demo)
//         const jdWords = jd.toLowerCase().split(/\W+/)
//         const resumeWords = resumeText.toLowerCase()

//         let matchCount = 0

//         jdWords.forEach(word => {
//             if (resumeWords.includes(word)) {
//                 matchCount++
//             }
//         })

//         const score = Math.min(
//             Math.round((matchCount / jdWords.length) * 100),
//             100
//         ) + "%"

//         res.json({ score })

//     } catch (err) {
//         console.log(err)
//         res.status(500).json({ error: "Scoring failed" })
//     }
// })

// app.post("/calculateScoreAI", async (req, res) => {
//     try {
//         const { jd, resumeText } = req.body

//         if (!jd || !resumeText) {
//             return res.status(400).json({ error: "Missing JD or Resume text" })
//         }

//         const completion = await groq.chat.completions.create({
//             model: "llama-3.3-70b-versatile", // strong model
//             messages: [
//                 {
//                     role: "system",
//                     content: "You are an expert ATS system that evaluates resume and job description matching."
//                 },
//                 {
//                     role: "user",
//                     content: `Job Description:${jd}

//                               Resume:${resumeText}

//                               Evaluate:
//                               1. Matching percentage (0-100)
//                               2. Key matched skills
//                               3. Missing important skills
//                               4. Short explanation

//                               Return response in JSON format:
//                               {
//                                   "score": number,
//                                   "matchedSkills": [],
//                                   "missingSkills": [],
//                                   "feedback": ""
//                               }`
//                 }
//             ],
//             temperature: 0.2
//         })

//         const aiResponse = completion.choices[0].message.content

//         res.json({ result: aiResponse })

//     } catch (err) {
//         console.error(err)
//         res.status(500).json({ error: "AI scoring failed" })
//     }
// })

// app.post("/calculateScoreAI", async (req, res) => {
//     try {
//         const { jd, resumeText } = req.body

//         if (!jd || !resumeText) {
//             return res.status(400).json({ error: "Missing JD or Resume text" })
//         }

//         // Trim resume to avoid token overflow
//         const trimmedResume = resumeText.slice(0, 8000)

//         const completion = await groq.chat.completions.create({
//             model: "llama-3.3-70b-versatile",
//             messages: [
//                 {
//                     role: "system",
//                     content: "You are a strict ATS scoring engine."
//                 },
//                 {
//                     role: "user",
//                     content: `
// You MUST return ONLY valid JSON.
// Do NOT include explanations.
// Do NOT include markdown.
// Do NOT include code blocks.
// Do NOT include notes.
// Return ONLY pure JSON.

// Job Description:
// ${jd}

// Resume:
// ${trimmedResume}

// Return strictly in this format:
// {
//   "score": number,
//   "matchedSkills": [],
//   "missingSkills": [],
//   "feedback": ""
// }
// `
//                 }
//             ],
//             temperature: 0
//         })

//         const aiResponse = completion.choices[0].message.content

//         // Clean possible markdown formatting
//         const cleanedResponse = aiResponse
//             .replace(/```json/g, "")
//             .replace(/```/g, "")
//             .trim()

//         let parsedResult

//         try {
//             parsedResult = JSON.parse(cleanedResponse)
//         } catch (parseError) {
//             return res.status(500).json({
//                 error: "AI returned invalid JSON",
//                 raw: aiResponse
//             })
//         }

//         res.json(parsedResult)

//     } catch (err) {
//         console.error("AI Scoring Error:", err)
//         res.status(500).json({ error: "AI scoring failed" })
//     }
// })


// app.post("/calculateScoreAI", async (req, res) => {
//     try {
//         const { jd, resumeText } = req.body

//         if (!jd || !resumeText) {
//             return res.status(400).json({
//                 error: "Missing JD or Resume text"
//             })
//         }

//         const completion = await groq.chat.completions.create({
//             model: "llama-3.3-70b-versatile", // use active Groq model
//             messages: [
//                 {
//                     role: "system",
//                     content:
//                         "You are an expert ATS (Applicant Tracking System) that evaluates resume and job description matching."
//                 },
//                 {
//                     role: "user",
//                     content: `
// Job Description:
// ${jd}

// Resume:
// ${resumeText}

// Evaluate the match and return STRICT JSON only.

// Return strictly in this format:
// {
//   "score": integer between 0 and 100 (NOT decimal),
//   "matchedSkills": [],
//   "missingSkills": [],
//   "feedback": ""
// }

// IMPORTANT:
// - score must be an integer (example: 75)
// - do NOT add explanation outside JSON
// - do NOT wrap in backticks
// `
//                 }
//             ],
//             temperature: 0.2
//         })

//         let aiResponse = completion.choices[0].message.content

//         // 🔹 Clean possible markdown formatting
//         aiResponse = aiResponse.replace(/```json|```/g, "").trim()

//         // 🔹 Parse JSON safely
//         let parsedResult
//         try {
//             parsedResult = JSON.parse(aiResponse)
//         } catch (parseError) {
//             return res.status(500).json({
//                 error: "AI returned invalid JSON",
//                 raw: aiResponse
//             })
//         }

//         // 🔹 Normalize score (handle 0-1 scale case)
//         if (
//             typeof parsedResult.score === "number" &&
//             parsedResult.score <= 1
//         ) {
//             parsedResult.score = Math.round(parsedResult.score * 100)
//         }

//         res.json(parsedResult)

//     } catch (err) {
//         console.error(err)
//         res.status(500).json({
//             error: "AI scoring failed"
//         })
//     }
// })


app.post("/calculateScoreAI", async (req, res) => {

  try {

    const { jd, resumeText } = req.body

    if (!jd || !resumeText) {
      return res.status(400).json({ error: "Missing JD or Resume text" })
    }

    console.log(jd,"job description")

    console.log(resumeText,"resume Text")

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are an expert ATS scoring engine."
        },
        {
  role: "user",
  content: `
You are an ATS system.

Compare the RESUME and JOB DESCRIPTION.

Rules:
1. Extract ONLY technical skills (languages, frameworks, databases, tools).
2. If the job description contains no technical skills → score must be 0.
3. Only count skills that appear in BOTH resume and job description.
4. Score = percentage of matched skills.

Return JSON only:

{
"score": integer between 0 and 100 (NOT decimal),
 "matchedSkills": [],
 "missingSkills": [],
 "feedback": ""
}

RESUME:
${resumeText}

JOB DESCRIPTION:
${jd}
`
}
      ],
      temperature: 0.2
    })

    let aiResponse = completion.choices[0].message.content
    aiResponse = aiResponse.replace(/```json|```/g, "").trim()

    const parsed = JSON.parse(aiResponse)

    console.log(parsed,"parsed Text")

    res.json(parsed)

  } catch (err) {
    console.error("AI Error:", err)
    res.status(500).json({ error: "AI scoring failed" })
  }
})


app.listen(9000, () => {
  console.log("Server running on port 9000")
})