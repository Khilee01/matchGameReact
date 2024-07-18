import './index.css'

const TabComponent = props => {
  const {eachTab, toggleActiveTab, activeTabId} = props
  const {displayText, tabId} = eachTab
  const toggleActiveTabId = () => {
    toggleActiveTab(tabId)
  }
  return (
    <li onClick={toggleActiveTabId}>
      {activeTabId === tabId ? (
        <button type="button" className="tabButton activeTab">
          {displayText}
        </button>
      ) : (
        <button type="button" className="tabButton" onClick={toggleActiveTabId}>
          {displayText}
        </button>
      )}
    </li>
  )
}
export default TabComponent
