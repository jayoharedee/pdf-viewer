import React from 'react'
import PropTypes from 'prop-types'

function Progress({ percentage }) {
  return percentage ? (
    <div className="progress">
      <div
        className="progress-bar progress-bar-striped bg-success"
        role="progressbar"
        style={{ width: `${percentage}%` }}
      >
        {percentage}%
      </div>
    </div>
  ) : null
}

Progress.propTypes = {
  percentage: PropTypes.number.isRequired,
}

export default Progress
