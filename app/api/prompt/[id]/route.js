import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

//GET (READ)
export const GET= async (req,{params}) =>{
    try {
        await connectToDB();

        const prompts = await Prompt.findById(params.id).populate('creator');
        if(!prompts) return new Response("Prompts not found",{status:404})

        return new Response(JSON.stringify(prompts),{status:200})
    } catch (error) {
        return new Response("Failed to fetch all prompts",{status:500})
    }
}


//PATCH (update)
export const PATCH  = async (req,{params }) =>{
    const {prompt,tag} = await req.json();
    try {
        await connectToDB();

        const exitingPrompt = await Prompt.findById(params.id)
        
        if(!exitingPrompt) return new Response("Prompt not Found",{status: 404})

        exitingPrompt.prompt = prompt
        exitingPrompt.tag = tag

        await exitingPrompt.save()

        return new Response(JSON.stringify(exitingPrompt),{status:200})
    } catch (error) {
        return new Response("Failed to update prompt",{status: 500})
    }
}


//Delete (delete)
export const DELETE = async (req,{params})=>{
    try {
        await connectToDB();
        
        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted sucessfully",{status: 200})
    } catch (error) {
        return new Response("Failed to delete prompt",{status: 500})
    }
}