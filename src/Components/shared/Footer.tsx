import { Facebook, Instagram, Mail, Twitter } from "lucide-react";
import { motion } from "motion/react";

export function Footer() {
	return (
		<footer className="bg-[#220901] border-t border-[#f6aa1c]/20 py-12">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid md:grid-cols-3 gap-8 mb-8">
					{/* Brand */}
					<div>
						<h3 className="text-2xl text-[#f6aa1c] mb-3">Souk Sonore</h3>
						<p className="text-[#f6aa1c] mb-4">
							Un festival qui célèbre la diversité musicale et culturelle
							d'Afrique, d'Amérique latine et du monde arabe.
						</p>
						<div className="flex gap-3">
							{[Instagram, Facebook, Twitter, Mail].map((Icon, index) => (
								<motion.a
									key={index}
									href="/reseaux"
									whileHover={{ scale: 1.1, y: -2 }}
									className="w-10 h-10 bg-[#f6aa1c]/20 rounded-full flex items-center justify-center text-[#f6aa1c] hov#f6aa1c:text-[#0f0d0a] transition-all"
								>
									<Icon className="w-5 h-5" />
								</motion.a>
							))}
						</div>
					</div>

					{/* Links */}
					<div>
						<h4 className="text-[#f6aa1c] mb-4">Liens rapides</h4>
						<ul className="space-y-2 text-[#f6aa1c]">
							<li>
								<a
									href="/programme"
									className="hover:text-[#f6aa1c] transition-colors"
								>
									Programme complet
								</a>
							</li>
							<li>
								<a
									href="/info"
									className="hover:text-[#f6aa1c] transition-colors"
								>
									Infos pratiques
								</a>
							</li>
							<li>
								<a
									href="/partenaires"
									className="hover:text-[#f6aa1c] transition-colors"
								>
									Partenaires
								</a>
							</li>
							<li>
								<a
									href="/press"
									className="hover:text-[#f6aa1c] transition-colors"
								>
									Presse
								</a>
							</li>
						</ul>
					</div>

					{/* Legal */}
					<div>
						<h4 className="text-[#f6aa1c] mb-4">Mentions légales</h4>
						<ul className="space-y-2 text-[#f6aa1c]">
							<li>
								<a
									href="/conditions-générales"
									className="hover:text-[#f6aa1c] transition-colors"
								>
									Conditions générales
								</a>
							</li>
							<li>
								<a
									href="/politique-de-confidentialité"
									className="hover:text-[#f6aa1c] transition-colors"
								>
									Politique de confidentialité
								</a>
							</li>
							<li>
								<a
									href="/cookies"
									className="hover:text-[#f6aa1c] transition-colors"
								>
									Cookies
								</a>
							</li>
							<li>
								<a
									href="/contact"
									className="hover:text-[#f6aa1c] transition-colors"
								>
									Contact
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className="pt-8 border-t border-[#f6aa1c]/20 text-center text-[#f6aa1c]">
					<p>&copy; 2025 Souk Sonore. Tous droits réservés.</p>
				</div>
			</div>
		</footer>
	);
}
