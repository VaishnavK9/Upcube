
// Bayesian Knowledge Tracing Service
export interface BKTParameters {
  pInit: number;    // Initial knowledge probability
  pTransit: number; // Learning transition probability
  pSlip: number;    // Slip probability (known but answered wrong)
  pGuess: number;   // Guess probability (unknown but answered right)
}

export interface BKTState {
  knowledgeProbability: number;
  skillArea: string;
  questionCount: number;
  correctCount: number;
  parameters: BKTParameters;
}

export interface QuestionResponse {
  correct: boolean;
  skillArea: string;
  difficulty: number;
  timeSpent: number;
}

export class BKTEngine {
  private defaultParameters: BKTParameters = {
    pInit: 0.1,     // 10% initial knowledge
    pTransit: 0.3,  // 30% learning rate
    pSlip: 0.1,     // 10% slip rate
    pGuess: 0.2     // 20% guess rate
  };

  // Initialize BKT state for a skill area
  initializeSkill(skillArea: string, customParams?: Partial<BKTParameters>): BKTState {
    const parameters = { ...this.defaultParameters, ...customParams };
    
    return {
      knowledgeProbability: parameters.pInit,
      skillArea,
      questionCount: 0,
      correctCount: 0,
      parameters
    };
  }

  // Update knowledge probability based on question response
  updateKnowledge(state: BKTState, response: QuestionResponse): BKTState {
    const { pTransit, pSlip, pGuess } = state.parameters;
    const { correct } = response;
    
    // Current knowledge probability
    const pKnow = state.knowledgeProbability;
    
    // Probability of correct answer given knowledge state
    const pCorrectGivenKnow = correct ? (1 - pSlip) : pSlip;
    const pCorrectGivenNotKnow = correct ? pGuess : (1 - pGuess);
    
    // Total probability of the observed response
    const pObserved = pKnow * pCorrectGivenKnow + (1 - pKnow) * pCorrectGivenNotKnow;
    
    // Update knowledge probability using Bayes' theorem
    const pKnowGivenObserved = (pKnow * pCorrectGivenKnow) / pObserved;
    
    // Apply learning transition
    const newKnowledgeProbability = pKnowGivenObserved + (1 - pKnowGivenObserved) * pTransit;
    
    return {
      ...state,
      knowledgeProbability: Math.min(0.99, Math.max(0.01, newKnowledgeProbability)),
      questionCount: state.questionCount + 1,
      correctCount: state.correctCount + (correct ? 1 : 0)
    };
  }

  // Calculate mastery level
  getMasteryLevel(knowledgeProbability: number): 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' {
    if (knowledgeProbability >= 0.9) return 'Expert';
    if (knowledgeProbability >= 0.7) return 'Advanced';
    if (knowledgeProbability >= 0.5) return 'Intermediate';
    return 'Beginner';
  }

  // Generate personalized recommendations
  generateRecommendations(states: BKTState[]): string[] {
    const recommendations: string[] = [];
    
    states.forEach(state => {
      const mastery = this.getMasteryLevel(state.knowledgeProbability);
      const accuracy = state.questionCount > 0 ? state.correctCount / state.questionCount : 0;
      
      if (state.knowledgeProbability < 0.3) {
        recommendations.push(`Focus on ${state.skillArea} fundamentals - current mastery: ${mastery}`);
      } else if (state.knowledgeProbability < 0.7 && accuracy < 0.6) {
        recommendations.push(`Practice more ${state.skillArea} problems to improve consistency`);
      } else if (state.knowledgeProbability >= 0.7) {
        recommendations.push(`Excellent progress in ${state.skillArea}! Consider advanced topics`);
      }
    });
    
    return recommendations;
  }
}

export const bktEngine = new BKTEngine();
