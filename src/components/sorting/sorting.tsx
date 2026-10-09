import { useState } from 'react';
import clsx from 'clsx';
import { SortType } from '../../const';

type SortingProps = {
  currentSort: SortType;
  onSortTypeChange: (sortType: SortType) => void;
};

const sortTypes = Object.values(SortType);

function Sorting({ currentSort, onSortTypeChange }: SortingProps): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);

  const handleSortClick = () => {
    setIsOpened(!isOpened);
  };

  const handleOptionClick = (sortType: SortType) => {
    onSortTypeChange(sortType);
    setIsOpened((false));
  };

  const optionsClassName = clsx(
    'places__options',
    'places__options--custom',
    {
      'places__options--opened': isOpened,
    }
  );

  const getOptionClassName = (sortType: SortType) => clsx(
    'places__option',
    {
      'places__option--active': currentSort === sortType,
    }
  );

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleSortClick}>
        {currentSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={optionsClassName}>
        {sortTypes.map((sortType) => (
          <li
            key={sortType}
            className={getOptionClassName(sortType)}
            tabIndex={0}
            onClick={() => handleOptionClick(sortType)}
          >
            {sortType}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sorting;
