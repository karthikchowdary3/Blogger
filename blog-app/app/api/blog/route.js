import { ConnectDB } from "@/lib/config/db"
import BlogModel from "@/lib/models/BlogModel";
const { NextResponse } = require("next/server")
import { writeFile } from 'fs/promises'
const fs = require('fs')

const LoadDB = async () => {
    await ConnectDB();
}

LoadDB();
//api endpoint to get all blogs
export async function GET(request) {

    const blogId = request.nextUrl.searchParams.get("id");
    if (blogId) {
        const blog = await BlogModel.findById(blogId);
        return NextResponse.json(blog);
        
    }else{
        const blogs = await BlogModel.find({});
        return NextResponse.json({blogs})
    }
}

  
// api endpoint for uploding blogs
export async function POST(request) {
    try {
        const formData = await request.formData(); // This is used for parsing multipart/form-data

        const timestamp = Date.now();  // Fix typo: it should be Date.now()

        const image = formData.get('image');  // Get the image file from formData
        if (!image) {
            return NextResponse.json({ error: "No image provided" }, { status: 400 });
        }

        // Convert the image data into a buffer to save the file
        const imageByteData = await image.arrayBuffer();
        const buffer = Buffer.from(imageByteData);

        const path = `./public/${timestamp}_${image.name}`;
        await writeFile(path, buffer);

        const imgUrl = `/${timestamp}_${image.name}`;
        
        const blogData = {
            title : `${formData.get('title')}`,
            description : `${formData.get('description')}`,
            category:`${formData.get('category')}`,
            author : `${formData.get('author')}`,
            image:`${imgUrl}`,
            authorImg:`${formData.get('authorImg')}`
        }

        await BlogModel.create(blogData);
        console.log('blog saved');
        

        return NextResponse.json({ success : true , message : "blog added" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
    }
}
// creating api endpoint to delete blog

export async function DELETE(request) {
    
        const id = await request.nextUrl.searchParams.get("id");
        const blog = await BlogModel.findByIdAndDelete(id);
        fs.unlink(`./public${blog.image}`,()=>{});
        await BlogModel.findByIdAndDelete(id);
        return NextResponse.json({msg:'blog deleted'});

}