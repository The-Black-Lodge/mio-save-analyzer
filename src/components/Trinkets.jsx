import useSaveProvider from "../hooks/useSaveProvider"

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
            bottom: "0.25rem",
            right: "0.25rem",
            color: "#ffc",
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
  const slotUpgradesCount = playerStats?.trinketSlotUpgradesCount ?? 0
  const slotUpgradesAcquired = playerStats?.trinketSlotUpgradesAcquired ?? []
  const SLOT_INDICES = [0, 1, 2, 3, 4, 5, 6]

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
      <p style={{ margin: "0.5rem 0 0.25rem 0" }}>
        {slotUpgradesCount}/7 slot upgrades found
      </p>
      <p style={{ fontSize: "0.9em", margin: "0.25rem 0" }}>
        Slots:{" "}
        {SLOT_INDICES.map((i) =>
          slotUpgradesAcquired.includes(i) ? "✅" : "❌",
        ).join(" ")}{" "}
        <span style={{ color: "#666" }}>(0–6)</span>
      </p>
    </div>
  )
}

export default Trinkets
