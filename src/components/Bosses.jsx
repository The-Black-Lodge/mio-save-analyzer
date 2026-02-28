import useSaveProvider from "../hooks/useSaveProvider"
import skullIcon from "../assets/MAP_MARK_4.png"

const BossCard = ({ name, flavor, acquired, attempts }) => {
  return (
    <div
      className={`card card--relative card--boss ${
        acquired ? "card--acquired" : "card--unacquired"
      }`}
    >
      <p className="text-left text-small text-accent text-uppercase">{name}</p>
      {flavor && (
        <p className="text-left text-extra-small text-dim">{flavor}</p>
      )}
      {attempts > 0 && (
        <span className="corner-badge">
          {attempts} <img src={skullIcon} alt="" className="cost-icon" />
        </span>
      )}
    </div>
  )
}

const Bosses = () => {
  const { playerStats, collectibles } = useSaveProvider()
  const bossDetails = collectibles?.bosses ?? {}
  const bossesList = Object.keys(bossDetails).sort(
    (a, b) => (bossDetails[a].order ?? 0) - (bossDetails[b].order ?? 0),
  )
  const bossesDefeated = playerStats?.bossesDefeated ?? {}
  const bossAttempts = playerStats?.bossAttempts ?? {}

  const defeatedCount = bossesList.filter(
    (id) => (bossesDefeated[id] ?? 0) > 0,
  ).length

  const renderCard = (bossId) => {
    const info = bossDetails[bossId] ?? {}
    const name = info.name ?? bossId
    const flavor = info.description ?? ""
    const acquired = (bossesDefeated[bossId] ?? 0) > 0
    const attempts = bossAttempts[bossId] ?? 0
    return (
      <BossCard
        key={bossId}
        name={name}
        flavor={flavor}
        acquired={acquired}
        attempts={attempts}
      />
    )
  }

  return (
    <div className="section">
      <h3>
        <img src={skullIcon} alt="" className="header-icon" />{" "}
        Bosses{" "}
        <span className="count">
          ({defeatedCount}/{bossesList.length})
        </span>
      </h3>
      <div className="flex-grid flex-grid--bosses">
        {bossesList.map(renderCard)}
      </div>
    </div>
  )
}

export default Bosses
