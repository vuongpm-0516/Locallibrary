import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Book } from './book.entity';

@Entity()
export class BookInstance {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    imprint: string;

    @Column()
    status: string;

    @Column({ type: 'date', nullable: true })
    due_back: Date;

    @Column({ type: 'varchar', nullable: true })
    url: string;

    @ManyToOne(() => Book, book => book.bookInstances, { nullable: false })
    @JoinColumn({ name: 'book_id' })
    book: Book;
}
