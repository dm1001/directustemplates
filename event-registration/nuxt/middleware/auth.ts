import { defineNuxtRouteMiddleware } from '#imports';

export default defineNuxtRouteMiddleware((to) => {
	const leapweekToken = useCookie('session_token');
	const { isLoggedIn } = usePerson();

	if (!leapweekToken.value || !isLoggedIn.value) {
		return navigateTo('/tickets');
	}
});
