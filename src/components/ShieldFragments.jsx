import useSaveProvider from "../hooks/useSaveProvider"

const SHIELD_FRAGMENTS_MAX = 24
const SHIELD_FRAGMENT_INDICES = Array.from(
  { length: SHIELD_FRAGMENTS_MAX },
  (_, i) => i,
)

const ShieldFragmentCard = ({ label, acquired, url }) => {
  return (
    <div
      className={`card card--relative ${
        acquired ? "card--acquired" : "card--unacquired"
      }`}
    >
      <p className="text-left text-small">{label}</p>
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="corner-badge"
          aria-label="View location"
        >
          <i className="fa-solid fa-link" />
        </a>
      ) : null}
    </div>
  )
}

const ShieldFragments = () => {
  const { playerStats, collectibles } = useSaveProvider()
  const shieldFragmentsAcquired = playerStats?.shieldFragmentsAcquired ?? []
  const shieldFragments = collectibles?.shield_fragments ?? {}

  return (
    <div className="section-flex">
      <h3>
        Coating Components{" "}
        <span className="count">
          ({shieldFragmentsAcquired.length}/{SHIELD_FRAGMENTS_MAX})
        </span>
      </h3>
      <div className="flex-column">
        {SHIELD_FRAGMENT_INDICES.map((i) => {
          const info = shieldFragments[String(i)] ?? {}
          const description = info.description ?? `Fragment ${i}`
          const url = info.url ?? ""
          const acquired = shieldFragmentsAcquired.includes(i)
          return (
            <ShieldFragmentCard
              key={i}
              label={description}
              acquired={acquired}
              url={url}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ShieldFragments
