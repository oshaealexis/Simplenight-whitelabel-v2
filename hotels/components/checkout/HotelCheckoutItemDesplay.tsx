import CollapseBordered from 'components/global/CollapseBordered/CollapseBordered';
import { injectProps } from 'helpers/reactUtils';
import { useCategorySlug } from 'hooks/category/useCategory';
import { useCategory } from 'hooks/categoryInjection/useCategory';
import BreakdownSummary from '../PriceBreakdownModal/components/BreakdownSummary';
import { Rates } from '../../types/response/SearchResponse';

const HotelCheckoutItemDisplay = (item: any) => {
  const breakDownInfo: Rates = item.item.item_data.min_rate_room.rates;
  const CartItemHeader = () => {
    const itemCategory = useCategorySlug(
      item.item.category?.toLowerCase() || '',
    );
    const sector = useCategory(itemCategory?.type || '');
    return injectProps(sector?.checkoutDisplay, {
      item: item.item,
    });
  };

  const CartItemBreakdown = () => {
    const category = useCategory(item.item.category.toLowerCase());
    return injectProps(category?.breakdownDisplay, {
      item: item,
      showCollapse: false,
    });
  };

  const CartItemBody = () => {
    return (
      <section className="mb-6 px-4">
        <CartItemBreakdown />
      </section>
    );
  };

  return (
    <CollapseBordered
      title={<CartItemHeader />}
      body={<CartItemBody />}
      footer={<BreakdownSummary rate={breakDownInfo} showTotal={true} />}
    />
  );
};

export default HotelCheckoutItemDisplay;
