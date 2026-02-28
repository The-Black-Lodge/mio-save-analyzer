import useSaveProvider from "../hooks/useSaveProvider"
import CollectibleList from "./CollectibleList"
import forebears from "../assets/ATTACK_POWER.png"

const AttackPower = () => {
  const { playerStats, collectibles } = useSaveProvider()
  const attackPowerAcquired = playerStats?.attackPowerAcquired ?? []
  const attackPower = collectibles?.attack_power ?? {}

  return (
    <CollectibleList
      title="Forebears Legacy"
      icon={forebears}
      items={attackPower}
      acquiredKeys={new Set(attackPowerAcquired.map(String))}
      fallbackLabel={(key) => `Attack Power ${+key + 1}`}
    />
  )
}

export default AttackPower
