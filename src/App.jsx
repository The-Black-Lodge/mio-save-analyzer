import "./App.css"
import SaveProvider from "./components/SaveProvider"
import SavePicker from "./components/SavePicker"
import SaveStats from "./components/SaveStats"
import Trinkets from "./components/Trinkets"
import Unlocks from "./components/Unlocks"
import Carcasses from "./components/Carcasses"

function App() {
  return (
    <SaveProvider>
      <SavePicker />
      <SaveStats />
      <Unlocks />
      <Trinkets />
      <Carcasses />
    </SaveProvider>
  )
}

export default App
