import { MapPin, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { Artists } from "../../models/artists";
import type { Origins } from "../../models/origins";
import ArtistApiService from "../services/artists_api_service";

export function ArtistesPage() {
	const [selectedArtist, setSelectedArtist] = useState<Artists | null>(null);
	const [filter, setFilter] = useState<"All" | "Afro" | "Latino" | "Arabe">(
		"All",
	);

	const [artists, setArtists] = useState<Artists[]>([]);

	useEffect(() => {
		new ArtistApiService()
			.selectAll()
			.then((items) => setArtists(items.data as unknown as Artists[]));
	}, []);

	const filteredArtists =
		filter === "All"
			? artists
			: artists.filter((artist) =>
					(artist.styles as unknown as { name: string }[]).some(
						(style) => style.name === filter,
					),
				);

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
									<img
										src={`/img/${artist.image}`}
										alt={artist.name}
										className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
									/>

									<div className="absolute inset-0 bg-gradient-to-t from-[#0f0d0a] via-[#0f0d0a]/50 to-transparent" />
								</div>

								{/* Content */}
								<div className="p-6">
									<h3 className="text-2xl mb-2 text-[#f5f1ea]">
										{artist.name}
									</h3>

									<div className="flex items-center gap-2 mb-3 text-[#d4a574]">
										<MapPin className="w-4 h-4" />
										<span className="text-sm">
											{(artist.origins as unknown as Origins[])
												.map((origin) => origin.name)
												.join(", ")}
										</span>
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
								<img
									src={`/img/${selectedArtist.image}`}
									alt={selectedArtist.name}
									className="w-full h-full object-cover"
								/>

								<div className="absolute inset-0 bg-gradient-to-t from-[#1a1612] via-transparent to-transparent" />

								<button
									type="button"
									onClick={() => setSelectedArtist(null)}
									className="absolute top-4 right-4 w-10 h-10 bg-[#0f0d0a]/80 rounded-full flex items-center justify-center text-[#d4a574] hover:bg-[#d4a574] hover:text-[#0f0d0a] transition-all"
								>
									<X size={24} />
								</button>
							</div>

							{/* Modal Content */}
							<div className="p-8">
								<h2 className="text-4xl mb-3 text-[#f5f1ea]">
									{selectedArtist.name}
								</h2>

								<div className="flex items-center gap-2 mb-6 text-[#d4a574]">
									<MapPin className="w-5 h-5" />
									<span>
										{(selectedArtist.origins as unknown as Origins[])
											.map((origin) => origin.name)
											.join(", ")}
									</span>
								</div>

								<p className="text-xl text-[#e8d5b7] mb-6 italic">
									{selectedArtist.description}
								</p>

								<p className="text-[#b8a99a] leading-relaxed text-lg">
									{selectedArtist.bio}
								</p>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
0;
