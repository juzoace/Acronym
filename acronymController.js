const Acronym = require("./acronymModel");
const {
    successData,
    successMessage,
    updateData,
    errorData,
    errorMessage,
  } = require("./util");
const Fuse = require("fuse");

exports.findMultiple = async (req, res) => {

    try {

    //    const retrievedData = await Acronym.findOne({name: "admin"})

    //    let query = "5"

    //    let foundData = [];

    //    retrievedData.data.forEach(element => {

    //        if (element.acronym.includes(query)) {
    //         foundData.push(element)
    //        }
    //    });


    //    console.log(foundData)

    const retrievedData = await Acronym.findOne({name: "admin"})

    // console.log(retrievedData.data)

    const data = retrievedData.data;
    let query = "day"
    console.log(data)
    const fuse = new Fuse(data, {
        keys: ['definition', 'acronym']
    })

    const result = fuse.search(query)
 
    // console.log(result)

    } catch(err) {

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
                res.status(417).json(errorMessage("Operation not successful"))
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
                 res.status(501).json(errorMessage("Operation not successful"))
            })
        }
    } catch(err) {
         // Send resonse to client
        res.status(501).json(errorMessage("Operation not successful"))
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
        res.status(417).json(errorMessage("Operation not successful"))
        }     
        })
        .catch((err) => {
        // Send resonse to client
        res.status(501).json(errorMessage("Operation not successful"))        
        })
    } catch(err) {
        // Send resonse to client
        res.status(501).json(errorMessage("Operation not successful"))  
    }
}

exports.deleteSingle = async (req, res) => {

    try {

        await Acronym.updateOne({name: "admin", "data.acronym": req.params.acronym}, {$pull: {"data": {"acronym": req.params.acronym}}}
        )
        .then((data) => {
            console.log(data)
            if (data.modifiedCount == 1) {
                // Send resonse to client
            res.status(200).json(successMessage("Operation successful"))   
            } else {
                // Send resonse to client
            res.status(417).json(errorMessage("Operation not successful"))
            } 
        })
        .catch((err) => {
               // Send resonse to client
            res.status(501).json(errorMessage("Operation not successful")) 
        })
    } catch(err) {
               // Send resonse to client
            res.status(501).json(errorMessage("Operation not successful")) 
    }

}