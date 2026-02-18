import useSaveProvider from "../hooks/useSaveProvider"

const Bosses = () => {
  const { playerStats, collectibles } = useSaveProvider()

  return (
    <>
      <h3>Bosses</h3>
      <p style={{ fontSize: "0.85em", color: "#666", margin: "0 0 0.5rem 0" }}>
        met / tried
      </p>
      <ul>
        {collectibles.bosses.map((boss) => {
          const defeated = playerStats.bossesDefeated?.[boss] ?? 0
          const met = playerStats.bossesMet?.[boss] ?? 0
          const tried = playerStats.bossesTried?.[boss] ?? 0
          return (
            <li key={boss}>
              {defeated > 0 ? "✅" : "❌"} {boss} {met} / {tried}
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Bosses
