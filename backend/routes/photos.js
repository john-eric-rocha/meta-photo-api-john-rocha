// Updated photos.js with safe data handling and API response checks
const express = require('express');
const router = express.Router();
const axios = require('axios');

// Base URLs for fetching data
const API_USERS = 'https://jsonplaceholder.typicode.com/users';
const API_ALBUMS = 'https://jsonplaceholder.typicode.com/albums';
const API_PHOTOS = 'https://jsonplaceholder.typicode.com/photos';

// GET /externalapi/photos
router.get('/', async (req, res) => {
    try {
        // Fetch data from external APIs
        const [usersRes, albumsRes, photosRes] = await Promise.all([
            axios.get(API_USERS),
            axios.get(API_ALBUMS),
            axios.get(API_PHOTOS)
        ]);

        let users = Array.isArray(usersRes.data) ? usersRes.data : [];
        let albums = Array.isArray(albumsRes.data) ? albumsRes.data : [];
        let photos = Array.isArray(photosRes.data) ? photosRes.data : [];

        // Filtering
        const { title, 'album.title': albumTitle, 'album.user.email': userEmail, limit = 25, offset = 0 } = req.query;

        if (title) {
            photos = photos.filter(photo => photo.title.toLowerCase().includes(title.toLowerCase()));
        }

        if (albumTitle) {
            albums = albums.filter(album => album.title.toLowerCase().includes(albumTitle.toLowerCase()));
            photos = photos.filter(photo => albums.some(album => album.id === photo.albumId));
        }

        if (userEmail) {
            users = users.filter(user => user.email.toLowerCase() === userEmail.toLowerCase());
            albums = albums.filter(album => users.some(user => user.id === album.userId));
            photos = photos.filter(photo => albums.some(album => album.id === photo.albumId));
        }

        // Enrich data
        const enrichedPhotos = photos.map(photo => {
            const album = albums.find(album => album.id === photo.albumId);
            const user = users.find(user => user.id === album?.userId);
            return {
                ...photo,
                album: album ? {
                    ...album,
                    user: user ? {
                        ...user,
                        address: user.address,
                        company: user.company
                    } : null
                } : null
            };
        });

        // Pagination
        const startIndex = parseInt(offset, 10) || 0;
        const endIndex = startIndex + parseInt(limit, 10) || 25;

        // Safely apply pagination
        const paginatedPhotos = Array.isArray(enrichedPhotos) ? enrichedPhotos.slice(startIndex, endIndex) : [];

        console.log('Paginated Photos:', paginatedPhotos.length); // Log the number of items
        res.json(paginatedPhotos);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ message: 'Error fetching data' });
    }
});

module.exports = router;
