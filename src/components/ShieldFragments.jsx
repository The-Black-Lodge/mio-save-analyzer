import useSaveProvider from "../hooks/useSaveProvider"

const SHIELD_FRAGMENT_INDICES = Array.from({ length: 24 }, (_, i) => i)
const SHIELD_FRAGMENTS_MAX = 24

const ShieldFragments = () => {
  const { playerStats } = useSaveProvider()
  const shieldFragmentsCount = playerStats?.shieldFragmentsCount ?? 0
  const shieldFragmentsAcquired = playerStats?.shieldFragmentsAcquired ?? []

  return (
    <div style={{ display: "inline-block" }}>
      <h2>Coating Components</h2>
      <p>
        {shieldFragmentsCount}/{SHIELD_FRAGMENTS_MAX} found
      </p>
      <p style={{ fontSize: "0.9em", margin: "0.25rem 0" }}>
        Slots:{" "}
        {SHIELD_FRAGMENT_INDICES.map((i) =>
          shieldFragmentsAcquired.includes(i) ? "✅" : "❌",
        ).join(" ")}{" "}
        <span style={{ color: "#666" }}>(0–23)</span>
      </p>
    </div>
  )
}

export default ShieldFragments
