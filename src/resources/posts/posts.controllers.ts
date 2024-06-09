import { prisma } from "../../db/connect";
import { Request, Response } from 'express';

/**
 * @description Get all posts
 * @route GET /posts
 */
export async function getPosts(req: Request, res: Response) {
    // use prisma to get all posts with error handling
    try {
        const posts = await prisma.post.findMany();

        // if no posts are found, return a 404 error
        if (!posts.length)
        return res.status(404).json({ message: "No posts found" });

        res.status(200).json(posts);
    } catch (error) {
        console.error("Error details:", error);
        res.status(500).json({ error: "Database query failed!" });
    }

}

/**
 * @description Get post
 * @route GET /posts/:id
 */
export async function getPost(req: Request, res: Response) {
    try {
        const { id } = req.params;

        const post = await prisma.post.findUnique({
            where: {
                id: id
            }
        });

        if (!post)
        return res.status(404).json({ message: "Post not found" });

        res.status(200).json(post);
    } catch (error) {
        console.error("Error details:", error);
        res.status(500).json({ error: "Database query failed!" });
    }

}

/**
 * @description Get posts by user
 * @route GET /users/:userId/posts
 */

export async function getPostsByUser(req: Request, res: Response) {
    //rewrite to prisma with error handling
    try {
        const { userId } = req.params;

        const posts = await prisma.post.findMany({
            where: {
                authorId: parseInt(userId)
            }
        });

        if (!posts.length)
        return res.status(404).json({ message: "No posts found for this user" });

        res.status(200).json(posts);
    } catch (error) {
        console.error("Error details:", error);
        res.status(500).json({ error: "Database query failed!" });
    }
    
}


/**
 * @description Create post by user
 * @route POST /users/:userId/posts
 */
export async function createPostByUser(req: Request, res: Response) {
    //rewrite to prisma with error handling
    try {
        const { userId } = req.params;
        const { title, content } = req.body;

        const post = await prisma.post.create({
            data: {
                title,
                content,
                authorId: parseInt(userId)
            }
        });

        res.status(201).json({ id: post.id, message: "Post created!" });
    } catch (error) {
        console.error("Error details:", error);
        res.status(500).json({ error: "Database query failed!" });
    }

}

/**
 * @description Update post
 * @route PUT /posts/:id
 */

export async function updatePost(req: Request, res: Response) {
    //rewrite to prisma with error handling
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const post = await prisma.post.update({
            where: {
                id: id
            },
            data: {
                title,
                content
            }
        });

        if (!post)
        return res.status(404).json({ error: "Post not updated!" });

        res.status(200).json({ message: "Post updated!" });
    } catch (error) {
        console.error("Error details:", error);
        res.status(500).json({ error: "Database query failed!" });
    }

}

/**
 * @description Delete post
 * @route DELETE /posts/:id
 */

export async function deletePost(req: Request, res: Response) {

    try {
        const { id } = req.params;

        const post = await prisma.post.delete({
            where: {
                id: id
            }
        });

        if (!post)
        return res.status(404).json({ error: "Post not deleted!" });

        res.status(200).json({ message: "Post deleted!" });
    } catch (error) {
        console.error("Error details:", error);
        res.status(500).json({ error: "Database query failed!" });
    }

}