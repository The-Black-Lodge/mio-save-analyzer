import useSaveProvider from "../hooks/useSaveProvider"
import TrinketSlots from "./TrinketSlots"

const Trinket = ({ label, acquired, equipped }) => {
  return (
    <div
      className={`card card--relative card--wide ${
        acquired ? "card--acquired" : "card--unacquired"
      }`}
    >
      <h4>{label}</h4>
      {equipped && (
        <span className="corner-badge corner-badge--centered">
          <i className="fa-solid fa-gears" />
        </span>
      )}
    </div>
  )
}

const Trinkets = () => {
  const { playerStats, localization } = useSaveProvider()

  const EXCLUDED_TRINKETS = ["EMBEDDING_BLADE", "SMALL_ENERGY_DRAIN", "TANGLES"]
  const allTrinkets = Object.fromEntries(
    Object.entries(localization?.ITEM_NAME_TRINKET ?? {}).filter(
      ([key]) => !EXCLUDED_TRINKETS.includes(key),
    ),
  )
  const acquiredTrinkets = playerStats?.trinkets ?? []
  const equippedTrinkets = playerStats?.equippedTrinkets ?? []

  return (
    <div className="section">
      <h3>
        Modifiers{" "}
        <span className="count">
          ({acquiredTrinkets.length}/{Object.keys(allTrinkets).length})
        </span>
      </h3>
      <p className="text-small legend">
        <i className="fa-solid fa-gears" /> = equipped
      </p>
      <div className="flex-grid">
        {Object.entries(allTrinkets).map(([key, value]) => (
          <Trinket
            key={key}
            label={value}
            acquired={acquiredTrinkets.includes(key)}
            equipped={equippedTrinkets.includes(key)}
          />
        ))}
      </div>
      <TrinketSlots />
    </div>
  )
}

export default Trinkets
