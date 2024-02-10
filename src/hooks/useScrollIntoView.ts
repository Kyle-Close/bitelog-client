import { MutableRefObject, useEffect } from 'react';

function useScrollIntoView<T extends HTMLElement>(
  ref: MutableRefObject<T | null>,
  options: ScrollIntoViewOptions = { behavior: 'smooth' }
) {
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView(options);
    }
  }, [ref, options]);
}

export default useScrollIntoView;
