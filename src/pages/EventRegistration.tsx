import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { sanityClient } from '@/lib/sanity';
import { Loader2, XCircle, CalendarX, Clock } from 'lucide-react';

interface RegistrationConfig {
  _id: string;
  googleFormUrl: string;
  registrationStartDate: string;
  registrationEndDate: string;
  registrationTitle?: string;
  registrationDescription?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = ({ targetDate, label }: { targetDate: Date; label: string }) => {
  const calculateTimeLeft = useCallback((): TimeLeft => {
    const difference = targetDate.getTime() - new Date().getTime();
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground text-center">{label}</p>
      <div className="grid grid-cols-4 gap-2 md:gap-4">
        {timeUnits.map((unit) => (
          <div
            key={unit.label}
            className="bg-primary/10 border border-primary/20 rounded-lg p-2 md:p-4 text-center"
          >
            <div className="text-2xl md:text-4xl font-bold text-primary tabular-nums">
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground mt-1">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EventRegistration = () => {
  const [config, setConfig] = useState<RegistrationConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
      
      if (!projectId || projectId === 'your-project-id-here') {
        console.warn('⚠️ Sanity not configured');
        setLoading(false);
        return;
      }

      const data = await sanityClient.fetch('*[_type == "registrationConfig"][0]');
      setConfig(data);
    } catch (error) {
      console.error('Error fetching config:', error);
    } finally {
      setLoading(false);
    }
  };

  const isRegistrationOpen = () => {
    if (!config?.registrationStartDate || !config?.registrationEndDate) return false;
    
    const now = new Date();
    const startDate = new Date(config.registrationStartDate);
    const endDate = new Date(config.registrationEndDate);
    
    endDate.setHours(23, 59, 59, 999);
    
    return now >= startDate && now <= endDate;
  };

  const getFormEmbedUrl = () => {
    if (!config?.googleFormUrl) return '';
    
    let url = config.googleFormUrl;
    
    if (url.includes('/viewform')) {
      url = url.replace('/viewform', '/viewform?embedded=true');
    } else if (!url.includes('embedded=true')) {
      url = url + (url.includes('?') ? '&' : '?') + 'embedded=true';
    }
    
    return url;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!config || !config.googleFormUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="text-destructive" />
              Configuration Required
            </CardTitle>
            <CardDescription>
              Registration system is not configured. Please set up the registration configuration in Sanity CMS.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // Registration is closed
  if (!isRegistrationOpen()) {
    const now = new Date();
    const startDate = new Date(config.registrationStartDate);
    const endDate = new Date(config.registrationEndDate);
    const isUpcoming = now < startDate;

    return (
      <div className="min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-lg border-destructive/20">
              <CardHeader className="text-center space-y-4">
                <div className="mx-auto w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
                  <CalendarX className="w-10 h-10 text-destructive" />
                </div>
                <CardTitle className="text-3xl">
                  {isUpcoming ? 'Registration Not Yet Open' : 'Registration Closed'}
                </CardTitle>
                <CardDescription className="text-lg">
                  {isUpcoming 
                    ? 'Registration will open soon. Please check back later.'
                    : 'The registration period has ended. Thank you for your interest!'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {isUpcoming && (
                  <CountdownTimer 
                    targetDate={startDate} 
                    label="Registration opens in:" 
                  />
                )}
                
                <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Registration Period</p>
                      <p className="font-medium">
                        {formatDate(config.registrationStartDate)} - {formatDate(config.registrationEndDate)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  // Registration is open - show embedded form
  const endDate = new Date(config.registrationEndDate);
  endDate.setHours(23, 59, 59, 999);

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">
              {config.registrationTitle || 'Register Now'}
            </h1>
            {config.registrationDescription && (
              <p className="text-muted-foreground text-lg">
                {config.registrationDescription}
              </p>
            )}
            
            {/* Countdown Timer */}
            <div className="max-w-md mx-auto pt-4">
              <CountdownTimer 
                targetDate={endDate} 
                label="Registration closes in:" 
              />
            </div>
          </div>

          {/* Embedded Google Form */}
          <Card className="shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <iframe
                src={getFormEmbedUrl()}
                width="100%"
                height="800"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                className="min-h-[600px] md:min-h-[800px]"
                title="Registration Form"
              >
                Loading…
              </iframe>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default EventRegistration;
