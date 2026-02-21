import useSaveProvider from "../hooks/useSaveProvider"

const CHEST_KEY_MAX = 6
const CHEST_KEY_INDICES = Array.from({ length: CHEST_KEY_MAX }, (_, i) => i)

const ChestKeyCard = ({ description, flavor, acquired, url }) => {
  return (
    <div
      className={`card card--relative ${
        acquired ? "card--acquired" : "card--unacquired"
      }`}
    >
      <p className="text-left text-small">{description}</p>
      {flavor && (
        <p className="text-left text-extra-small text-dim">{flavor}</p>
      )}
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

const ChestKey = () => {
  const { playerStats, collectibles } = useSaveProvider()
  const chestKeysAcquired = playerStats?.chestKeysAcquired ?? []
  const chestKeys = collectibles?.chest_keys ?? {}

  return (
    <div className="section">
      <h3>
        Fragmented Serial Numbers{" "}
        <span className="count">
          ({chestKeysAcquired.length}/{CHEST_KEY_MAX})
        </span>
      </h3>
      <div className="flex-column">
        {CHEST_KEY_INDICES.map((i) => {
          const info = chestKeys[String(i)] ?? {}
          const description = info.description ?? `Serial Code ${i + 1}`
          const flavor = info.flavor ?? ""
          const url = info.url ?? ""
          const acquired = chestKeysAcquired.includes(i)
          return (
            <ChestKeyCard
              key={i}
              description={description}
              flavor={flavor}
              acquired={acquired}
              url={url}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ChestKey
