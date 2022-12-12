import { ReactElement } from 'react';
import { Item } from 'types/booking/bookingType';
import { useTranslation } from 'react-i18next';
import IconRoundedContainer from 'components/global/IconRoundedContainer/IconRoundedContainer';
import ExternalLink from 'components/global/ExternalLink/ExternalLink';

interface CarConfirmationHeaderProps {
  item?: Item;
  icon: ReactElement;
}

const CarConfirmationHeader = ({ item, icon }: CarConfirmationHeaderProps) => {
  const [t, i18next] = useTranslation('cars');
  const carName = item?.name;
  const roomsAmount = item?.quantity;
  const room = t('room', 'Room');
  const rooms = t('rooms', 'Rooms');
  const roomsLabel = item?.room_qty == 1 ? room : rooms;
  const roomsFormatted = `${roomsAmount} ${roomsLabel}`;

  const carId = item?.extra_data?.id;
  const startDate = item?.extra_data?.start_date;
  const endDate = item?.extra_data?.end_date;
  const detailHref = `/detail/car-rental/${carId}?startDate=${startDate}&endDate=${endDate}&rooms=${roomsAmount}`;

  return (
    <section className="flex flex-row gap-3">
      <IconRoundedContainer className="bg-primary-1000">
        <div className="text-white">{icon}</div>
      </IconRoundedContainer>
      <section className="grid gap-1">
        <ExternalLink
          href={detailHref}
          className="font-semibold text-dark-1000 underline underline-offset-4 decoration-1 text-base leading-[22px] lg:text-lg leading-[26px]"
        >
          {carName}
        </ExternalLink>
        <section className="font-semibold text-dark-800 text-[16px] leading-[22px]">
          {roomsFormatted}
        </section>
      </section>
    </section>
  );
};

export default CarConfirmationHeader;
