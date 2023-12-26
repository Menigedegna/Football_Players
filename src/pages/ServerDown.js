import serverDownImage from "../img/ServerDown.png";
import { LazyLoadImage } from "react-lazy-load-image-component";


const ServerDown = () => {
   /**
   * @description This function renders 503 page
   * @returns {ReactNode} A React element which renders div component with image
   */

    return (
        <div className="serverDownContainer">
            <LazyLoadImage src={serverDownImage} className="serverDownImage"
                alt="Profile picture"
            />
        </div>
    );
}
export default ServerDown;