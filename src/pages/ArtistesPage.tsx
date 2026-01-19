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
    name: "Shakira",
    origin: "Colombie",
    culture: "Latino",
    description:
      "Pop vibrante mêlant rythmes latins et mondiaux, fusionnant danse, voix puissante et sonorités afro‑latines.",
    image: "//public/img/shakira/Shakira.jpg",
    fullBio:
      "Shakira Isabel Mebarak Ripoll, née en 1977 à Barranquilla, construit une carrière internationale dès l’adolescence avant de s’imposer comme l’une des artistes latines les plus influentes au monde. Autrice, compositrice et interprète, elle enchaîne les succès mondiaux en espagnol et en anglais, tout en développant une image de performeuse complète et de marque globale. Parallèlement à la musique, elle s’investit dans l’entrepreneuriat, les jurys télévisés et des actions philanthropiques, consolidant une carrière durable et stratégique à l’échelle internationale.",
  },
  {
    id: 2,
    name: "Rema",
    origin: "Nigéria",
    culture: "Afro",
    description:
      "Afrobeats modernes aux influences pop, trap et sonorités globales",
    image: "/img/rema/rema.jpg",
    fullBio:
      "Rema, originaire de Benin City au Nigeria, s’est imposé sur la scène afrobeats avec ses mixtapes et son premier album Rave & Roses, mêlant rythmes africains, trap et pop globale. Il a enchaîné les collaborations internationales avec des artistes comme Selena Gomez, Chris Brown ou J Balvin, consolidant son style hybride et sa place parmi les stars mondiales de la musique contemporaine.",
  },
  {
    id: 3,
    name: "Tif",
    origin: "Algérie",
    culture: "Arabe",
    description:
      "Rap poétique mêlant français et arabe, fusionnant rap urbain, raï et sonorités orientales",
    image: "/img/Tif/Tif.jpg",

    fullBio:
      "TIF, de son vrai nom Toufik Bouhraoua, est un rappeur et chanteur algérien né à Alger et basé à Paris, qui s’est fait connaître en 2019 avec le single 3iniya, mêlant rap francophone et influences orientales. Après avoir fondé son label indépendant Houma Sweet Houma, il a sorti l’EP Houma Sweet Houma (2022) puis l’album/EP 1.6 (2023), où il explore nostalgie, exil et identité à travers un rap poétique qui fusionne français et arabe avec des sonorités chaâbi, raï et traditionnelles. Il collabore avec des artistes de la scène urbaine francophone et nord-africaine et continue de gagner en notoriété grâce à des morceaux comme Hinata, Shadow Boxing ou Amnesia, consolidant sa place comme l’une des voix montantes du rap francophone actuel.",
  },
  {
    id: 4,
    name: "Asake",
    origin: "Nigéria",
    culture: "Afro",
    description:
      "Afrobeats énergique fusionnant afro-pop, fuji, amapiano et influences urbaines contemporaines",
    image: "//public/img/asake/Asake.webp",
    fullBio:
      "Originaire de Lagos au Nigeria, Asake (Ahmed Ololade) est un chanteur, rappeur et auteur-compositeur qui s’est fait connaître grâce à une fusion unique d’afrobeats, fuji, amapiano et pop moderne. Son premier album *Mr. Money With The Vibe* (2022) a battu des records de streaming et l’a propulsé sur la scène mondiale, suivi par *Work of Art* (2023) puis *Lungu Boy* (2024), tous salués pour leur mix de rythmes africains et sonorités globales. Connu pour des titres comme “Sungba”, “Terminator” ou “Lonely at the Top”, et ses collaborations avec des artistes internationaux comme Wizkid, Travis Scott et Stormzy, Asake s’est imposé comme l’un des visages majeurs de l’afrobeats contemporain.",
  },
  {
    id: 5,
    name: "Nancy Ajram",
    origin: "Liban",
    culture: "Arabe",
    description:
      "Pop entraînante mêlant mélodies arabes classiques et arrangements pop moderne",
    image: "//public/img/NancyAjram/nancy-ajram1.webp",
    fullBio:
      "Nancy Ajram est une chanteuse libanaise devenue l’une des figures emblématiques de la pop arabe. Elle commence sa carrière très jeune, remportant un concours de talents à 12 ans et sortant son premier album *Mihtagalak* à 15 ans. Son vrai tournant vient avec *Ya Salam* (2003) et le hit 'Akhasmak Ah’, qui la propulsent sur le devant de la scène arabe, suivis de succès internationaux comme *AhW Noss* et YaTabtab…Wa Dallaa*. Avec plus d’une dizaine d’albums, des hits comme *Enta Eih*, *Fi Hagat* ou *Sah Sah* et des collaborations modernes, elle s’impose par sa capacité à fusionner sonorités orientales et pop accessible, tout en accumulant records de ventes et reconnaissances mondiales.",
  },
  {
    id: 6,
    name: "Karol G",
    origin: "Colombie",
    culture: "Latino",
    description:
      "Reggaeton et pop urbaine entraînants, fusionnant rythmes latins, mélodies accrocheuses et énergie moderne.",
    image:
      "https://images.unsplash.com/photo-1544266671-4d2166b22982?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmFiaWMlMjBtaWRkbGUlMjBlYXN0ZXJuJTIwbXVzaWNpYW58ZW58MXx8fHwxNzY3MDAyNzcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    fullBio:
      "Karol G, née Carolina Giraldo Navarro à Medellín en Colombie, est une chanteuse et compositrice de reggaeton et pop urbaine devenue une figure majeure de la scène latino mondiale. Elle se fait connaître grâce à des hits comme Ahora Me Llama et Tusa, et enchaîne les collaborations avec des artistes internationaux tels que Nicki Minaj, J Balvin ou Bad Bunny. Avec plusieurs albums à succès, dont Unstoppable et KG0516, Karol G combine rythmes urbains, mélodies pop et influences latines, s’imposant comme une voix incontournable du reggaeton contemporain.",
  },
  {
    id: 7,
    name: "Bad Bunny",
    origin: "Porto Rico",
    culture: "Latino",
    description:
      "Reggaeton et trap latino innovants, mêlant rythmes caribéens, influences urbaines et énergie planétaire.",
    image: "//public/img/Badbunny/badbunny1.webp",
    fullBio:
      "Bad Bunny, de son vrai nom Benito Antonio Martínez Ocasio, est un chanteur, rappeur et compositeur portoricain qui a révolutionné la scène latine moderne. Il se fait connaître grâce à des titres comme Soy Peor et Dákiti, et ses albums X 100PRE, YHLQMDLG et Un Verano Sin Ti rencontrent un succès mondial. Connu pour ses collaborations avec J Balvin, Rosalía, Cardi B ou Drake, il combine reggaeton, trap latino et influences musicales variées tout en s’imposant comme une icône culturelle et un ambassadeur de la musique latino contemporaine.",
  },
  {
    id: 8,
    name: "Tems",
    origin: "Nigéria",
    culture: "Afro",
    description:
      "Mélange d’afrobeats et de R&B introspectif, fusionnant voix soul profonde et sonorités alternatives modernes.",
    image: "//public/img/Tems/Tems.jpg",
    fullBio:
      "Tems (Temilade Openiyi), née à Lagos au Nigeria, est une chanteuse, auteure compositrice et productrice qui s’est imposée comme l’une des voix les plus singulières de la musique africaine contemporaine. Elle a d’abord attiré l’attention internationale en 2020 grâce à sa collaboration avec Wizkid sur le hit Essence, propulsé dans le top 10 du Billboard Hot 100, avant de collaborer avec Drake et d’autres stars mondiales. Après plusieurs EP salués par la critique, elle sort son premier album Born in the Wild en 2024, porté par des singles comme Love Me JeJe, qui lui valent des récompenses prestigieuses et confirment son rôle de figure majeure de l’afrobeats et du R&B moderne.",
  },
  {
    id: 9,
    name: "Saint Levant",
    origin: "Palestine",
    culture: "Arabe",
    description:
      "Mélange innovant de hip-hop, R&B et pop multilingue, fusionnant rythmes arabes traditionnels, influences occidentales et textes en anglais, français et arabe.",
    image: "//public/img/saintLevant/SaintLevant.jpg",
    fullBio:
      "Saint Levant, de son vrai nom Marwan Abdelhamid, est un auteur-compositeur et interprète palestinien qui s’est fait connaître internationalement grâce au single viral Very Few Friends, combinant habilement trois langues et styles musicaux. Son premier EP From Gaza, With Love (2023) et son album Deira (2024) explorent thèmes d’identité, nostalgie et héritage, tout en fusionnant influences arabes, funk, hip-hop et pop contemporaine. Par ses collaborations avec artistes internationaux et son approche multilingue, il incarne une nouvelle vague de musique arabe qui trouve un écho mondial.",
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
        return "bg-[#f6aa1c]";
      case "Arabe":
        return "bg-[#4a5f8c]";
      default:
        return "bg-[#f6aa1c]";
    }
  };

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
