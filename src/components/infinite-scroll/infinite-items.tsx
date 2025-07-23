import React, {
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./infinite-scroll.module.css";
import { InfiniteScroll } from "./infinite-scroll";

type InfiniteItemsProps = {
  defaultValue?: number;
  className?: string;
  onChange: (value: number) => void;
  getValue: (value: number, onClick: () => void) => ReactNode;
  snapSize: number;
  containerHeight: number;
};

export function InfiniteItems({
  defaultValue,
  className,
  onChange,
  getValue,
  snapSize,
  containerHeight,
}: InfiniteItemsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(defaultValue ?? 0);
  const [externalValue, setExternalValue] = useState(defaultValue ?? 0);

  const changeHandler = useCallback(
    (value: number) => {
      setValue(value);
      onChange(value);
    },
    [onChange]
  );

  const items = useMemo(() => {
    const currentValue = value - (value % snapSize);

    const values: number[] = [currentValue];

    values.unshift(currentValue - snapSize);
    values.unshift(currentValue - snapSize * 2);
    values.unshift(currentValue - snapSize * 3);
    values.push(currentValue + snapSize);
    values.push(currentValue + snapSize * 2);
    values.push(currentValue + snapSize * 3);

    const items = values.map((val) => {
      const radius = containerHeight / 2 - 5;
      const sectorLength = (Math.PI * radius) / 2;
      let valueDiff = val - value;

      if (valueDiff > sectorLength) {
        valueDiff = sectorLength;
      } else if (valueDiff < -sectorLength) {
        valueDiff = -sectorLength;
      }

      const factor = valueDiff / sectorLength;
      const angle = (Math.PI / 2) * factor;
      const top = Math.sin(angle) * radius - snapSize / 2 + containerHeight / 2;
      const height = snapSize;
      const scale = (Math.cos(angle) + 1) / 2;
      const opacity = (1 - Math.abs(factor)) ** 1.5;
      const transform = `scale(${scale}, ${scale}) rotateX(${angle}rad)`;
      const onClick = () => setExternalValue(val);

      return (
        <div
          key={val}
          style={{ top, height, transform, opacity }}
          className={styles.item}
        >
          {getValue(val, onClick)}
        </div>
      );
    });

    return items;
  }, [value, snapSize, containerHeight]);

  return (
    <InfiniteScroll
      defaultValue={defaultValue}
      externalValue={externalValue}
      className={className}
      onChange={changeHandler}
      snapSize={snapSize}
    >
      <div className={styles.itemsContainer} ref={containerRef}>
        {items}
      </div>
    </InfiniteScroll>
  );
}
