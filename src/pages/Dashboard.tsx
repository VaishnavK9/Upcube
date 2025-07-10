
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { getUserSkillResults, getUserResumeAnalysis } from '@/services/supabaseService';
import { useToast } from '@/hooks/use-toast';
import SkillsAssessedCard from "@/components/dashboard/SkillsAssessedCard";
import ResumeAnalysedCard from "@/components/dashboard/ResumeAnalysedCard";
import SkillsAssessedDetailView from "@/components/dashboard/SkillsAssessedDetailView";
import ResumeAnalysedDetailView from "@/components/dashboard/ResumeAnalysedDetailView";

interface SkillResult {
  id: string;
  language: string;
  score: number;
  weak_areas: string[];
  total_questions: number;
  created_at: string;
}

interface ResumeAnalysis {
  id: string;
  ats_score: number;
  suggestions: string[];
  filename: string;
  created_at: string;
}

type DashboardView = "main" | "skills" | "resume";

const Dashboard = () => {
  const { user, profile, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [skillResults, setSkillResults] = useState<SkillResult[]>([]);
  const [resumeAnalyses, setResumeAnalyses] = useState<ResumeAnalysis[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  const [view, setView] = useState<DashboardView>("main");

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/');
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    if (profile) {
      fetchDashboardData();
    }
  }, [profile]);

  const fetchDashboardData = async () => {
    if (!profile) return;

    setLoadingData(true);
    try {
      const [skillData, resumeData] = await Promise.all([
        getUserSkillResults(profile.id),
        getUserResumeAnalysis(profile.id)
      ]);

      setSkillResults(skillData || []);
      setResumeAnalyses(resumeData || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error loading data",
        description: "Could not load your dashboard data",
        variant: "destructive"
      });
    } finally {
      setLoadingData(false);
    }
  };

  if (isLoading || loadingData) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
          <div className="text-center">
            <div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-base font-medium">Loading dashboard...</p>
          </div>
        </div>
      </>
    );
  }

  if (!user || !profile) {
    return null;
  }

  // Modern quick stats calculations
  const totalTests = skillResults.length;
  const avgScore = totalTests ? Math.round(skillResults.reduce((a, c) => a + c.score, 0) / totalTests) : 0;
  const recentResumeScore = resumeAnalyses.length ? resumeAnalyses[0].ats_score : null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-8 pt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {view === "skills" ? (
            <SkillsAssessedDetailView
              results={skillResults}
              onBack={() => setView("main")}
            />
          ) : view === "resume" ? (
            <ResumeAnalysedDetailView
              analyses={resumeAnalyses}
              onBack={() => setView("main")}
            />
          ) : (
            <div className="space-y-4">
              {/* Header Card */}
              <div className="rounded-2xl bg-white dark:bg-gray-900/70 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center px-8 py-6 mb-2 mt-2">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-1 gradient-text transition-all">Welcome, {profile.name}!</h1>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Your personalized dashboard</p>
                  {profile.college && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">{profile.college}</p>
                  )}
                </div>
              </div>
              {/* Quick Stats Section with slight shadow */}
              <div className="rounded-xl bg-white dark:bg-gray-900/80 shadow-sm px-6 py-4 -mt-2">
                <DashboardQuickStats totalTests={totalTests} avgScore={avgScore} recentResumeScore={recentResumeScore} />
              </div>
              {/* Main Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Sidebar cards */}
                <div className="col-span-1 flex flex-col gap-4">
                  <SkillsAssessedCard
                    results={skillResults}
                    onClick={() => setView("skills")}
                  />
                  <ResumeAnalysedCard
                    analyses={resumeAnalyses}
                    onClick={() => setView("resume")}
                  />
                </div>
                {/* Activity and Tips */}
                <div className="col-span-2 flex flex-col gap-5">
                  <div className="rounded-xl bg-white dark:bg-gray-900/80 shadow px-6 py-4">
                    <DashboardActivity skillResults={skillResults} resumeAnalyses={resumeAnalyses} />
                  </div>
                  <div className="rounded-xl px-4 py-3 bg-blue-100/80 dark:bg-gray-900/60 shadow flex items-center gap-2 text-xs md:text-sm mt-2">
                    <span className="bg-blue-700 text-white px-2 py-1 rounded text-xs font-semibold">🎓 Tip</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Take regular skill assessments and keep your resume updated for better career outcomes!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

import DashboardQuickStats from "@/components/dashboard/DashboardQuickStats";
import DashboardActivity from "@/components/dashboard/DashboardActivity";
export default Dashboard;