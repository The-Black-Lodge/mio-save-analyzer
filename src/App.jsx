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
  const [visible, setVisible] = useState(
    Object.fromEntries(SECTIONS.map((s) => [s, true]))
  )

  const toggle = (key) =>
    setVisible((v) => ({ ...v, [key]: !v[key] }))

  const toggleAll = () => {
    const allOn = SECTIONS.every((s) => visible[s])
    setVisible(Object.fromEntries(SECTIONS.map((s) => [s, !allOn])))
  }

  return (
    <SaveProvider>
      {import.meta.env.DEV && <Todo />}
      <ErrorBoundary>
        <div className="app-content">
          <h1>MIO: Memories in Orbit</h1>
          <h2>Save Analyzer</h2>
          <SectionToggles visible={visible} onToggle={toggle} onToggleAll={toggleAll} />
          <SavePicker />
          {visible.stats && (
            <>
              <SaveStats />
              <Completion />
              <Unlocks />
            </>
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
