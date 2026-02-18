import useSaveProvider from "../hooks/useSaveProvider"

const Bosses = () => {
  const { playerStats, collectibles } = useSaveProvider()

  return (
    <>
      <h2>Bosses</h2>
      <p style={{ fontSize: "0.85em", color: "#666", margin: "0 0 0.5rem 0" }}>
        met / tried
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {collectibles.bosses.map((boss) => {
          const defeated = playerStats.bossesDefeated?.[boss] ?? 0
          const met = playerStats.bossesMet?.[boss] ?? 0
          const tried = playerStats.bossesTried?.[boss] ?? 0
          return (
            <li key={boss}>
              {boss} {defeated > 0 ? "✅" : "❌"} {met} / {tried}
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Bosses
