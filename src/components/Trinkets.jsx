import useSaveProvider from "../hooks/useSaveProvider"

const Trinkets = () => {
  const { playerStats, localization } = useSaveProvider()

  const EXCLUDED_TRINKETS = ["EMBEDDING_BLADE", "SMALL_ENERGY_DRAIN", "TANGLES"]
  const allTrinkets = Object.fromEntries(
    Object.entries(localization?.ITEM_NAME_TRINKET ?? {}).filter(
      ([key]) => !EXCLUDED_TRINKETS.includes(key),
    ),
  )
  const acquiredTrinkets = playerStats?.trinkets ?? []

  return (
    <>
      <h1>
        Trinkets ({Object.keys(acquiredTrinkets).length}/
        {Object.keys(allTrinkets).length})
      </h1>
      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem 1rem",
          listStyle: "none",
          padding: 0,
          margin: 0,
        }}
      >
        {Object.entries(allTrinkets).map(([key, value]) => (
          <li
            key={key}
            style={{
              display: "inline-block",
              padding: "0.5rem",
              width: "13rem",
              borderRadius: "0.5rem",
              backgroundColor: acquiredTrinkets.includes(key)
                ? "#4CAF50"
                : "#f44336",
              color: "#fff",
            }}
          >
            {value} {acquiredTrinkets.includes(key) ? "✅" : "❌"}
          </li>
        ))}
      </ul>
    </>
  )
}

export default Trinkets
