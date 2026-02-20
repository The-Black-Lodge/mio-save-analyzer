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
      <div className="upload-section">
        <button
          onClick={handleUploadClick}
          className="upload-btn"
        >
          Upload Save
        </button>
        <span
          className="save-path-tooltip"
          tabIndex={0}
        >
          Where is my save?
          <p className="save-path-tooltip-content">
            Save files are usually stored in
            <br />
            C:\Users\(Username)\AppData\Local\MIO\Saves\Steam\(Steam64ID)\slot_(0-2).save
          </p>
        </span>
      </div>
    </>
  )
}

export default SavePicker
