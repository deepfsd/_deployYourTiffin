const express = require('express');
const router = express.Router();

const Order = require('../models/Orders');

// router.post('/orderData', async (req, res)=>{
//     let data = req.body.order_data
//     await data.slice(0, 0, {Order_date: req.body.order_date})

//     let eId = await Order.findOne({'email': req.body.email})
//     console.log(eId)

//     if(eId === null){
//         try{
//             await Order.create({
//                 email: req.body.email,
//                 order_data: [data]
//             }).then(()=>{
//                 res.json({success: true})
//             })
//         } catch(error){
//             console.log(error.message)
//             // res.send("Server Error", error.message);
//             res.status("Server Error")

//         }
//     }

//     else{
//         try{
//             await Order.findOneAndUpdate({ email: req.body.email },
//                 {
//                     $push: { order_data }}).then(()=>{
//                         res.json({success: true})
//                     })
//         } catch(error){
//             // res.send("Server Error", error.message)
//             res.status("Server Error")
//         }
//     }


// })

router.post('/orderData', async (req, res) => {
    try {
        const userEmail = req.body.email;
        const orderDate = req.body.order_date;
        const data = req.body.order_data;

        const existingOrder = await Order.findOne({ email: userEmail });

        if (!existingOrder) {
            await Order.create({
                email: userEmail,
                order_data: [{ Order_date: orderDate, data }],
            });
        } else {
            existingOrder.order_data.push({ Order_date: orderDate, data });
            await existingOrder.save();
        }

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});


router.post('/myorderData', async (req, res) => {
    try {
        let myData = await Order.findOne({'email': req.body.email})
        res.json({orderData: myData})
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});


module.exports = router;



