import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useCallback, useState } from "react";
import axios from 'axios';
import { useEffect } from "react";

export default function FullImagePage() {
    const location = useLocation();
    const { largeUrl, alt, query, page } = location.state || {};
    const [photoSrc, setPhotoSrc] = useState<string>(largeUrl || "");

    const { id } = useParams();

    const navigate = useNavigate();

    // If the photo is missing, refetch it using the id
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const getPhotos = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:5000/api/image", {
                params: { 
                    id: id
                },
            });
            console.log(response.data.src.original)
            setPhotoSrc(response.data.src.original);
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        if (!photoSrc) {
            getPhotos();
        }
    }, [getPhotos, photoSrc])

    if(loading) return "Loading...";

    if(errorMessage) return <p>{errorMessage}</p>;

    // Handle "Go Back" button
    const handleGoBack = () => {
        navigate(`/results?q=${encodeURIComponent(query)}&p=${page}`);
    };

    // Function to trigger download
    const handleDownload = async () => {
        try {
        const response = await fetch(largeUrl); // Fetch image data from the URL
        const blob = await response.blob(); // Convert into a binary large object (blob)
        const url = window.URL.createObjectURL(blob); // Create temprary local url that can be downloaded

        // Create an anchor element that is not shown on page
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'downloaded-image.jpg'; // Default download name
        document.body.appendChild(a);
        a.click(); // Simulate clicking the anchor element

        // Clean up after download
        window.URL.revokeObjectURL(url); 
        document.body.removeChild(a);
        } catch (error) {
        console.error('Error downloading the image:', error);
        }
    };

    return (
        <div className="container dark">
            <img 
                src={photoSrc} 
                className="imageFull" 
                alt={alt} 
            />
            <div className="flexbox centered bottomBar">
                <button onClick={handleDownload} className="button">
                    Download
                </button>
                <button className="button" onClick={handleGoBack}>Return</button>
            </div>
        </div>
    );
}