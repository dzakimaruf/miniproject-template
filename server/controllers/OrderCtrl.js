const create = async (req,res, next) => {
    const {harga,discount} = req.price;
    const {order_user_id} = req.body;
    const {item}=req.data;
    const {order_start_date}= req.body;
    

    let x = item[0].lite_days;
    const realdiscount = ( x * discount);
    const to = (harga * x) - realdiscount;
    const tax = (to * 5/100);
    const total = to + tax;
    const today = order_start_date;
    const enddate= new Date(today)
    enddate.setDate(enddate.getDate() + x)
    
    


try {        
    const order = await req.context.models.Orders.create({
        order_tax: tax,
        order_discount: realdiscount,
        order_total_due: total,
        order_user_id: order_user_id,
        order_created_on: new Date(),
        order_start_date: order_start_date,
        order_end_date: enddate,
        order_total_days: x,
        order_description:req.body.order_description,
        order_city:req.body.order_city,
        order_address:req.body.order_address,
        order_status:"Booked"

     

       /*  order_end_date :  */
    })

    req.order = order;
    
    next();
} catch (error) {
     console.log(error);
}
}
// const update = async (req,res, next) => {
//     const {harga, discount} = req.price;
//     const {order_user_id} = req.body;
//     const tax = harga * 5/100; //ppn
//     const total = harga - tax;
    


// try {        
//     const order = await req.context.models.Orders.create({
//         order_tax: tax,
//         order_discount: discount,
//         order_total_due: total,
//         order_user_id: order_user_id,
//         order_created_on: new Date(),
//         // order_start_date: req.body.order_start_date,
//         // order_end_date: req.body.order_end_date,
//         // order_total_days: req.body.order_total_days,
//         // order_description:req.body.order_description,
//         // order_city:req.body.order_city,
//         // order_address:req.body.order_address,
//         // order_status:req.body.req_status

     

//        /*  order_end_date :  */
//     })

//     req.order = order;
    
//     next();
// } catch (error) {
//      console.log(error);
// }
// }

export default {
create
}