import type { User, File } from './system';

export type BlockType =
	| 'block_cta'
	| 'block_faqs'
	| 'block_hero'
	| 'block_schedule'
	| 'block_speakers'
	| 'block_button'
	| 'block_button_group'
	| 'block_card'
	| 'block_cardgroup'
	| 'block_countdown';

export interface BlockButton {
	button_group?: string | BlockButtonGroup | null;
	date_created?: string | null;
	date_updated?: string | null;
	id: string;
	label?: string | null;
	sort?: number | null;
	url?: string | null;
	user_created?: string | User | null;
	user_updated?: string | User | null;
	variant?: string | null;
	open_in_new_window?: boolean | null;
}

export interface BlockButtonGroup {
	alignment?: string | null;
	buttons: any[] | BlockButton[];
	date_created?: string | null;
	date_updated?: string | null;
	id: string;
	user_created?: string | User | null;
	user_updated?: string | User | null;
	size: string;
}

export interface BlockCard {
	badge?: string | null;
	card_type?: string | null;
	cardgroup?: string | BlockCardgroup | null;
	date_created?: string | null;
	date_updated?: string | null;
	description?: string | null;
	id: string;
	image?: string | File | null;
	sort?: number | null;
	title?: string | null;
	url?: string | null;
	user_created?: string | User | null;
	user_updated?: string | User | null;
	video_file?: string | File | null;
	video_url?: string | null;
	width?: string | null;
}

export interface BlockCardgroup {
	cards: any[] | BlockCard[];
	date_created?: string | null;
	date_updated?: string | null;
	headline?: string | null;
	id: string;
	title?: string | null;
	user_created?: string | User | null;
	user_updated?: string | User | null;
}

export interface BlockCountdown {
	date_created?: string | null;
	date_updated?: string | null;
	id: string;
	headline?: string | null;
	title?: string | null;
	user_created?: string | User | null;
	user_updated?: string | User | null;
}

export interface BlockCta {
	date_created?: string | null;
	date_updated?: string | null;
	headline?: string | null;
	title?: string | null;
	content?: string | null;
	button_group?: string | BlockButtonGroup | null;
	id: string;
	user_created?: string | User | null;
	user_updated?: string | User | null;
	image: string | File | null | undefined;
}

export interface BlockFaqs {
	date_created?: string | null;
	date_updated?: string | null;
	faqs?:
		| {
				title: string;
				answer?: string | null;
		  }[]
		| null;
	headline?: string | null;
	id: string;
	title?: string | null;
	user_created?: string | User | null;
	user_updated?: string | User | null;
}

export interface BlockHero {
	button_group?: string | BlockButtonGroup | null;
	content?: string | null;
	date_created?: string | null;
	date_updated?: string | null;
	headline?: string | null;
	id: string;
	title?: string | null;
	user_created?: string | User | null;
	user_updated?: string | User | null;
	background?: string | File | null;
}

export interface BlockSchedule {
	date_created?: string | null;
	date_updated?: string | null;
	headline?: string | null;
	id: string;
	title?: string | null;
	user_created?: string | User | null;
	user_updated?: string | User | null;
}

export interface BlockSpeakers {
	date_created?: string | null;
	date_updated?: string | null;
	headline?: string | null;
	id: string;
	title?: string | null;
	user_created?: string | User | null;
	user_updated?: string | User | null;
}

export interface EventGiveaways {
	date_created?: string | null;
	date_updated?: string | null;
	id: string;
	sort?: number | null;
	status: string;
	user_created?: string | User | null;
	user_updated?: string | User | null;
}

export interface EventLandingPageBlocks {
	collection?: string | null;
	date_created?: string | null;
	date_updated?: string | null;
	events_id?: string | Event | null;
	hide_block?: boolean | null;
	id: string;
	item?:
		| string
		| BlockButton
		| BlockButtonGroup
		| BlockCard
		| BlockCardgroup
		| BlockCountdown
		| BlockCta
		| BlockFaqs
		| BlockHero
		| BlockSchedule
		| BlockSpeakers
		| null;
	sort?: number | null;
	user_created?: string | User | null;
	user_updated?: string | User | null;
}

export interface EventSessionSpeaker {
	event_sessions_id?: string | EventSession | null;
	id: string;
	sort?: number | null;
	speakers_id?: string | EventSpeakers | null;
}

export interface EventSession {
	date_created?: string | null;
	date_updated?: string | null;
	description?: string | null;
	end_at?: string | null;
	event_id?: string | Event | null;
	id: string;
	session_title?: string | null;
	session_interface?: string | null;
	session_type?: string | null;
	slug?: string | null;
	sort?: number | null;
	speakers: any[] | EventSessionSpeaker[];
	start_at: string | null;
	status: string;
	user_created?: string | User | null;
	user_updated?: string | User | null;
	location?: string | undefined;
    recording?: string | null | undefined;
}

export interface EventSpeakers {
	avatar?: string | File | null;
	company_logo?: string | File | null;
	bio?: string | null;
	date_created?: string | null;
	date_updated?: string | null;
	first_name?: string | null;
	id: string;
	job_title?: string | null;
	last_name?: string | null;
	links?: unknown | null;
	slug?: string | null;
	sort?: number | null;
	user_created?: string | User | null;
	user_updated?: string | User | null;
}

export interface EventTickets {
	date_created?: string | null;
	date_updated?: string | null;
	event_id?: string | Event | null;
	id: string;
	people_id?: string | People | null;
	referred_by?: string | EventTickets | null;
	slug: string | null;
	sort?: number | null;
	status: string;
    is_disqualified?: boolean | null;
	user_created?: string | User | null;
	user_updated?: string | User | null;
    referred_tickets_count?: number | null;
}

export interface TicketPage {
	headline: string;
	content: string;
	meter: {
		title: string;
		content: string;
	};
}

export interface Event {
	id: string;
	title?: string | null;
	slug?: string | null;
	tagline?: string | null;
	description?: string | null;
	cover?: string | File | null;
	date_created?: string | null;
	date_updated?: string | null;
	start_at: string | null;
	end_at?: string | null;
	landing_page: any[] | EventLandingPageBlocks[];
	logo?: string | File | null;
	sessions: any[] | EventSession[];
	sort?: number | null;
	status: string;
	tickets: any[] | EventTickets[];
	user_created?: string | User | null;
	user_updated?: string | User | null;
}

export interface EventsGlobals {
	id: string;
	login_page: {
		headline: string;
		content: string;
		callout: {
			title: string;
			content: string;
		};
	};
	registration_page: {
		headline: string;
		content: string;
		callout: {
			title: string;
			content: string;
		};
	};
	reset_page: {
		headline: string;
		content: string;
		callout: {
			title: string;
			content: string;
		};
	};
	ticket_page: {
		logged_in: TicketPage;
		logged_out: TicketPage;
		share: {
			show: boolean;
			title: string;
		};
	};
    ticket_pages_background?: string | File | null;
	customize_page: {};
	terms_page: {};
	terms_page_content: string | null;
	// Footer
	footer_logo?: string | File | null;
	footer_logo_url?: string | null;
	footer_tagline?: string | null;
	footer_links?:
		| {
				label: string;
				url: string;
				open_in_new_window: boolean;
		  }[]
		| null;
	social_links?:
		| {
				service: string;
				url: string;
		  }[]
		| null;
	// Slack
	send_registrations_to_slack: boolean;
	slack_webhook_url?: string | null | undefined;
	// Meta
	build_hook_url?: string | null;
}

export interface People {
	date_created?: string | null;
	date_updated?: string | null;
	email: string | null;
	first_name: string | null;
	id: string;
	job_title?: string | null;
	last_name: string | null;
	sort?: number | null;
	status: string;
	user_created?: string | User | null;
	user_updated?: string | User | null;
	website?: string | null;
	tickets?: string[] | EventTickets[] | null;
	country?: string | null | undefined;
	avatar?: string | File | null;
	avatar_traits?: string[] | null;
	confirmation_code?: string | null;
}
