import { Helmet } from 'react-helmet-async';
import Cities from '../../components/cities/cities';
import Header from '../../components/header/header';
import Tabs from '../../components/tabs/tabs';

type MainPageProps = {
    placesCount: number;
}

function MainPage({placesCount}: MainPageProps): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      < Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        < Tabs />
        < Cities placesCount={placesCount}/>
      </main>
    </div>
  );
}

export default MainPage;
