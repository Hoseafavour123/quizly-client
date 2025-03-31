import React, { useState, MouseEvent } from 'react'
import { LuBellDot } from 'react-icons/lu'
import { HiArrowDownRight } from 'react-icons/hi2'

const NotificationsPopover: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <div className="relative">
      {/* Notification Icon Button */}
      <button
        onClick={handleClick}
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
      >
        <LuBellDot className="text-lg" />
      </button>

      {/* Popover */}
      {open && (
        <div
          className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg ring-1 ring-gray-300"
          onMouseLeave={handleClose}
        >
          {/* Popover Header */}
          <div className="p-4 border-b">
            <h2 className="font-bold text-gray-700 text-sm">
              All Notifications
            </h2>
          </div>

          {/* Notification List */}
          <ul className="divide-y divide-gray-200">
            {/* Notification Item */}
            <li className="p-4 flex items-start space-x-3">
              <HiArrowDownRight className="text-gray-500 text-lg" />
              <div>
                <p className="text-gray-700 text-sm font-semibold">
                  Someone just checked in
                </p>
              </div>
            </li>

            <li className="p-4 flex items-start space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                JJ
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm text-gray-700">Jacob Jones</p>
                <p className="text-xs text-gray-500">
                  nevaeh.simmons@example.com
                </p>
                <p className="text-xs text-gray-400">19 Oct. 2024 - 02:34 am</p>
                <div className="mt-2 flex space-x-2">
                  <button className="px-4 py-1 text-xs font-semibold text-white bg-green-500 rounded hover:bg-green-600">
                    Approve
                  </button>
                  <button className="px-4 py-1 text-xs font-semibold text-white bg-red-500 rounded hover:bg-red-600">
                    Decline
                  </button>
                </div>
              </div>
            </li>

            <li className="p-4 flex items-start space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                JJ
              </div>
              <div>
                <p className="font-bold text-sm text-gray-700">
                  A new User was successfully added
                </p>
                <p className="text-xs text-gray-400">19 Oct. 2024 - 02:34 am</p>
              </div>
            </li>
          </ul>

          {/* Footer */}
          <div className="p-4 border-t">
            <button className="text-sm text-gray-500 hover:text-gray-700 w-full text-left">
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationsPopover