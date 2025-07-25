import { useState } from 'react';
import { FileUpload } from '@/components/ui/file-upload';
import { ResumeData } from '@/types/resume';
import { parseResumeFile } from '@/lib/resume-parser';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Brain, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ResumePreview } from './ResumePreview';

export function ResumeParser() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<ResumeData | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileSelect = async (file: File) => {
    setUploadedFile(file);
    setIsProcessing(true);
    
    try {
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const parsedData = await parseResumeFile(file);
      setExtractedData(parsedData);
      
      toast({
        title: "Resume Parsed Successfully!",
        description: "Your resume has been analyzed and key information extracted.",
        duration: 5000,
      });
    } catch (error) {
      toast({
        title: "Error Processing Resume",
        description: "Failed to parse the resume. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const resetParser = () => {
    setExtractedData(null);
    setUploadedFile(null);
    setIsProcessing(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient">
          ResumeAI Parser
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Upload your resume and let our AI extract key information instantly. 
          Get structured data that's ready to use.
        </p>
      </div>

      {/* Main Content */}
      {!extractedData ? (
        <div className="space-y-8">
          {/* Upload Section */}
          <Card className="glass-card p-8 hover-lift animate-slide-up">
            <FileUpload onFileSelect={handleFileSelect} />
          </Card>

          {/* Processing State */}
          {isProcessing && (
            <Card className="glass-card p-8 text-center animate-scale-in">
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-3">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <Brain className="h-8 w-8 text-primary animate-pulse" />
                </div>
                <h3 className="text-lg font-semibold">AI is analyzing your resume...</h3>
                <p className="text-muted-foreground">
                  Extracting key information including contact details, experience, skills, and education.
                </p>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-gradient-primary animate-pulse-glow rounded-full" />
                </div>
              </div>
            </Card>
          )}

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-6 animate-fade-in">
            {[
              {
                icon: Brain,
                title: "AI-Powered Extraction",
                description: "Advanced algorithms analyze your resume structure and content"
              },
              {
                icon: CheckCircle,
                title: "Accurate Results",
                description: "High precision extraction of contact info, skills, and experience"
              },
              {
                icon: FileText,
                title: "Multiple Formats",
                description: "Support for PDF and DOCX resume formats"
              }
            ].map((feature, index) => (
              <Card key={index} className="glass-card p-6 hover-lift">
                <feature.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        /* Results Section */
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <h2 className="text-2xl font-bold">Resume Parsed Successfully</h2>
                <p className="text-muted-foreground">
                  Review and edit the extracted information below
                </p>
              </div>
            </div>
            <Button onClick={resetParser} variant="outline">
              Upload New Resume
            </Button>
          </div>
          
          <ResumePreview data={extractedData} />
        </div>
      )}
    </div>
  );
}

// Import FileText for the features section
import { FileText } from 'lucide-react';