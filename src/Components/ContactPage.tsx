import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Phone, Instagram, Facebook, Twitter, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

export function ContactPage() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ nom: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#0f0d0a] via-[#1a1612] to-[#0f0d0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl sm:text-6xl mb-6 text-[#f5f1ea]">
            Contactez-nous
          </h1>
          <p className="text-xl text-[#b8a99a] max-w-3xl mx-auto">
            Une question, une suggestion ou besoin d'informations ? Notre équipe est là pour vous répondre.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-[#1a1612] border border-[#d4a574]/20 rounded-2xl p-8 md:p-12"
          >
            <h2 className="text-3xl mb-8 text-[#f5f1ea]">Envoyez-nous un message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nom" className="block mb-2 text-[#e8d5b7]">
                  Nom complet
                </label>
                <Input
                  id="nom"
                  name="nom"
                  type="text"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0f0d0a] border-[#d4a574]/30 text-[#f5f1ea] focus:border-[#d4a574] transition-colors"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-[#e8d5b7]">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0f0d0a] border-[#d4a574]/30 text-[#f5f1ea] focus:border-[#d4a574] transition-colors"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 text-[#e8d5b7]">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-[#0f0d0a] border-[#d4a574]/30 text-[#f5f1ea] focus:border-[#d4a574] transition-colors resize-none"
                  placeholder="Écrivez votre message ici..."
                />
              </div>

              <Button
                type="submit"
                disabled={submitted}
                className="w-full bg-[#d4a574] text-[#0f0d0a] hover:bg-[#c97d5d] hover:text-[#f5f1ea] py-6 transition-all duration-300 disabled:opacity-50"
              >
                {submitted ? (
                  'Message envoyé ✓'
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Envoyer le message
                  </>
                )}
              </Button>

              {submitted && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-[#d4a574]"
                >
                  Merci ! Nous vous répondrons très bientôt.
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-8"
          >
            {/* Info Cards */}
            <div className="bg-[#1a1612] border border-[#d4a574]/20 rounded-2xl p-8">
              <h3 className="text-2xl mb-6 text-[#f5f1ea]">Informations de contact</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#d4a574]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#d4a574]" />
                  </div>
                  <div>
                    <h4 className="text-[#e8d5b7] mb-1">Email</h4>
                    <a
                      href="mailto:contact@souksonore.com"
                      className="text-[#b8a99a] hover:text-[#d4a574] transition-colors"
                    >
                      contact@souksonore.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#d4a574]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#d4a574]" />
                  </div>
                  <div>
                    <h4 className="text-[#e8d5b7] mb-1">Téléphone</h4>
                    <a
                      href="tel:+33123456789"
                      className="text-[#b8a99a] hover:text-[#d4a574] transition-colors"
                    >
                      +33 1 23 45 67 89
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#d4a574]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#d4a574]" />
                  </div>
                  <div>
                    <h4 className="text-[#e8d5b7] mb-1">Adresse</h4>
                    <p className="text-[#b8a99a]">
                      Parc des Expositions<br />
                      75000 Paris, France
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-[#1a1612] border border-[#d4a574]/20 rounded-2xl p-8">
              <h3 className="text-2xl mb-6 text-[#f5f1ea]">Suivez-nous</h3>
              
              <div className="flex gap-4">
                {[
                  { Icon: Instagram, href: '#', label: 'Instagram' },
                  { Icon: Facebook, href: '#', label: 'Facebook' },
                  { Icon: Twitter, href: '#', label: 'Twitter' },
                ].map(({ Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="w-14 h-14 bg-[#d4a574]/20 rounded-full flex items-center justify-center text-[#d4a574] hover:bg-[#d4a574] hover:text-[#0f0d0a] transition-all duration-300"
                    aria-label={label}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>

              <p className="mt-6 text-[#b8a99a]">
                Restez informés des dernières actualités, des annonces d'artistes et des offres
                spéciales en nous suivant sur les réseaux sociaux.
              </p>
            </div>

            {/* Hours */}
            <div className="bg-[#1a1612] border border-[#d4a574]/20 rounded-2xl p-8">
              <h3 className="text-2xl mb-6 text-[#f5f1ea]">Horaires du festival</h3>
              
              <div className="space-y-3 text-[#b8a99a]">
                <div className="flex justify-between">
                  <span>Vendredi 20 juin</span>
                  <span className="text-[#e8d5b7]">18h - 02h</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi 21 juin</span>
                  <span className="text-[#e8d5b7]">14h - 02h</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimanche 22 juin</span>
                  <span className="text-[#e8d5b7]">14h - 00h</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
