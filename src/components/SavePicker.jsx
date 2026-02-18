import { useRef } from "react"
import useSaveProvider from "../hooks/useSaveProvider"

const SavePicker = () => {
  const { uploadSave } = useSaveProvider()
  const fileInputRef = useRef(null)

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) uploadSave(file)
    e.target.value = ""
  }

  return (
    <div>
      <h1>MIO: Memories in Orbit</h1>
      <h2>Save Analyzer</h2>
      <p>STILL IN PROGRESS!</p>
      {/* <button onClick={() => setCurrentSave(0)}>Empty Save</button>
      <button onClick={() => setCurrentSave(1)}>My Save</button>
      <button onClick={() => setCurrentSave(2)}>100%ish</button>
      <button onClick={() => setCurrentSave(3)}>Luna</button> */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".save"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <button onClick={handleUploadClick}>Upload Save</button>
    </div>
  )
}

export default SavePicker
