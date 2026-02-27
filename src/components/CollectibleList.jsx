const CollectibleCard = ({ label, flavor, acquired, url }) => (
  <div
    className={`card card--relative ${
      acquired ? "card--acquired" : "card--unacquired"
    }`}
  >
    <p className="text-left text-small">{label}</p>
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

const CollectibleList = ({ title, icon, items, acquiredKeys, fallbackLabel }) => {
  const keys = Object.keys(items)
  return (
    <div className="section-flex">
      <h3>
        {icon && <><img src={icon} alt="" className="header-icon" />{" "}</>}
        {title}{" "}
        <span className="count">
          ({acquiredKeys.size}/{keys.length})
        </span>
      </h3>
      <div className="flex-column">
        {keys.map((key) => {
          const info = items[key] ?? {}
          const description =
            info.description ?? (fallbackLabel ? fallbackLabel(key) : key)
          const flavor = info.flavor ?? ""
          const url = info.url ?? ""
          return (
            <CollectibleCard
              key={key}
              label={description}
              flavor={flavor}
              acquired={acquiredKeys.has(key)}
              url={url}
            />
          )
        })}
      </div>
    </div>
  )
}

export default CollectibleList
