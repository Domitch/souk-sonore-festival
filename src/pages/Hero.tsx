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
					<video
						className="w-full h-full object-cover"
						src="/video/video-bg.mp4"
						autoPlay
						loop
						muted
						playsInline
					/>
					<div className="absolute inset-0 bg-gradient-to-b from-[var(--color-texte)]/80 via-[var(--color-texte)]/60 to-[var(--color-texte)]" />
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
							<span className="inline-block px-4 py-2 bg-[#f6aa1c]/20 border border-[#f6aa1c]/40 rounded-full text-[#f6aa1c] text-sm tracking-wider uppercase backdrop-blur-sm">
								Festival 2026
							</span>
						</motion.div>

						<motion.h1
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.5, duration: 0.8 }}
							className="text-5xl sm:text-6xl lg:text-7xl mb-8 leading-tight"
						>
							<span className="block text-[#f5f1ea]">Souk Sonore</span>
							<span className="block mt-2">Trois cultures, un voyage.</span>
						</motion.h1>

						<motion.p
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.7, duration: 0.8 }}
							className="text-xl text-[#e8d5b7] mb-12 leading-relaxed max-w-2xl"
						>
							Souk Sonore célèbre le métissage des cultures à travers une
							expérience musicale unique. Du mbalax sénégalais à la cumbia
							colombienne, du raï algérien au soukous congolais, notre festival
							est un voyage sonore qui transcende les frontières. Plus qu'un
							festival, c'est une célébration de l'humanité dans toute sa
							diversité, un espace de partage et de rencontre où la musique
							devient le langage universel qui nous rassemble.
						</motion.p>

						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.9, duration: 0.8 }}
							className="flex flex-col sm:flex-row gap-4"
						>
							<Button
								onClick={() => onNavigate("artistes")}
								className="bg-[#f6aa1c] text-[#0f0d0a] hover:bg-[#c97d5d] hover:text-[#f5f1ea] px-8 py-6 text-lg transition-all duration-300 group"
								size="lg"
							>
								Découvrir la lineup
								<ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
							</Button>
							<Button
								onClick={() => onNavigate("billetterie")}
								variant="outline"
								className="border-2 border-[#f6aa1c] text-[#f6aa1c] hover:bg-[#f6aa1c] hover:text-[#0f0d0a] px-8 py-6 text-lg transition-all duration-300"
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
			<section className="relative py-24 bg-gradient-to-b from-[var(--color-texte)] to-[var(--color-texte)]">
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
									"Une mosaïque de cultures qui s’entremêlent pour créer une expérience musicale riche et authentique ",
							},
							{
								icon: Users,
								title: "Partage",
								description:
									"Un espace de rencontre ou les mélodies deviennent des ponts entre les peuples et les générations",
							},
							{
								icon: Heart,
								title: "Célébration",
								description:
									"Une fête vibrante qui honore la richesse des traditions musicales africaines, latines et arabes ",
							},
						].map((value, index) => (
							<motion.div
								key={value.title}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.2, duration: 0.6 }}
								whileHover={{ y: -10 }}
								className="bg-[#621708] border border-[#f6aa1c]/20 rounded-2xl p-8 transition-all duration-300 hover:border-[#f6aa1c]/40 hover:shadow-lg hover:shadow-[#f6aa1c]/10"
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
			<section className="relative py-24 bg-[url('/img/concert-musique.jpg')] bg-cover bg-center bg-no-repeat">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="text-center mb-16"
					>
						<h2 className="text-4xl sm:text-5xl mb-6 text-[var(--color-clair)]">
							Notre Programation
						</h2>
						<img
							className="w-full max-w-[400px] h-auto border-[#f6aa1c] object-contain mx-auto mb-8 rounded-lg shadow-2xl"
							src="/public/img/souksonoreprogr.png"
							alt="des gent dans un concert"
						/>

						<p className="text-xl text-[var(--color-clair)] mb-8">
							Découvrez une programmation exceptionnelle d'artistes venus du
							monde entier
						</p>

						<Button
							onClick={() => onNavigate("artistes")}
							className="bg-transparent border-2 border-[#f6aa1c] text-[#f6aa1c] hover:bg-[#f6aa1c] hover:text-[#0f0d0a] px-8 py-6 text-lg transition-all duration-300"
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
