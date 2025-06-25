export function getDomainName(url: string) {
	const urlParts = url.replace(/^https?:\/\//, '').split('/');
	const hostname = urlParts[0];
	const domain = hostname.replace(/^www\./, '');
	const domainParts = domain.split('.');
	if (domainParts.length < 2) return null; // not a valid domain

	if (domainParts.length > 2) {
		domainParts.shift(); // remove subdomain
	}

	return domainParts.join('.');
}
