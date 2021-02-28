export default interface IFeedback {
	id?: string
	createdAt: string;
	author: string;
	authorId: string;
	siteId: string
	provider: string;
	rating?: number;
	status: 'pending' | 'approved' | 'removed'
	text: string
}