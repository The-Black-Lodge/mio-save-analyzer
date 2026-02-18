import useSaveProvider from "../hooks/useSaveProvider"

const Carcasses = () => {
  const { playerStats, collectibles } = useSaveProvider()
  const allCarcasses = collectibles?.CARCASS ?? []
  const acquiredCarcasses = playerStats?.carcasses ?? []

  const count = acquiredCarcasses.length
  const total = allCarcasses.length

  return (
    <>
      <h3>Old Cores</h3>
      <p>
        {count}/{total} collected
      </p>
      <ul>
        {allCarcasses.map((id) => (
          <li key={id}>
            {acquiredCarcasses.includes(id) ? "✅" : "❌"} {id}
          </li>
        ))}
      </ul>
    </>
  )
}

export default Carcasses
