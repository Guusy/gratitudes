import { prisma } from "../_base";
import Cors from "cors";

// Initializing the cors middleware
const cors = Cors({
    methods: ["GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }

            return resolve(result);
        });
    });
}

export default async function handle(req, res) {
    await runMiddleware(req, res, cors);
    res.setHeader("Cache-Control", "public, max-age=0, stale-while-revalidate=1");

    if (req.method === 'POST') {
        console.log(req.body)
        // Process a POST request
        await prisma.gratitude.create({ data: req.body })
    } else {
        // Handle any other HTTP method
        const posts = await prisma.gratitude.findMany();
        res.json(posts);

    }
}