
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const BookingModel = require("../Models/Booking.model");
const ShowModel = require("../Models/Show.model");


const makePayment = async (req, res) =>{

    try{
        
 
    const {token, amount} = req.body;
    console.log("Token: ", token);
    console.log("Amount: ", amount);

    const customer =  await stripe.customers.create({
        email: token.email,
        source: token.id
    });

    console.log("Customer: ", customer);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'inr',
        customer: customer.id,
        receipt_email: token.email,
        description: "Booking Movie Tickets",
        payment_method_types: ['card'],
    });


    const transactionId = paymentIntent.id;
    console.log("Transaction ID: ", transactionId);

    res.status(200).json({
        success: true,
        message: "Payment successful",
        transactionId: transactionId
    });
}
catch(err){
    console.log("Error: ", err);
    return res.status(500).json({error: "Payment failed"});
}


}

const createBooking = async (req, res) => {
    console.log("Create booking request: ", req.body);
    const { show, user, seats, transactionId } = req.body;
    const userId = req.user._id;
    try{
      const booking = new BookingModel({
        show,
        user: userId,
        seats,
        transactionId
      });
      await booking.save();
      const showDetails = await ShowModel.findById(show);
      const updateBookedSeats = showDetails.bookedSeats.concat(seats);
      await ShowModel.findByIdAndUpdate(show, {
        bookedSeats: updateBookedSeats
      });
      console.log("Booking created: ", booking); 
      res.status(201).json({
        success: true,
        message: "Booking created successfully with Booking ID: " + booking._id,
        data: booking
      });
    } catch(err) {
      console.log("Error creating booking: ", err);
      res.status(500).json({
        success: false,
        message: "Error creating booking",
        error: err.message
      });
    }
  }


module.exports = {
    makePayment,
    createBooking
}