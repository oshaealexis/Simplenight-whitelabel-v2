import { useTranslation } from 'react-i18next';

interface PriceBreakdownProps {
  numberTickets: number;
  totalBeforeDiscount: string;
  percentageToApply: string;
  totalAmount: string;
}

const PriceBreakdown = ({
  numberTickets,
  totalBeforeDiscount,
  percentageToApply,
  totalAmount,
}: PriceBreakdownProps) => {
  const [tg] = useTranslation('global');
  const ticketsLabel = tg('tickets', 'Tickets');
  return (
    <section className="flex justify-between items-center">
      <section className="text-sm">
        {numberTickets} {ticketsLabel}
      </section>
      <section className="text-right text-xs">
        <p>
          <span className="text-dark-700 line-through font-normal">
            {totalBeforeDiscount}
          </span>
          <span className="text-green-1000 font-semibold">
            {percentageToApply} Off
          </span>
        </p>
        <p className="leading-[22px] text-dark-1000">
          <span className="text-base font-semibold">{totalAmount}</span>
        </p>
      </section>
    </section>
  );
};

export default PriceBreakdown;
