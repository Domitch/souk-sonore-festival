import { Check, Sparkles, Star, Ticket } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "../Components/shared/button";

interface PassOption {
	title: string;
	days: string;
	recommended?: boolean;
	badge?: string;
	prices: {
		plein: number;
		reduit: number;
		kids: number;
	};
	features: string[];
	icon: typeof Ticket;
}

const passes: PassOption[] = [
	{
		title: "Pass 1 Jour",
		days: "1",
		prices: {
			plein: 49,
			reduit: 39,
			kids: 15,
		},
		features: [
			"Accès complet pour 1 journée",
			"Tous les concerts et performances",
			"Accès aux espaces restauration",
			"Plan du festival inclus",
		],
		icon: Ticket,
	},
	{
		title: "Pass 2 Jours",
		days: "2",
		badge: "Le meilleur équilibre",
		prices: {
			plein: 89,
			reduit: 69,
			kids: 25,
		},
		features: [
			"Accès complet pour 2 journées",
			"Tous les concerts et performances",
			"Accès aux espaces restauration",
			"Plan du festival inclus",
			"Programme détaillé",
		],
		icon: Star,
	},
	{
		title: "Pass 3 Jours",
		days: "3",
		recommended: true,
		badge: "Expérience complète",
		prices: {
			plein: 129,
			reduit: 99,
			kids: 35,
		},
		features: [
			"Accès complet pour 3 journées",
			"Tous les concerts et performances",
			"Accès aux espaces restauration",
			"Plan du festival inclus",
			"Programme détaillé",
			"Tote bag officiel Souk Sonore",
			"Accès prioritaire",
		],
		icon: Sparkles,
	},
];

export function BilletteriePage() {
	return (
		<div className="min-h-screen pt-20 bg-gradient-to-b from-[#220901] via-[#220901] to-[#220901]">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-center mb-16"
				>
					<div className="inline-flex items-center gap-2 px-4 py-2 bg-[#220901]/20 border border-[#d4a574]/40 rounded-full text-[#d4a574] text-sm tracking-wider uppercase backdrop-blur-sm mb-6">
						<Ticket className="w-4 h-4" />
						Billetterie
					</div>
					<h1 className="text-5xl sm:text-6xl mb-6 text-[#f5f1ea]">
						Choisis ton pass et vis l'expérience Souk Sonore
					</h1>
					<p className="text-xl text-[#b8a99a] max-w-3xl mx-auto">
						Sélectionne le pass qui te correspond pour vivre une immersion
						totale dans les cultures musicales du monde.
					</p>
				</motion.div>

				{/* Pass Cards */}
				<div className="grid md:grid-cols-3 gap-8 mb-16">
					{passes.map((pass, index) => (
						<motion.div
							key={pass.title}
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.2, duration: 0.6 }}
							className={`relative bg-[#220901] rounded-2xl overflow-hidden ${
								pass.recommended
									? "border-2 border-[#f6aa1c] shadow-xl shadow-[#d4a574]/20 md:scale-105"
									: "border border-[#f6aa1c]/20"
							}`}
						>
							{/* Badge */}
							{pass.badge && (
								<div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#d4a574] to-[#c97d5d] text-[#0f0d0a] text-center py-2 text-sm">
									{pass.badge}
								</div>
							)}

							<div className={`p-8 ${pass.badge ? "pt-14" : ""}`}>
								{/* Icon */}
								<div className="w-16 h-16 bg-[#d4a574]/20 rounded-full flex items-center justify-center mb-6">
									<pass.icon className="w-8 h-8 text-[#f6aa1c]" />
								</div>

								{/* Title */}
								<h3 className="text-3xl mb-2 text-[#f5f1ea]">{pass.title}</h3>

								{/* Prices */}
								<div className="mb-8 space-y-3">
									<div className="flex items-baseline gap-2">
										<span className="text-4xl text-[#f6aa1c]">
											{pass.prices.plein}€
										</span>
										<span className="text-[#b8a99a]">Plein tarif</span>
									</div>
									<div className="text-[#b8a99a] space-y-1">
										<div>
											Tarif réduit :{" "}
											<span className="text-[#e8d5b7]">
												{pass.prices.reduit}€
											</span>
										</div>
										<div>
											Kids (6-12 ans) :{" "}
											<span className="text-[#e8d5b7]">
												{pass.prices.kids}€
											</span>
										</div>
										<div className="text-sm">Gratuit : moins de 6 ans</div>
									</div>
								</div>

								{/* Features */}
								<ul className="space-y-3 mb-8">
									{pass.features.map((feature) => (
										<li key={feature} className="flex items-start gap-3">
											<Check className="w-5 h-5 text-[#f6aa1c] flex-shrink-0 mt-0.5" />
											<span className="text-[#b8a99a]">{feature}</span>
										</li>
									))}
								</ul>

								{/* Button */}
								<Button
									className={`w-full py-6 ${
										pass.recommended
											? "bg-[#d4a574] text-[#0f0d0a] hover:bg-[#c97d5d]"
											: "bg-transparent border-2 border-[#d4a574] text-[#d4a574] hover:bg-[#d4a574] hover:text-[#0f0d0a]"
									} transition-all duration-300`}
								>
									Acheter
								</Button>
							</div>
						</motion.div>
					))}
				</div>

				{/* Additional Info */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.8, duration: 0.6 }}
					className="bg-[#220901] border border-[#d4a574]/20 rounded-2xl p-8 md:p-12"
				>
					<h3 className="text-2xl mb-6 text-[#f5f1ea]">
						Informations importantes
					</h3>

					<div className="grid md:grid-cols-2 gap-8">
						<div>
							<h4 className="text-lg mb-4 text-[#d4a574]">
								Tarifs spécifiques
							</h4>
							<ul className="space-y-2 text-[#b8a99a]">
								<li className="flex items-start gap-3">
									<Check className="w-5 h-5 text-[#d4a574] flex-shrink-0 mt-0.5" />
									<span>Seniors (65+) : -10% sur tous les pass</span>
								</li>
								<li className="flex items-start gap-3">
									<Check className="w-5 h-5 text-[#d4a574] flex-shrink-0 mt-0.5" />
									<span>PMR + accompagnant : tarif réduit</span>
								</li>
								<li className="flex items-start gap-3">
									<Check className="w-5 h-5 text-[#d4a574] flex-shrink-0 mt-0.5" />
									<span>Tarif étudiant sur présentation de justificatif</span>
								</li>
								<li className="flex items-start gap-3">
									<Check className="w-5 h-5 text-[#d4a574] flex-shrink-0 mt-0.5" />
									<span>
										Demandeurs d'emploi : tarif réduit avec justificatif
									</span>
								</li>
							</ul>
						</div>

						<div>
							<h4 className="text-lg mb-4 text-[#d4a574]">
								Conditions générales
							</h4>
							<ul className="space-y-2 text-[#b8a99a]">
								<li className="flex items-start gap-3">
									<Check className="w-5 h-5 text-[#d4a574] flex-shrink-0 mt-0.5" />
									<span>Billets nominatifs et personnels</span>
								</li>
								<li className="flex items-start gap-3">
									<Check className="w-5 h-5 text-[#d4a574] flex-shrink-0 mt-0.5" />
									<span>Pièce d'identité requise à l'entrée</span>
								</li>
								<li className="flex items-start gap-3">
									<Check className="w-5 h-5 text-[#d4a574] flex-shrink-0 mt-0.5" />
									<span>Pièce justificative pour tarifs réduits</span>
								</li>
								<li className="flex items-start gap-3">
									<Check className="w-5 h-5 text-[#d4a574] flex-shrink-0 mt-0.5" />
									<span>
										Billets non remboursables (sauf annulation du festival)
									</span>
								</li>
							</ul>
						</div>
					</div>

					<div className="mt-8 p-6 bg-[#d4a574]/10 border border-[#d4a574]/30 rounded-xl">
						<p className="text-[#e8d5b7] text-center">
							<span className="text-[#d4a574]">💡 Conseil :</span> Les billets
							sont en quantité limitée. Réserve ton pass dès maintenant pour
							garantir ta place à Souk Sonore 2025 !
						</p>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
