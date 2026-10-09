import { useState } from 'react';
import { City, Offer } from '../../types/offer';
import PlaceCard from '../place-card';
import Map from '../map';
import { SortType } from '../../const';
import Sorting from '../sorting';
import { getSortedOffers } from '../../utils/sort-offers';

type CitiesProps = {
  city: City;
  offers: Offer[];
};

function Cities({ city, offers }: CitiesProps): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<Offer>();
  const [activeSort, setActiveSort] = useState<SortType>(SortType.Popular);
  const sortedOffers = getSortedOffers(offers, activeSort);

  const handleHover = (offer?: Offer) => {
    setActiveOffer(offer);
  };

  const handleSortChange = (sortType: SortType) => {
    setActiveSort(sortType);
  };

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} places to stay in {city.name}</b>
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
