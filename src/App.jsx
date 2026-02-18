import "./App.css"
import SaveProvider from "./components/SaveProvider"
import SavePicker from "./components/SavePicker"
import SaveStats from "./components/SaveStats"
import Trinkets from "./components/Trinkets"
import Unlocks from "./components/Unlocks"
import Carcasses from "./components/Carcasses"
import Bosses from "./components/Bosses"
import Candles from "./components/Candles"
import ShieldFragments from "./components/ShieldFragments"

function App() {
  return (
    <SaveProvider>
      <div className="app-content">
        <SavePicker />
        <SaveStats />
        <Unlocks />
        <Bosses />
        <Trinkets />
        <Candles />
        <ShieldFragments />
        <Carcasses />
      </div>
    </SaveProvider>
  )
}

export default App
