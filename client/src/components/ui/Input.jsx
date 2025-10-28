import React from 'react'
import { motion } from 'framer-motion'

const Input = React.forwardRef(({
  label,
  error,
  icon: Icon,
  containerClassName = '',
  labelClassName = '',
  inputClassName = '',
  ...props
}, ref) => {
  return (
    <div className={`mb-4 ${containerClassName}`}>
      {label && (
        <label 
          htmlFor={props.id} 
          className={`block text-sm font-medium mb-2 transition-colors duration-200
            text-gray-700 dark:text-gray-300 ${labelClassName}`}
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400 transition-colors duration-200" />
          </div>
        )}
        
        <motion.input
          ref={ref}
          whileFocus={{ scale: 1.01 }}
          className={`
            w-full px-4 py-3 border rounded-lg transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
            bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600
            text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
            ${Icon ? 'pl-10' : 'pl-4'}
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${inputClassName}
          `}
          {...props}
        />
      </div>
      
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-sm text-red-600 dark:text-red-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input