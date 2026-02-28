import useSaveProvider from "../hooks/useSaveProvider"
import deathIcon from "../assets/MAP_MARK_4.png"
import nacreIcon from "../assets/RESOURCE_PEARL_SHARDS.png"
import solidNacreIcon from "../assets/RESOURCE_SCRAP_SUPER_SCRAP.png"

const Stat = ({ label, icon, value }) => {
  const iconEl = typeof icon === "string"
    ? <img src={icon} alt="" className="cost-icon" />
    : icon

  return (
    <div className="card card--stat card--left">
      <h4>{iconEl} {label}</h4>
      <hr className="divider" />
      <p className="text-small">{value}</p>
    </div>
  )
}

const SaveStats = () => {
  const { playerStats } = useSaveProvider()

  return (
    <div className="section-top">
      <h3>General Stats</h3>
      <div className="flex-column">
        <Stat label="Deaths" icon={deathIcon} value={playerStats.deaths} />
        <Stat label="Playtime" icon={<i className="fa-regular fa-clock" />} value={playerStats.playtime} />
        <Stat label="Last Save Time" icon={<i className="fa-regular fa-floppy-disk" />} value={playerStats.lastSaveTime} />
        <Stat label="Nacre" icon={nacreIcon} value={playerStats.liquidNacresCount} />
        <Stat label="Solidified Nacre" icon={solidNacreIcon} value={playerStats.solidifyNacreCount} />
      </div>
    </div>
  )
}

export default SaveStats
