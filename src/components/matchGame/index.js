import {Component} from 'react'
import ImageComponent from '../ImageComponent'
import TabComponent from '../TabComponent'
import './index.css'

class MatchGame extends Component {
  state = {
    score: 0,
    timeElapsedInSec: 0,
    indexForMatchGame: 0,
    activeTabId: 'FRUIT',
    ifWrongMatch: false,
  }

  componentDidMount() {
    this.timerId = setInterval(this.incrementTime, 1000) // invoked immediately after a component is embedded into a tree(mounted)
  }

  componentWillUnmount() {
    clearInterval(this.timerId) // invoked immediately after a component is removed from a tree
  }

  checkMatch = id => {
    const {imagesList} = this.props
    const {indexForMatchGame} = this.state
    if (id === imagesList[indexForMatchGame].id) {
      const newIndex = Math.floor(Math.random() * imagesList.length)
      this.setState(prevState => ({
        indexForMatchGame: newIndex,
        score: prevState.score + 1,
      }))
    } else {
      clearInterval(this.timerId)
      this.setState({ifWrongMatch: true})
    }
  }

  incrementTime = () => {
    this.setState(prevState => {
      if (prevState.timeElapsedInSec >= 60) {
        clearInterval(this.timerId)
        return null
      }
      return {timeElapsedInSec: prevState.timeElapsedInSec + 1}
    })
  }

  reset = () => {
    this.setState({timeElapsedInSec: 0, score: 0, ifWrongMatch: false})
    setInterval(this.incrementTime, 1000)
  }

  toggleActiveTab = tabId => {
    this.setState({activeTabId: tabId})
  }

  render() {
    const {imagesList, tabsList} = this.props
    const {
      score,
      timeElapsedInSec,
      indexForMatchGame,
      activeTabId,
      ifWrongMatch,
    } = this.state
    const NEWImageList = imagesList.filter(eachImage => {
      if (eachImage.category === activeTabId) {
        return eachImage
      }
      return null
    })
    return (
      <div className="mainContainer">
        <nav className="header">
          <ul className="header headerList">
            <li>
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
                id="website-logo"
                alt="website logo"
              />
            </li>
            <li className="headerWritten">
              <p className="score">
                Score:
                <span>{score}</span>
              </p>
              <div className="Timer">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                  alt="timer"
                />
                <p>{60 - timeElapsedInSec} sec</p>
              </div>
            </li>
          </ul>
        </nav>
        {timeElapsedInSec === 60 || ifWrongMatch ? (
          <div className="CardImg">
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
              alt="trophy"
              className="trophy"
            />
            <p>YOUR SCORE</p>
            <p>{score}</p>
            <button type="button" onClick={this.reset} className="button">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                alt="reset"
              />
              <p>PLAY AGAIN</p>
            </button>
          </div>
        ) : (
          <div className="imagesAll">
            <img
              src={imagesList[indexForMatchGame].imageUrl}
              alt="match"
              className="matchImage"
            />
            <ul className="tabsList">
              {tabsList.map(eachTab => (
                <TabComponent
                  eachTab={eachTab}
                  key={eachTab.tabId}
                  activeTabId={activeTabId}
                  toggleActiveTab={this.toggleActiveTab}
                />
              ))}
            </ul>
            <ul className="imageList">
              {NEWImageList.map(eachImage => (
                <ImageComponent
                  key={eachImage.id}
                  eachImage={eachImage}
                  checkMatch={this.checkMatch}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}
export default MatchGame
