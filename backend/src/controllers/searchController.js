import Curriculum from '../models/curriculumModel.js';

// import { generateEmbedding } from '../utils/embeddingUtil.js';
// import VectorDatabase from '../utils/vectorDatabase.js';



export const keywordSearch = async (req, res) => {
    try {
        const { keyword, code, name, courses } = req.body;
        let query = {};

        if (keyword) {
            query.$or = [
                { code: { $regex: keyword, $options: "i" } },
                { name: { $regex: keyword, $options: "i" } },
                { courses: { $regex: keyword, $options: "i" } },
            ];
        }
        if (code) query.code = { $regex: code, $options: "i" };
        if (name) query.name = { $regex: name, $options: "i" };
        if (courses) query.courses = { $regex: courses, $options: "i" };

        const results = await Curriculum.find(query);
        res.status(200).json({ success: true, data: results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Search failed." });
    }
};

// export const semanticSearch = async (req, res) => {
//     try {
//         const { query } = req.body;
//         const queryEmbedding = await generateEmbedding(query);

//         const vectorDb = new VectorDatabase();
//         const results = await vectorDb.search(queryEmbedding, { topK: 10 });

//         res.status(200).json({ success: true, data: results });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Semantic search failed." });
//     }
// };


export const getCurriculum = async (req, res) => {
    try {
        const { filter = "{}", limit =0, skip =0 } = req.query;
        const curriculum = await Curriculum
        .find(JSON.parse(filter))
        .limit(limit)
        .skip(skip);
        res.status(200).json({ success: true, data: curriculum });
    } catch (error) {
        console.error(error);
        res
        .status(500)
        .json({ success: false, message: 'Failed to fetch curriculum'});
    }
}
