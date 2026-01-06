import { motion } from "motion/react";
import { LuFacebook, LuInstagram, LuMail, LuTwitter } from "react-icons/lu";

export function Footer() {
	const icons = [
		{
			icon: LuInstagram,
			link: "instagram.com",
		},
		{
			icon: LuFacebook,
			link: "facebook.com",
		},
		{
			icon: LuTwitter,
			link: "x.com",
		},
		{
			icon: LuMail,
			link: "contact@souksonore.com",
		},
	];

	return (
		<footer className="bg-[#220901] border-t border-[#f6aa1c]/20 py-12">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid md:grid-cols-3 gap-8 mb-8">
					{/* Brand */}
					<div>
						<h3 className="text-lg text-[#f6aa1c] mb-3">Souk Sonore</h3>
						<p className="text-base text-[#f6aa1c] mb-4">
							Un festival qui célèbre la diversité musicale et culturelle
							d'Afrique, d'Amérique latine et du monde arabe.
						</p>
						<div className="text-lg flex gap-3">
							{icons.map((item) => (
								<motion.a
									key={Math.random()}
									href={
										item.link.includes("@")
											? `mailto:${item.link}`
											: `https://${item.link}`
									}
									whileHover={{ scale: 1.1, y: -2 }}
									className="w-10 h-10 bg-[#f6aa1c]/20 rounded-full flex items-center justify-center text-[#f6aa1c] hov#f6aa1c:text-[#0f0d0a] transition-all"
								>
									<item.icon className="w-5 h-5" />
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
