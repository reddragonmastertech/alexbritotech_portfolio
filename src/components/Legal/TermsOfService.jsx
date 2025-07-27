import React, { useState } from 'react';
import { ArrowLeft, Shield, Users, AlertTriangle, Handshake, Mail, FileText, Scale, Eye, Clock } from 'lucide-react';

const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    {
      id: 'acceptance',
      icon: Users,
      title: "Acceptance of Terms",
      summary: "By using our services, you agree to these terms",
      content: [
        "By accessing and using this portfolio website, you accept and agree to be bound by the terms and provision of this agreement.",
        "If you do not agree to abide by the above, please do not use this service.",
        "These terms apply to all visitors, users, and others who access or use the service.",
        "Your continued use of the website constitutes acceptance of any updates to these terms."
      ]
    },
    {
      id: 'license',
      icon: Handshake,
      title: "Use License",
      summary: "Limited permission for personal, non-commercial use",
      content: [
        "Permission is granted to temporarily view the materials on this website for personal, non-commercial transitory viewing only.",
        "This is the grant of a license, not a transfer of title, and under this license you may not:",
        "• Modify or copy the materials without explicit permission",
        "• Use the materials for any commercial purpose or for any public display",
        "• Attempt to reverse engineer any software contained on the website",
        "• Remove any copyright or other proprietary notations from the materials",
        "• Share or redistribute content without proper attribution"
      ]
    },
    {
      id: 'disclaimer',
      icon: AlertTriangle,
      title: "Disclaimer",
      summary: "Information provided 'as-is' without warranties",
      content: [
        "The materials on this website are provided on an 'as is' basis. GiaSi Portfolio makes no warranties, expressed or implied.",
        "We do not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials.",
        "The information on this website is for general information purposes only and should not be relied upon for making critical decisions.",
        "We reserve the right to update or modify content at any time without prior notice."
      ]
    },
    {
      id: 'limitations',
      icon: Scale,
      title: "Limitations of Liability",
      summary: "Legal limitations on our responsibility",
      content: [
        "In no event shall GiaSi Portfolio or its suppliers be liable for any damages arising out of the use or inability to use the materials on this website.",
        "This includes but is not limited to damages for loss of data or profit, or due to business interruption.",
        "Some jurisdictions do not allow limitations on implied warranties or limitations of liability for consequential damages.",
        "Our maximum liability shall not exceed the amount paid by you, if any, for accessing this website."
      ]
    },
    {
      id: 'intellectual',
      icon: FileText,
      title: "Intellectual Property Rights",
      summary: "Ownership and protection of content",
      content: [
        "All content, features, and functionality on this website are owned by GiaSi Portfolio and are protected by international copyright, trademark, and other intellectual property laws.",
        "This includes but is not limited to text, graphics, logos, images, audio clips, video clips, and software.",
        "You may not reproduce, distribute, or create derivative works without explicit written permission.",
        "Any unauthorized use may violate copyright, trademark, and other applicable laws."
      ]
    },
    {
      id: 'conduct',
      icon: Shield,
      title: "User Conduct",
      summary: "Guidelines for appropriate website use",
      content: [
        "You agree not to use the website for any unlawful purpose or in any way that could damage, disable, overburden, or impair the website.",
        "You shall not interfere with any other party's use and enjoyment of the website.",
        "Prohibited activities include but are not limited to: harassment, spam, malicious code distribution, or attempts to gain unauthorized access.",
        "We reserve the right to terminate access for users who violate these conduct guidelines."
      ]
    }
  ];

  const additionalInfo = [
    {
      icon: Eye,
      title: "Privacy Integration",
      content: "These terms work in conjunction with our Privacy Policy to ensure comprehensive protection of your rights and our responsibilities."
    },
    {
      icon: Clock,
      title: "Term Updates",
      content: "We may modify these terms at any time. Significant changes will be highlighted, and continued use constitutes acceptance of modifications."
    }
  ];

  const goBack = () => {
    window.history.back();
  };

  const toggleSection = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-r from-emerald-400/30 to-cyan-600/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-gradient-to-r from-violet-400/20 to-pink-600/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <button
              onClick={goBack}
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-300 mb-8 bg-white/50 dark:bg-slate-800/50 px-4 py-2 rounded-full backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </button>
            
            <div className="relative">
              <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Terms of Service
              </h1>
              <div className="absolute -inset-8 bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-2xl rounded-full"></div>
            </div>
            
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Please read these terms carefully before using our website. Your use of our service constitutes acceptance of these terms and conditions.
            </p>
            
            <div className="mt-6 inline-flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 px-4 py-2 rounded-full backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
              <Clock className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Last updated: {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Table of Contents */}
            <div className="lg:col-span-1">
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-xl sticky top-8">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Table of Contents
                </h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => toggleSection(section.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-300 flex items-center gap-3 ${
                        activeSection === section.id
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-700/50 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <section.icon className="w-4 h-4 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-sm">{section.title}</div>
                        <div className="text-xs opacity-75">{section.summary}</div>
                      </div>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content Sections */}
            <div className="lg:col-span-2 space-y-6">
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  className={`bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl transition-all duration-500 ${
                    activeSection === section.id || activeSection === null
                      ? 'opacity-100 transform translate-y-0'
                      : 'opacity-50 transform translate-y-2'
                  }`}
                >
                  <div 
                    className="p-8 cursor-pointer"
                    onClick={() => toggleSection(section.id)}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center shadow-lg">
                        <section.icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                          {section.title}
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                          {section.summary}
                        </p>
                      </div>
                    </div>

                    <div className={`transition-all duration-500 ${
                      activeSection === section.id || activeSection === null
                        ? 'max-h-none opacity-100'
                        : 'max-h-0 opacity-0 overflow-hidden'
                    }`}>
                      <div className="space-y-4">
                        {section.content.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start gap-4">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-3 flex-shrink-0"></div>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Additional Information */}
              <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-indigo-500/20 rounded-2xl p-8 border border-blue-200/50 dark:border-blue-700/50 shadow-xl">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6">
                  Additional Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {additionalInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-white/50 dark:bg-slate-800/50 rounded-lg flex items-center justify-center">
                        <info.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                          {info.title}
                        </h4>
                        <p className="text-slate-600 dark:text-slate-300 text-sm">
                          {info.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Section */}
              <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 dark:from-emerald-500/20 dark:to-cyan-500/20 rounded-2xl p-8 border border-emerald-200/50 dark:border-emerald-700/50 shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                    Questions About These Terms?
                  </h3>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  If you have any questions about these Terms of Service or need clarification on any point, 
                  please don't hesitate to contact us at{' '}
                  <a 
                    href="mailto:giasinguyen@email.com" 
                    className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium hover:underline transition-colors"
                  >
                    giasinguyen@email.com
                  </a>
                  . We're here to help and ensure you understand your rights and responsibilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;