import { HiOutlineSearch } from 'react-icons/hi'
import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import AvatarPopover from './popovers/AvatarPopover'
import NotificationsPopover from './popovers/NotificationPopover'

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <div className="bg-white px-4 flex justify-between py-3 gap-10 items-center">
      <div className="flex items-center gap-8">
        <button className="lg:hidden text-black" onClick={toggleSidebar}>
          <HiOutlineMenuAlt3 size={24} />
        </button>
        <div className="relative hidden">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
          <input
            type="text"
            placeholder="Search"
            className="text-sm focus:outline-none focus:bg-white active:outline-none h-10 bg-gray-100 w-[24rem] max-w-full border border-gray-300 rounded-lg pr-4 pl-10"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className='hidden'>
          <NotificationsPopover />
        </div>

        <AvatarPopover />
      </div>
    </div>
  )
}

export default Header
