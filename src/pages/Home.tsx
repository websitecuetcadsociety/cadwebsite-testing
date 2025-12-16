import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { sanityClient, Message, Activity, MediaItem, urlFor } from '@/lib/sanity';
import { Calendar, Users, Award, ArrowRight, Quote, Sparkles, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import ImageLightbox from '@/components/ImageLightbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import cadLogo from '../assets/cad-logo.png';
import { useIsMobile } from '@/hooks/use-mobile';

const Home = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);
  const isMobile = useIsMobile();

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

  const stats = [
    { icon: Users, label: 'Active Members', value: '150+', color: 'from-primary to-emerald-400' },
    { icon: Calendar, label: 'Events Organized', value: '50+', color: 'from-accent to-cyan-400' },
    { icon: Award, label: 'Workshops Conducted', value: '30+', color: 'from-primary to-accent' },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background layers */}
        <div className="absolute inset-0 bg-background">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--accent)/0.1),transparent_50%)]" />
        </div>

        {/* Animated grid - desktop only */}
        {!isMobile && (
          <div className="absolute inset-0 opacity-30" style={{ 
            backgroundImage: `linear-gradient(hsl(var(--primary)/0.1) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--primary)/0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        )}

        {/* Floating elements - desktop only */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute top-32 right-[15%] w-20 h-20 border border-primary/30 rounded-full"
              animate={{ y: [-10, 10, -10], rotate: [0, 180, 360] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute bottom-40 left-[10%] w-3 h-3 bg-primary rounded-full"
              animate={{ y: [-20, 20, -20], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-1/2 right-[8%] w-2 h-2 bg-accent rounded-full"
              animate={{ y: [-15, 15, -15] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}

        {/* Hero content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 py-20 lg:py-0">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-6 sm:mb-8"
            >
              <img src={cadLogo} alt="CAD Society" className="h-20 sm:h-24 md:h-28 w-auto" />
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-4 sm:mb-6"
            >
              <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs sm:text-sm font-medium">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                CUET CAD Society
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight"
            >
              <span className="text-foreground">Where </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Creativity
              </span>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              <span className="text-foreground">Meets </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
                Engineering
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl sm:max-w-2xl mb-8 sm:mb-10 px-2"
            >
              Empowering future engineers through design excellence, innovation, and hands-on CAD mastery at CUET.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0"
            >
              <Link to="/events" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all group">
                  Join the Society
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/events" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base border-primary/40 hover:bg-primary/10 hover:border-primary">
                  Explore Events
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-primary/40 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-primary rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-secondary/30 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/30 transition-all group">
                  <CardContent className="p-4 sm:p-6 flex items-center gap-4">
                    <div className={`p-2.5 sm:p-3 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20`}>
                      <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Messages from Leaders */}
      <section className="py-16 sm:py-20 bg-background relative">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
              Words from Our <span className="text-primary">Leaders</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
              Inspiring messages from those who shape our community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {messages.map((message, index) => (
              <motion.div
                key={message._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-card/50 border-border/50 hover:border-primary/30 transition-all group overflow-hidden">
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex items-start gap-4 mb-4">
                      {message.image ? (
                        <img 
                          src={urlFor(message.image)} 
                          alt={message.name}
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover ring-2 ring-primary/30 group-hover:ring-primary/50 transition-all flex-shrink-0"
                        />
                      ) : (
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-lg sm:text-xl font-bold ring-2 ring-primary/30 flex-shrink-0">
                          {message.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                      <div className="min-w-0">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm sm:text-base truncate">
                          {message.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-primary/80">{message.position}</p>
                      </div>
                    </div>
                    <div className="relative">
                      <Quote className="absolute -top-1 -left-1 w-6 h-6 text-primary/20" />
                      <p className="text-muted-foreground text-sm leading-relaxed pl-4 italic">
                        {message.message}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activities */}
      <section className="py-16 sm:py-20 bg-secondary/20 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-12"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
                Recent <span className="text-primary">Activities</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                Stay updated with our latest events and workshops
              </p>
            </div>
            <Link to="/events" className="hidden sm:block">
              <Button variant="ghost" className="text-primary hover:text-primary/80 group">
                View All
                <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {activities.map((activity, index) => (
              <Link key={activity._id} to="/events">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group cursor-pointer bg-card/50 border-border/50 hover:border-primary/30 transition-all overflow-hidden">
                    {activity.image && (
                      <div className="aspect-video relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent z-10" />
                        <img 
                          src={urlFor(activity.image)} 
                          alt={activity.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute bottom-3 left-3 z-20">
                          <span className="px-2 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded">
                            {new Date(activity.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                      </div>
                    )}
                    <CardContent className="p-4 sm:p-5">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2 text-sm sm:text-base">
                        {activity.title}
                      </h3>
                      <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2">
                        {activity.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Link to="/events">
              <Button className="w-full">View All Events</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Media Gallery */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
              Media <span className="text-primary">Gallery</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Glimpses of our events and activities
            </p>
          </motion.div>
          
          {mediaItems.length > 0 ? (
            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent className="-ml-2 sm:-ml-4">
                {mediaItems.map((item) => (
                  <CarouselItem key={item._id} className="pl-2 sm:pl-4 basis-1/2 md:basis-1/3">
                    <div 
                      className="aspect-square rounded-lg overflow-hidden cursor-pointer border border-border/50 hover:border-primary/50 transition-all group"
                      onClick={() => setLightboxImage({ 
                        src: urlFor(item.image), 
                        alt: item.title || 'Gallery image' 
                      })}
                    >
                      <img 
                        src={urlFor(item.image)} 
                        alt={item.title || 'Gallery image'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex -left-4" />
              <CarouselNext className="hidden sm:flex -right-4" />
            </Carousel>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="aspect-square bg-card/50 border border-border/50 rounded-lg flex items-center justify-center"
                >
                  <span className="text-muted-foreground text-xs sm:text-sm">Gallery {item}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Everything you need to know about CUET CAD Society
            </p>
          </motion.div>
          
          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {[
                {
                  q: "What is CUET CAD Society?",
                  a: "CUET CAD Society is a student-run organization dedicated to promoting Computer-Aided Design skills among engineering students. We organize workshops, events, and competitions to help students master industry-standard CAD tools."
                },
                {
                  q: "How can I become a member?",
                  a: "Membership is open to all CUET students. You can register through our Events page when we announce new membership drives, typically at the beginning of each semester."
                },
                {
                  q: "What types of events do you organize?",
                  a: "We organize CAD software workshops (AutoCAD, SolidWorks, CATIA), design competitions, guest lectures from industry professionals, project showcases, and networking sessions with alumni."
                },
                {
                  q: "Do I need prior CAD experience to join?",
                  a: "No prior experience is required! We welcome beginners and offer workshops tailored to different skill levels. Whether you're just starting or looking to advance, we have resources for everyone."
                },
                {
                  q: "Are there any membership fees?",
                  a: "We keep membership fees minimal to ensure accessibility. The fee covers event costs, workshop materials, and society activities. Specific fee information is provided during registration."
                },
                {
                  q: "How can I stay updated with upcoming events?",
                  a: "Follow us on our social media platforms and check the Events page regularly. Members also receive email notifications about upcoming workshops, competitions, and special events."
                }
              ].map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="border border-border/50 rounded-lg px-4 sm:px-6 bg-card/30 data-[state=open]:border-primary/30"
                >
                  <AccordionTrigger className="text-sm sm:text-base font-medium text-foreground hover:text-primary py-4">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
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
