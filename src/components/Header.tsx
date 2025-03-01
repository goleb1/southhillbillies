import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-chambray text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center mb-3 sm:mb-0">
          <div className="relative h-10 w-10 sm:h-12 sm:w-12 mr-2 sm:mr-3">
            <Image 
              src="/SHB_logo.png" 
              alt="South Hillbillies Logo" 
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-white">South Hillbillies A.C.</h1>
        </div>
        
        <nav>
          <ul className="flex space-x-3 sm:space-x-6 text-sm sm:text-base">
            <li>
              <a 
                href="https://www.strava.com/clubs/southhillibillies" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-melrose transition-colors flex items-center"
              >
                <svg className="w-4 h-4 mr-1.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
                </svg>
                <span>Strava</span>
              </a>
            </li>
            <li>
              <a 
                href="https://www.southhillbillies.xyz/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-melrose transition-colors flex items-center"
              >
                <svg className="w-4 h-4 mr-1.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <path d="M9 22V12h6v10" />
                </svg>
                <span>Shop</span>
              </a>
            </li>
            <li>
              <a 
                href="https://southhillbillies.substack.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-melrose transition-colors flex items-center"
              >
                <svg className="w-4 h-4 mr-1.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
                </svg>
                <span>Workouts</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 