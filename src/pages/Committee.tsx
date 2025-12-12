import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { sanityClient, CommitteeMember, urlFor } from '@/lib/sanity';
import { Mail, Linkedin, Facebook, ExternalLink } from 'lucide-react';

const Committee = () => {
  const [members, setMembers] = useState<CommitteeMember[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await sanityClient.fetch('*[_type == "committeeMember"] | order(_createdAt asc)');
        setMembers(data);
      } catch (error) {
        console.error('Sanity fetch error:', error);
      }
    };

    fetchMembers();
  }, []);

  const advisoryMembers = members.filter(m => m.panelType === 'advisory');
  const committeeMembers = members.filter(m => m.panelType === 'committee' || !m.panelType);

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-foreground mb-4">Our Committee</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet the dedicated team leading CUET CAD Society
          </p>
        </motion.div>

        {/* Advisory Panel */}
        {advisoryMembers.length > 0 && (
          <div className="mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-foreground text-center mb-8"
            >
              Advisory Panel
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {advisoryMembers.map((member, index) => (
                <motion.div
                  key={member._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="h-full hover:shadow-xl hover:shadow-primary/10 transition-all group">
                    <CardContent className="p-6 text-center space-y-4">
                      {member.image ? (
                        <img 
                          src={urlFor(member.image)} 
                          alt={member.name}
                          className="w-32 h-32 mx-auto rounded-full object-cover ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all"
                        />
                      ) : (
                        <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground text-3xl font-bold">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                      
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
                        <p className="text-primary font-medium">{member.position}</p>
                        {member.department && (
                          <p className="text-sm text-muted-foreground mt-1">{member.department}</p>
                        )}
                      </div>

                      <div className="flex justify-center gap-2 pt-2">
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="p-2 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                            title="Email"
                          >
                            <Mail size={18} />
                          </a>
                        )}
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                            title="LinkedIn"
                          >
                            <Linkedin size={18} />
                          </a>
                        )}
                        {member.facebook && (
                          <a
                            href={member.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                            title="Facebook"
                          >
                            <Facebook size={18} />
                          </a>
                        )}
                      </div>

                      <Button variant="outline" className="w-full mt-2" asChild>
                        <a href={`mailto:${member.email || ''}`}>
                          Contact
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Committee Panel */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-foreground text-center mb-8"
          >
            Committee Panel
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {committeeMembers.map((member, index) => (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full hover:shadow-xl hover:shadow-primary/10 transition-all group">
                  <CardContent className="p-6 text-center space-y-4">
                    {member.image ? (
                      <img 
                        src={urlFor(member.image)} 
                        alt={member.name}
                        className="w-32 h-32 mx-auto rounded-full object-cover ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all"
                      />
                    ) : (
                      <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground text-3xl font-bold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                    
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
                      <p className="text-primary font-medium">{member.position}</p>
                      {member.department && (
                        <p className="text-sm text-muted-foreground mt-1">{member.department}</p>
                      )}
                    </div>

                    <div className="flex justify-center gap-2 pt-2">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="p-2 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                          title="Email"
                        >
                          <Mail size={18} />
                        </a>
                      )}
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                          title="LinkedIn"
                        >
                          <Linkedin size={18} />
                        </a>
                      )}
                      {member.facebook && (
                        <a
                          href={member.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                          title="Facebook"
                        >
                          <Facebook size={18} />
                        </a>
                      )}
                    </div>

                    <Button variant="outline" className="w-full mt-2" asChild>
                      <a href={`mailto:${member.email || ''}`}>
                        Contact
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Committee;
