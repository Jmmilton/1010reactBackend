import express, { request, response } from 'express';

import * as db from './db'
const router = express.Router()




router.post("/contact_form/entries", async (req, res) => {
    
    let entrySubmit = {...req.body }

    console.log(entrySubmit)
    return res.status(201).send(entrySubmit).json(await db.createEntry(entrySubmit))
})
    


router.get("/contact_form/entries", (req, res) => {
    let userSubmit = {...req.body }
    res.status(201).json([userSubmit])
})


router.get("/", function(req, res, next){
    res.send("ReactProj API Workking");          //Test 
});

export default router;