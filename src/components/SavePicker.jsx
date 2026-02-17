import useSaveProvider from "../hooks/useSaveProvider"

const SavePicker = () => {
  const { setCurrentSave } = useSaveProvider()

  return (
    <>
      <button onClick={() => setCurrentSave(0)}>Empty Save</button>
      <button onClick={() => setCurrentSave(1)}>My Save</button>
      <p>Save file is located in (update this later)</p>
    </>
  )
}

export default SavePicker
