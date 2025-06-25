"use client";

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { useDropzone } from 'react-dropzone';
import { 
  Upload, 
  FileText, 
  Download, 
  Sparkles, 
  Loader2,
  CheckCircle,
  Crown,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProTool() {
  const [jobDescription, setJobDescription] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [generatedResume, setGeneratedResume] = useState<string | null>(null);
  const [originalIntro, setOriginalIntro] = useState('');
  const [newIntro, setNewIntro] = useState('');

  const processingSteps = [
    'Analyzing your resume...',
    'Extracting introduction section...',
    'Crafting tailored introduction...',
    'Rebuilding PDF with new intro...',
    'Finalizing your updated resume...'
  ];

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      toast.success('Resume uploaded successfully!');
    } else {
      toast.error('Please upload a PDF file only');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false
  });

  const processResume = async () => {
    if (!uploadedFile || !jobDescription.trim()) {
      toast.error('Please upload your resume and paste the job description');
      return;
    }

    setIsProcessing(true);
    setProcessingStep(0);

    try {
      // Simulate progress steps visually
      for (let i = 0; i < processingSteps.length; i++) {
        setProcessingStep(i);
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Prepare form data
      const formData = new FormData();
      //formData.append('resume', uploadedFile);
      formData.append('jobDescription', jobDescription);
      // Optionally add skills if you have a field for it
      // formData.append('skills', skills);

      const res = await fetch('/api/replace-intro', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update resume');
      }
      const data = await res.json();
      setNewIntro(data.intro);
      // Optionally set originalIntro if you want to display it (requires backend support)
      // setOriginalIntro(data.originalIntro);
      // Convert base64 PDF to blob URL
      const byteCharacters = atob(data.pdf);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      setGeneratedResume(url);
      toast.success('Your resume has been updated and is ready to download!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to process resume. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadResume = () => {
    if (generatedResume) {
      const a = document.createElement('a');
      a.href = generatedResume;
      a.download = 'Updated_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(generatedResume);
      toast.success('Resume download started!');
    } else {
      toast.error('No updated resume available to download.');
    }
  };

  const regenerateIntro = () => {
    toast.info('Regenerating with different tone...');
    // Mock regeneration
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="px-4 py-2 rounded-2xl mb-4 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50">
            <Crown className="h-4 w-4 mr-2 text-purple-600" />
            Pro Tool
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            AI Resume Enhancement
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your resume and get an AI-edited version with a perfectly tailored introduction that maintains your original formatting.
          </p>
        </motion.div>

        {!generatedResume ? (
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Upload Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Upload className="h-5 w-5 mr-2" />
                      Upload Your Resume
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      {...getRootProps()}
                      className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors ${
                        isDragActive 
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                          : 'border-muted-foreground/20 hover:border-purple-300'
                      }`}
                    >
                      <input {...getInputProps()} />
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/50 rounded-2xl flex items-center justify-center mb-4">
                          <FileText className="h-8 w-8 text-purple-600" />
                        </div>
                        {uploadedFile ? (
                          <>
                            <h3 className="font-medium text-green-600 mb-2">File Uploaded</h3>
                            <p className="text-sm text-muted-foreground">{uploadedFile.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </>
                        ) : (
                          <>
                            <h3 className="font-medium mb-2">
                              {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume'}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              or click to browse (PDF only)
                            </p>
                            <Button variant="outline" size="sm" className="rounded-2xl">
                              Choose File
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Job Description Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Job Description
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Label htmlFor="job-desc">Paste the job posting here</Label>
                      <Textarea
                        id="job-desc"
                        placeholder="Include the full job description, requirements, company info, and any specific technologies or skills mentioned..."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        className="min-h-[200px] rounded-2xl"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Process Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-center"
            >
              <Button 
                onClick={processResume}
                disabled={isProcessing || !uploadedFile || !jobDescription.trim()}
                size="lg"
                className="rounded-2xl px-8 py-6 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate Enhanced Resume
                  </>
                )}
              </Button>
            </motion.div>

            {/* Processing Status */}
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 max-w-2xl mx-auto"
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Processing your resume</span>
                        <span className="text-sm text-muted-foreground">
                          {Math.round(((processingStep + 1) / processingSteps.length) * 100)}%
                        </span>
                      </div>
                      <Progress 
                        value={((processingStep + 1) / processingSteps.length) * 100} 
                        className="w-full"
                      />
                      <p className="text-sm text-muted-foreground">
                        {processingSteps[processingStep]}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        ) : (
          /* Results Section */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-500 mr-2" />
                <h2 className="text-2xl font-bold">Resume Successfully Enhanced!</h2>
              </div>
              <p className="text-muted-foreground">
                Your introduction has been tailored for the job. Compare the before and after below.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Before */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600 dark:text-red-400">Original Introduction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-800">
                    <p className="text-sm leading-relaxed">{originalIntro}</p>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-red-600 dark:text-red-400 text-sm">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                      Generic and non-specific
                    </div>
                    <div className="flex items-center text-red-600 dark:text-red-400 text-sm">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                      Missing job-relevant keywords
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* After */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600 dark:text-green-400">AI-Enhanced Introduction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-800">
                    <p className="text-sm leading-relaxed">{newIntro}</p>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Tailored to job requirements
                    </div>
                    <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Includes relevant keywords
                    </div>
                    <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Quantified achievements
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={downloadResume}
                size="lg"
                className="rounded-2xl bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Updated PDF
              </Button>
              <Button 
                onClick={regenerateIntro}
                variant="outline"
                size="lg"
                className="rounded-2xl"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Regenerate with Different Tone
              </Button>
            </div>

            {/* Success Tips */}
            <div className="mt-12 max-w-2xl mx-auto">
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sparkles className="h-5 w-5 mr-2" />
                    Your Resume is Now Ready
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Introduction tailored specifically for this job
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Original formatting and layout preserved
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      ATS-optimized with relevant keywords
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Ready to submit with confidence
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
