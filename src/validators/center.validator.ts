import { z } from "zod";

export const createCenterSchema = z.object({
    name: z.string({
        required_error: "Name is required",
    }).min(1, "Name should atleast have one character"),
    location: z.string({
        required_error: "Location is required"
    }).min(1, "Location should atleast have one character")
})

export const updateCenterSchema = z.object({
    name: z.string({
        required_error: "Name is required",
    }).min(1, "Name should atleast have one character"),
    location: z.string({
        required_error: "Location is required"
    }).min(1, "Location should atleast have one character")
}).partial();