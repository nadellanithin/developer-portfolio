import '../../Css/subComponents.css'
import Carousel from './Carousel';
import Data from '../../json/CarouselData.json'

function About() {
    return (
        <div id="About" className="About">
            <h1 className="SectionHeader">about.</h1>
            <Carousel items={Data} />
        </div>
    );
}

export default About