import { IconContainer } from './IconContainer';
import IconWrapper from './IconWrapper';

export default function CategoryTab(props: CategoryTabProps) {
  return (
    <>
      <div
        className={
          // eslint-disable-next-line prettier/prettier, quotes
          "flex-1 text-left font-semibold font-['Lato'] text-[rgba(102,102,102,1)] transition-all  h-20 gap-1 inline-flex flex-col justify-center items-center flex-grow rounded bg-[rgba(237,251,252,1)]"
        }
      >
        {props.type === 'OFF_GROCERY_OFF_TYPE' && (
          <IconWrapper type="PX_TYPE19" />
        )}
        {props.type === 'OFF_PHARMACY_OFF_TYPE' && (
          <IconWrapper type="PX_TYPE20" />
        )}
        {props.type === 'OFF_MEDICAL_OFF_TYPE' && (
          <IconWrapper type="PX_TYPE21" />
        )}
        {props.type === 'OFF_INSURANCE_OFF_TYPE' && (
          <IconWrapper type="PX_TYPE22" />
        )}
        {props.type === 'OFF_GROCERY_OFF_TYPE' && (
          <p className="text-sm leading-5 m-0">Grocery</p>
        )}
        {props.type === 'OFF_PHARMACY_OFF_TYPE' && (
          <p className="text-sm leading-5 m-0">Pharmacy</p>
        )}
        {props.type === 'OFF_MEDICAL_OFF_TYPE' && (
          <p className="text-sm leading-5 m-0">Medical</p>
        )}
        {props.type === 'OFF_INSURANCE_OFF_TYPE' && (
          <p className="text-sm leading-5 m-0">Insurance</p>
        )}
        {props.type === 'OFF_BEACHES_AND_POOLS_OFF_TYPE' && (
          <IconContainer>
            <IconWrapper type="PX_TYPE16" />
            <p className="text-sm leading-5 m-0 ">Beaches & Pools</p>
          </IconContainer>
        )}
        {props.type === 'OFF_CRUISE_OFF_TYPE' && (
          <IconContainer>
            <IconWrapper type="PX_TYPE18" />
            <p className="text-sm leading-5 m-0">Cruise</p>
          </IconContainer>
        )}
        {props.type === 'OFF_SHOPPING_OFF_TYPE' && (
          <IconContainer>
            <IconWrapper type="PX_TYPE6" />
            <p className="text-sm leading-5 m-0">Shopping</p>
          </IconContainer>
        )}
        {props.type === 'OFF_MOVIES_OFF_TYPE' && (
          <IconContainer>
            <IconWrapper type="PX_TYPE12" />
            <p className="text-sm leading-5 m-0">Movies</p>
          </IconContainer>
        )}
        {props.type === 'OFF_FOOD_DELIVERY_OFF_TYPE' && (
          <IconContainer>
            <IconWrapper type="PX_TYPE3" />
            <p className="text-sm leading-5 m-0">Food Delivery</p>
          </IconContainer>
        )}
        {props.type === 'OFF_FAST_FOOD_OFF_TYPE' && (
          <IconContainer>
            <IconWrapper type="PX_TYPE4" />
            <p className="text-sm leading-5 m-0">Fast Food</p>
          </IconContainer>
        )}
        {props.type === 'OFF_COFFEE_TEA_OFF_TYPE' && (
          <IconContainer>
            <IconWrapper type="PX_TYPE5" />
            <p className="text-sm leading-5 m-0">Coffee & Tea</p>
          </IconContainer>
        )}
        {props.type === 'OFF_ROAD_TRIPS_OFF_TYPE' && (
          <IconContainer>
            <IconWrapper type="PX_TYPE7" />
            <p className="text-sm leading-5 m-0">Road Trips</p>
          </IconContainer>
        )}
        {props.type === 'OFF_CAMPING_OFF_TYPE' && (
          <IconContainer>
            <IconWrapper type="PX_TYPE8" />
            <p className="text-sm leading-5 m-0">Camping</p>
          </IconContainer>
        )}
        {props.type === 'OFF_HIKING_OFF_TYPE' && (
          <IconContainer>
            <IconWrapper type="PX_TYPE9" />
            <p className="text-sm leading-5 m-0">Hiking</p>
          </IconContainer>
        )}
        {props.type === 'OFF_ATTRACTIONS_OFF_TYPE' && (
          <IconContainer>
            <IconWrapper type="PX_TYPE10" />
            <p className="text-sm leading-5 m-0">Attractions</p>
          </IconContainer>
        )}
        {props.type === 'OFF_NIGHTLIFE_OFF_TYPE' && (
          <IconContainer>
            <IconWrapper type="PX_TYPE11" />
            <p className="text-sm leading-5 m-0">Nightlife</p>
          </IconContainer>
        )}
        {props.type === 'OFF_SPA_OFF_TYPE' && (
          <IconContainer>
            <IconWrapper type="PX_TYPE13" />
            <p className="text-sm leading-5 m-0">Spa</p>
          </IconContainer>
        )}
        {props.type === 'OFF_FITNESS_OFF_TYPE' && (
          <IconContainer>
            <IconWrapper type="PX_TYPE14" />
            <p className="text-sm leading-5 m-0">Fitness</p>
          </IconContainer>
        )}
        {props.type === 'OFF_BEAUTY_OFF_TYPE' && (
          <IconContainer>
            <IconWrapper type="PX_TYPE15" />
            <p className="text-sm leading-5 m-0">Beauty</p>
          </IconContainer>
        )}
        {props.type === 'OFF_LUXURY_OFF_TYPE' && (
          <IconContainer>
            <IconWrapper type="PX_TYPE17" />
            <p className="text-sm leading-5 m-0">Luxury/Leisure</p>
          </IconContainer>
        )}
        {props.type === 'OFF_GAS_CHARGING_OFF_TYPE' && (
          <IconContainer>
            <IconWrapper type="PX_TYPE1" />
            <p className="text-sm leading-5 m-0 ">Gas & Charging</p>
          </IconContainer>
        )}
        {props.type === 'OFF_CAR_WASH_OFF_TYPE' && (
          <IconContainer>
            <IconWrapper type="PX_TYPE2" />
            <p className="text-sm leading-5 m-0">Car Wash</p>
          </IconContainer>
        )}
      </div>
    </>
  );
}

CategoryTab.defaultProps = {
  type: 'OFF_GAS_CHARGING_OFF_TYPE',
};

interface CategoryTabProps {
  type:
    | 'OFF_GAS_CHARGING_OFF_TYPE'
    | 'OFF_CAR_WASH_OFF_TYPE'
    | 'OFF_FOOD_DELIVERY_OFF_TYPE'
    | 'OFF_FAST_FOOD_OFF_TYPE'
    | 'OFF_COFFEE_TEA_OFF_TYPE'
    | 'OFF_SHOPPING_OFF_TYPE'
    | 'OFF_ROAD_TRIPS_OFF_TYPE'
    | 'OFF_CAMPING_OFF_TYPE'
    | 'OFF_HIKING_OFF_TYPE'
    | 'OFF_ATTRACTIONS_OFF_TYPE'
    | 'OFF_NIGHTLIFE_OFF_TYPE'
    | 'OFF_MOVIES_OFF_TYPE'
    | 'OFF_SPA_OFF_TYPE'
    | 'OFF_FITNESS_OFF_TYPE'
    | 'OFF_BEAUTY_OFF_TYPE'
    | 'OFF_BEACHES_AND_POOLS_OFF_TYPE'
    | 'OFF_LUXURY_OFF_TYPE'
    | 'OFF_CRUISE_OFF_TYPE'
    | 'OFF_GROCERY_OFF_TYPE'
    | 'OFF_PHARMACY_OFF_TYPE'
    | 'OFF_MEDICAL_OFF_TYPE'
    | 'OFF_INSURANCE_OFF_TYPE';
}
