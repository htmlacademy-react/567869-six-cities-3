import { Helmet } from 'react-helmet-async';
import Cities from '../../components/cities';
import Tabs from '../../components/tabs';
import { City, Offers } from '../../types/offer';
import { useState } from 'react';

type MainPageProps = {
  cities: City[];
  offers: Offers;
};

function MainPage({ cities, offers }: MainPageProps): JSX.Element {
  const [activeCity, setActiveCity] = useState<City>(
    cities.find((city) => city.name === 'Amsterdam') ?? cities[0]
  );

  const filteredOffers = offers.filter(
    (offer) => offer.city.name === activeCity.name
  );

  return (
    <>
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Tabs cities={cities} activeCity={activeCity} onCityChange={setActiveCity} />
        <Cities city={activeCity} offers={filteredOffers} />
      </main>
    </>
  );
}

export default MainPage;
