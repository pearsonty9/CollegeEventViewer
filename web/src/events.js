const events = [
	{
		"name": "Oliver Potter",
		"university": "Cursus Et Company",
		"rso": "Aliquam Adipiscing Lobortis Associates",
		"description": "id, ante. Nunc mauris sapien, cursus in, hendrerit consectetuer, cursus et, magna. Praesent",
		"location": "P.O. Box 422, 8072 Nibh. Rd.",
		"time": "12:21 PM"
	},
	{
		"name": "Aristotle Boone",
		"university": "Torquent Per Conubia Limited",
		"rso": "Dignissim Tempor Arcu Ltd",
		"description": "egestas. Sed pharetra, felis eget varius ultrices, mauris ipsum porta elit, a feugiat tellus lorem",
		"location": "463-5797 Convallis St.",
		"time": "1:23 PM"
	},
	{
		"name": "Margaret Rhodes",
		"university": "Amet Ultricies Consulting",
		"rso": "Tempus Risus Donec LLP",
		"description": "eu, eleifend nec, malesuada ut, sem. Nulla interdum. Curabitur dictum. Phasellus in",
		"location": "Ap #243-8016 Vehicula Street",
		"time": "12:23 PM"
	},
	{
		"name": "Destiny Sweeney",
		"university": "Tellus Limited",
		"rso": "Eu Inc.",
		"description": "faucibus. Morbi vehicula. Pellentesque tincidunt tempus risus. Donec egestas. Duis ac arcu. Nunc mauris. Morbi non sapien",
		"location": "Ap #218-6907 Bibendum Ave",
		"time": "6:47 AM"
	},
	{
		"name": "Jackson Sutton",
		"university": "Aliquet Sem Institute",
		"rso": "Erat Vitae Industries",
		"description": "blandit at, nisi. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin",
		"location": "Ap #543-7151 Nam Avenue",
		"time": "3:07 PM"
	},
	{
		"name": "Stewart Sosa",
		"university": "Massa Limited",
		"rso": "Ac Mattis LLP",
		"description": "arcu ac orci. Ut semper pretium neque. Morbi quis urna. Nunc quis arcu vel quam dignissim pharetra. Nam",
		"location": "Ap #995-723 Sagittis. St.",
		"time": "11:49 PM"
	},
	{
		"name": "Len Rollins",
		"university": "Nunc Limited",
		"rso": "Fermentum Arcu Incorporated",
		"description": "varius ultrices, mauris ipsum porta elit, a feugiat tellus lorem eu metus. In lorem. Donec",
		"location": "709-9329 Sagittis St.",
		"time": "9:30 PM"
	},
	{
		"name": "Mollie Paul",
		"university": "Mollis Foundation",
		"rso": "Donec LLC",
		"description": "molestie. Sed id risus quis diam luctus lobortis. Class aptent taciti sociosqu ad litora torquent per conubia nostra,",
		"location": "P.O. Box 935, 4713 Dolor. St.",
		"time": "1:44 PM"
	},
	{
		"name": "Channing Finley",
		"university": "Nam Ligula Elit Institute",
		"rso": "Sem Nulla PC",
		"description": "Fusce aliquam, enim nec tempus scelerisque, lorem ipsum sodales purus, in molestie tortor nibh sit",
		"location": "3930 Dolor. Street",
		"time": "1:54 AM"
	},
	{
		"name": "Gay Holland",
		"university": "Ullamcorper Magna Industries",
		"rso": "Orci Sem Ltd",
		"description": "lobortis risus. In mi pede, nonummy ut, molestie in, tempus eu,",
		"location": "Ap #787-7136 Augue St.",
		"time": "8:03 PM"
	},
	{
		"name": "Karyn Zamora",
		"university": "Integer Tincidunt Company",
		"rso": "Lobortis Augue Institute",
		"description": "nibh lacinia orci, consectetuer euismod est arcu ac orci. Ut semper pretium neque. Morbi quis urna. Nunc quis",
		"location": "614-488 Magna. Rd.",
		"time": "12:50 PM"
	},
	{
		"name": "Indira Whitney",
		"university": "Duis Ac Institute",
		"rso": "Sit Foundation",
		"description": "felis. Donec tempor, est ac mattis semper, dui lectus rutrum urna, nec",
		"location": "Ap #355-8695 Proin Rd.",
		"time": "6:14 PM"
	},
	{
		"name": "Lacy Fry",
		"university": "Morbi Incorporated",
		"rso": "A Aliquet Vel Institute",
		"description": "placerat eget, venenatis a, magna. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam laoreet, libero et tristique pellentesque,",
		"location": "764-6737 Nibh Avenue",
		"time": "4:16 AM"
	},
	{
		"name": "Lucius Ayers",
		"university": "Aliquet Odio Etiam Associates",
		"rso": "Natoque Corp.",
		"description": "auctor. Mauris vel turpis. Aliquam adipiscing lobortis risus. In mi pede,",
		"location": "Ap #261-891 Cras Av.",
		"time": "4:49 PM"
	},
	{
		"name": "Channing Weber",
		"university": "Vel Arcu Foundation",
		"rso": "In Consequat Institute",
		"description": "Phasellus vitae mauris sit amet lorem semper auctor. Mauris vel turpis. Aliquam adipiscing lobortis risus. In mi pede, nonummy ut,",
		"location": "204-5531 Aliquam Avenue",
		"time": "3:46 PM"
	},
	{
		"name": "Alma Alston",
		"university": "Sociosqu Ad LLP",
		"rso": "Vulputate Velit Associates",
		"description": "ligula. Aliquam erat volutpat. Nulla dignissim. Maecenas ornare egestas ligula. Nullam feugiat placerat",
		"location": "Ap #718-774 Aliquam Av.",
		"time": "1:56 PM"
	},
	{
		"name": "Hadley Kerr",
		"university": "Ante Dictum Consulting",
		"rso": "Netus Et Malesuada PC",
		"description": "Cras interdum. Nunc sollicitudin commodo ipsum. Suspendisse non leo. Vivamus nibh dolor,",
		"location": "756-1739 Lorem, Street",
		"time": "12:47 AM"
	},
	{
		"name": "Selma Crane",
		"university": "Massa Vestibulum Ltd",
		"rso": "Mi Felis Adipiscing Foundation",
		"description": "Integer sem elit, pharetra ut, pharetra sed, hendrerit a, arcu. Sed et libero. Proin mi. Aliquam gravida",
		"location": "213-396 Donec St.",
		"time": "1:50 AM"
	},
	{
		"name": "Calvin Savage",
		"university": "In Condimentum LLC",
		"rso": "Erat Semper LLC",
		"description": "ipsum. Suspendisse non leo. Vivamus nibh dolor, nonummy ac, feugiat non, lobortis quis, pede. Suspendisse dui. Fusce",
		"location": "Ap #115-6456 Lectus. St.",
		"time": "1:23 AM"
	},
	{
		"name": "Hyatt Pierce",
		"university": "Est Ac PC",
		"rso": "Sed Pede Nec PC",
		"description": "neque sed dictum eleifend, nunc risus varius orci, in consequat enim diam vel arcu. Curabitur ut odio vel",
		"location": "2258 Mattis Road",
		"time": "6:29 PM"
	}
];

export default events;