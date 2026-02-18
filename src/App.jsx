import "./App.css"
import SaveProvider from "./components/SaveProvider"
import SavePicker from "./components/SavePicker"
import SaveStats from "./components/SaveStats"
import Trinkets from "./components/Trinkets"
import Unlocks from "./components/Unlocks"

function App() {
  return (
    <SaveProvider>
      <SavePicker />
      <SaveStats />
      <Trinkets />
      <Unlocks />
    </SaveProvider>
  )
}

export default App
