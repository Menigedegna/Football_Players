import RenderTreeMapPage from '../components/RenderTreeMapPage'

const SERVER_PATH = 'https://mariamawit.pythonanywhere.com/api/countries/';

const CountryPage = () => {
   /**
   * @description This function renders Countries page
   * @returns {ReactNode} A React element which renders RenderTreeMapPage component
   */
    return <RenderTreeMapPage serverPath={SERVER_PATH} dataType='Countries' />
}

export default CountryPage;