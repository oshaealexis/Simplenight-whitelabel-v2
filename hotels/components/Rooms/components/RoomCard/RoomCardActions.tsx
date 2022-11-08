import { useTranslation } from 'react-i18next';
import { Room } from 'hotels/types/response/SearchResponse';
import Button from 'components/global/Button/Button';
import { addToCart } from 'core/client/services/CartClientService';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { usePlural } from 'hooks/stringBehavior/usePlural';

interface RoomProps {
  room: Room;
  hotelId: string;
  rooms?: number;
}

const RoomCardActions = ({ room, hotelId, rooms = 1 }: RoomProps) => {
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(false);

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const store = {
    state,
    dispatch,
  };
  const bookingCode = room.rates.min_rate.sn_booking_code;
  const itemToBook = {
    sn_booking_code: bookingCode,
  };
  const [t, i18next] = useTranslation('hotels');
  const addToItineraryText = t('addToItinerary', 'Add to Itinerary');
  const bookText = t('book', 'Book');
  const tRoom = t('room', 'Room');
  const tRooms = t('rooms', 'Rooms');
  const ROOM_TEXT = usePlural(rooms, tRoom, tRooms);

  const handleAction = async (url: string) => {
    setIsDisabled(true);
    await addToCart(itemToBook, i18next, store);
    router.replace(url);
  };

  return (
    <footer className="px-4 py-4">
      <section className="grid grid-cols-2 gap-3">
        <Button
          value={addToItineraryText}
          size="full"
          type="outlined"
          textColor="primary"
          onClick={() => handleAction('/itinerary')}
          className="text-base font-semibold leading-base"
          disabled={isDisabled}
        />
        <Button
          value={`${bookText} ${rooms} ${ROOM_TEXT}`}
          size="full"
          onClick={() => handleAction('/checkout/client')}
          className="text-base font-semibold leading-base"
          disabled={isDisabled}
        />
      </section>
    </footer>
  );
};

export default RoomCardActions;
