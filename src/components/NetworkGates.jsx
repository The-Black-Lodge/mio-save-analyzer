import useSaveProvider from "../hooks/useSaveProvider"
import networkGateIcon from "../assets/map-network-gate.png"

const NetworkGateCard = ({ name, checkpointAcquired, overseerAcquired }) => {
  return (
    <div
      className={`card card--relative card--boss ${
        checkpointAcquired ? "card--acquired" : "card--unacquired"
      }`}
    >
      <p className="text-left text-small text-accent">{name}</p>
      {overseerAcquired && (
        <span className="corner-badge">
          <img src={networkGateIcon} alt="" className="cost-icon" />
        </span>
      )}
    </div>
  )
}

const NetworkGates = () => {
  const { playerStats, collectibles } = useSaveProvider()
  const checkpointDetails = collectibles?.checkpoints ?? {}
  const overseerDetails = collectibles?.overseers ?? {}
  const checkpointsAcquired = playerStats?.checkpointsAcquired ?? new Set()
  const overseersAcquired = playerStats?.overseersAcquired ?? new Set()

  const checkpointIds = Object.keys(checkpointDetails)
  const upperIds = checkpointIds.filter((id) => checkpointDetails[id]?.upper)
  const lowerIds = checkpointIds.filter((id) => !checkpointDetails[id]?.upper)
  const acquiredCount = checkpointIds.filter((id) =>
    checkpointsAcquired.has(id),
  ).length

  const renderCard = (id) => {
    const info = checkpointDetails[id] ?? {}
    const name = info.name ?? id
    return (
      <NetworkGateCard
        key={id}
        name={name}
        checkpointAcquired={checkpointsAcquired.has(id)}
        overseerAcquired={id in overseerDetails && overseersAcquired.has(id)}
      />
    )
  }

  return (
    <div className="section">
      <h3>
        <img src={networkGateIcon} alt="" className="header-icon" />{" "}
        Network Gates{" "}
        <span className="count">
          ({acquiredCount}/{checkpointIds.length})
        </span>
      </h3>
      <p className="text-small legend">
        <img src={networkGateIcon} alt="" className="cost-icon" /> = Overseer found
      </p>
      <div className="flex-column flex-column--spaced">
        <div className="flex-grid flex-grid--bosses">
          {upperIds.map(renderCard)}
        </div>
        <div className="flex-grid flex-grid--bosses">
          {lowerIds.map(renderCard)}
        </div>
      </div>
    </div>
  )
}

export default NetworkGates
