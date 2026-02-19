import useSaveProvider from "../hooks/useSaveProvider"

const SLOT_INDICES = [0, 1, 2, 3, 4, 5, 6]

const TrinketSlots = () => {
  const { playerStats } = useSaveProvider()
  const slotUpgradesCount = playerStats?.trinketSlotUpgradesCount ?? 0
  const slotUpgradesAcquired = playerStats?.trinketSlotUpgradesAcquired ?? []

  return (
    <>
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
    </>
  )
}

export default TrinketSlots
