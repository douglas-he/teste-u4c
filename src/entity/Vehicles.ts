import { 
  Entity, Column, PrimaryGeneratedColumn,
  ManyToOne, OneToMany
} from "typeorm";

import { Users, Incidents } from "./";

@Entity()
export class Vehicles {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  modelName: string

  @Column({ unique: true })
  licensePlate: string

  
  @Column({ default: 'NOW()' })
  createdAt: Date
  
  @Column({ onUpdate: 'NOW()', nullable: true })
  updatedAt: Date
  
  @ManyToOne(() => Users, (user) => user.vehicle) 
  user: Users

  @OneToMany(() => Incidents, (incident) => incident.vehicle)
  vehicle: Incidents[]
}
