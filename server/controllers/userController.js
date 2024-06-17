import asyncHandler from 'express-async-handler'
import { prisma } from '../config/prismaConfig.js'

export const createUser = asyncHandler(async(req,res)=>{
    console.log("creating a user");
    let {email} = req.body;
    const userExists = await prisma.user.findUnique({where:{email:email}})
    if(!userExists){
        const user = await prisma.user.create({data:req.body});
        res.send({
            message: "User registered successfully",
            user: user,
        });
    }
    else res.status(201).send({message:"user already registered"});
})

//fucntion to book a visit

export const bookVisit = asyncHandler(async(req,res)=>{
    const {email,date} = req.body;
    const {id} = req.params

    try{
        const alreadyBooked = await prisma.user.findUnique({
            where:{email},
            select:{bookedvisits:true}
        })
        if(alreadyBooked.bookedvisits.some((visit)=>visit.id===id)){
            res.status(400).json({message:"This residency is already booked by you"})
        }else{
            await prisma.user.update({
                where:{email:email},
                data:{
                    bookedvisits:{push:{id,date}},
                },
            })
            res.send("Your visit is successfully booked")
        }
    }catch(err){
        throw new Error(err.message); 
    }
})

//function to get all the bookings of user

export const getAllBookings = asyncHandler(async(req,res)=>{
    const {email} =  req.body
    try{
        const bookings = await prisma.user.findUnique({
            where:{email},
            select:{bookedvisits:true}
        })
        res.status(200).send(bookings)
    }catch(err){
        throw new Error(err.message);
    }
})

//function to cancel the booking

export const cancelBooking = asyncHandler(async(req,res)=>{
    const {email} = req.body;
    const {id} = req.params;
    try{
        //get the user
        const user = await prisma.user.findUnique({
            where:{email:email},
            select:{bookedvisits:true},
        })
        const index = user.bookedvisits.findIndex((visit)=>visit.id===id)
        if(index=== -1){
            res.status(400).json({message:"Booking not found"})
        }else{
            user.bookedvisits.splice(index,1)
            await prisma.user.update({
                where:{email},
                data:{
                    bookedvisits:user.bookedvisits,
                },
            })
            res.send("Booking cancelled successfully")
        }
    }catch(err){
        throw new Error(err.message)
    }
})

//function to add residency in a favourite list 
export const addFavourite = asyncHandler(async(req,res)=>{
    const {email} = req.body;
    const {rid} = req.params;

    try{
        const user = await prisma.user.findUnique({
            where:{email},
        })
        if(user.favResidenciesId.includes(rid)){
            const updateuser = await prisma.user.update({
                where:{email},
                data:{
                    favResidenciesId:{
                        set: user.favResidenciesId.filter((id) => id !== rid)
                    }
                }
            });
            res.send({message:"Removed from favourites",user:updateuser})
        }else{
            const updateuser = await prisma.user.update({
                where:{email},
                data:{
                    favResidenciesId:{
                        push:rid
                    }
                }
            })
            res.send({message:"Updated favourites",user:updateuser})
        }
    }catch(err){
        throw new Error(err.message);
    }
})

//function to get all favourites
export const getAllFavourites = asyncHandler(async(req,res)=>{
    const{email} = req.body;
    try{
        const favresid = await prisma.user.findUnique({
            where:{email},
            select:{favResidenciesId:true},
        });
        res.status(200).send(favresid);
    }catch(err){
        throw new Error(err.message)
    }
})