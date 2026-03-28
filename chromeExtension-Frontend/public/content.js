// // console.log("content.js")
// // let tooltip

// // document.addEventListener("mouseup", (e) => {

// //     const selectedText = window.getSelection().toString().trim()

// //     console.log(selectedText, selectedText.length, 'selected text triggering')

// //     // Dont create new tool tip if jd/selected string is less than 50 charecters
// //     if (selectedText.length > 50) {

// //         createTooltip(selectedText)

// //     }

// // })


// // // Creates a tooltip after selecting text
// // function createTooltip(selectedText) {
// //     // Remove if any previous tooltip  existing
// //     if (tooltip) {
// //         tooltip.remove()
// //     }

// //     tooltip = document.createElement("div")

// //     tooltip.innerText = "Check Score"

// //     tooltip.style.position = "absolute"
// //     tooltip.style.zIndex = "999999"

// //     tooltip.style.padding = "8px 16px"
// //     tooltip.style.borderRadius = "999px"
// //     tooltip.style.fontSize = "13px"
// //     tooltip.style.fontWeight = "500"
// //     tooltip.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, sans-serif"

// //     tooltip.style.cursor = "pointer"

// //     tooltip.style.background = "linear-gradient(135deg, #111, #333)"
// //     tooltip.style.color = "#fff"

// //     tooltip.style.boxShadow = "0 8px 20px rgba(0,0,0,0.25)"
// //     tooltip.style.backdropFilter = "blur(6px)"

// //     tooltip.style.transition = "all 0.2s ease"
// //     tooltip.style.opacity = "0"
// //     tooltip.style.transform = "translateY(-5px) scale(0.95)"

// //     const selection = window.getSelection()
// //     const range = selection.getRangeAt(0)
// //     const rect = range.getBoundingClientRect()

// //     tooltip.style.top = `${rect.bottom + window.scrollY}px`
// //     tooltip.style.left = `${rect.left + window.scrollX}px`



// //     tooltip.onclick = () => {
// //         // Update tool tip inner text "loading ..."
// //         tooltip.innerText = "Loading..."

// //         // Call function in background.js 
// //         chrome.runtime.sendMessage({
// //             type: "CHECK_SCORE",
// //             jobDescription: selectedText
// //         },
// //             (response) => {
// //                 console.log(response, 'response from background.js')
// //                 tooltip.innerText = response
// //             }
// //         )
// //     }


// //     document.body.appendChild(tooltip)

// //     // return div

// // }


// console.log("content.js")
// let tooltip

// document.addEventListener("mouseup",(e)=>{

//     const selectedText = window.getSelection().toString().trim()

//     console.log(selectedText,selectedText.length,'selected text triggering')

//     // Dont create new tool tip if jd/selected string is less than 50 charecters
//     if (selectedText.length > 50) {

//         createTooltip(selectedText)

//     }

// })


// // Creates a tooltip after selecting text
// function createTooltip(selectedText){
//     // Remove if any previous tooltip  existing
//     if(tooltip){
//         tooltip.remove()
//     }

//     tooltip = document.createElement("div")

//     tooltip.innerText = "Check Score"
//     tooltip.style.height = '30px'
//     tooltip.style.width = "90px"

//     tooltip.style.borderRadius = "15px"

//     tooltip.style.cursor = "pointer"

//     tooltip.style.background = "black"
//     tooltip.style.color = "white"

//     tooltip.style.position = "absolute"
//     tooltip.style.zIndex = "999"

//     const selection = window.getSelection()
//     const range = selection.getRangeAt(0)
//     const rect = range.getBoundingClientRect()

//     tooltip.style.top = `${rect.bottom + window.scrollY}px`
//     tooltip.style.left = `${rect.left + window.scrollX}px`



//     tooltip.onclick = ()=>{
//       // Update tool tip inner text "loading ..."
//       tooltip.innerText = "Loading..."

//       // Call function in background.js 
//       chrome.runtime.sendMessage({
//         type : "CHECK_SCORE",
//         jobDescription : selectedText
//       },
//       (response)=>{
//           console.log(response,'response from background.js')
//         tooltip.innerText = response
//       }
//     )
//     }


//     document.body.appendChild(tooltip)

//     // return div

// }


// console.log("content.js loaded")

// let tooltip

// document.addEventListener("mouseup", () => {

//     const selectedText = window.getSelection().toString().trim()

//     if (selectedText.length > 50) {
//         createTooltip(selectedText)
//     }
// })

// function createTooltip(selectedText) {

//     if (tooltip) tooltip.remove()

//     tooltip = document.createElement("div")
//     tooltip.innerText = "Check Score"

//     tooltip.style.height = "30px"
//     tooltip.style.width = "110px"
//     tooltip.style.borderRadius = "15px"
//     tooltip.style.cursor = "pointer"
//     tooltip.style.background = "black"
//     tooltip.style.color = "white"
//     tooltip.style.position = "absolute"
//     tooltip.style.zIndex = "999"
//     tooltip.style.display = "flex"
//     tooltip.style.alignItems = "center"
//     tooltip.style.justifyContent = "center"

//     const selection = window.getSelection()
//     const range = selection.getRangeAt(0)
//     const rect = range.getBoundingClientRect()

//     tooltip.style.top = `${rect.bottom + window.scrollY}px`
//     tooltip.style.left = `${rect.left + window.scrollX}px`

//     // tooltip.onclick = () => {
//     //     tooltip.innerText = "Loading..."

//     //     chrome.runtime.sendMessage(
//     //         {
//     //             type: "CHECK_SCORE",
//     //             jobDescription: selectedText
//     //         },
//     //         (response) => {
//     //             tooltip.innerText = response || "Failed"
//     //         }
//     //     )
//     // }

//     tooltip.onclick = () => {

//         tooltip.innerText = "Analyzing... 🤖"

//         chrome.runtime.sendMessage(
//             {
//                 type: "CHECK_SCORE",
//                 jobDescription: selectedText
//             },
//             (response) => {

//                 if (chrome.runtime.lastError) {
//                     console.error(chrome.runtime.lastError)
//                     tooltip.innerText = "Extension Error ❌"
//                     return
//                 }

//                 if (!response || response.error) {
//                     tooltip.innerText = "Failed ❌"
//                     return
//                 }

//                 tooltip.innerText = `${response.score}% Match`

//                 // Optional: color based on score
//                 if (response.score >= 70) {
//                     tooltip.style.background = "green"
//                 } else if (response.score >= 40) {
//                     tooltip.style.background = "orange"
//                 } else {
//                     tooltip.style.background = "red"
//                 }
//             }
//         )
//     }

//     document.body.appendChild(tooltip)
// }



console.log("content.js loaded")

let tooltip

document.addEventListener("mouseup", () => {

  const selectedText = window.getSelection().toString().trim()



  if (selectedText.length > 50) {
    // ⭐ SAVE JD TEXT
    chrome.storage.local.set({
      selectedJD: selectedText
    })
    createTooltip(selectedText)
  }
})

function createTooltip(selectedText) {

  if (tooltip) tooltip.remove()

  tooltip = document.createElement("div")
  tooltip.innerText = "Check Score"

  tooltip.style.cssText = `
    height: 30px;
    width: 110px;
    border-radius: 15px;
    cursor: pointer;
    background: black;
    color: white;
    position: absolute;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
  `

  const selection = window.getSelection()
  const range = selection.getRangeAt(0)
  const rect = range.getBoundingClientRect()

  tooltip.style.top = `${rect.bottom + window.scrollY}px`
  tooltip.style.left = `${rect.left + window.scrollX}px`

  tooltip.onclick = () => {

    tooltip.innerText = "Analyzing..."

    chrome.runtime.sendMessage(
      {
        type: "CHECK_SCORE",
        jobDescription: selectedText
      },
      (response) => {

        if (!response || response.error) {
          tooltip.innerText = "Failed ❌"
          return
        }

        tooltip.innerText = `${response.score}% Match`
      }
    )
  }

  document.body.appendChild(tooltip)
}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  if (message.type === "GET_SELECTED_TEXT") {

    const selectedText = window.getSelection().toString().trim()

    sendResponse({ text: selectedText })
  }

})