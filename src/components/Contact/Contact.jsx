import { useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEnvelope,
  FaPaperPlane,
  FaWhatsapp,
  FaLinkedin,
  FaCheckCircle,
  FaTimes,
  FaSpinner
} from "react-icons/fa";
import SEOHead from '../SEO/SEOHead'
import { SEO_CONFIGS } from '../SEO/seoConfigs'
import contactData from '../../data/contact.json';
import profileData from '../../data/profile.json';

// Static header data
const CONTACT_HEADER = {
  badge: profileData.status.message,
  title: "Get In Touch",
  description: "Looking for a Full Stack Developer? Let's connect and discuss how I can contribute to your team."
};

// Icon mapping
const iconMap = {
  email: FaEnvelope,
  phone: FaWhatsapp,
  linkedin: FaLinkedin
};

// Emphasize matching phrases in text (for availability bullets)
const emphasizeAvailability = (text, emphasizingWords) => {
  if (!emphasizingWords?.length) return text;
  const sorted = [...emphasizingWords].sort((a, b) => b.length - a.length);
  let result = text;
  sorted.forEach((word) => {
    const re = new RegExp(`(${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    result = result.replace(re, '<span class="text-amber-400 font-semibold">$1</span>');
  });
  return result;
};

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  // Real email submission using Web3Forms
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast("error", "Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: contactData.form.web3FormsAccessKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `${contactData.form.subjectPrefix} ${formData.name}`,
          from_name: contactData.form.fromName
        })
      });

      const result = await response.json();

      if (result.success) {
        showToast("success", "Message sent successfully! I'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      showToast("error", "Failed to send message. Please try again or contact me directly.");
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, showToast]);

  // Direct contact methods from contactInfo
  const contactMethods = [
    {
      id: 1,
      icon: FaEnvelope,
      label: "Email",
      value: contactData.contactInfo.email.value,
      href: contactData.contactInfo.email.url
    },
    {
      id: 2,
      icon: FaWhatsapp,
      label: "Whatsapp",
      value: contactData.contactInfo.whatsapp.value,
      href: contactData.contactInfo.whatsapp.url
    },
    {
      id: 3,
      icon: FaLinkedin,
      label: "LinkedIn",
      value: contactData.contactInfo.linkedin.value || "LinkedIn Profile",
      href: contactData.contactInfo.linkedin.url
    }
  ];

  return (
    <>
      <SEOHead config={SEO_CONFIGS.contact} />
      
      <section className="section-padding pt-28 pb-20">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm font-medium mb-6">
              {CONTACT_HEADER.badge}
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-100 mb-4">
              {CONTACT_HEADER.title}
            </h1>
            
            <p className="text-neutral-400 text-lg max-w-xl mx-auto">
              {CONTACT_HEADER.description}
            </p>
          </motion.div>

          {/* Main Content Grid - right column stretches to match form height */}
          <div className="grid lg:grid-cols-5 gap-8 lg:items-stretch">
            
            {/* Contact Form - Takes 3 columns */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-3 flex flex-col"
            >
              <div className="bg-neutral-900/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-neutral-800 flex-1 flex flex-col min-h-0">
                <h2 className="text-xl font-semibold text-neutral-100 mb-6 text-center">
                  Send a Message
                </h2>

                <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                  <div className="space-y-5 flex-1">
                    <div>
                      <label className="block text-sm font-medium text-neutral-400 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-neutral-800/50 border border-neutral-700 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all"
                        placeholder={profileData.personalInfo.fullName}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-400 mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-neutral-800/50 border border-neutral-700 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all"
                        placeholder={contactData.contactInfo.email.value}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-400 mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-neutral-800/50 border border-neutral-700 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all resize-none"
                        placeholder="Tell me about your project or opportunity..."
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-auto pt-5">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-900 font-semibold hover:from-amber-400 hover:to-amber-500 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <FaSpinner className="text-sm animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          Send Message
                        </>
                      )}
                    </button>
                    <p className="text-neutral-500 text-xs text-center mt-4">
                      Your message will be sent directly to my inbox
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Right column: Direct Contact (icons only) + Availability (fills to form bottom) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 flex flex-col min-h-0"
            >
              {/* Direct Contact - icons only, horizontal, centered */}
              <div className="bg-neutral-900/60 backdrop-blur-sm rounded-2xl p-6 border border-neutral-800 flex-shrink-0 flex flex-col items-center justify-center text-center">
                <h2 className="text-lg font-semibold text-neutral-100 mb-4">
                  Direct Contact
                </h2>
                <div className="flex flex-wrap gap-3 justify-center items-center">
                  {contactMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <a
                        key={method.id}
                        href={method.href}
                        target={method.href.startsWith("http") ? "_blank" : undefined}
                        rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="w-12 h-12 rounded-xl bg-neutral-800/40 hover:bg-neutral-800/70 border border-neutral-700/50 hover:border-amber-500/30 flex items-center justify-center text-amber-400 hover:bg-amber-500/10 hover:text-amber-300 transition-all duration-300"
                        title={method.label}
                        aria-label={method.label}
                      >
                        <Icon className="text-xl" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Availability - fills space from direct contact bottom to form bottom */}
              <div className="flex-1 min-h-0 mt-6 flex flex-col">
                <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-2xl p-6 border border-amber-500/20 flex-1 flex flex-col min-h-0 overflow-y-auto">
                  <div className="flex items-center gap-3 mb-4 flex-shrink-0">
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                    </span>
                    <span className="text-sm font-semibold text-amber-400">
                      {profileData.status.message}
                    </span>
                  </div>
                  <ul className="space-y-2.5 text-sm text-neutral-400 leading-relaxed flex-1 pl-5">
                    {(profileData.status.description || "")
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean)
                      .map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 group"
                        >
                          <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500/60 group-hover:bg-amber-400 group-hover:scale-125 transition-all duration-300" />
                          <span
                            className="group-hover:text-neutral-300 transition-colors duration-300"
                            dangerouslySetInnerHTML={{
                              __html: emphasizeAvailability(
                                feature,
                                profileData.status.emphasizing
                              ),
                            }}
                          />
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Toast Notification */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-6 right-6 z-50"
            >
              <div className={`px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 ${
                toast.type === 'success' 
                  ? 'bg-green-500/90 text-white' 
                  : 'bg-red-500/90 text-white'
              }`}>
                {toast.type === 'success' ? (
                  <FaCheckCircle className="text-lg" />
                ) : (
                  <FaTimes className="text-lg" />
                )}
                <span className="text-sm font-medium">{toast.message}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}

export default memo(Contact);
