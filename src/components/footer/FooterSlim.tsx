import React from 'react';

const FooterSlim = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} CaveFinance. All rights reserved.
          </div>
          <div className="mt-2 sm:mt-0 flex space-x-6">
            <a href="/privacy" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              Privacy Policy
            </a>
            <a href="/terms" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              Terms of Service
            </a>
            <a href="/contact" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSlim;