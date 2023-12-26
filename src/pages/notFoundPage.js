import pageNotFoundImage from "../img/pageNotFound/PageNotFound.png";
import { LazyLoadImage } from "react-lazy-load-image-component";



const NotFoundPage = () => {
   /**
   * @description This function renders 404 page
   * @returns {ReactNode} A React element which renders div component with image
   */
    return (
        <div className="pageNotFoundContainer">
            <LazyLoadImage src={pageNotFoundImage} className="pageNotFoundImage"
                alt="Profile picture"
            />
         </div>
    );
}
export default NotFoundPage