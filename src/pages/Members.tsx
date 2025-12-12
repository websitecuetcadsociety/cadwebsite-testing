import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { sanityClient, Member } from '@/lib/sanity';
import { Search, Mail } from 'lucide-react';

const Members = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
        
        if (!projectId || projectId === 'your-project-id-here') {
          console.warn('⚠️ Sanity not configured. Please add your Sanity project credentials to .env file.');
          console.info('📖 See QUICKSTART.md for setup instructions.');
          return;
        }

        const data = await sanityClient.fetch('*[_type == "member"] | order(name asc)');
        setMembers(data);
      } catch (error) {
        console.error('❌ Sanity fetch error:', error);
        console.info('💡 Make sure you have created the "member" schema in Sanity Studio.');
        console.info('📖 See SANITY_SETUP.md for schema definitions.');
      }
    };

    fetchMembers();
  }, []);

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.studentId.includes(searchTerm) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-foreground mb-6 bg-clip-text"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our Members
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Connect with fellow CAD enthusiasts and society members
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            className="max-w-md mx-auto relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="Search by name, ID, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 shadow-lg shadow-primary/10 border-border/50 focus:shadow-xl focus:shadow-primary/20 transition-all"
            />
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member, index) => (
            <motion.div
              key={member._id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Card className="h-full hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 border-border/50 group">
                <CardContent className="p-6 space-y-3 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Avatar */}
                  <motion.div 
                    className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-background text-xl font-bold shadow-lg shadow-primary/30 relative z-10"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </motion.div>
                  
                  <div className="text-center relative z-10">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.studentId}</p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-border relative z-10">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Department:</span>
                      <p className="text-foreground font-medium">{member.department}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="shadow-sm">Batch {member.batch}</Badge>
                      {member.email && (
                        <motion.a
                          href={`mailto:${member.email}`}
                          className="p-2 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors shadow-md"
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Mail size={16} />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-muted-foreground text-lg">No members found matching your search.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Members;
