import { useState, useContext } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  User,
  Send,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  X,
} from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";

function Contact() {
  // Use ThemeContext properly 
  const { darkMode: isDarkMode } = useContext(ThemeContext);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [toasts, setToasts] = useState([]);

  const addToast = (type, message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      addToast(
        "success",
        "Message sent successfully! I'll get back to you soon."
      );

      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      addToast("error", "Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "giasinguyentran@gmail.com",
      href: "mailto:giasinguyentran@gmail.com",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+(84) 34 899 6487",
      href: "tel:+84348996487",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Ho Chi Minh City, Vietnam",
      href: null,
      color: "from-purple-500 to-pink-500",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/giasinguyen",
      label: "GitHub",
      color: "hover:bg-gray-600",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/giasinguyen",
      label: "LinkedIn",
      color: "hover:bg-blue-600",
    },
    {
      icon: Twitter,
      href: "https://twitter.com/giasinguyen",
      label: "Twitter",
      color: "hover:bg-sky-500",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/iamgiasi",
      label: "Instagram",
      color: "hover:bg-pink-600",
    },
  ];

  return (
    <main
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${
        isDarkMode ? "dark" : ""
      }`}
    >
      {/* Background Pattern */}
      <div
        className={`absolute inset-0 bg-[size:60px_60px] opacity-40 ${
          isDarkMode ? "bg-grid-slate-700/25" : "bg-grid-slate-100"
        }`}
      />
      <div
        className={`absolute inset-0 bg-gradient-to-tr via-transparent ${
          isDarkMode
            ? "from-blue-500/5 to-indigo-500/5"
            : "from-blue-500/10 to-indigo-500/10"
        }`}
      />

      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.8 }}
              className={`flex items-center gap-3 p-4 rounded-xl backdrop-blur-sm shadow-lg border ${
                toast.type === "success"
                  ? `${
                      isDarkMode
                        ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400"
                        : "bg-emerald-500/10 border-emerald-500/20 text-emerald-600"
                    }`
                  : `${
                      isDarkMode
                        ? "bg-red-500/20 border-red-500/30 text-red-400"
                        : "bg-red-500/10 border-red-500/20 text-red-600"
                    }`
              }`}
            >
              {toast.type === "success" ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <span className="text-sm font-medium">{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-current/60 hover:text-current transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-sm border mb-8 ${
              isDarkMode
                ? "bg-slate-800/90 border-slate-600/50"
                : "bg-white/80 border-white/30"
            }`}
          >
            <MessageCircle className="w-6 h-6 text-blue-500" />
            <span
              className={`text-lg font-semibold ${
                isDarkMode ? "text-slate-100" : "text-slate-700"
              }`}
            >
              Let's Connect
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            Get In{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>

          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mb-8 rounded-full" />

          <p
            className={`text-xl max-w-3xl mx-auto leading-relaxed ${
              isDarkMode ? "text-slate-200" : "text-slate-600"
            }`}
          >
            Have a project in mind or just want to say hello? I'm always open to
            discussing new projects, creative ideas, or opportunities to bring
            your vision to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div
              className={`backdrop-blur-xl rounded-2xl p-8 shadow-xl border ${
                isDarkMode
                  ? "bg-slate-800/95 border-slate-600/50"
                  : "bg-white/90 border-white/30"
              }`}
            >
              <h2
                className={`text-3xl font-bold mb-8 ${
                  isDarkMode ? "text-white" : "text-slate-800"
                }`}
              >
                Contact Information
              </h2>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    className="group flex items-start gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    <div
                      className={`p-4 rounded-xl bg-gradient-to-r ${info.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <info.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`text-sm font-semibold uppercase tracking-wider mb-1 ${
                          isDarkMode ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        {info.label}
                      </h3>
                      {info.href ? (
                        <a
                          href={info.href}
                          className={`text-lg font-semibold transition-colors duration-200 ${
                            isDarkMode
                              ? "text-slate-100 hover:text-blue-400"
                              : "text-slate-700 hover:text-blue-600"
                          }`}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p
                          className={`text-lg font-semibold ${
                            isDarkMode ? "text-slate-100" : "text-slate-700"
                          }`}
                        >
                          {info.value}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div
                className={`mt-12 pt-8 border-t ${
                  isDarkMode ? "border-slate-600/60" : "border-slate-200/60"
                }`}
              >
                <h3
                  className={`text-xl font-semibold mb-6 ${
                    isDarkMode ? "text-white" : "text-slate-800"
                  }`}
                >
                  Connect with me
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`p-3 rounded-xl transition-all duration-300 ${
                        social.color
                      } hover:text-white hover:scale-110 hover:shadow-lg ${
                        isDarkMode
                          ? "bg-slate-700/90 text-slate-200"
                          : "bg-slate-100 text-slate-600"
                      }`}
                      aria-label={social.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                      whileHover={{ y: -2 }}
                    >
                      <social.icon className="w-6 h-6" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div
              className={`backdrop-blur-xl rounded-2xl p-8 shadow-xl border ${
                isDarkMode
                  ? "bg-slate-800/95 border-slate-600/50"
                  : "bg-white/90 border-white/30"
              }`}
            >
              <h2
                className={`text-3xl font-bold mb-8 ${
                  isDarkMode ? "text-white" : "text-slate-800"
                }`}
              >
                Send Me a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <label
                      htmlFor="name"
                      className={`block text-sm font-semibold mb-2 ${
                        isDarkMode ? "text-slate-300" : "text-slate-700"
                      }`}
                    >
                      Your Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User
                          className={`w-5 h-5 ${
                            isDarkMode ? "text-slate-500" : "text-slate-400"
                          }`}
                        />
                      </div>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                        className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-200 backdrop-blur-sm ${
                          isDarkMode
                            ? "bg-slate-700/70 text-white placeholder-slate-400"
                            : "bg-white/70 text-slate-900 placeholder-slate-500"
                        } ${
                          errors.name
                            ? `${
                                isDarkMode ? "border-red-500" : "border-red-400"
                              } focus:border-red-500 focus:ring-4 focus:ring-red-500/20`
                            : `${
                                isDarkMode
                                  ? "border-slate-500"
                                  : "border-slate-200"
                              } focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20`
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <motion.p
                        className="mt-2 text-sm text-red-500 flex items-center gap-1"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.name}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Email Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <label
                      htmlFor="email"
                      className={`block text-sm font-semibold mb-2 ${
                        isDarkMode ? "text-slate-300" : "text-slate-700"
                      }`}
                    >
                      Your Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail
                          className={`w-5 h-5 ${
                            isDarkMode ? "text-slate-500" : "text-slate-400"
                          }`}
                        />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-200 backdrop-blur-sm ${
                          isDarkMode
                            ? "bg-slate-700/70 text-white placeholder-slate-400"
                            : "bg-white/70 text-slate-900 placeholder-slate-500"
                        } ${
                          errors.email
                            ? `${
                                isDarkMode ? "border-red-500" : "border-red-400"
                              } focus:border-red-500 focus:ring-4 focus:ring-red-500/20`
                            : `${
                                isDarkMode
                                  ? "border-slate-500"
                                  : "border-slate-200"
                              } focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20`
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <motion.p
                        className="mt-2 text-sm text-red-500 flex items-center gap-1"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </motion.p>
                    )}
                  </motion.div>
                </div>

                {/* Subject Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <label
                    htmlFor="subject"
                    className={`block text-sm font-semibold mb-2 ${
                      isDarkMode ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What's this about?"
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 backdrop-blur-sm ${
                      isDarkMode
                        ? "bg-slate-700/70 text-white placeholder-slate-400"
                        : "bg-white/70 text-slate-900 placeholder-slate-500"
                    } ${
                      errors.subject
                        ? `${
                            isDarkMode ? "border-red-500" : "border-red-400"
                          } focus:border-red-500 focus:ring-4 focus:ring-red-500/20`
                        : `${
                            isDarkMode ? "border-slate-500" : "border-slate-200"
                          } focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20`
                    }`}
                  />
                  {errors.subject && (
                    <motion.p
                      className="mt-2 text-sm text-red-500 flex items-center gap-1"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.subject}
                    </motion.p>
                  )}
                </motion.div>

                {/* Message Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <label
                    htmlFor="message"
                    className={`block text-sm font-semibold mb-2 ${
                      isDarkMode ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project or just say hello..."
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 backdrop-blur-sm resize-none ${
                      isDarkMode
                        ? "bg-slate-700/70 text-white placeholder-slate-400"
                        : "bg-white/70 text-slate-900 placeholder-slate-500"
                    } ${
                      errors.message
                        ? `${
                            isDarkMode ? "border-red-500" : "border-red-400"
                          } focus:border-red-500 focus:ring-4 focus:ring-red-500/20`
                        : `${
                            isDarkMode ? "border-slate-500" : "border-slate-200"
                          } focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20`
                    }`}
                  />
                  {errors.message && (
                    <motion.p
                      className="mt-2 text-sm text-red-500 flex items-center gap-1"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

export default Contact;
