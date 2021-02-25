export default async function fetcher(url: string) {
	const blob = await fetch(url);

	return await blob.json()
}
