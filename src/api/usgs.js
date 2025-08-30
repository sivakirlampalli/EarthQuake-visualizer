// Map min magnitude filter to USGS feed categories
const magMap = { all: 'all', 1: '1.0', 2.5: '2.5', 4.5: '4.5' };

export async function fetchEarthquakes({ period = 'day', minMag = 'all' }) {
  const feed = `${magMap[minMag] || 'all'}_${period}.geojson`;
  const url = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${feed}`;
  
  const resp = await fetch(url);
  if (!resp.ok) throw new Error('Could not fetch earthquake data');
  
  return resp.json();
}
