import React from 'react'
import loaderJson from '../../assets/loader1.json'
import Lottie from 'react-lottie';
const Loader = () => {
    const loaderOptions = {
        loop: true,
        autoplay: true,
        animationData: loaderJson,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
      }
  return (
    <div style={{ width: '100%', maxWidth: '300px', margin: '0 auto' }}>
    <Lottie
        options={loaderOptions}
        height={'100%'}   // Let it scale with the container
        width={'100%'}    // Let it scale with the container
        style={{
            maxWidth: '100%', // Ensure it doesn't overflow
            maxHeight: '100%', // Ensure it doesn't overflow
        }}
    />
</div>
  )
}

export default Loader