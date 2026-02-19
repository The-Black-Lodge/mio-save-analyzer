import useSaveProvider from "../hooks/useSaveProvider"

const SLOT_INDICES = [0, 1, 2, 3, 4, 5, 6]

const SlotCard = ({ label, acquired, url }) => {
  return (
    <div
      style={{
        border: acquired ? "1px solid #ffc" : "1px solid #666",
        padding: "0.5rem",
        borderRadius: "0.5rem",
        textAlign: "center",
      }}
    >
      <h4>{label}</h4>
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          🔗
        </a>
      ) : null}
    </div>
  )
}

const TrinketSlots = () => {
  const { playerStats, collectibles } = useSaveProvider()
  const slotUpgradesAcquired = playerStats?.trinketSlotUpgradesAcquired ?? []
  const trinketSlots = collectibles?.trinket_slots ?? {}

  return (
    <div style={{ padding: "1rem 0 0 0" }}>
      <h3>
        Modifier Slot Upgrades{" "}
        <span style={{ color: "white" }}>
          ({slotUpgradesAcquired.length}/7)
        </span>
      </h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          justifyContent: "center",
        }}
      >
        {SLOT_INDICES.map((i) => {
          const info = trinketSlots[String(i)] ?? {}
          const description = info.description ?? `Slot ${i}`
          const url = info.url ?? ""
          const acquired = slotUpgradesAcquired.includes(i)
          return (
            <SlotCard
              key={i}
              label={description}
              acquired={acquired}
              url={url}
            />
          )
        })}
      </div>
    </div>
  )
}

export default TrinketSlots
