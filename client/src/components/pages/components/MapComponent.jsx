import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapComponent = ({ lat, lng, title }) => {
  if (!lat || !lng) return null; 

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={15}
      scrollWheelZoom={true}
      style={{ height: "400px", width: "100%", borderRadius: "12px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[lat, lng]}>
        <Popup>{title}</Popup>
      </Marker>
    </MapContainer>
  );
};


export default MapComponent;