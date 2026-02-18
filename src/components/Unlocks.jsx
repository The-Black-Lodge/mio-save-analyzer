import useSaveProvider from "../hooks/useSaveProvider"

const Ability = ({ label, acquired }) => {
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
      <p style={{ fontSize: "0.8rem" }}>
        {acquired ? "acquired" : "not acquired"}
      </p>
    </div>
  )
}

const Unlocks = () => {
  const { playerStats, localization } = useSaveProvider()

  const allUnlocks = localization?.ITEM_NAME_UNLOCK ?? {}
  const acquiredUnlocks = playerStats?.unlocks ?? []

  return (
    <div
      style={{
        padding: "1rem",
      }}
    >
      <h3>
        Abilities{" "}
        <span style={{ color: "white" }}>
          ({acquiredUnlocks.length}/{Object.keys(allUnlocks).length})
        </span>
      </h3>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {Object.entries(allUnlocks).map(([key, value]) => (
          <Ability
            key={key}
            label={value}
            acquired={acquiredUnlocks.includes(key) ? true : false}
          />
        ))}
      </div>
    </div>
  )
}

export default Unlocks
