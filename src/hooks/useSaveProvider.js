import { useContext } from "react"
import { SaveContext } from "../components/SaveContext"

const useSaveProvider = () => {
  const ctx = useContext(SaveContext)
  if (!ctx) {
    throw new Error("useSaveProvider must be used within a SaveProvider")
  }
  return ctx
}

export default useSaveProvider
