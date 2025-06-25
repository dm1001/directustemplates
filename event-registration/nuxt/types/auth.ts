import type { JwtPayload } from 'jsonwebtoken';

export type Token = JwtPayload & { people_id: number; ticket_id: number };
