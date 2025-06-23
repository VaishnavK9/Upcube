
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface PasswordChangeFormProps {
  profileData: any;
  isLoading: boolean;
  handleInputChange: (field: string, value: string) => void;
  handlePasswordChange: () => void;
}

const PasswordChangeForm: React.FC<PasswordChangeFormProps> = ({
  profileData,
  isLoading,
  handleInputChange,
  handlePasswordChange
}) => (
  <Card className="border-2 border-green-100 hover:border-green-300 transition-shadow hover:shadow-xl">
    <CardHeader>
      <CardTitle className="flex items-center space-x-2">
        <Lock className="w-5 h-5" />
        <span>Change Password</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="currentPassword">Current Password</Label>
          <Input
            id="currentPassword"
            type="password"
            value={profileData.currentPassword}
            onChange={(e) => handleInputChange('currentPassword', e.target.value)}
            placeholder="Enter current password"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            type="password"
            value={profileData.newPassword}
            onChange={(e) => handleInputChange('newPassword', e.target.value)}
            placeholder="Enter new password"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={profileData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            placeholder="Confirm new password"
          />
        </div>
      </div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handlePasswordChange}
            disabled={isLoading || !profileData.currentPassword || !profileData.newPassword}
            variant="outline"
            className="w-full mt-2"
          >
            <Lock className="w-4 h-4 mr-2" />
            {isLoading ? 'Changing...' : 'Change Password'}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>Update your password</span>
        </TooltipContent>
      </Tooltip>
    </CardContent>
  </Card>
);

export default PasswordChangeForm;
