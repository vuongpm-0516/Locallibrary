import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Book } from './book.entity';

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    family_name: string;

    @Column({ type: 'date', nullable: true })
    date_of_birth: Date;

    @Column({ type: 'date', nullable: true })
    date_of_death: Date;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    url: string;

    @OneToMany(() => Book, book => book.author)
    books: Book[];
}
