import ApiKey from "../models/apiKeyModel.js";
import { generateApiKey } from "../utils/keyGenerator.js";
import bcrypt from 'bcryptjs'
export const createdApiKey=async(req,res)=>{
    try {
        const newKey =generateApiKey();
        console.log(newKey)
     //   const salt = bcrypt.genSaltSync(10);
        const hashedKey = await bcrypt.hashSync(newKey,10); // Hash the API
        console.log(hashedKey)
        const apiKey = new ApiKey({ key: hashedKey, active: true});
        await apiKey.save()
        res.status(201).json({message: 'API key generated successfully', apiKey})

    } catch (error) {
        console.log(error);
        res.status(500).json({error:'An error occured while generating the API Key '})
    }
}
















// // Import required modules

// import { publicModel } from "../models/publicModel.js";
// // List all public entries
// exports.listPublic = async (req, res) => {
//     try {
//         const entries = await publicModel.find();
//         res.status(200).json(entries);
//     } catch (error) {
//         res.status(500).json({ message:' Error retriving public data'});
//     }
// };

// // Get a single public entry by ID
// exports.getPublicById = async (req, res) => {
//     try {
//         const entry = await publicModel.findById(req.params.id);
//         if (entry) res.status(200).json(entry);
//         else res.status(404).json({ message: 'Public entry not found' });   
//     } catch (error) {
//         res.status(500).json({ message: 'Error retrieving public entry' });
//     }
// };

// // Search curriculum with filters
// exports.searchPublic = async (req, res) => {
//     try {
//         const { classLevel, strand, subStrand } = req.query;
//         const query = {};
//         if (classLevel) query.classLevel = classLevel;
//         if (strand) query.strand = strand;
//         if (subStrand) query.subStrand = subStrand;

//         const results = await publicModel.find(query);
//         res.status(200).json(results);
//     } catch (error) {
//         res.status(500).json({ message: 'Error searching public data' });
//     }
// };