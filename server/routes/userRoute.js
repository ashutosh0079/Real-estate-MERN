import express from 'express';
import { addFavourite, bookVisit, cancelBooking, createUser, getAllBookings, getAllFavourites } from '../controllers/userController.js';
import jwtCheck from '../config/auth0Config.js';
const router = express.Router();

router.post("/register",jwtCheck,createUser);
router.post("/bookvisit/:id",jwtCheck,bookVisit);
router.post("/allbookings",getAllBookings);
router.post("/removeBooking/:id",jwtCheck,cancelBooking);
router.post("/addfav/:rid",jwtCheck,addFavourite);
router.post("/allfavourites",jwtCheck,getAllFavourites);
export {router as userRoute}  