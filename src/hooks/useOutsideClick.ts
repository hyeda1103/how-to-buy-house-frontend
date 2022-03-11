import {
  useEffect, MouseEvent, TouchEvent,
} from 'react';

function useOutsideClick(
  ref: any,
  handler: any,
) {
  useEffect(() => {
    const listener = (e: any) => {
      console.log((e.target as HTMLElement).id);
      if (!ref.current || ref.current.contains(e.target) || e.currentTarget.id?.indexOf('dropdown')) {
        return;
      }
      handler(e);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

export default useOutsideClick;
