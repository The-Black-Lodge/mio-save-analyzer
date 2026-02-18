import useSaveProvider from "../hooks/useSaveProvider"

const CANDLES_MAX = 12

const Candles = () => {
  const { playerStats, collectibles } = useSaveProvider()
  const candlesCount = playerStats?.candlesCount ?? 0
  const candlesAcquired = playerStats?.candlesAcquired ?? []
  const candles = collectibles?.candles ?? {}

  return (
    <div>
      <h3>Candles</h3>
      <p>
        {candlesCount}/{CANDLES_MAX} found
      </p>
      <ul>
        {Array.from({ length: 12 }, (_, i) => {
          const info = candles[String(i)] ?? {}
          const description = info.description ?? ""
          const url = info.url ?? ""
          const acquired = candlesAcquired.includes(i)

          return (
            <li key={i} style={{ marginBottom: "0.25rem" }}>
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

export default Candles
