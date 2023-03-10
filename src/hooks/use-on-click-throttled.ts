import { useCallback } from "react";
import throttle from "lodash/throttle";

export const useOnClickThrottled = (onClick = () => {}) =>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useCallback(
    // If we pass null or undefined to throttle, this will cause an exception
    throttle(onClick, 500, { trailing: false }),
    [onClick]
  );
