import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Users, Lightbulb, Trophy } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To provide comprehensive CAD education and foster innovation in engineering design among students.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a strong community of designers and engineers passionate about CAD technology.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Encouraging creative thinking and innovative solutions through hands-on CAD projects.',
    },
    {
      icon: Trophy,
      title: 'Excellence',
      description: 'Striving for excellence in every workshop, event, and competition we organize.',
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-foreground mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-foreground"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            About CUET CAD Society
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Empowering the next generation of engineers and designers with cutting-edge CAD skills
          </motion.p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <Card className="overflow-hidden shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 border-border/50">
            <CardContent className="p-8 md:p-12 relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded with a vision to bridge the gap between academic learning and industry requirements, 
                  CUET CAD Society has been at the forefront of promoting Computer-Aided Design education among 
                  engineering students at Chittagong University of Engineering & Technology.
                </p>
                <p>
                  Since our inception, we have organized numerous workshops, training sessions, and competitions 
                  that have helped hundreds of students master various CAD software including AutoCAD, SolidWorks, 
                  CATIA, and more. Our society serves as a platform where students can learn, practice, and 
                  showcase their CAD skills.
                </p>
                <p>
                  We believe in hands-on learning and practical application. Through our regular activities, 
                  we ensure that members gain not just theoretical knowledge but also practical expertise that 
                  makes them industry-ready professionals.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <motion.h2 
            className="text-4xl font-bold text-foreground text-center mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            Our Core Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                whileHover={{ y: -8 }}
              >
                <Card className="h-full hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500 border-border/50 group">
                  <CardContent className="p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="flex items-start space-x-4 relative z-10">
                      <motion.div 
                        className="p-3 bg-primary/20 rounded-lg group-hover:bg-primary/30 group-hover:shadow-lg group-hover:shadow-primary/40 transition-all duration-300"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <value.icon className="text-primary" size={28} />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{value.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* What We Offer */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 border-border/50">
            <CardContent className="p-8 md:p-12 relative overflow-hidden">
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
              <h2 className="text-3xl font-bold text-foreground mb-8 relative z-10">What We Offer</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div className="space-y-4">
                  <motion.div 
                    className="flex items-start space-x-3 group"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 group-hover:scale-150 transition-transform"></div>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors">Regular workshops on popular CAD software</p>
                  </motion.div>
                  <motion.div 
                    className="flex items-start space-x-3 group"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 group-hover:scale-150 transition-transform"></div>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors">Inter-university CAD competitions</p>
                  </motion.div>
                  <motion.div 
                    className="flex items-start space-x-3 group"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 group-hover:scale-150 transition-transform"></div>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors">Industry expert sessions and seminars</p>
                  </motion.div>
                  <motion.div 
                    className="flex items-start space-x-3 group"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 group-hover:scale-150 transition-transform"></div>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors">Hands-on project-based learning</p>
                  </motion.div>
                </div>
                <div className="space-y-4">
                  <motion.div 
                    className="flex items-start space-x-3 group"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 group-hover:scale-150 transition-transform"></div>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors">Certification programs in CAD software</p>
                  </motion.div>
                  <motion.div 
                    className="flex items-start space-x-3 group"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 group-hover:scale-150 transition-transform"></div>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors">Networking opportunities with professionals</p>
                  </motion.div>
                  <motion.div 
                    className="flex items-start space-x-3 group"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 group-hover:scale-150 transition-transform"></div>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors">Access to CAD resources and tutorials</p>
                  </motion.div>
                  <motion.div 
                    className="flex items-start space-x-3 group"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 group-hover:scale-150 transition-transform"></div>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors">Career guidance and mentorship</p>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
