import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "mapbox-gl/dist/mapbox-gl.css";

// יצירת אייקון מותאם אישית עבור המרקר
const redIcon = new L.Icon({
  iconUrl: "https://emojigraph.org/media/apple/exclamation-mark_2757.png", // החלף בכתובת של תמונת האייקון שלך
  iconSize: [30, 42], // גודל האייקון
  iconAnchor: [15, 42], // נקודת העגינה של האייקון
  popupAnchor: [0, -42], // נקודת העגינה של ה-Popup
});

export default function TelAvivMap() {
  const [markers, setMarkers] = useState([]);
  const [currentPos, setCurrentPos] = useState(null);

  const mapStyle = {
    height: "500px",
    width: "100%",
    position: "relative",
  };

  const defaultView = {
    center: [32.0762, 34.7776],
    zoom: 13,
    minZoom: 8,
    maxBounds: [
      [29.4963, 34.2674],
      [33.2776, 35.9224],
    ],
  };

  const handleMapClick = (e) => {
    setCurrentPos(e.latlng);
  };

  const addMarker = () => {
    if (currentPos) {
      setMarkers([...markers, currentPos]);
      setCurrentPos(null); // איפוס המיקום הנוכחי
    }
  };

  return (
    <div style={mapStyle}>
      <MapContainer
        center={defaultView.center}
        zoom={defaultView.zoom}
        minZoom={defaultView.minZoom}
        maxBounds={defaultView.maxBounds}
        style={mapStyle}
        whenCreated={(map) => {
          map.on("click", handleMapClick);
        }}
      >
        <TileLayer
          url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
          attribution='&copy; <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> contributors'
          id="mapbox/streets-v11"
          accessToken="pk.eyJ1IjoibWF0YW5zdWx0YW4xIiwiYSI6ImNscXhxNGFkNzBmZmoyd3BocW12ZzlhYnoifQ.xk1RMDRoxVNSyquhnatX4w"
        />
        {markers.map((position, idx) => (
          <Marker key={idx} position={position} icon={redIcon}>
            <Popup>A new event here!</Popup>
          </Marker>
        ))}
      </MapContainer>
      <button
        onClick={addMarker}
        style={{ position: "absolute", top: "10px", right: "10px" }}
      >
        Add Mark
      </button>
      {/* Description Container */}
      <div className=" bg-blue-200  rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Welcome to My Map App</h2>
        <p className="text-lg">
          Explore and add points of interest on the map. An interactive map
          application that allows users to record and share personal and
          historical development stories related to specific places. Users
          upload photos, written stories, and even voice recordings to the map.
          It can be an amazing tool for preserving cultural and historical
          memory.
        </p>
      </div>
    </div>
  );
}
