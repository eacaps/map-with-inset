var map = new ol.Map({
    target: 'map',
    controls: [],
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([37.41, 8.82]),
      zoom: 4
    })
  });

  var minimap = new ol.Map({
      target: 'minimap',
      controls: [],
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([37.41, 8.82]),
        zoom: 4
      })
  });

//   var vector = new ol.layer.Vector({
//     source: new ol.source.Vector({
//       url: 'data/ssudan.counties.kml',
//       format: new ol.format.KML()
//     })
//   });

//   map.addLayer(vector);

//   vector.setOpacity(.1);

var highlightStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#f00',
      width: 1
    }),
    fill: new ol.style.Fill({
      color: 'rgba(255,0,0,0.1)'
    }),
    text: new ol.style.Text({
      font: '12px Calibri,sans-serif',
      fill: new ol.style.Fill({
        color: '#000'
      }),
      stroke: new ol.style.Stroke({
        color: '#f00',
        width: 3
      })
    })
  });

  var vector = new ol.layer.Vector({
    source: new ol.source.Vector({
      url: 'data/states/eastern_equitoria.json',
      format: new ol.format.GeoJSON()
    })
  });

  map.addLayer(vector);

  var minivector = new ol.layer.Vector({
    source: new ol.source.Vector({
      url: 'data/states/eastern_equitoria.json',
      format: new ol.format.GeoJSON()
    })
  });

  minimap.addLayer(minivector);

// const geoJsonFormat = new ol.format.GeoJSON();

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
    const geoJson = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: county,
            format: new ol.format.GeoJSON()
        }),
        style: feature => {return highlightStyle;}
    });

    map.addLayer(geoJson);
}

