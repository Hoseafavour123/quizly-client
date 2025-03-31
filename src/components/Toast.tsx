import { Toast } from 'flowbite-react'
import { useEffect } from 'react'

type ToastProps = {
  message: string
  type: 'SUCCESS' | 'ERROR'
  onClose: () => void
}

const InfoToast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)
    return () => {
      clearTimeout(timer)
    }
  }, [onClose])

  return (
    <div className="z-20 absolute top-5 p-4 md:right-[30%] flex  flex-col gap-4">
      {type === 'SUCCESS' && (
        <Toast className='bg-green-500'>
          <div className="ml-2 text-sm font-normal text-white">
            {message}
          </div>
          <Toast.Toggle className='ml-2' />
        </Toast>
      )}
      {type === 'ERROR' && (
        <Toast className='bg-red-500'>
          <div className="ml-2 text-sm font-normal text-white">{message}</div>
          <Toast.Toggle className='ml-2'/>
        </Toast>
      )}
    </div>
  )
}

export default InfoToast
