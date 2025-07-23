import React, {
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./infinite-scroll.module.css";
import { cn } from "utils/cn";
import { initScrollController } from "./scroll-controller";
import { InfiniteScroll } from "./infinite-scroll";

type InfiniteItemsProps = {
  defaultValue?: number;
  className?: string;
  onChange: (value: number) => void;
  getValue: (value: number) => ReactNode;
  snapSize: number;
};

export function InfiniteItems({
  defaultValue,
  className,
  onChange,
  getValue,
  snapSize,
}: InfiniteItemsProps) {
  const [value, setValue] = useState(defaultValue ?? 0);

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
      const top = val - value;
      const height = snapSize;

      return (
        <div key={val} style={{ top, height }} className={styles.item}>
          {getValue(val)}
        </div>
      );
    });

    return items;
  }, [value, snapSize]);

  return (
    <InfiniteScroll
      defaultValue={defaultValue}
      className={className}
      onChange={changeHandler}
      snapSize={snapSize}
    >
      {items}
    </InfiniteScroll>
  );
}
