
import { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Save } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface BasicInfoFormProps {
  profileData: any;
  isLoading: boolean;
  handleInputChange: (field: string, value: string) => void;
  handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdateProfile: () => void;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({
  profileData,
  isLoading,
  handleInputChange,
  handleAvatarChange,
  handleUpdateProfile
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <Card className="border-2 border-blue-100 hover:border-blue-300 transition-shadow hover:shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="w-5 h-5" />
          <span>Basic Information</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center mb-2">
          <label htmlFor="avatar" className="cursor-pointer">
            {profileData.avatarFile ? (
              <img
                src={URL.createObjectURL(profileData.avatarFile)}
                alt="avatar preview"
                className="w-20 h-20 object-cover rounded-full border-2 border-blue-300 shadow"
              />
            ) : profileData.avatar_url ? (
              <img
                src={profileData.avatar_url}
                alt="avatar"
                className="w-20 h-20 object-cover rounded-full border-2 border-blue-300 shadow"
              />
            ) : (
              <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 border shadow">
                <User className="w-10 h-10 text-gray-400" />
              </div>
            )}
            <input
              ref={fileInputRef}
              id="avatar"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </label>
          <div className="text-gray-500 text-xs mt-1">Tap to change avatar</div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={profileData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="college">College/University</Label>
            <Input
              id="college"
              value={profileData.college}
              onChange={(e) => handleInputChange('college', e.target.value)}
              placeholder="Enter your college or university name"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              min={0}
              value={profileData.age}
              onChange={(e) => handleInputChange('age', e.target.value)}
              placeholder="Enter your age"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              type="date"
              value={profileData.date_of_birth}
              onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={profileData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={profileData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="e.g. Mumbai, India"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin_url">LinkedIn Profile URL</Label>
          <Input
            id="linkedin_url"
            type="url"
            value={profileData.linkedin_url}
            onChange={(e) => handleInputChange('linkedin_url', e.target.value)}
            placeholder="https://www.linkedin.com/in/yourusername"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio / About</Label>
          <Input
            id="bio"
            value={profileData.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            placeholder="Write something about yourself..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={profileData.email}
            disabled
            className="bg-gray-100 dark:bg-gray-800"
          />
          <p className="text-sm text-gray-500">Email cannot be changed</p>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={handleUpdateProfile} disabled={isLoading} className="w-full mt-2">
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Updating...' : 'Update Profile'}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Save your changes</span>
          </TooltipContent>
        </Tooltip>
      </CardContent>
    </Card>
  );
};

export default BasicInfoForm;
