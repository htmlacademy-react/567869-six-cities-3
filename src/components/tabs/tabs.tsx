import { City } from '../../types/offer';

type TabsProps = {
  cities: City[];
  activeCity: City;
  onCityChange: (city: City) => void;
};

function Tabs({ cities, activeCity, onCityChange }: TabsProps): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <li
              className="locations__item"
              key={city.name}
            >
              <a
                className={`locations__item-link tabs__item ${city.name === activeCity.name
                  ? 'tabs__item--active'
                  : ''
                }`}
                href="#"
                onClick={(evt) => {
                  evt.preventDefault();
                  onCityChange(city);
                }}
              >
                <span>{city.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Tabs;
