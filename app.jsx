import { useState, useCallback, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const VRAAG_ANTWOORD = [
  "Bij wie gaat u wonen in Nederland?",
  "Hoe bent u hier gekomen?",
  "Hoe gaat het met u?",
  "Hoe gaat u naar uw werk?",
  "Hoe laat begint u met werken?",
  "Hoe laat gaat u 's avonds naar bed?",
  "Hoe laat is het nu?",
  "Hoe laat stopt u met werken?",
  "Hoe laat wordt u 's ochtends wakker?",
  "Hoe vaak bent u al in Nederland geweest?",
  "Hoe vaak kijkt u tv?",
  "Hoe vaak luistert u naar de radio?",
  "Hoeveel broers en zussen hebt u?",
  "Hoeveel dagen in de week werkt u?",
  "Hoeveel jaar school hebt u gehad?",
  "Hoeveel kinderen hebt u?",
  "Hoeveel talen spreekt u?",
  "In wat voor huis gaat u wonen in Nederland?",
  "In welk land bent u geboren?",
  "In welke plaats gaat u wonen in Nederland?",
  "Met hoeveel mensen werkt u?",
  "Naar welke muziek luistert u graag?",
  "Op welke dagen werkt u?",
  "Van welke muziek houdt u?",
  "Waar bent u geboren?",
  "Waar heeft u Nederlands geleerd?",
  "Waar woont u?",
  "Waar woont uw familie?",
  "Waarom wilt u naar Nederland?",
  "Wanneer bent u geboren?",
  "Wanneer wilt u naar Nederland gaan?",
  "Wat doet u graag met uw familie?",
  "Wat doet u graag met uw vrienden?",
  "Wat doet u in het weekend?",
  "Wat doet u in uw vrije tijd?",
  "Wat doet u op een feestdag?",
  "Wat drinkt u graag?",
  "Wat eet u 's avonds?",
  "Wat eet u 's ochtends?",
  "Wat gaat u morgen doen?",
  "Wat hebt u geleerd op school?",
  "Wat hebt u gisteren gedaan?",
  "Wat hebt u gisteren gegeten?",
  "Wat is uw adres?",
  "Wat is uw telefoonnummer?",
  "Wat kookt u graag?",
  "Wat vindt u van de Nederlandse taal?",
  "Wat vindt u van Nederland?",
  "Wat vindt u van Nederlandse mensen?",
  "Wat voor kleren draagt u vaak?",
  "Wat voor kleren vindt u mooi?",
  "Wat voor werk wilt u doen?",
  "Wat wilt u graag leren in Nederland?",
  "Welke dag is het vandaag?",
  "Welke dieren vindt u leuk?",
  "Welke kleur vindt u mooi?",
  "Welke maand is het nu?",
  "Welke talen spreekt u?",
  "Wie helpt u met Nederlands leren?",
  "Wie wonen bij u in huis?",
];

const AANVULZINNEN = [
  "'s Avonds doe ik mijn ring af. Ik leg mijn ring altijd...",
  "Aaliyah pakt eerst een kopje koffie. Daarna gaat ze...",
  "Aaron gaat donderdag op reis. Hij vindt dat...",
  "Aaron is dokter. Hij werkt...",
  "Aaron is schilder. Hij schildert meestal...",
  "Abdul stuurt zijn familie elke week een e-mail. Hij schrijft dan over...",
  "Abel is op school. Hij heeft...",
  "Achmed is klaar met school. Hij gaat...",
  "Adam is aan het koken. Hij maakt...",
  "Ahmed brengt zijn zoon naar het vliegveld. Zijn zoon gaat...",
  "Aiden is bij de bakker. Hij wil...",
  "Alec gaat naar school. Hij wil graag...",
  "Alex gaat altijd met de trein. Ik ga graag met...",
  "Alex is ziek. Hij heeft pijn aan...",
  "Alex wil nieuwe schoenen. Hij gaat naar...",
  "Ali kan niet goed lopen. Hij heeft pijn aan zijn...",
  "Ali werkt in een fabriek. Hij wil...",
  "Alice werkt in een ziekenhuis. Zij is daar...",
  "Amel sport graag. Sporten is...",
  "Ana is niet blij met haar huis. Ze vindt haar huis...",
  "Ananda is aan het koken. Ze maakt...",
  "Andres werkt op het land. Het werk is...",
  "Anisa maakt huiswerk op de computer. Ze doet dat...",
  "Anna is bij de dokter. Ze krijgt...",
  "Anna's huis is te klein. Ze wil snel...",
  "Arif wacht op de bus. De bus komt...",
  "Arjun moet elke dag reizen naar zijn werk. Hij werkt in...",
  "Arnold is schoonmaker. Hij werkt in...",
  "Ayla eet haar ontbijt snel op. Ze heeft...",
  "Aziz loopt elke dag. Hij loopt naar...",
  "Barry is geslaagd voor zijn examen. Hij krijgt...",
  "Bart gaat bijna elke dag met de auto. Hij rijdt dan naar...",
  "Berat geeft les. Hij vertelt over...",
  "Bilal gaat naar de bioscoop. Hij gaat met zijn...",
  "Bob houdt niet van zwemmen. Hij gaat liever...",
  "Brenda doet een opleiding. Ze moet iedere avond...",
  "Cai werkt met hout. Hij maakt...",
  "Carla drinkt een glas water. Ze doet dat...",
  "Carlos gaat vroeg slapen. Hij is...",
  "Carlos is vrij. Hij gaat...",
  "Carlos maakt muziek. Hij doet dat...",
  "Carmen eet elke dag een banaan. Soms eet ze ook...",
  "Caro gaat vaak met de bus naar school. Soms gaat ze...",
  "Chen verkoopt bloemen. Ze doet dat...",
  "Chris heeft een computer. Hij gebruikt de computer om te...",
  "Chris neemt zijn pillen. Hij heeft pijn in zijn...",
  "Christina belt met haar moeder. Ze praten over...",
  "Christo heeft dorst. Hij drinkt een glas...",
  "Claire kijk uit het raam. Ze kijkt naar...",
  "Claire leert Nederlands. Ze vindt Nederlands...",
  "Dael heeft veel geld. Hij werkt...",
  "Dafne kan goed zingen. Ze kan ook goed...",
  "Daniel heeft pijn aan zijn kies. Hij gaat naar...",
  "Danielle gaat studeren. Ze pakt haar...",
  "Dany heeft hoofdpijn. Ze wil...",
  "Dario zit op school. Hij maakt een...",
  "Dave is niet blij met zijn haar. Zijn haar is...",
  "Dave lust geen koffie. Hij drinkt liever...",
  "Dave werkt in een cafe. Hij moet daar...",
  "David en Maria rijden naar de stad. Ze zoeken...",
  "David heeft een boot. Hij gebruikt de boot om te...",
  "David is dik. Hij eet elke dag...",
  "David werkt in een ziekenhuis. Hij is...",
  "De auto van Leah is kapot. Ze brengt de auto naar...",
  "De baas van Patrick is boos. Patrick vindt dat...",
  "De broer van Souad heeft een baby gekregen. Souad is...",
  "De bus is vaak te laat. Paul vindt dat...",
  "De bus rijdt langzaam. Lia wil...",
  "De dochter van Sophia kijkt veel tv. Ze kan beter gaan...",
  "De dokter praat met Sofia. De dokter geeft Sofia...",
  "De familie Wang woont in een leuke straat. Zij wonen naast...",
  "De kinderen lezen samen. In het boek staat...",
  "De klas is leeg. Iedereen is...",
  "De koning is op het nieuws. Hij vertelt over...",
  "De les begint om 11 uur. Hetty gaat...",
  "De les is afgelopen. We willen nu...",
  "De man belt in de auto. Dat is...",
  "De stoel is kapot. Jaimy gaat de stoel...",
  "De trein is vol. Hanna moet...",
  "De zoon van Samira gaat naar school. Samira vindt dat...",
  "Debra zit op school. Ze maakt veel...",
  "Die sinaasappel is oud. Je moet de sinaasappel...",
  "Diego houdt van koken. Hij kookt graag voor...",
  "Dimitri werkt in een garage. Hij maakt...",
  "Dunya gaat naar een feest. Het feest is van haar...",
  "Dylan is bij de tandarts. Dat is...",
  "Edgar en Joko koken samen. Ze doen dat...",
  "Een mug heeft mij geprikt. Nu krijg ik...",
  "Ella bakt koekjes. Ze bakt de koekjes voor...",
  "Emma doet een opleiding. Dat is...",
  "Emma schrijft alles op. Daarna gaat ze...",
  "Emma wast haar handen. Ze gaat...",
  "Er is ingebroken bij Ben. Hij belt naar...",
  "Er komen nieuwe huizen in onze buurt. Ik vind dat...",
  "Er ligt rommel op straat. Dat is...",
  "Esma wil lerares worden. Zij gaat...",
  "Esra is ziek. Ze vindt dat...",
  "Fanya is op de markt. Ze zoekt...",
  "Farid is zanger. Hij moet vandaag...",
  "Fausia stapt uit de boot. Ze loopt naar...",
  "Felipe houdt van lezen. Hij koopt elke maand...",
  "Felix gaat elke dag zwemmen. Soms gaat hij ook...",
  "Fico woont ver van zijn werk. Hij moet elke dag...",
  "Filip maakt de badkamer schoon. Hij vindt dat...",
  "Filiz koopt een nieuwe jas. Ze koopt ook...",
  "Finn kijkt nu televisie. Hij gaat straks...",
  "Franco gaat verhuizen. Zijn nieuwe huis heeft een...",
  "Frank leest de krant. Hij leest over...",
  "Fred gaat naar school. Hij heeft les tot...",
  "Gabriel maakt een opdracht. Hij doet dat...",
  "Gary leest zijn dochter voor. Lezen is...",
  "Gary woont bij het strand. Hij wil het liefst...",
  "Gina kijkt vaak televisie. Ze houdt van programmas over...",
  "Grace houdt niet van groente. Ze vindt dat...",
  "Halil rijdt in een vrachtwagen. Hij vindt dat...",
  "Han heeft zijn diploma gehaald. Hij gaat nu...",
  "Hannah eet graag vis. Ze haalt die vis...",
  "Hannah leert Nederlands. Ze leert ook...",
  "Hannah maakt haar huis schoon. Ze doet dat...",
  "Harold is niet alleen. Hij heeft...",
  "Harry is gevallen. Hij heeft...",
  "Hassan maakt zijn brommer. Het wiel is...",
  "Hassan werkt in een restaurant. Hij leert daar...",
  "Het bord van Sahid is gevallen. Sahid is...",
  "Het eten is heel warm! Je moet...",
  "Het fruit is op. Ik ga nu naar...",
  "Het huis van Tania is heel groot. Haar huis heeft...",
  "Het is donker. Ik reis dan liever niet met...",
  "Het is druk in de stad. Er zijn veel...",
  "Het is druk op de weg. Emir vindt dat...",
  "Het is druk op het station. Er zijn veel...",
  "Het is koud in het huis van Faiz. Hij wil...",
  "Het is slecht weer. Gaan we met de...?",
  "Het is stil in de klas. De leerlingen...",
  "Het is warm vandaag. Ana wil...",
  "Het is zondag. Eva gaat op zondag altijd naar...",
  "Het regent al de hele dag. William wil...",
  "Het regent onderweg. Marta wil...",
  "Het vliegveld is ver weg. We gaan naar het vliegveld met...",
  "Hetty is klaar met koken. Ze roept...",
  "Hue wil naar de markt. Ze gaat...",
  "Ibrahim heeft een kar met spullen. Hij brengt de spullen...",
  "Iedereen is blij. Het is...",
  "Ik ben op zoek naar het treinstation. Kunt u mij...",
  "Ik ben ziek. Ik ga morgen niet...",
  "Ik drink geen alcohol. Ik drink wel graag...",
  "Ik eet graag brood. Ik houd niet van...",
  "Ik eet nooit druiven. Ik vind druiven...",
  "Ik eet nooit kip. Dat vind ik...",
  "Ik ga een taart maken. Wil jij...?",
  "Ik ga morgen brood kopen. Brood koop ik meestal...",
  "Ik ga naar de huisarts. Hij geeft mij...",
  "Ik ga naar mijn zus. Mijn zus woont...",
  "Ik ga straks naar Hamza. Hij is...",
  "Ik ga vaak met de bus. Ik ga dan naar...",
  "Ik heb deze krant gelezen. Wil jij de krant nu..?",
  "Ik heb een computer met internet. Die gebruik ik...",
  "Ik heb een nieuwe tafel gekocht. Wil jij mijn oude tafel...?",
  "Ik heb geen auto. Een auto is...",
  "Ik heb soep gemaakt. Wil jij mijn soep...?",
  "Ik heb wortels gekocht. Ik koop de wortels voor...",
  "Ik houd van tekenen. Ik teken...",
  "Ik lees het nieuws op mijn telefoon. Mijn man leest het nieuws...",
  "Ik lees vaak. Ik lees graag...",
  "Ik wil zieke mensen helpen. Ik vind dat...",
  "Imani vindt school leuk. Zij houdt van...",
  "In de stad rijden veel brommers. Ik vind dat...",
  "In een grote stad wonen veel mensen. Ik vind dat...",
  "In het eten zitten pepers. Ik vind dat...",
  "Inez en Luis bouwen een huis. Het huis heeft nog geen...",
  "Inez gaat naar een concert. Ze gaat...",
  "Is dat boek leuk? Ik wil het boek ook graag...",
  "Isa heeft pauze. Ze belt met haar...",
  "Isabel speelt graag met haar pop. Soms speelt ze ook met...",
  "Ismet heeft groenten in zijn tuin. Hij gaat de groenten...",
  "Ivan is niet blij met zijn werk. Hij vindt zijn werk te...",
  "Iwan wil gezond zijn. Hij drinkt geen...",
  "Jack koopt tomaten. Hij koopt ook...",
  "Jack wil de muziek niet horen. Hij vindt de muziek...",
  "Jacques is leraar. Hij geeft...",
  "Jada maakt pannenkoeken voor haar familie. Zij doet dat...",
  "Jafar houdt niet van dansen. Hij vindt dansen...",
  "Jakob zoekt een taxi. Hij wil...",
  "Jamal heeft een nieuwe scooter. Hij kan nu...",
  "Jamal woont in een flatgebouw. Hij wil graag...",
  "Jamila maakt kleding. Die kleding is voor...",
  "Jan heeft zijn arm gebroken. Hij moet nu...",
  "Janek heeft koorts. Zijn moeder geeft hem...",
  "Janine leert Nederlands. Ze praat met de lerares over...",
  "Jara is zwanger. Ze krijgt...",
  "Jasmine gaat naar het ziekenhuis. In het ziekenhuis zijn...",
  "Jason gaat graag naar school. Hij kan goed...",
  "Jessie houdt van muziek. Ze speelt graag...",
  "Jessie moet langer werken vandaag. Ze mag pas om acht uur...",
  "Jie is op de markt. Hij ziet...",
  "Jim gaat naar het strand. Het is daar...",
  "Jim heeft haast. Hij moet snel naar...",
  "Jing maakt de borden schoon. Daarna gaat ze...",
  "Joel heeft een vieze keuken. Hij moet...",
  "Johanna doet suiker in haar koffie. Suiker is...",
  "John en zijn dochter bakken samen taart. Ze vinden dat...",
  "John houdt van paarden. Hij vindt paarden...",
  "John woont bij een bos. Hij gaat daar elk weekend...",
  "Johnny is moe. Hij wil...",
  "Johnny is vrij op zaterdag. Hij gaat...",
  "Jonas werkt altijd buiten. Dat is...",
  "Josh heeft de hele dag gelopen. Hij wil nu...",
  "Josh koopt een krant in de winkel. Hij koopt ook...",
  "Judy leest een tijdschrift. Soms leest ze ook...",
  "Julio gaat verhuizen. Hij moet...",
  "Karim heeft pijn in zijn rug. Hij moet...",
  "Karim leest het weerbericht. Het weer wordt...",
  "Karima gaat naar de dokter. Ze voelt zich...",
  "Karin kijkt naar het journaal. Ze doet dat...",
  "Karl gaat met zijn dochter naar de dierentuin. Ze kijken naar...",
  "Katya volgt een opleiding. Ze wil...",
  "Kay zoekt een nieuw huis. Hij vindt zijn oude huis...",
  "Kei eet s avonds met zijn familie. Dat vindt hij...",
  "Kenji rookt al twintig jaar sigaretten. Dat is...",
  "Kenny zoekt op internet. Hij zoekt naar...",
  "Kevin eet een salade met paprika. In de salade zit ook...",
  "Kevin heeft huiswerk. Hij moet veel...",
  "Kevin werkt in een restaurant. Hij maakt vandaag...",
  "Kevin zit in de klas. Hij heeft een vraag over...",
  "Khalid is visser. Na het werk is hij vaak...",
  "Kun je mij een lepel geven? Ik wil...",
  "Kun je mij naar het station brengen. Ik moet op tijd...",
  "Kwasi is chauffeur. Hij rijdt...",
  "Laila moet elke dag vroeg opstaan. Soms is ze...",
  "Laiqa werkt elke dag buiten. Ze houdt van...",
  "Laura heeft veel collegas. Ze gaan samen...",
  "Lea eet graag in een restaurant. Ze vindt dat...",
  "Lea gaat naar haar kleinzoon. Ze geeft hem...",
  "Lea is in het ziekenhuis. Ze wil...",
  "Lei speelt op straat. Dat is...",
  "Leon is verkouden. Hij moet...",
  "Leon speelt gitaar. Hij doet dat...",
  "Leyla slaapt samen met haar zus in een kamer. Zij vinden dat...",
  "Li en Chen gaan iets drinken. Ze drinken...",
  "Lia wil meer geld voor haar werk. Dan kan ze...",
  "Liam kan niet goed zien. Hij moet...",
  "Lily gaat elke dinsdag sporten. Ze eet daarna altijd...",
  "Lin zoekt werk. Ze gaat naar...",
  "Ling wil iets eten. Ze eet liever geen...",
  "Linn heeft niet goed geslapen. Ze blijft...",
  "Liyen gaat vanavond koken. Ze gaat eerst...",
  "Lizzie en haar moeder gaan met het vliegtuig. Lizzie vindt dat...",
  "Louis gaat op de scooter naar zijn werk. Hij doet dat...",
  "Louis gebruikt de computer. Hij wil...",
  "Lucia heeft haar been gebroken. Nu kan ze niet...",
  "Lucia wil nieuw werk. Ze vindt haar oude werk...",
  "Madee heeft een auto. Ze gaat met de auto naar...",
  "Mae heeft een nieuwe auto. Ze kan nu...",
  "Mag ik jouw brommer lenen? Mijn brommer is...",
  "Mai kijkt niet naar het nieuws. Ze vindt het nieuws...",
  "Maja maakt soep. De soep is...",
  "Malik gaat vandaag niet sporten. Hij heeft geen...",
  "Malik heeft een nieuwe bank gekocht. De oude bank was...",
  "Mandy eet vaak chips als ze een film kijkt. Ze eet soms ook...",
  "Manuel is buschauffeur. Hij rijdt...",
  "Marco heeft zin in koffie. Hij wil ook...",
  "Marco is ziek. Hij belt...",
  "Maria heeft griep. Ze moet...",
  "Maria kan goed koken. Ze kookt meestal...",
  "Maria leest een boek. Ze vindt het...",
  "Maria leest op zondag de krant. Ze leest soms...",
  "Mariam praat met de leraar. Mariam praat ook met haar...",
  "Martin eet elke ochtend een ei. Zijn vrouw eet meestal...",
  "Martin stelt een vraag aan de docent. De vraag gaat over...",
  "Maryam kookt voor Dina. Maryam maakt...",
  "Masha kan vandaag zitten in de bus. Soms moet ze...",
  "Max draagt een helm op zijn werk. Dat moet van zijn...",
  "Maya doet de gordijnen dicht. Ze gaat...",
  "Megan gaat vandaag verhuizen. Ze woont straks...",
  "Melissa wacht op het station. Ze wacht op haar...",
  "Mevrouw Perez heeft geen auto meer. Nu moet ze...",
  "Mia maakt zelf kleren. Vandaag maakt ze een...",
  "Mia moet snel naar huis. Ze gaat met de...",
  "Michael houdt niet van tennis. Hij houdt meer van...",
  "Michelle kijkt vaak films. Ze houdt van films over...",
  "Michelle maakt huiswerk. Ze vindt het huiswerk...",
  "Miguel stopt met werken. Hij is...",
  "Mijn auto is kapot. Nu moet ik...",
  "Mijn baas fietst elke dag. Ik doe dat...",
  "Mijn benzine is op. Nu moet ik...",
  "Mijn broer houdt niet van varen. Hij wordt altijd ziek op...",
  "Mijn broer zingt veel. Hij is...",
  "Mijn buurman maakt graag muziek. Dat vind ik...",
  "Mijn opa gaat elke dag wandelen. Dat is...",
  "Mijn opa zit op de bank. Hij kijkt naar...",
  "Mijn telefoon is kapot. Nu kan ik niet...",
  "Mijn trein vertrekt over een half uur. Ik ga nu...",
  "Mijn vader heeft een paard. Hij gaat...",
  "Mijn vader loopt met een stok. Mijn vader is...",
  "Mijn vader luistert graag naar het nieuws. Hij luistert ook naar...",
  "Mijn zus rijdt altijd hard. Ik vind dat...",
  "Mike heeft pijn aan zijn been. Hij heeft ook pijn aan zijn...",
  "Ming rijdt vaak op zijn scooter. Hij wil niet...",
  "Mira heeft zin in koffie. Ze drinkt koffie met...",
  "Mo en zijn familie spelen een spel. Daarna gaan ze...",
  "Mo zit aan tafel. Hij schrijft een brief aan zijn...",
  "Mohammed maakt autos. Dat vindt hij...",
  "Monica maakt graag fotos. Ze maakt het liefst fotos van...",
  "Monica wil graag een huis met een tuin. Ze vindt dat...",
  "Myra en Liz gaan naar een cafe. Ze willen graag...",
  "Nadia heeft kip gekocht. Ze gaat de kip eerst...",
  "Naima wil kapper worden. Ze leert...",
  "Nancy en Oscar zitten in de bioscoop. Ze vinden de film...",
  "Nasir zoekt een nieuw huis. Hij wil een huis met...",
  "Nasira woont bij de supermarkt. Ze woont ook bij...",
  "Nick wil naar zijn familie. Hij reist met...",
  "Nick zoekt werk. Hij wil graag werken bij...",
  "Nicole gaat naar de tandarts. Ze heeft pijn aan haar...",
  "Nikki zoekt een nieuw huis. Ze wil graag...",
  "Nina speelt in de tuin. Ze speelt met...",
  "Noah leest een bericht in de krant. Het bericht gaat over...",
  "Noor werkt in een winkel. Ze verkoopt broeken en ook...",
  "Nora en Souffian wonen in een dorp. Ze wonen liever...",
  "Odara ruimt het huis op. Ze legt de kleren...",
  "Olga is ziek. Ze moet...",
  "Omar koopt vis. Hij koopt ook...",
  "Omid leest s ochtends altijd eerst de krant. Daarna gaat hij...",
  "Ons dak is kapot. Wij moeten...",
  "Orma heeft leuke buren. Ze gaat met haar buren...",
  "Pablo gaat vaak met de trein. Hij gaat dan naar...",
  "Pablo speelt gitaar. Hij oefent...",
  "Pari gaat elke dag met de bus. Vandaag gaat ze...",
  "Pascal vindt zijn werk moeilijk. Hij wil...",
  "Paul gaat vroeg naar bed. Hij moet morgen...",
  "Paul heeft honger. Zijn moeder geeft hem...",
  "Paul viert zijn verjaardag. Hij is...",
  "Paula heeft een brief gekregen. De brief is van...",
  "Pedro doet de lamp aan. Het is...",
  "Pedro woont op een boerderij. Hij heeft daar...",
  "Peter maakt machines. Hij werkt vaak...",
  "Peter speelt met zijn zoon. Ze zijn...",
  "Philip fietst op de weg. De weg is...",
  "Philippa zit in de tuin. Ze zit ook vaak...",
  "Pia woont naast een park. Ze gaat daar...",
  "Priya doet een opleiding. Later wordt ze...",
  "Priya maakt saus. Haar dochters willen...",
  "Quito eet vandaag niet thuis. Hij eet...",
  "Rachel zingt vaak alleen. Soms zingt ze ook...",
  "Rafael heeft een telefoon. Hij belt elke dag met zijn...",
  "Raheem heeft een fijn huis. Hij woont daar met...",
  "Rahime heeft Nederlandse les. Ze vindt haar docent...",
  "Rasha werkt op een kantoor. Het kantoor is...",
  "Remi werkt op de markt. Hij verkoopt...",
  "Rhonda is haar sleutel kwijt. Nu moet ze...",
  "Rico eet vaak snoep. Snoep is slecht voor...",
  "Rico krijgt een prik. Hij is...",
  "Rima en haar dochter zijn in de keuken. Haar dochter wil...",
  "Robin loopt snel naar school. Hij is...",
  "Romeo werkt op een school. Hij geeft les aan...",
  "Roy wil zijn vriend spreken. Hij gaat...",
  "Ryan heeft weinig geld. Hij werkt...",
  "Ryan wil een film zien. Hij gaat naar...",
  "Sabir heeft een nieuwe baan. Hij werkt bij...",
  "Said heeft vakantie. Hij gaat...",
  "Said is te laat op zijn werk. Zijn baas is...",
  "Salih is bakker. Hij werkt meestal...",
  "Salim snijdt de uien. Zijn vrouw gaat...",
  "Sam loopt het lokaal uit. Hij gaat...",
  "Samir is te laat voor de trein. Hij moet nu...",
  "Samira heeft een gesprek met haar baas. Ze praten over...",
  "Samira gaat naar haar ouders. Ze gaan samen...",
  "Samira heeft pijn aan haar rug. Ze kan niet goed...",
  "Samuel heeft vandaag les. Hij gaat morgen...",
  "Samuel praat met zijn baas. Hij vraagt...",
  "Samuel vindt de pauze leuk. Hij gaat dan...",
  "Sandra moet vandaag veel doen. Ze moet...",
  "Sanne kan niet goed koken. Het eten is...",
  "Sara praat met haar buurvrouw. Ze praten over...",
  "Sarah is nooit ziek. Zij voelt zich altijd...",
  "Sari zoekt een cursusboek. Ze gaat naar...",
  "Sasha eet niet altijd thuis. Ze gaat vaak naar...",
  "Sasha gaat naar de bioscoop. Ze kijkt...",
  "Sasha heeft een hond. Ze heeft ook...",
  "Savita gaat solliciteren. Ze wil...",
  "Scott doet een opleiding. Hij vindt leren...",
  "Selim kan zijn broer niet bellen. Hij stuurt zijn broer een...",
  "Shaila draagt een rugzak naar school. In de rugzak zit...",
  "Shanna heeft haar diploma. Ze is...",
  "Shing heeft zijn arm gebroken. Hij mag niet...",
  "Shun wil niet eten. Hij wil liever...",
  "Siham volgt een cursus. Ze leert...",
  "Simon bouwt een huis. Het huis wordt...",
  "Simon wil leraar worden. Hij moet veel...",
  "Simone leest graag een krant. Ze koopt hem...",
  "Sita geeft taart aan haar opa. Hij vindt dat...",
  "Sjaak werkt in een fabriek. Daar werkt hij...",
  "Sonia zit in de bus. Ze gaat naar...",
  "Sonya houdt van muziek. Ze luistert...",
  "Sophia houdt van rijst. Ze kookt dat...",
  "Sophie is vaak in het bos. Ze kijkt graag naar...",
  "Sou eet graag mais. Ze eet mais meestal met...",
  "Souad koopt bananen op de markt. Ze koopt ook...",
  "Stanley wil een groter huis. Hij wil ook...",
  "Stefan belt met zijn zus. Zijn zus is...",
  "Stefana vindt wandelen leuk. Ze doet dat...",
  "Stephan moet sporten van de dokter. Hij gaat...",
  "Steven is in het ziekenhuis. Hij gaat morgen...",
  "Sven komt uit het ziekenhuis. Hij is...",
  "Sylvia is kapper. Ze moet vandaag veel...",
  "Tamal moet remmen. Hij ziet een...",
  "Tanya is bakker. Ze verkoopt...",
  "Tara wil een motor kopen. Een motor is...",
  "Tara zoekt werk. Ze kijkt in...",
  "Tariq eet alleen. Hij vindt dat...",
  "Tess eet veel fruit. Fruit is...",
  "Thirza wil later in het ziekenhuis werken. Ze moet eerst...",
  "Thomas ligt in het ziekenhuis. Hij vindt dat...",
  "Tim is jarig. Zijn zus geeft hem een...",
  "Tirza koopt een nieuw bed. Ze koopt ook...",
  "Tony eet brood. Hij eet het brood met...",
  "Tuan zit op school. Hij heeft volgende week...",
  "Veel mensen praten in de les. Nena vindt dat...",
  "Vera doet suiker in haar thee. Haar thee wordt zo...",
  "Victor heeft een nieuw huis. Hij gaat morgen...",
  "Wayan drinkt koffie met zijn buurman. Hij vindt dat...",
  "We gaan mijn broer ophalen. Hij heeft geen...",
  "Wij willen wat leuks doen. We gaan...",
  "Wil je mijn huis zien? Ik woon hier...",
  "Wil jij op mijn kinderen passen? Ik ga vanavond...",
  "William neemt een drankje. Dat helpt tegen...",
  "Xuan is in de supermarkt. Ze wil...",
  "Yaira werkt bij een apotheek. Ze werkt daar...",
  "Younes heeft veel vrienden. Hij gaat vaak met ze naar...",
  "Yun eet s ochtends niet veel. Ze eet dan alleen...",
  "Zarina moet de vis eerst schoonmaken. Daarna gaat ze hem...",
  "Zina kookt met veel kruiden. Zo wordt haar eten...",
  "Zola maakt het huis schoon. Ze doet dat...",
];

// ─── LOCAL EXPLANATION ENGINE ─────────────────────────────────────────────────

const WOORDENBOEK = [
  ["bij wie", "com quem / na casa de quem"],
  ["gaat u wonen", "voce vai morar"],
  ["hoe bent u hier gekomen", "como voce chegou aqui"],
  ["hoe gaat het met u", "como voce esta / como vai"],
  ["hoe gaat u naar uw werk", "como voce vai ao trabalho"],
  ["hoe laat begint u", "que horas voce comeca"],
  ["hoe laat stopt u", "que horas voce para"],
  ["hoe laat wordt u wakker", "que horas voce acorda"],
  ["hoe laat gaat u", "que horas voce vai"],
  ["hoe laat is het", "que horas sao"],
  ["hoe laat", "que horas"],
  ["hoe vaak", "com que frequencia / quantas vezes"],
  ["hoeveel broers en zussen", "quantos irmaos e irmas voce tem"],
  ["hoeveel dagen", "quantos dias"],
  ["hoeveel jaar school", "quantos anos de escola"],
  ["hoeveel kinderen", "quantos filhos"],
  ["hoeveel talen", "quantos idiomas"],
  ["hoeveel mensen", "quantas pessoas"],
  ["hoeveel", "quantos / quanto"],
  ["in wat voor huis", "em que tipo de casa"],
  ["in welk land bent u geboren", "em qual pais voce nasceu"],
  ["in welke plaats", "em qual cidade"],
  ["naar welke muziek", "que tipo de musica"],
  ["op welke dagen", "em quais dias"],
  ["van welke muziek houdt u", "de que musica voce gosta"],
  ["waar bent u geboren", "onde voce nasceu"],
  ["waar heeft u nederlands geleerd", "onde voce aprendeu holandes"],
  ["waar woont u", "onde voce mora"],
  ["waar woont uw familie", "onde sua familia mora"],
  ["waarom wilt u naar nederland", "por que voce quer ir para a Holanda"],
  ["wanneer bent u geboren", "quando voce nasceu"],
  ["wanneer wilt u naar nederland", "quando voce quer ir para a Holanda"],
  ["wat doet u graag met uw familie", "o que voce gosta de fazer com sua familia"],
  ["wat doet u graag met uw vrienden", "o que voce gosta de fazer com seus amigos"],
  ["wat doet u in het weekend", "o que voce faz no fim de semana"],
  ["wat doet u in uw vrije tijd", "o que voce faz no seu tempo livre"],
  ["wat doet u op een feestdag", "o que voce faz em um feriado"],
  ["wat drinkt u graag", "o que voce gosta de beber"],
  ["wat eet u s avonds", "o que voce come a noite"],
  ["wat eet u s ochtends", "o que voce come de manha"],
  ["wat gaat u morgen doen", "o que voce vai fazer amanha"],
  ["wat hebt u geleerd op school", "o que voce aprendeu na escola"],
  ["wat hebt u gisteren gedaan", "o que voce fez ontem"],
  ["wat hebt u gisteren gegeten", "o que voce comeu ontem"],
  ["wat is uw adres", "qual e o seu endereco"],
  ["wat is uw telefoonnummer", "qual e o seu numero de telefone"],
  ["wat kookt u graag", "o que voce gosta de cozinhar"],
  ["wat vindt u van de nederlandse taal", "o que voce acha da lingua holandes"],
  ["wat vindt u van nederland", "o que voce acha da Holanda"],
  ["wat vindt u van nederlandse mensen", "o que voce acha dos holandeses"],
  ["wat voor kleren draagt u vaak", "que tipo de roupa voce usa frequentemente"],
  ["wat voor kleren vindt u mooi", "que tipo de roupa voce acha bonito"],
  ["wat voor werk wilt u doen", "que tipo de trabalho voce quer fazer"],
  ["wat wilt u graag leren in nederland", "o que voce quer aprender na Holanda"],
  ["welke dag is het vandaag", "que dia e hoje"],
  ["welke dieren vindt u leuk", "quais animais voce gosta"],
  ["welke kleur vindt u mooi", "qual cor voce acha bonita"],
  ["welke maand is het nu", "que mes e agora"],
  ["welke talen spreekt u", "que idiomas voce fala"],
  ["wie helpt u met nederlands leren", "quem te ajuda a aprender holandes"],
  ["wie wonen bij u in huis", "quem mora com voce em casa"],
  ["s avonds", "a noite"],
  ["s ochtends", "de manha"],
  ["naar bed gaan", "ir dormir"],
  ["naar bed", "para dormir"],
  ["wakker worden", "acordar"],
  ["met werken beginnen", "comecar a trabalhar"],
  ["met werken stoppen", "parar de trabalhar"],
  ["elke dag", "todo dia"],
  ["elke week", "toda semana"],
  ["iedere avond", "toda noite"],
  ["graag", "com prazer / gosta de"],
  ["soms", "as vezes"],
  ["altijd", "sempre"],
  ["nooit", "nunca"],
  ["meestal", "geralmente"],
  ["ook", "tambem"],
  ["alleen", "sozinho / apenas"],
  ["samen", "juntos"],
  ["straks", "mais tarde / daqui a pouco"],
  ["gisteren", "ontem"],
  ["morgen", "amanha"],
  ["vandaag", "hoje"],
  ["nu", "agora"],
  ["al", "ja"],
  ["nog", "ainda"],
  ["misschien", "talvez"],
  ["ziek", "doente"],
  ["moe", "cansado"],
  ["blij", "feliz / contente"],
  ["boos", "bravo / com raiva"],
  ["kapot", "quebrado"],
  ["vol", "cheio / lotado"],
  ["leeg", "vazio"],
  ["laat", "tarde"],
  ["vroeg", "cedo"],
  ["snel", "rapido"],
  ["langzaam", "devagar"],
  ["veel", "muito / muitos"],
  ["weinig", "pouco"],
  ["groot", "grande"],
  ["klein", "pequeno"],
  ["nieuw", "novo"],
  ["oud", "velho / antigo"],
  ["lekker", "gostoso / agradavel"],
  ["moeilijk", "dificil"],
  ["makkelijk", "facil"],
  ["leuk", "legal / divertido"],
  ["saai", "chato"],
  ["duur", "caro"],
  ["goedkoop", "barato"],
  ["ver", "longe"],
  ["dichtbij", "perto"],
  ["ziekenhuis", "hospital"],
  ["dokter", "medico"],
  ["tandarts", "dentista"],
  ["apotheek", "farmacia"],
  ["school", "escola"],
  ["werk", "trabalho"],
  ["huis", "casa"],
  ["straat", "rua"],
  ["stad", "cidade"],
  ["land", "pais"],
  ["nederland", "Holanda"],
  ["familie", "familia"],
  ["vrienden", "amigos"],
  ["kinderen", "filhos / criancas"],
  ["broers en zussen", "irmaos e irmas"],
  ["man", "marido / homem"],
  ["vrouw", "esposa / mulher"],
  ["vader", "pai"],
  ["moeder", "mae"],
  ["opa", "avo"],
  ["oma", "avo"],
  ["auto", "carro"],
  ["trein", "trem"],
  ["bus", "onibus"],
  ["fiets", "bicicleta"],
  ["vliegtuig", "aviao"],
  ["scooter", "scooter / lambreta"],
  ["supermarkt", "supermercado"],
  ["winkel", "loja"],
  ["markt", "mercado / feira"],
  ["restaurant", "restaurante"],
  ["bioscoop", "cinema"],
  ["bibliotheek", "biblioteca"],
  ["station", "estacao"],
  ["vliegveld", "aeroporto"],
  ["koffie", "cafe"],
  ["thee", "cha"],
  ["water", "agua"],
  ["bier", "cerveja"],
  ["brood", "pao"],
  ["rijst", "arroz"],
  ["vis", "peixe"],
  ["vlees", "carne"],
  ["groente", "verdura / legume"],
  ["fruit", "fruta"],
  ["heeft pijn aan", "tem dor em"],
  ["rug", "costas"],
  ["been", "perna"],
  ["arm", "braco"],
  ["hoofd", "cabeca"],
  ["hoofdpijn", "dor de cabeca"],
  ["koorts", "febre"],
  ["verkouden", "resfriado"],
  ["griep", "gripe"],
  ["dorst", "sede"],
  ["honger", "fome"],
  ["houdt van", "gosta de"],
  ["houdt niet van", "nao gosta de"],
  ["vindt dat", "acha que"],
  ["wil graag", "quer / gostaria de"],
  ["moet nu", "precisa agora"],
  ["kan niet", "nao consegue"],
  ["gaat naar", "vai para"],
  ["werkt in", "trabalha em"],
  ["woont in", "mora em"],
  ["rijdt naar", "dirige para"],
  ["loopt naar", "caminha para"],
  ["pakt", "pega"],
  ["koopt", "compra"],
  ["verkoopt", "vende"],
  ["maakt", "faz / prepara"],
  ["leest", "le"],
  ["schrijft", "escreve"],
  ["belt", "liga / telefona"],
  ["kijkt", "olha / assiste"],
  ["luistert", "ouve / escuta"],
  ["speelt", "toca / brinca / joga"],
  ["slaapt", "dorme"],
  ["eet", "come"],
  ["drinkt", "bebe"],
  ["kookt", "cozinha"],
  ["werkt", "trabalha"],
  ["leert", "aprende / estuda"],
  ["helpt", "ajuda"],
  ["praat", "fala / conversa"],
  ["vertelt", "conta / narra"],
  ["zoekt", "procura"],
  ["vindt", "encontra / acha"],
  ["wacht", "espera"],
  ["reist", "viaja"],
  ["verhuist", "se muda"],
  ["bakker", "padeiro / padaria"],
  ["schilder", "pintor"],
  ["leraar", "professor"],
  ["dokter", "medico"],
  ["chauffeur", "motorista"],
  ["kapper", "cabeleireiro"],
  ["kok", "cozinheiro"],
  ["visser", "pescador"],
  ["fabriek", "fabrica"],
  ["garage", "oficina / garagem"],
  ["kantoor", "escritorio"],
  ["boerderij", "fazenda"],
  ["diploma", "diploma"],
  ["opleiding", "curso / formacao"],
  ["examen", "exame / prova"],
  ["cursus", "curso"],
  ["les", "aula"],
  ["huiswerk", "dever de casa / licao"],
  ["vakantie", "ferias"],
  ["verjaardag", "aniversario"],
  ["feest", "festa"],
  ["weekend", "fim de semana"],
  ["vrije tijd", "tempo livre"],
];

// Lookup table for aanvulzinnen: [fragment, translation, example1, example2]
const AANVUL_HINTS = [
  ["s avonds doe ik mijn ring af", "A noite tiro meu anel. Coloco meu anel sempre...", "op de tafel. (na mesa.)", "in de kast. (no armario.)"],
  ["pakt eerst een kopje koffie", "Pega primeiro um cafe. Depois ela vai...", "naar haar werk. (ao trabalho.)", "naar school. (para a escola.)"],
  ["gaat donderdag op reis", "Vai viajar na quinta. Ele acha que...", "leuk. (legal.)", "spannend. (emocionante.)"],
  ["is dokter. hij werkt", "E medico. Ele trabalha...", "in een ziekenhuis. (no hospital.)", "elke dag. (todo dia.)"],
  ["is schilder. hij schildert", "E pintor. Ele pinta geralmente...", "huizen. (casas.)", "buiten. (do lado de fora.)"],
  ["stuurt zijn familie elke week een e-mail", "Manda e-mail para a familia. Escreve sobre...", "zijn werk. (seu trabalho.)", "zijn leven in nederland. (sua vida na Holanda.)"],
  ["abel is op school. hij heeft", "Abel esta na escola. Ele tem...", "les. (aula.)", "veel huiswerk. (muito dever.)"],
  ["achmed is klaar met school", "Terminou a escola. Ele vai...", "werken. (trabalhar.)", "naar huis. (para casa.)"],
  ["adam is aan het koken", "Adam esta cozinhando. Ele faz...", "soep. (sopa.)", "rijst met groente. (arroz com legumes.)"],
  ["brengt zijn zoon naar het vliegveld", "Leva o filho ao aeroporto. O filho vai...", "op vakantie. (de ferias.)", "naar het buitenland. (para o exterior.)"],
  ["aiden is bij de bakker", "Esta na padaria. Ele quer...", "brood kopen. (comprar pao.)", "een taart kopen. (comprar um bolo.)"],
  ["alec gaat naar school. hij wil graag", "Vai para a escola. Ele quer muito...", "leren. (aprender.)", "nederlands leren. (aprender holandes.)"],
  ["gaat altijd met de trein. ik ga graag met", "Vai de trem. Eu gosto de ir de...", "de bus. (onibus.)", "de fiets. (bicicleta.)"],
  ["alex is ziek. hij heeft pijn aan", "Esta doente. Ele tem dor em...", "zijn hoofd. (sua cabeca.)", "zijn rug. (suas costas.)"],
  ["alex wil nieuwe schoenen", "Quer sapatos novos. Ele vai...", "de winkel. (a loja.)", "het winkelcentrum. (ao shopping.)"],
  ["kan niet goed lopen. hij heeft pijn aan zijn", "Nao consegue andar. Ele tem dor no seu...", "been. (perna.)", "voet. (pe.)"],
  ["ali werkt in een fabriek. hij wil", "Trabalha em fabrica. Ele quer...", "ander werk. (outro trabalho.)", "meer geld verdienen. (ganhar mais dinheiro.)"],
  ["werkt in een ziekenhuis. zij is daar", "Trabalha no hospital. Ela e la...", "verpleegkundige. (enfermeira.)", "elke dag. (todo dia.)"],
  ["sport graag. sporten is", "Gosta de esportes. Praticar esporte e...", "gezond. (saudavel.)", "leuk en gezond. (divertido e saudavel.)"],
  ["ana is niet blij met haar huis", "Nao esta feliz com a casa. Ela acha a casa...", "te klein. (muito pequena.)", "te oud. (muito velha.)"],
  ["ananda is aan het koken. ze maakt", "Esta cozinhando. Ela faz...", "soep. (sopa.)", "een lekkere maaltijd. (refeicao gostosa.)"],
  ["werkt op het land. het werk is", "Trabalha no campo. O trabalho e...", "zwaar. (pesado.)", "moeilijk maar goed. (dificil mas bom.)"],
  ["maakt huiswerk op de computer", "Faz dever no computador. Ela faz isso...", "elke avond. (toda noite.)", "thuis. (em casa.)"],
  ["anna is bij de dokter. ze krijgt", "Esta no medico. Ela recebe...", "een recept. (receita medica.)", "medicijnen. (medicamentos.)"],
  ["huis is te klein. ze wil snel", "Casa pequena demais. Ela quer logo...", "verhuizen. (se mudar.)", "een groter huis vinden. (casa maior.)"],
  ["arif wacht op de bus. de bus komt", "Espera o onibus. O onibus vem...", "over tien minuten. (em dez minutos.)", "laat. (atrasado.)"],
  ["moet elke dag reizen naar zijn werk", "Viaja todo dia para o trabalho. Ele trabalha em...", "een andere stad. (outra cidade.)", "het centrum. (o centro.)"],
  ["is schoonmaker. hij werkt in", "E faxineiro. Ele trabalha em...", "een kantoor. (escritorio.)", "een ziekenhuis. (hospital.)"],
  ["eet haar ontbijt snel op. ze heeft", "Come o cafe rapido. Ela tem...", "haast. (pressa.)", "weinig tijd. (pouco tempo.)"],
  ["aziz loopt elke dag. hij loopt naar", "Caminha todo dia. Ele caminha ate...", "zijn werk. (o trabalho.)", "de supermarkt. (supermercado.)"],
  ["barry is geslaagd voor zijn examen", "Passou no exame. Ele recebe...", "een diploma. (diploma.)", "een certificaat. (certificado.)"],
  ["bart gaat bijna elke dag met de auto", "Vai quase todo dia de carro. Ele dirige ate...", "zijn werk. (o trabalho.)", "de stad. (a cidade.)"],
  ["berat geeft les. hij vertelt over", "Da aulas. Ele conta sobre...", "nederland. (a Holanda.)", "de nederlandse taal. (o holandes.)"],
  ["gaat naar de bioscoop. hij gaat met zijn", "Vai ao cinema. Ele vai com seu...", "vriend. (amigo.)", "vrouw. (esposa.)"],
  ["houdt niet van zwemmen. hij gaat liever", "Nao gosta de nadar. Ele prefere...", "wandelen. (caminhar.)", "fietsen. (andar de bicicleta.)"],
  ["brenda doet een opleiding. ze moet iedere avond", "Faz um curso. Ela precisa toda noite...", "studeren. (estudar.)", "huiswerk maken. (fazer dever.)"],
  ["cai werkt met hout. hij maakt", "Trabalha com madeira. Ele faz...", "meubels. (moveis.)", "tafels en stoelen. (mesas e cadeiras.)"],
  ["carla drinkt een glas water. ze doet dat", "Bebe agua. Ela faz isso...", "elke dag. (todo dia.)", "omdat het gezond is. (porque e saudavel.)"],
  ["carlos gaat vroeg slapen. hij is", "Vai dormir cedo. Ele esta...", "moe. (cansado.)", "erg moe. (muito cansado.)"],
  ["carlos is vrij. hij gaat", "Esta de folga. Ele vai...", "naar het park. (ao parque.)", "sporten. (praticar esporte.)"],
  ["carlos maakt muziek. hij doet dat", "Faz musica. Ele faz isso...", "elke dag. (todo dia.)", "voor zijn plezier. (por prazer.)"],
  ["carmen eet elke dag een banaan. soms eet ze ook", "Come banana todo dia. As vezes come tambem...", "een appel. (uma maca.)", "andere vruchten. (outras frutas.)"],
  ["caro gaat vaak met de bus naar school. soms gaat ze", "Vai de onibus para a escola. As vezes vai...", "met de fiets. (de bicicleta.)", "te voet. (a pe.)"],
  ["chen verkoopt bloemen. ze doet dat", "Vende flores. Ela faz isso...", "op de markt. (na feira.)", "elke dag. (todo dia.)"],
  ["heeft een computer. hij gebruikt de computer om te", "Tem computador. Ele usa para...", "werken. (trabalhar.)", "informatie zoeken. (buscar informacao.)"],
  ["neemt zijn pillen. hij heeft pijn in zijn", "Toma remedios. Ele tem dor em seu...", "hoofd. (cabeca.)", "rug. (costas.)"],
  ["belt met haar moeder. ze praten over", "Liga para a mae. Elas conversam sobre...", "de familie. (a familia.)", "het dagelijks leven. (o cotidiano.)"],
  ["heeft dorst. hij drinkt een glas", "Esta com sede. Ele bebe um copo de...", "water. (agua.)", "sap. (suco.)"],
  ["kijk uit het raam. ze kijkt naar", "Olha pela janela. Ela olha para...", "de straat. (a rua.)", "de mensen buiten. (as pessoas la fora.)"],
  ["claire leert nederlands. ze vindt nederlands", "Aprende holandes. Ela acha o holandes...", "moeilijk maar leuk. (dificil mas legal.)", "interessant. (interessante.)"],
  ["dael heeft veel geld. hij werkt", "Tem muito dinheiro. Ele trabalha...", "hard. (muito.)", "als manager. (como gerente.)"],
  ["kan goed zingen. ze kan ook goed", "Canta bem. Ela tambem sabe bem...", "dansen. (dancar.)", "acteren. (atuar.)"],
  ["heeft pijn aan zijn kies. hij gaat naar", "Tem dor no dente. Ele vai ao...", "de tandarts. (dentista.)", "het ziekenhuis. (hospital.)"],
  ["gaat studeren. ze pakt haar", "Vai estudar. Ela pega seu...", "boek. (livro.)", "tas. (bolsa.)"],
  ["heeft hoofdpijn. ze wil", "Tem dor de cabeca. Ela quer...", "rusten. (descansar.)", "een pijnstiller nemen. (analgesico.)"],
  ["dario zit op school. hij maakt een", "Esta na escola. Ele faz um...", "opdracht. (exercicio.)", "toets. (prova.)"],
  ["niet blij met zijn haar. zijn haar is", "Nao contente com cabelo. O cabelo e...", "te lang. (muito comprido.)", "niet mooi. (nao bonito.)"],
  ["lust geen koffie. hij drinkt liever", "Nao gosta de cafe. Ele prefere...", "thee. (cha.)", "water of sap. (agua ou suco.)"],
  ["werkt in een cafe. hij moet daar", "Trabalha em cafe. Ele precisa la...", "koffie zetten. (fazer cafe.)", "klanten helpen. (atender clientes.)"],
  ["en maria rijden naar de stad. ze zoeken", "Dirigem para a cidade. Procuram...", "een parkeerplaats. (estacionamento.)", "een winkel. (uma loja.)"],
  ["heeft een boot. hij gebruikt de boot om te", "Tem barco. Ele usa para...", "vissen. (pescar.)", "varen. (navegar.)"],
  ["david is dik. hij eet elke dag", "Esta gordo. Ele come todo dia...", "te veel. (demais.)", "ongezond eten. (comida nao saudavel.)"],
  ["david werkt in een ziekenhuis. hij is", "Trabalha no hospital. Ele e...", "dokter. (medico.)", "verpleger. (enfermeiro.)"],
  ["auto van leah is kapot", "O carro esta quebrado. Ela leva para...", "de garage. (a oficina.)", "de monteur. (o mecanico.)"],
  ["baas van patrick is boos. patrick vindt dat", "O chefe esta bravo. Patrick acha que...", "niet leuk. (nao e legal.)", "vervelend. (chatice.)"],
  ["broer van souad heeft een baby gekregen. souad is", "O irmao de Souad teve bebe. Souad esta...", "blij. (feliz.)", "heel gelukkig. (muito feliz.)"],
  ["bus is vaak te laat. paul vindt dat", "O onibus e atrasado. Paul acha que...", "vervelend. (chatice.)", "niet goed. (nao e bom.)"],
  ["bus rijdt langzaam. lia wil", "O onibus anda devagar. Lia quer...", "uitstappen. (descer.)", "sneller reizen. (viajar mais rapido.)"],
  ["dochter van sophia kijkt veel tv", "A filha assiste muita TV. E melhor ela ir...", "buiten spelen. (brincar la fora.)", "lezen. (ler.)"],
  ["dokter praat met sofia. de dokter geeft sofia", "O medico da a Sofia...", "medicijnen. (medicamentos.)", "een recept. (receita.)"],
  ["familie wang woont in een leuke straat. zij wonen naast", "Familia Wang mora numa rua boa. Ao lado de...", "een park. (um parque.)", "een supermarkt. (supermercado.)"],
  ["kinderen lezen samen. in het boek staat", "As criancas leem juntas. No livro esta...", "een leuk verhaal. (historia legal.)", "veel informatie. (muita informacao.)"],
  ["klas is leeg. iedereen is", "A sala esta vazia. Todo mundo...", "naar huis gegaan. (foi para casa.)", "vrij. (de folga.)"],
  ["koning is op het nieuws. hij vertelt over", "O rei esta no jornal. Ele fala sobre...", "nederland. (a Holanda.)", "het land. (o pais.)"],
  ["les begint om 11 uur. hetty gaat", "A aula comeca as 11h. Hetty vai...", "naar de klas. (para a sala.)", "snel naar school. (rapido para a escola.)"],
  ["les is afgelopen. we willen nu", "A aula terminou. Agora queremos...", "naar huis gaan. (ir para casa.)", "iets eten. (comer algo.)"],
  ["man belt in de auto. dat is", "Homem telefonando no carro. Isso e...", "gevaarlijk. (perigoso.)", "niet toegestaan. (nao permitido.)"],
  ["stoel is kapot. jaimy gaat de stoel", "A cadeira esta quebrada. Jaimy vai...", "weggooien. (jogar fora.)", "repareren. (consertar.)"],
  ["trein is vol. hanna moet", "O trem esta lotado. Hanna precisa...", "wachten. (esperar.)", "de volgende trein nemen. (proximo trem.)"],
  ["zoon van samira gaat naar school. samira vindt dat", "O filho vai para a escola. Samira acha que...", "goed. (bom.)", "heel belangrijk. (muito importante.)"],
  ["debra zit op school. ze maakt veel", "Esta na escola. Ela faz muito...", "huiswerk. (dever de casa.)", "opdrachten. (exercicios.)"],
  ["sinaasappel is oud. je moet de sinaasappel", "A laranja esta velha. Voce deve...", "weggooien. (jogar fora.)", "niet meer eten. (nao comer mais.)"],
  ["houdt van koken. hij kookt graag voor", "Gosta de cozinhar. Ele cozinha para...", "zijn familie. (sua familia.)", "zijn vrienden. (seus amigos.)"],
  ["werkt in een garage. hij maakt", "Trabalha na oficina. Ele conserta...", "auto's. (carros.)", "motoren. (motos.)"],
  ["gaat naar een feest. het feest is van haar", "Vai a uma festa. A festa e do seu...", "vriend. (namorado.)", "collega. (colega.)"],
  ["bij de tandarts. dat is", "Esta no dentista. Isso e...", "niet leuk. (nao e legal.)", "noodzakelijk. (necessario.)"],
  ["edgar en joko koken samen. ze doen dat", "Cozinham juntos. Eles fazem isso...", "elke week. (toda semana.)", "graag. (com prazer.)"],
  ["mug heeft mij geprikt. nu krijg ik", "Mosquito me picou. Agora vou ter...", "jeuk. (coceira.)", "een rode plek. (marca vermelha.)"],
  ["bakt koekjes. ze bakt de koekjes voor", "Assa biscoitos. Ela assa para...", "haar kinderen. (seus filhos.)", "de klas. (a turma.)"],
  ["emma doet een opleiding. dat is", "Faz um curso. Isso e...", "goed voor haar toekomst. (bom para o futuro.)", "moeilijk maar leuk. (dificil mas legal.)"],
  ["schrijft alles op. daarna gaat ze", "Anota tudo. Depois ela vai...", "studeren. (estudar.)", "het thuis lezen. (ler em casa.)"],
  ["emma wast haar handen. ze gaat", "Lava as maos. Ela vai...", "eten. (comer.)", "koken. (cozinhar.)"],
  ["is ingebroken bij ben. hij belt naar", "Teve arrombamento. Ele liga para...", "de politie. (a policia.)", "zijn verzekeraar. (seu seguro.)"],
  ["komen nieuwe huizen in onze buurt", "Varao construir casas no bairro. Acho que...", "goed. (bom.)", "heel fijn. (otimo.)"],
  ["ligt rommel op straat. dat is", "Ha lixo na rua. Isso e...", "niet netjes. (nao e higienico.)", "vervelend. (chato.)"],
  ["wil lerares worden. zij gaat", "Quer ser professora. Ela vai...", "studeren. (estudar.)", "een opleiding volgen. (fazer curso.)"],
  ["esra is ziek. ze vindt dat", "Esta doente. Ela acha que...", "heel vervelend. (muito chato.)", "niet fijn. (nao e bom.)"],
  ["fanya is op de markt. ze zoekt", "Esta na feira. Ela procura...", "groente en fruit. (legumes e frutas.)", "verse producten. (produtos frescos.)"],
  ["is zanger. hij moet vandaag", "E cantor. Ele precisa hoje...", "optreden. (se apresentar.)", "zingen. (cantar.)"],
  ["stapt uit de boot. ze loopt naar", "Sai do barco. Ela caminha para...", "het station. (a estacao.)", "haar huis. (sua casa.)"],
  ["houdt van lezen. hij koopt elke maand", "Gosta de ler. Ele compra todo mes...", "een boek. (um livro.)", "een tijdschrift. (uma revista.)"],
  ["gaat elke dag zwemmen. soms gaat hij ook", "Vai nadar todo dia. As vezes tambem vai...", "fietsen. (andar de bicicleta.)", "hardlopen. (correr.)"],
  ["woont ver van zijn werk. hij moet elke dag", "Mora longe do trabalho. Precisa todo dia...", "lang reizen. (viajar muito.)", "vroeg opstaan. (acordar cedo.)"],
  ["maakt de badkamer schoon. hij vindt dat", "Limpa o banheiro. Ele acha que...", "noodzakelijk. (necessario.)", "niet leuk maar het moet. (nao e legal mas precisa.)"],
  ["koopt een nieuwe jas. ze koopt ook", "Compra casaco novo. Ela tambem compra...", "een broek. (uma calca.)", "schoenen. (sapatos.)"],
  ["kijkt nu televisie. hij gaat straks", "Assiste TV agora. Mais tarde vai...", "slapen. (dormir.)", "eten. (comer.)"],
  ["gaat verhuizen. zijn nieuwe huis heeft een", "Vai se mudar. Sua nova casa tem um...", "grote tuin. (jardim grande.)", "garage. (garagem.)"],
  ["frank leest de krant. hij leest over", "Le o jornal. Ele le sobre...", "het nieuws. (as noticias.)", "de politiek. (a politica.)"],
  ["gaat naar school. hij heeft les tot", "Vai para a escola. Ele tem aula ate...", "drie uur. (tres horas.)", "het einde van de middag. (fim da tarde.)"],
  ["gabriel maakt een opdracht. hij doet dat", "Faz um exercicio. Ele faz isso...", "alleen. (sozinho.)", "op de computer. (no computador.)"],
  ["leest zijn dochter voor. lezen is", "Le para a filha. Ler e...", "goed voor haar ontwikkeling. (bom para o desenvolvimento.)", "leuk en leerzaam. (legal e educativo.)"],
  ["woont bij het strand. hij wil het liefst", "Mora perto da praia. Ele prefere...", "zwemmen. (nadar.)", "elke dag naar het strand. (ir a praia todo dia.)"],
  ["kijkt vaak televisie. ze houdt van programmas over", "Assiste TV frequentemente. Gosta de programas sobre...", "koken. (culinaria.)", "de natuur. (a natureza.)"],
  ["houdt niet van groente. ze vindt dat", "Nao gosta de legumes. Ela acha que...", "groente niet lekker is. (legumes nao sao gostosos.)", "vlees lekkerder is. (carne e melhor.)"],
  ["rijdt in een vrachtwagen. hij vindt dat", "Dirige um caminhao. Ele acha que...", "zwaar werk. (trabalho pesado.)", "leuk werk. (trabalho legal.)"],
  ["heeft zijn diploma gehaald. hij gaat nu", "Conseguiu o diploma. Ele vai agora...", "werken. (trabalhar.)", "een baan zoeken. (procurar emprego.)"],
  ["eet graag vis. ze haalt die vis", "Gosta de peixe. Ela busca o peixe...", "bij de visboer. (na peixaria.)", "op de markt. (na feira.)"],
  ["hannah leert nederlands. ze leert ook", "Aprende holandes. Ela aprende tambem...", "de cultuur kennen. (a cultura.)", "nieuwe woorden. (palavras novas.)"],
  ["maakt haar huis schoon. ze doet dat", "Limpa a casa. Ela faz isso...", "elke week. (toda semana.)", "op zaterdag. (no sabado.)"],
  ["is niet alleen. hij heeft", "Nao esta sozinho. Ele tem...", "een vrouw en kinderen. (esposa e filhos.)", "vrienden. (amigos.)"],
  ["harry is gevallen. hij heeft", "Caiu. Ele tem...", "pijn. (dor.)", "een wond op zijn been. (ferimento na perna.)"],
  ["maakt zijn brommer. het wiel is", "Conserta a scooter. A roda esta...", "kapot. (quebrada.)", "lek. (furada.)"],
  ["werkt in een restaurant. hij leert daar", "Trabalha no restaurante. Ele aprende la...", "koken. (cozinhar.)", "nieuwe gerechten. (pratos novos.)"],
  ["bord van sahid is gevallen. sahid is", "O prato caiu. Sahid esta...", "niet blij. (nao feliz.)", "verdrietig. (triste.)"],
  ["eten is heel warm! je moet", "A comida esta muito quente! Voce deve...", "wachten. (esperar.)", "voorzichtig zijn. (ter cuidado.)"],
  ["fruit is op. ik ga nu naar", "A fruta acabou. Vou agora para...", "de supermarkt. (o supermercado.)", "de markt. (a feira.)"],
  ["huis van tania is heel groot. haar huis heeft", "A casa de Tania e muito grande. Tem...", "veel kamers. (muitos quartos.)", "een grote tuin. (jardim grande.)"],
  ["is donker. ik reis dan liever niet met", "Esta escuro. Prefiro nao viajar de...", "de fiets. (bicicleta.)", "de motor. (moto.)"],
  ["is druk in de stad. er zijn veel", "Esta movimentado na cidade. Ha muitos...", "mensen. (pessoas.)", "auto's en fietsen. (carros e bicicletas.)"],
  ["is druk op de weg. emir vindt dat", "Estrada movimentada. Emir acha que...", "vervelend. (chatice.)", "gevaarlijk. (perigoso.)"],
  ["is druk op het station. er zijn veel", "Estacao movimentada. Ha muitos...", "reizigers. (viajantes.)", "treinen. (trens.)"],
  ["is koud in het huis van faiz. hij wil", "Esta frio na casa de Faiz. Ele quer...", "de verwarming aanzetten. (ligar o aquecimento.)", "warme kleren aantrekken. (roupas quentes.)"],
  ["is slecht weer. gaan we met de", "O tempo esta ruim. Vamos de...", "auto? (carro?)", "bus? (onibus?)"],
  ["is stil in de klas. de leerlingen", "Sala quieta. Os alunos...", "werken. (estao trabalhando.)", "maken een toets. (fazem uma prova.)"],
  ["is warm vandaag. ana wil", "Esta quente hoje. Ana quer...", "zwemmen. (nadar.)", "buiten zitten. (sentar la fora.)"],
  ["is zondag. eva gaat op zondag altijd naar", "E domingo. Eva vai todo domingo para...", "de kerk. (a igreja.)", "haar familie. (sua familia.)"],
  ["regent al de hele dag. william wil", "Esta chovendo o dia todo. William quer...", "thuisblijven. (ficar em casa.)", "niet naar buiten gaan. (nao sair.)"],
  ["regent onderweg. marta wil", "Esta chovendo no caminho. Marta quer...", "een paraplu. (guarda-chuva.)", "schuilen. (se abrigar.)"],
  ["vliegveld is ver weg. we gaan naar het vliegveld met", "O aeroporto e longe. Vamos de...", "de taxi. (taxi.)", "de trein. (trem.)"],
  ["hetty is klaar met koken. ze roept", "Terminou de cozinhar. Ela chama...", "haar kinderen. (seus filhos.)", "de familie. (a familia.)"],
  ["hue wil naar de markt. ze gaat", "Quer ir a feira. Ela vai...", "met de bus. (de onibus.)", "te voet. (a pe.)"],
  ["ibrahim heeft een kar met spullen", "Tem carrinho com coisas. Leva as coisas...", "naar de winkel. (para a loja.)", "naar zijn werk. (para o trabalho.)"],
  ["iedereen is blij. het is", "Todo mundo esta feliz. E...", "een feest. (uma festa.)", "een bijzondere dag. (dia especial.)"],
  ["ben op zoek naar het treinstation", "Procuro a estacao. Voce pode me...", "de weg wijzen? (indicar o caminho?)", "helpen? (ajudar?)"],
  ["ben ziek. ik ga morgen niet", "Estou doente. Amanha nao vou...", "naar school. (para a escola.)", "werken. (trabalhar.)"],
  ["drink geen alcohol. ik drink wel graag", "Nao bebo alcool. Mas gosto de beber...", "water of sap. (agua ou suco.)", "thee. (cha.)"],
  ["eet graag brood. ik houd niet van", "Gosto de pao. Nao gosto de...", "rijst. (arroz.)", "pasta. (massa.)"],
  ["eet nooit druiven. ik vind druiven", "Nunca como uva. Acho uva...", "niet lekker. (nao gostosa.)", "te zuur. (azeda demais.)"],
  ["eet nooit kip. dat vind ik", "Nunca como frango. Acho que...", "niet lekker. (nao e gostoso.)", "vies. (nojento.)"],
  ["ga een taart maken. wil jij", "Vou fazer bolo. Voce quer...", "helpen? (ajudar?)", "ook een stukje? (um pedaco?)"],
  ["ga morgen brood kopen. brood koop ik meestal", "Amanha compro pao. Geralmente compro...", "bij de bakker. (na padaria.)", "in de supermarkt. (no supermercado.)"],
  ["ga naar de huisarts. hij geeft mij", "Vou ao medico. Ele me da...", "een recept. (receita.)", "advies. (conselho.)"],
  ["ga naar mijn zus. mijn zus woont", "Vou visitar minha irma. Ela mora...", "in amsterdam. (em Amsterdam.)", "in een andere stad. (em outra cidade.)"],
  ["ga straks naar hamza. hij is", "Vou visitar Hamza. Ele e...", "mijn vriend. (meu amigo.)", "ziek. (doente.)"],
  ["ga vaak met de bus. ik ga dan naar", "Frequentemente vou de onibus. Vou para...", "mijn werk. (meu trabalho.)", "het centrum. (o centro.)"],
  ["heb deze krant gelezen. wil jij de krant nu", "Ja li este jornal. Voce quer...", "lezen? (ler?)", "ook? (tambem?)"],
  ["heb een computer met internet. die gebruik ik", "Tenho computador com internet. Uso para...", "om te werken. (trabalhar.)", "om informatie te zoeken. (buscar informacao.)"],
  ["heb een nieuwe tafel gekocht. wil jij mijn oude tafel", "Comprei mesa nova. Voce quer minha mesa...", "hebben? (ter?)", "kopen? (comprar?)"],
  ["heb geen auto. een auto is", "Nao tenho carro. Um carro e...", "te duur. (muito caro.)", "niet nodig. (desnecessario.)"],
  ["heb soep gemaakt. wil jij mijn soep", "Fiz sopa. Voce quer minha sopa...", "proeven? (experimentar?)", "ook? (tambem?)"],
  ["heb wortels gekocht. ik koop de wortels voor", "Comprei cenouras. Compro para...", "de soep. (a sopa.)", "het avondeten. (o jantar.)"],
  ["houd van tekenen. ik teken", "Gosto de desenhar. Desenho...", "in mijn vrije tijd. (no tempo livre.)", "elke dag iets. (algo todo dia.)"],
  ["lees het nieuws op mijn telefoon. mijn man leest het nieuws", "Leio noticias no celular. Meu marido le...", "in de krant. (no jornal.)", "op de computer. (no computador.)"],
  ["lees vaak. ik lees graag", "Leio frequentemente. Gosto de ler...", "romans. (romances.)", "tijdschriften. (revistas.)"],
  ["wil zieke mensen helpen. ik vind dat", "Quero ajudar pessoas doentes. Acho que...", "heel belangrijk. (muito importante.)", "goed werk. (bom trabalho.)"],
  ["imani vindt school leuk. zij houdt van", "Acha a escola legal. Ela gosta de...", "leren. (aprender.)", "nieuwe dingen ontdekken. (descobrir coisas novas.)"],
  ["in de stad rijden veel brommers. ik vind dat", "Ha muitas scooters na cidade. Acho que...", "gevaarlijk. (perigoso.)", "druk en vervelend. (agitado e chatice.)"],
  ["in een grote stad wonen veel mensen. ik vind dat", "Em cidade grande. Acho que...", "leuk. (legal.)", "soms moeilijk. (as vezes dificil.)"],
  ["in het eten zitten pepers. ik vind dat", "Ha pimenta na comida. Acho que...", "lekker. (gostoso.)", "te heet. (muito picante.)"],
  ["en luis bouwen een huis. het huis heeft nog geen", "Constroem uma casa. A casa ainda nao tem...", "dak. (telhado.)", "ramen. (janelas.)"],
  ["inez gaat naar een concert. ze gaat", "Vai a um show. Ela vai...", "met haar vrienden. (com amigas.)", "in het weekend. (no fim de semana.)"],
  ["is dat boek leuk? ik wil het boek ook graag", "Esse livro e legal? Tambem quero muito...", "lezen. (ler.)", "kopen. (comprar.)"],
  ["isa heeft pauze. ze belt met haar", "Esta de pausa. Ela liga para seu...", "man. (marido.)", "moeder. (mae.)"],
  ["isabel speelt graag met haar pop. soms speelt ze ook met", "Gosta da boneca. As vezes brinca com...", "haar zusje. (irmazinha.)", "andere speelgoed. (outros brinquedos.)"],
  ["heeft groenten in zijn tuin. hij gaat de groenten", "Tem legumes no jardim. Ele vai...", "oogsten. (colher.)", "verkopen. (vender.)"],
  ["niet blij met zijn werk. hij vindt zijn werk te", "Nao contente com trabalho. Ele acha muito...", "saai. (chato.)", "zwaar. (pesado.)"],
  ["wil gezond zijn. hij drinkt geen", "Quer ser saudavel. Ele nao bebe...", "alcohol. (alcool.)", "frisdrank. (refrigerante.)"],
  ["jack koopt tomaten. hij koopt ook", "Compra tomates. Ele tambem compra...", "komkommers. (pepinos.)", "uien en paprika. (cebola e pimentao.)"],
  ["wil de muziek niet horen. hij vindt de muziek", "Nao quer ouvir a musica. Ele acha a musica...", "te hard. (muito alta.)", "vervelend. (chatice.)"],
  ["is leraar. hij geeft", "E professor. Ele da...", "les aan kinderen. (aulas para criancas.)", "nederlandslessen. (aulas de holandes.)"],
  ["maakt pannenkoeken voor haar familie", "Faz panquecas para a familia. Ela faz isso...", "graag. (com prazer.)", "op zondag. (no domingo.)"],
  ["houdt niet van dansen. hij vindt dansen", "Nao gosta de dancar. Ele acha dancar...", "moeilijk. (dificil.)", "niet leuk. (nao e legal.)"],
  ["jakob zoekt een taxi. hij wil", "Procura taxi. Ele quer...", "naar het station. (ir a estacao.)", "snel naar huis. (ir rapido para casa.)"],
  ["heeft een nieuwe scooter. hij kan nu", "Tem scooter nova. Ele pode agora...", "sneller reizen. (viajar mais rapido.)", "makkelijker naar zijn werk. (ir mais facil ao trabalho.)"],
  ["woont in een flatgebouw. hij wil graag", "Mora num predio. Ele gostaria de...", "een huis met tuin. (casa com jardim.)", "meer ruimte. (mais espaco.)"],
  ["maakt kleding. die kleding is voor", "Faz roupas. Essas roupas sao para...", "haar kinderen. (seus filhos.)", "de verkoop. (a venda.)"],
  ["heeft zijn arm gebroken. hij moet nu", "Quebrou o braco. Ele precisa agora...", "rusten. (descansar.)", "naar het ziekenhuis. (ir ao hospital.)"],
  ["heeft koorts. zijn moeder geeft hem", "Tem febre. A mae da a ele...", "medicijnen. (remedios.)", "paracetamol. (paracetamol.)"],
  ["janine leert nederlands. ze praat met de lerares over", "Aprende holandes. Ela conversa com a professora sobre...", "de les. (a aula.)", "haar vorderingen. (seu progresso.)"],
  ["jara is zwanger. ze krijgt", "Esta gravida. Ela vai ter...", "een baby. (um bebe.)", "een kind. (um filho.)"],
  ["gaat naar het ziekenhuis. in het ziekenhuis zijn", "Vai ao hospital. No hospital tem...", "dokters en verpleegkundigen. (medicos e enfermeiros.)", "veel patienten. (muitos pacientes.)"],
  ["gaat graag naar school. hij kan goed", "Gosta de escola. Ele e bom em...", "lezen en schrijven. (ler e escrever.)", "rekenen. (matematica.)"],
  ["houdt van muziek. ze speelt graag", "Gosta de musica. Ela gosta de tocar...", "gitaar. (violao.)", "piano. (piano.)"],
  ["moet langer werken vandaag. ze mag pas om acht uur", "Precisa trabalhar mais hoje. So pode as oito...", "naar huis. (ir para casa.)", "stoppen. (parar.)"],
  ["jie is op de markt. hij ziet", "Esta na feira. Ele ve...", "veel groente en fruit. (legumes e frutas.)", "mensen winkelen. (pessoas comprando.)"],
  ["gaat naar het strand. het is daar", "Vai a praia. La esta...", "mooi en warm. (bonito e quente.)", "druk. (movimentado.)"],
  ["heeft haast. hij moet snel naar", "Esta com pressa. Ele precisa ir rapido para...", "zijn werk. (o trabalho.)", "het station. (a estacao.)"],
  ["maakt de borden schoon. daarna gaat ze", "Lava os pratos. Depois ela vai...", "naar bed. (dormir.)", "tv kijken. (assistir TV.)"],
  ["heeft een vieze keuken. hij moet", "Tem cozinha suja. Ele precisa...", "schoonmaken. (limpar.)", "de keuken opruimen. (arrumar.)"],
  ["doet suiker in haar koffie. suiker is", "Coloca acucar no cafe. Acucar e...", "lekker maar niet gezond. (gostoso mas nao saudavel.)", "zoet. (doce.)"],
  ["en zijn dochter bakken samen taart", "Ele e a filha assam bolo juntos. Eles acham que...", "leuk. (legal.)", "gezellig. (agradavel.)"],
  ["houdt van paarden. hij vindt paarden", "Gosta de cavalos. Ele acha cavalos...", "prachtig. (magnificos.)", "interessant. (interessantes.)"],
  ["woont bij een bos. hij gaat daar elk weekend", "Mora perto de bosque. Vai la todo fim de semana...", "wandelen. (caminhar.)", "fietsen. (andar de bicicleta.)"],
  ["johnny is moe. hij wil", "Esta cansado. Ele quer...", "slapen. (dormir.)", "rusten. (descansar.)"],
  ["is vrij op zaterdag. hij gaat", "Esta de folga no sabado. Ele vai...", "sporten. (praticar esporte.)", "vrienden bezoeken. (visitar amigos.)"],
  ["werkt altijd buiten. dat is", "Trabalha ao ar livre. Isso e...", "gezond maar soms zwaar. (saudavel mas as vezes pesado.)", "niet altijd makkelijk. (nem sempre facil.)"],
  ["heeft de hele dag gelopen. hij wil nu", "Caminhou o dia todo. Ele quer agora...", "rusten. (descansar.)", "zitten. (sentar.)"],
  ["koopt een krant in de winkel. hij koopt ook", "Compra jornal. Ele tambem compra...", "een tijdschrift. (uma revista.)", "een flesje water. (agua.)"],
  ["leest een tijdschrift. soms leest ze ook", "Le uma revista. As vezes tambem le...", "een boek. (um livro.)", "de krant. (o jornal.)"],
  ["julio gaat verhuizen. hij moet", "Vai se mudar. Ele precisa...", "dozen inpakken. (fazer caixas.)", "een nieuw huis zoeken. (procurar casa nova.)"],
  ["heeft pijn in zijn rug. hij moet", "Tem dor nas costas. Ele precisa...", "naar de dokter. (ir ao medico.)", "rusten. (descansar.)"],
  ["leest het weerbericht. het weer wordt", "Le a previsao. O tempo vai...", "slecht. (piorar.)", "beter. (melhorar.)"],
  ["gaat naar de dokter. ze voelt zich", "Vai ao medico. Ela se sente...", "niet goed. (mal.)", "ziek. (doente.)"],
  ["kijkt naar het journaal. ze doet dat", "Assiste ao jornal. Ela faz isso...", "elke avond. (toda noite.)", "om op de hoogte te blijven. (para ficar informada.)"],
  ["gaat met zijn dochter naar de dierentuin", "Vai com a filha ao zoologico. Eles olham para...", "de dieren. (os animais.)", "de leeuwen en olifanten. (leoes e elefantes.)"],
  ["volgt een opleiding. ze wil", "Faz um curso. Ela quer...", "een goed beroep leren. (aprender profissao.)", "werken als verpleegkundige. (trabalhar como enfermeira.)"],
  ["zoekt een nieuw huis. hij vindt zijn oude huis", "Procura casa nova. Ele acha a casa velha...", "te klein. (muito pequena.)", "te oud. (muito velha.)"],
  ["eet s avonds met zijn familie. dat vindt hij", "Come a noite com a familia. Ele acha que...", "gezellig. (agradavel.)", "heel fijn. (muito bom.)"],
  ["rookt al twintig jaar sigaretten. dat is", "Fuma cigarros ha vinte anos. Isso e...", "slecht voor zijn gezondheid. (ruim para a saude.)", "een slechte gewoonte. (mau habito.)"],
  ["zoekt op internet. hij zoekt naar", "Pesquisa na internet. Ele procura...", "informatie. (informacao.)", "een nieuwe baan. (novo emprego.)"],
  ["eet een salade met paprika. in de salade zit ook", "Come salada com pimentao. Na salada tambem tem...", "komkommer. (pepino.)", "tomaat en ui. (tomate e cebola.)"],
  ["heeft huiswerk. hij moet veel", "Tem dever de casa. Ele precisa muito...", "studeren. (estudar.)", "lezen. (ler.)"],
  ["werkt in een restaurant. hij maakt vandaag", "Trabalha no restaurante. Ele faz hoje...", "soep. (sopa.)", "een speciaal gerecht. (prato especial.)"],
  ["zit in de klas. hij heeft een vraag over", "Esta na sala. Ele tem pergunta sobre...", "de les. (a aula.)", "de grammatica. (a gramatica.)"],
  ["is visser. na het werk is hij vaak", "E pescador. Apos o trabalho esta frequentemente...", "moe. (cansado.)", "thuis. (em casa.)"],
  ["kun je mij een lepel geven? ik wil", "Pode me dar colher? Quero...", "de soep eten. (comer a sopa.)", "roeren. (mexer.)"],
  ["kun je mij naar het station brengen", "Pode me levar a estacao? Preciso chegar a tempo...", "de trein halen. (pegar o trem.)", "een vergadering. (uma reuniao.)"],
  ["is chauffeur. hij rijdt", "E motorista. Ele dirige...", "elke dag lange afstanden. (longas distancias todo dia.)", "een bus of vrachtwagen. (onibus ou caminhao.)"],
  ["moet elke dag vroeg opstaan. soms is ze", "Precisa acordar cedo todo dia. As vezes esta...", "erg moe. (muito cansada.)", "niet uitgerust. (nao descansada.)"],
  ["werkt elke dag buiten. ze houdt van", "Trabalha ao ar livre todo dia. Ela gosta de...", "de natuur. (a natureza.)", "frisse lucht. (ar fresco.)"],
  ["heeft veel collegas. ze gaan samen", "Tem muitos colegas. Eles vao juntos...", "lunchen. (almocam.)", "pauze houden. (fazer pausa.)"],
  ["eet graag in een restaurant. ze vindt dat", "Gosta de restaurante. Ela acha que...", "lekker en gezellig. (gostoso e agradavel.)", "heel fijn. (muito bom.)"],
  ["gaat naar haar kleinzoon. ze geeft hem", "Vai visitar o neto. Ela da a ele...", "een cadeautje. (presentinho.)", "snoep. (doces.)"],
  ["lea is in het ziekenhuis. ze wil", "Esta no hospital. Ela quer...", "snel beter worden. (logo ficar boa.)", "naar huis gaan. (ir para casa.)"],
  ["speelt op straat. dat is", "Brinca na rua. Isso e...", "leuk maar gevaarlijk. (legal mas perigoso.)", "niet altijd veilig. (nem sempre seguro.)"],
  ["leon is verkouden. hij moet", "Esta resfriado. Ele precisa...", "rusten. (descansar.)", "medicijnen nemen. (tomar remedios.)"],
  ["speelt gitaar. hij doet dat", "Toca violao. Ele faz isso...", "elke avond. (toda noite.)", "voor zijn plezier. (por prazer.)"],
  ["slaapt samen met haar zus in een kamer", "Dormem juntas num quarto. Elas acham que...", "gezellig. (agradavel.)", "soms te druk. (as vezes agitado.)"],
  ["en chen gaan iets drinken. ze drinken", "Vao tomar algo. Elas tomam...", "koffie. (cafe.)", "thee of sap. (cha ou suco.)"],
  ["wil meer geld voor haar werk. dan kan ze", "Quer mais dinheiro. Assim pode...", "meer sparen. (economizar mais.)", "een betere woning kopen. (moradia melhor.)"],
  ["kan niet goed zien. hij moet", "Nao enxerga bem. Ele precisa...", "een bril dragen. (usar oculos.)", "naar de oogarts. (ir ao oftalmologo.)"],
  ["gaat elke dinsdag sporten. ze eet daarna altijd", "Pratica esporte toda terca. Depois sempre come...", "iets gezonds. (algo saudavel.)", "fruit of groente. (fruta ou legume.)"],
  ["lin zoekt werk. ze gaat naar", "Procura trabalho. Ela vai para...", "het uitzendbureau. (agencia de empregos.)", "een sollicitatiegesprek. (entrevista de emprego.)"],
  ["wil iets eten. ze eet liever geen", "Quer comer algo. Ela prefere nao comer...", "vlees. (carne.)", "vet eten. (comida gordurosa.)"],
  ["heeft niet goed geslapen. ze blijft", "Nao dormiu bem. Ela fica...", "thuis. (em casa.)", "in bed. (na cama.)"],
  ["gaat vanavond koken. ze gaat eerst", "Vai cozinhar a noite. Ela vai primeiro...", "boodschappen doen. (fazer compras.)", "de ingredienten kopen. (comprar ingredientes.)"],
  ["en haar moeder gaan met het vliegtuig. lizzie vindt dat", "Vao de aviao. Lizzie acha que...", "spannend. (emocionante.)", "leuk en eng. (legal e assustador.)"],
  ["gaat op de scooter naar zijn werk. hij doet dat", "Vai de scooter para o trabalho. Ele faz isso...", "elke dag. (todo dia.)", "omdat het sneller is. (porque e mais rapido.)"],
  ["louis gebruikt de computer. hij wil", "Usa o computador. Ele quer...", "informatie zoeken. (buscar informacao.)", "online werken. (trabalhar online.)"],
  ["heeft haar been gebroken. nu kan ze niet", "Quebrou a perna. Agora ela nao pode...", "lopen. (andar.)", "werken. (trabalhar.)"],
  ["wil nieuw werk. ze vindt haar oude werk", "Quer novo trabalho. Ela acha o trabalho antigo...", "saai. (chato.)", "te zwaar. (muito pesado.)"],
  ["heeft een auto. ze gaat met de auto naar", "Tem um carro. Ela vai de carro para...", "haar werk. (o trabalho.)", "de supermarkt. (o supermercado.)"],
  ["heeft een nieuwe auto. ze kan nu", "Tem carro novo. Ela pode agora...", "makkelijker reizen. (viajar facilmente.)", "verder van huis werken. (trabalhar mais longe.)"],
  ["mag ik jouw brommer lenen? mijn brommer is", "Posso emprestar sua scooter? A minha esta...", "kapot. (quebrada.)", "bij de garage. (na oficina.)"],
  ["kijkt niet naar het nieuws. ze vindt het nieuws", "Nao assiste ao jornal. Ela acha as noticias...", "te negatief. (muito negativas.)", "saai. (chatas.)"],
  ["maja maakt soep. de soep is", "Faz sopa. A sopa esta...", "lekker en warm. (gostosa e quente.)", "bijna klaar. (quase pronta.)"],
  ["gaat vandaag niet sporten. hij heeft geen", "Nao vai ao esporte hoje. Ele nao tem...", "tijd. (tempo.)", "energie. (energia.)"],
  ["heeft een nieuwe bank gekocht. de oude bank was", "Comprou sofa novo. O sofa velho estava...", "kapot. (quebrado.)", "te oud. (muito velho.)"],
  ["eet vaak chips als ze een film kijkt. ze eet soms ook", "Come batata ao assistir filme. As vezes come tambem...", "popcorn. (pipoca.)", "nootjes. (amendoins.)"],
  ["is buschauffeur. hij rijdt", "E motorista de onibus. Ele dirige...", "elke dag door de stad. (todo dia pela cidade.)", "veel mensen naar hun werk. (muitas pessoas ao trabalho.)"],
  ["heeft zin in koffie. hij wil ook", "Quer cafe. Ele tambem quer...", "een koekje. (biscoito.)", "iets eten. (comer algo.)"],
  ["marco is ziek. hij belt", "Esta doente. Ele liga para...", "zijn baas. (seu chefe.)", "de dokter. (o medico.)"],
  ["maria heeft griep. ze moet", "Esta com gripe. Ela precisa...", "rusten en medicijnen nemen. (descansar e tomar remedios.)", "thuisblijven. (ficar em casa.)"],
  ["kan goed koken. ze kookt meestal", "Cozinha bem. Ela geralmente cozinha...", "voor haar familie. (para a familia.)", "thuis. (em casa.)"],
  ["leest een boek. ze vindt het", "Le um livro. Ela acha...", "heel interessant. (muito interessante.)", "leuk. (legal.)"],
  ["leest op zondag de krant. ze leest soms", "Le jornal no domingo. As vezes le...", "ook tijdschriften. (tambem revistas.)", "online nieuws. (noticias online.)"],
  ["mariam praat met de leraar. mariam praat ook met haar", "Conversa com o professor. Mariam conversa tambem com sua...", "vriendin. (amiga.)", "moeder. (mae.)"],
  ["eet elke ochtend een ei. zijn vrouw eet meestal", "Come ovo toda manha. A esposa come geralmente...", "yoghurt. (iogurte.)", "brood met kaas. (pao com queijo.)"],
  ["stelt een vraag aan de docent. de vraag gaat over", "Faz pergunta ao professor. A pergunta e sobre...", "de grammatica. (a gramatica.)", "de les. (a aula.)"],
  ["kookt voor dina. maryam maakt", "Cozinha para Dina. Maryam faz...", "soep. (sopa.)", "rijst met groente. (arroz com legumes.)"],
  ["kan vandaag zitten in de bus. soms moet ze", "Pode sentar no onibus. As vezes precisa...", "staan. (ficar em pe.)", "wachten op de volgende bus. (esperar o proximo.)"],
  ["draagt een helm op zijn werk. dat moet van zijn", "Usa capacete no trabalho. Obrigatorio pelo seu...", "baas. (chefe.)", "bedrijf. (empresa.)"],
  ["doet de gordijnen dicht. ze gaat", "Fecha as cortinas. Ela vai...", "slapen. (dormir.)", "rusten. (descansar.)"],
  ["gaat vandaag verhuizen. ze woont straks", "Vai se mudar hoje. Em breve morara...", "in een nieuw huis. (numa casa nova.)", "in een andere buurt. (outro bairro.)"],
  ["wacht op het station. ze wacht op haar", "Espera na estacao. Ela espera por seu...", "man. (marido.)", "vriendin. (amiga.)"],
  ["perez heeft geen auto meer. nu moet ze", "Perez nao tem mais carro. Agora ela precisa...", "met de bus gaan. (ir de onibus.)", "de trein nemen. (pegar o trem.)"],
  ["maakt zelf kleren. vandaag maakt ze een", "Faz roupas ela mesma. Hoje ela faz um...", "jurk. (vestido.)", "blouse. (blusa.)"],
  ["moet snel naar huis. ze gaat met de", "Precisa ir rapido para casa. Ela vai de...", "bus. (onibus.)", "fiets. (bicicleta.)"],
  ["houdt niet van tennis. hij houdt meer van", "Nao gosta de tenis. Ele gosta mais de...", "voetbal. (futebol.)", "zwemmen. (natacao.)"],
  ["kijkt vaak films. ze houdt van films over", "Assiste filmes frequentemente. Gosta de filmes sobre...", "avontuur. (aventura.)", "romantiek. (romance.)"],
  ["maakt huiswerk. ze vindt het huiswerk", "Faz dever de casa. Ela acha o dever...", "moeilijk. (dificil.)", "veel. (muito.)"],
  ["stopt met werken. hij is", "Para de trabalhar. Ele esta...", "met pensioen. (aposentado.)", "klaar voor vandaag. (pronto por hoje.)"],
  ["auto is kapot. nu moet ik", "Meu carro esta quebrado. Agora preciso...", "de bus nemen. (pegar o onibus.)", "de auto laten repareren. (consertar o carro.)"],
  ["baas fietst elke dag. ik doe dat", "Meu chefe anda de bicicleta. Eu faco isso...", "ook soms. (as vezes tambem.)", "niet, ik ga met de bus. (nao, vou de onibus.)"],
  ["benzine is op. nu moet ik", "Acabou a gasolina. Agora preciso...", "tanken. (abastecer.)", "naar een tankstation gaan. (posto de gasolina.)"],
  ["broer houdt niet van varen. hij wordt altijd ziek op", "Meu irmao nao gosta de navegar. Fica doente no...", "het water. (mar/agua.)", "de boot. (barco.)"],
  ["broer zingt veel. hij is", "Meu irmao canta muito. Ele e...", "zanger. (cantor.)", "muzikaal. (musical.)"],
  ["buurman maakt graag muziek. dat vind ik", "Meu vizinho gosta de fazer musica. Acho que...", "leuk om te horen. (legal ouvir.)", "soms te hard. (as vezes muito alto.)"],
  ["opa gaat elke dag wandelen. dat is", "Meu avo caminha todo dia. Isso e...", "goed voor zijn gezondheid. (bom para a saude.)", "een goede gewoonte. (bom habito.)"],
  ["opa zit op de bank. hij kijkt naar", "Meu avo esta no sofa. Ele assiste...", "televisie. (televisao.)", "het nieuws. (as noticias.)"],
  ["telefoon is kapot. nu kan ik niet", "Meu celular esta quebrado. Agora nao posso...", "bellen. (ligar.)", "berichten sturen. (mandar mensagens.)"],
  ["trein vertrekt over een half uur. ik ga nu", "Meu trem parte em meia hora. Vou agora...", "naar het station. (para a estacao.)", "instappen. (embarcar.)"],
  ["vader heeft een paard. hij gaat", "Meu pai tem cavalo. Ele vai...", "rijden. (cavalgar.)", "elke dag naar de stal. (a cavalaria.)"],
  ["vader loopt met een stok. mijn vader is", "Meu pai anda com bengala. Meu pai esta...", "oud. (velho.)", "ziek. (doente.)"],
  ["vader luistert graag naar het nieuws. hij luistert ook naar", "Meu pai ouve noticias. Ele tambem ouve...", "de radio. (o radio.)", "muziek. (musica.)"],
  ["zus rijdt altijd hard. ik vind dat", "Minha irma dirige rapido. Acho que...", "gevaarlijk. (perigoso.)", "niet verstandig. (imprudente.)"],
  ["heeft pijn aan zijn been. hij heeft ook pijn aan zijn", "Tem dor na perna. Ele tambem tem dor no seu...", "voet. (pe.)", "knie. (joelho.)"],
  ["rijdt vaak op zijn scooter. hij wil niet", "Anda de scooter. Ele nao quer...", "de bus nemen. (pegar onibus.)", "te voet gaan. (ir a pe.)"],
  ["heeft zin in koffie. ze drinkt koffie met", "Esta com vontade de cafe. Ela bebe cafe com...", "melk. (leite.)", "suiker. (acucar.)"],
  ["en zijn familie spelen een spel. daarna gaan ze", "Ele e a familia jogam. Depois vao...", "eten. (comer.)", "slapen. (dormir.)"],
  ["zit aan tafel. hij schrijft een brief aan zijn", "Esta a mesa. Ele escreve carta para seu...", "vader. (pai.)", "broer. (irmao.)"],
  ["maakt autos. dat vindt hij", "Fabrica carros. Ele acha que...", "leuk werk. (trabalho legal.)", "interessant. (interessante.)"],
  ["maakt graag fotos. ze maakt het liefst fotos van", "Gosta de fotos. Ela prefere fotos de...", "de natuur. (a natureza.)", "haar familie. (sua familia.)"],
  ["wil graag een huis met een tuin. ze vindt dat", "Quer casa com jardim. Ela acha que...", "heel fijn. (muito bom.)", "belangrijk voor haar kinderen. (importante para filhos.)"],
  ["en liz gaan naar een cafe. ze willen graag", "Vao a um cafe. Elas querem...", "iets drinken. (tomar algo.)", "bijkletsen. (pôr o papo em dia.)"],
  ["heeft kip gekocht. ze gaat de kip eerst", "Comprou frango. Ela vai primeiro...", "schoonmaken. (limpar.)", "kruiden. (temperar.)"],
  ["wil kapper worden. ze leert", "Quer ser cabeleireira. Ela aprende...", "knippen en kleuren. (cortar e colorir.)", "op school. (na escola.)"],
  ["en oscar zitten in de bioscoop. ze vinden de film", "Estao no cinema. Eles acham o filme...", "heel goed. (otimo.)", "spannend. (empolgante.)"],
  ["zoekt een nieuw huis. hij wil een huis met", "Procura casa nova. Ele quer com...", "een tuin. (jardim.)", "twee slaapkamers. (dois quartos.)"],
  ["woont bij de supermarkt. ze woont ook bij", "Mora perto do supermercado. Tambem perto de...", "een school. (uma escola.)", "het station. (a estacao.)"],
  ["wil naar zijn familie. hij reist met", "Quer visitar a familia. Ele viaja de...", "het vliegtuig. (aviao.)", "de trein. (trem.)"],
  ["zoekt werk. hij wil graag werken bij", "Procura trabalho. Ele gostaria de trabalhar em...", "een bedrijf. (uma empresa.)", "een restaurant. (um restaurante.)"],
  ["gaat naar de tandarts. ze heeft pijn aan haar", "Vai ao dentista. Ela tem dor no seu...", "kies. (dente molar.)", "tand. (dente.)"],
  ["nikki zoekt een nieuw huis. ze wil graag", "Procura casa nova. Ela gostaria de...", "meer ruimte. (mais espaco.)", "een tuin hebben. (ter jardim.)"],
  ["nina speelt in de tuin. ze speelt met", "Brinca no jardim. Ela brinca com...", "haar vriendinnen. (amigas.)", "een bal. (uma bola.)"],
  ["leest een bericht in de krant. het bericht gaat over", "Le noticia no jornal. A noticia e sobre...", "het nieuws. (as noticias.)", "de politiek. (a politica.)"],
  ["werkt in een winkel. ze verkoopt broeken en ook", "Trabalha na loja. Ela vende calcas e tambem...", "jurken. (vestidos.)", "shirts. (camisetas.)"],
  ["en souffian wonen in een dorp. ze wonen liever", "Moram numa aldeia. Eles preferem morar...", "in de stad. (na cidade.)", "in een grotere plaats. (lugar maior.)"],
  ["ruimt het huis op. ze legt de kleren", "Arruma a casa. Ela coloca as roupas...", "in de kast. (no armario.)", "op de juiste plek. (no lugar certo.)"],
  ["olga is ziek. ze moet", "Esta doente. Ela precisa...", "rusten. (descansar.)", "naar de dokter. (ir ao medico.)"],
  ["omar koopt vis. hij koopt ook", "Compra peixe. Ele tambem compra...", "groente. (legumes.)", "aardappelen. (batatas.)"],
  ["leest s ochtends altijd eerst de krant. daarna gaat hij", "Le jornal toda manha primeiro. Depois ele vai...", "ontbijten. (tomar cafe da manha.)", "werken. (trabalhar.)"],
  ["dak is kapot. wij moeten", "Nosso telhado esta quebrado. Precisamos...", "het laten repareren. (consertar.)", "een monteur bellen. (ligar para tecnico.)"],
  ["heeft leuke buren. ze gaat met haar buren", "Tem vizinhos legais. Ela vai com eles...", "koffie drinken. (tomar cafe.)", "wandelen. (caminhar.)"],
  ["pablo gaat vaak met de trein. hij gaat dan naar", "Vai de trem frequentemente. Ele vai para...", "zijn werk. (o trabalho.)", "de stad. (a cidade.)"],
  ["pablo speelt gitaar. hij oefent", "Toca violao. Ele pratica...", "elke dag. (todo dia.)", "s avonds. (a noite.)"],
  ["pari gaat elke dag met de bus. vandaag gaat ze", "Vai de onibus todo dia. Hoje ela vai...", "met de auto. (de carro.)", "met haar man. (com o marido.)"],
  ["vindt zijn werk moeilijk. hij wil", "Acha o trabalho dificil. Ele quer...", "ander werk. (outro trabalho.)", "een cursus volgen. (fazer curso.)"],
  ["gaat vroeg naar bed. hij moet morgen", "Vai dormir cedo. Amanha ele precisa...", "vroeg opstaan. (acordar cedo.)", "werken. (trabalhar.)"],
  ["heeft honger. zijn moeder geeft hem", "Esta com fome. A mae da a ele...", "iets te eten. (algo para comer.)", "een boterham. (um sanduiche.)"],
  ["viert zijn verjaardag. hij is", "Celebra aniversario. Ele esta...", "jarig. (fazendo aniversario.)", "blij. (feliz.)"],
  ["heeft een brief gekregen. de brief is van", "Recebeu uma carta. A carta e de...", "de gemeente. (a prefeitura.)", "haar familie. (sua familia.)"],
  ["doet de lamp aan. het is", "Liga a lampada. Esta...", "donker. (escuro.)", "s avonds laat. (tarde da noite.)"],
  ["woont op een boerderij. hij heeft daar", "Mora numa fazenda. Ele tem la...", "koeien en kippen. (vacas e galinhas.)", "veel dieren. (muitos animais.)"],
  ["maakt machines. hij werkt vaak", "Fabrica maquinas. Ele trabalha frequentemente...", "s nachts. (a noite.)", "met zijn handen. (com as maos.)"],
  ["speelt met zijn zoon. ze zijn", "Brinca com o filho. Eles estao...", "blij samen. (felizes juntos.)", "in de tuin. (no jardim.)"],
  ["fietst op de weg. de weg is", "Pedala na estrada. A estrada esta...", "druk. (movimentada.)", "gevaarlijk. (perigosa.)"],
  ["zit in de tuin. ze zit ook vaak", "Esta sentada no jardim. Ela senta frequentemente...", "binnen. (dentro de casa.)", "op het terras. (na varanda.)"],
  ["woont naast een park. ze gaat daar", "Mora ao lado de parque. Ela vai la...", "wandelen. (caminhar.)", "sporten. (praticar esporte.)"],
  ["doet een opleiding. later wordt ze", "Faz curso. Mais tarde ela sera...", "verpleegkundige. (enfermeira.)", "dokter. (medica.)"],
  ["maakt saus. haar dochters willen", "Faz molho. Suas filhas querem...", "helpen. (ajudar.)", "ook koken. (tambem cozinhar.)"],
  ["eet vandaag niet thuis. hij eet", "Nao come em casa hoje. Ele come...", "in een restaurant. (num restaurante.)", "bij een collega. (na casa de colega.)"],
  ["zingt vaak alleen. soms zingt ze ook", "Canta frequentemente sozinha. As vezes canta tambem...", "met haar vrienden. (com amigas.)", "in een koor. (num coral.)"],
  ["heeft een telefoon. hij belt elke dag met zijn", "Tem celular. Ele liga todo dia para seu...", "moeder. (mae.)", "vrouw. (esposa.)"],
  ["heeft een fijn huis. hij woont daar met", "Tem casa otima. Ele mora la com...", "zijn gezin. (sua familia.)", "zijn vrouw en kinderen. (esposa e filhos.)"],
  ["heeft nederlandse les. ze vindt haar docent", "Tem aula de holandes. Ela acha seu professor...", "heel goed. (otimo.)", "geduldig en aardig. (paciente e simpatico.)"],
  ["werkt op een kantoor. het kantoor is", "Trabalha no escritorio. O escritorio e...", "groot en modern. (grande e moderno.)", "in het centrum. (no centro.)"],
  ["remi werkt op de markt. hij verkoopt", "Trabalha na feira. Ele vende...", "groente en fruit. (legumes e frutas.)", "vis. (peixe.)"],
  ["is haar sleutel kwijt. nu moet ze", "Perdeu a chave. Agora ela precisa...", "een nieuwe sleutel maken. (chave nova.)", "de deur laten openen. (abrir a porta.)"],
  ["eet vaak snoep. snoep is slecht voor", "Come doce frequentemente. Doce e ruim para...", "je tanden. (seus dentes.)", "je gezondheid. (sua saude.)"],
  ["krijgt een prik. hij is", "Vai tomar injecao. Ele esta...", "een beetje bang. (um pouco com medo.)", "bij de dokter. (no medico.)"],
  ["en haar dochter zijn in de keuken. haar dochter wil", "Ela e a filha na cozinha. A filha quer...", "helpen met koken. (ajudar a cozinhar.)", "leren koken. (aprender a cozinhar.)"],
  ["loopt snel naar school. hij is", "Corre para a escola. Ele esta...", "te laat. (atrasado.)", "haast. (com pressa.)"],
  ["werkt op een school. hij geeft les aan", "Trabalha numa escola. Ele da aulas para...", "kinderen. (criancas.)", "jongeren. (jovens.)"],
  ["wil zijn vriend spreken. hij gaat", "Quer conversar com o amigo. Ele vai...", "naar zijn huis. (a casa dele.)", "bellen. (ligar.)"],
  ["heeft weinig geld. hij werkt", "Tem pouco dinheiro. Ele trabalha...", "hard om meer te verdienen. (muito para ganhar mais.)", "elke dag. (todo dia.)"],
  ["wil een film zien. hij gaat naar", "Quer ver um filme. Ele vai para...", "de bioscoop. (o cinema.)", "thuis kijken. (ver em casa.)"],
  ["heeft een nieuwe baan. hij werkt bij", "Tem novo emprego. Ele trabalha em...", "een groot bedrijf. (grande empresa.)", "een winkel. (uma loja.)"],
  ["heeft vakantie. hij gaat", "Esta de ferias. Ele vai...", "op reis. (viajar.)", "naar zijn familie. (visitar a familia.)"],
  ["is te laat op zijn werk. zijn baas is", "Esta atrasado no trabalho. Seu chefe esta...", "boos. (bravo.)", "niet blij. (nao feliz.)"],
  ["is bakker. hij werkt meestal", "E padeiro. Ele trabalha geralmente...", "s ochtends vroeg. (bem cedo de manha.)", "van vier uur s ochtends. (desde as quatro da manha.)"],
  ["snijdt de uien. zijn vrouw gaat", "Corta as cebolas. Sua esposa vai...", "de groente wassen. (lavar os legumes.)", "het vlees klaarmaken. (preparar a carne.)"],
  ["sam loopt het lokaal uit. hij gaat", "Sai da sala. Ele vai...", "naar huis. (para casa.)", "naar de wc. (ao banheiro.)"],
  ["is te laat voor de trein. hij moet nu", "Esta atrasado para o trem. Ele precisa agora...", "rennen. (correr.)", "een taxi nemen. (pegar um taxi.)"],
  ["heeft een gesprek met haar baas. ze praten over", "Tem conversa com a chefe. Elas conversam sobre...", "haar werk. (o trabalho.)", "haar salaris. (o salario.)"],
  ["gaat naar haar ouders. ze gaan samen", "Vai visitar os pais. Eles vao juntos...", "eten. (comer.)", "een wandeling maken. (caminhar.)"],
  ["heeft pijn aan haar rug. ze kan niet goed", "Tem dor nas costas. Ela nao consegue bem...", "lopen. (andar.)", "werken. (trabalhar.)"],
  ["heeft vandaag les. hij gaat morgen", "Tem aula hoje. Amanha ele vai...", "vrij. (ficar de folga.)", "naar de bibliotheek. (a biblioteca.)"],
  ["praat met zijn baas. hij vraagt", "Conversa com o chefe. Ele pergunta...", "om meer vakantie. (por mais ferias.)", "om een salarisverhoging. (por aumento.)"],
  ["vindt de pauze leuk. hij gaat dan", "Gosta do intervalo. Ele vai...", "iets eten. (comer algo.)", "buiten zitten. (sentar la fora.)"],
  ["sandra moet vandaag veel doen. ze moet", "Precisa fazer muito hoje. Ela precisa...", "koken en schoonmaken. (cozinhar e limpar.)", "boodschappen doen. (fazer compras.)"],
  ["kan niet goed koken. het eten is", "Nao sabe cozinhar bem. A comida esta...", "niet lekker. (nao e gostosa.)", "verbrand. (queimada.)"],
  ["praat met haar buurvrouw. ze praten over", "Conversa com a vizinha. Elas conversam sobre...", "de buurt. (o bairro.)", "hun kinderen. (seus filhos.)"],
  ["is nooit ziek. zij voelt zich altijd", "Nunca esta doente. Ela sempre se sente...", "goed. (bem.)", "energiek. (cheia de energia.)"],
  ["zoekt een cursusboek. ze gaat naar", "Procura livro de curso. Ela vai para...", "de bibliotheek. (a biblioteca.)", "de boekwinkel. (a livraria.)"],
  ["eet niet altijd thuis. ze gaat vaak naar", "Nao come sempre em casa. Ela frequentemente vai para...", "een restaurant. (um restaurante.)", "haar familie. (a familia.)"],
  ["gaat naar de bioscoop. ze kijkt", "Vai ao cinema. Ela assiste...", "een nieuwe film. (um filme novo.)", "graag actiefilms. (filmes de acao.)"],
  ["sasha heeft een hond. ze heeft ook", "Tem um cachorro. Ela tambem tem...", "een kat. (um gato.)", "twee katten. (dois gatos.)"],
  ["gaat solliciteren. ze wil", "Vai se candidatar a emprego. Ela quer...", "een nieuwe baan. (novo emprego.)", "meer verdienen. (ganhar mais.)"],
  ["doet een opleiding. hij vindt leren", "Faz um curso. Ele acha aprender...", "interessant. (interessante.)", "moeilijk maar nuttig. (dificil mas util.)"],
  ["kan zijn broer niet bellen. hij stuurt zijn broer een", "Nao consegue ligar para o irmao. Ele manda uma...", "berichtje. (mensagem.)", "e-mail. (e-mail.)"],
  ["draagt een rugzak naar school. in de rugzak zit", "Carrega mochila para a escola. Na mochila tem...", "haar boeken en schriften. (livros e cadernos.)", "haar lunch. (seu almoco.)"],
  ["heeft haar diploma. ze is", "Tem o diploma. Ela esta...", "blij. (feliz.)", "trots. (orgulhosa.)"],
  ["heeft zijn arm gebroken. hij mag niet", "Quebrou o braco. Ele nao pode...", "werken. (trabalhar.)", "sporten. (praticar esporte.)"],
  ["wil niet eten. hij wil liever", "Nao quer comer. Ele prefere...", "slapen. (dormir.)", "spelen. (brincar.)"],
  ["siham volgt een cursus. ze leert", "Faz um curso. Ela aprende...", "nederlands. (holandes.)", "een nieuw vak. (nova profissao.)"],
  ["simon bouwt een huis. het huis wordt", "Constroi uma casa. A casa esta ficando...", "groot en mooi. (grande e bonita.)", "bijna klaar. (quase pronta.)"],
  ["wil leraar worden. hij moet veel", "Quer ser professor. Ele precisa muito...", "studeren. (estudar.)", "oefenen. (praticar.)"],
  ["leest graag een krant. ze koopt hem", "Gosta de ler jornal. Ela o compra...", "elke dag. (todo dia.)", "bij de kiosk. (na banca.)"],
  ["geeft taart aan haar opa. hij vindt dat", "Da bolo para o avo. Ele acha que...", "heel lekker. (muito gostoso.)", "heel aardig. (muito gentil.)"],
  ["werkt in een fabriek. daar werkt hij", "Trabalha numa fabrica. La ele trabalha...", "met machines. (com maquinas.)", "elke dag. (todo dia.)"],
  ["sonia zit in de bus. ze gaat naar", "Esta no onibus. Ela vai para...", "haar werk. (o trabalho.)", "de stad. (a cidade.)"],
  ["houdt van muziek. ze luistert", "Gosta de musica. Ela ouve...", "elke dag. (todo dia.)", "graag naar pop. (pop com prazer.)"],
  ["houdt van rijst. ze kookt dat", "Gosta de arroz. Ela cozinha...", "elke dag. (todo dia.)", "op verschillende manieren. (de varios modos.)"],
  ["sophie is vaak in het bos. ze kijkt graag naar", "Frequentemente no bosque. Ela gosta de olhar para...", "de dieren. (os animais.)", "de natuur. (a natureza.)"],
  ["eet graag mais. ze eet mais meestal met", "Gosta de milho. Ela come milho geralmente com...", "boter. (manteiga.)", "zout. (sal.)"],
  ["koopt bananen op de markt. ze koopt ook", "Compra bananas na feira. Ela tambem compra...", "sinaasappels. (laranjas.)", "appels en peren. (macas e peras.)"],
  ["wil een groter huis. hij wil ook", "Quer casa maior. Ele tambem quer...", "een tuin. (um jardim.)", "een garage. (uma garagem.)"],
  ["belt met zijn zus. zijn zus is", "Liga para a irma. A irma esta...", "ziek. (doente.)", "in het ziekenhuis. (no hospital.)"],
  ["vindt wandelen leuk. ze doet dat", "Acha caminhar legal. Ela faz isso...", "elke dag. (todo dia.)", "in het bos. (no bosque.)"],
  ["moet sporten van de dokter. hij gaat", "Precisa praticar esporte por recomendacao medica. Ele vai...", "zwemmen. (nadar.)", "naar de sportschool. (a academia.)"],
  ["steven is in het ziekenhuis. hij gaat morgen", "Esta no hospital. Amanha ele vai...", "naar huis. (para casa.)", "beter voelen. (se sentir melhor.)"],
  ["komt uit het ziekenhuis. hij is", "Saiu do hospital. Ele esta...", "beter. (melhor.)", "blij dat hij naar huis kan. (feliz por ir para casa.)"],
  ["is kapper. ze moet vandaag veel", "E cabeleireira. Ela precisa hoje...", "knippen. (cortar.)", "klanten helpen. (atender clientes.)"],
  ["tamal moet remmen. hij ziet een", "Precisa frear. Ele ve um...", "kind op de weg. (crianca na estrada.)", "rood licht. (semaforo vermelho.)"],
  ["tanya is bakker. ze verkoopt", "E padeira. Ela vende...", "brood en gebak. (pao e bolos.)", "croissants en taarten. (croissants e tortas.)"],
  ["wil een motor kopen. een motor is", "Quer comprar moto. Uma moto e...", "snel maar gevaarlijk. (rapida mas perigosa.)", "goedkoper dan een auto. (mais barata que carro.)"],
  ["tara zoekt werk. ze kijkt in", "Procura trabalho. Ela procura em...", "de krant. (o jornal.)", "vacaturesites. (sites de vagas.)"],
  ["tariq eet alleen. hij vindt dat", "Come sozinho. Ele acha que...", "niet gezellig. (nao e agradavel.)", "soms oké. (as vezes tudo bem.)"],
  ["eet veel fruit. fruit is", "Come muito fruta. Fruta e...", "gezond. (saudavel.)", "lekker en goed voor je. (gostosa e boa para voce.)"],
  ["wil later in het ziekenhuis werken. ze moet eerst", "Quer trabalhar no hospital. Ela precisa primeiro...", "studeren. (estudar.)", "een opleiding volgen. (fazer curso.)"],
  ["ligt in het ziekenhuis. hij vindt dat", "Esta internado no hospital. Ele acha que...", "niet leuk. (nao e legal.)", "moeilijk. (dificil.)"],
  ["tim is jarig. zijn zus geeft hem een", "Esta fazendo aniversario. Sua irma da a ele um...", "cadeautje. (presentinho.)", "boek. (livro.)"],
  ["koopt een nieuw bed. ze koopt ook", "Compra cama nova. Ela tambem compra...", "nieuwe lakens. (lencois novos.)", "een kussen. (travesseiro.)"],
  ["tony eet brood. hij eet het brood met", "Come pao. Ele come o pao com...", "kaas. (queijo.)", "jam of boter. (geleia ou manteiga.)"],
  ["zit op school. hij heeft volgende week", "Esta na escola. Ele tem na proxima semana...", "een toets. (uma prova.)", "een examen. (um exame.)"],
  ["veel mensen praten in de les. nena vindt dat", "Muitas pessoas falam na aula. Nena acha que...", "storend. (perturbador.)", "vervelend. (chatice.)"],
  ["doet suiker in haar thee. haar thee wordt zo", "Coloca acucar no cha. O cha fica assim...", "zoeter. (mais doce.)", "lekkerder. (mais gostoso.)"],
  ["heeft een nieuw huis. hij gaat morgen", "Tem casa nova. Amanha ele vai...", "verhuizen. (se mudar.)", "inrichten. (decorar.)"],
  ["drinkt koffie met zijn buurman. hij vindt dat", "Toma cafe com o vizinho. Ele acha que...", "gezellig. (agradavel.)", "fijn. (bom.)"],
  ["gaan mijn broer ophalen. hij heeft geen", "Vamos buscar meu irmao. Ele nao tem...", "auto. (carro.)", "rijbewijs. (carteira de motorista.)"],
  ["willen wat leuks doen. we gaan", "Queremos fazer algo legal. Vamos...", "naar het park. (ao parque.)", "een film kijken. (assistir um filme.)"],
  ["wil je mijn huis zien? ik woon hier", "Quer ver minha casa? Moro aqui...", "al twee jaar. (ha dois anos.)", "met mijn gezin. (com minha familia.)"],
  ["wil jij op mijn kinderen passen? ik ga vanavond", "Voce pode tomar conta dos meus filhos? Esta noite vou...", "uit eten. (jantar fora.)", "naar een feest. (a uma festa.)"],
  ["neemt een drankje. dat helpt tegen", "Toma uma bebida. Isso ajuda contra...", "de kou. (o frio.)", "zijn hoest. (sua tosse.)"],
  ["xuan is in de supermarkt. ze wil", "Esta no supermercado. Ela quer...", "boodschappen doen. (fazer compras.)", "groente en fruit kopen. (legumes e frutas.)"],
  ["werkt bij een apotheek. ze werkt daar", "Trabalha numa farmacia. Ela trabalha la...", "elke dag. (todo dia.)", "als apothekersassistent. (como assistente de farmacia.)"],
  ["heeft veel vrienden. hij gaat vaak met ze naar", "Tem muitos amigos. Frequentemente vai com eles para...", "het cafe. (o bar/cafe.)", "het park. (o parque.)"],
  ["eet s ochtends niet veel. ze eet dan alleen", "Nao come muito de manha. Ela come apenas...", "een boterham. (um sanduiche.)", "yoghurt. (iogurte.)"],
  ["moet de vis eerst schoonmaken. daarna gaat ze hem", "Precisa limpar o peixe primeiro. Depois vai...", "koken. (cozinha-lo.)", "bakken. (fritar.)"],
  ["kookt met veel kruiden. zo wordt haar eten", "Cozinha com muitas especiarias. Assim a comida fica...", "lekker en smaakvol. (gostosa e saborosa.)", "heel lekker. (muito gostosa.)"],
  ["zola maakt het huis schoon. ze doet dat", "Limpa a casa. Ela faz isso...", "elke week. (toda semana.)", "op zaterdag. (no sabado.)"],
];

// ─── CARD EMOJI VISUAL MNEMONIC ──────────────────────────────────────────────
function getCardEmoji(text) {
  const t = text.toLowerCase();

  // Health / body
  if (t.includes("tandarts") || t.includes("kies") || t.includes("tand")) return "🦷";
  if (t.includes("dokter") || t.includes("ziekenhuis") || t.includes("verpleeg") || t.includes("medicijn") || t.includes("prik") || t.includes("recept") || t.includes("apotheek")) return "🏥";
  if (t.includes("ziek") || t.includes("koorts") || t.includes("griep") || t.includes("verkouden") || t.includes("hoofdpijn") || t.includes("pijn")) return "🤒";
  if (t.includes("arm gebroken") || t.includes("been gebroken")) return "🦴";
  if (t.includes("gevallen") || t.includes("wond")) return "🩹";

  // Transport
  if (t.includes("vliegtuig") || t.includes("vliegveld")) return "✈️";
  if (t.includes("trein") || t.includes("station")) return "🚆";
  if (t.includes("buschauffeur") || (t.includes("bus") && !t.includes("buurt"))) return "🚌";
  if (t.includes("scooter") || t.includes("brommer")) return "🛵";
  if (t.includes("vrachtwagen")) return "🚛";
  if (t.includes("boot") || t.includes("varen") || t.includes("visser") || t.includes("vluchten")) return "⛵";
  if (t.includes("fiets")) return "🚲";
  if (t.includes("auto") || t.includes("benzine") || t.includes("garage") || t.includes("rijden") || t.includes("chauffeur")) return "🚗";
  if (t.includes("taxi")) return "🚕";

  // Food & drink
  if (t.includes("bakker") || t.includes("brood") || t.includes("koekje") || t.includes("taart") || t.includes("pannenkoek")) return "🥐";
  if (t.includes("restaurant") || t.includes("eten") || t.includes("maaltijd") || t.includes("koken") || t.includes("soep") || t.includes("rijst") || t.includes("groente") || t.includes("vlees")) return "🍳";
  if (t.includes("koffie")) return "☕";
  if (t.includes("thee")) return "🍵";
  if (t.includes("alcohol") || t.includes("bier") || t.includes("wijn")) return "🍺";
  if (t.includes("fruit") || t.includes("banaan") || t.includes("appel") || t.includes("sinaasappel") || t.includes("druiven")) return "🍎";
  if (t.includes("vis") || t.includes("visser")) return "🐟";
  if (t.includes("kip")) return "🍗";
  if (t.includes("snoep") || t.includes("chips")) return "🍬";
  if (t.includes("suiker")) return "🍯";

  // Work & money
  if (t.includes("fabriek") || t.includes("machine")) return "🏭";
  if (t.includes("kantoor")) return "🏢";
  if (t.includes("baas") || t.includes("collega") || t.includes("werk") || t.includes("baan") || t.includes("sollicit") || t.includes("salaris")) return "💼";
  if (t.includes("geld") || t.includes("verdien") || t.includes("betalen") || t.includes("arm gebroken")) return "💰";
  if (t.includes("pensioen")) return "🧓";
  if (t.includes("schoonmaker") || t.includes("schoon") && t.includes("werkt")) return "🧹";

  // School & learning
  if (t.includes("examen") || t.includes("diploma") || t.includes("toets") || t.includes("geslaagd")) return "🎓";
  if (t.includes("school") || t.includes("les") || t.includes("leraar") || t.includes("lerares") || t.includes("docent") || t.includes("klas") || t.includes("huiswerk") || t.includes("opdracht") || t.includes("opleiding")) return "📚";
  if (t.includes("studer") || t.includes("leren") || t.includes("cursus")) return "✏️";
  if (t.includes("bibliotheek")) return "📖";
  if (t.includes("computer") || t.includes("internet")) return "💻";

  // Music & entertainment
  if (t.includes("gitaar") || t.includes("piano") || t.includes("zingen") || t.includes("zanger") || t.includes("concert") || t.includes("muziek")) return "🎵";
  if (t.includes("bioscoop") || t.includes("film")) return "🎬";
  if (t.includes("televisie") || t.includes("tv") || t.includes("journaal") || t.includes("nieuws")) return "📺";
  if (t.includes("boek") || t.includes("lezen") || t.includes("krant") || t.includes("tijdschrift")) return "📰";
  if (t.includes("foto")) return "📸";

  // Sports & nature
  if (t.includes("zwemmen") || t.includes("strand") || t.includes("zee")) return "🏊";
  if (t.includes("voetbal")) return "⚽";
  if (t.includes("sport") || t.includes("hardlopen") || t.includes("joggen")) return "🏃";
  if (t.includes("wandelen") || t.includes("lopen")) return "🚶";
  if (t.includes("fietsen")) return "🚴";
  if (t.includes("bos") || t.includes("natuur") || t.includes("park") || t.includes("tuin")) return "🌲";
  if (t.includes("strand")) return "🏖️";
  if (t.includes("paard")) return "🐴";
  if (t.includes("hond") || t.includes("kat") || t.includes("dier")) return "🐾";

  // Home & shopping
  if (t.includes("verhuizen") || t.includes("nieuw huis") || t.includes("flat") || t.includes("boerderij")) return "🏡";
  if (t.includes("huis") || t.includes("wonen") || t.includes("kamer") || t.includes("dak") || t.includes("sleutel")) return "🏠";
  if (t.includes("winkel") || t.includes("kopen") || t.includes("markt") || t.includes("supermarkt")) return "🛒";
  if (t.includes("kleren") || t.includes("jas") || t.includes("broek") || t.includes("jurk") || t.includes("kapper")) return "👗";

  // Family & relationships
  if (t.includes("baby") || t.includes("zwanger")) return "👶";
  if (t.includes("kind") || t.includes("zoon") || t.includes("dochter") || t.includes("kleinzoon")) return "👧";
  if (t.includes("familie") || t.includes("ouders") || t.includes("broer") || t.includes("zus") || t.includes("moeder") || t.includes("vader") || t.includes("opa") || t.includes("oma")) return "👨‍👩‍👧";
  if (t.includes("vriend") || t.includes("buur")) return "🤝";

  // Communication
  if (t.includes("telefoon") || t.includes("bellen") || t.includes("berichtje") || t.includes("e-mail") || t.includes("brief")) return "📱";
  if (t.includes("politie") || t.includes("ingebroken")) return "🚔";

  // Weather & time
  if (t.includes("regen") || t.includes("paraplu")) return "🌧️";
  if (t.includes("warm") || t.includes("zon")) return "☀️";
  if (t.includes("koud") || t.includes("sneeuw")) return "❄️";

  // V&A specific questions
  if (t.startsWith("hoe laat") || t.includes("uur") || t.includes("wakker") || t.includes("slapen") || t.includes("bed")) return "⏰";
  if (t.startsWith("hoeveel") || t.includes("aantal")) return "🔢";
  if ((t.includes("geboren") || t.includes("land")) && (t.startsWith("waar") || t.startsWith("in welk"))) return "🌍";
  if (t.startsWith("wanneer bent u geboren")) return "🎂";
  if (t.startsWith("hoe gaat het")) return "👋";
  if (t.startsWith("hoe bent u hier")) return "🗺️";
  if (t.includes("muziek") || t.includes("luistert")) return "🎶";
  if (t.startsWith("wat voor werk") || t.includes("werk wil")) return "🛠️";
  if (t.startsWith("waarom wilt u naar nederland")) return "🇳🇱";
  if (t.includes("nederland")) return "🇳🇱";
  if (t.includes("adres")) return "📍";
  if (t.includes("telefoonnummer")) return "☎️";
  if (t.includes("kleur")) return "🎨";
  if (t.includes("feest") || t.includes("verjaardag")) return "🎉";
  if (t.includes("vakantie") || t.includes("reis")) return "🧳";

  return "💬";
}

function generateExplanation(sentence) {
  const lower = sentence.toLowerCase();

  // VRAAG & ANTWOORD (no "...")
  if (!lower.includes("...")) {
    let translation = "";
    let examples = "";

    if (lower.startsWith("bij wie")) { translation = "Com quem voce vai morar na Holanda?"; examples = "Bij mijn man. (Com meu marido.)\nBij mijn zus. (Com minha irma.)\nAlleen. (Sozinho.)"; }
    else if (lower.startsWith("hoe bent u hier gekomen")) { translation = "Como voce chegou aqui?"; examples = "Met het vliegtuig. (De aviao.)\nMet de auto. (De carro.)"; }
    else if (lower.startsWith("hoe gaat het met u")) { translation = "Como vai voce?"; examples = "Goed, dank u. (Bem, obrigado.)\nHet gaat wel. (Vai bem.)"; }
    else if (lower.startsWith("hoe gaat u naar uw werk")) { translation = "Como voce vai para o trabalho?"; examples = "Met de bus. (De onibus.)\nMet de fiets. (De bicicleta.)\nMet de auto. (De carro.)"; }
    else if (lower.startsWith("hoe laat begint u met werken")) { translation = "Que horas voce comeca a trabalhar?"; examples = "Om acht uur. (As oito horas.)\nOm negen uur. (As nove horas.)"; }
    else if (lower.startsWith("hoe laat gaat u")) { translation = "Que horas voce vai dormir?"; examples = "Om tien uur. (As dez horas.)\nOm half elf. (As dez e meia.)"; }
    else if (lower.startsWith("hoe laat is het nu")) { translation = "Que horas sao agora?"; examples = "Het is drie uur. (Sao tres horas.)\nHet is kwart over vijf. (Sao cinco e quinze.)"; }
    else if (lower.startsWith("hoe laat stopt u")) { translation = "Que horas voce para de trabalhar?"; examples = "Om vijf uur. (As cinco horas.)\nOm half zes. (As cinco e meia.)"; }
    else if (lower.startsWith("hoe laat wordt u")) { translation = "Que horas voce acorda de manha?"; examples = "Om zeven uur. (As sete horas.)\nOm half acht. (As sete e meia.)"; }
    else if (lower.startsWith("hoe vaak bent u al in nederland")) { translation = "Quantas vezes voce ja esteve na Holanda?"; examples = "Nooit. (Nunca.)\nEen keer. (Uma vez.)\nVeel keer. (Muitas vezes.)"; }
    else if (lower.startsWith("hoe vaak kijkt u tv")) { translation = "Com que frequencia voce assiste TV?"; examples = "Elke dag. (Todo dia.)\nSoms, een paar keer per week. (As vezes.)"; }
    else if (lower.startsWith("hoe vaak luistert u")) { translation = "Com que frequencia voce ouve radio?"; examples = "Elke dag, in de auto. (Todo dia, no carro.)\nNooit. (Nunca.)"; }
    else if (lower.startsWith("hoeveel broers en zussen")) { translation = "Quantos irmaos e irmas voce tem?"; examples = "Ik heb twee broers en een zus. (Tenho dois irmaos e uma irma.)\nIk ben een enig kind. (Sou filho unico.)"; }
    else if (lower.startsWith("hoeveel dagen in de week")) { translation = "Quantos dias por semana voce trabalha?"; examples = "Vijf dagen. (Cinco dias.)\nVan maandag tot vrijdag. (De segunda a sexta.)"; }
    else if (lower.startsWith("hoeveel jaar school")) { translation = "Quantos anos de escola voce teve?"; examples = "Twaalf jaar. (Doze anos.)\nAcht jaar basisschool. (Oito anos de escola primaria.)"; }
    else if (lower.startsWith("hoeveel kinderen")) { translation = "Quantos filhos voce tem?"; examples = "Ik heb twee kinderen. (Tenho dois filhos.)\nIk heb geen kinderen. (Nao tenho filhos.)"; }
    else if (lower.startsWith("hoeveel talen spreekt u")) { translation = "Quantos idiomas voce fala?"; examples = "Ik spreek twee talen: Portugees en Nederlands.\nDrie talen. (Tres idiomas.)"; }
    else if (lower.startsWith("in wat voor huis")) { translation = "Em que tipo de casa voce vai morar?"; examples = "In een flat. (Num apartamento.)\nIn een huis met tuin. (Com jardim.)\nIn een rijtjeshuis. (Casa em fileira.)"; }
    else if (lower.startsWith("in welk land bent u geboren")) { translation = "Em qual pais voce nasceu?"; examples = "In Brazilie. (No Brasil.)\nIn Portugal. (Em Portugal.)"; }
    else if (lower.startsWith("in welke plaats")) { translation = "Em qual cidade voce vai morar?"; examples = "In Amsterdam. (Em Amsterdam.)\nIn Rotterdam. (Em Rotterdam.)"; }
    else if (lower.startsWith("met hoeveel mensen werkt u")) { translation = "Com quantas pessoas voce trabalha?"; examples = "Met tien mensen. (Com dez pessoas.)\nAlleen. (Sozinho.)"; }
    else if (lower.startsWith("naar welke muziek luistert u graag")) { translation = "Que musica voce gosta de ouvir?"; examples = "Ik luister graag naar pop. (Gosto de pop.)\nIk hou van samba en jazz."; }
    else if (lower.startsWith("op welke dagen werkt u")) { translation = "Em quais dias voce trabalha?"; examples = "Op maandag, dinsdag en woensdag.\nVan maandag tot vrijdag. (Segunda a sexta.)"; }
    else if (lower.startsWith("van welke muziek houdt u")) { translation = "De que musica voce gosta?"; examples = "Ik hou van pop en rock.\nIk hou van braziliaanse muziek."; }
    else if (lower.startsWith("waar bent u geboren")) { translation = "Onde voce nasceu?"; examples = "Ik ben geboren in Brazilie.\nIn Sao Paulo."; }
    else if (lower.startsWith("waar heeft u nederlands geleerd")) { translation = "Onde voce aprendeu holandes?"; examples = "Op school. (Na escola.)\nBij een taalschool. (Escola de idiomas.)\nThuis, met een lerares. (Em casa.)"; }
    else if (lower.startsWith("waar woont u")) { translation = "Onde voce mora?"; examples = "Ik woon in Amsterdam.\nIk woon in een flat in de stad."; }
    else if (lower.startsWith("waar woont uw familie")) { translation = "Onde sua familia mora?"; examples = "Mijn familie woont in Brazilie.\nIn dezelfde stad. (Na mesma cidade.)"; }
    else if (lower.startsWith("waarom wilt u naar nederland")) { translation = "Por que voce quer ir para a Holanda?"; examples = "Omdat mijn man/vrouw daar woont. (Porque meu marido mora la.)\nOmdat ik werk heb gevonden. (Porque encontrei trabalho.)"; }
    else if (lower.startsWith("wanneer bent u geboren")) { translation = "Quando voce nasceu?"; examples = "Ik ben geboren op 15 maart 1990.\nIn 1985."; }
    else if (lower.startsWith("wanneer wilt u naar nederland")) { translation = "Quando voce quer ir para a Holanda?"; examples = "Volgend jaar. (No ano que vem.)\nOver drie maanden. (Em tres meses.)\nZo snel mogelijk. (O mais rapido possivel.)"; }
    else if (lower.startsWith("wat doet u graag met uw familie")) { translation = "O que voce gosta de fazer com sua familia?"; examples = "Ik eet graag samen met mijn familie.\nWe gaan graag wandelen. (Gostamos de caminhar.)"; }
    else if (lower.startsWith("wat doet u graag met uw vrienden")) { translation = "O que voce gosta de fazer com seus amigos?"; examples = "Ik ga graag uit eten.\nWe kijken graag films samen."; }
    else if (lower.startsWith("wat doet u in het weekend")) { translation = "O que voce faz no fim de semana?"; examples = "Ik ga wandelen in het park.\nIk bezoek mijn familie."; }
    else if (lower.startsWith("wat doet u in uw vrije tijd")) { translation = "O que voce faz no seu tempo livre?"; examples = "Ik lees boeken. (Leio livros.)\nIk sport graag. (Pratico esporte.)\nIk kook. (Cozinho.)"; }
    else if (lower.startsWith("wat doet u op een feestdag")) { translation = "O que voce faz em um feriado?"; examples = "Ik bezoek mijn familie.\nWe eten samen. (Comemos juntos.)"; }
    else if (lower.startsWith("wat drinkt u graag")) { translation = "O que voce gosta de beber?"; examples = "Ik drink graag koffie. (Gosto de cafe.)\nIk drink graag thee en water."; }
    else if (lower.startsWith("wat eet u s avonds") || lower.includes("'s avonds") && lower.startsWith("wat eet")) { translation = "O que voce come a noite?"; examples = "S avonds eet ik rijst met groente.\nIk eet meestal een warme maaltijd."; }
    else if (lower.startsWith("wat eet u s ochtends") || lower.includes("'s ochtends") && lower.startsWith("wat eet")) { translation = "O que voce come de manha?"; examples = "S ochtends eet ik brood met kaas.\nIk eet yoghurt en fruit."; }
    else if (lower.startsWith("wat gaat u morgen doen")) { translation = "O que voce vai fazer amanha?"; examples = "Morgen ga ik werken.\nIk blijf thuis. (Fico em casa.)"; }
    else if (lower.startsWith("wat hebt u geleerd op school")) { translation = "O que voce aprendeu na escola?"; examples = "Ik heb wiskunde en talen geleerd.\nIk heb lezen en schrijven geleerd."; }
    else if (lower.startsWith("wat hebt u gisteren gedaan")) { translation = "O que voce fez ontem?"; examples = "Gisteren heb ik gewerkt.\nIk heb mijn familie bezocht."; }
    else if (lower.startsWith("wat hebt u gisteren gegeten")) { translation = "O que voce comeu ontem?"; examples = "Gisteren heb ik rijst met kip gegeten.\nIk heb soep gegeten."; }
    else if (lower.startsWith("wat is uw adres")) { translation = "Qual e o seu endereco?"; examples = "Mijn adres is Kerkstraat 10, Amsterdam.\nIk woon op Hoofdstraat 5."; }
    else if (lower.startsWith("wat is uw telefoonnummer")) { translation = "Qual e o seu numero de telefone?"; examples = "Mijn nummer is 06-12345678.\nMijn telefoonnummer is nul zes..."; }
    else if (lower.startsWith("wat kookt u graag")) { translation = "O que voce gosta de cozinhar?"; examples = "Ik kook graag rijst met groente.\nIk maak graag soep."; }
    else if (lower.startsWith("wat vindt u van de nederlandse taal")) { translation = "O que voce acha da lingua holandes?"; examples = "Ik vind Nederlands moeilijk maar interessant.\nHet is een mooie taal."; }
    else if (lower.startsWith("wat vindt u van nederland")) { translation = "O que voce acha da Holanda?"; examples = "Ik vind Nederland mooi.\nNederland is koud maar leuk."; }
    else if (lower.startsWith("wat vindt u van nederlandse mensen")) { translation = "O que voce acha dos holandeses?"; examples = "Ik vind Nederlandse mensen aardig.\nZe zijn direct en eerlijk."; }
    else if (lower.startsWith("wat voor kleren draagt u vaak")) { translation = "Que roupa voce usa frequentemente?"; examples = "Ik draag vaak een spijkerbroek en een trui.\nIk draag casual kleren."; }
    else if (lower.startsWith("wat voor kleren vindt u mooi")) { translation = "Que tipo de roupa voce acha bonito?"; examples = "Ik vind sportkleren mooi.\nIk hou van kleurrijke kleren."; }
    else if (lower.startsWith("wat voor werk wilt u doen")) { translation = "Que trabalho voce quer fazer?"; examples = "Ik wil werken als kok. (Quero trabalhar como cozinheiro.)\nIk wil in de zorg werken."; }
    else if (lower.startsWith("wat wilt u graag leren in nederland")) { translation = "O que voce quer aprender na Holanda?"; examples = "Ik wil goed Nederlands leren.\nIk wil de cultuur leren kennen."; }
    else if (lower.startsWith("welke dag is het vandaag")) { translation = "Que dia e hoje?"; examples = "Vandaag is het maandag. (Hoje e segunda.)\nHet is vrijdag. (E sexta.)"; }
    else if (lower.startsWith("welke dieren vindt u leuk")) { translation = "Quais animais voce gosta?"; examples = "Ik vind honden leuk.\nIk hou van katten en vogels."; }
    else if (lower.startsWith("welke kleur vindt u mooi")) { translation = "Qual cor voce acha bonita?"; examples = "Ik vind blauw mooi.\nMijn lievelingskleur is groen."; }
    else if (lower.startsWith("welke maand is het nu")) { translation = "Que mes e agora?"; examples = "Het is januari. (E janeiro.)\nNu is het maart. (Agora e marco.)"; }
    else if (lower.startsWith("welke talen spreekt u")) { translation = "Que idiomas voce fala?"; examples = "Ik spreek Portugees en een beetje Nederlands.\nIk spreek drie talen."; }
    else if (lower.startsWith("wie helpt u met nederlands")) { translation = "Quem te ajuda a aprender holandes?"; examples = "Mijn lerares helpt mij.\nMijn man helpt mij."; }
    else if (lower.startsWith("wie wonen bij u in huis")) { translation = "Quem mora com voce em casa?"; examples = "Mijn man en twee kinderen.\nIk woon alleen. (Moro sozinho.)"; }
    else { translation = ""; examples = "Responda com uma frase completa em holandes."; }

    let result = "";
    if (translation) result += "TRADUCAO\n" + translation + "\n\n";
    result += "EXEMPLOS DE RESPOSTA\n" + examples;
    return result;
  }

  // AANVULZINNEN: lookup in table
  for (const [fragment, transl, ex1, ex2] of AANVUL_HINTS) {
    if (lower.includes(fragment)) {
      // Extract subject name from the original sentence (word before first space, if capitalized)
      const firstWord = sentence.split(" ")[0];
      const isName = firstWord.length > 1 &&
        firstWord[0] === firstWord[0].toUpperCase() &&
        !["De", "Het", "Een", "Er", "In", "Op", "Aan", "Bij", "Wij", "Ik", "Ze", "Hij", "Zij", "Hoe", "Wat", "Wie", "Waar", "Welke", "Hoeveel", "Wanneer", "Waarom", "Mijn", "Ons", "Kun", "Mag", "Veel", "Is", "Zijn"].includes(firstWord);

      let fullTransl = transl;
      if (isName && !transl.startsWith(firstWord)) {
        fullTransl = firstWord + " " + transl.charAt(0).toLowerCase() + transl.slice(1);
      }
      return "TRADUCAO\n" + fullTransl + "\n\nCOMPLETE COM\n• " + ex1 + "\n• " + ex2;
    }
  }

  // Fallback
  return "Complete a frase com uma resposta pessoal em holandes. Qualquer resposta verdadeira e aceita.";
}


// ─── KNM QUIZ DATA ────────────────────────────────────────────────────────────

const KNM_QUESTIONS = [
  // SAÚDE
  { cat: "Saude", q: "Wat doe je als je ziek bent en naar een dokter wilt?", opts: ["Je gaat direct naar het ziekenhuis", "Je belt of gaat naar de huisarts", "Je koopt medicijnen bij de apotheek", "Je belt 112"], a: 1, exp: "In Nederland ga je eerst naar de huisarts (clínico geral). De huisarts verwijst je door naar het ziekenhuis als dat nodig is.", expPt: "Na Holanda, voce vai primeiro ao clinico geral (huisarts). Ele te encaminha ao hospital se necessario." },
  { cat: "Saude", q: "Wat is het telefoonnummer voor spoedeisende hulp in Nederland?", opts: ["911", "999", "112", "0800"], a: 2, exp: "112 is het algemene alarmnummer in Nederland voor politie, brandweer en ambulance.", expPt: "112 e o numero de emergencia geral na Holanda para policia, bombeiros e ambulancia." },
  { cat: "Saude", q: "Wat is een zorgverzekering?", opts: ["Een verzekering voor je huis", "Een verzekering voor medische kosten", "Een pensioenspaarplan", "Een schoolverzekering"], a: 1, exp: "In Nederland is iedereen verplicht een zorgverzekering te hebben. Die betaalt (een deel van) de medische kosten.", expPt: "Na Holanda, todo mundo e obrigado a ter plano de saude. Ele paga (parte d)as despesas medicas." },
  { cat: "Saude", q: "Waar koop je medicijnen op recept in Nederland?", opts: ["Bij de supermarkt", "Bij de huisarts", "Bij de apotheek", "Bij het ziekenhuis"], a: 2, exp: "Medicijnen op recept haal je op bij de apotheek. Zonder recept kun je sommige medicijnen ook bij de drogist kopen.", expPt: "Medicamentos com receita sao retirados na farmacia (apotheek). Sem receita, alguns podem ser comprados na drogaria." },
  { cat: "Saude", q: "Wat is het eigen risico bij een zorgverzekering?", opts: ["Het bedrag dat je zelf betaalt voordat de verzekering betaalt", "De maandelijkse premie", "Het bedrag dat de werkgever betaalt", "De eigen bijdrage voor de tandarts"], a: 0, exp: "Het eigen risico is een bedrag (in 2024: 385 euro) dat je per jaar zelf betaalt voordat de zorgverzekering bijdraagt.", expPt: "O proprio risco e o valor (em 2024: 385 euros) que voce paga por ano antes do plano de saude cobrir os custos." },
  { cat: "Saude", q: "Hoe noem je de dokter waar je als eerste naartoe gaat in Nederland?", opts: ["Specialist", "Tandarts", "Huisarts", "Verpleegkundige"], a: 2, exp: "De huisarts is de eerste dokter die je bezoekt. Hij of zij verwijst je door naar een specialist als dat nodig is.", expPt: "O clinico geral (huisarts) e o primeiro medico que voce visita. Ele te encaminha a um especialista quando necessario." },

  // EDUCAÇÃO
  { cat: "Educacao", q: "Hoe oud zijn kinderen als ze naar de basisschool gaan in Nederland?", opts: ["3 jaar", "4 jaar", "5 jaar", "6 jaar"], a: 1, exp: "Kinderen gaan in Nederland naar de basisschool vanaf 4 jaar. Leerplicht begint op 5 jaar.", expPt: "Na Holanda, as criancas vao para a escola primaria a partir dos 4 anos. A escolaridade obrigatoria comeca aos 5 anos." },
  { cat: "Educacao", q: "Tot welke leeftijd zijn kinderen in Nederland leerplichtig?", opts: ["14 jaar", "16 jaar", "18 jaar", "21 jaar"], a: 2, exp: "Kinderen in Nederland zijn leerplichtig tot 18 jaar. Tussen 16 en 18 jaar geldt de kwalificatieplicht: ze moeten een diploma halen.", expPt: "Na Holanda, as criancas sao obrigadas a estudar ate os 18 anos. Entre 16 e 18 anos devem obter um diploma." },
  { cat: "Educacao", q: "Wat is het VMBO in Nederland?", opts: ["Een type universiteit", "Een soort basisschool", "Een middelbare school met beroepsgericht onderwijs", "Een school voor volwassenen"], a: 2, exp: "VMBO staat voor Voorbereidend Middelbaar Beroepsonderwijs. Na de basisschool kunnen leerlingen naar VMBO, HAVO of VWO.", expPt: "VMBO e o ensino medio profissionalizante. Apos a escola primaria, os alunos podem ir para VMBO, HAVO ou VWO." },
  { cat: "Educacao", q: "Wat is een BSN-nummer?", opts: ["Een schoolnummer", "Een persoonlijk identificatienummer voor alle overheidszaken", "Een banknummer", "Een zorgverzekeringsnummer"], a: 1, exp: "Het BSN (Burgerservicenummer) is een uniek persoonlijk nummer dat je nodig hebt voor contact met de overheid, belasting, zorg en werk.", expPt: "O BSN e um numero pessoal unico necessario para contato com o governo, impostos, saude e trabalho. E como o CPF no Brasil." },
  { cat: "Educacao", q: "Welk document heb je nodig om in Nederland te werken als buitenlander?", opts: ["Alleen een paspoort", "Een verblijfsvergunning en BSN", "Een bankrekening", "Een rijbewijs"], a: 1, exp: "Als buitenlander heb je een verblijfsvergunning en een BSN nodig om legaal te werken in Nederland.", expPt: "Como estrangeiro, voce precisa de uma autorizacao de residencia e um BSN para trabalhar legalmente na Holanda." },

  // TRABALHO
  { cat: "Trabalho", q: "Hoeveel vakantiedagen heeft een werknemer minimaal per jaar in Nederland?", opts: ["10 dagen", "20 dagen", "25 dagen", "30 dagen"], a: 1, exp: "In Nederland heb je wettelijk recht op minimaal 20 vakantiedagen per jaar (bij een fulltime baan van 5 dagen per week).", expPt: "Na Holanda, voce tem direito legal a pelo menos 20 dias de ferias por ano (em emprego integral de 5 dias por semana)." },
  { cat: "Trabalho", q: "Wat is het minimumloon in Nederland?", opts: ["Er is geen minimumloon", "Het loon dat de werkgever bepaalt", "Een wettelijk vastgesteld minimumbedrag per uur", "Het gemiddelde loon in Nederland"], a: 2, exp: "Nederland heeft een wettelijk minimumloon. Dit bedrag wordt regelmatig aangepast en geldt voor werknemers van 21 jaar en ouder.", expPt: "A Holanda tem salario minimo legal. O valor e atualizado regularmente e vale para trabalhadores com 21 anos ou mais." },
  { cat: "Trabalho", q: "Wat is een arbeidscontract?", opts: ["Een bankrekening voor je salaris", "Een schriftelijke afspraak tussen werknemer en werkgever", "Een verzekering bij ziekte", "Een identiteitsbewijs voor werk"], a: 1, exp: "Een arbeidscontract is een schriftelijke overeenkomst tussen jou en je werkgever over je werk, salaris, werktijden en andere afspraken.", expPt: "Um contrato de trabalho e um acordo escrito entre voce e seu empregador sobre funcao, salario, horarios e outras condicoes." },
  { cat: "Trabalho", q: "Waar vraag je een uitkering aan als je geen werk hebt?", opts: ["Bij de huisarts", "Bij het UWV of de gemeente", "Bij de bank", "Bij de politie"], a: 1, exp: "Als je geen werk hebt, kun je een WW-uitkering aanvragen bij het UWV. Als je nooit gewerkt hebt, ga je naar de gemeente voor bijstand.", expPt: "Sem trabalho, voce pode pedir auxilio-desemprego no UWV. Se nunca trabalhou, va a prefeitura pedir assistencia social (bijstand)." },
  { cat: "Trabalho", q: "Wat is de AOW?", opts: ["Een werkloosheidsuitkering", "Een ziekteverzekering", "Het Nederlandse staatspensioen", "Een kinderbijslag"], a: 2, exp: "De AOW (Algemene Ouderdomswet) is het basispensioen dat iedereen in Nederland krijgt als hij of zij de pensioengerechtigde leeftijd bereikt.", expPt: "A AOW e a aposentadoria basica que todos na Holanda recebem ao atingir a idade de reforma." },

  // GOVERNO & POLITICA
  { cat: "Governo", q: "Wat is de Tweede Kamer?", opts: ["Het Nederlandse koningshuis", "Het lagerhuis van het Nederlandse parlement", "De rechtbank in Den Haag", "De burgemeester van Amsterdam"], a: 1, exp: "De Tweede Kamer is het lagerhuis van het Nederlandse parlement. De 150 leden worden gekozen door de bevolking.", expPt: "A Tweede Kamer e a camara baixa do parlamento holandes. Os 150 membros sao eleitos pela populacao." },
  { cat: "Governo", q: "Wie is het staatshoofd van Nederland?", opts: ["De minister-president", "De burgemeester van Amsterdam", "De koning of koningin", "De voorzitter van de Tweede Kamer"], a: 2, exp: "Het staatshoofd van Nederland is de koning of koningin. De huidige koning is Willem-Alexander.", expPt: "O chefe de Estado da Holanda e o rei ou rainha. O rei atual e Willem-Alexander." },
  { cat: "Governo", q: "Wat doet de gemeente?", opts: ["Maakt nationale wetten", "Regelt lokale zaken zoals vergunningen, bijstand en openbare ruimte", "Beheert de rijksbelasting", "Leidt het leger"], a: 1, exp: "De gemeente regelt lokale zaken: vergunningen, sociale hulp, openbare ruimte, onderwijs en meer. Elke stad of dorp heeft een eigen gemeente.", expPt: "A prefeitura (gemeente) cuida de assuntos locais: licencas, assistencia social, espacos publicos, educacao e mais." },
  { cat: "Governo", q: "Hoe vaak zijn er nationale verkiezingen in Nederland?", opts: ["Elke 2 jaar", "Elke 4 jaar", "Elke 6 jaar", "Elke 10 jaar"], a: 1, exp: "De Tweede Kamer wordt normaal elke 4 jaar gekozen. Er kunnen ook tussentijdse verkiezingen zijn als de regering valt.", expPt: "A Tweede Kamer e normalmente eleita a cada 4 anos. Podem ocorrer eleicoes antecipadas se o governo cair." },
  { cat: "Governo", q: "Wat is de hoofdstad van Nederland?", opts: ["Rotterdam", "Den Haag", "Amsterdam", "Utrecht"], a: 2, exp: "Amsterdam is de officiële hoofdstad van Nederland. De regering en het parlement zitten in Den Haag.", expPt: "Amsterdam e a capital oficial da Holanda. Porem o governo e o parlamento ficam em Den Haag (Haia)." },
  { cat: "Governo", q: "In welke stad zitten de Nederlandse regering en het parlement?", opts: ["Amsterdam", "Rotterdam", "Utrecht", "Den Haag"], a: 3, exp: "De Nederlandse regering, het parlement (Tweede en Eerste Kamer) en de ministeries zitten in Den Haag.", expPt: "O governo holandes, o parlamento e os ministerios ficam em Den Haag (Haia), nao em Amsterdam." },

  // HABITAÇÃO
  { cat: "Habitacao", q: "Wat is huurtoeslag?", opts: ["Een lening om een huis te kopen", "Financiele hulp van de overheid voor mensen met een laag inkomen die huren", "Een belasting op huurwoningen", "Een verzekering voor huurders"], a: 1, exp: "Huurtoeslag is een bijdrage van de overheid om de huurkosten te helpen betalen voor mensen met een laag inkomen.", expPt: "O huurtoeslag e um subsidio do governo para ajudar a pagar o aluguel para pessoas de baixa renda." },
  { cat: "Habitacao", q: "Wat moet je doen als je verhuist naar een nieuwe gemeente?", opts: ["Niets, het gaat automatisch", "Je meldt je aan bij de nieuwe gemeente (inschrijven in de BRP)", "Je betaalt een verhuisbelasting", "Je vraagt een nieuw paspoort aan"], a: 1, exp: "Als je verhuist, moet je je inschrijven bij de gemeente in de Basisregistratie Personen (BRP). Dit moet binnen 5 dagen.", expPt: "Ao se mudar, voce deve se registrar na prefeitura (BRP). Isso deve ser feito dentro de 5 dias." },
  { cat: "Habitacao", q: "Wat is een hypotheek?", opts: ["Een huurcontract", "Een lening om een huis te kopen, waarbij het huis als onderpand dient", "Een soort huurtoeslag", "Een belasting voor huiseigenaren"], a: 1, exp: "Een hypotheek is een lening bij de bank om een huis te kopen. Het huis is het onderpand: als je niet betaalt, kan de bank het huis verkopen.", expPt: "Uma hipoteca e um emprestimo bancario para comprar uma casa. A casa serve como garantia: se nao pagar, o banco pode vende-la." },

  // TRANSPORTE
  { cat: "Transporte", q: "Wat is een OV-chipkaart?", opts: ["Een creditcard voor de supermarkt", "Een kaart om met het openbaar vervoer te reizen", "Een rijbewijs voor de bus", "Een identiteitsbewijs"], a: 1, exp: "De OV-chipkaart is de betaalkaart voor het openbaar vervoer (bus, tram, metro, trein) in Nederland.", expPt: "O OV-chipkaart e o cartao de pagamento para o transporte publico (onibus, bonde, metro, trem) na Holanda." },
  { cat: "Transporte", q: "Welke kant rijdt het verkeer in Nederland?", opts: ["Links", "Rechts", "Beide kanten", "Hangt af van de provincie"], a: 1, exp: "In Nederland rijdt het verkeer aan de rechterkant van de weg, net als in de meeste Europese landen.", expPt: "Na Holanda, o transito circula pelo lado direito da estrada, como na maioria dos paises europeus." },
  { cat: "Transporte", q: "Wat is de maximumsnelheid op de meeste snelwegen in Nederland?", opts: ["100 km/u", "120 km/u", "130 km/u", "150 km/u"], a: 2, exp: "Op de meeste snelwegen in Nederland geldt overdag een maximumsnelheid van 100 km/u. 's Nachts (tussen 19:00 en 06:00) is dit 130 km/u op sommige wegen.", expPt: "Na maioria das autoestradas holandesas, a velocidade maxima diurna e de 100 km/h. A noite, em algumas estradas, sobe para 130 km/h." },

  // COSTUMES & CULTURA
  { cat: "Cultura", q: "Wat vieren Nederlanders op 5 december?", opts: ["Kerstmis", "Sinterklaas", "Koningsdag", "Oud en Nieuw"], a: 1, exp: "Op 5 december (Pakjesavond) vieren Nederlanders Sinterklaas. Kinderen krijgen dan cadeautjes.", expPt: "Em 5 de dezembro (Noite dos Presentes), os holandeses celebram o Sinterklaas. As criancas recebem presentes." },
  { cat: "Cultura", q: "Op welke dag viert Nederland Koningsdag?", opts: ["30 april", "27 april", "5 mei", "15 augustus"], a: 1, exp: "Koningsdag is op 27 april (de verjaardag van koning Willem-Alexander). Er zijn feesten en vrijmarkten door het hele land.", expPt: "O Dia do Rei e em 27 de abril (aniversario do rei Willem-Alexander). Ha festas e feiras de pulga por todo o pais." },
  { cat: "Cultura", q: "Wat is 5 mei in Nederland?", opts: ["Koningsdag", "Bevrijdingsdag", "Sinterklaas", "Dodenherdenking"], a: 1, exp: "5 mei is Bevrijdingsdag: de dag dat Nederland in 1945 werd bevrijd van de Duitse bezetting tijdens de Tweede Wereldoorlog.", expPt: "5 de maio e o Dia da Libertacao: o dia em que a Holanda foi libertada da ocupacao alema em 1945, na Segunda Guerra Mundial." },
  { cat: "Cultura", q: "Wat is een gebruikelijke manier om iemand te begroeten in Nederland?", opts: ["Drie kussen op de wang", "Een diepe buiging", "Een handdruk of drie kussen (bij bekenden)", "Alleen zwaaien"], a: 2, exp: "In Nederland begroet je mensen met een handdruk (formeel) of drie kussen op de wang (bij bekenden en familie).", expPt: "Na Holanda, cumprimentam-se com um aperto de mao (formal) ou tres beijos na bochecha (com conhecidos e familia)." },
  { cat: "Cultura", q: "Welke taal wordt gesproken in de provincie Friesland naast Nederlands?", opts: ["Duits", "Fries", "Engels", "Zeeuws"], a: 1, exp: "In Friesland is Fries een officiële taal naast het Nederlands. Friezen kunnen officieel zaken doen in het Fries.", expPt: "Na provincia de Friesland, o Frisao e uma lingua oficial alem do holandes. Os frisioes podem lidar com o governo em frisao." },

  // INTEGRAÇÃO
  { cat: "Integracao", q: "Wat is het inburgeringsexamen?", opts: ["Een examen om rijbewijs te halen", "Een examen dat aantoont dat je Nederlands spreekt en de samenleving begrijpt", "Een belastingexamen", "Een examen voor de universiteit"], a: 1, exp: "Het inburgeringsexamen toont aan dat je de Nederlandse taal beheerst en de Nederlandse samenleving begrijpt. Het is verplicht voor veel nieuwkomers.", expPt: "O exame de integracao (inburgeringsexamen) mostra que voce domina o holandes e entende a sociedade holandesa. E obrigatorio para muitos imigrantes." },
  { cat: "Integracao", q: "Welk taalniveau moet je halen voor het inburgeringsexamen?", opts: ["A1", "A2", "B1", "B2"], a: 2, exp: "Voor het inburgeringsexamen moet je Nederlands spreken op B1-niveau. Dit is een basisniveau waarmee je in de meeste situaties kunt communiceren.", expPt: "Para o exame de integracao, voce precisa falar holandes no nivel B1. E um nivel basico para comunicar na maioria das situacoes." },
  { cat: "Integracao", q: "Wat is de DUO?", opts: ["Een bank in Nederland", "Een organisatie die studie- en inburgeringszaken regelt", "Een zorgverzekeraar", "Een politieke partij"], a: 1, exp: "DUO (Dienst Uitvoering Onderwijs) is de overheidsorganisatie die onder andere studiefinanciering en inburgering regelt.", expPt: "O DUO e a organizacao governamental que cuida de financiamento estudantil e do processo de integracao (inburgering)." },
  { cat: "Integracao", q: "Wat is de Participatieverklaring?", opts: ["Een arbeidscontract", "Een verklaring dat je de waarden van de Nederlandse samenleving onderschrijft", "Een huurcontract", "Een belastingformulier"], a: 1, exp: "De Participatieverklaring is een document dat je ondertekent als je belooft de basiswaarden van Nederland te respecteren. Dit is onderdeel van het inburgeringstraject.", expPt: "A Declaracao de Participacao e um documento que voce assina prometendo respeitar os valores basicos da Holanda. Faz parte do processo de integracao." },

  // SERVIÇOS PÚBLICOS
  { cat: "Servicos", q: "Waar haal je een paspoort of identiteitskaart op in Nederland?", opts: ["Bij de politie", "Bij de gemeente", "Bij de bank", "Bij het postkantoor"], a: 1, exp: "Een paspoort of identiteitskaart vraag je aan bij de gemeente waar je ingeschreven staat.", expPt: "Voce solicita passaporte ou carteira de identidade na prefeitura (gemeente) onde esta registrado." },
  { cat: "Servicos", q: "Wat is de Belastingdienst?", opts: ["Een bank", "De organisatie die belastingen int en toeslagen uitkeert", "Een verzekeringsmaatschappij", "Een gemeentelijke dienst"], a: 1, exp: "De Belastingdienst is de overheidsorganisatie die belastingen int en toeslagen (zoals huurtoeslag en zorgtoeslag) uitbetaalt.", expPt: "O Belastingdienst e o fisco holandes: cobra impostos e paga subsidios como huurtoeslag (aluguel) e zorgtoeslag (saude)." },
  { cat: "Servicos", q: "Wat is zorgtoeslag?", opts: ["Een soort zorgverzekering", "Financiele hulp van de overheid voor de premie van de zorgverzekering", "Een uitkering bij ziekte", "Een vergoeding van de werkgever"], a: 1, exp: "Zorgtoeslag is een bijdrage van de overheid om de kosten van de verplichte zorgverzekering te helpen betalen voor mensen met een laag inkomen.", expPt: "O zorgtoeslag e um subsidio do governo para ajudar a pagar o plano de saude obrigatorio para pessoas de baixa renda." },
  { cat: "Servicos", q: "Wat is kinderopvang?", opts: ["Een school voor kinderen van 4-12 jaar", "Opvang voor jonge kinderen terwijl ouders werken", "Een kinderziekenhuis", "Een speeltuin"], a: 1, exp: "Kinderopvang is professionele opvang voor kinderen (0-4 jaar) terwijl de ouders werken. Er is kinderopvangtoeslag beschikbaar voor werkende ouders.", expPt: "Kinderopvang e creche profissional para criancas (0-4 anos) enquanto os pais trabalham. Ha subsidio de creche para pais que trabalham." },
  { cat: "Servicos", q: "Wat is de politie?", opts: ["De organisatie die wetten maakt", "De organisatie die de openbare orde handhaaft en criminaliteit bestrijdt", "De rechtbank", "De gemeente"], a: 1, exp: "De politie handhaaft de openbare orde, helpt burgers en bestrijdt criminaliteit. Bel 112 voor spoed, 0900-8844 voor niet-spoedeisende zaken.", expPt: "A policia mantem a ordem publica, ajuda cidadaos e combate o crime. Ligue 112 para emergencias, 0900-8844 para situacoes nao urgentes." },
];

const LEITURA_TEXTOS = [
  {
    id: 1, cat: "Bericht", label: "Bericht", title: "Bericht van de buren",
    text: `Hallo,\n\nIk ben uw buurvrouw, mevrouw De Vries. Ik woon naast u op nummer 12.\n\nMorgen, dinsdag 15 maart, komen er mensen om de straat te repareren. Ze beginnen om 8 uur 's ochtends. De straat is dan afgesloten tot 17 uur.\n\nU kunt uw auto niet voor de deur parkeren. Zet uw auto vanavond al op de parkeerplaats achter de supermarkt.\n\nMet vriendelijke groet,\nMevrouw De Vries`,
    questions: [
      { q: "Waarom schrijft mevrouw De Vries dit bericht?", opts: ["Om een feest aan te kondigen", "Om te vertellen dat de straat morgen afgesloten is", "Om te vragen of de buurman haar auto kan verplaatsen", "Om een klacht in te dienen"], a: 1, exp: "Mevrouw De Vries schrijft dat de straat morgen wordt gerepareerd en afgesloten is.", expPt: "A Sra. De Vries escreve que a rua sera reparada amanha e estara fechada." },
      { q: "Hoe laat begint het werk aan de straat?", opts: ["7 uur", "8 uur", "17 uur", "15 uur"], a: 1, exp: "In het bericht staat: 'Ze beginnen om 8 uur ochtends.'", expPt: "No texto diz: 'Eles comecam as 8 horas da manha.'" },
      { q: "Waar moet u uw auto parkeren?", opts: ["Voor de deur van nummer 12", "Op de parkeerplaats achter de supermarkt", "Op straat", "In de garage"], a: 1, exp: "Mevrouw De Vries schrijft: 'Zet uw auto op de parkeerplaats achter de supermarkt.'", expPt: "A Sra. De Vries escreve: 'Coloque seu carro no estacionamento atras do supermercado.'" },
    ]
  },
  {
    id: 2, cat: "Advertentie", label: "Advertentie", title: "Cursus Nederlands voor beginners",
    text: `CURSUS NEDERLANDS VOOR BEGINNERS\n\nStart: maandag 3 april\nTijd: elke maandag en woensdag van 19:00 tot 21:00 uur\nLocatie: Bibliotheek De Bron, Kerkstraat 45, Haarlem\nPrijs: 150 euro voor 10 lessen (inclusief boek)\nNiveau: A1 - A2\n\nVoor wie?\nDeze cursus is voor mensen die Nederlands willen leren. U heeft geen kennis van het Nederlands nodig om te beginnen.\n\nAanmelden?\nBel ons op 023-456 7890 of stuur een e-mail naar info@taalcursus.nl\nAanmelden voor 25 maart.`,
    questions: [
      { q: "Op welke dagen is de cursus?", opts: ["Dinsdag en donderdag", "Maandag en woensdag", "Elke dag", "Alleen op zaterdag"], a: 1, exp: "In de advertentie staat: 'elke maandag en woensdag'.", expPt: "No anuncio diz: 'toda segunda e quarta-feira'." },
      { q: "Hoeveel kost de cursus?", opts: ["100 euro", "150 euro", "200 euro", "Gratis"], a: 1, exp: "De prijs is 150 euro voor 10 lessen, inclusief het boek.", expPt: "O preco e de 150 euros por 10 aulas, incluindo o livro." },
      { q: "Wanneer moet u zich aanmelden?", opts: ["Voor 3 april", "Voor 25 maart", "Voor 1 mei", "Wanneer u wilt"], a: 1, exp: "In de advertentie staat: 'Aanmelden voor 25 maart.'", expPt: "No anuncio diz: 'Inscreva-se antes de 25 de marco.'" },
    ]
  },
  {
    id: 3, cat: "Brief", label: "Brief", title: "Brief van het ziekenhuis",
    text: `Ziekenhuis Westland\nAfdeling Polikliniek\n\nGeachte mevrouw Bakker,\n\nU heeft een afspraak bij ons ziekenhuis op:\nDatum: woensdag 22 februari\nTijd: 10:30 uur\nAfdeling: Orthopedie, kamer 3B\n\nWij vragen u om 10 minuten voor uw afspraak aanwezig te zijn.\nNeem uw verzekeringspas en identiteitsbewijs mee.\n\nAls u niet kunt komen, bel dan minstens 24 uur van tevoren:\nTelefoon: 070-234 5678\n\nMet vriendelijke groet,\nDe afdeling Polikliniek`,
    questions: [
      { q: "Bij welke afdeling is de afspraak?", opts: ["Cardiologie", "Orthopedie", "Neurologie", "Spoedeisende hulp"], a: 1, exp: "In de brief staat: 'Afdeling: Orthopedie, kamer 3B'.", expPt: "Na carta diz: 'Departamento: Ortopedia, sala 3B'." },
      { q: "Hoe laat moet mevrouw Bakker aanwezig zijn?", opts: ["Om 10:30 uur", "Om 10:20 uur", "Om 11:00 uur", "Om 10:00 uur"], a: 1, exp: "De afspraak is om 10:30, maar men vraagt 10 minuten eerder te komen: dus om 10:20.", expPt: "A consulta e as 10:30, mas pedem para chegar 10 minutos antes: entao as 10:20." },
      { q: "Wat moet mevrouw Bakker meenemen?", opts: ["Alleen haar identiteitsbewijs", "Haar verzekeringspas en identiteitsbewijs", "Haar medisch dossier", "Niets"], a: 1, exp: "In de brief staat: 'Neem uw verzekeringspas en identiteitsbewijs mee.'", expPt: "Na carta diz: 'Traga seu cartao do plano de saude e documento de identidade.'" },
    ]
  },
  {
    id: 4, cat: "Folder", label: "Folder", title: "Gemeentelijke diensten",
    text: `GEMEENTE AMSTERDAM\nInformatie voor nieuwe inwoners\n\nWelkom in Amsterdam!\n\nAls u nieuw in Amsterdam bent, moet u een paar dingen regelen:\n\n1. Inschrijven bij de gemeente\nU moet zich inschrijven binnen 5 dagen na uw aankomst.\n\n2. DigiD aanvragen\nMet een DigiD kunt u online zaken regelen met de overheid.\n\n3. Zorgverzekering afsluiten\nIedereen in Nederland moet een zorgverzekering hebben. Dit moet binnen 4 maanden na aankomst.\n\n4. BSN nummer\nU krijgt een BSN nummer automatisch als u zich inschrijft bij de gemeente.\n\nVragen? Bel 14 020 (maandag t/m vrijdag, 8:00 - 18:00 uur)`,
    questions: [
      { q: "Binnen hoeveel dagen moet u zich inschrijven bij de gemeente?", opts: ["2 dagen", "5 dagen", "10 dagen", "30 dagen"], a: 1, exp: "In de folder staat: 'U moet zich inschrijven binnen 5 dagen na uw aankomst.'", expPt: "No folheto diz: 'Voce deve se registrar dentro de 5 dias apos sua chegada.'" },
      { q: "Waarvoor heeft u een DigiD nodig?", opts: ["Om boodschappen te doen", "Om online zaken te regelen met de overheid", "Om een bankrekening te openen", "Om naar school te gaan"], a: 1, exp: "Een DigiD is nodig om online zaken te regelen met de overheid.", expPt: "O DigiD e necessario para resolver assuntos online com o governo." },
      { q: "Wanneer krijgt u automatisch een BSN nummer?", opts: ["Als u een DigiD aanvraagt", "Als u een zorgverzekering afsluit", "Als u zich inschrijft bij de gemeente", "Als u een baan vindt"], a: 2, exp: "In de folder staat: 'U krijgt een BSN nummer automatisch als u zich inschrijft bij de gemeente.'", expPt: "No folheto diz: 'Voce recebe um numero BSN automaticamente ao se registrar na prefeitura.'" },
    ]
  },
  {
    id: 5, cat: "Bericht", label: "Bericht", title: "WhatsApp van een collega",
    text: `Van: Fatima\nAan: Groep Werk\n\nHoi allemaal,\n\nIk wil jullie laten weten dat ik morgen niet op het werk kan zijn. Mijn dochter is ziek en ik moet thuis blijven.\n\nIk heb al een e-mail gestuurd naar onze baas, meneer Visser.\n\nKunnen jullie mijn taken overnemen?\n- De vergadering om 10 uur: kan iemand de notulen schrijven?\n- De bestelling bij leverancier Van Dam: ik heb alles al geregeld, jullie hoeven alleen de bevestiging te tekenen.\n\nIk ben wel bereikbaar via telefoon en e-mail als er iets is.\n\nBedankt!\nFatima`,
    questions: [
      { q: "Waarom kan Fatima morgen niet werken?", opts: ["Ze is ziek", "Ze heeft een afspraak bij de dokter", "Haar dochter is ziek", "Ze heeft vakantie"], a: 2, exp: "Fatima schrijft: 'Mijn dochter is ziek en ik moet thuis blijven.'", expPt: "Fatima escreve: 'Minha filha esta doente e eu preciso ficar em casa.'" },
      { q: "Wat moet een collega doen tijdens de vergadering om 10 uur?", opts: ["Een presentatie geven", "De notulen schrijven", "De vergadering annuleren", "Meneer Visser bellen"], a: 1, exp: "Fatima vraagt: 'kan iemand de notulen schrijven?'", expPt: "Fatima pergunta: 'alguem pode escrever a ata?'" },
      { q: "Hoe is Fatima bereikbaar terwijl ze thuis is?", opts: ["Alleen via WhatsApp", "Via telefoon en e-mail", "Ze is niet bereikbaar", "Alleen via e-mail"], a: 1, exp: "Fatima schrijft: 'Ik ben bereikbaar via telefoon en e-mail.'", expPt: "Fatima escreve: 'Estou disponivel por telefone e email.'" },
    ]
  },
  {
    id: 6, cat: "Aankondiging", label: "Aankondiging", title: "Aankondiging school",
    text: `BASISSCHOOL DE REGENBOOG\n\nBeste ouders en verzorgers,\n\nVOORJAARSVAKANTIE\nMaandag 20 februari t/m vrijdag 24 februari\nDe school is gesloten. De naschoolse opvang is ook gesloten.\n\nINFOAVOND\nDonderdag 2 maart, 19:30 uur\nInformatieavond over de nieuwe lesmethode.\nLocatie: Aula van de school.\nAanmelden is niet nodig.\n\nSCHOOLREISJE\nVrijdag 17 maart: groepen 5, 6 en 7 gaan naar Artis.\nKosten: 12,50 euro per kind.\n\nMet vriendelijke groet,\nHet team van De Regenboog`,
    questions: [
      { q: "Wanneer is de voorjaarsvakantie?", opts: ["1 t/m 5 maart", "20 t/m 24 februari", "17 t/m 21 maart", "6 t/m 10 februari"], a: 1, exp: "In de aankondiging staat: 'Maandag 20 februari t/m vrijdag 24 februari'.", expPt: "No comunicado diz: 'Segunda 20 de fevereiro ate sexta 24 de fevereiro'." },
      { q: "Hoeft u zich aan te melden voor de infoavond?", opts: ["Ja, via e-mail", "Ja, via telefoon", "Nee, aanmelden is niet nodig", "Ja, voor 25 februari"], a: 2, exp: "In de aankondiging staat: 'Aanmelden is niet nodig.'", expPt: "No comunicado diz: 'Nao e necessario se inscrever.'" },
      { q: "Welke groepen gaan op schoolreisje?", opts: ["Alle groepen", "Groepen 1, 2 en 3", "Groepen 5, 6 en 7", "Alleen groep 7"], a: 2, exp: "In de aankondiging staat: 'de groepen 5, 6 en 7 gaan op schoolreisje naar Artis'.", expPt: "No comunicado diz: 'os grupos 5, 6 e 7 vao numa excursao ao Artis'." },
    ]
  },
  {
    id: 7, cat: "Formulier", label: "Formulier", title: "Aanvraag huurtoeslag",
    text: `BELASTINGDIENST - TOESLAGEN\nAanvraag Huurtoeslag 2024\n\nHuurtoeslag is een bijdrage van de overheid voor mensen die huren en een laag inkomen hebben.\n\nHeeft u recht op huurtoeslag?\nU heeft mogelijk recht als:\n- U 18 jaar of ouder bent\n- U een huurwoning heeft\n- Uw huur niet hoger is dan 808 euro per maand\n- Uw inkomen niet te hoog is\n\nHoe vraagt u huurtoeslag aan?\n1. Log in op Mijn Toeslagen via belastingdienst.nl met uw DigiD\n2. Klik op "Nieuwe toeslag aanvragen"\n3. Vul het formulier in en stuur het op\n\nWanneer ontvangt u huurtoeslag?\nU ontvangt de huurtoeslag elke maand op uw bankrekening.\nDe eerste betaling is ongeveer 6 weken na uw aanvraag.`,
    questions: [
      { q: "Voor wie is huurtoeslag bedoeld?", opts: ["Voor mensen die een huis kopen", "Voor mensen die huren en een laag inkomen hebben", "Voor alle studenten", "Alleen voor mensen ouder dan 65"], a: 1, exp: "Huurtoeslag is voor mensen die huren en een laag inkomen hebben.", expPt: "O subsidio de aluguel e para pessoas que alugam e tem baixa renda." },
      { q: "Wat heeft u nodig om huurtoeslag aan te vragen?", opts: ["Alleen uw paspoort", "Een DigiD en een huurwoning", "Een bankrekening en een auto", "Een brief van uw baas"], a: 1, exp: "U moet inloggen op Mijn Toeslagen met uw DigiD.", expPt: "Voce precisa fazer login no Mijn Toeslagen com seu DigiD." },
      { q: "Wanneer ontvangt u de eerste betaling?", opts: ["Direct na aanvraag", "Na 1 week", "Na ongeveer 6 weken", "Na 3 maanden"], a: 2, exp: "In het formulier staat: 'De eerste betaling is ongeveer 6 weken na uw aanvraag.'", expPt: "No formulario diz: 'O primeiro pagamento e aproximadamente 6 semanas apos o seu pedido.'" },
    ]
  },
  {
    id: 8, cat: "Advertentie", label: "Advertentie", title: "Supermarkt aanbieding",
    text: `SUPERMARKT DIRK\nWEEKAANBIEDING - geldig van maandag 6 t/m zondag 12 maart\n\nHalfvolle melk 1 liter: 0,89 euro (was 1,19)\nAppels 1 kg: 1,49 euro (was 2,29)\nKipfilet 500 gram: 3,99 euro (was 5,49)\nVolkoren brood: 1,69 euro (was 2,15)\n\nEXTRA AANBIEDING:\nKoop 2 pakken koffie, betaal voor 1!\nKoffie Douwe Egberts 250 gram - normaal 4,99 euro per pak\n\nOpeningstijden:\nMa-za: 8:00 - 21:00 uur\nZondag: 10:00 - 18:00 uur\n\nGratis parkeren voor klanten (max. 2 uur)`,
    questions: [
      { q: "Hoe lang is de weekaanbieding geldig?", opts: ["Alleen op maandag", "Van maandag tot en met zondag", "Alleen in het weekend", "De hele maand maart"], a: 1, exp: "De aanbieding is geldig 'van maandag 6 t/m zondag 12 maart'.", expPt: "A oferta e valida 'de segunda 6 ate domingo 12 de marco'." },
      { q: "Wat is de actie voor koffie?", opts: ["50% korting", "Koop 2 pakken, betaal voor 1", "Gratis koffie bij aankoop van 20 euro", "Koffie voor 1,99 euro"], a: 1, exp: "De actie is: 'Koop 2 pakken koffie, betaal voor 1!'", expPt: "A promocao e: 'Compre 2 pacotes de cafe, pague 1!'" },
      { q: "Hoe laat sluit de supermarkt op zondag?", opts: ["21:00 uur", "20:00 uur", "18:00 uur", "19:00 uur"], a: 2, exp: "Op zondag sluit de supermarkt om 18:00 uur.", expPt: "No domingo o supermercado fecha as 18:00." },
    ]
  },
  {
    id: 9, cat: "Bericht", label: "Bericht", title: "E-mail van de verhuurder",
    text: `Van: Wonen Utrecht B.V.\nAan: Huurders Zonnebloemstraat 8-24\nOnderwerp: Onderhoud verwarmingsinstallatie\n\nGeachte huurder,\n\nOp donderdag 9 maart komen onze monteurs de verwarmingsinstallatie controleren.\n\nUw afspraak is:\nDonderdag 9 maart tussen 13:00 en 17:00 uur\n\nWij vragen u thuis te zijn tijdens dit tijdvak.\nDe monteurs hebben toegang nodig tot de meterkast en de cv-ketel.\n\nAls u niet thuis kunt zijn, vraag dan een buurman of buurvrouw om de deur open te doen, of neem contact met ons op:\nTelefoon: 030-789 0123\n\nMet vriendelijke groet,\nWonen Utrecht B.V.`,
    questions: [
      { q: "Waarom sturen de verhuurder dit bericht?", opts: ["Om de huur te verhogen", "Om een nieuwe huurder voor te stellen", "Om te vertellen dat er onderhoud aan de verwarming komt", "Om een klacht te bespreken"], a: 2, exp: "De verhuurder informeert over onderhoud aan de verwarmingsinstallatie.", expPt: "O locador informa sobre a manutencao do sistema de aquecimento." },
      { q: "Tussen welke tijden moet u thuis zijn?", opts: ["9:00 en 13:00 uur", "13:00 en 17:00 uur", "10:00 en 14:00 uur", "8:00 en 12:00 uur"], a: 1, exp: "In het bericht staat: 'tussen 13:00 en 17:00 uur'.", expPt: "Na mensagem diz: 'entre 13:00 e 17:00 horas'." },
      { q: "Wat moet u doen als u niet thuis kunt zijn?", opts: ["De afspraak annuleren", "Een buurman vragen of een nieuwe afspraak maken", "De sleutel onder de mat leggen", "Niets doen"], a: 1, exp: "U kunt een buurman vragen of contact opnemen voor een andere afspraak.", expPt: "Voce pode pedir a um vizinho ou entrar em contato para marcar outro horario." },
    ]
  },
  {
    id: 10, cat: "Aankondiging", label: "Aankondiging", title: "Buurtbijeenkomst",
    text: `UITNODIGING BUURTBIJEENKOMST\n\nBeste buren,\n\nDe buurtvereniging Oud-West nodigt u uit voor onze jaarlijkse buurtbijeenkomst.\n\nWanneer: Woensdag 15 maart, 20:00 uur\nWaar: Buurtcentrum De Kern, Palmstraat 12\n\nOp het programma:\n- Plannen voor de nieuwe speeltuin\n- Problemen met parkeren in de buurt\n- Vragen en opmerkingen van bewoners\n- Drankje en hapje na afloop\n\nU hoeft zich niet aan te melden. Iedereen is welkom!\n\nHeeft u een agendapunt? Stuur een e-mail naar buurtOudwest@gmail.com voor 10 maart.\n\nTot ziens!\nBuurtvereniging Oud-West`,
    questions: [
      { q: "Moet u zich aanmelden voor de bijeenkomst?", opts: ["Ja, voor 10 maart", "Ja, via e-mail", "Nee, iedereen is welkom", "Ja, per telefoon"], a: 2, exp: "In de uitnodiging staat: 'U hoeft zich niet aan te melden. Iedereen is welkom!'", expPt: "No convite diz: 'Voce nao precisa se inscrever. Todos sao bem-vindos!'" },
      { q: "Wat staat er op het programma?", opts: ["Een feest", "Plannen voor de speeltuin en parkeerproblematiek", "Alleen vragen van bewoners", "Een film kijken"], a: 1, exp: "Op het programma staan plannen voor de speeltuin en problemen met parkeren.", expPt: "No programa estao planos para o parquinho e problemas de estacionamento." },
      { q: "Wat moet u doen als u een agendapunt wilt toevoegen?", opts: ["Dat kan niet", "Op de bijeenkomst zelf vragen", "Voor 10 maart een e-mail sturen", "De voorzitter bellen"], a: 2, exp: "U kunt een e-mail sturen naar buurtOudwest@gmail.com voor 10 maart.", expPt: "Voce pode enviar um email para buurtOudwest@gmail.com antes de 10 de marco." },
    ]
  },
];


function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getToday() {
  return new Date().toISOString().split("T")[0];
}

function calcNextInterval(interval, correct) {
  if (correct) return Math.min(interval <= 1 ? 2 : interval * 2, 30);
  return 1;
}

function getDueIds(cards) {
  const today = getToday();
  return Object.entries(cards)
    .filter(([, c]) => c.nextReview <= today)
    .sort((a, b) => a[1].nextReview.localeCompare(b[1].nextReview))
    .map(([id]) => parseInt(id));
}

function getYesterday() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}

// ─── VERB CONJUGATIONS ────────────────────────────────────────────────────────

const VERBOS = [
  { inf: "zijn", pt: "ser / estar",
    forms: [["ik","ben"],["jij je","bent"],["hij zij ze het","is"],["wij we","zijn"],["jullie","zijn"],["zij ze","zijn"]],
    ex: "Aaron is dokter. / Ik ben blij." },
  { inf: "hebben", pt: "ter",
    forms: [["ik","heb"],["jij je","hebt"],["hij zij ze het","heeft"],["wij we","hebben"],["jullie","hebben"],["zij ze","hebben"]],
    ex: "Ze heeft pijn aan haar rug." },
  { inf: "gaan", pt: "ir",
    forms: [["ik","ga"],["jij je","gaat"],["hij zij ze het","gaat"],["wij we","gaan"],["jullie","gaan"],["zij ze","gaan"]],
    ex: "Hij gaat naar het werk." },
  { inf: "werken", pt: "trabalhar",
    forms: [["ik","werk"],["jij je","werkt"],["hij zij ze het","werkt"],["wij we","werken"],["jullie","werken"],["zij ze","werken"]],
    ex: "Ali werkt in een fabriek." },
  { inf: "wonen", pt: "morar",
    forms: [["ik","woon"],["jij je","woont"],["hij zij ze het","woont"],["wij we","wonen"],["jullie","wonen"],["zij ze","wonen"]],
    ex: "Ik woon in Amsterdam." },
  { inf: "kopen", pt: "comprar",
    forms: [["ik","koop"],["jij je","koopt"],["hij zij ze het","koopt"],["wij we","kopen"],["jullie","kopen"],["zij ze","kopen"]],
    ex: "Chen verkoopt bloemen op de markt." },
  { inf: "eten", pt: "comer",
    forms: [["ik","eet"],["jij je","eet"],["hij zij ze het","eet"],["wij we","eten"],["jullie","eten"],["zij ze","eten"]],
    ex: "Carmen eet elke dag een banaan." },
  { inf: "drinken", pt: "beber",
    forms: [["ik","drink"],["jij je","drinkt"],["hij zij ze het","drinkt"],["wij we","drinken"],["jullie","drinken"],["zij ze","drinken"]],
    ex: "Christo drinkt een glas water." },
  { inf: "leren", pt: "aprender",
    forms: [["ik","leer"],["jij je","leert"],["hij zij ze het","leert"],["wij we","leren"],["jullie","leren"],["zij ze","leren"]],
    ex: "Claire leert Nederlands." },
  { inf: "vinden", pt: "achar / encontrar",
    forms: [["ik","vind"],["jij je","vindt"],["hij zij ze het","vindt"],["wij we","vinden"],["jullie","vinden"],["zij ze","vinden"]],
    ex: "Ik vind Nederland mooi." },
  { inf: "willen", pt: "querer",
    forms: [["ik","wil"],["jij je","wilt"],["hij zij ze het","wil"],["wij we","willen"],["jullie","willen"],["zij ze","willen"]],
    ex: "Ali wil ander werk." },
  { inf: "kunnen", pt: "poder / conseguir",
    forms: [["ik","kan"],["jij je","kunt kan"],["hij zij ze het","kan"],["wij we","kunnen"],["jullie","kunnen"],["zij ze","kunnen"]],
    ex: "Dafne kan goed zingen." },
  { inf: "moeten", pt: "precisar / dever",
    forms: [["ik","moet"],["jij je","moet"],["hij zij ze het","moet"],["wij we","moeten"],["jullie","moeten"],["zij ze","moeten"]],
    ex: "Leon moet medicijnen nemen." },
  { inf: "maken", pt: "fazer / criar",
    forms: [["ik","maak"],["jij je","maakt"],["hij zij ze het","maakt"],["wij we","maken"],["jullie","maken"],["zij ze","maken"]],
    ex: "Adam maakt soep." },
  { inf: "koken", pt: "cozinhar",
    forms: [["ik","kook"],["jij je","kookt"],["hij zij ze het","kookt"],["wij we","koken"],["jullie","koken"],["zij ze","koken"]],
    ex: "Diego kookt graag voor zijn familie." },
  { inf: "rijden", pt: "dirigir / andar de",
    forms: [["ik","rijd"],["jij je","rijdt"],["hij zij ze het","rijdt"],["wij we","rijden"],["jullie","rijden"],["zij ze","rijden"]],
    ex: "Kwasi rijdt elke dag door de stad." },
  { inf: "komen", pt: "vir / chegar",
    forms: [["ik","kom"],["jij je","komt"],["hij zij ze het","komt"],["wij we","komen"],["jullie","komen"],["zij ze","komen"]],
    ex: "De bus komt laat." },
  { inf: "spreken", pt: "falar",
    forms: [["ik","spreek"],["jij je","spreekt"],["hij zij ze het","spreekt"],["wij we","spreken"],["jullie","spreken"],["zij ze","spreken"]],
    ex: "Ik spreek Nederlands en Portugees." },
  { inf: "lopen", pt: "caminhar / andar a pé",
    forms: [["ik","loop"],["jij je","loopt"],["hij zij ze het","loopt"],["wij we","lopen"],["jullie","lopen"],["zij ze","lopen"]],
    ex: "Aziz loopt elke dag naar zijn werk." },
  { inf: "kijken", pt: "olhar / assistir",
    forms: [["ik","kijk"],["jij je","kijkt"],["hij zij ze het","kijkt"],["wij we","kijken"],["jullie","kijken"],["zij ze","kijken"]],
    ex: "Karin kijkt elke avond naar het journaal." },
  { inf: "houden van", pt: "gostar de / amar",
    forms: [["ik","houd van"],["jij je","houdt van"],["hij zij ze het","houdt van"],["wij we","houden van"],["jullie","houden van"],["zij ze","houden van"]],
    ex: "John houdt van paarden." },
  { inf: "zoeken", pt: "procurar / buscar",
    forms: [["ik","zoek"],["jij je","zoekt"],["hij zij ze het","zoekt"],["wij we","zoeken"],["jullie","zoeken"],["zij ze","zoeken"]],
    ex: "Kenny zoekt op internet." },
  { inf: "nemen", pt: "pegar / tomar",
    forms: [["ik","neem"],["jij je","neemt"],["hij zij ze het","neemt"],["wij we","nemen"],["jullie","nemen"],["zij ze","nemen"]],
    ex: "Masha neemt de bus naar haar werk." },
  { inf: "helpen", pt: "ajudar",
    forms: [["ik","help"],["jij je","helpt"],["hij zij ze het","helpt"],["wij we","helpen"],["jullie","helpen"],["zij ze","helpen"]],
    ex: "Mijn lerares helpt mij." },
  { inf: "brengen", pt: "levar / trazer",
    forms: [["ik","breng"],["jij je","brengt"],["hij zij ze het","brengt"],["wij we","brengen"],["jullie","brengen"],["zij ze","brengen"]],
    ex: "Ahmed brengt zijn zoon naar het vliegveld." },
];

// ─── PROGRESS ENGINE ──────────────────────────────────────────────────────────

const DEFAULT_PROGRESS = {
  onboardingDone: false,
  cards: {},
  examDate: null,
  customDailyGoal: null, // null = auto-calculate from exam date or use default 10
  praticaDate: null, // date when pratica do dia was last completed
  streak: 0,
  lastStudyDate: null,
  todayStudied: 0,
  todayDate: null,
};

function encodeProgress(prog) {
  const compact = {
    e: prog.examDate,
    s: prog.streak,
    ls: prog.lastStudyDate,
    ts: prog.todayStudied,
    td: prog.todayDate,
    c: Object.fromEntries(
      Object.entries(prog.cards).map(([id, c]) => [id, [c.interval, c.nextReview, c.correct, c.total]])
    ),
  };
  return btoa(unescape(encodeURIComponent(JSON.stringify(compact))));
}

function decodeProgress(code) {
  const raw = JSON.parse(decodeURIComponent(escape(atob(code.trim()))));
  // Legacy format support
  if (raw.k !== undefined) {
    const prog = { ...DEFAULT_PROGRESS };
    (raw.k || []).forEach(id => {
      prog.cards[id] = { interval: 16, nextReview: "2099-01-01", correct: 3, total: 3 };
    });
    (raw.p || []).forEach(id => {
      prog.cards[id] = { interval: 1, nextReview: getToday(), correct: 0, total: 1 };
    });
    return prog;
  }
  const prog = {
    examDate: raw.e || null,
    streak: raw.s || 0,
    lastStudyDate: raw.ls || null,
    todayStudied: raw.ts || 0,
    todayDate: raw.td || null,
    cards: {},
  };
  Object.entries(raw.c || {}).forEach(([id, c]) => {
    prog.cards[id] = { interval: c[0], nextReview: c[1], correct: c[2], total: c[3] };
  });
  return prog;
}

function applyResult(progress, cardId, correct) {
  const today = getToday();
  const prev = progress.cards[cardId] || { interval: 1, nextReview: today, correct: 0, total: 0 };
  const newInterval = calcNextInterval(prev.interval, correct);
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + newInterval);

  const isNewDay = progress.todayDate !== today;
  const newStreak = isNewDay
    ? (progress.lastStudyDate === getYesterday() ? progress.streak + 1 : 1)
    : progress.streak;

  return {
    ...progress,
    streak: newStreak,
    lastStudyDate: today,
    todayDate: today,
    todayStudied: isNewDay ? 1 : progress.todayStudied + 1,
    cards: {
      ...progress.cards,
      [cardId]: {
        interval: newInterval,
        nextReview: nextDate.toISOString().split("T")[0],
        correct: prev.correct + (correct ? 1 : 0),
        total: prev.total + 1,
      },
    },
  };
}

function getStats(progress) {
  const all = Object.values(progress.cards);
  const dominated = all.filter(c => c.interval >= 8).length;
  const learning = all.filter(c => c.interval < 8).length;
  const unseen = 492 - all.length;
  const due = getDueIds(progress.cards).length;
  const today = getToday();
  const todayStudied = progress.todayDate === today ? progress.todayStudied : 0;
  let daysLeft = null;
  if (progress.examDate) {
    daysLeft = Math.max(0, Math.floor((new Date(progress.examDate) - new Date()) / 86400000));
  }
  const dailyGoal = daysLeft != null
    ? Math.min(30, Math.max(10, Math.ceil((unseen + learning) / Math.max(1, daysLeft))))
    : progress.customDailyGoal ?? null; // null = no goal set
  return { dominated, learning, unseen, due, todayStudied, daysLeft, dailyGoal };
}

// ─── AUDIO (Web Speech API) ───────────────────────────────────────────────────

// ─── AUDIO ABSTRACTION LAYER ──────────────────────────────────────────────────
//
// FASE ATUAL (web): usa Web Speech API do dispositivo
// FASE APP (React Native): trocar playAudio() para usar Sound.play(`card_${id}.mp3`)
//
// Para gerar os áudios pré-gravados, rodar o script:
//   node generate-audio.js  →  gera 492 arquivos card_001.mp3 ... card_492.mp3
// via Google Cloud TTS (nl-NL-Neural2-A) ou Azure (nl-NL-ColetteNeural)
// Custo: ~$0 (tier gratuito cobre as 492 frases para sempre)
//
// ─────────────────────────────────────────────────────────────────────────────

// URL base para áudios pré-gravados (quando existirem)
// const AUDIO_BASE_URL = "https://sua-url.com/audio/";

// Tenta tocar arquivo pré-gravado; se não existir, cai para TTS
function playDutchAudio(text, cardId, rate, onEnd) {
  // FASE APP: substituir por:
  //   const sound = new Sound(`card_${String(cardId).padStart(3,'0')}.mp3`, Sound.MAIN_BUNDLE);
  //   sound.play(onEnd);
  //   return;

  // FASE ATUAL: Web Speech API
  if (!window.speechSynthesis) { onEnd?.(); return; }
  window.speechSynthesis.cancel();
  const clean = text.includes("...") ? text.split("...")[0].trim() : text;
  withVoices(() => {
    const utt = makeDutchUtt(clean, rate ?? 0.75);
    if (onEnd) utt.onend = onEnd;
    window.speechSynthesis.speak(utt);
  });
}

// User-selected voice name (persisted in localStorage)
let selectedVoiceName = (() => { try { return localStorage.getItem("nt2_voice") || ""; } catch { return ""; } })();

// Pick voice: use selected if set, otherwise auto-pick best Dutch voice
function getDutchVoice() {
  const voices = window.speechSynthesis.getVoices();
  if (selectedVoiceName) {
    const v = voices.find(v => v.name === selectedVoiceName);
    if (v) return v;
  }
  const preferredNames = ["Ellen", "Xander", "Fenna", "Google Nederlands"];
  for (const name of preferredNames) {
    const v = voices.find(v => v.name.includes(name));
    if (v) return v;
  }
  return voices.find(v => v.lang.startsWith("nl")) || null;
}

function getAllDutchVoices() {
  return window.speechSynthesis.getVoices().filter(v => v.lang.startsWith("nl"));
}

function withVoices(callback) {
  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    callback();
  } else {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.onvoiceschanged = null;
      callback();
    };
    window.speechSynthesis.getVoices();
    setTimeout(() => {
      if (window.speechSynthesis.getVoices().length > 0) callback();
    }, 300);
  }
}

function makeDutchUtt(text, rate = 0.42) {
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = "nl-NL";
  utt.rate = rate;
  utt.pitch = 1;
  const voice = getDutchVoice();
  if (voice) utt.voice = voice;
  return utt;
}

// Para flashcards / escuta — velocidade conversacional
function speakDutch(text, cardId) {
  playDutchAudio(text, cardId, 0.75, null);
}

// Speak one conjugation row
function speakRow(pronoun, form) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  withVoices(() => window.speechSynthesis.speak(makeDutchUtt(pronoun + " " + form, 0.42)));
}

// Speak all conjugation rows with a pause between each
function speakAllRows(forms) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  withVoices(() => {
    forms.forEach(([pronoun, form], i) => {
      if (i > 0) {
        const pause = new SpeechSynthesisUtterance("  ");
        pause.lang = "nl-NL";
        pause.rate = 0.1;
        window.speechSynthesis.speak(pause);
      }
      window.speechSynthesis.speak(makeDutchUtt(pronoun + " " + form, 0.42));
    });
  });
}

// ─── CARD BUILDER ─────────────────────────────────────────────────────────────

function buildAllCards() {
  const vq = VRAAG_ANTWOORD.map((t, i) => ({ id: i, type: "vraag", text: t }));
  const aa = AANVULZINNEN.map((t, i) => ({ id: i + 60, type: "aanvul", text: t }));
  return [...vq, ...aa];
}

const ALL_CARDS = buildAllCards();

function getCardById(id) {
  return ALL_CARDS.find(c => c.id === id);
}

// ─── SAVE MODAL ──────────────────────────────────────────────────────────────
function SaveModal({ show, onClose, exportCode, importCode, setImportCode, importError, onImport, confirmReset, setConfirmReset, onReset }) {
  if (!show) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 300, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div style={{ background: C.white, borderRadius: `${R.xl}px ${R.xl}px 0 0`, padding: "28px 24px 40px", width: "100%", maxWidth: 640, boxShadow: shadow.lg, maxHeight: "85vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 17, fontWeight: 700 }}>Progresso</div>
          <button onClick={onClose} style={{ background: C.bg, border: "none", borderRadius: R.full, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <Icon d={Icons.close} size={20} stroke={C.dark} />
          </button>
        </div>
        <div style={{ background: C.greenLight, borderRadius: R.md, padding: "12px 16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
          <Icon d={Icons.check} size={18} stroke={C.green} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.green }}>Salvo automaticamente</div>
            <div style={{ fontSize: 12, color: C.mid }}>Progresso salvo a cada carta.</div>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${C.light}`, paddingTop: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.mid, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Backup para outro dispositivo</div>
          <textarea readOnly value={exportCode} style={{ width: "100%", height: 64, fontFamily: "monospace", fontSize: 11, padding: 12, border: `1.5px solid ${C.light}`, borderRadius: R.md, background: C.bg, resize: "none", boxSizing: "border-box" }} />
          <Btn onClick={() => navigator.clipboard?.writeText(exportCode)} variant="secondary" icon={Icons.copy} style={{ marginTop: 8, width: "100%" }}>Copiar código</Btn>
        </div>
        <div style={{ borderTop: `1px solid ${C.light}`, paddingTop: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: C.mid, marginBottom: 8 }}>Restaurar de outro dispositivo:</div>
          <textarea value={importCode} onChange={e => setImportCode(e.target.value)} placeholder="Cole o código aqui..." style={{ width: "100%", height: 64, fontFamily: "monospace", fontSize: 11, padding: 12, border: `1.5px solid ${C.light}`, borderRadius: R.md, background: "#fff", resize: "none", boxSizing: "border-box" }} />
          {importError && <div style={{ color: C.coral, fontSize: 12, marginTop: 6 }}>{importError}</div>}
          <Btn onClick={onImport} style={{ marginTop: 10, width: "100%" }}>Carregar progresso</Btn>
        </div>
        <div style={{ borderTop: `1px solid ${C.light}`, paddingTop: 16 }}>
          {!confirmReset ? (
            <button onClick={() => setConfirmReset(true)} style={{ width: "100%", background: "none", border: `1.5px solid ${C.light}`, borderRadius: R.full, padding: "13px", cursor: "pointer", fontSize: 14, fontWeight: 600, color: C.mid, fontFamily: font }}>
              🗑 Apagar tudo e começar do zero
            </button>
          ) : (
            <div style={{ background: "#FFF0F3", borderRadius: R.md, padding: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.coral, marginBottom: 4 }}>Tem certeza?</div>
              <div style={{ fontSize: 13, color: C.mid, marginBottom: 12 }}>Todo o progresso será apagado permanentemente.</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <button onClick={() => setConfirmReset(false)} style={{ background: C.white, border: `1.5px solid ${C.light}`, borderRadius: R.full, padding: "11px", cursor: "pointer", fontSize: 14, fontFamily: font, color: C.dark, fontWeight: 600 }}>Cancelar</button>
                <button onClick={onReset} style={{ background: C.coral, border: "none", borderRadius: R.full, padding: "11px", cursor: "pointer", fontSize: 14, fontFamily: font, color: "#fff", fontWeight: 600 }}>Apagar tudo</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────


// ─── SVG ICONS ────────────────────────────────────────────────────────────────

const Icon = ({ d, size = 20, stroke = "currentColor", fill = "none", strokeWidth = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((path, i) => <path key={i} d={path} />) : <path d={d} />}
  </svg>
);

const Icons = {
  back: "M19 12H5M5 12l7-7M5 12l7 7",
  save: "M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2zM17 21v-8H7v8M7 3v5h8",
  cards: ["M2 17l10 5 10-5", "M2 12l10 5 10-5", "M12 2L2 7l10 5 10-5-10-5z"],
  headphones: "M3 18v-6a9 9 0 0118 0v6M3 18a3 3 0 003 3h1a3 3 0 003-3v-2a3 3 0 00-3-3H3v5zM21 18a3 3 0 01-3 3h-1a3 3 0 01-3-3v-2a3 3 0 013-3h4v5z",
  brain: ["M9.5 2A2.5 2.5 0 017 4.5v0A2.5 2.5 0 019.5 7h5A2.5 2.5 0 0117 4.5v0A2.5 2.5 0 0114.5 2h-5z", "M12 7v10M8 9.5C5.5 9.5 4 11 4 13s1.5 3.5 4 3.5M16 9.5c2.5 0 4 1.5 4 3.5s-1.5 3.5-4 3.5M8 17c0 1.5 1.5 3 4 3s4-1.5 4-3"],
  pencil: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  speaker: ["M11 5L6 9H2v6h4l5 4V5z", "M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"],
  calendar: ["M3 9h18", "M8 2v3M16 2v3M3 7a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"],
  check: "M20 6L9 17l-5-5",
  close: "M18 6L6 18M6 6l12 12",
  settings: ["M12 15a3 3 0 100-6 3 3 0 000 6z", "M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"],
  trophy: ["M6 9H3l1 7h16l1-7h-3", "M6 9V5h12v4", "M12 16v4", "M8 20h8"],
  target: ["M12 22a10 10 0 100-20 10 10 0 000 20z", "M12 18a6 6 0 100-12 6 6 0 000 12z", "M12 14a2 2 0 100-4 2 2 0 000 4z"],
  flag: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7",
  arrowRight: "M5 12h14M12 5l7 7-7 7",
  arrowLeft: "M19 12H5M12 19l-7-7 7-7",
  home: ["M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z", "M9 22V12h6v10"],
  repeat: ["M17 1l4 4-4 4", "M3 11V9a4 4 0 014-4h14", "M7 23l-4-4 4-4", "M21 13v2a4 4 0 01-4 4H3"],
  play: "M5 3l14 9-14 9V3z",
  copy: ["M20 9H11a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-9a2 2 0 00-2-2z", "M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"],
  eye: ["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z", "M12 9a3 3 0 100 6 3 3 0 000-6z"],
  eyeOff: ["M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94", "M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19", "M1 1l22 22"],
  book: ["M4 19.5A2.5 2.5 0 016.5 17H20", "M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"],
  messageAlert: ["M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z", "M12 8v4", "M12 16h.01"],
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  flame: ["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z", "M12 8c0 2.5-2 4-2 6s.895 3 2 3 2-1 2-3-2-3.5-2-6z"],
  sparkles: ["M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z", "M5 3l.75 2.25L8 6l-2.25.75L5 9l-.75-2.25L2 6l2.25-.75L5 3z", "M19 13l.75 2.25L22 16l-2.25.75L19 19l-.75-2.25L16 16l2.25-.75L19 13z"],
  globe: ["M12 22a10 10 0 100-20 10 10 0 000 20z", "M2 12h20", "M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"],
  partyPopper: ["M5.8 11.3L2 22l10.7-3.79", "M4 3h.01M22 8h.01M15 2h.01M22 20h.01M22 2l-7.38 7.38M10.68 13.31a16 16 0 003.37 6.2 20.06 20.06 0 006.2-6.2 20.06 20.06 0 00-6.2-3.37 16 16 0 00-3.37 3.37z"],
};

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const C = {
  bg: "#F7F7F7", white: "#FFFFFF", coral: "#FF385C", coralLight: "#FFF0F3",
  dark: "#222222", mid: "#717171", light: "#DDDDDD",
  blue: "#0066FF", blueLight: "#EFF4FF",
  green: "#008A05", greenLight: "#EDFAEE",
  gold: "#C47B00", goldLight: "#FFF8E7",
};
const font = "'Plus Jakarta Sans', 'Helvetica Neue', Arial, sans-serif";
const R = { sm: 8, md: 12, lg: 16, xl: 24, full: 999 };
const shadow = { card: "0 2px 16px rgba(0,0,0,0.08)", sm: "0 1px 4px rgba(0,0,0,0.06)", lg: "0 8px 32px rgba(0,0,0,0.12)" };

const Page = ({ children, noPad, noNav }) => (
  <div style={{ minHeight: "100vh", background: C.bg, fontFamily: font, color: C.dark, display: "flex", flexDirection: "column", alignItems: "center", padding: noPad ? 0 : `0 16px ${noNav ? 40 : 100}px` }}>
    {children}
  </div>
);
const Wrap = ({ children, style }) => (
  <div style={{ width: "100%", maxWidth: 640, ...style }}>{children}</div>
);
const Btn = ({ children, onClick, variant = "primary", disabled, style, icon }) => {
  const styles = {
    primary: { background: C.coral, color: "#fff", border: "none" },
    secondary: { background: C.white, color: C.dark, border: `1.5px solid ${C.light}` },
    ghost: { background: "transparent", color: C.mid, border: "none" },
    outline: { background: "transparent", color: C.coral, border: `1.5px solid ${C.coral}` },
    dark: { background: C.dark, color: "#fff", border: "none" },
    green: { background: C.green, color: "#fff", border: "none" },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{
      ...styles[variant], padding: "14px 20px", borderRadius: R.full,
      cursor: disabled ? "not-allowed" : "pointer", fontSize: 15, fontWeight: 600, fontFamily: font,
      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      opacity: disabled ? 0.4 : 1, transition: "opacity 0.2s",
      boxShadow: variant === "primary" ? "0 2px 8px rgba(255,56,92,0.3)" : "none",
      ...style,
    }}>
      {icon && <Icon d={icon} size={18} stroke="currentColor" />}
      {children}
    </button>
  );
};
const CardBox = ({ children, style, onClick }) => (
  <div onClick={onClick} style={{ background: C.white, borderRadius: R.lg, boxShadow: shadow.card, padding: "20px", ...style }}>
    {children}
  </div>
);
const AppHeader = ({ title, onBack, subtitle, right, onSave }) => (
  <Wrap style={{ padding: "20px 0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      {onBack && (
        <button onClick={onBack} style={{ background: C.white, border: "none", borderRadius: R.full, width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: shadow.sm }}>
          <Icon d={Icons.back} size={18} stroke={C.dark} />
        </button>
      )}
      <div>
        {subtitle && <div style={{ fontSize: 11, color: C.mid, fontWeight: 500, marginBottom: 1 }}>{subtitle}</div>}
        <div style={{ fontSize: 20, fontWeight: 700, color: C.dark }}>{title}</div>
      </div>
    </div>
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      {right}
      <button onClick={onSave} style={{ background: C.white, border: "none", borderRadius: R.full, width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: shadow.sm }}>
        <Icon d={Icons.save} size={18} stroke={C.mid} />
      </button>
    </div>
  </Wrap>
);

const BottomNav = ({ tab, setTab }) => {
  const tabs = [
    { id: "home", label: "Home", icon: Icons.home },
    { id: "praticar", label: "Praticar", icon: Icons.cards },
    { id: "quiz", label: "Quiz", icon: Icons.target },
    { id: "config", label: "Config", icon: Icons.settings },
  ];
  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 200, background: C.white, borderTop: `1px solid ${C.light}`, display: "flex", paddingBottom: "env(safe-area-inset-bottom)" }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, background: "none", border: "none", padding: "10px 0 8px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, fontFamily: font }}>
          <div style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: R.md, background: tab === t.id ? C.coralLight : "transparent", transition: "background 0.2s" }}>
            <Icon d={t.icon} size={18} stroke={tab === t.id ? C.coral : C.mid} strokeWidth={tab === t.id ? 2.2 : 1.8} />
          </div>
          <span style={{ fontSize: 10, fontWeight: tab === t.id ? 700 : 400, color: tab === t.id ? C.coral : C.mid }}>{t.label}</span>
        </button>
      ))}
    </div>
  );
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

function NT2Simulator() {

  // inject font
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  // ── Tab navigation ──
  const [tab, setTab] = useState("home"); // home | praticar | quiz | config

  const handleTabChange = (newTab) => {
    setTab(newTab);
    // Map tabs to screens
    if (newTab === "home") setScreen("dashboard");
    else if (newTab === "praticar") setScreen("praticar");
    else if (newTab === "quiz") { setQuizQuestions([]); setQuizDone(false); setScreen("quiz"); }
    else if (newTab === "config") setScreen("setup");
  };

  // ── Screen ──
  const [screen, setScreen] = useState("setup");
  const [prevScreen, setPrevScreen] = useState(null);

  // ── Progress — load from localStorage on mount ──
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem("nt2_progress");
      if (saved) return decodeProgress(saved);
    } catch {}
    return DEFAULT_PROGRESS;
  });

  // Auto-save to localStorage on every progress change
  useEffect(() => {
    try {
      localStorage.setItem("nt2_progress", encodeProgress(progress));
    } catch {}
  }, [progress]);

  // ── Pratica do Dia ──
  const [praticaItems, setPraticaItems] = useState([]);
  const [praticaIdx, setPraticaIdx] = useState(0);
  const [praticaAnswered, setPraticaAnswered] = useState(false);
  const [praticaSelected, setPraticaSelected] = useState(null);
  const [praticaScore, setPraticaScore] = useState({ flashcard: [0,0], escuta: [0,0], quiz: [0,0], leitura: [0,0] });
  const [praticaDone, setPraticaDone] = useState(false);
  const [praticaAudioReady, setPraticaAudioReady] = useState(false);
  const [praticaSpeaking, setPraticaSpeaking] = useState(false);

  // ── Session (flashcards/escuta individual modes) ──
  const [sessionCards, setSessionCards] = useState([]);
  const [sessionIdx, setSessionIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [sessionScore, setSessionScore] = useState({ correct: 0, wrong: 0 });
  const [sessionDone, setSessionDone] = useState(false);

  // ── Swipe ──
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(null);
  const THRESHOLD = 90;

  // ── Escuta ──
  const [audioReady, setAudioReady] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  // ── Conjugação ──
  const [verbIdx, setVerbIdx] = useState(0);
  const [verbRevealed, setVerbRevealed] = useState([]);

  // ── Leitura ──
  const [leituraIdx, setLeituraIdx] = useState(0);
  const [leituraQIdx, setLeituraQIdx] = useState(0);
  const [leituraSelected, setLeituraSelected] = useState(null);
  const [leituraScore, setLeituraScore] = useState(0);
  const [leituaDone, setLeituraDone] = useState(false);
  const [leituraTextos, setLeituraTextos] = useState([]);

  // ── Quiz KNM ──
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizSelected, setQuizSelected] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [quizCat, setQuizCat] = useState("all");

  // ── Setup ──
  const [setupDay, setSetupDay] = useState("");
  const [setupMonth, setSetupMonth] = useState("");
  const [setupYear, setSetupYear] = useState("");
  const [setupError, setSetupError] = useState("");

  // ── Save/Load ──
  const [showSave, setShowSave] = useState(false);
  const [importCode, setImportCode] = useState("");
  const [importError, setImportError] = useState("");
  const [exportCode, setExportCode] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1); // 1=welcome, 2=date, goal=goal, 3=voice
  const [dailyGoalPick, setDailyGoalPick] = useState(10);
  const [availableVoices, setAvailableVoices] = useState([]);
  const [chosenVoice, setChosenVoice] = useState(selectedVoiceName);

  useEffect(() => {
    if (progress.onboardingDone) {
      setScreen("dashboard");
      setTab("home");
    } else {
      // TEMP: skip onboarding for testing
      setProgress(p => ({ ...p, onboardingDone: true }));
      setScreen("dashboard");
      setTab("home");
    }
  }, []);

  const stats = getStats(progress);
  const isReturning = !!progress.onboardingDone;

  // ── Design tokens (Airbnb-inspired) ──
  // design tokens moved to module scope — see below component

  const current = sessionCards[sessionIdx];
  const typeColor = current?.type === "vraag" ? C.blue : C.coral;
  const swipeRatio = Math.min(Math.abs(dragX) / THRESHOLD, 1);
  const isRight = dragX > 20;
  const isLeft = dragX < -20;

  // ── Navigation ──
  const goTo = (s) => { setPrevScreen(screen); setScreen(s); };
  const goBack = () => { const ps = prevScreen || "dashboard"; setPrevScreen(null); setScreen(ps); setTab(ps === "dashboard" ? "home" : ps === "praticar" ? "praticar" : "home"); };

  // ── Setup ──
  const handleSetup = () => {
    if (!setupDay || !setupMonth || !setupYear) { setSetupError("Selecione dia, mês e ano."); return; }
    const dateStr = `${setupYear}-${setupMonth}-${setupDay}`;
    if (new Date(dateStr) <= new Date()) { setSetupError("A data deve ser no futuro."); return; }
    setProgress(p => ({ ...p, examDate: dateStr }));
    // If first-time onboarding, go to voice step; if returning settings, go to dashboard
    if (isReturning) setScreen("dashboard");
    else setOnboardingStep(3);
  };

  // ── Session ──
  const startSession = (mode, cardIds) => {
    const cards = cardIds.map(id => getCardById(id)).filter(Boolean);
    setSessionCards(cards);
    setSessionIdx(0);
    setFlipped(false);
    setExplanation(null);
    setSessionScore({ correct: 0, wrong: 0 });
    setSessionDone(false);
    setAudioReady(false);
    setSpeaking(false);
    setPrevScreen("praticar");
    setScreen(mode);
  };

  const startFlashcards = (cat = "both") => {
    setPrevScreen(tab === "home" ? "dashboard" : "praticar");
    const goal = stats.dailyGoal;
    const todayDone = progress.todayDate === getToday() ? progress.todayStudied : 0;
    const sessionSize = goal != null ? Math.max(goal - todayDone > 0 ? goal - todayDone : goal, 10) : 20;
    let pool;
    if (cat === "vraag") pool = VRAAG_ANTWOORD.map((_, i) => i);
    else if (cat === "aanvul") pool = AANVULZINNEN.map((_, i) => i + 60);
    else pool = ALL_CARDS.map(c => c.id);
    startSession("flashcards", shuffle(pool).slice(0, sessionSize));
  };

  const startEscuta = () => {
    if (window.speechSynthesis) window.speechSynthesis.getVoices();
    const goal = stats.dailyGoal;
    const todayDone = progress.todayDate === getToday() ? progress.todayStudied : 0;
    const sessionSize = Math.max(goal != null ? (goal - todayDone > 0 ? goal - todayDone : goal) : 15, 8);
    const dueIds = getDueIds(progress.cards);
    const unseenIds = ALL_CARDS.filter(c => !progress.cards[c.id]).map(c => c.id);
    const pool = shuffle([...dueIds, ...unseenIds]).slice(0, sessionSize);
    startSession("escuta", pool.length > 0 ? pool : shuffle(ALL_CARDS.map(c => c.id)).slice(0, sessionSize));
  };

  const startRevisao = () => {
    const dueIds = getDueIds(progress.cards);
    if (dueIds.length === 0) return;
    startSession("revisao", dueIds.slice(0, Math.max(stats.dailyGoal ?? 20, 10)));
  };

  const startConjugacao = () => { setVerbIdx(0); setVerbRevealed([]); setPrevScreen("dashboard"); setScreen("conjugacao"); };

  const startPraticaDoDia = () => {
    const goal = stats.dailyGoal ?? 10;
    const total = Math.max(goal, 8);
    // Proportions: 40% flashcard, 20% escuta, 20% quiz, 20% leitura
    const nFlash = Math.round(total * 0.4);
    const nEscuta = Math.round(total * 0.2);
    const nQuiz = Math.round(total * 0.2);
    const nLeitura = total - nFlash - nEscuta - nQuiz;

    const items = [];

    // Flashcard items — prefer due cards, then unseen
    const dueIds = getDueIds(progress.cards);
    const unseenIds = ALL_CARDS.filter(c => !progress.cards[c.id]).map(c => c.id);
    const flashPool = shuffle([...dueIds, ...unseenIds]).slice(0, nFlash);
    flashPool.forEach(id => items.push({ type: "flashcard", card: getCardById(id) }));

    // Escuta items
    const escutaPool = shuffle([...dueIds, ...unseenIds]).slice(0, nEscuta);
    escutaPool.forEach(id => items.push({ type: "escuta", card: getCardById(id) }));

    // Quiz KNM items
    shuffle([...KNM_QUESTIONS]).slice(0, nQuiz).forEach(q => items.push({ type: "quiz", q }));

    // Leitura items — pick 1-2 texts, take questions from them
    const textos = shuffle([...LEITURA_TEXTOS]).slice(0, 2);
    let lCount = 0;
    for (const texto of textos) {
      for (const q of texto.questions) {
        if (lCount >= nLeitura) break;
        items.push({ type: "leitura", texto, q });
        lCount++;
      }
      if (lCount >= nLeitura) break;
    }

    setPraticaItems(shuffle(items));
    setPraticaIdx(0);
    setPraticaAnswered(false);
    setPraticaSelected(null);
    setPraticaScore({ flashcard: [0,0], escuta: [0,0], quiz: [0,0], leitura: [0,0] });
    setPraticaDone(false);
    setPraticaAudioReady(false);
    setPraticaSpeaking(false);
    if (window.speechSynthesis) window.speechSynthesis.getVoices();
    setPrevScreen("praticar");
    setScreen("pratica");
  };

  const startLeitura = () => {    setLeituraTextos(shuffle([...LEITURA_TEXTOS]).slice(0, 5));
    setLeituraIdx(0);
    setLeituraQIdx(0);
    setLeituraSelected(null);
    setLeituraScore(0);
    setLeituraDone(false);
    setPrevScreen("praticar");
    setScreen("leitura");
  };

  const startQuiz = (cat = "all") => {
    const pool = cat === "all" ? KNM_QUESTIONS : KNM_QUESTIONS.filter(q => q.cat === cat);
    setQuizQuestions(shuffle(pool).slice(0, Math.min(15, pool.length)));
    setQuizIdx(0);
    setQuizSelected(null);
    setQuizScore(0);
    setQuizDone(false);
    setQuizCat(cat);
    setPrevScreen("dashboard");
    setScreen("quiz");
  };

  // Load Dutch voices when entering settings
  useEffect(() => {
    if (screen === "setup") {
      const load = () => setAvailableVoices(getAllDutchVoices());
      if (window.speechSynthesis.getVoices().length > 0) load();
      else { window.speechSynthesis.onvoiceschanged = () => { load(); window.speechSynthesis.onvoiceschanged = null; }; window.speechSynthesis.getVoices(); setTimeout(load, 400); }
    }
  }, [screen]);

  // ── Card result ──
  const handleResult = (correct) => {
    if (animating || sessionDone) return;
    const card = sessionCards[sessionIdx];
    if (!card) return;
    setProgress(p => applyResult(p, card.id, correct));
    setSessionScore(s => ({ ...s, correct: s.correct + (correct ? 1 : 0), wrong: s.wrong + (correct ? 0 : 1) }));
    setAnimating(true);
    setDragX(correct ? 500 : -500);
    setTimeout(() => {
      setDragX(0);
      if (sessionIdx + 1 >= sessionCards.length) setSessionDone(true);
      else { setSessionIdx(i => i + 1); setFlipped(false); setExplanation(null); setAudioReady(false); setSpeaking(false); }
      setAnimating(false);
    }, 280);
  };

  // ── Swipe ──
  const onDragStart = (clientX) => { if (animating) return; dragStartX.current = clientX; setIsDragging(true); };
  const onDragMove = (clientX) => { if (!isDragging || dragStartX.current === null) return; setDragX(clientX - dragStartX.current); };
  const onDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (Math.abs(dragX) >= THRESHOLD) handleResult(dragX > 0);
    else setDragX(0);
    dragStartX.current = null;
  };

  // ── Audio ──
  const playAudio = () => {
    const card = sessionCards[sessionIdx];
    if (!card) return;
    setSpeaking(true);
    speakDutch(card.text);
    setAudioReady(true);
    setTimeout(() => setSpeaking(false), 3000);
  };

  // ── Save/Load ──
  const openSave = () => {
    setExportCode(encodeProgress(progress));
    // Load available Dutch voices
    const load = () => setAvailableVoices(getAllDutchVoices());
    if (window.speechSynthesis.getVoices().length > 0) load();
    else { window.speechSynthesis.onvoiceschanged = () => { load(); window.speechSynthesis.onvoiceschanged = null; }; window.speechSynthesis.getVoices(); }
    setShowSave(true);
  };
  const handleImport = () => {
    try {
      const p = decodeProgress(importCode);
      setProgress(p);
      if (p.examDate) setScreen("dashboard");
      setShowSave(false); setImportCode(""); setImportError("");
    } catch { setImportError("Código inválido."); }
  };

  // ── Shared components ──
  // components defined at module scope above

  // Global SaveModal — rendered once, covers all screens
  const saveModalProps = {
    show: showSave,
    onClose: () => setShowSave(false),
    exportCode,
    importCode,
    setImportCode,
    importError,
    onImport: handleImport,
    confirmReset,
    setConfirmReset,
    onReset: () => { setProgress(DEFAULT_PROGRESS); setOnboardingStep(1); setDailyGoalPick(10); try { localStorage.removeItem("nt2_progress"); } catch {} setConfirmReset(false); setShowSave(false); setScreen("setup"); },
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // SETUP / ONBOARDING + SETTINGS
  // ─────────────────────────────────────────────────────────────────────────────

  const SelectRow = ({ value, set, label, options }) => (
    <select value={value} onChange={e => { set(e.target.value); setSetupError(""); }}
      style={{ padding: "12px 8px", fontSize: 15, border: `1.5px solid ${C.light}`, borderRadius: R.md, background: "#fff", fontFamily: font, textAlign: "center", appearance: "none", WebkitAppearance: "none" }}>
      <option value="">{label}</option>
      {options.map(o => <option key={o.val} value={o.val}>{o.label}</option>)}
    </select>
  );
  const dateOptions = [
    { value: setupDay, set: setSetupDay, label: "Dia", options: Array.from({ length: 31 }, (_, i) => ({ val: String(i+1).padStart(2,"0"), label: String(i+1) })) },
    { value: setupMonth, set: setSetupMonth, label: "Mes", options: ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"].map((m,i) => ({ val: String(i+1).padStart(2,"0"), label: m })) },
    { value: setupYear, set: setSetupYear, label: "Ano", options: [2026,2027,2028,2029].map(y => ({ val: String(y), label: String(y) })) },
  ];
  const VoicePicker = () => (
    <div style={{ display: "grid", gap: 8 }}>
      {availableVoices.length === 0 ? (
        <div style={{ fontSize: 13, color: C.mid, lineHeight: 1.7 }}>Nenhuma voz holandesa encontrada. Instale <strong>Ellen</strong> em Settings, procure por Voices, escolha Dutch.</div>
      ) : availableVoices.map(v => (
        <button key={v.name} onClick={() => {
          selectedVoiceName = v.name; setChosenVoice(v.name);
          try { localStorage.setItem("nt2_voice", v.name); } catch {}
          window.speechSynthesis.cancel();
          const u = new SpeechSynthesisUtterance("Hoe gaat het met u?");
          u.lang = "nl-NL"; u.rate = 0.75; u.voice = v;
          window.speechSynthesis.speak(u);
        }} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", border: `1.5px solid ${chosenVoice === v.name ? C.blue : C.light}`, borderRadius: R.md, background: chosenVoice === v.name ? C.blueLight : C.white, cursor: "pointer", fontFamily: font, textAlign: "left" }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: chosenVoice === v.name ? C.blue : C.dark }}>{v.name}</div>
            <div style={{ fontSize: 11, color: C.mid }}>{v.lang} · Toque para ouvir</div>
          </div>
          {chosenVoice === v.name && <Icon d={Icons.check} size={18} stroke={C.blue} />}
        </button>
      ))}
    </div>
  );

  // RETURNING USER = settings screen
  if (screen === "setup" && isReturning) return (
    <Page>
      <SaveModal {...saveModalProps} />
      <Wrap>
        <div style={{ padding: "0 0 60px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "24px 0 20px" }}>
            <button onClick={() => handleTabChange("home")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              <Icon d={Icons.back} size={22} stroke={C.mid} />
            </button>
            <div style={{ fontSize: 20, fontWeight: 700 }}>Configuracoes</div>
          </div>

          <CardBox style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.mid, marginBottom: 14, textTransform: "uppercase", letterSpacing: 1 }}>Data do exame</div>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 3fr", gap: 8, marginBottom: 8 }}>
              {dateOptions.map(o => <SelectRow key={o.label} {...o} />)}
            </div>
            {setupError && <div style={{ color: C.coral, fontSize: 12, marginBottom: 8 }}>{setupError}</div>}
            <Btn onClick={handleSetup} style={{ width: "100%", marginTop: 4 }}>Salvar data</Btn>
          </CardBox>

          <CardBox style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.mid, marginBottom: 14, textTransform: "uppercase", letterSpacing: 1 }}>Meta diaria de frases</div>
            {progress.examDate ? (
              <div style={{ fontSize: 14, fontWeight: 700, color: C.coral }}>{stats.dailyGoal} frases/dia (calculada pelo exame)</div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                {[5, 10, 15, 20, 25, 30].map(n => (
                  <button key={n} onClick={() => { setDailyGoalPick(n); setProgress(p => ({ ...p, customDailyGoal: n })); }} style={{ padding: "14px 8px", borderRadius: R.md, border: `1.5px solid ${(progress.customDailyGoal || 10) === n ? C.coral : C.light}`, background: (progress.customDailyGoal || 10) === n ? C.coralLight : C.white, cursor: "pointer", fontFamily: font }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: (progress.customDailyGoal || 10) === n ? C.coral : C.dark }}>{n}</div>
                    <div style={{ fontSize: 10, color: C.mid }}>frases/dia</div>
                  </button>
                ))}
              </div>
            )}
          </CardBox>

          <CardBox style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.mid, marginBottom: 14, textTransform: "uppercase", letterSpacing: 1 }}>Voz holandesa</div>
            <VoicePicker />
          </CardBox>

          <button onClick={openSave} style={{ width: "100%", background: "none", border: `1.5px solid ${C.light}`, borderRadius: R.full, padding: "13px", cursor: "pointer", fontSize: 14, color: C.mid, fontFamily: font, fontWeight: 500 }}>
            Salvar / carregar progresso
          </button>
        </div>
      </Wrap>
    </Page>
  );

  // FIRST-TIME ONBOARDING
  if (screen === "setup") return (
    <Page>
      <SaveModal {...saveModalProps} />
      <Wrap>
        <div style={{ padding: "0 0 60px" }}>

          {onboardingStep === 1 && (
            <div style={{ textAlign: "center", paddingTop: 40 }}>
              <div style={{ width: 80, height: 80, background: C.coralLight, borderRadius: R.xl, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}><Icon d={Icons.globe} size={40} stroke={C.coral} /></div>
              <div style={{ fontSize: 11, letterSpacing: 2, color: C.coral, fontWeight: 700, marginBottom: 12, textTransform: "uppercase" }}>NT2 · A2 · Inburgeringsexamen</div>
              <h1 style={{ fontSize: 30, fontWeight: 800, color: C.dark, marginBottom: 16, lineHeight: 1.2 }}>Zinnensimulator</h1>
              <p style={{ color: C.mid, lineHeight: 1.75, fontSize: 15, marginBottom: 36 }}>O seu treino para o exame de integracao holandes. 492 frases oficiais com flashcards, modo escuta e revisao inteligente.</p>
              <div style={{ display: "grid", gap: 10, marginBottom: 36, textAlign: "left" }}>
                {[
                  { icon: Icons.cards, label: "492 zinnen", desc: "Todas as frases do exame oficial NT2 A2" },
                  { icon: Icons.brain, label: "Revisao inteligente", desc: "Algoritmo que foca nas frases mais dificeis" },
                  { icon: Icons.headphones, label: "Modo escuta", desc: "Ouca em holandes e treine a compreensao" },
                  { icon: Icons.pencil, label: "Conjugacao", desc: "25 verbos essenciais com pronuncia" },
                ].map(({ icon, label, desc }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 14, background: C.white, padding: "14px 16px", borderRadius: R.lg, boxShadow: shadow.sm }}>
                    <div style={{ width: 40, height: 40, borderRadius: R.md, background: C.coralLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon d={icon} size={20} stroke={C.coral} />
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: C.dark }}>{label}</div>
                      <div style={{ fontSize: 12, color: C.mid }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Btn onClick={() => setOnboardingStep(2)} style={{ width: "100%", fontSize: 16 }}>Comecar →</Btn>
              <button onClick={openSave} style={{ background: "none", border: "none", color: C.mid, cursor: "pointer", fontSize: 13, fontFamily: font, marginTop: 14, display: "block", width: "100%" }}>
                Ja tenho um codigo salvo
              </button>
            </div>
          )}

          {onboardingStep === 2 && (
            <div>
              <button onClick={() => setOnboardingStep(1)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: C.mid, cursor: "pointer", fontFamily: font, fontSize: 14, marginBottom: 32, padding: 0 }}>
                <Icon d={Icons.back} size={18} stroke={C.mid} /> Voltar
              </button>
              <div style={{ textAlign: "center", marginBottom: 32 }}>
                <div style={{ width: 72, height: 72, background: C.coralLight, borderRadius: R.xl, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <Icon d={Icons.calendar} size={32} stroke={C.coral} />
                </div>
                <h2 style={{ fontSize: 24, fontWeight: 700, color: C.dark, marginBottom: 8 }}>Quando é o seu exame?</h2>
                <p style={{ color: C.mid, fontSize: 14, lineHeight: 1.6 }}>Com a data do exame, o app calcula quantas frases voce precisa estudar por dia.</p>
              </div>
              <CardBox style={{ marginBottom: 12 }}>
                <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 3fr", gap: 8, marginBottom: 8 }}>
                  {dateOptions.map(o => <SelectRow key={o.label} {...o} />)}
                </div>
                {setupError && <div style={{ color: C.coral, fontSize: 12, marginBottom: 8 }}>{setupError}</div>}
              </CardBox>
              <Btn onClick={handleSetup} style={{ width: "100%", marginBottom: 10 }}>Confirmar data →</Btn>
              <button onClick={() => setOnboardingStep("goal")} style={{ width: "100%", background: "none", border: "none", color: C.mid, padding: "12px", cursor: "pointer", fontSize: 14, fontFamily: font }}>
                Ainda nao sei a data — pular
              </button>
            </div>
          )}

          {onboardingStep === "goal" && (
            <div>
              <button onClick={() => setOnboardingStep(2)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: C.mid, cursor: "pointer", fontFamily: font, fontSize: 14, marginBottom: 32, padding: 0 }}>
                <Icon d={Icons.back} size={18} stroke={C.mid} /> Voltar
              </button>
              <div style={{ textAlign: "center", marginBottom: 32 }}>
                <div style={{ width: 72, height: 72, background: C.coralLight, borderRadius: R.xl, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <Icon d={Icons.target} size={32} stroke={C.coral} />
                </div>
                <h2 style={{ fontSize: 24, fontWeight: 700, color: C.dark, marginBottom: 8 }}>Quantas frases por dia?</h2>
                <p style={{ color: C.mid, fontSize: 14, lineHeight: 1.6 }}>Recomendamos comecar com 10 frases por dia e aumentar conforme se sentir confortavel.</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 24 }}>
                {[5, 10, 15, 20, 25, 30].map(n => (
                  <button key={n} onClick={() => setDailyGoalPick(n)} style={{ padding: "18px 8px", borderRadius: R.lg, border: `1.5px solid ${dailyGoalPick === n ? C.coral : C.light}`, background: dailyGoalPick === n ? C.coralLight : C.white, cursor: "pointer", fontFamily: font, boxShadow: shadow.sm }}>
                    <div style={{ fontSize: 24, fontWeight: 700, color: dailyGoalPick === n ? C.coral : C.dark }}>{n}</div>
                    <div style={{ fontSize: 11, color: C.mid, marginTop: 2 }}>frases/dia</div>
                  </button>
                ))}
              </div>
              {dailyGoalPick <= 10 && <div style={{ background: C.greenLight, borderRadius: R.md, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: C.green }}>Boa escolha para comecar! Consistencia e mais importante que quantidade.</div>}
              {dailyGoalPick >= 20 && <div style={{ background: C.goldLight, borderRadius: R.md, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: C.gold }}>Meta ambiciosa! Certifique-se de ter tempo todos os dias.</div>}
              <Btn onClick={() => { setProgress(p => ({ ...p, examDate: null, customDailyGoal: dailyGoalPick })); setOnboardingStep(3); }} style={{ width: "100%", marginBottom: 10 }}>
                Confirmar meta →
              </Btn>
              <button onClick={() => { setProgress(p => ({ ...p, examDate: null, customDailyGoal: null })); setOnboardingStep(3); }} style={{ width: "100%", background: "none", border: "none", color: C.mid, padding: "12px", cursor: "pointer", fontSize: 14, fontFamily: font }}>
                Sem meta — vou praticar quando tiver tempo
              </button>
            </div>
          )}

          {onboardingStep === 3 && (
            <div>
              <button onClick={() => setOnboardingStep(progress.examDate ? 2 : "goal")} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: C.mid, cursor: "pointer", fontFamily: font, fontSize: 14, marginBottom: 32, padding: 0 }}>
                <Icon d={Icons.back} size={18} stroke={C.mid} /> Voltar
              </button>
              <div style={{ textAlign: "center", marginBottom: 32 }}>
                <div style={{ width: 72, height: 72, background: C.blueLight, borderRadius: R.xl, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <Icon d={Icons.speaker} size={32} stroke={C.blue} />
                </div>
                <h2 style={{ fontSize: 24, fontWeight: 700, color: C.dark, marginBottom: 8 }}>Escolha a voz</h2>
                <p style={{ color: C.mid, fontSize: 14, lineHeight: 1.6 }}>Toque numa voz para ouvir como ela soa em holandes.</p>
              </div>
              <div style={{ marginBottom: 24 }}>
                <VoicePicker />
              </div>
              <Btn onClick={() => { setProgress(p => ({ ...p, onboardingDone: true })); setTab("home"); setScreen("dashboard"); }} style={{ width: "100%", fontSize: 16 }}>
                {chosenVoice ? "Comecar a estudar →" : "Continuar sem voz →"}
              </Btn>
            </div>
          )}

        </div>
      </Wrap>
    </Page>
  );

  // ─────────────────────────────────────────────────────────────────────────────
  // DASHBOARD
  // ─────────────────────────────────────────────────────────────────────────────
  if (screen === "dashboard") {
    const pct = Math.round((stats.dominated / 492) * 100);
    const todayStudied = progress.todayDate === getToday() ? progress.todayStudied : 0;
    return (
      <Page>
        <SaveModal {...saveModalProps} />
  
        <Wrap>
          {/* Header */}
          <div style={{ padding: "24px 0 8px", marginBottom: 20 }}>
            <div style={{ fontSize: 11, color: C.coral, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 2 }}>NT2 · A2</div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>Zinnensimulator</div>
          </div>

          {/* Unified progress card */}
          <CardBox style={{ marginBottom: 20 }}>

            {/* Top row: streak + days to exam */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 18, lineHeight: 1 }}>🔥</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#E65100" }}>
                  {progress.lastStudyDate === getToday() ? progress.streak : 0}d streak
                </span>
              </div>
              {stats.daysLeft != null ? (
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Icon d={Icons.calendar} size={14} stroke={C.coral} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: C.coral }}>{stats.daysLeft}d para o exame</span>
                </div>
              ) : (
                <button onClick={() => handleTabChange("config")} style={{ background: "none", border: "none", fontSize: 12, color: C.mid, cursor: "pointer", fontFamily: font, padding: 0 }}>
                  + Adicionar data
                </button>
              )}
            </div>

            {/* Progress bar */}
            <div style={{ height: 10, background: "#F0F0F0", borderRadius: R.full, overflow: "hidden", marginBottom: 8 }}>
              <div style={{ height: 10, display: "flex" }}>
                <div style={{ width: `${(stats.dominated / 492) * 100}%`, background: C.green, transition: "width 0.5s" }} />
                <div style={{ width: `${(stats.learning / 492) * 100}%`, background: "#FFD166", transition: "width 0.5s" }} />
              </div>
            </div>

            {/* Progress labels */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: stats.dailyGoal != null ? 14 : 0 }}>
              <div style={{ display: "flex", gap: 12, fontSize: 11, color: C.mid }}>
                <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.green, display: "inline-block" }} />{stats.dominated} dominadas
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#FFD166", display: "inline-block" }} />{stats.learning} aprendendo
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#E0E0E0", display: "inline-block" }} />{stats.unseen} novas
                </span>
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: C.coral }}>{pct}%</span>
            </div>

            {/* Today's goal — only if set */}
            {stats.dailyGoal != null && (
              <div style={{ borderTop: `1px solid ${C.light}`, paddingTop: 12 }}>
                {todayStudied >= stats.dailyGoal ? (
                  <div style={{ position: "relative", background: "linear-gradient(135deg, #E8F5E9, #F1F8E9)", borderRadius: R.md, padding: "12px 14px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 18, lineHeight: 1 }}>🏆</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: C.green }}>Meta de hoje concluida!</span>
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: C.green }}>{todayStudied}/{stats.dailyGoal}</span>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Icon d={Icons.target} size={16} stroke={C.coral} />
                      <span style={{ fontSize: 13, fontWeight: 600, color: C.dark }}>Meta de hoje</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 80, height: 6, background: "#F0F0F0", borderRadius: R.full, overflow: "hidden" }}>
                        <div style={{ height: 6, width: `${Math.min((todayStudied / stats.dailyGoal) * 100, 100)}%`, background: C.coral, borderRadius: R.full, transition: "width 0.4s" }} />
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>{todayStudied}/{stats.dailyGoal}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardBox>

          {/* Pratica do Dia — destaque principal */}
          {progress.praticaDate === getToday() ? (
            <div style={{ background: C.greenLight, borderRadius: R.lg, padding: "20px 18px", marginBottom: 16, display: "flex", alignItems: "center", gap: 16, border: `1.5px solid ${C.green}` }}>
              <div style={{ width: 52, height: 52, borderRadius: R.lg, background: C.green, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon d={Icons.check} size={26} stroke="#fff" strokeWidth={2.5} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.green, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 3 }}>Concluida hoje</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: C.dark, marginBottom: 2 }}>Pratica do Dia</div>
                <div style={{ fontSize: 13, color: C.mid }}>Volte amanha para uma nova sessao</div>
              </div>
              <button onClick={startPraticaDoDia} style={{ background: C.white, border: `1px solid ${C.light}`, borderRadius: R.full, padding: "8px 14px", cursor: "pointer", fontSize: 12, fontWeight: 600, color: C.mid, fontFamily: font }}>
                Repetir
              </button>
            </div>
          ) : (
            <button onClick={startPraticaDoDia} style={{ width: "100%", background: "linear-gradient(135deg, #FF385C, #D4003B)", border: "none", borderRadius: R.lg, padding: "20px 18px", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 16, marginBottom: 16, fontFamily: font, boxShadow: "0 4px 20px rgba(255,56,92,0.35)" }}>
              <div style={{ width: 52, height: 52, borderRadius: R.lg, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 26, lineHeight: 1 }}>⚡</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.75)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 3 }}>Sessao do dia</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 2 }}>Pratica do Dia</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>
                  {stats.dailyGoal ?? 10} atividades • flashcard, escuta, quiz e leitura
                </div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: R.full, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon d={Icons.arrowRight} size={18} stroke="#fff" />
              </div>
            </button>
          )}

          {/* Revisao Inteligente — destaque quando tiver pendente */}
          {stats.due > 0 && (
            <button onClick={startRevisao} style={{ width: "100%", background: "linear-gradient(135deg, #FF9800, #F57C00)", border: "none", borderRadius: R.lg, padding: "16px 18px", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 14, marginBottom: 16, fontFamily: font, boxShadow: "0 4px 16px rgba(255,152,0,0.35)" }}>
              <div style={{ width: 48, height: 48, borderRadius: R.lg, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon d={Icons.repeat} size={24} stroke="#fff" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.8)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 2 }}>Prioridade</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 2 }}>Revisao Inteligente</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>{stats.due} carta{stats.due !== 1 ? "s" : ""} esperando revisao</div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.25)", borderRadius: R.full, padding: "4px 12px", fontSize: 15, fontWeight: 800, color: "#fff" }}>{stats.due}</div>
            </button>
          )}

          {/* Activities */}
          <div style={{ fontSize: 13, fontWeight: 700, color: C.dark, marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Atividades</div>
          <div style={{ display: "grid", gap: 12, marginBottom: 20 }}>
            {(() => {
              const goal = stats.dailyGoal;
              const todayDone = progress.todayDate === getToday() ? progress.todayStudied : 0;
              const sessionSize = goal != null ? Math.max(goal - todayDone > 0 ? goal - todayDone : goal, 10) : 20;
              const desc1 = goal != null ? `${sessionSize} frases • meta diaria` : "492 zinnen • arraste para avaliar";
              const desc2 = goal != null ? `${sessionSize} frases • ouca e tente lembrar` : "Ouca e tente lembrar";
              return [
                { emoji: "🃏", label: "Flashcards", desc: desc1, bg: C.coralLight, action: () => startFlashcards("both") },
                { emoji: "🎧", label: "Modo Escuta", desc: desc2, bg: C.blueLight, action: startEscuta },
                { emoji: "✏️", label: "Conjugacao", desc: "25 verbos essenciais", bg: C.greenLight, action: startConjugacao },
                { emoji: "🧠", label: "Quiz KNM", desc: `${KNM_QUESTIONS.length} perguntas sobre a sociedade holande\u0073a`, bg: "#F3E5F5", action: () => startQuiz("all") },
              ].map(({ emoji, label, desc, bg, action }) => (
                <button key={label} onClick={action} style={{ background: C.white, border: "none", borderRadius: R.lg, padding: "16px 18px", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 14, boxShadow: shadow.card, fontFamily: font }}>
                  <div style={{ width: 48, height: 48, borderRadius: R.lg, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 22, lineHeight: 1 }}>{emoji}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: C.dark, marginBottom: 2 }}>{label}</div>
                    <div style={{ fontSize: 13, color: C.mid }}>{desc}</div>
                  </div>
                  <Icon d={Icons.arrowRight} size={18} stroke={C.mid} />
                </button>
              ));
            })()}
          </div>

        </Wrap>

        {/* Bottom nav */}
        <BottomNav tab={tab} setTab={handleTabChange} />
      </Page>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // PRATICAR SCREEN
  // ─────────────────────────────────────────────────────────────────────────────
  if (screen === "praticar") {
    const todayDone = progress.todayDate === getToday() ? progress.todayStudied : 0;
    const goal = stats.dailyGoal;
    const sessionSize = goal != null ? Math.max(goal - todayDone > 0 ? goal - todayDone : goal, 10) : 20;
    return (
      <Page>
        <SaveModal {...saveModalProps} />
        <Wrap>
          <div style={{ padding: "24px 0 20px" }}>
            <div style={{ fontSize: 11, color: C.coral, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 2 }}>NT2 · A2</div>
            <div style={{ fontSize: 24, fontWeight: 700 }}>Praticar</div>
          </div>

          <div style={{ fontSize: 12, fontWeight: 700, color: C.mid, marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Frases (492 zinnen)</div>
          <div style={{ display: "grid", gap: 10, marginBottom: 24 }}>
            {[
              { icon: Icons.cards, label: "Flashcards", desc: goal != null ? `${sessionSize} frases hoje` : "Arraste para avaliar", color: C.coral, bg: C.coralLight, action: () => startFlashcards("both") },
              { icon: Icons.headphones, label: "Modo Escuta", desc: goal != null ? `${sessionSize} frases hoje` : "Ouca e tente lembrar", color: C.blue, bg: C.blueLight, action: startEscuta },
            ].map(({ icon, label, desc, color, bg, action }) => (
              <button key={label} onClick={action} style={{ background: C.white, border: "none", borderRadius: R.lg, padding: "16px 18px", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 14, boxShadow: shadow.card, fontFamily: font }}>
                <div style={{ width: 48, height: 48, borderRadius: R.lg, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon d={icon} size={22} stroke={color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: C.dark, marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 13, color: C.mid }}>{desc}</div>
                </div>
                <Icon d={Icons.arrowRight} size={18} stroke={C.mid} />
              </button>
            ))}
          </div>

          <div style={{ fontSize: 12, fontWeight: 700, color: C.mid, marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Por categoria</div>
          <div style={{ display: "grid", gap: 10, marginBottom: 24 }}>
            <button onClick={() => startFlashcards("vraag")} style={{ background: C.white, border: "none", borderRadius: R.lg, padding: "16px 18px", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 14, boxShadow: shadow.card, fontFamily: font }}>
              <div style={{ width: 48, height: 48, borderRadius: R.lg, background: C.blueLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon d={Icons.messageAlert} size={22} stroke={C.blue} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: C.dark, marginBottom: 2 }}>Perguntas V&A</div>
                <div style={{ fontSize: 13, color: C.mid }}>1–60 • Vraag & Antwoord</div>
              </div>
              <Icon d={Icons.arrowRight} size={18} stroke={C.mid} />
            </button>
            <button onClick={() => startFlashcards("aanvul")} style={{ background: C.white, border: "none", borderRadius: R.lg, padding: "16px 18px", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 14, boxShadow: shadow.card, fontFamily: font }}>
              <div style={{ width: 48, height: 48, borderRadius: R.lg, background: C.coralLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon d={Icons.pencil} size={22} stroke={C.coral} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: C.dark, marginBottom: 2 }}>Aanvulzinnen</div>
                <div style={{ fontSize: 13, color: C.mid }}>61–492 • Complete a frase</div>
              </div>
              <Icon d={Icons.arrowRight} size={18} stroke={C.mid} />
            </button>
          </div>

          <div style={{ fontSize: 12, fontWeight: 700, color: C.mid, marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Compreensao</div>
          <button onClick={startLeitura} style={{ background: C.white, border: "none", borderRadius: R.lg, padding: "16px 18px", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 14, boxShadow: shadow.card, fontFamily: font, width: "100%", marginBottom: 24 }}>
            <div style={{ width: 48, height: 48, borderRadius: R.lg, background: "#EDE7F6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon d={Icons.book} size={22} stroke="#673AB7" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: C.dark, marginBottom: 2 }}>Leitura</div>
              <div style={{ fontSize: 13, color: C.mid }}>{LEITURA_TEXTOS.length} textos • avisos, cartas, anuncios</div>
            </div>
            <Icon d={Icons.arrowRight} size={18} stroke={C.mid} />
          </button>

          <div style={{ fontSize: 12, fontWeight: 700, color: C.mid, marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Gramatica</div>
          <button onClick={startConjugacao} style={{ background: C.white, border: "none", borderRadius: R.lg, padding: "16px 18px", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 14, boxShadow: shadow.card, fontFamily: font, width: "100%" }}>
            <div style={{ width: 48, height: 48, borderRadius: R.lg, background: C.greenLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon d={Icons.pencil} size={22} stroke={C.green} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: C.dark, marginBottom: 2 }}>Conjugacao</div>
              <div style={{ fontSize: 13, color: C.mid }}>25 verbos essenciais com audio</div>
            </div>
            <Icon d={Icons.arrowRight} size={18} stroke={C.mid} />
          </button>
        </Wrap>
        <BottomNav tab={tab} setTab={handleTabChange} />
      </Page>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // CONJUGAÇÃO
  // ─────────────────────────────────────────────────────────────────────────────
  if (screen === "conjugacao") {
    const verb = VERBOS[verbIdx];
    const allRevealed = verbRevealed.length === verb.forms.length;
    return (
      <Page>
        <SaveModal {...saveModalProps} />
  
        <Wrap>
          <AppHeader title="Conjugação" subtitle={`${verbIdx + 1} / ${VERBOS.length} verbos`} onBack={() => handleTabChange("praticar")} onSave={openSave} />

          {/* Progress dots */}
          <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
            {VERBOS.map((_, i) => (
              <div key={i} onClick={() => { setVerbIdx(i); setVerbRevealed([]); }}
                style={{ width: 10, height: 10, borderRadius: "50%", background: i === verbIdx ? C.coral : i < verbIdx ? C.green : C.light, cursor: "pointer", transition: "background 0.2s" }} />
            ))}
          </div>

          {/* Verb card */}
          <CardBox style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: C.mid, marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>Infinitivo</div>
                <div style={{ fontSize: 30, fontWeight: 700, color: C.dark }}>{verb.inf}</div>
                <div style={{ fontSize: 14, color: C.mid, marginTop: 4 }}>{verb.pt}</div>
              </div>
              <button onClick={() => speakAllRows(verb.forms)} style={{ background: C.coralLight, border: "none", borderRadius: R.full, padding: "10px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, color: C.coral, fontWeight: 600, fontSize: 13, fontFamily: font }}>
                <Icon d={Icons.speaker} size={16} stroke={C.coral} />
                Tudo
              </button>
            </div>

            <div style={{ borderTop: `1px solid ${C.light}`, paddingTop: 4 }}>
              {verb.forms.map(([pronoun, form], i) => {
                const revealed = verbRevealed.includes(i);
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", padding: "13px 0", borderBottom: i < verb.forms.length - 1 ? `1px solid ${C.bg}` : "none", gap: 10 }}>
                    <div style={{ fontSize: 13, color: C.mid, minWidth: 120, fontWeight: 500 }}>{pronoun}</div>
                    <div onClick={() => { if (!revealed) setVerbRevealed(r => [...r, i]); }}
                      style={{ flex: 1, fontSize: 17, fontWeight: 700, filter: revealed ? "none" : "blur(7px)", color: revealed ? C.green : C.light, transition: "filter 0.3s, color 0.3s", userSelect: "none", cursor: revealed ? "default" : "pointer" }}>
                      {form}
                    </div>
                    <button onClick={() => speakRow(pronoun, form)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 6px", opacity: revealed ? 1 : 0.3, flexShrink: 0 }}>
                      <Icon d={Icons.speaker} size={18} stroke={C.mid} />
                    </button>
                  </div>
                );
              })}
            </div>

            {allRevealed && (
              <div style={{ marginTop: 16, background: C.greenLight, padding: "12px 16px", borderRadius: R.md, borderLeft: `3px solid ${C.green}` }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: C.green, marginBottom: 4, textTransform: "uppercase" }}>Exemplo</div>
                <div style={{ fontSize: 14, fontStyle: "italic", color: C.dark }}>{verb.ex}</div>
              </div>
            )}

            {!allRevealed && (
              <button onClick={() => setVerbRevealed(verb.forms.map((_, i) => i))} style={{ marginTop: 16, width: "100%", background: C.bg, border: "none", color: C.mid, padding: "12px", borderRadius: R.md, cursor: "pointer", fontSize: 13, fontFamily: font, fontWeight: 500 }}>
                Revelar todas as formas
              </button>
            )}
          </CardBox>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Btn onClick={() => { setVerbIdx(i => Math.max(0, i - 1)); setVerbRevealed([]); }} variant="secondary" disabled={verbIdx === 0} icon={Icons.arrowLeft}>
              Anterior
            </Btn>
            <Btn onClick={() => { if (verbIdx < VERBOS.length - 1) { setVerbIdx(i => i + 1); setVerbRevealed([]); } else setScreen("dashboard"); }} icon={verbIdx < VERBOS.length - 1 ? Icons.arrowRight : Icons.check}>
              {verbIdx < VERBOS.length - 1 ? "Próximo" : "Concluído"}
            </Btn>
          </div>
        </Wrap>
      </Page>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // SESSION DONE
  // ─────────────────────────────────────────────────────────────────────────────
  if (sessionDone) {
    const total = sessionScore.correct + sessionScore.wrong;
    const pct = total > 0 ? Math.round((sessionScore.correct / total) * 100) : 0;
    const modeLabel = screen === "escuta" ? "Modo Escuta" : screen === "revisao" ? "Revisão Inteligente" : "Flashcards";
    return (
      <Page>
        <SaveModal {...saveModalProps} />
  
        <Wrap style={{ paddingTop: 60, textAlign: "center" }}>
          <div style={{ width: 80, height: 80, borderRadius: R.full, background: pct >= 80 ? C.greenLight : C.coralLight, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <Icon d={pct >= 80 ? Icons.trophy : Icons.target} size={40} stroke={pct >= 80 ? C.green : C.coral} />
          </div>
          <div style={{ fontSize: 11, letterSpacing: 2, color: C.mid, fontWeight: 600, marginBottom: 8, textTransform: "uppercase" }}>{modeLabel}</div>
          <div style={{ fontSize: 68, fontWeight: 700, marginBottom: 4, color: C.dark }}>{pct}%</div>
          <div style={{ fontSize: 16, color: C.mid, marginBottom: 8 }}>{sessionScore.correct} de {total} frases</div>
          <div style={{ fontSize: 14, color: C.mid, marginBottom: 40 }}>
            {pct >= 80 ? "Excelente resultado!" : pct >= 60 ? "Bom trabalho!" : "Continue praticando!"}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
            <CardBox style={{ textAlign: "center", background: C.greenLight }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: C.green }}>{sessionScore.correct}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.green, marginTop: 4 }}>Acertei</div>
            </CardBox>
            <CardBox style={{ textAlign: "center", background: C.coralLight }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: C.coral }}>{sessionScore.wrong}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.coral, marginTop: 4 }}>Praticar</div>
            </CardBox>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Btn onClick={() => { if (screen === "revisao") startRevisao(); else if (screen === "escuta") startEscuta(); else startFlashcards("both"); }} icon={Icons.repeat}>
              Repetir sessão
            </Btn>
            <Btn onClick={() => setScreen("dashboard")} variant="secondary" icon={Icons.home}>
              Dashboard
            </Btn>
          </div>
        </Wrap>
      </Page>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // SWIPE CARD (Flashcards + Revisão)
  // ─────────────────────────────────────────────────────────────────────────────
  if ((screen === "flashcards" || screen === "revisao") && current) {
    const sessionPct = (sessionIdx / sessionCards.length) * 100;
    const accentColor = screen === "revisao" ? C.gold : C.coral;
    const cardInfo = progress.cards[current.id];
    return (
      <Page>
        <SaveModal {...saveModalProps} />
  
        <Wrap>
          <AppHeader
            title={screen === "revisao" ? "Revisão Inteligente" : "Flashcards"}
            subtitle={`${sessionIdx + 1} de ${sessionCards.length}`}
            onBack={() => setScreen("dashboard")}
          onSave={openSave}
          />

          {/* Progress */}
          <div style={{ height: 4, background: C.light, borderRadius: R.full, marginBottom: 16, overflow: "hidden" }}>
            <div style={{ height: 4, width: `${sessionPct}%`, background: accentColor, borderRadius: R.full, transition: "width 0.3s" }} />
          </div>

          {/* Type + interval */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ background: current.type === "vraag" ? C.blueLight : C.coralLight, color: current.type === "vraag" ? C.blue : C.coral, padding: "4px 12px", borderRadius: R.full, fontSize: 11, fontWeight: 600 }}>
              {current.type === "vraag" ? "Vraag & Antwoord" : "Aanvulzin"}
            </span>
            {cardInfo && <span style={{ fontSize: 11, color: C.mid }}>intervalo: {cardInfo.interval}d</span>}
          </div>

          {/* Swipe hints */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.coral, opacity: isLeft ? swipeRatio : 0.2, transition: isDragging ? "none" : "opacity 0.3s" }}>← Praticar</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.green, opacity: isRight ? swipeRatio : 0.2, transition: isDragging ? "none" : "opacity 0.3s" }}>Já sei →</div>
          </div>

          {/* Card */}
          <div
            onMouseDown={e => onDragStart(e.clientX)} onMouseMove={e => { if (isDragging) onDragMove(e.clientX); }} onMouseUp={onDragEnd} onMouseLeave={onDragEnd}
            onTouchStart={e => onDragStart(e.touches[0].clientX)} onTouchMove={e => onDragMove(e.touches[0].clientX)} onTouchEnd={onDragEnd}
            onClick={() => { if (!flipped && Math.abs(dragX) < 8) { setFlipped(true); setExplanation(generateExplanation(current.text)); } }}
            style={{
              background: C.dark, borderRadius: R.xl, padding: "28px 24px", minHeight: 200,
              cursor: "pointer", userSelect: "none", touchAction: "none", marginBottom: 16,
              opacity: animating ? 0 : 1,
              transition: isDragging ? "none" : "opacity 0.25s, transform 0.25s, box-shadow 0.2s",
              transform: `translateX(${dragX}px) rotate(${dragX * 0.035}deg)`,
              boxShadow: Math.abs(dragX) > 20
                ? `0 12px 40px ${dragX > 0 ? "rgba(0,138,5,0.35)" : "rgba(255,56,92,0.35)"}`
                : "0 4px 24px rgba(0,0,0,0.2)",
              position: "relative",
            }}
          >
            {isRight && <div style={{ position: "absolute", top: 16, left: 18, background: C.green, color: "#fff", padding: "6px 14px", fontSize: 13, fontWeight: 700, borderRadius: R.full, opacity: swipeRatio }}>✓ Já sei</div>}
            {isLeft && <div style={{ position: "absolute", top: 16, right: 18, background: C.coral, color: "#fff", padding: "6px 14px", fontSize: 13, fontWeight: 700, borderRadius: R.full, opacity: swipeRatio }}>Praticar</div>}

            <div style={{ position: "absolute", top: 14, right: 18, fontSize: 11, color: "rgba(255,255,255,0.25)" }}>#{current.id + 1}</div>

            {/* Icon */}
            <div style={{ width: 56, height: 56, borderRadius: R.lg, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
              <span style={{ fontSize: 28 }}>{getCardEmoji(current.text)}</span>
            </div>

            <p style={{ fontSize: 19, lineHeight: 1.65, margin: 0, textAlign: "center", fontWeight: 500, color: "#FFFFFF" }}>{current.text}</p>

            {!flipped && (
              <div style={{ marginTop: 20, fontSize: 12, color: "rgba(255,255,255,0.35)", textAlign: "center", fontWeight: 500 }}>Toque para ver dica</div>
            )}
            {flipped && explanation && (
              <div style={{ marginTop: 18, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.15)", fontSize: 13, lineHeight: 1.9, color: "rgba(255,255,255,0.75)", whiteSpace: "pre-wrap" }}>
                {explanation}
              </div>
            )}
          </div>

          {/* Score */}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 4px", fontSize: 13, fontWeight: 600 }}>
            <span style={{ color: C.green }}>✓ {sessionScore.correct}</span>
            <span style={{ color: C.mid }}>{sessionIdx}/{sessionCards.length}</span>
            <span style={{ color: C.coral }}>↺ {sessionScore.wrong}</span>
          </div>
        </Wrap>
      </Page>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // ESCUTA
  // ─────────────────────────────────────────────────────────────────────────────
  if (screen === "escuta" && current) {
    const sessionPct = (sessionIdx / sessionCards.length) * 100;
    return (
      <Page>
        <SaveModal {...saveModalProps} />
  
        <Wrap>
          <AppHeader title="Modo Escuta" subtitle={`${sessionIdx + 1} de ${sessionCards.length}`} onBack={() => handleTabChange("praticar")} onSave={openSave} />

          <div style={{ height: 4, background: C.light, borderRadius: R.full, marginBottom: 20, overflow: "hidden" }}>
            <div style={{ height: 4, width: `${sessionPct}%`, background: C.blue, borderRadius: R.full, transition: "width 0.3s" }} />
          </div>

          <span style={{ background: current.type === "vraag" ? C.blueLight : C.coralLight, color: current.type === "vraag" ? C.blue : C.coral, padding: "4px 12px", borderRadius: R.full, fontSize: 11, fontWeight: 600, display: "inline-block", marginBottom: 16 }}>
            {current.type === "vraag" ? "Vraag & Antwoord" : "Aanvulzin"} · #{current.id + 1}
          </span>

          <CardBox style={{ textAlign: "center", marginBottom: 16 }}>
            {/* Icon */}
            <div style={{ width: 72, height: 72, borderRadius: R.xl, background: C.blueLight, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <span style={{ fontSize: 36 }}>{getCardEmoji(current.text)}</span>
            </div>

            {/* Play button */}
            <button onClick={playAudio} style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: speaking ? C.blue : C.blueLight,
              border: "none", color: speaking ? "#fff" : C.blue,
              padding: "14px 28px", cursor: "pointer", fontSize: 15, fontWeight: 600,
              borderRadius: R.full, marginBottom: 24, fontFamily: font,
              transition: "all 0.2s",
              boxShadow: speaking ? "0 4px 16px rgba(0,102,255,0.3)" : "none",
            }}>
              <Icon d={speaking ? Icons.speaker : Icons.play} size={18} stroke="currentColor" />
              {speaking ? "Reproduzindo..." : "Ouvir frase"}
            </button>

            {!flipped ? (
              <div>
                <div style={{ fontSize: 13, color: C.light, marginBottom: 14, fontWeight: 500 }}>Ouça e tente lembrar a frase</div>
                <Btn onClick={() => { setFlipped(true); setExplanation(generateExplanation(current.text)); }} variant="secondary">
                  Revelar frase
                </Btn>
              </div>
            ) : (
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.6, marginBottom: 14, padding: "16px", background: C.blueLight, borderRadius: R.md, color: C.dark }}>
                  {current.text}
                </div>
                {explanation && (
                  <div style={{ fontSize: 13, lineHeight: 1.9, color: C.mid, whiteSpace: "pre-wrap", background: C.goldLight, padding: "14px", borderRadius: R.md, borderLeft: `3px solid #FFD166` }}>
                    {explanation}
                  </div>
                )}
              </div>
            )}
          </CardBox>

          {flipped && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
              <Btn onClick={() => handleResult(false)} variant="outline">← Praticar</Btn>
              <Btn onClick={() => handleResult(true)}>Já sei →</Btn>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 4px", fontSize: 13, fontWeight: 600 }}>
            <span style={{ color: C.green }}>✓ {sessionScore.correct}</span>
            <span style={{ color: C.mid }}>{sessionIdx}/{sessionCards.length}</span>
            <span style={{ color: C.coral }}>↺ {sessionScore.wrong}</span>
          </div>
        </Wrap>
      </Page>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // QUIZ KNM
  // ─────────────────────────────────────────────────────────────────────────────
  if (screen === "quiz") {
    const PURPLE = "#7B2D8B";
    const PURPLE_LIGHT = "#F3E5F5";
    const cats = ["all", ...Array.from(new Set(KNM_QUESTIONS.map(q => q.cat)))];
    const catLabels = { all: "Todos os temas", Saude: "Saude", Educacao: "Educacao", Trabalho: "Trabalho", Governo: "Governo", Habitacao: "Habitacao", Transporte: "Transporte", Cultura: "Cultura", Integracao: "Integracao", Servicos: "Servicos" };

    // Category picker screen
    if (!quizDone && quizQuestions.length === 0) {
      return (
        <Page>
          <SaveModal {...saveModalProps} />
          <Wrap>
            <AppHeader title="Quiz KNM" subtitle="Conhecimento da Holanda" onBack={() => handleTabChange("praticar")} onSave={openSave} />
            <p style={{ fontSize: 14, color: C.mid, marginBottom: 20, lineHeight: 1.6 }}>Escolha um tema ou pratique todos juntos:</p>
            <div style={{ display: "grid", gap: 10 }}>
              {cats.map(cat => (
                <button key={cat} onClick={() => startQuiz(cat)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: C.white, border: `1.5px solid ${cat === "all" ? PURPLE : C.light}`, borderRadius: R.lg, padding: "16px 18px", cursor: "pointer", fontFamily: font, textAlign: "left", boxShadow: shadow.sm }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: cat === "all" ? PURPLE : C.dark }}>{catLabels[cat]}</div>
                    <div style={{ fontSize: 12, color: C.mid }}>{cat === "all" ? `${KNM_QUESTIONS.length} perguntas` : `${KNM_QUESTIONS.filter(q => q.cat === cat).length} perguntas`}</div>
                  </div>
                  <Icon d={Icons.arrowRight} size={18} stroke={cat === "all" ? PURPLE : C.mid} />
                </button>
              ))}
            </div>
          </Wrap>
          <BottomNav tab={tab} setTab={handleTabChange} />
        </Page>
      );
    }

    // Done screen
    if (quizDone) {
      const pct = Math.round((quizScore / quizQuestions.length) * 100);
      return (
        <Page>
          <SaveModal {...saveModalProps} />
          <Wrap style={{ paddingTop: 48, textAlign: "center" }}>
            <div style={{ width: 80, height: 80, borderRadius: R.full, background: pct >= 70 ? C.greenLight : PURPLE_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <Icon d={pct >= 70 ? Icons.trophy : Icons.target} size={40} stroke={pct >= 70 ? C.green : PURPLE} />
            </div>
            <div style={{ fontSize: 11, letterSpacing: 2, color: PURPLE, fontWeight: 700, marginBottom: 8, textTransform: "uppercase" }}>Quiz KNM</div>
            <div style={{ fontSize: 68, fontWeight: 700, color: C.dark, marginBottom: 4 }}>{pct}%</div>
            <div style={{ fontSize: 16, color: C.mid, marginBottom: 8 }}>{quizScore} de {quizQuestions.length} corretas</div>
            <div style={{ fontSize: 14, color: C.mid, marginBottom: 40 }}>{pct >= 80 ? "Excelente! Voce esta pronto para o KNM!" : pct >= 60 ? "Bom resultado! Continue praticando." : "Continue estudando — voce consegue!"}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Btn onClick={() => { setQuizQuestions([]); setQuizDone(false); }} style={{ background: PURPLE, boxShadow: "none" }} icon={Icons.repeat}>Escolher outro tema</Btn>
              <Btn onClick={() => startQuiz(quizCat)} variant="secondary" icon={Icons.repeat}>Repetir este quiz</Btn>
              <Btn onClick={() => handleTabChange("home")} variant="secondary" icon={Icons.home}>Home</Btn>
            </div>
          </Wrap>
          <BottomNav tab={tab} setTab={handleTabChange} />
        </Page>
      );
    }

    // Question screen
    const qn = quizQuestions[quizIdx];
    const answered = quizSelected !== null;
    const correct = quizSelected === qn.a;
    const progress = ((quizIdx) / quizQuestions.length) * 100;

    return (
      <Page>
        <SaveModal {...saveModalProps} />
        <Wrap style={{ paddingBottom: answered ? 90 : 40 }}>
          <AppHeader title="Quiz KNM" subtitle={`${quizIdx + 1} / ${quizQuestions.length}`} onBack={() => { setQuizQuestions([]); setQuizDone(false); }} onSave={openSave} />

          {/* Progress */}
          <div style={{ height: 4, background: C.light, borderRadius: R.full, marginBottom: 16, overflow: "hidden" }}>
            <div style={{ height: 4, width: `${progress}%`, background: PURPLE, borderRadius: R.full, transition: "width 0.3s" }} />
          </div>

          {/* Category badge */}
          <span style={{ background: PURPLE_LIGHT, color: PURPLE, padding: "4px 12px", borderRadius: R.full, fontSize: 11, fontWeight: 600, display: "inline-block", marginBottom: 16 }}>
            {catLabels[qn.cat]}
          </span>

          {/* Question */}
          <CardBox style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 17, fontWeight: 600, color: C.dark, lineHeight: 1.6 }}>{qn.q}</div>
          </CardBox>

          {/* Options */}
          <div style={{ display: "grid", gap: 10, marginBottom: 16 }}>
            {qn.opts.map((opt, i) => {
              let bg = C.white, border = C.light, color = C.dark;
              if (answered) {
                if (i === qn.a) { bg = C.greenLight; border = C.green; color = C.green; }
                else if (i === quizSelected && !correct) { bg = "#FFF0F3"; border = C.coral; color = C.coral; }
              }
              return (
                <button key={i} onClick={() => { if (!answered) setQuizSelected(i); }}
                  style={{ textAlign: "left", padding: "14px 16px", background: bg, border: `1.5px solid ${border}`, borderRadius: R.md, cursor: answered ? "default" : "pointer", fontFamily: font, display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: R.full, background: answered && i === qn.a ? C.green : answered && i === quizSelected && !correct ? C.coral : "#F0F0F0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 13, fontWeight: 700, color: answered && (i === qn.a || i === quizSelected) ? "#fff" : C.mid }}>
                    {answered && i === qn.a ? "✓" : answered && i === quizSelected && !correct ? "✗" : ["A","B","C","D"][i]}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 500, color }}>{opt}</div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {answered && (
            <div style={{ background: correct ? C.greenLight : "#FFF8E7", borderRadius: R.md, padding: "14px 16px", marginBottom: 16, borderLeft: `4px solid ${correct ? C.green : C.gold}` }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: correct ? C.green : C.gold, marginBottom: 8, textTransform: "uppercase" }}>{correct ? "Correto!" : "Explicacao"}</div>
              <div style={{ fontSize: 13, color: C.dark, lineHeight: 1.7, marginBottom: 8 }}>{qn.exp}</div>
              {qn.expPt && (
                <div style={{ fontSize: 13, color: C.mid, lineHeight: 1.7, borderTop: `1px solid ${correct ? "#C8E6C9" : "#FFE082"}`, paddingTop: 8, fontStyle: "italic" }}>
                  🇧🇷 {qn.expPt}
                </div>
              )}
            </div>
          )}

          {/* Next — fixed at bottom */}
          {answered && (
            <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "12px 16px", paddingBottom: "calc(12px + env(safe-area-inset-bottom))", background: C.white, borderTop: `1px solid ${C.light}`, zIndex: 50 }}>
              <Btn onClick={() => {
                const newScore = quizScore + (correct ? 1 : 0);
                if (quizIdx + 1 >= quizQuestions.length) {
                  setQuizScore(newScore);
                  setQuizDone(true);
                } else {
                  setQuizScore(newScore);
                  setQuizIdx(i => i + 1);
                  setQuizSelected(null);
                }
              }} style={{ width: "100%", background: PURPLE, boxShadow: "none" }}>
                {quizIdx + 1 >= quizQuestions.length ? "Ver resultado" : "Proxima pergunta →"}
              </Btn>
            </div>
          )}

          {/* Score */}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 4px", fontSize: 13, fontWeight: 600, marginTop: 8 }}>
            <span style={{ color: C.green }}>✓ {quizScore}</span>
            <span style={{ color: C.mid }}>{quizIdx}/{quizQuestions.length}</span>
            <span style={{ color: C.coral }}>✗ {quizIdx - quizScore}</span>
          </div>
        </Wrap>
        <BottomNav tab={tab} setTab={handleTabChange} />
      </Page>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // PRATICA DO DIA SCREEN
  // ─────────────────────────────────────────────────────────────────────────────
  if (screen === "pratica") {
    const typeLabels = { flashcard: "Flashcard", escuta: "Escuta", quiz: "Quiz KNM", leitura: "Leitura" };
    const typeColors = { flashcard: C.coral, escuta: C.blue, quiz: "#7B2D8B", leitura: "#673AB7" };
    const typeBgs = { flashcard: C.coralLight, escuta: C.blueLight, quiz: "#F3E5F5", leitura: "#EDE7F6" };
    const typeIcons = { flashcard: Icons.cards, escuta: Icons.headphones, quiz: Icons.target, leitura: Icons.book };

    // Done screen
    if (praticaDone) {
      const totalItems = praticaItems.length;
      const totalCorrect = Object.values(praticaScore).reduce((s, [c]) => s + c, 0);
      const totalAnswered = Object.values(praticaScore).reduce((s, [c, w]) => s + c + w, 0);
      const pct = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 100;
      return (
        <Page>
          <SaveModal {...saveModalProps} />
          <Wrap style={{ paddingTop: 48, textAlign: "center" }}>
            <div style={{ width: 80, height: 80, background: pct >= 80 ? C.greenLight : pct >= 60 ? C.goldLight : C.coralLight, borderRadius: R.full, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}><Icon d={pct >= 80 ? Icons.trophy : pct >= 60 ? Icons.star : Icons.zap} size={40} stroke={pct >= 80 ? C.green : pct >= 60 ? C.gold : C.coral} /></div>
            <div style={{ fontSize: 11, letterSpacing: 2, color: C.coral, fontWeight: 700, marginBottom: 8, textTransform: "uppercase" }}>Pratica do Dia</div>
            <div style={{ fontSize: 64, fontWeight: 700, color: C.dark, marginBottom: 4 }}>{pct}%</div>
            <div style={{ fontSize: 16, color: C.mid, marginBottom: 24 }}>{totalCorrect} de {totalAnswered} corretas</div>

            {/* Breakdown por tipo */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 32, textAlign: "left" }}>
              {Object.entries(praticaScore).map(([type, [c, w]]) => {
                if (c + w === 0) return null;
                return (
                  <div key={type} style={{ background: typeBgs[type], borderRadius: R.lg, padding: "14px" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: typeColors[type], textTransform: "uppercase", marginBottom: 4 }}>{typeLabels[type]}</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: C.dark }}>{Math.round((c/(c+w))*100)}%</div>
                    <div style={{ fontSize: 11, color: C.mid }}>{c}/{c+w} corretas</div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Btn onClick={startPraticaDoDia} icon={Icons.repeat}>Nova sessao</Btn>
              <Btn onClick={() => handleTabChange("home")} variant="secondary" icon={Icons.home}>Voltar ao Home</Btn>
            </div>
          </Wrap>
          <BottomNav tab={tab} setTab={handleTabChange} />
        </Page>
      );
    }

    const item = praticaItems[praticaIdx];
    if (!item) return null;
    const progPct = (praticaIdx / praticaItems.length) * 100;
    const color = typeColors[item.type];
    const bg = typeBgs[item.type];

    const markScore = (correct) => {
      setPraticaScore(s => {
        const [c, w] = s[item.type];
        return { ...s, [item.type]: correct ? [c+1, w] : [c, w+1] };
      });
    };

    const goNext = () => {
      setPraticaAnswered(false);
      setPraticaSelected(null);
      setPraticaAudioReady(false);
      setPraticaSpeaking(false);
      setDragX(0);
      setExplanation(null);
      if (praticaIdx + 1 >= praticaItems.length) {
        setPraticaDone(true); setProgress(p => ({ ...p, praticaDate: getToday() }));
        setProgress(p => ({ ...p, praticaDate: getToday() }));
      } else {
        setPraticaIdx(i => i + 1);
      }
    };

    return (
      <Page>
        <SaveModal {...saveModalProps} />
        <Wrap style={{ paddingBottom: praticaAnswered ? 90 : 40 }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0 12px" }}>
            <button onClick={goBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              <Icon d={Icons.back} size={22} stroke={C.mid} />
            </button>
            <span style={{ background: bg, color, padding: "4px 14px", borderRadius: R.full, fontSize: 12, fontWeight: 700 }}>
              {typeLabels[item.type]}
            </span>
            <span style={{ fontSize: 13, color: C.mid, fontWeight: 600 }}>{praticaIdx + 1}/{praticaItems.length}</span>
          </div>

          {/* Progress bar */}
          <div style={{ height: 4, background: C.light, borderRadius: R.full, marginBottom: 20, overflow: "hidden" }}>
            <div style={{ height: 4, width: `${progPct}%`, background: color, borderRadius: R.full, transition: "width 0.3s" }} />
          </div>

          {/* ── FLASHCARD item ── */}
          {item.type === "flashcard" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, opacity: 0.5 }}>
                <span style={{ fontSize: 12, color: C.coral, fontWeight: 600 }}>← Praticar</span>
                <span style={{ fontSize: 12, color: C.green, fontWeight: 600 }}>Já sei →</span>
              </div>
              <div
                onMouseDown={e => { if (!praticaAnswered) { dragStartX.current = e.clientX; setIsDragging(true); } }}
                onMouseMove={e => { if (isDragging && !praticaAnswered) setDragX(e.clientX - dragStartX.current); }}
                onMouseUp={() => {
                  if (!praticaAnswered) {
                    if (dragX > 80) { markScore(true); setProgress(p => applyResult(p, item.card.id, true)); setTimeout(() => { setPraticaAnswered(false); setPraticaSelected(null); setDragX(0); setExplanation(null); setPraticaIdx(i => i + 1 >= praticaItems.length ? i : i + 1); if (praticaIdx + 1 >= praticaItems.length) setPraticaDone(true); setProgress(p => ({ ...p, praticaDate: getToday() })); }, 300); }
                    else if (dragX < -80) { markScore(false); setProgress(p => applyResult(p, item.card.id, false)); setTimeout(() => { setPraticaAnswered(false); setPraticaSelected(null); setDragX(0); setExplanation(null); setPraticaIdx(i => i + 1 >= praticaItems.length ? i : i + 1); if (praticaIdx + 1 >= praticaItems.length) setPraticaDone(true); setProgress(p => ({ ...p, praticaDate: getToday() })); }, 300); }
                    else if (Math.abs(dragX) < 5 && !explanation) setExplanation(generateExplanation(item.card.text));
                  }
                  setDragX(0); setIsDragging(false); dragStartX.current = null;
                }}
                onMouseLeave={() => { setDragX(0); setIsDragging(false); dragStartX.current = null; }}
                onTouchStart={e => { if (!praticaAnswered) { dragStartX.current = e.touches[0].clientX; setIsDragging(true); } }}
                onTouchMove={e => { if (isDragging && !praticaAnswered) setDragX(e.touches[0].clientX - dragStartX.current); }}
                onTouchEnd={() => {
                  if (!praticaAnswered) {
                    if (dragX > 80) { markScore(true); setProgress(p => applyResult(p, item.card.id, true)); setTimeout(() => { setPraticaAnswered(false); setPraticaSelected(null); setDragX(0); setExplanation(null); setPraticaIdx(i => i + 1 >= praticaItems.length ? i : i + 1); if (praticaIdx + 1 >= praticaItems.length) setPraticaDone(true); setProgress(p => ({ ...p, praticaDate: getToday() })); }, 300); }
                    else if (dragX < -80) { markScore(false); setProgress(p => applyResult(p, item.card.id, false)); setTimeout(() => { setPraticaAnswered(false); setPraticaSelected(null); setDragX(0); setExplanation(null); setPraticaIdx(i => i + 1 >= praticaItems.length ? i : i + 1); if (praticaIdx + 1 >= praticaItems.length) setPraticaDone(true); setProgress(p => ({ ...p, praticaDate: getToday() })); }, 300); }
                  }
                  setDragX(0); setIsDragging(false); dragStartX.current = null;
                }}
                style={{
                  background: C.dark, borderRadius: R.xl, padding: "28px 24px", minHeight: 180, marginBottom: 16,
                  position: "relative", userSelect: "none", touchAction: "none",
                  transform: `translateX(${dragX}px) rotate(${dragX * 0.03}deg)`,
                  transition: isDragging ? "none" : "transform 0.25s",
                  boxShadow: dragX > 20 ? "0 8px 32px rgba(0,138,5,0.3)" : dragX < -20 ? "0 8px 32px rgba(255,56,92,0.3)" : "0 4px 24px rgba(0,0,0,0.2)",
                }}>
                {dragX > 20 && <div style={{ position: "absolute", top: 16, left: 16, background: C.green, color: "#fff", fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: R.full }}>Já sei ✓</div>}
                {dragX < -20 && <div style={{ position: "absolute", top: 16, right: 16, background: C.coral, color: "#fff", fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: R.full }}>Praticar</div>}
                <div style={{ position: "absolute", top: 14, right: 18, fontSize: 11, color: "rgba(255,255,255,0.25)" }}>#{item.card.id + 1}</div>
                <div style={{ width: 48, height: 48, borderRadius: R.lg, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <span style={{ fontSize: 24 }}>{getCardEmoji(item.card.text)}</span>
                </div>
                <p style={{ fontSize: 17, lineHeight: 1.65, margin: 0, textAlign: "center", fontWeight: 500, color: "#fff" }}>{item.card.text}</p>
                {!explanation && <div style={{ marginTop: 16, fontSize: 12, color: "rgba(255,255,255,0.35)", textAlign: "center" }}>Toque para ver dica</div>}
                {explanation && <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.15)", fontSize: 13, lineHeight: 1.8, color: "rgba(255,255,255,0.75)", whiteSpace: "pre-wrap" }}>{explanation}</div>}
              </div>
            </div>
          )}

          {/* ── ESCUTA item ── */}
          {item.type === "escuta" && (
            <div>
              <div style={{ background: C.white, borderRadius: R.xl, padding: "28px 24px", marginBottom: 16, textAlign: "center", boxShadow: shadow.card }}>
                <span style={{ fontSize: 40, display: "block", marginBottom: 16 }}>{getCardEmoji(item.card.text)}</span>
                <button onClick={() => {
                  if (praticaSpeaking) { window.speechSynthesis.cancel(); setPraticaSpeaking(false); return; }
                  setPraticaSpeaking(true);
                  playDutchAudio(item.card.text, item.card.id, 0.75, () => setPraticaSpeaking(false));
                }} style={{ background: praticaSpeaking ? C.coralLight : C.blueLight, border: "none", borderRadius: R.full, width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", margin: "0 auto 12px" }}>
                  <Icon d={praticaSpeaking ? Icons.close : Icons.speaker} size={28} stroke={praticaSpeaking ? C.coral : C.blue} />
                </button>
                <div style={{ fontSize: 13, color: C.mid, marginBottom: praticaAudioReady ? 14 : 0 }}>
                  {praticaSpeaking ? "Ouvindo..." : "Toque para ouvir"}
                </div>
                {/* Reveal button */}
                {!praticaAudioReady && !praticaSpeaking && (
                  <button onClick={() => setPraticaAudioReady(true)} style={{ background: "none", border: `1px dashed ${C.light}`, borderRadius: R.md, padding: "8px 16px", cursor: "pointer", fontSize: 12, color: C.mid, fontFamily: font, marginTop: 8 }}>
                    Revelar frase
                  </button>
                )}
                {praticaAudioReady && (
                  <div style={{ marginTop: 4 }}>
                    <div style={{ fontSize: 16, fontWeight: 600, color: C.dark, marginBottom: 8 }}>{item.card.text}</div>
                    {(() => {
                      const exp = generateExplanation(item.card.text);
                      const transl = exp.split("\n").find(l => l && !l.startsWith("TRADUCAO") && !l.startsWith("EXEMPLOS") && !l.startsWith("COMPLETE"));
                      return transl ? <div style={{ fontSize: 13, color: C.mid, fontStyle: "italic" }}>🇧🇷 {transl}</div> : null;
                    })()}
                  </div>
                )}
              </div>
              {praticaAudioReady && !praticaAnswered && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <button onClick={() => { markScore(false); setPraticaAnswered(true); setProgress(p => applyResult(p, item.card.id, false)); }} style={{ background: "#FFF0F3", border: `2px solid ${C.coral}`, borderRadius: R.lg, padding: "16px", cursor: "pointer", fontFamily: font, fontWeight: 700, color: C.coral, fontSize: 15 }}>Nao entendi</button>
                  <button onClick={() => { markScore(true); setPraticaAnswered(true); setProgress(p => applyResult(p, item.card.id, true)); }} style={{ background: C.greenLight, border: `2px solid ${C.green}`, borderRadius: R.lg, padding: "16px", cursor: "pointer", fontFamily: font, fontWeight: 700, color: C.green, fontSize: 15 }}>Entendi!</button>
                </div>
              )}
            </div>
          )}

          {/* ── QUIZ item ── */}
          {item.type === "quiz" && (
            <div>
              <CardBox style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 16, fontWeight: 600, color: C.dark, lineHeight: 1.6 }}>{item.q.q}</div>
              </CardBox>
              <div style={{ display: "grid", gap: 8, marginBottom: 12 }}>
                {item.q.opts.map((opt, i) => {
                  let bg2 = C.white, brd = C.light, col = C.dark;
                  if (praticaAnswered) {
                    if (i === item.q.a) { bg2 = C.greenLight; brd = C.green; col = C.green; }
                    else if (i === praticaSelected && i !== item.q.a) { bg2 = "#FFF0F3"; brd = C.coral; col = C.coral; }
                  }
                  return (
                    <button key={i} onClick={() => { if (!praticaAnswered) { setPraticaSelected(i); markScore(i === item.q.a); setPraticaAnswered(true); } }}
                      style={{ textAlign: "left", padding: "13px 16px", background: bg2, border: `1.5px solid ${brd}`, borderRadius: R.md, cursor: praticaAnswered ? "default" : "pointer", fontFamily: font, display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 26, height: 26, borderRadius: R.full, background: praticaAnswered && i === item.q.a ? C.green : praticaAnswered && i === praticaSelected && i !== item.q.a ? C.coral : "#F0F0F0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 12, fontWeight: 700, color: praticaAnswered && (i === item.q.a || i === praticaSelected) ? "#fff" : C.mid }}>
                        {praticaAnswered && i === item.q.a ? "✓" : praticaAnswered && i === praticaSelected && i !== item.q.a ? "✗" : ["A","B","C","D"][i]}
                      </div>
                      <span style={{ fontSize: 14, color: col, fontWeight: 500 }}>{opt}</span>
                    </button>
                  );
                })}
              </div>
              {praticaAnswered && (
                <div style={{ background: praticaSelected === item.q.a ? C.greenLight : "#FFF8E7", borderRadius: R.md, padding: "12px 16px", borderLeft: `4px solid ${praticaSelected === item.q.a ? C.green : C.gold}` }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: praticaSelected === item.q.a ? C.green : C.gold, marginBottom: 4, textTransform: "uppercase" }}>{praticaSelected === item.q.a ? "Correto!" : "Explicacao"}</div>
                  <div style={{ fontSize: 13, color: C.dark, lineHeight: 1.6, marginBottom: 6 }}>{item.q.exp}</div>
                  <div style={{ fontSize: 12, color: C.mid, fontStyle: "italic", borderTop: `1px solid ${praticaSelected === item.q.a ? "#C8E6C9" : "#FFE082"}`, paddingTop: 6 }}>🇧🇷 {item.q.expPt}</div>
                </div>
              )}
            </div>
          )}

          {/* ── LEITURA item ── */}
          {item.type === "leitura" && (
            <div>
              <div style={{ background: C.white, borderRadius: R.lg, padding: "16px", marginBottom: 12, boxShadow: shadow.sm }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#673AB7", textTransform: "uppercase", marginBottom: 6 }}>{item.texto.cat} · {item.texto.title}</div>
                <pre style={{ fontFamily: font, fontSize: 13, lineHeight: 1.75, color: C.dark, whiteSpace: "pre-wrap", margin: 0 }}>{item.texto.text}</pre>
              </div>
              <CardBox style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: C.dark, lineHeight: 1.6 }}>{item.q.q}</div>
              </CardBox>
              <div style={{ display: "grid", gap: 8, marginBottom: 12 }}>
                {item.q.opts.map((opt, i) => {
                  let bg2 = C.white, brd = C.light, col = C.dark;
                  if (praticaAnswered) {
                    if (i === item.q.a) { bg2 = C.greenLight; brd = C.green; col = C.green; }
                    else if (i === praticaSelected && i !== item.q.a) { bg2 = "#FFF0F3"; brd = C.coral; col = C.coral; }
                  }
                  return (
                    <button key={i} onClick={() => { if (!praticaAnswered) { setPraticaSelected(i); markScore(i === item.q.a); setPraticaAnswered(true); } }}
                      style={{ textAlign: "left", padding: "13px 16px", background: bg2, border: `1.5px solid ${brd}`, borderRadius: R.md, cursor: praticaAnswered ? "default" : "pointer", fontFamily: font, display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 26, height: 26, borderRadius: R.full, background: praticaAnswered && i === item.q.a ? C.green : praticaAnswered && i === praticaSelected && i !== item.q.a ? C.coral : "#F0F0F0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 12, fontWeight: 700, color: praticaAnswered && (i === item.q.a || i === praticaSelected) ? "#fff" : C.mid }}>
                        {praticaAnswered && i === item.q.a ? "✓" : praticaAnswered && i === praticaSelected && i !== item.q.a ? "✗" : ["A","B","C","D"][i]}
                      </div>
                      <span style={{ fontSize: 14, color: col, fontWeight: 500 }}>{opt}</span>
                    </button>
                  );
                })}
              </div>
              {praticaAnswered && (
                <div style={{ background: praticaSelected === item.q.a ? C.greenLight : "#FFF8E7", borderRadius: R.md, padding: "12px 16px", borderLeft: `4px solid ${praticaSelected === item.q.a ? C.green : C.gold}` }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: praticaSelected === item.q.a ? C.green : C.gold, marginBottom: 4, textTransform: "uppercase" }}>{praticaSelected === item.q.a ? "Correto!" : "Resposta"}</div>
                  <div style={{ fontSize: 13, color: C.dark, lineHeight: 1.6, marginBottom: 6 }}>{item.q.exp}</div>
                  <div style={{ fontSize: 12, color: C.mid, fontStyle: "italic", borderTop: `1px solid ${praticaSelected === item.q.a ? "#C8E6C9" : "#FFE082"}`, paddingTop: 6 }}>🇧🇷 {item.q.expPt}</div>
                </div>
              )}
            </div>
          )}
        </Wrap>

        {/* Fixed next button */}
        {praticaAnswered && (
          <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "12px 16px", paddingBottom: "calc(12px + env(safe-area-inset-bottom))", background: C.white, borderTop: `1px solid ${C.light}`, zIndex: 50 }}>
            <Btn onClick={goNext} style={{ width: "100%" }}>
              {praticaIdx + 1 >= praticaItems.length ? "Ver resultado" : "Proxima →"}
            </Btn>
          </div>
        )}
      </Page>
    );
  }


  // ─────────────────────────────────────────────────────────────────────────────
  if (screen === "leitura") {
    const PURPLE = "#673AB7";
    const PURPLE_LIGHT = "#EDE7F6";

    // Done screen
    if (leituaDone) {
      const total = leituraTextos.reduce((s, t) => s + t.questions.length, 0);
      const pct = Math.round((leituraScore / total) * 100);
      return (
        <Page>
          <SaveModal {...saveModalProps} />
          <Wrap style={{ paddingTop: 48, textAlign: "center" }}>
            <div style={{ width: 80, height: 80, borderRadius: R.full, background: pct >= 70 ? C.greenLight : PURPLE_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <Icon d={pct >= 70 ? Icons.trophy : Icons.book} size={40} stroke={pct >= 70 ? C.green : PURPLE} />
            </div>
            <div style={{ fontSize: 11, letterSpacing: 2, color: PURPLE, fontWeight: 700, marginBottom: 8, textTransform: "uppercase" }}>Leitura</div>
            <div style={{ fontSize: 68, fontWeight: 700, color: C.dark, marginBottom: 4 }}>{pct}%</div>
            <div style={{ fontSize: 16, color: C.mid, marginBottom: 8 }}>{leituraScore} de {total} corretas</div>
            <div style={{ fontSize: 14, color: C.mid, marginBottom: 40 }}>{pct >= 80 ? "Excelente compreensao!" : pct >= 60 ? "Bom resultado! Continue praticando." : "Continue lendo — voce melhora!"}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Btn onClick={startLeitura} style={{ background: PURPLE, boxShadow: "none" }} icon={Icons.repeat}>Novos textos</Btn>
              <Btn onClick={() => handleTabChange("praticar")} variant="secondary">Voltar ao Praticar</Btn>
            </div>
          </Wrap>
          <BottomNav tab={tab} setTab={handleTabChange} />
        </Page>
      );
    }

    const texto = leituraTextos[leituraIdx];
    if (!texto) return null;
    const q = texto.questions[leituraQIdx];
    const answered = leituraSelected !== null;
    const correct = leituraSelected === q.a;
    const totalQ = leituraTextos.reduce((s, t) => s + t.questions.length, 0);
    const doneQ = leituraTextos.slice(0, leituraIdx).reduce((s, t) => s + t.questions.length, 0) + leituraQIdx;
    const progPct = (doneQ / totalQ) * 100;
    const isLastQ = leituraQIdx === texto.questions.length - 1;
    const isLastText = leituraIdx === leituraTextos.length - 1;

    const goNext = () => {
      const newScore = leituraScore + (correct ? 1 : 0);
      if (!isLastQ) {
        setLeituraScore(newScore);
        setLeituraQIdx(i => i + 1);
        setLeituraSelected(null);
      } else if (!isLastText) {
        setLeituraScore(newScore);
        setLeituraIdx(i => i + 1);
        setLeituraQIdx(0);
        setLeituraSelected(null);
      } else {
        setLeituraScore(newScore);
        setLeituraDone(true);
      }
    };

    return (
      <Page>
        <SaveModal {...saveModalProps} />
        <Wrap style={{ paddingBottom: answered ? 90 : 40 }}>
          <AppHeader title="Leitura" subtitle={`Texto ${leituraIdx + 1} de ${leituraTextos.length}`} onBack={goBack} onSave={openSave} />

          {/* Progress */}
          <div style={{ height: 4, background: C.light, borderRadius: R.full, marginBottom: 16, overflow: "hidden" }}>
            <div style={{ height: 4, width: `${progPct}%`, background: PURPLE, borderRadius: R.full, transition: "width 0.3s" }} />
          </div>

          {/* Category + title */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span style={{ background: PURPLE_LIGHT, color: PURPLE, padding: "4px 12px", borderRadius: R.full, fontSize: 11, fontWeight: 600 }}>{texto.cat}</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: C.dark }}>{texto.title}</span>
          </div>

          {/* Text */}
          <div style={{ background: C.white, borderRadius: R.lg, padding: "18px 16px", marginBottom: 16, boxShadow: shadow.sm }}>
            <pre style={{ fontFamily: font, fontSize: 14, lineHeight: 1.8, color: C.dark, whiteSpace: "pre-wrap", margin: 0 }}>{texto.text}</pre>
          </div>

          {/* Question */}
          <div style={{ fontSize: 11, fontWeight: 700, color: PURPLE, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>
            Pergunta {leituraQIdx + 1} de {texto.questions.length}
          </div>
          <CardBox style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: C.dark, lineHeight: 1.6 }}>{q.q}</div>
          </CardBox>

          {/* Options */}
          <div style={{ display: "grid", gap: 8, marginBottom: 16 }}>
            {q.opts.map((opt, i) => {
              let bg = C.white, border = C.light, color = C.dark;
              if (answered) {
                if (i === q.a) { bg = C.greenLight; border = C.green; color = C.green; }
                else if (i === leituraSelected && !correct) { bg = "#FFF0F3"; border = C.coral; color = C.coral; }
              }
              return (
                <button key={i} onClick={() => { if (!answered) setLeituraSelected(i); }}
                  style={{ textAlign: "left", padding: "13px 16px", background: bg, border: `1.5px solid ${border}`, borderRadius: R.md, cursor: answered ? "default" : "pointer", fontFamily: font, display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 26, height: 26, borderRadius: R.full, background: answered && i === q.a ? C.green : answered && i === leituraSelected && !correct ? C.coral : "#F0F0F0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 12, fontWeight: 700, color: answered && (i === q.a || i === leituraSelected) ? "#fff" : C.mid }}>
                    {answered && i === q.a ? "✓" : answered && i === leituraSelected && !correct ? "✗" : ["A","B","C","D"][i]}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 500, color }}>{opt}</div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {answered && (
            <div style={{ background: correct ? C.greenLight : "#FFF8E7", borderRadius: R.md, padding: "14px 16px", marginBottom: 16, borderLeft: `4px solid ${correct ? C.green : C.gold}` }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: correct ? C.green : C.gold, marginBottom: 6, textTransform: "uppercase" }}>{correct ? "Correto!" : "Resposta"}</div>
              <div style={{ fontSize: 13, color: C.dark, lineHeight: 1.7, marginBottom: 8 }}>{q.exp}</div>
              <div style={{ fontSize: 13, color: C.mid, lineHeight: 1.7, borderTop: `1px solid ${correct ? "#C8E6C9" : "#FFE082"}`, paddingTop: 8, fontStyle: "italic" }}>
                🇧🇷 {q.expPt}
              </div>
            </div>
          )}

          {/* Score */}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 4px", fontSize: 13, fontWeight: 600 }}>
            <span style={{ color: C.green }}>✓ {leituraScore}</span>
            <span style={{ color: C.mid }}>{doneQ}/{totalQ}</span>
            <span style={{ color: C.coral }}>✗ {doneQ - leituraScore}</span>
          </div>
        </Wrap>

        {/* Fixed next button */}
        {answered && (
          <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "12px 16px", paddingBottom: "calc(12px + env(safe-area-inset-bottom))", background: C.white, borderTop: `1px solid ${C.light}`, zIndex: 50 }}>
            <Btn onClick={goNext} style={{ width: "100%", background: PURPLE, boxShadow: "none" }}>
              {isLastQ && isLastText ? "Ver resultado" : isLastQ ? `Proximo texto →` : "Proxima pergunta →"}
            </Btn>
          </div>
        )}
      </Page>
    );
  }

  return <Page><Wrap style={{ paddingTop: 40, textAlign: "center" }}><Btn onClick={() => setScreen("dashboard")} variant="secondary">← Dashboard</Btn></Wrap></Page>;
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(NT2Simulator));
