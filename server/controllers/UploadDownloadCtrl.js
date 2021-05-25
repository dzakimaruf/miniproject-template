import formidable from 'formidable';
import fs from 'fs';


//1.declare pathDir untuk menyimpan image di local storage
const pathDir = __dirname + '../../../uploads/';
const uploadMultipart = async (req,res,next)=>{
    // jika directory belum ada then create new one
    if (!fs.existsSync(pathDir)) {
        fs.mkdirSync(pathDir);
    }

    const files = [];
    const fields = [];
    
    const dataFiles ={
        fields : fields,
        files : files
    }

    //1. gunakan spread operator
    const dataVilla=[];
    let multipart ={};
    let vimId = undefined;
    let utama = undefined


    const form = formidable({ multiples: true, uploadDir: pathDir });
    form.parse(req);

    form
         .on('fileBegin', (keyName, file) => {
            file.path = pathDir + file.name;
        }) 
        .on('field', (keyName, value) => {
            fields.push({ keyName, value });
            //2.gunakan spread operator untuk tambah attribute
            vimId = (keyName === 'villa_id' ? value : vimId)
            utama = (keyName === 'utama' ? value : utama)
            multipart = { ...multipart, vimId, utama }
        })
        .on('file', (keyName, file) => {
            console.log(file);
            const fileName = file.name;
            const filePath = file.path;
            files.push({ keyName, fileName,filePath });
            //3. gunakan spread operator
            multipart = { ...multipart, fileName, filePath,  }
            dataVilla.push(multipart)
        })
        .on('end', () => {
            console.log('-> upload to storage done');
            //2. kirim dataFiles ke function lain di object req
            req.dataFiles = dataFiles;

            //4.gunakan spread operator
            req.dataVilla = dataVilla;

            next();
        });
}

const download = async (req, res) => {
    const filename = `${pathDir}/${req.params.filename}`
    res.download(filename);
}

export default {
    download,
    uploadMultipart
}