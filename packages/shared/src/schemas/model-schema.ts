import z from "zod"
import { PaginatedQuerySchema } from "./paginated-data"
import { schemaForType } from "../utils/zod"
import { ModelCreateInput, ModelExperienceCreateInput, ModelUpdateInput } from "../types"
const ModelMeasurementCreateSchema = z.object({
    height: z.string(),
    weight: z.string(),
    bust: z.string().optional(),
    collar: z.string().optional(),
    aroundArmpit: z.string().optional(),
    aroundArmToWrist1: z.string().optional(),
    aroundArmToWrist2: z.string().optional(),
    aroundArmToWrist3: z.string().optional(),
    armLength1: z.string().optional(),
    armLength2: z.string().optional(),
    aroundThickToAnkle: z.string().optional(),
    trousersLength: z.string().optional(),
    chestHeight: z.string().optional(),
    chestWidth: z.string().optional(),
    waist: z.string().optional(),
    hips: z.string().optional(),
    shoulder: z.string().optional(),
    frontShoulder: z.string().optional(),
    backShoulder: z.string().optional(),
    crotch: z.string().optional(),
    braSize: z.string().optional(),
    suitDressSize: z.string().optional(),
    shoeSize: z.string().optional(),
    hairColor: z.string().optional(),
    eyeColor: z.string().optional(),
})

export const ModelCreateSchema = schemaForType<ModelCreateInput>()(z.object({
    firstName: z.string(),
    lastName: z.string(),
    nickname: z.string().optional(),
    phoneNumber: z.string(),
    email: z.string().email(),  
    lineId: z.string().optional(),
    whatsapp: z.string().optional(),
    wechat: z.string().optional(),
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    dateOfBirth: z.date().or(z.string().datetime({offset: false})),
    gender: z.string(),
    nationality: z.string().optional(),
    ethnicity: z.string().optional(),
    countryOfResidence: z.string().optional(),
    spokenLanguages: z.array(z.string()).optional(),
    passportNumber: z.string().optional(),
    idCardNumber: z.string().optional(),
    taxId: z.string().optional(),
    occupation: z.string().optional(),
    highestLevelOfEducation: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    region: z.string().optional(),
    zipCode: z.string().optional(),
    country: z.string().optional(),
    talents: z.array(z.string()).optional(),
    aboutMe: z.string().optional(),
    medicalBackground: z.string().optional(),
    tattoos: z.string().optional(),
    scars: z.string().optional(),
    underwareShooting: z.boolean().optional(),
    inTown: z.boolean().optional(),
    emergencyContactName: z.string().optional(),
    emergecyContactNumber: z.string().optional(),
    emergencyContactRelationship: z.string().optional(),
    measurement: ModelMeasurementCreateSchema
})
)

const UpdateModelMeasurementSchema = z.object({
    height: z.string().optional(),
    weight: z.string().optional(),
    bust: z.string().optional(),
    collar: z.string().optional(),
    aroundArmpit: z.string().optional(),
    aroundArmToWrist1: z.string().optional(),
    aroundArmToWrist2: z.string().optional(),
    aroundArmToWrist3: z.string().optional(),
    armLength1: z.string().optional(),
    armLength2: z.string().optional(),
    aroundThickToAnkle: z.string().optional(),
    trousersLength: z.string().optional(),
    chestHeight: z.string().optional(),
    chestWidth: z.string().optional(),
    waist: z.string().optional(),
    hips: z.string().optional(),
    shoulder: z.string().optional(),
    frontShoulder: z.string().optional(),
    backShoulder: z.string().optional(),
    crotch: z.string().optional(),
    braSize: z.string().optional(),
    suitDressSize: z.string().optional(),
    shoeSize: z.string().optional(),
    hairColor: z.string().optional(),
    eyeColor: z.string().optional(),
})
    



export const UpdateModelSchema = schemaForType<ModelUpdateInput>()(
    z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        nickname: z.string().optional(),
        phoneNumber: z.string().optional(),
        email: z.string().email().optional(),  
        lineId: z.string().optional(),
        whatsapp: z.string().optional(),
        wechat: z.string().optional(),
        instagram: z.string().optional(),
        facebook: z.string().optional(),
        dateOfBirth: z.string().datetime({offset: false}).optional(),
        gender: z.string().optional(),
        nationality: z.string().optional(),
        ethnicity: z.string().optional(),
        countryOfResidence: z.string().optional(),
        spokenLanguages: z.array(z.string()).optional(),
        passportNumber: z.string().optional(),
        idCardNumber: z.string().optional(),
        taxId: z.string().optional(),
        occupation: z.string().optional(),
        highestLevelOfEducation: z.string().optional(),
        address: z.string().optional(),
        city: z.string().optional(),
        region: z.string().optional(),
        zipCode: z.string().optional(),
        country: z.string().optional(),
        talents: z.array(z.string()).optional(),
        aboutMe: z.string().optional(),
        medicalBackground: z.string().optional(),
        tattoos: z.string().optional(),
        scars: z.string().optional(),
        underwareShooting: z.boolean().optional(),
        inTown: z.boolean().optional(),
        emergencyContactName: z.string().optional(),
        emergencyContactNumber: z.string().optional(),
        emergencyContactRelationship: z.string().optional(),
        measurement: UpdateModelMeasurementSchema.optional()
    })
)

export const ModelExperienceCreateSchema = schemaForType<ModelExperienceCreateInput>()(z.object({
    year: z.string(),
    media: z.string(),
    country: z.string(),
    product: z.string(),
    details: z.string().optional(),
}))


export const CreateModelImageSchema = z.object({
    type: z.string(),
})

export const GetModelQuerySchema = z.intersection(PaginatedQuerySchema, 
    z.object({
        q: z.string().optional(),
    }))

