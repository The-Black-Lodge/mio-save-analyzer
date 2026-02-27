import { useState } from "react"
import useSaveProvider from "../hooks/useSaveProvider"
import TrinketSlots from "./TrinketSlots"
import AllocationMatrix from "./AllocationMatrix"
import tabModifiersIcon from "../assets/tab-modifiers.png"

const iconModules = import.meta.glob("../assets/modifiers/*.png", { eager: true, import: "default" })
function getModifierIcon(filename) {
  return iconModules[`../assets/modifiers/${filename}.png`]
}

const MODIFIER_ICON_FILES = {
  ANALYZER: "analyser",
  MAINTENANCE_EXPERT: "maintenance-hack",
  SHIELD_INC: "protective-overlay",
  BIG_ENERGY_DRAIN: "energy-leecher",
  ENERGY_EMPTY_ATTACK: "foolish-ideal",
  DECOY: "afterimage",
  CARLO_HOOK: "glitch-trail",
  GLIDE_STATIC: "firefly",
  FAST_RECOVERY: "reduced-latency",
  MORE_SCRAPS: "effective-dismantlement",
  COUNTER_ATTACK: "counter-measures",
  HEAVY_ATTACK: "kinetic-thrust",
  GOO_REVENGE: "defense-mechanism",
  ORB_BLOCK: "splintering-dodge",
  VAMPIRE: "extra-coating-processor",
  HOOK_SLASH: "sharpened-hairpin",
  HUD: "self-awareness",
  LOOT_SUPER_SCRAPS: "portable-crystalliser",
  STAGGER_ATTACK: "high-voltage-discharge",
  BERSERKER: "the-hands-greed",
  LAST_CHANCE: "makeshift-recovery",
  ALEXANDERS_FATE: "alexanders-fate",
  PACIFIC: "asmas-will",
  HEAL_GROUND: "gratitude",
  KINETIC_CONVERSION: "pain-conversion",
  ORB_RECOVERY: "defragmentation",
  BETTER_DODGE: "enhanced-dodge",
  HOOK_BERSERKER: "wild-cat",
  SPIDER_BERSERKER: "black-widow",
  SCRAP_ATTACK: "nacre-overload",
  QUICK_RECHARGE: "the-hearts-favourite",
  FOUNTAIN_OVERLOAD: "high-risk-voucher",
  DOUBLE_DAMAGES: "perfect-state",
  GLIDE_BERSERKER: "bird-of-prey",
  TURBO_GLIDE: "sunsail",
  DRY_FOUNTAINS: "nacre-drought",
  KURO_CHARM: "imperfect-focus",
  LESS_SCRAPS: "resources-shortage",
  SHIELD_DEC: "thinner-frame",
  SLOW_ENERGY: "split-process",
  DAREDEVIL: "oath-to-ember",
  GLASS_CANNON: "defective-core",
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

const Trinket = ({ label, icon, description, cost, acquired, equipped, grid }) => {
  return (
    <div
      className={`card card--relative card--trinket ${grid ? "card--grid-trinket" : "card--wide"} ${
        acquired ? "card--acquired" : "card--unacquired"
      }`}
    >
      <p className="text-left text-small text-accent">
        {icon && <img src={icon} alt="" className="ability-icon" />} {label}
      </p>
      {description && (
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
  const [gridView, setGridView] = useState(true)
  const [showEquipped, setShowEquipped] = useState(false)
  const [showCost, setShowCost] = useState(false)
  const [showDescription, setShowDescription] = useState(false)

  const trinketData = collectibles?.trinkets ?? {}
  const acquiredTrinkets = playerStats?.trinkets ?? []
  const equippedTrinkets = playerStats?.equippedTrinkets ?? []

  const getLabel = (key) => trinketData[key]?.name ?? key
  const getCost = (key) => trinketData[key]?.cost ?? ""
  const getDescription = (key) => trinketData[key]?.description ?? ""
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

      {gridView ? (
        <>
          <div className="trinket-grid">
            {GRID_ORDER.map((key, i) => {
              if (key === null) {
                return (
                  <div
                    key={`gap-${i}`}
                    className="trinket-grid-gap"
                  />
                )
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
      ) : (
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

      <div className="trinket-bottom-row">
        <TrinketSlots />
        <AllocationMatrix />
      </div>
    </div>
  )
}

export default Trinkets
