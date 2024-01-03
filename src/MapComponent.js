import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import "mapbox-gl/dist/mapbox-gl.css"; // Import Mapbox CSS

export default function TelAvivMap() {
  const mapStyle = {
    height: "500px",
    width: "100%",
    position: "relative",
  };

  const mapboxStyle = {
    position: "absolute",
    width: "100%",
    height: "100%",
  };

  const defaultView = {
    center: [32.0762, 34.7776], // Default center coordinates (Tel Aviv)
    zoom: 5, // Default zoom level
    minZoom: 8, // Minimum zoom level (restrict to Tel Aviv)
    maxBounds: [
      // Define the boundaries of Israel
      [29.4963, 34.2674], // Southwest coordinates
      [33.2776, 35.9224], // Northeast coordinates
    ],
  };

  return (
    <div style={mapStyle}>
      <MapContainer
        center={defaultView.center}
        zoom={defaultView.zoom}
        minZoom={defaultView.minZoom}
        maxBounds={defaultView.maxBounds}
        style={{ ...mapStyle, zIndex: 0 }}
      >
        <TileLayer
          url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
          attribution='&copy; <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> contributors'
          id="mapbox/streets-v11"
          accessToken="pk.eyJ1IjoibWF0YW5zdWx0YW4xIiwiYSI6ImNscXhxNGFkNzBmZmoyd3BocW12ZzlhYnoifQ.xk1RMDRoxVNSyquhnatX4w"
        />
      </MapContainer>
      {/* Description Container */}
      <div className="mt-96 bg-blue-200 p-4 absolute top-5 right-5 rounded-lg shadow-md">
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
