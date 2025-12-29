import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin } from 'lucide-react';
import cadLogo from '../assets/cad-logo.png';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img src={cadLogo} alt="CUET CAD Society" className="h-12 w-auto hover:scale-105 transition-transform duration-300" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Empowering students with cutting-edge CAD skills and knowledge for the future of engineering and design.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-muted-foreground hover:text-primary transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/workshop" className="text-muted-foreground hover:text-primary transition-colors">
                  Workshops
                </Link>
              </li>
              <li>
                <Link to="/committee" className="text-muted-foreground hover:text-primary transition-colors">
                  Committee
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/alumni" className="text-muted-foreground hover:text-primary transition-colors">
                  Alumni
                </Link>
              </li>
              <li>
                <Link to="/members" className="text-muted-foreground hover:text-primary transition-colors">
                  Members
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-muted-foreground hover:text-primary transition-colors">
                  Event Registration
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-muted-foreground text-sm">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>Pahartali, Raozan,  Chittagong, Bangladesh</span>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground text-sm">
                <Mail size={16} />
                <span>cuetcadsociety@gmail.com</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="https://www.facebook.com/cadsocietycuet" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.linkedin.com/company/cuet-cad-society" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} CUET CAD Society. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
