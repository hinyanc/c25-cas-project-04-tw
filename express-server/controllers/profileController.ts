import type { Request, Response } from "express";
import { logger } from "../utils/logger";
import { ProfileService } from "../services/profileService";

export class ProfileController {
    constructor(private profileService: ProfileService) {}

    
}