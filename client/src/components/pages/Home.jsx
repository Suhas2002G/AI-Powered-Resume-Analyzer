// import React from 'react';
// import { motion } from 'framer-motion';
// import { 
//   FileText, 
//   Mic, 
//   Target, 
//   CheckCircle, 
//   Star, 
//   ArrowRight,
//   Upload,
//   MessageSquare,
//   Zap
// } from 'lucide-react';
// import Button from '../ui/Button';

// const Home = () => {
//   const features = [
//     {
//       icon: FileText,
//       title: 'Smart Resume Analysis',
//       description: 'AI-powered analysis of your resume with ATS optimization and improvement suggestions.',
//       color: 'from-blue-500 to-blue-600',
//     },
//     {
//       icon: Mic,
//       title: 'Voice Interview Coach',
//       description: 'Practice interviews with real-time feedback on your answers, tone, and content.',
//       color: 'from-green-500 to-green-600',
//     },
//     {
//       icon: Target,
//       title: 'JD-Specific Preparation',
//       description: 'Customized practice based on specific job descriptions and requirements.',
//       color: 'from-purple-500 to-purple-600',
//     },
//   ];

//   const stats = [
//     { number: '98%', label: 'Success Rate' },
//     { number: '50K+', label: 'Users Helped' },
//     { number: '4.9/5', label: 'User Rating' },
//     { number: '2.5x', label: 'Interview Success' },
//   ];

//   return (
//     <div className="min-h-screen bg-white dark:bg-gray-900">
//       {/* Hero Section */}
//       <section className="relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800" />
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//             >
//               <motion.h1 
//                 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//               >
//                 Land Your{' '}
//                 <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent dark:from-primary-400 dark:to-primary-200">
//                   Dream Job
//                 </span>{' '}
//                 with AI
//               </motion.h1>
              
//               <motion.p 
//                 className="text-xl text-gray-600 dark:text-gray-300 mb-8"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4 }}
//               >
//                 AI-powered resume analysis and personalized interview coaching to help you stand out 
//                 in today's competitive job market.
//               </motion.p>

//               <motion.div 
//                 className="flex flex-col sm:flex-row gap-4"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.6 }}
//               >
//                 <Button size="lg" icon={Zap} className="text-lg px-8">
//                   Get Started Free
//                 </Button>
//                 <Button variant="outline" size="lg" icon={ArrowRight} className="text-lg">
//                   See How It Works
//                 </Button>
//               </motion.div>

//               <motion.div 
//                 className="flex items-center mt-8 space-x-4"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.8 }}
//               >
//                 <div className="flex -space-x-2">
//                   {[1, 2, 3, 4].map((i) => (
//                     <div key={i} className="w-8 h-8 bg-primary-500 rounded-full border-2 border-white dark:border-gray-900" />
//                   ))}
//                 </div>
//                 <div className="text-sm text-gray-600 dark:text-gray-400">
//                   <span className="font-semibold text-primary-600">5,000+</span> professionals trust us
//                 </div>
//               </motion.div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//               className="relative"
//             >
//               <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
//                 <div className="space-y-6">
//                   <div className="text-center">
//                     <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
//                       Start Your Journey
//                     </h3>
//                     <p className="text-gray-600 dark:text-gray-400">
//                       Choose your preparation mode
//                     </p>
//                   </div>

//                   <div className="space-y-4">
//                     <motion.div whileHover={{ scale: 1.02 }} className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4 border border-primary-200 dark:border-primary-800">
//                       <div className="flex items-center space-x-3">
//                         <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
//                           <Upload className="w-5 h-5 text-white" />
//                         </div>
//                         <div>
//                           <h4 className="font-semibold text-gray-900 dark:text-white">Resume Analyzer</h4>
//                           <p className="text-sm text-gray-600 dark:text-gray-400">Quick resume check</p>
//                         </div>
//                       </div>
//                     </motion.div>

//                     <motion.div whileHover={{ scale: 1.02 }} className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
//                       <div className="flex items-center space-x-3">
//                         <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
//                           <MessageSquare className="w-5 h-5 text-white" />
//                         </div>
//                         <div>
//                           <h4 className="font-semibold text-gray-900 dark:text-white">JD + Interview</h4>
//                           <p className="text-sm text-gray-600 dark:text-gray-400">Role-specific practice</p>
//                         </div>
//                       </div>
//                     </motion.div>

//                     <motion.div whileHover={{ scale: 1.02 }} className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
//                       <div className="flex items-center space-x-3">
//                         <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
//                           <Target className="w-5 h-5 text-white" />
//                         </div>
//                         <div>
//                           <h4 className="font-semibold text-gray-900 dark:text-white">Full Preparation</h4>
//                           <p className="text-sm text-gray-600 dark:text-gray-400">Complete analysis + practice</p>
//                         </div>
//                       </div>
//                     </motion.div>
//                   </div>

//                   <Button size="lg" className="w-full">
//                     Start Free Trial
//                   </Button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-16 bg-gray-50 dark:bg-gray-800">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {stats.map((stat, index) => (
//               <motion.div
//                 key={stat.label}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 className="text-center"
//               >
//                 <div className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
//                   {stat.number}
//                 </div>
//                 <div className="text-gray-600 dark:text-gray-400 font-medium">
//                   {stat.label}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
//               How It Works
//             </h2>
//             <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
//               Three powerful modes to prepare you for your next career move
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <motion.div
//                 key={feature.title}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.2 }}
//                 whileHover={{ y: -5 }}
//                 className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
//               >
//                 <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
//                   <feature.icon className="w-7 h-7 text-white" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-400 mb-6">
//                   {feature.description}
//                 </p>
//                 <ul className="space-y-2">
//                   {['ATS Optimization', 'Skills Analysis', 'Improvement Tips'].map((item) => (
//                     <li key={item} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
//                       <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
//                       {item}
//                     </li>
//                   ))}
//                 </ul>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;


import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Mic, Target, CheckCircle, ArrowRight, Upload, MessageSquare, Zap } from 'lucide-react';
import Button from '../ui/Button';

const Home = () => {
  const features = [
    {
      icon: FileText,
      title: 'Smart Resume Analysis',
      description: 'AI-powered analysis of your resume with ATS optimization and improvement suggestions.',
    },
    {
      icon: Mic,
      title: 'Voice Interview Coach',
      description: 'Practice interviews with real-time feedback on your answers, tone, and content.',
    },
    {
      icon: Target,
      title: 'JD-Specific Preparation',
      description: 'Customized practice based on specific job descriptions and requirements.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Land Your{' '}
                <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-200">
                  Dream Job
                </span>{' '}
                with AI
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                AI-powered resume analysis and personalized interview coaching to help you stand out 
                in today's competitive job market.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Button size="lg" icon={Zap} className="text-lg px-8">
                  Get Started Free
                </Button>
                <Button variant="outline" size="lg" icon={ArrowRight} className="text-lg">
                  See How It Works
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Start Your Journey
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Choose your preparation mode
                    </p>
                  </div>

                  <div className="space-y-4">
                    <motion.div whileHover={{ scale: 1.02 }} className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                          <Upload className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">Resume Analyzer</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Quick resume check</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                          <MessageSquare className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">JD + Interview</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Role-specific practice</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                          <Target className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">Full Preparation</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Complete analysis + practice</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <Button size="lg" className="w-full">
                    Start Free Trial
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Three powerful modes to prepare you for your next career move
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {['ATS Optimization', 'Skills Analysis', 'Improvement Tips'].map((item) => (
                    <li key={item} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;