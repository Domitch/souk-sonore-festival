import { ArrowRight, Heart, Music, Users } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "../Components/shared/button";

interface HeroProps {
	onNavigate: (page: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
	return (
		<div className="min-h-screen pt-20">
			{/* Hero Section */}
			<section className="relative min-h-[90vh] flex items-center overflow-hidden">
				{/* Background Image */}
				<div className="absolute inset-0 z-0">
					<img
						src="/public/img/concert-musique.jpg"
						alt="Festival atmosphere"
						className="w-full h-full object-cover"
					/>{" "}
					<div className="bg-gradient-to-b from-[#220901]/80 via-[#220901]/60 to-[#220901]" />
				</div>

				{/* Content */}
				<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="max-w-4xl"
					>
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.3, duration: 0.8 }}
							className="mb-6"
						>
							<span className="inline-block px-4 py-2 bg-[#d4a574]/20 border border-[#d4a574]/40 rounded-full text-[#d4a574] text-sm tracking-wider uppercase backdrop-blur-sm">
								Festival 2025
							</span>
						</motion.div>

						<motion.h1
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.5, duration: 0.8 }}
							className="text-5xl sm:text-6xl lg:text-7xl mb-8 leading-tight"
						>
							<span className="block text-[#f5f1ea]">Souk Sonore</span>
							<span className="block text-[#d4a574] mt-2">
								Un voyage sonore, trois cultures
							</span>
						</motion.h1>

						<motion.p
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.7, duration: 0.8 }}
							className="text-xl text-[#e8d5b7] mb-12 leading-relaxed max-w-2xl"
						>
							Plongez dans un festival unique où les rythmes africains, latinos
							et arabes se rencontrent pour célébrer la diversité, le partage et
							la magie de la musique. Une expérience immersive qui transcende
							les frontières.
						</motion.p>

						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.9, duration: 0.8 }}
							className="flex flex-col sm:flex-row gap-4"
						>
							<Button
								onClick={() => onNavigate("artistes")}
								className="bg-[#d4a574] text-[#0f0d0a] hover:bg-[#c97d5d] hover:text-[#f5f1ea] px-8 py-6 text-lg transition-all duration-300 group"
								size="lg"
							>
								Découvrir la lineup
								<ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
							</Button>
							<Button
								onClick={() => onNavigate("billetterie")}
								variant="outline"
								className="border-2 border-[#d4a574] text-[#d4a574] hover:bg-[#d4a574] hover:text-[#0f0d0a] px-8 py-6 text-lg transition-all duration-300"
								size="lg"
							>
								Réserver un pass
							</Button>
						</motion.div>
					</motion.div>
				</div>

				{/* Decorative elements */}
				<motion.div
					animate={{
						scale: [1, 1.2, 1],
						opacity: [0.3, 0.5, 0.3],
					}}
					transition={{
						duration: 8,
						repeat: Infinity,
						ease: "easeInOut",
					}}
					className="absolute top-1/4 right-10 w-64 h-64 bg-[#d4a574]/10 rounded-full blur-3xl"
				/>
				<motion.div
					animate={{
						scale: [1.2, 1, 1.2],
						opacity: [0.2, 0.4, 0.2],
					}}
					transition={{
						duration: 10,
						repeat: Infinity,
						ease: "easeInOut",
					}}
					className="absolute bottom-1/4 left-10 w-80 h-80 bg-[#4a5f8c]/10 rounded-full blur-3xl"
				/>
			</section>

			{/* Values Section */}
			<section className="relative py-24 bg-gradient-to-b from-[#220901] to-[#220901]">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="text-center mb-16"
					>
						<h2 className="text-4xl sm:text-5xl mb-6 text-[#f5f1ea]">
							L'esprit du festival
						</h2>
						<p className="text-xl text-[#f6aa1c] max-w-3xl mx-auto">
							Souk Sonore est bien plus qu'un festival : c'est une célébration
							du métissage culturel, un espace de rencontre et d'échange entre
							les peuples et les traditions.
						</p>
					</motion.div>

					<div className="grid md:grid-cols-3 gap-8">
						{[
							{
								icon: Music,
								title: "Diversité",
								description:
									"Une programmation riche qui célèbre la diversité musicale des cultures africaine, latino et arabe.",
							},
							{
								icon: Users,
								title: "Partage",
								description:
									"Un lieu de rencontre et d'échange où les cultures se mêlent dans une atmosphère conviviale.",
							},
							{
								icon: Heart,
								title: "Célébration",
								description:
									"Une expérience immersive qui honore les traditions tout en embrassant la modernité.",
							},
						].map((value, index) => (
							<motion.div
								key={value.title}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.2, duration: 0.6 }}
								whileHover={{ y: -10 }}
								className="bg-[#1a1612] border border-[#d4a574]/20 rounded-2xl p-8 transition-all duration-300 hover:border-[#d4a574]/40 hover:shadow-lg hover:shadow-[#d4a574]/10"
							>
								<div className="w-16 h-16 bg-[#d4a574]/20 rounded-full flex items-center justify-center mb-6">
									<value.icon className="w-8 h-8 text-[#f6aa1c]" />
								</div>
								<h3 className="text-2xl mb-4 text-[#f5f1ea]">{value.title}</h3>
								<p className="text-[#b8a99a] leading-relaxed">
									{value.description}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Teaser Artists */}
			<section className="relative py-24 bg-[#1a1612]">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="text-center mb-16"
					>
						<h2 className="text-4xl sm:text-5xl mb-6 text-[#f5f1ea]">
							Ils seront là
						</h2>
						<p className="text-xl text-[#b8a99a] mb-8">
							Découvrez une programmation exceptionnelle d'artistes venus du
							monde entier
						</p>
						<Button
							onClick={() => onNavigate("artistes")}
							className="bg-transparent border-2 border-[#d4a574] text-[#d4a574] hover:bg-[#d4a574] hover:text-[#0f0d0a] px-8 py-6 text-lg transition-all duration-300"
						>
							Voir tous les artistes
							<ArrowRight className="ml-2 h-5 w-5" />
						</Button>
					</motion.div>
				</div>
			</section>
		</div>
	);
}
