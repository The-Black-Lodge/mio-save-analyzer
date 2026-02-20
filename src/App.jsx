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
import Footer from "./components/Footer"
import Todo from "./components/Todo"

function App() {
  return (
    <SaveProvider>
      <Todo />
      <div className="app-content">
        <h1>MIO: Memories in Orbit</h1>
        <h2>Save Analyzer</h2>
        <SavePicker />
        <SaveStats />
        <Unlocks />
        <Trinkets />
        <Bosses />
        <div className="cards-row">
          <Candles />
          <ShieldFragments />
          <Carcasses />
        </div>
        <Footer />
      </div>
    </SaveProvider>
  )
}

export default App
