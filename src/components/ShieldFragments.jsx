import useSaveProvider from "../hooks/useSaveProvider"

const SHIELD_FRAGMENTS_MAX = 24

const ShieldFragments = () => {
  const { playerStats, collectibles } = useSaveProvider()
  const shieldFragmentsCount = playerStats?.shieldFragmentsCount ?? 0
  const shieldFragmentsAcquired = playerStats?.shieldFragmentsAcquired ?? []
  const shieldFragments = collectibles?.shield_fragments ?? {}

  return (
    <div>
      <h3>Coating Components</h3>
      <p>
        {shieldFragmentsCount}/{SHIELD_FRAGMENTS_MAX} found
      </p>
      <ul>
        {Array.from({ length: 24 }, (_, i) => {
          const info = shieldFragments[String(i)] ?? {}
          const description = info.description ?? ""
          const url = info.url ?? ""
          const acquired = shieldFragmentsAcquired.includes(i)
          return (
            <li
              key={i}
              style={{ marginBottom: "0.25rem" }}
            >
              {acquired ? "✅" : "❌"} {description}
              {url ? (
                <>
                  {" "}
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🔗
                  </a>
                </>
              ) : null}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ShieldFragments
