import { useState, useCallback, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEnvelope,
  FaUser,
  FaPaperPlane,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaComments,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimes,
  FaRocket,
  FaCode,
  FaHeart
} from "react-icons/fa";

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((type, message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    return newErrors;
  }, [formData]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      addToast("error", "Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      addToast("success", "Message sent successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch (err) {
      addToast("error", "Failed to send message. Please try again.");
      console.error("Contact form error:", err);
    } finally {
      setIsSubmitting(false);
    }
  }, [validateForm, addToast]);

  const contactInfo = useMemo(() => [
    {
      icon: FaEnvelope,
      label: "Email",
      value: "giasinew@gmail.com",
      href: "mailto:giasinew@gmail.com",
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30"
    },
    {
      icon: FaPhone,
      label: "Phone",
      value: "+84 123 456 789",
      href: "tel:+84123456789",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30"
    },
    {
      icon: FaMapMarkerAlt,
      label: "Location",
      value: "Ho Chi Minh City, Vietnam",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30"
    }
  ], []);

  const socialLinks = [
    {
      icon: FaGithub,
      label: "GitHub",
      href: "https://github.com/giasinguyen",
      color: "hover:text-gray-400",
      bgColor: "hover:bg-gray-500/10"
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/giasinguyen",
      color: "hover:text-blue-400",
      bgColor: "hover:bg-blue-500/10"
    },
    {
      icon: FaTwitter,
      label: "Twitter",
      href: "https://twitter.com/giasinguyen",
      color: "hover:text-sky-400",
      bgColor: "hover:bg-sky-500/10"
    },
    {
      icon: FaInstagram,
      label: "Instagram",
      href: "https://instagram.com/giasinguyen",
      color: "hover:text-pink-400",
      bgColor: "hover:bg-pink-500/10"
    }
  ];

  return (
    <main className="min-h-screen pt-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-slate-100 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-violet-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-effect border border-slate-700/50 mb-8"
          >
            <FaRocket className="w-6 h-6 text-blue-400" />
            <span className="text-lg font-semibold text-slate-300">
              Let's Connect
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            Get In{" "}
            <span className="gradient-text">
              Touch
            </span>
          </h1>

          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto mb-8 rounded-full" />

          <p className="text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto">
            Have a project in mind or just want to chat about technology? 
            I'd love to hear from you. Let's create something amazing together!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            <div className="card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-violet-500 rounded-xl flex items-center justify-center">
                  <FaComments className="text-white text-xl" />
                </div>
                <h2 className="text-3xl font-bold text-slate-100">Send Message</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-slate-300 font-medium">
                      Your Name *
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className={`w-full pl-12 pr-4 py-4 bg-slate-800/50 border rounded-xl transition-all duration-300 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 ${
                          errors.name 
                            ? 'border-red-500 focus:ring-red-500/50' 
                            : 'border-slate-600 focus:ring-blue-500/50 focus:border-blue-500'
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-400 text-sm flex items-center gap-2">
                        <FaExclamationTriangle className="text-xs" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-slate-300 font-medium">
                      Email Address *
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        className={`w-full pl-12 pr-4 py-4 bg-slate-800/50 border rounded-xl transition-all duration-300 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 ${
                          errors.email 
                            ? 'border-red-500 focus:ring-red-500/50' 
                            : 'border-slate-600 focus:ring-blue-500/50 focus:border-blue-500'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-400 text-sm flex items-center gap-2">
                        <FaExclamationTriangle className="text-xs" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Field */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-slate-300 font-medium">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What's this about?"
                    className={`w-full px-4 py-4 bg-slate-800/50 border rounded-xl transition-all duration-300 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 ${
                      errors.subject 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : 'border-slate-600 focus:ring-blue-500/50 focus:border-blue-500'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-red-400 text-sm flex items-center gap-2">
                      <FaExclamationTriangle className="text-xs" />
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-slate-300 font-medium">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project or just say hello..."
                    rows="6"
                    className={`w-full px-4 py-4 bg-slate-800/50 border rounded-xl transition-all duration-300 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 resize-none ${
                      errors.message 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : 'border-slate-600 focus:ring-blue-500/50 focus:border-blue-500'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-sm flex items-center gap-2">
                      <FaExclamationTriangle className="text-xs" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="text-lg" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info & Social */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Information */}
            <div className="card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <FaCode className="text-white text-xl" />
                </div>
                <h2 className="text-3xl font-bold text-slate-100">Get in Touch</h2>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={index}
                      className={`flex items-center gap-4 p-4 ${info.bgColor} border ${info.borderColor} rounded-2xl transition-all duration-300 hover:scale-105`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className={`w-12 h-12 ${info.bgColor} border ${info.borderColor} rounded-xl flex items-center justify-center`}>
                        <Icon className={`text-xl ${info.color}`} />
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">{info.label}</p>
                        {info.href ? (
                          <a 
                            href={info.href}
                            className={`text-slate-100 font-semibold ${info.color} transition-colors`}
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-slate-100 font-semibold">{info.value}</p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Social Media */}
            <div className="card">
              <h3 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-3">
                <FaHeart className="text-red-400" />
                Follow Me
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 p-4 glass-effect border border-slate-700/50 rounded-2xl text-slate-400 transition-all duration-300 ${social.color} ${social.bgColor} hover:scale-105 hover:shadow-lg`}
                      whileHover={{ y: -2 }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Icon className="text-2xl" />
                      <span className="font-medium">{social.label}</span>
                    </motion.a>
                  );
                })}
              </div>
            </div>

           
          </motion.div>
        </div>
      </div>

      {/* Toast Notifications */}
      <div className="fixed top-20 right-6 z-50 space-y-4">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-lg max-w-md glass-effect border ${
                toast.type === "success"
                  ? "border-green-500/30 bg-green-500/10"
                  : "border-red-500/30 bg-red-500/10"
              }`}
            >
              {toast.type === "success" ? (
                <FaCheckCircle className="text-green-400 text-xl flex-shrink-0" />
              ) : (
                <FaExclamationTriangle className="text-red-400 text-xl flex-shrink-0" />
              )}
              <p className={`${toast.type === "success" ? "text-green-100" : "text-red-100"} font-medium`}>
                {toast.message}
              </p>
              <button
                onClick={() => removeToast(toast.id)}
                className={`${toast.type === "success" ? "text-green-400 hover:text-green-300" : "text-red-400 hover:text-red-300"} transition-colors`}
              >
                <FaTimes />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </main>
  );
}

export default memo(Contact);
