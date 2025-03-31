import {
  createContext,
  useContext,
  useState,
  ReactNode,
  ReactElement,
} from 'react'
import {  Button } from 'flowbite-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ModalOptions {
  title: string
  content: ReactElement | string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
  hideCancel?: boolean
}

interface ModalContextType {
  showModal: (options: ModalOptions) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [modalOptions, setModalOptions] = useState<ModalOptions>({
    title: '',
    content: '',
  })

  const showModal = (options: ModalOptions) => {
    setModalOptions(options)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}

      {/* Beautiful Animated Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-[90%] md:w-[400px] relative"
              initial={{ scale: 0.8, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: -20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {/* Modal Header */}
              <div className="text-xl font-semibold text-gray-900 dark:text-gray-200">
                {modalOptions.title}
              </div>

              {/* Modal Body */}
              <div className="mt-3 text-gray-700 dark:text-gray-300">
                {modalOptions.content}
              </div>

              {/* Modal Footer */}
              <div className="mt-5 flex justify-end gap-2">
                {!modalOptions.hideCancel && (
                  <Button
                    color="gray"
                    className="px-4 py-2 rounded-lg text-sm"
                    onClick={() => {
                      modalOptions.onCancel?.()
                      closeModal()
                    }}
                  >
                    {modalOptions.cancelText || 'Cancel'}
                  </Button>
                )}
                {modalOptions.onConfirm && (
                  <Button
                    color="red"
                    className="px-4 py-2 rounded-lg text-sm"
                    onClick={() => {
                      modalOptions.onConfirm?.()
                      closeModal()
                    }}
                  >
                    {modalOptions.confirmText || 'Confirm'}
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  )
}
