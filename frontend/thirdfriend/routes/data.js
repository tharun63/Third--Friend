const express = require("express"); // it is used to execute some function when req is created at the server side
const router = express.Router();
const Traveller = require("../models/traveller");

/*
 *posting Data
 */

router.post("/traveller/postdata", (req, res, next) => {
  const { body } = req;
  const {
    name,
    origin,
    destination,
    startJourneyDate,
    startJourneyTime,
    endJourneyDate,
    endJourneyTime,
    mobile,
    maxWeight,
    modeOfTransport,
    dealPrice,
  } = body;

  if (!name) {
    return res.send({
      success: false,
      message: "Error: name can not be blank.",
    });
  }
  if (!origin) {
    return res.send({
      success: false,
      message: "Error:  origin can not be blank.",
    });
  }
  if (!destination) {
    return res.send({
      success: false,
      message: "Error: destination can not be blank.",
    });
  }
  if (!startJourneyDate) {
    return res.send({
      success: false,
      message: "Error: startJourneyDate can not be blank.",
    });
  }
  if (!startJourneyTime) {
    return res.send({
      success: false,
      message: "Error: startJourneyTime can not be blank.",
    });
  }
  if (!endJourneyDate) {
    return res.send({
      success: false,
      message: "Error: endJourneyDate can not be blank.",
    });
  }
  if (!endJourneyTime) {
    return res.send({
      success: false,
      message: "Error: endJourneyTime can not be blank.",
    });
  }
  if (!mobile) {
    return res.send({
      success: false,
      message: "Error: mobile can not be blank.",
    });
  }
  if (!maxWeight) {
    return res.send({
      success: false,
      message: "Error: maxWeight can not be blank.",
    });
  }
  if (!modeOfTransport) {
    return res.send({
      success: false,
      message: "Error: modeOfTransport can not be blank.",
    });
  }
  if (!dealPrice) {
    return res.send({
      success: false,
      message: "Error: dealPrice can not be blank.",
    });
  }
  console.log("here");

  //steps:
  //1. verify email doesnot exit
  //2. save

  Traveller.find(
    {
      name: name,
      startJourneyDate: startJourneyDate,
      endJourneyDate: endJourneyDate,
      mobile: mobile,
      origin: origin,
      destination: destination,
    },
    (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server Error",
        });
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: "Error: Data is  already posted.",
        });
      }

      // save the new User
      const newTraveller = new Traveller();

      newTraveller.name = name;
      newTraveller.origin = origin;
      newTraveller.destination = destination;
      newTraveller.startJourneyDate = startJourneyDate;
      newTraveller.startJourneyTime = startJourneyTime;
      newTraveller.endJourneyDate = endJourneyDate;
      newTraveller.endJourneyTime = endJourneyTime;
      newTraveller.mobile = mobile;
      newTraveller.maxWeight = maxWeight;
      newTraveller.mobile = mobile;
      newTraveller.maxWeight = maxWeight;
      newTraveller.modeOfTransport = modeOfTransport;
      newTraveller.dealPrice = dealPrice;
      newTraveller.save((err, traveller) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server Error ",
            err,
          });
        } else
          return res.send({
            success: true,
            message: "Data posted successfully.",
          });
      });
    }
  );
});
// router.get("/traveller/:name", async function (req, res) {
//   // to view data by id
//   try {
//     const travel = await Traveller.findById(req.params.name);
//     res.json(travel);
//   } catch (err) {
//     res.send("error" + err);
//   }
// });
// router.get("/traveller", async function (req, res) {
//   // to view data by id
//   try {
//     const travel = await Traveller.find();
//     res.json(travel);
//   } catch (err) {
//     res.send("error" + err);
//   }
// });

router.get("/traveller", (req, res, next) => {
  console.log(req.query);
  const Origin = req.query.origin;
  const Destination = req.query.destination;
  const StartJourneyDate = req.query.startJourneyDate;

  Traveller.find({
    origin: { $regex: Origin, $options: "$i" },
    destination: { $regex: Destination, $options: "$i" },
    startJourneyDate: { $regex: StartJourneyDate, $options: "$i" },
  }).then((data) => {
    res.send(data);
    console.log(data.length);

    // if (data.length == 0) {
    //   return res.send({
    //     success: false,
    //     message: "Error: Data is not found for this journey.",
    //   });
    // }
  });
});

module.exports = router;
