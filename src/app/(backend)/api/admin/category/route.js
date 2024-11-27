import CatgeoryModel from "@/app/(backend)/model/CategoryModel";
import dbConnect from "@/lib/dbConnect";
import { makeResponse } from "@/lib/makeResponse";
import path from "path";
import { writeFile } from "fs/promises";

export async function GET (request){
    await dbConnect();
    try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name'); 
    const getAllCategory = await CatgeoryModel.find({
        ...(name && { 
            $or: [
                { name: { $regex: name, $options: 'i' } }, 
            ]
        })
    });
    return makeResponse(true, 'fetching category', getAllCategory, 200);
    } catch (error) {
        return makeResponse(false, error?.message, {}, 400);
    }
}

export async function POST (req, res) {
    await dbConnect();
    const formData = await req.formData();
    const file = formData.get("image");
    const name = formData.get("name");
    let fileName = '';
    if (file) {
        const buffer = Buffer.from(await file.arrayBuffer());
        fileName =  file.name.replaceAll(" ", "_");
        console.log(fileName);
        try {
            await writeFile(
                path.join(process.cwd(), "public/uploads/category/" + fileName),
                buffer
            );
        } catch (error) {
            return makeResponse(false, "failed", {}, 400);
        }
    }
    try {
        await CatgeoryModel.create({
            'name': name,
            'image': fileName
        });
        return makeResponse(true, "saved", {}, 200);
    } catch (error) {
        console.log(error);
        return makeResponse(false, "failed", {}, 400);
    }

}

