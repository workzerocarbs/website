/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';

const useIntersectionObserver = (callback, options) => {
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(entry);
        }
      });
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [callback, options]);

  return ref;
};

export default useIntersectionObserver;
