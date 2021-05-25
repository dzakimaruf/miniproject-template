const create = async (req, res,next) => {
    const dataVilla = req.dataVilla;


    for (const  data of dataVilla) {
        await createImage(req,res,data);
    }
    next();

}
 const createImage = async (req, res,data) => {
    const{fileName,fileSize,fileType,primary,vimId} = data;
    await req.context.models.Villas_images.create({
        viim_filename: fileName,
        viim_filesize : fileSize,
        viim_filetype: fileType,
        viim_utama : primary,
        viim_villa_id : vimId
    }).catch(error=>{
        console.log(error);
    });
    
} 

const findAll = async (req, res) => {
    const result = await req.context.models.Villas_images.findAll();
    return res.send(result);
}


export default {
    create,
    findAll
}
