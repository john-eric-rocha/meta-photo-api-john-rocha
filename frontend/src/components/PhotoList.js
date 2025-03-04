import React from 'react';

const PhotoList = ({ photos }) => {
    return (
        <div>
            {photos.map(photo => (
                <div key={photo.id}>
                    <h3>{photo.title}</h3>
                    <img src={photo.thumbnailUrl} alt={photo.title} />
                </div>
            ))}
        </div>
    );
};

export default PhotoList;
