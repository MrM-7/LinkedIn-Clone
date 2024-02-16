import InfoIcon from '@mui/icons-material/Info';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import '../Css/widgets.css'

const Widgets = () => {

    const newsArticle = (heading, subtitle) => (
        <div className="widgets__article">
            <div className="widgets__articleLeft">
                <FiberManualRecordIcon />
            </div>

            <div className="widgets__articleRight">
                <h4>{heading}</h4>
                <p>{subtitle}</p>
            </div>
        </div>
    )

  return (
    <div className='widgets'>
      <div className="widgets__header">
        <h2>LinkedIn News</h2>
        <InfoIcon />
      </div>

      {newsArticle("Banks go slow on hiring", "2490 readers")}
      {newsArticle("India Inc on CTO talent hunt", "1430 readers")}
      {newsArticle("SpiceJet to lay off 1,400 people", "348 readers")}
      {newsArticle("UPI conquers new markets", "683 readers")}
      {newsArticle("B2B fintech set to soar", "189 readers")}
    </div>
  )
}

export default Widgets
