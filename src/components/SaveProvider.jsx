import raw0 from "../data/empty.save?raw"
import raw1 from "../data/mine.save?raw"
import { useState, useEffect } from "react"
import { parseSave } from "../saveParser"
import { SaveContext } from "./SaveContext"

const testSaves = [parseSave(raw0), parseSave(raw1)]

const SaveProvider = ({ children }) => {
  const [currentSave, setCurrentSave] = useState(0)
  const [gameData, setGameData] = useState(testSaves[currentSave])

  useEffect(() => {
    console.log(gameData)
  }, [gameData])

  useEffect(() => {
    setGameData(testSaves[currentSave])
  }, [currentSave])

  const parsePlaytime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  const parseLastSaveTime = (lastSaveTime) => {
    const date = new Date(lastSaveTime * 1000)
    return date.toLocaleString()
  }

  const playerStats = {
    deaths: gameData?.Saved_entries?.STATS?.DEATH?.count ?? 0,
    playtime: parsePlaytime(gameData?.Saved_not_important?.playtime ?? 0),
    lastSaveTime: parseLastSaveTime(
      gameData?.Saved_not_important?.last_save_time ?? 0,
    ),
    liquidNacresCount: gameData?.Saved_not_important?.liquid_nacres_count ?? 0,
    solidifyNacreCount:
      gameData?.Saved_not_important?.solidify_nacre_count ?? 0,
  }

  const value = {
    setCurrentSave,
    setGameData,
    playerStats,
  }

  // console.log(value)

  return <SaveContext.Provider value={value}>{children}</SaveContext.Provider>
}

export default SaveProvider
