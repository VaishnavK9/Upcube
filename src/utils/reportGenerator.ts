
import jsPDF from 'jspdf';

interface AnalysisResults {
  overallScore: number;
  atsCompatibility: number;
  grammarScore: number;
  formattingScore: number;
  keywordMatch: number;
  atsIssues: string[];
  grammarIssues: string[];
  suggestions: string[];
  strengths: string[];
  improvements: string[];
}

export const generateDetailedReport = (results: AnalysisResults, filename: string) => {
  try {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;
    const margin = 20;
    let yPosition = 30;

    // Helper function to check if we need a new page
    const checkNewPage = (additionalHeight = 20) => {
      if (yPosition + additionalHeight > pageHeight - margin) {
        pdf.addPage();
        yPosition = 30;
      }
    };

    // Title
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Resume Analysis Report', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 20;

    // File info
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`File: ${filename}`, margin, yPosition);
    yPosition += 10;
    pdf.text(`Generated: ${new Date().toLocaleDateString()}`, margin, yPosition);
    yPosition += 20;

    // Scores section
    checkNewPage(80);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Analysis Scores', margin, yPosition);
    yPosition += 15;

    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    const scores = [
      `Overall Score: ${results.overallScore}%`,
      `ATS Compatibility: ${results.atsCompatibility}%`,
      `Grammar Score: ${results.grammarScore}%`,
      `Formatting Score: ${results.formattingScore}%`,
      `Keyword Match: ${results.keywordMatch}%`
    ];

    scores.forEach(score => {
      pdf.text(score, margin, yPosition);
      yPosition += 8;
    });
    yPosition += 15;

    // Helper function to add section with items
    const addSection = (title: string, items: string[]) => {
      checkNewPage(60);

      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text(title, margin, yPosition);
      yPosition += 12;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      
      items.forEach(item => {
        const maxWidth = pageWidth - 2 * margin;
        const lines = pdf.splitTextToSize(`• ${item}`, maxWidth);
        
        checkNewPage(lines.length * 6 + 5);
        
        lines.forEach((line: string) => {
          pdf.text(line, margin + 5, yPosition);
          yPosition += 6;
        });
        yPosition += 3;
      });
      yPosition += 8;
    };

    // Add sections
    addSection('ATS Compatibility Issues', results.atsIssues);
    addSection('Grammar & Style Issues', results.grammarIssues);
    addSection('Strengths', results.strengths);
    addSection('Areas for Improvement', results.improvements);
    addSection('AI Recommendations', results.suggestions);

    // Save the PDF
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    pdf.save(`resume-analysis-report-${timestamp}.pdf`);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF report:', error);
    throw new Error('Failed to generate PDF report');
  }
};
