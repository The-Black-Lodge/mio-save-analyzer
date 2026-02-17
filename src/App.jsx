import "./App.css"
import SaveProvider from "./components/SaveProvider"
import SavePicker from "./components/SavePicker"
import SaveStats from "./components/SaveStats"

function App() {
  return (
    <SaveProvider>
      <SavePicker />
      <SaveStats />
    </SaveProvider>
  )
}

export default App
