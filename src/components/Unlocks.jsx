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
  const { playerStats, localization } = useSaveProvider()

  const allUnlocks = localization?.ITEM_NAME_UNLOCK ?? {}
  const acquiredUnlocks = playerStats?.unlocks ?? []

  return (
    <div className="section">
      <h3>
        Abilities{" "}
        <span className="count">
          ({acquiredUnlocks.length}/{Object.keys(allUnlocks).length})
        </span>
      </h3>
      <div className="flex-grid">
        {Object.entries(allUnlocks).map(([key, value]) => (
          <Ability
            key={key}
            label={value}
            acquired={acquiredUnlocks.includes(key)}
          />
        ))}
      </div>
    </div>
  )
}

export default Unlocks
