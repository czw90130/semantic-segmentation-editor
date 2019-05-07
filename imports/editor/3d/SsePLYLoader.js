// Based on three.js PLYLoader class (only support ASCII PLY files)
export default class SsePLYLoader {
    constructor(THREE) {
        THREE.PLYLoader = function (serverMode) 
        {
            this.serverMode = serverMode;
        };

        THREE.PLYLoader.prototype = {
            constructor: THREE.PLYLoader,
            load: function (url, onLoad, onProgress, onError) {
                var scope = this;
                var loader = new THREE.FileLoader(scope.manager);
                loader.setResponseType('arraybuffer');
                loader.load(url, function (data) {
                    onLoad(scope.parse(data, url));
                }, onProgress, onError);

            },

            parse: function (data, url) 
            {
                function parseHeader(data) 
                {
                    var PLYheader = {};
                    var result1 = data.search(/[\r\n]end_header\s/i);
                    var result2 = /[\r\n]end_header\s/i.exec(data.substr(result1 - 1));
                    PLYheader.data = "ascii";
                    PLYheader.headerLen = result2[0].length + result1;
                    PLYheader.str = data.substr(0, PLYheader.headerLen);

                    // parse
                    PLYheader.points = /element vertex (.*)/i.exec(PLYheader.str);

                    // evaluate
                    if (PLYheader.points !== null)
                    {
                        PLYheader.points = parseInt(PLYheader.points[1], 10);
                    }
                    else
                    {
                        PLYheader.points = -1
                    }
                    PLYheader.viewpoint = {
                        tx: 0, ty: 0, tz: 0,
                        qw: 1, qx: 0, qy: 0, qz: 0
                    };

                
                    if(-1 == PLYheader.str.search(/tags/))
                    {
                        PLYheader.offset = {'x':0, 'y':1, 'z':2, 'label':-1, 'nx':3, "ny":4, "nz":5};
                    }
                    else
                    {
                        PLYheader.offset = {'x':0, 'y':1, 'z':2, 'label':3, 'nx':4, "ny":5, "nz":6};
                    }

                    return PLYheader;

                }

                var textData = this.serverMode ? data : THREE.LoaderUtils.decodeText(data);

                // parse header (always ascii format)

                var PLYheader = parseHeader(textData);

                // parse data

                var position = [];
                var normal = [];
                var color = [];
                var label = [];
                var payload = [];

                if (PLYheader.data === 'ascii') 
                {

                    const meta = PLYheader;

                    let camPosition = new THREE.Vector3(parseFloat(meta.viewpoint.tx), parseFloat(meta.viewpoint.ty),
                        parseFloat(meta.viewpoint.tz));
                    let camQuaternion = new THREE.Quaternion(meta.viewpoint.qx,
                        meta.viewpoint.qy, meta.viewpoint.qz, meta.viewpoint.qw);

                    var offset = PLYheader.offset;

                    var plyData = textData.substr(PLYheader.headerLen);
                    var lines = plyData.split('\n');
                    let pt, npt, item;
                    console.log(lines.length)
                    var vcnt = PLYheader.points
                    if (vcnt < 0)
                    {
                        vcnt = lines.length
                    }
                    console.log(vcnt)
                    for (var i = 0; i < vcnt; i++) 
                    {
                        
                        var line = lines[i].split(' ');
                        item = {};
                        payload.push(item);

                        pt = new THREE.Vector3(parseFloat(line[offset.x]), parseFloat(line[offset.y]), parseFloat(line[offset.z]));

                        npt = new THREE.Vector3(parseFloat(line[offset.nx]), parseFloat(line[offset.ny]), parseFloat(line[offset.nz]));

                        pt = pt.sub(camPosition);
                        pt.applyQuaternion(camQuaternion);

                        item.x = pt.x;
                        position.push(pt.x);

                        item.y = pt.y;
                        position.push(pt.y);
                        item.z = pt.z;
                        position.push(pt.z);

                        // position.push(npt.x);
                        // position.push(npt.y);
                        // position.push(npt.z);

                        var firstlable = 0;
                        if(offset.label>0)
                        {
                            firstlable = parseInt(line[offset.label]);
                            for(var t=0, temp=firstlable ; t<64; t++)
                            {
                                if (1 == temp & 1)
                                {
                                    firstlable = t+1;
                                    break
                                }
                                else
                                {
                                    temp = temp >> 1;
                                }
                            }
                        }
                        
                        const classIndex = firstlable || 0;
                        item.classIndex = classIndex;
                        label.push(classIndex);

                        // Initialize colors
                        color.push(0);
                        color.push(0);
                        color.push(0);

                    }
                    console.log("Lines Ok\n")
                }

                // build geometry

                var geometry = new THREE.BufferGeometry();

                if (position.length > 0)
                    geometry.addAttribute('position', new THREE.Float32BufferAttribute(position, 3));
                if (label.length > 0)
                    geometry.addAttribute('label', new THREE.Uint8BufferAttribute(label, 3));
                if (color.length > 0) {
                    const colorAtt = new THREE.Float32BufferAttribute(color, 3);
                    geometry.addAttribute('color', colorAtt);
                }

                geometry.computeBoundingSphere();

                var material = new THREE.PointsMaterial({size: 2, vertexColors: THREE.VertexColors});
                material.sizeAttenuation = false;

                // build mesh
                var mesh = new THREE.Points(geometry, material);
                var name = url.split('').reverse().join('');
                name = /([^\/]*)/.exec(name);
                name = name[1].split('').reverse().join('');
                mesh.name = url;

                return {position, label, header: PLYheader};

            }

        };

    }
}