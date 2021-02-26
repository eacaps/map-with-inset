import Map from 'ol/Map.js';
import View from 'ol/View.js';
import Tile from 'ol/layer/Tile.js';
import Vector from 'ol/layer/Vector.js';
import OSM from 'ol/source/OSM.js';
import Style from 'ol/style/Style.js';
import Stroke from 'ol/style/Stroke.js';
import Fill from 'ol/style/Fill.js';
import Text from 'ol/style/Text.js';
import VectorSource from 'ol/source/Vector.js';
import GeoJSON from 'ol/format/GeoJSON.js';

var map = new Map({
    target: 'map',
    controls: [],
    layers: [
      new Tile({
        source: new OSM()
      })
        // new ol.layer.Tile({
        //     source: new ol.source.XYZ({
        //     url: 'http://a.tile.stamen.com/toner/{z}/{x}/{y}.png'
        //     })
        // })
    ],
    view: new View({
      projection: 'EPSG:4326',
      center: [37.41, 8.82],
      zoom: 4
    })
  });

  var minimap = new Map({
      target: 'minimap',
      controls: [],
      layers: [
        new Tile({
          source: new OSM()
        })
      ],
      view: new View({
        projection: 'EPSG:4326',
        center: [37.41, 8.82],
        zoom: 4
      })
  });

//   var vector = new ol.layer.Vector({
//     source: new VectorSource({
//       url: 'data/ssudan.counties.kml',
//       format: new ol.format.KML()
//     })
//   });

//   map.addLayer(vector);

//   vector.setOpacity(.1);

var highlightStyle = new Style({
    stroke: new Stroke({
      color: '#f00',
      width: 1
    }),
    fill: new Fill({
      color: 'rgba(255,0,0,0.1)'
    }),
    text: new Text({
      font: '12px Calibri,sans-serif',
      fill: new Fill({
        color: '#000'
      }),
      stroke: new Stroke({
        color: '#f00',
        width: 3
      })
    })
  });

  var countries = new Vector({
    source: new VectorSource({
      url: 'data/all_countries.json',
      format: new GeoJSON()
    })
  });

//   map.addLayer(countries);

  var vector = new Vector({
    source: new VectorSource({
      url: 'data/states/eastern_equitoria.json',
      format: new GeoJSON()
    })
  });

  map.addLayer(vector);

  var minivector = new Vector({
    source: new VectorSource({
      url: 'data/states/eastern_equitoria.json',
      format: new GeoJSON()
    })
  });

  minimap.addLayer(minivector);

// const geoJsonFormat = new GeoJSON();

//   map.on('singleclick', (e) => {
//     let pixel = e.pixel;
//     let olFeatures = map.getFeaturesAtPixel(pixel);
//     if(olFeatures) {
//         for(const feat of olFeatures) {
//             const geojson = geoJsonFormat.writeFeature(feat, {featureProjection: 'EPSG:3857'});
//           console.log(geojson);
//         }
//     }
//   });

  const counties = [
      'data/counties/lopa_lafon.json',
      'data/counties/ikotos.json',
      'data/counties/magwi.json',
      'data/counties/torit.json'
  ];

for(const county of counties) {
    const geoJson = new Vector({
        source: new VectorSource({
            url: county,
            format: new GeoJSON()
        }),
        style: feature => {return highlightStyle;}
    });

    map.addLayer(geoJson);
}

// export default map;