import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv'

dotenv.config()

@Injectable()
export class UnsplashService {
    private readonly UNSPLASH_URL = 'https://api.unsplash.com/search/photos';
    private readonly UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

    async fetchPhotos(spot: string): Promise<{ imageUrl: string; author: {firstName: string; lastName: string} }> {
        const enhancedUrl = `${spot} beach`
        const url = `${this.UNSPLASH_URL}?query=${encodeURIComponent(enhancedUrl)}&client_id=${this.UNSPLASH_ACCESS_KEY}`
        const response = await axios.get(url);

        if(!response || !response.data.results.length) {
            return {
                imageUrl: 'https://via.placeholder.com/800x400?text=No+Image+Available',
                author: { firstName: 'N/A', lastName: 'N/A' }
            }
        };
        
        const result = response.data.results[0];
        const imageUrl = result?.urls?.regular || 'https://via.placeholder.com/800x400?text=No+Image+Available';
        const author = {
            firstName: result?.user?.first_name || 'Unknown',
            lastName: result?.user?.last_name || '',
        };
        
        return { imageUrl, author };
        
    }
}
