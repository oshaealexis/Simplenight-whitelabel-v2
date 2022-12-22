import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import AmountDetailItem from './components/AmountDetailItem';
import ExtraDetailItem from './components/ExtraDataItem';
import AdultChildrenAmount from '../AdultChildrenAmount/AdultChildrenAmount';
import ExternalLink from 'components/global/ExternalLink/ExternalLink';
import { Rate } from '../../../types/booking/bookingType';
import PlusIcon from 'public/icons/assets/Plus.svg';
import { MinRateRate } from 'hotels/types/response/CartHotels';

interface RoomPriceBreakdownProps {
  total?: string;
  taxesAndFees?: string;
  resortFees?: string;
  cancellationPolicy?: string;
  amenities?: string;
  adultsCount?: number;
  childrenCount?: number;
  childrenAges?: string[];
  instructions?: React.ReactNode;
  termsOfService?: string | null;
  rate?: Rate | MinRateRate;
  isPriceBase?: boolean;
}

const RoomPriceBreakdown = ({
  total,
  taxesAndFees,
  resortFees,
  cancellationPolicy,
  amenities,
  adultsCount = 2,
  childrenCount = 0,
  childrenAges = [],
  instructions,
  termsOfService,
  rate,
  isPriceBase,
}: RoomPriceBreakdownProps) => {
  const [t, i18next] = useTranslation('hotels');
  const resortFeeLabel = t('resortFee', 'Resort Fee');
  const payNowLabel = t('payNow', 'Pay now');
  const priceIncludesLabel = t('priceIncludes', 'Price Includes');
  const payAtPropertyLabel = t('payAtProperty', 'Pay at property');
  const basePriceLabel = t('basePrice', 'Base Price');
  const cancellationPolicyLabel = t(
    'cancellationPolicy',
    'Cancellation Policy',
  );
  const estimationLabel = t(
    'estimationTax',
    'Estimation based on the current exchange rate, may change before your stay',
  );
  const approxLabel = t('approx', 'Approx');

  const [showLocalCurrency, setShowLocalCurrency] = useState(false);
  useEffect(() => {
    setShowLocalCurrency(
      rate?.rate_breakdown.post_paid_rate?.taxes[0]?.tax_amount.currency !=
        rate?.rate_breakdown.post_paid_rate?.taxes[0]?.tax_original_amount
          ?.currency,
    );
  }, [rate]);

  const baseBeforeApply =
    rate?.rate_breakdown?.discounts?.base_amount_before_apply;
  const totalBeforeApply =
    rate?.rate_breakdown.discounts?.total_amount_before_apply;

  const BasePrice = () => (
    <section className="flex justify-between">
      <section className="flex flex-row gap-1">
        <section className="flex flex-row gap-1 lg:gap-3">
          <PlusIcon className="h-3.5 lg:h-4 lg:w-4 ml-0.5 mr-1 mt-1 text-primary-1000" />
          <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-1000">
            {basePriceLabel}
          </p>
        </section>
      </section>

      <section className="text-right">
        {rate?.rate_breakdown.discounts && (
          <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-green-1000">
            <span className="line-through text-dark-800 mr-1">
              {isPriceBase && baseBeforeApply
                ? baseBeforeApply.formatted
                : totalBeforeApply?.formatted}
            </span>
            {rate?.rate_breakdown.discounts.percentage_to_apply}
          </p>
        )}
        <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-1000">
          {rate?.rate_breakdown.total_base_amount.formatted}
        </p>
      </section>
    </section>
  );

  return (
    <>
      <AdultChildrenAmount
        adults={adultsCount}
        child={childrenCount}
        childrenAges={childrenAges}
      />

      <BasePrice />
      {rate?.rate_breakdown.taxes.map((tax) => {
        const taxLabel = t(tax.type, tax.description);
        if (tax.tax_amount.amount === 0) return;
        return (
          <AmountDetailItem
            key={tax.type}
            amount={tax.tax_amount?.formatted}
            label={taxLabel}
          />
        );
      })}
      <div className="border-t border-dark-200"></div>
      <section className="flex justify-between mb-5">
        <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-1000">
          {payNowLabel}
        </p>
        <p className="font-semibold text-[18px] leading-[24px] text-dark-1000">
          {total}
        </p>
      </section>

      {rate?.rate_breakdown.post_paid_rate?.taxes.map((tax, index) => {
        const taxLabel = t(tax.type, tax.description);
        if (tax.tax_amount.amount === 0) return;
        return (
          <section className="flex justify-between" key={tax.type + index}>
            <section className="flex flex-row gap-1">
              <section className="flex flex-row gap-1 lg:gap-3">
                <PlusIcon className="h-3.5 lg:h-4 lg:w-4 ml-0.5 mr-1 mt-1 text-primary-1000" />
                <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-1000">
                  {taxLabel}
                </p>
              </section>
            </section>

            <section className="text-right">
              <section className="flex items-center text-dark-1000">
                {showLocalCurrency && (
                  <p className="text-[12px] leading-[15px] pr-1">
                    {approxLabel}
                  </p>
                )}
                <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px]">
                  {`${tax.tax_amount.formatted}${showLocalCurrency ? '*' : ''}`}
                </p>
              </section>
              {showLocalCurrency && (
                <p className="text-[12px] leading-[15px]">
                  {tax.tax_original_amount?.formatted}
                </p>
              )}
            </section>
          </section>
        );
      })}
      {showLocalCurrency && (
        <p className="text-[12px] leading-[15px] font-semibold text-dark-700">
          {`* ${estimationLabel}`}
        </p>
      )}
      <div className="border-t border-dark-200"></div>
      <section className="flex justify-between mb-5">
        <p className="font-semibold text-xs lg:text-sm leading-lg lg:leading-[22px] text-dark-1000">
          {payAtPropertyLabel}
        </p>
        <p className="font-semibold text-[18px] leading-[24px] text-dark-1000">
          {resortFees}
        </p>
      </section>

      <ExtraDetailItem detail={amenities} label={priceIncludesLabel} />
      {instructions && instructions}
      <ExtraDetailItem
        detail={cancellationPolicy}
        label={cancellationPolicyLabel}
      />
      {termsOfService && (
        <ExternalLink
          className="text-primary-1000 hover:text-primary-1000 font-semibold text-[14px] leading-tight"
          href={termsOfService}
        >
          Supplier Terms and Conditions
        </ExternalLink>
      )}
    </>
  );
};

export default RoomPriceBreakdown;
