async function sendToSlack(person: any) {
	try {
		const payload = {
			blocks: [
				{
					type: 'section',
					fields: [
						{
							type: 'mrkdwn',
							text: `*${person.first_name} ${person.last_name}*`,
						},
						{
							type: 'mrkdwn',
							text: 'Updated Ticket',
						},
						{
							type: 'mrkdwn',
							text: `*Email:*\n ${person.email}`,
						},
						{
							type: 'mrkdwn',
							text: `*Job Title:*\n ${person.job_title}`,
						},
					],
					accessory: {
						type: 'button',
						text: {
							type: 'plain_text',
							text: 'View Ticket',
							emoji: true,
						},
						value: `https://leapweek.dev/t/${person.tickets[0].slug}`,
						url: `https://leapweek.dev/t/${person.tickets[0].slug}`,
						action_id: 'button-action',
					},
				},
				{
					type: 'context',
					elements: [
						{
							type: 'mrkdwn',
							text: `*Country:*\n ${person.country}`,
						},
						{
							type: 'image',
							image_url: `https://flagsapi.com/${person.country}/flat/64.png`,
							alt_text: 'Country Flag',
						},
					],
				},
				{
					type: 'context',
					elements: [
						{
							type: 'mrkdwn',
							text: `*Company:*\n ${person.website} `,
						},
						{
							type: 'image',
							image_url: `https://leapweek.dev/api/logo/${person.website}`,
							alt_text: 'Website Logo',
						},
					],
				},
				{
					type: 'image',
					title: {
						type: 'plain_text',
						text: 'Ticket',
					},
					block_id: 'ticket',
					image_url: `https://leapweek.directus.app/assets/${person.avatar}?format=png&width=300`,
					alt_text: 'User ticket',
				},
				{
					type: 'divider',
				},
			],
		};

		const response = await $fetch(process.env.SLACK_WEBHOOK_URL as string, {
			method: 'POST',
			body: payload,
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return response;
	} catch (error) {
		console.error('sendToSlack error', error);
	}
}

export { sendToSlack };
