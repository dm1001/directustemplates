import { defineNuxtRouteMiddleware } from '#imports';

export default defineNuxtRouteMiddleware(async (to) => {
	const leapweekToken = useCookie('session_token');
	const { isLoggedIn, fetchPerson } = usePerson();

	if (leapweekToken.value && !isLoggedIn.value) {
		await fetchPerson();
	}
});
