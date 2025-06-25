function stripHTML(original: string | undefined): string | undefined {
	if (!original) return;
	else return original.replace(/(<([^>]+)>)/gi, '');
}

function truncateString(str: string | undefined, num: number): string | undefined {
	if (!str) return;

	if (str.length <= num) {
		return str;
	}

	return str.slice(0, num) + '...';
}

function truncateHTML(html: string | undefined, num: number): string | undefined {
	if (!html) return;
	return truncateString(stripHTML(html), num);
}

function isUrl(str: string): boolean {
    const pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
            '(www\\.)?' + // sub-domain
            '[a-z0-9\\-]+(\\.[a-z0-9\\-]+)+([/?].*)?$', // domain name
        'i'
    ); // fragment locator
    return !!pattern.test(str);
}

// Slugify a string for hyphens and underscores
function slugify(str: string | undefined): string | undefined {
	if (!str) return;
	return str
		.toString()
		.trim()
		.toLowerCase()
		.replace(/[^\w ]+/g, '')
		.replace(/ +/g, '-');
}

// Deslugify a string for hyphens and underscores and capitalize each word
function deslugify(str: string | undefined): string | undefined {
	if (!str) return;
	return str
		.trim()
		.toLowerCase()
		.replace(/[-_]+/g, ' ')
		.replace(/ +/g, ' ')
		.replace(/(^| )(\w)/g, (s) => s.toUpperCase());
}

function getDomainNameFromEmail(email: string): string {
	const temp = email.replace(/.*@/, '').split('.');
	return temp[temp.length - 2];
}

function toTitleCase(str: string | undefined): string | undefined {
	if (!str) return;
	return str.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}

function snakeToCamel(s: string): string {
	return s.replace(/(_\w)/g, function (m) {
		return m[1].toUpperCase();
	});
}

function convertIconName(name: string) {
	if (!name) return;
	// Convert the icon coming from the API to the name of the icon component
	// Directus uses Google Material Icons and the icon values are snake_case (e.g. "account_circle")
	const prefix = 'material-symbols:';
	// Change snake case to kebab case
	const kebabCase = name.replace(/_/g, '-');
	const iconName = prefix + kebabCase;
	return iconName;
}

function snakeToKebab(s: string): string {
	return s.replace(/(_\w)/g, function (m) {
		return '-' + m[1].toLowerCase();
	});
}

function maybePluralize(count: number, noun: string, suffix = 's'): string {
	return `${noun}${count !== 1 ? suffix : ''}`;
}

export {
	generateId,
	stripHTML,
	truncateHTML,
	truncateString,
	maybePluralize,
	toTitleCase,
	snakeToCamel,
	snakeToKebab,
	convertIconName,
	slugify,
	deslugify,
	getDomainNameFromEmail,
	calculateReadTime,
    isUrl,
};
