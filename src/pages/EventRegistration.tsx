import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { sanityClient } from '@/lib/sanity';
import { Loader2, Upload, CheckCircle, XCircle } from 'lucide-react';

interface RegistrationConfig {
  _id: string;
  sheetId: string;
  memberDriveFolderId: string;
  eventDriveFolderId: string;
  workshopDriveFolderId: string;
  scriptUrl: string;
  registrationOpen: boolean;
  memberRegistrationOpen?: boolean;
  eventRegistrationOpen?: boolean;
  workshopRegistrationOpen?: boolean;
}

const EventRegistration = () => {
  const [config, setConfig] = useState<RegistrationConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    year: '',
    registrationType: '',
    batchNo: '',
    mobileNo: '',
    linkedinId: '',
    facebookId: '',
    paymentMethod: '',
    transactionId: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

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
      toast({
        title: "Configuration Error",
        description: "Unable to load registration settings.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select a valid image file.",
          variant: "destructive",
        });
        return;
      }

      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const isRegistrationOpen = () => {
    if (!config) return false;
    
    // Check specific type if selected
    if (formData.registrationType === 'member' && config.memberRegistrationOpen !== undefined) {
      return config.memberRegistrationOpen;
    }
    if (formData.registrationType === 'event' && config.eventRegistrationOpen !== undefined) {
      return config.eventRegistrationOpen;
    }
    if (formData.registrationType === 'workshop' && config.workshopRegistrationOpen !== undefined) {
      return config.workshopRegistrationOpen;
    }
    
    // Fallback to global registration flag
    return config.registrationOpen;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!config || !config.scriptUrl) {
      toast({
        title: "Configuration Error",
        description: "Registration system is not properly configured.",
        variant: "destructive",
      });
      return;
    }

    if (!isRegistrationOpen()) {
      toast({
        title: "Registration Closed",
        description: "Registration for this type is currently closed.",
        variant: "destructive",
      });
      return;
    }

    if (!imageFile) {
      toast({
        title: "Image Required",
        description: "Please upload your photo.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      // Convert image to base64
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      
      reader.onload = async () => {
        const base64Image = reader.result as string;
        
        // Select the appropriate folder ID based on registration type
        let driveFolderId = '';
        switch(formData.registrationType) {
          case 'member':
            driveFolderId = config.memberDriveFolderId;
            break;
          case 'event':
            driveFolderId = config.eventDriveFolderId;
            break;
          case 'workshop':
            driveFolderId = config.workshopDriveFolderId;
            break;
        }
        
        // Prepare form data for Google Apps Script
        const payload = {
          name: formData.name.trim(),
          email: formData.email.trim(),
          department: formData.department.trim(),
          year: formData.year.trim(),
          registrationType: formData.registrationType,
          batchNo: formData.batchNo.trim(),
          mobileNo: formData.mobileNo.trim(),
          linkedinId: formData.linkedinId.trim(),
          facebookId: formData.facebookId.trim(),
          paymentMethod: formData.paymentMethod,
          transactionId: formData.transactionId.trim(),
          image: base64Image,
          imageFileName: imageFile.name,
          sheetId: config.sheetId,
          driveFolderId: driveFolderId,
        };

        // Submit to Google Apps Script
        const response = await fetch(config.scriptUrl, {
          method: 'POST',
          mode: 'no-cors', // Google Apps Script requires this
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        // Note: no-cors mode means we can't read the response
        // We assume success if no error was thrown
        toast({
          title: "Registration Successful!",
          description: "Your registration has been submitted successfully.",
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          department: '',
          year: '',
          registrationType: '',
          batchNo: '',
          mobileNo: '',
          linkedinId: '',
          facebookId: '',
          paymentMethod: '',
          transactionId: '',
        });
        setImageFile(null);
        setImagePreview('');
        
        // Reset file input
        const fileInput = document.getElementById('image-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        
      };

      reader.onerror = () => {
        throw new Error('Failed to read image file');
      };

    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!config) {
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

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl text-center">Register Now</CardTitle>
              <CardDescription className="text-center">
                Join CUET CAD Society - Register for membership, events, or workshops
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Registration Type */}
                <div className="space-y-2">
                  <Label htmlFor="registrationType">Registration Type *</Label>
                  <Select
                    value={formData.registrationType}
                    onValueChange={(value) => setFormData({ ...formData, registrationType: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select registration type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="member">Member Registration</SelectItem>
                      <SelectItem value="event">Event Registration</SelectItem>
                      <SelectItem value="workshop">Workshop Registration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    maxLength={100}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    maxLength={255}
                  />
                </div>

                {/* Department */}
                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Input
                    id="department"
                    type="text"
                    placeholder="e.g., Computer Science & Engineering"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    required
                    maxLength={100}
                  />
                </div>

                {/* Year */}
                <div className="space-y-2">
                  <Label htmlFor="year">Academic Year *</Label>
                  <Select
                    value={formData.year}
                    onValueChange={(value) => setFormData({ ...formData, year: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1st">1st Year</SelectItem>
                      <SelectItem value="2nd">2nd Year</SelectItem>
                      <SelectItem value="3rd">3rd Year</SelectItem>
                      <SelectItem value="4th">4th Year</SelectItem>
                      <SelectItem value="graduate">Graduate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Batch No */}
                <div className="space-y-2">
                  <Label htmlFor="batchNo">Batch Number *</Label>
                  <Input
                    id="batchNo"
                    type="text"
                    placeholder="e.g., 2024"
                    value={formData.batchNo}
                    onChange={(e) => setFormData({ ...formData, batchNo: e.target.value })}
                    required
                    maxLength={10}
                  />
                </div>

                {/* Mobile No */}
                <div className="space-y-2">
                  <Label htmlFor="mobileNo">Mobile Number *</Label>
                  <Input
                    id="mobileNo"
                    type="tel"
                    placeholder="e.g., +8801XXXXXXXXX"
                    value={formData.mobileNo}
                    onChange={(e) => setFormData({ ...formData, mobileNo: e.target.value })}
                    required
                    maxLength={20}
                  />
                </div>

                {/* LinkedIn ID */}
                <div className="space-y-2">
                  <Label htmlFor="linkedinId">LinkedIn Profile URL</Label>
                  <Input
                    id="linkedinId"
                    type="url"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={formData.linkedinId}
                    onChange={(e) => setFormData({ ...formData, linkedinId: e.target.value })}
                    maxLength={255}
                  />
                </div>

                {/* Facebook ID */}
                <div className="space-y-2">
                  <Label htmlFor="facebookId">Facebook Profile URL</Label>
                  <Input
                    id="facebookId"
                    type="url"
                    placeholder="https://facebook.com/yourprofile"
                    value={formData.facebookId}
                    onChange={(e) => setFormData({ ...formData, facebookId: e.target.value })}
                    maxLength={255}
                  />
                </div>

                {/* Payment Method */}
                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Payment Method *</Label>
                  <Select
                    value={formData.paymentMethod}
                    onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bkash">bKash</SelectItem>
                      <SelectItem value="nagad">Nagad</SelectItem>
                      <SelectItem value="rocket">Rocket</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Transaction ID */}
                <div className="space-y-2">
                  <Label htmlFor="transactionId">Transaction ID *</Label>
                  <Input
                    id="transactionId"
                    type="text"
                    placeholder="Enter your transaction ID"
                    value={formData.transactionId}
                    onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                    required
                    maxLength={50}
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label htmlFor="image-upload">Upload Your Photo *</Label>
                  <div className="flex flex-col items-center gap-4">
                    {imagePreview && (
                      <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-primary">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-2 w-full">
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="cursor-pointer"
                        required
                      />
                      <Upload className="text-muted-foreground" size={20} />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Max file size: 5MB. Supported formats: JPG, PNG, WEBP
                    </p>
                  </div>
                </div>

                {/* Status Message */}
                {!isRegistrationOpen() && formData.registrationType && (
                  <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
                    <p className="text-sm text-destructive font-medium flex items-center gap-2">
                      <XCircle size={16} />
                      Registration is currently closed for {formData.registrationType}s
                    </p>
                  </div>
                )}

                {isRegistrationOpen() && formData.registrationType && (
                  <div className="p-4 bg-primary/10 border border-primary rounded-lg">
                    <p className="text-sm text-primary font-medium flex items-center gap-2">
                      <CheckCircle size={16} />
                      Registration is open for {formData.registrationType}s
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={submitting || !isRegistrationOpen()}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Registration'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default EventRegistration;
