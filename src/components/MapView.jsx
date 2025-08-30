import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import Legend from "./Legend";
import L from "leaflet";
import { useEffect } from "react";

// 🔹 Helper component to fix Leaflet size issue
function ResizeHandler() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 200); // wait a bit to ensure container CSS applied
  }, [map]);
  return null;
}

function MapView({ data }) {
  // Custom cluster style function
  const createClusterIcon = (cluster) => {
    const count = cluster.getChildCount();
    let color = "yellow";

    if (count > 50) color = "red";
    else if (count > 20) color = "orange";

    return L.divIcon({
      html: `<div style="
        background:${color};
        color:white;
        border-radius:50%;
        width:40px;
        height:40px;
        display:flex;
        align-items:center;
        justify-content:center;
        font-weight:bold;
        border: 2px solid #fff;
        font-size:14px;
      ">${count}</div>`,
      className: "custom-cluster",
      iconSize: [40, 40],
    });
  };

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      scrollWheelZoom={true}
      className="map-container"
    >
      <ResizeHandler />  {/* ✅ forces Leaflet to resize correctly */}

      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MarkerClusterGroup iconCreateFunction={createClusterIcon}>
        {data?.features.map((eq) => {
          const [lon, lat, depth] = eq.geometry.coordinates;
          const mag = eq.properties.mag;

          return (
            <CircleMarker
              key={eq.id}
              center={[lat, lon]}
              radius={mag ? mag * 2 : 4}
              color={mag >= 5 ? "red" : mag >= 3 ? "orange" : "yellow"}
              fillOpacity={0.6}
            >
              <Popup>
                <div style={{ fontSize: "14px", lineHeight: "1.4em" }}>
                  <strong>🌍 {eq.properties.place}</strong>
                  <div>
                    📊 Magnitude:{" "}
                    <span
                      style={{
                        fontWeight: "bold",
                        color:
                          mag >= 5 ? "red" : mag >= 3 ? "orange" : "green",
                      }}
                    >
                      {mag}
                    </span>
                  </div>
                  <div>📏 Depth: {depth} km</div>
                  <div>⏰ {new Date(eq.properties.time).toLocaleString()}</div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MarkerClusterGroup>

      <Legend />
    </MapContainer>
  );
}

export default MapView;
