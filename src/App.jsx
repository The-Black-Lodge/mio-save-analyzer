import "./App.css"
import SaveProvider from "./components/SaveProvider"
import SavePicker from "./components/SavePicker"
import SaveStats from "./components/SaveStats"
import Trinkets from "./components/Trinkets"
import Unlocks from "./components/Unlocks"
import Carcasses from "./components/Carcasses"
import Bosses from "./components/Bosses"
import NetworkGates from "./components/NetworkGates"
import AttackPower from "./components/AttackPower"
import ChestKey from "./components/ChestKey"
import Candles from "./components/Candles"
import ShieldFragments from "./components/ShieldFragments"
import Datapads from "./components/Datapads"
import Completion from "./components/Completion"
import Footer from "./components/Footer"
import ErrorBoundary from "./components/ErrorBoundary"
import Todo from "./components/Todo"

function App() {
  return (
    <SaveProvider>
      {import.meta.env.DEV && <Todo />}
      <ErrorBoundary>
        <div className="app-content">
          <h1>MIO: Memories in Orbit</h1>
          <h2>Save Analyzer</h2>
          <SavePicker />
          <SaveStats />
          <Completion />
          <Unlocks />
          <Trinkets />
          <Bosses />
          <NetworkGates />
          <Datapads />
          <div className="cards-row">
            <ChestKey />
            <AttackPower />
          </div>
          <div className="cards-row">
            <Candles />
            <ShieldFragments />
            <Carcasses />
          </div>
          <Footer />
        </div>
      </ErrorBoundary>
    </SaveProvider>
  )
}

export default App
