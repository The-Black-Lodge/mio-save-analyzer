import useSaveProvider from "../hooks/useSaveProvider"

const Unlocks = () => {
  const { playerStats, localization } = useSaveProvider()

  const allUnlocks = localization?.ITEM_NAME_UNLOCK ?? {}
  const acquiredUnlocks = playerStats?.unlocks ?? []

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "flex-start",
        height: "20rem",
        padding: "1rem",
      }}
    >
      <h2>Unlocks</h2>
      <ul>
        {Object.entries(allUnlocks).map(([key, value]) => (
          <li key={key}>
            {value} {acquiredUnlocks.includes(key) ? "✅" : "❌"}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Unlocks
