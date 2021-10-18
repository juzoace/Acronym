const Acronym = require("./acronymModel");
const {
    successData,
    successMessage,
    errorMessage,
  } = require("./util");

exports.findMultiple = async (req, res) => {

    try {
        const { from, limit, search } = req.query;
        if (!search || !limit || !from) {
        // Send resonse to client
        res.status(400).json(errorMessage(`Kundly provide: from, limit and search in your request query`))
        }
       const retrievedData = await Acronym.findOne({name: "admin"})
       let foundData = [];
       const changeToString = String(search) 
       retrievedData.data.forEach(element => {
           if (element.acronym.includes(changeToString)) {
            foundData.push(element.acronym)
           }
       });
       const offset = parseInt(from);
       const limitVal = parseInt(limit);
       const paginatedData = foundData.slice(offset, offset + limitVal);
       const trueOrFalseValue = foundData.length > paginatedData.length;
       res.set(`moreData`, `${trueOrFalseValue}`)
       res.status(200).json(successData(paginatedData, "Operation successful"));
    } catch(err) {
        // Send resonse to client
        res.status(500).json(errorMessage("Operation not successful"))
    }

}

exports.addSingle = async (req, res) => {

    try {
        const existingDoc = await Acronym.findOne({
            name: "admin"
        })
        const existingData = existingDoc.data.some(data => data.acronym === req.body.acronym && data.definition === req.body.definition )
        if (existingData) {    
                // Send resonse to client
                res.status(400).json(errorMessage("Acronym or definition already exists, try again"))
        } else {
            existingDoc.data.push(req.body);
            existingDoc.data.sort((a, b) => a.acronym.normalize().localeCompare(b.acronym.normalize()));
            existingDoc.save()
            .then(() => {
                 // Send resonse to client
                res.status(200).json(successMessage("Operation successful"))
            })
            .catch((err) => {
                 // Send resonse to client
                 res.status(503).json(errorMessage("Operation not successful"))
            })
        }
    } catch(err) {
         // Send resonse to client
        res.status(500).json(errorMessage("Operation not successful"))
    }

}

exports.modifySingle = async (req, res) => {
    
    try {
        await Acronym.updateOne({name: "admin", "data.acronym": req.params.acronym}, { $set: {"data.$.definition": req.body.definition}})
        .then((data) => {  
            if (data.modifiedCount == 1) {
            // Send resonse to client
            res.status(200).json(successMessage("Operation successful"))   
            } else {
                // Send resonse to client
            res.status(400).json(errorMessage("Acronym not found"))
            }     
        })
        .catch((err) => {
        // Send resonse to client
        res.status(503).json(errorMessage("Operation not successful"))        
        })
    } catch(err) {
        // Send resonse to client
        res.status(500).json(errorMessage("Operation not successful"))  
    }
}

exports.deleteSingle = async (req, res) => {

    try {
        await Acronym.updateOne({name: "admin", "data.acronym": req.params.acronym}, {$pull: {"data": {"acronym": req.params.acronym}}}
        )
        .then((data) => {
            if (data.modifiedCount == 1) {
                // Send resonse to client
            res.status(200).json(successMessage("Operation successful"))   
            } else {
                // Send resonse to client
            res.status(400).json(errorMessage("Acronym not found"))
            } 
        })
        .catch((err) => {
               // Send resonse to client
            res.status(503).json(errorMessage("Operation not successful")) 
        })
    } catch(err) {
               // Send resonse to client
            res.status(500).json(errorMessage("Operation not successful")) 
    }

}