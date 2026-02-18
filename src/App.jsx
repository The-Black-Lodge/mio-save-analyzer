import "./App.css"
import SaveProvider from "./components/SaveProvider"
import SavePicker from "./components/SavePicker"
import SaveStats from "./components/SaveStats"
import Trinkets from "./components/Trinkets"

function App() {
  return (
    <SaveProvider>
      <SavePicker />
      <SaveStats />
      <Trinkets />
    </SaveProvider>
  )
}

export default App
