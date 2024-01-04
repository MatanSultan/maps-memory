import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { firestore } from "./firebase";

const redIcon = new L.Icon({
  iconUrl: "https://emojigraph.org/media/apple/exclamation-mark_2757.png",
  iconSize: [30, 42],
  iconAnchor: [15, 42],
  popupAnchor: [0, -42],
});

export default function TelAvivMap() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [markers, setMarkers] = useState([]);

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
    const newPosition = e.latlng;
    console.log("Selected Location:", newPosition);
    setSelectedLocation(newPosition);
  };

  const addMarker = () => {
    if (
      selectedLocation &&
      selectedLocation.lat != null &&
      selectedLocation.lng != null
    ) {
      console.log("Position selected:", selectedLocation);
      const newMarker = { ...selectedLocation };
      saveMarkerToFirebase(newMarker);
      setMarkers((previousMarkers) => [...previousMarkers, newMarker]);
    } else {
      console.log("No position selected");
    }
  };

  const saveMarkerToFirebase = async (position) => {
    try {
      const markerId = `marker-${new Date().getTime()}`;
      const markerRef = doc(firestore, "markers", markerId);
      await setDoc(markerRef, { position });
      console.log("Marker saved successfully");
    } catch (error) {
      console.error("Error saving marker: ", error);
    }
  };

  useEffect(() => {
    const fetchMarkers = async () => {
      const querySnapshot = await getDocs(collection(firestore, "markers"));
      const loadedMarkers = [];
      querySnapshot.forEach((doc) => {
        loadedMarkers.push(doc.data().position);
      });
      setMarkers(loadedMarkers);
    };

    fetchMarkers();
  }, []);

  return (
    <div style={mapStyle}>
      <MapContainer
        center={defaultView.center}
        zoom={defaultView.zoom}
        minZoom={defaultView.minZoom}
        maxBounds={defaultView.maxBounds}
        style={mapStyle}
        whenCreated={(map) => map.on("click", handleMapClick)}
      >
        <TileLayer
          url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
          attribution='&copy; <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> contributors'
          id="mapbox/streets-v11"
          accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        />
        {markers.map((position, idx) => {
          if (position && position.lat != null && position.lng != null) {
            return (
              <Marker key={idx} position={position} icon={redIcon}>
                <Popup>A new event here!</Popup>
              </Marker>
            );
          } else {
            console.log("Invalid marker position", position);
            return null;
          }
        })}
      </MapContainer>
      <div className=" bg-blue-200  rounded-lg shadow-md">
        <button onClick={addMarker}>Add Mark</button>
      </div>
    </div>
  );
}
