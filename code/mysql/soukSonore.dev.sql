
DROP DATABASE IF EXISTS soukSonore;

-- créer la base de données
CREATE DATABASE soukSonore;

-- créer tables
CREATE TABLE soukSonore.artist(
    id TINYINT UNSIGNED AUTO_INCREMENT primary key,
    name VARCHAR(150) NOT NULL,
    description VARCHAR(350) NOT NULL,
    image VARCHAR(150) NOT NULL,
    bio TEXT NOT NULL,
    INDEX(name)
);

CREATE TABLE soukSonore.style(
    id TINYINT UNSIGNED AUTO_INCREMENT primary key,
    name VARCHAR(250) NOT NULL,
    INDEX(name)
);
CREATE TABLE soukSonore.origin(
    id TINYINT UNSIGNED AUTO_INCREMENT primary key,
    name VARCHAR(250) NOT NULL,
    INDEX(name)
);
CREATE TABLE soukSonore.artist_style(
    artist_id TINYINT UNSIGNED,
    style_id TINYINT UNSIGNED,
    FOREIGN KEY (artist_id)
    REFERENCES artist(id),
    FOREIGN KEY (style_id)
    REFERENCES style(id),
    PRIMARY KEY (artist_id,style_id) 
);
CREATE TABLE soukSonore.artist_origin(
    artist_id TINYINT UNSIGNED,
    origin_id TINYINT UNSIGNED,
    FOREIGN KEY (artist_id)
    REFERENCES artist(id),
    FOREIGN KEY (origin_id)
    REFERENCES origin(id),
    PRIMARY KEY (artist_id,origin_id) 
);

INSERT INTO soukSonore.artist(name, description, image, bio) values (
		'Shakira',
			'Pop vibrante mêlant rythmes latins et mondiaux, fusionnant danse, voix puissante et sonorités afro‑latines.',
		 'Shakira.jpg',
			'Shakira Isabel Mebarak Ripoll, née en 1977 à Barranquilla, construit une carrière internationale dès l’adolescence avant de s’imposer comme l’une des artistes latines les plus influentes au monde. Autrice, compositrice et interprète, elle enchaîne les succès mondiaux en espagnol et en anglais, tout en développant une image de performeuse complète et de marque globale. Parallèlement à la musique, elle s’investit dans l’entrepreneuriat, les jurys télévisés et des actions philanthropiques, consolidant une carrière durable et stratégique à l’échelle internationale.'
            ),

		( 'Rema',
			'Afrobeats modernes aux influences pop, trap et sonorités globales', 
            'rema.jpg',
		'Rema, originaire de Benin City au Nigeria, s’est imposé sur la scène afrobeats avec ses mixtapes et son premier album Rave & Roses, mêlant rythmes africains, trap et pop globale. Il a enchaîné les collaborations internationales avec des artistes comme Selena Gomez, Chris Brown ou J Balvin, consolidant son style hybride et sa place parmi les stars mondiales de la musique contemporaine.'
	),
	( 
        'Tif',
		'Rap poétique mêlant français et arabe, fusionnant rap urbain, raï et sonorités orientales',
		'Tif.jpg',
        'TIF, de son vrai nom Toufik Bouhraoua, est un rappeur et chanteur algérien né à Alger et basé à Paris, qui s’est fait connaître en 2019 avec le single 3iniya, mêlant rap francophone et influences orientales. Après avoir fondé son label indépendant Houma Sweet Houma, il a sorti l’EP Houma Sweet Houma (2022) puis l’album/EP 1.6 (2023), où il explore nostalgie, exil et identité à travers un rap poétique qui fusionne français et arabe avec des sonorités chaâbi, raï et traditionnelles. Il collabore avec des artistes de la scène urbaine francophone et nord-africaine et continue de gagner en notoriété grâce à des morceaux comme Hinata, Shadow Boxing ou Amnesia, consolidant sa place comme l’une des voix montantes du rap francophone actuel.'
    ),
	(
        'Asake',		
		'Afrobeats énergique fusionnant afro-pop, fuji, amapiano et influences urbaines contemporaines',
		'Asake.webp',
		'Originaire de Lagos au Nigeria, Asake (Ahmed Ololade) est un chanteur, rappeur et auteur-compositeur qui s’est fait connaître grâce à une fusion unique d’afrobeats, fuji, amapiano et pop moderne. Son premier album *Mr. Money With The Vibe* (2022) a battu des records de streaming et l’a propulsé sur la scène mondiale, suivi par *Work of Art* (2023) puis *Lungu Boy* (2024), tous salués pour leur mix de rythmes africains et sonorités globales. Connu pour des titres comme “Sungba”, “Terminator” ou “Lonely at the Top”, et ses collaborations avec des artistes internationaux comme Wizkid, Travis Scott et Stormzy, Asake s’est imposé comme l’un des visages majeurs de l’afrobeats contemporain.'
	),
	(
		'Nancy Ajram',
			'Pop entraînante mêlant mélodies arabes classiques et arrangements pop moderne',
		'nancy-ajram1.webp',
			'Nancy Ajram est une chanteuse libanaise devenue l’une des figures emblématiques de la pop arabe. Elle commence sa carrière très jeune, remportant un concours de talents à 12 ans et sortant son premier album *Mihtagalak* à 15 ans. Son vrai tournant vient avec *Ya Salam* (2003) et le hit Akhasmak Ah’, qui la propulsent sur le devant de la scène arabe, suivis de succès internationaux comme *AhW Noss* et YaTabtab…Wa Dallaa*. Avec plus d’une dizaine d’albums, des hits comme *Enta Eih*, *Fi Hagat* ou *Sah Sah* et des collaborations modernes, elle s’impose par sa capacité à fusionner sonorités orientales et pop accessible, tout en accumulant records de ventes et reconnaissances mondiales.'
    ),
	(
		    'Karol G',
		    'Reggaeton et pop urbaine entraînants, fusionnant rythmes latins, mélodies accrocheuses et énergie moderne.',
		    'karol_g.jpeg',
			'Karol G, née Carolina Giraldo Navarro à Medellín en Colombie, est une chanteuse et compositrice de reggaeton et pop urbaine devenue une figure majeure de la scène latino mondiale. Elle se fait connaître grâce à des hits comme Ahora Me Llama et Tusa, et enchaîne les collaborations avec des artistes internationaux tels que Nicki Minaj, J Balvin ou Bad Bunny. Avec plusieurs albums à succès, dont Unstoppable et KG0516, Karol G combine rythmes urbains, mélodies pop et influences latines, s’imposant comme une voix incontournable du reggaeton contemporain.'
	),
	(
		    "Bad Bunny",
			"Reggaeton et trap latino innovants, mêlant rythmes caribéens, influences urbaines et énergie planétaire.",
		    'badbunny1.webp',
			'Bad Bunny, de son vrai nom Benito Antonio Martínez Ocasio, est un chanteur, rappeur et compositeur portoricain qui a révolutionné la scène latine moderne. Il se fait connaître grâce à des titres comme Soy Peor et Dákiti, et ses albums X 100PRE, YHLQMDLG et Un Verano Sin Ti rencontrent un succès mondial. Connu pour ses collaborations avec J Balvin, Rosalía, Cardi B ou Drake, il combine reggaeton, trap latino et influences musicales variées tout en s’imposant comme une icône culturelle et un ambassadeur de la musique latino contemporaine.'
    ),
	(
        'Tems',
		'Mélange d’afrobeats et de R&B introspectif, fusionnant voix soul profonde et sonorités alternatives modernes.',
		'Tems.jpg',
		'Tems (Temilade Openiyi), née à Lagos au Nigeria, est une chanteuse, auteure compositrice et productrice qui s’est imposée comme l’une des voix les plus singulières de la musique africaine contemporaine. Elle a d’abord attiré l’attention internationale en 2020 grâce à sa collaboration avec Wizkid sur le hit Essence, propulsé dans le top 10 du Billboard Hot 100, avant de collaborer avec Drake et d’autres stars mondiales. Après plusieurs EP salués par la critique, elle sort son premier album Born in the Wild en 2024, porté par des singles comme Love Me JeJe, qui lui valent des récompenses prestigieuses et confirment son rôle de figure majeure de l’afrobeats et du R&B moderne.'
    ),
	(
		'Saint Levant',
		'Mélange innovant de hip-hop, R&B et pop multilingue, fusionnant rythmes arabes traditionnels, influences occidentales et textes en anglais, français et arabe.',
		'SaintLevant.jpg',
        'Saint Levant, de son vrai nom Marwan Abdelhamid, est un auteur-compositeur et interprète palestinien qui s’est fait connaître internationalement grâce au single viral Very Few Friends, combinant habilement trois langues et styles musicaux. Son premier EP From Gaza, With Love (2023) et son album Deira (2024) explorent thèmes d’identité, nostalgie et héritage, tout en fusionnant influences arabes, funk, hip-hop et pop contemporaine. Par ses collaborations avec artistes internationaux et son approche multilingue, il incarne une nouvelle vague de musique arabe qui trouve un écho mondial.'
	);

    INSERT INTO soukSonore.style(name) values 
    ('Afro'),
    ('Latino'),
    ('Arabe');

    INSERT INTO soukSonore.origin(name) values 
    ('Colombie'),
    ('Nigeria'),
    ('Algérie'),
    ('Liban'),
    ('Porto Rico'),
    ('Palestine');


    INSERT INTO soukSonore.artist_style
    values 
    (1, 2),
    (2, 1),
    (3, 3),
    (4, 1),
    (5, 3),
    (6, 2),
    (7, 2),
    (8, 1),
    (9, 3);

    INSERT INTO soukSonore.artist_origin
    values 
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 2),
    (5, 4),
    (6, 1),
    (7, 5),
    (8, 2),
    (9, 6);
    
    




