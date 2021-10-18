const router = require('express').Router();
const {
    findMultiple,
    addSingle,
    modifySingle,
    deleteSingle
  } = require("./acronymController");


  // GET --> /acronym?from=50&limit=10&search=:search
  
/**
 * @swagger
 * /acronym:
 *   get:
 *     description: This route retrieves a list of paginated acronyms
 *     parameters:
 *       - in: query
 *         name: from 
 *         type: string
 *         required: true
 *       - in: query
 *         name: limit 
 *         type: string
 *         required: true
 *       - in: query
 *         name: search
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: 
 *         schema: 
 *            type: object  
 *            properties: 
 *              message:
 *                type: string
 *              success: 
 *                type: boolean
 *       400:
 *          description: Kindly provide from, limit and search in your request query
 *          schema: 
 *            type: object  
 *            properties: 
 *              message:
 *                type: string
 *              success: 
 *                type: boolean
 *                enum: [false, true]
 *       500:
 *          description: Operation not successful
 *          schema: 
 *            type: object  
 *            properties: 
 *              message:
 *                type: string
 *              success: 
 *                type: boolean
 *                enum: [false, true]        
 */
  router.get("/acronym", (req, res, next) => next(), findMultiple);

/**
 * @swagger
 * /acronym:
 *   post:
 *     description: Add an acronym and it's definition to the database
 *     parameters:
 *       - name: Request body
 *         in: body
 *         description: Request body object
 *         schema:
 *           type: object
 *           required: 
 *             - acronym
 *             - definition
 *           properties:
 *             acronym: 
 *               type: string
 *             definition:
 *               type: string          
 *     responses: 
 *       200:
 *         description: Response body object
 *         schema: 
 *           type: object  
 *           properties: 
 *             message:
 *               type: string
 *             success: 
 *               type: boolean
 *       401:
 *          description: Response body object
 *          schema: 
 *            type: object  
 *            properties: 
 *              message:
 *                type: string
 *              success: 
 *                type: boolean
 *                enum: [false, true]
 *       500:
 *          description: Response body object
 *          schema: 
 *            type: object  
 *            properties: 
 *              message:
 *                type: string
 *              success: 
 *                type: boolean
 *                enum: [false, true]  
 *       503:
 *          description: Response body object
 *          schema: 
 *            type: object  
 *            properties: 
 *              message:
 *                type: string
 *              success: 
 *                type: boolean
 *                enum: [false, true]          
 */  
  // POST --> /acronym
  router.post("/acronym", (req, res, next) => next(), addSingle)

/**
 * @swagger
 * /acronym:
 *   put:
 *     description: Update an acronym's definition
 *     parameters:
 *       - name: Request body
 *         in: body
 *         description: Request body object
 *         schema:
 *           type: object
 *           required: 
 *             - definition
 *           properties:
 *             definition:
 *               type: string
 *       - in: params
 *         name: acronym
 *         type: string
 *         required: true              
 *     responses: 
 *       200:
 *         description: Response body object
 *         schema: 
 *           type: object  
 *           properties: 
 *             message:
 *               type: string
 *             success: 
 *               type: boolean
 *       401:
 *          description: Response body object
 *          schema: 
 *            type: object  
 *            properties: 
 *              message:
 *                type: string
 *              success: 
 *                type: boolean
 *                enum: [false, true]
 *       500:
 *          description: Response body object
 *          schema: 
 *            type: object  
 *            properties: 
 *              message:
 *                type: string
 *              success: 
 *                type: boolean
 *                enum: [false, true]  
 *       503:
 *          description: Response body object
 *          schema: 
 *            type: object  
 *            properties: 
 *              message:
 *                type: string
 *              success: 
 *                type: boolean
 *                enum: [false, true]          
 */   
  // PUT --> /acronym/:acronym
  router.put("/acronym/:acronym", (req, res, next) => next(), modifySingle);

/**
 * @swagger
 * /acronym:
 *   delete:
 *     description: Try to access a protected route
 *     parameters:
 *       - in: params
 *         name: acronym
 *         type: string
 *         required: true              
 *     responses: 
 *       200:
 *         description: Response body object
 *         schema: 
 *           type: object  
 *           properties: 
 *             message:
 *               type: string
 *             success: 
 *               type: boolean
 *       400:
 *          description: Response body object
 *          schema: 
 *            type: object  
 *            properties: 
 *              message:
 *                type: string
 *              success: 
 *                type: boolean
 *                enum: [false, true]
 *       500:
 *          description: Response body object
 *          schema: 
 *            type: object  
 *            properties: 
 *              message:
 *                type: string
 *              success: 
 *                type: boolean
 *                enum: [false, true]  
 *       503:
 *          description: Response body object
 *          schema: 
 *            type: object  
 *            properties: 
 *              message:
 *                type: string
 *              success: 
 *                type: boolean
 *                enum: [false, true]          
 */ 
  // DELETE --> /acronym/:acronym
  router.delete("/acronym/:acronym", (req, res, next) => next(), deleteSingle);


/**
 * @swagger
 * /*:
 *   get:
 *     description: Routes which do not exist on the server             
 *     responses: 
 *       404:
 *          description: Response body object
 *          schema: 
 *            type: object  
 *            properties: 
 *              message:
 *                type: string
 *              success: 
 *                type: boolean
 *                enum: [false, true]    
 */  
  // ALL other routes return 404 by default
  router.get("*", (req, res) => {
    res.sendStatus(404);
  });

module.exports = router;