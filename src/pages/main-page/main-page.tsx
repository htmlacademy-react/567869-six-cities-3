import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Cities from '../../components/cities';
import Tabs from '../../components/tabs';
import { City } from '../../types/offer';
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux';
import { changeCity, fetchOffersAction } from '../../store/action';


type MainPageProps = {
  cities: City[];
};

function MainPage({ cities }: MainPageProps): JSX.Element {
  const activeCityName = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);

  const activeCity = cities.find((city) => city.name === activeCityName) ?? cities[0];

  const filteredOffers = offers.filter(
    (offer) => offer.city.name === activeCity.name
  );

  const handleCityChange = (city: City) => {
    dispatch(changeCity(city.name));
  };

  return (
    <>
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Tabs cities={cities} activeCity={activeCity} onCityChange={handleCityChange} />
        <Cities city={activeCity} offers={filteredOffers} isOffersDataLoading={isOffersDataLoading} />
      </main>
    </>
  );
}

export default MainPage;
