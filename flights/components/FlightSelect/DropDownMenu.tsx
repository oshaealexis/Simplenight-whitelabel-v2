import { useEffect, useState } from 'react';
import classnames from 'classnames';

interface DropdowMenuProps {
  items: {
    label: string;
    icon?: any;
    isActive: boolean;
    value: string;
  }[];
  onChange: (value: string) => void;
  alingDirection: 'left' | 'right';
  menuIcon?: any;
}

const DropdownMenu = ({
  items,
  onChange,
  alingDirection,
  menuIcon,
}: DropdowMenuProps) => {
  const [activeItem, setActiveItem] = useState(
    items.find((item) => item.isActive) || items[0],
  );
  const [itemsState, setItemsState] = useState(items);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setItemsState(items);
  }, [items]);

  useEffect(() => {
    onChange(activeItem.value);
  }, [activeItem]);

  const updateItemsState = (selectedValue: string) => {
    setItemsState(
      [...items].map((item) => ({
        ...item,
        isActive: item.value === selectedValue,
      })),
    );
    setActiveItem(
      items.find(({ value }) => value === selectedValue) || items[0],
    );
  };

  return (
    <section className=" tems-center justify-start relative">
      <button
        className="flex items-center whitespace-nowrap bg-white rounded border border-gray-300 focus:border-teal-1000 w-full h-8 p-[8px] text-sm text-dark-1000"
        onClick={() => setShowMenu((p) => !p)}
        onBlur={() => setShowMenu(false)}
      >
        <span className="flex flex-row items-center gap-1 text-xs font-semibold text-left text-dark-1000">
          <span>{activeItem.icon || menuIcon}</span>
          <span>{activeItem.label}</span>
        </span>
      </button>

      <section
        className={`absolute z-[11] border border-dark-300 rounded shadow-container top-[100%] ${alingDirection}-0 bg-white w-[256px] transition-all duration-500 text-dark-1000 ${
          !showMenu && 'opacity-0 invisible'
        }`}
      >
        {itemsState.map(({ label, icon, isActive, value }, index) => (
          <button
            className={classnames(
              'flex items-center bg-white border-b hover:bg-teal-100 hover:text-teal-1000 hover:fill-teal-1000 border-gray-300 w-full h-11 py-2 px-[13px] text-sm text-dark-1000',
              {
                'bg-primary-400 text-primary-1000': isActive,
              },
            )}
            onClick={() => updateItemsState(value)}
            key={index}
          >
            <span className="flex gap-1 items-center flex-row text-xs font-semibold text-left">
              <span>{icon}</span>
              <span>{label}</span>
            </span>
          </button>
        ))}
      </section>
    </section>
  );
};

export default DropdownMenu;
