import { Controller, Get, Post, Delete, Patch, Param, Body, HttpCode } from "@nestjs/common";
import { CreateEventDto } from "./create-event.dts";
import { UpdateEventDto } from "./update-event.dts";
import { Event } from "./event.entity";

@Controller('/events')
export class EventsController {
  private events: Event[] = []

  @Get()
  findAll() {
    return this.events;
  }

  @Get(':id')
  findOne(@Param('id') id) {
    const event = this.events.find(event => event.id === parseInt(id))
    return event;
  }

  @Post()
  create(@Body() input: CreateEventDto) {
    const event = {
      ...input,
      when: new Date(input.when),
      id: this.events.length + 1
    }
    this.events.push(event)
    return this.events
  }

  @Patch(':id')
  update(@Param('id') id, @Body() input: UpdateEventDto) {
    const index = this.events.findIndex(event => event.id === parseInt(id))
    this.events[index] = {
      ...this.events[index],
      ...input,
      when: input.when ? new Date(input.when) : this.events[index].when
    }
    return this.events[index];
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id) {
    this.events.filter(event => event.id !== parseInt(id))
  }
}