
import jsPDF from 'jspdf';

export interface CertificateData {
  userName: string;
  language: string;
  score: number;
  date: string;
}

export const generateCertificate = (data: CertificateData) => {
  const pdf = new jsPDF('landscape', 'mm', 'a4');
  
  // Set background color
  pdf.setFillColor(240, 248, 255);
  pdf.rect(0, 0, 297, 210, 'F');
  
  // Border
  pdf.setDrawColor(59, 130, 246);
  pdf.setLineWidth(2);
  pdf.rect(10, 10, 277, 190);
  
  // Inner border
  pdf.setLineWidth(1);
  pdf.rect(15, 15, 267, 180);
  
  // Title
  pdf.setFontSize(32);
  pdf.setTextColor(59, 130, 246);
  pdf.setFont('helvetica', 'bold');
  pdf.text('CERTIFICATE OF ACHIEVEMENT', 148.5, 50, { align: 'center' });
  
  // Subtitle
  pdf.setFontSize(16);
  pdf.setTextColor(100, 100, 100);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Upcube Technical Assessment', 148.5, 65, { align: 'center' });
  
  // Main text
  pdf.setFontSize(18);
  pdf.setTextColor(0, 0, 0);
  pdf.text('This is to certify that', 148.5, 90, { align: 'center' });
  
  // Name
  pdf.setFontSize(28);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(59, 130, 246);
  pdf.text(data.userName.toUpperCase(), 148.5, 110, { align: 'center' });
  
  // Achievement text
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(0, 0, 0);
  pdf.text(`has successfully completed the ${data.language} assessment`, 148.5, 130, { align: 'center' });
  pdf.text(`with a score of ${data.score}%`, 148.5, 145, { align: 'center' });
  
  // Date
  pdf.setFontSize(12);
  pdf.setTextColor(100, 100, 100);
  pdf.text(`Date: ${data.date}`, 148.5, 165, { align: 'center' });
  
  // Footer
  pdf.setFontSize(10);
  pdf.text('Upcube - AI-Powered Technical Assessment Platform', 148.5, 185, { align: 'center' });
  
  // Download the PDF
  pdf.save(`Upcube_Certificate_${data.language}_${data.userName.replace(/\s+/g, '_')}.pdf`);
};
