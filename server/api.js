import SseDataWorkerServer from "./SseDataWorkerServer";
import configurationFile from "./config";
import {basename} from "path";
import {readFile} from "fs";
import * as THREE from 'three';
// import SsePCDLoader from "../imports/editor/3d/SsePCDLoader";
import SsePLYLoader from "../imports/editor/3d/SsePLYLoader";

WebApp.connectHandlers.use("/api/json", generateJson);
// WebApp.connectHandlers.use("/api/pcdtext", generatePCDOutput.bind({fileMode: false}));
// WebApp.connectHandlers.use("/api/pcdfile", generatePCDOutput.bind({fileMode: true}));
WebApp.connectHandlers.use("/api/plytext", generatePLYOutput.bind({fileMode: false}));
WebApp.connectHandlers.use("/api/plyfile", generatePLYOutput.bind({fileMode: true}));
WebApp.connectHandlers.use("/api/listing", imagesListing);

const {imagesFolder, pointcloudsFolder, setsOfClassesMap} = configurationFile;
// new SsePCDLoader(THREE);
new SsePLYLoader(THREE);

function imagesListing(req, res, next) {
    const all = SseSamples.find({}, {
        fields: {
            url: 1,
            folder: 1,
            file: 1,
            tags: 1,
            firstEditDate: 1,
            lastEditDate: 1
        }
    }).fetch();
    res.end(JSON.stringify(all, null, 1));
}

function generateJson(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    const item = SseSamples.findOne({url: req.url});
    if (item) {
        const soc = setsOfClassesMap.get(item.socName);
        item.objects.forEach(obj => {
            obj.label = soc.objects[obj.classIndex].label;
        });
        res.end(JSON.stringify(item, null, 1));
    }else{
        res.end("{}");
    }
}

// function generatePCDOutput(req, res, next) {
//     const pcdFile = imagesFolder + decodeURIComponent(req.url);
//     const fileName = basename(pcdFile);
//     const labelFile = pointcloudsFolder + decodeURIComponent(req.url) + ".labels";
//     const objectFile = pointcloudsFolder + decodeURIComponent(req.url) + ".objects";

//     if (this.fileMode) {
//         res.setHeader('Content-disposition', 'attachment; filename=DOC'.replace("DOC", fileName));
//         res.setHeader('Content-type', 'text/plain');
//         res.charset = 'UTF-8';
//     }

//     readFile(pcdFile, (err, content) => {
//         if (err) {
//             res.end("Error while parsing PCD file.")
//         }

//         const loader = new THREE.PCDLoader(true);
//         const pcdContent = loader.parse(content.toString(), "");

//         const head = pcdContent.header;

//         let out = "VERSION .7\n";
//         out += "FIELDS x y z label object\n";
//         out += "SIZE 4 4 4 4 4\n";
//         out += "TYPE F F F I I\n";
//         out += "COUNT 1 1 1 1 1\n";
//         out += "WIDTH " + pcdContent.position.length + "\n";
//         out += "HEIGHT 1\n";
//         out += "POINTS " + pcdContent.position.length + "\n";
//         out += "VIEWPOINT " + head.viewpoint.tx;
//         out += " " + head.viewpoint.ty;
//         out += " " + head.viewpoint.tz;
//         out += " " + head.viewpoint.qw;
//         out += " " + head.viewpoint.qx;
//         out += " " + head.viewpoint.qy;
//         out += " " + head.viewpoint.qz + "\n";
//         out += "DATA ascii\n";
//         res.write(out);
//         out = "";
//         readFile(labelFile, (labelErr, labelContent) => {
//             if (labelErr) {
//                 res.end("Error while parsing labels file.")
//             }
//             const labels = SseDataWorkerServer.uncompress(labelContent);

//             readFile(objectFile, (objectErr, objectContent) => {
//                 let objectsAvailable = true;
//                 if (objectErr) {
//                     objectsAvailable = false;
//                 }

//                 const objectByPointIndex = new Map();

//                 if (objectsAvailable) {
//                     const objects = SseDataWorkerServer.uncompress(objectContent);
//                     objects.forEach((obj, objIndex) => {
//                         obj.points.forEach(ptIdx => {
//                             objectByPointIndex.set(ptIdx, objIndex);
//                         })
//                     });
//                 }
//                 let obj;

//                 pcdContent.position.forEach((v, i) => {
//                     const position = Math.floor(i / 3);

//                     switch (i % 3) {
//                         case 0:
//                             obj = {x: v};
//                             break;
//                         case 1:
//                             obj.y = v;
//                             break;
//                         case 2:
//                             obj.z = v;
//                             out += obj.x + " " + obj.y + " " + obj.z + " ";
//                             out += labels[position] + " ";
//                             const assignedObject = objectByPointIndex.get(position);
//                             if (assignedObject != undefined)
//                                 out += assignedObject;
//                             else
//                                 out += "-1";
//                             out += "\n";
//                             res.write(out);
//                             out = "";
//                             break;
//                     }
//                 });

//                 res.end()
//             })
//         });
//     });
// }

function generatePLYOutput(req, res, next) 
{
    const plyFile = imagesFolder + decodeURIComponent(req.url);
    const fileName = basename(plyFile);
    const labelFile = pointcloudsFolder + decodeURIComponent(req.url) + ".labels";
    const objectFile = pointcloudsFolder + decodeURIComponent(req.url) + ".objects";

    if (this.fileMode) 
    {
        res.setHeader('Content-disposition', 'attachment; filename=DOC'.replace("DOC", fileName));
        res.setHeader('Content-type', 'text/plain');
        res.charset = 'UTF-8';
    }

    readFile(plyFile, (err, content) => 
    {
        if (err) 
        {
            res.end("Error while parsing PLY file.")
        }

        const loader = new THREE.PLYLoader(true);
        const plyContent = loader.parse(content.toString(), "");

        const head = plyContent.header;

        let out = "ply\n";
        out += "format ascii 1.0\n";
        out += "element vertex " + plyContent.position.length/3 + "\n";
        out += "property double x\n";
        out += "property double y\n";
        out += "property double Z\n";
        out += "property int tags\n";
        // no normal for now
        // out += "property double nx\n";
        // out += "property double ny\n";
        // out += "property double nZ\n";
        out += "end_header\n";
        res.write(out);
        out = "";
        readFile(labelFile, (labelErr, labelContent) => 
        {
            if (labelErr) 
            {
                res.end("Error while parsing labels file.")
            }
            const labels = SseDataWorkerServer.uncompress(labelContent);

            readFile(objectFile, (objectErr, objectContent) => 
            {
                let objectsAvailable = true;
                if (objectErr) 
                {
                    objectsAvailable = false;
                }

                const objectByPointIndex = new Map();

                if (objectsAvailable) 
                {
                    const objects = SseDataWorkerServer.uncompress(objectContent);
                    objects.forEach((obj, objIndex) => 
                    {
                        obj.points.forEach(ptIdx => 
                        {
                            objectByPointIndex.set(ptIdx, objIndex);
                        })
                    });
                }
                let obj;

                plyContent.position.forEach((v, i) => 
                {
                    const position = Math.floor(i / 3);

                    switch (i % 3) 
                    {
                        case 0:
                            obj = {x: v};
                            break;
                        case 1:
                            obj.y = v;
                            break;
                        case 2:
                            obj.z = v;
                            out += obj.x + " " + obj.y + " " + obj.z + " ";
                            if(labels[position] > 0)
                            {
                                out += (1 << (labels[position])) + " ";
                            }
                            else
                            {
                                out += "-1 "
                            }
                            
                            // // no object for now!
                            // const assignedObject = objectByPointIndex.get(position);
                            // if (assignedObject != undefined)
                            //     out += assignedObject;
                            // else
                            //     out += "-1";
                            out += "\n";
                            res.write(out);
                            out = "";
                            break;
                    }
                });

                res.end()
            })
        });
    });
}