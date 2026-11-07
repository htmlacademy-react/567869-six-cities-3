import { useState } from 'react';
import { City, Offer } from '../../types/offer';
import PlaceCard from '../place-card';
import Map from '../map';
import { SortType } from '../../const';
import Sorting from '../sorting';
import { getSortedOffers } from '../../utils/sort-offers';
import Spinner from '../spinner';
import CitiesEmpty from '../cities-empty';

type CitiesProps = {
  city: City;
  offers: Offer[];
  isOffersDataLoading: boolean;
  offersError: boolean;
};

function Cities({ city, offers, isOffersDataLoading, offersError }: CitiesProps): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<Offer>();
  const [activeSort, setActiveSort] = useState<SortType>(SortType.Popular);
  const sortedOffers = getSortedOffers(offers, activeSort);

  const handleHover = (offer?: Offer) => {
    setActiveOffer(offer);
  };

  const handleSortChange = (sortType: SortType) => {
    setActiveSort(sortType);
  };

  if (isOffersDataLoading) {
    return <Spinner />;
  }

  if (offersError) {
    return (
      <div className="cities">
        <div className="cities__places-container container">
          <p role="alert">
            Failed to load offers. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (offers.length === 0) {
    return (
      <CitiesEmpty cityName={city.name}/>
    );
  }

  const placeWord = offers.length === 1 ? 'place' : 'places';

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} {placeWord} to stay in {city.name}</b>
          <Sorting currentSort={activeSort} onSortTypeChange={handleSortChange} />
          <div className="cities__places-list places__list tabs__content">
            {sortedOffers.map((offer) => (
              <PlaceCard
                key={offer.id}
                offer={offer}
                handleHover={handleHover}
              />
            ))}
          </div>
        </section>
        <div className="cities__right-section">
          <Map
            city={city}
            offers={offers}
            selectedOffer={activeOffer}
          />
        </div>
      </div>
    </div>
  );
}

export default Cities;
