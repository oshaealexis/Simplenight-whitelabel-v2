import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Quote } from 'transportation/types/response/TransportationSearchResponse';
import LocationPin from '@/icons/assets/location-pin.svg';
import Calendar from 'public/icons/assets/calendar.svg';
import useQuery from '../../../hooks/pageInteraction/useQuery';
import { fromLowerCaseToCapitilize } from '../../../helpers/stringUtils';
import { formatAsDisplayDatetime } from '../../../helpers/dajjsUtils';

interface TransportationDetailProps {
    transportation: Quote;
}

export const TransportationDetailsInformation: FC<TransportationDetailProps> = ({
    transportation,
}) => {
    const [t] = useTranslation('ground-transportation');


    return (
        <section className='px-8 py-4 lg:flex lg:flex-row lg:w-full lg:justify-center lg:items-center'>
            <section className="min-w-[45%] min-h-[150px] lg:min-w-[15rem] lg:min-h-[11.3rem] "
                style={{
                    backgroundImage: `url(${transportation?.service_info?.photo_url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                }}
            />
            <section className='p-8 pl-12 lg:flex lg:flex-col lg:w-[50%] lg:h-full lg:gap-3'>
                <section className='lg:flex lg:flex-col lg:gap-1'>
                    <header className=" font-semibold text-dark-1000 text-base leading-[22px] lg:text-lg break-words">
                        {capitalizeFirst(transportation?.service_info?.vehicle_type)}
                    </header>
                    <section className="text-dark-1000">{capitalizeFirst(transportation?.service_info?.service_class)}</section>
                </section>
                <Summary />
            </section>
        </section>

    );
};

const capitalizeFirst = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const Summary: FC = () => {
    const {
        startDate: startDateQuery,
        startTime: startTimeQuery,
        endDate: endDateQuery,
        endTime: endTimeQuery,
        address,
        address2
    } = useQuery();
    const startDate = formatAsDisplayDatetime(
        `${startDateQuery} ${startTimeQuery}`,
    );
    const endDate = formatAsDisplayDatetime(`${endDateQuery} ${endTimeQuery}`);

    return (
        <section className="grid gap-2 font-normal text-dark-1000">
            <section className="flex gap-2">
                <section className="grid w-6 place-items-center">
                    <LocationPin className="text-primary-1000" />
                </section>
                <span>{address?.toString().split(', ')[0]} - {address2?.toString().split(', ')[0]}</span>
            </section>
            <section className="flex gap-2">
                <section className="grid w-6 place-items-center">
                    <Calendar className="text-primary-1000" />
                </section>
                <section>
                    <span>{fromLowerCaseToCapitilize(startDate)} to {fromLowerCaseToCapitilize(endDate)}</span>
                </section>
            </section>
        </section>
    );
};