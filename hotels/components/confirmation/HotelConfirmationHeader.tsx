import { ReactElement } from 'react';
import { Item } from 'types/booking/bookingType';
import { useTranslation } from 'react-i18next';
import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import ExternalLink from 'components/global/ExternalLink/ExternalLink';

interface HotelConfirmationHeaderProps {
  item?: Item;
  icon: ReactElement;
}

const HotelConfirmationHeader = ({
  item,
  icon,
}: HotelConfirmationHeaderProps) => {
  const [t, i18next] = useTranslation('hotels');
  const hotelName = item?.name;
  const roomsAmount = item?.extra_data?.items?.length;
  const roomsLabel = t('rooms', 'Rooms');
  const roomsFormatted = `${roomsAmount} ${roomsLabel}`;
  const hotelId = item?.extra_data?.id;
  const startDate = item?.extra_data?.start_date;
  const endDate = item?.extra_data?.end_date;
  const rooms = item?.extra_data?.items?.length;
  const detailHref = `/detail/hotels/${hotelId}?startDate=${startDate}&endDate=${endDate}&rooms=${rooms}`;
  return (
    <section className="flex flex-row gap-3">
      <IconRoundedContainer className="bg-primary-1000">
        <div className="text-white">{icon}</div>
      </IconRoundedContainer>
      <section className="grid gap-1">
        <ExternalLink
          href={detailHref}
          className="font-semibold text-dark-1000 underline underline-offset-4 decoration-1 text-[18px] leading-[22px] "
        >
          {hotelName}
        </ExternalLink>
        <section className="font-semibold text-dark-800 text-[16px] leading-[22px]">
          {roomsFormatted}
        </section>
      </section>
    </section>
  );
};

export default HotelConfirmationHeader;
