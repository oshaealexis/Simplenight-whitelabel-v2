import { Dispatch, SetStateAction } from 'react';

import { Item, PrimaryContact } from 'types/booking/bookingType';
import CarGeneralInfo from './CarGeneralInfo';
import CarCustomerInfo from './CarCustomerInfo';
import CarRoomsInfo from './CarRoomsInfo';

interface CarConfirmationBodyProps {
  item?: Item;
  primaryContact?: PrimaryContact;
  loading?: boolean;
  setLoading?: Dispatch<SetStateAction<boolean>>;
}

const CarConfirmationBody = ({
  item,
  primaryContact,
  loading,
  setLoading,
}: CarConfirmationBodyProps) => {
  return (
    <section className="ml-[52px] border-t lg:border-0 border-dark-300">
      <CarCustomerInfo item={item} primaryContact={primaryContact} />
      <CarGeneralInfo item={item} />
      <CarRoomsInfo item={item} loading={loading} setLoading={setLoading} />
    </section>
  );
};

export default CarConfirmationBody;