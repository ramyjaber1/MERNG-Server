import {parse,join} from 'path';
import { createWriteStream} from 'fs';
module.exports = {

    Query:{
        info:()=> "hello Iam Image Resolver"
    },

    Mutation:{
        imageUploader: async (_,{file}) =>{
            let {filename, createReadStream}= await file;

            let stream=createReadStream();
            let {ext , name} = parse(filename);

            name = name.replace(/([^a-z0-9]+)/gi,'-').replace(' ','_');

            let serverFile = join(__dirname,`../../client/src/uploads/${name}-${Date.now()}${ext}`);
            let writeStream = await createWriteStream(serverFile);
            await stream.pipe(writeStream);
            
            serverFile = `http://localhost:5001/${serverFile.split('uploads')[1]}`

            return serverFile;
        }
    }


 }