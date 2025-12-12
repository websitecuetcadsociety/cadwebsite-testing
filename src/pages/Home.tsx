import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { sanityClient, Message, Activity, MediaItem, urlFor } from '@/lib/sanity';
import { Calendar, Users, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import ImageLightbox from '@/components/ImageLightbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import heroImage from '../assets/hero-cad-bg-new.jpg';
import cadLogo from '../assets/cad-logo.png';

const Home = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
        
        if (!projectId || projectId === 'your-project-id-here') {
          console.warn('⚠️ Sanity not configured. Please add your Sanity project credentials to .env file.');
          console.info('📖 See SANITY_SETUP.MD for detailed setup instructions.');
          return;
        }

        const [messagesData, activitiesData, mediaData] = await Promise.all([
          sanityClient.fetch('*[_type == "message"] | order(_createdAt desc)'),
          sanityClient.fetch('*[_type == "activity"] | order(date desc)[0...4]'),
          sanityClient.fetch('*[_type == "mediaItem"] | order(_createdAt desc)[0...6]'),
        ]);
        setMessages(messagesData);
        setActivities(activitiesData);
        setMediaItems(mediaData);
      } catch (error) {
        console.error('❌ Sanity fetch error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Tech grid background overlay */}
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'var(--grid-pattern)' }}></div>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030712]">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/30 rounded-full blur-[120px]"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-1/4 -right-32 w-80 h-80 bg-accent/20 rounded-full blur-[100px]"
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px]"
            animate={{ 
              rotate: [0, 360],
            }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Rotating ring */}
          <motion.div
            className="absolute top-20 right-20 w-32 h-32 border-2 border-primary/30 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-24 right-24 w-24 h-24 border border-primary/20 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Floating squares */}
          <motion.div
            className="absolute bottom-32 left-20 w-16 h-16 border border-primary/40 rotate-45"
            animate={{ y: [-10, 10, -10], rotate: [45, 55, 45] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-40 left-1/4 w-8 h-8 bg-primary/20 rotate-12"
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Dots pattern */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/50 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{ 
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{ 
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Grid lines */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />

        {/* Main content */}
        <div className="relative z-10 container mx-auto px-4 pt-20">
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium backdrop-blur-sm">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                CUET CAD Society
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            >
              <span className="text-foreground">Where </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-emerald-400">
                Creativity
              </span>
              <br />
              <span className="text-foreground">Meets </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-teal-300">
                Engineering
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10"
            >
              Empowering future engineers through design excellence, innovation, and hands-on CAD mastery at CUET.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-16"
            >
              <Link to="/events">
                <Button size="lg" className="px-8 py-6 text-lg font-semibold shadow-2xl shadow-primary/40 hover:shadow-primary/60 transition-all group">
                  <span>Join the Society</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/events">
                <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-primary/50 bg-primary/5 hover:bg-primary/10 hover:border-primary">
                  Explore Events
                </Button>
              </Link>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
                {[
                  { icon: Users, label: 'Active Members', value: '150+' },
                  { icon: Calendar, label: 'Events Organized', value: '50+' },
                  { icon: Award, label: 'Workshops Conducted', value: '30+' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="bg-card/30 backdrop-blur-xl border-primary/20 hover:border-primary/50 transition-all duration-300 overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3 relative">
                        <div className="p-3 bg-primary/20 rounded-xl group-hover:bg-primary/30 transition-colors">
                          <stat.icon className="text-primary" size={28} />
                        </div>
                        <div>
                          <div className="text-3xl md:text-4xl font-bold text-foreground">{stat.value}</div>
                          <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Messages Section */}
      <section className="py-20 bg-background relative">
        {/* Decorative tech elements */}
        <div className="absolute top-20 right-20 w-32 h-32 border-2 border-primary/20 rounded-lg rotate-45"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 border-2 border-primary/20 rounded-full"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-12 text-foreground"
          >
            Words from Our Leaders
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {messages.map((message, index) => (
              <motion.div
                key={message._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <Card className="h-full hover:shadow-2xl hover:shadow-primary/30 transition-all border-border/50 group">
                  <CardContent className="p-8 flex flex-col items-center space-y-6">
                    {message.image ? (
                      <img 
                        src={urlFor(message.image)} 
                        alt={message.name}
                        className="w-32 h-32 rounded-full object-cover ring-4 ring-primary/20 group-hover:ring-primary/50 transition-all"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground text-3xl font-bold ring-4 ring-primary/20 group-hover:ring-primary/50 transition-all">
                        {message.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                    <div className="text-center space-y-2">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{message.name}</h3>
                      <p className="text-sm font-medium text-primary">{message.position}</p>
                    </div>
                    <p className="text-muted-foreground text-center italic leading-relaxed group-hover:text-foreground transition-colors">
                      "{message.message}"
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activities */}
      <section className="py-20 bg-secondary/20 relative">
        {/* Glowing orb effect */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Recent Activities</h2>
            <p className="text-xl text-muted-foreground">Stay updated with our latest events and workshops</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activities.map((activity, index) => (
              <Link key={activity._id} to="/events">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <Card className="hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 group overflow-hidden cursor-pointer border-border/50">
                    {activity.image && (
                      <div className="aspect-video w-full overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent z-10"></div>
                        <img 
                          src={urlFor(activity.image)} 
                          alt={activity.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                    )}
                    <CardContent className="p-6 relative">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-primary/20 rounded-lg group-hover:bg-primary/40 transition-colors">
                          <Calendar className="text-primary" size={24} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{activity.title}</h3>
                          <p className="text-muted-foreground mb-2">{activity.description}</p>
                          <p className="text-sm text-primary font-medium">{new Date(activity.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/events">
              <Button variant="default" size="lg" className="shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/50 transition-all">
                View All Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Media Gallery */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Media Gallery</h2>
            <p className="text-xl text-muted-foreground">Glimpses of our events and activities</p>
          </motion.div>
          
          {mediaItems.length > 0 ? (
            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent>
                {mediaItems.map((item) => (
                  <CarouselItem key={item._id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-2">
                      <div 
                        className="aspect-square rounded-lg overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500 border-2 border-border/30 hover:border-primary/50 group"
                        onClick={() => setLightboxImage({ 
                          src: urlFor(item.image), 
                          alt: item.title || 'Gallery image' 
                        })}
                      >
                        <div className="relative w-full h-full overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <img 
                            src={urlFor(item.image)} 
                            alt={item.title || 'Gallery image'}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {[1, 2, 3, 4, 5, 6].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg overflow-hidden"
                >
                  <div className="w-full h-full bg-card/50 flex items-center justify-center">
                    <span className="text-muted-foreground">Gallery {item}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        {/* Tech accent lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-30"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="text-xl text-muted-foreground">Everything you need to know about CUET CAD Society</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border border-border/50 rounded-lg px-6 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
                <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-primary">
                  What is CUET CAD Society?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  CUET CAD Society is a student-run organization dedicated to promoting Computer-Aided Design skills among engineering students. We organize workshops, events, and competitions to help students master industry-standard CAD tools and software.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border border-border/50 rounded-lg px-6 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
                <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-primary">
                  How can I become a member?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Membership is open to all CUET students. You can register through our Events page when we announce new membership drives, typically at the beginning of each semester. Keep an eye on our social media channels for announcements.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border border-border/50 rounded-lg px-6 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
                <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-primary">
                  What types of events do you organize?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We organize a variety of events including CAD software workshops (AutoCAD, SolidWorks, CATIA), design competitions, guest lectures from industry professionals, project showcases, and networking sessions with alumni working in design and engineering fields.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border border-border/50 rounded-lg px-6 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
                <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-primary">
                  Do I need prior CAD experience to join?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  No prior experience is required! We welcome beginners and offer workshops tailored to different skill levels. Whether you're just starting or looking to advance your skills, our society provides resources and mentorship for everyone.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border border-border/50 rounded-lg px-6 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
                <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-primary">
                  Are there any membership fees?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We keep membership fees minimal to ensure accessibility for all students. The fee covers event costs, workshop materials, and society activities. Specific fee information is provided during registration periods.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border border-border/50 rounded-lg px-6 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
                <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-primary">
                  How can I stay updated with upcoming events?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Follow us on our social media platforms and check the Events page regularly. Members also receive email notifications about upcoming workshops, competitions, and special events. Join our community to never miss an opportunity!
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <ImageLightbox
        src={lightboxImage?.src || ''}
        alt={lightboxImage?.alt || ''}
        isOpen={!!lightboxImage}
        onClose={() => setLightboxImage(null)}
      />
    </div>
  );
};

export default Home;
