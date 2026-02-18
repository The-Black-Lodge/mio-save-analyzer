import useSaveProvider from "../hooks/useSaveProvider"

const SaveStats = () => {
  const { playerStats } = useSaveProvider()

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "flex-start",
        height: "20rem",
        padding: "1rem",
        width: "23rem",
      }}
    >
      <h2>Player Stats</h2>
      <ul>
        <li>Deaths: {playerStats.deaths}</li>
        <li>Playtime: {playerStats.playtime}</li>
        <li>Last Save Time: {playerStats.lastSaveTime}</li>
        <li>Nacre: {playerStats.liquidNacresCount}</li>
        <li>Solidified Nacre: {playerStats.solidifyNacreCount}</li>
        <li>Nacre Lost: {playerStats.nacreLost}</li>
      </ul>
    </div>
  )
}

export default SaveStats
