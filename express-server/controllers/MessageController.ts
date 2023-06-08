import { MessageService } from "../services/MessageService";
import type { Request, Response } from "express";
import { logger } from "../utils/logger";

export class MesssageController {
  constructor(private messageService: MessageService) {}


}
