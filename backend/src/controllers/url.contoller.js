import {nanoid} from "nanoid"
import urlModel from "../models/url.models.js";
export let createShortUrl=async (req,res) => {
    try {
        let {originalUrl}=req.body;
        const userid=req.user._id
       const shortCode = nanoid(6);
        let shorted=`http://localhost:3000/${shortCode}`
        let url=await urlModel.create({
            userId:userid,
            originalUrl,
            shortUrl:shorted,
            shortCode
        })  
        return res.status(201).json({
            message:"Your shorten url",
            originalUrl:url.originalUrl,
            shortCode:url.shortCode,
            shortUrl:url.shortUrl
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}
export let getShortUrl=async (req,res) => {
    try {
        let {shortCode}=req.params;
     const url = await urlModel.findOneAndUpdate(
  { shortCode },
  { $inc: { clicks: 1 } },
  { new: true }
);
    
if(!url){
    return res.status(404).json({
        message:"Url not found"
    })
}
return res.redirect(url.originalUrl);

    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}
export let getAll=async (req,res) => {
    try {
        let id=req.user._id
        let urls=await urlModel.find({userId:id})
        if(urls.length===0){
            return res.status(404).json({
                message:"No url found"
            })
        }
        return res.status(200).json({
            urls
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}
export let deleteUrl=async (req,res) => {
    try {
        let {shortCode}=req.params;
        let url=await urlModel.findOneAndDelete({
            shortCode
        })
        return res.status(200).json({
            message:"url deleted"
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}