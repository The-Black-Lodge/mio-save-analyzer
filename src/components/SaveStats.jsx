import useSaveProvider from "../hooks/useSaveProvider"

const Stat = ({ label, value }) => {
  return (
    <div className="card card--stat">
      <h4>{label}</h4>
      <hr className="divider" />
      <p className="text-small">{value}</p>
    </div>
  )
}

const SaveStats = () => {
  const { playerStats } = useSaveProvider()

  return (
    <div className="flex-grid">
      <Stat
        label="Deaths"
        value={playerStats.deaths}
      />
      <Stat
        label="Playtime"
        value={playerStats.playtime}
      />
      <Stat
        label="Last Save Time"
        value={playerStats.lastSaveTime}
      />
      <Stat
        label="Nacre"
        value={playerStats.liquidNacresCount}
      />
      <Stat
        label="Solidified Nacre"
        value={playerStats.solidifyNacreCount}
      />
      <Stat
        label="Nacre Lost"
        value={playerStats.nacreLost}
      />
    </div>
  )
}

export default SaveStats
