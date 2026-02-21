import useSaveProvider from "../hooks/useSaveProvider"
import CollectibleList from "./CollectibleList"

const ShieldFragments = () => {
  const { playerStats, collectibles } = useSaveProvider()
  const shieldFragmentsAcquired = playerStats?.shieldFragmentsAcquired ?? []
  const shieldFragments = collectibles?.shield_fragments ?? {}

  return (
    <CollectibleList
      title="Coating Components"
      items={shieldFragments}
      acquiredKeys={new Set(shieldFragmentsAcquired.map(String))}
      fallbackLabel={(key) => `Fragment ${key}`}
    />
  )
}

export default ShieldFragments
