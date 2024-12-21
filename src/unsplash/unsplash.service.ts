import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class UnsplashService {
    private readonly UNSPLASH_URL = 'https://api.unsplash.com/search/photos';

    async fetchPhotos(spot: string): Promise<{ imageUrl: string }> {
        try {
            const response = await axios.get(this.UNSPLASH_URL, {
                params: { query: spot, per_page: 1 },
                headers: { Authorization: `CLIENT-ID ${process.env.UNSPLASH_ACCESS_KEY}` },
            });

            const imageUrl = response.data.results[0]?.urls?.regular || '';
            return { imageUrl };
        } catch (error) {
            console.error('Error fetching data from Unsplash.', error);
            throw new Error('Unable to fetch image.');
        }
    }
}
