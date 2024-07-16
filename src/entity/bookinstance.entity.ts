import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Book } from './book.entity';
import { BookInstanceStatus } from '../enums/BookInstanceStatus';

@Entity()
export class BookInstance {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    imprint: string;

    @Column({
        type: 'enum',
        enum: BookInstanceStatus,
        default: BookInstanceStatus.AVAILABLE,
    })
    status: BookInstanceStatus;

    @Column({ type: 'date', nullable: true })
    due_back: Date;

    @Column({ type: 'varchar', nullable: true })
    url: string;

    @ManyToOne(() => Book, book => book.bookInstances, { nullable: false })
    @JoinColumn({ name: 'book_id' })
    book: Book;
}
