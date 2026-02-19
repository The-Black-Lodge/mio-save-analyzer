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
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".save"
        className="hidden"
        onChange={handleFileChange}
      />
      <button onClick={handleUploadClick} className="upload-btn">
        Upload Save
      </button>
    </>
  )
}

export default SavePicker
