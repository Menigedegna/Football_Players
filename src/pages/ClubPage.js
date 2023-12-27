import RenderTreeMapPage from '../components/RenderTreeMapPage'

const SERVER_PATH = "https://mariamawit.pythonanywhere.com/api/clubs/";

const ClubPage = () => {
   /**
   * @description This function renders the Clubs page
   * @returns {ReactNode} A React element which renders RenderTreeMapPage component
   */

    return <RenderTreeMapPage serverPath={SERVER_PATH} dataType='Clubs' />
}

export default ClubPage;