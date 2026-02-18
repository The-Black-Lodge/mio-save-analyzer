import useSaveProvider from "../hooks/useSaveProvider"

const Unlocks = () => {
  const { playerStats, localization } = useSaveProvider()

  const allUnlocks = localization?.ITEM_NAME_UNLOCK ?? {}
  const acquiredUnlocks = playerStats?.unlocks ?? []

  return (
    <>
      <h1>Unlocks</h1>
      <ul>
        {Object.entries(allUnlocks).map(([key, value]) => (
          <li key={key}>
            {value} {acquiredUnlocks.includes(key) ? "✅" : "❌"}
          </li>
        ))}
      </ul>
    </>
  )
}

export default Unlocks
