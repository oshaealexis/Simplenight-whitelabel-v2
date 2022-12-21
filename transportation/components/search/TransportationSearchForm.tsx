import dayjs from 'dayjs';
import { useState, useMemo, FC } from 'react';
import DatePicker from '../../../components/global/Calendar/Calendar';
import Calendar from 'public/icons/assets/calendar.svg';
import IconInput from 'components/global/Input/IconInput';
import Button from 'components/global/Button/Button';
import { SearchFormProps } from 'types/search/SearchFormProps';
import useQuerySetter from 'hooks/pageInteraction/useQuerySetter';
import LocationInput from 'components/global/Input/LocationInput';
import useQuery from 'hooks/pageInteraction/useQuery';
import { formatAsDisplayDate } from 'helpers/dajjsUtils';
import {
  StringGeolocation,
  latLngProp,
  LATITUDE_INDEX,
  LONGITUDE_INDEX,
} from 'types/search/Geolocation';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { fromLowerCaseToCapitilize } from '../../../helpers/stringUtils';
import { Select } from '../../../components/global/SelectNew/Select';
import Clock from '../../../public/icons/assets/clock.svg';
import TransportPin from 'public/icons/assets/transport.svg';
import NumberInput from 'components/global/Input/NumberInput';
import Checkbox from 'components/global/Checkbox/Checkbox';
import Label from 'components/global/Label/Label';
import {
  formatAsSearchDate,
} from '../../../helpers/dajjsUtils';
import MultiplePersons from 'public/icons/assets/multiple-persons.svg';
import TravelersInput from './TravelersInput/TravelersInput';
import LocationPin from 'public/icons/assets/location-pin.svg';

const ceilToNextHalfHour = (date: dayjs.Dayjs): dayjs.Dayjs => {
  const minutes = date.get('minutes');

  if (minutes > 30) {
    return date.startOf('hour').add(1, 'hour');
  } else {
    return date.set('minutes', 30);
  }
};

export const TransportationSearchForm: FC<SearchFormProps> = ({ setIsSearching, className = '', hasReRoute = false, slug = '', }) => {
  const router = useRouter();

  const thirtyMinutesFromNow = dayjs().add(30, 'minutes').startOf('minutes');
  const twoHoursAndThirtyMinutes = thirtyMinutesFromNow.add(2, 'hours');
  const start = ceilToNextHalfHour(thirtyMinutesFromNow).format('hhmm');
  const end = ceilToNextHalfHour(twoHoursAndThirtyMinutes).format('hhmm');

  const [t] = useTranslation('ground-transportation');
  const pickUpLocationPlaceholder = t('pickUpLocationPlaceholder', 'Location');
  const dropOffLocationPlaceholder = t('dropOffLocationPlaceholder', 'Location');
  const pickUpInputLabel = t('locationInputLabel', 'Pick-Up');
  const dropOffInputLabel = t('locationInputLabel', 'Drop-Off');
  const textSearch = t('search', 'Search');
  const startDateText = t('startDate', 'Date');
  const endDateText = t('endDate', 'Date');
  const startTimeText = t('startTime', 'Time');
  const endTimeText = t('endTime', 'Time');

  const params = useQuery();
  const setQueryParam = useQuerySetter();
  const [pickUpAddress, setPickUpAddress] = useState<string | undefined>(
    params.address ? (params.address as string) : '',
  );

  const [dropOffAddress, setDropOffAddress] = useState<string | undefined>(
    params.address2 ? (params.address2 as string) : '',
  );

  const [pickUpGeolocation, setPickUpGeolocation] = useState<StringGeolocation>(
    `${parseFloat(params.latitude as string)},${parseFloat(
      params.longitude as string,
    )}`,
  );
  const [dropOffGeolocation, setDropOffGeolocation] = useState<StringGeolocation>(
    `${parseFloat(params.latitude2 as string)},${parseFloat(
      params.longitude2 as string,
    )}`,
  );

  const [startDate, setStartDate] = useState<string>(
    params.startDate ? params.startDate.toString() : formatAsSearchDate(thirtyMinutesFromNow),
  );
  const [endDate, setEndDate] = useState<string>(
    params.endDate ? params.endDate.toString() : formatAsSearchDate(twoHoursAndThirtyMinutes));

  const timeList = useMemo(() => {
    const today = dayjs().startOf('day');
    return Array(48)
      .fill(5)
      .map((_, index) => {
        const thirtyMinutesMore: any = today.add(30 * index, 'minutes');
        return {
          label: thirtyMinutesMore.format('hh:mm a'),
          value: thirtyMinutesMore.format('HHmm'),
        };
      });
  }, []);

  const [startTime, setStartTime] = useState<string>(
    params.startTime
      ? params.startTime.toString()
      : timeList.find((item) => item.value === start)?.value || ''
  );
  const [endTime, setEndTime] = useState<string>(
    params.endTime
      ? params.endTime.toString()
      : timeList.find((item) => item.value === end)?.value || '',
  );
  const [passengers, setPassengers] = useState(
    params.passengers ? Number(params.passengers) : 1
  );
  const passengersLabel = t('passengers', passengers >= 2 ? 'Passengers' : 'Passenger');

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [clickOnStart, setClickOnStart] = useState(false);
  const [pickUpShowLocationError, setPickUpShowLocationError] = useState(false);
  const [dropOffShowLocationError, setDropOffShowLocationError] = useState(false);
  const [showTravelersInput, setShowTravelersInput] = useState(false);
  const [checked, setChecked] = useState(params.returnTrip ? (params.returnTrip == 'true' ? true : false) : false);

  const handleStartDateChange = (value: string) => {
    setStartDate(value);
  };

  const handleEndDateChange = (value: string) => {
    setEndDate(value);
  };
  const handleEndTimeChange = (endTime: string) => {
    setEndTime(endTime);
  };
  const handleSaveLastSearch = (value: string): void => {
    localStorage.setItem('lastSearch', value);
  };

  const rerouteToSearchPage = () => {
    const route = `/search/${slug
      }?startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime
      }&latitude=${pickUpGeolocation?.split(',')[LATITUDE_INDEX]}&longitude=${pickUpGeolocation?.split(',')[LONGITUDE_INDEX]}&address=${pickUpAddress
      }&latitude2=${dropOffGeolocation?.split(',')[LATITUDE_INDEX]}&longitude2=${dropOffGeolocation?.split(',')[LONGITUDE_INDEX]}&address2=${dropOffAddress
      }&returnTrip=${checked}&passengers=${passengers}`;

    handleSaveLastSearch(route);
    router.push(route);
  };

  const handleChangePickUpLocation = () => {
    setPickUpShowLocationError(false);
  };
  const handleChangeDropOffLocation = () => {
    setDropOffShowLocationError(false);
  };
  const geolocationPickUpIsNull = pickUpGeolocation === `${NaN},${NaN}`;
  const geolocationDropOffIsNull = dropOffGeolocation === `${NaN},${NaN}`;

  const handleSearchClick = () => {
    if (hasReRoute) {
      if (geolocationPickUpIsNull) {
        setPickUpShowLocationError(true);
      }
      if (geolocationDropOffIsNull) {
        setDropOffShowLocationError(true);
      }
      if (geolocationPickUpIsNull || geolocationDropOffIsNull) {
        return;
      }
      rerouteToSearchPage();
      return;
    }

    setQueryParam({
      startDate,
      startTime,
      endDate,
      endTime,
      address: pickUpAddress as string,
      geolocation: pickUpGeolocation ?? '',
      latitude: pickUpGeolocation?.split(',')[LATITUDE_INDEX] ?? '',
      longitude: pickUpGeolocation?.split(',')[LONGITUDE_INDEX] ?? '',
      address2: dropOffAddress as string,
      geolocation2: dropOffGeolocation ?? '',
      latitude2: dropOffGeolocation?.split(',')[LATITUDE_INDEX] ?? '',
      longitude2: dropOffGeolocation?.split(',')[LONGITUDE_INDEX] ?? '',
      returnTrip: `${checked}`,
      passengers: `${passengers}`
    });
    if (setIsSearching) setIsSearching(false);
  };

  const handleSelectPickUpLocation = (latLng: latLngProp, address: string) => {
    const newGeolocation: StringGeolocation = `${latLng.lat},${latLng.lng}`;
    setPickUpGeolocation(newGeolocation);
    setPickUpAddress(address);
  };
  const handleSelectDropOffLocation = (latLng: latLngProp, address2: string) => {
    const newGeolocation: StringGeolocation = `${latLng.lat},${latLng.lng}`;
    setDropOffGeolocation(newGeolocation);
    setDropOffAddress(address2);
  };

  const handleClearPickUpLocation = () => {
    setPickUpGeolocation(`${NaN},${NaN}`);
    setPickUpAddress('');
  };

  const handleClearDropOffLocation = () => {
    setDropOffGeolocation(`${NaN},${NaN}`);
    setDropOffAddress('');
  };


  return (
    <section className={`flex flex-col justify-between ${className} lg:flex-row lg:justify-start lg:items-start lg:pb-0 lg:px-0 lg:gap-2 lg:w-full`}>
      <section className='flex flex-col gap-4 lg:flex lg:flex-col lg:justify-start lg:pb-0 lg:px-0 lg:gap-1 lg:w-[90%]'>
        <section className="flex flex-col lg:flex lg:flex-row lg:items-end lg:w-full">
          <section className="flex flex-col gap-2 lg:flex-row lg:w-full">
            <section className="w-full lg:flex lg:flex-row lg:items-end lg:w-1/2 lg:gap-2">
              <section className="w-full lg:w-[40%]">
                <LocationInput
                  label={pickUpInputLabel}
                  icon={<LocationPin />}
                  name="location"
                  placeholder={pickUpLocationPlaceholder}
                  routeParams={['address']}
                  defaultValue={pickUpAddress}
                  onSelect={handleSelectPickUpLocation}
                  error={pickUpShowLocationError}
                  onChange={handleChangePickUpLocation}
                  clearable={true}
                  onClear={handleClearPickUpLocation}
                />
              </section>
              <section className="relative flex gap-2 lg:mt-0 lg:w-[60%]">
                <IconInput
                  name="Check-in"
                  className='w-full lg:w-full'
                  placeholder={startDateText}
                  orientation="left"
                  icon={<Calendar className="w-5 h-5 text-dark-700 lg:w-full" />}
                  value={fromLowerCaseToCapitilize(formatAsDisplayDate(startDate))}
                  onChange={(event) => {
                    handleStartDateChange(event.target.value)
                  }}
                  onClick={() => {
                    setClickOnStart(true);
                    setShowDatePicker(true);
                  }}
                />
                <Select
                  name="Check-in-time"
                  value={startTime}
                  placeholder={startTimeText}
                  onChange={setStartTime}
                  items={timeList}
                  icon={<Clock className="w-5 h-5 text-dark-700 lg:w-full" />}
                />
              </section>
            </section>
            <section className="w-full lg:flex lg:flex-row lg:items-end lg:w-1/2 lg:gap-2">
              <section className={`w-full ${checked ? 'lg:w-[40%]' : 'lg:w-full'}`}>
                <LocationInput
                  icon={<TransportPin className="w-5 h-5 text-dark-700 lg:w-full" />}
                  label={dropOffInputLabel}
                  name="location2"
                  routeParams={['address2']}
                  defaultValue={dropOffAddress}
                  placeholder={dropOffLocationPlaceholder}
                  onSelect={handleSelectDropOffLocation}
                  error={dropOffShowLocationError}
                  onChange={handleChangeDropOffLocation}
                  clearable={true}
                  onClear={handleClearDropOffLocation}
                />
              </section>
              {checked &&
                <section className="relative flex gap-2 lg:mt-0 lg:w-[60%]">
                  <IconInput
                    name="Check-in"
                    placeholder={endDateText}
                    className='w-full lg:w-full'
                    orientation="left"
                    icon={<Calendar className="w-5 h-5 text-dark-700 lg:w-full" />}
                    value={fromLowerCaseToCapitilize(formatAsDisplayDate(endDate))}
                    onChange={(event) => handleStartDateChange(event.target.value)}
                    onClick={() => {
                      setClickOnStart(true);
                      setShowDatePicker(true);
                    }}
                  />
                  <Select
                    name="Check-out-time"
                    value={endTime}
                    placeholder={endTimeText}
                    onChange={handleEndTimeChange}
                    items={timeList}
                    icon={<Clock className="w-5 h-5 text-dark-700 lg:w-full" />}
                  />
                </section>
              }
            </section>
            <DatePicker
              showDatePicker={showDatePicker}
              onClose={() => setShowDatePicker(false)}
              startDateLabel={'Check-In'}
              endDateLabel={'Check-Out'}
              initialStartDate={startDate}
              initialEndDate={endDate}
              onStartDateChange={handleStartDateChange}
              onEndDateChange={handleEndDateChange}
              openOnStart={clickOnStart ? true : false}
            />
          </section>
        </section >
        <section className="flex flex-col-reverse justify-start items-start gap-2 lg:flex lg:flex-row lg:w-[90%] lg:justify-start lg:items-center lg:gap-2">
          <section className='flex flex-row items-center lg:flex lg:flex-row lg:items-center'>
            <Checkbox checked={checked} onChange={() => setChecked(!checked)} />
            <Label value={'Return Trip'} />
          </section>
          <TravelersInput
            showTravelersInput={showTravelersInput}
            onClose={() => setShowTravelersInput(false)}
            children={
              <NumberInput
                label={passengersLabel}
                value={passengers}
                onChange={setPassengers}
                min={1}
                max={9}
                disabled
              />
            }
          />
          <section className="w-full flex flex-row justify-start lg:mt-0 lg:w-fit lg:flex lg:flex-row lg:justify-center lg:items-center">
            <button
              onClick={() => setShowTravelersInput(true)}
              className="flex flex-row justify-start items-center gap-2 bg-white rounded border border-gray-300 w-full h-11 py-2 px-[13px] text-sm text-dark-1000 cursor-default lg:w-full lg:flex lg:flex-row lg:justify-start lg:items-center lg:gap-2"
            >
              <MultiplePersons className="text-dark-700" />
              {passengers} {' '} {passengersLabel}
            </button>
          </section>
        </section>
      </section>
      <section className="w-full flex flex-col items-center justify-start lg:flex lg:flex-col lg:justify-start lg:w-[10%]">
        <label className="text-transparent">Button</label>
        <Button
          key="hotels.searchBtn"
          size="full"
          className="min-w-full text-base mt-2"
          value={textSearch}
          onClick={handleSearchClick}
        />
      </section>
    </section >
  );
};