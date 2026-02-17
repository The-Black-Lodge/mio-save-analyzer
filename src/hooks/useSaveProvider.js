import { useContext } from "react"
import { SaveContext } from "../components/SaveContext"

const useSaveProvider = () => {
  return useContext(SaveContext)
}

export default useSaveProvider
