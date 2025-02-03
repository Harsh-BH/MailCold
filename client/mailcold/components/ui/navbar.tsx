import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
        </a>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
          >
            <span className="sr-only">Open user menu</span>
            <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo" />
          </button>
          {isUserDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg dark:bg-gray-700">
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
              </div>
              <ul className="py-2">
                <li><a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200">Dashboard</a></li>
                <li><a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200">Settings</a></li>
                <li><a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200">Earnings</a></li>
                <li><a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200">Sign out</a></li>
              </ul>
            </div>
          )}
          <button
            className="md:hidden p-2 w-10 h-10 text-gray-500 rounded-lg focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        <div className={`${isMenuOpen ? "block" : "hidden"} md:flex md:w-auto md:order-1`}>
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg bg-gray-50 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900">
            <li><a href="#" className="block py-2 px-3 text-blue-700 rounded-sm md:p-0 dark:text-blue-500">Home</a></li>
            <li><a href="#" className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:p-0 dark:text-white">About</a></li>
            <li><a href="#" className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:p-0 dark:text-white">Services</a></li>
            <li><a href="#" className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:p-0 dark:text-white">Pricing</a></li>
            <li><a href="#" className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:p-0 dark:text-white">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
