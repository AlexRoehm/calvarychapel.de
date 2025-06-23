<template>
  <div ref="mapContainer" class="w-full h-132 rounded-lg shadow" />
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import maplibregl from 'maplibre-gl'

const props = defineProps({
  churches: Array,
  selectedId: String, // optional: to zoom to a selected church
})

const mapContainer = ref(null)
let map

const createGeoJSON = (items) => ({
  type: 'FeatureCollection',
  features: items
    .filter(c => c.latitude && c.longitude)
    .map(c => ({
      type: 'Feature',
      properties: {
        id: c.id,
        name: c.name,
      },
      geometry: {
        type: 'Point',
        coordinates: [c.longitude, c.latitude],
      },
    })),
})

onMounted(() => {
  const apiKey = 'bIQhQWCj3Hv9CPuIsQQl';
  map = new maplibregl.Map({
    container: mapContainer.value,
    style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${apiKey}`,
    center: [10.0, 51.0],
    zoom: 5,
  })

  const navCtl = new maplibregl.NavigationControl({
  showZoom: true,         // Zoom Buttons
  showCompass: true,      // Kompass (Rotation)
  visualizePitch: true    // Neigungsanzeige
});

      // Navigation Controls hinzufügen (Zoom + Rotation)
    map.addControl(navCtl, 'bottom-right');

    // Optional: Fullscreen Button
    map.addControl(new maplibregl.FullscreenControl());

  map.on('load', () => {
    map.addSource('churches', {
      type: 'geojson',
      data: createGeoJSON(props.churches),
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50,
    })

    map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'churches',
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': '#2563eb',
        'circle-radius': 20,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#fff',
      },
    })

    map.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'churches',
      filter: ['has', 'point_count'],
      layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['Open Sans Bold'],
        'text-size': 14,
      },
      paint: {
        'text-color': '#fff',
      },
    })

    map.addLayer({
      id: 'unclustered-point',
      type: 'circle',
      source: 'churches',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': '#2563eb',
        'circle-radius': 8,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#fff',
      },
    })

    // Optional: Zoom to cluster on click
    map.on('click', 'clusters', (e) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ['clusters'],
      })
      const clusterId = features[0].properties.cluster_id
      map.getSource('churches').getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) return
        map.easeTo({
          center: features[0].geometry.coordinates,
          zoom,
        })
      })
    })

    // Optional: Popup for single points
    map.on('click', 'unclustered-point', (e) => {
      const name = e.features[0].properties.name
      const coords = e.features[0].geometry.coordinates
      new maplibregl.Popup()
        .setLngLat(coords)
        .setText(name)
        .addTo(map)
    })

    // Cursor changes
    map.on('mouseenter', 'clusters', () => map.getCanvas().style.cursor = 'pointer')
    map.on('mouseleave', 'clusters', () => map.getCanvas().style.cursor = '')
    
  })
})

// Optional: Zoom to selected church
watch(() => props.selectedId, (newId) => {
  if (!map || !newId) return
  const church = props.churches.find(c => c.id === newId)
  if (church?.latitude && church?.longitude) {
    map.easeTo({
      center: [church.longitude, church.latitude],
      zoom: 13,
    })
  }
})
</script>
