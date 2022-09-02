import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Vehicles, Incidents } from "./";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  isClient: boolean

  @Column({ unique: true })
  driverLicense: string

  @Column()
  phone: string

  @Column({ default: 'NOW()' })
  createdAt: Date

  @Column({ onUpdate: 'NOW()', nullable: true })
  updatedAt: Date

  @OneToMany(() => Vehicles, (vehicle) => vehicle.user)
  vehicle: Vehicles[]

  @OneToMany(() => Incidents, (incident) => incident.user)
  incident: Incidents[]
  
  @OneToMany(() => Incidents, (incident) => incident.thirdParty)
  thirdParty: Incidents[]
}
