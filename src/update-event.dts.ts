import { PartialType } from "@nestjs/mapped-types"
import { CreateEventDto } from "./create-event.dts"

export class UpdateEventDto extends PartialType (CreateEventDto) {}