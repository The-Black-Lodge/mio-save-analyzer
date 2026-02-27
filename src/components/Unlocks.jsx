import useSaveProvider from "../hooks/useSaveProvider"

const Ability = ({ label, acquired }) => {
  return (
    <div
      className={`card ${acquired ? "card--acquired" : "card--unacquired"}`}
    >
      <h4>{label}</h4>
    </div>
  )
}

const Unlocks = () => {
  const { playerStats, collectibles } = useSaveProvider()

  const unlockData = collectibles?.unlocks ?? {}
  const acquiredUnlocks = playerStats?.unlocks ?? []

  return (
    <div className="section">
      <h3>
        Abilities{" "}
        <span className="count">
          ({acquiredUnlocks.length}/{Object.keys(unlockData).length})
        </span>
      </h3>
      <div className="flex-grid">
        {Object.entries(unlockData).map(([key, info]) => (
          <Ability
            key={key}
            label={info.name ?? key}
            acquired={acquiredUnlocks.includes(key)}
          />
        ))}
      </div>
    </div>
  )
}

export default Unlocks
