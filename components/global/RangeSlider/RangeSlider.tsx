import { useState, useEffect, useRef, ChangeEvent } from 'react';
import LabelSlider from './components/LabelSlider';

interface RangeSliderProps {
  initialMin: number;
  initialMax: number;
  min: number;
  max: number;
  step: number;
  minDifference: number;
  type: 'price' | 'star';
  onChangeMin?: (value: number) => void;
  onChangeMax?: (value: number) => void;
}

const RangeSlider = ({
  initialMin,
  initialMax,
  min,
  max,
  step,
  minDifference,
  type,
  onChangeMin,
  onChangeMax,
}: RangeSliderProps) => {
  const progressRef: any = useRef(null);
  const [minValue, setMinValue] = useState(initialMin);
  const [maxValue, setMaxValue] = useState(initialMax);

  const setMin = (value: number) => {
    setMinValue(value);
    onChangeMin && onChangeMin(value);
  };

  const setMax = (value: number) => {
    setMaxValue(value);
    onChangeMax && onChangeMax(value);
  };

  const handleMin = (e: ChangeEvent<any>) => {
    if (maxValue - minValue >= minDifference && maxValue <= max) {
      if (parseInt(e.target.value) < maxValue) {
        setMin(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) < minValue) {
        setMin(parseInt(e.target.value));
      }
    }
  };

  const handleMax = (e: ChangeEvent<any>) => {
    if (maxValue - minValue >= minDifference && maxValue <= max) {
      if (parseInt(e.target.value) > minValue) {
        setMax(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) > maxValue) {
        setMax(parseInt(e.target.value));
      }
    }
  };

  const StarNotches = () => {
    return (
      <>
        <div className="h-2 w-2 bg-dark-200 rounded-full absolute -top-[3px]"></div>
        <div
          className={`h-2 w-2 rounded-full absolute -top-[3px] left-1/4 ${
            minValue > 2 ? 'bg-dark-200' : 'bg-primary-600'
          }`}
        ></div>
        <div
          className={`h-2 w-2 rounded-full absolute -top-[3px] left-1/2 ${
            minValue > 3 || maxValue < 3 ? 'bg-dark-200' : 'bg-primary-600'
          }`}
        ></div>
        <div
          className={`h-2 w-2 rounded-full absolute -top-[3px] left-3/4 ${
            maxValue < 4 ? 'bg-dark-200' : 'bg-primary-600'
          }`}
        ></div>
        <div className="h-2 w-2 bg-dark-200 rounded-full absolute -top-[3px] right-0"></div>
      </>
    );
  };

  useEffect(() => {
    progressRef.current.style.left =
      ((minValue - min) / (max - min)) * 100 + '%';
    progressRef.current.style.right =
      100 - ((maxValue - min) / (max - min)) * 100 + '%';
  }, [minValue, maxValue, max, min]);

  return (
    <div className="mb-4">
      <div className="my-4">
        <div className="relative h-0.5 rounded-md bg-dark-200">
          <div
            className="absolute h-0.5 bg-primary-1000 rounded "
            ref={progressRef}
          ></div>
          {type == 'star' && <StarNotches />}
        </div>

        <div className="relative">
          <input
            onChange={handleMin}
            type="range"
            min={min}
            step={step}
            max={max}
            value={minValue}
            id="minValue"
            name="minValue"
            className="absolute w-full -top-1 h-1 bg-transparent appearance-none pointer-events-none"
          />
          <label htmlFor="minValue" className="absolute top-6">
            <LabelSlider value={minValue} type={type} />
          </label>

          <input
            onChange={handleMax}
            type="range"
            min={min}
            step={step}
            max={max}
            value={maxValue}
            id="maxValue"
            name="maxValue"
            className="absolute w-full -top-1 h-1 bg-transparent appearance-none pointer-events-none"
          />
          <label htmlFor="maxValue" className="absolute top-6 right-0">
            <LabelSlider
              value={maxValue}
              type={type}
              isMaxLabel={maxValue == max}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
