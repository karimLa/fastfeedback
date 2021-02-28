export default async function fetcher(url: string, token: string) {
	const blob = await fetch(url, {
		method: 'GET',
		headers: new Headers({ 'Content-Type': 'application/json', token }),
		credentials: 'same-origin'
	});

	return await blob.json()
}
