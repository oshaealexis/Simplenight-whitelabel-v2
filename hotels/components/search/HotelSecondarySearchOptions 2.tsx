import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'components/global/Button/Button';
import IconInput from 'components/global/Input/IconInput';
import FullScreenModal from 'components/global/NewModal/FullScreenModal';

import FilterIcon from 'public/icons/assets/filter.svg';
import SearchIcon from 'public/icons/assets/magnifier.svg';
import Label from 'components/global/Label/Label';
import Rating from 'components/global/Rating/Rating';

const Divider = ({ className }: { className?: string }) => (
  <hr className={className} />
);

const INITIAL_RATING_VALUE = 3;
const HotelSecondarySearchOptions = () => {
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(INITIAL_RATING_VALUE);

  const [t, i18n] = useTranslation('hotels');
  const filtersLabel = t('filters', 'Filters');
  const applyFiltersLabel = t('applyFilters', 'Apply Filters');
  const keywordSearchLabel = t('keywordSearch', 'Keyword Search');
  const searchKeywordPlaceholder = t(
    'searchKeywordPlaceholder',
    'Hotel Name, Landmark, Location, etc.',
  );
  const starRatingLabel = t('starRating', 'Star Rating');

  const handleFilterButtonClick = () => {
    setFilterModalOpen(true);
  };

  const handleRatingFilterChange = (newRating: number) => {
    setRatingValue(newRating);
  };

  const FilterTitle = ({ label }: { label: string }) => (
    <label className="mb-2">{label}</label>
  );

  const FilterContainer = ({ children }: { children?: any }) => (
    <section className="px-4 mt-4 mb-6 flex flex-col">{children}</section>
  );

  const KeywordSearchFilter = () => (
    <FilterContainer>
      <FilterTitle label={keywordSearchLabel} />
      <IconInput
        value=""
        placeholder={searchKeywordPlaceholder}
        icon={<SearchIcon className="text-dark-700" />}
      />
    </FilterContainer>
  );

  const RatingFilter = () => (
    <FilterContainer>
      <FilterTitle label={starRatingLabel} />
      <Rating
        value={ratingValue}
        onChange={handleRatingFilterChange}
        editable
      />
    </FilterContainer>
  );

  const FilterForm = () => (
    <section className="py-4">
      <KeywordSearchFilter />
      <Divider className="my-6" />
      <RatingFilter />
    </section>
  );

  const Modals = () => (
    <>
      <FullScreenModal
        open={isFilterModalOpen}
        closeModal={() => setFilterModalOpen(false)}
        title={filtersLabel}
        textButton={applyFiltersLabel}
        applyModal={() => setFilterModalOpen(false)}
      >
        <FilterForm />
      </FullScreenModal>
    </>
  );

  return (
    <section className="px-4 w-full flex gap-2 pt-4 ">
      <Button
        value="Filters"
        size="full"
        icon={<FilterIcon />}
        onClick={handleFilterButtonClick}
      />
      <Button value="Map view" size="full" type="outlined" />
      <Modals />
    </section>
  );
};

export default HotelSecondarySearchOptions;
