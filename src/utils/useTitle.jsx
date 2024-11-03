/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'

const useTitle = (title) => {
    useEffect(() => {
        document.title = `ZeroCarbs | ${title}`
    }, []);
}

export default useTitle;

// V6F7srPRz4PHkLa password of geo-code