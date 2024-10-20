import React from "react";
import { useParams } from "react-router-dom";

export default function FullImagePage() {
    const { image } = useParams();

    return (
        <div className="container dark">
            <img 
                src={image} 
                className="imageFull" 
                alt="Full resolution version for download" 
            />
        </div>
    );
}