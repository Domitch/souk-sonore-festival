import { motion } from "motion/react";
import { LuFacebook, LuInstagram, LuTwitter, LuMail } from "react-icons/lu";
// import { Button } from "./button";
interface NavigationProps {
  onNavigate: (page: string) => void;
}
export function Footer({ onNavigate }: NavigationProps) {
  const navigation = [
    { title: "Accueil", link: "//src/pages/Hero.tsx" },
    { title: "Artistes", link: "/artistes" },
    { title: "Billetterie", link: "/billetterie" },
    { title: "Contact", link: "/contact" },
  ];

  const infos = [
    { title: "FAQ", link: "/faq" },
    { title: "Plan du site", link: "/plan" },
    { title: "Partenaires", link: "/partenaires" },
    { title: "Presse", link: "/press" },
  ];

  const legal = [
    { title: "Mentions légales", link: "/mentions-legales" },
    { title: "Confidentialité", link: "/confidentialite" },
    { title: "CGU", link: "/cgu" },
    { title: "Accessibilité", link: "/accessibilite" },
  ];

  const social = [
    { icon: LuInstagram, link: "https://instagram.com" },
    { icon: LuFacebook, link: "https://facebook.com" },
    { icon: LuTwitter, link: "https://x.com" },
    { icon: LuMail, link: "mailto:contact@souksonore.com" },
  ];

  return (
    <footer className="bg-[#220901] text-[#f6aa1c] border-t border-[#f6aa1c]/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Navigation */}

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => onNavigate("accueil")}
            className="flex items-center gap-2 "
          >
            <img
              src="/img/logo/logoSoukSonore.png"
              alt="Souk Sonore Logo"
              className="h-25 w-20 flex-shrink-0"
            />
          </motion.button>

          <div>
            {/* Logo */}

            <h4 className="text-lg font-semibold mb-4">Navigation</h4>

            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.title}>
                  <a
                    href={item.link}
                    className="hover:text-[#bc3908] transition-colors"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Informations */}

          <div>
            <h4 className="text-lg font-semibold mb-4">Informations</h4>

            <ul className="space-y-2">
              {infos.map((item) => (
                <li key={item.title}>
                  <a
                    href={item.link}
                    className="hover:text-[#bc3908] transition-colors"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}

          <div>
            <h4 className="text-lg font-semibold mb-4">Légal</h4>

            <ul className="space-y-2">
              {legal.map((item) => (
                <li key={item.title}>
                  <a
                    href={item.link}
                    className="hover:text-[#bc3908] transition-colors"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Réseaux sociaux */}

          <div>
            <h4 className="text-lg font-semibold mb-4">Réseaux</h4>

            <div className="flex gap-3">
              {social.map((item) => (
                <a
                  key={item.link}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#f6aa1c]/20 hover:bg-[#f6aa1c]/40 transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Description et copyright */}
        <hr className="my-8 border-[#f6aa1c]/30" />
        <div className="text-center text-sm text-[#f6aa1c]/80">
          <p className="mb-2">
            Un festival qui célèbre le métissage des rythmes africains, latinos
            et arabes.
          </p>

          <p>
            © 2026 Souk Sonore. Tous droits réservés. Un festival de diversité,
            partage et célébration.
          </p>
        </div>
      </div>
    </footer>
  );
}
