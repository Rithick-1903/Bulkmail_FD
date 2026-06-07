import { useState } from "react"
import axios from "axios";
import * as XLSX from "xlsx"
import History from './History'

function App() {

  const [msg, sentmsg] = useState("")
  const [status, setstatus] = useState(false)
  const [emaillist, setemaillist] = useState([])
  const [subject, setSubject] = useState("")


  function handlechange(event) {
    sentmsg(event.target.value)
  }
  



  function add() {
    setstatus(true)
    axios.post("https://bulkmail-bd.onrender.com/sendmail", {
    subject: subject,
    msg: msg,
    emaillist: emaillist
})
      .then(function (data) {
        if (subject === "") {
          alert("Enter Subject")
          setstatus(false)
          return
        }

        if (msg === "") {
          alert("Enter Message")
          setstatus(false)
          return
        }

        if (emaillist.length === 0) {
          alert("Upload Excel File")
          setstatus(false)
          return
        }
        if (data.data === true) {

          alert("Email has been sent")
          setstatus(false)
          
        }
        else {
          alert("Failed")
          setstatus(false)
        }
      })
  }

  function handlefile(event) {
    const file = event.target.files[0]

    const reader = new FileReader()

    reader.onload = function (event) {
      const data = event.target.result
      const workbook = XLSX.read(data, { type: 'binary' })

      const sheetname = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetname]
      const emaillist = XLSX.utils.sheet_to_json(worksheet, { header: "A" })
      const totalemaillist = emaillist.map(function (item) { return item.A })
      setemaillist(totalemaillist)
    }

    reader.readAsBinaryString(file);
  }


  return (
    <div>
      <div className="bg-blue-950 text-white p-3 text-center text-2xl" >BulkMail</div>
      <h1 className="bg-blue-700 text-white p-3 text-center " >We help your business with sending multiple emails at once</h1>
      <h1 className="bg-blue-500 text-white p-3 text-center " > Drang and Drop</h1>

      <div className="bg-blue-300 flex flex-col items-center text-black px-5 py-3 ">
        <textarea onChange={handlechange} value={msg} className="w-[80%] h-32 px-5 py-3 outline-none border border-black rounded-md" placeholder="Enter your message "></textarea>
        <input className="m-3 border-black rounded-md px-5 py-3 w-[50%]"
          type="text"
          placeholder="Enter Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <div>
          <input onChange={handlefile} type="file" className="border-4 border-dashed px-3 py-3 mt-4 mb-4"></input>

        </div>
        <p>Total Emails in the file :{emaillist.length}</p>
        <button onClick={add} className="bg-blue-950 px-2 py-1 mt-2 text-white rounded-md">{status ? "Sending..." : "Send"}</button>
      </div>
      <div className="bg-blue-700 text-white p-20 text-center " ></div>
      <div className="bg-blue-300 flex flex-col items-center text-black p-12"></div>
<History/>
    </div>

  )
}
export default App
