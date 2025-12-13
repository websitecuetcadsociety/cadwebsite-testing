import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import cadLogo from '../assets/cad-logo.png';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Workshop', path: '/workshop' },
    { name: 'Committee', path: '/committee' },
    { name: 'Alumni', path: '/alumni' },
    { name: 'Registration', path: '/register' }
  ];
  const isActive = (path: string) => location.pathname === path;
  return <nav className="fixed top-0 w-full z-50 bg-background/98 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-primary/5">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-14 md:h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src={cadLogo} 
              alt="CUET CAD Society" 
              className="h-10 md:h-20 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map(link => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive(link.path) 
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/80'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a 
              href="mailto:sponsor@cuetcad.org?subject=Sponsorship Inquiry"
              className="ml-2"
            >
              <Button 
                variant="default" 
                size="sm" 
                className="gap-2 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
              >
                <Heart size={16} className="animate-pulse" />
                Sponsor Us
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground p-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t border-border/30"
            >
              <div className="py-4 space-y-2">
                {navLinks.map(link => (
                  <Link 
                    key={link.path} 
                    to={link.path} 
                    onClick={() => setIsOpen(false)} 
                    className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                      isActive(link.path) 
                        ? 'bg-primary text-primary-foreground shadow-md shadow-primary/30' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <a 
                  href="mailto:sponsor@cuetcad.org?subject=Sponsorship Inquiry"
                  className="block px-4 py-3"
                >
                  <Button 
                    variant="default" 
                    className="w-full gap-2 shadow-lg shadow-primary/30"
                  >
                    <Heart size={16} className="animate-pulse" />
                    Sponsor Us
                  </Button>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>;
};
export default Navbar;