import useSaveProvider from "../hooks/useSaveProvider"

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
    <div style={{ display: "inline-block" }}>
      <h3>
        Trinkets ({acquiredTrinkets.length}/{Object.keys(allTrinkets).length})
      </h3>
      <p>{slotUpgradesCount}/7 slot upgrades found</p>
      <p style={{ fontSize: "0.9em", margin: "0.25rem 0" }}>
        Slots:{" "}
        {SLOT_INDICES.map((i) =>
          slotUpgradesAcquired.includes(i) ? "✅" : "❌",
        ).join(" ")}{" "}
        <span style={{ color: "#666" }}>(0–6)</span>
      </p>
      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem 1rem",
          listStyle: "none",
          padding: 0,
          margin: 0,
        }}
      >
        {Object.entries(allTrinkets).map(([key, value]) => (
          <li
            key={key}
            style={{
              display: "inline-block",
              padding: "0.5rem",
              width: "13rem",
              border: "1px solid #444",
              borderRadius: "0.5rem",
            }}
          >
            {acquiredTrinkets.includes(key) ? "✅" : "❌"} {value}
            {equippedTrinkets.includes(key) ? " ✨" : ""}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Trinkets
