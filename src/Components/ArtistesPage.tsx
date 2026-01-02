import { MapPin, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Artist {
	id: number;
	name: string;
	origin: string;
	culture: "Afro" | "Latino" | "Arabe";
	description: string;
	image: string;
	fullBio: string;
}

const artists: Artist[] = [
	{
		id: 1,
		name: "Ayomide",
		origin: "Lagos, Nigeria",
		culture: "Afro",
		description: "Voix envoûtante mêlant afrobeat et soul contemporaine",
		image:
			"https://images.unsplash.com/photo-1766916012957-8324354f7ae0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwbXVzaWMlMjBmZXN0aXZhbCUyMHBlcmZvcm1lcnxlbnwxfHx8fDE3NjcwMDI3NzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
		fullBio:
			"Ayomide est une artiste nigériane qui fusionne les rythmes afrobeat traditionnels avec des influences soul et R&B modernes. Sa voix puissante et ses performances énergiques ont conquis les scènes internationales.",
	},
	{
		id: 2,
		name: "Los Hermanos del Son",
		origin: "La Havane, Cuba",
		culture: "Latino",
		description: "Salsa authentique et rythmes caribéens enflammés",
		image:
			"https://images.unsplash.com/photo-1622309855049-b67c6564c528?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXRpbm8lMjBtdXNpY2lhbiUyMGNvbmNlcnR8ZW58MXx8fHwxNzY3MDAyNzcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
		fullBio:
			"Ce collectif cubain perpétue la tradition de la salsa authentique tout en y apportant une touche contemporaine. Leurs performances explosives font danser les foules du monde entier.",
	},
	{
		id: 3,
		name: "Yasmine al-Nour",
		origin: "Le Caire, Égypte",
		culture: "Arabe",
		description: "Fusion de musique arabe classique et électronique moderne",
		image:
			"https://images.unsplash.com/photo-1544266671-4d2166b22982?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmFiaWMlMjBtaWRkbGUlMjBlYXN0ZXJuJTIwbXVzaWNpYW58ZW58MXx8fHwxNzY3MDAyNzcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
		fullBio:
			"Yasmine repousse les frontières de la musique arabe en fusionnant instruments traditionnels et production électronique contemporaine. Son style unique crée des ponts entre passé et futur.",
	},
	{
		id: 4,
		name: "Koffi & The Rhythm Keepers",
		origin: "Accra, Ghana",
		culture: "Afro",
		description: "Highlife ghanéen et percussions hypnotiques",
		image:
			"https://images.unsplash.com/photo-1766916012957-8324354f7ae0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwbXVzaWMlMjBmZXN0aXZhbCUyMHBlcmZvcm1lcnxlbnwxfHx8fDE3NjcwMDI3NzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
		fullBio:
			"Maîtres des percussions africaines, ce groupe perpétue la tradition du highlife ghanéen avec une énergie contagieuse qui transcende les générations.",
	},
	{
		id: 5,
		name: "Marisol y su Banda",
		origin: "Mexico City, Mexique",
		culture: "Latino",
		description: "Mariachi moderne avec des touches de jazz",
		image:
			"https://images.unsplash.com/photo-1622309855049-b67c6564c528?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXRpbm8lMjBtdXNpY2lhbiUyMGNvbmNlcnR8ZW58MXx8fHwxNzY3MDAyNzcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
		fullBio:
			"Marisol réinvente le mariachi traditionnel en y incorporant des éléments de jazz et de musique contemporaine, créant un son unique et captivant.",
	},
	{
		id: 6,
		name: "Omar & The Desert Blues",
		origin: "Marrakech, Maroc",
		culture: "Arabe",
		description: "Blues du désert et sonorités gnawa envoûtantes",
		image:
			"https://images.unsplash.com/photo-1544266671-4d2166b22982?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmFiaWMlMjBtaWRkbGUlMjBlYXN0ZXJuJTIwbXVzaWNpYW58ZW58MXx8fHwxNzY3MDAyNzcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
		fullBio:
			"Omar fusionne les traditions gnawa du Maroc avec le blues américain, créant un son hypnotique qui évoque les vastes étendues du désert.",
	},
];

export function ArtistesPage() {
	const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
	const [filter, setFilter] = useState<"All" | "Afro" | "Latino" | "Arabe">(
		"All",
	);

	const filteredArtists =
		filter === "All"
			? artists
			: artists.filter((artist) => artist.culture === filter);

	const getCultureColor = (culture: string) => {
		switch (culture) {
			case "Afro":
				return "bg-[#c97d5d]";
			case "Latino":
				return "bg-[#d4a574]";
			case "Arabe":
				return "bg-[#4a5f8c]";
			default:
				return "bg-[#d4a574]";
		}
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
						Les Artistes
					</h1>
					<p className="text-xl text-[#b8a99a] max-w-3xl mx-auto mb-12">
						Découvrez les artistes exceptionnels qui feront vibrer Souk Sonore
						au rythme de leurs cultures et traditions musicales.
					</p>

					{/* Filter Buttons */}
					<div className="flex flex-wrap justify-center gap-3">
						{["All", "Afro", "Latino", "Arabe"].map((category) => (
							<button
								type="button"
								key={category}
								onClick={() => setFilter(category as typeof filter)}
								className={`px-6 py-3 rounded-full transition-all duration-300 ${
									filter === category
										? "bg-[#d4a574] text-[#0f0d0a]"
										: "bg-[#1a1612] text-[#b8a99a] border border-[#d4a574]/20 hover:border-[#d4a574]/40"
								}`}
							>
								{category === "All" ? "Tous" : category}
							</button>
						))}
					</div>
				</motion.div>

				{/* Artists Grid */}
				<motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					<AnimatePresence>
						{filteredArtists.map((artist, index) => (
							<motion.div
								key={artist.id}
								layout
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.9 }}
								transition={{ delay: index * 0.1, duration: 0.4 }}
								whileHover={{ y: -10 }}
								onClick={() => setSelectedArtist(artist)}
								className="group cursor-pointer bg-[#1a1612] rounded-2xl overflow-hidden border border-[#d4a574]/20 hover:border-[#d4a574]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#d4a574]/20"
							>
								{/* Image */}
								<div className="relative h-80 overflow-hidden">
									{/* <ImageWithFallback
										src={artist.image}
										alt={artist.name}
										className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
									/> */}
									<div className="absolute inset-0 bg-gradient-to-t from-[#0f0d0a] via-[#0f0d0a]/50 to-transparent" />

									{/* Culture Badge */}
									<div
										className={`absolute top-4 right-4 ${getCultureColor(artist.culture)} text-white px-4 py-2 rounded-full text-sm`}
									>
										{artist.culture}
									</div>
								</div>

								{/* Content */}
								<div className="p-6">
									<h3 className="text-2xl mb-2 text-[#f5f1ea]">
										{artist.name}
									</h3>
									<div className="flex items-center gap-2 mb-3 text-[#d4a574]">
										<MapPin className="w-4 h-4" />
										<span className="text-sm">{artist.origin}</span>
									</div>
									<p className="text-[#b8a99a] leading-relaxed">
										{artist.description}
									</p>
									<div className="mt-4 text-[#d4a574] group-hover:translate-x-2 transition-transform inline-block">
										En savoir plus →
									</div>
								</div>
							</motion.div>
						))}
					</AnimatePresence>
				</motion.div>
			</div>

			{/* Artist Modal */}
			<AnimatePresence>
				{selectedArtist && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setSelectedArtist(null)}
						className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
					>
						<motion.div
							initial={{ scale: 0.9, y: 50 }}
							animate={{ scale: 1, y: 0 }}
							exit={{ scale: 0.9, y: 50 }}
							onClick={(e) => e.stopPropagation()}
							className="bg-[#1a1612] rounded-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#d4a574]/40"
						>
							{/* Modal Image */}
							<div className="relative h-96">
								{/* <ImageWithFallback
									src={selectedArtist.image}
									alt={selectedArtist.name}
									className="w-full h-full object-cover"
								/> */}
								<div className="absolute inset-0 bg-gradient-to-t from-[#1a1612] via-transparent to-transparent" />
								<button
									type="button"
									onClick={() => setSelectedArtist(null)}
									className="absolute top-4 right-4 w-10 h-10 bg-[#0f0d0a]/80 rounded-full flex items-center justify-center text-[#d4a574] hover:bg-[#d4a574] hover:text-[#0f0d0a] transition-all"
								>
									<X size={24} />
								</button>
								<div
									className={`absolute top-4 left-4 ${getCultureColor(selectedArtist.culture)} text-white px-4 py-2 rounded-full`}
								>
									{selectedArtist.culture}
								</div>
							</div>

							{/* Modal Content */}
							<div className="p-8">
								<h2 className="text-4xl mb-3 text-[#f5f1ea]">
									{selectedArtist.name}
								</h2>
								<div className="flex items-center gap-2 mb-6 text-[#d4a574]">
									<MapPin className="w-5 h-5" />
									<span>{selectedArtist.origin}</span>
								</div>
								<p className="text-xl text-[#e8d5b7] mb-6 italic">
									{selectedArtist.description}
								</p>
								<p className="text-[#b8a99a] leading-relaxed text-lg">
									{selectedArtist.fullBio}
								</p>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
