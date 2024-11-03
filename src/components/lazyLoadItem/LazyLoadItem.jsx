/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import useIntersectionObserver from '../../utils/useIntersectionObserver';
import '../lazyLoadItem/styles.scss';

const LazyLoadItem = ({ children, isTitle }) => {
    const [isVisible, setIsVisible] = useState(false);

    const ref = useIntersectionObserver(
        () => {
            setTimeout(() => {
                setIsVisible(true);
            }, 1000);
        },
        {
            threshold: 0.1,
        }
    );

    return (
        <div ref={ref} className="lazy-load-item">
            {isVisible ? children : <div className={`skeleton ${isTitle ? 'title-skeleton' : 'dish-skeleton'}`}></div>}
        </div>
    );
};

export default LazyLoadItem;
