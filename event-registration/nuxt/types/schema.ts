import type {
	BlockButton,
	BlockButtonGroup,
	BlockCard,
	BlockCardgroup,
	BlockCta,
	BlockFaqs,
	BlockHero,
	BlockSchedule,
	BlockSpeakers,
	BlockCountdown,
	EventGiveaways,
	EventLandingPageBlocks,
	EventSessionSpeaker,
	EventSession,
	EventTickets,
	Event,
	EventSpeakers,
	EventsGlobals,
	People,
} from './content';
import type { File, User } from './system';

/** Directus Schema for SDK */
export interface Schema {
	// Content
	event_giveaways: EventGiveaways[];
	event_landing_page_blocks: EventLandingPageBlocks[];
	event_session_speakers: EventSessionSpeaker[];
	event_sessions: EventSession[];
	event_speakers: EventSpeakers[];
	event_tickets: EventTickets[];
	events: Event[];
	events_globals: EventsGlobals;
	people: People[];

	// Blocks
	block_button: BlockButton[];
	block_button_group: BlockButtonGroup[];
	block_card: BlockCard[];
	block_cardgroup: BlockCardgroup[];
	block_countdown: BlockCountdown[];
	block_cta: BlockCta[];
	block_faqs: BlockFaqs[];
	block_hero: BlockHero[];
	block_schedule: BlockSchedule[];
	block_speakers: BlockSpeakers[];

	// System
	directus_files: File[];
	directus_users: User[];
}
