import { DeveloperModel } from "../models/developerModel.js";
import { generateApiKey } from "../utils/keyGenerator.js";
import bcrypt from "bcryptjs";

export const requestApiKey = async (req, res) => {
    try {
        const developerId = req.auth.id; // Set by isAuthenticated middleware

        const developer = await DeveloperModel.findById(developerId);
        if (!developer) {
            return res.status(404).json({ error: "Developer not found" });
        }

        if (developer.apiKey) {
            return res.status(400).json({ error: "API key already exists for this developer." });
        }

        const plainApiKey = await generateApiKey();
        const hashedApiKey = bcrypt.hashSync(plainApiKey, 10);

        developer.apiKey = hashedApiKey;
        await developer.save();

        res.status(201).json({
            message: "API key generated successfully",
            apiKey: plainApiKey
        });
    } catch (error) {
        res.status(500).json({ error: "Error generating API key" });
    }
};















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