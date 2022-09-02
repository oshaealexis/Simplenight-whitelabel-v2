import { formatAsSearchDate } from 'helpers/dajjsUtils';
import useQuery from 'hooks/pageInteraction/useQuery';
import { HotelSearchRequest } from 'hotels/types/request/HotelSearchRequest';
import {
  Hotel,
  HotelSearchResponse,
  MinRate,
  Rate,
} from 'hotels/types/response/SearchResponse';
import React, { createRef, ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import HorizontalItemCard from 'components/global/HorizontalItemCard/HorizontalItemCard';
import { useRouter } from 'next/router';
import HotelMapView from './HotelResultsMapView';
import EmptyState from '../../../components/global/EmptyState/EmptyState';
import EmptyStateIcon from 'public/icons/assets/empty-state.svg';
import { checkIfAnyNull } from 'helpers/arrayUtils';
import { getChildrenAges, parseQueryNumber } from 'helpers/stringUtils';
import { StringGeolocation } from 'types/search/Geolocation';
import { useSelector } from 'react-redux';
import { CustomWindow } from 'types/global/CustomWindow';
import Loader from '../../../components/global/Loader/Loader';
import { Room, createRoom } from 'hotels/helpers/room';
import HotelItemRateInfo from './HotelItemRateInfo';
import { sortByAdapter } from 'hotels/adapters/sort-by.adapter';
import { cancellationTypeAdapter } from 'hotels/adapters/cancellation-type.adapter';
import MapIcon from 'public/icons/assets/map.svg';
import ListIcon from 'public/icons/assets/list.svg';
import classnames from 'classnames';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';
import HotelFilterFormDesktop from './HotelFilterFormDesktop';
import PriceDisplay from 'hotels/components/PriceDisplay/PriceDisplay';
import HotelCancellable from './HotelCancellable';

declare let window: CustomWindow;

interface HotelResultsDisplayProps {
  HotelCategory: CategoryOption;
}

interface ViewButtonProps {
  children: ReactNode;
  viewParam: 'list' | 'map';
}

const HotelResultsDisplay = ({ HotelCategory }: HotelResultsDisplayProps) => {
  const [loaded, setLoaded] = useState(false);
  const { ClientSearcher: Searcher } = HotelCategory.core;
  const [t, i18next] = useTranslation('hotels');
  const hotelsFoundLabel = t('hotelsFound', 'Hotels Found');
  const hotelsFoundLabelDesktop = t('results', 'Results');
  const hotelLabel = t('hotel', 'Hotel');
  const noResultsLabel = t('noResultsSearch', 'No Results Match Your Search.');
  const fromLabel = t('from', 'From');
  const { language } = i18next;
  const router = useRouter();
  const setQueryParams = useQuerySetter();

  const {
    adults,
    children,
    startDate,
    endDate,
    latitude,
    longitude,
    rooms,
    keywordSearch,
    sortBy,
    paymentTypes,
    starRating,
    minPrice,
    maxPrice,
    roomsData,
    amenities,
  } = useQuery();

  const [hotels, setHotels] = useState<Hotel[]>([]);
  // It could be useful
  // const { memoizedFilterHotels } = useFilter(hotels, keywordSearch as string);

  const [currency, setCurrency] = useState<string>(window.currency);
  const storeCurrency = useSelector((state: any) => state.core.currency);

  useEffect(() => {
    if (currency !== storeCurrency) setCurrency(storeCurrency);
  }, [storeCurrency]);

  useEffect(() => {
    const hasEmptyValues = checkIfAnyNull([
      rooms,
      adults,
      children,
      startDate,
      endDate,
      latitude,
      longitude,
    ]);
    if (hasEmptyValues) return;

    const paramRoomsData = roomsData
      ? JSON.parse(roomsData as string)
      : [createRoom()];

    const geolocation = `${latitude},${longitude}`;

    const params: HotelSearchRequest = {
      rooms: parseQueryNumber(rooms ?? ''),
      adults: parseQueryNumber(adults ?? ''),
      children: parseQueryNumber(children ?? ''),
      start_date: formatAsSearchDate(startDate as unknown as string),
      end_date: formatAsSearchDate(endDate as unknown as string),
      dst_geolocation: geolocation as unknown as StringGeolocation,
      rsp_fields_set: 'basic',
      sort: sortByAdapter(sortBy as unknown as string),
      cancellation_type: cancellationTypeAdapter(
        paymentTypes as unknown as string,
      ),
      star_rating: starRating as string,
      min_price: minPrice as string,
      max_price: maxPrice as string,
      amenities: amenities as string,
    };

    if (parseQueryNumber(children as string)) {
      params.children_ages = getChildrenAges(paramRoomsData);
    }

    setLoaded(false);
    Searcher?.request(params, i18next)
      .then(({ hotels: searchedHotels }: HotelSearchResponse) => {
        setHotels(searchedHotels);
      })
      .catch((error) => console.error(error))
      .then(() => setLoaded(true));
  }, [
    adults,
    children,
    startDate,
    endDate,
    latitude,
    longitude,
    rooms,
    language,
    currency,
    sortBy,
    starRating,
    minPrice,
    maxPrice,
    amenities,
  ]);

  const handleOnViewDetailClick = (hotel: Hotel) => {
    const { id } = hotel;
    router.push(
      `/detail/hotels/${id}?adults=${adults}&children=${children}&startDate=${startDate}&endDate=${endDate}&geolocation=${latitude},${longitude}&rooms=${rooms}&roomsData=${roomsData}`,
    );
  };

  const HotelList = () => (
    <ul role="list" className="space-y-4">
      {hotels.map((hotel, index) => {
        const {
          details: { name, address, star_rating: starRating },
          min_rate_room: minRateRoom,
          thumbnail,
        } = hotel;

        const itemKey = hotel.id + index;
        const minRate = minRateRoom.rates.min_rate;
        const formattedLocation = `${address?.address1}, ${address?.country_code}, ${address?.postal_code}`;

        return (
          <HorizontalItemCard
            key={itemKey}
            icon={HotelCategory.icon}
            categoryName={hotelLabel}
            handleOnViewDetailClick={() => handleOnViewDetailClick(hotel)}
            item={hotel}
            title={name}
            image={thumbnail}
            price={<HotelItemRateInfo minRate={minRate} />}
            address={formattedLocation}
            className=" flex-0-0-auto"
            rating={parseInt(starRating)}
            priceDisplay={
              <PriceDisplay
                rate={minRate?.rate as Rate}
                totalLabel={fromLabel}
              />
            }
            cancellable={<HotelCancellable minRate={minRate as MinRate} />}
          />
        );
      })}
    </ul>
  );
  const { view = 'list' } = useQuery();
  const isListView = view === 'list';

  const ViewButton = ({ children, viewParam }: ViewButtonProps) => {
    const active = viewParam === 'list' ? isListView : !isListView;
    const onClick = () => {
      setQueryParams({
        view: viewParam,
      });
    };
    return (
      <button
        onClick={onClick}
        className={classnames(
          'h-[2.75rem] w-[2.75rem] grid place-content-center',
          {
            'bg-white text-primary-1000': !active,
            'bg-primary-1000 text-white': active,
          },
        )}
      >
        {children}
      </button>
    );
  };

  const ViewActions = () => {
    return (
      <section className="flex rounded-4 overflow-hidden w-[5.5rem] border border-primary-1000">
        <ViewButton viewParam="list">
          <ListIcon className="w-[1.3rem] h-[1.3rem]" />
        </ViewButton>
        <ViewButton viewParam="map">
          <MapIcon className="w-[1.3rem] h-[1.3rem]" />
        </ViewButton>
      </section>
    );
  };

  const LoaderAndEmpty = () => (
    <>
      {!loaded ? (
        <Loader />
      ) : (
        <EmptyState
          text={noResultsLabel}
          image={<EmptyStateIcon className="mx-auto" />}
        />
      )}
    </>
  );

  const hasNoHotels = hotels.length === 0;

  return (
    <>
      <section className="lg:flex lg:w-full">
        <section className="hidden lg:block lg:min-w-[16rem] lg:max-w[18rem] lg:w-[25%] lg:mr-8">
          <HotelFilterFormDesktop />
        </section>
        <section className="lg:flex-1 lg:w-[75%] h-full">
          {!loaded || hasNoHotels ? (
            <LoaderAndEmpty />
          ) : (
            <>
              {isListView && (
                <section className="w-full h-full px-5 pb-6 lg:px-0">
                  <section className="py-6 text-dark-1000 font-semibold text-[20px] leading-[24px] lg:flex lg:justify-between lg:items-center">
                    <span>
                      {hotels.length}
                      <span className="lg:hidden"> {hotelsFoundLabel}</span>
                      <span className="hidden lg:inline">
                        {' '}
                        {hotelsFoundLabelDesktop}
                      </span>
                    </span>
                    <section className="hidden lg:block">
                      <ViewActions />
                    </section>
                  </section>
                  <HotelList />
                </section>
              )}
              {!isListView && (
                <section className="relative">
                  <section className="hidden lg:block absolute z-[1] right-6 top-6">
                    <ViewActions />
                  </section>
                  <HotelMapView
                    HotelCategory={HotelCategory}
                    items={hotels}
                    onViewDetailClick={handleOnViewDetailClick}
                  />
                </section>
              )}
            </>
          )}
        </section>
      </section>
    </>
  );
};

export default HotelResultsDisplay;
