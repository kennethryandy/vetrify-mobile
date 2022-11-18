const petsWithBreeds = [
	{
		"id": 4,
		"breed": "Gecko",
		"type": "reptile"
	},
	{
		"id": 5,
		"breed": "Iguane",
		"type": "reptile"
	},
	{
		"id": 6,
		"breed": "Chameleon",
		"type": "reptile"
	},
	{
		"id": 7,
		"breed": "Lizard",
		"type": "reptile"
	},
	{
		"id": 8,
		"breed": "Snake",
		"type": "reptile"
	},
	{
		"id": 9,
		"breed": "Turtle",
		"type": "reptile"
	},
	{
		"id": 10,
		"breed": "Affenpinscher",
		"type": "dog"
	},
	{
		"id": 11,
		"breed": "Afghan Hound",
		"type": "dog"
	},
	{
		"id": 12,
		"breed": "Aidi",
		"type": "dog"
	},
	{
		"id": 13,
		"breed": "Airedale Terrier",
		"type": "dog"
	},
	{
		"id": 14,
		"breed": "Akita Inu",
		"type": "dog"
	},
	{
		"id": 15,
		"breed": "Alapaha Blue Blood Bulldog",
		"type": "dog"
	},
	{
		"id": 16,
		"breed": "Alaskan Husky",
		"type": "dog"
	},
	{
		"id": 17,
		"breed": "Alaskan Klee Kai",
		"type": "dog"
	},
	{
		"id": 18,
		"breed": "Alaskan Malamute",
		"type": "dog"
	},
	{
		"id": 19,
		"breed": "Alpine Dachsbracke",
		"type": "dog"
	},
	{
		"id": 22,
		"breed": "American Akita",
		"type": "dog"
	},
	{
		"id": 23,
		"breed": "American Bulldog",
		"type": "dog"
	},
	{
		"id": 24,
		"breed": "American Cocker Spaniel",
		"type": "dog"
	},
	{
		"id": 25,
		"breed": "American Eskimo",
		"type": "dog"
	},
	{
		"id": 26,
		"breed": "American Foxhound",
		"type": "dog"
	},
	{
		"id": 27,
		"breed": "American Hairless Terrier",
		"type": "dog"
	},
	{
		"id": 28,
		"breed": "American Pit Bull Terrier",
		"type": "dog"
	},
	{
		"id": 29,
		"breed": "American Staffordshire Terrier",
		"type": "dog"
	},
	{
		"id": 30,
		"breed": "Toy Fox Terrier",
		"type": "dog"
	},
	{
		"id": 31,
		"breed": "American Water Spaniel",
		"type": "dog"
	},
	{
		"id": 33,
		"breed": "Anglo-français de petite vénerie",
		"type": "dog"
	},
	{
		"id": 34,
		"breed": "Appenzeller Sennenhund",
		"type": "dog"
	},
	{
		"id": 35,
		"breed": "Ariegeois",
		"type": "dog"
	},
	{
		"id": 36,
		"breed": "Australian Cattle Dog",
		"type": "dog"
	},
	{
		"id": 37,
		"breed": "Australian Kelpie",
		"type": "dog"
	},
	{
		"id": 38,
		"breed": "Australian Shepherd",
		"type": "dog"
	},
	{
		"id": 39,
		"breed": "Australian Silky Terrier",
		"type": "dog"
	},
	{
		"id": 40,
		"breed": "Australian Stumpy Tail Cattle Dog",
		"type": "dog"
	},
	{
		"id": 41,
		"breed": "Australian Terrier",
		"type": "dog"
	},
	{
		"id": 42,
		"breed": "Azawakh",
		"type": "dog"
	},
	{
		"id": 43,
		"breed": "Thai Bangkaew Dog",
		"type": "dog"
	},
	{
		"id": 44,
		"breed": "Barbet",
		"type": "dog"
	},
	{
		"id": 46,
		"breed": "Barzoi",
		"type": "dog"
	},
	{
		"id": 47,
		"breed": "Basenji",
		"type": "dog"
	},
	{
		"id": 48,
		"breed": "Norman Artesian Basset",
		"type": "dog"
	},
	{
		"id": 49,
		"breed": "Basset bleu de Gascogne",
		"type": "dog"
	},
	{
		"id": 50,
		"breed": "Basset Fauve de Bretagne",
		"type": "dog"
	},
	{
		"id": 51,
		"breed": "Basset Hound",
		"type": "dog"
	},
	{
		"id": 52,
		"breed": "Bavarian Mountain Hound",
		"type": "dog"
	},
	{
		"id": 53,
		"breed": "Beagle",
		"type": "dog"
	},
	{
		"id": 54,
		"breed": "Bearded Collie",
		"type": "dog"
	},
	{
		"id": 55,
		"breed": "Beauceron",
		"type": "dog"
	},
	{
		"id": 56,
		"breed": "Bedlington terrier",
		"type": "dog"
	},
	{
		"id": 57,
		"breed": "Griffon Belge",
		"type": "dog"
	},
	{
		"id": 58,
		"breed": "Bergamasco Shepherd",
		"type": "dog"
	},
	{
		"id": 59,
		"breed": "Berger Blanc Suisse",
		"type": "dog"
	},
	{
		"id": 60,
		"breed": "Berger Picard",
		"type": "dog"
	},
	{
		"id": 61,
		"breed": "Pyrenean Shepherd",
		"type": "dog"
	},
	{
		"id": 62,
		"breed": "Bernese Mountain Dog",
		"type": "dog"
	},
	{
		"id": 63,
		"breed": "Bichon Frise",
		"type": "dog"
	},
	{
		"id": 64,
		"breed": "Havanese",
		"type": "dog"
	},
	{
		"id": 65,
		"breed": "Billy",
		"type": "dog"
	},
	{
		"id": 66,
		"breed": "Black and Tan Coonhound",
		"type": "dog"
	},
	{
		"id": 67,
		"breed": "Black Russian Terrier",
		"type": "dog"
	},
	{
		"id": 68,
		"breed": "Blue Picardy Spaniel",
		"type": "dog"
	},
	{
		"id": 69,
		"breed": "Bluetick Coonhound",
		"type": "dog"
	},
	{
		"id": 70,
		"breed": "Boerboel",
		"type": "dog"
	},
	{
		"id": 72,
		"breed": "Bolognese",
		"type": "dog"
	},
	{
		"id": 73,
		"breed": "French Bolonka",
		"type": "dog"
	},
	{
		"id": 74,
		"breed": "Zwetna Bolonka",
		"type": "dog"
	},
	{
		"id": 75,
		"breed": "Border Collie",
		"type": "dog"
	},
	{
		"id": 76,
		"breed": "Border Terrier",
		"type": "dog"
	},
	{
		"id": 77,
		"breed": "Bosnian Coarse-haired Hound",
		"type": "dog"
	},
	{
		"id": 78,
		"breed": "Boston Terrier",
		"type": "dog"
	},
	{
		"id": 79,
		"breed": "Bouvier des Flandres",
		"type": "dog"
	},
	{
		"id": 80,
		"breed": "French Bulldog",
		"type": "dog"
	},
	{
		"id": 81,
		"breed": "Boykin Spaniel",
		"type": "dog"
	},
	{
		"id": 82,
		"breed": "Braque francais",
		"type": "dog"
	},
	{
		"id": 83,
		"breed": "Bracco Italiano",
		"type": "dog"
	},
	{
		"id": 84,
		"breed": "Austrian Black and Tan Hound",
		"type": "dog"
	},
	{
		"id": 85,
		"breed": "Braque d'Auvergne",
		"type": "dog"
	},
	{
		"id": 86,
		"breed": "Braque du Bourbonnais",
		"type": "dog"
	},
	{
		"id": 87,
		"breed": "Braque Saint-Germain",
		"type": "dog"
	},
	{
		"id": 88,
		"breed": "Briard",
		"type": "dog"
	},
	{
		"id": 89,
		"breed": "Briquet Griffon Vendéen",
		"type": "dog"
	},
	{
		"id": 90,
		"breed": "Broholmer",
		"type": "dog"
	},
	{
		"id": 92,
		"breed": "Bull Terrier",
		"type": "dog"
	},
	{
		"id": 93,
		"breed": "Bullmastiff",
		"type": "dog"
	},
	{
		"id": 94,
		"breed": "Ca de Bou",
		"type": "dog"
	},
	{
		"id": 95,
		"breed": "Majorca Shepherd Dog",
		"type": "dog"
	},
	{
		"id": 96,
		"breed": "Cairn Terrier",
		"type": "dog"
	},
	{
		"id": 98,
		"breed": "Canaan Dog",
		"type": "dog"
	},
	{
		"id": 99,
		"breed": "Canadian Eskimo Dog",
		"type": "dog"
	},
	{
		"id": 100,
		"breed": "Italian Mastiff",
		"type": "dog"
	},
	{
		"id": 101,
		"breed": "Maremma Sheepdog",
		"type": "dog"
	},
	{
		"id": 103,
		"breed": "Poodle",
		"type": "dog"
	},
	{
		"id": 104,
		"breed": "Portuguese Water Dog",
		"type": "dog"
	},
	{
		"id": 105,
		"breed": "Cão Fila de São Miguel",
		"type": "dog"
	},
	{
		"id": 107,
		"breed": "Mudhol Hound",
		"type": "dog"
	},
	{
		"id": 108,
		"breed": "Carolina Dog",
		"type": "dog"
	},
	{
		"id": 109,
		"breed": "Catahoula Leopard Dog",
		"type": "dog"
	},
	{
		"id": 110,
		"breed": "Catahoula Bulldog",
		"type": "dog"
	},
	{
		"id": 111,
		"breed": "Caucasian Shepherd Dog",
		"type": "dog"
	},
	{
		"id": 112,
		"breed": "Cavalier King Charles Spaniel",
		"type": "dog"
	},
	{
		"id": 113,
		"breed": "Central Asian Shepherd Dog",
		"type": "dog"
	},
	{
		"id": 114,
		"breed": "Cesky Fousek",
		"type": "dog"
	},
	{
		"id": 115,
		"breed": "Cesky Terrier",
		"type": "dog"
	},
	{
		"id": 117,
		"breed": "Czechoslovakian Wolfdog",
		"type": "dog"
	},
	{
		"id": 118,
		"breed": "Polish Greyhound",
		"type": "dog"
	},
	{
		"id": 119,
		"breed": "Chesapeake Bay Retriever",
		"type": "dog"
	},
	{
		"id": 120,
		"breed": "Great Pyrenees",
		"type": "dog"
	},
	{
		"id": 121,
		"breed": "Groenendael",
		"type": "dog"
	},
	{
		"id": 122,
		"breed": "Laekenois",
		"type": "dog"
	},
	{
		"id": 123,
		"breed": "Malinois",
		"type": "dog"
	},
	{
		"id": 124,
		"breed": "Tervuren",
		"type": "dog"
	},
	{
		"id": 125,
		"breed": "Estrela Mountain Dog",
		"type": "dog"
	},
	{
		"id": 126,
		"breed": "Cão de Castro Laboreiro",
		"type": "dog"
	},
	{
		"id": 127,
		"breed": "Bloodhound",
		"type": "dog"
	},
	{
		"id": 128,
		"breed": "Artois Hound",
		"type": "dog"
	},
	{
		"id": 129,
		"breed": "Chihuahua",
		"type": "dog"
	},
	{
		"id": 130,
		"breed": "Chinese Crested Dog",
		"type": "dog"
	},
	{
		"id": 131,
		"breed": "Chinook",
		"type": "dog"
	},
	{
		"id": 133,
		"breed": "Hortaya borzaya",
		"type": "dog"
	},
	{
		"id": 134,
		"breed": "Chow Chow",
		"type": "dog"
	},
	{
		"id": 135,
		"breed": "Carpathian Shepherd Dog",
		"type": "dog"
	},
	{
		"id": 136,
		"breed": "Bucovina Shepherd Dog",
		"type": "dog"
	},
	{
		"id": 137,
		"breed": "Romanian Mioritic Shepherd Dog",
		"type": "dog"
	},
	{
		"id": 138,
		"breed": "Cirneco dell'Etna",
		"type": "dog"
	},
	{
		"id": 139,
		"breed": "Clumber Spaniel",
		"type": "dog"
	},
	{
		"id": 140,
		"breed": "Anatolian Shepherd",
		"type": "dog"
	},
	{
		"id": 141,
		"breed": "Cockapoo",
		"type": "dog"
	},
	{
		"id": 142,
		"breed": "Papillon",
		"type": "dog"
	},
	{
		"id": 143,
		"breed": "Coton de Tuléar",
		"type": "dog"
	},
	{
		"id": 145,
		"breed": "Cursinu",
		"type": "dog"
	},
	{
		"id": 146,
		"breed": "Curly Coated Retriever",
		"type": "dog"
	},
	{
		"id": 147,
		"breed": "Dachshund",
		"type": "dog"
	},
	{
		"id": 148,
		"breed": "Dalmatian",
		"type": "dog"
	},
	{
		"id": 149,
		"breed": "Dandie Dinmont Terrier",
		"type": "dog"
	},
	{
		"id": 150,
		"breed": "Danish Swedish Farmdog",
		"type": "dog"
	},
	{
		"id": 151,
		"breed": "Scottish Deerhound",
		"type": "dog"
	},
	{
		"id": 152,
		"breed": "German Shorthaired Pointer",
		"type": "dog"
	},
	{
		"id": 153,
		"breed": "Boxer",
		"type": "dog"
	},
	{
		"id": 154,
		"breed": "Great Dane",
		"type": "dog"
	},
	{
		"id": 155,
		"breed": "German Longhaired Pointer",
		"type": "dog"
	},
	{
		"id": 156,
		"breed": "German Wirehaired Pointer",
		"type": "dog"
	},
	{
		"id": 157,
		"breed": "German Pinscher",
		"type": "dog"
	},
	{
		"id": 158,
		"breed": "German Spitz (Pomeranian)",
		"type": "dog"
	},
	{
		"id": 159,
		"breed": "German Spaniel",
		"type": "dog"
	},
	{
		"id": 160,
		"breed": "German Pointer",
		"type": "dog"
	},
	{
		"id": 161,
		"breed": "German Shepherd",
		"type": "dog"
	},
	{
		"id": 162,
		"breed": "German Wirehaired Pointer",
		"type": "dog"
	},
	{
		"id": 163,
		"breed": "Tibetan Mastiff",
		"type": "dog"
	},
	{
		"id": 164,
		"breed": "Doberman Pinscher",
		"type": "dog"
	},
	{
		"id": 165,
		"breed": "Dogo Argentino",
		"type": "dog"
	},
	{
		"id": 166,
		"breed": "Perro de Presa Canario",
		"type": "dog"
	},
	{
		"id": 167,
		"breed": "Dogue de Bordeaux",
		"type": "dog"
	},
	{
		"id": 168,
		"breed": "Drentse Patrijshond",
		"type": "dog"
	},
	{
		"id": 169,
		"breed": "Drever",
		"type": "dog"
	},
	{
		"id": 170,
		"breed": "Dunker",
		"type": "dog"
	},
	{
		"id": 171,
		"breed": "Elo",
		"type": "dog"
	},
	{
		"id": 172,
		"breed": "English Cocker Spaniel",
		"type": "dog"
	},
	{
		"id": 173,
		"breed": "American english coonhound",
		"type": "dog"
	},
	{
		"id": 174,
		"breed": "English Foxhound",
		"type": "dog"
	},
	{
		"id": 175,
		"breed": "English Springer Spaniel",
		"type": "dog"
	},
	{
		"id": 176,
		"breed": "Pointer",
		"type": "dog"
	},
	{
		"id": 177,
		"breed": "English Setter",
		"type": "dog"
	},
	{
		"id": 178,
		"breed": "English Toy Terrier",
		"type": "dog"
	},
	{
		"id": 179,
		"breed": "Entlebucher Mountain Dog",
		"type": "dog"
	},
	{
		"id": 180,
		"breed": "Brittany",
		"type": "dog"
	},
	{
		"id": 181,
		"breed": "French Spaniel",
		"type": "dog"
	},
	{
		"id": 182,
		"breed": "Picardy Spaniel",
		"type": "dog"
	},
	{
		"id": 183,
		"breed": "Pont-Audemer Spaniel",
		"type": "dog"
	},
	{
		"id": 184,
		"breed": "Transylvanian Hound",
		"type": "dog"
	},
	{
		"id": 185,
		"breed": "Eurasier",
		"type": "dog"
	},
	{
		"id": 186,
		"breed": "Fila Brasileiro",
		"type": "dog"
	},
	{
		"id": 187,
		"breed": "Flat Coated Retriever",
		"type": "dog"
	},
	{
		"id": 188,
		"breed": "Fox Terrier",
		"type": "dog"
	},
	{
		"id": 189,
		"breed": "Galgo Español",
		"type": "dog"
	},
	{
		"id": 190,
		"breed": "Old Danish Pointer",
		"type": "dog"
	},
	{
		"id": 191,
		"breed": "Glen of Imaal Terrier",
		"type": "dog"
	},
	{
		"id": 192,
		"breed": "Golden Retriever",
		"type": "dog"
	},
	{
		"id": 193,
		"breed": "Polish Hunting Dog",
		"type": "dog"
	},
	{
		"id": 194,
		"breed": "Gordon Setter",
		"type": "dog"
	},
	{
		"id": 195,
		"breed": "Catalan Sheepdog",
		"type": "dog"
	},
	{
		"id": 196,
		"breed": "Grand anglo-français tricolore",
		"type": "dog"
	},
	{
		"id": 197,
		"breed": "Grand anglo-français blanc et orange",
		"type": "dog"
	},
	{
		"id": 198,
		"breed": "Grand anglo-français blanc et noir",
		"type": "dog"
	},
	{
		"id": 199,
		"breed": "Grand Basset Griffon Vendéen",
		"type": "dog"
	},
	{
		"id": 200,
		"breed": "Grand Griffon Vendéen",
		"type": "dog"
	},
	{
		"id": 201,
		"breed": "Grand Bleu de Gascogne",
		"type": "dog"
	},
	{
		"id": 202,
		"breed": "Greenland Dog",
		"type": "dog"
	},
	{
		"id": 203,
		"breed": "Greyhound",
		"type": "dog"
	},
	{
		"id": 204,
		"breed": "Griffon Fauve de Bretagne",
		"type": "dog"
	},
	{
		"id": 205,
		"breed": "Griffon bleu de Gascogne",
		"type": "dog"
	},
	{
		"id": 206,
		"breed": "Wirehaired Pointing Griffon",
		"type": "dog"
	},
	{
		"id": 207,
		"breed": "Griffon Nivernais",
		"type": "dog"
	},
	{
		"id": 208,
		"breed": "Greater Swiss Mountain Dog",
		"type": "dog"
	},
	{
		"id": 209,
		"breed": "Halden Hound",
		"type": "dog"
	},
	{
		"id": 210,
		"breed": "Hamilton hound",
		"type": "dog"
	},
	{
		"id": 211,
		"breed": "Hanover Hound",
		"type": "dog"
	},
	{
		"id": 213,
		"breed": "Greek Harehound",
		"type": "dog"
	},
	{
		"id": 214,
		"breed": "Hokkaido",
		"type": "dog"
	},
	{
		"id": 215,
		"breed": "Dutch Shepherd",
		"type": "dog"
	},
	{
		"id": 216,
		"breed": "Dutch Smoushond",
		"type": "dog"
	},
	{
		"id": 217,
		"breed": "Hovawart",
		"type": "dog"
	},
	{
		"id": 218,
		"breed": "Croatian Sheepdog",
		"type": "dog"
	},
	{
		"id": 219,
		"breed": "South Russian Ovcharka",
		"type": "dog"
	},
	{
		"id": 220,
		"breed": "Huntaway",
		"type": "dog"
	},
	{
		"id": 222,
		"breed": "Irish Red and White Setter",
		"type": "dog"
	},
	{
		"id": 223,
		"breed": "Soft-coated Wheaten Terrier",
		"type": "dog"
	},
	{
		"id": 224,
		"breed": "Irish Terrier",
		"type": "dog"
	},
	{
		"id": 225,
		"breed": "Irish Water Spaniel",
		"type": "dog"
	},
	{
		"id": 226,
		"breed": "Irish wolfhound",
		"type": "dog"
	},
	{
		"id": 227,
		"breed": "Icelandic Sheepdog",
		"type": "dog"
	},
	{
		"id": 228,
		"breed": "Istrian Shorthaired Hound",
		"type": "dog"
	},
	{
		"id": 229,
		"breed": "Istrian Coarse-haired Hound",
		"type": "dog"
	},
	{
		"id": 230,
		"breed": "Jack Russell Terrier",
		"type": "dog"
	},
	{
		"id": 231,
		"breed": "Jagdterrier",
		"type": "dog"
	},
	{
		"id": 232,
		"breed": "Jämthund",
		"type": "dog"
	},
	{
		"id": 233,
		"breed": "Japanese Chin",
		"type": "dog"
	},
	{
		"id": 234,
		"breed": "Kai Ken",
		"type": "dog"
	},
	{
		"id": 235,
		"breed": "Karakachan",
		"type": "dog"
	},
	{
		"id": 236,
		"breed": "Karelian Bear Dog",
		"type": "dog"
	},
	{
		"id": 238,
		"breed": "Karst Shepherd",
		"type": "dog"
	},
	{
		"id": 239,
		"breed": "Kerry Blue Terrier",
		"type": "dog"
	},
	{
		"id": 240,
		"breed": "Kintamani",
		"type": "dog"
	},
	{
		"id": 241,
		"breed": "King Charles Spaniel",
		"type": "dog"
	},
	{
		"id": 242,
		"breed": "Kishu Inu",
		"type": "dog"
	},
	{
		"id": 243,
		"breed": "Komondor",
		"type": "dog"
	},
	{
		"id": 244,
		"breed": "Kooikerhondje",
		"type": "dog"
	},
	{
		"id": 245,
		"breed": "Korean Jindo",
		"type": "dog"
	},
	{
		"id": 247,
		"breed": "Kromfohrländer",
		"type": "dog"
	},
	{
		"id": 248,
		"breed": "Kuvasz",
		"type": "dog"
	},
	{
		"id": 249,
		"breed": "Kyi-Leo",
		"type": "dog"
	},
	{
		"id": 250,
		"breed": "Labradoodle",
		"type": "dog"
	},
	{
		"id": 251,
		"breed": "Labrador Retriever",
		"type": "dog"
	},
	{
		"id": 252,
		"breed": "Lagotto Romagnolo",
		"type": "dog"
	},
	{
		"id": 253,
		"breed": "Lakeland Terrier",
		"type": "dog"
	},
	{
		"id": 254,
		"breed": "Lancashire Heeler",
		"type": "dog"
	},
	{
		"id": 255,
		"breed": "Landseer",
		"type": "dog"
	},
	{
		"id": 256,
		"breed": "Lapponian Herder",
		"type": "dog"
	},
	{
		"id": 257,
		"breed": "Leonberger",
		"type": "dog"
	},
	{
		"id": 258,
		"breed": "Lhasa Apso",
		"type": "dog"
	},
	{
		"id": 259,
		"breed": "Lucas Terrier",
		"type": "dog"
	},
	{
		"id": 260,
		"breed": "Norwegian Lundehund",
		"type": "dog"
	},
	{
		"id": 262,
		"breed": "Lurcher",
		"type": "dog"
	},
	{
		"id": 263,
		"breed": "Maltese",
		"type": "dog"
	},
	{
		"id": 264,
		"breed": "Magyar agár",
		"type": "dog"
	},
	{
		"id": 265,
		"breed": "Vizsla",
		"type": "dog"
	},
	{
		"id": 266,
		"breed": "Manchester Terrier",
		"type": "dog"
	},
	{
		"id": 269,
		"breed": "English Mastiff",
		"type": "dog"
	},
	{
		"id": 270,
		"breed": "Pyrenean Mastiff",
		"type": "dog"
	},
	{
		"id": 271,
		"breed": "Spanish Mastiff",
		"type": "dog"
	},
	{
		"id": 272,
		"breed": "Tazi Hound",
		"type": "dog"
	},
	{
		"id": 273,
		"breed": "Miniature Australian Shepherd",
		"type": "dog"
	},
	{
		"id": 274,
		"breed": "Miniature Pinscher",
		"type": "dog"
	},
	{
		"id": 275,
		"breed": "Moscow Watchdog",
		"type": "dog"
	},
	{
		"id": 276,
		"breed": "Small Münsterländer",
		"type": "dog"
	},
	{
		"id": 277,
		"breed": "Mudi",
		"type": "dog"
	},
	{
		"id": 278,
		"breed": "Neapolitan Mastiff",
		"type": "dog"
	},
	{
		"id": 279,
		"breed": "Newfoundland",
		"type": "dog"
	},
	{
		"id": 280,
		"breed": "Japanese Spitz",
		"type": "dog"
	},
	{
		"id": 281,
		"breed": "Norrbottenspets",
		"type": "dog"
	},
	{
		"id": 282,
		"breed": "Norwegian Buhund",
		"type": "dog"
	},
	{
		"id": 283,
		"breed": "Norwegian Elkhound",
		"type": "dog"
	},
	{
		"id": 284,
		"breed": "Terrier Norfolk",
		"type": "dog"
	},
	{
		"id": 285,
		"breed": "Norwich Terrier",
		"type": "dog"
	},
	{
		"id": 286,
		"breed": "Nova Scotia Duck Tolling Retriever",
		"type": "dog"
	},
	{
		"id": 287,
		"breed": "Polish Hound",
		"type": "dog"
	},
	{
		"id": 288,
		"breed": "Old English sheepdog",
		"type": "dog"
	},
	{
		"id": 289,
		"breed": "Austrian Pinscher",
		"type": "dog"
	},
	{
		"id": 290,
		"breed": "Otterhound",
		"type": "dog"
	},
	{
		"id": 291,
		"breed": "Parson Russell Terrier",
		"type": "dog"
	},
	{
		"id": 293,
		"breed": "Patterdale Terrier",
		"type": "dog"
	},
	{
		"id": 294,
		"breed": "Italian Greyhound",
		"type": "dog"
	},
	{
		"id": 295,
		"breed": "Pekingese",
		"type": "dog"
	},
	{
		"id": 296,
		"breed": "Spanish Water Dog",
		"type": "dog"
	},
	{
		"id": 297,
		"breed": "Cimarrón Uruguayo",
		"type": "dog"
	},
	{
		"id": 298,
		"breed": "Basque Shepherd Dog",
		"type": "dog"
	},
	{
		"id": 299,
		"breed": "Peruvian Hairless Dog",
		"type": "dog"
	},
	{
		"id": 300,
		"breed": "Petit Basset Griffon Vendéen",
		"type": "dog"
	},
	{
		"id": 301,
		"breed": "Petit bleu de Gascogne",
		"type": "dog"
	},
	{
		"id": 302,
		"breed": "Löwchen",
		"type": "dog"
	},
	{
		"id": 303,
		"breed": "Pharaoh Hound",
		"type": "dog"
	},
	{
		"id": 304,
		"breed": "Plott Hound",
		"type": "dog"
	},
	{
		"id": 305,
		"breed": "Plummer Terrier",
		"type": "dog"
	},
	{
		"id": 306,
		"breed": "Andalusian Hound",
		"type": "dog"
	},
	{
		"id": 307,
		"breed": "Podenco Canario",
		"type": "dog"
	},
	{
		"id": 308,
		"breed": "Ibizan Hound",
		"type": "dog"
	},
	{
		"id": 309,
		"breed": "Portuguese Podengo",
		"type": "dog"
	},
	{
		"id": 310,
		"breed": "Poitevin",
		"type": "dog"
	},
	{
		"id": 311,
		"breed": "Polish Lowland Sheepdog",
		"type": "dog"
	},
	{
		"id": 312,
		"breed": "Polish Tatra Sheepdog",
		"type": "dog"
	},
	{
		"id": 313,
		"breed": "Porcelaine",
		"type": "dog"
	},
	{
		"id": 314,
		"breed": "Portuguese Pointer",
		"type": "dog"
	},
	{
		"id": 315,
		"breed": "Prague Ratter",
		"type": "dog"
	},
	{
		"id": 316,
		"breed": "Pudelpointer",
		"type": "dog"
	},
	{
		"id": 317,
		"breed": "Pug",
		"type": "dog"
	},
	{
		"id": 318,
		"breed": "Puli",
		"type": "dog"
	},
	{
		"id": 319,
		"breed": "Pumi",
		"type": "dog"
	},
	{
		"id": 320,
		"breed": "Rampur Greyhound",
		"type": "dog"
	},
	{
		"id": 321,
		"breed": "Rat Terrier",
		"type": "dog"
	},
	{
		"id": 322,
		"breed": "Rafeiro do Alentejo",
		"type": "dog"
	},
	{
		"id": 325,
		"breed": "Redbone Coonhound",
		"type": "dog"
	},
	{
		"id": 326,
		"breed": "Rhodesian Ridgeback",
		"type": "dog"
	},
	{
		"id": 327,
		"breed": "Rottweiler",
		"type": "dog"
	},
	{
		"id": 328,
		"breed": "Scotch Collie",
		"type": "dog"
	},
	{
		"id": 329,
		"breed": "Russian Spaniel",
		"type": "dog"
	},
	{
		"id": 330,
		"breed": "Russo-European Laika",
		"type": "dog"
	},
	{
		"id": 331,
		"breed": "Russkiy Toy",
		"type": "dog"
	},
	{
		"id": 332,
		"breed": "Saarloos wolfdog",
		"type": "dog"
	},
	{
		"id": 333,
		"breed": "Samoyed",
		"type": "dog"
	},
	{
		"id": 334,
		"breed": "Saluki",
		"type": "dog"
	},
	{
		"id": 335,
		"breed": "Sarplaninac",
		"type": "dog"
	},
	{
		"id": 336,
		"breed": "Schapendoes",
		"type": "dog"
	},
	{
		"id": 337,
		"breed": "Schiller Hound",
		"type": "dog"
	},
	{
		"id": 338,
		"breed": "Schipperke",
		"type": "dog"
	},
	{
		"id": 339,
		"breed": "Sealyham Terrier",
		"type": "dog"
	},
	{
		"id": 340,
		"breed": "Shetland Sheepdog",
		"type": "dog"
	},
	{
		"id": 341,
		"breed": "Scottish Terrier",
		"type": "dog"
	},
	{
		"id": 342,
		"breed": "Schnauzer",
		"type": "dog"
	},
	{
		"id": 343,
		"breed": "Italian short haired hound",
		"type": "dog"
	},
	{
		"id": 344,
		"breed": "Shar Pei",
		"type": "dog"
	},
	{
		"id": 345,
		"breed": "Shiba Inu",
		"type": "dog"
	},
	{
		"id": 346,
		"breed": "Shih-Poo",
		"type": "dog"
	},
	{
		"id": 347,
		"breed": "Shih Tzu",
		"type": "dog"
	},
	{
		"id": 348,
		"breed": "Shikoku",
		"type": "dog"
	},
	{
		"id": 349,
		"breed": "Shiloh Shepherd Dog",
		"type": "dog"
	},
	{
		"id": 350,
		"breed": "Siberian Husky",
		"type": "dog"
	},
	{
		"id": 351,
		"breed": "Silken Windhound",
		"type": "dog"
	},
	{
		"id": 352,
		"breed": "Skye Terrier",
		"type": "dog"
	},
	{
		"id": 353,
		"breed": "Slovakian Hound",
		"type": "dog"
	},
	{
		"id": 354,
		"breed": "Slovak Rough-haired Pointer",
		"type": "dog"
	},
	{
		"id": 355,
		"breed": "Slovak Cuvac",
		"type": "dog"
	},
	{
		"id": 356,
		"breed": "Spinone Italiano",
		"type": "dog"
	},
	{
		"id": 357,
		"breed": "Sloughi",
		"type": "dog"
	},
	{
		"id": 358,
		"breed": "Smaland Hound",
		"type": "dog"
	},
	{
		"id": 359,
		"breed": "Smooth Collie",
		"type": "dog"
	},
	{
		"id": 360,
		"breed": "Serbian Hound",
		"type": "dog"
	},
	{
		"id": 361,
		"breed": "Serbian Tricolour Hound",
		"type": "dog"
	},
	{
		"id": 362,
		"breed": "Stabyhoun",
		"type": "dog"
	},
	{
		"id": 363,
		"breed": "Staffordshire Bull Terrier",
		"type": "dog"
	},
	{
		"id": 364,
		"breed": "St. Bernard",
		"type": "dog"
	},
	{
		"id": 365,
		"breed": "Styrian Coarse-haired Hound",
		"type": "dog"
	},
	{
		"id": 366,
		"breed": "Finnish Hound",
		"type": "dog"
	},
	{
		"id": 367,
		"breed": "Finnish Lapphund",
		"type": "dog"
	},
	{
		"id": 368,
		"breed": "Finnish Spitz",
		"type": "dog"
	},
	{
		"id": 369,
		"breed": "Sussex Spaniel",
		"type": "dog"
	},
	{
		"id": 370,
		"breed": "Swedish Lapphund",
		"type": "dog"
	},
	{
		"id": 371,
		"breed": "Schweizer Laufhund",
		"type": "dog"
	},
	{
		"id": 372,
		"breed": "Small Swiss hound",
		"type": "dog"
	},
	{
		"id": 374,
		"breed": "Taigan",
		"type": "dog"
	},
	{
		"id": 375,
		"breed": "Taiwan Dog",
		"type": "dog"
	},
	{
		"id": 376,
		"breed": "Tamaskan Dog",
		"type": "dog"
	},
	{
		"id": 377,
		"breed": "Brazilian Terrier",
		"type": "dog"
	},
	{
		"id": 379,
		"breed": "Tibetan Spaniel",
		"type": "dog"
	},
	{
		"id": 380,
		"breed": "Croatian sheepdog",
		"type": "dog"
	},
	{
		"id": 381,
		"breed": "Tosa",
		"type": "dog"
	},
	{
		"id": 382,
		"breed": "Toy Manchester Terrier",
		"type": "dog"
	},
	{
		"id": 383,
		"breed": "Treeing Walker Coonhound",
		"type": "dog"
	},
	{
		"id": 384,
		"breed": "Thai Ridgeback",
		"type": "dog"
	},
	{
		"id": 385,
		"breed": "Tibetan Terrier",
		"type": "dog"
	},
	{
		"id": 386,
		"breed": "Tyrolean Hound",
		"type": "dog"
	},
	{
		"id": 387,
		"breed": "Swedish Vallhund",
		"type": "dog"
	},
	{
		"id": 389,
		"breed": "East Siberian Laika",
		"type": "dog"
	},
	{
		"id": 391,
		"breed": "Weimaraner",
		"type": "dog"
	},
	{
		"id": 392,
		"breed": "Cardigan Welsh Corgi",
		"type": "dog"
	},
	{
		"id": 393,
		"breed": "Pembroke Welsh Corgi",
		"type": "dog"
	},
	{
		"id": 394,
		"breed": "Welsh Springer Spaniel",
		"type": "dog"
	},
	{
		"id": 395,
		"breed": "Welsh terrier",
		"type": "dog"
	},
	{
		"id": 396,
		"breed": "West Highland White Terrier",
		"type": "dog"
	},
	{
		"id": 398,
		"breed": "Westphalian Dachsbracke",
		"type": "dog"
	},
	{
		"id": 399,
		"breed": "Wetterhoun",
		"type": "dog"
	},
	{
		"id": 400,
		"breed": "Whippet",
		"type": "dog"
	},
	{
		"id": 401,
		"breed": "Abyssinian",
		"type": "cat"
	},
	{
		"id": 402,
		"breed": "American curl",
		"type": "cat"
	},
	{
		"id": 403,
		"breed": "American shorthair",
		"type": "cat"
	},
	{
		"id": 404,
		"breed": "American Wirehair",
		"type": "cat"
	},
	{
		"id": 405,
		"breed": "Anatoli",
		"type": "cat"
	},
	{
		"id": 406,
		"breed": "Turkish Angora",
		"type": "cat"
	},
	{
		"id": 407,
		"breed": "Asian",
		"type": "cat"
	},
	{
		"id": 408,
		"breed": "Australian mist",
		"type": "cat"
	},
	{
		"id": 409,
		"breed": "Balinese",
		"type": "cat"
	},
	{
		"id": 410,
		"breed": "Bengal",
		"type": "cat"
	},
	{
		"id": 411,
		"breed": "Russian Blue",
		"type": "cat"
	},
	{
		"id": 412,
		"breed": "American Bobtail",
		"type": "cat"
	},
	{
		"id": 413,
		"breed": "Japanese Bobtail",
		"type": "cat"
	},
	{
		"id": 414,
		"breed": "Bombay",
		"type": "cat"
	},
	{
		"id": 415,
		"breed": "Brazilian shorthair",
		"type": "cat"
	},
	{
		"id": 416,
		"breed": "British longhair",
		"type": "cat"
	},
	{
		"id": 417,
		"breed": "British shorthair",
		"type": "cat"
	},
	{
		"id": 419,
		"breed": "Burmilla",
		"type": "cat"
	},
	{
		"id": 420,
		"breed": "Californian rex",
		"type": "cat"
	},
	{
		"id": 421,
		"breed": "Californian Spangled",
		"type": "cat"
	},
	{
		"id": 422,
		"breed": "European Shorthair",
		"type": "cat"
	},
	{
		"id": 423,
		"breed": "Ceylan",
		"type": "cat"
	},
	{
		"id": 424,
		"breed": "Chartreux",
		"type": "cat"
	},
	{
		"id": 425,
		"breed": "Chantilly-Tiffany",
		"type": "cat"
	},
	{
		"id": 426,
		"breed": "Chausie",
		"type": "cat"
	},
	{
		"id": 427,
		"breed": "Colorpoint",
		"type": "cat"
	},
	{
		"id": 428,
		"breed": "Colorpoint shorthair",
		"type": "cat"
	},
	{
		"id": 429,
		"breed": "Cornish rex",
		"type": "cat"
	},
	{
		"id": 430,
		"breed": "Cymric",
		"type": "cat"
	},
	{
		"id": 431,
		"breed": "Devon rex",
		"type": "cat"
	},
	{
		"id": 432,
		"breed": "Donskoy",
		"type": "cat"
	},
	{
		"id": 433,
		"breed": "European Shorthair",
		"type": "cat"
	},
	{
		"id": 434,
		"breed": "Exotic shorthair",
		"type": "cat"
	},
	{
		"id": 435,
		"breed": "German rex",
		"type": "cat"
	},
	{
		"id": 436,
		"breed": "Domestic short-haired cat",
		"type": "cat"
	},
	{
		"id": 437,
		"breed": "Havana brown",
		"type": "cat"
	},
	{
		"id": 438,
		"breed": "Highlander",
		"type": "cat"
	},
	{
		"id": 439,
		"breed": "Scottish Fold",
		"type": "cat"
	},
	{
		"id": 440,
		"breed": "Himalayan",
		"type": "cat"
	},
	{
		"id": 442,
		"breed": "Khao manee",
		"type": "cat"
	},
	{
		"id": 443,
		"breed": "Korat",
		"type": "cat"
	},
	{
		"id": 444,
		"breed": "Kurilian Bobtail",
		"type": "cat"
	},
	{
		"id": 445,
		"breed": "LaPerm",
		"type": "cat"
	},
	{
		"id": 447,
		"breed": "Maine Coon",
		"type": "cat"
	},
	{
		"id": 448,
		"breed": "Oriental Longhair",
		"type": "cat"
	},
	{
		"id": 449,
		"breed": "Manx",
		"type": "cat"
	},
	{
		"id": 450,
		"breed": "Arabian Mau",
		"type": "cat"
	},
	{
		"id": 451,
		"breed": "Egyptian Mau",
		"type": "cat"
	},
	{
		"id": 452,
		"breed": "Minskin",
		"type": "cat"
	},
	{
		"id": 453,
		"breed": "Munchkin",
		"type": "cat"
	},
	{
		"id": 454,
		"breed": "Nebelung",
		"type": "cat"
	},
	{
		"id": 455,
		"breed": "Norwegian",
		"type": "cat"
	},
	{
		"id": 456,
		"breed": "Ocicat",
		"type": "cat"
	},
	{
		"id": 457,
		"breed": "Ojos azules",
		"type": "cat"
	},
	{
		"id": 458,
		"breed": "Oriental",
		"type": "cat"
	},
	{
		"id": 460,
		"breed": "Persian",
		"type": "cat"
	},
	{
		"id": 461,
		"breed": "Peterbald",
		"type": "cat"
	},
	{
		"id": 462,
		"breed": "Pixie-bob",
		"type": "cat"
	},
	{
		"id": 463,
		"breed": "Ragamuffin",
		"type": "cat"
	},
	{
		"id": 464,
		"breed": "Ragdoll",
		"type": "cat"
	},
	{
		"id": 465,
		"breed": "Birman",
		"type": "cat"
	},
	{
		"id": 466,
		"breed": "Safari",
		"type": "cat"
	},
	{
		"id": 467,
		"breed": "Savannah",
		"type": "cat"
	},
	{
		"id": 468,
		"breed": "Scottish fold",
		"type": "cat"
	},
	{
		"id": 469,
		"breed": "Selkirk rex",
		"type": "cat"
	},
	{
		"id": 470,
		"breed": "Serengeti",
		"type": "cat"
	},
	{
		"id": 471,
		"breed": "Seychellois",
		"type": "cat"
	},
	{
		"id": 472,
		"breed": "Siamese",
		"type": "cat"
	},
	{
		"id": 473,
		"breed": "Siberian",
		"type": "cat"
	},
	{
		"id": 474,
		"breed": "Singapura",
		"type": "cat"
	},
	{
		"id": 475,
		"breed": "Skookum",
		"type": "cat"
	},
	{
		"id": 476,
		"breed": "Snowshoe",
		"type": "cat"
	},
	{
		"id": 477,
		"breed": "Sokoke",
		"type": "cat"
	},
	{
		"id": 478,
		"breed": "Somali",
		"type": "cat"
	},
	{
		"id": 479,
		"breed": "Sphynx",
		"type": "cat"
	},
	{
		"id": 481,
		"breed": "Toyger",
		"type": "cat"
	},
	{
		"id": 482,
		"breed": "Turkish Van",
		"type": "cat"
	},
	{
		"id": 483,
		"breed": "Ural rex",
		"type": "cat"
	},
	{
		"id": 484,
		"breed": "York chocolate",
		"type": "cat"
	},
	{
		"id": 485,
		"breed": "Zebra finch",
		"type": "bird"
	},
	{
		"id": 486,
		"breed": "Goose",
		"type": "bird"
	},
	{
		"id": 487,
		"breed": "Swan",
		"type": "bird"
	},
	{
		"id": 488,
		"breed": "Duck",
		"type": "bird"
	},
	{
		"id": 489,
		"breed": "Peacock",
		"type": "bird"
	},
	{
		"id": 490,
		"breed": "Guineafowl",
		"type": "bird"
	},
	{
		"id": 491,
		"breed": "Turkey",
		"type": "bird"
	},
	{
		"id": 492,
		"breed": "Pigeon",
		"type": "bird"
	},
	{
		"id": 493,
		"breed": "Barbary dove",
		"type": "bird"
	},
	{
		"id": 494,
		"breed": "Dove",
		"type": "bird"
	},
	{
		"id": 495,
		"breed": "Parakeet",
		"type": "bird"
	},
	{
		"id": 496,
		"breed": "Lovebird",
		"type": "bird"
	},
	{
		"id": 497,
		"breed": "Canary",
		"type": "bird"
	},
	{
		"id": 499,
		"breed": "Indian silverbill",
		"type": "bird"
	},
	{
		"id": 500,
		"breed": "African silverbill",
		"type": "bird"
	},
	{
		"id": 501,
		"breed": "Padda (Calfat)",
		"type": "bird"
	},
	{
		"id": 502,
		"breed": "Cou-Coupé (Amadina fasciata)",
		"type": "bird"
	},
	{
		"id": 503,
		"breed": "Sparrow",
		"type": "bird"
	},
	{
		"id": 504,
		"breed": "Parrot",
		"type": "bird"
	},
	{
		"id": 505,
		"breed": "Hen",
		"type": "bird"
	},
	{
		"id": 506,
		"breed": "Cockatiel",
		"type": "bird"
	},
	{
		"id": 507,
		"breed": "Albino",
		"type": "horse"
	},
	{
		"id": 508,
		"breed": "Alter Real",
		"type": "horse"
	},
	{
		"id": 509,
		"breed": "Andalou",
		"type": "horse"
	},
	{
		"id": 510,
		"breed": "Anglo-Arab",
		"type": "horse"
	},
	{
		"id": 511,
		"breed": "Appaloosa",
		"type": "horse"
	},
	{
		"id": 512,
		"breed": "Arab horse",
		"type": "horse"
	},
	{
		"id": 513,
		"breed": "Shagya Arab",
		"type": "horse"
	},
	{
		"id": 514,
		"breed": "Ardennes",
		"type": "horse"
	},
	{
		"id": 515,
		"breed": "Azerbaidjan",
		"type": "horse"
	},
	{
		"id": 516,
		"breed": "Cleveland Bay",
		"type": "horse"
	},
	{
		"id": 517,
		"breed": "Beard",
		"type": "horse"
	},
	{
		"id": 518,
		"breed": "Bavarian",
		"type": "horse"
	},
	{
		"id": 520,
		"breed": "Boudienny",
		"type": "horse"
	},
	{
		"id": 521,
		"breed": "Boulonnais",
		"type": "horse"
	},
	{
		"id": 522,
		"breed": "Breton",
		"type": "horse"
	},
	{
		"id": 523,
		"breed": "BWP",
		"type": "horse"
	},
	{
		"id": 524,
		"breed": "Calabrese",
		"type": "horse"
	},
	{
		"id": 525,
		"breed": "Camargue",
		"type": "horse"
	},
	{
		"id": 526,
		"breed": "Saddle horse",
		"type": "horse"
	},
	{
		"id": 527,
		"breed": "Cart horse",
		"type": "horse"
	},
	{
		"id": 528,
		"breed": "Russian Don",
		"type": "horse"
	},
	{
		"id": 529,
		"breed": "Falabella",
		"type": "horse"
	},
	{
		"id": 530,
		"breed": "Horse-like",
		"type": "horse"
	},
	{
		"id": 531,
		"breed": "Clysdesdale",
		"type": "horse"
	},
	{
		"id": 532,
		"breed": "Normand Cob",
		"type": "horse"
	},
	{
		"id": 533,
		"breed": "Comtois",
		"type": "horse"
	},
	{
		"id": 534,
		"breed": "Connemara",
		"type": "horse"
	},
	{
		"id": 535,
		"breed": "Criollo",
		"type": "horse"
	},
	{
		"id": 536,
		"breed": "Curly",
		"type": "horse"
	},
	{
		"id": 538,
		"breed": "Danish warm-blooded",
		"type": "horse"
	},
	{
		"id": 539,
		"breed": "Dartmoor",
		"type": "horse"
	},
	{
		"id": 541,
		"breed": "Exmoor",
		"type": "horse"
	},
	{
		"id": 543,
		"breed": "Fell",
		"type": "horse"
	},
	{
		"id": 544,
		"breed": "Finnish Universal",
		"type": "horse"
	},
	{
		"id": 545,
		"breed": "Fjord",
		"type": "horse"
	},
	{
		"id": 546,
		"breed": "Freiberger",
		"type": "horse"
	},
	{
		"id": 548,
		"breed": "Frison",
		"type": "horse"
	},
	{
		"id": 552,
		"breed": "Gelderland",
		"type": "horse"
	},
	{
		"id": 554,
		"breed": "Gotland",
		"type": "horse"
	},
	{
		"id": 556,
		"breed": "Hack",
		"type": "horse"
	},
	{
		"id": 557,
		"breed": "Hackney",
		"type": "horse"
	},
	{
		"id": 558,
		"breed": "Haflinger",
		"type": "horse"
	},
	{
		"id": 559,
		"breed": "Hanovrien",
		"type": "horse"
	},
	{
		"id": 560,
		"breed": "Highland",
		"type": "horse"
	},
	{
		"id": 561,
		"breed": "Hispano-Arabic",
		"type": "horse"
	},
	{
		"id": 562,
		"breed": "KWPN",
		"type": "horse"
	},
	{
		"id": 563,
		"breed": "Holsteiner",
		"type": "horse"
	},
	{
		"id": 565,
		"breed": "Hunter",
		"type": "horse"
	},
	{
		"id": 566,
		"breed": "Icelandic",
		"type": "horse"
	},
	{
		"id": 574,
		"breed": "Konik",
		"type": "horse"
	},
	{
		"id": 576,
		"breed": "Lipizzan",
		"type": "horse"
	},
	{
		"id": 578,
		"breed": "Lusitanian",
		"type": "horse"
	},
	{
		"id": 580,
		"breed": "Mérens",
		"type": "horse"
	},
	{
		"id": 582,
		"breed": "Missouri Fox Trotter",
		"type": "horse"
	},
	{
		"id": 583,
		"breed": "Morgan",
		"type": "horse"
	},
	{
		"id": 586,
		"breed": "Mustang",
		"type": "horse"
	},
	{
		"id": 587,
		"breed": "New Forest",
		"type": "horse"
	},
	{
		"id": 592,
		"breed": "Oldenbourg",
		"type": "horse"
	},
	{
		"id": 593,
		"breed": "P.R.E",
		"type": "horse"
	},
	{
		"id": 595,
		"breed": "Percheron",
		"type": "horse"
	},
	{
		"id": 596,
		"breed": "Pinto",
		"type": "horse"
	},
	{
		"id": 598,
		"breed": "Pony",
		"type": "horse"
	},
	{
		"id": 599,
		"breed": "Pottok",
		"type": "horse"
	},
	{
		"id": 600,
		"breed": "Thoroughbred",
		"type": "horse"
	},
	{
		"id": 601,
		"breed": "Quarter Horse",
		"type": "horse"
	},
	{
		"id": 602,
		"breed": "Rocky Mountain Horse",
		"type": "horse"
	},
	{
		"id": 605,
		"breed": "Sanfratellano",
		"type": "horse"
	},
	{
		"id": 607,
		"breed": "Senne",
		"type": "horse"
	},
	{
		"id": 608,
		"breed": "Shetland",
		"type": "horse"
	},
	{
		"id": 609,
		"breed": "Shire",
		"type": "horse"
	},
	{
		"id": 614,
		"breed": "Tennessee Walking Horse",
		"type": "horse"
	},
	{
		"id": 616,
		"breed": "Tinker",
		"type": "horse"
	},
	{
		"id": 620,
		"breed": "Trakehner",
		"type": "horse"
	},
	{
		"id": 621,
		"breed": "Trotter",
		"type": "horse"
	},
	{
		"id": 623,
		"breed": "Welsh",
		"type": "horse"
	},
	{
		"id": 624,
		"breed": "Westphalien",
		"type": "horse"
	},
	{
		"id": 625,
		"breed": "Wielkopolski Wuertemberg",
		"type": "horse"
	},
	{
		"id": 627,
		"breed": "Donkey",
		"type": "other"
	},
	{
		"id": 630,
		"breed": "Billy goat",
		"type": "other"
	},
	{
		"id": 631,
		"breed": "Goat",
		"type": "other"
	},
	{
		"id": 632,
		"breed": "Pig",
		"type": "other"
	},
	{
		"id": 633,
		"breed": "Toad",
		"type": "other"
	},
	{
		"id": 634,
		"breed": "Snail",
		"type": "other"
	},
	{
		"id": 635,
		"breed": "Stone marten",
		"type": "other"
	},
	{
		"id": 636,
		"breed": "Ferret",
		"type": "other"
	},
	{
		"id": 637,
		"breed": "Frog",
		"type": "other"
	},
	{
		"id": 638,
		"breed": "Hedgehog",
		"type": "other"
	},
	{
		"id": 639,
		"breed": "Sheep",
		"type": "other"
	},
	{
		"id": 640,
		"breed": "Mule",
		"type": "other"
	},
	{
		"id": 641,
		"breed": "Tree frog",
		"type": "other"
	},
	{
		"id": 642,
		"breed": "Salamander",
		"type": "other"
	},
	{
		"id": 644,
		"breed": "Mole",
		"type": "other"
	},
	{
		"id": 645,
		"breed": "Newt",
		"type": "other"
	},
	{
		"id": 646,
		"breed": "Cow",
		"type": "other"
	},
	{
		"id": 708,
		"breed": "Capybara",
		"type": "rodent"
	},
	{
		"id": 711,
		"breed": "Chinchilla",
		"type": "rodent"
	},
	{
		"id": 712,
		"breed": "Guinea pig",
		"type": "rodent"
	},
	{
		"id": 737,
		"breed": "Squirrel",
		"type": "rodent"
	},
	{
		"id": 739,
		"breed": "Gerbil",
		"type": "rodent"
	},
	{
		"id": 740,
		"breed": "Hamster",
		"type": "rodent"
	},
	{
		"id": 741,
		"breed": "Rabbit",
		"type": "rodent"
	},
	{
		"id": 745,
		"breed": "Field mouse",
		"type": "rodent"
	},
	{
		"id": 746,
		"breed": "Octodon (Degu)",
		"type": "rodent"
	},
	{
		"id": 747,
		"breed": "Porc Epic",
		"type": "rodent"
	},
	{
		"id": 749,
		"breed": "Rat",
		"type": "rodent"
	},
	{
		"id": 750,
		"breed": "Mouse",
		"type": "rodent"
	},
	{
		"id": 751,
		"breed": "Other",
		"type": "rodent"
	},
	{
		"id": 752,
		"breed": "Other",
		"type": "dog"
	},
	{
		"id": 753,
		"breed": "Other",
		"type": "cat"
	},
	{
		"id": 755,
		"breed": "Other",
		"type": "bird"
	},
	{
		"id": 756,
		"breed": "Other",
		"type": "horse"
	},
	{
		"id": 757,
		"breed": "Other",
		"type": "other"
	},
	{
		"id": 758,
		"breed": "Phasmid",
		"type": "insect"
	},
	{
		"id": 759,
		"breed": "Arachnid",
		"type": "insect"
	},
	{
		"id": 760,
		"breed": "Scorpion",
		"type": "insect"
	},
	{
		"id": 761,
		"breed": "Ant",
		"type": "insect"
	},
	{
		"id": 763,
		"breed": "Cockroach",
		"type": "insect"
	},
	{
		"id": 764,
		"breed": "Earthworm",
		"type": "insect"
	},
	{
		"id": 765,
		"breed": "Locust",
		"type": "insect"
	},
	{
		"id": 766,
		"breed": "Grasshopper",
		"type": "insect"
	},
	{
		"id": 767,
		"breed": "Butterfly",
		"type": "insect"
	},
	{
		"id": 768,
		"breed": "Ladybug",
		"type": "insect"
	},
	{
		"id": 769,
		"breed": "Dragonfly",
		"type": "insect"
	},
	{
		"id": 770,
		"breed": "Pyrrhocore",
		"type": "insect"
	},
	{
		"id": 771,
		"breed": "Bee",
		"type": "insect"
	},
	{
		"id": 772,
		"breed": "Other",
		"type": "insect"
	},
	{
		"id": 780,
		"breed": "Discus",
		"type": "fish"
	},
	{
		"id": 785,
		"breed": "Ancistrinae",
		"type": "fish"
	},
	{
		"id": 790,
		"breed": "Astronotus Ocellatus",
		"type": "fish"
	},
	{
		"id": 805,
		"breed": "Lion head",
		"type": "fish"
	},
	{
		"id": 806,
		"breed": "Oranda",
		"type": "fish"
	},
	{
		"id": 808,
		"breed": "China Sails",
		"type": "fish"
	},
	{
		"id": 809,
		"breed": "Telescopes",
		"type": "fish"
	},
	{
		"id": 810,
		"breed": "Ryukin Calico",
		"type": "fish"
	},
	{
		"id": 825,
		"breed": "Acanthophthalmus",
		"type": "fish"
	},
	{
		"id": 826,
		"breed": "Lined sole",
		"type": "fish"
	},
	{
		"id": 829,
		"breed": "Calamoichthys",
		"type": "fish"
	},
	{
		"id": 844,
		"breed": "Betta Splenders",
		"type": "fish"
	},
	{
		"id": 847,
		"breed": "Guppys",
		"type": "fish"
	},
	{
		"id": 861,
		"breed": "Platy",
		"type": "fish"
	},
	{
		"id": 904,
		"breed": "Alectis",
		"type": "fish"
	},
	{
		"id": 964,
		"breed": "Acanthurus",
		"type": "fish"
	},
	{
		"id": 977,
		"breed": "Other",
		"type": "fish"
	},
	{
		"id": 978,
		"breed": "Yorkshire Terrier",
		"type": "dog"
	},
	{
		"id": 979,
		"breed": "English Bulldog",
		"type": "dog"
	},
	{
		"id": 980,
		"breed": "Belgian Sheperd",
		"type": "dog"
	},
	{
		"id": 981,
		"breed": "Tonkinese",
		"type": "cat"
	},
	{
		"id": 982,
		"breed": "Thai",
		"type": "cat"
	},
	{
		"id": 983,
		"breed": "American Burmese",
		"type": "cat"
	},
	{
		"id": 984,
		"breed": "English Burmese",
		"type": "cat"
	},
	{
		"id": 985,
		"breed": "Gold fish",
		"type": "fish"
	},
	{
		"id": 986,
		"breed": "Petit Brabancon",
		"type": "dog"
	},
	{
		"id": 987,
		"breed": "Yakutian Laika",
		"type": "dog"
	},
	{
		"id": 988,
		"breed": "Miniature American Shepherd",
		"type": "dog"
	},
	{
		"id": 990,
		"breed": "Pomsky",
		"type": "dog"
	}
];

const pets = [
	{
		"id": 1,
		"type": "dog"
	},
	{
		"id": 2,
		"type": "cat"
	},
	{
		"id": 6,
		"type": "reptile"
	},
	{
		"id": 7,
		"type": "fish"
	},
	{
		"id": 8,
		"type": "bird"
	},
	{
		"id": 9,
		"type": "rodent"
	},
	{
		"id": 10,
		"type": "horse"
	},
	{
		"id": 12,
		"type": "insect"
	},
	{
		"id": 13,
		"type": "other"
	}
]