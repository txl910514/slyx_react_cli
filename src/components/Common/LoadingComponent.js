import React from 'react'
import PropTypes from 'prop-types'

const LoadingComponent = ({ isLoading, error }) => {
  // Handle the loading state
  if (isLoading) {
    return <div>Loading...</div>
  } else if (error) {
    return (
      <div
        style={{
          height: '100vh',
          textAlign: 'center',
          padding: '40vh 10vw',
          fontSize: '18px'
        }}>
        您访问的页面已更新，请刷新后重试。
      </div>
    )
  } else {
    return null
  }
}

LoadingComponent.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.any
}

export default LoadingComponent
