// components/AtsReport.jsx
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  TrendingUp,
  User,
  Briefcase,
  GraduationCap,
  Code,
  Target,
  MessageCircle,
  Lightbulb,
  Star,
  ArrowLeft,
  Download,
  Shield,
  Zap,
  Award,
  Clock
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const AtsReport = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const reportData = location.state?.data 

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getFitBadgeColor = (fit) => {
    switch (fit.toLowerCase()) {
      case 'strong fit': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'moderate fit': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'weak fit': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const handleBackToUpload = () => {
    navigate('/resume/analysis');
  };

  const handleDownloadReport = () => {
    // Implement PDF download functionality
    console.log('Downloading report...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/20 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8"
        >
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <button
              onClick={handleBackToUpload}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Upload</span>
            </button>
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              ATS Resume Analysis Report
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Comprehensive analysis of your resume against the job description
            </p>
          </div>

          <button
            onClick={handleDownloadReport}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
          >
            <Download className="h-4 w-4" />
            <span>Download PDF</span>
          </button>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Overall Score Card */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Score */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
                <div className="relative inline-block">
                  <div className="relative">
                    <svg className="w-32 h-32" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={reportData.ats_overall_score >= 80 ? "#10B981" : reportData.ats_overall_score >= 60 ? "#F59E0B" : "#EF4444"}
                        strokeWidth="3"
                        strokeDasharray={`${reportData.ats_overall_score}, 100`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-3xl font-bold ${getScoreColor(reportData.ats_overall_score)}`}>
                        {reportData.ats_overall_score}
                      </span>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">
                  ATS Score
                </h3>
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mt-2 ${getFitBadgeColor(reportData.final_evaluation.overall_fit)}`}>
                  {reportData.final_evaluation.overall_fit}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
                  {reportData.final_evaluation.fit_reasoning}
                </p>
              </div>
            </div>

            {/* Category Scores */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-purple-500" />
                  Category Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(reportData.category_scores).map(([category, score]) => (
                    <div key={category} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                        {category.replace(/_/g, ' ')}
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getScoreBgColor(score)}`}
                            style={{ width: `${score}%` }}
                          />
                        </div>
                        <span className={`text-sm font-bold ${getScoreColor(score)}`}>
                          {score}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Match Summary */}
          <motion.div variants={itemVariants}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <MessageCircle className="h-5 w-5 mr-2 text-purple-500" />
                Match Summary
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {reportData.match_summary}
              </p>
            </div>
          </motion.div>

          {/* Keyword Analysis */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                Matched Keywords
              </h3>
              <div className="flex flex-wrap gap-2">
                {reportData.keyword_analysis.matched_keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {keyword}
                  </span>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                    Keyword Density
                  </span>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {(reportData.keyword_analysis.keyword_density_percentage * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <XCircle className="h-5 w-5 mr-2 text-red-500" />
                Missing Keywords
              </h3>
              <div className="space-y-3">
                {reportData.keyword_analysis.missing_keywords.map((keyword, index) => (
                  <div
                    key={index}
                    className={`flex items-center p-3 rounded-lg ${
                      reportData.keyword_analysis.critical_missing_keywords.includes(keyword)
                        ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                        : 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'
                    }`}
                  >
                    {reportData.keyword_analysis.critical_missing_keywords.includes(keyword) ? (
                      <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                    ) : (
                      <XCircle className="h-4 w-4 text-amber-500 mr-2" />
                    )}
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {keyword}
                    </span>
                    {reportData.keyword_analysis.critical_missing_keywords.includes(keyword) && (
                      <span className="ml-auto text-xs font-medium text-red-600 dark:text-red-400">
                        Critical
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Skills Breakdown */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Code className="h-5 w-5 mr-2 text-purple-500" />
                Technical Skills
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Matched Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {reportData.skills_breakdown.technical_skills_matched.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center">
                    <XCircle className="h-4 w-4 mr-1" />
                    Missing Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {reportData.skills_breakdown.technical_skills_missing.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <User className="h-5 w-5 mr-2 text-purple-500" />
                Soft Skills
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Matched Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {reportData.skills_breakdown.soft_skills_matched.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center">
                    <XCircle className="h-4 w-4 mr-1" />
                    Missing Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {reportData.skills_breakdown.soft_skills_missing.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Experience & Education */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-purple-500" />
                Experience Analysis
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Total Experience
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {reportData.experience_analysis.total_years_experience}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Relevant Projects
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {reportData.experience_analysis.project_relevance.map((project, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                      >
                        <Target className="h-3 w-3 mr-1" />
                        {project}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {reportData.experience_analysis.career_trajectory}
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <GraduationCap className="h-5 w-5 mr-2 text-purple-500" />
                Education & Certifications
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Highest Degree
                  </h4>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {reportData.education_and_certifications.highest_degree}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">
                    Current Certifications
                  </h4>
                  <div className="space-y-2">
                    {reportData.education_and_certifications.relevant_certifications.map((cert, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                        <Award className="h-4 w-4 mr-2 text-green-500" />
                        {cert}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-600 dark:text-amber-400 mb-2">
                    Recommended Certifications
                  </h4>
                  <div className="space-y-2">
                    {reportData.education_and_certifications.missing_recommended_certifications.map((cert, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                        <Zap className="h-4 w-4 mr-2 text-amber-500" />
                        {cert}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Improvement Suggestions */}
          <motion.div variants={itemVariants}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Lightbulb className="h-5 w-5 mr-2 text-purple-500" />
                Improvement Suggestions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                    <Star className="h-4 w-4 mr-2 text-amber-500" />
                    Skills to Learn
                  </h4>
                  <ul className="space-y-2">
                    {reportData.improvement_suggestions.skills_to_learn.map((skill, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mr-3" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-blue-500" />
                    Content Enhancement
                  </h4>
                  <ul className="space-y-2">
                    {reportData.improvement_suggestions.content_enhancement_tips.map((tip, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-green-500" />
                    Next Steps
                  </h4>
                  <ul className="space-y-2">
                    {reportData.final_evaluation.potential_next_steps.map((step, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Final Evaluation */}
          <motion.div variants={itemVariants}>
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Target className="h-6 w-6 mr-2" />
                Final Evaluation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{reportData.final_evaluation.suggested_role_level}</div>
                  <div className="text-sm opacity-90">Suggested Role Level</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">{reportData.ats_overall_score}/100</div>
                  <div className="text-sm opacity-90">Overall ATS Score</div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${getFitBadgeColor(reportData.final_evaluation.overall_fit).replace('bg-', 'text-').split(' ')[0]}`}>
                    {reportData.final_evaluation.overall_fit}
                  </div>
                  <div className="text-sm opacity-90">Job Fit</div>
                </div>
              </div>
              <p className="mt-6 text-purple-100 text-center">
                {reportData.final_evaluation.fit_reasoning}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AtsReport;