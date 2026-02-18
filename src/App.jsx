import "./App.css"
import SaveProvider from "./components/SaveProvider"
import SavePicker from "./components/SavePicker"
import SaveStats from "./components/SaveStats"
import Trinkets from "./components/Trinkets"
import Unlocks from "./components/Unlocks"
import Carcasses from "./components/Carcasses"
import Bosses from "./components/Bosses"
import Candles from "./components/Candles"

function App() {
  return (
    <SaveProvider>
      <SavePicker />
      <SaveStats />
      <Unlocks />
      <Bosses />
      <Trinkets />
      <Candles />
      <Carcasses />
    </SaveProvider>
  )
}

export default App
