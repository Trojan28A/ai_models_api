import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu, Key, Check } from 'lucide-react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from './ui/sheet';
import { useAPIKey } from '../contexts/APIKeyContext';
import APIKeyDialog from './APIKeyDialog';

const Navbar = () => {
  const location = useLocation();
  const { hasAPIKey } = useAPIKey();
  const [showAPIKeyDialog, setShowAPIKeyDialog] = useState(false);
  
  const navLinks = [
    { name: 'Models', path: '/models' },
    { name: 'Playground', path: '/playground' },
    { name: 'Docs', path: '/docs' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-lg group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Hub
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive(link.path)
                      ? 'bg-purple-500/20 text-purple-400'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAPIKeyDialog(true)}
                className={`ml-2 border-gray-700 ${
                  hasAPIKey()
                    ? 'text-green-400 border-green-500/50 hover:bg-green-500/10'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                {hasAPIKey() ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    API Key Set
                  </>
                ) : (
                  <>
                    <Key className="w-4 h-4 mr-2" />
                    Set API Key
                  </>
                )}
              </Button>
            </div>

            {/* Mobile Navigation */}
            <div className="flex items-center space-x-2 md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAPIKeyDialog(true)}
                className={hasAPIKey() ? 'text-green-400' : 'text-gray-300'}
              >
                <Key className="h-5 w-5" />
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5 text-gray-300" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-gray-900 border-gray-800">
                  <div className="flex flex-col space-y-4 mt-8">
                    {navLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          isActive(link.path)
                            ? 'bg-purple-500/20 text-purple-400'
                            : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
      
      <APIKeyDialog open={showAPIKeyDialog} onOpenChange={setShowAPIKeyDialog} />
    </>
  );
};

export default Navbar;