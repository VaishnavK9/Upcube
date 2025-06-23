
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { updateProfile, updatePassword } from '@/services/supabaseService';
import Navbar from "@/components/Navbar";
import BasicInfoForm from "@/components/profile/BasicInfoForm";
import PasswordChangeForm from "@/components/profile/PasswordChangeForm";

const Profile = () => {
  const { user, profile, refreshProfile } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    college: '',
    age: '',
    date_of_birth: '',
    phone: '',
    location: '',
    linkedin_url: '',
    bio: '',
    avatar_url: '',
    avatarFile: null as File | null,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (profile) {
      setProfileData(prev => ({
        ...prev,
        name: profile.name || '',
        email: profile.email || '',
        college: profile.college || '',
        age: profile.age?.toString() || '',
        date_of_birth: profile.date_of_birth || '',
        phone: profile.phone || '',
        location: profile.location || '',
        linkedin_url: profile.linkedin_url || '',
        bio: profile.bio || '',
        avatar_url: profile.avatar_url || ''
      }));
    }
  }, [profile]);

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileData(prev => ({ ...prev, avatarFile: file }));
    }
  };

  const handleUpdateProfile = async () => {
    if (!user || !profile) return;

    setIsLoading(true);
    try {
      const updateData = {
        name: profileData.name,
        college: profileData.college,
        age: profileData.age ? parseInt(profileData.age) : null,
        date_of_birth: profileData.date_of_birth,
        phone: profileData.phone,
        location: profileData.location,
        linkedin_url: profileData.linkedin_url,
        bio: profileData.bio
      };

      await updateProfile(profile.id, updateData, profileData.avatarFile);
      await refreshProfile();
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated."
      });
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!user) return;

    if (profileData.newPassword !== profileData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (profileData.newPassword.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      await updatePassword(profileData.currentPassword, profileData.newPassword);
      
      setProfileData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));

      toast({
        title: "Password Updated",
        description: "Your password has been successfully changed."
      });
    } catch (error: any) {
      toast({
        title: "Password Update Failed",
        description: error.message || "Failed to update password",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 gradient-text">Profile Settings</h1>
        
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic">
            <BasicInfoForm
              profileData={profileData}
              isLoading={isLoading}
              handleInputChange={handleInputChange}
              handleAvatarChange={handleAvatarChange}
              handleUpdateProfile={handleUpdateProfile}
            />
          </TabsContent>
          
          <TabsContent value="password">
            <PasswordChangeForm
              profileData={profileData}
              isLoading={isLoading}
              handleInputChange={handleInputChange}
              handlePasswordChange={handlePasswordChange}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
