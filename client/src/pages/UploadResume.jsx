// components/UploadResume.jsx
import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  X, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Briefcase,
  User,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import axios from '../axios'
import { useNavigate } from 'react-router-dom';

const UploadResume = () => {
  const navigate = useNavigate();

  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  
  const fileInputRef = useRef(null);
  const MAX_JD_LENGTH = 5000;

  // Memoized character count and warning
  const jdStats = useMemo(() => {
    const currentLength = jobDescription.length;
    const remaining = MAX_JD_LENGTH - currentLength;
    const isNearLimit = remaining <= 100 && remaining > 0;
    const isOverLimit = currentLength > MAX_JD_LENGTH;
    
    return {
      currentLength,
      remaining: Math.max(0, remaining),
      isNearLimit,
      isOverLimit,
      displayText: isOverLimit 
        ? jobDescription.substring(0, MAX_JD_LENGTH) 
        : jobDescription
    };
  }, [jobDescription]);

  const validateFile = (file) => {
    const errors = {};
    
    // Check file type
    if (file.type !== 'application/pdf') {
      errors.file = 'Please upload a PDF file only';
    }
    
    // Check file size (2MB = 2 * 1024 * 1024 bytes)
    if (file.size > 2 * 1024 * 1024) {
      errors.file = 'File size must be less than 2MB';
    }
    
    return errors;
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileErrors = validateFile(file);
    
    if (Object.keys(fileErrors).length > 0) {
      setErrors(fileErrors);
      setResumeFile(null);
    } else {
      setErrors({});
      setResumeFile(file);
      setSuccess(false);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const fileErrors = validateFile(file);
      
      if (Object.keys(fileErrors).length > 0) {
        setErrors(fileErrors);
        setResumeFile(null);
      } else {
        setErrors({});
        setResumeFile(file);
        setSuccess(false);
      }
    }
  };

  const handleJobDescriptionChange = (text) => {
    // Automatically trim to 1000 characters if exceeded
    if (text.length > MAX_JD_LENGTH) {
      setJobDescription(text.substring(0, MAX_JD_LENGTH));
    } else {
      setJobDescription(text);
    }
    // Clear job description errors when user types
    if (errors.jobDescription) {
      setErrors({ ...errors, jobDescription: '' });
    }
  };

  const removeFile = () => {
    setResumeFile(null);
    setErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!resumeFile) {
      newErrors.file = 'Please upload your resume';
    }
    
    if (!jobDescription.trim()) {
      newErrors.jobDescription = 'Job description is required';
    } else if (jobDescription.trim().length < 50) {
      newErrors.jobDescription = 'Job description should be at least 50 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) return;

    setIsUploading(true);
    setUploadProgress(0);
    setErrors({});

    try {
      const formData = new FormData();
      formData.append('file', resumeFile);
      
      // Use the trimmed version for submission
      const trimmedJD = jobDescription.substring(0, MAX_JD_LENGTH).trim();
      formData.append('job_description', trimmedJD);

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const response = await axios.post('/extract/user_data', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });

      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // Success handling
      setSuccess(true);
      console.log('Analysis result:', response.data);
      
      // Reset form after success
      setTimeout(() => {
        navigate('/ats-report', { state: { data: response.data.data } });
        }, 1500);

    } catch (error) {
      console.error('Upload error:', error);
      setErrors({
        submit: error.response?.data?.detail || 'Failed to upload resume. Please try again.'
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Prepare for Your Interview
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Upload your resume and job description to get personalized AI-powered interview questions
          </p>
        </motion.div>

        {/* Upload Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Resume Upload Section */}
            <div>
              <label className="flex items-center text-lg font-semibold text-gray-900 dark:text-white mb-4">
                <User className="h-5 w-5 mr-2 text-purple-500" />
                Upload Your Resume
                <span className="text-red-500 ml-1">*</span>
              </label>
              
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                  resumeFile 
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                    : errors.file 
                    ? 'border-red-300 bg-red-50 dark:bg-red-900/20' 
                    : 'border-gray-300 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                <AnimatePresence>
                  {!resumeFile ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="inline-flex p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                        <Upload className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-700 dark:text-gray-300 font-medium">
                          Drag & drop your resume here
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          or{' '}
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="text-purple-600 dark:text-purple-400 font-medium hover:underline"
                          >
                            browse files
                          </button>
                        </p>
                      </div>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        PDF only • Max 2MB
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-3"
                    >
                      <div className="inline-flex p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                        <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-gray-700 dark:text-gray-300 font-medium flex items-center justify-center">
                          <FileText className="h-4 w-4 mr-2" />
                          {resumeFile.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="inline-flex items-center text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Remove file
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {errors.file && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center text-sm text-red-600 dark:text-red-400 mt-2"
                  >
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.file}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Job Description Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="flex items-center text-lg font-semibold text-gray-900 dark:text-white">
                  <Briefcase className="h-5 w-5 mr-2 text-purple-500" />
                  Job Description
                  <span className="text-red-500 ml-1">*</span>
                </label>
                
                {/* Character Counter */}
                <div className={`text-sm font-medium ${
                  jdStats.isOverLimit 
                    ? 'text-red-600 dark:text-red-400' 
                    : jdStats.isNearLimit 
                    ? 'text-amber-600 dark:text-amber-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {jdStats.currentLength}/{MAX_JD_LENGTH}
                </div>
              </div>
              
              <div className="relative">
                <textarea
                  value={jdStats.displayText}
                  onChange={(e) => handleJobDescriptionChange(e.target.value)}
                  placeholder="Paste the job description you're preparing for... (Minimum 50 characters, maximum 1000 characters)"
                  rows={8}
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 ${
                    errors.jobDescription
                      ? 'border-red-300 focus:border-red-500'
                      : jdStats.isOverLimit
                      ? 'border-red-300 focus:border-red-500'
                      : jdStats.isNearLimit
                      ? 'border-amber-300 focus:border-amber-500'
                      : 'border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400'
                  } focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800/50`}
                />
                
                {/* Warning Messages */}
                <AnimatePresence>
                  {jdStats.isOverLimit && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-3 left-3 right-3 flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg"
                    >
                      <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                      <span>Job description trimmed to {MAX_JD_LENGTH} characters</span>
                    </motion.div>
                  )}
                  
                  {jdStats.isNearLimit && !jdStats.isOverLimit && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-3 left-3 right-3 flex items-center space-x-2 text-amber-600 dark:text-amber-400 text-sm bg-amber-50 dark:bg-amber-900/20 px-3 py-2 rounded-lg"
                    >
                      <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                      <span>Only {jdStats.remaining} characters remaining</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Helper Text */}
              <div className="flex justify-between items-center mt-2">
                <AnimatePresence>
                  {errors.jobDescription && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center text-sm text-red-600 dark:text-red-400"
                    >
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.jobDescription}
                    </motion.p>
                  )}
                </AnimatePresence>
                
                {!errors.jobDescription && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 ml-auto">
                    Minimum 50 characters required
                  </p>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <AnimatePresence>
              {isUploading && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Analyzing your resume...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isUploading || success}
              whileHover={{ scale: isUploading || success ? 1 : 1.02 }}
              whileTap={{ scale: isUploading || success ? 1 : 0.98 }}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                success
                  ? 'bg-green-500 text-white cursor-not-allowed'
                  : isUploading
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl'
              } shadow-lg`}
            >
              {isUploading ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Analyzing...</span>
                </div>
              ) : success ? (
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Analysis Complete!</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Sparkles className="h-5 w-5" />
                  <span>Generate Interview Questions</span>
                </div>
              )}
            </motion.button>

            {/* Error Message */}
            <AnimatePresence>
              {errors.submit && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center justify-center p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
                >
                  <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
                  <span className="text-red-600 dark:text-red-400 text-sm">
                    {errors.submit}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success Message */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center justify-center p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl"
                >
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                  <span className="text-green-600 dark:text-green-400 text-sm">
                    Resume analyzed successfully! Generating your personalized interview questions...
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>

        {/* Features List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
        >
          {[
            { icon: FileText, text: 'PDF Resume Analysis' },
            { icon: Briefcase, text: 'JD Matching' },
            { icon: Sparkles, text: 'AI-Powered Questions' },
          ].map((feature, index) => (
            <motion.div
              key={feature.text}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
            >
              <feature.icon className="h-4 w-4 text-purple-500 mr-2" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {feature.text}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default UploadResume;