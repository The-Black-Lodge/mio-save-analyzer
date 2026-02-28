import useSaveProvider from "../hooks/useSaveProvider"
import CollectibleList from "./CollectibleList"
import coatingIcon from "../assets/SHIELD_FRAGMENT.png"

const ShieldFragments = () => {
  const { playerStats, collectibles } = useSaveProvider()
  const shieldFragmentsAcquired = playerStats?.shieldFragmentsAcquired ?? []
  const shieldFragments = collectibles?.shield_fragments ?? {}

  return (
    <CollectibleList
      title="Coating Components"
      icon={coatingIcon}
      items={shieldFragments}
      acquiredKeys={new Set(shieldFragmentsAcquired.map(String))}
      fallbackLabel={(key) => `Fragment ${key}`}
    />
  )
}

export default ShieldFragments
