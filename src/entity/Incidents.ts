import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

import { Users, Vehicles } from "./";

@Entity()
export class Incidents {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Users, (user) => user.incident) 
  user: Users

  @ManyToOne(() => Vehicles, (vehicle) => vehicle.vehicle) 
  vehicle: Vehicles
  
  @ManyToOne(() => Users, (user) => user.thirdParty) 
  thirdParty: Users

  @Column()
  eventDate: Date

  @Column({ default: 'NOW()' })
  createdAt: Date

  @Column({ onUpdate: 'NOW()', nullable: true })
  updatedAt: Date
}
