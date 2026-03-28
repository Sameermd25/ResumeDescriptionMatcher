// console.log("background.js")




// chrome.runtime.onMessage.addListener((message,sender,sendResponse)=>{

//         if(message.type === "CHECK_SCORE"){

//                 callApi(message,sendResponse)

//                 return true

//         }

//         if(message.type === "GET_SCORE_DETAILS"){
//                 sendResponse("Dummy data")
//         }


 
// })


// async function callApi(message,sendResponse){

//         const resumeFileLink = chrome.runtime.getURL("resume.pdf")

//         const resume = await fetch(resumeFileLink)

//         let dataInBase64   

//         console.log(resume,'return  value of fetch')


//         // Read chuk binary data from fetch and store it in memory in single blob onject
//         const blob =await  resume.blob()
//         console.log(blob,'read all chunks and stored complete binary data in single blob object')





//         // Convert binary data from blob to charecters using base64
//         const pdfFileDataInCharecters = new Promise((resolve, reject) => {
//                 const reader = new FileReader()



//                 // Reject promise if anything wrong while reading a file
//                 reader.onerror = reject

//                 // Read the file 
//                 reader.readAsDataURL(blob)

//                 // Resolve promise if read complete file/blob
//                 reader.onloadend = function () {
//                         // Reader is storing all the data in property result
//                         resolve(reader.result)
//                 }


//         })

//         pdfFileDataInCharecters
//                 .then(async (data) => {
//                         console.log(data, 'data')
//                         dataInBase64 = data


//                         const apiData = await fetch('http://localhost:9000/calculateScore', {
//                                 method: "POST",
//                                 body: JSON.stringify({ jd: message.jobDescription, base64: dataInBase64, newProp: "Random String" }),
//                                 headers: {
//                                         "Content-Type": "application/json"
//                                 }
//                         })

//                         const dataInObject = await apiData.json()

//                         console.log(dataInObject, 'response from api')

//                         sendResponse(dataInObject.score)
//                 })
//         .catch((err)=>{
//                 console.log(err,'err while reading binary to chars')
//                 return
//         })


//         // if(!dataInBase64){
//         //         console.log("data not fetched properly")
//         //         return
//         // }


//         // Call api and send selected text as job description and converted file information in base64
   
//         return true

// }




// /* 
// Step 1 : Create backend server and create a post api then call that api in background.js

// Step 2 : Explore how to send pdf file to backend then implement it




// */

// console.log("background.js loaded")

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.type === "CHECK_SCORE") {
//         handleScore(message.jobDescription, sendResponse)
//         return true
//     }
// })

// // async function handleScore(jd, sendResponse) {
// //     try {
// //         chrome.storage.local.get(["resumeText"], async (result) => {

// //             if (result.resumeText) {
// //                 console.log("Using stored resume")
// //                 callApi(jd, result.resumeText, sendResponse)
// //             } else {
// //                 console.log("Extracting resume first time...")

// //                 const resumeText = await extractResumeText()

// //                 chrome.storage.local.set({ resumeText }, () => {
// //                     console.log("Resume stored in chrome.storage.local")
// //                 })

// //                 callApi(jd, resumeText, sendResponse)
// //             }
// //         })

// //     } catch (err) {
// //         console.log(err)
// //         sendResponse("Error")
// //     }
// // }

// async function handleScore(jd, sendResponse) {

//     chrome.storage.local.get(["resumeText"], async (result) => {

//         if (!result.resumeText) {
//             sendResponse({ error: "No resume uploaded. Please upload resume first." })
//             return
//         }

//         callApi(jd, result.resumeText, sendResponse)
//     })
// }

// async function extractResumeText() {
//     const resumeFileLink = chrome.runtime.getURL("resume.pdf")

//     const response = await fetch(resumeFileLink)
//     const blob = await response.blob()

//     const formData = new FormData()
//     formData.append("resume", blob, "resume.pdf")

//     const apiResponse = await fetch("http://localhost:9000/extractResume", {
//         method: "POST",
//         body: formData
//     })

//     const data = await apiResponse.json()

//     return data.resumeText
// }

// // async function callApi(jd, resumeText, sendResponse) {

// //     const response = await fetch("http://localhost:9000/calculateScore", {
// //         method: "POST",
// //         headers: {
// //             "Content-Type": "application/json"
// //         },
// //         body: JSON.stringify({ jd, resumeText })
// //     })

// //     const data = await response.json()

// //     sendResponse(data.score)
// // }

// async function callApi(jd, resumeText, sendResponse) {

//     try {
//         const response = await fetch("http://localhost:9000/calculateScoreAI", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ jd, resumeText })
//         })

//         const data = await response.json()

//         sendResponse(data) // send full object

//     } catch (error) {
//         console.error(error)
//         sendResponse({ error: "AI scoring failed" })
//     }
// }




console.log("background.js loaded")

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  if (message.type === "CHECK_SCORE") {
    handleScore(message.jobDescription, sendResponse)
    return true
  }
})

async function handleScore(jd, sendResponse) {

  chrome.storage.local.get(["resumeText"], async (data) => {

    if (!data.resumeText) {
      sendResponse({ error: "No resume uploaded" })
      return
    }

    try {
      const response = await fetch("http://localhost:9000/calculateScoreAI", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          jd,
          resumeText: data.resumeText
        })
      })

      const result = await response.json()

      if (!response.ok) {
        sendResponse({ error: "AI failed" })
        return
      }

      //console.log(resumeText)
      sendResponse(result)

    } catch (err) {
      console.error(err)
      sendResponse({ error: "Server error" })
    }
  })
}