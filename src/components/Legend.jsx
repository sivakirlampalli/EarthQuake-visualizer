import { useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";

function Legend() {
  const map = useMap();

  useEffect(() => {
    const legend = L.control({ position: "bottomright" });

    legend.onAdd = function () {
      const div = L.DomUtil.create("div", "info legend");
      div.innerHTML = `
        <h4>Magnitude</h4>
        <i style="background: yellow"></i><span> < 3.0</span><br>
        <i style="background: orange"></i><span> 3.0 – 5.0</span><br>
        <i style="background: red"></i><span> > 5.0</span>
      `;
      return div;
    };

    legend.addTo(map);

    return () => {
      legend.remove();
    };
  }, [map]);

  return null;
}
export default Legend;
