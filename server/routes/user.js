const express = require("express")
const router = express.Router()
const { event, events, getUserJoinedEvents, participateInEvent } = require("../controllers/user")
const { auth } = require("../middlewares/auth")

router.post("/event", auth, event)
router.get("/event", auth, events)
router.get("/event_joined", auth, getUserJoinedEvents)
router.post("/event_resgister", auth, participateInEvent)


module.exports = router