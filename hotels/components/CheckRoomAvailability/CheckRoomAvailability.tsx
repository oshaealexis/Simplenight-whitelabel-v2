import FullScreenModal from '../../../components/global/NewModal/FullScreenModal';
import CheckInOutInput, {
  useCheckInOutInput,
  UseCheckInOutInputPropsComponentReturn,
} from 'components/global/CheckInOutInput/CheckInOutInput';
import { useTranslation } from 'react-i18next';

interface CheckRoomProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CheckRoomAvailability = ({ open, setOpen }: CheckRoomProps) => {
  const [t] = useTranslation('hotels');
  const title = t('checkRoomAvailability', 'Check Room Availability');
  const onClose = () => setOpen(false);
  const [checkInOutProps, startDate, endDate] = useCheckInOutInput();
  const onApply = () => {
    // apply here
  };

  const {
    showDatePicker,
    handleStartDateChange,
    handleEndDateChange,
    handleOpenDatePicker,
    handleCloseDatePicker,
  } = checkInOutProps as UseCheckInOutInputPropsComponentReturn;

  return (
    <FullScreenModal
      open={open}
      closeModal={onClose}
      title={title}
      primaryButtonText="Check Availability"
      primaryButtonAction={onApply}
    >
      <section className="px-5 py-3 h-full">
        <CheckInOutInput
          showDatePicker={showDatePicker}
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
          handleOpenDatePicker={handleOpenDatePicker}
          handleCloseDatePicker={handleCloseDatePicker}
          startDate={startDate as string}
          endDate={endDate as string}
        />
      </section>
    </FullScreenModal>
  );
};

export default CheckRoomAvailability;
