const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
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

module.exports = {
    makePayment
}