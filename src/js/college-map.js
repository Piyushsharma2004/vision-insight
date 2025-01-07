if (typeof jsVectorMap === "undefined") {
    console.error("jsVectorMap is not loaded yet.");
  }
  
  if (!jsVectorMap.maps) {
    jsVectorMap.maps = {}; // Initialize the maps object if undefined
  }
  
  jsVectorMap.maps.college_map = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [
            [75.87976453844149, 26.776993543053436],
            [75.87983104725035, 26.776791661563863],
            [75.8798243963698, 26.77620976585048],
            [75.8798044437265, 26.775247850071352],
            [75.87978449108476, 26.7743809313382],
            [75.87981629470761, 26.774002345792226],
            [75.87509875784829, 26.773652153040615],
            [75.8749291385461, 26.77648205816122],
            [75.87614827728532, 26.776718669106458],
            [75.87787627393229, 26.776926886330642],
            [75.8797844910886, 26.776983672779522],
          ],
        },
      },
    ],
  };
  