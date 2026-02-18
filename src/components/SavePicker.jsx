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
      <input
        ref={fileInputRef}
        type="file"
        accept=".save"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <button
        onClick={handleUploadClick}
        style={{ position: "absolute", top: "1rem", right: "1rem" }}
      >
        Upload Save
      </button>
    </div>
  )
}

export default SavePicker
