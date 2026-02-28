import useSaveProvider from "../hooks/useSaveProvider"
import tabMapIcon from "../assets/tab_map.png"
import dodgeIcon from "../assets/UNLOCK_BLOCK.png"
import sailIcon from "../assets/UNLOCK_GLIDE.png"
import harvesterIcon from "../assets/UNLOCK_HIT_RECHARGE.png"
import hairpinIcon from "../assets/UNLOCK_HOOK.png"
import slingshotIcon from "../assets/UNLOCK_ORB_SHOOT.png"
import stridersIcon from "../assets/UNLOCK_SPIDER.png"
import flowingStepsIcon from "../assets/UNLOCK_SPIDER_GOO.png"

const ABILITY_ICONS = {
  MAP: tabMapIcon,
  BLOCK: dodgeIcon,
  GLIDE: sailIcon,
  HIT_RECHARGE: harvesterIcon,
  HOOK: hairpinIcon,
  ORB_SHOOT: slingshotIcon,
  SPIDER: stridersIcon,
  SPIDER_GOO: flowingStepsIcon,
}

const DISPLAY_ORDER = [
  "MAP",
  "SPIDER_GOO",
  "HOOK",
  "BLOCK",
  "HIT_RECHARGE",
  "GLIDE",
  "SPIDER",
  "ORB_SHOOT",
]

const Ability = ({ label, icon, acquired }) => {
  return (
    <div
      className={`card card--left ${acquired ? "card--acquired" : "card--unacquired"}`}
    >
      <h4>{icon && <img src={icon} alt="" className="ability-icon" />} {label}</h4>
    </div>
  )
}

const Unlocks = () => {
  const { playerStats, collectibles } = useSaveProvider()

  const unlockData = collectibles?.unlocks ?? {}
  const acquiredUnlocks = playerStats?.unlocks ?? []

  return (
    <div className="section">
      <h3>
        Abilities{" "}
        <span className="count">
          ({acquiredUnlocks.length}/{Object.keys(unlockData).length})
        </span>
      </h3>
      <div className="flex-column">
        {DISPLAY_ORDER.filter((key) => key in unlockData).map((key) => (
          <Ability
            key={key}
            label={unlockData[key].name ?? key}
            icon={ABILITY_ICONS[key]}
            acquired={acquiredUnlocks.includes(key)}
          />
        ))}
      </div>
    </div>
  )
}

export default Unlocks
