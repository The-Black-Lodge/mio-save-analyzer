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

const Trinket = ({ label, acquired, equipped, grid }) => {
  return (
    <div
      className={`card card--relative card--trinket ${grid ? "card--grid-trinket" : "card--wide"} ${
        acquired ? "card--acquired" : "card--unacquired"
      }`}
    >
      <p className="text-small text-accent">{label}</p>
      {equipped && (
        <span className="corner-badge">
          <i className="fa-solid fa-gears" />
        </span>
      )}
    </div>
  )
}

const Trinkets = () => {
  const { playerStats, localization } = useSaveProvider()
  const [gridView, setGridView] = useState(true)

  const EXCLUDED_TRINKETS = ["EMBEDDING_BLADE", "SMALL_ENERGY_DRAIN", "TANGLES"]
  const allTrinkets = Object.fromEntries(
    Object.entries(localization?.ITEM_NAME_TRINKET ?? {}).filter(
      ([key]) => !EXCLUDED_TRINKETS.includes(key),
    ),
  )
  const acquiredTrinkets = playerStats?.trinkets ?? []
  const equippedTrinkets = playerStats?.equippedTrinkets ?? []

  const getLabel = (key) => allTrinkets[key] ?? key

  const sortedTrinkets = Object.entries(allTrinkets).sort(([, a], [, b]) =>
    a.localeCompare(b),
  )

  return (
    <div className="section">
      <h3>
        Modifiers{" "}
        <span className="count">
          ({acquiredTrinkets.length}/{Object.keys(allTrinkets).length})
        </span>
      </h3>
      <div className="trinkets-controls">
        <div className="trinkets-view-toggle">
          <button
            className={`view-toggle-btn ${gridView ? "view-toggle-btn--active" : ""}`}
            onClick={() => setGridView(true)}
            title="Grid view"
          >
            <i className="fa-solid fa-grip" />
          </button>
          <button
            className={`view-toggle-btn ${!gridView ? "view-toggle-btn--active" : ""}`}
            onClick={() => setGridView(false)}
            title="List view"
          >
            <i className="fa-solid fa-list" />
          </button>
        </div>
        <p className="text-small legend legend--inline">
          <i className="fa-solid fa-gears" /> = equipped
        </p>
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
                  acquired={acquiredTrinkets.includes(key)}
                  equipped={equippedTrinkets.includes(key)}
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
                acquired={acquiredTrinkets.includes(key)}
                equipped={equippedTrinkets.includes(key)}
                grid
              />
            ))}
          </div>
        </>
      ) : (
        <div className="flex-grid">
          {sortedTrinkets.map(([key, value]) => (
            <Trinket
              key={key}
              label={value}
              acquired={acquiredTrinkets.includes(key)}
              equipped={equippedTrinkets.includes(key)}
            />
          ))}
        </div>
      )}

      <TrinketSlots />
    </div>
  )
}

export default Trinkets
