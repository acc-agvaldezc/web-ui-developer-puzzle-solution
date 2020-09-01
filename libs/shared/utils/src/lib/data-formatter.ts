import { Book, GoogleBookItem } from '@tmo/shared/models';

export function formatGoogleBookItem(item: GoogleBookItem): Book {
    return {
        id: item.id,
        title: item.volumeInfo?.title,
        authors: item.volumeInfo?.authors || [],
        description: item.searchInfo?.textSnippet,
        publisher: item.volumeInfo?.publisher,
        publishedDate: item.volumeInfo?.publishedDate
            ? new Date(item.volumeInfo?.publishedDate).toISOString()
            : undefined,
        coverUrl: item.volumeInfo?.imageLinks?.thumbnail
    }
}
