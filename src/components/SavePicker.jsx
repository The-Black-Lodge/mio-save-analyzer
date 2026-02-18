import { useRef } from "react"
import useSaveProvider from "../hooks/useSaveProvider"

const SavePicker = () => {
  const { setCurrentSave, uploadSave } = useSaveProvider()
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
      <button onClick={() => setCurrentSave(0)}>Empty Save</button>
      <button onClick={() => setCurrentSave(1)}>My Save</button>
      <button onClick={() => setCurrentSave(2)}>100%ish</button>
      <button onClick={() => setCurrentSave(3)}>Luna</button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".save"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <button onClick={handleUploadClick}>Upload Save</button>
      <p>Save file is located in (update this later)</p>
    </>
  )
}

export default SavePicker
