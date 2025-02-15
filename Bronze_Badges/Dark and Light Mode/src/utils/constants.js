export const CHARACTER_RATING_TYPES = {
	Good: 'Good',
	Poor: 'Poor',
	Excellent: 'Excellent'
}

export const PERFORMANCE_RATING_TYPES = {
	Good: 'Good',
	Poor: 'Poor',
	Excellent: 'Excellent'
}

export const USER_CATEGORIES = {
	Student: 'Student',
	Professional: 'Professional',
	Artisan: 'Artisan'
};

export const HAMBURGER_MENU_ROUTES = [
	{ name: 'Home', route: '/dashboard' },
	{ name: 'Jobs', route: '/jobs' },
	// { name: 'Mentoring', route: '/dashboard' },
	// { name: 'Certifications', route: '/dashboard' },
	// { name: 'Networking', route: '/dashboard' },
	// { name: 'Events', route: '/dashboard' },
	// { name: 'Messages', route: '/dashboard' },
	// { name: 'Saved Items', route: '/dashaord' },
	// { name: 'Settings', route: '/dashboard' }
];

export const HOME_HAMBURGER_MENU_ROUTES = [
	'Home',
	'Jobs',
	'Mentoring',
	'Certifications',
	'Networking',
	'Events',
	'Post a Job'
];

export const IDENTIFICATION_TYPES = {
	workId: 'Work ID Card',
	driverlicence: 'Drivers Licence',
	passport: 'International Passport',
	voters: 'Voters Card',
	national: 'National ID Card'
};

export const UNIVERSITY_CLASS_OF_DEGREE = {
	'First Class': 'First Class',
	'Second Class Upper': 'Second Class Upper',
	'Second Class Lower': 'Second Class Lower',
	'Third Class': 'Third Class',
	"Pass": "Pass"
};

export const POLYTECHNIC_CLASS_OF_DEGREE = {
	distinction: 'Distinction',
	'Upper Credit': 'Upper Credit',
	'Lower Credit': 'Lower Credit',
	pass: 'Pass',
};

export const JOB_TYPE = {
	"Full Time": 'Full Time',
	"Part Time": 'Part Time',
	"Internship": 'Internship',
};

export const SALARY_RANGE = {
	"Below 20,000(NGN)": 'Below 20,000(NGN)',
	"20,000 - 80,000(NGN)": '20,000 - 80,000(NGN)',
	"80,000 - 120,000(NGN)": '80,000 - 120,000(NGN)',
	"120,000 - 150,000(NGN)": '120,000 - 150,000(NGN)',
	"150,000 - 180,000(NGN)": '150,000 - 180,000(NGN)',
	"180,000 - 220,000(NGN)": '180,000 - 220,000(NGN)',
	"220,000 - 250,000(NGN)": '220,000 - 250,000(NGN)',
	"250,000 - 300,000(NGN)": '250,000 - 300,000(NGN)',
	"300,000 - 400,000(NGN)": '300,000 - 400,000(NGN)',
	"400,000 - 500,000(NGN)": '400,000 - 500,000(NGN)',
	"500,000 - 700,000(NGN)": '500,000 - 700,000(NGN)',
	"700,000 - 1M(NGN)": '700,000 - 1M(NGN)',
	"1M and above": '1M and above',
};

export const INSTITUTION_CATEGORY = {
	uni: 'University',
	poly: 'Polytechnic',
	col: 'College',
	pri: 'Primary',
	sec: 'Secondary'
};

// export const CAREER_LEVEL = {
// 	Entry: 'Entry Level',
// 	Experienced: 'Experienced Officer',
// 	senior: 'Senior Experienced Officer',
// 	Manager: 'Manager',
// 	Senior Management": 'Senior Management',
// 	"Executive": 'Executive'
// };
export const CAREER_LEVEL = {
	'Entry Level': 'Entry Level',
	'Experienced Officer': 'Experienced Officer',
	'Senior Experienced Officer': 'Senior Experienced Officer',
	'Senior Management': 'Senior Management',
	'Manager': 'Manager',
	'Executive': 'Executive'
};

export const CAREER_LEVEL_AUTO_COMPLETE = [
	{ label: 'All',
		value: 'All',
	},
	{ 
		label: 'Entry',
		value: 'Entry',
	},
	{ 
		label: 'Experienced',
		value: 'Experienced' },
	{ 
		label: 'Senior Officer',
		value: 'Senior Officer' },
	{ 
		label: 'Senior Management',
		value: 'Senior Management' },
	{ 
		label: 'Manager',
		value: 'Manager' },
	{ 
		label: 'Executive',
		value: 'Executive' },
];

export const INDUSTRIES_AUTO_COMPLETE = [
	{ label: 'All',
		value: 'All'
	},
	{ 
		label: 'Accounting',
		value: 'Accounting' 
	},
	{ 
		label: 'Advertising/Public Relations',
		value: 'Advertising/Public Relations' 
	},
	{ 
		label: 'Agriculture',
		value: 'Agriculture' 
	},
	{ 
		label: 'Air Transport',
		value: 'Air Transport' 
	},
	{ 
		label: 'Alcoholic Beverages',
		value: 'Alcoholic Beverages' 
	},
	{ 
		label: 'Alternative Energy Production & Services',
		value: 'Alternative Energy Production & Services' 
	},
	{ 
		label: 'Architectural Services',
		value: 'Architectural Services' 
	},
	{ 
		label: 'Legal',
		value: 'Legal' 
	},
	{ 
		label: 'Automotive',
		value: 'Automotive' 
	},
	{ 
		label: 'Banking',
		value: 'Banking' 
	},
	{ 
		label: 'Bars & Restaurants',
		value: 'Bars & Restaurants' 
	},
	{ 
		label: 'Beer, Wine & Liquor',
		value: 'Beer, Wine & Liquor' 
	},
	{ 
		label: 'Books, Magazines & Newspapers',
		value: 'Books, Magazines & Newspapers' 
	},
	{ 
		label: 'Bcasters, Radio/TV',
		value: 'Bcasters, Radio/TV' 
	},
	{ 
		label: 'Building',
		value: 'Building' 
	},
	{ 
		label: 'Cable & Satellite TV Production & Distribution',
		value: 'Cable & Satellite TV Production & Distribution' 
	},
	{ 
		label: 'Car Dealers',
		value: 'Car Dealers' 
	},
	{ 
		label: 'Auto Manufacturers',
		value: 'Auto Manufacturers' 
	},
	{ 
		label: 'Casinos / Gambling',
		value: 'Casinos / Gambling' 
	},
	{ 
		label: 'Chemical & Related Manufacturing',
		value: 'Chemical & Related Manufacturing' 
	},
	{ 
		label: 'Civil Servants/Public Officials',
		value: 'Civil Servants/Public Officials' 
	},
	{ 
		label: 'Clergy & Religious Organizations',
		value: 'Clergy & Religious Organizations' 
	},
	{ 
		label: 'Clothing Manufacturing',
		value: 'Clothing Manufacturing' 
	},
	{ 
		label: 'Mining',
		value: 'Mining' 
	},
	{ 
		label: 'Colleges, Universities & Schools',
		value: 'Colleges, Universities & Schools' 
	},
	{ 
		label: 'Computer Software',
		value: 'Computer Software' 
	},
	{ 
		label: 'Construction',
		value: 'Construction' 
	},
	{ 
		label: 'Credit Unions',
		value: 'Credit Unions' 
	},
	{ 
		label: 'Defense and Security',
		value: 'Defense and Security' 
	},
	{ 
		label: 'Medicals and Health',
		value: 'Medicals and Health' 
	},
	{ 
		label: 'Drug Manufacturers',
		value: 'Drug Manufacturers' 
	},
	{ 
		label: 'Education',
		value: 'Education' 
	},
	{ 
		label: 'Energy & Natural Resources',
		value: 'Energy & Natural Resources' 
	},
	{ 
		label: 'Entertainment',
		value: 'Entertainment' 
	},
	{ 
		label: 'Environment',
		value: 'Environment' 
	},
	{ 
		label: 'Finance',
		value: 'Finance' 
	},
	{ 
		label: 'Real E',
		value: 'Real E' 
	},
	{ 
		label: 'Insurance',
		value: 'Insurance' 
	},
	{ 
		label: 'Information Technology',
		value: 'Information Technology' 
	},
	{ 
		label: 'Food & Beverage',
		value: 'Food & Beverage' 
	},
	{ 
		label: 'Funeral Services',
		value: 'Funeral Services' 
	},
	{ 
		label: 'Waste Management',
		value: 'Waste Management' 
	},
	{ 
		label: 'General Contractors',
		value: 'General Contractors' 
	},
	{ 
		label: 'HMOs & Health Care Services',
		value: 'HMOs & Health Care Services' 
	},
	{ 
		label: 'Hotels, Motels & Tourism',
		value: 'Hotels, Motels & Tourism' 
	},
	{ 
		label: 'Human Rights',
		value: 'Human Rights' 
	},
	{ 
		label: 'Industrial Unions',
		value: 'Industrial Unions' 
	},
	{ 
		label: 'Internet',
		value: 'Internet' 
	},
	{ 
		label: 'Israel Policy',
		value: 'Israel Policy' 
	},
	{ 
		label: 'Labor',
		value: 'Labor' 
	},
	{ 
		label: 'Liquor, Wine & Beer',
		value: 'Liquor, Wine & Beer' 
	},
	{ 
		label: 'Lodging / Tourism',
		value: 'Lodging / Tourism' 
	},
	{ 
		label: 'Logging, Timber & Paper Mills',
		value: 'Logging, Timber & Paper Mills' 
	},
	{ 
		label: 'Manufacturing',
		value: 'Manufacturing' 
	},
	{ 
		label: 'Marine Transport',
		value: 'Marine Transport' 
	},
	{ 
		label: 'Medical Supplies',
		value: 'Medical Supplies' 
	},
	{ 
		label: 'Mortgage Bankers & Brokers',
		value: 'Mortgage Bankers & Brokers' 
	},
	{ 
		label: 'Motion Picture Production & Distribution',
		value: 'Motion Picture Production & Distribution' 
	},
	{ 
		label: 'Music Production',
		value: 'Music Production' 
	},
	{ 
		label: 'Natural Gas Pipelines',
		value: 'Natural Gas Pipelines' 
	},
	{ 
		label: 'Newspaper, Magazine & Book Publishing',
		value: 'Newspaper, Magazine & Book Publishing' 
	},
	{ 
		label: 'Non-profits, Foundations & Philanthropists',
		value: 'Non-profits, Foundations & Philanthropists' 
	},
	{ 
		label: 'Nutritional & Dietary Supplements',
		value: 'Nutritional & Dietary Supplements' 
	},
	{ 
		label: 'Oil & Gas',
		value: 'Oil & Gas' 
	},
	{ 
		label: 'Pharmaceutical Manufacturing',
		value: 'Pharmaceutical Manufacturing' 
	},
	{ 
		label: 'Pharmaceuticals / Health Products',
		value: 'Pharmaceuticals / Health Products' 
	},
	{ 
		label: 'Power & Utilities',
		value: 'Power & Utilities' 
	},
	{ 
		label: 'Printing & Publishing',
		value: 'Printing & Publishing' 
	},
	{ 
		label: 'Religious Organizations',
		value: 'Religious Organizations' 
	},
	{ 
		label: 'Retail Sales',
		value: 'Retail Sales' 
	},
	{ 
		label: 'Software',
		value: 'Software' 
	},
	{ 
		label: 'Sports, Sports Arenas & Related Equipment & Services',
		value: 'Sports, Sports Arenas & Related Equipment & Services' 
	},
	{ 
		label: 'Telecommunication',
		value: 'Telecommunication' 
	},
	{ 
		label: 'Textiles',
		value: 'Textiles' 
	},
	{ 
		label: 'Transportation',
		value: 'Transportation' 
	},
	{ 
		label: 'Transportation Unions',
		value: 'Transportation Unions' 
	},
	{ 
		label: 'Universities, Colleges & Schools',
		value: 'Universities, Colleges & Schools' 
	},
	{ 
		label: 'Vegetables & Fruits',
		value: 'Vegetables & Fruits' 
	},
	{ 
		label: 'Venture Capital',
		value: 'Venture Capital'
	 }
];

export const INDUSTRIES_TYPES = {
	Accounting: 'Accounting',
	'Advertising/Public Relations': 'Advertising/Public Relations',
	Agriculture: 'Agriculture',
	'Air Transport': 'Air Transport',
	'Alcoholic Beverages': 'Alcoholic Beverages',
	'Alternative Energy Production & Services': 'Alternative Energy Production & Services',
	'Architectural Services': 'Architectural Services',
	Legal: 'Legal',
	Automotive: 'Automotive',
	Banking: 'Banking',
	'Bars & Restaurants': 'Bars & Restaurants',
	'Beer, Wine & Liquor': 'Beer, Wine & Liquor',
	'Books, Magazines & Newspapers': 'Books, Magazines & Newspapers',
	'Bcasters, Radio/TV': 'Bcasters, Radio/TV',
	Building: 'Building',
	'Cable & Satellite TV Production & Distribution': 'Cable & Satellite TV Production & Distribution',
	'Car Dealers': 'Car Dealers',
	'Auto Manufacturers': 'Auto Manufacturers',
	'Casinos / Gambling': 'Casinos / Gambling',
	'Chemical & Related Manufacturing': 'Chemical & Related Manufacturing',
	'Civil Servants/Public Officials': 'Civil Servants/Public Officials',
	'Clergy & Religious Organizations': 'Clergy & Religious Organizations',
	'Clothing Manufacturing': 'Clothing Manufacturing',
	Mining: 'Mining',
	'Colleges, Universities & Schools': 'Colleges, Universities & Schools',
	'Computer Software': 'Computer Software',
	Construction: 'Construction',
	'Credit Unions': 'Credit Unions',
	'Defense and Security': 'Defense and Security',
	'Medicals and Health': 'Medicals and Health',
	'Drug Manufacturers': 'Drug Manufacturers',
	Education: 'Education',
	'Energy & Natural Resources': 'Energy & Natural Resources',
	Entertainment: 'Entertainment',
	Environment: 'Environment',
	Finance: 'Finance',
	'Real E': 'Real E',
	Insurance: 'Insurance',
	'Food & Beverage': 'Food & Beverage',
	'Funeral Services': 'Funeral Services',
	'Waste Management': 'Waste Management',
	'General Contractors': 'General Contractors',
	'HMOs & Health Care Services': 'HMOs & Health Care Services',
	'Hotels, Motels & Tourism': 'Hotels, Motels & Tourism',
	'Human Rights': 'Human Rights',
	'Industrial Unions': 'Industrial Unions',
	Internet: 'Internet',
	'Israel Policy': 'Israel Policy',
	Labor: 'Labor',
	'Liquor, Wine & Beer': 'Liquor, Wine & Beer',
	'Lodging / Tourism': 'Lodging / Tourism',
	'Logging, Timber & Paper Mills': 'Logging, Timber & Paper Mills',
	Manufacturing: 'Manufacturing',
	'Marine Transport': 'Marine Transport',
	'Medical Supplies': 'Medical Supplies',
	'Mortgage Bankers & Brokers': 'Mortgage Bankers & Brokers',
	'Motion Picture Production & Distribution': 'Motion Picture Production & Distribution',
	'Music Production': 'Music Production',
	'Natural Gas Pipelines': 'Natural Gas Pipelines',
	'Newspaper, Magazine & Book Publishing': 'Newspaper, Magazine & Book Publishing',
	'Non-profits, Foundations & Philanthropists': 'Non-profits, Foundations & Philanthropists',
	'Nutritional & Dietary Supplements': 'Nutritional & Dietary Supplements',
	'Oil & Gas': 'Oil & Gas',
	'Pharmaceutical Manufacturing': 'Pharmaceutical Manufacturing',
	'Pharmaceuticals / Health Products': 'Pharmaceuticals / Health Products',
	'Power & Utilities': 'Power & Utilities',
	'Printing & Publishing': 'Printing & Publishing',
	'Sports, Sports Arenas & Related Equipment & Services': 'Sports, Sports Arenas & Related Equipment & Services',
	'Religious Organizations': 'Religious Organizations',
	'Retail Sales': 'Retail Sales',
	Telecommunication: 'Telecommunication',
	Textiles: 'Textiles',
	Transportation: 'Transportation',
	'Transportation Unions': 'Transportation Unions',
	'Universities, Colleges & Schools': 'Universities, Colleges & Schools',
	'Vegetables & Fruits': 'Vegetables & Fruits',
	'Venture Capital': 'Venture Capital'
};

export const EMPLOYMENT_TYPES = {
	'full-time': 'full-time',
	'part-time': 'part-time',
	intern: 'internship'
};

export const PAGES = {
	BIODATA: 'biodata',
	EDUCATION: 'education',
	WORK: 'work',
	INTEREST: 'interest',
	REFERENCE: 'reference',
	PROFILE: 'profile'
};

export const INTEREST_TITLES = {
	sports: 'sports',
	musics: 'musics',
	movies: 'movies',
	travel: 'travel',
	arts: 'arts',
	fashion: 'fashion'
};

export const INTEREST_GENRES = {
	SPORTS: ['football', 'voleyball', 'basketball', 'tennis', 'Bowling'],
	MUSICS: ['Rap', 'Hip hop', 'R & B', 'Jazz', 'Rock'],
	MOVIES: [
		'Drama',
		'Action',
		'Crime',
		'Adventure',
		'Biography',
		'Mystery',
		'Animation',
		'Comedy',
		'Horror',
		'Western',
		'Sci-Fi',
		'Family',
		'Fantasy',
		'Romance',
		'Musical',
		'War',
		'Thriller',
		'Music',
		'Sport',
		'History'
	],
	TRAVEL: ['travel'],
	ARTS: ['arts'],
	FASHION: ['fashion']
};

export const DEGREE = {
	'Bachelors Degree': 'Bachelors Degree',
	Masters: 'Masters',
	PhD: 'PhD',
	HND: 'HND',
	OND: 'OND',
	Diploma: 'Diploma',
	SSCE: 'SSCE'
};

export const INSTITUTIONS_AUTO_COMPLETE = [
	{
		value: 'Federal University of Technology, Akure(FUTA)'
	},
	{
		value: 'Federal University of Technology, Minna(FUDM)'
	},
	{
		value: 'Federal University of Technology, Owerri(FUTO)'
	},
	{
		value: 'Afe Babalola University, Ado-Ekiti - Ekiti State(ABUAD)'
	},
	{
		value: 'American University of Nigeria, Yola(AUN)'
	},
	{
		value: 'Nigerian Defence Academy Kaduna(NDA)'
	},
	{
		value: 'Obafemi Awolowo University, Ile-Ife(OAU)'
	},
	{
		value: 'University of Abuja, Gwagwalada(UNIABUJA)'
	},
	{
		value: 'University of Benin(UNIBEN)'
	},
	{
		value: 'University of Calabar(UNICAL)'
	},
	{
		value: 'University of Ibadan(UI)'
	},
	{
		value: 'University of Ilorin(UNIILORIN)'
	},
	{
		value: 'University of Jos(UNIJOS)'
	},
	{
		value: 'University of Lagos(UNILAG)'
	},
	{
		value: 'University of Maiduguri'
	},
	{
		value: 'University of Nigeria, Nsukka(UNN)'
	},
	{
		value: 'University of Port-Harcourt(UNIPORT)'
	},
	{
		value: 'University of Uyo(UNIUYO)'
	},
	{
		value: 'Landmark University, Omu-Aran.'
	},
	{
		value: 'Nile University of Nigeria, Abuja'
	},
	{
		value: 'Abubakar Tafawa Balewa University, Bauchi(ATBU)'
	},
	{
		value: 'Bayero University, Kano(BUK)'
	},
	{
		value: 'Federal University Gashua, Yobe'
	},
	{
		value: 'Federal University, Dutsin-Ma, Katsina(FUDM)'
	},
	{
		value: 'Bells University of Technology, Otta'
	},
	{
		value: 'Benson Idahosa University, Benin City'
	},
	{
		value: 'Adekunle Ajasin University, Akungba(AAUA)'
	},
	{
		value: 'Ambrose Alli University, Ekpoma'
	},
	{
		value: 'Federal University of Agriculture, Abeokuta(FUNAAB)'
	},
	{
		value: 'Delta State University Abraka(DELSU)'
	},
	{
		value: 'Ekiti State University(EKSU)'
	},
	{
		value: 'Kwara State University, Ilorin(KWASU)'
	},
	{
		value: 'Ladoke Akintola University of Technology, Ogbomoso(LAUTECH)'
	},
	{
		value: 'Olabisi Onabanjo University, Ago Iwoye(OOU)'
	},
	{
		value: 'Lagos State University, Ojo(LASU)'
	},
	{
		value: 'Ibrahim Badamasi Babangida University, Lapai'
	},
	{
		value: 'Ignatius Ajuru University of Education,Rumuolumeni'
	},
	{
		value: 'Imo State University, Owerri'
	},
	{
		value: 'Sule Lamido University, Kafin Hausa, Jigawa'
	},
	{
		value: 'Kaduna State University, Kaduna'
	},
	{
		value: 'Kano University of Science & Technology, Wudil'
	},
	{
		value: 'Kebbi State University of Science and Technology, Aliero'
	},
	{
		value: 'Kogi State University Anyigba'
	},
	{
		value: 'Ondo State University of Science and Technology Okitipupa'
	},
	{
		value: 'River State University'
	},
	{
		value: 'Niger Delta University Yenagoa'
	},
	{
		value: 'Nasarawa State University Keffi'
	},
	{
		value: 'Plateau State University Bokkos'
	},
	{
		value: 'Tai Solarin University of Education Ijebu Ode(TASUED)'
	},
	{
		value: 'Umar Musa YarAdua University Katsina'
	},
	{
		value: 'Osun State University Osogbo'
	},
	{
		value: 'Taraba State University, Jalingo'
	},
	{
		value: 'Sokoto State University'
	},
	{
		value: 'Yusuf Maitama Sule University Kano'
	},
	{
		value: 'Oyo State Technical University Ibadan'
	},
	{
		value: 'Ondo State University of Medical Sciences(UNIMED)'
	},
	{
		value: 'Edo University Iyamo'
	},
	{
		value: 'Eastern Palm University Ogboko, Imo State'
	},
	{
		value: 'University of Africa Toru Orua, Bayelsa State'
	},
	{
		value: 'Bornu State University, Maiduguri'
	},
	{
		value: 'Moshood Abiola University of Science and Technology Abeokuta'
	},
	{
		value: 'Gombe State University of Science and Technology'
	},
	{
		value: 'Zamfara State University'
	},
	{
		value: 'Bayelsa Medical University'
	},
	{
		value: 'Elizade University, Ilara-Mokin'
	},
	{
		value: 'Joseph Ayo Babalola University, Ikeji-Arakeji(JABU)'
	},
	{
		value: 'Al-Hikmah University, Ilorin'
	},
	{
		value: 'Al-Qalam University, Katsina'
	},
	{
		value: 'Augustine University'
	},
	{
		value: 'Baze University'
	},
	{
		value: 'Bingham University, New Karu'
	},
	{
		value: 'Caritas University, Enugu'
	},
	{
		value: 'Chrisland University'
	},
	{
		value: 'Crawford University Igbesa'
	},
	{
		value: 'Crescent University'
	},
	{
		value: 'Edwin Clark University, Kaigbodo'
	},
	{
		value: 'Evangel University, Akaeze'
	},
	{
		value: 'Fountain Unveristy, Oshogbo'
	},
	{
		value: 'Godfrey Okoye University, Ugwuomu-Nike - Enugu State'
	},
	{
		value: 'Gregory University, Uturu'
	},
	{
		value: 'Hallmark University, Ijebi Itele, Ogun'
	},
	{
		value: 'Hezekiah University, Umudi'
	},
	{
		value: 'Kings University, Ode Omu'
	},
	{
		value: 'Kwararafa University, Wukari'
	},
	{
		value: 'Lead City University, Ibadan'
	},
	{
		value: 'Madonna University, Okija'
	},
	{
		value: 'Mcpherson University, Seriki Sotayo, Ajebo'
	},
	{
		value: 'Micheal & Cecilia Ibru University'
	},
	{
		value: 'Mountain Top University'
	},
	{
		value: 'Novena University, Ogume'
	},
	{
		value: 'Obong University, Obong Ntak'
	},
	{
		value: 'Oduduwa University, Ipetumodu - Osun State'
	},
	{
		value: 'Pan-Atlantic University, Lagos'
	},
	{
		value: 'Paul University, Awka - Anambra State'
	},
	{
		value: 'Renaissance University, Enugu'
	},
	{
		value: 'Rhema University, Obeama-Asa - Rivers State'
	},
	{
		value: 'Ritman University, Ikot Ekpene, Akwa Ibom'
	},
	{
		value: 'Salem University, Lokoja'
	},
	{
		value: 'Samuel Adegboyega University, Ogwa.'
	},
	{
		value: 'Southwestern University, Oku Owa'
	},
	{
		value: 'Summit University'
	},
	{
		value: 'Tansian University, Umunya'
	},
	{
		value: 'University of Mkar, Mkar'
	},
	{
		value: 'Akanu Ibiam Federal Polytechnic Unwana, Afikpo, Ebonyi'
	},
	{
		value: 'Auchi Polytechnic, Auchi, Edo'
	},
	{
		value: 'Federal Polytechnic Ado Ekiti, Ekiti'
	},
	{
		value: 'Federal Polytechnic Bali, Taraba'
	},
	{
		value: 'Federal Polytechnic Bauchi, Bauchi'
	},
	{
		value: 'Federal Polytechnic Bida, Niger'
	},
	{
		value: 'Federal Polytechnic Damaturu, Yobe'
	},
	{
		value: 'Federal Polytechnic Ede, Osun'
	},
	{
		value: 'Federal Polytechnic Ekowe, Bayelsa'
	},
	{
		value: 'Federal Polytechnic Idah, Kogi'
	},
	{
		value: 'Federal Polytechnic Ilaro, Ogun'
	},
	{
		value: 'Federal Polytechnic Ile-Oluji, Ondo'
	},
	{
		value: 'Federal Polytechnic Kaura Namoda, Zamfara'
	},
	{
		value: 'Federal Polytechnic Mubi, Adamawa'
	},
	{
		value: 'Federal Polytechnic Nasarawa, Nasarawa'
	},
	{
		value: 'Federal Polytechnic Nekede, Owerri, Imo'
	},
	{
		value: 'Federal Polytechnic Offa, Kwara'
	},
	{
		value: 'Federal Polytechnic Oko, Anambra'
	},
	{
		value: 'Federal Polytechnic of Oil and Gas Bonny, Rivers'
	},
	{
		value: 'Federal Polytechnic Ukana, Akwa Ibom'
	},
	{
		value: 'Hussaini Adamu Federal Polytechnic, Kazaure Jigawa'
	},
	{
		value: 'Kaduna Polytechnic, Kaduna'
	},
	{
		value: 'National Institute of Construction Technology Uromi'
	},
	{
		value: 'Waziri Umaru Federal Polytechnic, Birnin Kebbi'
	},
	{
		value: 'Yaba College of Technology, Yaba, Lagos'
	},
	{
		value: 'Airforce Institute of Technology (AFIT),NAF Base Kaduna'
	},
	{
		value: 'Petroleum Training Institute Effurun, Delta'
	},
	{
		value: 'Nigerian Army Institute of Technology and Environmental Science (NAITES) Makurdi'
	},
	{
		value: 'Abdu Gusau Polytechnic, Talata Mafara'
	},
	{
		value: 'Abia  Polytechnic, Aba'
	},
	{
		value: 'Abraham Adesanya Polytechnic,Ijebu Igbo'
	},
	{
		value: 'Abubakar Tatari Ali Polytechnic, Bauchi'
	},
	{
		value: 'Adamawa  Polytechnic, Yola'
	},
	{
		value: 'Akwa Ibom  College of Art & Science, Nung Ukim'
	},
	{
		value: 'Akwa Ibom  Polytechnic'
	},
	{
		value: 'Bayelsa  College of Arts and Science, Elebele'
	},
	{
		value: 'Benue  Polytechnic, Ugbokolo'
	},
	{
		value: 'Binyaminu Usman Polytechnic, Hadejia'
	},
	{
		value: 'Cross River  Institute of Technology And Management, Ugep'
	},
	{
		value: 'DS Adegbenro ICT Polytechnic, Itori-Ewekoro'
	},
	{
		value: 'Delta  Polytechnic, Ogwashi-Uku'
	},
	{
		value: 'Delta  Polytechnic, Otefe-Oghara'
	},
	{
		value: 'Delta  Polytechnic, Ozoro'
	},
	{
		value: 'Edo  Institute of Technology and Management, Usen'
	},
	{
		value: 'Gateway Polytechnic, Saapade Prof Wole Soyinka Way, Saapade E'
	},
	{
		value: 'Hassan Usman Katsina Polytechnic (HUK)'
	},
	{
		value: 'Ibarapa Polytechnic, Eruwa, Oyo'
	},
	{
		value: 'Imo  Polytechnic, Umuagwo, Ohaji, Imo'
	},
	{
		value: 'Institute of Management and Technology, Enugu'
	},
	{
		value: 'Jigawa  Polytechnic, Dutse'
	},
	{
		value: 'Kano  Polytechnic, Kano'
	},
	{
		value: 'Ken Sarowiwa Polytechnic, Bori'
	},
	{
		value: 'Kogi  Polytechnic, Lokoja'
	},
	{
		value: 'Kwara  Polytechnic, Ilorin'
	},
	{
		value: 'Lagos  Polytechnic, Ikorodu'
	},
	{
		value: 'Mai-Idris Alooma Polytechnic, Geidam'
	},
	{
		value: 'Nasarawa  Polytechnic'
	},
	{
		value: 'Niger  Polytechnic, Zungeru'
	},
	{
		value: 'Nuhu Bamalli Polytechnic, Zaria'
	},
	{
		value: 'Al-Hikma Polytechnic Karu'
	},
	{
		value: 'Allover Central Polytechnic, Sango Ota'
	},
	{
		value: 'Ajayi Polytechnic Ikere Ekiti, Ekiti'
	},
	{
		value: 'Ashi Polytechnic, Anyiin, Logo Local Government PMB 102098, Benue'
	},
	{
		value: 'Best Solution Polytechnic, Akure, Ondo'
	},
	{
		value: 'Bolmor Polytechnic, Ibadan, Oyo'
	},
	{
		value: 'Calvary Polytechnic, Owa-Oyibo, Delta'
	},
	{
		value: 'Citi Polytechnic, FCT Abuja'
	},
	{
		value: 'College of Technology, Iresi, Osun'
	},
	{
		value: 'Covenant Polytechnic, Aba, Abia'
	},
	{
		value: 'Crown Polytechnic, Ekiti'
	},
	{
		value: 'Dorben Polytechnic, Bwari, Abuja'
	},
	{
		value: 'Eastern Polytechnic, Port Harcourt, Rivers'
	},
	{
		value: 'Fidei Polytechnic, Gboko, Benue'
	},
	{
		value: 'Gboko Polytechnic, Gboko, Benue'
	},
	{
		value: 'Global Polytechnic, Akure, Ondo'
	},
	{
		value: 'Grace Polytechnic, Lagos'
	},
	{
		value: 'Heritage Polytechnic, Akwa Ibom'
	},
	{
		value: 'Ibadan City Polytechnic, Ibadan'
	},
	{
		value: 'Igbajo Polytechnic, Osun'
	},
	{
		value: 'Interlink Polytechnic, Ijebu-Jesa, Osun'
	},
	{
		value: 'Kalac Christal Polytechnic, Lekki, Lagos'
	},
	{
		value: 'Kings Polytechnic, Ubiaja, Edo'
	},
	{
		value: 'Landmark Polytechnic, Ogun'
	},
	{
		value: 'Lagos City Polytechnic, Ikeja, Lagos'
	},
	{
		value: 'Lens Polytechnic, Offa, Kawara'
	},
	{
		value: 'Lighthouse Polytechnic, Benin City, Edo'
	},
	{
		value: 'Marist Polytechnic, Umuchigbo, Iji-Nike, Emene, Enugu'
	},
	{
		value: 'Mater Dei Polytechnic'
	},
	{
		value: 'Nacabs Polytechnic, Akwanga, PMB 001 Akwanga, Nasarawa'
	},
	{
		value: 'Nogak Polytechnic, Ikom, Cross Rivers'
	},
	{
		value: 'Our Saviour Institute of Science, Agriculture & Technology, Enugu'
	},
	{
		value: 'Prime Polytechnic, Jida Bassa, Ajaokuta, Kogi'
	},
	{
		value: 'Redeemers College of Technology and Management (RECTEM), Ogun'
	},
	{
		value: 'Ronik Polytechnic, Lagos'
	},
	{
		value: 'Saf Polytechnic, Iseyin Oyo'
	},
	{
		value: 'Ahmadu Bello University, Zaria'
	},
	{
		value: 'Babcock University,Ilishan-Remo'
	},
	{
		value: 'Covenant University Ota'
	},
	{
		value: 'Federal University of Petroleum Resources, Effurun'
	},
	{
		value: 'Federal University, Dutse, Jigawa State'
	},
	{
		value: 'Federal University, Kashere, Gombe State'
	},
	{
		value: 'Federal University, Lafia, Nasarawa State'
	},
	{
		value: 'Federal University, Lokoja, Kogi State'
	},
	{
		value: 'Alex Ekwueme University, Ndufu-Alike, Ebonyi State'
	},
	{
		value: 'Federal University, Otuoke, Bayelsa'
	},
	{
		value: 'Federal University, Oye-Ekiti, Ekiti State'
	},
	{
		value: 'Federal University, Wukari, Taraba State'
	},
	{
		value: 'Federal University, Birnin Kebbi'
	},
	{
		value: 'Federal University, Gusau Zamfara'
	},
	{
		value: 'Bells University of Technology, Otta'
	},
	{
		value: 'Benson Idahosa University, Benin City'
	},
	{
		value: 'Adekunle Ajasin University, Akungba'
	},
	{
		value: 'Ambrose Alli University, Ekpoma'
	},
	{
		value: 'Cross River State University of  Technology, Calabar'
	},
	{
		value: 'Michael Okpara University of Agricultural Umudike'
	},
	{
		value: 'Nigeria Police Academy Wudil'
	},
	{
		value: 'Nnamdi Azikiwe University, Awka'
	},
	{
		value: 'University of Agriculture, Makurdi'
	},
	{
		value: 'Usumanu Danfodiyo University'
	},
	{
		value: 'Air Force Institute of Technology, Kaduna'
	},
	{
		value: 'Nigerian Army University Biu'
	},
	{
		value: 'Ebonyi State University, Abakaliki'
	},
	{
		value: 'Enugu State University of Science and Technology, Enugu'
	},
	{
		value: 'Igbinedion University Okada'
	},
	{
		value: 'Redeemers University, Ede'
	},
	{
		value: 'Achievers University, Owo'
	},
	{
		value: 'Adeleke University, Ede'
	},
	{
		value: 'African University of Science Technology, Abuja'
	},
	{
		value: 'Ajayi Crowther University, Ibadan'
	},
	{
		value: 'Bowen University, Iwo'
	},
	{
		value: 'Caleb University, Lagos'
	},
	{
		value: 'Abia State University, Uturu'
	},
	{
		value: 'Adamawa State University Mubi'
	},
	{
		value: 'Akwa Ibom State University, Ikot Akpaden'
	},
	{
		value: 'Chukwuemeka Odumegwu Ojukwu University, Uli'
	},
	{
		value: 'Bauchi State University, Gadau'
	},
	{
		value: 'Benue State University, Makurdi'
	},
	{
		value: 'Yobe State University, Damaturu'
	},
	{
		value: 'Modibbo Adama University of Technology, Yola'
	},
	{
		value: 'National Open University of Nigeria, Lagos'
	},
	{
		value: 'Nigerian Maritime University Okerenkoko, Delta State'
	},
	{
		value: 'Gombe State Univeristy, Gombe'
	},
	{
		value: 'Ibrahim Badamasi Babangida University, Lapai'
	},
	{
		value: 'Ignatius Ajuru University of Education,Rumuolumeni'
	},
	{
		value: 'Imo State University, Owerri'
	},
	{
		value: 'Sule Lamido University, Kafin Hausa, Jigawa'
	},
	{
		value: 'Kaduna State University, Kaduna'
	},
	{
		value: 'Kano University of Science & Technology, Wudil'
	},
	{
		value: 'Kebbi State University of Science and Technology, Aliero'
	},
	{
		value: 'Kogi State University Anyigba'
	},
	{
		value: 'Ondo State University of Science and Technology Okitipupa'
	},
	{
		value: 'River State University'
	},
	{
		value: 'Niger Delta University Yenagoa'
	},
	{
		value: 'Nasarawa State University Keffi'
	},
	{
		value: 'Plateau State University Bokkos'
	},
	{
		value: 'Tai Solarin University of Education Ijebu Ode'
	},
	{
		value: 'Umar Musa YarAdua University Katsina'
	},
	{
		value: 'Osun State University Osogbo'
	},
	{
		value: 'Taraba State University, Jalingo'
	},
	{
		value: 'Sokoto State University'
	},
	{
		value: 'Yusuf Maitama Sule University Kano'
	},
	{
		value: 'Oyo State Technical University Ibadan'
	},
	{
		value: 'Ondo State University of Medical Sciences'
	},
	{
		value: 'Edo University Iyamo'
	},
	{
		value: 'Eastern Palm University Ogboko, Imo State'
	},
	{
		value: 'University of Africa Toru Orua, Bayelsa State'
	},
	{
		value: 'Bornu State University, Maiduguri'
	},
	{
		value: 'Moshood Abiola University of Science and Technology Abeokuta'
	},
	{
		value: 'Gombe State University of Science and Technology'
	},
	{
		value: 'Zamfara State University'
	},
	{
		value: 'Bayelsa Medical University'
	},
	{
		value: 'Elizade University, Ilara-Mokin'
	},
	{
		value: 'Joseph Ayo Babalola University, Ikeji-Arakeji'
	},
	{
		value: 'Al-Hikmah University, Ilorin'
	},
	{
		value: 'Al-Qalam University, Katsina'
	},
	{
		value: 'Augustine University'
	},
	{
		value: 'Baze University'
	},
	{
		value: 'Bingham University, New Karu'
	},
	{
		value: 'Caritas University, Enugu'
	},
	{
		value: 'Chrisland University'
	},
	{
		value: 'Crawford University Igbesa'
	},
	{
		value: 'Crescent University'
	},
	{
		value: 'Edwin Clark University, Kaigbodo'
	},
	{
		value: 'Evangel University, Akaeze'
	},
	{
		value: 'Fountain Unveristy, Oshogbo'
	},
	{
		value: 'Godfrey Okoye University, Ugwuomu-Nike - Enugu State'
	},
	{
		value: 'Gregory University, Uturu'
	},
	{
		value: 'Hallmark University, Ijebi Itele, Ogun'
	},
	{
		value: 'Hezekiah University, Umudi'
	},
	{
		value: 'Kings University, Ode Omu'
	},
	{
		value: 'Kwararafa University, Wukari'
	},
	{
		value: 'Lead City University, Ibadan'
	},
	{
		value: 'Madonna University, Okija'
	},
	{
		value: 'Mcpherson University, Seriki Sotayo, Ajebo'
	},
	{
		value: 'Micheal & Cecilia Ibru University'
	},
	{
		value: 'Mountain Top University'
	},
	{
		value: 'Novena University, Ogume'
	},
	{
		value: 'Obong University, Obong Ntak'
	},
	{
		value: 'Oduduwa University, Ipetumodu - Osun State'
	},
	{
		value: 'Pan-Atlantic University, Lagos'
	},
	{
		value: 'Paul University, Awka - Anambra State'
	},
	{
		value: 'Renaissance University, Enugu'
	},
	{
		value: 'Rhema University, Obeama-Asa - Rivers State'
	},
	{
		value: 'Ritman University, Ikot Ekpene, Akwa Ibom'
	},
	{
		value: 'Salem University, Lokoja'
	},
	{
		value: 'Samuel Adegboyega University, Ogwa.'
	},
	{
		value: 'Southwestern University, Oku Owa'
	},
	{
		value: 'Summit University'
	},
	{
		value: 'Tansian University, Umunya'
	},
	{
		value: 'Federal College of Education (Technical), Asaba'
	},
	{
		value: 'Federal College of Education, Kano'
	},
	{
		value: 'Federal College of Education (Special), Oyo'
	},
	{
		value: 'Federal College of Education, Abeokuta'
	},
	{
		value: 'Federal College of Education, Eha-Amufu'
	},
	{
		value: 'Federal College of Education (Technical), Gombe'
	},
	{
		value: 'Federal College of Education, Kontagora'
	},
	{
		value: 'Federal College of Education, Okene'
	},
	{
		value: 'Federal College of Education (Technical), Omoku'
	},
	{
		value: 'Federal College of Education (Tech), Potiskum'
	},
	{
		value: 'Alvan Ikoku College of Education, Owerri'
	},
	{
		value: 'Federal College of Education (Technical), Akoka'
	},
	{
		value: 'Federal College of Education (Technical), Bichi'
	},
	{
		value: 'Federal College of Education (Technical), Gusau'
	},
	{
		value: 'Federal College of Education, Katsina'
	},
	{
		value: 'Federal College of Education, Obudu'
	},
	{
		value: 'Adeyemi College of Education, Ondo'
	},
	{
		value: 'Federal College of Education, Pankshin'
	},
	{
		value: 'Federal College of Education, Yola'
	},
	{
		value: 'Federal College of Education, Zaria10.'
	},
	{
		value: 'Nigerian Army School of Education (NASE), Ilorin'
	},
	{
		value: 'Federal College of Education (T), Umunze'
	},
	{
		value: 'College of Education, Gindiri'
	},
	{
		value: 'Adamawa State College of Education, Hong'
	},
	{
		value: 'Tai Solarin College of Education, Ijebu-Ode'
	},
	{
		value: 'College of Education, Ikere-Ekiti'
	},
	{
		value: 'Ebonyi State College of Education, Ikwo'
	},
	{
		value: 'College of Education, Warri'
	},
	{
		value: 'FCT College of Education, Zuba'
	},
	{
		value: 'Osisatech College of Education, Enugu'
	},
	{
		value: 'Nasarrawa State College of Education, Akwanga'
	},
	{
		value: 'Isa Kaita College of Education, Dutsin-Ma'
	},
	{
		value: 'College of Education, Ekiadolor-Benin'
	},
	{
		value: 'College of Education, Gashua, Damaturu'
	},
	{
		value: 'Kaduna State College of Education, Gidan-Waya, Kafanchan'
	},
	{
		value: 'Osun State College of Education, Ilesa'
	},
	{
		value: 'Kwara State College of Education, Ilorin'
	},
	{
		value: 'Kwara State College of Education'
	},
	{
		value: 'College of Education, katsina-Ala'
	},
	{
		value: 'Saadatu Rimi College of Education, Kumbotso, Kano'
	},
	{
		value: 'College of Education (Technical), Lafiagi'
	},
	{
		value: 'Nwafor Orizu College of Education, Nsugbe'
	},
	{
		value: 'Adeniran Ogunsanya College of Education, Otto/Ijanikin'
	},
	{
		value: 'Emmanuel Alayande College of Education (EACOED), Oyo'
	},
	{
		value: 'College of Education, Waka BIU'
	},
	{
		value: 'St. Augustine College of Education (Project Time), Lagos'
	},
	{
		value: 'Delta State College of Education, Agbor'
	},
	{
		value: 'Akwa Ibom State College of Education, Afahansit'
	},
	{
		value: 'Kogi State College of Education, Ankpa'
	},
	{
		value: 'Adamu Augie College of Education, Argungu'
	},
	{
		value: 'College of Education, Azare'
	},
	{
		value: 'Umar Ibn Ibrahim El-Kanemi College of Education, Science and Technology, Bama'
	},
	{
		value: 'College of Education, Jalingo'
	},
	{
		value: 'Zamfara State College of Education, Maru'
	},
	{
		value: 'Jigawa State College of Education, Gumel'
	},
	{
		value: 'Niger State College of Education, Minna'
	},
	{
		value: 'Rivers College of Education, Rumuolumeni'
	},
	{
		value: 'Shehu shagari College of Education, Sokoto'
	},
	{
		value: 'JamaAtu College of Education (JACE), Kaduna'
	},
	{
		value: 'College of Education, Arochukwu, Abia'
	},
	{
		value: 'College of Education, Ila-Orangun, Osun State'
	},
	{
		value: 'Michael Otedola Coll. of Prim. Education, Lagos'
	},
	{
		value: 'Kashim Ibrahim College of Educ., Maiduguri'
	},
	{
		value: 'Delta State Coll. of Physical Education, Mosogar'
	},
	{
		value: 'Enugu State Coll. of Education (T), Enugu'
	},
	{
		value: 'Cross River State Coll. of Education, Akampa'
	},
	{
		value: 'Edo State College of Education, Igueben'
	},
	{
		value: 'Isaac Jasper Boro COE, Sagbama'
	},
	{
		value: 'Kogi State College of Education, Kabba'
	},
	{
		value: 'DIAMOND COLLEGE OF EDUCATION, ABA'
	},
	{
		value: 'Havard Wilson College of Education, Aba'
	},
	{
		value: 'Delar College of Education'
	},
	{
		value: 'St. Augustine Coll. of Education, Lagos'
	},
	{
		value: 'Yewa Central College of Education, Ayetoro'
	},
	{
		value: 'Bauchi Institute of Arabic & Islamic Studies, Bauchi'
	},
	{
		value: 'Peaceland College of Education, Enugu'
	},
	{
		value: 'The College of Education, Nsukka'
	},
	{
		value: 'OSISA Tech. Coll. of Education, Enugu'
	},
	{
		value: 'African Thinkers Community of Inquiry, Enugu'
	},
	{
		value: 'Institute of Ecumenical Education, (Thinkers Corner), Enugu'
	},
	{
		value: 'Muftau Olanihun College of Education, Ibadan'
	},
	{
		value: 'Muhyideen College of Education, Ilorin'
	},
	{
		value: 'Kinsey College of Education, Ilorin, Kwara State'
	},
	{
		value: 'ECWA College of Education, Jos (ECOEJ)'
	},
	{
		value: 'City College of Education, Mararaba, Gurku'
	},
	{
		value: 'College of Education, Offa'
	},
	{
		value: 'Ansar-Ud-Deen College of Education, Isolo'
	},
	{
		value: 'Unity College of Education, Auka Adoka, Benue'
	},
	{
		value: 'Corner Stone College of Education, lagos'
	},
	{
		value: 'Udemy'
	},
	{
		value: 'Udacity'
	},
	{
		value: 'Edx'
	}
];

export const UNIVERSITIES_AUTO_COMPLETE = [
	{
		value: 'Federal University of Technology, Akure(FUTA)'
	},
	{
		value: 'Federal University of Technology, Minna(FUDM)'
	},
	{
		value: 'Federal University of Technology, Owerri(FUTO)'
	},
	{
		value: 'Afe Babalola University, Ado-Ekiti - Ekiti State(ABUAD)'
	},
	{
		value: 'American University of Nigeria, Yola(AUN)'
	},
	{
		value: 'Nigerian Defence Academy Kaduna(NDA)'
	},
	{
		value: 'Obafemi Awolowo University, Ile-Ife(OAU)'
	},
	{
		value: 'University of Abuja, Gwagwalada(UNIABUJA)'
	},
	{
		value: 'University of Benin(UNIBEN)'
	},
	{
		value: 'University of Calabar(UNICAL)'
	},
	{
		value: 'University of Ibadan(UI)'
	},
	{
		value: 'University of Ilorin(UNIILORIN)'
	},
	{
		value: 'University of Jos(UNIJOS)'
	},
	{
		value: 'University of Lagos(UNILAG)'
	},
	{
		value: 'University of Maiduguri'
	},
	{
		value: 'University of Nigeria, Nsukka(UNN)'
	},
	{
		value: 'University of Port-Harcourt(UNIPORT)'
	},
	{
		value: 'University of Uyo(UNIUYO)'
	},
	{
		value: 'Landmark University, Omu-Aran.'
	},
	{
		value: 'Nile University of Nigeria, Abuja'
	},
	{
		value: 'Abubakar Tafawa Balewa University, Bauchi(ATBU)'
	},
	{
		value: 'Bayero University, Kano(BUK)'
	},
	{
		value: 'Federal University Gashua, Yobe'
	},
	{
		value: 'Federal University, Dutsin-Ma, Katsina(FUDM)'
	},
	{
		value: 'Bells University of Technology, Otta'
	},
	{
		value: 'Benson Idahosa University, Benin City'
	},
	{
		value: 'Adekunle Ajasin University, Akungba(AAUA)'
	},
	{
		value: 'Ambrose Alli University, Ekpoma'
	},
	{
		value: 'Federal University of Agriculture, Abeokuta(FUNAAB)'
	},
	{
		value: 'Delta State University Abraka(DELSU)'
	},
	{
		value: 'Ekiti State University(EKSU)'
	},
	{
		value: 'Kwara State University, Ilorin(KWASU)'
	},
	{
		value: 'Ladoke Akintola University of Technology, Ogbomoso(LAUTECH)'
	},
	{
		value: 'Olabisi Onabanjo University, Ago Iwoye(OOU)'
	},
	{
		value: 'Lagos State University, Ojo(LASU)'
	},
	{
		value: 'Ibrahim Badamasi Babangida University, Lapai'
	},
	{
		value: 'Ignatius Ajuru University of Education,Rumuolumeni'
	},
	{
		value: 'Imo State University, Owerri'
	},
	{
		value: 'Sule Lamido University, Kafin Hausa, Jigawa'
	},
	{
		value: 'Kaduna State University, Kaduna'
	},
	{
		value: 'Kano University of Science & Technology, Wudil'
	},
	{
		value: 'Kebbi State University of Science and Technology, Aliero'
	},
	{
		value: 'Kogi State University Anyigba'
	},
	{
		value: 'Ondo State University of Science and Technology Okitipupa'
	},
	{
		value: 'River State University'
	},
	{
		value: 'Niger Delta University Yenagoa'
	},
	{
		value: 'Nasarawa State University Keffi'
	},
	{
		value: 'Plateau State University Bokkos'
	},
	{
		value: 'Tai Solarin University of Education Ijebu Ode(TASUED)'
	},
	{
		value: 'Umar Musa YarAdua University Katsina'
	},
	{
		value: 'Osun State University Osogbo'
	},
	{
		value: 'Taraba State University, Jalingo'
	},
	{
		value: 'Sokoto State University'
	},
	{
		value: 'Yusuf Maitama Sule University Kano'
	},
	{
		value: 'Oyo State Technical University Ibadan'
	},
	{
		value: 'Ondo State University of Medical Sciences(UNIMED)'
	},
	{
		value: 'Edo University Iyamo'
	},
	{
		value: 'Eastern Palm University Ogboko, Imo State'
	},
	{
		value: 'University of Africa Toru Orua, Bayelsa State'
	},
	{
		value: 'Bornu State University, Maiduguri'
	},
	{
		value: 'Moshood Abiola University of Science and Technology Abeokuta'
	},
	{
		value: 'Gombe State University of Science and Technology'
	},
	{
		value: 'Zamfara State University'
	},
	{
		value: 'Bayelsa Medical University'
	},
	{
		value: 'Elizade University, Ilara-Mokin'
	},
	{
		value: 'Joseph Ayo Babalola University, Ikeji-Arakeji(JABU)'
	},
	{
		value: 'Al-Hikmah University, Ilorin'
	},
	{
		value: 'Al-Qalam University, Katsina'
	},
	{
		value: 'Augustine University'
	},
	{
		value: 'Baze University'
	},
	{
		value: 'Bingham University, New Karu'
	},
	{
		value: 'Caritas University, Enugu'
	},
	{
		value: 'Chrisland University'
	},
	{
		value: 'Crawford University Igbesa'
	},
	{
		value: 'Crescent University'
	},
	{
		value: 'Edwin Clark University, Kaigbodo'
	},
	{
		value: 'Evangel University, Akaeze'
	},
	{
		value: 'Fountain Unveristy, Oshogbo'
	},
	{
		value: 'Godfrey Okoye University, Ugwuomu-Nike - Enugu State'
	},
	{
		value: 'Gregory University, Uturu'
	},
	{
		value: 'Hallmark University, Ijebi Itele, Ogun'
	},
	{
		value: 'Hezekiah University, Umudi'
	},
	{
		value: 'Kings University, Ode Omu'
	},
	{
		value: 'Kwararafa University, Wukari'
	},
	{
		value: 'Lead City University, Ibadan'
	},
	{
		value: 'Madonna University, Okija'
	},
	{
		value: 'Mcpherson University, Seriki Sotayo, Ajebo'
	},
	{
		value: 'Micheal & Cecilia Ibru University'
	},
	{
		value: 'Mountain Top University'
	},
	{
		value: 'Novena University, Ogume'
	},
	{
		value: 'Obong University, Obong Ntak'
	},
	{
		value: 'Oduduwa University, Ipetumodu - Osun State'
	},
	{
		value: 'Pan-Atlantic University, Lagos'
	},
	{
		value: 'Paul University, Awka - Anambra State'
	},
	{
		value: 'Renaissance University, Enugu'
	},
	{
		value: 'Rhema University, Obeama-Asa - Rivers State'
	},
	{
		value: 'Ritman University, Ikot Ekpene, Akwa Ibom'
	},
	{
		value: 'Salem University, Lokoja'
	},
	{
		value: 'Samuel Adegboyega University, Ogwa.'
	},
	{
		value: 'Southwestern University, Oku Owa'
	},
	{
		value: 'Summit University'
	},
	{
		value: 'Tansian University, Umunya'
	},
	{
		value: 'University of Mkar, Mkar'
	},
];

export const POLYTECHNICS_AUTO_COMPLETE = [
	{
		value: 'Akanu Ibiam Federal Polytechnic Unwana, Afikpo, Ebonyi'
	},
	{
		value: 'Auchi Polytechnic, Auchi, Edo'
	},
	{
		value: 'Federal Polytechnic Ado Ekiti, Ekiti'
	},
	{
		value: 'Federal Polytechnic Bali, Taraba'
	},
	{
		value: 'Federal Polytechnic Bauchi, Bauchi'
	},
	{
		value: 'Federal Polytechnic Bida, Niger'
	},
	{
		value: 'Federal Polytechnic Damaturu, Yobe'
	},
	{
		value: 'Federal Polytechnic Ede, Osun'
	},
	{
		value: 'Federal Polytechnic Ekowe, Bayelsa'
	},
	{
		value: 'Federal Polytechnic Idah, Kogi'
	},
	{
		value: 'Federal Polytechnic Ilaro, Ogun'
	},
	{
		value: 'Federal Polytechnic Ile-Oluji, Ondo'
	},
	{
		value: 'Federal Polytechnic Kaura Namoda, Zamfara'
	},
	{
		value: 'Federal Polytechnic Mubi, Adamawa'
	},
	{
		value: 'Federal Polytechnic Nasarawa, Nasarawa'
	},
	{
		value: 'Federal Polytechnic Nekede, Owerri, Imo'
	},
	{
		value: 'Federal Polytechnic Offa, Kwara'
	},
	{
		value: 'Federal Polytechnic Oko, Anambra'
	},
	{
		value: 'Federal Polytechnic of Oil and Gas Bonny, Rivers'
	},
	{
		value: 'Federal Polytechnic Ukana, Akwa Ibom'
	},
	{
		value: 'Hussaini Adamu Federal Polytechnic, Kazaure Jigawa'
	},
	{
		value: 'Kaduna Polytechnic, Kaduna'
	},
	{
		value: 'National Institute of Construction Technology Uromi'
	},
	{
		value: 'Waziri Umaru Federal Polytechnic, Birnin Kebbi'
	},
	{
		value: 'Yaba College of Technology, Yaba, Lagos'
	},
	{
		value: 'Airforce Institute of Technology (AFIT),NAF Base Kaduna'
	},
	{
		value: 'Petroleum Training Institute Effurun, Delta'
	},
	{
		value: 'Nigerian Army Institute of Technology and Environmental Science (NAITES) Makurdi'
	},
	{
		value: 'Abdu Gusau Polytechnic, Talata Mafara'
	},
	{
		value: 'Abia  Polytechnic, Aba'
	},
	{
		value: 'Abraham Adesanya Polytechnic,Ijebu Igbo'
	},
	{
		value: 'Abubakar Tatari Ali Polytechnic, Bauchi'
	},
	{
		value: 'Adamawa  Polytechnic, Yola'
	},
	{
		value: 'Akwa Ibom  College of Art & Science, Nung Ukim'
	},
	{
		value: 'Akwa Ibom  Polytechnic'
	},
	{
		value: 'Bayelsa  College of Arts and Science, Elebele'
	},
	{
		value: 'Benue  Polytechnic, Ugbokolo'
	},
	{
		value: 'Binyaminu Usman Polytechnic, Hadejia'
	},
	{
		value: 'Cross River  Institute of Technology And Management, Ugep'
	},
	{
		value: 'DS Adegbenro ICT Polytechnic, Itori-Ewekoro'
	},
	{
		value: 'Delta  Polytechnic, Ogwashi-Uku'
	},
	{
		value: 'Delta  Polytechnic, Otefe-Oghara'
	},
	{
		value: 'Delta  Polytechnic, Ozoro'
	},
	{
		value: 'Edo  Institute of Technology and Management, Usen'
	},
	{
		value: 'Gateway Polytechnic, Saapade Prof Wole Soyinka Way, Saapade E'
	},
	{
		value: 'Hassan Usman Katsina Polytechnic (HUK)'
	},
	{
		value: 'Ibarapa Polytechnic, Eruwa, Oyo'
	},
	{
		value: 'Imo  Polytechnic, Umuagwo, Ohaji, Imo'
	},
	{
		value: 'Institute of Management and Technology, Enugu'
	},
	{
		value: 'Jigawa  Polytechnic, Dutse'
	},
	{
		value: 'Kano  Polytechnic, Kano'
	},
	{
		value: 'Ken Sarowiwa Polytechnic, Bori'
	},
	{
		value: 'Kogi  Polytechnic, Lokoja'
	},
	{
		value: 'Kwara  Polytechnic, Ilorin'
	},
	{
		value: 'Lagos  Polytechnic, Ikorodu'
	},
	{
		value: 'Mai-Idris Alooma Polytechnic, Geidam'
	},
	{
		value: 'Nasarawa  Polytechnic'
	},
	{
		value: 'Niger  Polytechnic, Zungeru'
	},
	{
		value: 'Nuhu Bamalli Polytechnic, Zaria'
	},
	{
		value: 'Al-Hikma Polytechnic Karu'
	},
	{
		value: 'Allover Central Polytechnic, Sango Ota'
	},
	{
		value: 'Ajayi Polytechnic Ikere Ekiti, Ekiti'
	},
	{
		value: 'Ashi Polytechnic, Anyiin, Logo Local Government PMB 102098, Benue'
	},
	{
		value: 'Best Solution Polytechnic, Akure, Ondo'
	},
	{
		value: 'Bolmor Polytechnic, Ibadan, Oyo'
	},
	{
		value: 'Calvary Polytechnic, Owa-Oyibo, Delta'
	},
	{
		value: 'Citi Polytechnic, FCT Abuja'
	},
	{
		value: 'College of Technology, Iresi, Osun'
	},
	{
		value: 'Covenant Polytechnic, Aba, Abia'
	},
	{
		value: 'Crown Polytechnic, Ekiti'
	},
	{
		value: 'Dorben Polytechnic, Bwari, Abuja'
	},
	{
		value: 'Eastern Polytechnic, Port Harcourt, Rivers'
	},
	{
		value: 'Fidei Polytechnic, Gboko, Benue'
	},
	{
		value: 'Gboko Polytechnic, Gboko, Benue'
	},
	{
		value: 'Global Polytechnic, Akure, Ondo'
	},
	{
		value: 'Grace Polytechnic, Lagos'
	},
	{
		value: 'Heritage Polytechnic, Akwa Ibom'
	},
	{
		value: 'Ibadan City Polytechnic, Ibadan'
	},
	{
		value: 'Igbajo Polytechnic, Osun'
	},
	{
		value: 'Interlink Polytechnic, Ijebu-Jesa, Osun'
	},
	{
		value: 'Kalac Christal Polytechnic, Lekki, Lagos'
	},
	{
		value: 'Kings Polytechnic, Ubiaja, Edo'
	},
	{
		value: 'Landmark Polytechnic, Ogun'
	},
	{
		value: 'Lagos City Polytechnic, Ikeja, Lagos'
	},
	{
		value: 'Lens Polytechnic, Offa, Kawara'
	},
	{
		value: 'Lighthouse Polytechnic, Benin City, Edo'
	},
	{
		value: 'Marist Polytechnic, Umuchigbo, Iji-Nike, Emene, Enugu'
	},
	{
		value: 'Mater Dei Polytechnic'
	},
	{
		value: 'Nacabs Polytechnic, Akwanga, PMB 001 Akwanga, Nasarawa'
	},
	{
		value: 'Nogak Polytechnic, Ikom, Cross Rivers'
	},
	{
		value: 'Our Saviour Institute of Science, Agriculture & Technology, Enugu'
	},
	{
		value: 'Prime Polytechnic, Jida Bassa, Ajaokuta, Kogi'
	},
	{
		value: 'Redeemers College of Technology and Management (RECTEM), Ogun'
	},
	{
		value: 'Ronik Polytechnic, Lagos'
	},
	{
		value: 'Saf Polytechnic, Iseyin Oyo'
	},
	{
		value: 'Ahmadu Bello University, Zaria'
	},
	{
		value: 'Babcock University,Ilishan-Remo'
	},
	{
		value: 'Covenant University Ota'
	},
	{
		value: 'Federal University of Petroleum Resources, Effurun'
	},
	{
		value: 'Federal University, Dutse, Jigawa State'
	},
	{
		value: 'Federal University, Kashere, Gombe State'
	},
	{
		value: 'Federal University, Lafia, Nasarawa State'
	},
	{
		value: 'Federal University, Lokoja, Kogi State'
	},
	{
		value: 'Alex Ekwueme University, Ndufu-Alike, Ebonyi State'
	},
	{
		value: 'Federal University, Otuoke, Bayelsa'
	},
	{
		value: 'Federal University, Oye-Ekiti, Ekiti State'
	},
	{
		value: 'Federal University, Wukari, Taraba State'
	},
	{
		value: 'Federal University, Birnin Kebbi'
	},
	{
		value: 'Federal University, Gusau Zamfara'
	},
	{
		value: 'Bells University of Technology, Otta'
	},
	{
		value: 'Benson Idahosa University, Benin City'
	},
	{
		value: 'Adekunle Ajasin University, Akungba'
	},
	{
		value: 'Ambrose Alli University, Ekpoma'
	},
	{
		value: 'Cross River State University of  Technology, Calabar'
	},
	{
		value: 'Michael Okpara University of Agricultural Umudike'
	},
	{
		value: 'Nigeria Police Academy Wudil'
	},
	{
		value: 'Nnamdi Azikiwe University, Awka'
	},
	{
		value: 'University of Agriculture, Makurdi'
	},
	{
		value: 'Usumanu Danfodiyo University'
	},
	{
		value: 'Air Force Institute of Technology, Kaduna'
	},
	{
		value: 'Nigerian Army University Biu'
	},
	{
		value: 'Ebonyi State University, Abakaliki'
	},
	{
		value: 'Enugu State University of Science and Technology, Enugu'
	},
	{
		value: 'Igbinedion University Okada'
	},
	{
		value: 'Redeemers University, Ede'
	},
	{
		value: 'Achievers University, Owo'
	},
	{
		value: 'Adeleke University, Ede'
	},
	{
		value: 'African University of Science Technology, Abuja'
	},
	{
		value: 'Ajayi Crowther University, Ibadan'
	},
	{
		value: 'Bowen University, Iwo'
	},
	{
		value: 'Caleb University, Lagos'
	},
	{
		value: 'Abia State University, Uturu'
	},
	{
		value: 'Adamawa State University Mubi'
	},
	{
		value: 'Akwa Ibom State University, Ikot Akpaden'
	},
	{
		value: 'Chukwuemeka Odumegwu Ojukwu University, Uli'
	},
	{
		value: 'Bauchi State University, Gadau'
	},
	{
		value: 'Benue State University, Makurdi'
	},
	{
		value: 'Yobe State University, Damaturu'
	},
	{
		value: 'Modibbo Adama University of Technology, Yola'
	},
	{
		value: 'National Open University of Nigeria, Lagos'
	},
	{
		value: 'Nigerian Maritime University Okerenkoko, Delta State'
	},
	{
		value: 'Gombe State Univeristy, Gombe'
	},
	{
		value: 'Ibrahim Badamasi Babangida University, Lapai'
	},
	{
		value: 'Ignatius Ajuru University of Education,Rumuolumeni'
	},
	{
		value: 'Imo State University, Owerri'
	},
	{
		value: 'Sule Lamido University, Kafin Hausa, Jigawa'
	},
	{
		value: 'Kaduna State University, Kaduna'
	},
	{
		value: 'Kano University of Science & Technology, Wudil'
	},
	{
		value: 'Kebbi State University of Science and Technology, Aliero'
	},
	{
		value: 'Kogi State University Anyigba'
	},
	{
		value: 'Ondo State University of Science and Technology Okitipupa'
	},
	{
		value: 'River State University'
	},
	{
		value: 'Niger Delta University Yenagoa'
	},
	{
		value: 'Nasarawa State University Keffi'
	},
	{
		value: 'Plateau State University Bokkos'
	},
	{
		value: 'Tai Solarin University of Education Ijebu Ode'
	},
	{
		value: 'Umar Musa YarAdua University Katsina'
	},
	{
		value: 'Osun State University Osogbo'
	},
	{
		value: 'Taraba State University, Jalingo'
	},
	{
		value: 'Sokoto State University'
	},
	{
		value: 'Yusuf Maitama Sule University Kano'
	},
	{
		value: 'Oyo State Technical University Ibadan'
	},
	{
		value: 'Ondo State University of Medical Sciences'
	},
	{
		value: 'Edo University Iyamo'
	},
	{
		value: 'Eastern Palm University Ogboko, Imo State'
	},
	{
		value: 'University of Africa Toru Orua, Bayelsa State'
	},
	{
		value: 'Bornu State University, Maiduguri'
	},
	{
		value: 'Moshood Abiola University of Science and Technology Abeokuta'
	},
	{
		value: 'Gombe State University of Science and Technology'
	},
	{
		value: 'Zamfara State University'
	},
	{
		value: 'Bayelsa Medical University'
	},
	{
		value: 'Elizade University, Ilara-Mokin'
	},
	{
		value: 'Joseph Ayo Babalola University, Ikeji-Arakeji'
	},
	{
		value: 'Al-Hikmah University, Ilorin'
	},
	{
		value: 'Al-Qalam University, Katsina'
	},
	{
		value: 'Augustine University'
	},
	{
		value: 'Baze University'
	},
	{
		value: 'Bingham University, New Karu'
	},
	{
		value: 'Caritas University, Enugu'
	},
	{
		value: 'Chrisland University'
	},
	{
		value: 'Crawford University Igbesa'
	},
	{
		value: 'Crescent University'
	},
	{
		value: 'Edwin Clark University, Kaigbodo'
	},
	{
		value: 'Evangel University, Akaeze'
	},
	{
		value: 'Fountain Unveristy, Oshogbo'
	},
	{
		value: 'Godfrey Okoye University, Ugwuomu-Nike - Enugu State'
	},
	{
		value: 'Gregory University, Uturu'
	},
	{
		value: 'Hallmark University, Ijebi Itele, Ogun'
	},
	{
		value: 'Hezekiah University, Umudi'
	},
	{
		value: 'Kings University, Ode Omu'
	},
	{
		value: 'Kwararafa University, Wukari'
	},
	{
		value: 'Lead City University, Ibadan'
	},
	{
		value: 'Madonna University, Okija'
	},
	{
		value: 'Mcpherson University, Seriki Sotayo, Ajebo'
	},
	{
		value: 'Micheal & Cecilia Ibru University'
	},
	{
		value: 'Mountain Top University'
	},
	{
		value: 'Novena University, Ogume'
	},
	{
		value: 'Obong University, Obong Ntak'
	},
	{
		value: 'Oduduwa University, Ipetumodu - Osun State'
	},
	{
		value: 'Pan-Atlantic University, Lagos'
	},
	{
		value: 'Paul University, Awka - Anambra State'
	},
	{
		value: 'Renaissance University, Enugu'
	},
	{
		value: 'Rhema University, Obeama-Asa - Rivers State'
	},
	{
		value: 'Ritman University, Ikot Ekpene, Akwa Ibom'
	},
	{
		value: 'Salem University, Lokoja'
	},
	{
		value: 'Samuel Adegboyega University, Ogwa.'
	},
	{
		value: 'Southwestern University, Oku Owa'
	},
	{
		value: 'Summit University'
	},
	{
		value: 'Tansian University, Umunya'
	},
	{
		value: 'Federal College of Education (Technical), Asaba'
	},
	{
		value: 'Federal College of Education, Kano'
	},
	{
		value: 'Federal College of Education (Special), Oyo'
	},
	{
		value: 'Federal College of Education, Abeokuta'
	},
	{
		value: 'Federal College of Education, Eha-Amufu'
	},
	{
		value: 'Federal College of Education (Technical), Gombe'
	},
	{
		value: 'Federal College of Education, Kontagora'
	},
	{
		value: 'Federal College of Education, Okene'
	},
	{
		value: 'Federal College of Education (Technical), Omoku'
	},
	{
		value: 'Federal College of Education (Tech), Potiskum'
	},
	{
		value: 'Alvan Ikoku College of Education, Owerri'
	},
	{
		value: 'Federal College of Education (Technical), Akoka'
	},
	{
		value: 'Federal College of Education (Technical), Bichi'
	},
	{
		value: 'Federal College of Education (Technical), Gusau'
	},
	{
		value: 'Federal College of Education, Katsina'
	},
	{
		value: 'Federal College of Education, Obudu'
	},
	{
		value: 'Adeyemi College of Education, Ondo'
	},
	{
		value: 'Federal College of Education, Pankshin'
	},
	{
		value: 'Federal College of Education, Yola'
	},
	{
		value: 'Federal College of Education, Zaria10.'
	},
	{
		value: 'Nigerian Army School of Education (NASE), Ilorin'
	},
	{
		value: 'Federal College of Education (T), Umunze'
	},
	{
		value: 'College of Education, Gindiri'
	},
	{
		value: 'Adamawa State College of Education, Hong'
	},
	{
		value: 'Tai Solarin College of Education, Ijebu-Ode'
	},
	{
		value: 'College of Education, Ikere-Ekiti'
	},
	{
		value: 'Ebonyi State College of Education, Ikwo'
	},
	{
		value: 'College of Education, Warri'
	},
	{
		value: 'FCT College of Education, Zuba'
	},
	{
		value: 'Osisatech College of Education, Enugu'
	},
	{
		value: 'Nasarrawa State College of Education, Akwanga'
	},
	{
		value: 'Isa Kaita College of Education, Dutsin-Ma'
	},
	{
		value: 'College of Education, Ekiadolor-Benin'
	},
	{
		value: 'College of Education, Gashua, Damaturu'
	},
	{
		value: 'Kaduna State College of Education, Gidan-Waya, Kafanchan'
	},
	{
		value: 'Osun State College of Education, Ilesa'
	},
	{
		value: 'Kwara State College of Education, Ilorin'
	},
	{
		value: 'Kwara State College of Education'
	},
	{
		value: 'College of Education, katsina-Ala'
	},
	{
		value: 'Saadatu Rimi College of Education, Kumbotso, Kano'
	},
	{
		value: 'College of Education (Technical), Lafiagi'
	},
	{
		value: 'Nwafor Orizu College of Education, Nsugbe'
	},
	{
		value: 'Adeniran Ogunsanya College of Education, Otto/Ijanikin'
	},
	{
		value: 'Emmanuel Alayande College of Education (EACOED), Oyo'
	},
	{
		value: 'College of Education, Waka BIU'
	},
	{
		value: 'St. Augustine College of Education (Project Time), Lagos'
	},
	{
		value: 'Delta State College of Education, Agbor'
	},
	{
		value: 'Akwa Ibom State College of Education, Afahansit'
	},
	{
		value: 'Kogi State College of Education, Ankpa'
	},
	{
		value: 'Adamu Augie College of Education, Argungu'
	},
	{
		value: 'College of Education, Azare'
	},
	{
		value: 'Umar Ibn Ibrahim El-Kanemi College of Education, Science and Technology, Bama'
	},
	{
		value: 'College of Education, Jalingo'
	},
	{
		value: 'Zamfara State College of Education, Maru'
	},
	{
		value: 'Jigawa State College of Education, Gumel'
	},
	{
		value: 'Niger State College of Education, Minna'
	},
	{
		value: 'Rivers College of Education, Rumuolumeni'
	},
	{
		value: 'Shehu shagari College of Education, Sokoto'
	},
	{
		value: 'JamaAtu College of Education (JACE), Kaduna'
	},
	{
		value: 'College of Education, Arochukwu, Abia'
	},
	{
		value: 'College of Education, Ila-Orangun, Osun State'
	},
	{
		value: 'Michael Otedola Coll. of Prim. Education, Lagos'
	},
	{
		value: 'Kashim Ibrahim College of Educ., Maiduguri'
	},
	{
		value: 'Delta State Coll. of Physical Education, Mosogar'
	},
	{
		value: 'Enugu State Coll. of Education (T), Enugu'
	},
	{
		value: 'Cross River State Coll. of Education, Akampa'
	},
	{
		value: 'Edo State College of Education, Igueben'
	},
	{
		value: 'Isaac Jasper Boro COE, Sagbama'
	},
	{
		value: 'Kogi State College of Education, Kabba'
	},
	{
		value: 'DIAMOND COLLEGE OF EDUCATION, ABA'
	},
	{
		value: 'Havard Wilson College of Education, Aba'
	},
	{
		value: 'Delar College of Education'
	},
	{
		value: 'St. Augustine Coll. of Education, Lagos'
	},
	{
		value: 'Yewa Central College of Education, Ayetoro'
	},
	{
		value: 'Bauchi Institute of Arabic & Islamic Studies, Bauchi'
	},
	{
		value: 'Peaceland College of Education, Enugu'
	},
	{
		value: 'The College of Education, Nsukka'
	},
	{
		value: 'OSISA Tech. Coll. of Education, Enugu'
	},
	{
		value: 'African Thinkers Community of Inquiry, Enugu'
	},
	{
		value: 'Institute of Ecumenical Education, (Thinkers Corner), Enugu'
	},
	{
		value: 'Muftau Olanihun College of Education, Ibadan'
	},
	{
		value: 'Muhyideen College of Education, Ilorin'
	},
	{
		value: 'Kinsey College of Education, Ilorin, Kwara State'
	},
	{
		value: 'ECWA College of Education, Jos (ECOEJ)'
	},
	{
		value: 'City College of Education, Mararaba, Gurku'
	},
	{
		value: 'College of Education, Offa'
	},
	{
		value: 'Ansar-Ud-Deen College of Education, Isolo'
	},
	{
		value: 'Unity College of Education, Auka Adoka, Benue'
	},
	{
		value: 'Corner Stone College of Education, lagos'
	},
	{
		value: 'Udemy'
	},
	{
		value: 'Udacity'
	},
	{
		value: 'Edx'
	}
];

export const LOCATION_AUTO_COMPLETE = [
	{
		value: 'Abuja'
	},
	{
		value: 'Abia'
	},
	{
		value: 'Adamawa'
	},
	{
		value: 'Akwa Ibom'
	},
	{
		value: 'Anambra'
	},
	{
		value: 'Bauchi'
	},
	{
		value: 'Bayelsa'
	},
	{
		value: 'Benue'
	},
	{
		value: 'Borno'
	},
	{
		value: 'Cross River'
	},
	{
		value: 'Delta'
	},
	{
		value: 'Ebonyi'
	},
	{
		value: 'Edo'
	},
	{
		value: 'Ekiti'
	},
	{
		value: 'Enugu'
	},
	{
		value: 'Gombe'
	},
	{
		value: 'Imo'
	},
	{
		value: 'Jigawa'
	},
	{
		value: 'Kaduna'
	},
	{
		value: 'Kano'
	},
	{
		value: 'Katsina'
	},
	{
		value: 'Kebbi'
	},
	{
		value: 'Kogi'
	},
	{
		value: 'Kwara'
	},
	{
		value: 'Lagos'
	},
	{
		value: 'Nasarawa'
	},
	{
		value: 'Niger'
	},
	{
		value: 'Ogun'
	},
	{
		value: 'Ondo'
	},
	{
		value: 'Osun'
	},
	{
		value: 'Oyo'
	},
	{
		value: 'Plateau'
	},
	{
		value: 'Rivers'
	},
	{
		value: 'Sokoto'
	},
	{
		value: 'Taraba'
	},
	{
		value: 'Yobe'
	},
	{
		value: 'Zamfara'
	}
];

export const COMPANIES_AUTO_COMPLETE = [
	{
		value: 'ICBC'
	},
	{
		value: 'China Construction Bank'
	},
	{
		value: 'JPMorgan Chase'
	},
	{
		value: 'Berkshire Hathaway'
	},
	{
		value: 'Agricultural Bank of China'
	},
	{
		value: 'Saudi Arabian Oil Company (Saudi Aramco)'
	},
	{
		value: 'Ping An Insurance Group'
	},
	{
		value: 'Bank of America'
	},
	{
		value: 'Apple'
	},
	{
		value: 'Bank of China'
	},
	{
		value: 'AT&T'
	},
	{
		value: 'Toyota Motor'
	},
	{
		value: 'Alphabet'
	},
	{
		value: 'ExxonMobil'
	},
	{
		value: 'Microsoft'
	},
	{
		value: 'Samsung Electronics'
	},
	{
		value: 'Wells Fargo'
	},
	{
		value: 'Citigroup'
	},
	{
		value: 'Walmart'
	},
	{
		value: 'Verizon Communications'
	},
	{
		value: 'Royal Dutch Shell'
	},
	{
		value: 'Amazon'
	},
	{
		value: 'Volkswagen Group'
	},
	{
		value: 'UnitedHealth Group'
	},
	{
		value: 'Allianz'
	},
	{
		value: 'China Merchants Bank'
	},
	{
		value: 'Comcast'
	},
	{
		value: 'China Mobile'
	},
	{
		value: 'Total'
	},
	{
		value: 'Postal Savings Bank Of China (PSBC)'
	},
	{
		value: 'Alibaba'
	},
	{
		value: 'Gazprom'
	},
	{
		value: 'PetroChina'
	},
	{
		value: 'Johnson & Johnson'
	},
	{
		value: 'RBC'
	},
	{
		value: 'Walt Disney'
	},
	{
		value: 'China Life Insurance'
	},
	{
		value: 'Intel'
	},
	{
		value: 'Facebook'
	},
	{
		value: 'CVS Health'
	},
	{
		value: 'Nestl'
	},
	{
		value: 'BNP Paribas'
	},
	{
		value: 'Nippon Telegraph & Tel'
	},
	{
		value: 'HSBC Holdings'
	},
	{
		value: 'Bank of Communications'
	},
	{
		value: 'TD Bank Group'
	},
	{
		value: 'Goldman Sachs Group'
	},
	{
		value: 'Morgan Stanley'
	},
	{
		value: 'Pfizer'
	},
	{
		value: 'Tencent Holdings'
	},
	{
		value: 'IBM'
	},
	{
		value: 'Mitsubishi UFJ Financial'
	},
	{
		value: 'General Electric'
	},
	{
		value: 'Rosneft'
	},
	{
		value: 'Santander'
	},
	{
		value: 'Anheuser-Busch InBev'
	},
	{
		value: 'Industrial Bank'
	},
	{
		value: 'Reliance Industries'
	},
	{
		value: 'Sony'
	},
	{
		value: 'Sinopec'
	},
	{
		value: 'Chevron'
	},
	{
		value: 'Siemens'
	},
	{
		value: 'Cigna'
	},
	{
		value: 'AXA Group'
	},
	{
		value: 'Shanghai Pudong Development'
	},
	{
		value: 'AIA Group'
	},
	{
		value: 'Softbank'
	},
	{
		value: 'Novartis'
	},
	{
		value: 'Deutsche Telekom'
	},
	{
		value: 'Petrobras'
	},
	{
		value: 'Procter & Gamble'
	},
	{
		value: 'Japan Post Holdings'
	},
	{
		value: 'LVMH Moet Hennessy Louis Vuitton'
	},
	{
		value: 'Roche Holding'
	},
	{
		value: 'BMW Group'
	},
	{
		value: 'Zurich Insurance Group'
	},
	{
		value: 'CITIC'
	},
	{
		value: 'Ita Unibanco Holding'
	},
	{
		value: 'China  Construction Engineering'
	},
	{
		value: 'MetLife'
	},
	{
		value: 'Sumitomo Mitsui Financial'
	},
	{
		value: 'Cisco Systems'
	},
	{
		value: 'Honda Motor'
	},
	{
		value: 'Commonwealth Bank'
	},
	{
		value: 'Bank of Nova Scotia'
	},
	{
		value: 'Raytheon Technologies'
	},
	{
		value: 'PepsiCo'
	},
	{
		value: 'American Express'
	},
	{
		value: 'General Motors'
	},
	{
		value: 'China Minsheng Bank'
	},
	{
		value: 'British American Tobacco'
	},
	{
		value: 'Merck & Co'
	},
	{
		value: 'BHP Group'
	},
	{
		value: 'Oracle'
	},
	{
		value: 'Brookfield Asset Management'
	},
	{
		value: 'Coca-Cola'
	},
	{
		value: 'Enel'
	},
	{
		value: 'GlaxoSmithKline'
	},
	{
		value: 'LukOil'
	},
	{
		value: 'China Vanke'
	},
	{
		value: 'Banco Bradesco'
	},
	{
		value: 'Bayer'
	},
	{
		value: 'US Bancorp'
	},
	{
		value: 'Mitsubishi'
	},
	{
		value: 'Anthem'
	},
	{
		value: 'Home Depot'
	},
	{
		value: 'BASF'
	},
	{
		value: 'Taiwan Semiconductor'
	},
	{
		value: 'UBS'
	},
	{
		value: 'Unilever'
	},
	{
		value: 'Country Garden Holdings'
	},
	{
		value: 'EDF'
	},
	{
		value: 'China Citic Bank'
	},
	{
		value: 'Rio Tinto'
	},
	{
		value: 'Lloyds Banking Group'
	},
	{
		value: 'Prudential Financial'
	},
	{
		value: 'Sanofi'
	},
	{
		value: 'Credit Agricole'
	},
	{
		value: 'AbbVie'
	},
	{
		value: 'Iberdrola'
	},
	{
		value: 'Hon Hai Precision'
	},
	{
		value: 'KDDI'
	},
	{
		value: 'Enbridge'
	},
	{
		value: 'Manulife'
	},
	{
		value: 'Intesa Sanpaolo'
	},
	{
		value: 'CNOOC'
	},
	{
		value: 'Dell Technologies'
	},
	{
		value: 'Westpac Banking Group'
	},
	{
		value: 'Medtronic'
	},
	{
		value: 'China Pacific Insurance'
	},
	{
		value: 'SAIC Motor'
	},
	{
		value: 'Bank of Montreal'
	},
	{
		value: 'Caterpillar'
	},
	{
		value: 'Chubb'
	},
	{
		value: 'Itochu'
	},
	{
		value: 'Walgreens Boots Alliance'
	},
	{
		value: 'VINCI'
	},
	{
		value: 'Bristol-Myers Squibb'
	},
	{
		value: 'PNC Financial Services'
	},
	{
		value: 'Generali Group'
	},
	{
		value: 'Visa'
	},
	{
		value: 'Costco Wholesale'
	},
	{
		value: 'United Parcel Service'
	},
	{
		value: 'Duke Energy'
	},
	{
		value: 'Lockheed Martin'
	},
	{
		value: 'HDFC Bank'
	},
	{
		value: 'All'
	},
	{
		value: 'China Everbright Bank'
	},
	{
		value: 'Charter Communications'
	},
	{
		value: 'SAP'
	},
	{
		value: 'Tokio Marine Holdings'
	},
	{
		value: 'CK Hutchison'
	},
	{
		value: 'Honeywell International'
	},
	{
		value: 'China Evergrande Group'
	},
	{
		value: 'American International Group'
	},
	{
		value: 'Orange'
	},
	{
		value: 'Amrica Mvil'
	},
	{
		value: 'Abbott Laboratories'
	},
	{
		value: 'Bank of New York Mellon'
	},
	{
		value: 'Credit Suisse Group'
	},
	{
		value: 'Capital One Financial'
	},
	{
		value: 'Amgen'
	},
	{
		value: 'Truist Financial'
	},
	{
		value: 'ANZ'
	},
	{
		value: 'Equinor'
	},
	{
		value: 'Mitsui'
	},
	{
		value: 'Oversea-Chinese Banking'
	},
	{
		value: 'China Shenhua Energy'
	},
	{
		value: 'Exelon'
	},
	{
		value: 'PTT'
	},
	{
		value: ' Bank of India'
	},
	{
		value: 'Poly Developments & Holdings Group'
	},
	{
		value: 'Lowes'
	},
	{
		value: 'China Telecom'
	},
	{
		value: 'Southern Company'
	},
	{
		value: 'LOral'
	},
	{
		value: 'BlackRock'
	},
	{
		value: 'Linde'
	},
	{
		value: 'Canadian Imperial Bank'
	},
	{
		value: 'NextEra Energy'
	},
	{
		value: 'Barclays'
	},
	{
		value: 'Deere & Company'
	},
	{
		value: 'Union Pacific'
	},
	{
		value: 'Thermo Fisher Scientific'
	},
	{
		value: 'Deutsche Post'
	},
	{
		value: 'Gilead Sciences'
	},
	{
		value: 'Phillips 66'
	},
	{
		value: 'Mondelez International'
	},
	{
		value: 'Hyundai Motor'
	},
	{
		value: 'Qatar National Bank'
	},
	{
		value: 'NAB - National Australia Bank'
	},
	{
		value: 'Broadcom'
	},
	{
		value: 'Legal & General Group'
	},
	{
		value: 'ING Group'
	},
	{
		value: '3M'
	},
	{
		value: 'Target'
	},
	{
		value: 'Marathon Petroleum'
	},
	{
		value: 'Hitachi'
	},
	{
		value: 'Progressive'
	},
	{
		value: 'DBS'
	},
	{
		value: 'ConocoPhillips'
	},
	{
		value: 'UniCredit'
	},
	{
		value: 'Philip Morris International'
	},
	{
		value: 'China Railway Group'
	},
	{
		value: 'Accenture'
	},
	{
		value: 'Munich Re'
	},
	{
		value: 'Royal Bank of Scotland'
	},
	{
		value: 'Banco do Brasil'
	},
	{
		value: 'McDonalds'
	},
	{
		value: 'China Resources Land'
	},
	{
		value: 'China Railway Construction'
	},
	{
		value: 'Saudi Basic Industries'
	},
	{
		value: 'Aviva'
	},
	{
		value: 'General Dynamics'
	},
	{
		value: 'MS&AD Insurance'
	},
	{
		value: 'PICC'
	},
	{
		value: 'Aflac'
	},
	{
		value: 'EON'
	},
	{
		value: 'Travelers'
	},
	{
		value: 'Prudential'
	},
	{
		value: 'Eli Lilly'
	},
	{
		value: 'Kraft Heinz Company'
	},
	{
		value: 'Sunac China Holdings'
	},
	{
		value: 'Charles Schwab'
	},
	{
		value: 'HCA Healthcare'
	},
	{
		value: 'Danaher'
	},
	{
		value: 'Schneider Electric'
	},
	{
		value: 'Socit Gnrale'
	},
	{
		value: 'Midea Group'
	},
	{
		value: 'Dai-ichi Life Insurance'
	},
	{
		value: 'ENGIE'
	},
	{
		value: 'Fiat Chrysler Automobiles'
	},
	{
		value: 'Volvo Group'
	},
	{
		value: 'Seven & I Holdings'
	},
	{
		value: 'Humana'
	},
	{
		value: 'Longfor Group Holdings'
	},
	{
		value: 'AstraZeneca'
	},
	{
		value: 'JDcom'
	},
	{
		value: 'Air Liquide'
	},
	{
		value: 'Fresenius'
	},
	{
		value: 'Northrop Grumman'
	},
	{
		value: 'Mizuho Financial'
	},
	{
		value: 'Sun Life Financial'
	},
	{
		value: 'Inditex'
	},
	{
		value: 'Nike'
	},
	{
		value: 'Gree Electric Appliances'
	},
	{
		value: 'Central Japan Railway'
	},
	{
		value: 'Danone'
	},
	{
		value: 'PayPal'
	},
	{
		value: 'Cathay Financial'
	},
	{
		value: 'Surgutneftegas'
	},
	{
		value: 'Suncor Energy'
	},
	{
		value: 'Standard Chartered'
	},
	{
		value: 'Tesco'
	},
	{
		value: 'ICICI Bank'
	},
	{
		value: 'Panasonic'
	},
	{
		value: 'Safran'
	},
	{
		value: 'Qualcomm'
	},
	{
		value: 'Royal Ahold Delhaize NV'
	},
	{
		value: 'KBC Group'
	},
	{
		value: 'East Japan Railway'
	},
	{
		value: 'National Grid'
	},
	{
		value: 'Delta Air Lines'
	},
	{
		value: 'Peugeot'
	},
	{
		value: 'Telefnica'
	},
	{
		value: 'Kroger'
	},
	{
		value: 'China Communications Construction'
	},
	{
		value: 'Shinhan Financial Group'
	},
	{
		value: 'Oil & Natural Gas'
	},
	{
		value: 'Sun Hung Kai Properties'
	},
	{
		value: 'Huaxia Bank'
	},
	{
		value: 'Fubon Financial'
	},
	{
		value: 'Diageo'
	},
	{
		value: 'Anglo American'
	},
	{
		value: 'Mastercard'
	},
	{
		value: 'Dominion Energy'
	},
	{
		value: 'Micron Technology'
	},
	{
		value: 'KB Financial Group'
	},
	{
		value: 'HDFC'
	},
	{
		value: 'LafargeHolcim'
	},
	{
		value: 'United Overseas Bank'
	},
	{
		value: 'Bank of Beijing'
	},
	{
		value: 'Japan Tobacco'
	},
	{
		value: 'Netflix'
	},
	{
		value: 'Centene'
	},
	{
		value: 'China Unicom'
	},
	{
		value: 'Jardine Matheson'
	},
	{
		value: 'Starbucks'
	},
	{
		value: 'American Electric'
	},
	{
		value: 'Sumitomo'
	},
	{
		value: 'Nordea Bank'
	},
	{
		value: 'Orix'
	},
	{
		value: 'TJX Cos'
	},
	{
		value: 'Mitsubishi Electric'
	},
	{
		value: ' Street'
	},
	{
		value: 'SK Hynix'
	},
	{
		value: 'RWE Group'
	},
	{
		value: 'ABB'
	},
	{
		value: 'Nomura'
	},
	{
		value: 'BCE'
	},
	{
		value: 'Automatic Data Processing'
	},
	{
		value: 'HP'
	},
	{
		value: 'First Abu Dhabi Bank'
	},
	{
		value: 'EssilorLuxottica'
	},
	{
		value: 'Henkel'
	},
	{
		value: 'Canadian Natural Resources'
	},
	{
		value: 'Greenland Holdings Group'
	},
	{
		value: 'EMD Group'
	},
	{
		value: 'Swiss Re'
	},
	{
		value: 'Bank Of Shanghai'
	},
	{
		value: 'Archer Daniels Midland'
	},
	{
		value: 'Anhui Conch Cement'
	},
	{
		value: 'Ecopetrol'
	},
	{
		value: 'BT Group'
	},
	{
		value: 'Poste Italiane'
	},
	{
		value: 'Novatek'
	},
	{
		value: 'TC Energy'
	},
	{
		value: 'CRH'
	},
	{
		value: 'Macquarie Group'
	},
	{
		value: 'BBVA-Banco Bilbao Vizcaya'
	},
	{
		value: 'JXTG Holdings'
	},
	{
		value: 'Kering'
	},
	{
		value: 'Baoshan Iron & Steel'
	},
	{
		value: 'Daiwa House Industry'
	},
	{
		value: 'Couche Tard'
	},
	{
		value: 'Daimler'
	},
	{
		value: 'Bridgestone'
	},
	{
		value: 'Fannie Mae'
	},
	{
		value: 'Tyson Foods'
	},
	{
		value: 'New China Life Insurance'
	},
	{
		value: 'Saint-Gobain'
	},
	{
		value: 'CSX'
	},
	{
		value: 'DNB'
	},
	{
		value: 'Novo Nordisk'
	},
	{
		value: 'Saudi Telecom'
	},
	{
		value: 'LyondellBasell Industries'
	},
	{
		value: 'EOG Resources'
	},
	{
		value: 'Sempra Energy'
	},
	{
		value: 'Eaton'
	},
	{
		value: 'Freddie Mac'
	},
	{
		value: 'Heineken'
	},
	{
		value: 'Kweichow Moutai'
	},
	{
		value: 'CK Asset Holdings'
	},
	{
		value: 'Becton Dickinson'
	},
	{
		value: 'Stryker'
	},
	{
		value: 'CRRC'
	},
	{
		value: 'Bank Rakyat Indonesia (BRI)'
	},
	{
		value: 'China Merchants Shekou Industrial Zone Holdings'
	},
	{
		value: 'Maybank'
	},
	{
		value: 'Kinder Morgan'
	},
	{
		value: 'Emirates NBD'
	},
	{
		value: 'Marsh & McLennan'
	},
	{
		value: 'Ameriprise Financial'
	},
	{
		value: 'Dollar General'
	},
	{
		value: 'Shin-Etsu Chemical'
	},
	{
		value: 'Barrick Gold'
	},
	{
		value: 'BP'
	},
	{
		value: 'Etisalat'
	},
	{
		value: 'Canon'
	},
	{
		value: 'Sompo'
	},
	{
		value: 'ASML Holding'
	},
	{
		value: 'Natixis'
	},
	{
		value: 'Vivendi'
	},
	{
		value: 'Swiss Life Holding'
	},
	{
		value: 'Posco'
	},
	{
		value: 'Biogen'
	},
	{
		value: 'Mitsui Fudosan'
	},
	{
		value: 'Canadian National Railway'
	},
	{
		value: 'Booking Holdings'
	},
	{
		value: 'NN Group'
	},
	{
		value: 'Fosun International'
	},
	{
		value: 'Wilmar International'
	},
	{
		value: 'General Mills'
	},
	{
		value: 'Carrefour'
	},
	{
		value: 'Daikin Industries'
	},
	{
		value: 'Tata Consultancy Services'
	},
	{
		value: 'Power Corp of Canada'
	},
	{
		value: 'Boston Scientific'
	},
	{
		value: 'Discover Financial Services'
	},
	{
		value: 'Synchrony Financial'
	},
	{
		value: 'Michelin Group'
	},
	{
		value: 'Paccar'
	},
	{
		value: 'Sumitomo Mitsui Trust'
	},
	{
		value: 'Xiaomi'
	},
	{
		value: 'Hartford Financial Services'
	},
	{
		value: 'Philips'
	},
	{
		value: 'IntercontinentalExchange'
	},
	{
		value: 'Norfolk Southern'
	},
	{
		value: 'BAE Systems'
	},
	{
		value: 'Indian Oil'
	},
	{
		value: 'Bank of Ningbo'
	},
	{
		value: 'Sysco'
	},
	{
		value: 'CNP Assurances'
	},
	{
		value: 'Denso'
	},
	{
		value: 'Newmont Mining'
	},
	{
		value: 'National Commercial Bank'
	},
	{
		value: 'Adidas'
	},
	{
		value: 'CTBC Financial'
	},
	{
		value: 'Danske Bank'
	},
	{
		value: 'China National Building'
	},
	{
		value: 'Richemont'
	},
	{
		value: 'Sberbank'
	},
	{
		value: 'VMware'
	},
	{
		value: 'Nippon Steel'
	},
	{
		value: 'Komatsu'
	},
	{
		value: 'Transneft'
	},
	{
		value: 'Talanx'
	},
	{
		value: 'Xcel Energy'
	},
	{
		value: 'Consolidated Edison'
	},
	{
		value: 'Naturgy Energy Group'
	},
	{
		value: 'Fiserv'
	},
	{
		value: 'Bank Of Jiangsu'
	},
	{
		value: 'Boeing'
	},
	{
		value: 'Waste Management'
	},
	{
		value: 'Woolworths'
	},
	{
		value: 'Texas Instruments'
	},
	{
		value: 'Hyundai Mobis'
	},
	{
		value: 'Adobe'
	},
	{
		value: 'DuPont de Nemours'
	},
	{
		value: 'Hana Financial Group'
	},
	{
		value: 'L3Harris Technologies'
	},
	{
		value: 'Fujitsu'
	},
	{
		value: 'Shimao Property Holdings'
	},
	{
		value: 'Norilsk Nickel'
	},
	{
		value: 'Imperial Brands'
	},
	{
		value: 'China Zheshang Bank'
	},
	{
		value: 'Tokyo Electric Power'
	},
	{
		value: 'Fast Retailing'
	},
	{
		value: 'Emerson Electric'
	},
	{
		value: 'Toyota Industries'
	},
	{
		value: 'Femsa'
	},
	{
		value: 'Hewlett Packard Enterprise'
	},
	{
		value: 'China Yangtze Power'
	},
	{
		value: 'Recruit Holdings'
	},
	{
		value: 'Keurig Dr Pepper'
	},
	{
		value: 'Applied Materials'
	},
	{
		value: 'Edison International'
	},
	{
		value: 'Principal Financial Group'
	},
	{
		value: 'AIRBUS'
	},
	{
		value: 'CME Group'
	},
	{
		value: 'OMV Group'
	},
	{
		value: 'Marubeni'
	},
	{
		value: 'AmerisourceBergen'
	},
	{
		value: 'Larsen & Toubro'
	},
	{
		value: 'Bouygues'
	},
	{
		value: 'Nutrien'
	},
	{
		value: 'Kansai Electric Power'
	},
	{
		value: 'Sherwin-Williams'
	},
	{
		value: 'Fujifilm Holdings'
	},
	{
		value: 'American Tower'
	},
	{
		value: 'Pernod Ricard'
	},
	{
		value: 'VTB Bank'
	},
	{
		value: 'Telstra'
	},
	{
		value: 'Lennar'
	},
	{
		value: 'Chubu Electric Power'
	},
	{
		value: 'Ecolab'
	},
	{
		value: 'Cummins'
	},
	{
		value: 'Marriott International'
	},
	{
		value: 'SEB AB'
	},
	{
		value: 'Investor AB'
	},
	{
		value: 'JBS'
	},
	{
		value: 'CaixaBank'
	},
	{
		value: 'National Bank of Canada'
	},
	{
		value: 'Svenska Handelsbanken'
	},
	{
		value: 'Vodafone'
	},
	{
		value: 'Sampo'
	},
	{
		value: 'Power Construction Corporation of China'
	},
	{
		value: 'Carnival'
	},
	{
		value: 'Eni'
	},
	{
		value: 'The Este Lauder Companies'
	},
	{
		value: 'Fifth Third Bank'
	},
	{
		value: 'ViacomCBS'
	},
	{
		value: 'Al Rajhi Bank'
	},
	{
		value: 'China Fortune Land Development'
	},
	{
		value: 'Kimberly-Clark'
	},
	{
		value: 'Fortescue Metals Group'
	},
	{
		value: 'Public Service Enterprise Group'
	},
	{
		value: 'KIA Motors'
	},
	{
		value: 'Subaru'
	},
	{
		value: 'Suzuki Motor'
	},
	{
		value: 'Mitsubishi Heavy Industries'
	},
	{
		value: 'Southwest Airlines'
	},
	{
		value: 'Mitsubishi E'
	},
	{
		value: 'Glencore International'
	},
	{
		value: 'Aon'
	},
	{
		value: 'Ford Motor'
	},
	{
		value: 'Bank Central Asia'
	},
	{
		value: 'Thales'
	},
	{
		value: 'NVIDIA'
	},
	{
		value: 'Suningcom'
	},
	{
		value: 'Takeda Pharmaceutical'
	},
	{
		value: 'EnBW-Energie Baden'
	},
	{
		value: 'Valero Energy'
	},
	{
		value: 'Colgate-Palmolive'
	},
	{
		value: 'Bank Mandiri'
	},
	{
		value: 'H&M - Hennes & Mauritz'
	},
	{
		value: 'NTPC'
	},
	{
		value: 'Murata Manufacturing'
	},
	{
		value: 'SingTel'
	},
	{
		value: 'Las Vegas Sands'
	},
	{
		value: 'Magna International'
	},
	{
		value: 'Weichai Power'
	},
	{
		value: 'Fairfax Financial'
	},
	{
		value: 'China Tower Corp'
	},
	{
		value: 'Compass Group'
	},
	{
		value: 'Entergy'
	},
	{
		value: 'Erste Group Bank'
	},
	{
		value: 'Toyota Tsusho'
	},
	{
		value: 'Citic Securities'
	},
	{
		value: 'Samsung C&T'
	},
	{
		value: 'Illinois Tool Works'
	},
	{
		value: 'Nissan Motor'
	},
	{
		value: 'FedEx'
	},
	{
		value: 'Vale'
	},
	{
		value: 'eBay'
	},
	{
		value: 'Wesfarmers'
	},
	{
		value: 'Bank of Nanjing'
	},
	{
		value: 'M&G'
	},
	{
		value: 'Asahi Group Holdings'
	},
	{
		value: 'Atlantia'
	},
	{
		value: 'DTE Energy'
	},
	{
		value: 'Kotak Mahindra Bank'
	},
	{
		value: 'Aegon'
	},
	{
		value: 'Carrier Global'
	},
	{
		value: 'United Airlines Holdings'
	},
	{
		value: 'Northern Trust'
	},
	{
		value: 'Swisscom'
	},
	{
		value: 'CNH Industrial'
	},
	{
		value: 'Kubota'
	},
	{
		value: 'Samsung Life Insurance'
	},
	{
		value: 'Best Buy'
	},
	{
		value: 'Haier Smart Home'
	},
	{
		value: 'Cognizant'
	},
	{
		value: 'Nintendo'
	},
	{
		value: 'McKesson'
	},
	{
		value: 'FirstRand'
	},
	{
		value: 'China Cinda Asset Management'
	},
	{
		value: 'Hengli Petrochemical'
	},
	{
		value: 'Tatneft'
	},
	{
		value: 'Tenaga Nasional'
	},
	{
		value: 'SK Holdings'
	},
	{
		value: 'Deutsche Bank'
	},
	{
		value: 'M&T Bank'
	},
	{
		value: 'Standard Bank Group'
	},
	{
		value: 'China Taiping Insurance'
	},
	{
		value: 'Telecom Italia'
	},
	{
		value: 'Astellas Pharma'
	},
	{
		value: 'Veolia Environnement'
	},
	{
		value: 'Grupo Mexico'
	},
	{
		value: 'Kyocera'
	},
	{
		value: 'Rogers Communications'
	},
	{
		value: 'Loews'
	},
	{
		value: 'Trane Technologies'
	},
	{
		value: 'Air Products & Chemicals'
	},
	{
		value: 'Aeon'
	},
	{
		value: 'Sinopharm Group'
	},
	{
		value: 'PPL'
	},
	{
		value: 'EXOR'
	},
	{
		value: 'RELX'
	},
	{
		value: 'Lincoln National'
	},
	{
		value: 'Allergan'
	},
	{
		value: 'NetEase'
	},
	{
		value: 'Naspers'
	},
	{
		value: 'Grupo ACS'
	},
	{
		value: 'TELUS'
	},
	{
		value: 'MTR'
	},
	{
		value: 'KeyCorp'
	},
	{
		value: 'Prologis'
	},
	{
		value: 'Evonik'
	},
	{
		value: 'Citizens Financial Group'
	},
	{
		value: 'DR Horton'
	},
	{
		value: 'Dow'
	},
	{
		value: 'Orsted'
	},
	{
		value: 'Willis Towers Watson'
	},
	{
		value: 'DISH Network'
	},
	{
		value: 'Athene Holding'
	},
	{
		value: 'Swedbank'
	},
	{
		value: 'Salesforcecom'
	},
	{
		value: 'Altria Group'
	},
	{
		value: 'Otsuka Holding'
	},
	{
		value: 'Eversource Energy'
	},
	{
		value: 'Sekisui House'
	},
	{
		value: 'Parker-Hannifin'
	},
	{
		value: 'Discovery'
	},
	{
		value: 'Banorte'
	},
	{
		value: 'Tesla'
	},
	{
		value: 'TD Ameritrade Holding'
	},
	{
		value: 'Baxter International'
	},
	{
		value: 'Deutsche Boerse'
	},
	{
		value: 'Saudi Electricity'
	},
	{
		value: 'Associated British Foods'
	},
	{
		value: 'Sumitomo Realty'
	},
	{
		value: 'WH Group'
	},
	{
		value: 'Korea Electric Power'
	},
	{
		value: 'Williams'
	},
	{
		value: 'WEC Energy Group'
	},
	{
		value: 'Inpex'
	},
	{
		value: 'Edp-energias De Portugal'
	},
	{
		value: 'Mitsubishi Chemical'
	},
	{
		value: 'Dollar Tree'
	},
	{
		value: 'Bharat Petroleum'
	},
	{
		value: 'Infosys'
	},
	{
		value: 'MGM Resorts'
	},
	{
		value: 'Kao'
	},
	{
		value: 'International Paper'
	},
	{
		value: 'CGN Power'
	},
	{
		value: 'Formosa Petrochemical'
	},
	{
		value: 'PPG'
	},
	{
		value: 'Swire Pacific'
	},
	{
		value: 'Coca-Cola European Partners'
	},
	{
		value: 'CSL'
	},
	{
		value: 'Coal India'
	},
	{
		value: 'Woori Financial Group'
	},
	{
		value: 'Daiichi Sankyo'
	},
	{
		value: 'SK Telecom'
	},
	{
		value: 'Fox'
	},
	{
		value: 'Crown Castle International'
	},
	{
		value: 'Ageas'
	},
	{
		value: 'Republic Services'
	},
	{
		value: 'Metallurgical Corp of China'
	},
	{
		value: 'Neste'
	},
	{
		value: 'Mller-Maersk'
	},
	{
		value: 'CBRE Group'
	},
	{
		value: 'International Airlines'
	},
	{
		value: 'Nokia'
	},
	{
		value: 'Omnicom Group'
	},
	{
		value: 'Essity Ab'
	},
	{
		value: 'Ross Stores'
	},
	{
		value: 'Industrial Bank of Korea'
	},
	{
		value: 'Schlumberger'
	},
	{
		value: 'Deutsche Lufthansa'
	},
	{
		value: 'Stanley Black & Decker'
	},
	{
		value: 'Wheelock'
	},
	{
		value: 'Asahi Kasei'
	},
	{
		value: 'Kellogg'
	},
	{
		value: 'SSE'
	},
	{
		value: 'Daqin Railway'
	},
	{
		value: 'Haitong Securities'
	},
	{
		value: 'Fidelity National Information'
	},
	{
		value: 'Henderson Land'
	},
	{
		value: 'Regions Financial'
	},
	{
		value: 'JFE Holdings'
	},
	{
		value: 'NEC'
	},
	{
		value: 'Capgemini'
	},
	{
		value: 'Repsol'
	},
	{
		value: 'Continental'
	},
	{
		value: 'Regeneron Pharmaceuticals'
	},
	{
		value: 'New World Development'
	},
	{
		value: 'Royal Caribbean Cruises'
	},
	{
		value: 'ArcelorMittal'
	},
	{
		value: 'Reckitt Benckiser Group'
	},
	{
		value: 'Vonovia'
	},
	{
		value: 'Fortis (Canada)'
	},
	{
		value: 'Resona Holdings'
	},
	{
		value: 'FirstEnergy'
	},
	{
		value: 'Ally Financial'
	},
	{
		value: 'Zimmer Biomet'
	},
	{
		value: 'Atlas Copco'
	},
	{
		value: 'Lam Research'
	},
	{
		value: 'CLP Holdings'
	},
	{
		value: 'Cardinal Health'
	},
	{
		value: 'Activision Blizzard'
	},
	{
		value: 'West Japan Railway'
	},
	{
		value: 'Public Bank'
	},
	{
		value: 'WPP'
	},
	{
		value: 'CarMax'
	},
	{
		value: 'CNPC Capital'
	},
	{
		value: 'Simon Property Group'
	},
	{
		value: 'Occidental Petroleum'
	},
	{
		value: 'London Stock Exchange'
	},
	{
		value: 'Eiffage'
	},
	{
		value: 'TE Connectivity'
	},
	{
		value: 'Sodexo'
	},
	{
		value: 'Sumitomo Electric'
	},
	{
		value: 'Porsche Automobil Holding'
	},
	{
		value: 'Reinsurance Group of America'
	},
	{
		value: 'National Bank of Kuwait'
	},
	{
		value: 'HeidelbergCement'
	},
	{
		value: 'AutoZone'
	},
	{
		value: 'Nidec'
	},
	{
		value: 'Lenovo Group'
	},
	{
		value: 'Johnson Controls International'
	},
	{
		value: 'Unipol Gruppo'
	},
	{
		value: 'SF Holding'
	},
	{
		value: 'First Republic Bank'
	},
	{
		value: 'Xiamen C&D'
	},
	{
		value: 'Beijing-Shanghai High-Speed Railway'
	},
	{
		value: 'Hong Kong Exchanges'
	},
	{
		value: 'CIMB Group Holdings'
	},
	{
		value: 'WestRock'
	},
	{
		value: 'Telenor'
	},
	{
		value: 'Commerzbank'
	},
	{
		value: 'Siam Cement'
	},
	{
		value: 'Tokyo Electron'
	},
	{
		value: 'Dongfeng Motor Group'
	},
	{
		value: 'Gemdale'
	},
	{
		value: 'Seazen Group'
	},
	{
		value: 'Huatai Securities'
	},
	{
		value: 'Wens Foodstuff Group'
	},
	{
		value: 'Bharti Airtel'
	},
	{
		value: 'China Energy Engineering'
	},
	{
		value: 'Nucor'
	},
	{
		value: 'Sany Heavy Industry'
	},
	{
		value: 'Ericsson'
	},
	{
		value: 'Baidu'
	},
	{
		value: 'Kirin Holdings'
	},
	{
		value: 'SM Investments'
	},
	{
		value: 'Telkom Indonesia'
	},
	{
		value: 'Riyad Bank'
	},
	{
		value: 'Legend Holding'
	},
	{
		value: 'Grupo Aval'
	},
	{
		value: 'Ferguson'
	},
	{
		value: 'Uber'
	},
	{
		value: 'Kasikornbank'
	},
	{
		value: 'DP World'
	},
	{
		value: 'Geely Automobile Holdings'
	},
	{
		value: 'Credicorp'
	},
	{
		value: 'Isbank'
	},
	{
		value: 'LG Chem'
	},
	{
		value: 'Analog Devices'
	},
	{
		value: 'Guangzhou R&F'
	},
	{
		value: 'Eletrobrs'
	},
	{
		value: 'Coles Group'
	},
	{
		value: 'Herms International'
	},
	{
		value: 'Raiffeisen Bank International'
	},
	{
		value: 'S&P Global'
	},
	{
		value: 'Axis Bank'
	},
	{
		value: 'Samsung Fire & Marine'
	},
	{
		value: 'Carlsberg'
	},
	{
		value: 'Mega Financial Holding'
	},
	{
		value: 'China Reinsurance Group'
	},
	{
		value: 'Grupa PZU'
	},
	{
		value: 'Mapfre'
	},
	{
		value: 'Keyence'
	},
	{
		value: 'Raymond James Financial'
	},
	{
		value: 'Hikvision'
	},
	{
		value: 'Thomson Reuters'
	},
	{
		value: 'VF'
	},
	{
		value: 'Aptiv'
	},
	{
		value: 'Conagra Brands'
	},
	{
		value: 'T&D Holdings'
	},
	{
		value: 'Canadian Pacific Railway'
	},
	{
		value: 'Link REIT'
	},
	{
		value: 'CenturyLink'
	},
	{
		value: 'Siam Commercial Bank'
	},
	{
		value: 'OReilly Automotive'
	},
	{
		value: 'CenterPoint Energy'
	},
	{
		value: 'Wanhua Chemical Group'
	},
	{
		value: 'Corteva'
	},
	{
		value: 'Vestas Wind Systems'
	},
	{
		value: 'Guotai Junan Securities'
	},
	{
		value: 'Shengjing Bank'
	},
	{
		value: 'Huntington Bank'
	},
	{
		value: 'Bloise Group'
	},
	{
		value: 'Fortum'
	},
	{
		value: 'Vistra Energy'
	},
	{
		value: 'Roper Technologies'
	},
	{
		value: 'Otis Worldwide'
	},
	{
		value: 'Arch Capital Group'
	},
	{
		value: 'Shenzhen Overseas'
	},
	{
		value: 'CapitaLand'
	},
	{
		value: 'Rosseti'
	},
	{
		value: 'Infineon Technologies'
	},
	{
		value: 'Intuit'
	},
	{
		value: 'Formosa Chemicals'
	},
	{
		value: 'Kone'
	},
	{
		value: 'Unum'
	},
	{
		value: 'Wuliangye Yibin'
	},
	{
		value: 'Publicis Groupe'
	},
	{
		value: 'LG Electronics'
	},
	{
		value: 'Cheniere Energy'
	},
	{
		value: 'Huishang Bank'
	},
	{
		value: 'Logan Property Holdings'
	},
	{
		value: 'UPM-Kymmene'
	},
	{
		value: 'PKN Orlen'
	},
	{
		value: 'Abu Dhabi Commercial Bank'
	},
	{
		value: 'Suncorp Group'
	},
	{
		value: 'Zijin Mining Group'
	},
	{
		value: 'ZTE'
	},
	{
		value: 'Samba Financial Group'
	},
	{
		value: 'Telia'
	},
	{
		value: 'Kuehne & Nagel International'
	},
	{
		value: 'CP All'
	},
	{
		value: 'Teva Pharmaceutical'
	},
	{
		value: 'Voya Financial'
	},
	{
		value: 'TDK'
	},
	{
		value: 'DSM'
	},
	{
		value: 'China Coal Energy'
	},
	{
		value: 'George Weston'
	},
	{
		value: 'Bank Of Hangzhou'
	},
	{
		value: 'Absa Group'
	},
	{
		value: 'Inner Mongolia Yili'
	},
	{
		value: 'Secom'
	},
	{
		value: 'Pioneer Natural Resources'
	},
	{
		value: 'Hilton'
	},
	{
		value: 'Alexion Pharmaceuticals'
	},
	{
		value: 'Renault'
	},
	{
		value: 'Shin Kong Financial'
	},
	{
		value: 'Garanti Bank'
	},
	{
		value: 'Obayashi'
	},
	{
		value: 'Kuwait Finance House'
	},
	{
		value: 'Nan Ya Plastics'
	},
	{
		value: 'Ball'
	},
	{
		value: 'Deutsche Wohnen'
	},
	{
		value: 'Shaanxi Coal Industry'
	},
	{
		value: 'Meituan Dianping'
	},
	{
		value: 'Restaurant Brands International'
	},
	{
		value: 'Chunghwa Telecom'
	},
	{
		value: 'HCL Technologies'
	},
	{
		value: 'Ameren'
	},
	{
		value: 'Schindler Holding'
	},
	{
		value: 'Zoetis'
	},
	{
		value: 'Oneok'
	},
	{
		value: 'Saudi British Bank'
	},
	{
		value: 'Chongqing Rural Bank'
	},
	{
		value: 'Ryanair Holdings'
	},
	{
		value: 'BOE Technology Group'
	},
	{
		value: 'Idemitsu Kosan'
	},
	{
		value: 'Toshiba'
	},
	{
		value: 'Power Finance'
	},
	{
		value: 'Asr Nederland'
	},
	{
		value: 'STMicroelectronics'
	},
	{
		value: 'Assa Abloy'
	},
	{
		value: 'QBE Insurance Group'
	},
	{
		value: 'Equitable Holdings'
	},
	{
		value: 'Phoenix Group Holdings'
	},
	{
		value: 'CDW'
	},
	{
		value: 'Tata Steel'
	},
	{
		value: 'Hormel Foods'
	},
	{
		value: 'Toray Industries'
	},
	{
		value: 'Rakuten'
	},
	{
		value: 'BYD'
	},
	{
		value: 'Whirlpool'
	},
	{
		value: 'CMS Energy'
	},
	{
		value: 'Quanta Computer'
	},
	{
		value: 'Ko Holding'
	},
	{
		value: 'Banco de Sabadell'
	},
	{
		value: 'Formosa Plastics'
	},
	{
		value: 'Amphenol'
	},
	{
		value: 'Seagate Technology'
	},
	{
		value: 'OTP Bank'
	},
	{
		value: 'Luxshare Precision Industry'
	},
	{
		value: 'SVB Financial Group'
	},
	{
		value: 'Uni-President'
	},
	{
		value: 'Power Grid of India'
	},
	{
		value: 'Bank Leumi'
	},
	{
		value: 'DSV Panalpina'
	},
	{
		value: 'Hershey'
	},
	{
		value: 'Electronic Arts'
	},
	{
		value: 'Akbank'
	},
	{
		value: 'Hanwha'
	},
	{
		value: 'American Financial Group'
	},
	{
		value: 'Genuine Parts'
	},
	{
		value: 'Tripcom Group'
	},
	{
		value: 'Bangkok Bank'
	},
	{
		value: 'Bancolombia'
	},
	{
		value: 'United Rentals'
	},
	{
		value: 'China Gas Holdings'
	},
	{
		value: 'Global Payments'
	},
	{
		value: 'Fortive'
	},
	{
		value: 'Leonardo'
	},
	{
		value: 'China Jinmao'
	},
	{
		value: 'Equinix'
	},
	{
		value: 'Old Mutual'
	},
	{
		value: 'China Eastern Airlines'
	},
	{
		value: 'Freeport-McMoRan'
	},
	{
		value: 'Jinke Property Group'
	},
	{
		value: 'DaVita'
	},
	{
		value: 'Sandvik'
	},
	{
		value: 'MediaTek'
	},
	{
		value: 'China Gezhouba'
	},
	{
		value: 'RiseSun Real E Development'
	},
	{
		value: 'Intact Financial'
	},
	{
		value: 'Tohoku Electric Power'
	},
	{
		value: 'New Hope Liuhe'
	},
	{
		value: 'ASE Technology Holding'
	},
	{
		value: 'Towngas'
	},
	{
		value: 'Corning'
	},
	{
		value: 'T Rowe Price'
	},
	{
		value: 'Liberty Global'
	},
	{
		value: 'Snam'
	},
	{
		value: 'Equity Residential'
	},
	{
		value: 'Pembina Pipeline'
	},
	{
		value: 'Baker Hughes Company'
	},
	{
		value: 'NRG Energy'
	},
	{
		value: 'Sabanci Holding'
	},
	{
		value: 'NortonLifeLock'
	},
	{
		value: 'Shiseido'
	},
	{
		value: 'St Jamess Place'
	},
	{
		value: 'Sanlam'
	},
	{
		value: 'Vedanta Limited'
	},
	{
		value: 'China National Nuclear Power'
	},
	{
		value: 'Expedia Group'
	},
	{
		value: 'Taisei'
	},
	{
		value: 'TransDigm Group'
	},
	{
		value: 'Everest Re Group'
	},
	{
		value: 'Sumitomo Chemical'
	},
	{
		value: 'Aisin Seiki'
	},
	{
		value: 'IQVIA'
	},
	{
		value: 'Pegatron'
	},
	{
		value: 'ESun Financial'
	},
	{
		value: 'Guangzhou Automobile Group'
	},
	{
		value: 'CEZ Group'
	},
	{
		value: 'Wipro'
	},
	{
		value: 'Beiersdorf'
	},
	{
		value: 'Guangzhou Rural Commercial Bank'
	},
	{
		value: 'ITC'
	},
	{
		value: 'CIFI Holdings Group'
	},
	{
		value: 'China Southern Airlines'
	},
	{
		value: 'Yanzhou Coal Mining'
	},
	{
		value: 'Nedbank'
	},
	{
		value: 'E-Trade Financial'
	},
	{
		value: 'Motorola Solutions'
	},
	{
		value: 'Daiwa Securities'
	},
	{
		value: 'Vertex Pharmaceuticals'
	},
	{
		value: 'Gallagher'
	},
	{
		value: 'Moodys'
	},
	{
		value: 'Western Digital'
	},
	{
		value: 'GF Securities'
	},
	{
		value: 'Akzo Nobel'
	},
	{
		value: 'Rolls-Royce Holdings'
	},
	{
		value: 'Alleghany'
	},
	{
		value: 'WW Grainger'
	},
	{
		value: 'BAIC Motor'
	},
	{
		value: 'Shanghai International Port'
	},
	{
		value: 'Stora Enso'
	},
	{
		value: 'Fukuoka Financial Group'
	},
	{
		value: 'Constellation Brands'
	},
	{
		value: 'SK Innovation'
	},
	{
		value: 'Tokyo Gas'
	},
	{
		value: 'Kajima'
	},
	{
		value: 'Air Canada'
	},
	{
		value: 'Dubai Islamic Bank'
	},
	{
		value: 'Banque Saudi Fransi'
	},
	{
		value: 'Itasa'
	},
	{
		value: 'Lonza Group'
	},
	{
		value: 'BDO Unibank'
	},
	{
		value: 'Joint Stock Commercial Bank for Foreign Trade of Vietnam'
	},
	{
		value: 'Iliad'
	},
	{
		value: 'First Financial Holding'
	},
	{
		value: 'Banco BPM'
	},
	{
		value: 'Shimizu'
	},
	{
		value: 'Aena'
	},
	{
		value: 'Agile Group Holdings'
	},
	{
		value: 'Contemporary Amperex Technology'
	},
	{
		value: 'Isuzu Motors'
	},
	{
		value: 'Legrand'
	},
	{
		value: 'Digital Realty Trust'
	},
	{
		value: 'Mazda Motor'
	},
	{
		value: 'Scor'
	},
	{
		value: 'Japan Airlines'
	},
	{
		value: 'Bajaj Finserv'
	},
	{
		value: 'Cintas'
	},
	{
		value: 'Intuitive Surgical'
	},
	{
		value: 'Chugoku Electric Power'
	},
	{
		value: 'Altice USA'
	},
	{
		value: 'CGI Group'
	},
	{
		value: 'PKO Bank Polski'
	},
	{
		value: 'Grifols'
	},
	{
		value: 'Sika'
	},
	{
		value: 'Huaneng Power International'
	},
	{
		value: 'Japan Exchange Group'
	},
	{
		value: 'Suntory Beverage & Food'
	},
	{
		value: 'Muyuan Foodstuff'
	},
	{
		value: 'Hindalco Industries'
	},
	{
		value: 'Sharp'
	},
	{
		value: 'American Airlines Group'
	},
	{
		value: 'Amadeus IT Group'
	},
	{
		value: 'Molina Healthcare'
	},
	{
		value: 'Novolipetsk Steel'
	},
	{
		value: 'Hoya'
	},
	{
		value: 'Yara International'
	},
	{
		value: 'Qatar Islamic Bank'
	},
	{
		value: 'Galaxy Entertainment'
	},
	{
		value: 'Welltower'
	},
	{
		value: 'China Development Financial'
	},
	{
		value: 'Helvetia Holding'
	},
	{
		value: 'China Hongqiao Group'
	},
	{
		value: 'Tokyu'
	},
	{
		value: 'Adecco'
	},
	{
		value: 'Emaar Properties'
	},
	{
		value: 'KT'
	},
	{
		value: 'Public Storage'
	},
	{
		value: 'AvalonBay Communities'
	},
	{
		value: 'IHS Markit'
	},
	{
		value: 'Taiwan Cooperative Financial'
	},
	{
		value: 'PG&E'
	},
	{
		value: 'Toppan Printing'
	},
	{
		value: 'Mitsubishi UFJ Lease'
	},
	{
		value: 'Yum! Brands'
	},
	{
		value: 'Turkish Airlines'
	},
	{
		value: 'Amcor'
	},
	{
		value: 'Boston Properties'
	},
	{
		value: 'Osaka Gas'
	},
	{
		value: 'Financiere de lOdet'
	},
	{
		value: 'ENN Energy Holdings'
	},
	{
		value: 'Leidos'
	},
	{
		value: 'Vornado Realty'
	},
	{
		value: 'China Merchants Securities'
	},
	{
		value: 'Alcon'
	},
	{
		value: 'EN+ Group International'
	},
	{
		value: 'Thai Beverage'
	},
	{
		value: 'Gecina'
	},
	{
		value: 'VakifBank'
	},
	{
		value: 'Edwards Lifesciences'
	},
	{
		value: 'ATOS'
	},
	{
		value: 'Skanska'
	},
	{
		value: 'Shanghai Pharmaceuticals'
	},
	{
		value: 'American Water Works'
	},
	{
		value: 'Halliburton'
	},
	{
		value: 'China Life Insurance (Taiwan)'
	},
	{
		value: 'Arab National Bank'
	},
	{
		value: 'Randstad NV'
	},
	{
		value: 'KLA'
	},
	{
		value: 'Zhongsheng Group Holdings'
	},
	{
		value: 'Guosen Securities'
	},
	{
		value: 'Twitter'
	},
	{
		value: 'China Huarong Asset Management'
	},
	{
		value: 'Dassault Systemes'
	},
	{
		value: 'Polyus'
	},
	{
		value: 'Bank Hapoalim'
	},
	{
		value: 'Grupo Elektra'
	},
	{
		value: 'Finatis'
	},
	{
		value: 'NXP Semiconductors'
	},
	{
		value: 'Aroundtown'
	},
	{
		value: 'China Mengniu Dairy'
	},
	{
		value: 'Jiangsu Zhongnan Construction Group'
	},
	{
		value: 'Evergy'
	},
	{
		value: 'Givaudan'
	},
	{
		value: 'JM Smucker'
	},
	{
		value: 'iA Financial Corporation'
	},
	{
		value: 'WR Berkley'
	},
	{
		value: 'SMC'
	},
	{
		value: 'ThyssenKrupp Group'
	},
	{
		value: 'AMP'
	},
	{
		value: 'Tata Motors'
	},
	{
		value: 'Illumina'
	},
	{
		value: 'Advanced Micro Devices'
	},
	{
		value: 'Microchip Technology'
	},
	{
		value: 'Pan Pacific International Holdings'
	},
	{
		value: 'Shanghai Construction'
	},
	{
		value: 'China Resources Power'
	},
	{
		value: 'MOL Hungarian Oil'
	},
	{
		value: 'Clorox'
	},
	{
		value: 'Krung Thai Bank'
	},
	{
		value: 'Kerry Group'
	},
	{
		value: 'BBMG'
	},
	{
		value: 'Monster Beverage'
	},
	{
		value: 'HAL Trust'
	},
	{
		value: 'Severstal'
	},
	{
		value: 'Genworth Financial'
	},
	{
		value: 'Bank Negara Indonesia'
	},
	{
		value: 'Terumo'
	},
	{
		value: 'Bank of Greece'
	},
	{
		value: 'Eastman Chemical'
	},
	{
		value: 'Quest Diagnostics'
	},
	{
		value: 'J Sainsbury'
	},
	{
		value: 'Shanghai Electric Group'
	},
	{
		value: 'Grasim Industries'
	},
	{
		value: 'Eisai'
	},
	{
		value: 'Jefferies Financial'
	},
	{
		value: 'Bank of Baroda'
	},
	{
		value: 'Rockwell Automation'
	},
	{
		value: 'Ashtead Group'
	},
	{
		value: 'Jiangsu Hengrui Medicine'
	},
	{
		value: 'Rongsheng Petrochemical'
	},
	{
		value: 'Advanced Info Service'
	},
	{
		value: 'Tokyo Century'
	},
	{
		value: 'Align Technology'
	},
	{
		value: 'Charoen Pokphand Foods'
	},
	{
		value: 'Beijing Enterprises'
	},
	{
		value: 'Foshan Haitian Flavouring and Food'
	},
	{
		value: 'Yuanta Financial Holding'
	},
	{
		value: 'Mediobanca'
	},
	{
		value: 'Swatch Group'
	},
	{
		value: 'Julius Baer Group'
	},
	{
		value: 'Lundbergs'
	},
	{
		value: 'Hua Nan Financial'
	},
	{
		value: 'Paychex'
	},
	{
		value: 'Terna'
	},
	{
		value: 'Yango Group'
	},
	{
		value: 'GD Power Development'
	},
	{
		value: 'LabCorp'
	},
	{
		value: 'Sun Art Retail Group'
	},
	{
		value: 'Jeronimo Martins'
	},
	{
		value: 'Fanuc'
	},
	{
		value: 'Marvell Technology Group'
	},
	{
		value: 'China Resources Pharmaceutical Group'
	},
	{
		value: 'ServiceNow'
	},
	{
		value: 'Lear'
	},
	{
		value: 'Delta Electronics'
	},
	{
		value: 'Markel'
	},
	{
		value: 'TUI'
	},
	{
		value: 'Inter Rao'
	},
	{
		value: 'Air France-KLM'
	},
	{
		value: 'Falabella'
	},
	{
		value: 'SDIC Power Holdings'
	},
	{
		value: 'Hankyu Hanshin Holdings'
	},
	{
		value: 'Universal Health'
	},
	{
		value: 'Yum China Holdings'
	},
	{
		value: 'UCB'
	},
	{
		value: 'Metro'
	},
	{
		value: 'Mylan'
	},
	{
		value: 'PulteGroup'
	},
	{
		value: 'CJ Corporation'
	},
	{
		value: 'Investec'
	},
	{
		value: 'Knorr-Bremse'
	},
	{
		value: 'Sojitz'
	},
	{
		value: 'Vipshop Holdings'
	},
	{
		value: 'Altice Europe'
	},
	{
		value: 'Textron'
	},
	{
		value: 'Brown-Forman'
	},
	{
		value: 'Assurant'
	},
	{
		value: 'Ferrovial'
	},
	{
		value: 'JSW Steel'
	},
	{
		value: 'Olympus'
	},
	{
		value: 'Bank of Ireland'
	},
	{
		value: 'Lotte Chemical'
	},
	{
		value: 'LG Household & Health Care'
	},
	{
		value: 'AES'
	},
	{
		value: 'Bank Of Guiyang'
	},
	{
		value: 'Kyushu Electric Power'
	},
	{
		value: 'Alinma Bank'
	},
	{
		value: 'Crown Holdings'
	},
	{
		value: 'China Steel'
	},
	{
		value: 'Cadence Design'
	},
	{
		value: 'Kohls'
	},
	{
		value: 'Bank of Tianjin'
	},
	{
		value: 'Shenzhen Mindray Bio-Medical Electronics'
	},
	{
		value: 'Vienna Insurance Group'
	},
	{
		value: 'Agilent Technologies'
	},
	{
		value: 'Cosco Shipping'
	},
	{
		value: 'Airports of Thailand'
	},
	{
		value: 'Jiangsu Yanghe Brewery'
	},
	{
		value: 'Fastenal'
	},
	{
		value: 'All Nippon Airways'
	},
	{
		value: 'Attijariwafa Bank'
	},
	{
		value: 'X5 Retail Group'
	},
	{
		value: 'SGS'
	},
	{
		value: 'LG'
	},
	{
		value: 'CH Robinson'
	},
	{
		value: 'Dover'
	},
	{
		value: 'Csc Financial'
	},
	{
		value: 'Interpublic Group'
	},
	{
		value: 'Dassault Aviation'
	},
	{
		value: 'NVR'
	},
	{
		value: 'Origin Energy'
	},
	{
		value: 'Ferrari'
	},
	{
		value: 'Waste Connections'
	},
	{
		value: 'Bio-Rad Laboratories'
	},
	{
		value: 'China Aoyuan Group'
	},
	{
		value: 'FleetCor Technologies'
	},
	{
		value: 'Comerica'
	},
	{
		value: 'Singapore Airlines'
	},
	{
		value: 'Experian'
	},
	{
		value: 'Kaisa Group Holdings'
	},
	{
		value: 'Molson Coors Brewing'
	},
	{
		value: 'AerCap Holdings'
	},
	{
		value: 'Inner Mongolia Baotou Steel'
	},
	{
		value: 'Ametek'
	},
	{
		value: 'Shionogi'
	},
	{
		value: 'NASDAQ'
	},
	{
		value: 'Shenwan Hongyuan Group'
	},
	{
		value: 'Bank of Changsha'
	},
	{
		value: 'Techtronic Industries'
	},
	{
		value: 'Huadian Power International'
	},
	{
		value: 'Aluminum Corp of China'
	},
	{
		value: 'Korea Gas'
	},
	{
		value: 'Top Frontier Investment Holdings'
	},
	{
		value: 'Bank Of Chengdu'
	},
	{
		value: 'Mitsubishi Motors'
	},
	{
		value: 'Scentre Group'
	},
	{
		value: 'Partners Group Holding'
	},
	{
		value: 'LKQ'
	},
	{
		value: 'VeriSign'
	},
	{
		value: 'Ulta Beauty'
	},
	{
		value: 'Globe Life'
	},
	{
		value: 'Brighthouse Financial'
	},
	{
		value: 'Longi Green Energy Technology'
	},
	{
		value: 'LARGAN Precision'
	},
	{
		value: 'Campbell Soup'
	},
	{
		value: 'McCormick'
	},
	{
		value: 'Anta Sports Products'
	},
	{
		value: 'MTN '
	},
	{
		value: 'Solvay'
	},
	{
		value: 'Nitori Holdings'
	},
	{
		value: 'Schroders'
	},
	{
		value: 'Mondi'
	},
	{
		value: 'HollyFrontier'
	},
	{
		value: 'GS Holdings'
	},
	{
		value: 'Quilter'
	},
	{
		value: 'Ricoh'
	},
	{
		value: 'China International Capital'
	},
	{
		value: 'Galp Energia'
	},
	{
		value: 'Centrica'
	},
	{
		value: 'Punjab National Bank'
	},
	{
		value: 'Yamaha Motor'
	},
	{
		value: 'Db Insurance'
	},
	{
		value: 'Franklin Resources'
	},
	{
		value: 'Expeditors International'
	},
	{
		value: 'Wolters Kluwer'
	},
	{
		value: 'Xilinx'
	},
	{
		value: 'Oriental Land'
	},
	{
		value: 'Goodman Group'
	},
	{
		value: 'Tractor Supply'
	},
	{
		value: 'Oji Holdings'
	},
	{
		value: 'Invesco'
	},
	{
		value: 'Lululemon Athletica'
	},
	{
		value: 'Samsung SDI'
	},
	{
		value: 'Zhongliang Holdings'
	},
	{
		value: 'Bankinter'
	},
	{
		value: 'Meiji Holdings'
	},
	{
		value: 'Hesteel'
	},
	{
		value: 'Coloplast'
	},
	{
		value: 'KWG Group Holdings'
	},
	{
		value: 'DXC Technology'
	},
	{
		value: 'Jiangxi Copper'
	},
	{
		value: 'China Resources Gas Group'
	},
	{
		value: 'Darden Restaurants'
	},
	{
		value: 'Aeroports de Paris'
	},
	{
		value: 'Garmin'
	},
	{
		value: 'Hydro One'
	},
	{
		value: 'Datang International Power'
	},
	{
		value: 'Daito Trust Construction'
	},
	{
		value: 'LG Display'
	},
	{
		value: 'Howmet Aerospace'
	},
	{
		value: 'Storebrand'
	},
	{
		value: 'Valeo'
	},
	{
		value: 'AntarChile'
	},
	{
		value: 'Bunge'
	},
	{
		value: 'Segro'
	},
	{
		value: 'NEXON'
	},
	{
		value: 'Ayala Corp'
	},
	{
		value: 'Skyworks Solutions'
	},
	{
		value: '360 Security Technology'
	},
	{
		value: 'Canara Bank'
	},
	{
		value: 'Arista Networks'
	},
	{
		value: 'Naver'
	},
	{
		value: 'Saputo'
	},
	{
		value: 'Shanghai Commercial & Savings Bank'
	},
	{
		value: 'Bankia'
	},
	{
		value: 'Insurance Australia Group'
	},
	{
		value: 'Ahli United Bank'
	},
	{
		value: 'Transurban Group'
	},
	{
		value: 'Olam International'
	},
	{
		value: 'Halkbank'
	},
	{
		value: 'Mohawk Industries'
	},
	{
		value: 'Hexagon'
	},
	{
		value: 'AGC'
	},
	{
		value: 'JB Hunt Transport Services'
	},
	{
		value: 'Zions Bancorp'
	},
	{
		value: 'Hess'
	},
	{
		value: 'Power Assets Holdings'
	},
	{
		value: 'Jones Lang LaSalle'
	},
	{
		value: 'OMRON'
	},
	{
		value: 'GAIL India'
	},
	{
		value: 'Annaly Capital Management'
	},
	{
		value: 'HNA Technology'
	},
	{
		value: 'Masraf Al Rayan'
	},
	{
		value: 'Realty Income'
	},
	{
		value: 'KPN'
	},
	{
		value: 'Wuchan Zhongda Group'
	},
	{
		value: 'Midea Real E Holding'
	},
	{
		value: 'Sasol'
	},
	{
		value: 'Cosmo Energy Holdings'
	},
	{
		value: 'Citrix Systems'
	},
	{
		value: 'Copart'
	},
	{
		value: 'Cerner'
	},
	{
		value: 'Wm Morrison Supermarkets'
	},
	{
		value: 'Umicore'
	},
	{
		value: 'Brenntag'
	},
	{
		value: 'Metro Group'
	},
	{
		value: 'Check Point Software'
	},
	{
		value: 'Banca Mediolanum'
	},
	{
		value: 'Kintetsu'
	},
	{
		value: 'Hyundai Steel'
	},
	{
		value: 'Bank of Jinzhou'
	},
	{
		value: 'Popular'
	},
	{
		value: 'Yonghui Superstores'
	},
	{
		value: 'China Galaxy Securities'
	},
	{
		value: 'Shenzhou International Group Holdings'
	},
	{
		value: 'Fidelity National Financial'
	},
	{
		value: 'NetApp'
	},
	{
		value: 'Hyundai Marine & Fire'
	},
	{
		value: 'Emera'
	},
	{
		value: '3i Group'
	},
	{
		value: 'Lotte Shopping'
	},
	{
		value: 'Melrose Industries'
	},
	{
		value: 'Bank of Chongqing'
	},
	{
		value: 'Mahindra & Mahindra'
	},
	{
		value: 'TCL'
	},
	{
		value: 'Korea Investment Holdings'
	},
	{
		value: 'BCI-Banco Credito'
	},
	{
		value: 'RHB Bank'
	},
	{
		value: 'ALFA'
	},
	{
		value: 'Unicharm'
	},
	{
		value: 'Maxim Integrated Products'
	},
	{
		value: 'Shinsei Bank'
	},
	{
		value: 'Signature Bank'
	},
	{
		value: 'Penske Automotive'
	},
	{
		value: 'Concordia Financial Group'
	},
	{
		value: 'Hyundai Heavy Industries Holdings'
	},
	{
		value: 'MSCI'
	},
	{
		value: 'Chiba Bank'
	},
	{
		value: 'Jiangsu Zhangjiagang Rural Commercial Bank'
	},
	{
		value: 'Verbund'
	},
	{
		value: 'Keysight Technologies'
	},
	{
		value: 'Ventas'
	},
	{
		value: 'Samsung SDS'
	},
	{
		value: 'Harbin Bank'
	},
	{
		value: 'Hopson Development Holdings'
	},
	{
		value: 'Mirae Asset Daewoo'
	},
	{
		value: 'SYNNEX'
	},
	{
		value: 'Westinghouse Air Brake Technologies'
	},
	{
		value: 'Church & Dwight'
	},
	{
		value: 'Luzhou Lao Jiao'
	},
	{
		value: 'Alliant Energy'
	},
	{
		value: 'Tenet Healthcare'
	},
	{
		value: 'Mizrahi Tefahot Bank'
	},
	{
		value: 'Sunny Optical Technology Group'
	},
	{
		value: 'Schaeffler'
	},
	{
		value: 'China Shipbuilding Industry'
	},
	{
		value: 'Smith & Nephew'
	},
	{
		value: 'Tingyi Holding'
	},
	{
		value: 'CJ Cheiljedang'
	},
	{
		value: 'Cemex'
	},
	{
		value: 'Woodside Petroleum'
	},
	{
		value: 'Spotify Technology'
	},
	{
		value: 'Bandai Namco Holdings'
	},
	{
		value: 'Doosan'
	},
	{
		value: 'Qantas Airways'
	},
	{
		value: 'Quinenco'
	},
	{
		value: 'Times Property Holdings'
	},
	{
		value: 'East West Bancorp'
	},
	{
		value: 'Starwood Property Trust'
	},
	{
		value: 'Ooredoo QPSC'
	},
	{
		value: 'Peoples United Financial'
	},
	{
		value: 'RenaissanceRe Holdings'
	},
	{
		value: 'Dentsu'
	},
	{
		value: 'Banco Btg Pactual'
	},
	{
		value: 'Bombardier'
	},
	{
		value: 'Celanese'
	},
	{
		value: 'Yunnan Baiyao Group'
	},
	{
		value: 'Zhongyuan Bank'
	},
	{
		value: 'AGL Energy'
	},
	{
		value: 'Jacobs Engineering'
	},
	{
		value: 'Cathay Pacific Airways'
	},
	{
		value: 'Bank of India'
	},
	{
		value: 'Hunan Valin Steel'
	},
	{
		value: 'Bausch Health Companies'
	},
	{
		value: 'Keppel'
	},
	{
		value: 'Greentown China Holdings'
	},
	{
		value: 'Cincinnati Financial'
	},
	{
		value: 'IndusInd Bank'
	},
	{
		value: 'BorgWarner'
	},
	{
		value: 'Host Hotels & Resorts'
	},
	{
		value: 'Canadian Tire'
	},
	{
		value: 'Geberit'
	},
	{
		value: 'Bank Pekao'
	},
	{
		value: 'YPF'
	},
	{
		value: 'Weyerhaeuser'
	},
	{
		value: 'Covivio'
	},
	{
		value: 'Old Dominion Freight Line'
	},
	{
		value: 'Wuestenrot & Wuerttembergische'
	},
	{
		value: 'Kobe Steel'
	},
	{
		value: 'SG Holdings'
	},
	{
		value: 'Ronshine China Holdings'
	},
	{
		value: 'Migdal Insurance'
	},
	{
		value: 'Packaging Corp of America'
	},
	{
		value: 'B3'
	},
	{
		value: 'Match Group'
	},
	{
		value: 'Smurfit Kappa Group'
	},
	{
		value: 'Red Elctrica'
	},
	{
		value: 'VEON'
	},
	{
		value: 'Coca-Cola HBC'
	},
	{
		value: 'Fastighets Balder'
	},
	{
		value: 'Bank of Zhengzhou'
	},
	{
		value: 'SLM'
	},
	{
		value: 'Mebuki Financial Group'
	},
	{
		value: 'Tech Data'
	},
	{
		value: 'China Feihe'
	},
	{
		value: 'Aramark'
	},
	{
		value: 'Meritz Financial Group'
	},
	{
		value: 'Suzano Papel e Celulose'
	},
	{
		value: 'Israel Discount Bank'
	},
	{
		value: 'ResMed'
	},
	{
		value: 'China Grand Automotive Services'
	},
	{
		value: 'JG Summit Holdings'
	},
	{
		value: 'Henry Schein'
	},
	{
		value: 'Arkema'
	},
	{
		value: 'Advance Auto Parts'
	},
	{
		value: 'Norwegian Cruise Line Holdings'
	},
	{
		value: 'Bank of Guizhou'
	},
	{
		value: 'Burlington Stores'
	},
	{
		value: 'Great Wall Motor'
	},
	{
		value: 'Vulcan Materials'
	},
	{
		value: 'Alaska Air Group'
	},
	{
		value: 'Chow Tai Fook Jewellery'
	},
	{
		value: 'Hang Lung Group'
	},
	{
		value: 'Iida Group Holdings'
	},
	{
		value: 'Meritz Securities'
	},
	{
		value: 'XPO Logistics'
	},
	{
		value: 'Chang Hwa Bank'
	},
	{
		value: 'Cencosud'
	},
	{
		value: 'Nomura Research Institute'
	},
	{
		value: 'Huntington Ingalls Industries'
	},
	{
		value: 'ICA Gruppen'
	},
	{
		value: 'Zain'
	},
	{
		value: 'Cenovus Energy'
	},
	{
		value: 'Synopsys'
	},
	{
		value: 'Sistema'
	},
	{
		value: 'Medipal Holdings'
	},
	{
		value: 'Alstom'
	},
	{
		value: 'Banque Cantonale Vaudoise'
	},
	{
		value: 'Avery Dennison'
	},
	{
		value: 'China National Chemical'
	},
	{
		value: 'Hyundai Engineering'
	},
	{
		value: 'BNK Financial Group'
	},
	{
		value: 'Covestro'
	},
	{
		value: 'RSA Insurance Group'
	},
	{
		value: 'Bunzl'
	},
	{
		value: 'China Resources Cement Holdings'
	},
	{
		value: 'Shanghai International Airport'
	},
	{
		value: 'Mettler-Toledo International'
	},
	{
		value: 'SS&C Technologies'
	},
	{
		value: 'Taishin Financial Holdings'
	},
	{
		value: 'Beijing Capital Development'
	},
	{
		value: 'Lixil Group'
	},
	{
		value: 'AGNC Investment'
	},
	{
		value: 'Far East Horizon'
	},
	{
		value: 'LEG Immobilien AG'
	},
	{
		value: 'Nippon Paint'
	},
	{
		value: 'New Residential Investment'
	},
	{
		value: 'Grupo Bimbo'
	},
	{
		value: 'Sino-Ocean Group Holding'
	},
	{
		value: 'Sumitomo Metal Mining'
	},
	{
		value: 'Lindt & Sprungli'
	},
	{
		value: 'Bawag Group'
	},
	{
		value: 'SCA'
	},
	{
		value: 'Verisk Analytics'
	},
	{
		value: 'Masco'
	},
	{
		value: 'Husky Energy'
	},
	{
		value: 'Alexandria Real E Equities'
	},
	{
		value: 'BPER Banca'
	},
	{
		value: 'S-Oil'
	},
	{
		value: 'Guangdong Investment'
	},
	{
		value: 'Commercial Bank For Investment & Development Of Vietnam'
	},
	{
		value: 'Arrow Electronics'
	},
	{
		value: 'AutoNation'
	},
	{
		value: 'Caesars Entertainment'
	},
	{
		value: 'NiSource'
	},
	{
		value: 'Metropolitan Bank & Trust'
	},
	{
		value: 'Bank of East Asia'
	},
	{
		value: 'Western Union'
	},
	{
		value: 'Atmos Energy'
	},
	{
		value: 'Commercial International Bank'
	},
	{
		value: 'Persimmon'
	},
	{
		value: 'Norsk Hydro'
	},
	{
		value: 'GCI Liberty'
	},
	{
		value: 'KION Group'
	},
	{
		value: 'STRABAG'
	},
	{
		value: 'China Molybdenum'
	},
	{
		value: 'Sofina'
	},
	{
		value: 'Halyk Bank'
	},
	{
		value: 'Arab Bank'
	},
	{
		value: 'Barratt Developments'
	},
	{
		value: 'Zhejiang Zheneng Electric Power'
	},
	{
		value: 'Hong Leong Financial'
	},
	{
		value: 'Colruyt'
	},
	{
		value: 'Shizuoka Bank'
	},
	{
		value: 'Abu Dhabi Islamic Bank'
	},
	{
		value: 'Arca Continental'
	},
	{
		value: 'Cattolica Assicurazioni'
	},
	{
		value: 'Yuexiu Property'
	},
	{
		value: 'SKF Group'
	},
	{
		value: 'iHeartMedia'
	},
	{
		value: 'Navient'
	},
	{
		value: 'Teleflex'
	},
	{
		value: 'Korea Shipbuilding & Offshore Engineering'
	},
	{
		value: 'Weatherford International'
	},
	{
		value: 'Ansys'
	},
	{
		value: 'Sun Pharma Industries'
	},
	{
		value: 'China International Marine'
	},
	{
		value: 'IDEXX Laboratories'
	},
	{
		value: 'NARI Technology Development'
	},
	{
		value: 'Empire'
	},
	{
		value: 'China Communications Services'
	},
	{
		value: 'Onex'
	},
	{
		value: 'Nordstrom'
	},
	{
		value: 'Synovus Financial'
	},
	{
		value: 'Kerry Properties'
	},
	{
		value: 'Pinnacle West'
	},
	{
		value: 'UBI Banca'
	},
	{
		value: 'Hainan Airlines'
	},
	{
		value: 'Nippon Yusen'
	},
	{
		value: 'Tiffany & Co'
	},
	{
		value: 'Hologic'
	},
	{
		value: 'AECOM Technology'
	},
	{
		value: 'China Conch Venture Holdings'
	},
	{
		value: 'Mashreq Bank'
	},
	{
		value: 'Bank Audi'
	},
	{
		value: 'E-mart'
	},
	{
		value: 'Teleperformance'
	},
	{
		value: 'Ajinomoto'
	},
	{
		value: 'International Flavors & Fragrances'
	},
	{
		value: 'Xerox'
	},
	{
		value: 'Electric Power Development'
	},
	{
		value: 'Saudi Arabian Mining'
	},
	{
		value: 'Kawasaki Heavy Industries'
	},
	{
		value: 'Union Bank of India'
	},
	{
		value: 'Newcrest Mining'
	},
	{
		value: 'China Merchants Port Holdings'
	},
	{
		value: 'Reliance Steel'
	},
	{
		value: 'Incyte'
	},
	{
		value: 'Gudang Garam'
	},
	{
		value: 'Ceconomy'
	},
	{
		value: 'China International Travel Service'
	},
	{
		value: 'Shopify'
	},
	{
		value: 'Chipotle Mexican Grill'
	},
	{
		value: 'OneMain Holdings'
	},
	{
		value: 'AIB Group'
	},
	{
		value: 'Live Nation Entertainment'
	},
	{
		value: 'DCC'
	},
	{
		value: 'EMS-Chemie Holding'
	},
	{
		value: 'Shimano'
	},
	{
		value: 'Steel Dynamics'
	},
	{
		value: 'Technipfmc'
	},
	{
		value: 'Xiamen International Trade Group'
	},
	{
		value: 'Ternium'
	},
	{
		value: 'Bajaj Auto'
	},
	{
		value: 'US Foods'
	},
	{
		value: 'Dai Nippon Printing'
	},
	{
		value: 'Vingroup'
	},
	{
		value: 'Epiroc'
	},
	{
		value: 'Magnitogorsk Iron & Steel'
	},
	{
		value: 'Magnit'
	},
	{
		value: 'Santos'
	},
	{
		value: 'Booz Allen Hamilton Holding'
	},
	{
		value: 'Flex'
	},
	{
		value: 'Sekisui Chemical'
	},
	{
		value: 'Akamai Technologies'
	},
	{
		value: 'CPFL Energia'
	},
	{
		value: 'Manpower'
	},
	{
		value: 'Kansas City Southern'
	},
	{
		value: 'Enstar Group'
	},
	{
		value: 'Petronas Chemicals'
	},
	{
		value: 'Square'
	},
	{
		value: 'Wayfair'
	},
	{
		value: 'Martin Marietta Materials'
	},
	{
		value: 'American National Insurance'
	},
	{
		value: 'Essex Property Trust'
	},
	{
		value: 'Sonova Holding'
	},
	{
		value: 'Grupo Inbursa'
	},
	{
		value: 'Korean Air'
	},
	{
		value: 'Mitsubishi Materials'
	},
	{
		value: 'Antofagasta'
	},
	{
		value: 'Compal Electronics'
	},
	{
		value: 'Blom Bank'
	},
	{
		value: 'Safaricom'
	},
	{
		value: 'Johnson Matthey'
	},
	{
		value: 'Fgl Holdings'
	},
	{
		value: 'KT&G'
	},
	{
		value: 'Next'
	},
	{
		value: 'BOK Financial'
	},
	{
		value: 'Voestalpine'
	},
	{
		value: 'Sichuan Language Development'
	},
	{
		value: 'Wendel'
	},
	{
		value: 'Banca MPS'
	},
	{
		value: 'SinoPac Financial'
	},
	{
		value: 'Jabil Circuit'
	},
	{
		value: 'AVIC Capita'
	},
	{
		value: 'PTT Global Chemical'
	},
	{
		value: 'Xiamen Xiangyu'
	},
	{
		value: 'Commercial Bank of Qatar'
	},
	{
		value: 'Barry Callebaut'
	},
	{
		value: 'IAC/InterActiveCorp'
	},
	{
		value: 'NH Investment & Securities'
	},
	{
		value: 'Industries Qatar'
	},
	{
		value: 'Jyske Bank'
	},
	{
		value: 'Mercuries & Associates'
	},
	{
		value: 'Alfresa Holdings'
	},
	{
		value: 'Hertz Global Holdings'
	},
	{
		value: 'Hokuhoku Financial Group'
	},
	{
		value: 'Hyundai Glovis'
	},
	{
		value: 'Ramsay Health Care'
	},
	{
		value: 'Autodesk'
	},
	{
		value: 'INTL FCStone'
	},
	{
		value: 'ONO Pharmaceutical'
	},
	{
		value: 'President Chain Store'
	},
	{
		value: 'Lendlease Group'
	},
	{
		value: 'Wirecard'
	},
	{
		value: 'CSPC Pharmaceutical Group'
	},
	{
		value: 'World Fuel Services'
	},
	{
		value: 'Vietin Bank'
	},
	{
		value: 'Asian Paints'
	},
	{
		value: 'Goodyear'
	},
	{
		value: 'Mitsui Chemicals'
	},
	{
		value: 'Atlassian'
	},
	{
		value: 'RTL Group'
	},
	{
		value: 'Qurate Retail Group'
	},
	{
		value: 'Zoom Video Communications'
	},
	{
		value: 'Yamato Holdings'
	},
	{
		value: 'Novozymes'
	},
	{
		value: 'Dexus'
	},
	{
		value: 'Virgin Money UK'
	},
	{
		value: 'Cooper Companies'
	},
	{
		value: 'Gap'
	},
	{
		value: 'New York Community Bancorp'
	},
	{
		value: 'Canadian Utilities'
	},
	{
		value: 'Nippon Express'
	},
	{
		value: 'Workday'
	},
	{
		value: 'Otsuka'
	},
	{
		value: 'Koito Manufacturing'
	},
	{
		value: 'Taiwan Cement'
	},
	{
		value: 'Teck Resources'
	},
	{
		value: 'Hansoh Pharmaceutical Group'
	},
	{
		value: 'Almarai'
	},
	{
		value: 'Agnico Eagle Mines'
	},
	{
		value: 'Showa Denko'
	},
	{
		value: 'Cellnex Telecom'
	},
	{
		value: 'Qingdao Rural Commercial Bank'
	},
	{
		value: 'Braskem'
	},
	{
		value: 'Continental Resources'
	},
	{
		value: 'Avis Budget Group'
	},
	{
		value: 'Kyushu Financial Group'
	},
	{
		value: 'Nishi-nippon Financial Holdings'
	},
	{
		value: 'Hachijuni Bank'
	},
	{
		value: 'Zoomlion Heavy Industry'
	},
	{
		value: 'SBA Communications'
	},
	{
		value: 'Hulic'
	},
	{
		value: 'Waters'
	},
	{
		value: 'Yamaguchi Financial'
	},
	{
		value: 'Wistron'
	},
	{
		value: 'Hengyi Petrochemical'
	},
	{
		value: 'Latam Airlines'
	},
	{
		value: 'Kesko'
	},
	{
		value: 'Hengan International Group'
	},
	{
		value: 'Wingtech Technology'
	},
	{
		value: 'Franco-Nevada'
	},
	{
		value: 'North Pacific Bank'
	},
	{
		value: 'Banco Comercial Portugues'
	},
	{
		value: 'Kingfisher'
	},
	{
		value: 'Banco Davivienda'
	},
	{
		value: 'DexCom'
	},
	{
		value: 'Japan Securities'
	},
	{
		value: 'Acciona'
	},
	{
		value: 'China Longyuan Power'
	},
	{
		value: 'Pinduoduo'
	},
	{
		value: 'Adyen'
	},
	{
		value: 'Bank of Kyoto'
	},
	{
		value: 'Mitsui OSK Lines'
	},
	{
		value: 'Hiroshima Bank'
	},
	{
		value: 'WEG'
	},
	{
		value: 'Rajesh Exports'
	},
	{
		value: 'Sino Biopharmaceutical'
	},
	{
		value: 'Lundin Energy'
	},
	{
		value: 'MercadoLibre'
	},
	{
		value: 'Taylor Wimpey'
	},
	{
		value: 'Renesas Electronics'
	},
	{
		value: 'Hotai Motor'
	},
	{
		value: 'Daishi Hokuetsu Financial Group'
	},
	{
		value: 'Kinross Gold'
	},
	{
		value: 'Unisplendour'
	},
	{
		value: 'Veeva Systems'
	},
	{
		value: 'Tahoe Group'
	},
	{
		value: 'PGE Polska Grupa Energetyczna'
	},
	{
		value: 'Steinhoff International'
	},
	{
		value: 'Beijing Shougang'
	},
	{
		value: 'Teradyne'
	},
	{
		value: 'United Natural Foods,'
	},
	{
		value: 'PBF Energy'
	},
	{
		value: 'Zalando'
	},
	{
		value: 'Chugoku Bank'
	},
	{
		value: 'LG Uplus'
	},
	{
		value: 'Royal Mail'
	},
	{
		value: '77 Bank'
	},
	{
		value: 'Shandong Gold Mining'
	},
	{
		value: 'Powerlong Real E'
	},
	{
		value: 'Cemig'
	},
	{
		value: 'Gunma Bank'
	},
	{
		value: 'Invitation Homes'
	},
	{
		value: 'Berry Global Group'
	},
	{
		value: 'China Development Bank Financial Leasing'
	},
	{
		value: 'Genting'
	},
	{
		value: 'Nippon Steel Trading'
	},
	{
		value: 'FMC'
	},
	{
		value: 'Interactive Brokers Group'
	},
	{
		value: 'Tenneco'
	},
	{
		value: 'Tokyu Fudosan'
	},
	{
		value: 'Haidilao International Holding'
	},
	{
		value: 'Performance Food Group'
	},
	{
		value: 'Dominos Pizza'
	},
	{
		value: 'Ultrapar Participacoes'
	},
	{
		value: 'Hubei Biocause Pharmaceutical'
	},
	{
		value: 'Snap'
	},
	{
		value: 'Eurobank Ergasias'
	},
	{
		value: 'Companhia Brasileira de Distribuicao'
	},
	{
		value: 'Fibra Uno'
	},
	{
		value: 'First Citizens Bank'
	},
	{
		value: 'Pgnig Group'
	},
	{
		value: 'National Bank of Greece'
	},
	{
		value: 'Zebra Technologies'
	},
	{
		value: 'Tsim Sha Tsui Properties'
	},
	{
		value: 'Vodafone Idea'
	},
	{
		value: 'Alpha Bank'
	},
	{
		value: 'Community Health Systems'
	},
	{
		value: 'Rite Aid'
	},
	{
		value: 'Xylem'
	},
	{
		value: 'IHI'
	},
	{
		value: 'M3'
	},
	{
		value: 'Bank Muscat'
	},
	{
		value: 'Accor'
	},
	{
		value: 'American Equity Investment'
	},
	{
		value: 'Iyo Bank'
	},
	{
		value: 'Lens Technology'
	},
	{
		value: 'TP ICAP'
	},
	{
		value: 'Piraeus Bank'
	},
	{
		value: 'XCMG Construction Machinery'
	},
	{
		value: 'Air Lease'
	},
	{
		value: 'Commerce Bank'
	},
	{
		value: 'CoStar Group'
	},
	{
		value: 'Grupo Bolivar'
	},
	{
		value: 'Bank of Suzhou'
	},
	{
		value: 'Seattle Genetics'
	},
	{
		value: 'Sinotruk Hong Kong'
	},
	{
		value: 'Harel Insurance Investments & Financial Services'
	},
	{
		value: 'Avary Holding (Shenzhen)'
	},
	{
		value: 'Liberty Broadband'
	},
	{
		value: 'Jiangxi Bank'
	},
	{
		value: 'Unibail-Rodamco'
	},
	{
		value: 'CPI Property Group'
	},
	{
		value: 'Daelim Industrial'
	},
	{
		value: 'Moscow Exchange'
	},
	{
		value: 'Minebea'
	},
	{
		value: 'PVH'
	},
	{
		value: 'News Corp'
	},
	{
		value: 'Brambles'
	},
	{
		value: 'JetBlue Airways'
	},
	{
		value: 'SDIC Capital'
	},
	{
		value: 'Haseko'
	},
	{
		value: 'Deutsche Pfandbriefbank'
	},
	{
		value: 'Western Alliance Bancorp'
	},
	{
		value: 'Celltrion'
	},
	{
		value: 'Unicaja Banco'
	},
	{
		value: 'Wuxi Apptec'
	},
	{
		value: 'Aristocrat Leisure'
	},
	{
		value: 'Bank of Xian'
	},
	{
		value: 'China Aviation Oil'
	},
	{
		value: 'Alrosa'
	},
	{
		value: 'SBI Holdings'
	},
	{
		value: 'Suzuken'
	},
	{
		value: 'Will Semiconductor'
	},
	{
		value: 'Adani Ports & Special Economic Zone'
	},
	{
		value: 'Broadridge Financial'
	},
	{
		value: 'Momentum Metropolitan Holdings'
	},
	{
		value: 'DGB Financial Group'
	},
	{
		value: 'Mercantil Servicios'
	},
	{
		value: 'Offcn Education Technology'
	},
	{
		value: 'Bangkok Dusit Medical Services'
	},
	{
		value: 'Huafa Industrial'
	},
	{
		value: 'Huaibei Mining Holdings'
	},
	{
		value: 'Aeroflot-Russian Airlines'
	},
	{
		value: 'Inchcape'
	},
	{
		value: 'Splunk'
	},
	{
		value: 'El Puerto de Liverpool'
	},
	{
		value: 'Hyakugo Bank'
	},
	{
		value: 'VICI Properties'
	},
	{
		value: 'BayWa'
	},
	{
		value: 'Constellation Software'
	},
	{
		value: 'Nitto Denko'
	},
	{
		value: 'Ares Capital'
	},
	{
		value: 'Juroku Bank'
	},
	{
		value: 'Hakuhodo DY Holdings'
	},
	{
		value: 'Tosoh'
	},
	{
		value: 'CIT Group'
	},
	{
		value: 'Bank of Qingdao'
	},
	{
		value: 'Bohai Leasing'
	},
	{
		value: 'Quanta Services'
	},
	{
		value: 'Taiwan Business Bank'
	},
	{
		value: 'Hikari Tsushin'
	},
	{
		value: 'Mosaic'
	},
	{
		value: 'Shiga Bank'
	},
	{
		value: 'Targa Resources'
	},
	{
		value: 'TMB Bank'
	},
	{
		value: 'CNO Financial Group'
	},
	{
		value: 'Avnet'
	},
	{
		value: 'Wynn Resorts'
	},
	{
		value: 'Steel Authority of India'
	},
	{
		value: 'Axiata Group'
	},
	{
		value: 'First Pacific'
	},
	{
		value: 'Far Eastern New Century'
	},
	{
		value: 'San-In Godo Bank'
	},
	{
		value: 'Chongqing Zhifei Biological Products'
	},
	{
		value: 'Hanwa'
	},
	{
		value: 'Red Star Macalline Group'
	},
	{
		value: 'Uniqa'
	},
	{
		value: 'Aozora Bank'
	},
	{
		value: 'Ogaki Kyoritsu Bank'
	},
	{
		value: 'FinecoBank'
	},
	{
		value: 'Kirkland Lake Gold'
	},
	{
		value: 'Rexel'
	},
	{
		value: 'Banco BBVA Peru'
	},
	{
		value: 'Swiss Prime Site'
	},
	{
		value: 'Toho Bank'
	},
	{
		value: 'Avenue Supermarts'
	},
	{
		value: 'AmBank Group'
	},
	{
		value: 'First Horizon National'
	},
	{
		value: 'Want Want China'
	},
	{
		value: 'Nanto Bank'
	},
	{
		value: 'Ralph Lauren'
	},
	{
		value: 'Tenaris'
	},
	{
		value: 'Banque Centrale Populaire'
	},
	{
		value: 'Credito Emiliano'
	},
	{
		value: 'Advantest'
	},
	{
		value: 'UGI'
	},
	{
		value: 'Angang Steel'
	},
	{
		value: 'RingCentral'
	},
	{
		value: 'Bendigo & Adelaide Bank'
	},
	{
		value: 'Nine Dragons Paper Holdings'
	},
	{
		value: 'Wuxi Biologics'
	},
	{
		value: 'Mowi ASA'
	},
	{
		value: 'Tech Mahindra'
	},
	{
		value: 'WPG Holdings'
	},
	{
		value: 'Bank of Jiujiang'
	},
	{
		value: 'Fluor'
	},
	{
		value: 'Tokyo Kiraboshi Financial Group'
	},
	{
		value: 'Orient'
	},
	{
		value: 'Admiral Group'
	},
	{
		value: 'Bureau Veritas'
	},
	{
		value: 'Duke Realty'
	},
	{
		value: 'Core-Mark Holding'
	},
	{
		value: 'Huntsman'
	},
	{
		value: 'Newell Brands'
	},
	{
		value: 'Palo Alto Networks'
	},
	{
		value: 'Prosperity Bancshares'
	},
	{
		value: 'Vopak'
	},
	{
		value: 'Senshu Ikeda Holdings'
	},
	{
		value: 'Fortinet'
	},
	{
		value: 'Aier Eye Hospital Group'
	},
	{
		value: 'Shanghai Fosun Pharmaceutical'
	},
	{
		value: 'Zenith Bank'
	},
	{
		value: 'Dali Foods Group'
	},
	{
		value: 'Polymetal International'
	},
	{
		value: 'Sartorius'
	},
	{
		value: 'DocuSign'
	},
	{
		value: 'Adient'
	},
	{
		value: 'Inventec'
	},
	{
		value: 'East Money Information'
	},
	{
		value: 'Asustek Computer'
	},
	{
		value: 'China SCE Group Holdings'
	},
	{
		value: 'Poly Property Group Co'
	},
	{
		value: 'Canadian Apartment Properties Real E Investment Trust'
	},
	{
		value: 'Yes Bank'
	},
	{
		value: 'Central Bank of India'
	},
	{
		value: 'Okta'
	},
	{
		value: 'Cronos Group'
	},
	{
		value: 'First American Financial'
	},
	{
		value: 'TCF Financial'
	},
	{
		value: 'Murphy Oil'
	},
	{
		value: 'Cullen/Frost Bankers'
	},
	{
		value: 'Snap-on'
	},
	{
		value: 'Spirit AeroSystems'
	},
	{
		value: 'Bank Of Gansu'
	},
	{
		value: 'Guangdong Haid Group'
	},
	{
		value: 'Ningxia Baofeng Energy Group'
	},
	{
		value: 'Shaw Communications'
	},
	{
		value: 'IDEX'
	},
	{
		value: 'Teledyne Technologies'
	},
	{
		value: 'Healthpeak Properties'
	},
	{
		value: 'Shanghai Ganglian E-Commerce Holdings'
	},
	{
		value: 'SEB SA'
	},
	{
		value: 'Caltex Australia'
	},
	{
		value: 'LT Group'
	},
	{
		value: 'Extra Space Storage'
	},
	{
		value: 'Chewy'
	},
	{
		value: 'Stifel Financial'
	},
	{
		value: 'United Utilities'
	},
	{
		value: 'Frontier Communications'
	},
	{
		value: 'Sysmex'
	},
	{
		value: 'Orient Securities'
	},
	{
		value: 'Liberbank'
	},
	{
		value: 'TransUnion'
	},
	{
		value: 'Alfa Laval'
	},
	{
		value: 'Westlake Chemical'
	},
	{
		value: 'Clal Insurance Enterprises'
	},
	{
		value: 'Hasbro'
	},
	{
		value: 'E-L Financial'
	},
	{
		value: 'Keiyo Bank'
	},
	{
		value: 'Yamada Denki'
	},
	{
		value: 'Pirelli'
	},
	{
		value: 'Basler Kantonalbank'
	},
	{
		value: 'Luzerner Kantonalbank'
	},
	{
		value: 'Trimble'
	},
	{
		value: 'Banca Popolare di Sondrio'
	},
	{
		value: 'Aareal Bank'
	},
	{
		value: 'Hyakujushi Bank'
	},
	{
		value: 'Beijing Kingsoft Office Software'
	},
	{
		value: 'Foot Locker'
	},
	{
		value: 'Marathon Oil'
	},
	{
		value: 'Changchun High & New Technology'
	},
	{
		value: 'Wheaton Precious Metals'
	},
	{
		value: 'Jointown Pharmaceutical Group'
	},
	{
		value: 'Marketaxess Holdings'
	},
	{
		value: 'Medical Properties Trust'
	},
	{
		value: 'Steris'
	},
	{
		value: 'Yuzhou Properties'
	},
	{
		value: 'Equifax'
	},
	{
		value: 'General Insurance Corporation Of India'
	},
	{
		value: 'Hokkoku Bank'
	},
	{
		value: 'Fuyo General Lease'
	},
	{
		value: 'Kiyo Bank'
	},
	{
		value: 'Chimera Investment'
	},
	{
		value: 'Delivery Hero'
	},
	{
		value: 'Klepierre'
	},
	{
		value: 'BioMarin Pharmaceutical'
	},
	{
		value: 'Magazine Luiza'
	},
	{
		value: 'China Everbright International'
	},
	{
		value: 'MTU Aero Engines AG'
	},
	{
		value: 'Oshkosh'
	},
	{
		value: 'Yonyou Network Technology'
	},
	{
		value: 'Berkeley Group Holdings'
	},
	{
		value: 'Azrieli Group'
	},
	{
		value: 'China Nuclear Engineering Corporation'
	},
	{
		value: 'Ovintiv'
	},
	{
		value: 'Lamb Weston Holdings'
	},
	{
		value: 'Xinyu Iron & Steel'
	},
	{
		value: 'Murphy USA'
	},
	{
		value: 'Guangzhou Baiyunshan Pharmaceutical Holdings'
	},
	{
		value: 'Musashino Bank'
	},
	{
		value: 'Semiconductor Manufacturing International'
	},
	{
		value: 'Genmab'
	},
	{
		value: 'Coty'
	},
	{
		value: 'Saipem'
	},
	{
		value: 'Samsung Securities'
	},
	{
		value: 'Abengoa'
	},
	{
		value: 'Parkland Fuel'
	},
	{
		value: 'Pou Chen'
	},
	{
		value: 'Toll Brothers'
	},
	{
		value: 'Amdocs'
	},
	{
		value: 'EFG International'
	},
	{
		value: 'Securitas'
	},
	{
		value: 'Inspur Electronic Information Industry'
	},
	{
		value: 'Indian Bank'
	},
	{
		value: 'Marks & Spencer'
	},
	{
		value: 'Hyatt Hotels'
	},
	{
		value: 'Montage Technology'
	},
	{
		value: 'IDBI Bank'
	},
	{
		value: 'Twilio'
	},
	{
		value: 'Brilliance China Automotive Holdings'
	},
	{
		value: 'Guoco Group'
	},
	{
		value: 'Makita'
	},
	{
		value: 'Brown & Brown'
	},
	{
		value: 'China Resources Beer (Holdings)'
	},
	{
		value: 'Kingspan Group PLC'
	},
	{
		value: 'JB Financial Group'
	},
	{
		value: 'NCR'
	},
	{
		value: 'Roku'
	},
	{
		value: 'Wintrust Financial'
	},
	{
		value: 'FIBI Holdings'
	},
	{
		value: 'Swedish Match'
	},
	{
		value: 'Tongling Nonferrous Metals'
	},
	{
		value: 'Prysmian'
	},
	{
		value: 'Delek Group'
	},
	{
		value: 'Electrolux Group'
	},
	{
		value: 'Orkla'
	},
	{
		value: 'US Steel'
	},
	{
		value: 'Just Eat Takeawaycom'
	},
	{
		value: 'ST Engineering'
	},
	{
		value: 'Financial Street Holdings'
	},
	{
		value: 'FNB'
	},
	{
		value: 'Moderna'
	},
	{
		value: 'Nuernberger Beteiligungs'
	},
	{
		value: 'Sears Holdings'
	},
	{
		value: 'BJs Wholesale Club'
	},
	{
		value: 'Mid-america Apartment Communities'
	},
	{
		value: 'Shenzhen Goodix Technology'
	},
	{
		value: 'Paycom'
	},
	{
		value: 'Dollarama'
	},
	{
		value: 'Take-Two Interactive Software'
	},
	{
		value: 'Kojamo Oyj'
	},
	{
		value: 'Valley Natl Bancorp'
	},
	{
		value: 'Chesapeake Energy'
	},
	{
		value: 'JTEKT'
	},
	{
		value: 'Alnylam Pharmaceuticals'
	},
	{
		value: 'Dixons Carphone'
	},
	{
		value: 'Credit Bank of Moscow'
	},
	{
		value: 'Just Group'
	},
	{
		value: 'Inmobiliaria Colonial'
	},
	{
		value: 'Cabot Oil & Gas'
	},
	{
		value: 'Holmen AB'
	},
	{
		value: 'Indorama Ventures'
	},
	{
		value: 'L Brands'
	},
	{
		value: 'Slack Technologies'
	},
	{
		value: 'Diamondback Energy'
	},
	{
		value: 'Founder Securities'
	},
	{
		value: 'Merlin Properties SOCIMI SA'
	},
	{
		value: 'Heico'
	},
	{
		value: 'WP Carey'
	},
	{
		value: 'Zhejiang Century Huatong Group'
	},
	{
		value: 'Shell'
	},
	{
		value: 'Dangote'
	},
	{
		value: 'NNPC'
	},
	{
		value: 'Nestle'
	},
	{
		value: 'Exxon Mobil'
	},
	{
		value: 'KPMG'
	},
	{
		value: 'Nigerian Breweries'
	},
	{
		value: 'PWC'
	},
	{
		value: 'Guaranty Trust Bank'
	},
	{
		value: 'Google'
	},
	{
		value: 'Globalcomm'
	},
	{
		value: 'Nigeria Bottling Company'
	},
	{
		value: 'Guinness'
	},
	{
		value: 'Deloitte'
	},
	{
		value: 'First Bank of Nigeria'
	},
	{
		value: 'NLNG'
	},
	{
		value: 'Central Bank of Nigeria(CBN)'
	},
	{
		value: 'Access Bank'
	},
	{
		value: 'Julius Berger'
	},
	{
		value: 'PZ Cussons'
	},
	{
		value: 'General Electric (GE)'
	},
	{
		value: 'United Nations'
	},
	{
		value: 'Airtel'
	},
	{
		value: 'Flour Mills of Nigeria'
	},
	{
		value: 'Interswitch'
	},
	{
		value: 'Jumia'
	},
	{
		value: 'Oando'
	},
	{
		value: 'United Bank of Africa '
	},
	{
		value: 'Federal Inland Revenue Service'
	},
	{
		value: 'Agip'
	},
	{
		value: 'Friesland Campina Wamco Nigeria'
	},
	{
		value: 'Stanbic IBTC Bank'
	},
	{
		value: 'Glaxo Smith Kline(GSK)'
	},
	{
		value: 'Ernest and Young'
	},
	{
		value: 'Sahara Energy'
	},
	{
		value: 'Seplat Oil'
	},
	{
		value: 'British High Commission'
	},
	{
		value: 'BUA Group'
	},
	{
		value: 'McKinsey Company'
	},
	{
		value: 'Multichoice'
	},
	{
		value: 'Chi Limited'
	},
	{
		value: 'IITA'
	},
	{
		value: 'MainOne'
	},
	{
		value: 'Nigerian Communications Commission'
	},
	{
		value: 'Union Bank'
	},
	{
		value: 'Department of Petroleum Resources (DPR)'
	},
	{
		value: 'Forte Oil'
	},
	{
		value: 'Olam'
	},
	{
		value: 'Lafarge'
	},
	{
		value: 'Promasidor'
	},
	{
		value: 'Nigerian Stock Exchange'
	},
	{
		value: 'Citi Bank'
	},
	{
		value: 'World Health Organization'
	},
	{
		value: 'Sterling Bank'
	},
	{
		value: 'Standard Chartered Bank'
	},
	{
		value: 'Dufil'
	},
	{
		value: 'Innoson Motors'
	},
	{
		value: 'May & Baker'
	},
	{
		value: 'Nigerian Ports Authority'
	},
	{
		value: 'SevenUp Bottling Company'
	},
	{
		value: 'Maersk'
	},
	{
		value: 'Nest Oil'
	},
	{
		value: 'Flutterwave'
	},
	{
		value: 'Nigeria Customs Service'
	},
	{
		value: 'DHL'
	},
	{
		value: 'ECOWAS'
	},
	{
		value: '9Mobile'
	},
	{
		value: 'Softcom'
	},
	{
		value: 'Channels Television'
	}
];

export const JOB_TITLES_AUTO_COMPLETE = [
	{
		value: 'Marketing Specialist'
	},
	{
		value: 'Frontend Engineer'
	},
	{
		value: 'Backend Engineer'
	},
	{
		value: 'Frontend Developer'
	},
	{
		value: 'Backend Developer'
	},
	{
		value: 'Marketing Manager'
	},
	{
		value: 'Marketing Director'
	},
	{
		value: 'Graphic Designer'
	},
	{
		value: 'Marketing Research Analyst'
	},
	{
		value: 'Marketing Communications Manager'
	},
	{
		value: 'Marketing Consultant'
	},
	{
		value: 'Product Manager'
	},
	{
		value: 'Public Relations'
	},
	{
		value: 'Social Media Assistant'
	},
	{
		value: 'Brand Manager'
	},
	{
		value: 'SEO Manager'
	},
	{
		value: 'Content Marketing Manager'
	},
	{
		value: 'Copywriter'
	},
	{
		value: 'Media Buyer'
	},
	{
		value: 'Digital Marketing Manager'
	},
	{
		value: 'eCommerce Marketing Specialist'
	},
	{
		value: 'Brand Strategist'
	},
	{
		value: 'Vice President of Marketing'
	},
	{
		value: 'Media Relations Coordinator'
	},
	{
		value: 'Administrative Assistant'
	},
	{
		value: 'Receptionist'
	},
	{
		value: 'Office Manager'
	},
	{
		value: 'Auditing Clerk'
	},
	{
		value: 'Bookkeeper'
	},
	{
		value: 'Account Executive'
	},
	{
		value: 'Branch Manager'
	},
	{
		value: 'Business Manager'
	},
	{
		value: 'Quality Control Coordinator'
	},
	{
		value: 'Administrative Manager'
	},
	{
		value: 'Chief Executive Officer'
	},
	{
		value: 'Business Analyst'
	},
	{
		value: 'Risk Manager'
	},
	{
		value: 'Human Resources'
	},
	{
		value: 'Office Assistant'
	},
	{
		value: 'Secretary'
	},
	{
		value: 'Office Clerk'
	},
	{
		value: 'File Clerk'
	},
	{
		value: 'Account Collector'
	},
	{
		value: 'Administrative Specialist'
	},
	{
		value: 'Executive Assistant'
	},
	{
		value: 'Program Administrator'
	},
	{
		value: 'Program Manager'
	},
	{
		value: 'Administrative Analyst'
	},
	{
		value: 'Data Entry'
	},
	{
		value: 'Team Leader'
	},
	{
		value: 'Manager'
	},
	{
		value: 'Assistant Manager'
	},
	{
		value: 'Executive'
	},
	{
		value: 'Director'
	},
	{
		value: 'Coordinator'
	},
	{
		value: 'Administrator'
	},
	{
		value: 'Controller'
	},
	{
		value: 'Officer'
	},
	{
		value: 'Organizer'
	},
	{
		value: 'Supervisor'
	},
	{
		value: 'Superintendent'
	},
	{
		value: 'Head'
	},
	{
		value: 'Overseer'
	},
	{
		value: 'Chief'
	},
	{
		value: 'Foreman'
	},
	{
		value: 'Controller'
	},
	{
		value: 'Principal'
	},
	{
		value: 'President'
	},
	{
		value: 'Lead'
	},
	{
		value: 'Computer Scientist'
	},
	{
		value: 'IT Professional'
	},
	{
		value: 'UX Designer & UI Developer'
	},
	{
		value: 'SQL Developer'
	},
	{
		value: 'Web Designer'
	},
	{
		value: 'Web Developer'
	},
	{
		value: 'Help Desk Worker/Desktop Support'
	},
	{
		value: 'Software Engineer'
	},
	{
		value: 'Data Entry'
	},
	{
		value: 'DevOps Engineer'
	},
	{
		value: 'Computer Programmer'
	},
	{
		value: 'Network Administrator'
	},
	{
		value: 'Information Security Analyst'
	},
	{
		value: 'Artificial Intelligence Engineer'
	},
	{
		value: 'Cloud Architect'
	},
	{
		value: 'IT Manager'
	},
	{
		value: 'Technical Specialist'
	},
	{
		value: 'Application Developer'
	},
	{
		value: 'Sales Associate'
	},
	{
		value: 'Sales Representative'
	},
	{
		value: 'Sales Manager'
	},
	{
		value: 'Retail Worker'
	},
	{
		value: 'Store Manager'
	},
	{
		value: 'Sales Representative'
	},
	{
		value: 'Sales Manager'
	},
	{
		value: 'Real E Broker'
	},
	{
		value: 'Sales Associate'
	},
	{
		value: 'Cashier'
	},
	{
		value: 'Store Manager'
	},
	{
		value: 'Account Executive'
	},
	{
		value: 'Account Manager'
	},
	{
		value: 'Area Sales Manager'
	},
	{
		value: 'Direct Salesperson'
	},
	{
		value: 'Director of Inside Sales'
	},
	{
		value: 'Outside Sales Manager'
	},
	{
		value: 'Sales Analyst'
	},
	{
		value: 'Market Development Manager'
	},
	{
		value: 'B2B Sales Specialist'
	},
	{
		value: 'Sales Engineer'
	},
	{
		value: 'Merchandising Associate'
	},
	{
		value: 'Construction Worker'
	},
	{
		value: 'Taper'
	},
	{
		value: 'Plumber'
	},
	{
		value: 'Heavy Equipment Operator'
	},
	{
		value: 'Vehicle or Equipment Cleaner'
	},
	{
		value: 'Carpenter'
	},
	{
		value: 'Electrician'
	},
	{
		value: 'Painter'
	},
	{
		value: 'Welder'
	},
	{
		value: 'Handyman'
	},
	{
		value: 'Boilermaker'
	},
	{
		value: 'Crane Operator'
	},
	{
		value: 'Building Inspector'
	},
	{
		value: 'Pipefitter'
	},
	{
		value: 'Sheet Metal Worker'
	},
	{
		value: 'Iron Worker'
	},
	{
		value: 'Mason'
	},
	{
		value: 'Roofer'
	},
	{
		value: 'Solar Photovoltaic Installer'
	},
	{
		value: 'Well Driller'
	},
	{
		value: 'Proprietor'
	},
	{
		value: 'Principal'
	},
	{
		value: 'Owner'
	},
	{
		value: 'President'
	},
	{
		value: 'Founder'
	},
	{
		value: 'Administrator'
	},
	{
		value: 'Director'
	},
	{
		value: 'Managing Partner'
	},
	{
		value: 'Managing Member'
	},
	{
		value: 'Board of Directors'
	},
	{
		value: 'Shareholder'
	},
	{
		value: 'Manager'
	},
	{
		value: 'Supervisor'
	},
	{
		value: 'Front-Line Employee'
	},
	{
		value: 'Quality Control'
	},
	{
		value: 'Human Resource'
	},
	{
		value: 'Accounting Staff'
	},
	{
		value: 'Marketing Staff'
	},
	{
		value: 'Purchasing Staff'
	},
	{
		value: 'Shipping and Receiving Staff'
	},
	{
		value: 'Office Manager'
	},
	{
		value: 'Receptionist'
	},
	{
		value: 'Virtual Assistant'
	},
	{
		value: 'Customer Service'
	},
	{
		value: 'Customer Support'
	},
	{
		value: 'Concierge'
	},
	{
		value: 'Help Desk'
	},
	{
		value: 'Customer Service Manager'
	},
	{
		value: 'Technical Support Specialist'
	},
	{
		value: 'Account Representative'
	},
	{
		value: 'Client Service Specialist'
	},
	{
		value: 'Customer Care Associate'
	},
	{
		value: 'Operations Manager'
	},
	{
		value: 'Operations Assistant'
	},
	{
		value: 'Operations Coordinator'
	},
	{
		value: 'Operations Analyst'
	},
	{
		value: 'Operations Director'
	},
	{
		value: 'Vice President of Operations'
	},
	{
		value: 'Operations Professional'
	},
	{
		value: 'Scrum Master'
	},
	{
		value: 'Continuous Improvement Lead'
	},
	{
		value: 'Continuous Improvement Consultant'
	},
	{
		value: 'Credit Authorizer'
	},
	{
		value: 'Benefits Manager'
	},
	{
		value: 'Credit Counselor'
	},
	{
		value: 'Accountant'
	},
	{
		value: 'Bookkeeper'
	},
	{
		value: 'Accounting Analyst'
	},
	{
		value: 'Accounting Director'
	},
	{
		value: 'Accounts Payable/Receivable Clerk'
	},
	{
		value: 'Auditor'
	},
	{
		value: 'Budget Analyst'
	},
	{
		value: 'Controller'
	},
	{
		value: 'Financial Analyst'
	},
	{
		value: 'Finance Manager'
	},
	{
		value: 'Economist'
	},
	{
		value: 'Payroll Manager'
	},
	{
		value: 'Payroll Clerk'
	},
	{
		value: 'Financial Planner'
	},
	{
		value: 'Financial Services Representative'
	},
	{
		value: 'Finance Director'
	},
	{
		value: 'Commercial Loan Officer'
	},
	{
		value: 'Engineer'
	},
	{
		value: 'Mechanical Engineer'
	},
	{
		value: 'Civil Engineer'
	},
	{
		value: 'Electrical Engineer'
	},
	{
		value: 'Assistant Engineer'
	},
	{
		value: 'Chemical Engineer'
	},
	{
		value: 'Chief Engineer'
	},
	{
		value: 'Drafter'
	},
	{
		value: 'Engineering Technician'
	},
	{
		value: 'Geological Engineer'
	},
	{
		value: 'Biological Engineer'
	},
	{
		value: 'Maintenance Engineer'
	},
	{
		value: 'Mining Engineer'
	},
	{
		value: 'Nuclear Engineer'
	},
	{
		value: 'Petroleum Engineer'
	},
	{
		value: 'Plant Engineer'
	},
	{
		value: 'Production Engineer'
	},
	{
		value: 'Quality Engineer'
	},
	{
		value: 'Safety Engineer'
	},
	{
		value: 'Sales Engineer'
	},
	{
		value: 'Chief People Officer'
	},
	{
		value: 'VP of Miscellaneous Stuff'
	},
	{
		value: 'Chief Robot Whisperer'
	},
	{
		value: 'Director of First Impressions'
	},
	{
		value: 'Culture Operations Manager'
	},
	{
		value: 'Director of Ethical Hacking'
	},
	{
		value: 'Software Ninjaneer'
	},
	{
		value: 'Director of Bean Counting'
	},
	{
		value: 'Digital Overlord'
	},
	{
		value: 'Director of Storytelling'
	},
	{
		value: 'Researcher'
	},
	{
		value: 'Research Assistant'
	},
	{
		value: 'Data Analyst'
	},
	{
		value: 'Business Analyst'
	},
	{
		value: 'Financial Analyst'
	},
	{
		value: 'Biostatistician'
	},
	{
		value: 'Title Researcher'
	},
	{
		value: 'Market Researcher'
	},
	{
		value: 'Title Analyst'
	},
	{
		value: 'Medical Researcher'
	},
	{
		value: 'Mentor'
	},
	{
		value: 'Tutor/Online Tutor'
	},
	{
		value: 'Teacher'
	},
	{
		value: 'Teaching Assistant'
	},
	{
		value: 'Substitute Teacher'
	},
	{
		value: 'Preschool Teacher'
	},
	{
		value: 'Test Scorer'
	},
	{
		value: 'Online ESL Instructor'
	},
	{
		value: 'Professor'
	},
	{
		value: 'Assistant Professor'
	},
	{
		value: 'Graphic Designer'
	},
	{
		value: 'Artist'
	},
	{
		value: 'Interior Designer'
	},
	{
		value: 'Video Editor'
	},
	{
		value: 'Video or Film Producer'
	},
	{
		value: 'Playwright'
	},
	{
		value: 'Musician'
	},
	{
		value: 'Novelist/Writer'
	},
	{
		value: 'Computer Animator'
	},
	{
		value: 'Photographer'
	},
	{
		value: 'Camera Operator'
	},
	{
		value: 'Sound Engineer'
	},
	{
		value: 'Motion Picture Director'
	},
	{
		value: 'Actor'
	},
	{
		value: 'Music Producer'
	},
	{
		value: 'Director of Photography'
	},
	{
		value: 'Nurse'
	},
	{
		value: 'Travel Nurse'
	},
	{
		value: 'Nurse Practitioner'
	},
	{
		value: 'Doctor'
	},
	{
		value: 'Caregiver'
	},
	{
		value: 'CNA'
	},
	{
		value: 'Physical Therapist'
	},
	{
		value: 'Pharmacist'
	},
	{
		value: 'Pharmacy Assistant'
	},
	{
		value: 'Medical Administrator'
	},
	{
		value: 'Medical Laboratory Tech'
	},
	{
		value: 'Physical Therapy Assistant'
	},
	{
		value: 'Massage Therapy'
	},
	{
		value: 'Dental Hygienist'
	},
	{
		value: 'Orderly'
	},
	{
		value: 'Personal Trainer'
	},
	{
		value: 'Massage Therapy'
	},
	{
		value: 'Medical Laboratory Tech'
	},
	{
		value: 'Phlebotomist'
	},
	{
		value: 'Medical Transcriptionist'
	},
	{
		value: 'Telework Nurse/Doctor'
	},
	{
		value: 'Reiki Practitioner'
	},
	{
		value: 'Housekeeper'
	},
	{
		value: 'Flight Attendant'
	},
	{
		value: 'Travel Agent'
	},
	{
		value: 'Hotel Front Door Greeter'
	},
	{
		value: 'Bellhop'
	},
	{
		value: 'Cruise Director'
	},
	{
		value: 'Entertainment Specialist'
	},
	{
		value: 'Hotel Manager'
	},
	{
		value: 'Front Desk Associate'
	},
	{
		value: 'Front Desk Manager'
	},
	{
		value: 'Concierge'
	},
	{
		value: 'Group Sales'
	},
	{
		value: 'Event Planner'
	},
	{
		value: 'Porter'
	},
	{
		value: 'Spa Manager'
	},
	{
		value: 'Wedding Coordinator'
	},
	{
		value: 'Cruise Ship Attendant'
	},
	{
		value: 'Casino Host'
	},
	{
		value: 'Hotel Receptionist'
	},
	{
		value: 'Reservationist'
	},
	{
		value: 'Events Manager'
	},
	{
		value: 'Meeting Planner'
	},
	{
		value: 'Lodging Manager'
	},
	{
		value: 'Director of Maintenance'
	},
	{
		value: 'Valet'
	},
	{
		value: 'Waiter'
	},
	{
		value: 'Server'
	},
	{
		value: 'Chef'
	},
	{
		value: 'Fast Food Worker'
	},
	{
		value: 'Barista'
	},
	{
		value: 'Line Cook'
	},
	{
		value: 'Cafeteria Worker'
	},
	{
		value: 'Restaurant Manager'
	},
	{
		value: 'Wait Staff Manager'
	},
	{
		value: 'Bus Person'
	},
	{
		value: 'Restaurant Chain Executive'
	},
	{
		value: 'Waitress'
	},
	{
		value: 'Political Scientist'
	},
	{
		value: 'Chemist'
	},
	{
		value: 'Conservation Scientist'
	},
	{
		value: 'Sociologist'
	},
	{
		value: 'Biologist'
	},
	{
		value: 'Geologist'
	},
	{
		value: 'Physicist'
	},
	{
		value: 'Astronomer'
	},
	{
		value: 'Atmospheric Scientist'
	},
	{
		value: 'Molecular Scientist'
	},
	{
		value: 'Call Center Representative'
	},
	{
		value: 'Customer Service'
	},
	{
		value: 'Telemarketer'
	},
	{
		value: 'Telephone Operator'
	},
	{
		value: 'Phone Survey Conductor'
	},
	{
		value: 'Dispatcher for Trucks or Taxis'
	},
	{
		value: 'Customer Support Representative'
	},
	{
		value: 'Over the Phone Interpreter'
	},
	{
		value: 'Phone Sales Specialist'
	},
	{
		value: 'Mortgage Loan Processor'
	},
	{
		value: 'Counselor'
	},
	{
		value: 'Mental Health Counselor'
	},
	{
		value: 'Addiction Counselor'
	},
	{
		value: 'School Counselor'
	},
	{
		value: 'Speech Pathologist'
	},
	{
		value: 'Guidance Counselor'
	},
	{
		value: 'Social Worker'
	},
	{
		value: 'Therapist'
	},
	{
		value: 'Life Coach'
	},
	{
		value: 'Couples Counselor'
	},
	{
		value: 'Beautician'
	},
	{
		value: 'Hair Stylist'
	},
	{
		value: 'Nail Technician'
	},
	{
		value: 'Cosmetologist'
	},
	{
		value: 'Salon Manager'
	},
	{
		value: 'Makeup Artist'
	},
	{
		value: 'Esthetician'
	},
	{
		value: 'Skin Care Specialist'
	},
	{
		value: 'Manicurist'
	},
	{
		value: 'Barber'
	},
	{
		value: 'Journalist'
	},
	{
		value: 'Copy Editor'
	},
	{
		value: 'Editor/Proofreader'
	},
	{
		value: 'Content Creator'
	},
	{
		value: 'Speechwriter'
	},
	{
		value: 'Communications Director'
	},
	{
		value: 'Screenwriter'
	},
	{
		value: 'Technical Writer'
	},
	{
		value: 'Columnist'
	},
	{
		value: 'Public Relations Specialist'
	},
	{
		value: 'Proposal Writer'
	},
	{
		value: 'Content Strategist'
	},
	{
		value: 'Grant Writer'
	},
	{
		value: 'Video Game Writer'
	},
	{
		value: 'Translator'
	},
	{
		value: 'Film Critic'
	},
	{
		value: 'Copywriter'
	},
	{
		value: 'Travel Writer'
	},
	{
		value: 'Social Media Specialist'
	},
	{
		value: 'Ghostwriter'
	},
	{
		value: 'Warehouse Worker'
	},
	{
		value: 'Painter'
	},
	{
		value: 'Truck Driver'
	},
	{
		value: 'Heavy Equipment Operator'
	},
	{
		value: 'Welding'
	},
	{
		value: 'Physical Therapy Assistant'
	},
	{
		value: 'Housekeeper'
	},
	{
		value: 'Landscaping Worker'
	},
	{
		value: 'Landscaping Assistant'
	},
	{
		value: 'Mover'
	},
	{
		value: 'Animal Breeder'
	},
	{
		value: 'Veterinary Assistant'
	},
	{
		value: 'Farm Worker'
	},
	{
		value: 'Animal Shelter Worker'
	},
	{
		value: 'Dog Walker / Pet Sitter'
	},
	{
		value: 'Zoologist'
	},
	{
		value: 'Animal Trainer'
	},
	{
		value: 'Service Dog Trainer'
	},
	{
		value: 'Animal Shelter Manager'
	},
	{
		value: 'Animal Control Officer'
	},
	{
		value: 'Delivery Driver'
	},
	{
		value: 'School Bus Driver'
	},
	{
		value: 'Truck Driver'
	},
	{
		value: 'Tow Truck Operator'
	},
	{
		value: 'UPS Driver'
	},
	{
		value: 'Mail Carrier'
	},
	{
		value: 'Recyclables Collector'
	},
	{
		value: 'Courier'
	},
	{
		value: 'Bus Driver'
	},
	{
		value: 'Cab Driver'
	},
	{
		value: 'Animal Shelter Board Member'
	},
	{
		value: 'Office Volunteer'
	},
	{
		value: 'Animal Shelter Volunteer'
	},
	{
		value: 'Hospital Volunteer'
	},
	{
		value: 'Youth Volunteer'
	},
	{
		value: 'Food Kitchen Worker'
	},
	{
		value: 'Homeless Shelter Worker'
	},
	{
		value: 'Conservation Volunteer'
	},
	{
		value: 'Meals on Wheels Driver'
	},
	{
		value: 'Habitat for Humanity Builder'
	},
	{
		value: 'Emergency Relief Worker'
	},
	{
		value: 'Red Cross Volunteer'
	},
	{
		value: 'Community Food Project Worker'
	},
	{
		value: 'Womens Shelter Jobs'
	},
	{
		value: 'Suicide Hotline Volunteer'
	},
	{
		value: 'School Volunteer'
	},
	{
		value: 'Community Volunteer Jobs'
	},
	{
		value: 'Sports Volunteer'
	},
	{
		value: 'Church Volunteer'
	},
	{
		value: 'Archivist'
	},
	{
		value: 'Actuary'
	},
	{
		value: 'Architect'
	},
	{
		value: 'Personal Assistant'
	},
	{
		value: 'Entrepreneur'
	},
	{
		value: 'Security Guard'
	},
	{
		value: 'Mechanic'
	},
	{
		value: 'Recruiter'
	},
	{
		value: 'Mathematician'
	},
	{
		value: 'Locksmith'
	},
	{
		value: 'Management Consultant'
	},
	{
		value: 'Shelf Stocker'
	},
	{
		value: 'Caretaker or House Sitter'
	},
	{
		value: 'Library Assistant'
	},
	{
		value: 'Translator'
	},
	{
		value: 'HVAC Technician'
	},
	{
		value: 'Attorney'
	},
	{
		value: 'Paralegal'
	},
	{
		value: 'Executive Assistant'
	},
	{
		value: 'Personal Assistant'
	},
	{
		value: 'Bank Teller'
	},
	{
		value: 'Parking Attendant'
	},
	{
		value: 'Machinery Operator'
	},
	{
		value: 'Manufacturing Assembler'
	},
	{
		value: 'Funeral Attendant'
	},
	{
		value: 'Assistant Golf Professional'
	},
	{
		value: 'Yoga Instructor'
	},
	{
		value: 'Chief Executive Officer (CEO)'
	},
	{
		value: 'Chief Operating Officer (COO)'
	},
	{
		value: 'Chief Financial Officer (CFO)'
	},
	{
		value: 'Chief Information Officer (CIO)'
	},
	{
		value: 'Chief Technology Officer (CTO)'
	},
	{
		value: 'Chief Marketing Officer (CMO)'
	},
	{
		value: 'Chief Human Resources Officer (CHRO)'
	},
	{
		value: 'Chief Data Officer (CDO)'
	},
	{
		value: 'Chief Product Officer (CPO)'
	},
	{
		value: 'Chief Customer Officer (CCO)'
	}
];

export const FIELD_OF_STUDY_AUTO_COMPLETE = [
	{
		value: 'Arts'
	},
	{
		value: 'Performing arts'
	},
	{
		value: 'Music'
	},
	{
		value: 'Accompanying'
	},
	{
		value: 'Chamber music'
	},
	{
		value: 'Church music'
	},
	{
		value: 'Conducting'
	},
	{
		value: 'Choral conducting'
	},
	{
		value: 'Orchestral conducting'
	},
	{
		value: 'Wind ensemble conducting'
	},
	{
		value: 'Early music'
	},
	{
		value: 'Jazz studies'
	},
	{
		value: 'Musical composition'
	},
	{
		value: 'Music education'
	},
	{
		value: 'Music history'
	},
	{
		value: 'Musicology'
	},
	{
		value: 'Historical musicology'
	},
	{
		value: 'Systematic musicology'
	},
	{
		value: 'Ethnomusicology'
	},
	{
		value: 'Music theory'
	},
	{
		value: 'Orchestral studies'
	},
	{
		value: 'Organology'
	},
	{
		value: 'Organandhistorical keyboards'
	},
	{
		value: 'Piano'
	},
	{
		value: 'Strings,harp,oud, andguitar'
	},
	{
		value: 'Singing'
	},
	{
		value: 'Woodwinds,brass, andpercussion'
	},
	{
		value: 'Recording'
	},
	{
		value: 'Dance'
	},
	{
		value: 'Choreography'
	},
	{
		value: 'Dance notation'
	},
	{
		value: 'Ethnochoreology'
	},
	{
		value: 'History of dance'
	},
	{
		value: 'Television'
	},
	{
		value: 'Television studies'
	},
	{
		value: 'Theatre'
	},
	{
		value: 'Acting'
	},
	{
		value: 'Directing'
	},
	{
		value: 'Dramaturgy'
	},
	{
		value: 'History'
	},
	{
		value: 'Musical theatre'
	},
	{
		value: 'Playwrighting'
	},
	{
		value: 'Puppetry'
	},
	{
		value: 'Scenography'
	},
	{
		value: 'Stage design'
	},
	{
		value: 'Ventriloquism'
	},
	{
		value: 'Film'
	},
	{
		value: 'Animation'
	},
	{
		value: 'Film criticism'
	},
	{
		value: 'Filmmaking'
	},
	{
		value: 'Film theory'
	},
	{
		value: 'Live action'
	},
	{
		value: 'Visual arts'
	},
	{
		value: 'Fine arts'
	},
	{
		value: 'Graphic arts'
	},
	{
		value: 'Drawing'
	},
	{
		value: 'Painting'
	},
	{
		value: 'Photography'
	},
	{
		value: 'Sculpture'
	},
	{
		value: 'Applied arts'
	},
	{
		value: 'Calligraphy'
	},
	{
		value: 'Decorative arts'
	},
	{
		value: 'Mixed media'
	},
	{
		value: 'Printmaking'
	},
	{
		value: 'Studio art'
	},
	{
		value: 'Architecture'
	},
	{
		value: 'Interior architecture'
	},
	{
		value: 'Landscape architecture'
	},
	{
		value: 'Landscape design'
	},
	{
		value: 'Landscape planning'
	},
	{
		value: 'Architectural analytics'
	},
	{
		value: 'Historic preservation'
	},
	{
		value: 'Interior design'
	},
	{
		value: 'Technical drawing'
	},
	{
		value: 'Fashion'
	},
	{
		value: 'History'
	},
	{
		value: 'African history'
	},
	{
		value: 'American history'
	},
	{
		value: 'Ancient history'
	},
	{
		value: 'Ancient Egypt'
	},
	{
		value: 'Carthage'
	},
	{
		value: 'Ancient Greek history'
	},
	{
		value: 'Ancient Roman history'
	},
	{
		value: 'Assyrian Civilization'
	},
	{
		value: 'Bronze Age Civilizations'
	},
	{
		value: 'Biblical history'
	},
	{
		value: 'History of the Indus Valley Civilization'
	},
	{
		value: 'Preclassic Maya'
	},
	{
		value: 'History of Mesopotamia'
	},
	{
		value: 'The Stone Age'
	},
	{
		value: 'History of the Yangtze civilization'
	},
	{
		value: 'History of the Yellow River civillization'
	},
	{
		value: 'Asian history'
	},
	{
		value: 'Chinese history'
	},
	{
		value: 'Indian history'
	},
	{
		value: 'Indonesian history'
	},
	{
		value: 'Iranian history'
	},
	{
		value: 'Australian history'
	},
	{
		value: 'Ecclesiastical history of the Catholic Church'
	},
	{
		value: 'Economic history'
	},
	{
		value: 'Environmental history'
	},
	{
		value: 'European history'
	},
	{
		value: 'Intellectual history'
	},
	{
		value: 'Jewish history'
	},
	{
		value: 'Latin American history'
	},
	{
		value: 'Modern history'
	},
	{
		value: 'History of philosophy'
	},
	{
		value: 'Ancient philosophy'
	},
	{
		value: 'Contemporary philosophy'
	},
	{
		value: 'Medieval philosophy'
	},
	{
		value: 'Humanism'
	},
	{
		value: 'Scholasticism'
	},
	{
		value: 'Modern philosophy'
	},
	{
		value: 'Political history'
	},
	{
		value: 'Pre-Columbian era'
	},
	{
		value: 'Russian history'
	},
	{
		value: 'History of culture'
	},
	{
		value: 'Scientific history'
	},
	{
		value: 'Technological history'
	},
	{
		value: 'World history'
	},
	{
		value: 'Public history'
	},
	{
		value: 'Home economics'
	},
	{
		value: 'Cooking'
	},
	{
		value: 'Cleaning'
	},
	{
		value: 'Clothing'
	},
	{
		value: 'Family studies'
	},
	{
		value: 'Finance'
	},
	{
		value: 'Gardening'
	},
	{
		value: 'Health'
	},
	{
		value: 'Nutrition'
	},
	{
		value: 'Languagesandliterature'
	},
	{
		value: 'Linguistics'
	},
	{
		value: 'Applied linguistics'
	},
	{
		value: 'Composition studies'
	},
	{
		value: 'Computational linguistics'
	},
	{
		value: 'Discourse analysis'
	},
	{
		value: 'English studies'
	},
	{
		value: 'Etymology'
	},
	{
		value: 'Grammar'
	},
	{
		value: 'Historical linguistics'
	},
	{
		value: 'History of linguistics'
	},
	{
		value: 'Interlinguistics'
	},
	{
		value: 'Lexicology'
	},
	{
		value: 'Linguistic typology'
	},
	{
		value: 'Morphology (linguistics)'
	},
	{
		value: 'Natural language processing'
	},
	{
		value: 'Philology'
	},
	{
		value: 'Phonetics'
	},
	{
		value: 'Phonology'
	},
	{
		value: 'Pragmatics'
	},
	{
		value: 'Psycholinguistics'
	},
	{
		value: 'Rhetoric'
	},
	{
		value: 'Semantics'
	},
	{
		value: 'Semiotics'
	},
	{
		value: 'Sociolinguistics'
	},
	{
		value: 'Syntax'
	},
	{
		value: 'Usage'
	},
	{
		value: 'Word usage'
	},
	{
		value: 'Comparative literature'
	},
	{
		value: 'Creative writing'
	},
	{
		value: 'Fiction'
	},
	{
		value: 'Non-fiction'
	},
	{
		value: 'English literature'
	},
	{
		value: 'History of literature'
	},
	{
		value: 'Medieval literature'
	},
	{
		value: 'Post-colonial literature'
	},
	{
		value: 'Post-modern literature'
	},
	{
		value: 'Literary theory'
	},
	{
		value: 'Critical theory'
	},
	{
		value: 'Literary criticism'
	},
	{
		value: 'Poetics'
	},
	{
		value: 'Poetry'
	},
	{
		value: 'World literature'
	},
	{
		value: 'African-American literature'
	},
	{
		value: 'American literature'
	},
	{
		value: 'British literature'
	},
	{
		value: 'Law'
	},
	{
		value: 'Main article:Outline of law'
	},
	{
		value: 'Administrative law'
	},
	{
		value: 'Canon law'
	},
	{
		value: 'Civil law'
	},
	{
		value: 'Admiralty law'
	},
	{
		value: 'Animal law/Animal rights'
	},
	{
		value: 'Civil procedure'
	},
	{
		value: 'Common law'
	},
	{
		value: 'Contract law'
	},
	{
		value: 'Corporations'
	},
	{
		value: 'Environmental law'
	},
	{
		value: 'Family law'
	},
	{
		value: 'Federal law'
	},
	{
		value: 'International law'
	},
	{
		value: 'Public international law'
	},
	{
		value: 'Supranational law'
	},
	{
		value: 'Labor law'
	},
	{
		value: 'Property law'
	},
	{
		value: 'Tax law'
	},
	{
		value: 'Tort law'
	},
	{
		value: 'Comparative law'
	},
	{
		value: 'Competition law'
	},
	{
		value: 'Constitutional law'
	},
	{
		value: 'Criminal law'
	},
	{
		value: 'Criminal justice'
	},
	{
		value: 'Criminal procedure'
	},
	{
		value: 'Forensic science'
	},
	{
		value: 'Police science'
	},
	{
		value: 'Islamic law'
	},
	{
		value: 'Jewish law'
	},
	{
		value: 'Jurisprudence(Philosophy of Law)'
	},
	{
		value: 'Legal management'
	},
	{
		value: 'Commercial law'
	},
	{
		value: 'Corporate law'
	},
	{
		value: 'Procedural law'
	},
	{
		value: 'Substantive law'
	},
	{
		value: 'Philosophy'
	},
	{
		value: 'Aesthetics'
	},
	{
		value: 'Applied philosophy'
	},
	{
		value: 'Philosophy of economics'
	},
	{
		value: 'Philosophy of education'
	},
	{
		value: 'Philosophy of engineering'
	},
	{
		value: 'Philosophy of history'
	},
	{
		value: 'Philosophy of language'
	},
	{
		value: 'Philosophy of law'
	},
	{
		value: 'Philosophy of mathematics'
	},
	{
		value: 'Philosophy of music'
	},
	{
		value: 'Philosophy of psychology'
	},
	{
		value: 'Philosophy of religion'
	},
	{
		value: 'Philosophy of physical sciences'
	},
	{
		value: 'Philosophy of biology'
	},
	{
		value: 'Philosophy of chemistry'
	},
	{
		value: 'Philosophy of physics'
	},
	{
		value: 'Philosophy of social science'
	},
	{
		value: 'Philosophy of technology'
	},
	{
		value: 'Systems philosophy'
	},
	{
		value: 'Epistemology'
	},
	{
		value: 'Justification'
	},
	{
		value: 'Reasoning errors'
	},
	{
		value: 'Ethics'
	},
	{
		value: 'Applied ethics'
	},
	{
		value: 'Animal rights'
	},
	{
		value: 'Bioethics'
	},
	{
		value: 'Environmental ethics'
	},
	{
		value: 'Meta-ethics'
	},
	{
		value: 'Moral psychology,Descriptive ethics,Value theory'
	},
	{
		value: 'Normative ethics'
	},
	{
		value: 'Virtue ethics'
	},
	{
		value: 'Logic'
	},
	{
		value: 'Mathematical logic'
	},
	{
		value: 'Philosophical logic'
	},
	{
		value: 'Meta-philosophy'
	},
	{
		value: 'Metaphysics'
	},
	{
		value: 'Philosophy of Action'
	},
	{
		value: 'DeterminismandFree will'
	},
	{
		value: 'Ontology'
	},
	{
		value: 'Philosophy of mind'
	},
	{
		value: 'Philosophy of pain'
	},
	{
		value: 'Philosophy of artificial intelligence'
	},
	{
		value: 'Philosophy of perception'
	},
	{
		value: 'Philosophy of space and time'
	},
	{
		value: 'Teleology'
	},
	{
		value: 'TheismandAtheism'
	},
	{
		value: 'Philosophical traditions and schools'
	},
	{
		value: 'African philosophy'
	},
	{
		value: 'Analytic philosophy'
	},
	{
		value: 'Aristotelianism'
	},
	{
		value: 'Continental philosophy'
	},
	{
		value: 'Eastern philosophy'
	},
	{
		value: 'Feminist philosophy'
	},
	{
		value: 'Platonism'
	},
	{
		value: 'Social philosophyandpolitical philosophy'
	},
	{
		value: 'Anarchism'
	},
	{
		value: 'Libertarianism'
	},
	{
		value: 'Marxism'
	},
	{
		value: 'Theology'
	},
	{
		value: 'Biblical studies'
	},
	{
		value: 'Religious studies'
	},
	{
		value: 'Biblical Hebrew,Biblical Greek,Aramaic'
	},
	{
		value: 'Buddhist theology'
	},
	{
		value: 'Christian theology'
	},
	{
		value: 'Anglican theology'
	},
	{
		value: 'Baptist theology'
	},
	{
		value: 'Catholic theology'
	},
	{
		value: 'Eastern Orthodox theology'
	},
	{
		value: 'Protestant theology'
	},
	{
		value: 'Hindu theology'
	},
	{
		value: 'Jewish theology'
	},
	{
		value: 'Muslim theology'
	},
	{
		value: 'Social Sciences'
	},
	{
		value: 'Anthropology'
	},
	{
		value: 'Biological anthropology'
	},
	{
		value: 'Linguistic anthropology'
	},
	{
		value: 'Cultural anthropology'
	},
	{
		value: 'Social anthropology'
	},
	{
		value: 'Archaeology'
	},
	{
		value: 'Economics'
	},
	{
		value: 'Agricultural economics'
	},
	{
		value: 'Anarchist economics'
	},
	{
		value: 'Applied economics'
	},
	{
		value: 'Behavioural economics'
	},
	{
		value: 'Bioeconomics'
	},
	{
		value: 'Complexity economics'
	},
	{
		value: 'Computational economics'
	},
	{
		value: 'Consumer economics'
	},
	{
		value: 'Development economics'
	},
	{
		value: 'Ecological economics'
	},
	{
		value: 'Econometrics'
	},
	{
		value: 'Economic geography'
	},
	{
		value: 'Economic sociology'
	},
	{
		value: 'Economic systems'
	},
	{
		value: 'Education economics'
	},
	{
		value: 'Energy economics'
	},
	{
		value: 'Entrepreneurial economics'
	},
	{
		value: 'Environmental economics'
	},
	{
		value: 'Evolutionary economics'
	},
	{
		value: 'Experimental economics'
	},
	{
		value: 'Feminist economics'
	},
	{
		value: 'Financial econometrics'
	},
	{
		value: 'Financial economics'
	},
	{
		value: 'Green economics'
	},
	{
		value: 'Growth economics'
	},
	{
		value: 'Human development theory'
	},
	{
		value: 'Industrial organization'
	},
	{
		value: 'Information economics'
	},
	{
		value: 'Institutional economics'
	},
	{
		value: 'International economics'
	},
	{
		value: 'Islamic economics'
	},
	{
		value: 'Labor economics'
	},
	{
		value: 'Law and economics'
	},
	{
		value: 'Macroeconomics'
	},
	{
		value: 'Managerial economics'
	},
	{
		value: 'Marxian economics'
	},
	{
		value: 'Mathematical economics'
	},
	{
		value: 'Microeconomics'
	},
	{
		value: 'Monetary economics'
	},
	{
		value: 'Neuroeconomics'
	},
	{
		value: 'Participatory economics'
	},
	{
		value: 'Political economy'
	},
	{
		value: 'Public economics'
	},
	{
		value: 'Public finance'
	},
	{
		value: 'Real estate economics'
	},
	{
		value: 'Resource economics'
	},
	{
		value: 'Social choice theory'
	},
	{
		value: 'Socialist economics'
	},
	{
		value: 'Socioeconomics'
	},
	{
		value: 'Transport economics'
	},
	{
		value: 'Welfare economics'
	},
	{
		value: 'Geography'
	},
	{
		value: 'Main article:Outline of geography'
	},
	{
		value: 'Physical geography'
	},
	{
		value: 'Atmology'
	},
	{
		value: 'Biogeography'
	},
	{
		value: 'Climatology'
	},
	{
		value: 'Coastal geography'
	},
	{
		value: 'Emergency management'
	},
	{
		value: 'Environmental geography'
	},
	{
		value: 'Geobiology'
	},
	{
		value: 'Geochemistry'
	},
	{
		value: 'Geology'
	},
	{
		value: 'Geomatics'
	},
	{
		value: 'Geomorphology'
	},
	{
		value: 'Geophysics'
	},
	{
		value: 'Glaciology'
	},
	{
		value: 'Hydrology'
	},
	{
		value: 'Landscape ecology'
	},
	{
		value: 'Lithology'
	},
	{
		value: 'Meteorology'
	},
	{
		value: 'Mineralogy'
	},
	{
		value: 'Oceanography'
	},
	{
		value: 'Palaeogeography'
	},
	{
		value: 'Palaeontology'
	},
	{
		value: 'Petrology'
	},
	{
		value: 'Quaternary science'
	},
	{
		value: 'Soil geography'
	},
	{
		value: 'Human geography'
	},
	{
		value: 'Behavioural geography'
	},
	{
		value: 'Cognitive geography'
	},
	{
		value: 'Cultural geography'
	},
	{
		value: 'Development geography'
	},
	{
		value: 'Health geography'
	},
	{
		value: 'Historical geography'
	},
	{
		value: 'Language geography'
	},
	{
		value: 'Marketing geography'
	},
	{
		value: 'Military geography'
	},
	{
		value: 'Political geography'
	},
	{
		value: 'Population geography'
	},
	{
		value: 'Religion geography'
	},
	{
		value: 'Social geography'
	},
	{
		value: 'Strategic geography'
	},
	{
		value: 'Time geography'
	},
	{
		value: 'Tourism geography'
	},
	{
		value: 'Transport geography'
	},
	{
		value: 'Urban geography'
	},
	{
		value: 'Integrated geography'
	},
	{
		value: 'Cartography'
	},
	{
		value: 'Celestial cartography'
	},
	{
		value: 'Planetary cartography'
	},
	{
		value: 'Topography'
	},
	{
		value: 'Political science'
	},
	{
		value: 'American politics'
	},
	{
		value: 'Canadian politics'
	},
	{
		value: 'Civics'
	},
	{
		value: 'Comparative politics'
	},
	{
		value: 'European studies'
	},
	{
		value: 'Geopolitics(Political geography)'
	},
	{
		value: 'International relations'
	},
	{
		value: 'International organizations'
	},
	{
		value: 'Nationalism studies'
	},
	{
		value: 'Peace and conflict studies'
	},
	{
		value: 'Policy studies'
	},
	{
		value: 'Political behavior'
	},
	{
		value: 'Political culture'
	},
	{
		value: 'Political philosophy'
	},
	{
		value: 'Public administration'
	},
	{
		value: 'Public law'
	},
	{
		value: 'Psephology'
	},
	{
		value: 'Psychology'
	},
	{
		value: 'Abnormal psychology'
	},
	{
		value: 'Applied psychology'
	},
	{
		value: 'Biological psychology'
	},
	{
		value: 'Clinical neuropsychology'
	},
	{
		value: 'Clinical psychology'
	},
	{
		value: 'Cognitive psychology'
	},
	{
		value: 'Community psychology'
	},
	{
		value: 'Comparative psychology'
	},
	{
		value: 'Conservation psychology'
	},
	{
		value: 'Consumer psychology'
	},
	{
		value: 'Counseling psychology'
	},
	{
		value: 'Criminal psychology'
	},
	{
		value: 'Cultural psychology'
	},
	{
		value: 'Asian psychology'
	},
	{
		value: 'Black psychology'
	},
	{
		value: 'Developmental psychology'
	},
	{
		value: 'Differential psychology'
	},
	{
		value: 'Ecological psychology'
	},
	{
		value: 'Educational psychology'
	},
	{
		value: 'Environmental psychology'
	},
	{
		value: 'Evolutionary psychology'
	},
	{
		value: 'Experimental psychology'
	},
	{
		value: 'Group psychology'
	},
	{
		value: 'Family psychology'
	},
	{
		value: 'Feminine psychology'
	},
	{
		value: 'Forensic developmental psychology'
	},
	{
		value: 'Forensic psychology'
	},
	{
		value: 'Health psychology'
	},
	{
		value: 'Humanistic psychology'
	},
	{
		value: 'Indigenous psychology'
	},
	{
		value: 'Legal psychology'
	},
	{
		value: 'Mathematical psychology'
	},
	{
		value: 'Media psychology'
	},
	{
		value: 'Medical psychology'
	},
	{
		value: 'Military psychology'
	},
	{
		value: 'Moral psychologyandDescriptive ethics'
	},
	{
		value: 'Music psychology'
	},
	{
		value: 'Neuropsychology'
	},
	{
		value: 'Occupational health psychology'
	},
	{
		value: 'Occupational psychology'
	},
	{
		value: 'Organizational psychology'
	},
	{
		value: 'Parapsychology'
	},
	{
		value: 'Pediatric psychology'
	},
	{
		value: 'Pedology (children study)'
	},
	{
		value: 'Personality psychology'
	},
	{
		value: 'Phenomenology'
	},
	{
		value: 'Political psychology'
	},
	{
		value: 'Positive psychology'
	},
	{
		value: 'Psychoanalysis'
	},
	{
		value: 'Psychobiology'
	},
	{
		value: 'Psychology of religion'
	},
	{
		value: 'Psychometrics'
	},
	{
		value: 'Psychopathology'
	},
	{
		value: 'Child psychopathology'
	},
	{
		value: 'Psychophysics'
	},
	{
		value: 'Quantitative psychology'
	},
	{
		value: 'Rehabilitation psychology'
	},
	{
		value: 'School psychology'
	},
	{
		value: 'Social psychology'
	},
	{
		value: 'Sport psychology'
	},
	{
		value: 'Traffic psychology'
	},
	{
		value: 'Transpersonal psychology'
	},
	{
		value: 'Sociology'
	},
	{
		value: 'Main article:Outline of sociology'
	},
	{
		value: 'Analytical sociology'
	},
	{
		value: 'Applied sociology'
	},
	{
		value: 'Leisure studies'
	},
	{
		value: 'Political sociology'
	},
	{
		value: 'Public sociology'
	},
	{
		value: 'Social engineering'
	},
	{
		value: 'Architectural sociology'
	},
	{
		value: 'Area studies'
	},
	{
		value: 'African studies'
	},
	{
		value: 'American studies'
	},
	{
		value: 'Appalachian studies'
	},
	{
		value: 'Canadian studies'
	},
	{
		value: 'Latin American studies'
	},
	{
		value: 'Asian studies'
	},
	{
		value: 'Central Asian studies'
	},
	{
		value: 'East Asian studies'
	},
	{
		value: 'Indology'
	},
	{
		value: 'Iranian studies'
	},
	{
		value: 'Japanese studies'
	},
	{
		value: 'Korean studies'
	},
	{
		value: 'Pakistan studies'
	},
	{
		value: 'Sindhology'
	},
	{
		value: 'Sinology'
	},
	{
		value: 'Southeast Asian studies'
	},
	{
		value: 'Thai studies'
	},
	{
		value: 'Australian studies'
	},
	{
		value: 'Celtic studies'
	},
	{
		value: 'German studies'
	},
	{
		value: 'Sociology in Poland'
	},
	{
		value: 'Scandinavian studies'
	},
	{
		value: 'Slavic studies'
	},
	{
		value: 'Middle Eastern studies'
	},
	{
		value: 'Arab studies'
	},
	{
		value: 'Assyriology'
	},
	{
		value: 'Egyptology'
	},
	{
		value: 'Jewish studies'
	},
	{
		value: 'Behavioral sociology'
	},
	{
		value: 'Collective behavior'
	},
	{
		value: 'Social movements'
	},
	{
		value: 'Community informatics'
	},
	{
		value: 'Social network analysis'
	},
	{
		value: 'Comparative sociology'
	},
	{
		value: 'Conflict theory'
	},
	{
		value: 'Criminology/Criminal justice'
	},
	{
		value: 'Critical management studies'
	},
	{
		value: 'Critical sociology'
	},
	{
		value: 'Cultural sociology'
	},
	{
		value: 'Cultural studies/ethnic studies'
	},
	{
		value: 'Africana studies'
	},
	{
		value: 'Cross-cultural studies'
	},
	{
		value: 'Culturology'
	},
	{
		value: 'Deaf studies'
	},
	{
		value: 'Ethnology'
	},
	{
		value: 'Utopian studies'
	},
	{
		value: 'Whiteness studies'
	},
	{
		value: 'Demography/Population'
	},
	{
		value: 'Digital sociology'
	},
	{
		value: 'Dramaturgical sociology'
	},
	{
		value: 'Educational sociology'
	},
	{
		value: 'Empirical sociology'
	},
	{
		value: 'Environmental sociology'
	},
	{
		value: 'Evolutionary sociology'
	},
	{
		value: 'Feminist sociology'
	},
	{
		value: 'Figurational sociology'
	},
	{
		value: 'Futures studies'
	},
	{
		value: 'Gender studies'
	},
	{
		value: 'Mens studies'
	},
	{
		value: 'Womens studies'
	},
	{
		value: 'Historical sociology'
	},
	{
		value: 'Human ecology'
	},
	{
		value: 'Humanistic sociology'
	},
	{
		value: 'Industrial sociology'
	},
	{
		value: 'Interactionism'
	},
	{
		value: 'Interpretive sociology'
	},
	{
		value: 'Ethnomethodology'
	},
	{
		value: 'Social constructionism'
	},
	{
		value: 'Symbolic interactionism'
	},
	{
		value: 'Jealousy sociology'
	},
	{
		value: 'Macrosociology'
	},
	{
		value: 'Marxist sociology'
	},
	{
		value: 'Mathematical sociology'
	},
	{
		value: 'Medical sociology'
	},
	{
		value: 'Mesosociology'
	},
	{
		value: 'Microsociology'
	},
	{
		value: 'Military sociology'
	},
	{
		value: 'Natural resource sociology'
	},
	{
		value: 'Organizational studies'
	},
	{
		value: 'Phenomenological sociology'
	},
	{
		value: 'Policy sociology'
	},
	{
		value: 'Psychoanalytic sociology'
	},
	{
		value: 'Science studies/Science and technology studies'
	},
	{
		value: 'Sexology'
	},
	{
		value: 'Heterosexism'
	},
	{
		value: 'Human sexual behavior'
	},
	{
		value: 'Human sexuality'
	},
	{
		value: 'Queer studies/Queer theory'
	},
	{
		value: 'Sex education'
	},
	{
		value: 'Social capital'
	},
	{
		value: 'Social change'
	},
	{
		value: 'Social conflict theory'
	},
	{
		value: 'Social control'
	},
	{
		value: 'Pure sociology'
	},
	{
		value: 'Social economy'
	},
	{
		value: 'Social philosophy'
	},
	{
		value: 'Social policy'
	},
	{
		value: 'Social stratification'
	},
	{
		value: 'Social theory'
	},
	{
		value: 'Social transformation'
	},
	{
		value: 'Computational sociology'
	},
	{
		value: 'Economic sociology/Socioeconomics'
	},
	{
		value: 'Economic development'
	},
	{
		value: 'Social development'
	},
	{
		value: 'Sociobiology'
	},
	{
		value: 'Sociocybernetics'
	},
	{
		value: 'Sociology of aging'
	},
	{
		value: 'Sociology of agriculture'
	},
	{
		value: 'Sociology of art'
	},
	{
		value: 'Sociology of autism'
	},
	{
		value: 'Sociology of childhood'
	},
	{
		value: 'Sociology of conflict'
	},
	{
		value: 'Sociology of culture'
	},
	{
		value: 'Sociology of cyberspace'
	},
	{
		value: 'Sociology of development'
	},
	{
		value: 'Sociology of deviance'
	},
	{
		value: 'Sociology of disaster'
	},
	{
		value: 'Sociology of education'
	},
	{
		value: 'Sociology of emotions'
	},
	{
		value: 'Sociology of fatherhood'
	},
	{
		value: 'Sociology of finance'
	},
	{
		value: 'Sociology of food'
	},
	{
		value: 'Sociology of gender'
	},
	{
		value: 'Sociology of generations'
	},
	{
		value: 'Sociology of globalization'
	},
	{
		value: 'Sociology of government'
	},
	{
		value: 'Sociology of health and illness'
	},
	{
		value: 'Sociology of human consciousness'
	},
	{
		value: 'Sociology of immigration'
	},
	{
		value: 'Sociology of knowledge'
	},
	{
		value: 'Sociology of language'
	},
	{
		value: 'Sociology of law'
	},
	{
		value: 'Sociology of leisure'
	},
	{
		value: 'Sociology of literature'
	},
	{
		value: 'Sociology of markets'
	},
	{
		value: 'Sociology of marriage'
	},
	{
		value: 'Sociology of motherhood'
	},
	{
		value: 'Sociology of music'
	},
	{
		value: 'Sociology of natural resources'
	},
	{
		value: 'Sociology of organizations'
	},
	{
		value: 'Sociology of peace, war, and social conflict'
	},
	{
		value: 'Sociology of punishment'
	},
	{
		value: 'Sociology of race and ethnic relations'
	},
	{
		value: 'Sociology of religion'
	},
	{
		value: 'Sociology of risk'
	},
	{
		value: 'Sociology of science'
	},
	{
		value: 'Sociology of scientific knowledge'
	},
	{
		value: 'Sociology of social change'
	},
	{
		value: 'Sociology of social movements'
	},
	{
		value: 'Sociology of space'
	},
	{
		value: 'Sociology of sport'
	},
	{
		value: 'Sociology of technology'
	},
	{
		value: 'Sociology of terrorism'
	},
	{
		value: 'Sociology of the body'
	},
	{
		value: 'Sociology of the family'
	},
	{
		value: 'Sociology of the history of science'
	},
	{
		value: 'Sociology of the Internet'
	},
	{
		value: 'Sociology of work'
	},
	{
		value: 'Sociomusicology'
	},
	{
		value: 'Structural sociology'
	},
	{
		value: 'Theoretical sociology'
	},
	{
		value: 'Urban studiesorUrban sociology/Rural sociology'
	},
	{
		value: 'Victimology'
	},
	{
		value: 'Visual sociology'
	},
	{
		value: 'Social Work'
	},
	{
		value: 'Clinical Social Work'
	},
	{
		value: 'Community practice'
	},
	{
		value: 'Mental health'
	},
	{
		value: 'Psychosocial rehabilitation'
	},
	{
		value: 'Person-centered therapy'
	},
	{
		value: 'Family therapy'
	},
	{
		value: 'Financial social work'
	},
	{
		value: 'Natural Sciences'
	},
	{
		value: 'Biology'
	},
	{
		value: 'Aerobiology'
	},
	{
		value: 'Anatomy'
	},
	{
		value: 'Comparative anatomy'
	},
	{
		value: 'Human anatomy'
	},
	{
		value: 'Biochemistry'
	},
	{
		value: 'Bioinformatics'
	},
	{
		value: 'Biophysics'
	},
	{
		value: 'Biotechnology'
	},
	{
		value: 'Botany'
	},
	{
		value: 'Ethnobotany'
	},
	{
		value: 'Phycology'
	},
	{
		value: 'Cell biology'
	},
	{
		value: 'Chronobiology'
	},
	{
		value: 'Computational biology'
	},
	{
		value: 'Cryobiology'
	},
	{
		value: 'Developmental biology'
	},
	{
		value: 'Embryology'
	},
	{
		value: 'Teratology'
	},
	{
		value: 'Ecology'
	},
	{
		value: 'Agroecology'
	},
	{
		value: 'Ethnoecology'
	},
	{
		value: 'Endocrinology'
	},
	{
		value: 'Evolutionary biology'
	},
	{
		value: 'Genetics'
	},
	{
		value: 'Behavioural genetics'
	},
	{
		value: 'Molecular genetics'
	},
	{
		value: 'Population genetics'
	},
	{
		value: 'Histology'
	},
	{
		value: 'Human biology'
	},
	{
		value: 'Immunology'
	},
	{
		value: 'Limnology'
	},
	{
		value: 'Linnaean taxonomy'
	},
	{
		value: 'Marine biology'
	},
	{
		value: 'Mathematical biology'
	},
	{
		value: 'Microbiology'
	},
	{
		value: 'Molecular biology'
	},
	{
		value: 'Mycology'
	},
	{
		value: 'Neuroscience'
	},
	{
		value: 'Behavioral neuroscience'
	},
	{
		value: 'Nutrition'
	},
	{
		value: 'Paleobiology'
	},
	{
		value: 'Paleontology'
	},
	{
		value: 'Parasitology'
	},
	{
		value: 'Pathology'
	},
	{
		value: 'Anatomical pathology'
	},
	{
		value: 'Clinical pathology'
	},
	{
		value: 'Dermatopathology'
	},
	{
		value: 'Forensic pathology'
	},
	{
		value: 'Hematopathology'
	},
	{
		value: 'Histopathology'
	},
	{
		value: 'Molecular pathology'
	},
	{
		value: 'Surgical pathology'
	},
	{
		value: 'Physiology'
	},
	{
		value: 'Human physiology'
	},
	{
		value: 'Exercise physiology'
	},
	{
		value: 'Structural Biology'
	},
	{
		value: 'Systematics(Taxonomy)'
	},
	{
		value: 'Systems biology'
	},
	{
		value: 'Virology'
	},
	{
		value: 'Molecular virology'
	},
	{
		value: 'Xenobiology'
	},
	{
		value: 'Zoology'
	},
	{
		value: 'Animal communications'
	},
	{
		value: 'Apiology'
	},
	{
		value: 'Arachnology'
	},
	{
		value: 'Carcinology'
	},
	{
		value: 'Cetology'
	},
	{
		value: 'Entomology'
	},
	{
		value: 'Forensic entomology'
	},
	{
		value: 'Ethnozoology'
	},
	{
		value: 'Ethology'
	},
	{
		value: 'Helminthology'
	},
	{
		value: 'Herpetology'
	},
	{
		value: 'Ichthyology'
	},
	{
		value: 'Mammalogy'
	},
	{
		value: 'Malacology'
	},
	{
		value: 'Conchology'
	},
	{
		value: 'Myrmecology'
	},
	{
		value: 'Nematology'
	},
	{
		value: 'Neuroethology'
	},
	{
		value: 'Oology'
	},
	{
		value: 'Ornithologt'
	},
	{
		value: 'Planktology'
	},
	{
		value: 'Primatology'
	},
	{
		value: 'Zootomy'
	},
	{
		value: 'Zoosemiotics'
	},
	{
		value: 'Chemistry'
	},
	{
		value: 'Agrochemistry'
	},
	{
		value: 'Analytical chemistry'
	},
	{
		value: 'Astrochemistry'
	},
	{
		value: 'Atmospheric chemistry'
	},
	{
		value: 'Chemical biology'
	},
	{
		value: 'Chemical engineering(outline)'
	},
	{
		value: 'Cheminformatics'
	},
	{
		value: 'Computational chemistry'
	},
	{
		value: 'Cosmochemistry'
	},
	{
		value: 'Electrochemistry'
	},
	{
		value: 'Environmental chemistry'
	},
	{
		value: 'Femtochemistry'
	},
	{
		value: 'Flavor'
	},
	{
		value: 'Flow chemistry'
	},
	{
		value: 'Green chemistry'
	},
	{
		value: 'Histochemistry'
	},
	{
		value: 'Hydrogenation'
	},
	{
		value: 'Immunochemistry'
	},
	{
		value: 'Inorganic chemistry'
	},
	{
		value: 'Marine chemistry'
	},
	{
		value: 'Mathematical chemistry'
	},
	{
		value: 'Mechanochemistry'
	},
	{
		value: 'Medicinal chemistry'
	},
	{
		value: 'Molecular mechanics'
	},
	{
		value: 'Nanotechnology'
	},
	{
		value: 'Natural product chemistry'
	},
	{
		value: 'Neurochemistry'
	},
	{
		value: 'Oenology'
	},
	{
		value: 'Organic chemistry'
	},
	{
		value: 'Organometallic chemistry'
	},
	{
		value: 'Petrochemistry'
	},
	{
		value: 'Pharmacology'
	},
	{
		value: 'Photochemistry'
	},
	{
		value: 'Physical chemistry'
	},
	{
		value: 'Physical organic chemistry'
	},
	{
		value: 'Phytochemistry'
	},
	{
		value: 'Polymer chemistry'
	},
	{
		value: 'Quantum chemistry'
	},
	{
		value: 'Radiochemistry'
	},
	{
		value: 'Solid-state chemistry'
	},
	{
		value: 'Sonochemistry'
	},
	{
		value: 'Supramolecular chemistry'
	},
	{
		value: 'Surface chemistry'
	},
	{
		value: 'Synthetic chemistry'
	},
	{
		value: 'Theoretical chemistry'
	},
	{
		value: 'Thermochemistry'
	},
	{
		value: 'Earth science'
	},
	{
		value: 'Main article:Outline of earth science'
	},
	{
		value: 'See also:Branches of earth sciences'
	},
	{
		value: 'Edaphology'
	},
	{
		value: 'Environmental science'
	},
	{
		value: 'Gemology'
	},
	{
		value: 'Geodesy'
	},
	{
		value: 'Physical geography(outline)'
	},
	{
		value: 'Atmospheric science/Meteorology(outline)'
	},
	{
		value: 'Biogeography/Phytogeography'
	},
	{
		value: 'Climatology/Paleoclimatology/Palaeogeography'
	},
	{
		value: 'Coastal geography/Oceanography'
	},
	{
		value: 'Edaphology/PedologyorSoil science'
	},
	{
		value: 'Geology (Geomorphology,Mineralogy,Petrology,Sedimentology,Speleology,Tectonics,Volcanology)'
	},
	{
		value: 'Geostatistics'
	},
	{
		value: 'Hydrology/Limnology/Hydrogeology'
	},
	{
		value: 'Geophysics'
	},
	{
		value: 'Paleoecology'
	},
	{
		value: 'Space sciences'
	},
	{
		value: 'Astrobiology'
	},
	{
		value: 'Astronomy'
	},
	{
		value: 'Observational astronomy'
	},
	{
		value: 'Gamma ray astronomy'
	},
	{
		value: 'Infrared astronomy'
	},
	{
		value: 'Microwave astronomy'
	},
	{
		value: 'Optical astronomy'
	},
	{
		value: 'Radio astronomy'
	},
	{
		value: 'UV astronomy'
	},
	{
		value: 'X-ray astronomy'
	},
	{
		value: 'Astrophysics'
	},
	{
		value: 'Gravitational astronomy'
	},
	{
		value: 'Black holes'
	},
	{
		value: 'Interstellar medium'
	},
	{
		value: 'Numerical simulations'
	},
	{
		value: 'Astrophysical plasma'
	},
	{
		value: 'Galaxy formation and evolution'
	},
	{
		value: 'High-energy astrophysics'
	},
	{
		value: 'Hydrodynamics'
	},
	{
		value: 'Magnetohydrodynamics'
	},
	{
		value: 'Star formation'
	},
	{
		value: 'Physical cosmology'
	},
	{
		value: 'Stellar astrophysics'
	},
	{
		value: 'Helioseismology'
	},
	{
		value: 'Stellar evolution'
	},
	{
		value: 'Stellar nucleosynthesis'
	},
	{
		value: 'Planetary science'
	},
	{
		value: 'Physics'
	},
	{
		value: 'Acoustics'
	},
	{
		value: 'Aerodynamics'
	},
	{
		value: 'Applied physics'
	},
	{
		value: 'Atomic, molecular, and optical physics'
	},
	{
		value: 'Computational physics'
	},
	{
		value: 'Condensed matter physics'
	},
	{
		value: 'Cryogenics'
	},
	{
		value: 'Electricity'
	},
	{
		value: 'Electromagnetism'
	},
	{
		value: 'Elementary particle physics'
	},
	{
		value: 'Experimental physics'
	},
	{
		value: 'Fluid dynamics'
	},
	{
		value: 'Mathematical physics'
	},
	{
		value: 'Mechanics'
	},
	{
		value: 'Medical physics'
	},
	{
		value: 'Molecular physics'
	},
	{
		value: 'Newtonian dynamics'
	},
	{
		value: 'Nuclear physics'
	},
	{
		value: 'Optics'
	},
	{
		value: 'Plasma physics'
	},
	{
		value: 'Quantum physics'
	},
	{
		value: 'Solid mechanics'
	},
	{
		value: 'Solid state physics'
	},
	{
		value: 'Statistical mechanics'
	},
	{
		value: 'Theoretical physics'
	},
	{
		value: 'Thermal physics'
	},
	{
		value: 'Thermodynamics'
	},
	{
		value: 'Formal Sciences'
	},
	{
		value: 'Computer Science'
	},
	{
		value: 'Main articles:Computer scienceandOutline of computer science'
	},
	{
		value: 'See also:ACM Computing Classification System'
	},
	{
		value: 'Also a branch ofelectrical engineering'
	},
	{
		value: 'Logic in computer science'
	},
	{
		value: 'Formal methods'
	},
	{
		value: 'Logic programming'
	},
	{
		value: 'Multi-valued logic'
	},
	{
		value: 'Fuzzy logic'
	},
	{
		value: 'Programming language semantics'
	},
	{
		value: 'Type theory'
	},
	{
		value: 'Algorithms'
	},
	{
		value: 'Computational geometry'
	},
	{
		value: 'Distributed algorithms'
	},
	{
		value: 'Parallel algorithms'
	},
	{
		value: 'Randomized algorithms'
	},
	{
		value: 'Artificial Intelligence'
	},
	{
		value: 'Cognitive science'
	},
	{
		value: 'Automated reasoning'
	},
	{
		value: 'Computer vision'
	},
	{
		value: 'Machine learning'
	},
	{
		value: 'Artificial neural network'
	},
	{
		value: 'Support vector machine'
	},
	{
		value: 'Natural language processing(Computational linguistics)'
	},
	{
		value: 'Expert systems'
	},
	{
		value: 'Robotics'
	},
	{
		value: 'Data structures'
	},
	{
		value: 'Computer architecture'
	},
	{
		value: 'Computer graphics'
	},
	{
		value: 'Image processing'
	},
	{
		value: 'Scientific visualization'
	},
	{
		value: 'Computer communications (networks)'
	},
	{
		value: 'Cloud computing'
	},
	{
		value: 'Information theory'
	},
	{
		value: 'Internet,World Wide Web'
	},
	{
		value: 'Ubiquitous computing'
	},
	{
		value: 'Wireless computing(Mobile computing)'
	},
	{
		value: 'Computer securityandreliability'
	},
	{
		value: 'Cryptography'
	},
	{
		value: 'Fault-tolerant computing'
	},
	{
		value: 'Computing inmathematics,natural sciences,engineering, andmedicine'
	},
	{
		value: 'Algebraic (symbolic) computation'
	},
	{
		value: 'Computational biology (bioinformatics)'
	},
	{
		value: 'Computational mathematics'
	},
	{
		value: 'Computational neuroscience'
	},
	{
		value: 'Computational number theory'
	},
	{
		value: 'Computer-aided engineering'
	},
	{
		value: 'Computational fluid dynamics'
	},
	{
		value: 'Finite element analysis'
	},
	{
		value: 'Numerical analysis'
	},
	{
		value: 'Computational science'
	},
	{
		value: 'Computing insocial sciences,arts,humanities, andprofessions'
	},
	{
		value: 'Computational finance'
	},
	{
		value: 'Digital humanities'
	},
	{
		value: 'Humanistic informatics'
	},
	{
		value: 'Database'
	},
	{
		value: 'Distributed database'
	},
	{
		value: 'Object database'
	},
	{
		value: 'Relational database'
	},
	{
		value: 'Data management'
	},
	{
		value: 'Data mining'
	},
	{
		value: 'Information architecture'
	},
	{
		value: 'Information management'
	},
	{
		value: 'Information retrieval'
	},
	{
		value: 'Knowledge management'
	},
	{
		value: 'Multimedia,hypermedia'
	},
	{
		value: 'Sound and music computing'
	},
	{
		value: 'Distributed computing'
	},
	{
		value: 'Grid computing'
	},
	{
		value: 'Human-computer interaction'
	},
	{
		value: 'Operating systems'
	},
	{
		value: 'Parallel computing'
	},
	{
		value: 'High-performance computing'
	},
	{
		value: 'Programming languages'
	},
	{
		value: 'Compilers'
	},
	{
		value: 'Programming paradigms'
	},
	{
		value: 'Concurrent programming'
	},
	{
		value: 'Functional programming'
	},
	{
		value: 'Imperative programming'
	},
	{
		value: 'Object-oriented programming'
	},
	{
		value: 'Program semantics'
	},
	{
		value: 'Quantum computing'
	},
	{
		value: 'Software engineering'
	},
	{
		value: 'Theory of computation'
	},
	{
		value: 'Automata theory(Formal languages)'
	},
	{
		value: 'Computability theory'
	},
	{
		value: 'Computational complexity theory'
	},
	{
		value: 'Concurrency theory'
	},
	{
		value: 'VLSI design'
	},
	{
		value: 'Mathematics'
	},
	{
		value: 'Pure mathematics'
	},
	{
		value: 'Mathematical logicandFoundations of mathematics'
	},
	{
		value: 'Intuitionistic logic'
	},
	{
		value: 'Modal logic'
	},
	{
		value: 'Model theory'
	},
	{
		value: 'Proof theory'
	},
	{
		value: 'Recursion theory'
	},
	{
		value: 'Set theory'
	},
	{
		value: 'Algebra'
	},
	{
		value: 'Associative algebra'
	},
	{
		value: 'Category theory'
	},
	{
		value: 'Topos theory'
	},
	{
		value: 'Differential algebra'
	},
	{
		value: 'Field theory'
	},
	{
		value: 'Group theory'
	},
	{
		value: 'Group representation'
	},
	{
		value: 'Homological algebra'
	},
	{
		value: 'K-theory'
	},
	{
		value: 'Lattice theory(Order theory)'
	},
	{
		value: 'Lie algebra'
	},
	{
		value: 'Linear algebra(Vector space)'
	},
	{
		value: 'Multilinear algebra'
	},
	{
		value: 'Non-associative algebra'
	},
	{
		value: 'Representation theory'
	},
	{
		value: 'Ring theory'
	},
	{
		value: 'Commutative algebra'
	},
	{
		value: 'Noncommutative algebra'
	},
	{
		value: 'Universal algebra'
	},
	{
		value: 'Analysis'
	},
	{
		value: 'Complex analysis'
	},
	{
		value: 'Functional analysis'
	},
	{
		value: 'Operator theory'
	},
	{
		value: 'Harmonic analysis'
	},
	{
		value: 'Fourier analysis'
	},
	{
		value: 'Non-standard analysis'
	},
	{
		value: 'Ordinary differential equations'
	},
	{
		value: 'p-adic analysis'
	},
	{
		value: 'Partial differential equations'
	},
	{
		value: 'Real analysis'
	},
	{
		value: 'Calculus'
	},
	{
		value: 'Probability theory'
	},
	{
		value: 'Ergodic theory'
	},
	{
		value: 'Measure theory'
	},
	{
		value: 'Integral geometry'
	},
	{
		value: 'Stochastic process'
	},
	{
		value: 'Geometry andTopology'
	},
	{
		value: 'Affine geometry'
	},
	{
		value: 'Algebraic geometry'
	},
	{
		value: 'Algebraic topology'
	},
	{
		value: 'Convex geometry'
	},
	{
		value: 'Differential topology'
	},
	{
		value: 'Discrete geometry'
	},
	{
		value: 'Finite geometry'
	},
	{
		value: 'Galois geometry'
	},
	{
		value: 'General topology'
	},
	{
		value: 'Geometric topology'
	},
	{
		value: 'Noncommutative geometry'
	},
	{
		value: 'Non-Euclidean geometry'
	},
	{
		value: 'Projective geometry'
	},
	{
		value: 'Number theory'
	},
	{
		value: 'Algebraic number theory'
	},
	{
		value: 'Analytic number theory'
	},
	{
		value: 'Arithmetic combinatorics'
	},
	{
		value: 'Geometric number theory'
	},
	{
		value: 'Applied mathematics'
	},
	{
		value: 'Approximation theory'
	},
	{
		value: 'Combinatorics'
	},
	{
		value: 'Coding theory'
	},
	{
		value: 'Dynamical systems'
	},
	{
		value: 'Chaos theory'
	},
	{
		value: 'Fractal geometry'
	},
	{
		value: 'Game theory'
	},
	{
		value: 'Graph theory'
	},
	{
		value: 'Quantum field theory'
	},
	{
		value: 'Quantum gravity'
	},
	{
		value: 'String theory'
	},
	{
		value: 'Quantum mechanics'
	},
	{
		value: 'Operations research'
	},
	{
		value: 'Assignment problem'
	},
	{
		value: 'Decision analysis'
	},
	{
		value: 'Dynamic programming'
	},
	{
		value: 'Inventory theory'
	},
	{
		value: 'Linear programming'
	},
	{
		value: 'Mathematical optimization'
	},
	{
		value: 'Optimal maintenance'
	},
	{
		value: 'Real options analysis'
	},
	{
		value: 'Scheduling'
	},
	{
		value: 'Stochastic processes'
	},
	{
		value: 'Systems analysis'
	},
	{
		value: 'Statistics'
	},
	{
		value: 'Actuarial science'
	},
	{
		value: 'Demography'
	},
	{
		value: 'Mathematical statistics'
	},
	{
		value: 'Data visualization'
	},
	{
		value: 'Statistics'
	},
	{
		value: 'Astrostatistics'
	},
	{
		value: 'Biostatistics'
	},
	{
		value: 'Applied Sciences'
	},
	{
		value: 'Business'
	},
	{
		value: 'Accounting'
	},
	{
		value: 'Business management'
	},
	{
		value: 'Marketing'
	},
	{
		value: 'Operations management'
	},
	{
		value: 'Engineering'
	},
	{
		value: 'Chemical Engineering'
	},
	{
		value: 'Bioengineering'
	},
	{
		value: 'Biochemical engineering'
	},
	{
		value: 'Biomolecular engineering'
	},
	{
		value: 'Catalysis'
	},
	{
		value: 'Materials engineering'
	},
	{
		value: 'Molecular engineering'
	},
	{
		value: 'Polymer engineering'
	},
	{
		value: 'Process design'
	},
	{
		value: 'Petroleum engineering'
	},
	{
		value: 'Nuclear engineering'
	},
	{
		value: 'Food engineering'
	},
	{
		value: 'Process engineering'
	},
	{
		value: 'Reaction engineering'
	},
	{
		value: 'Transport phenomena'
	},
	{
		value: 'Civil Engineering'
	},
	{
		value: 'Coastal engineering'
	},
	{
		value: 'Earthquake engineering'
	},
	{
		value: 'Ecological engineering'
	},
	{
		value: 'Environmental engineering'
	},
	{
		value: 'Geotechnical engineering'
	},
	{
		value: 'Engineering geology'
	},
	{
		value: 'Hydraulic engineering'
	},
	{
		value: 'Mining engineering'
	},
	{
		value: 'Transportation engineering'
	},
	{
		value: 'Highway engineering'
	},
	{
		value: 'Structural engineering'
	},
	{
		value: 'Architectural engineering'
	},
	{
		value: 'Structural mechanics'
	},
	{
		value: 'Surveying'
	},
	{
		value: 'Educational Technology'
	},
	{
		value: 'Instructional design'
	},
	{
		value: 'Distance education'
	},
	{
		value: 'Instructional simulation'
	},
	{
		value: 'Human performance technology'
	},
	{
		value: 'Electrical Engineering'
	},
	{
		value: 'Computer engineering'
	},
	{
		value: 'Computer science'
	},
	{
		value: 'Control systems engineering'
	},
	{
		value: 'Control theory'
	},
	{
		value: 'Electronic engineering'
	},
	{
		value: 'Instrumentation engineering'
	},
	{
		value: 'Engineering physics'
	},
	{
		value: 'Photonics'
	},
	{
		value: 'Mechatronics'
	},
	{
		value: 'Power engineering'
	},
	{
		value: 'Semiconductors'
	},
	{
		value: 'Telecommunications engineering'
	},
	{
		value: 'Materials Science and Engineering'
	},
	{
		value: 'Biomaterials'
	},
	{
		value: 'Ceramic engineering'
	},
	{
		value: 'Crystallography'
	},
	{
		value: 'Nanomaterials'
	},
	{
		value: 'Physical Metallurgy'
	},
	{
		value: 'Polymer science'
	},
	{
		value: 'Mechanical Engineering'
	},
	{
		value: 'Aerospace engineering'
	},
	{
		value: 'Aeronautics'
	},
	{
		value: 'Astronautics'
	},
	{
		value: 'Acoustical engineering'
	},
	{
		value: 'Automotive engineering'
	},
	{
		value: 'Biomedical engineering'
	},
	{
		value: 'Biomechanical engineering'
	},
	{
		value: 'Neural engineering'
	},
	{
		value: 'Continuum mechanics'
	},
	{
		value: 'Fluid mechanics'
	},
	{
		value: 'Heat transfer'
	},
	{
		value: 'Industrial engineering'
	},
	{
		value: 'Manufacturing engineering'
	},
	{
		value: 'Marine engineering'
	},
	{
		value: 'Mass transfer'
	},
	{
		value: 'Nanoengineering'
	},
	{
		value: 'Ocean engineering'
	},
	{
		value: 'Optical engineering'
	},
	{
		value: 'Robotics'
	},
	{
		value: 'Systems science'
	},
	{
		value: 'Complex systems'
	},
	{
		value: 'Conceptual systems'
	},
	{
		value: 'Affect control theory'
	},
	{
		value: 'Control engineering'
	},
	{
		value: 'Control systems'
	},
	{
		value: 'Perceptual control theory'
	},
	{
		value: 'Cybernetics'
	},
	{
		value: 'Biocybernetics'
	},
	{
		value: 'Engineering cybernetics'
	},
	{
		value: 'Management cybernetics'
	},
	{
		value: 'Medical cybernetics'
	},
	{
		value: 'New Cybernetics'
	},
	{
		value: 'Second-order cybernetics'
	},
	{
		value: 'Network science'
	},
	{
		value: 'Computational systems biology'
	},
	{
		value: 'Synthetic biology'
	},
	{
		value: 'Systems immunology'
	},
	{
		value: 'Systems neuroscience'
	},
	{
		value: 'System dynamics'
	},
	{
		value: 'Social dynamics'
	},
	{
		value: 'Systems ecology'
	},
	{
		value: 'Ecosystem ecology'
	},
	{
		value: 'Systems engineering'
	},
	{
		value: 'Biological systems engineering'
	},
	{
		value: 'Earth systems engineering and management'
	},
	{
		value: 'Enterprise systems engineering'
	},
	{
		value: 'Systems psychology'
	},
	{
		value: 'Ergonomics'
	},
	{
		value: 'Family systems theory'
	},
	{
		value: 'Systemic therapy'
	},
	{
		value: 'Systems theory'
	},
	{
		value: 'Biochemical systems theory'
	},
	{
		value: 'Ecological systems theory'
	},
	{
		value: 'Developmental systems theory'
	},
	{
		value: 'General systems theory'
	},
	{
		value: 'Living systems theory'
	},
	{
		value: 'LTI system theory'
	},
	{
		value: 'Mathematical system theory'
	},
	{
		value: 'Sociotechnical systems theory'
	},
	{
		value: 'World-systems theory'
	},
	{
		value: 'Systems theory in anthropology'
	},
	{
		value: 'Medicine and health'
	},
	{
		value: 'Alternative medicine'
	},
	{
		value: 'Audiology'
	},
	{
		value: 'Clinical laboratory sciences/Clinical pathology/Laboratory medicine'
	},
	{
		value: 'Clinical biochemistry'
	},
	{
		value: 'Cytogenetics'
	},
	{
		value: 'Cytohematology'
	},
	{
		value: 'Cytology'
	},
	{
		value: 'Haemostasiology'
	},
	{
		value: 'Clinical immunology'
	},
	{
		value: 'Clinical microbiology'
	},
	{
		value: 'Clinical physiology'
	},
	{
		value: 'Dentistry'
	},
	{
		value: 'Dental hygieneandepidemiology'
	},
	{
		value: 'Dental surgery'
	},
	{
		value: 'Endodontics'
	},
	{
		value: 'Implantology'
	},
	{
		value: 'Oral and maxillofacial surgery'
	},
	{
		value: 'Orthodontics'
	},
	{
		value: 'Periodontics'
	},
	{
		value: 'Prosthodontics'
	},
	{
		value: 'Dermatology'
	},
	{
		value: 'Emergency medicine'
	},
	{
		value: 'Epidemiology'
	},
	{
		value: 'Geriatrics'
	},
	{
		value: 'Gynaecology'
	},
	{
		value: 'Health informatics/Clinical informatics'
	},
	{
		value: 'Hematology'
	},
	{
		value: 'Infectious disease'
	},
	{
		value: 'Intensive care medicine'
	},
	{
		value: 'Internal medicine'
	},
	{
		value: 'Cardiology'
	},
	{
		value: 'Cardiac electrophysiology'
	},
	{
		value: 'Gastroenterology'
	},
	{
		value: 'Hepatology'
	},
	{
		value: 'Nephrology'
	},
	{
		value: 'Neurology'
	},
	{
		value: 'Oncology'
	},
	{
		value: 'Pulmonology'
	},
	{
		value: 'Rheumatology'
	},
	{
		value: 'Medical toxicology'
	},
	{
		value: 'Music therapy'
	},
	{
		value: 'Nursing'
	},
	{
		value: 'Nutrition anddietetics'
	},
	{
		value: 'Obstetrics'
	},
	{
		value: 'Occupational hygiene'
	},
	{
		value: 'Occupational therapy'
	},
	{
		value: 'Occupational toxicology'
	},
	{
		value: 'Ophthalmology'
	},
	{
		value: 'Neuro-ophthalmology'
	},
	{
		value: 'Optometry'
	},
	{
		value: 'Otolaryngology'
	},
	{
		value: 'Pediatrics'
	},
	{
		value: 'Pharmaceutical sciences'
	},
	{
		value: 'Pharmacy'
	},
	{
		value: 'Physical fitness'
	},
	{
		value: 'Group Fitness /aerobics'
	},
	{
		value: 'Kinesiology/ Exercise science / Human performance'
	},
	{
		value: 'Personal fitness training'
	},
	{
		value: 'Physical therapy'
	},
	{
		value: 'Physiotherapy'
	},
	{
		value: 'Podiatry'
	},
	{
		value: 'Preventive medicine'
	},
	{
		value: 'Primary care'
	},
	{
		value: 'General practice'
	},
	{
		value: 'Psychiatry'
	},
	{
		value: 'Forensic psychiatry'
	},
	{
		value: 'Psychology'
	},
	{
		value: 'Public health'
	},
	{
		value: 'Radiology'
	},
	{
		value: 'Recreational therapy'
	},
	{
		value: 'Rehabilitation medicine'
	},
	{
		value: 'Respiratory therapy'
	},
	{
		value: 'Sleep medicine'
	},
	{
		value: 'Speech-language pathology'
	},
	{
		value: 'Sports medicine'
	},
	{
		value: 'Surgery'
	},
	{
		value: 'Bariatric surgery'
	},
	{
		value: 'Cardiothoracic surgery'
	},
	{
		value: 'Neurosurgery'
	},
	{
		value: 'Orthoptics'
	},
	{
		value: 'Orthopedic surgery'
	},
	{
		value: 'Plastic surgery'
	},
	{
		value: 'Trauma surgery'
	},
	{
		value: 'Traumatology'
	},
	{
		value: 'Traditional medicine'
	},
	{
		value: 'Urology'
	},
	{
		value: 'Andrology'
	},
	{
		value: 'Veterinary medicine'
	}
];
