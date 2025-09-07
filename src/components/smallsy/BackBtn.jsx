import React from 'react'

function BackBtn() {
  return (
            <button
          onClick={() => history.back()}
          className="py-2 px-4 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          ← Back
        </button>
  )
}

export default BackBtn;
