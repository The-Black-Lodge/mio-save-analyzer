import useSaveProvider from "../hooks/useSaveProvider"

const SaveStats = () => {
  const { playerStats } = useSaveProvider()

  return (
    <>
      <h1>Player Stats</h1>
      <p>Deaths: {playerStats.deaths}</p>
      <p>Playtime: {playerStats.playtime}</p>
      <p>Last Save Time: {playerStats.lastSaveTime}</p>
      <p>Nacre: {playerStats.liquidNacresCount}</p>
      <p>Solidified Nacre: {playerStats.solidifyNacreCount}</p>
    </>
  )
}

export default SaveStats
