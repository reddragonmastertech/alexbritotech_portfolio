import React, { useState } from 'react';
import { ArrowLeft, Shield, Database, Cookie, Users, Lock, Eye, Settings, Mail, FileText, Clock, CheckCircle } from 'lucide-react';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    {
      id: 'collection',
      icon: Database,
      title: "Information We Collect",
      summary: "Types of data we gather from your interactions",
      content: [
        "Personal Information: When you contact us through our contact form, we may collect your name, email address, phone number, and any message you provide.",
        "Usage Data: We automatically collect certain information when you visit our website, including your IP address, browser type, operating system, device information, and pages visited.",
        "Cookies and Tracking: We use cookies and similar tracking technologies to enhance your browsing experience, remember preferences, and analyze website traffic patterns.",
        "Location Data: We may collect general location information based on your IP address to provide localized content and services.",
        "Communication Records: If you contact us, we may retain records of that communication for customer service purposes."
      ]
    },
    {
      id: 'usage',
      icon: Settings,
      title: "How We Use Your Information",
      summary: "The purposes for which we process your data",
      content: [
        "To respond to your inquiries and provide comprehensive customer support",
        "To improve our website functionality, user experience, and services based on usage patterns",
        "To analyze website performance, traffic patterns, and user behavior for optimization",
        "To send periodic updates about our services (only with your consent)",
        "To comply with legal obligations and regulatory requirements",
        "To protect our rights, prevent fraud, and maintain website security",
        "To personalize your experience and provide relevant content recommendations"
      ]
    },
    {
      id: 'sharing',
      icon: Users,
      title: "Information Sharing & Disclosure",
      summary: "When and how we share your information",
      content: [
        "We do not sell, trade, or rent your personal information to third parties for marketing purposes.",
        "We may share information with trusted service providers who assist us in operating our website and providing services to you.",
        "We may disclose information when required by law, court order, or to protect our legal rights and interests.",
        "In the event of a business transfer, your information may be transferred as part of the business assets.",
        "All third-party service providers are bound by strict confidentiality agreements and data protection standards.",
        "We may share aggregated, non-personally identifiable information for analytical purposes."
      ]
    },
    {
      id: 'cookies',
      icon: Cookie,
      title: "Cookies & Tracking Technologies",
      summary: "How we use cookies to enhance your experience",
      content: [
        "Essential Cookies: Required for basic website functionality, security, and navigation",
        "Analytics Cookies: Help us understand how visitors interact with our website and identify areas for improvement",
        "Preference Cookies: Remember your settings, preferences, and choices for a personalized experience",
        "Marketing Cookies: May be used to show relevant advertisements and measure campaign effectiveness (with consent)",
        "You can control cookies through your browser settings, though some features may not function properly if disabled",
        "We respect Do Not Track signals and provide clear options for cookie management"
      ]
    },
    {
      id: 'security',
      icon: Lock,
      title: "Data Security & Protection",
      summary: "Measures we take to protect your information",
      content: [
        "We implement industry-standard security measures including SSL encryption for data transmission",
        "Regular security audits and updates to protect against vulnerabilities and threats",
        "Access to personal information is restricted to authorized personnel only",
        "Data is stored in secure, encrypted databases with regular backups",
        "We have incident response procedures in place to address any potential data breaches",
        "Employee training on data protection and privacy best practices",
        "While we strive for maximum security, no method of transmission over the internet is 100% secure"
      ]
    },
    {
      id: 'rights',
      icon: Shield,
      title: "Your Privacy Rights",
      summary: "Your rights regarding your personal data",
      content: [
        "Right to Access: Request copies of your personal data and information about how it's processed",
        "Right to Rectification: Request correction of inaccurate or incomplete personal data",
        "Right to Erasure: Request deletion of your personal data under certain circumstances",
        "Right to Restrict Processing: Request limitation of processing of your personal data",
        "Right to Data Portability: Request transfer of your data to another service provider",
        "Right to Object: Object to processing of your personal data for direct marketing purposes",
        "Right to Withdraw Consent: Withdraw consent for processing at any time where consent is the legal basis"
      ]
    }
  ];

  const dataRetention = [
    { type: "Contact Information", period: "3 years from last contact", purpose: "Customer service and communication" },
    { type: "Website Analytics", period: "26 months", purpose: "Performance optimization and user experience improvement" },
    { type: "Email Communications", period: "7 years", purpose: "Legal compliance and business records" },
    { type: "Cookie Data", period: "Up to 2 years", purpose: "Website functionality and user preferences" }
  ];

  const goBack = () => {
    window.history.back();
  };

  const toggleSection = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-cyan-100 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-r from-emerald-400/30 to-cyan-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-emerald-600/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-gradient-to-r from-cyan-400/20 to-teal-600/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <button
              onClick={goBack}
              className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-300 mb-8 bg-white/50 dark:bg-slate-800/50 px-4 py-2 rounded-full backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </button>
            
            <div className="relative">
              <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-emerald-600 via-cyan-600 to-teal-600 dark:from-emerald-400 dark:via-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
                Privacy Policy
              </h1>
              <div className="absolute -inset-8 bg-gradient-to-r from-emerald-600/10 to-cyan-600/10 blur-2xl rounded-full"></div>
            </div>
            
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Your privacy is fundamental to us. This policy explains how we collect, use, protect, and respect your personal information.
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
                          ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
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
              {sections.map((section) => (
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
                      <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-cyan-100 dark:from-emerald-900/30 dark:to-cyan-900/30 rounded-xl flex items-center justify-center shadow-lg">
                        <section.icon className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
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
                            <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full mt-3 flex-shrink-0"></div>
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

              {/* Data Retention Table */}
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
                  <Eye className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  Data Retention Periods
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700">
                        <th className="text-left py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">Data Type</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">Retention Period</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">Purpose</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataRetention.map((item, index) => (
                        <tr key={index} className="border-b border-slate-100 dark:border-slate-700/50 last:border-0">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-emerald-500" />
                              <span className="font-medium text-slate-800 dark:text-slate-200">{item.type}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-slate-600 dark:text-slate-300">{item.period}</td>
                          <td className="py-4 px-4 text-slate-600 dark:text-slate-300">{item.purpose}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Privacy Commitment */}
              <div className="bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:via-cyan-500/20 dark:to-teal-500/20 rounded-2xl p-8 border border-emerald-200/50 dark:border-emerald-700/50 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                    Our Privacy Commitment
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-slate-800 dark:text-slate-200">Transparency First</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300">We believe in clear, honest communication about how we handle your data.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-slate-800 dark:text-slate-200">Minimal Data Collection</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300">We only collect data that's necessary to provide and improve our services.</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-slate-800 dark:text-slate-200">Your Control</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300">You have full control over your personal data and can modify or delete it anytime.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-slate-800 dark:text-slate-200">Security Priority</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300">We use industry-leading security measures to protect your information.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Section */}
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 rounded-2xl p-8 border border-blue-200/50 dark:border-blue-700/50 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                    Privacy Questions or Concerns?
                  </h3>
                </div>
                <div className="space-y-4">
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    If you have any questions about this Privacy Policy, want to exercise your privacy rights, 
                    or have concerns about how we handle your personal data, please don't hesitate to reach out.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a 
                      href="mailto:giasinguyen@email.com" 
                      className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium hover:underline transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      giasinguyen@email.com
                    </a>
                    <span className="text-slate-400 dark:text-slate-500 hidden sm:block">•</span>
                    <span className="text-slate-600 dark:text-slate-400 text-sm">
                      We typically respond within 24-48 hours
                    </span>
                  </div>
                </div>
              </div>

              {/* Legal Compliance Notice */}
              <div className="bg-slate-100/70 dark:bg-slate-700/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 dark:border-slate-600/50">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-slate-500 dark:text-slate-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Legal Compliance</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      This Privacy Policy is designed to comply with applicable data protection laws including GDPR, CCPA, and other regional privacy regulations. 
                      We regularly review and update our practices to ensure ongoing compliance and protection of your privacy rights.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;