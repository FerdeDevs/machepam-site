'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'
import { motion } from 'framer-motion'

const OrderPlaced = () => {
  const router = useRouter()

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      router.push('/my-orders')
    }, 5000)
    
    // Cleanup function to clear timeout if component unmounts
    return () => clearTimeout(redirectTimeout)
  }, [router])

  return (
    <motion.div 
      className='h-screen flex flex-col justify-center items-center gap-5'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="flex justify-center items-center relative"
        initial={{ scale: 0.8 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          className="absolute"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Check size={48} className="text-green-500" />
        </motion.div>
        <div className="animate-spin rounded-full h-24 w-24 border-4 border-t-green-300 border-gray-200"></div>
      </motion.div>
      <motion.div 
        className="text-center text-2xl font-semibold"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        Order Placed Successfully
      </motion.div>
    </motion.div>
  )
}

export default OrderPlaced