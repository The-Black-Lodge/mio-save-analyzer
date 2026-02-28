import { useState } from "react"
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
import TrinketSlots from "./components/TrinketSlots"
import Candles from "./components/Candles"
import ShieldFragments from "./components/ShieldFragments"
import Datapads from "./components/Datapads"
import Completion from "./components/Completion"
import Footer from "./components/Footer"
import ErrorBoundary from "./components/ErrorBoundary"
import Todo from "./components/Todo"
import SectionToggles from "./components/SectionToggles"
import { SECTIONS } from "./constants/sections"

function App() {
  const [active, setActive] = useState("all")

  const visible = Object.fromEntries(
    SECTIONS.map((s) => [s, active === "all" || active === s])
  )

  return (
    <SaveProvider>
      {import.meta.env.DEV && <Todo />}
      <ErrorBoundary>
        <div className="app-content">
          <h1>MIO: Memories in Orbit</h1>
          <h2>Save Analyzer</h2>
          <SectionToggles active={active} onSelect={setActive} />
          <SavePicker />
          {visible.stats && (
            <div className="stats-row">
              <SaveStats />
              <Unlocks />
              <Completion />
            </div>
          )}
          {visible.modifiers && <Trinkets />}
          {visible.bosses && <Bosses />}
          {visible.gates && <NetworkGates />}
          {visible.inventory && (
            <>
              <Datapads />
              <div className="cards-row">
                <ChestKey />
                <AttackPower />
                <TrinketSlots />
              </div>
              <div className="cards-row">
                <Candles />
                <ShieldFragments />
                <Carcasses />
              </div>
            </>
          )}
          <Footer />
        </div>
      </ErrorBoundary>
    </SaveProvider>
  )
}

export default App
