/* eslint-disable camelcase */
import { useCategory } from 'hooks/categoryInjection/useCategory';
import { injectProps } from 'helpers/reactUtils';
import CollapseBordered from 'components/global/CollapseBordered/CollapseBordered';
import BreakdownSummary from 'hotels/components/PriceBreakdownModal/components/BreakdownSummary';
import { useCategorySlug } from 'hooks/category/useCategory';

const PaymentCartItem = ({ item }: any) => {
  const CartItemHeader = () => {
    const category = useCategory(item.category.toLowerCase());
    return injectProps(category?.checkoutDisplay, {
      item: item,
    });
  };

  const CartItemBreakdown = () => {
    const category = useCategory(item.category.toLowerCase());
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

  const CartItemDetail = () => {
    const itemCategory = useCategorySlug(item.sector?.toLowerCase() || '');
    const sector = useCategory(itemCategory?.type || '');
    return injectProps(sector?.checkoutItemDisplay, {
      item: item,
    });
  };

  return (
    <section className="space-y-5 py-6">
      <CartItemDetail />
    </section>
  );
};

export default PaymentCartItem;
