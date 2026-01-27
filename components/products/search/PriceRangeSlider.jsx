'use client'

import { useState, useRef, useEffect } from 'react'

export default function PriceRangeSlider({
  min,
  max,
  values,
  onChange,
  onChangeEnd,
  step = 1,
}) {
  const [localValues, setLocalValues] = useState(values || [min, max])
  const sliderRef = useRef(null)
  const isDragging = useRef({ min: false, max: false })

  useEffect(() => {
    if (values) {
      setLocalValues(values)
    } else {
      setLocalValues([min, max])
    }
  }, [values, min, max])

  const getPercentage = (value) => {
    if (max === min) return 0
    return ((value - min) / (max - min)) * 100
  }

  const getValueFromPercentage = (percentage) => {
    return min + (percentage / 100) * (max - min)
  }

  const handleMouseDown = (type) => (e) => {
    e.preventDefault()
    isDragging.current[type] = true
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (e) => {
    if (!sliderRef.current) return

    const rect = sliderRef.current.getBoundingClientRect()
    const percentage = Math.max(
      0,
      Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)
    )
    const newValue = Math.round(getValueFromPercentage(percentage) / step) * step
    const clampedValue = Math.max(min, Math.min(max, newValue))

    if (isDragging.current.min) {
      const newMin = Math.min(clampedValue, localValues[1])
      setLocalValues([newMin, localValues[1]])
      // Only call onChange for visual feedback during drag (optional)
      if (onChange) {
        onChange([newMin, localValues[1]])
      }
    } else if (isDragging.current.max) {
      const newMax = Math.max(clampedValue, localValues[0])
      setLocalValues([localValues[0], newMax])
      // Only call onChange for visual feedback during drag (optional)
      if (onChange) {
        onChange([localValues[0], newMax])
      }
    }
  }

  const handleMouseUp = () => {
    // Call onChangeEnd when dragging stops to trigger URL update
    if (onChangeEnd && (isDragging.current.min || isDragging.current.max)) {
      onChangeEnd([localValues[0], localValues[1]])
    }
    
    isDragging.current.min = false
    isDragging.current.max = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  const handleTouchStart = (type) => (e) => {
    isDragging.current[type] = true
    document.addEventListener('touchmove', handleTouchMove)
    document.addEventListener('touchend', handleTouchEnd)
  }

  const handleTouchMove = (e) => {
    if (!sliderRef.current) return

    const touch = e.touches[0]
    const rect = sliderRef.current.getBoundingClientRect()
    const percentage = Math.max(
      0,
      Math.min(100, ((touch.clientX - rect.left) / rect.width) * 100)
    )
    const newValue = Math.round(getValueFromPercentage(percentage) / step) * step
    const clampedValue = Math.max(min, Math.min(max, newValue))

    if (isDragging.current.min) {
      const newMin = Math.min(clampedValue, localValues[1])
      setLocalValues([newMin, localValues[1]])
      // Only call onChange for visual feedback during drag (optional)
      if (onChange) {
        onChange([newMin, localValues[1]])
      }
    } else if (isDragging.current.max) {
      const newMax = Math.max(clampedValue, localValues[0])
      setLocalValues([localValues[0], newMax])
      // Only call onChange for visual feedback during drag (optional)
      if (onChange) {
        onChange([localValues[0], newMax])
      }
    }
  }

  const handleTouchEnd = () => {
    // Call onChangeEnd when dragging stops to trigger URL update
    if (onChangeEnd && (isDragging.current.min || isDragging.current.max)) {
      onChangeEnd([localValues[0], localValues[1]])
    }
    
    isDragging.current.min = false
    isDragging.current.max = false
    document.removeEventListener('touchmove', handleTouchMove)
    document.removeEventListener('touchend', handleTouchEnd)
  }

  const formatPrice = (value) => {
    return `K ${Math.round(value).toLocaleString()}`
  }

  const minPercent = getPercentage(localValues[0])
  const maxPercent = getPercentage(localValues[1])

  return (
    <div className="w-full">
      {/* Slider Track */}
      <div
        ref={sliderRef}
        className="relative h-2 bg-white/20 rounded-full cursor-pointer"
      >
        {/* Active Range */}
        <div
          className="absolute h-2 bg-white/40 rounded-full"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />

        {/* Min Handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-lg cursor-grab active:cursor-grabbing hover:scale-110 transition-transform z-10"
          style={{ left: `${minPercent}%` }}
          onMouseDown={handleMouseDown('min')}
          onTouchStart={handleTouchStart('min')}
          role="slider"
          aria-label="Minimum price"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={localValues[0]}
          tabIndex={0}
        />

        {/* Max Handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-lg cursor-grab active:cursor-grabbing hover:scale-110 transition-transform z-10"
          style={{ left: `${maxPercent}%` }}
          onMouseDown={handleMouseDown('max')}
          onTouchStart={handleTouchStart('max')}
          role="slider"
          aria-label="Maximum price"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={localValues[1]}
          tabIndex={0}
        />
      </div>

      {/* Value Display */}
      <div className="flex items-center justify-between mt-3 text-sm text-white">
        <span className="font-medium">{formatPrice(localValues[0])}</span>
        <span className="text-gray-300">to</span>
        <span className="font-medium">{formatPrice(localValues[1])}</span>
      </div>
    </div>
  )
}

