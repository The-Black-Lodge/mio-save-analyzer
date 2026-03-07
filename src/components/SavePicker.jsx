import { useRef, useState } from "react"
import useSaveProvider from "../hooks/useSaveProvider"

const MAX_FILE_SIZE = 10 * 1024 * 1024

const SavePicker = () => {
  const { uploadSave } = useSaveProvider()
  const fileInputRef = useRef(null)
  const [error, setError] = useState(null)

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    setError(null)
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setError("File is too large (max 10 MB)")
      } else {
        uploadSave(file)
      }
    }
    e.target.value = ""
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type='file'
        accept='.save'
        className='hidden'
        onChange={handleFileChange}
      />
      <div className='upload-section'>
        <button
          onClick={handleUploadClick}
          className='upload-btn'
        >
          Upload Save
        </button>
        {error && <p className='text-small text-warning'>{error}</p>}
        <span
          className='save-path-tooltip'
          tabIndex={0}
        >
          Where is my save?
          <p className='save-path-tooltip-content'>
            Save files are usually stored in:
            <p>
              <i class='fa-brands fa-windows'></i>
              <i class='fa-brands fa-steam'></i> Windows/Steam:
              <br />
              C:\Users\(Username)\AppData\Local\MIO\Saves\Steam\(Steam64ID)\slot_(0-2).save
            </p>
            <hr className='divider' />
            <p>
              <i class='fa-brands fa-windows'></i>
              <i class='fa-brands fa-xbox'></i> Windows/Xbox Game Pass:
              <br />
              C:\Users\(Username)\AppData\Local\Packages\FocusHomeInteractiveSA.MioMemoriesInOrbit_(hash)/SystemAppData\wgs\(User
              ID)\(Save Slot Container Id)
            </p>
            <hr className='divider' />
            <p>
              <i class='fa-brands fa-steam'></i>Steam Deck:
              <br />
              ./.local/share/Steam/steamapps/compatdata/1672810/pfx/drive_c/users/steamuser/AppData/Local/MIO/Saves/Steam/(Steam64ID)/slot_(0-2).save
            </p>
          </p>
        </span>
      </div>
    </>
  )
}

export default SavePicker
