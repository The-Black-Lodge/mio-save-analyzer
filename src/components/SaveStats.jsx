import useSaveProvider from "../hooks/useSaveProvider"

const Stat = ({ label, value }) => {
  return (
    <div
      style={{
        border: "1px solid #444",
        padding: "0.5rem",
        borderRadius: "0.5rem",
      }}
    >
      <span style={{ display: "inline-block", marginRight: "0.5rem" }}>
        {label}:
      </span>
      <span>{value}</span>
    </div>
  )
}

const SaveStats = () => {
  const { playerStats } = useSaveProvider()

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem",
        justifyContent: "center",
      }}
    >
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
