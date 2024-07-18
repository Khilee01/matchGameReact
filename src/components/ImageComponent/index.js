import './index.css'

const ImageComponent = props => {
  const {eachImage, checkMatch} = props

  const {thumbnailUrl, id} = eachImage
  const toCheckMatch = () => {
    checkMatch(id)
  }

  return (
    <li>
      <button className="buttonImage" onClick={toCheckMatch} type="button">
        <img className="image" src={thumbnailUrl} alt="thumbnail" />
      </button>
    </li>
  )
}
export default ImageComponent
