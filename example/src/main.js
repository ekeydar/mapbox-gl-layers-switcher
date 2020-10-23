import mapboxgl from 'mapbox-gl';
import "@ekeydar/mapbox-gl-layers-switcher/dist/layers-switcher.css"
import "./css/page.css";
import LayersSwitcher from "@ekeydar/mapbox-gl-layers-switcher";


let sources = {
    'esri-ortho': {
        'type': 'raster',
        'tiles': [
            'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        ],
        'attribution': 'Esri',
    },
    'osm': {
        'type': 'raster',
        'tiles': [
            'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        ],
        'tileSize': 256,
        'attribution': '(c) OpenStreetMap'
    },
    'data': {
        type: 'geojson',
        data: 'data.json'
    }
};

let map = new mapboxgl.Map({
    container: 'map',
    center: [34.76, 32.05], // starting position [lng, lat]
    zoom: 13, // starting zoom
    style: {
        'sources': sources,
        'layers': [
            {
                'id': 'esri',
                'type': 'raster',
                'source': 'esri',
                'minzoom': 0,
                'maxzoom': 22,
                'layout': {
                    'visibility': 'visible'
                }
            },
            {
                'id': 'osm',
                'type': 'raster',
                'source': 'osm',
                'minzoom': 0,
                'maxzoom': 22,
                'layout': {
                    'visibility': 'none'
                }
            },
            {
                'id': 'park-boundary',
                'type': 'fill',
                'source': 'national-park',
                'paint': {
                    'fill-color': '#888888',
                    'fill-opacity': 0.4
                },
                'filter': ['==', '$type', 'Polygon']
            },
            {
                'id': 'park-volcanoes',
                'type': 'circle',
                'source': 'national-park',
                'paint': {
                    'circle-radius': 6,
                    'circle-color': '#B42222'
                },
                'filter': ['==', '$type', 'Point']
            }
        ]
    },
    'version': 8,
});

let switcher = new LayersSwitcher({
    'esri': 'ESRI SATELLITE',
    'osm': 'OpenStreetMap',
}, {
    'points': 'Data points',
    'lines': 'Data lines',
    'polys': 'Data polygons'
});

map.addControl(switcher, 'bottom-left');
