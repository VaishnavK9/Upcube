
import { bktEngine, BKTState, QuestionResponse } from './bktService';
import { nlpEngine, NLPAnalysis } from './nlpService';

export interface SkillAnalytics {
  bktScore: number;
  masteryLevel: string;
  learningVelocity: number;
  retentionRate: number;
  recommendations: string[];
  weakAreas: string[];
  strongAreas: string[];
  nlpInsights?: NLPAnalysis;
}

export interface LearningSession {
  sessionId: string;
  userId: string;
  language: string;
  startTime: Date;
  endTime: Date;
  responses: QuestionResponse[];
  bktStates: { [skillArea: string]: BKTState };
  finalScore: number;
}

export class AnalyticsEngine {
  private sessions: Map<string, LearningSession> = new Map();

  // Start a new learning session
  startSession(userId: string, language: string): string {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const session: LearningSession = {
      sessionId,
      userId,
      language,
      startTime: new Date(),
      endTime: new Date(),
      responses: [],
      bktStates: {},
      finalScore: 0
    };
    
    this.sessions.set(sessionId, session);
    return sessionId;
  }

  // Process a question response
  async processResponse(
    sessionId: string,
    questionData: {
      question: string;
      userAnswer: string;
      correctAnswer: string;
      skillArea: string;
      timeSpent: number;
      difficulty: number;
    }
  ): Promise<SkillAnalytics> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    const isCorrect = questionData.userAnswer.toLowerCase().trim() === 
                      questionData.correctAnswer.toLowerCase().trim();

    // Create question response for BKT
    const response: QuestionResponse = {
      correct: isCorrect,
      skillArea: questionData.skillArea,
      difficulty: questionData.difficulty,
      timeSpent: questionData.timeSpent
    };

    // Initialize or update BKT state for this skill area
    if (!session.bktStates[questionData.skillArea]) {
      session.bktStates[questionData.skillArea] = bktEngine.initializeSkill(questionData.skillArea);
    }

    session.bktStates[questionData.skillArea] = bktEngine.updateKnowledge(
      session.bktStates[questionData.skillArea],
      response
    );

    session.responses.push(response);

    // Analyze user response with NLP
    let nlpInsights: NLPAnalysis | undefined;
    try {
      nlpInsights = await nlpEngine.analyzeText({
        text: `${questionData.question} ${questionData.userAnswer}`,
        context: 'quiz_response'
      });
    } catch (error) {
      console.log('NLP analysis not available:', error);
    }

    // Generate analytics
    return this.generateAnalytics(session, questionData.skillArea, nlpInsights);
  }

  // Generate comprehensive analytics
  private generateAnalytics(
    session: LearningSession,
    currentSkillArea: string,
    nlpInsights?: NLPAnalysis
  ): SkillAnalytics {
    const bktState = session.bktStates[currentSkillArea];
    const allStates = Object.values(session.bktStates);

    // Calculate learning velocity (knowledge gained per question)
    const learningVelocity = bktState.questionCount > 0 
      ? (bktState.knowledgeProbability - bktState.parameters.pInit) / bktState.questionCount
      : 0;

    // Calculate retention rate (consistency in correct answers)
    const recentResponses = session.responses.slice(-5); // Last 5 responses
    const retentionRate = recentResponses.length > 0
      ? recentResponses.filter(r => r.correct).length / recentResponses.length
      : 0;

    // Identify weak and strong areas
    const weakAreas = allStates
      .filter(state => state.knowledgeProbability < 0.5)
      .map(state => state.skillArea);

    const strongAreas = allStates
      .filter(state => state.knowledgeProbability > 0.7)
      .map(state => state.skillArea);

    // Generate recommendations
    const bktRecommendations = bktEngine.generateRecommendations(allStates);
    const recommendations = [...bktRecommendations];

    // Add NLP-based recommendations
    if (nlpInsights) {
      if (nlpInsights.sentiment === 'negative') {
        recommendations.push('Consider taking breaks between difficult questions');
      }
      if (nlpInsights.difficulty > 0.8) {
        recommendations.push('Try simplifying your approach to complex problems');
      }
    }

    return {
      bktScore: Math.round(bktState.knowledgeProbability * 100),
      masteryLevel: bktEngine.getMasteryLevel(bktState.knowledgeProbability),
      learningVelocity: Math.round(learningVelocity * 100),
      retentionRate: Math.round(retentionRate * 100),
      recommendations,
      weakAreas,
      strongAreas,
      nlpInsights
    };
  }

  // Finalize session and calculate final analytics
  async finalizeSession(sessionId: string): Promise<{
    finalScore: number;
    overallAnalytics: SkillAnalytics;
    sessionSummary: any;
  }> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    session.endTime = new Date();

    // Calculate final score based on BKT states
    const allStates = Object.values(session.bktStates);
    const finalScore = allStates.length > 0
      ? Math.round(allStates.reduce((sum, state) => sum + state.knowledgeProbability, 0) / allStates.length * 100)
      : 0;

    session.finalScore = finalScore;

    // Generate overall analytics
    const overallBktScore = allStates.length > 0
      ? allStates.reduce((sum, state) => sum + state.knowledgeProbability, 0) / allStates.length
      : 0;

    const overallAnalytics: SkillAnalytics = {
      bktScore: Math.round(overallBktScore * 100),
      masteryLevel: bktEngine.getMasteryLevel(overallBktScore),
      learningVelocity: Math.round(this.calculateOverallLearningVelocity(allStates)),
      retentionRate: Math.round(this.calculateOverallRetentionRate(session.responses)),
      recommendations: bktEngine.generateRecommendations(allStates),
      weakAreas: allStates.filter(s => s.knowledgeProbability < 0.5).map(s => s.skillArea),
      strongAreas: allStates.filter(s => s.knowledgeProbability > 0.7).map(s => s.skillArea)
    };

    const sessionSummary = {
      duration: session.endTime.getTime() - session.startTime.getTime(),
      totalQuestions: session.responses.length,
      correctAnswers: session.responses.filter(r => r.correct).length,
      skillAreasAssessed: Object.keys(session.bktStates).length
    };

    return {
      finalScore,
      overallAnalytics,
      sessionSummary
    };
  }

  private calculateOverallLearningVelocity(states: BKTState[]): number {
    if (states.length === 0) return 0;
    
    const velocities = states.map(state => 
      state.questionCount > 0 
        ? (state.knowledgeProbability - state.parameters.pInit) / state.questionCount
        : 0
    );
    
    return velocities.reduce((sum, v) => sum + v, 0) / velocities.length * 100;
  }

  private calculateOverallRetentionRate(responses: QuestionResponse[]): number {
    if (responses.length === 0) return 0;
    return responses.filter(r => r.correct).length / responses.length * 100;
  }
}

export const analyticsEngine = new AnalyticsEngine();
