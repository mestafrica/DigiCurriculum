import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import { Home, Box, UserCog, BarChart2, Key, LifeBuoy, Bell, Settings, LogOut } from 'lucide-react'; // Import LogOut icon

const Sidebar = () => {
    return (
        <div className="h-screen w-1/5 bg-gray-800 text-white p-5 flex flex-col justify-between">
            {/* Top Section with Admin Icon and Updated Title */}
            <div>
                <div className="flex items-center space-x-2 mb-8">
                    <UserCog className="w-6 h-6" />  {/* Admin Icon */}
                    <h2 className="text-2xl font-bold">Developer Dashboard</h2>  {/* Updated title */}
                </div>
                <ul className="space-y-4">
                    {/* Home Link */}
                    <li>
                        <Link to="." className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded cursor-pointer">
                            <Home className="w-5 h-5" />
                            <span>Home</span>
                        </Link>
                    </li>

                    {/* Added APIs Link */}
                    <li>
                        <Link to="added-apis" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded cursor-pointer">
                            <Box className="w-5 h-5" />
                            <span>Added APIs</span>
                        </Link>
                    </li>

                    {/* API Documentation Link */}
                    <li>
                        <Link to="api-documentation" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded cursor-pointer">
                            <UserCog className="w-5 h-5" />
                            <span>API Documentation</span>
                        </Link>
                    </li>

                    {/* API Usage & Analytics Link */}
                    <li>
                        <Link to="api-usage-analytics" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded cursor-pointer">
                            <BarChart2 className="w-5 h-5" />
                            <span>API Usage & Analytics</span>
                        </Link>
                    </li>

                    {/* API Keys Management Link */}
                    <li>
                        <Link to="api-keys-management" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded cursor-pointer">
                            <Key className="w-5 h-5" />
                            <span>API Keys Management</span>
                        </Link>
                    </li>

                    {/* Support & Community Link */}
                    <li>
                        <Link to="support-community" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded cursor-pointer">
                            <LifeBuoy className="w-5 h-5" />
                            <span>Support & Community</span>
                        </Link>
                    </li>

                    {/* Notifications Link */}
                    <li>
                        <Link to="notifications" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded cursor-pointer">
                            <Bell className="w-5 h-5" />
                            <span>Notifications</span>
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Bottom Section - Settings and Logout Links */}
            <div className="flex flex-col mt-4">
                <div className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded cursor-pointer mb-4">
                    <Link to="settings" className="flex items-center space-x-2"> {/* Ensure this is a flex container */}
                        <Settings className="w-5 h-5" />
                        <span>Settings</span>
                    </Link>
                </div>

                {/* Logout Button */}
                <div className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded cursor-pointer">
                    <Link to="/" className="flex items-center space-x-2">
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
