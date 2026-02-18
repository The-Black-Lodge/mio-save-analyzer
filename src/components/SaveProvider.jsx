import raw0 from "../data/empty.save?raw"
import raw1 from "../data/mine.save?raw"
import raw2 from "../data/highest_known.save?raw"
import raw3 from "../data/luna.save?raw"
import localization from "../data/localization.en.json"
import collectibles from "../data/collectibles.json"
import { useState, useEffect, useMemo } from "react"
import { parseSave } from "../saveParser"
import { SaveContext } from "./SaveContext"

const testSaves = [
  parseSave(raw0),
  parseSave(raw1),
  parseSave(raw2),
  parseSave(raw3),
]

const SaveProvider = ({ children }) => {
  const [currentSave, setCurrentSave] = useState(0)
  const [gameData, setGameData] = useState(testSaves[currentSave])

  useEffect(() => {
    console.log(gameData)
  }, [gameData])

  useEffect(() => {
    setGameData(testSaves[currentSave])
  }, [currentSave])

  const playerStats = useMemo(() => {
    const parsePlaytime = (totalSeconds) => {
      const hours = Math.floor(totalSeconds / 3600)
      const minutes = Math.floor((totalSeconds % 3600) / 60)
      return `${hours}h ${minutes}m`
    }
    const parseLastSaveTime = (lastSaveTime) => {
      const date = new Date(lastSaveTime * 1000)
      return date.toLocaleString()
    }
    const trinketObj = gameData?.Saved_entries?.TRINKET ?? {}
    const trinkets = Object.entries(trinketObj)
      .filter(([, value]) => value?.flags?.includes("Acquired"))
      .map(([key]) => key)

    const unlockObj = gameData?.Saved_entries?.UNLOCK ?? {}
    const unlocks = Object.entries(unlockObj)
      .filter(([, value]) => value?.flags?.includes("Acquired"))
      .map(([key]) => key)

    const slotUpgradeObj = gameData?.Saved_entries?.TRINKET_SLOT_UPGRADE ?? {}
    const trinketSlotUpgradesAcquired = Object.entries(slotUpgradeObj)
      .filter(([, value]) => value?.flags?.includes("Acquired"))
      .map(([key]) => parseInt(key, 10))
      .filter((n) => !Number.isNaN(n) && n >= 0 && n <= 6)
      .sort((a, b) => a - b)
    const trinketSlotUpgradesCount = trinketSlotUpgradesAcquired.length

    const carcassObj = gameData?.Saved_entries?.CARCASS ?? {}
    const carcasses = Object.entries(carcassObj)
      .filter(([, value]) => value?.flags?.includes("Acquired"))
      .map(([key]) => key)
      .filter((key) => collectibles.CARCASS.includes(key))

    const bossObj = gameData?.Saved_entries?.BOSS ?? {}
    const bossMeetObj = gameData?.Saved_entries?.BOSS_MEET ?? {}
    const bossTryObj = gameData?.Saved_entries?.BOSS_TRY ?? {}
    const bossesDefeated = Object.fromEntries(
      collectibles.bosses.map((id) => [id, bossObj[id]?.count ?? 0]),
    )
    const bossesMet = Object.fromEntries(
      collectibles.bosses.map((id) => [id, bossMeetObj[id]?.count ?? 0]),
    )
    const bossesTried = Object.fromEntries(
      collectibles.bosses.map((id) => [id, bossTryObj[id]?.count ?? 0]),
    )

    return {
      deaths: gameData?.Saved_entries?.STATS?.DEATH?.count ?? 0,
      playtime: parsePlaytime(gameData?.Saved_not_important?.playtime ?? 0),
      lastSaveTime: parseLastSaveTime(
        gameData?.Saved_not_important?.last_save_time ?? 0,
      ),
      liquidNacresCount:
        gameData?.Saved_not_important?.liquid_nacres_count ?? 0,
      solidifyNacreCount:
        gameData?.Saved_not_important?.solidify_nacre_count ?? 0,
      nacreLost: gameData?.Save?.nacre_in_hub_basin ?? 0,
      trinkets,
      unlocks,
      trinketSlotUpgradesCount,
      trinketSlotUpgradesAcquired,
      carcasses,
      bossesDefeated,
      bossesMet,
      bossesTried,
    }
  }, [gameData])

  console.log(playerStats)

  const value = {
    setCurrentSave,
    setGameData,
    playerStats,
    localization,
    collectibles,
  }

  // console.log(value)

  return <SaveContext.Provider value={value}>{children}</SaveContext.Provider>
}

export default SaveProvider
