
// Natural Language Processing Service
export interface NLPAnalysis {
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  keyPhrases: string[];
  topics: string[];
  difficulty: number;
  comprehension: number;
}

export interface TextAnalysisRequest {
  text: string;
  context?: 'quiz_response' | 'feedback' | 'question' | 'general';
  language?: string;
}

export class NLPEngine {
  // Basic sentiment analysis (fallback implementation)
  private basicSentimentAnalysis(text: string): { sentiment: 'positive' | 'negative' | 'neutral'; confidence: number } {
    const positiveWords = ['good', 'great', 'excellent', 'love', 'like', 'awesome', 'fantastic', 'wonderful'];
    const negativeWords = ['bad', 'terrible', 'hate', 'dislike', 'awful', 'horrible', 'poor', 'worst'];
    
    const words = text.toLowerCase().split(/\W+/);
    let positiveCount = 0;
    let negativeCount = 0;
    
    words.forEach(word => {
      if (positiveWords.includes(word)) positiveCount++;
      if (negativeWords.includes(word)) negativeCount++;
    });
    
    const total = positiveCount + negativeCount;
    if (total === 0) return { sentiment: 'neutral', confidence: 0.5 };
    
    const positiveRatio = positiveCount / total;
    if (positiveRatio > 0.6) return { sentiment: 'positive', confidence: positiveRatio };
    if (positiveRatio < 0.4) return { sentiment: 'negative', confidence: 1 - positiveRatio };
    return { sentiment: 'neutral', confidence: 0.5 };
  }

  // Extract key phrases from text
  private extractKeyPhrases(text: string): string[] {
    const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should'];
    
    const words = text.toLowerCase()
      .split(/\W+/)
      .filter(word => word.length > 3 && !commonWords.includes(word));
    
    // Simple frequency-based key phrase extraction
    const wordCount: { [key: string]: number } = {};
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });
    
    return Object.entries(wordCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([word]) => word);
  }

  // Analyze text difficulty
  private analyzeDifficulty(text: string): number {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.split(/\W+/).filter(w => w.length > 0);
    
    if (sentences.length === 0 || words.length === 0) return 0;
    
    const avgWordsPerSentence = words.length / sentences.length;
    const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / words.length;
    
    // Simple difficulty calculation (normalized to 0-1)
    const difficulty = Math.min(1, (avgWordsPerSentence / 20 + avgWordLength / 10) / 2);
    return difficulty;
  }

  // Main analysis function
  async analyzeText(request: TextAnalysisRequest): Promise<NLPAnalysis> {
    try {
      // Try to use your NLP API through edge function
      const response = await fetch('/api/nlp-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      });

      if (response.ok) {
        const data = await response.json();
        return {
          sentiment: data.sentiment || 'neutral',
          confidence: data.confidence || 0.5,
          keyPhrases: data.keyPhrases || [],
          topics: data.topics || [],
          difficulty: data.difficulty || 0.5,
          comprehension: data.comprehension || 0.5
        };
      } else {
        console.log('NLP API not available, using fallback analysis');
        return this.basicAnalysis(request.text);
      }
    } catch (error) {
      console.log('NLP analysis error, using fallback:', error);
      return this.basicAnalysis(request.text);
    }
  }

  // Basic fallback analysis
  private basicAnalysis(text: string): NLPAnalysis {
    const sentiment = this.basicSentimentAnalysis(text);
    const keyPhrases = this.extractKeyPhrases(text);
    const difficulty = this.analyzeDifficulty(text);
    
    return {
      sentiment: sentiment.sentiment,
      confidence: sentiment.confidence,
      keyPhrases,
      topics: keyPhrases.slice(0, 3), // Use key phrases as topics
      difficulty,
      comprehension: 1 - difficulty // Inverse relationship for basic analysis
    };
  }

  // Analyze quiz performance with NLP insights
  async analyzeQuizPerformance(responses: string[], correctAnswers: boolean[]): Promise<{
    overallSentiment: string;
    learningPatterns: string[];
    recommendations: string[];
  }> {
    const analyses = await Promise.all(
      responses.map(response => this.analyzeText({ text: response, context: 'quiz_response' }))
    );
    
    const sentiments = analyses.map(a => a.sentiment);
    const difficulties = analyses.map(a => a.difficulty);
    
    // Calculate overall sentiment
    const posCount = sentiments.filter(s => s === 'positive').length;
    const negCount = sentiments.filter(s => s === 'negative').length;
    const overallSentiment = posCount > negCount ? 'positive' : negCount > posCount ? 'negative' : 'neutral';
    
    // Identify learning patterns
    const learningPatterns: string[] = [];
    const avgDifficulty = difficulties.reduce((sum, d) => sum + d, 0) / difficulties.length;
    
    if (avgDifficulty > 0.7) {
      learningPatterns.push('High complexity in responses - may indicate advanced understanding or confusion');
    } else if (avgDifficulty < 0.3) {
      learningPatterns.push('Simple response patterns - may indicate basic understanding or lack of detail');
    }
    
    // Generate recommendations
    const recommendations: string[] = [];
    if (overallSentiment === 'negative') {
      recommendations.push('Consider reviewing fundamental concepts');
      recommendations.push('Try breaking down complex problems into smaller steps');
    } else if (overallSentiment === 'positive') {
      recommendations.push('Great progress! Consider exploring advanced topics');
    }
    
    return {
      overallSentiment,
      learningPatterns,
      recommendations
    };
  }
}

export const nlpEngine = new NLPEngine();
