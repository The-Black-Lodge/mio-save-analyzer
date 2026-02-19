import useSaveProvider from "../hooks/useSaveProvider"

const CANDLES_MAX = 12
const CANDLE_INDICES = Array.from({ length: CANDLES_MAX }, (_, i) => i)

const CandleCard = ({ label, acquired, url }) => {
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

const Candles = () => {
  const { playerStats, collectibles } = useSaveProvider()
  const candlesAcquired = playerStats?.candlesAcquired ?? []
  const candles = collectibles?.candles ?? {}

  return (
    <div className="section-flex">
      <h3>
        Candles{" "}
        <span className="count">
          ({candlesAcquired.length}/{CANDLES_MAX})
        </span>
      </h3>
      <div className="flex-column">
        {CANDLE_INDICES.map((i) => {
          const info = candles[String(i)] ?? {}
          const description = info.description ?? `Candle ${i}`
          const url = info.url ?? ""
          const acquired = candlesAcquired.includes(i)
          return (
            <CandleCard
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

export default Candles
