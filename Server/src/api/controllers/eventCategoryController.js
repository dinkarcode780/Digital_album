import asyncHandler from "../../utils/asyncHandler.js";
import eventcategoryModel from "../../models/eventCateogoryModel.js"

export const createEventCategory = asyncHandler(async (req, res) => {

  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Category name is required"
    });
  }

  const existingCategory = await eventcategoryModel.findOne({
    name: name
  });

  if (existingCategory) {
    return res.status(400).json({
      success: false,
      message: "Category already exists"
    });
  }

  const category = await eventcategoryModel.create({
    name
  });

  res.status(201).json({
    success: true,
    message: "Event category created successfully",
    data: category
  });

});


export const updateEventCategory = asyncHandler(async(req,res)=>{
 
    const {eventcategoryId,name} = req.body;

    if(!eventcategoryId){
        return res.status(400).json({
            success:false,
            message:"eventcategoryId is required"
        })
    }

    const event = await eventcategoryModel.findByIdAndUpdate(eventcategoryId,{name},{new:true});

    if(!event){
        return res.status(404).json({
            success:false,
            message:"event data is not found"
        })
    }

    res.status(200).json({
        success:true,
        message:"event updated successfully",
        data:event
    })

});


export const getEventCategoryById = asyncHandler(async (req, res) => {

    const { eventcategoryId } = req.query;

    if (!eventcategoryId) {
        return res.status(400).json({
            success: false,
            message: "eventcategoryId is required"
        });
    }

    const eventCategory = await eventcategoryModel.findById(eventcategoryId);

    if (!eventCategory) {
        return res.status(404).json({
            success: false,
            message: "Event category not found"
        });
    }

    res.status(200).json({
        success: true,
        message:"Fetched event category successfully",
        data: eventCategory
    });

});

export const getEventCategoryByFilter = asyncHandler(async (req, res) => {
    const {
        search,
        isActive,
        page = 1,
        limit = 10
    } = req.query;

    let filter = {};

    if (search) {
        filter.$or = [
            {
                name: {
                    $regex: search,
                    $options: "i"
                }
            }
        ];
    }

    if (isActive !== undefined) {
        filter.isActive = isActive === "true";
    }

    const skip = (Number(page) - 1) * Number(limit);

    const eventCategories = await eventcategoryModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));

    const totalRecords = await eventcategoryModel.countDocuments(filter);

    res.status(200).json({
        success: true,
        data: eventCategories,
        totalRecords,
        currentPage: Number(page),
        totalPages: Math.ceil(totalRecords / limit),
    });

});


export const deleteEventCategory = asyncHandler(async (req, res) => {

    const { eventcategoryId } = req.query;

    if (!eventcategoryId) {
        return res.status(400).json({
            success: false,
            message: "eventcategoryId is required"
        });
    }

    const eventCategory = await eventcategoryModel.findByIdAndDelete(
        eventcategoryId
    );

    if (!eventCategory) {
        return res.status(404).json({
            success: false,
            message: "Event category not found"
        });
    }

    res.status(200).json({
        success: true,
        message: "Event category deleted successfully"
    });

});