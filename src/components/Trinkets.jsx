import { useState } from "react"
import useSaveProvider from "../hooks/useSaveProvider"
import TrinketSlots from "./TrinketSlots"

// Custom grid order. null = empty gap cell.
const GRID_ORDER = [
  // Row 1
  "ANALYZER",
  "MAINTENANCE_EXPERT",
  "SHIELD_INC",
  "BIG_ENERGY_DRAIN",
  "ENERGY_EMPTY_ATTACK",
  "DECOY",
  "CARLO_HOOK",
  "GLIDE_STATIC",
  // Row 2
  "FAST_RECOVERY",
  "MORE_SCRAPS",
  "COUNTER_ATTACK",
  "HEAVY_ATTACK",
  "GOO_REVENGE",
  "ORB_BLOCK",
  "VAMPIRE",
  "HOOK_SLASH",
  // Row 3
  "HUD",
  "LOOT_SUPER_SCRAPS",
  "STAGGER_ATTACK",
  "BERSERKER",
  "LAST_CHANCE",
  "ALEXANDERS_FATE",
  "PACIFIC",
  "HEAL_GROUND",
  // Row 4
  "KINETIC_CONVERSION",
  "ORB_RECOVERY",
  "BETTER_DODGE",
  "HOOK_BERSERKER",
  "SPIDER_BERSERKER",
  "SCRAP_ATTACK",
  null,
  null,
  // Row 5
  null,
  "QUICK_RECHARGE",
  "FOUNTAIN_OVERLOAD",
  "DOUBLE_DAMAGES",
  "GLIDE_BERSERKER",
  "TURBO_GLIDE",
  null,
  null,
]

// Bottom row — 7 items, spread evenly with a flex row
const BOTTOM_ROW = [
  "DRY_FOUNTAINS",
  "KURO_CHARM",
  "LESS_SCRAPS",
  "SHIELD_DEC",
  "SLOW_ENERGY",
  "DAREDEVIL",
  "GLASS_CANNON",
]

const Trinket = ({ label, cost, acquired, equipped, grid }) => {
  return (
    <div
      className={`card card--relative card--trinket ${grid ? "card--grid-trinket" : "card--wide"} ${
        acquired ? "card--acquired" : "card--unacquired"
      }`}
    >
      <p className="text-small text-accent">{label}</p>
      {cost && <span className="corner-badge corner-badge--left">{cost} <i className="fa-solid fa-diamond" /></span>}
      {equipped && (
        <span className="corner-badge">
          <i className="fa-solid fa-gears" />
        </span>
      )}
    </div>
  )
}

const EXCLUDED_TRINKETS = ["EMBEDDING_BLADE", "SMALL_ENERGY_DRAIN", "TANGLES"]

const Trinkets = () => {
  const { playerStats, collectibles } = useSaveProvider()
  const [gridView, setGridView] = useState(true)
  const [showEquipped, setShowEquipped] = useState(false)
  const [showCost, setShowCost] = useState(false)

  const trinketData = collectibles?.trinkets ?? {}
  const acquiredTrinkets = playerStats?.trinkets ?? []
  const equippedTrinkets = playerStats?.equippedTrinkets ?? []

  const getLabel = (key) => trinketData[key]?.name ?? key
  const getCost = (key) => trinketData[key]?.cost ?? ""

  const sortedTrinkets = Object.entries(trinketData).sort(([, a], [, b]) =>
    (a.name ?? "").localeCompare(b.name ?? ""),
  )

  return (
    <div className="section">
      <h3>
        Modifiers{" "}
        <span className="count">
          ({acquiredTrinkets.length}/{Object.keys(trinketData).length})
        </span>
      </h3>
      <div className="trinkets-controls">
        <button
          className={`view-toggle-btn ${gridView ? "view-toggle-btn--active" : ""}`}
          onClick={() => setGridView(true)}
        >
          <i className="fa-solid fa-grip" /> Grid
        </button>
        <button
          className={`view-toggle-btn ${!gridView ? "view-toggle-btn--active" : ""}`}
          onClick={() => setGridView(false)}
        >
          <i className="fa-solid fa-list" /> Alphabetical
        </button>
        <button
          className={`view-toggle-btn ${showCost ? "view-toggle-btn--active" : ""}`}
          onClick={() => setShowCost((v) => !v)}
        >
          <i className="fa-solid fa-diamond" /> Cost
        </button>
        <button
          className={`view-toggle-btn ${showEquipped ? "view-toggle-btn--active" : ""}`}
          onClick={() => setShowEquipped((v) => !v)}
        >
          <i className="fa-solid fa-gears" /> Equipped
        </button>
      </div>

      {gridView ? (
        <>
          <div className="trinket-grid">
            {GRID_ORDER.map((key, i) => {
              if (key === null) {
                return <div key={`gap-${i}`} className="trinket-grid-gap" />
              }
              return (
                <Trinket
                  key={key}
                  label={getLabel(key)}
                  cost={showCost ? getCost(key) : ""}
                  acquired={acquiredTrinkets.includes(key)}
                  equipped={showEquipped && equippedTrinkets.includes(key)}
                  grid
                />
              )
            })}
          </div>
          <div className="trinket-grid-bottom">
            {BOTTOM_ROW.map((key) => (
              <Trinket
                key={key}
                label={getLabel(key)}
                cost={showCost ? getCost(key) : ""}
                acquired={acquiredTrinkets.includes(key)}
                equipped={showEquipped && equippedTrinkets.includes(key)}
                grid
              />
            ))}
          </div>
        </>
      ) : (
        <div className="flex-grid">
          {sortedTrinkets.map(([key, info]) => (
            <Trinket
              key={key}
              label={info.name ?? key}
              cost={showCost ? (info.cost ?? "") : ""}
              acquired={acquiredTrinkets.includes(key)}
              equipped={showEquipped && equippedTrinkets.includes(key)}
            />
          ))}
        </div>
      )}

      <TrinketSlots />
    </div>
  )
}

export default Trinkets
