import { useState } from "react"
import useSaveProvider from "../hooks/useSaveProvider"
import TrinketSlots from "./TrinketSlots"
import AllocationMatrix from "./AllocationMatrix"
import tabModifiersIcon from "../assets/tab_trinkets.png"

const iconModules = import.meta.glob("../assets/TRINKET_*.png", { eager: true, import: "default" })
function getModifierIcon(filename) {
  return iconModules[`../assets/${filename}.png`]
}

const MODIFIER_ICON_FILES = {
  ANALYZER: "TRINKET_ANALYZER",
  MAINTENANCE_EXPERT: "TRINKET_MAINTENANCE_EXPERT",
  SHIELD_INC: "TRINKET_SHIELD_INC",
  BIG_ENERGY_DRAIN: "TRINKET_BIG_ENERGY_DRAIN",
  ENERGY_EMPTY_ATTACK: "TRINKET_ENERGY_EMPTY_ATTACK",
  DECOY: "TRINKET_DECOY",
  CARLO_HOOK: "TRINKET_CARLO_HOOK",
  GLIDE_STATIC: "TRINKET_GLIDE_STATIC",
  FAST_RECOVERY: "TRINKET_FAST_RECOVERY",
  MORE_SCRAPS: "TRINKET_MORE_SCRAPS",
  COUNTER_ATTACK: "TRINKET_COUNTER_ATTACK",
  HEAVY_ATTACK: "TRINKET_HEAVY_ATTACK",
  GOO_REVENGE: "TRINKET_GOO_REVENGE",
  ORB_BLOCK: "TRINKET_ORB_BLOCK",
  VAMPIRE: "TRINKET_VAMPIRE",
  HOOK_SLASH: "TRINKET_HOOK_SLASH",
  HUD: "TRINKET_HUD",
  LOOT_SUPER_SCRAPS: "TRINKET_LOOT_SUPER_SCRAPS",
  STAGGER_ATTACK: "TRINKET_STAGGER_ATTACK",
  BERSERKER: "TRINKET_BERSERKER",
  LAST_CHANCE: "TRINKET_LAST_CHANCE",
  ALEXANDERS_FATE: "TRINKET_ALEXANDERS_FATE",
  PACIFIC: "TRINKET_PACIFIC",
  HEAL_GROUND: "TRINKET_HEAL_GROUND",
  KINETIC_CONVERSION: "TRINKET_KINETIC_CONVERSION",
  ORB_RECOVERY: "TRINKET_ORB_RECOVERY",
  BETTER_DODGE: "TRINKET_BETTER_DODGE",
  HOOK_BERSERKER: "TRINKET_HOOK_BERSERKER",
  SPIDER_BERSERKER: "TRINKET_SPIDER_BERSERKER",
  SCRAP_ATTACK: "TRINKET_SCRAP_ATTACK",
  QUICK_RECHARGE: "TRINKET_QUICK_RECHARGE",
  FOUNTAIN_OVERLOAD: "TRINKET_FOUNTAIN_OVERLOAD",
  DOUBLE_DAMAGES: "TRINKET_DOUBLE_DAMAGES",
  GLIDE_BERSERKER: "TRINKET_GLIDE_BERSERKER",
  TURBO_GLIDE: "TRINKET_TURBO_GLIDE",
  DRY_FOUNTAINS: "TRINKET_DRY_FOUNTAINS",
  KURO_CHARM: "TRINKET_KURO_CHARM",
  LESS_SCRAPS: "TRINKET_LESS_SCRAPS",
  SHIELD_DEC: "TRINKET_SHIELD_DEC",
  SLOW_ENERGY: "TRINKET_SLOW_ENERGY",
  DAREDEVIL: "TRINKET_DAREDEVIL",
  GLASS_CANNON: "TRINKET_GLASS_CANNON",
}

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

const Trinket = ({ label, icon, description, cost, acquired, equipped, grid, iconOnly, onMouseEnter, onMouseLeave }) => {
  return (
    <div
      className={`card card--relative card--trinket ${grid ? "card--grid-trinket" : "card--wide"} ${
        acquired ? "card--acquired" : "card--unacquired"
      } ${iconOnly ? "card--trinket-icon-only" : ""}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {iconOnly ? (
        icon && <img src={icon} alt={label} className="trinket-icon-only-img" />
      ) : (
        <p className="text-left text-small text-accent">
          {icon && <img src={icon} alt="" className="ability-icon" />} {label}
        </p>
      )}
      {!iconOnly && description && (
        <p className="text-left text-extra-small">{description}</p>
      )}
      {cost && (
        <span className="corner-badge corner-badge--left">
          {cost} <img src={tabModifiersIcon} alt="" className="cost-icon" />
        </span>
      )}
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
  const [view, setView] = useState("grid")
  const [showEquipped, setShowEquipped] = useState(false)
  const [showCost, setShowCost] = useState(false)
  const [showDescription, setShowDescription] = useState(false)
  const [hovered, setHovered] = useState(null)

  const trinketData = collectibles?.trinkets ?? {}
  const acquiredTrinkets = playerStats?.trinkets ?? []
  const equippedTrinkets = playerStats?.equippedTrinkets ?? []

  const getLabel = (key) => trinketData[key]?.name ?? key
  const getCost = (key) => trinketData[key]?.cost ?? ""
  const getDescription = (key) => trinketData[key]?.description ?? ""
  const getFlavor = (key) => trinketData[key]?.flavor ?? ""
  const getIcon = (key) => getModifierIcon(MODIFIER_ICON_FILES[key])

  const sortedTrinkets = Object.entries(trinketData).sort(([, a], [, b]) =>
    (a.name ?? "").localeCompare(b.name ?? ""),
  )

  return (
    <div className="section">
      <h3>
        <img src={tabModifiersIcon} alt="" className="header-icon" />{" "}
        Modifiers{" "}
        <span className="count">
          ({acquiredTrinkets.length}/{Object.keys(trinketData).length})
        </span>
      </h3>
      <div className="trinkets-controls">
        <button
          className={`view-toggle-btn ${view === "grid" ? "view-toggle-btn--active" : ""}`}
          onClick={() => setView("grid")}
        >
          <i className="fa-solid fa-grip" /> Grid
        </button>
        <button
          className={`view-toggle-btn ${view === "alpha" ? "view-toggle-btn--active" : ""}`}
          onClick={() => setView("alpha")}
        >
          <i className="fa-solid fa-list" /> Alphabetical
        </button>
        {import.meta.env.DEV && (
          <button
            className={`view-toggle-btn ${view === "icon" ? "view-toggle-btn--active" : ""}`}
            onClick={() => setView("icon")}
          >
            <i className="fa-solid fa-icons" /> Icon
          </button>
        )}
        <button
          className={`view-toggle-btn ${showDescription ? "view-toggle-btn--active" : ""}`}
          onClick={() => setShowDescription((v) => !v)}
        >
          <i className="fa-solid fa-circle-info" /> Description
        </button>
        <button
          className={`view-toggle-btn ${showCost ? "view-toggle-btn--active" : ""}`}
          onClick={() => setShowCost((v) => !v)}
        >
          <img src={tabModifiersIcon} alt="" className="cost-icon" /> Cost
        </button>
        <button
          className={`view-toggle-btn ${showEquipped ? "view-toggle-btn--active" : ""}`}
          onClick={() => setShowEquipped((v) => !v)}
        >
          <i className="fa-solid fa-gears" /> Equipped
        </button>
      </div>

      {view === "grid" && (
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
                  icon={getIcon(key)}
                  description={showDescription ? getDescription(key) : ""}
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
                icon={getIcon(key)}
                description={showDescription ? getDescription(key) : ""}
                cost={showCost ? getCost(key) : ""}
                acquired={acquiredTrinkets.includes(key)}
                equipped={showEquipped && equippedTrinkets.includes(key)}
                grid
              />
            ))}
          </div>
        </>
      )}

      {view === "alpha" && (
        <div className="flex-grid">
          {sortedTrinkets.map(([key, info]) => (
            <Trinket
              key={key}
              label={info.name ?? key}
              icon={getIcon(key)}
              description={showDescription ? (info.description ?? "") : ""}
              cost={showCost ? (info.cost ?? "") : ""}
              acquired={acquiredTrinkets.includes(key)}
              equipped={showEquipped && equippedTrinkets.includes(key)}
            />
          ))}
        </div>
      )}

      {import.meta.env.DEV && view === "icon" && (
        <div className="trinket-icon-view">
          <div className="trinket-icon-detail">
            {hovered ? (
              <>
                <div className="trinket-icon-detail-header">
                  <span className="text-small text-accent">{getLabel(hovered)}</span>
                  {getCost(hovered) && (
                    <span className="text-extra-small trinket-icon-detail-cost">
                      {getCost(hovered)}{" "}
                      <img src={tabModifiersIcon} alt="" className="cost-icon" />
                    </span>
                  )}
                </div>
                {getIcon(hovered) && (
                  <img src={getIcon(hovered)} alt="" className="trinket-icon-detail-img" />
                )}
                {getDescription(hovered) && (
                  <p className="text-extra-small">{getDescription(hovered)}</p>
                )}
                {getFlavor(hovered) && (
                  <p className="text-extra-small text-dim">{getFlavor(hovered)}</p>
                )}
              </>
            ) : (
              <p className="text-extra-small text-dim">Hover an icon</p>
            )}
          </div>
          <div className="trinket-icon-grids">
            <div className="trinket-grid">
              {GRID_ORDER.map((key, i) => {
                if (key === null) {
                  return <div key={`gap-${i}`} className="trinket-grid-gap" />
                }
                return (
                  <Trinket
                    key={key}
                    label={getLabel(key)}
                    icon={getIcon(key)}
                    cost={showCost ? getCost(key) : ""}
                    acquired={acquiredTrinkets.includes(key)}
                    equipped={showEquipped && equippedTrinkets.includes(key)}
                    grid
                    iconOnly
                    onMouseEnter={() => setHovered(key)}
                    onMouseLeave={() => setHovered(null)}
                  />
                )
              })}
            </div>
            <div className="trinket-grid-bottom">
              {BOTTOM_ROW.map((key) => (
                <Trinket
                  key={key}
                  label={getLabel(key)}
                  icon={getIcon(key)}
                  cost={showCost ? getCost(key) : ""}
                  acquired={acquiredTrinkets.includes(key)}
                  equipped={showEquipped && equippedTrinkets.includes(key)}
                  grid
                  iconOnly
                  onMouseEnter={() => setHovered(key)}
                  onMouseLeave={() => setHovered(null)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="trinket-bottom-row">
        <TrinketSlots />
        <AllocationMatrix />
      </div>
    </div>
  )
}

export default Trinkets
