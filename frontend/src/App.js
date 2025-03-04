
// Updated App.js with safe array handling and correct API URL
import React, { useEffect, useState } from 'react';
import PhotoList from './components/PhotoList';
import axios from 'axios';

const App = () => {
    const [photos, setPhotos] = useState([]);
    const [title, setTitle] = useState('');
    const [albumTitle, setAlbumTitle] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [limit, setLimit] = useState(25);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        fetchPhotos();
    }, [title, albumTitle, userEmail, limit, offset]);

    const fetchPhotos = async () => {
        try {
            // Ensure limit and offset are valid numbers with fallback defaults
            const validLimit = limit && !isNaN(limit) && Number(limit) > 0 ? Number(limit) : 25;
            const validOffset = offset && !isNaN(offset) && Number(offset) >= 0 ? Number(offset) : 0;
    
            const response = await axios.get('https://meta-photo-api-john-rocha.onrender.com/externalapi/photos', {
                params: {
                    title: title || '',
                    'album.title': albumTitle || '',
                    'album.user.email': userEmail || '',
                    limit: validLimit,
                    offset: validOffset
                }
            });
    
            console.log('API Response:', response.data);
            setPhotos(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching photos', error.message);
        }
    };

    return (
        <div>
            <h1>MetaPhoto Viewer</h1>
            <div>
                <input
                    type="text"
                    placeholder="Filter by photo title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Filter by album title"
                    value={albumTitle}
                    onChange={(e) => setAlbumTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Filter by user email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Limit"
                    value={limit === '' ? '' : limit} // Handle empty input safely
                    min="1"
                    max="100"
                    step="1"
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value === '') {
                            setLimit(''); // Allow empty input
                        } else if (!isNaN(value) && Number(value) > 0) {
                            setLimit(Number(value)); // Set only positive numbers
                        }
                    }}
                />
                <input
                    type="number"
                    placeholder="Offset"
                    value={offset}
                    onChange={(e) => setOffset(Number(e.target.value))}
                />
            </div>
            <PhotoList photos={photos} />
        </div>
    );
};

export default App;