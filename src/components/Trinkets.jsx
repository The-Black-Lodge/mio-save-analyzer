import useSaveProvider from "../hooks/useSaveProvider"
import TrinketSlots from "./TrinketSlots"

const Trinket = ({ label, acquired, equipped }) => {
  return (
    <div
      style={{
        position: "relative",
        border: acquired ? "1px solid #ffc" : "1px solid #666",
        padding: "0.5rem",
        borderRadius: "0.5rem",
        textAlign: "center",
        minWidth: "14rem",
      }}
    >
      <h4>{label}</h4>
      {equipped && (
        <span
          style={{
            position: "absolute",
            top: "50%",
            right: "0.25rem",
            transform: "translateY(-50%)",
            color: "#ffc",
            fontSize: "0.8rem",
          }}
        >
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
    <div style={{ padding: "1rem" }}>
      <h3>
        Modifiers{" "}
        <span style={{ color: "white" }}>
          ({acquiredTrinkets.length}/{Object.keys(allTrinkets).length})
        </span>
      </h3>
      <p
        style={{
          margin: "0 0 0.25rem",
          textAlign: "center",
          fontSize: "0.8rem",
        }}
      >
        <i
          className="fa-solid fa-gears"
          style={{ color: "#ffc" }}
        />{" "}
        = equipped
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          justifyContent: "center",
        }}
      >
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
