import useSaveProvider from "../hooks/useSaveProvider"

const SLOT_INDICES = [0, 1, 2, 3, 4, 5, 6]

const SlotCard = ({ label, acquired, url }) => {
  return (
    <div
      className={`card ${acquired ? "card--acquired" : "card--unacquired"}`}
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
    <div className="section-top">
      <h3>
        Modifier Slot Upgrades{" "}
        <span className="count">
          ({slotUpgradesAcquired.length}/7)
        </span>
      </h3>
      <div className="flex-grid">
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
