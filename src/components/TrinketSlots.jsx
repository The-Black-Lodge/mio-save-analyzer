import useSaveProvider from "../hooks/useSaveProvider"

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
          <i className="fa-solid fa-link" />
        </a>
      ) : null}
    </div>
  )
}

const TrinketSlots = () => {
  const { playerStats, collectibles } = useSaveProvider()
  const slotUpgradesAcquired = playerStats?.trinketSlotUpgradesAcquired ?? []
  const trinketSlots = collectibles?.trinket_slots ?? {}
  const slotKeys = Object.keys(trinketSlots)

  return (
    <div className="section-top">
      <h3>
        Modifier Slot Upgrades{" "}
        <span className="count">
          ({slotUpgradesAcquired.length}/{slotKeys.length})
        </span>
      </h3>
      <div className="flex-grid">
        {slotKeys.map((key) => {
          const info = trinketSlots[key] ?? {}
          const description = info.description ?? `Slot ${key}`
          const url = info.url ?? ""
          const acquired = slotUpgradesAcquired.includes(parseInt(key, 10))
          return (
            <SlotCard
              key={key}
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
